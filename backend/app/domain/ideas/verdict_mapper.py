def map_verdict(score: int) -> str:
    """
    Maps numeric score to a hard decision verdict.
    Nexra verdicts are gates, not opinions.
    """

    if score < 30:
        return "KILL"
    elif score < 70:
        return "BLOCKED"
    else:
        return "PROCEED"
