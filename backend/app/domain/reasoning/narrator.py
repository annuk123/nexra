def narrate_idea(result: dict, mode: str = "balanced") -> str:
    """
    V2 Narrator.

    This layer explains the outcome of the decision engine.
    It does NOT score, decide, or instruct.
    Its role is to make the reasoning understandable and trustworthy.
    """

    verdict = result.get("verdict", "UNKNOWN")
    confidence = result.get("confidence", 0)
    total_score = result.get("total_score", 0)

    weakest = result.get("weakest_link", {})
    weakest_summary = weakest.get("summary", "No dominant weakness identified")
    weakest_impact = weakest.get(
        "impact",
        "No single factor currently dominates the risk profile"
    )

    assumptions = result.get("assumptions", [])
    high_risk = [
        a for a in assumptions
        if a.get("risk_level") in ("high", "critical")
    ]

    if high_risk:
        assumptions_text = "\n".join(
            f"- {a.get('assumption', 'Unspecified assumption')}"
            for a in high_risk[:3]
        )
    else:
        assumptions_text = "- No high-risk assumptions identified at this stage"

    confidence_note = (
        "High confidence indicates the decision is structurally stable."
        if confidence >= 75
        else "Moderate confidence suggests some assumptions remain unvalidated."
        if confidence >= 55
        else "Low confidence indicates the decision relies on fragile assumptions."
    )

    return f"""
NEXRA DECISION
{verdict}  •  Score: {total_score}/100

CONFIDENCE
{confidence}% — {confidence_note}

PRIMARY RISK
{weakest_summary}
{weakest_impact}

KEY ASSUMPTIONS AT RISK
{assumptions_text}

EVALUATION MODE
{mode.upper()}

CONTEXT
This assessment is based on Nexra’s internal decision framework.
It reflects structural signals and identified risks, not external data
or subjective opinion.
""".strip()
