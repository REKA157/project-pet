from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from datetime import datetime
import random

router = APIRouter()

class PredictionRequest(BaseModel):
    pet_id: int
    # Ajoute d'autres champs si besoin (ex: metrics, user_id...)

class PredictionResponse(BaseModel):
    pet_id: int
    score: float
    alert: str
    recommendation: str
    date: str

@router.post("/generate-prediction", response_model=PredictionResponse)
def generate_prediction(data: PredictionRequest):
    # Logique IA simulée (à remplacer par un vrai modèle si besoin)
    score = round(random.uniform(60, 98), 2)
    if score < 70:
        alert = "Attention : bien-être faible !"
        recommendation = "Consultez un vétérinaire et surveillez l'activité de votre animal."
    elif score < 85:
        alert = "Bien-être moyen."
        recommendation = "Continuez à surveiller l'alimentation et l'activité."
    else:
        alert = "Bien-être optimal !"
        recommendation = "Continuez ainsi, votre animal est en pleine forme."
    return PredictionResponse(
        pet_id=data.pet_id,
        score=score,
        alert=alert,
        recommendation=recommendation,
        date=datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    )

@router.get("/health", response_model=dict)
def get_health_data():
    return {
        "status": "success",
        "data": {
            "activity": 85,
            "energy": 90,
            "sleep": 75
        }
    }