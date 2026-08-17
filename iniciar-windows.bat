@echo off
REM Doble click para iniciar el sitio (Windows).
REM No importa desde donde lo abras: siempre se ubica en esta carpeta primero.
cd /d "%~dp0"

echo ============================================
echo   RON_DOC - iniciando sitio local
echo ============================================

if not exist "node_modules" (
  echo Primera vez: instalando dependencias ^(puede tardar unos minutos^)...
  call npm install
)

echo.
echo Abriendo el navegador en unos segundos...
echo Para DETENER el sitio: volve a esta ventana y presiona Ctrl+C
echo.

start "" /min cmd /c "timeout /t 4 >nul & start http://localhost:3000/aula-probabilidad"

call npm run dev
