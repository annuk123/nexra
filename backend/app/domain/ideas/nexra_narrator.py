from app.domain.ideas.verdict_mapper import map_verdict
from app.domain.ideas.nexra_personality import get_personality


def narrate_idea(data: dict, mode: str) -> str:
    score = int(data["decision_score"])
    verdict = map_verdict(score)

    # Verdict-aligned signal framing
    if verdict == "KILL":
        signal = (
            "This idea does not clear the minimum decision threshold. "
            "Further execution is not justified in its current form."
        )
    elif verdict == "BLOCKED":
        signal = (
            "This idea is blocked by unresolved assumptions. "
            "Progress requires new evidence, not iteration."
        )
    else:  # PROCEED
        signal = (
            "This idea clears the minimum decision threshold. "
            "Execution is justified only within defined constraints."
        )

    personality = get_personality(mode)
    actions = personality["actions"]
    philosophy = personality["philosophy"]

    risks = data.get("risks", [])
    top_risks = risks[:3]

    risks_text = (
        "\n".join([f"- {r}" for r in top_risks])
        if top_risks
        else "- No critical failures identified at this stage"
    )

    # Verdict-dominant final note
    if verdict == "KILL":
        final_note = (
            "Do not invest further time. Redefine the problem entirely "
            "before considering another attempt."
        )
    elif verdict == "BLOCKED":
        final_note = (
            "This idea is paused. Advancement is denied until the conditions "
            "below are satisfied."
        )
    else:  # PROCEED
        final_note = personality["recommendation"]

    return f"""
DECISION
{verdict} ({score}/100)

SIGNAL
{signal}

KEY FAILURES
{risks_text}

REQUIRED CONDITIONS TO CONTINUE
1. {actions[0]}
2. {actions[1]}
3. {actions[2]}

DECISION POSTURE
{mode.upper()} — {philosophy}

NON-NEGOTIABLE NOTE
{final_note}
""".strip()
