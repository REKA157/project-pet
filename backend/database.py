from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from backend.config import get_settings
import logging

logger = logging.getLogger(__name__)
settings = get_settings()

# Configuration de l'engine SQLAlchemy
try:
    engine = create_engine(
        settings.DATABASE_URL,
        pool_pre_ping=True,  # Vérifie la connexion avant utilisation
        pool_size=5,         # Nombre de connexions dans le pool
        max_overflow=10      # Nombre maximum de connexions supplémentaires
    )
    logger.info("Connexion à la base de données établie avec succès")
except Exception as e:
    logger.error(f"Erreur lors de la connexion à la base de données: {e}")
    raise

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close() 