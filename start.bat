@echo off
echo Vérification de l'environnement...

REM Vérifier si Python est installé
python --version >nul 2>&1
if errorlevel 1 (
    echo Python n'est pas installé. Veuillez installer Python 3.8 ou supérieur.
    pause
    exit /b 1
)

REM Vérifier si Node.js est installé
node --version >nul 2>&1
if errorlevel 1 (
    echo Node.js n'est pas installé. Veuillez installer Node.js.
    pause
    exit /b 1
)

REM Vérifier si l'environnement virtuel existe
if not exist .venv (
    echo Création de l'environnement virtuel...
    python -m venv .venv
)

REM Activer l'environnement virtuel
call .venv\Scripts\activate

REM Installer les dépendances Python
echo Installation des dépendances Python...
pip install -r requirements.txt

REM Installer les dépendances Node.js
echo Installation des dépendances Node.js...
npm install

REM Créer le fichier .env s'il n'existe pas
if not exist .env (
    echo Création du fichier .env...
    echo API_BASE_URL=http://localhost:8000> .env
    echo WS_BASE_URL=ws://localhost:8000>> .env
    echo SECRET_KEY=your_secret_key_here>> .env
)

echo Démarrage des services...

REM Démarrer le backend
start cmd /k "cd backend && uvicorn main:app --reload --port 8000 --host 0.0.0.0"

REM Attendre que le backend démarre
timeout /t 5

REM Démarrer le frontend
start cmd /k "npm run dev"

echo.
echo Application démarrée !
echo Backend: http://localhost:8000
echo Frontend: http://localhost:5173
echo.
echo Appuyez sur une touche pour fermer cette fenêtre...
pause 