# -*- coding: utf-8 -*-
"""Actualiza la lista de salida de la narrativa del Tema 1 en 05 (v3.1) y quita el guion largo de S-P1."""
import os, sys
GDD = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = os.path.join(GDD, "05-mundo-y-narrativa.md")
raw = open(P, "rb").read().decode("utf-8")
crlf = "\r\n" in raw
t = raw.replace("\r\n", "\n")
if "Lista de salida · Tema 1 · narrativa v3.1" in t:
    print("YA APLICADO"); sys.exit(0)
err = []

def rep(o, n):
    global t
    if t.count(o) != 1:
        err.append("%d x %s" % (t.count(o), o[:80])); return
    t = t.replace(o, n)

rep("| S-P1 | idea 1, sin abrir sueño | — |", "| S-P1 | idea 1, sin abrir sueño | sin hábito |")
rep("### Lista de salida · Tema 1 · narrativa v3\n", "### Lista de salida · Tema 1 · narrativa v3.1\n")
rep("(`scratch/contar_narrativa_t1.py` o `buscar_voseo.py`, con su salida)",
    "(`scripts-t1/contar_narrativa_t1_v31.py` y `scripts-t1/aplicar_narrativa_v31.py`, o `buscar_voseo.py`, con su salida guardada en `scripts-t1/salida_contar_narrativa_t1_v31.txt`)")
a = t.index("**Salida del script de conteo (08-10-2026):**")
b = t.index("| Regla | ✔/✘ | Cómo | Prueba contada |")
bloque = (
    "**Salida del script de conteo (08-10-2026, v3.1; `python -I -X utf8 contar_narrativa_t1_v31.py`):**\n\n"
    "```\n"
    "papeles C1-1..C8-9: 72 (esperado 72)\n"
    "filas de sobres S-: 30 (esperado 30)\n"
    "sobres sin texto propio: 2 (esperado 2: E5e y E8d)\n"
    "expedientes R-H: 8 (esperado 8)\n"
    "ramas en 04 T1.7a: 72 | ramas en 05 NT1.9: 72 (esperado 72 y 72)\n"
    "mismos ids en el mismo orden: True\n"
    "bloque de textos de 05 identico al de 04 (T17B): True\n"
    "codigos en 02 8.1: 29 | en 05: 29 | mismos codigos: True\n"
    "habitos que difieren entre 02 y 05: []\n"
    "guiones largos en la seccion: 0\n"
    "frases entre comillas angulares de mas de 25 palabras: 0\n"
    "bytes de control en la seccion: 0\n"
    "```\n"
    "`buscar_voseo.py` sobre la sección extraída con `scripts-t1/extraer_seccion_narrativa.py`: «✅ sin voseo».\n\n"
)
t = t[:a] + bloque + t[b:]
rep("| Voz y pistas por código | ✔ | script | 30 filas `S-` = `S-P1` + 29 códigos (`E2a` a `E8d`, más `E2d`, `E3f`, `E5e`); `S-E5e` y `S-E8d` no llevan sobre (solo registro) |",
    "| Voz y pistas por código; códigos y hábitos coinciden con `02` 8.1 | ✔ | script | 30 filas `S-` = `S-P1` + 29 códigos; los 29 códigos y sus hábitos coinciden con `02` 8.1 (0 diferencias); `S-E5e` y `S-E8d` no llevan sobre (solo registro) |")
rep("| Revelación = textos de `04` T1.7b | ✔ | script | `scratch/armar_nt19.py` copia el bloque; 66 ramas `F1a`..`F8g` (patrón `^\\| F[1-8][a-p] \\|`) + 5 del tipo B = 71 filas |",
    "| Revelación = textos de `04` v2.1 T1.7b, 72 ramas con F3k y F6k, F3a y F5h corregidas | ✔ | script | `aplicar_narrativa_v31.py` copia el bloque `GEN:T17B`; 72 ramas en 05, los mismos 72 ids de `04` T1.7a en el mismo orden, bloque idéntico; F3a, F5h, F3k y F6k impresas por el script con el texto de `04` |")
rep("| Las ramas del caso 2 tipo B existen en `04` | **✘** | pendiente | `04` T1.7a no trae ramas para el tipo B del caso 2; F2f a F2j son mías y están marcadas. No se entrega sin avisar: aprendizaje debe adoptarlas con ids (ver NT1.11, ajuste 19). **Cuenta como ✘ hasta que `04` las traiga** |",
    "| Las ramas del caso 2 tipo B existen en `04` | ✔ | script | F2f a F2j están en `04` T1.7a (ids comparados por el script: 72 de 72) |\n"
    "| I2 (jefa parecida a la de AIEF) e I7 (caso 5, turno 1) | **✘** | pendiente | **Decisiones de gusto de Ronald**, no se resuelven aquí; quedan escritas con valor recomendado al inicio de la sección y en NT1.3 y NT1.6. Cuentan como ✘ hasta que decida |")
rep("**Resumen:** hay **3 ✘ pendientes** (ramas del tipo B en `04`, K1 a K11 en construcción, legibilidad en pantalla). Ninguno es un error del texto; son cosas que otra etapa debe cerrar, y cuentan como ✘ hasta entonces.",
    "**Resumen:** hay **4 ✘ pendientes** (I2 e I7 que decide Ronald; los supuestos del generador Q1 a Q9 de `04` T1.8, que se prueban en construcción; y la legibilidad en pantalla). Ninguno es un error del texto; son cosas que otra etapa o Ronald deben cerrar.")
rep("Los números escritos salen de la ficha o del bucle (480, 60, 12,", "Los números escritos salen de la ficha, del bucle o de `04` (480, 60, 12,")
rep("| K1 a K11 los cumple el generador | **✘** | pendiente | Se prueban en construcción (`.test.ts` de cada caso); aquí solo se dejó dicho en NT1.4 qué huecos tienen límite de palabras |",
    "| Los supuestos del generador (Q1 a Q9 de `04` T1.8; K1 a K3 de NT1.4) los cumple el generador | **✘** | pendiente | Se prueban en construcción (`.test.ts` de cada caso); aquí solo se dejó dicho en NT1.4 qué huecos tienen límite de palabras y que `{rho}`, `{hechosA}`, `{horasAnt}` y `{col2Ant}` son nuevos |")
rep("| Lo aprobado no se reabre; archivos tocados | ✔ | a mano | Solo `05-mundo-y-narrativa.md` (esta sección) y mi fila en `PIEZAS-COMUNES.md` §4; scripts en `scratch/` |",
    "| Lo aprobado no se reabre; archivos tocados | ✔ | a mano | Solo `05-mundo-y-narrativa.md` (sección del Tema 1) y los scripts nuevos de `scripts-t1/`; no se tocaron `02`, `04` ni `07`; `PIEZAS-COMUNES.md` §4 no cambia (los personajes y lugares son los mismos) |")
if err:
    print("ERRORES"); [print(" -", e) for e in err]; sys.exit(1)
out = t.replace("\n", "\r\n") if crlf else t
with open(P + ".tmp", "wb") as f:
    f.write(out.encode("utf-8"))
os.replace(P + ".tmp", P)
print("OK")
