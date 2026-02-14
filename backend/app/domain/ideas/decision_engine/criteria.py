from dataclasses import dataclass
from typing import Optional, List

@dataclass(frozen=True)
class Criterion:
    key: str
    label: str

    # What Nexra is judging
    core_question: str

    # What this dimension really means
    intent: str

    # How Nexra thinks about this dimension
    evaluation_lens: str

    # Scoring
    max_score: int

    # Can AI override rules here?
    ai_override_allowed: bool = True

    # Does failure here block proceeding?
    is_blocking: bool = False


CRITERIA = {
    "market": Criterion(
        key="market",
        label="Market Reality",
        core_question="Is there a real, urgent market pulling this product into existence?",
        intent=(
            "Determine whether the problem exists in the market today, "
            "with identifiable buyers who feel the pain strongly enough to pay."
        ),
        evaluation_lens=(
            "Looks for specificity, buyer clarity, and urgency. "
            "Penalizes trend-chasing, buzzwords, and hypothetical markets."
        ),
        max_score=20,
        is_blocking=True
    ),

    "founder_fit": Criterion(
        key="founder_fit",
        label="Founder–Problem Fit",
        core_question="Why are *you* the right person to solve this problem?",
        intent=(
            "Assess the founder’s understanding, proximity, and credibility "
            "in the problem space."
        ),
        evaluation_lens=(
            "Uses clarity of problem articulation as a proxy for lived experience "
            "or deep domain understanding."
        ),
        max_score=20
    ),

    "execution": Criterion(
        key="execution",
        label="Execution Feasibility",
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
        is_blocking=True
    ),

    "moat": Criterion(
        key="moat",
        label="Defensibility",
        core_question="If this works, what stops others from copying it?",
        intent=(
            "Determine whether the idea can develop defensibility over time "
            "beyond features."
        ),
        evaluation_lens=(
            "Looks for data gravity, workflows, switching costs, or compounding advantages. "
            "Accepts weak moats early, but flags long-term risk."
        ),
        max_score=20
    ),

    "revenue": Criterion(
        key="revenue",
        label="Revenue Clarity",
        core_question="Who pays, for what, and why now?",
        intent=(
            "Assess whether monetization is realistic and aligned with the user and value."
        ),
        evaluation_lens=(
            "Penalizes ideas that postpone revenue thinking or rely on vague scale assumptions."
        ),
        max_score=20,
        is_blocking=True
    )
}

