PROCEED_MIN_SCORE = 72
PIVOT_MIN_SCORE = 45

LOW_CONFIDENCE_THRESHOLD = 60
VERY_LOW_CONFIDENCE_THRESHOLD = 45

HIGH_RED_FLAG_THRESHOLD = 3


def decide_verdict(
    total_score: int,
    confidence: int,
    weakest_dimension: str,
    red_flags: int,
    blocking_failures: list[str] | None = None
) -> dict:

    blocking_failures = blocking_failures or []

    blocking_count = len(blocking_failures)

    # -----------------------
    # Structural kill gates
    # -----------------------

    if blocking_count >= 2:
        return {
            "verdict": "KILL",
            "severity": "critical",
            "reason": (
                "Multiple structural failures in "
                + ", ".join(blocking_failures)
            ),
            "next_mode": "idea_rethink"
        }

    # Single blocking failure → pivot, not kill
    if blocking_count == 1:
        return {
            "verdict": "PIVOT",
            "severity": "high",
            "reason": (
                f"Structural weakness in {blocking_failures[0]} must be resolved"
            ),
            "next_mode": "assumption_validation"
        }

    # -----------------------
    # Red flag gates
    # -----------------------

    if red_flags >= HIGH_RED_FLAG_THRESHOLD:
        return {
            "verdict": "PIVOT",
            "severity": "high",
            "reason": (
                "Multiple structural risk signals reduce viability confidence"
            ),
            "next_mode": "risk_reduction"
        }

    # -----------------------
    # Confidence gates
    # -----------------------

    if confidence < VERY_LOW_CONFIDENCE_THRESHOLD:
        return {
            "verdict": "KILL",
            "severity": "high",
            "reason": (
                "Evaluation confidence is too low due to weak or inconsistent signals"
            ),
            "next_mode": "assumption_reset"
        }

    if confidence < LOW_CONFIDENCE_THRESHOLD:
        return {
            "verdict": "PIVOT",
            "severity": "medium",
            "reason": (
                f"Uncertainty remains around {weakest_dimension}"
            ),
            "next_mode": "targeted_validation"
        }

    # -----------------------
    # Score gates
    # -----------------------

    if total_score >= PROCEED_MIN_SCORE and confidence >= 70:
        return {
            "verdict": "PROCEED",
            "severity": "low",
            "reason": (
                "Strong structural signals across key dimensions"
            ),
            "next_mode": "execution_planning"
        }

    if total_score >= PIVOT_MIN_SCORE:
        return {
            "verdict": "PIVOT",
            "severity": "medium",
            "reason": (
                f"Weakness in {weakest_dimension} limits viability"
            ),
            "next_mode": "targeted_iteration"
        }

    # -----------------------
    # Default kill
    # -----------------------

    return {
        "verdict": "KILL",
        "severity": "medium",
        "reason": (
            "Insufficient structural strength across multiple dimensions"
        ),
        "next_mode": "idea_replacement"
    }