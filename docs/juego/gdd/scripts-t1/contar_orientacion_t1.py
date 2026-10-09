"""Cuenta las lineas de NT1.12 (orientacion en pantalla, v16) por pantalla y las revisa.
Uso: python -I -X utf8 contar_orientacion_t1.py
"""
import os
import re
from collections import Counter

AQUI = os.path.dirname(os.path.abspath(__file__))
RUTA = os.path.join(AQUI, "..", "05-mundo-y-narrativa.md")
FASES = ["titulo", "bienvenida", "jefa", "hoja", "archivo1", "asombro", "cierre1", "entrada2", "archivo2", "frase", "confirma", "reaccion", "fin"]

txt = open(RUTA, encoding="utf-8").read()
i = txt.index("### NT1.12 Orientacion".replace("Orientacion", "Orientación"))
j = txt.index("### Lista de salida", i)
sec = txt[i:j]
ant = txt[txt.index("### NT1.4"):txt.index("### NT1.5")]

# huecos permitidos: los de NT1.4 + los definidos en la tabla de huecos nuevos de NT1.12
perm = set(re.findall(r"\{(\w+)\}", ant))
nuevos = sec[sec.index("#### Huecos nuevos"):sec.index("#### Tabla A")]
perm |= set(re.findall(r"`\{(\w+)\}`", nuevos))

a_ini = sec.index("#### Tabla A")
b_ini = sec.index("#### Tabla B")
tablaA, tablaB = sec[a_ini:b_ini], sec[b_ini:]

nuevas, cambios = Counter(), Counter()
textos = []  # (pantalla, texto)
for tabla, cont in ((tablaA, cambios), (tablaB, nuevas)):
    for fila in tabla.splitlines():
        if not fila.startswith("|"):
            continue
        celdas = [c.strip() for c in fila.strip().strip("|").split("|")]
        pant = celdas[1].split(" ")[0]
        if pant not in FASES:
            continue
        cont[pant] += 1
        # la ultima celda de A es la linea nueva; en B el texto es la cuarta celda
        t = celdas[-1] if tabla is tablaA else celdas[3]
        textos.append((pant, t))

print("pantalla       cambios  nuevas")
for f in FASES:
    print(f"{f:<14} {cambios[f]:>5} {nuevas[f]:>7}")
print("total", sum(cambios.values()), sum(nuevas.values()))

VOSEO = re.compile(r"\b(vos|tenés|podés|sos|querés|mirá|fijate|elegí|abrí|firmá|decidí|andá|ponés|sabés|hacés|decís|venís|buscá|tocá|llená|pensá|contá|volvé|pedí|fijá)\b", re.I)
problemas = 0
for pant, t in textos:
    for frase in re.findall(r"«([^»]+)»", t):
        n = len(re.sub(r"\{\w+\}", "H", frase).split())
        if n > 25:
            print("LARGA", n, pant, frase); problemas += 1
        if VOSEO.search(frase):
            print("VOSEO", pant, frase); problemas += 1
        for h in re.findall(r"\{(\w+)\}", frase):
            if h not in perm:
                print("HUECO SIN DEFINIR", h, pant); problemas += 1
if "—" in sec or "–" in sec:
    print("GUION LARGO en la seccion"); problemas += 1
for palabra in ("dossier", "jamovi", "EViews", "Excel", "SPSS"):
    if palabra.lower() in sec.lower():
        print("PALABRA PROHIBIDA", palabra); problemas += 1
print("huecos permitidos:", sorted(perm))
print("problemas:", problemas)
