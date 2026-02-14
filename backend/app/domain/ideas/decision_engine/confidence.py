import statistics
from typing import Dict, Optional


def calculate_confidence(
    scores: Dict[str, int],
    red_flags: int = 0,
    blocking_failures: int = 0
) -> int:
    """
    Confidence measures how reliable Nexra's verdict is.

    High confidence means:
    - Scores are balanced
    - No critical dimensions are failing
    - Few unresolved red flags

    Low confidence means:
    - Decision depends on fragile assumptions
    - One or more dimensions could collapse the idea
    """

    if not scores:
        return 0

    values = list(scores.values())

    # -----------------------
    # 1. Base confidence (neutral, not optimistic)
    # -----------------------
    confidence = 70

    # -----------------------
    # 2. Imbalance penalty (normalized)
    # -----------------------
    if len(values) > 1:
        stdev = statistics.pstdev(values)
        confidence -= int(stdev * 4)

    # -----------------------
    # 3. Structural weakness penalty
    # -----------------------
    weakest = min(values)

    if weakest <= 5:
        confidence -= 20   # critical fragility
    elif weakest <= 8:
        confidence -= 10   # notable risk
    elif weakest <= 12:
        confidence -= 5    # mild weakness

    # -----------------------
    # 4. Blocking failures penalty
    # -----------------------
    confidence -= blocking_failures * 15

    # -----------------------
    # 5. Red flag uncertainty penalty
    # -----------------------
    confidence -= red_flags * 6

    # -----------------------
    # 6. Strong balance bonus (rare, intentional)
    # -----------------------
    if min(values) >= 14 and statistics.pstdev(values) < 2:
        confidence += 5

    # -----------------------
    # 7. Clamp to 0–100
    # -----------------------
    return max(0, min(100, confidence))
