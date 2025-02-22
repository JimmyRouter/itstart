@echo off
cd /d "%~dp0\ITStart_API"
call ..\venv\Scripts\activate
python manage.py runserver
cmd /k
