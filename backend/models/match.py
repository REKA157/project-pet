from sqlalchemy import Column, Integer, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class Match(Base):
    __tablename__ = "matches"

    id = Column(Integer, primary_key=True, index=True)
    dog1_id = Column(Integer, ForeignKey("dogs.id"), nullable=False)
    dog2_id = Column(Integer, ForeignKey("dogs.id"), nullable=False)
    is_liked = Column(Boolean, default=False)
    is_matched = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relations
    dog1 = relationship("Dog", foreign_keys=[dog1_id], back_populates="matches_as_dog1")
    dog2 = relationship("Dog", foreign_keys=[dog2_id], back_populates="matches_as_dog2") 