@echo off
echo Starting Tower Defense Game...
echo Opening browser to http://localhost:8000
echo Press Ctrl+C to stop the server
echo.

REM Check for Python 3
where python >nul 2>nul
if %errorlevel% equ 0 (
    python -m http.server 8000
    goto :end
)

REM Check for Python
where python3 >nul 2>nul
if %errorlevel% equ 0 (
    python3 -m http.server 8000
    goto :end
)

echo Error: Python is not installed or not in PATH
echo Please install Python or open index.html directly in your browser
echo.
pause

:end
