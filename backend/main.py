from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from routers import auth, dogs, matches, chat, location, audio, predictions, health
from database import engine, Base
from config import get_settings
import uvicorn
import logging
import os

# Configuration du logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Récupération des paramètres
settings = get_settings()
logger.info(f"Configuration chargée: {settings}")

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
origins = [
    "http://localhost:5173",
    "https://project-pet.vercel.app",
    "https://*.vercel.app",
    "https://*.railway.app",
    "https://project-pet-production.up.railway.app",
    "https://project-pet-taupe.vercel.app",  # Ajout du domaine Vercel spécifique
    "https://project-pet-production.up.railway.app",  # Ajout du domaine Railway
    "https://project-pet-3b5a.vercel.app",  # Ajout de l'origine Vercel spécifique
    "http://localhost:3000"  # Ajout de l'origine localhost
]

logger.info(f"Origines CORS configurées: {origins}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://project-pet-3b5a.vercel.app",
        "https://project-pet-taupe.vercel.app",
        "https://project-pet-3b5a-git-main-riks-projects-6e9c5d05.vercel.app",
        "http://localhost:3000"
    ],
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
app.include_router(predictions.router, prefix="/api", tags=["predictions"])
app.include_router(health.router, prefix="/api", tags=["health"])

@app.get("/")
async def root():
    logger.info("Accès à la route racine")
    return {"message": "Bienvenue sur l'API Project PET"}

@app.get("/api/health")
async def health_check():
    logger.info("Vérification de la santé de l'API")
    return {"status": "healthy"}

@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    logger.error(f"Erreur non gérée: {exc}")
    return HTTPException(
        status_code=500,
        detail="Une erreur interne est survenue"
    )

if __name__ == "__main__":
    port = int(os.getenv("PORT", 10000))
    logger.info(f"Démarrage du serveur sur le port {port}")
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=port,
        reload=False,
        workers=1,
        log_level="debug"
    )