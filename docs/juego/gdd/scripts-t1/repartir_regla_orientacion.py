"""Reparte la regla «cada pantalla le dice al alumno qué hace» a REGLAS-COMUNES-AGENTES.md y a las copias que llevan los agentes.

Idempotente: si la regla ya está en un archivo, no la repite. Escribe a .tmp y reemplaza (nunca abre el original en modo "w").
Se corre con `python`. Busca todo a partir de su propia carpeta.
"""
import glob
import os
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.normpath(os.path.join(AQUI, "..", "..", "..", ".."))
ANCLA = "- **Todo texto que lee el alumno se lee, y se mide**"
MARCA = "**Cada pantalla le dice al alumno qué hace, qué toca y qué pasó**"
REGLA = (
    "- **Cada pantalla le dice al alumno qué hace, qué toca y qué pasó** (Ronald, 09-10: jugó el Paso 1 y el Caso 2 del Tema 1 de Psicoestadística y dijo "
    "«no entiendo el flujo, me pierdo en la historia, ni qué estoy haciendo ni qué quiere que haga»; el crítico encontró 15 faltas, 6 de ellas bloqueaban la comprensión). "
    "Todo diseño o texto de una pantalla jugable trae: (1) quién eres y cuál es tu trabajo, dicho antes del primer toque; (2) el objetivo de ESA pantalla en una frase; "
    "(3) qué se toca y qué cuesta tocarlo (fichas, tiempo); (4) cada término del juego (ficha, medidor, raya, meta, horizonte) definido una sola vez, la primera vez que aparece, "
    "y quién es cada personaje antes de que hable; (5) al cerrar cada paso, qué pasó y qué sigue. La historia no sustituye la orientación. "
    "El crítico de lo jugable juega cada pantalla con esas cinco preguntas, y quien construye **no le muestra una pantalla a Ronald sin esa revisión**: "
    "la etapa 7 se saltó en AIEF el 27-09 y otra vez el 09-10. Se cumple con texto de orientación (sin explicar la estadística, sin mandar al dossier, sin bloquear lo que el diseño permite).\n"
)


def repartir(ruta: str) -> str:
    with open(ruta, encoding="utf-8-sig", newline="") as f:
        t = f.read()
    if MARCA in t:
        return "ya estaba"
    if ANCLA not in t:
        return "sin ancla (no lleva el bloque común)"
    fin = "\r\n" if "\r\n" in t else "\n"
    lineas = t.split(fin)
    for i, l in enumerate(lineas):
        if l.startswith(ANCLA):
            lineas.insert(i + 1, REGLA.rstrip("\n"))
            break
    con_bom = open(ruta, "rb").read(3) == b"\xef\xbb\xbf"
    tmp = ruta + ".tmp"
    with open(tmp, "w", encoding="utf-8-sig" if con_bom else "utf-8", newline="") as f:
        f.write(fin.join(lineas))
    os.replace(tmp, ruta)
    return "agregada"


def main() -> int:
    rutas = [os.path.join(RAIZ, "docs", "juego", "REGLAS-COMUNES-AGENTES.md")] + sorted(glob.glob(os.path.join(RAIZ, ".claude", "agents", "*.md")))
    for r in rutas:
        print(f"{os.path.relpath(r, RAIZ):55s} {repartir(r)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
