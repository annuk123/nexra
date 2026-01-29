def map_verdict(score: int) -> str:
    """
    Maps numeric score to a hard decision verdict.
    """

    if score < 30:
        return "KILL"
    elif score < 70:
        return "HOLD"
    else:
        return "BUILD"
