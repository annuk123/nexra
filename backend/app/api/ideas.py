from fastapi import APIRouter, Depends, Query
from pydantic import BaseModel
from sqlmodel import Session
from typing import List, Dict, Literal
from datetime import datetime
from app.db.database import get_session
from app.domain.ideas.usecases import (
    analyze_idea_text,
    list_ideas_with_count,
    get_idea_by_id,
)

router = APIRouter(prefix="/ideas", tags=["Ideas"])



class IdeaIn(BaseModel):
    text: str



# ============================
# Response Models (V2)
# ============================

class AssumptionOut(BaseModel):
    dimension: str
    assumption: str
    risk_level: Literal["low", "medium", "high", "critical"]
    reason: str
    assumption_confidence: float | None = None
    confidence_weight: float | None = None
    challenge_prompt: str
    severity_score: float | None = None
    dimension_weight: float | None = None
    score: float | None = None
    max_score: float | None = None
    score_ratio: float | None = None


class WeakestLinkOut(BaseModel):
    dimension: str
    summary: str
    impact: str
    score: int | None = None
    urgency: str | None = None
    recommended_action: str | None = None

class RuleBreakdownItemOut(BaseModel):
    score: int
    signals: List[str]
    penalties: List[str]
    red_flags: int
    blocking_failure: bool

class SignalOut(BaseModel):
    market: int = 0
    founder_fit: int = 0
    execution: int = 0
    moat: int = 0
    revenue: int = 0
    distribution: int = 0
    timing: int = 0
    founder_speed: int = 0
    competition: int = 0


class IdeaOut(BaseModel):

    id: int
    text: str
    text_length: int

    decision_score: int

    verdict: str
    verdict_severity: str | None = None

    confidence: int

    weakest_link: WeakestLinkOut

    assumptions: List[AssumptionOut]   # ✅ FIXED

    rule_breakdown: Dict[str, RuleBreakdownItemOut]

    signals: SignalOut                 # ✅ now complete

    nexra_output: str

    engine_version: str | None = None

    created_at: datetime
    
class IdeasPage(BaseModel):
    total: int
    items: List[IdeaOut]

# =====================================================
# Routes
# =====================================================

@router.post(
    "/analyze",
    response_model=IdeaOut,
    summary="Analyze a startup idea",
)
def analyze_idea(
    payload: IdeaIn,
    session: Session = Depends(get_session),
):
    """
    Analyze a startup idea using Nexra Decision Engine v2.
    """
    return analyze_idea_text(payload.text, session)


@router.get(
    "",
    response_model=IdeasPage,
    summary="List analyzed ideas (paginated)",
)
def get_ideas(
    session: Session = Depends(get_session),
    limit: int = Query(10, ge=1, le=100),
    offset: int = Query(0, ge=0),
):
    """
    Fetch previously analyzed ideas.
    """
    return list_ideas_with_count(
        session=session,
        limit=limit,
        offset=offset,
    )


@router.get(
    "/{idea_id}",
    response_model=IdeaOut,
    summary="Get a single analyzed idea",
)
def get_idea(
    idea_id: int,
    session: Session = Depends(get_session),
):
    """
    Fetch a single analyzed idea by ID.
    """
    return get_idea_by_id(idea_id, session)
