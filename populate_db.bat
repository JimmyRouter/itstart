@echo off
cd /d %~dp0
echo Activating virtual environment...
call venv\Scripts\activate

echo Changing directory to ITStart_API...
cd ITStart_API

echo Populating database with seminars...
python manage.py runscript populate_seminars > populate_log.txt 2>&1

echo Done! Check 'populate_log.txt' for errors.
deactivate
pause
