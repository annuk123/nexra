from app.domain.ideas.verdict_mapper import map_verdict
from app.domain.ideas.nexra_personality import get_personality


def narrate_idea(data: dict, mode: str) -> str:
    score = int(data["decision_score"])
    verdict = map_verdict(score)

    # Signal framing (more nuanced, still deterministic)
    if score < 25:
        signal = "Weak signal. The problem does not appear urgent or well-defined."
    elif score < 50:
        signal = "Mixed signal. Some pain exists, but clarity and leverage are missing."
    elif score < 70:
        signal = "Promising signal, but execution and distribution risk is high."
    else:
        signal = "Strong signal. Clear pain, defined buyer, and realistic leverage."

    personality = get_personality(mode)
    actions = personality["actions"]
    recommendation = personality["recommendation"]
    philosophy = personality["philosophy"]

    risks = data.get("risks", [])
    top_risks = risks[:3]

    risks_text = (
        "\n".join([f"- {r}" for r in top_risks])
        if top_risks
        else "- No critical risks identified at this stage"
    )

    return f"""
DECISION
{verdict} ({score}/100)

SUMMARY
{signal}

KEY RISKS
{risks_text}

RECOMMENDED ACTIONS
1. {actions[0]}
2. {actions[1]}
3. {actions[2]}

NEXRA MODE
{mode.upper()} — {philosophy}

FINAL NOTE
{recommendation}
""".strip()
