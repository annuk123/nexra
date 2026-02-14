import uuid
from fastapi import Depends, HTTPException, status, Header
from sqlmodel import Session, select

from app.db.database import get_session
from app.db.models import User
from app.auth.jwt import decode_token
from app.auth.flags import AUTH_ENABLED


def get_token_from_header(authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        return None
    return authorization.replace("Bearer ", "")


def get_current_user(
    token: str = Depends(get_token_from_header),
    session: Session = Depends(get_session),
) -> User:
    if not AUTH_ENABLED:
        raise HTTPException(status_code=401, detail="Auth disabled")

    if not token:
        raise HTTPException(status_code=401, detail="Missing token")

    payload = decode_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")

    user_id_str = payload.get("sub")
    if not user_id_str:
        raise HTTPException(status_code=401, detail="Invalid token payload")

    # ✅ FIX: convert string → UUID
    try:
        user_id = uuid.UUID(user_id_str)
    except ValueError:
        raise HTTPException(status_code=401, detail="Invalid user id")

    user = session.exec(
        select(User).where(User.id == user_id)
    ).first()

    if not user or not user.is_active:
        raise HTTPException(status_code=401, detail="User not found")

    return user

def get_current_user_optional(
    token: str = Depends(get_token_from_header),
    session: Session = Depends(get_session),
):
    if not AUTH_ENABLED:
        return None

    if not token:
        return None

    payload = decode_token(token)
    if not payload:
        return None

    user_id = payload.get("sub")
    if not user_id:
        return None

    return session.exec(
        select(User).where(User.id == user_id)
    ).first()
