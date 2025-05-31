from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from models.location import Location
from models.user import User
from schemas.location import LocationCreate, LocationResponse
from database import get_db
from routers.auth import get_current_user

router = APIRouter()

@router.post("/location", response_model=LocationResponse, status_code=status.HTTP_201_CREATED)
def create_location(
    location: LocationCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Enregistre la position actuelle de l'utilisateur"""
    db_location = Location(
        user_id=current_user.id,
        latitude=location.latitude,
        longitude=location.longitude
    )
    db.add(db_location)
    db.commit()
    db.refresh(db_location)
    return db_location

@router.get("/location/history", response_model=List[LocationResponse])
def get_location_history(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Récupère l'historique des positions de l'utilisateur"""
    return db.query(Location).filter(Location.user_id == current_user.id).all()

@router.get("/location/current", response_model=LocationResponse)
def get_current_location(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Récupère la dernière position enregistrée de l'utilisateur"""
    location = db.query(Location)\
        .filter(Location.user_id == current_user.id)\
        .order_by(Location.timestamp.desc())\
        .first()
    
    if not location:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Aucune position enregistrée"
        )
    
    return location

@router.get("/location", response_model=dict)
def get_location():
    """Fournit des données simulées de localisation"""
    return {
        "status": "success",
        "data": {
            "latitude": 48.8566,
            "longitude": 2.3522,
            "city": "Paris",
            "country": "France"
        }
    }