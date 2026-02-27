from dataclasses import dataclass, asdict
from typing import Dict, List, Any, Optional


@dataclass(frozen=True)
class Assumption:
    dimension: str
    assumption: str
    risk_level: str
    reason: str
    challenge_prompt: str
    assumption_confidence: float | None = None
    severity_score: float | None = None
    dimension_weight: float | None = None
    score: float | None = None
    max_score: float | None = None
    score_ratio: float | None = None

    def get(self, key: str, default: Any = None) -> Any:
        return getattr(self, key, default)
    
@dataclass(frozen=True)
class ReasoningObject:

    # Core decision
    verdict: str
    score: int
    confidence: int

    # Structural reasoning
    primary_weakness: str
    core_risk: str

    # Weakest link
    weakest_link: Dict[str, Any]

    # Normalized structural signals
    structural_scores: Dict[str, int]

    # Structured assumptions
    assumptions: List[Assumption]

    # Critical founder validation question
    critical_question: str

    # Full scoring breakdown
    scoring_breakdown: Dict[str, Any]

    # Optional traceability
    reasoning_trace: Optional[List[str]] = None

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)
