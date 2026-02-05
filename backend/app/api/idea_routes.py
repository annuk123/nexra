from fastapi import APIRouter
from app.domain.nexra_narrator import narrate_idea

router = APIRouter()

@router.post("/analyze")
def analyze_idea(payload: dict):
    data = payload["analysis"]
    mode = payload.get("mode", "balanced")

    output = narrate_idea(data, mode)
    return {"nexra_output": output}