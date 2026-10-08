# -*- coding: utf-8 -*-
"""
ARTE PROVISIONAL del boceto "La redaccion de noche" (Direccion A).

Todo lo que dibuja este script es PROVISIONAL: pixel art simple hecho por codigo,
solo para que el boceto tenga cosas reales que mirar (papeles con detalle, retratos
de la editora en 3 poses, lampara, mesa, tubos de tinta). Un artista lo reemplaza.

Uso (no hace falta nada instalado, solo Python 3):
    python generar_arte_provisional.py

Escribe:
    assets/provisional/*.png      (un PNG por pieza)
    arte-provisional.js           (las mismas piezas en base64, para abrir index.html con doble clic)
"""
import base64
import math
import os
import random
import struct
import zlib

AQUI = os.path.dirname(os.path.abspath(__file__))
SALIDA_PNG = os.path.join(AQUI, "assets", "provisional")
SALIDA_JS = os.path.join(AQUI, "arte-provisional.js")

INK = (20, 18, 28)
WOOD1 = (52, 32, 22)
WOOD2 = (82, 52, 32)
WOOD3 = (110, 72, 44)
PAPER = (233, 223, 196)
PAPER2 = (212, 200, 168)
PAPERD = (150, 136, 108)
LINEA = (128, 116, 98)
BRASS = (205, 156, 62)
BRASS2 = (140, 100, 36)
RED = (194, 70, 60)
SKIN = (238, 190, 154)
SKIN2 = (204, 150, 116)
HAIR = (42, 28, 34)
BLOUSE = (150, 52, 72)
BLOUSE2 = (110, 36, 54)


