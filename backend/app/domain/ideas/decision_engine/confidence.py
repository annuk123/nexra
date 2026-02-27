import statistics
from typing import Dict, Optional, List


# Dimension importance weights (must match assumption system)
DIMENSION_WEIGHT = {
    "market": 1.0,
    "revenue": 0.95,
    "founder_fit": 0.9,
    "execution": 0.85,
    "moat": 0.6
}


def calculate_confidence(
    scores: Dict[str, float],
    red_flags: int = 0,
    blocking_failures: Optional[List[str]] = None,
    max_score: float = 20.0
) -> int:
    """
    Calculates verdict confidence (not idea quality).

    Confidence answers:
    How reliable is this evaluation?

    NOT:
    How good is this idea?
    """

    if not scores:
        return 10

    blocking_failures = blocking_failures or []

    values = list(scores.values())

    # Normalize scores to ratio (future-proof)
    ratios = [v / max_score for v in values]

    avg_ratio = sum(ratios) / len(ratios)

    # Base confidence derived from signal strength
    confidence = int(avg_ratio * 60 + 20)
    # range: 20–80 baseline

    # Signal consistency penalty
    if len(values) > 1:
        stdev = statistics.pstdev(ratios)

        # high variance = low reliability
        confidence -= int(stdev * 40)

    # Weakest dimension penalty (weighted)
    weakest_dimension = min(scores, key=scores.get)
    weakest_ratio = scores[weakest_dimension] / max_score

    weight = DIMENSION_WEIGHT.get(weakest_dimension, 0.7)

    if weakest_ratio < 0.3:
        confidence -= int(25 * weight)

    elif weakest_ratio < 0.5:
        confidence -= int(15 * weight)

    elif weakest_ratio < 0.7:
        confidence -= int(8 * weight)

    # Blocking failures penalty (major reliability reduction)
    confidence -= len(blocking_failures) * 12

    # Red flag penalty (moderate reliability reduction)
    confidence -= red_flags * 6

    # Strong signal consistency bonus
    if min(ratios) > 0.7 and statistics.pstdev(ratios) < 0.15:
        confidence += 5

    # Clamp final range
    confidence = max(10, min(95, confidence))

    return confidence