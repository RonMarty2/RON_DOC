"""Cuenta lo que ve el alumno en la pantalla del Paso 1 y el Caso 2 (Mesa.tsx + guion-pantalla-t1.ts + papeles-t1.json).
Solo lectura. Uso: python contar_pantalla_t1.py"""
import json, os, re

RAIZ = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "..", ".."))
PS = os.path.join(RAIZ, "src", "lib", "juego", "psicoestadistica")
MESA = os.path.join(RAIZ, "src", "app", "juego-psicoestadistica", "Mesa.tsx")

mesa = open(MESA, encoding="utf-8").read()
guion = open(os.path.join(PS, "guion-pantalla-t1.ts"), encoding="utf-8").read()
fases = re.search(r'type Fase = ([^;]+);', mesa).group(1)
fl = re.findall(r'"(\w+)"', fases)
print("fases:", len(fl), fl)
for f in fl:
    print("  fase", f, "-> aparece en Mesa.tsx:", len(re.findall(r'fase === "%s"' % f, mesa)) > 0)

print("\nPalabras clave en lo que ve el alumno:")
for w in ["Fichas", "ficha", "Credibilidad", "Voz", "Corcho", "medidor", "Horizonte", "consejo", "informe"]:
    print(f"  {w!r}: Mesa.tsx={len(re.findall(w, mesa))}  guion={len(re.findall(w, guion))}")

# lineas de dialogo
def cuenta(nombre, n): print(f"  {nombre}: {n}")
print("\nLineas de dialogo por tramo (guion):")
def lista(nombre):
    m = re.search(nombre + r' = \[(.*?)\] as const', guion, re.S)
    return len(re.findall(r'^\s*(["\']).*\1,?\s*$', m.group(1), re.M)) if m else None
for n in ["BIENVENIDA", "JEFA_LLEGADA", "ENCARGO"]:
    cuenta(n, lista(n))
cuenta("CIERRE_PASO1.jefa", 3); cuenta("CIERRE_PASO1.beto", 1)

pj = json.load(open(os.path.join(PS, "papeles-t1.json"), encoding="utf-8"))["papeles"]
print("\nPapeles Paso 1 (C1-*) y Caso 2 (C2-*):")
for k, v in pj.items():
    if k.startswith("C1-") or k.startswith("C2-"):
        print("-", k, "|", v["nombre"])
        for t, txt in v["textos"].items():
            print("     [%s] %s" % (t, txt))
        if "piezas" in v:
            print("     piezas:", v["piezas"])
sin_c = sum(1 for k in pj if k.startswith("C1-"))
print("\ncantidad papeles C1:", sin_c, " C2:", sum(1 for k in pj if k.startswith("C2-")))
