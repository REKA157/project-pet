from fastapi import APIRouter, UploadFile, File, HTTPException, status
from transformers import Wav2Vec2ForSequenceClassification, Wav2Vec2Processor
import torch
import torchaudio
import soundfile as sf
import librosa
import numpy as np
import tempfile
import os
from ..schemas.audio import AudioAnalysisResponse

router = APIRouter(
    prefix="/audio",
    tags=["audio"]
)

# Chargement du modèle pré-entraîné
model = Wav2Vec2ForSequenceClassification.from_pretrained("facebook/wav2vec2-base-960h")
processor = Wav2Vec2Processor.from_pretrained("facebook/wav2vec2-base-960h")

# Mapping des émotions
EMOTION_MAPPING = {
    0: "happy",
    1: "sad",
    2: "angry",
    3: "neutral",
    4: "excited",
    5: "anxious"
}

def preprocess_audio(audio_path: str) -> torch.Tensor:
    """Prétraite l'audio pour l'analyse."""
    # Charger l'audio
    audio, sr = librosa.load(audio_path, sr=16000, mono=True)
    
    # Normaliser l'audio
    audio = librosa.util.normalize(audio)
    
    # Convertir en tensor
    audio_tensor = torch.from_numpy(audio).float()
    
    return audio_tensor

@router.post("/analyze", response_model=AudioAnalysisResponse)
async def analyze_audio(file: UploadFile = File(...)):
    """
    Analyse un fichier audio .wav pour détecter l'émotion du chien.
    """
    if not file.filename.endswith('.wav'):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Seuls les fichiers .wav sont acceptés"
        )
    
    try:
        # Sauvegarder temporairement le fichier
        with tempfile.NamedTemporaryFile(delete=False, suffix='.wav') as temp_file:
            content = await file.read()
            temp_file.write(content)
            temp_path = temp_file.name
        
        # Prétraiter l'audio
        audio_tensor = preprocess_audio(temp_path)
        
        # Préparer l'entrée pour le modèle
        inputs = processor(audio_tensor, sampling_rate=16000, return_tensors="pt", padding=True)
        
        # Faire la prédiction
        with torch.no_grad():
            outputs = model(**inputs)
            logits = outputs.logits
            probabilities = torch.nn.functional.softmax(logits, dim=-1)
            
        # Obtenir l'émotion prédite et sa confiance
        predicted_class = torch.argmax(probabilities, dim=-1).item()
        confidence = probabilities[0][predicted_class].item()
        
        # Nettoyer le fichier temporaire
        os.unlink(temp_path)
        
        return AudioAnalysisResponse(
            emotion=EMOTION_MAPPING[predicted_class],
            confidence=confidence
        )
        
    except Exception as e:
        # Nettoyer en cas d'erreur
        if 'temp_path' in locals():
            os.unlink(temp_path)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erreur lors de l'analyse audio: {str(e)}"
        ) 