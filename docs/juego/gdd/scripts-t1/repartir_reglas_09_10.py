"""Reparte dos reglas que Ronald decidió el 09-10 a REGLAS-COMUNES-AGENTES.md y a las copias de los 7 agentes de diseño.

Es el mismo mecanismo de `repartir_regla_orientacion.py`: idempotente (no repite una regla ya puesta), escribe a .tmp y reemplaza.
Se corre con `python`. Busca todo a partir de su propia carpeta.
"""
import glob
import os
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.normpath(os.path.join(AQUI, "..", "..", "..", ".."))
ANCLA = "- **Cada pantalla le dice al alumno qué hace, qué toca y qué pasó**"

REGLAS = [
    (
        "**El jugador vive la escena en primera persona: no hay personaje suyo visible**",
        "- **El jugador vive la escena en primera persona: no hay personaje suyo visible** (Ronald, 09-10: «yo soy quien vive todo; no sería necesario un personaje»; "
        "vio una figura a la derecha, que era la jefa, y la tomó por su personaje). La escena es lo que el alumno ve; **lo que dicen los demás sale en una caja arriba de la escena "
        "con su cara o ícono y su nombre** (la jefa con cara; Dani en silueta; la madre como teléfono; la nota del director como papel; el estilo de la «A3» del boceto `docs/juego/bocetos/caras/`); "
        "**lo que dice o decide el jugador sale en una caja de otro color y sin cara**. Un mundo caminable visto desde arriba (estilo RPG, con personaje y mapa) se deja para otro tema o juego, "
        "como mapa para moverse entre lugares, y se decide con bocetos; no se mezcla dentro de la mesa.\n",
    ),
    (
        "**Una sola línea gráfica para todos los juegos; el ambiente cambia por escena**",
        "- **Una sola línea gráfica para todos los juegos; el ambiente cambia por escena** (Ronald, 09-10: «los ambientes no cambian según la historia?, no quiero un ambiente igual para todos los temas y casos»; "
        "«el arte se ve horrible, es lo más urgente»). La línea (paleta EDG32, tamaños, contorno, sombreado, cómo se dibuja un documento) está en `docs/juego/ARTE-LINEA-GRAFICA.md` y la comprueba "
        "`scripts/verificar_arte.py`; es igual en todos los juegos. El **ambiente** (lugar, hora, luz, color dominante) cambia por escena según la historia, lo propone el director con el narrativo "
        "(`docs/juego/gdd/aspecto-<materia>-<tema>-ambientes.md`) y lo aprueba Ronald; se logra con el mismo arte base más tablas de cambio de color y la luz del motor, no dibujando todo de nuevo. "
        "Todo dibujo nuevo sigue la guía; el arte que no cumple (hoy, todo el provisional) se reemplaza. Un ambiente nuevo avisa si necesita música distinta.\n",
    ),
]


def repartir(ruta: str) -> str:
    crudo = open(ruta, "rb").read()
    t = crudo.decode("utf-8-sig")
    if ANCLA not in t:
        return "sin ancla (no lleva el bloque común)"
    fin = "\r\n" if "\r\n" in t else "\n"
    lineas = t.split(fin)
    puestas = []
    for marca, texto in REGLAS:
        if marca in t:
            continue
        for i, l in enumerate(lineas):
            if l.startswith(ANCLA):
                j = i + 1
                # se pone después de las reglas de esta tanda que ya estén puestas
                while j < len(lineas) and any(m in lineas[j] for m, _ in REGLAS):
                    j += 1
                lineas.insert(j, texto.rstrip("\n"))
                puestas.append(marca[:40])
                break
    if not puestas:
        return "ya estaban"
    tmp = ruta + ".tmp"
    with open(tmp, "w", encoding="utf-8-sig" if crudo[:3] == b"\xef\xbb\xbf" else "utf-8", newline="") as f:
        f.write(fin.join(lineas))
    os.replace(tmp, ruta)
    return f"agregadas {len(puestas)}"


def main() -> int:
    rutas = [os.path.join(RAIZ, "docs", "juego", "REGLAS-COMUNES-AGENTES.md")] + sorted(glob.glob(os.path.join(RAIZ, ".claude", "agents", "*.md")))
    for r in rutas:
        print(f"{os.path.relpath(r, RAIZ):55s} {repartir(r)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
