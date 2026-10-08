# -*- coding: utf-8 -*-
"""Cuenta, con el disco delante, lo que el boceto dice tener. Uso: python lista_salida.py"""
import os
import re

AQUI = os.path.dirname(os.path.abspath(__file__))


def leer(n):
    p = os.path.join(AQUI, n)
    return open(p, encoding="utf-8").read() if os.path.exists(p) else ""


html = leer("index.html")
js = leer("arte-provisional.js")
kj = leer("kenney.js")
lic = leer("LICENCIAS.md")
res = []


def chk(nombre, ok, detalle):
    res.append((nombre, ok, detalle))


chk("index.html existe", bool(html), "%d caracteres" % len(html))
chk("PixiJS con version exacta por CDN", "pixi.js@7.4.2" in html, "pixi.js@7.4.2")
chk("arte-provisional.js generado", js.count("data:image/png") > 30, "%d piezas" % js.count("data:image/png"))
chk("kenney.js generado (CC0)", kj.count("data:image/png") > 0, "%d piezas de Kenney" % kj.count("data:image/png"))
chk("LICENCIAS.md existe con 'OK CC0'", "OK CC0" in lic, "%d paquetes OK CC0, %d NO BAJADO, %d RECHAZADO" % (lic.count("| OK CC0 |"), lic.count("| NO BAJADO |"), lic.count("| RECHAZADO |")))
chk("6 papeles", len(re.findall(r'tex: "prov_papel_', html)) == 6, "%d" % len(re.findall(r'tex: "prov_papel_', html)))
chk("3 fichas", "[0, 1, 2].map((i) => S(\"prov_ficha_on\"" in html, "3 fichas")
chk("3 poses de la editora", all(("prov_editora_%d" % i) in js for i in range(3)), "3 PNG")
chk("3 botones", all(x in html for x in ("PUBLICAR", "ARMAR LA", "RETENER")), "3 textos")
chk("marcas 25 y 60 en los tubos", html.count('"25"') >= 2 and html.count('"60"') >= 2, "rotulos 25 y 60 en los 2 tubos")
chk("sin guiones largos", "—" not in html and "—" not in lic, "0")
voseo = re.findall(r"\b(tenés|podés|fijate|mirá|sos|vos)\b", html, re.I)
chk("sin voseo en el texto", not voseo, "%d" % len(voseo))
chk("sin 'dossier' ni software en pantalla", not re.search(r"dossier|jamovi|eviews|excel", html, re.I), "0")
chk("PROVISIONAL marcado en la pagina", "ARTE PROVISIONAL" in html, "etiqueta en la cabecera")
for n, ok, d in res:
    print(("[OK] " if ok else "[X]  ") + n + " :: " + d)
