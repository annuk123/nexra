from fastapi import APIRouter, Depends, Query
from pydantic import BaseModel
from sqlmodel import Session
from typing import List

from app.db.database import get_session
from app.domain.ideas.usecases import (
    analyze_idea_text,
    list_ideas_with_count,
    get_idea_by_id,
)

router = APIRouter(prefix="/ideas")

# ---------- Request models ----------
class IdeaIn(BaseModel):
    text: str

# ---------- Response models ----------
# class IdeaOut(BaseModel):
#     id: int
#     text_length: int
#     score: int
#     reasoning: str | None = None

class IdeaOut(BaseModel):
    id: int
    text: str
    text_length: int
    decision_score: int
    verdict: str
    assumptions: list[str]
    market_analysis: str
    competitors: list[str]
    risks: list[str]
    roadmap: list[str]
    created_at: str

class IdeasPage(BaseModel):
    total: int
    items: List[IdeaOut]

# ---------- Routes ----------
@router.get("", response_model=IdeasPage)
def get_ideas(
    session: Session = Depends(get_session),
    limit: int = Query(10, ge=1, le=100),
    offset: int = Query(0, ge=0),
):
    return list_ideas_with_count(session, limit=limit, offset=offset)

@router.post("/analyze", response_model=IdeaOut)
def analyze_idea(
    payload: IdeaIn,
    session: Session = Depends(get_session),
):
    return analyze_idea_text(payload.text, session)

@router.get("/{idea_id}", response_model=IdeaOut)
def get_idea(
    idea_id: int,
    session: Session = Depends(get_session),
):
    return get_idea_by_id(idea_id, session)
