from typing import Optional, List, Dict
from datetime import datetime
from sqlmodel import SQLModel, Field
from sqlalchemy import Column, JSON, Text


class Idea(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

    text: str = Field(index=True)
    text_length: int

    decision_score: int = Field(index=True)
    verdict: str = Field(index=True)
    confidence: int = Field(default=0, index=True)

    assumptions: List[str] = Field(sa_column=Column(JSON), default_factory=list)
    market_analysis: str = ""
    competitors: List[str] = Field(sa_column=Column(JSON), default_factory=list)
    risks: List[str] = Field(sa_column=Column(JSON), default_factory=list)
    roadmap: List[str] = Field(sa_column=Column(JSON), default_factory=list)

    rule_breakdown: Dict[str, int] = Field(sa_column=Column(JSON), default_factory=dict)

    # 🔥 ADD THIS
    nexra_output: Optional[str] = Field(default="", sa_column=Column(Text))

    created_at: datetime = Field(default_factory=datetime.utcnow)
