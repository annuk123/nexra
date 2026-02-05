# app/domain/ideas/decision_engine.py

from app.domain.ideas.framework import rule_based_framework
from app.domain.ai.scorer import score_idea_with_ai


def nexra_decision_engine(text: str) -> dict:
    """
    Hybrid decision engine combining rule-based heuristics and AI judgment.
    """

    # --- Rule-based evaluation (0–50) ---
    rule = rule_based_framework(text)
    rule_score_raw = rule.get("rule_score", 0)

    # Normalize to 0–100
    rule_score = int((rule_score_raw / 50) * 100)

    # --- AI evaluation (0–100) ---
    ai = score_idea_with_ai(text)
    ai_score = int(ai.get("decision_score", 0))

    # --- Weighted hybrid score ---
    RULE_WEIGHT = 0.45
    AI_WEIGHT = 0.55

    decision_score = int(
        (rule_score * RULE_WEIGHT) +
        (ai_score * AI_WEIGHT)
    )

    # --- Verdict mapping (single source of truth) ---
    if decision_score >= 70:
        verdict = "BUILD"
    elif decision_score >= 40:
        verdict = "PIVOT"
    else:
        verdict = "KILL"

    # --- Confidence = agreement between systems ---
    confidence = 100 - abs(rule_score - ai_score)
    confidence = max(10, min(100, confidence))

    # --- Canonical breakdown (used by UI) ---
    raw_breakdown = rule.get("breakdown", {})
    breakdown = {
        "market": raw_breakdown.get("market", 0),
        "execution": raw_breakdown.get("execution", 0),
        "founder_fit": raw_breakdown.get("founder_fit", 0),
        "moat": raw_breakdown.get("moat", 0),
        "revenue": raw_breakdown.get("revenue", 0),
    }

    # --- Decision trace (internal reasoning, V2-ready) ---
    trace = {
        "rule_score": rule_score,
        "ai_score": ai_score,
        "weights": {
            "rules": RULE_WEIGHT,
            "ai": AI_WEIGHT,
        },
        "agreement_gap": abs(rule_score - ai_score),
    }

    return {
        # Core outputs
        "decision_score": decision_score,
        "verdict": verdict,
        "confidence": confidence,

        # UI-facing structure
        "rule_breakdown": breakdown,
        "roadmap": ai.get("roadmap", []),
        "risks": ai.get("risks", []),

        # Analysis (optional display / expandable)
        "assumptions": ai.get("assumptions", []),
        "market_analysis": ai.get("market_analysis", ""),
        "competitors": ai.get("competitors", []),

        # Internal / future
        "trace": trace,
    }