# -*- coding: utf-8 -*-
"""Extrae la seccion v2 del Tema 1 de 02 a un archivo aparte (para pasarle buscar_voseo.py).
Uso:  python -I extraer_v2.py <carpeta_de_salida>   -> escribe <carpeta>/seccion_bucle_v2.md
"""
import os
import sys

sys.stdout.reconfigure(encoding="utf-8")
AQUI = os.path.dirname(os.path.abspath(__file__))
ruta = os.path.join(os.path.dirname(AQUI), "02-bucle-y-mecanicas.md")
with open(ruta, encoding="utf-8") as f:
    t = f.read()
a = t.index("<!--T1V2-INICIO-->")
b = t.index("versión 1 · 08-10-2026 (superada")
sec = t[a:b]
destino = sys.argv[1] if len(sys.argv) > 1 else AQUI
os.makedirs(destino, exist_ok=True)
out = os.path.join(destino, "seccion_bucle_v2.md")
with open(out, "w", encoding="utf-8") as f:
    f.write(sec)
print("escrito", out, len(sec), "caracteres")
