from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime

# Création de la base de données SQLite
SQLALCHEMY_DATABASE_URL = "sqlite:///./dogs.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})

# Création de la session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Création de la classe Base
Base = declarative_base()

class Dog(Base):
    __tablename__ = "dogs"

    id = Column(Integer, primary_key=True, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    name = Column(String, nullable=False)
    race = Column(String, nullable=False)
    age = Column(Integer, nullable=False)
    size = Column(String, nullable=False)  # small, medium, large
    mood = Column(String, nullable=False)  # happy, calm, playful, shy
    description = Column(Text, nullable=True)
    profile_picture = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relations
    owner = relationship("User", back_populates="dogs")
    matches_as_dog1 = relationship("Match", foreign_keys="Match.dog1_id", back_populates="dog1")
    matches_as_dog2 = relationship("Match", foreign_keys="Match.dog2_id", back_populates="dog2")

# Création des tables
Base.metadata.create_all(bind=engine)

# Fonction utilitaire pour obtenir une session DB
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close() 