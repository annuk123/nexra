from typing import List, Tuple, Dict

# ---------------------------
# Helpers
# ---------------------------

def normalize(text: str) -> str:
    return text.lower().strip()

def keyword_hits(text: str, keywords: List[str]) -> int:
    return sum(1 for k in keywords if k in text)

def clamp(value: int, min_v: int, max_v: int) -> int:
    return max(min_v, min(value, max_v))


# ---------------------------
# Knowledge Sets
# ---------------------------

MARKET_KEYWORDS = [
    "saas", "api", "platform", "tool", "automation",
    "marketplace", "crm", "dashboard", "analytics"
]

GENERIC_BUZZWORDS = [
    "ai", "blockchain", "web3", "metaverse", "revolutionary", "next-gen"
]

PROBLEM_VERBS = [
    "solve", "reduce", "eliminate", "automate",
    "replace", "simplify", "optimize", "fix"
]

PROBLEM_CONTEXT = [
    "time", "cost", "error", "manual", "inefficient",
    "slow", "complex", "expensive", "friction"
]

HIGH_COMPLEXITY = [
    "hardware", "medical", "biotech", "robot",
    "autonomous", "deep learning", "semiconductor"
]

MOAT_SIGNALS = [
    "data", "network", "integration", "workflow",
    "switching cost", "ecosystem", "community"
]

REVENUE_SIGNALS = [
    "subscription", "b2b", "enterprise", "pricing",
    "per seat", "usage-based", "pay", "license"
]


# ---------------------------
# Rules
# ---------------------------

def market_rules(text: str) -> Tuple[int, List[str], int]:
    score = 0
    reasons = []
    red_flags = 0

    market_hits = keyword_hits(text, MARKET_KEYWORDS)
    if market_hits:
        score += clamp(market_hits * 4, 6, 16)
        reasons.append("Clear market category identified")
    else:
        reasons.append("Market category is vague")
        red_flags += 1

    buzz_hits = keyword_hits(text, GENERIC_BUZZWORDS)
    if buzz_hits:
        score -= buzz_hits * 3
        reasons.append("Over-reliance on generic buzzwords")
        red_flags += buzz_hits

    return clamp(score, 0, 20), reasons, red_flags


def problem_rules(text: str) -> Tuple[int, List[str], int]:
    score = 0
    reasons = []
    red_flags = 0

    verb_hits = keyword_hits(text, PROBLEM_VERBS)
    context_hits = keyword_hits(text, PROBLEM_CONTEXT)

    if verb_hits and context_hits:
        score += clamp((verb_hits + context_hits) * 3, 10, 18)
        reasons.append("Problem is clearly articulated with context")
    elif verb_hits:
        score += 8
        reasons.append("Problem mentioned but lacks concrete context")
        red_flags += 1
    else:
        score += 4
        reasons.append("Problem statement is weak or implicit")
        red_flags += 2

    return clamp(score, 0, 20), reasons, red_flags


def execution_rules(text: str) -> Tuple[int, List[str], int]:
    score = 16
    reasons = []
    red_flags = 0

    complexity_hits = keyword_hits(text, HIGH_COMPLEXITY)
    if complexity_hits:
        penalty = complexity_hits * 5
        score -= penalty
        reasons.append("High execution or regulatory complexity detected")
        red_flags += complexity_hits

    if score < 8:
        reasons.append("Execution risk is high for early-stage founders")

    return clamp(score, 4, 20), reasons, red_flags


def moat_rules(text: str) -> Tuple[int, List[str], int]:
    score = 0
    reasons = []
    red_flags = 0

    moat_hits = keyword_hits(text, MOAT_SIGNALS)
    if moat_hits:
        score += clamp(moat_hits * 4, 8, 18)
        reasons.append("Defensibility signals detected")
    else:
        score += 5
        reasons.append("No clear moat or differentiation mentioned")
        red_flags += 1

    return clamp(score, 0, 20), reasons, red_flags


def revenue_rules(text: str) -> Tuple[int, List[str], int]:
    score = 0
    reasons = []
    red_flags = 0

    revenue_hits = keyword_hits(text, REVENUE_SIGNALS)
    if revenue_hits:
        score += clamp(revenue_hits * 4, 10, 18)
        reasons.append("Clear monetization intent detected")
    else:
        score += 4
        reasons.append("Revenue model is unclear or missing")
        red_flags += 2

    return clamp(score, 0, 20), reasons, red_flags


# ---------------------------
# Aggregator
# ---------------------------

def apply_rules(text: str) -> Dict:
    text = normalize(text)

    rules = {
        "market": market_rules,
        "problem": problem_rules,
        "execution": execution_rules,
        "moat": moat_rules,
        "revenue": revenue_rules
    }

    scores = {}
    breakdown = {}
    total_red_flags = 0

    for name, rule_fn in rules.items():
        score, reasons, flags = rule_fn(text)
        scores[name] = score
        breakdown[name] = reasons
        total_red_flags += flags

    total_score = sum(scores.values())

    return {
        "scores": scores,
        "total_score": total_score,
        "breakdown": breakdown,
        "red_flags": total_red_flags
    }
