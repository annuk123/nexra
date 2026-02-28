# from sqlmodel import Session
# from app.db.models import Idea
# from app.domain.ai.scorer import score_idea_with_ai


# def analyze_idea_text(text: str, session: Session) -> dict:
#     ai_result = score_idea_with_ai(text)

#     idea = Idea(
#         text=text,
#         text_length=len(text),
#         score=ai_result["score"],
#     )

#     session.add(idea)
#     session.commit()
#     session.refresh(idea)

#     return {
#         "id": idea.id,
#         "text_length": idea.text_length,
#         "score": idea.score,
#         "reasoning": ai_result["reasoning"],
#     }


# from sqlmodel import Session, select
# from app.db.models import Idea

# def list_ideas(session: Session, limit: int = 10, offset: int = 0) -> list[dict]:
#     statement = (
#         select(Idea)
#         .offset(offset)
#         .limit(limit)
#         .order_by(Idea.id.desc())
#     )

#     ideas = session.exec(statement).all()

#     return [
#         {
#             "id": idea.id,
#             "text_length": idea.text_length,
#             "score": idea.score,
#         }
#         for idea in ideas
#     ]


# from sqlmodel import Session, select
# from fastapi import HTTPException
# from app.db.models import Idea

# def get_idea_by_id(idea_id: int, session: Session) -> dict:
#     statement = select(Idea).where(Idea.id == idea_id)
#     idea = session.exec(statement).first()

#     if idea is None:
#         raise HTTPException(status_code=404, detail="Idea not found")

#     return {
#         "id": idea.id,
#         "text_length": idea.text_length,
#         "score": idea.score,
#     }


# from sqlmodel import Session, select
# from app.db.models import Idea
# from sqlalchemy import func


# def list_ideas_with_count(
#     session: Session,
#     limit: int = 10,
#     offset: int = 0,
# ) -> dict:
#     total = session.exec(
#         select(func.count()).select_from(Idea)
#     ).one()

#     statement = (
#         select(Idea)
#         .order_by(Idea.id.desc())
#         .offset(offset)
#         .limit(limit)
#     )

#     ideas = session.exec(statement).all()

#     return {
#         "total": total,
#         "items": [
#             {
#                 "id": idea.id,
#                 "text_length": idea.text_length,
#                 "score": idea.score,
#             }
#             for idea in ideas
#         ],
#     }


from dataclasses import asdict
from sqlmodel import Session, select
from sqlalchemy import func
from fastapi import HTTPException

from app.db.models import Idea
from app.domain.ideas.decision_engine.engine import evaluate_idea
from app.domain.reasoning.narrator import narrate_idea  # optional

# -----------------------------
# Analyze & Save Idea
# -----------------------------


def analyze_idea_text(text: str, session: Session) -> dict:

    # 1. Authoritative decision
    result = evaluate_idea(text)
    assumptions_payload = [asdict(a) for a in result.assumptions]

    # 2. Narration layer
    narration = narrate_idea(result, mode="balanced")

    # 3. Persist snapshot
    idea = Idea(
        text=text,
        text_length=len(text),
        decision_score=result.score,
        verdict=result.verdict,
        confidence=result.confidence,
        assumptions=assumptions_payload,
        weakest_link=result?.weakest_link?.summary || "—",
        rule_breakdown=result.scoring_breakdown,
        signals=result.structural_scores,
        primary_weakness=result.primary_weakness,
        weakest_dimension=result.weakest_link.get("dimension"),
        nexra_output=narration,
    )

    session.add(idea)
    session.commit()
    session.refresh(idea)

    # 4. Return flat response matching IdeaOut
    return _idea_to_dict(idea)
# -----------------------------
# Get Single Idea
# -----------------------------
def get_idea_by_id(idea_id: int, session: Session) -> dict:
    statement = select(Idea).where(Idea.id == idea_id)
    idea = session.exec(statement).first()

    if not idea:
        raise HTTPException(status_code=404, detail="Idea not found")

    return _idea_to_dict(idea)


# -----------------------------
# List Ideas (Paginated)
# -----------------------------
def list_ideas_with_count(
    session: Session,
    limit: int = 10,
    offset: int = 0,
) -> dict:

    total = session.exec(
        select(func.count()).select_from(Idea)
    ).one()

    statement = (
        select(Idea)
        .order_by(Idea.created_at.desc())
        .offset(offset)
        .limit(limit)
    )

    ideas = session.exec(statement).all()

    return {
        "total": total,
        "items": [_idea_to_dict(i) for i in ideas],
    }


# -----------------------------
# Internal Helper Serializer
# -----------------------------
def _idea_to_dict(idea: Idea) -> dict:
    return {
        "id": idea.id,
        "text": idea.text,
        "text_length": idea.text_length,
        "decision_score": idea.decision_score,
        "verdict": idea.verdict,
        "verdict_severity": idea.verdict_severity,
        "confidence": idea.confidence,
        "weakest_link": idea.weakest_link,
        "assumptions": idea.assumptions,
        "rule_breakdown": idea.rule_breakdown,
        "signals": idea.signals,
        "nexra_output": idea.nexra_output,
        "engine_version": idea.engine_version,
        "created_at": idea.created_at,
    }