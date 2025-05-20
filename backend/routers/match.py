from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import math
from datetime import datetime

from database import get_db
from models.dog import Dog
from models.match import Match
from models.location import Location
from schemas.match import DogSuggestion, MatchCreate, MatchResponse
from routers.auth import get_current_user
from routers.notifications import manager

router = APIRouter(prefix="/match", tags=["match"])

def calculate_distance(lat1, lon1, lat2, lon2):
    """Calcule la distance en kilomètres entre deux points géographiques."""
    R = 6371  # Rayon de la Terre en km
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = math.sin(dlat/2) * math.sin(dlat/2) + \
        math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * \
        math.sin(dlon/2) * math.sin(dlon/2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
    return R * c

def calculate_compatibility(dog1, dog2):
    """Calcule un score de compatibilité entre deux chiens."""
    score = 0.0
    
    # Compatibilité de race
    if dog1.race == dog2.race:
        score += 0.4
    
    # Compatibilité d'humeur
    mood_compatibility = {
        "happy": {"happy": 1.0, "playful": 0.8, "calm": 0.6, "shy": 0.4},
        "playful": {"happy": 0.8, "playful": 1.0, "calm": 0.6, "shy": 0.3},
        "calm": {"happy": 0.6, "playful": 0.6, "calm": 1.0, "shy": 0.7},
        "shy": {"happy": 0.4, "playful": 0.3, "calm": 0.7, "shy": 1.0}
    }
    score += mood_compatibility[dog1.mood][dog2.mood] * 0.6
    
    return score

@router.get("/suggestions", response_model=List[DogSuggestion])
async def get_suggestions(
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Récupère les suggestions de chiens compatibles."""
    # Récupérer les chiens de l'utilisateur
    user_dogs = db.query(Dog).filter(Dog.owner_id == current_user.id).all()
    if not user_dogs:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Vous n'avez pas encore de chien enregistré"
        )
    
    # Récupérer la dernière position de l'utilisateur
    user_location = db.query(Location)\
        .filter(Location.user_id == current_user.id)\
        .order_by(Location.timestamp.desc())\
        .first()
    
    suggestions = []
    for user_dog in user_dogs:
        # Récupérer les chiens qui n'ont pas encore été matchés
        potential_matches = db.query(Dog)\
            .filter(Dog.owner_id != current_user.id)\
            .filter(~Dog.matches_as_dog1.any(Match.dog2_id == user_dog.id))\
            .filter(~Dog.matches_as_dog2.any(Match.dog1_id == user_dog.id))\
            .all()
        
        for potential_match in potential_matches:
            # Calculer la compatibilité
            compatibility_score = calculate_compatibility(user_dog, potential_match)
            
            # Calculer la distance si la position est disponible
            distance = None
            if user_location:
                dog_location = db.query(Location)\
                    .filter(Location.user_id == potential_match.owner_id)\
                    .order_by(Location.timestamp.desc())\
                    .first()
                if dog_location:
                    distance = calculate_distance(
                        user_location.latitude, user_location.longitude,
                        dog_location.latitude, dog_location.longitude
                    )
            
            suggestions.append(DogSuggestion(
                id=potential_match.id,
                name=potential_match.name,
                race=potential_match.race,
                mood=potential_match.mood,
                distance_km=distance,
                compatibility_score=compatibility_score,
                profile_picture=potential_match.profile_picture
            ))
    
    # Trier les suggestions par score de compatibilité
    suggestions.sort(key=lambda x: x.compatibility_score, reverse=True)
    return suggestions

@router.post("/like", response_model=MatchResponse)
async def like_dog(
    match: MatchCreate,
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Enregistre un like pour un chien."""
    # Vérifier que le chien existe
    dog2 = db.query(Dog).filter(Dog.id == match.dog2_id).first()
    if not dog2:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Chien non trouvé"
        )
    
    # Vérifier que l'utilisateur a un chien
    user_dog = db.query(Dog).filter(Dog.owner_id == current_user.id).first()
    if not user_dog:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Vous n'avez pas encore de chien enregistré"
        )
    
    # Créer le match
    new_match = Match(
        dog1_id=user_dog.id,
        dog2_id=match.dog2_id,
        is_liked=match.is_liked
    )
    
    # Vérifier si c'est un match mutuel
    existing_match = db.query(Match)\
        .filter(Match.dog1_id == match.dog2_id)\
        .filter(Match.dog2_id == user_dog.id)\
        .first()
    
    if existing_match and existing_match.is_liked:
        new_match.is_matched = True
        existing_match.is_matched = True
        
        # Envoyer des notifications aux deux utilisateurs
        await manager.send_notification(
            current_user.email,
            f"Match avec {dog2.name} ! 🐶"
        )
        await manager.send_notification(
            dog2.owner.email,
            f"Match avec {user_dog.name} ! 🐶"
        )
    
    db.add(new_match)
    db.commit()
    db.refresh(new_match)
    
    return new_match 