from typing import Optional
from sqlmodel import SQLModel, Field

class Idea(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    text: str
    text_length: int
    score: int
