from fastapi import FastAPI
from app.api.health import router as health_router
from app.api.ideas import router as ideas_router
from app.db.database import create_db_and_tables
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# 👇 ADD THIS BLOCK
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # later you can restrict this
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

app.include_router(health_router)
app.include_router(ideas_router)
