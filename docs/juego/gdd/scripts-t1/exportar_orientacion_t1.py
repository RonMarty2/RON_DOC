"""Copia los textos de orientación de NT1.12 (05-mundo-y-narrativa.md) a src/lib/juego/psicoestadistica/orientacion-t1.json.

Los textos no se escriben a mano en el código: si la narrativa cambia, se vuelve a correr este script.
Se corre con `python` (no `python -I`). Busca todo a partir de su propia carpeta.

Sale un diccionario id -> texto: «A1»…«A13» con la línea NUEVA de la tabla A, y «B-…» con el texto de la tabla B.
Las filas de tabla A que dicen «Se quita» (A9) no salen.
"""
import json
import os
import re
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
NARRATIVA = os.path.join(AQUI, "..", "05-mundo-y-narrativa.md")
SALIDA = os.path.join(AQUI, "..", "..", "..", "..", "src", "lib", "juego", "psicoestadistica", "orientacion-t1.json")


def sacar_comillas(t: str) -> str:
    t = t.strip()
    if t.startswith("«") and t.endswith("»") and t.count("«") == 1:
        t = t[1:-1]
    return t.strip()


def main() -> int:
    with open(NARRATIVA, encoding="utf-8") as f:
        todo = f.read()
    ini = todo.index("### NT1.12")
    fin = todo.index("### Lista de salida", ini)
    seccion = todo[ini:fin]
    salida: dict[str, str] = {}
    for linea in seccion.splitlines():
        m = re.match(r"^\|\s*(A\d+|B-[\w-]+|J\d+)\s*\|(.*)\|\s*$", linea)
        if not m:
            continue
        id_ = m.group(1)
        celdas = [c.strip() for c in m.group(2).split("|")]
        if id_.startswith("A"):
            # | Id | pantalla | vieja | nueva |
            nueva = celdas[-1]
            if nueva.startswith("Se quita"):
                continue
            salida[id_] = sacar_comillas(nueva)
        elif id_.startswith("J"):
            # | Id | fase | texto | cuándo |
            salida[id_] = sacar_comillas(celdas[1])
        else:
            # | Id | pantalla | quién | texto | cuándo |
            salida[id_] = sacar_comillas(celdas[2])
    esperados_a = {f"A{i}" for i in range(1, 14)} - {"A9"}
    faltan = sorted(esperados_a - set(salida))
    cantidad_b = sum(1 for k in salida if k.startswith("B-"))
    faltan_j = sorted({f"J{i}" for i in range(1, 7)} - set(salida))
    if faltan or faltan_j or cantidad_b != 39:
        print(f"ERROR: faltan {faltan} {faltan_j}; filas B: {cantidad_b} (esperado 39)")
        return 1
    destino = os.path.normpath(SALIDA)
    tmp = destino + ".tmp"
    with open(tmp, "w", encoding="utf-8", newline="\n") as f:
        json.dump({"_aviso": "Generado por docs/juego/gdd/scripts-t1/exportar_orientacion_t1.py desde 05-mundo-y-narrativa.md NT1.12. No editar a mano.", "textos": salida}, f, ensure_ascii=False, indent=1)
        f.write("\n")
    os.replace(tmp, destino)
    print(f"OK: {len(salida)} textos ({len(esperados_a)} de la tabla A, {cantidad_b} de la B) -> {destino}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
