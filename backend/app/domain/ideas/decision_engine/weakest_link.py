WEAKEST_LINK_MAP = {
    "market": {
        "summary": "Weak market signal",
        "impact": "Without clear demand, growth will stall regardless of execution quality",
        "urgency": "critical",
        "default_action": "Validate demand with real buyers"
    },
    "founder_fit": {
        "summary": "Founder–problem mismatch",
        "impact": "Even strong ideas fail if the founder lacks context or capability",
        "urgency": "high",
        "default_action": "Narrow scope or acquire missing expertise"
    },
    "execution": {
        "summary": "High execution risk",
        "impact": "Complex execution increases delays, cost, and failure probability",
        "urgency": "critical",
        "default_action": "Reduce scope or simplify initial version"
    },
    "moat": {
        "summary": "Lack of defensibility",
        "impact": "Competitors can replicate the idea once traction appears",
        "urgency": "medium",
        "default_action": "Identify compounding or switching-cost advantages"
    },
    "revenue": {
        "summary": "Unclear monetization",
        "impact": "Without willingness to pay, the business cannot sustain itself",
        "urgency": "critical",
        "default_action": "Clarify pricing and buyer willingness to pay"
    }
}


def find_weakest_link(scores: dict) -> dict:
    if not scores:
        return {}

    weakest_dimension = min(scores, key=scores.get)
    weakest_score = scores[weakest_dimension]

    meta = WEAKEST_LINK_MAP.get(weakest_dimension, {})

    return {
        "dimension": weakest_dimension,
        "score": weakest_score,
        "summary": meta.get("summary", "Weak area detected"),
        "impact": meta.get("impact", "This area poses a significant risk")
    }