class Lienzo:
    def __init__(self, w, h):
        self.w = w
        self.h = h
        self.d = bytearray(w * h * 4)

    def p(self, x, y, c):
        x = int(x)
        y = int(y)
        if x < 0 or y < 0 or x >= self.w or y >= self.h:
            return
        r, g, b = c[0], c[1], c[2]
        a = c[3] if len(c) > 3 else 255
        i = (y * self.w + x) * 4
        if a >= 255:
            self.d[i] = r
            self.d[i + 1] = g
            self.d[i + 2] = b
            self.d[i + 3] = 255
            return
        if a <= 0:
            return
        da = self.d[i + 3]
        oa = a + da * (255 - a) // 255
        if oa == 0:
            return
        for j, v in enumerate((r, g, b)):
            dst = self.d[i + j]
            self.d[i + j] = min(255, (v * a + dst * da * (255 - a) // 255) // oa)
        self.d[i + 3] = oa

    def rect(self, x, y, w, h, c):
        for yy in range(int(y), int(y + h)):
            for xx in range(int(x), int(x + w)):
                self.p(xx, yy, c)

    def marco(self, x, y, w, h, c):
        self.rect(x, y, w, 1, c)
        self.rect(x, y + h - 1, w, 1, c)
        self.rect(x, y, 1, h, c)
        self.rect(x + w - 1, y, 1, h, c)

    def linea(self, x0, y0, x1, y1, c, grosor=1):
        dx = abs(x1 - x0)
        dy = abs(y1 - y0)
        sx = 1 if x0 < x1 else -1
        sy = 1 if y0 < y1 else -1
        err = dx - dy
        while True:
            self.rect(x0, y0, grosor, grosor, c)
            if x0 == x1 and y0 == y1:
                break
            e2 = 2 * err
            if e2 > -dy:
                err -= dy
                x0 += sx
            if e2 < dx:
                err += dx
                y0 += sy

    def elipse(self, cx, cy, rx, ry, c):
        for y in range(-ry, ry + 1):
            for x in range(-rx, rx + 1):
                if (x / max(rx, 0.5)) ** 2 + (y / max(ry, 0.5)) ** 2 <= 1.0:
                    self.p(cx + x, cy + y, c)

    def anillo(self, cx, cy, rx, ry, c, grosor=1):
        for y in range(-ry, ry + 1):
            for x in range(-rx, rx + 1):
                v = (x / max(rx, 0.5)) ** 2 + (y / max(ry, 0.5)) ** 2
                lim = ((max(rx - grosor, 0.5)) / max(rx, 0.5)) ** 2
                if lim <= v <= 1.0:
                    self.p(cx + x, cy + y, c)

    def ruido(self, x, y, w, h, rng, cantidad):
        for yy in range(int(y), int(y + h)):
            for xx in range(int(x), int(x + w)):
                if xx < 0 or yy < 0 or xx >= self.w or yy >= self.h:
                    continue
                i = (yy * self.w + xx) * 4
                if self.d[i + 3] == 0:
                    continue
                dv = rng.randint(-cantidad, cantidad)
                for j in range(3):
                    self.d[i + j] = max(0, min(255, self.d[i + j] + dv))

    def a_png(self):
        crudo = bytearray()
        fila = self.w * 4
        for y in range(self.h):
            crudo.append(0)
            crudo.extend(self.d[y * fila:(y + 1) * fila])

        def trozo(tipo, datos):
            c = struct.pack(">I", len(datos)) + tipo + datos
            return c + struct.pack(">I", zlib.crc32(tipo + datos) & 0xFFFFFFFF)

        return (
            b"\x89PNG\r\n\x1a\n"
            + trozo(b"IHDR", struct.pack(">IIBBBBB", self.w, self.h, 8, 6, 0, 0, 0))
            + trozo(b"IDAT", zlib.compress(bytes(crudo), 9))
            + trozo(b"IEND", b"")
        )


# ------------------------------------------------------------------ piezas

def sala():
    L = Lienzo(188, 118)
    rng = random.Random(7)
    for y in range(118):
        t = y / 118.0
        L.rect(0, y, 188, 1, (int(22 + 10 * t), int(24 + 10 * t), int(46 + 14 * t)))
    for y in range(0, 118, 8):
        desp = 0 if (y // 8) % 2 == 0 else 8
        for x in range(-desp, 188, 16):
            L.rect(x, y, 1, 8, (17, 19, 37))
        L.rect(0, y, 188, 1, (17, 19, 37))
    wx, wy, ww, wh = 10, 8, 60, 50
    L.rect(wx - 3, wy - 3, ww + 6, wh + 6, (52, 38, 28))
    for y in range(wh):
        L.rect(wx, wy + y, ww, 1, (10 + y // 5, 14 + y // 4, 40 + y // 3))
    x = wx
    while x < wx + ww:
        bw = rng.randint(6, 12)
        bh = rng.randint(10, 30)
        ancho = min(bw, wx + ww - x)
        L.rect(x, wy + wh - bh, ancho, bh, (14, 16, 30))
        for yy in range(wy + wh - bh + 2, wy + wh - 2, 4):
            for xx in range(x + 1, x + ancho - 1, 3):
                if rng.random() < 0.45:
                    col = (240, 200, 110) if rng.random() < 0.8 else (140, 200, 240)
                    L.rect(xx, yy, 1, 2, col)
        x += bw + 1
    L.elipse(wx + 46, wy + 9, 4, 4, (235, 235, 210))
    L.elipse(wx + 47, wy + 8, 3, 3, (10, 14, 40))
    L.rect(wx + ww // 2 - 1, wy, 2, wh, (52, 38, 28))
    L.rect(wx, wy + wh // 2 - 1, ww, 2, (52, 38, 28))
    L.rect(wx - 5, wy + wh + 3, ww + 10, 3, (78, 56, 40))
    # reloj de pared (marca las 11)
    cx, cy = 100, 20
    L.elipse(cx, cy, 10, 10, (62, 46, 34))
    L.elipse(cx, cy, 8, 8, (230, 226, 208))
    for k in range(12):
        ang = k * math.pi / 6
        L.p(cx + round(7 * math.sin(ang)), cy - round(7 * math.cos(ang)), INK)
    L.linea(cx, cy, cx, cy - 6, INK)
    L.linea(cx, cy, cx - 3, cy - 2, INK)
    L.p(cx, cy, RED)
    # estante con carpetas
    L.rect(84, 56, 36, 3, WOOD2)
    colores = [(150, 60, 50), (60, 90, 130), (190, 160, 70), (80, 120, 90), (120, 70, 110)]
    x = 86
    for i in range(6):
        c = colores[i % len(colores)]
        bw = rng.randint(4, 6)
        bh = rng.randint(14, 20)
        L.rect(x, 56 - bh, bw, bh, c)
        L.rect(x, 56 - bh, 1, bh, (c[0] // 2, c[1] // 2, c[2] // 2))
        x += bw + 1
    # cartel "CIERRE" (solo rayas, sin letras)
    L.rect(130, 82, 50, 26, (38, 44, 66))
    L.marco(130, 82, 50, 26, (90, 100, 130))
    for i in range(3):
        L.rect(136, 88 + i * 6, 38 - i * 6, 2, (150, 160, 190))
    return L


def mesa():
    L = Lienzo(188, 216)
    rng = random.Random(11)
    L.rect(0, 0, 188, 156, WOOD2)
    for x in range(0, 188, 47):
        L.rect(x, 0, 1, 156, WOOD1)
    for _ in range(420):
        x = rng.randint(0, 186)
        y = rng.randint(0, 154)
        n = rng.randint(4, 14)
        c = rng.choice([WOOD1, WOOD3, (92, 60, 38), (70, 44, 28)])
        L.rect(x, y, n, 1, c)
    for cx, cy in [(30, 90), (120, 40), (160, 130)]:
        L.anillo(cx, cy, 4, 3, WOOD1, 1)
        L.p(cx, cy, WOOD1)
    L.rect(0, 0, 188, 2, WOOD3)
    L.rect(0, 154, 188, 3, (30, 18, 12))
    # frente de la mesa (donde van los botones)
    L.rect(0, 157, 188, 59, (44, 28, 20))
    for y in range(157, 216, 4):
        L.rect(0, y, 188, 1, (36, 22, 16))
    L.rect(0, 157, 188, 2, (70, 46, 30))
    for x in (14, 94, 174):
        L.rect(x, 200, 6, 3, BRASS2)
        L.rect(x, 200, 6, 1, BRASS)
    L.ruido(0, 0, 188, 216, rng, 5)
    return L


def lampara():
    L = Lienzo(36, 56)
    G1, G2, G3 = (22, 80, 58), (36, 122, 88), (88, 190, 140)
    for y in range(4, 24):
        t = (y - 4) / 19.0
        ancho = int(8 + 10 * t)
        L.rect(18 - ancho, y, ancho * 2, 1, G2)
        L.p(18 - ancho, y, G1)
        L.p(18 + ancho - 1, y, G1)
    L.rect(6, 22, 24, 2, G1)
    L.rect(10, 7, 4, 12, G3)
    L.rect(15, 6, 1, 13, (60, 150, 108))
    L.rect(17, 24, 3, 24, BRASS)
    L.rect(17, 24, 1, 24, (240, 200, 110))
    L.rect(19, 24, 1, 24, BRASS2)
    L.elipse(18, 50, 10, 4, BRASS2)
    L.elipse(18, 49, 9, 3, BRASS)
    L.rect(12, 46, 12, 3, (230, 190, 100))
    return L


def cono():
    # luz calida en abanico, nace arriba a la izquierda (anclaje en 14,2)
    w, h = 170, 190
    L = Lienzo(w, h)
    ox, oy = 14.0, 2.0
    dirx, diry = 0.62, 0.78
    n = math.hypot(dirx, diry)
    dirx /= n
    diry /= n
    for y in range(h):
        for x in range(w):
            vx = x - ox
            vy = y - oy
            d = math.hypot(vx, vy)
            if d < 1:
                continue
            cosang = (vx * dirx + vy * diry) / d
            ang = max(0.0, min(1.0, (cosang - 0.80) / 0.20))
            alcance = max(0.0, 1.0 - d / 190.0)
            a = int(110 * ang * ang * alcance)
            if a > 0:
                L.p(x, y, (255, 214, 150, a))
    return L


def luz():
    # mancha blanda de luz, para borrar la penumbra y para brillos
    L = Lienzo(128, 128)
    for y in range(128):
        for x in range(128):
            r = math.hypot(x - 63.5, y - 63.5) / 64.0
            if r >= 1:
                continue
            t = 1.0 if r < 0.35 else (1.0 - (r - 0.35) / 0.65)
            a = int(255 * t * t * (3 - 2 * t))
            L.p(x, y, (255, 236, 200, a))
    return L


def carpeta():
    L = Lienzo(164, 124)
    rng = random.Random(3)
    M1, M2, M3 = (176, 140, 82), (196, 160, 98), (130, 100, 58)
    L.rect(0, 8, 164, 116, M2)
    L.rect(0, 0, 54, 10, M2)
    L.rect(0, 8, 164, 1, M3)
    L.marco(0, 0, 164, 124, M3)
    L.rect(1, 108, 162, 15, M1)
    L.rect(1, 9, 3, 100, M1)
    L.rect(160, 9, 3, 100, M1)
    L.ruido(0, 0, 164, 124, rng, 6)
    L.rect(10, 2, 36, 5, (230, 220, 190))
    L.rect(12, 4, 20, 1, LINEA)
    return L


def _papel_base(color, rng, doblez=False):
    L = Lienzo(40, 50)
    L.rect(0, 0, 40, 50, PAPERD)
    L.rect(1, 1, 38, 48, color)
    L.ruido(1, 1, 38, 48, rng, 7)
    if doblez:
        for i in range(10):
            L.rect(30 + i, 40 + i, 10 - i, 1, (0, 0, 0, 0))
            L.rect(30 + i, 40 + i, 10 - i, 1, (0, 0, 0, 0))
        L.d[:] = L.d
        # esquina doblada: triangulo transparente + triangulo claro
        for i in range(10):
            for j in range(10):
                if i + j >= 9:
                    idx = ((39 - i) + (49 - j) * 40) * 4
                    L.d[idx:idx + 4] = bytes((0, 0, 0, 0))
        for i in range(9):
            for j in range(9):
                if i + j < 9:
                    L.p(31 + i, 41 + j, (246, 238, 214))
        L.linea(31, 49, 39, 41, PAPERD)
    return L


def papel_correo():
    rng = random.Random(21)
    L = _papel_base((244, 240, 228), rng)
    L.rect(1, 1, 38, 7, (92, 110, 150))
    L.rect(4, 3, 14, 2, (220, 228, 245))
    L.rect(4, 11, 8, 1, LINEA)
    L.rect(14, 11, 20, 1, LINEA)
    L.rect(4, 14, 8, 1, LINEA)
    L.rect(14, 14, 16, 1, LINEA)
    for i in range(7):
        L.rect(4, 19 + i * 3, 30 - (i % 3) * 5, 1, (150, 144, 130))
    # clip plateado
    L.rect(31, 0, 2, 8, (190, 196, 205))
    L.rect(34, 2, 2, 8, (190, 196, 205))
    L.rect(31, 7, 5, 1, (190, 196, 205))
    L.rect(32, 0, 1, 6, (120, 126, 135))
    return L


def papel_buzon():
    rng = random.Random(22)
    L = _papel_base((226, 212, 176), rng)
    colores = [(255, 232, 120), (255, 200, 150), (180, 228, 170)]
    pos = [(4, 5), (20, 9), (7, 26)]
    for (x, y), c in zip(pos, colores):
        L.rect(x + 1, y + 1, 16, 14, (150, 130, 90))
        L.rect(x, y, 16, 14, c)
        L.rect(x + 2, y + 3, 11, 1, (120, 100, 70))
        L.rect(x + 2, y + 6, 8, 1, (120, 100, 70))
        L.rect(x + 2, y + 9, 12, 1, (120, 100, 70))
    L.rect(20, 28, 16, 14, (255, 232, 120))
    L.rect(22, 31, 11, 1, (120, 100, 70))
    L.rect(22, 34, 6, 1, (120, 100, 70))
    return L


def papel_calendario():
    rng = random.Random(23)
    L = _papel_base((240, 236, 222), rng)
    L.rect(1, 1, 38, 8, (70, 110, 90))
    L.rect(6, 4, 18, 2, (220, 240, 228))
    for fila in range(5):
        for col in range(5):
            L.marco(4 + col * 7, 12 + fila * 7, 8, 8, LINEA)
    L.anillo(4 + 3 * 7 + 4, 12 + 2 * 7 + 4, 4, 4, RED, 1)
    for k in range(6):
        L.rect(6 + (k * 7) % 28, 15 + (k * 3) % 20, 3, 1, (110, 100, 90))
    return L


def papel_tutores():
    rng = random.Random(24)
    L = _papel_base((232, 236, 238), rng, doblez=True)
    L.rect(4, 5, 20, 2, (80, 90, 110))
    for i in range(7):
        L.p(5, 13 + i * 5, (80, 90, 110))
        L.p(6, 13 + i * 5, (80, 90, 110))
        L.rect(9, 13 + i * 5, 16 + (i * 5) % 9, 1, (130, 134, 140))
        L.rect(30, 13 + i * 5, 5, 1, (170, 174, 180))
    return L


def papel_acta():
    rng = random.Random(25)
    L = _papel_base((238, 232, 214), rng)
    L.rect(8, 4, 24, 2, (60, 56, 50))
    L.rect(12, 8, 16, 1, (110, 104, 94))
    for i in range(6):
        L.rect(4, 14 + i * 3, 32 - (i % 2) * 6, 1, (140, 134, 120))
    # sello torcido
    L.anillo(26, 38, 8, 7, (190, 60, 52, 220), 1)
    L.anillo(26, 38, 5, 4, (190, 60, 52, 200), 1)
    L.linea(20, 40, 33, 35, (190, 60, 52, 230), 2)
    return L


def papel_cuaderno():
    rng = random.Random(26)
    L = _papel_base((246, 240, 218), rng)
    for i in range(8):
        L.rect(2, 7 + i * 5, 36, 1, (150, 176, 210))
    L.rect(8, 1, 1, 48, (214, 120, 120))
    for i in range(7):
        L.elipse(3, 6 + i * 6, 1, 1, (60, 56, 60))
    # mancha de cafe
    L.anillo(27, 33, 6, 5, (120, 80, 44, 190), 1)
    L.elipse(27, 33, 4, 3, (150, 106, 62, 90))
    L.rect(12, 10, 18, 1, (70, 70, 90))
    L.rect(12, 15, 12, 1, (70, 70, 90))
    return L


def hoja():
    L = Lienzo(152, 214)
    rng = random.Random(31)
    L.rect(0, 0, 152, 214, PAPERD)
    L.rect(2, 2, 148, 210, (240, 233, 210))
    L.ruido(2, 2, 148, 210, rng, 6)
    L.rect(14, 2, 1, 210, (216, 128, 128))
    L.rect(2, 20, 148, 1, (210, 190, 170))
    # clip arriba
    L.rect(118, 0, 3, 18, (190, 196, 205))
    L.rect(122, 3, 3, 18, (190, 196, 205))
    L.rect(118, 16, 7, 2, (190, 196, 205))
    L.rect(119, 0, 1, 14, (120, 126, 135))
    return L


def tubo_fondo():
    L = Lienzo(88, 16)
    L.rect(0, 0, 88, 16, (0, 0, 0, 0))
    L.rect(3, 3, 82, 10, (22, 22, 34))
    return L


def tubo_vidrio():
    L = Lienzo(88, 16)
    L.rect(0, 2, 4, 12, BRASS2)
    L.rect(0, 2, 4, 1, BRASS)
    L.rect(84, 2, 4, 12, BRASS2)
    L.rect(84, 2, 4, 1, BRASS)
    L.marco(3, 2, 82, 12, (200, 220, 240, 200))
    L.rect(4, 4, 80, 1, (255, 255, 255, 70))
    L.rect(4, 11, 80, 1, (255, 255, 255, 28))
    # marcas en 25 y 60 (la parte util mide 80 de ancho: empieza en x=4)
    for v, grande in ((25, False), (60, True)):
        x = 4 + int(round(80 * v / 100.0))
        L.rect(x, 2, 1, 12, (255, 255, 255, 235 if grande else 190))
        L.rect(x - 1, 1, 3, 1, (255, 255, 255, 235 if grande else 190))
    return L


def relleno(c1, c2):
    L = Lienzo(4, 8)
    for y in range(8):
        t = y / 7.0
        L.rect(0, y, 4, 1, tuple(int(c1[i] * (1 - t) + c2[i] * t) for i in range(3)))
    return L


def ficha(encendida):
    L = Lienzo(14, 14)
    if encendida:
        L.elipse(7, 7, 6, 6, BRASS2)
        L.elipse(7, 6, 6, 5, BRASS)
        L.elipse(7, 6, 4, 3, (236, 200, 110))
        L.rect(6, 3, 2, 4, BRASS2)
        L.rect(6, 6, 4, 1, BRASS2)
        L.rect(3, 3, 3, 1, (255, 240, 190))
    else:
        L.anillo(7, 7, 6, 6, (70, 64, 76), 2)
        L.elipse(7, 7, 3, 3, (30, 28, 40))
    return L


def titular():
    L = Lienzo(188, 44)
    rng = random.Random(41)
    L.rect(0, 0, 188, 40, (224, 216, 192))
    L.ruido(0, 0, 188, 40, rng, 8)
    L.rect(0, 0, 188, 2, INK)
    L.rect(6, 4, 70, 3, (70, 66, 60))
    L.rect(110, 4, 72, 3, (70, 66, 60))
    L.rect(86, 3, 16, 5, (70, 66, 60))
    L.rect(0, 9, 188, 1, (90, 86, 78))
    for x in range(4, 184, 6):
        L.rect(x, 33, 4, 1, (150, 144, 128))
    # borde rasgado abajo
    y = 40
    for x in range(0, 188):
        y2 = 40 + rng.randint(0, 3)
        L.rect(x, 40, 1, y2 - 39, (224, 216, 192))
    L.rect(0, 40, 188, 1, (170, 160, 138))
    return L


def boton(c1, c2, c3):
    L = Lienzo(58, 30)
    L.rect(0, 2, 58, 28, INK)
    L.rect(1, 3, 56, 24, c2)
    L.rect(1, 3, 56, 3, c1)
    L.rect(1, 24, 56, 3, c3)
    L.rect(1, 3, 2, 24, c1)
    L.rect(55, 3, 2, 24, c3)
    for x, y in ((4, 6), (52, 6), (4, 22), (52, 22)):
        L.rect(x, y, 2, 2, (255, 255, 255, 90))
    L.rect(1, 27, 56, 3, (0, 0, 0, 90))
    return L


def cubiculo():
    L = Lienzo(60, 80)
    L.marco(0, 0, 60, 80, (60, 52, 70))
    L.marco(1, 1, 58, 78, (96, 84, 108))
    L.rect(0, 70, 60, 10, (60, 52, 70))
    L.rect(2, 70, 56, 2, BRASS2)
    for i in range(4):
        L.linea(8 + i * 12, 4, 2 + i * 12, 40, (255, 255, 255, 26), 3)
    return L


def editora(pose):
    L = Lienzo(48, 64)
    # silla
    L.rect(6, 30, 36, 34, (42, 36, 60))
    L.rect(6, 30, 36, 2, (70, 62, 92))
    # torso
    for y in range(38, 64):
        mitad = 10 + (y - 38) // 2
        L.rect(24 - mitad, y, mitad * 2, 1, BLOUSE)
        L.p(24 - mitad, y, BLOUSE2)
        L.p(24 + mitad - 1, y, BLOUSE2)
    L.rect(21, 36, 6, 6, SKIN2)
    for i in range(5):
        L.rect(19 + i, 38 + i, 1, 1, (240, 236, 228))
        L.rect(28 - i, 38 + i, 1, 1, (240, 236, 228))
    # pelo de atras, cabeza y flequillo
    L.elipse(24, 19, 13, 15, HAIR)
    L.rect(11, 18, 3, 16, HAIR)
    L.rect(34, 18, 3, 16, HAIR)
    L.elipse(24, 20, 10, 12, SKIN)
    L.elipse(24, 9, 12, 5, HAIR)
    L.rect(13, 9, 22, 4, HAIR)
    L.rect(13, 12, 6, 4, HAIR)
    # gafas
    marco_c = (30, 30, 46)
    L.marco(15, 18, 8, 6, marco_c)
    L.marco(26, 18, 8, 6, marco_c)
    L.rect(23, 20, 3, 1, marco_c)
    L.rect(16, 19, 6, 4, (200, 230, 240, 70))
    L.rect(27, 19, 6, 4, (200, 230, 240, 70))
    # ojos
    L.p(19, 21, INK)
    L.p(30, 21, INK)
    # cejas y boca segun la pose
    if pose == 0:      # brazos cruzados, esperando
        L.rect(16, 16, 6, 1, HAIR)
        L.rect(27, 16, 6, 1, HAIR)
        L.rect(21, 29, 7, 1, (150, 70, 70))
        L.linea(9, 46, 38, 56, BLOUSE2, 4)
        L.linea(39, 46, 10, 56, BLOUSE, 4)
        L.rect(8, 54, 4, 4, SKIN)
        L.rect(37, 54, 4, 4, SKIN)
    elif pose == 1:    # frunce, cabeza entre las manos
        L.linea(16, 14, 22, 16, HAIR, 1)
        L.linea(33, 14, 27, 16, HAIR, 1)
        L.rect(22, 29, 5, 1, (150, 70, 70))
        L.p(21, 30, (150, 70, 70))
        L.p(27, 30, (150, 70, 70))
        L.linea(13, 42, 9, 24, BLOUSE, 4)
        L.linea(36, 42, 40, 24, BLOUSE, 4)
        L.elipse(9, 22, 4, 4, SKIN)
        L.elipse(40, 22, 4, 4, SKIN)
    else:              # pulgar arriba
        L.rect(16, 14, 6, 1, HAIR)
        L.rect(27, 14, 6, 1, HAIR)
        L.rect(20, 28, 9, 1, (150, 70, 70))
        L.p(19, 27, (150, 70, 70))
        L.p(29, 27, (150, 70, 70))
        L.rect(6, 42, 5, 22, BLOUSE2)
        L.linea(37, 44, 41, 32, BLOUSE, 4)
        L.rect(38, 24, 7, 8, SKIN)
        L.rect(40, 19, 3, 6, SKIN)
        L.rect(38, 24, 7, 1, SKIN2)
    return L


def dani():
    L = Lienzo(28, 36)
    c = (22, 18, 36)
    c2 = (34, 28, 52)
    L.rect(2, 14, 24, 22, c2)
    L.elipse(14, 8, 6, 7, c)
    L.rect(4, 18, 20, 18, c)
    L.rect(1, 12, 3, 24, c2)
    L.rect(24, 12, 3, 24, c2)
    return L


def telefono():
    L = Lienzo(24, 16)
    L.rect(1, 6, 22, 10, (24, 22, 30))
    L.rect(1, 6, 22, 2, (60, 56, 70))
    L.rect(2, 3, 20, 4, (34, 30, 42))
    L.rect(0, 2, 5, 3, (24, 22, 30))
    L.rect(19, 2, 5, 3, (24, 22, 30))
    for i in range(3):
        L.rect(8 + i * 3, 10, 2, 2, (180, 170, 150))
    return L


def taza():
    L = Lienzo(12, 12)
    L.rect(1, 3, 8, 8, (220, 214, 200))
    L.rect(1, 3, 8, 1, (110, 70, 40))
    L.anillo(10, 6, 2, 2, (220, 214, 200), 1)
    L.rect(2, 4, 6, 1, (130, 84, 48))
    return L


def mota():
    L = Lienzo(3, 3)
    L.p(1, 1, (255, 236, 200, 255))
    L.p(0, 1, (255, 236, 200, 110))
    L.p(2, 1, (255, 236, 200, 110))
    L.p(1, 0, (255, 236, 200, 110))
    L.p(1, 2, (255, 236, 200, 110))
    return L


def sombra_papel():
    L = Lienzo(44, 54)
    L.rect(0, 0, 44, 54, (0, 0, 0, 80))
    L.rect(2, 2, 40, 50, (0, 0, 0, 40))
    return L


def etiqueta():
    L = Lienzo(176, 34)
    L.rect(0, 0, 176, 34, INK)
    L.marco(1, 1, 174, 32, BRASS2)
    L.marco(2, 2, 172, 30, (80, 60, 30))
    L.rect(3, 3, 170, 28, (34, 28, 40))
    return L


def sello(color):
    L = Lienzo(84, 26)
    L.marco(0, 0, 84, 26, color)
    L.marco(2, 2, 80, 22, color)
    L.ruido(0, 0, 84, 26, random.Random(5), 0)
    return L


def pixel():
    L = Lienzo(2, 2)
    L.rect(0, 0, 2, 2, (255, 255, 255, 255))
    return L


def todas():
    return {
        "prov_sala": sala(),
        "prov_mesa": mesa(),
        "prov_lampara": lampara(),
        "prov_cono": cono(),
        "prov_luz": luz(),
        "prov_carpeta": carpeta(),
        "prov_papel_correo": papel_correo(),
        "prov_papel_buzon": papel_buzon(),
        "prov_papel_calendario": papel_calendario(),
        "prov_papel_tutores": papel_tutores(),
        "prov_papel_acta": papel_acta(),
        "prov_papel_cuaderno": papel_cuaderno(),
        "prov_hoja": hoja(),
        "prov_tubo_fondo": tubo_fondo(),
        "prov_tubo_vidrio": tubo_vidrio(),
        "prov_relleno_azul": relleno((90, 170, 255), (30, 80, 200)),
        "prov_relleno_ambar": relleno((255, 214, 90), (214, 130, 20)),
        "prov_ficha_on": ficha(True),
        "prov_ficha_off": ficha(False),
        "prov_titular": titular(),
        "prov_boton_rojo": boton((226, 110, 96), (186, 62, 52), (120, 36, 30)),
        "prov_boton_azul": boton((120, 160, 230), (70, 106, 190), (40, 62, 120)),
        "prov_boton_ambar": boton((240, 200, 110), (200, 140, 50), (130, 86, 24)),
        "prov_cubiculo": cubiculo(),
        "prov_editora_0": editora(0),
        "prov_editora_1": editora(1),
        "prov_editora_2": editora(2),
        "prov_dani": dani(),
        "prov_telefono": telefono(),
        "prov_taza": taza(),
        "prov_mota": mota(),
        "prov_sombra_papel": sombra_papel(),
        "prov_etiqueta": etiqueta(),
        "prov_sello_rojo": sello((200, 60, 52, 235)),
        "prov_sello_azul": sello((70, 120, 220, 235)),
        "prov_pixel": pixel(),
    }


def main():
    os.makedirs(SALIDA_PNG, exist_ok=True)
    piezas = todas()
    lineas = ["// ARTE PROVISIONAL generado por generar_arte_provisional.py (no editar a mano)", "window.ARTE = {"]
    for nombre, lienzo in piezas.items():
        datos = lienzo.a_png()
        with open(os.path.join(SALIDA_PNG, nombre + ".png"), "wb") as f:
            f.write(datos)
        b64 = base64.b64encode(datos).decode("ascii")
        lineas.append('  "%s": "data:image/png;base64,%s",' % (nombre, b64))
    lineas.append("};")
    tmp = SALIDA_JS + ".tmp"
    with open(tmp, "w", encoding="utf-8", newline="\n") as f:
        f.write("\n".join(lineas) + "\n")
    os.replace(tmp, SALIDA_JS)
    print("[OK] %d piezas PROVISIONALES en %s y %s" % (len(piezas), SALIDA_PNG, SALIDA_JS))


if __name__ == "__main__":
    main()
