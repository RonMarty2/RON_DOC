"""Dibuja con código los retratos, íconos, pared, madera y ficha del Tema 1 de Psicoestadística y los guarda como .px.
Existe para no contar píxeles a mano (lección del 09-10). Los .px que salen se pueden retocar a mano después.

Uso:  python scripts/dibujar_retratos.py <carpeta de salida de .px>
Letras: las de scripts/generar_arte.py (paleta EDG32).
"""
import math
import os
import sys


class Lienzo:
    def __init__(self, w, h):
        self.w, self.h = w, h
        self.p = [["."] * w for _ in range(h)]

    def set(self, x, y, c):
        if 0 <= x < self.w and 0 <= y < self.h:
            self.p[y][x] = c

    def get(self, x, y):
        return self.p[y][x] if 0 <= x < self.w and 0 <= y < self.h else "."

    def rect(self, x0, y0, x1, y1, c):
        for y in range(y0, y1 + 1):
            for x in range(x0, x1 + 1):
                self.set(x, y, c)

    def hl(self, y, x0, x1, c):
        self.rect(x0, y, x1, y, c)

    def ell(self, cx, cy, rx, ry, c, solo_sobre=None, cond=None):
        """Elipse con centro en coordenadas de borde (cx=16 es el eje de un lienzo de 32)."""
        for y in range(self.h):
            for x in range(self.w):
                if ((x + .5 - cx) / rx) ** 2 + ((y + .5 - cy) / ry) ** 2 <= 1:
                    if solo_sobre is not None and self.get(x, y) not in solo_sobre:
                        continue
                    if cond is not None and not cond(x, y):
                        continue
                    self.set(x, y, c)

    def reemplazar(self, de, a, cond):
        for y in range(self.h):
            for x in range(self.w):
                if self.p[y][x] in de and cond(x, y):
                    self.p[y][x] = a

    def borde(self, c, sobre):
        """Contorno de 1 px del color c alrededor de lo que no es transparente, solo donde toca transparente."""
        nuevo = [f[:] for f in self.p]
        for y in range(self.h):
            for x in range(self.w):
                if self.p[y][x] == "." and any(self.get(x + dx, y + dy) in sobre for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1))):
                    nuevo[y][x] = c
        self.p = nuevo

    def filas(self):
        return ["".join(f) for f in self.p]


def guardar(l, carpeta, nombre, nota):
    ruta = os.path.join(carpeta, nombre + ".px")
    tmp = ruta + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        f.write(f"# nombre: {nombre}\n# nota: {nota}\n")
        for fila in l.filas():
            f.write(fila + "\n")
    os.replace(tmp, ruta)


