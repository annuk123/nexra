from fastapi import FastAPI
from app.api.health import router as health_router
from app.api.ideas import router as ideas_router
from app.db.database import create_db_and_tables
from fastapi.middleware.cors import CORSMiddleware
# from dotenv import load_dotenv
# load_dotenv()

app = FastAPI()

# 👇 ADD THIS BLOCK
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # OK for MVP
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

app.include_router(health_router)
app.include_router(ideas_router)
