from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends, HTTPException, status
from typing import Dict
import json
import jwt
from config import settings

router = APIRouter(prefix="/ws", tags=["notifications"])

# Gestionnaire de connexions WebSocket
class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, WebSocket] = {}

    async def connect(self, websocket: WebSocket, user_email: str):
        await websocket.accept()
        self.active_connections[user_email] = websocket

    def disconnect(self, user_email: str):
        if user_email in self.active_connections:
            del self.active_connections[user_email]

    async def send_notification(self, user_email: str, message: str):
        if user_email in self.active_connections:
            await self.active_connections[user_email].send_json({
                "type": "notification",
                "message": message
            })

manager = ConnectionManager()

@router.websocket("/notifications/{user_email}")
async def websocket_endpoint(websocket: WebSocket, user_email: str):
    try:
        # Vérifier le token JWT
        token = websocket.headers.get("authorization", "").replace("Bearer ", "")
        if not token:
            await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
            return

        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
            token_email = payload.get("sub")
            if token_email != user_email:
                await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
                return
        except jwt.InvalidTokenError:
            await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
            return

        # Connecter l'utilisateur
        await manager.connect(websocket, user_email)

        try:
            while True:
                # Garder la connexion active
                await websocket.receive_text()
        except WebSocketDisconnect:
            manager.disconnect(user_email)

    except Exception as e:
        print(f"Erreur WebSocket: {str(e)}")
        await websocket.close(code=status.WS_1011_INTERNAL_ERROR)

# Route de test pour envoyer une notification
@router.post("/send-test-notif/{user_email}")
async def send_test_notification(user_email: str):
    await manager.send_notification(user_email, "Ceci est une notification de test ! 🔔")
    return {"status": "Notification envoyée"} 