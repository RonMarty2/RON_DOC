#!/bin/bash
# Doble click para iniciar el sitio (Mac/Linux).
# No importa desde dónde lo abras: siempre se ubica en esta carpeta primero.
cd "$(dirname "$0")"

echo "============================================"
echo "  RON_DOC — iniciando sitio local"
echo "============================================"

if [ ! -d "node_modules" ]; then
  echo "Primera vez: instalando dependencias (puede tardar unos minutos)..."
  npm install
fi

echo ""
echo "Abriendo el navegador en unos segundos..."
echo "Para DETENER el sitio: volvé a esta ventana y presioná Ctrl+C"
echo ""

# Abre el navegador directo en la Aula de Probabilidad, dando tiempo a que arranque el server.
(
  sleep 4
  URL="http://localhost:3000/aula-probabilidad"
  if command -v open >/dev/null 2>&1; then
    open "$URL"           # macOS
  elif command -v xdg-open >/dev/null 2>&1; then
    xdg-open "$URL"        # Linux
  fi
) &

npm run dev
