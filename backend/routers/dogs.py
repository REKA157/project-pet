from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from backend.database import get_db
from backend.models.dog import Dog
from backend.models.user import User
from backend.schemas.dog import DogCreate, Dog as DogSchema
from backend.dependencies import get_current_user_email

router = APIRouter()

@router.post("/", response_model=DogSchema)
def create_dog(
    dog: DogCreate,
    db: Session = Depends(get_db),
    email: str = Depends(get_current_user_email)
):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="Utilisateur introuvable")
    
    new_dog = Dog(**dog.dict(), user_id=user.id)
    db.add(new_dog)
    db.commit()
    db.refresh(new_dog)
    return new_dog

@router.get("/", response_model=List[DogSchema])
def get_user_dogs(
    db: Session = Depends(get_db),
    email: str = Depends(get_current_user_email)
):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="Utilisateur introuvable")
    
    return db.query(Dog).filter(Dog.user_id == user.id).all()

@router.get("/{dog_id}", response_model=DogSchema)
def get_dog(
    dog_id: int,
    db: Session = Depends(get_db),
    email: str = Depends(get_current_user_email)
):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="Utilisateur introuvable")
    
    dog = db.query(Dog).filter(Dog.id == dog_id, Dog.user_id == user.id).first()
    if not dog:
        raise HTTPException(status_code=404, detail="Chien introuvable")
    
    return dog

@router.put("/{dog_id}", response_model=DogSchema)
def update_dog(
    dog_id: int,
    dog_update: DogCreate,
    db: Session = Depends(get_db),
    email: str = Depends(get_current_user_email)
):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="Utilisateur introuvable")
    
    dog = db.query(Dog).filter(Dog.id == dog_id, Dog.user_id == user.id).first()
    if not dog:
        raise HTTPException(status_code=404, detail="Chien introuvable")
    
    for key, value in dog_update.dict().items():
        setattr(dog, key, value)
    
    db.commit()
    db.refresh(dog)
    return dog

@router.delete("/{dog_id}")
def delete_dog(
    dog_id: int,
    db: Session = Depends(get_db),
    email: str = Depends(get_current_user_email)
):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="Utilisateur introuvable")
    
    dog = db.query(Dog).filter(Dog.id == dog_id, Dog.user_id == user.id).first()
    if not dog:
        raise HTTPException(status_code=404, detail="Chien introuvable")
    
    db.delete(dog)
    db.commit()
    return {"message": "Chien supprimé avec succès"} 