# ------------------------------------------------------------------ la jefa
def jefa(gesto):
    """gesto: 'neutral' (brazos cruzados), 'preocupada' (cabeza entre las manos), 'contenta' (pulgar arriba)."""
    L = Lienzo(32, 32)
    # pelo de atrás (castaño oscuro: base a, sombra 0, brillo b a la izquierda por la lámpara)
    L.ell(16, 13, 11, 10.5, "a")
    L.rect(5, 14, 26, 27, "a")
    # suéter vino con luz a la izquierda
    hw = [7, 10, 12, 14, 15, 16, 16]
    for i, y in enumerate(range(25, 32)):
        L.hl(y, 16 - hw[i], 15 + hw[i], "m")
        L.hl(y, 16 - hw[i], 16 - hw[i] + 3 + (i // 3), "n")
    L.rect(21, 28, 31, 31, "m")
    L.rect(24, 30, 31, 31, "o")
    # cuello
    L.rect(13, 22, 18, 26, "f")
    L.rect(13, 22, 18, 24, "g")
    L.hl(25, 13, 18, "g")
    L.hl(26, 12, 19, "q")
    L.hl(27, 11, 20, "n")
    # cara
    L.ell(16, 15, 8, 9, "f")
    L.hl(10, 11, 13, "i"); L.hl(11, 10, 12, "i"); L.hl(17, 10, 11, "i")
    L.reemplazar("f", "e", lambda x, y: x >= 21 and ((x + .5 - 16) / 8) ** 2 + ((y + .5 - 15) / 9) ** 2 > .55)
    L.reemplazar("fe", "g", lambda x, y: ((x + .5 - 16) / 8) ** 2 + ((y + .5 - 15) / 9) ** 2 > .84 and x >= 18)
    # pelo de adelante: flequillo con raya al lado y mechones a los lados
    for x in range(8, 24):
        tope = 8 + (1 if 11 <= x <= 14 else 0) + (2 if x >= 20 else 0) + (3 if x >= 22 else 0)
        for y in range(5, tope + 1):
            L.set(x, y, "a")
    L.rect(8, 8, 9, 15, "a")
    L.rect(22, 9, 23, 14, "a")
    L.rect(5, 18, 8, 28, "a")
    L.rect(23, 18, 26, 28, "a")
    # brillo del pelo
    for (x, y) in [(10, 5), (11, 4), (12, 4), (13, 4), (9, 6), (8, 7), (7, 9), (6, 11), (6, 13), (5, 15), (5, 17), (5, 19), (6, 21), (6, 23), (7, 25), (12, 6), (13, 6), (14, 7), (15, 7), (10, 7)]:
        if L.get(x, y) == "a":
            L.set(x, y, "b")
    for (x, y) in [(25, 20), (25, 22), (26, 24), (25, 26), (24, 12), (24, 14)]:
        if L.get(x, y) == "a":
            L.set(x, y, "o")
    # cejas
    if gesto == "preocupada":
        for x, y in [(9, 13), (10, 13), (11, 12), (12, 12), (13, 11), (18, 11), (19, 12), (20, 12), (21, 13), (22, 13)]:
            L.set(x, y, "a")
    elif gesto == "contenta":
        for x in range(10, 14):
            L.set(x, 12, "a")
        for x in range(18, 22):
            L.set(x, 12, "a")
        L.set(9, 13, "a")
        L.set(22, 13, "a")
    else:
        for x in range(10, 14):
            L.set(x, 12, "a")
        for x in range(18, 22):
            L.set(x, 12, "a")
    # lentes: marco 0, vidrio con brillo, ojos 2x2 con blanco al costado
    def lente(x0):
        L.rect(x0, 13, x0 + 5, 17, "0")
        L.rect(x0 + 1, 14, x0 + 4, 16, "5")
        L.rect(x0 + 2, 14, x0 + 3, 15, "0")      # el ojo, 2x2
        L.set(x0 + 1, 14, "6")                      # brillo del vidrio
        L.set(x0 + 2, 16, "4")
        L.set(x0 + 3, 16, "4")
    lente(9)
    lente(17)
    L.hl(14, 15, 16, "0")          # puente
    L.set(8, 14, "0")
    L.set(23, 14, "0")
    if gesto == "contenta":
        for x0 in (9, 17):           # ojos que sonríen: la parte baja del vidrio sube
            L.hl(16, x0 + 1, x0 + 4, "e")
    # nariz y mejillas
    L.set(16, 18, "g"); L.set(16, 19, "h"); L.set(15, 19, "g")
    L.set(10, 20, "q"); L.set(11, 20, "q"); L.set(21, 20, "q"); L.set(22, 20, "q")
    # boca
    if gesto == "preocupada":
        L.hl(22, 14, 17, "m"); L.set(13, 23, "m"); L.set(18, 23, "m")
    elif gesto == "contenta":
        L.hl(22, 12, 19, "m"); L.hl(23, 13, 18, "6"); L.hl(24, 14, 17, "q")
    else:
        L.hl(22, 14, 17, "m"); L.hl(23, 15, 16, "q")
    # gestos
    if gesto == "neutral":      # brazos cruzados: antebrazos sobre el pecho y una mano que asoma
        L.hl(27, 3, 28, "m"); L.hl(28, 3, 28, "n"); L.hl(29, 2, 29, "n"); L.hl(30, 2, 29, "m"); L.hl(31, 2, 29, "o")
        L.hl(28, 3, 5, "q")
        L.rect(21, 28, 26, 30, "f"); L.hl(30, 21, 26, "g")
        for x in (22, 24, 26):
            L.set(x, 29, "g")
        L.rect(2, 28, 4, 30, "m")
        L.hl(29, 8, 20, "m")             # pliegue entre los dos brazos
    elif gesto == "preocupada":  # la cabeza entre las manos
        for lado in ("i", "d"):
            x0 = 3 if lado == "i" else 22
            L.ell(x0 + 3.5, 20, 4, 6.5, "f")
            L.rect(x0, 25, x0 + 6, 31, "m")
            L.rect(x0 + 1 if lado == "i" else x0, 25, x0 + 6 if lado == "i" else x0 + 5, 31, "n" if lado == "i" else "m")
            for yy in (15, 17, 19):
                L.hl(yy, x0 + 1, x0 + 5, "g")
        L.rect(25, 25, 28, 31, "o")
    else:                          # pulgar arriba a la derecha: puno cerrado y pulgar
        L.rect(21, 25, 31, 31, "m")
        L.rect(21, 25, 23, 31, "n")
        L.rect(24, 21, 31, 29, "f")                  # puno
        L.rect(30, 21, 31, 29, "g")
        for yy in (23, 25, 27):
            L.hl(yy, 25, 31, "g")                    # dedos doblados
        L.hl(29, 24, 31, "h")
        L.rect(24, 14, 26, 21, "f")                  # pulgar
        L.rect(27, 15, 27, 21, "g")
        L.hl(14, 25, 25, "f"); L.hl(15, 24, 26, "i")  # punta con la una
        L.set(24, 21, "i")
        L.hl(30, 24, 31, "m")
    return L


# ------------------------------------------------------------------ Beto
def beto():
    L = Lienzo(32, 32)
    # camiseta naranja-roja de deporte
    hw = [7, 10, 12, 14, 15, 16, 16]
    for i, y in enumerate(range(25, 32)):
        L.hl(y, 16 - hw[i], 15 + hw[i], "c")
        L.hl(y, 16 - hw[i], 16 - hw[i] + 3 + (i // 3), "d")
    L.rect(22, 28, 31, 31, "b")
    L.rect(26, 30, 31, 31, "a")
    L.hl(26, 11, 20, "6")
    # cuello
    L.rect(13, 22, 18, 25, "e")
    L.rect(13, 22, 18, 24, "h")
    # orejas
    L.rect(7, 14, 8, 18, "e"); L.set(7, 16, "h")
    L.rect(23, 14, 24, 18, "g"); L.set(24, 16, "h")
    # cara
    L.ell(16, 15.5, 8, 9, "e")
    L.ell(12.5, 12, 4, 3.5, "f", solo_sobre="e")
    L.reemplazar("e", "g", lambda x, y: x >= 21 and ((x + .5 - 16) / 8) ** 2 + ((y + .5 - 15.5) / 9) ** 2 > .6)
    L.reemplazar("eg", "h", lambda x, y: ((x + .5 - 16) / 8) ** 2 + ((y + .5 - 15.5) / 9) ** 2 > .88 and x >= 19)
    # pelo gris a los lados bajo la gorra
    L.rect(7, 12, 8, 14, "4"); L.rect(23, 12, 24, 14, "3")
    # gorra azul: copa con brillo, visera que sobresale
    L.ell(16, 9, 9.5, 6, "v")
    L.rect(6, 9, 25, 9, "v")
    L.ell(13, 6.5, 4.5, 2.5, "w", solo_sobre="v")
    L.hl(10, 5, 26, "1")             # visera (sombra bajo la gorra)
    L.hl(9, 5, 26, "v"); L.hl(8, 7, 24, "v")
    L.hl(9, 6, 14, "w")
    L.hl(11, 8, 23, "h")             # sombra de la visera sobre la frente
    L.set(16, 3, "w")
    L.rect(15, 5, 16, 7, "w")        # logo de la gorra
    # cejas grises, ojos 2x2 contentos, arrugas
    for x in range(9, 13):
        L.set(x, 12, "4")
    for x in range(19, 23):
        L.set(x, 12, "4")
    for x0 in (10, 19):
        L.rect(x0, 14, x0 + 1, 15, "0")
        L.set(x0, 14, "6")
        L.set(x0 - 1, 16, "g"); L.set(x0 + 2, 16, "g")
    # nariz
    L.rect(15, 16, 16, 18, "g"); L.hl(19, 14, 17, "h")
    # bigote y sonrisa grande con dientes
    L.hl(20, 11, 20, "4")
    L.hl(21, 10, 12, "3"); L.hl(21, 19, 21, "3")
    L.hl(21, 13, 18, "4")
    L.hl(22, 11, 20, "m"); L.hl(23, 12, 19, "6"); L.hl(24, 13, 18, "m")
    L.set(10, 21, "g"); L.set(21, 21, "g")
    L.hl(25, 14, 17, "g")
    # silbato: cordón blanco y silbato metálico
    for i, y in enumerate(range(25, 28)):
        L.set(12 + i, y, "5"); L.set(19 - i, y, "5")
    L.rect(14, 28, 19, 30, "4")
    L.hl(28, 14, 19, "5")
    L.rect(15, 29, 16, 30, "0")
    L.hl(31, 14, 19, "3")
    L.set(20, 29, "4")
    return L


# ------------------------------------------------------------------ Ugarte
def ugarte():
    L = Lienzo(32, 32)
    # traje azul noche con luz en el borde
    hw = [7, 10, 12, 14, 15, 16, 16]
    for i, y in enumerate(range(25, 32)):
        L.hl(y, 16 - hw[i], 15 + hw[i], "2")
        L.hl(y, 16 - hw[i], 16 - hw[i] + 1, "3")
        L.hl(y, 15 + hw[i] - 2, 15 + hw[i], "1")
    # camisa blanca y corbata
    for i, y in enumerate(range(25, 32)):
        w = 3 + i
        L.hl(y, 16 - w, 15 + w, "5")
    L.rect(15, 26, 16, 27, "n")           # nudo
    for y in range(28, 32):
        L.hl(y, 15, 16, "n"); L.set(16, y, "m")
    # solapas (borde claro)
    for i, y in enumerate(range(25, 32)):
        w = 3 + i
        L.set(16 - w - 1, y, "3"); L.set(16 - w, y, "4")
        L.set(15 + w + 1, y, "2"); L.set(15 + w, y, "4" if i > 1 else "5")
        L.set(16 - w + 1, y, "5"); L.set(15 + w - 1, y, "5")
    # cuello
    L.rect(13, 22, 18, 25, "f")
    L.rect(13, 22, 18, 24, "h")
    L.hl(25, 13, 18, "5")
    # orejas
    L.rect(7, 14, 8, 18, "f"); L.set(7, 16, "g")
    L.rect(23, 14, 24, 18, "g")
    # cara más angulosa
    L.ell(16, 15.5, 8, 9.5, "f")
    L.rect(9, 20, 22, 23, "f")
    L.reemplazar("f", "e", lambda x, y: x >= 20)
    L.reemplazar("fe", "g", lambda x, y: x >= 22 or y >= 23)
    L.ell(12, 11, 3.5, 3, "i", solo_sobre="f")
    # pelo gris peinado hacia atrás, entradas
    L.ell(16, 8.5, 9, 5.5, "4")
    L.rect(7, 9, 9, 14, "4"); L.rect(22, 9, 24, 14, "3")
    L.ell(12, 6, 4, 2, "5", solo_sobre="4")
    L.hl(4, 11, 14, "6")
    L.rect(9, 9, 11, 11, "4")
    for (x, y) in [(10, 9), (11, 10), (12, 11), (21, 11), (20, 10)]:
        L.set(x, y, "f" if x < 16 else "e")
    L.hl(9, 12, 20, "e") ; L.hl(9, 12, 20, "4")
    L.hl(10, 13, 19, "f"); L.hl(10, 12, 12, "4"); L.hl(10, 20, 20, "3")
    # cejas gruesas serias, ojos 2x2, bolsas
    for x in range(9, 14):
        L.set(x, 12, "3")
    for x in range(18, 23):
        L.set(x, 12, "3")
    L.set(13, 13, "3"); L.set(18, 13, "3")
    for x0 in (10, 19):
        L.rect(x0, 14, x0 + 1, 15, "0")
        L.set(x0 - 1, 15, "5"); L.set(x0 + 2, 15, "5")
        L.hl(16, x0 - 1, x0 + 2, "g")
    # arrugas de la frente y de la nariz a la boca
    L.hl(10, 13, 19, "e")
    L.hl(10, 13, 14, "g"); L.hl(10, 17, 18, "g")
    L.rect(15, 16, 16, 18, "g"); L.hl(19, 14, 17, "h")
    L.set(12, 20, "g"); L.set(12, 21, "g"); L.set(19, 20, "g"); L.set(19, 21, "g")
    L.hl(22, 13, 18, "b")        # boca recta
    L.hl(23, 14, 17, "g")
    return L


# ------------------------------------------------------------------ Dani (silueta cabeceando)
def dani(fondo=False):
    L = Lienzo(32, 32)
    # hombros
    hw = [6, 9, 11, 13, 14, 15, 16]
    for i, y in enumerate(range(24, 32)):
        w = hw[min(i, 6)]
        L.hl(y, 16 - w + 1, 15 + w - 1, "2")
    # cabeza caída hacia adelante y a la derecha (cabecea), pelo corto
    L.ell(19, 16.5, 8, 9, "2")
    L.rect(15, 22, 21, 26, "2")
    # luz de borde a la izquierda y arriba
    for y in range(32):
        for x in range(32):
            if L.get(x, y) == "2" and (L.get(x - 1, y) == "." or L.get(x, y - 1) == "."):
                L.set(x, y, "4")
    # sombra a la derecha
    for y in range(32):
        for x in range(31, 0, -1):
            if L.get(x, y) == "2" and L.get(x + 1, y) in ".":
                L.set(x, y, "1")
    # pelo: un poco más oscuro arriba
    L.ell(19.5, 11, 7.5, 4.5, "1", solo_sobre="2")
    # mejilla caída: luz suave
    L.rect(13, 17, 14, 21, "3")
    if fondo:   # sobre la pared (ladrillo 2) la silueta clara se funde: aqui va mas oscura, con luz de borde
        for y in range(32):
            for x in range(32):
                c = L.get(x, y)
                if c in "21":
                    L.set(x, y, "0")
                elif c == "3":
                    L.set(x, y, "1")
                elif c == "4":
                    L.set(x, y, "3")
    # Z de sueño
    for (x, y) in [(24, 3), (25, 3), (26, 3), (25, 4), (24, 5), (24, 6), (25, 6), (26, 6)]:
        L.set(x, y, "5")
    for (x, y) in [(27, 9), (28, 9), (29, 9), (28, 10), (27, 11), (28, 11), (29, 11)]:
        L.set(x, y, "4")
    return L


# ------------------------------------------------------------------ íconos
def telefono():
    L = Lienzo(32, 32)
    # cuerpo
    L.ell(16, 29, 12, 6, "2")
    L.rect(5, 21, 26, 29, "2")
    L.rect(4, 29, 27, 31, "1")
    L.rect(5, 21, 26, 22, "3")
    L.rect(5, 21, 6, 29, "3")
    L.rect(25, 22, 26, 29, "1")
    # teclas: 3x3, una iluminada (lleva la llamada)
    for fy in range(3):
        for fx in range(3):
            x = 10 + fx * 4; y = 23 + fy * 2
            L.rect(x, y, x + 2, y, "4")
    L.hl(23, 14, 16, "j")
    # auricular encima
    L.rect(6, 15, 25, 19, "1")
    L.rect(6, 15, 25, 16, "2")
    L.rect(4, 14, 8, 20, "1"); L.rect(23, 14, 27, 20, "1")
    L.rect(4, 14, 8, 15, "3"); L.rect(23, 14, 27, 15, "3")
    L.hl(14, 5, 7, "4"); L.hl(14, 24, 26, "4")
    L.hl(16, 8, 22, "3")
    # ondas de sonido (llamada) arriba
    for r, c in ((4.2, "j"), (7.2, "k"), (10.2, "l")):
        for y in range(0, 13):
            for x in range(32):
                d = math.hypot(x + .5 - 16, y + .5 - 13)
                ang = math.degrees(math.atan2(-(y + .5 - 13), x + .5 - 16))
                if abs(d - r) < .62 and 35 <= ang <= 145 and L.get(x, y) == ".":
                    L.set(x, y, c)
    return L


def nota():
    L = Lienzo(32, 32)
    # papel con esquina doblada y sombra
    L.rect(6, 3, 26, 29, "i")
    L.rect(7, 30, 27, 30, "3")
    L.rect(27, 4, 27, 30, "3")
    L.rect(6, 3, 26, 3, "6" if False else "f")
    L.rect(6, 3, 6, 29, "f")
    L.rect(6, 29, 26, 29, "e")
    L.rect(26, 3, 26, 29, "e")
    for k in range(5):                      # esquina doblada
        L.hl(3 + k, 22 + k, 26, ".")
    L.rect(22, 3, 22, 7, "g")
    L.hl(7, 22, 26, "g")
    L.rect(23, 4, 25, 6, "f")
    for k in range(4):
        L.set(22 + k, 3 + k, "g")
    # membrete azul y título
    L.rect(8, 6, 19, 8, "v")
    L.hl(7, 9, 15, "w")
    # renglones de texto
    for i, ancho in enumerate((16, 16, 13, 16, 9)):
        L.hl(12 + i * 3, 8, 8 + ancho - 1, "h")
    # firma con lapicera
    for (x, y) in [(8, 27), (9, 26), (10, 27), (11, 26), (12, 27), (13, 27), (14, 26), (15, 26)]:
        L.set(x, y, "a")
    # timbre del colegio (círculo vino con estrella)
    L.ell(21, 24, 5, 5, "m")
    L.ell(21, 24, 3.4, 3.4, "i")
    L.ell(21, 24, 2.4, 2.4, "n")
    L.rect(20, 22, 21, 26, "i") if False else None
    L.set(20, 23, "6" if False else "q"); L.set(21, 23, "q")
    L.hl(24, 19, 22, "n")
    return L


# ------------------------------------------------------------------ pared de ladrillo (16x16, repite)
def ladrillo(mortero="1", ladrillo_="2", luz="3", sombra="1", var="2"):
    L = Lienzo(16, 16)
    for y in range(16):
        for x in range(16):
            L.set(x, y, mortero)
    for fila in range(4):
        y0 = fila * 4
        desp = 0 if fila % 2 == 0 else 4
        for k in range(2):
            x0 = (desp + k * 8) % 16
            for dy in range(3):
                for dx in range(7):
                    x = (x0 + dx) % 16
                    L.set(x, y0 + dy, ladrillo_)
            for dx in range(7):                       # luz arriba, sombra abajo
                L.set((x0 + dx) % 16, y0, luz)
                L.set((x0 + dx) % 16, y0 + 2, sombra if False else ladrillo_)
            L.set((x0 + 6) % 16, y0 + 1, sombra)
            L.set((x0 + 6) % 16, y0 + 2, sombra)
    # un par de ladrillos con otro tono para que no se vea de fábrica
    for (fx, fy) in ((2, 0), (9, 1), (4, 2)):
        pass
    for (x, y) in [(3, 1), (4, 1), (11, 5), (12, 5), (1, 9), (2, 9), (10, 13), (11, 13)]:
        L.set(x, y, "3" if (x + y) % 2 else luz)
    for (x, y) in [(10, 1), (9, 2), (2, 6), (3, 6), (12, 10), (13, 10), (6, 14), (5, 14)]:
        L.set(x, y, sombra)
    return L


# ------------------------------------------------------------------ tabla de madera del escritorio (16x16, repite)
def madera():
    L = Lienzo(16, 16)
    for y in range(16):
        for x in range(16):
            L.set(x, y, "b")
    veta = {  # (y dentro de la tabla, x inicial, largo, color): vetas largas que dan vuelta por el borde (se repite sin costura)
        0: [(2, 1, 9, "h"), (4, 9, 6, "a"), (5, 0, 7, "h"), (7, 2, 5, "a")],
        1: [(2, 6, 9, "h"), (3, 0, 4, "a"), (5, 3, 8, "h"), (7, 10, 6, "a")],
    }
    for t in range(2):
        y0 = t * 8
        L.hl(y0, 0, 15, "a")                       # junta oscura entre tablas
        L.hl(y0 + 1, 0, 15, "c")                   # luz del canto de arriba
        for (yy, xi, ln, col) in veta[t]:
            for k in range(ln):
                L.set((xi + k) % 16, y0 + yy, col)
    # un nudo en la tabla de abajo y un solo empalme por tabla
    for (x, y) in [(12, 12), (13, 12), (12, 13), (11, 12)]:
        L.set(x, y, "a")
    L.set(12, 11, "h"); L.set(13, 11, "h"); L.set(14, 12, "h")
    return L


# ------------------------------------------------------------------ ficha
def ficha(encendida):
    L = Lienzo(14, 14)
    if encendida:
        borde, base, luz, sombra, brillo = "c", "k", "j", "l", "6"
    else:
        borde, base, luz, sombra, brillo = "1", "3", "4", "2", "5"
    for y in range(14):
        for x in range(14):
            dx, dy = x + .5 - 7, y + .5 - 7
            d = math.hypot(dx, dy)
            if d > 7:
                continue
            if d > 6.1:
                L.set(x, y, borde)
            elif d > 4.6:                          # canto de la moneda: luz arriba a la izquierda, sombra abajo a la derecha
                L.set(x, y, luz if dx + dy < -2.5 else sombra if dx + dy > 2.5 else base)
            elif d > 3.6:                          # ranura
                L.set(x, y, sombra if dx + dy < 0 else luz)
            else:                                  # cara
                L.set(x, y, base)
    # marca al centro: una pequena barra de datos
    for y in range(14):
        for x in range(14):
            if abs(x + .5 - 7) + abs(y + .5 - 7) <= 2.6:
                L.set(x, y, sombra)
    L.set(4, 3, brillo); L.set(3, 4, brillo); L.set(4, 4, brillo if encendida else luz)
    return L


def main():
    c = sys.argv[1]
    os.makedirs(c, exist_ok=True)
    guardar(jefa("neutral"), c, "jefa_neutral", "Jefa, gesto neutral: brazos cruzados. 32x32. Pelo castano (brillo b, sombra 0), lentes con ojo 2x2, sueter vino.")
    guardar(jefa("preocupada"), c, "jefa_preocupada", "Jefa preocupada: la cabeza entre las manos, cejas inclinadas, boca hacia abajo.")
    guardar(jefa("contenta"), c, "jefa_contenta", "Jefa contenta: pulgar arriba y sonrisa con dientes.")
    guardar(beto(), c, "beto_retrato", "Beto Salvatierra: gorra azul con visera, bigote gris, sonrisa grande, silbato al cuello.")
    guardar(ugarte(), c, "ugarte_retrato", "Director Ugarte: traje azul noche, corbata roja, pelo gris hacia atras, ceno serio.")
    guardar(dani(), c, "dani_silueta", "Dani (nombre cambia por alumno, por eso solo silueta): practicante que cabecea; luz de borde a la izquierda.")
    guardar(dani(True), c, "dani_silueta_fondo", "Dani para ponerlo delante de la pared de ladrillo: silueta oscura (valor 0) con luz de borde 3; la clara se funde con el ladrillo.")
    guardar(telefono(), c, "icono_telefono", "Telefono con ondas (senora Quiroga): una tecla encendida y tres ondas de llamada.")
    guardar(nota(), c, "icono_nota", "Nota del director: hoja con membrete azul, firma y timbre vino.")
    guardar(ladrillo(), c, "pared_ladrillo", "Pieza 16x16 que se repite sin costuras: ladrillo azul-gris apenas mas claro que el mortero (rampa fria).")
    guardar(madera(), c, "escritorio_madera", "Pieza 16x16 que se repite sin costuras: dos tablas de madera calida con vetas.")
    guardar(ficha(True), c, "ficha_encendida", "Ficha (la moneda del juego) encendida, 14x14.")
    guardar(ficha(False), c, "ficha_apagada", "Ficha apagada, 14x14.")


if __name__ == "__main__":
    main()
