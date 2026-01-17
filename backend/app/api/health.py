# app/api/health.py
from fastapi import APIRouter

router = APIRouter()

@router.get("/health")
def health():
    return {"status": "ok"}

@router.get("/")
def root():
    return {"message": "Nexra backend running"}
# Note: The above code is moved from backend/app/main.py to backend/app/api/health.py