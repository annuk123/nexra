from typing import Optional, List, Dict
from datetime import datetime
from sqlmodel import SQLModel, Field
from sqlalchemy import Column, JSON


class Idea(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

    # Original text
    text: str = Field(index=True)
    text_length: int

    # Core Nexra Decision Engine fields
    decision_score: int = Field(index=True)
    verdict: str = Field(index=True)
    confidence: int = Field(default=0, index=True)

    # Structured reasoning (JSON)
    assumptions: List[str] = Field(sa_column=Column(JSON), default_factory=list)
    market_analysis: str = ""
    competitors: List[str] = Field(sa_column=Column(JSON), default_factory=list)
    risks: List[str] = Field(sa_column=Column(JSON), default_factory=list)
    roadmap: List[str] = Field(sa_column=Column(JSON), default_factory=list)

    # Decision engine breakdown
    rule_breakdown: Dict[str, int] = Field(sa_column=Column(JSON), default_factory=dict)

    # Metadata
    created_at: datetime = Field(default_factory=datetime.utcnow)
