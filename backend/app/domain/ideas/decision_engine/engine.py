from .scorer import score_text
from .weakest_link import find_weakest_link
from .assumptions import extract_assumptions
from .confidence import calculate_confidence
from .verdict import decide_verdict
from .criteria import CRITERIA

from app.domain.reasoning.schema import ReasoningObject, Assumption


def evaluate_idea(idea_text: str) -> ReasoningObject:

    # Step 1: Score idea
    scoring_result = score_text(idea_text)

    scores = scoring_result["scores"]
    breakdown = scoring_result["breakdown"]
    red_flags = scoring_result["red_flags"]
    total_score = scoring_result["total_score"]
    blocking_failures = scoring_result.get("blocking_failures", [])

    # Step 2: Identify weakest link
    weakest_link = find_weakest_link(scores) or {
        "dimension": "unknown",
        "summary": "Unable to determine structural weakness.",
        "impact": "Insufficient structural signals."
    }

    # Step 3: Extract assumptions (dicts)
    assumptions = extract_assumptions(scores) or []

    # Step 4: Calculate confidence
    confidence = calculate_confidence(
        scores=scores,
        red_flags=red_flags,
        blocking_failures=blocking_failures
    )

    # Step 5: Determine verdict
    verdict_result = decide_verdict(
        total_score=total_score,
        confidence=confidence,
        weakest_dimension=weakest_link["dimension"],
        red_flags=red_flags,
        blocking_failures=blocking_failures
    )

    # Step 6: Normalize signals (percentage form)
    signals = {
        key: int((scores.get(key, 0) / CRITERIA[key].max_score) * 100)
        for key in CRITERIA
    }

    # Step 7: Critical question
    critical_question = (
        assumptions[0].get("challenge_prompt")
        if assumptions and assumptions[0].get("challenge_prompt")
        else "Validate weakest structural assumption."
    )

    # Step 8: Reasoning trace
    reasoning_trace = [
        f"Weakest dimension: {weakest_link['dimension']}",
        f"Total score: {total_score}/100",
        f"Confidence: {confidence}/100",
        f"Red flags: {red_flags}"
    ]

    # Step 9: Convert assumption dicts → Assumption objects
    assumptions_objects = [
        Assumption(**a) for a in assumptions
    ]

    # Step 10: Return structured object
    return ReasoningObject(
        verdict=verdict_result["verdict"],
        score=total_score,
        confidence=confidence,
        primary_weakness=weakest_link["summary"],
        core_risk=weakest_link["impact"],
        weakest_link=weakest_link,
        structural_scores=signals,
        assumptions=assumptions_objects,
        critical_question=critical_question,
        scoring_breakdown=breakdown,
        reasoning_trace=reasoning_trace
    )