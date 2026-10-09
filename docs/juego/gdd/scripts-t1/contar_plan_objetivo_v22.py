"""v22: cuenta oraciones, palabras, guiones largos y voseo en las celdas de texto del plan objetivo-y-causa (Caso 2, Tema 1)."""
import re, sys
ruta = "docs/juego/gdd/plan-psicoestadistica-tema1-objetivo-y-causa.md"
txt = open(ruta, encoding="utf-8").read()
ini = txt.index("### Versión con problema")
fin = txt.index("**Cuenta de combinaciones.**")
filas = [l for l in txt[ini:fin].splitlines() if l.startswith("| **")]
vos = re.compile(r"\b(\w+(?:ás|és|ís)|vos|tenés|querés)\b", re.I)
excepciones = {"más", "después", "además", "estás", "través"}
n_multi = n_largo = n_celdas = 0
for f in filas:
    celdas = [c.strip() for c in f.strip("|").split("|")][1:]
    for c in celdas:
        n_celdas += 1
        # oraciones: cortar en ". " o "? " (el punto de "Baja 20:" no corta)
        ora = [o for o in re.split(r"(?<=[.?!])\s+", c) if o]
        pal = len(re.findall(r"\S+", c))
        if len(ora) > 1:
            n_multi += 1
            print(f"MULTI({len(ora)} oraciones, {pal} pal): {c[:110]}")
        if pal > 25:
            n_largo += 1
            print(f"LARGO({pal}): {c[:110]}")
print("filas", len(filas), "celdas", n_celdas, "con >1 oración", n_multi, "con >25 palabras", n_largo)
print("guiones largos en el plan:", txt.count("—"))
print("posible voseo:", sorted({m.group(0) for m in vos.finditer(txt)} - excepciones))
