# -*- coding: utf-8 -*-
"""Agrega la regla «cada entrega se comprueba en el disco y se sube antes de seguir» (Ronald, 08-10-2026) a las reglas
comunes de los agentes del juego y a cada agente que las trae copiadas.

Corre con:  python agregar_regla_guardar.py        (desde cualquier carpeta)

La inserta justo debajo de la regla «Todo lo que Ronald decide se vuelve regla de los agentes en el mismo commit».
No la agrega dos veces (comprueba antes), respeta el fin de linea de cada archivo y escribe a .tmp + os.replace.
"""
import glob
import io
import os
import sys

sys.stdout.reconfigure(encoding="utf-8")
HERE = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.abspath(os.path.join(HERE, "..", "..", "..", ".."))

ANCLA = "- **Todo lo que Ronald decide se vuelve regla de los agentes en el mismo commit**"
MARCA = "Cada entrega se comprueba en el disco y se sube antes de seguir"
REGLA = (
    "- **" + MARCA + "** (Ronald, 08-10-2026). Cuando un agente termina, la sesión que lo corrió comprueba que el archivo "
    "existe en el disco **con el contenido nuevo** (lo abre o busca en él el título de la versión; no le basta que el agente "
    "diga «hecho») y hace `git add`, `git commit` y `git push` **antes** de lanzar otro agente, de seguir con otro paso o de "
    "mostrárselo a Ronald. Un agente que no pudo escribir su archivo lo dice en la primera línea de su respuesta. "
    "Por qué: el 08-10 el bucle v2 y el aprendizaje v2.1 del Tema 1 se dieron por hechos, nunca quedaron guardados en ninguna "
    "de las dos PC ni en GitHub, y hubo que rehacerlos esa misma tarde."
)


def principal():
    rutas = [os.path.join(RAIZ, "docs", "juego", "REGLAS-COMUNES-AGENTES.md")]
    rutas += sorted(glob.glob(os.path.join(RAIZ, ".claude", "agents", "*.md")))
    tocados, ya, sin_ancla = [], [], []
    for ruta in rutas:
        with io.open(ruta, encoding="utf-8", newline="") as f:
            texto = f.read()
        nombre = os.path.basename(ruta)
        if MARCA in texto:
            ya.append(nombre)
            continue
        fin = "\r\n" if "\r\n" in texto else "\n"
        lineas = texto.split(fin)
        donde = [i for i, l in enumerate(lineas) if l.startswith(ANCLA)]
        if len(donde) != 1:
            sin_ancla.append("%s (%d)" % (nombre, len(donde)))
            continue
        lineas.insert(donde[0] + 1, REGLA)
        nuevo = fin.join(lineas)
        with io.open(ruta + ".tmp", "w", encoding="utf-8", newline="") as f:
            f.write(nuevo)
        os.replace(ruta + ".tmp", ruta)
        tocados.append(nombre)
    print("agregada en  :", ", ".join(tocados) or "ninguno")
    print("ya la tenian :", ", ".join(ya) or "ninguno")
    print("sin la regla de anclaje (no se tocan):", ", ".join(sin_ancla) or "ninguno")


if __name__ == "__main__":
    principal()
