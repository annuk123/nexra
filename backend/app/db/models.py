from typing import Optional, List, Dict, Any

from datetime import datetime
import uuid

from sqlmodel import SQLModel, Field
from sqlalchemy import Column, JSON, Text
from sqlalchemy.dialects.postgresql import UUID



class User(SQLModel, table=True):
    __tablename__ = "users"

    id: uuid.UUID = Field(
        default_factory=uuid.uuid4,
        sa_column=Column(UUID(as_uuid=True), primary_key=True)
    )

    email: Optional[str] = Field(default=None, index=True, unique=True)
    provider: str = Field(default="local", index=True)
    provider_id: Optional[str] = Field(default=None, index=True)

    is_active: bool = Field(default=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)

    
class Idea(SQLModel, table=True):
    __tablename__ = "ideas"

    id: Optional[int] = Field(default=None, primary_key=True)

    # -----------------
    # Input
    # -----------------
    text: str = Field(
        sa_column=Column(Text, index=True)
    )
    text_length: int

    # -----------------
    # Decision summary (V2)
    # -----------------
    decision_score: int = Field(index=True)  # total_score (0–100)
    verdict: str = Field(index=True)
    confidence: int = Field(index=True)

    signals: Dict[str, Any] = Field(
        sa_column=Column(JSON),
        default_factory=dict
    )

    # -----------------
    # Core reasoning artifacts (V2)
    # -----------------
    assumptions: List[Dict[str, Any]] = Field(
        sa_column=Column(JSON),
        default_factory=list
    )

    weakest_link: Dict[str, Any] = Field(
        sa_column=Column(JSON),
        default_factory=dict
    )

    rule_breakdown: Dict[str, Dict[str, Any]] = Field(
        sa_column=Column(JSON),
        default_factory=dict
    )

    # -----------------
    # Presentation-only
    # -----------------
    nexra_output: Optional[str] = Field(
        default="",
        sa_column=Column(Text)
    )

    # -----------------
    # Metadata
    # -----------------
    created_at: datetime = Field(default_factory=datetime.utcnow)