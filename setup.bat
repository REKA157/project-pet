@echo off
echo Installation de Python 3.11.7...
powershell -Command "& {Invoke-WebRequest -Uri 'https://www.python.org/ftp/python/3.11.7/python-3.11.7-amd64.exe' -OutFile 'python-3.11.7-amd64.exe'}"
python-3.11.7-amd64.exe /quiet InstallAllUsers=1 PrependPath=1

echo Création de l'environnement virtuel...
python -m venv venv
call venv\Scripts\activate

echo Installation des dépendances...
pip install -r backend/requirements.txt

echo Configuration terminée !
echo Pour démarrer le serveur, exécutez : python -m uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000 