from pydantic import BaseModel, Field
from backend.schemas.base import BaseSchema
from typing import Optional
from datetime import datetime

class MatchBase(BaseModel):
    dog1_id: int
    dog2_id: int
    status: str = Field(..., pattern="^(pending|accepted|rejected)$")

class MatchCreate(MatchBase):
    pass

class MatchUpdate(BaseModel):
    status: str = Field(..., pattern="^(accepted|rejected)$")

class MatchResponse(MatchBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = BaseSchema.model_config

class MatchList(BaseModel):
    matches: list[MatchResponse]
    total: int 