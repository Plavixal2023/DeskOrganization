@echo off
REM Desktop Organizer - Windows Launcher
REM This script runs the Desktop Organizer on your Desktop folder

set SCRIPT_DIR=%~dp0
cd /d "%SCRIPT_DIR%"

echo ================================================
echo Desktop Organizer
echo ================================================
echo.
echo This will organize files on your Desktop.
echo.
echo Options:
echo   1. Organize Desktop (dry-run preview)
echo   2. Organize Desktop (actually move files)
echo   3. Organize custom folder
echo   4. Exit
echo.

set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" (
    python desk_organizer.py --dry-run
    pause
) else if "%choice%"=="2" (
    python desk_organizer.py
    pause
) else if "%choice%"=="3" (
    set /p folder_path="Enter folder path to organize: "
    python desk_organizer.py --path "%folder_path%"
    pause
) else if "%choice%"=="4" (
    exit
) else (
    echo Invalid choice!
    pause
)
