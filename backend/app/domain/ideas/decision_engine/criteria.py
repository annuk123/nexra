from dataclasses import dataclass
from typing import Optional


@dataclass(frozen=True)
class Criterion:

    key: str

    label: str

    description: str

    core_question: str

    intent: str

    evaluation_lens: str

    max_score: int

    priority: int

    severity_weight: float = 1.0

    confidence_weight: float = 1.0

    failure_threshold: float = 0.4

    evidence_required: bool = False

    evaluation_type: str = "hybrid"

    stage_relevance: str = "all"

    failure_mode: Optional[str] = None

    ai_override_allowed: bool = False

    is_blocking: bool = False  
CRITERIA = {

"market": Criterion(
    key="market",

    label="Market Reality",

    description="Evaluates whether real, urgent demand exists",

    core_question="Is there a real, urgent market pulling this product?",

    intent="Determine whether real buyers urgently need this solution",

    evaluation_lens="Penalizes vague, hypothetical, or trend-driven markets",

    max_score=20,

    priority=1,

    severity_weight=1.5,

    confidence_weight=1.5,

    failure_threshold=0.5,

    evidence_required=True,

    evaluation_type="hybrid",

    stage_relevance="all",

    is_blocking=True
),


    "founder_fit": Criterion(
        key="founder_fit",
        label="Founder–Problem Fit",

        description="Evaluates founder understanding and capability",

        core_question="Why are *you* the right person to solve this problem?",

        intent=(
            "Assess the founder’s understanding, proximity, and credibility "
            "in the problem space."
        ),

        evaluation_lens=(
            "Uses clarity of problem articulation as a proxy for lived experience "
            "or deep domain understanding."
        ),

        max_score=20,

        priority=4,

        severity_weight=1.1
    ),


    "execution": Criterion(
        key="execution",
        label="Execution Feasibility",

        description="Evaluates feasibility of building and shipping",

        core_question="Can this be realistically built and shipped with limited resources?",

        intent=(
            "Evaluate technical, operational, and regulatory difficulty "
            "relative to an early-stage team."
        ),

        evaluation_lens=(
            "Penalizes heavy infrastructure, long feedback loops, "
            "and regulated or capital-intensive execution paths."
        ),

        max_score=20,

        priority=2,

        severity_weight=1.4,

        is_blocking=True
    ),


    "moat": Criterion(
        key="moat",
        label="Defensibility",

        description="Evaluates long-term defensibility potential",

        core_question="If this works, what stops others from copying it?",

        intent=(
            "Determine whether the idea can develop defensibility over time "
            "beyond features."
        ),

        evaluation_lens=(
            "Looks for data gravity, workflows, switching costs, or compounding advantages. "
            "Accepts weak moats early, but_attachment flags long-term risk."
        ),

        max_score=20,

        priority=5,

        severity_weight=0.9
    ),


    "revenue": Criterion(
        key="revenue",
        label="Revenue Clarity",

        description="Evaluates monetization clarity and buyer realism",

        core_question="Who pays, for what, and why now?",

        intent=(
            "Assess whether monetization is realistic and aligned with the user and value."
        ),

        evaluation_lens=(
            "Penalizes ideas that postpone revenue thinking or rely on vague scale assumptions."
        ),

        max_score=20,

        priority=3,

        severity_weight=1.4,

        is_blocking=True
    ),


    "distribution": Criterion(
        key="distribution",
        label="Distribution Advantage",

        description= "Evaluates ability to acquire initial users",
        core_question="How will the first 100 users realistically be acquired?",

        intent="Assess Whether founder has realistic path to users",

        evaluation_lens= "penalizes vague marketing plans",

        max_score=20,

        priority=2,

        severity_weight=1.5,

        confidence_weight=1.4,

        failure_threshold=0.4,

        evidence_required=True,

        is_blocking= True,
    ),
    
    "timing": Criterion(
        key="timing",

        label="Market Timing",

        description="Evaluates whether timing is favorable",

        core_question="why is now the right time for this idea?",

        intent="Assess timing advantage",

        evaluation_lens="Rewards techological or behavioral shifts",

        max_score=20,

        priority=3,

        severity_weight=1.2,

        confidence_weight=1.1
    ),

    "founder_speed": Criterion(
        key="founder_speed",

        label="Execution speed",

        description="Evaluates founder execution velocity",

        core_question="How quickly is the founder executing?",

        intent="Detect execution momentum",

        evaluation_lens="Rewards evidence of rapid progress",

        max_score=20,

        priority=2,

        severity_weight=1.4,

        confidence_weight=1.3,

        evidence_required=True
    )
}