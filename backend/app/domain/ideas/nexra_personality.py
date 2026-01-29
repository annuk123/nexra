PERSONALITY_RULES = {
    "safe": {
        "tone": "cautious",
        "recommendation": "Do not build yet. Learn first.",
        "actions": [
            "Talk to 15 users and validate willingness to pay",
            "Prototype manually before writing code",
            "Kill if no strong signal"
        ],
        "philosophy": "Bias toward caution. Protect founder time."
    },

    "balanced": {
        "tone": "pragmatic",
        "recommendation": "Build fast and measure traction.",
        "actions": [
            "Interview users to validate pain",
            "Build a focused MVP",
            "Test distribution on Twitter / Indie Hackers"
        ],
        "philosophy": "Validate and execute in parallel."
    },

    "aggressive": {
        "tone": "brutal",
        "recommendation": "Go aggressive. High risk, high upside.",
        "actions": [
            "Ship in 7 days",
            "Push distribution hard",
            "Iterate in public"
        ],
        "philosophy": "Speed > perfection. Kill or scale fast."
    }
}


def get_personality(mode: str):
    return PERSONALITY_RULES.get(mode, PERSONALITY_RULES["balanced"])
