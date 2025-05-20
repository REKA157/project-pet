from pydantic import BaseModel, Field
from backend.schemas.base import BaseSchema
from typing import Optional
from datetime import datetime

class LocationBase(BaseModel):
    latitude: float = Field(..., ge=-90, le=90)
    longitude: float = Field(..., ge=-180, le=180)
    dog_id: int

class LocationCreate(LocationBase):
    pass

class LocationResponse(LocationBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = BaseSchema.model_config

class LocationUpdate(BaseModel):
    latitude: float = Field(..., ge=-90, le=90)
    longitude: float = Field(..., ge=-180, le=180) 