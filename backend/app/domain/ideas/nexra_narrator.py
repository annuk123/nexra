from app.domain.ideas.verdict_mapper import map_verdict
from app.domain.ideas.nexra_personality import get_personality



def narrate_idea(data: dict, mode: str) -> str:
    score = data["decision_score"]
    verdict = map_verdict(score)

    if score < 30:
        signal = "Market urgency is weak. Differentiation is unclear."
    elif score < 70:
        signal = "There is signal, but distribution and positioning are risky."
    else:
        signal = "Strong signal. Market pull appears real."

    personality = get_personality(mode) or get_personality("balanced")
    actions = personality["actions"]
    recommendation = personality["recommendation"]
    philosophy = personality["philosophy"]

    risks = data.get("risks", [])[:3]
    risks_text = "\n".join([f"- {r}" for r in risks]) or "- No major risks detected"

    return f"""Decision: {verdict} ({score}/100)

Signal:
{signal}

Key Risks:
{risks_text}

Paths Forward:
1) {actions[0]}
2) {actions[1]}
3) {actions[2]}

Recommendation:
{recommendation}

Mode:
{mode.upper()} — {philosophy}

Context:
This is Nexra v1. You can validate startup ideas here.
Conversation, follow-ups, and co-founder mode are coming in Nexra v2.
Join the waitlist to unlock Nexra v2.