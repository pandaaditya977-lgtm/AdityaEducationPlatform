@echo off
title EduConnect Full-Stack Web Platform
echo ===================================================
echo           Starting EduConnect Platform...
echo ===================================================
echo.

echo [1/2] Launching Backend API Server (Port 5000, Neon DB)...
start "EduConnect API Server" cmd /k "cd /d "%~dp0server" && npm run dev"

echo [2/2] Launching Frontend Web Client (Port 5173)...
echo Your default web browser will open automatically.
echo.
cd /d "%~dp0client"
npm run dev

pause
