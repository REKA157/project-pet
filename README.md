# 🐶 Project PET

## ✨ Description
Application complète pour la gestion de profils canins, rencontre, chat, géolocalisation, analyse émotionnelle et communication augmentée maître ↔ chien.

## 🧱 Stack technique
- **Frontend** : React + Vite + Tailwind + PWA
- **Backend** : FastAPI + JWT + SQLite
- **WebSocket** pour chat & notifications
- **IA audio** avec Hugging Face (Wav2Vec2)
- **Déploiement** : Render (backend) + Vercel (frontend)

## 🚀 Installation

### Frontend
```bash
cd frontend/
npm install
npm run dev
```

### Backend
```bash
cd backend/
pip install -r requirements.txt
uvicorn backend.main:app --reload
```

## 🌐 URLs (déployé)
- **Frontend** : [https://project-pet.vercel.app](https://project-pet.vercel.app)
- **Backend API** : [https://project-pet-backend.onrender.com](https://project-pet-backend.onrender.com)

## 🗺️ Fonctionnalités
- ✅ Authentification JWT
- ✅ Ajout/édition de chiens
- ✅ Radar & géolocalisation
- ✅ Match & swipe
- ✅ Chat en temps réel
- ✅ Notifications live
- ✅ Analyse émotionnelle audio
- ✅ Assistant vocal
- ✅ PWA installable

## 📦 À venir
- 🔜 Push Firebase
- 🔜 Profil vétérinaire
- 🔜 Historique médical canin

## 🧑‍💻 Contribuer
Les Pull Requests sont les bienvenues ! Voir [CONTRIBUTING.md](CONTRIBUTING.md)

## ⚖️ Licence
MIT

## 🔧 Configuration requise
- Node.js >= 16
- Python >= 3.8
- SQLite3

## 📱 PWA
L'application est installable sur :
- Android
- iOS Safari
- Chrome

## 🔐 Sécurité
- Authentification JWT
- HTTPS
- CORS configuré
- Validation des données
- Protection contre les injections SQL

## 🚀 Performance
- Lazy loading des composants
- Optimisation des images
- Mise en cache intelligente
- Service Workers pour le mode hors ligne 