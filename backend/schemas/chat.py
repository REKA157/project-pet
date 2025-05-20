from pydantic import BaseModel, Field
from backend.schemas.base import BaseSchema
from typing import Optional, List
from datetime import datetime

class MessageBase(BaseModel):
    content: str = Field(..., min_length=1, max_length=1000)
    sender_id: int
    receiver_id: int

class MessageCreate(MessageBase):
    pass

class MessageResponse(MessageBase):
    id: int
    created_at: datetime
    is_read: bool = False

    model_config = BaseSchema.model_config

class ChatRoom(BaseModel):
    id: int
    user1_id: int
    user2_id: int
    created_at: datetime
    last_message: Optional[MessageResponse] = None

    model_config = BaseSchema.model_config

class ChatList(BaseModel):
    chats: List[ChatRoom]
    total: int 