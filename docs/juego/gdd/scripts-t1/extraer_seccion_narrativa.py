# -*- coding: utf-8 -*-
"""Extrae la seccion de narrativa del Tema 1 de 05 a un archivo (argumento 1) para pasarle buscar_voseo.py."""
import os, sys
GDD = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
t = open(os.path.join(GDD, "05-mundo-y-narrativa.md"), "rb").read().decode("utf-8").replace("\r\n", "\n")
a = t.index("## Psicoestadística Descriptiva (Psicología) · Tema 1 «La mesa de verificación» · narrativa")
b = t.index("## AIEF · Tema 1 · versión 2", a)
with open(sys.argv[1], "wb") as f:
    f.write(t[a:b].encode("utf-8"))
print("extraido", b - a, "caracteres")
