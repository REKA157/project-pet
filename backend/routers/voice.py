from fastapi import APIRouter, HTTPException, Query
from typing import List, Dict, Optional
import random
from datetime import datetime

router = APIRouter()

# Simulation de données de chiens à proximité
def get_nearby_dogs(radius: Optional[int] = 1000) -> List[Dict]:
    dogs = [
        {"id": 1, "name": "Rex", "breed": "Labrador", "distance": "100m", "mood": "Joyeux", "last_seen": "2024-03-20T10:30:00"},
        {"id": 2, "name": "Luna", "breed": "Golden Retriever", "distance": "250m", "mood": "Calme", "last_seen": "2024-03-20T10:25:00"},
        {"id": 3, "name": "Max", "breed": "Berger Allemand", "distance": "500m", "mood": "Energique", "last_seen": "2024-03-20T10:20:00"},
        {"id": 4, "name": "Bella", "breed": "Border Collie", "distance": "750m", "mood": "Joueur", "last_seen": "2024-03-20T10:15:00"},
        {"id": 5, "name": "Rocky", "breed": "Boxer", "distance": "1000m", "mood": "Sociable", "last_seen": "2024-03-20T10:10:00"}
    ]
    
    # Filtrer les chiens dans le rayon spécifié
    filtered_dogs = [dog for dog in dogs if int(dog["distance"].replace("m", "")) <= radius]
    return random.sample(filtered_dogs, min(len(filtered_dogs), random.randint(0, len(filtered_dogs))))

@router.get("/dogs/nearby")
async def get_dogs_nearby(radius: Optional[int] = Query(1000, description="Rayon de recherche en mètres")):
    try:
        dogs = get_nearby_dogs(radius)
        return {
            "status": "success",
            "message": f"Trouvé {len(dogs)} chiens à proximité dans un rayon de {radius}m",
            "timestamp": datetime.now().isoformat(),
            "data": dogs
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail={
                "error": "Erreur lors de la recherche des chiens",
                "message": str(e)
            }
        )

@router.get("/voice/status")
async def get_voice_status():
    return {
        "status": "active",
        "language": "fr-FR",
        "available_commands": [
            "trouve les chiens proches",
            "montre-moi les chiens à proximité",
            "radar canin",
            "bonjour",
            "aide",
            "merci"
        ],
        "version": "1.0.0"
    } 