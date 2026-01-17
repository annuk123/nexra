from sqlmodel import SQLModel, create_engine, Session

DATABASE_URL = "sqlite:///./nexra.db"

engine = create_engine(
    DATABASE_URL,
    echo=True,  # shows SQL queries (great for learning)
)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session
