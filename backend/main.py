from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from backend.routers import auth, dogs, matches, chat, location, audio
from backend.database import engine, Base
from backend.config import get_settings
import uvicorn
import logging
import os

# Configuration du logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Récupération des paramètres
settings = get_settings()

# Création des tables
try:
    Base.metadata.create_all(bind=engine)
    logger.info("Base de données initialisée avec succès")
except Exception as e:
    logger.error(f"Erreur lors de l'initialisation de la base de données: {e}")
    raise

app = FastAPI(
    title="Project PET API",
    description="API pour l'application de gestion de chiens",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configuration CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inclusion des routers
app.include_router(auth.router, prefix="/api", tags=["auth"])
app.include_router(dogs.router, prefix="/api", tags=["dogs"])
app.include_router(matches.router, prefix="/api", tags=["matches"])
app.include_router(chat.router, prefix="/api", tags=["chat"])
app.include_router(location.router, prefix="/api", tags=["location"])
app.include_router(audio.router, prefix="/api", tags=["audio"])

@app.get("/")
async def root():
    return {"message": "Bienvenue sur l'API Project PET"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}

@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    logger.error(f"Erreur non gérée: {exc}")
    return HTTPException(
        status_code=500,
        detail="Une erreur interne est survenue"
    )

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(
        "backend.main:app",
        host="0.0.0.0",
        port=port,
        reload=True,
        workers=1,
        log_level="info"
    ) 