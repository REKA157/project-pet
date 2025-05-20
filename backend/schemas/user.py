from pydantic import BaseModel, EmailStr, constr
from typing import Optional, List
from datetime import datetime

# Validation du mot de passe
PASSWORD_MIN_LENGTH = 8
PASSWORD_PATTERN = r"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"

class UserBase(BaseModel):
    email: EmailStr
    username: constr(min_length=3, max_length=50)

class UserCreate(UserBase):
    password: constr(min_length=PASSWORD_MIN_LENGTH, regex=PASSWORD_PATTERN)

class UserLogin(BaseModel):
    email: EmailStr
    password: str

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