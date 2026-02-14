PROCEED_MIN_SCORE = 72
PIVOT_MIN_SCORE = 45

LOW_CONFIDENCE_THRESHOLD = 60
VERY_LOW_CONFIDENCE_THRESHOLD = 45

HIGH_RED_FLAG_THRESHOLD = 2


def total_score(scores: dict) -> int:
    return sum(scores.values())


def decide_verdict(
    scores: dict,
    confidence: int,
    weakest_link: dict,
    red_flags: int,
    blocking_failures: list[str] | None = None
) -> dict:
    """
    Determines Nexra's verdict using V2 judgment logic.

    Verdict meanings:
    - PROCEED: Signals are strong and decision is reliable
    - PIVOT: Idea has potential but assumptions or structure must change
    - KILL: Risks outweigh potential; do not invest further
    """

    blocking_failures = blocking_failures or []
    score = total_score(scores)
    weakest_dimension = weakest_link.get("dimension", "unknown")

    # -----------------------
    # 1. Absolute kill gates
    # -----------------------

    if blocking_failures:
        return {
            "verdict": "KILL",
            "severity": "critical",
            "reason": (
                "One or more blocking dimensions fail basic viability: "
                + ", ".join(blocking_failures)
            ),
            "next_mode": "rethink_idea"
        }

    if red_flags >= HIGH_RED_FLAG_THRESHOLD:
        return {
            "verdict": "KILL",
            "severity": "high",
            "reason": "Multiple unresolved risks invalidate the decision",
            "next_mode": "risk_review"
        }

    # -----------------------
    # 2. Confidence gates
    # -----------------------

    if confidence < VERY_LOW_CONFIDENCE_THRESHOLD:
        return {
            "verdict": "KILL",
            "severity": "high",
            "reason": "Decision confidence is extremely low due to fragile assumptions",
            "next_mode": "assumption_reset"
        }

    if confidence < LOW_CONFIDENCE_THRESHOLD:
        return {
            "verdict": "PIVOT",
            "severity": "medium",
            "reason": (
                "Low confidence suggests unstable assumptions, "
                "especially around "
                f"{weakest_dimension}"
            ),
            "next_mode": "assumption_validation"
        }

    # -----------------------
    # 3. Score-based judgment
    # -----------------------

    if score >= PROCEED_MIN_SCORE and confidence >= 70:
        return {
            "verdict": "PROCEED",
            "severity": "low",
            "reason": "Strong signals with balanced execution and acceptable risk",
            "next_mode": "execution_planning"
        }

    if score >= PIVOT_MIN_SCORE:
        return {
            "verdict": "PIVOT",
            "severity": "medium",
            "reason": (
                f"The weakest dimension ({weakest_dimension}) "
                "needs refinement before further investment"
            ),
            "next_mode": "targeted_iteration"
        }

    # -----------------------
    # 4. Default kill
    # -----------------------

    return {
        "verdict": "KILL",
        "severity": "medium",
        "reason": "Overall signal strength is too weak to justify continued effort",
        "next_mode": "idea_replacement"
    }
