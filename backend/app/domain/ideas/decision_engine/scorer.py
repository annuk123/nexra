import json
from pathlib import Path
from typing import Dict, List

from .criteria import CRITERIA

RULESET_PATH = Path(__file__).parent / "ruleset.json"

with open(RULESET_PATH, "r") as f:
    RULESET = json.load(f)


# -----------------------
# Helpers
# -----------------------

def normalize(text: str) -> str:
    return text.lower().strip()


def clamp(value: int, min_v: int, max_v: int) -> int:
    return max(min_v, min(max_v, value))


def keyword_hits(text: str, keywords: List[str]) -> int:
    return sum(1 for k in keywords if k in text)


# -----------------------
# Core Scorer Template
# -----------------------

def base_result():
    return {
        "score": 0,
        "signals": [],
        "penalties": [],
        "red_flags": 0,
        "blocking_failure": False
    }


# -----------------------
# Scorers
# -----------------------

def score_market(text: str) -> Dict:

    rules = RULESET["market"]
    result = base_result()

    score = rules["default_score"]

    # SAFE ACCESS
    points_per_positive = rules.get("points", {}).get("category_hit", 2)
    generic_penalty = rules.get("penalties", {}).get("generic_penalty", 2)

    # -----------------------
    # Existing keyword-based detection
    # -----------------------

    positives = keyword_hits(text, rules.get("positive_keywords", []))

    if positives:
        score += positives * points_per_positive
        result["signals"].append("Clear market category identified")

    # -----------------------
    # NEW: Target user detection
    # -----------------------

    user_indicators = [
        "developers",
        "students",
        "founders",
        "designers",
        "creators",
        "engineers",
        "teams",
        "businesses",
        "startups",
        "learners",
        "users",
        "people who",
        "anyone who"
    ]

    user_hits = keyword_hits(text, user_indicators)

    if user_hits:
        score += user_hits * 2
        result["signals"].append("Specific target users identified")

    # -----------------------
    # NEW: Pain / urgency detection
    # -----------------------

    pain_indicators = [
        "waste time",
        "slow",
        "hard",
        "difficult",
        "inefficient",
        "frustrating",
        "manual",
        "takes too long",
        "problem",
        "struggle"
    ]

    pain_hits = keyword_hits(text, pain_indicators)

    if pain_hits:
        score += pain_hits * 2
        result["signals"].append("Clear user pain or inefficiency detected")

    # -----------------------
    # Existing generic penalty logic
    # -----------------------

    generic_hits = keyword_hits(text, rules.get("generic_keywords", []))

    if generic_hits:
        score -= generic_hits * generic_penalty
        result["penalties"].append("Relies on generic or trend-driven buzzwords")
        result["red_flags"] += generic_hits

        if (
            rules.get("red_flags", {}).get("generic_only", {}).get("enabled", False)
            and positives == 0
            and user_hits == 0
        ):
            result["blocking_failure"] = True

    # -----------------------

    result["score"] = clamp(score, 0, rules["max_score"])

    return result
def score_founder_fit(text: str) -> Dict:
    rules = RULESET["founder_fit"]
    result = base_result()

    score = rules["default_score"]

    strong_signals = [
        "i built",
        "i experienced",
        "i struggled",
        "i failed",
        "as a founder",
        "personally",
        "my experience",
        "while building",
    ]

    strong_hits = keyword_hits(text, strong_signals)

    if strong_hits:
        score += strong_hits * 3
        result["signals"].append("Strong founder–problem alignment detected")

    generic_patterns = [
        "platform for",
        "tool for",
        "app for",
        "engine for"
    ]

    generic_hits = keyword_hits(text, generic_patterns)

    if generic_hits and strong_hits == 0:
        score -= 3
        result["penalties"].append("No evidence of founder lived experience")

    result["score"] = clamp(score, 0, rules["max_score"])

    return result


