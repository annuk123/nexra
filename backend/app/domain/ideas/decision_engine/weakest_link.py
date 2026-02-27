from .criteria import CRITERIA


WEAKEST_LINK_MAP = {
    "market": {
        "summary": "Weak market signal",
        "impact": "Without real demand, even strong execution cannot sustain growth",
        "urgency": "critical",
        "default_action": "Validate demand directly with target buyers"
    },
    "founder_fit": {
        "summary": "Founder–problem mismatch",
        "impact": "Execution risk increases when founder context or expertise is limited",
        "urgency": "high",
        "default_action": "Deepen domain understanding or narrow problem scope"
    },
    "execution": {
        "summary": "Execution feasibility risk",
        "impact": "High execution complexity increases delay and failure risk",
        "urgency": "critical",
        "default_action": "Simplify scope and focus on minimum viable version"
    },
    "moat": {
        "summary": "Weak defensibility",
        "impact": "Competitors may replicate quickly once traction appears",
        "urgency": "medium",
        "default_action": "Develop structural or compounding advantages"
    },
    "revenue": {
        "summary": "Revenue model unclear",
        "impact": "Without willingness to pay, sustainability is unlikely",
        "urgency": "critical",
        "default_action": "Clarify pricing and validate willingness to pay"
    }
}


def find_weakest_link(scores: dict) -> dict:

    if not scores:
        return {}

    # Severity-weighted weakest detection
    weighted_ratios = {}

    for dimension, score in scores.items():

        criterion = CRITERIA[dimension]

        ratio = score / criterion.max_score

        weighted_ratio = ratio * criterion.severity_weight

        weighted_ratios[dimension] = weighted_ratio

    weakest_dimension = min(weighted_ratios, key=weighted_ratios.get)

    weakest_score = scores[weakest_dimension]

    criterion = CRITERIA[weakest_dimension]

    ratio = weakest_score / criterion.max_score

    # Dynamic severity (future-proof)
    if ratio < 0.3:
        severity = "critical"

    elif ratio < 0.5:
        severity = "high"

    else:
        severity = "medium"

    meta = WEAKEST_LINK_MAP.get(weakest_dimension, {})

    return {

        "dimension": weakest_dimension,

        "score": weakest_score,

        "max_score": criterion.max_score,

        "score_ratio": round(ratio, 3),

        "severity": severity,

        "severity_weight": criterion.severity_weight,

        "summary": meta.get(
            "summary",
            "Structural weakness detected"
        ),

        "impact": meta.get(
            "impact",
            "This weakness increases failure probability"
        ),

        "urgency": meta.get(
            "urgency",
            severity
        ),

        "default_action": meta.get(
            "default_action",
            "Investigate and improve this dimension"
        ),

        # Explainability metadata
        "confidence_impact": round(
            (1 - ratio) * criterion.severity_weight,
            3
        )
    }