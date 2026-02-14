from .scorer import score_text
from .weakest_link import find_weakest_link
from .assumptions import extract_assumptions
from .confidence import calculate_confidence
from .verdict import decide_verdict


def evaluate_idea(idea_text: str) -> dict:
    scoring_result = score_text(idea_text)

    scores = scoring_result["scores"]
    breakdown = scoring_result["breakdown"]
    red_flags = scoring_result["red_flags"]

    weakest_link = find_weakest_link(scores)
    assumptions = extract_assumptions(scores)

    confidence = calculate_confidence(
        scores=scores,
        red_flags=red_flags
    )

    verdict_result = decide_verdict(
        scores=scores,
        confidence=confidence,
        weakest_link=weakest_link,
        red_flags=red_flags
    )

    total_score = sum(scores.values())

    # ADD THIS ↓↓↓ (convert score 0–10 → signal 0–100)
    signals = {
        "market": scores.get("market", 0) * 10,
        "competition": scores.get("competition", 0) * 10,
        "founder_fit": scores.get("founder", 0) * 10,
        "timing": scores.get("timing", 0) * 10,
        "distribution": scores.get("distribution", 0) * 10,
    }

    return {
        "scores": scores,
        "signals": signals,  # ← THIS FIXES YOUR SIGNAL PANEL

        "total_score": total_score,
        "confidence": confidence,

        "verdict": verdict_result["verdict"],
        "verdict_reason": verdict_result["reason"],

        "weakest_link": weakest_link,
        "assumptions": assumptions,

        "rule_breakdown": breakdown,
        "red_flags": red_flags
    }
