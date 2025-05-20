from fastapi import APIRouter, WebSocket
import json
import asyncio
import random
from typing import List
from ..schemas.dog import DogRead

router = APIRouter()

# Liste des chiens simulés
SIMULATED_DOGS = [
    {
        "id": 1,
        "name": "Rex",
        "race": "Berger Allemand",
        "humeur": "Joueur",
        "latitude": 48.8566,
        "longitude": 2.3522
    },
    {
        "id": 2,
        "name": "Luna",
        "race": "Labrador",
        "humeur": "Calme",
        "latitude": 48.8566,
        "longitude": 2.3522
    },
    {
        "id": 3,
        "name": "Max",
        "race": "Golden Retriever",
        "humeur": "Énergique",
        "latitude": 48.8566,
        "longitude": 2.3522
    }
]

def get_random_position(base_lat: float, base_lon: float) -> tuple:
    """Génère une position aléatoire autour d'un point central."""
    return (
        base_lat + random.uniform(-0.01, 0.01),
        base_lon + random.uniform(-0.01, 0.01)
    )

def get_updated_dogs() -> List[DogRead]:
    """Retourne une liste de chiens avec des positions mises à jour."""
    return [
        {
            **dog,
            "latitude": lat,
            "longitude": lon
        }
        for dog in SIMULATED_DOGS
        for lat, lon in [get_random_position(dog["latitude"], dog["longitude"])]
    ]

@router.websocket("/ws/radar")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            # Envoi des données toutes les 10 secondes
            dogs = get_updated_dogs()
            await websocket.send_json(dogs)
            await asyncio.sleep(10)
    except Exception as e:
        print(f"Erreur WebSocket: {e}")
    finally:
        await websocket.close() 