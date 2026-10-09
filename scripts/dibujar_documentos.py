"""Dibuja los documentos del juego (los papeles de la carpeta) como archivos .px, con la línea gráfica (docs/juego/ARTE-LINEA-GRAFICA.md).

Todos comparten la misma hoja de 40x50 px (papel `i`, contorno `g`, sombra interior `e`) y cada tipo tiene UN detalle que lo distingue a un vistazo.
Salen en docs/juego/arte/psicoestadistica/doc_<tipo>.px; después `scripts/generar_arte.py` los convierte a PNG.

Uso:  python scripts/dibujar_documentos.py <carpeta de salida de los .px>
Se corre con `python`. Es solo la plantilla: cada .px resultante se puede retocar a mano.
"""
import os
import sys

W, H = 40, 50


def hoja():
    g = [["." for _ in range(W)] for _ in range(H)]
    for y in range(H):
        for x in range(W):
            borde = x in (0, W - 1) or y in (0, H - 1)
            esquina = (x in (0, W - 1)) and (y in (0, H - 1))
            if esquina:
                continue
            g[y][x] = "g" if borde else "i"
    for y in range(1, H - 1):  # sombra interior derecha y abajo (la luz viene de arriba a la izquierda)
        g[y][W - 2] = "e"
    for x in range(1, W - 1):
        g[H - 2][x] = "e"
    return g


def rect(g, x, y, w, h, c):
    for yy in range(y, y + h):
        for xx in range(x, x + w):
            g[yy][xx] = c


def linea_h(g, x, y, n, c):
    rect(g, x, y, n, 1, c)


def texto(g, x, y, filas, c="h", ancho=30, ultima=0.6):
    """Líneas de texto: cada una con 1 px de alto y 2 px de separación; la última más corta."""
    for i in range(filas):
        n = ancho if i < filas - 1 else int(ancho * ultima)
        linea_h(g, x, y + i * 3, n, c)


def circulo(g, cx, cy, r, borde, relleno=None):
    for y in range(cy - r, cy + r + 1):
        for x in range(cx - r, cx + r + 1):
            d = (x - cx) ** 2 + (y - cy) ** 2
            if d <= r * r + r // 2:
                g[y][x] = relleno if (relleno and d < (r - 1) ** 2) else borde


def sello(g, cx, cy, c="n"):
    circulo(g, cx, cy, 4, c)
    rect(g, cx - 2, cy, 5, 1, "m")


def a_texto(g):
    return "\n".join("".join(f) for f in g) + "\n"


def acta():
    g = hoja()
    rect(g, 4, 3, 30, 3, "m")
    linea_h(g, 4, 8, 20, "a")
    texto(g, 4, 11, 8, "h", 30)
    sello(g, 28, 41)
    linea_h(g, 4, 44, 14, "a")
    return g


def cuaderno():
    g = hoja()
    for x in (6, 13, 20, 27, 34):  # anillas
        rect(g, x, 1, 2, 3, "a")
        rect(g, x, 3, 2, 1, "2")
    for y in range(8, 47, 4):  # renglones azules
        linea_h(g, 3, y, 34, "4")
    rect(g, 8, 5, 1, 42, "n")  # margen rojo
    for i, (y, n) in enumerate([(7, 14), (11, 20), (15, 9), (23, 18), (31, 22), (35, 11)]):
        linea_h(g, 11, y, n, "v")  # letra a mano
    return g


def informe():
    g = hoja()
    rect(g, 3, 3, 34, 4, "a")
    linea_h(g, 6, 5, 16, "i")
    # gráfico de barras
    rect(g, 4, 10, 1, 17, "a")
    linea_h(g, 4, 26, 30, "a")
    for i, alto in enumerate([6, 11, 8, 14]):
        rect(g, 8 + i * 7, 26 - alto, 4, alto, "v" if i != 3 else "w")
    texto(g, 4, 30, 5, "h", 30)
    linea_h(g, 4, 46, 12, "a")
    return g