def score_execution(text: str) -> Dict:
    rules = RULESET["execution"]
    result = base_result()

    score = rules["base_score"]

    hits = keyword_hits(text, rules["high_complexity_keywords"])

    if hits:
        score -= hits * rules["penalty_per_complexity"]
        result["penalties"].append("High technical or operational complexity detected")
        result["red_flags"] += hits

    score = clamp(score, rules["min_score"], rules["max_score"])

    result["score"] = score

    if score <= 8:
        result["blocking_failure"] = True

    return result


def score_moat(text: str) -> Dict:
    rules = RULESET["moat"]
    result = base_result()

    score = rules["default_score"]

    hits = keyword_hits(text, rules["defensibility_keywords"])

    if hits:
        score += hits * rules["points_per_hit"]
        result["signals"].append("Defensibility or differentiation signals detected")
    else:
        result["penalties"].append("No clear moat or defensibility mentioned")

    result["score"] = clamp(score, 0, rules["max_score"])

    return result


def score_revenue(text: str) -> Dict:
    rules = RULESET["revenue"]
    result = base_result()

    score = rules["default_score"]

    hits = keyword_hits(text, rules["monetization_keywords"])

    if hits:
        score += hits * rules["points_per_hit"]
        result["signals"].append("Clear monetization intent detected")
    else:
        result["penalties"].append("Revenue model is unclear or missing")

        if rules.get("red_flag_if_missing"):
            result["red_flags"] += 1
            result["blocking_failure"] = True

    result["score"] = clamp(score, 0, rules["max_score"])

    return result


# -----------------------
# Aggregator
# -----------------------

def score_text(text: str) -> Dict:

    text = normalize(text)

    scorers = {
        "market": score_market,
        "founder_fit": score_founder_fit,
        "execution": score_execution,
        "moat": score_moat,
        "revenue": score_revenue
    }

    scores = {}
    breakdown = {}

    total_red_flags = 0
    blocking_failures = []

    for key, scorer in scorers.items():

        result = scorer(text)

        max_allowed = CRITERIA[key].max_score
        result["score"] = min(result["score"], max_allowed)

        scores[key] = result["score"]
        breakdown[key] = result

        total_red_flags += result["red_flags"]

        if result["blocking_failure"] and CRITERIA[key].is_blocking:
            blocking_failures.append(key)

    # -----------------------
    # Total Score Calculation
    # -----------------------
    weighted_scores = sum(
        scores[key] * CRITERIA[key].severity_weight
        for key in scores
    )
    max_weighted_score = sum(
        CRITERIA[key].max_score * CRITERIA[key].severity_weight
        for key in scores
    )
    
    normalized_score = int((weighted_scores / max_weighted_score) * 100)

    # Apply red flag penalties
    normalized_score -= total_red_flags * 3
    # If there are blocking failures, cap the score
    normalize_score = len(blocking_failures) * 20

    normalized_score = clamp(normalized_score, 0, 100)
    # -----------------------
    # Weakest Link Calculation (Severity-weighted)
    # -----------------------

    weighted_scores = {
        key: scores[key] * CRITERIA[key].severity_weight
        for key in scores
    }

    weakest_dimension = min(weighted_scores, key=weighted_scores.get)

    # -----------------------

    return {
        "scores": scores,
        "breakdown": breakdown,
        "red_flags": total_red_flags,
        "blocking_failures": blocking_failures,
        "total_score": normalized_score,
        "weakest_dimension": weakest_dimension
    }


def score_distribution(text: str) -> Dict:
    rules = RULESET["distribution"]
    result = base_result()

    score = rules["default_score"]

    hits = keyword_hits(text, rules["distribution_keywords"])

    if hits:
        score += hits * rules["points_per_hit"]
        result["signals"].append("Distribution channel identified")

    else:
        result["penalties"].append("No clear distribution strategy")

        result["blocking_failure"] = True

    result["score"] = clamp(score, 0, rules["max_score"])

    return result