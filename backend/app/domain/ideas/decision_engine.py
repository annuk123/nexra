from app.domain.ideas.framework import rule_based_framework
from app.domain.ai.scorer import score_idea_with_ai


def nexra_decision_engine(text: str):
    # Rule-based scoring
    rule = rule_based_framework(text)   # rule_score out of 30
    ai = score_idea_with_ai(text)        # decision_score out of 100

    # Normalize rule score to 100 scale
    rule_score_normalized = int((rule["rule_score"] / 30) * 100)

    # Hybrid weighted score
    FINAL_RULE_WEIGHT = 0.45
    FINAL_AI_WEIGHT = 0.55

    final_score = int(
        (rule_score_normalized * FINAL_RULE_WEIGHT) +
        (ai["decision_score"] * FINAL_AI_WEIGHT)
    )

    # Verdict system
    if final_score >= 70:
        verdict = "BUILD"
    elif final_score >= 40:
        verdict = "PIVOT"
    else:
        verdict = "KILL"

    # Confidence metric (how aligned AI + rules are)
    confidence = 100 - abs(rule_score_normalized - ai["decision_score"])

    return {
        "decision_score": final_score,
        "verdict": verdict,
        "confidence": confidence,  #  BIG UX feature

        # Explainability
        "rule_score": rule_score_normalized,
        "ai_score": ai["decision_score"],
        "rule_breakdown": rule["breakdown"],

        # AI insights
        "assumptions": ai["assumptions"],
        "market_analysis": ai["market_analysis"],
        "competitors": ai["competitors"],
        "risks": ai["risks"],
        "roadmap": ai["roadmap"],

        
    }