def correo():
    g = hoja()
    rect(g, 3, 3, 34, 9, "5")  # cabecera gris azulada
    linea_h(g, 3, 12, 34, "4")
    for i, (a, b) in enumerate([(5, 14), (5, 10), (5, 18)]):
        rect(g, 5, 5 + i * 3, 5, 1, "a")  # De:, Para:, Asunto:
        linea_h(g, 12, 5 + i * 3, b, "3")
    texto(g, 4, 16, 8, "h", 31)
    linea_h(g, 4, 43, 10, "a")
    rect(g, 30, 40, 5, 5, "w")  # sobre / icono de correo
    linea_h(g, 30, 40, 5, "v")
    return g


def libro_registro():
    g = hoja()
    rect(g, 3, 3, 34, 3, "b")  # cabecera del libro
    for x in (3, 14, 22, 30, 36):  # columnas
        rect(g, x, 3, 1, 44, "g")
    for y in range(6, 47, 4):  # filas
        linea_h(g, 3, y, 34, "g")
    for i, y in enumerate(range(8, 45, 4)):
        linea_h(g, 5, y, 6 + (i * 3) % 5, "a")
        linea_h(g, 16, y, 4 + (i * 2) % 4, "h")
        if i % 2 == 0:
            rect(g, 32, y - 1, 2, 2, "m")  # marca
    return g


def planilla():
    g = hoja()
    rect(g, 3, 3, 34, 4, "v")
    for x in (3, 13, 21, 29, 36):
        rect(g, x, 3, 1, 44, "5" if x else "g")
    for y in range(7, 47, 5):
        linea_h(g, 3, y, 34, "5")
    for i, y in enumerate(range(9, 45, 5)):
        for j, x in enumerate((5, 15, 23, 31)):
            linea_h(g, x, y, 3, "a" if (i + j) % 3 else "m")
    return g


def lista():
    g = hoja()
    linea_h(g, 4, 5, 18, "a")
    linea_h(g, 4, 7, 10, "a")
    for i, y in enumerate(range(12, 46, 5)):
        rect(g, 5, y, 3, 3, "a")  # casilla
        rect(g, 6, y + 1, 1, 1, "i")
        linea_h(g, 11, y + 1, 18 - (i * 3) % 7, "h")
        if i % 3 == 0:
            g[y][5] = "s"
            g[y + 1][6] = "r"
            g[y][8] = "r"  # tilde verde
    return g


def calendario():
    g = hoja()
    rect(g, 3, 3, 34, 6, "n")  # franja roja del mes
    linea_h(g, 6, 5, 12, "i")
    for fila in range(5):
        for col in range(7):
            x, y = 4 + col * 5, 12 + fila * 7
            rect(g, x, y, 3, 5, "5")
            g[y + 1][x + 1] = "a"
    for fila, col in [(2, 3), (2, 4), (2, 5)]:  # semana de examenes
        rect(g, 4 + col * 5, 12 + fila * 7, 3, 5, "k")
        g[12 + fila * 7 + 1][4 + col * 5 + 1] = "a"
    g[12 + 4 * 7 + 1][4 + 6 * 5 + 1] = "m"
    return g


def oficio():
    g = hoja()
    circulo(g, 20, 8, 4, "v", "w")  # escudo
    linea_h(g, 10, 15, 20, "a")
    linea_h(g, 13, 17, 14, "h")
    linea_h(g, 4, 20, 32, "g")
    texto(g, 4, 23, 7, "h", 31)
    sello(g, 30, 44, "m")
    linea_h(g, 4, 45, 14, "a")
    return g


TIPOS = {"acta": acta, "cuaderno": cuaderno, "informe": informe, "correo": correo, "registro": libro_registro, "planilla": planilla, "lista": lista, "calendario": calendario, "oficio": oficio}


def main() -> int:
    if len(sys.argv) < 2:
        print(__doc__)
        return 2
    os.makedirs(sys.argv[1], exist_ok=True)
    for nombre, f in TIPOS.items():
        g = f()
        assert len(g) == H and all(len(r) == W for r in g), nombre
        ruta = os.path.join(sys.argv[1], f"doc_{nombre}.px")
        tmp = ruta + ".tmp"
        with open(tmp, "w", encoding="utf-8", newline="\n") as fh:
            fh.write(f"# nombre: doc_{nombre}\n# nota: documento «{nombre}», 40x50. Hoja común con un detalle propio. Generado por scripts/dibujar_documentos.py; se puede retocar a mano.\n")
            fh.write(a_texto(g))
        os.replace(tmp, ruta)
    print(f"{len(TIPOS)} documentos -> {sys.argv[1]}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
