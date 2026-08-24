#!/usr/bin/env bash
# Genera los cuatro PDF desde el mismo código fuente.
#   ./compilar.sh
# Requiere pdflatex (texlive-latex-recommended + texlive-latex-extra).
set -euo pipefail
cd "$(dirname "$0")"

for doc in cuadernillo-estudiantes cuadernillo-docente; do
  # Dos pasadas: la primera arma la clave de respuestas y el total de páginas,
  # la segunda las coloca bien.
  for _ in 1 2; do
    pdflatex -interaction=nonstopmode -halt-on-error "$doc.tex" >/dev/null
  done
  echo "✔ $doc.pdf ($(pdfinfo "$doc.pdf" | awk '/^Pages/{print $2}') páginas)"
done

rm -f ./*.aux ./*.log ./*.out ./*.toc
