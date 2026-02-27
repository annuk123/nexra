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
    # User association (V3 memory)
    # -----------------

    user_id: Optional[uuid.UUID] = Field(
        default=None,
        foreign_key="users.id",
        index=True
    )

    # -----------------
    # Input
    # -----------------

    text: str = Field(
        sa_column=Column(Text, index=True)
    )

    text_length: int

    # -----------------
    # Decision summary
    # -----------------

    decision_score: int = Field(index=True)

    verdict: str = Field(index=True)

    verdict_severity: Optional[str] = Field(default=None, index=True)

    confidence: int = Field(index=True)

    engine_version: str = Field(default="v2", index=True)

    # -----------------
    # Structural signals
    # -----------------

    signals: Dict[str, int] = Field(
    sa_column=Column(JSON),
    default_factory=dict
    )

    weakest_dimension: Optional[str] = Field(default=None, index=True)

    primary_weakness: Optional[str] = Field(default=None)

    weakest_link: Dict[str, Any] = Field(
        sa_column=Column(JSON),
        default_factory=dict
    )

    # -----------------
    # Reasoning artifacts
    # -----------------

    assumptions: List[Dict[str, Any]] = Field(
    sa_column=Column(JSON),
    default_factory=list
    )



    rule_breakdown: Dict[str, Dict[str, Any]] = Field(
        sa_column=Column(JSON),
        default_factory=dict
    )

    # -----------------
    # Presentation
    # -----------------

    nexra_output: Optional[str] = Field(
        default="",
        sa_column=Column(Text)
    )

    # -----------------
    # Metadata
    # -----------------

    created_at: datetime = Field(
        default_factory=datetime.utcnow,
        index=True
    )   