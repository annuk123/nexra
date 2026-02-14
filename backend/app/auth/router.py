from fastapi import APIRouter, Depends
from sqlmodel import Session, select

from app.db.database import get_session
from app.db.models import User
from app.auth.jwt import create_access_token, create_refresh_token
from app.auth.dependencies import get_current_user
from app.auth.flags import AUTH_ENABLED

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/dev-login")
def dev_login(email: str, session: Session = Depends(get_session)):
    # Dev login works even if AUTH is disabled
    user = session.exec(
        select(User).where(User.email == email)
    ).first()

    if not user:
        user = User(email=email)
        session.add(user)
        session.commit()
        session.refresh(user)

    access_token = create_access_token(subject=str(user.id))
    refresh_token = create_refresh_token(subject=str(user.id))

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
    }


@router.get("/me")
def me(user=Depends(get_current_user)):
    return {
        "id": str(user.id),
        "email": user.email,
    }