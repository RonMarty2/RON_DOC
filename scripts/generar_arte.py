"""Convierte los dibujos escritos como texto (.px) en PNG, y arma la hoja de estilo para compararlos.
Método y reglas: docs/juego/ARTE-LINEA-GRAFICA.md (sección 7).

Uso:  python scripts/generar_arte.py <carpeta con .px> <carpeta de salida de PNG> [--hoja ruta.png] [--ambiente nombre ...]

Formato de un .px (tres maneras de escribir una fila, se pueden mezclar):
    fila literal:       ..aabb..
    fila comprimida:    ~ .2 a2 b2 .2        (letra + cantidad)
    fila repetida:      *14 ~ .11 k1 l1 .11  (esa fila, 14 veces)

Cabeceras:
    # nombre: jefa_retrato         (opcional; si falta, el del archivo)
    # nota: lo que sea             (opcional)
    <filas de píxeles, una letra por color; todas del mismo largo>

Letras (paleta EDG32, la única permitida):  . = transparente
  0 #181425  1 #262b44  2 #3a4466  3 #5a6988  4 #8b9bb4  5 #c0cbdc  6 #ffffff
  a #3e2731  b #733e39  c #be4a2f  d #d77643  e #e4a672  f #e8b796  g #c28569  h #b86f50  i #ead4aa
  j #fee761  k #feae34  l #f77622  m #a22633  n #e43b44  o #68386c  p #b55088  q #f6757a
  r #63c74d  s #3e8948  t #265c42  u #193c3e  v #124e89  w #0099db  x #2ce8f5  y #ff0044

Ambientes: archivos `ambiente-<nombre>.json` en la carpeta de los .px: {"cambios": {"181425": "3a4466", ...}} (color base -> color del ambiente,
siempre dentro de la paleta). Cada ambiente pedido genera una copia `<pieza>__<ambiente>.png` (cambio de paleta, no se dibuja otra vez).

Se corre con `python`. Escribe a .tmp y reemplaza. No toca los .px.
"""
import argparse
import json
import os
import re
import sys

from PIL import Image, ImageDraw

LETRAS = {
    "0": "181425", "1": "262b44", "2": "3a4466", "3": "5a6988", "4": "8b9bb4", "5": "c0cbdc", "6": "ffffff",
    "a": "3e2731", "b": "733e39", "c": "be4a2f", "d": "d77643", "e": "e4a672", "f": "e8b796", "g": "c28569", "h": "b86f50", "i": "ead4aa",
    "j": "fee761", "k": "feae34", "l": "f77622", "m": "a22633", "n": "e43b44", "o": "68386c", "p": "b55088", "q": "f6757a",
    "r": "63c74d", "s": "3e8948", "t": "265c42", "u": "193c3e", "v": "124e89", "w": "0099db", "x": "2ce8f5", "y": "ff0044",
}
PALETA = set(LETRAS.values())


def rgb(h: str) -> tuple:
    return tuple(int(h[i : i + 2], 16) for i in (0, 2, 4))


def leer_px(ruta: str):
    nombre = os.path.splitext(os.path.basename(ruta))[0]
    filas = []
    for linea in open(ruta, encoding="utf-8").read().splitlines():
        if linea.startswith("#"):
            if linea.lower().startswith("# nombre:"):
                nombre = linea.split(":", 1)[1].strip()
            continue
        if linea.strip() == "":
            continue
        veces = 1
        m = re.match(r"^\*(\d+)\s+(.*)$", linea)
        if m:  # «*14 ~ .11 k1 l1 .11»: repite la fila 14 veces
            veces, linea = int(m.group(1)), m.group(2)
        if linea.startswith("~"):  # modo comprimido: «~ .10 a12 .10» = 10 transparentes, 12 de «a», 10 transparentes
            fila = ""
            for letra, n in re.findall(r"(\S)(\d+)", linea[1:]):
                fila += letra * int(n)
            linea = fila
        filas.extend([linea.rstrip()] * veces)
    if not filas:
        raise ValueError(f"{ruta}: sin filas")
    ancho = len(filas[0])
    for i, f in enumerate(filas):
        if len(f) != ancho:
            raise ValueError(f"{ruta}: la fila {i + 1} mide {len(f)} y la primera {ancho}")
        for c in f:
            if c != "." and c not in LETRAS:
                raise ValueError(f"{ruta}: letra «{c}» fuera de la paleta (fila {i + 1})")
    return nombre, filas


def a_imagen(filas, cambios=None) -> Image.Image:
    cambios = cambios or {}
    im = Image.new("RGBA", (len(filas[0]), len(filas)), (0, 0, 0, 0))
    px = im.load()
    for y, f in enumerate(filas):
        for x, c in enumerate(f):
            if c == ".":
                continue
            h = LETRAS[c]
            h = cambios.get(h, h)
            if h not in PALETA:
                raise ValueError(f"el cambio de ambiente usa un color fuera de la paleta: {h}")
            px[x, y] = rgb(h) + (255,)
    return im


def guardar(im: Image.Image, destino: str):
    os.makedirs(os.path.dirname(os.path.abspath(destino)), exist_ok=True)
    tmp = destino + ".tmp.png"
    im.save(tmp)
    os.replace(tmp, destino)


def hoja(piezas, ruta, escala=4):
    """Todas las piezas en una hoja, ampliadas por un número entero, sobre fondo de la paleta, con su nombre."""
    margen = 10
    ancho_max = 880
    x = y = margen
    fila_alta = 0
    cajas = []
    for rotulo, im in piezas:
        w, h = im.width * escala, im.height * escala
        if x + w + margen > ancho_max:
            x = margen
            y += fila_alta + 22
            fila_alta = 0
        cajas.append((rotulo, im, x, y, w, h))
        x += w + margen
        fila_alta = max(fila_alta, h)
    alto = y + fila_alta + 26
    fondo = Image.new("RGBA", (ancho_max, alto), rgb("262b44") + (255,))
    d = ImageDraw.Draw(fondo)
    for rotulo, im, cx, cy, w, h in cajas:
        d.rectangle([cx - 1, cy - 1, cx + w, cy + h], outline=rgb("3a4466"))
        fondo.alpha_composite(im.resize((w, h), Image.NEAREST), (cx, cy))
        d.text((cx, cy + h + 3), rotulo[:36], fill=rgb("c0cbdc"))
    guardar(fondo, ruta)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("entrada")
    ap.add_argument("salida")
    ap.add_argument("--hoja")
    ap.add_argument("--ambiente", action="append", default=[])
    a = ap.parse_args()
    ambientes = {}
    for n in a.ambiente:
        ambientes[n] = json.load(open(os.path.join(a.entrada, f"ambiente-{n}.json"), encoding="utf-8"))["cambios"]
    piezas = []
    archivos = sorted(f for f in os.listdir(a.entrada) if f.endswith(".px"))
    for f in archivos:
        nombre, filas = leer_px(os.path.join(a.entrada, f))
        im = a_imagen(filas)
        guardar(im, os.path.join(a.salida, f"{nombre}.png"))
        piezas.append((nombre, im))
        for n, cambios in ambientes.items():
            v = a_imagen(filas, cambios)
            guardar(v, os.path.join(a.salida, f"{nombre}__{n}.png"))
            piezas.append((f"{nombre} · {n}", v))
    if a.hoja:
        hoja(piezas, a.hoja)
    print(f"{len(archivos)} piezas -> {a.salida}" + (f"; hoja: {a.hoja}" if a.hoja else ""))
    return 0


if __name__ == "__main__":
    sys.exit(main())
