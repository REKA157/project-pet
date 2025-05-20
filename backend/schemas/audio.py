from pydantic import BaseModel, Field
from backend.schemas.base import BaseSchema
from typing import Optional, List
from datetime import datetime

class AudioBase(BaseModel):
    dog_id: int
    file_path: str
    duration: float = Field(..., ge=0)
    emotion: Optional[str] = Field(None, pattern="^(happy|sad|angry|neutral|excited|anxious)$")

class AudioCreate(AudioBase):
    pass

class AudioResponse(AudioBase):
    id: int
    created_at: datetime
    analysis_result: Optional[dict] = None

    model_config = BaseSchema.model_config

class AudioList(BaseModel):
    audios: List[AudioResponse]
    total: int 