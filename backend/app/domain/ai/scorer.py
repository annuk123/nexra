from typing import TypedDict

class AIScore(TypedDict):
    score: int
    reasoning: str


KEYWORDS = [
    "ai", "automation", "saas", "startup", "tool",
    "platform", "analyze", "analytics", "workflow",
    "productivity", "business", "developer", "api"
]

PROBLEM_VERBS = [
    "solve", "help", "improve", "automate",
    "reduce", "increase", "optimize", "simplify"
]


def score_idea_with_ai(text: str) -> AIScore:
    text_lower = text.lower()
    length = len(text.split())

    score = 0
    reasons = []

    # 1️⃣ Length / clarity
    if 8 <= length <= 25:
        score += 25
        reasons.append("Clear and concise idea description")
    elif length < 8:
        score += 10
        reasons.append("Idea is understandable but lacks detail")
    else:
        score += 15
        reasons.append("Idea is detailed but could be more concise")

    # 2️⃣ Keyword relevance
    keyword_hits = sum(1 for k in KEYWORDS if k in text_lower)
    keyword_score = min(keyword_hits * 5, 25)
    score += keyword_score

    if keyword_hits > 0:
        reasons.append(f"Uses {keyword_hits} relevant tech/business keywords")

    # 3️⃣ Problem–solution signal
    verb_hits = sum(1 for v in PROBLEM_VERBS if v in text_lower)
    verb_score = min(verb_hits * 10, 30)
    score += verb_score

    if verb_hits > 0:
        reasons.append("Clearly mentions a problem or solution")

    # 4️⃣ Normalize
    score = min(score, 100)

    if score >= 80:
        verdict = "Strong idea with clear direction"
    elif score >= 50:
        verdict = "Promising idea but needs refinement"
    else:
        verdict = "Idea is early-stage and needs more clarity"

    reasoning = verdict + ". " + " | ".join(reasons)

    return {
        "score": score,
        "reasoning": reasoning,
    }
