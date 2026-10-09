"""Convierte PNG que ya existen a la paleta EDG32 de la línea gráfica (docs/juego/ARTE-LINEA-GRAFICA.md), sin redibujar nada.

Uso:  python scripts/convertir_a_paleta.py <carpeta con PNG> <carpeta de salida>

Cada píxel pasa al color más cercano de EDG32; la transparencia queda en todo o nada (alfa >= 128 se vuelve opaco). Los efectos de luz
(archivos con «luz», «cono» o «mota» en el nombre) se saltan: llevan transparencia a propósito. No modifica los originales.
Es la vía barata: conserva el detalle de lo que ya hay y lo hace cumplir la paleta. Lo que se vea mal después se retoca a mano.
"""
import os
import sys

from PIL import Image

EDG32 = """be4a2f d77643 ead4aa e4a672 b86f50 733e39 3e2731 a22633 e43b44 f77622 feae34 fee761 63c74d 3e8948 265c42 193c3e
124e89 0099db 2ce8f5 ffffff c0cbdc 8b9bb4 5a6988 3a4466 262b44 181425 ff0044 68386c b55088 f6757a e8b796 c28569""".split()
PAL = [tuple(int(h[i : i + 2], 16) for i in (0, 2, 4)) for h in EDG32]


def cercano(c, cache={}):
    if c in cache:
        return cache[c]
    r, g, b = c
    # pesos de percepción aproximados para que el verde y el rojo pesen más que el azul
    m = min(PAL, key=lambda p: 2 * (p[0] - r) ** 2 + 4 * (p[1] - g) ** 2 + 3 * (p[2] - b) ** 2)
    cache[c] = m
    return m


def convertir(ruta, destino):
    im = Image.open(ruta).convert("RGBA")
    px = im.load()
    for y in range(im.height):
        for x in range(im.width):
            r, g, b, a = px[x, y]
            px[x, y] = (0, 0, 0, 0) if a < 128 else cercano((r, g, b)) + (255,)
    os.makedirs(os.path.dirname(os.path.abspath(destino)), exist_ok=True)
    tmp = destino + ".tmp.png"
    im.save(tmp)
    os.replace(tmp, destino)


def main() -> int:
    if len(sys.argv) < 3:
        print(__doc__)
        return 2
    n = 0
    for f in sorted(os.listdir(sys.argv[1])):
        if not f.lower().endswith(".png") or any(k in f.lower() for k in ("luz", "cono", "mota")):
            continue
        convertir(os.path.join(sys.argv[1], f), os.path.join(sys.argv[2], f))
        n += 1
    print(f"{n} PNG convertidos a EDG32 -> {sys.argv[2]}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
