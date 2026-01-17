from sqlmodel import Session
from app.db.models import Idea
from app.domain.ai.scorer import score_idea_with_ai


def analyze_idea_text(text: str, session: Session) -> dict:
    ai_result = score_idea_with_ai(text)

    idea = Idea(
        text=text,
        text_length=len(text),
        score=ai_result["score"],
    )

    session.add(idea)
    session.commit()
    session.refresh(idea)

    return {
        "id": idea.id,
        "text_length": idea.text_length,
        "score": idea.score,
        "reasoning": ai_result["reasoning"],
    }


from sqlmodel import Session, select
from app.db.models import Idea

def list_ideas(session: Session, limit: int = 10, offset: int = 0) -> list[dict]:
    statement = (
        select(Idea)
        .offset(offset)
        .limit(limit)
        .order_by(Idea.id.desc())
    )

    ideas = session.exec(statement).all()

    return [
        {
            "id": idea.id,
            "text_length": idea.text_length,
            "score": idea.score,
        }
        for idea in ideas
    ]


from sqlmodel import Session, select
from fastapi import HTTPException
from app.db.models import Idea

def get_idea_by_id(idea_id: int, session: Session) -> dict:
    statement = select(Idea).where(Idea.id == idea_id)
    idea = session.exec(statement).first()

    if idea is None:
        raise HTTPException(status_code=404, detail="Idea not found")

    return {
        "id": idea.id,
        "text_length": idea.text_length,
        "score": idea.score,
    }


from sqlmodel import Session, select
from app.db.models import Idea
from sqlalchemy import func


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
        .order_by(Idea.id.desc())
        .offset(offset)
        .limit(limit)
    )

    ideas = session.exec(statement).all()

    return {
        "total": total,
        "items": [
            {
                "id": idea.id,
                "text_length": idea.text_length,
                "score": idea.score,
            }
            for idea in ideas
        ],
    }
