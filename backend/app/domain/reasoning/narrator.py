from openai import OpenAI
import os
from app.domain.reasoning.personality import build_nexra_system_prompt
import time
from dotenv import load_dotenv
from app.domain.reasoning.schema import ReasoningObject

# Load environment variables
load_dotenv()

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Rate limit guard (5 requests/minute safe)
LAST_CALL = 0


def rate_limit_guard():
    global LAST_CALL
    now = time.time()

    if now - LAST_CALL < 12:
        time.sleep(12 - (now - LAST_CALL))

    LAST_CALL = time.time()


# -----------------------------
# BASE NARRATOR (Deterministic)
# -----------------------------
def narrate_idea_base(result: ReasoningObject, mode: str = "balanced") -> str:
    """
    Deterministic explanation layer.

    Converts structured decision output into clear reasoning.
    No storytelling. No emotional tone. No chatbot behavior.
    """

    verdict = result.verdict
    confidence = result.confidence
    total_score = result.score
    weakest = getattr(result, "weakest_link", {})
    weakest_summary = weakest.get(
        "summary",
        "No dominant structural weakness identified."
    )

    weakest_impact = weakest.get(
        "impact",
        "No single factor currently dominates execution risk."
    )

    assumptions = result.assumptions or []

    high_risk = [
        a for a in assumptions
        if a.get("risk_level") in ("high", "critical")
    ]

    if high_risk:
        assumptions_text = "\n".join(
            f"- {a.get('assumption', 'Unspecified assumption')}"
            for a in high_risk[:3]
        )
    else:
        assumptions_text = "- No critical assumptions detected at this stage."

    # Confidence interpretation
    if confidence >= 75:
        confidence_note = (
            "The structural signals are stable and internally consistent."
        )
    elif confidence >= 55:
        confidence_note = (
            "Some structural elements remain uncertain and require validation."
        )
    else:
        confidence_note = (
            "The current assessment relies on fragile or incomplete assumptions."
        )

    return f"""
Nexra's structural assessment:

Primary weakness:
{weakest_summary}

Structural consequence:
{weakest_impact}

Unresolved assumptions:
{assumptions_text}

Confidence level: {confidence}%
{confidence_note}

Conclusion:
VERDICT: {verdict}
Decision Score: {total_score}/100
""".strip()


# -----------------------------
# AI AUGMENTATION LAYER
# -----------------------------
def narrate_idea_ai(
    result: ReasoningObject,
    base_text: str,
    mode: str = "balanced",
    founder_memory: str = ""
) -> str:

    verdict = result.verdict
    score = result.score
    confidence = result.confidence

    weakest = result.weakest_link or {}
    weakest_summary = weakest.get("summary", "")
    weakest_impact = weakest.get("impact", "")

    prompt = f"""
You are Nexra's reasoning narrator.

The decision engine has already produced the authoritative result.
You cannot modify the verdict, score, or confidence.

Decision Data:
Verdict: {verdict}
Score: {score}
Confidence: {confidence}
Primary Weakness: {weakest_summary}
Structural Impact: {weakest_impact}

TASK:

Add an INTERPRETATION section (3–5 concise analytical sentences).

Describe:

• Why this weakness structurally matters.
• The specific execution chain reaction if it remains unresolved.
• What breaks first (retention, revenue, iteration speed, etc.).
• What structural shift would change the outcome.

STRICT RULES:

- Do NOT modify or reinterpret the verdict.
- Do NOT introduce new weaknesses.
- Do NOT restate the base explanation.
- No motivational tone.
- Maximum 5 sentences.
- Mechanism-focused.
- Output ONLY:

INTERPRETATION:
<your response>
"""

    try:
        rate_limit_guard()

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            temperature=0.2,
            max_tokens=250,   # Hard cap for cost control
            messages=[
                {
                    "role": "system",
                    "content": build_nexra_system_prompt(mode)
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        ai_text = response.choices[0].message.content.strip()

        # -------- SAFETY VALIDATION --------

        if not ai_text.startswith("INTERPRETATION:"):
            return base_text

        # Prevent AI from sneaking in verdict override
        blocked_terms = ["VERDICT", "SCORE", "CONFIDENCE"]
        if any(term in ai_text.upper() for term in blocked_terms):
         return base_text

        return base_text + "\n\n" + ai_text

    except Exception as e:
        print("OpenAI error:", e)
        return base_text

def generate_challenge_question(result: ReasoningObject) -> str:
    """
    Generates one precise structural challenge question.

    Based on weakest link or highest risk assumption.
    """

    weakest = result.weakest_link or {}
    weakest_dimension = weakest.get("dimension", "")

    assumptions = result.assumptions or []

    high_risk = [
        a for a in assumptions
        if a.get("risk_level") in ("high", "critical")
    ]

    if high_risk:
        challenge = high_risk[0].get("challenge_prompt")
        if challenge:
            return challenge

    fallback_questions = {
        "market": "What concrete evidence confirms that users urgently need this solution?",
        "distribution": "How will the first 100 real users discover and adopt this product?",
        "competition": "Why would users switch from existing alternatives to this solution?",
        "revenue": "What specific event triggers a user to pay for this product?",
        "founder_fit": "What unique advantage allows you to execute this better than others?",
    }

    return fallback_questions.get(
        weakest_dimension,
        "What critical assumption must be validated before committing further execution?"
    )

# -----------------------------
# FINAL NARRATOR ENTRY POINT
# -----------------------------
def narrate_idea(
    result: ReasoningObject,
    mode: str = "balanced",
) -> str:

    # Use ReasoningObject directly (NO dict conversion)

    base = narrate_idea_base(result, mode)

    challenge = generate_challenge_question(result)

    base_with_question = base + "\n\nCRITICAL QUESTION:\n" + challenge

    enhanced = narrate_idea_ai(
        result,
        base_with_question,
        mode,
    )

    return enhanced 