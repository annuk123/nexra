ASSUMPTION_MAP = {
    "market": {
        "assumption": "There is sufficient, urgent demand for this problem right now",
        "low_reason": "Market signals are weak, vague, or trend-driven",
        "medium_reason": "Market demand is plausible but not yet validated",
        "high_reason": "Clear buyer intent and urgency are evident",
        "challenge_prompt": "Who is actively feeling this pain today, and how do we know?"
    },

    "founder_fit": {
        "assumption": "The founder has the context and ability to execute this idea",
        "low_reason": "Execution appears to require skills or access not demonstrated",
        "medium_reason": "Founder capability is plausible but not yet proven",
        "high_reason": "Problem, solution, and founder capability are well aligned",
        "challenge_prompt": "What evidence shows you deeply understand this problem?"
    },

    "execution": {
        "assumption": "This product can be built, launched, and operated reliably",
        "low_reason": "Technical, operational, or regulatory complexity is high",
        "medium_reason": "Execution is possible but contains non-trivial risks",
        "high_reason": "Execution path appears straightforward for an early-stage team",
        "challenge_prompt": "What is the hardest part to build or ship in the first 90 days?"
    },

    "moat": {
        "assumption": "This idea can develop defensibility over time",
        "low_reason": "No clear differentiation beyond features",
        "medium_reason": "Early differentiation exists but is easy to replicate",
        "high_reason": "Structural or compounding advantages are visible",
        "challenge_prompt": "Why won’t a better-funded team copy this if it works?"
    },

    "revenue": {
        "assumption": "Users will be willing to pay for this solution",
        "low_reason": "Revenue model is unclear, indirect, or delayed",
        "medium_reason": "Willingness to pay is plausible but unproven",
        "high_reason": "Clear buyer, pricing logic, and value exchange exist",
        "challenge_prompt": "Who pays first, and what triggers that payment?"
    }
}



def risk_from_score(score: int) -> str:
    """
    Maps score → risk level.
    Designed for V2 judgment, not optimism.
    """
    if score <= 7:
        return "high"
    elif score <= 13:
        return "medium"
    return "low"

from typing import Dict, List


def extract_assumptions(scores: Dict[str, int]) -> List[Dict]:
    """
    Extracts decision-critical assumptions and their risk levels.
    These assumptions represent what must be true for the verdict to hold.
    """

    assumptions = []

    for dimension, score in scores.items():
        template = ASSUMPTION_MAP.get(dimension)
        if not template:
            continue

        risk_level = risk_from_score(score)

        if risk_level == "high":
            reason = template["low_reason"]
            confidence_weight = 0.4
        elif risk_level == "medium":
            reason = template["medium_reason"]
            confidence_weight = 0.7
        else:
            reason = template["high_reason"]
            confidence_weight = 1.0

        assumptions.append({
            "dimension": dimension,
            "assumption": template["assumption"],
            "risk_level": risk_level,
            "reason": reason,
            "confidence_weight": confidence_weight,
            "challenge_prompt": template["challenge_prompt"]
        })

    return assumptions
