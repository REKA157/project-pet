from pydantic import BaseModel, Field
from backend.schemas.base import BaseSchema
from typing import Optional, List
from datetime import date

class DogBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=50)
    breed: str = Field(..., min_length=2, max_length=50)
    age: int = Field(..., ge=0, le=30)
    gender: str = Field(..., pattern="^(male|female)$")
    description: Optional[str] = Field(None, max_length=500)
    photo_url: Optional[str] = None

class DogCreate(DogBase):
    pass

class DogUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=2, max_length=50)
    breed: Optional[str] = Field(None, min_length=2, max_length=50)
    age: Optional[int] = Field(None, ge=0, le=30)
    gender: Optional[str] = Field(None, pattern="^(male|female)$")
    description: Optional[str] = Field(None, max_length=500)
    photo_url: Optional[str] = None

class DogResponse(DogBase):
    id: int
    owner_id: int
    created_at: date
    updated_at: date

    model_config = BaseSchema.model_config

class DogList(BaseModel):
    dogs: List[DogResponse]
    total: int 