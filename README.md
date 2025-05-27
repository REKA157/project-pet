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

# 🐶 Project PET - Instructions UI (VSCode / Copilot)

## 🌐 Structure des sections
- Chaque onglet (Santé, Nutrition, Rendez-vous, etc.) correspond à un `div` principal identifié par `activeMainTab`.
- Les sections doivent être ajoutées dans l'ordre suivant :
  1. Rappels
  2. Nutrition
  3. Données de santé
  4. Prédictions IA
  5. Rendez-vous médicaux
  6. Téléconsultation
  7. Dossier médical

## ➕ Comportement des boutons "+"
- Les boutons "+" **ne créent pas de nouvelle section.**
- Ils ouvrent un petit formulaire inline ou une modal pour ajouter une donnée.
- Icône : `<FaPlus />`
- Position : en haut à droite de chaque section
- Taille : `w-8 h-8`, `text-green-600`

## 📆 Rendez-vous médicaux
- Le bouton "Nouveau rendez-vous" doit :
  - **agrandir verticalement la section**
  - afficher un **agenda hebdomadaire**
  - afficher une **liste de vétérinaires** (au moins 3 exemples)
- Conserver le **champ “Ville”** (dropdown) visible, largeur `w-2/3`

## 📡 Téléconsultation
- Le champ “Spécialité” reste affiché en haut
- Afficher une liste de vétérinaires avec leur statut (disponible/occupé)
- Ne jamais remplacer ou dupliquer le composant principal

## 📁 Dossier médical
- La section **doit toujours rester présente**
- Elle contient :
  - Une **zone de dépôt de fichiers** (`input type="file"`)
  - Un **bouton Télécharger**
  - Un **aperçu des fichiers existants** (PDF, images)

## ❌ Interdictions
- Ne pas créer de nouvelles sections "Rappels" ou "Nutrition"
- Ne pas supprimer les éléments existants
- Ne pas redimensionner les composants sans mention explicite

## 🎨 Style UI
- Utiliser Tailwind CSS
- Espacement : `space-y-6` entre les blocs
- Coins : `rounded-lg`
- Ombres : `shadow-sm` ou `shadow-lg` si accent
- Fond : `bg-white` ou `bg-gray-50` pour les blocs secondaires
- Titres : `text-xl font-semibold text-gray-900`

---

_Fichier utilisé pour guider les assistants IA dans la génération de code frontend cohérent avec l'expérience utilisateur prévue._
