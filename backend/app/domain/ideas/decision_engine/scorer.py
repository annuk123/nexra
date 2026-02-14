import json
from pathlib import Path
from typing import Dict, List, Tuple

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
# Scorers (V2)
# -----------------------

def score_market(text: str) -> Dict:
    rules = RULESET["market"]
    result = base_result()

    score = rules["default_score"]

    positives = keyword_hits(text, rules["positive_keywords"])
    if positives:
        score += positives * rules["points_per_positive"]
        result["signals"].append("Clear market category identified")

    generic_hits = keyword_hits(text, rules["generic_keywords"])
    if generic_hits:
        score -= generic_hits * rules["generic_penalty"]
        result["penalties"].append("Relies on generic or trend-driven buzzwords")
        result["red_flags"] += generic_hits

        if rules.get("red_flag_on_generic_only") and positives == 0:
            result["blocking_failure"] = True

    result["score"] = clamp(score, 0, rules["max_score"])
    return result


def score_founder_fit(text: str) -> Dict:
    rules = RULESET["founder_fit"]
    result = base_result()

    score = rules["default_score"]

    hits = keyword_hits(text, rules["problem_verbs"])
    if hits:
        score += hits * rules["points_per_hit"]
        result["signals"].append("Problem articulation suggests founder understanding")
    else:
        result["penalties"].append("Problem understanding appears shallow or generic")

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
# Aggregator (V2)
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

        # Enforce criterion max (final safety net)
        max_allowed = CRITERIA[key].max_score
        result["score"] = min(result["score"], max_allowed)

        scores[key] = result["score"]
        breakdown[key] = result

        total_red_flags += result["red_flags"]

        if result["blocking_failure"] and CRITERIA[key].is_blocking:
            blocking_failures.append(key)

    return {
        "scores": scores,
        "breakdown": breakdown,
        "red_flags": total_red_flags,
        "blocking_failures": blocking_failures
    }
