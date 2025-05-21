from pydantic import BaseModel, constr, validator
from typing import Optional, List
from datetime import datetime
import re

# Validation du mot de passe
PASSWORD_MIN_LENGTH = 8
PASSWORD_PATTERN = r"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
EMAIL_PATTERN = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"

class UserBase(BaseModel):
    email: str
    username: constr(min_length=3, max_length=50)

    @validator('email')
    def validate_email(cls, v):
        if not re.match(EMAIL_PATTERN, v):
            raise ValueError('Invalid email format')
        return v

class UserCreate(UserBase):
    password: constr(min_length=PASSWORD_MIN_LENGTH, regex=PASSWORD_PATTERN)

class UserLogin(BaseModel):
    email: str
    password: str

    @validator('email')
    def validate_email(cls, v):
        if not re.match(EMAIL_PATTERN, v):
            raise ValueError('Invalid email format')
        return v

class UserResponse(UserBase):
    id: int
    profile_picture: Optional[str] = None
    bio: Optional[str] = None
    date_created: datetime
    last_login: Optional[datetime] = None

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None 