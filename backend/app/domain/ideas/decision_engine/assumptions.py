from typing import Dict, List, Optional

# Dimension importance weights (based on real startup failure patterns)
DIMENSION_WEIGHT = {
    "market": 1.0,        # most critical
    "revenue": 0.95,      # nearly as critical
    "founder_fit": 0.9,
    "execution": 0.85,
    "moat": 0.6           # important, but less critical early
}

# Risk thresholds (relative scoring model)
RISK_THRESHOLDS = {
    "high": 0.4,
    "medium": 0.7
}


ASSUMPTION_MAP = {
    "market": {
        "assumption": "There is sufficient, urgent demand for this problem right now",
        "low_reason": "Market demand signals are weak, vague, or trend-driven",
        "medium_reason": "Market demand appears plausible but lacks real-world validation",
        "high_reason": "Clear buyer urgency and demand signals are visible",
        "challenge_prompt": "Who is actively experiencing this pain today, and what proves it?"
    },

    "founder_fit": {
        "assumption": "The founder has the context and capability to execute effectively",
        "low_reason": "Execution requires capabilities, access, or knowledge not demonstrated",
        "medium_reason": "Founder capability appears plausible but lacks concrete validation",
        "high_reason": "Founder context and execution ability align strongly with the problem",
        "challenge_prompt": "What direct evidence shows you understand this problem deeply?"
    },

    "execution": {
        "assumption": "The product can be built and delivered reliably with available resources",
        "low_reason": "Execution complexity, dependencies, or operational risk is high",
        "medium_reason": "Execution is feasible but contains meaningful technical or operational risk",
        "high_reason": "Execution path appears clear and manageable for an early-stage team",
        "challenge_prompt": "What is the hardest execution risk in the first 90 days?"
    },

    "moat": {
        "assumption": "The product can develop sustainable defensibility over time",
        "low_reason": "No durable differentiation or structural advantage is visible",
        "medium_reason": "Differentiation exists but may be easily replicated",
        "high_reason": "Structural, strategic, or compounding advantages are emerging",
        "challenge_prompt": "Why can't a faster or better-funded competitor replicate this?"
    },

    "revenue": {
        "assumption": "Users will be willing to pay for this solution",
        "low_reason": "Revenue model, buyer identity, or payment trigger is unclear",
        "medium_reason": "Willingness to pay appears plausible but lacks confirmation",
        "high_reason": "Clear buyer, value exchange, and payment trigger are defined",
        "challenge_prompt": "Who pays first, and what motivates that payment decision?"
    }
}


def risk_from_score(score: float, max_score: float) -> str:
    """
    Converts score → risk level using relative scoring.
    Future-proof against scoring system changes.
    """

    if max_score == 0:
        return "high"

    ratio = score / max_score

    if ratio < RISK_THRESHOLDS["high"]:
        return "high"

    elif ratio < RISK_THRESHOLDS["medium"]:
        return "medium"

    return "low"


def extract_assumptions(
    scores: Dict[str, float],
    max_scores: Optional[Dict[str, float]] = None
) -> List[Dict]:

    assumptions = []

    for dimension, score in scores.items():

        template = ASSUMPTION_MAP.get(dimension)

        if not template:
            continue

        max_score = max_scores.get(dimension, 20) if max_scores else 20

        risk_level = risk_from_score(score, max_score)

        if risk_level == "high":
            reason = template["low_reason"]
            base_confidence = 0.4
            base_severity = 1.0

        elif risk_level == "medium":
            reason = template["medium_reason"]
            base_confidence = 0.7
            base_severity = 0.5

        else:
            reason = template["high_reason"]
            base_confidence = 1.0
            base_severity = 0.2

        dimension_weight = DIMENSION_WEIGHT.get(dimension, 0.7)

        severity_score = base_severity * dimension_weight

        assumptions.append({
            "dimension": dimension,

            "assumption": template["assumption"],

            "risk_level": risk_level,

            "reason": reason,

            # confidence in this assumption being valid
            "assumption_confidence": base_confidence,

            # severity adjusted by real-world dimension importance
            "severity_score": round(severity_score, 3),

            "dimension_weight": dimension_weight,

            "challenge_prompt": template["challenge_prompt"],

            # explainability metadata
            "score": score,
            "max_score": max_score,
            "score_ratio": round(score / max_score, 3)
        })

    # Sort weakest assumptions first (most critical risk)
    assumptions.sort(
        key=lambda x: (
            {"high": 0, "medium": 1, "low": 2}[x["risk_level"]],
            -x["severity_score"]
        )
    )

    return assumptions