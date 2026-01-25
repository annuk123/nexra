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



from typing import Dict, List
from sqlmodel import Session, select
from sqlalchemy import func
from fastapi import HTTPException

from app.db.models import Idea
from app.domain.ai.scorer import score_idea_with_ai

from app.domain.ideas.decision_engine import nexra_decision_engine


# -----------------------------
# Analyze & Save Idea
# -----------------------------

def analyze_idea_text(text: str, session: Session) -> dict:
    """
    Core Nexra pipeline:
    1. Run Hybrid Decision Engine (rules + AI)
    2. Save structured analysis to DB
    3. Return API-safe response
    """

    # Run Nexra Hybrid Brain
    result = nexra_decision_engine(text)

    # Persist to DB
    idea = Idea(
        text=text,
        text_length=len(text),
        decision_score=result["decision_score"],
        verdict=result["verdict"],
        assumptions=result["assumptions"],
        market_analysis=result["market_analysis"],
        competitors=result["competitors"],
        risks=result["risks"],
        roadmap=result["roadmap"],
        
    )

    session.add(idea)
    session.commit()
    session.refresh(idea)

    # Return structured API response
    return {
        "id": idea.id,
        "text": idea.text,
         "text_length": idea.text_length,
        "decision_score": idea.decision_score,
        "verdict": idea.verdict,
        "assumptions": idea.assumptions,
        "market_analysis": idea.market_analysis,
        "competitors": idea.competitors,
        "risks": idea.risks,
        "roadmap": idea.roadmap,
         "rule_breakdown": result["rule_breakdown"],
        "created_at": idea.created_at.isoformat(),
    }

# -----------------------------
# Get Single Idea
# -----------------------------
def get_idea_by_id(idea_id: int, session: Session) -> Dict:
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
) -> Dict:

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
def _idea_to_dict(idea: Idea) -> Dict:
    return {
        "id": idea.id,
        "text": idea.text,
         "text_length": idea.text_length,
        "decision_score": idea.decision_score,
        "verdict": idea.verdict,
        "assumptions": idea.assumptions,
        "market_analysis": idea.market_analysis,
        "competitors": idea.competitors,
        "risks": idea.risks,
        "roadmap": idea.roadmap,
        "rule_breakdown": result["rule_breakdown"],
        "created_at": idea.created_at.isoformat(),
    }
