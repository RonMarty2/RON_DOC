"""Revision v17 de la pantalla del Paso 1 + Caso 2 (solo lectura).
Cuenta: lineas de dialogo y textos leidos antes del primer papel; terminos usados antes de definirse; voseo, guiones largos,
huecos sin llenar, bytes de control; letras < 12 px y contrastes del CSS.
Uso: python revisar_pantalla_v17.py"""
import difflib, json, os, re

RAIZ = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "..", ".."))
PS = os.path.join(RAIZ, "src", "lib", "juego", "psicoestadistica")
APP = os.path.join(RAIZ, "src", "app", "juego-psicoestadistica")
leer = lambda p: open(p, encoding="utf-8").read()
mesa, guion, css = leer(os.path.join(APP, "Mesa.tsx")), leer(os.path.join(PS, "guion-pantalla-t1.ts")), leer(os.path.join(APP, "mesa.css"))
T = json.load(open(os.path.join(PS, "orientacion-t1.json"), encoding="utf-8"))["textos"]
papeles = json.load(open(os.path.join(PS, "papeles-t1.json"), encoding="utf-8"))
HUECOS = {"dani": "Dani", "c": "50", "voz": "50", "papelClave": "Registro", "dC": "sube 5", "dV": "baja 5"}
def t(i): return re.sub(r"\{(\w+)\}", lambda m: HUECOS[m.group(1)], T[i])

# ---- Recorrido en orden (lo que ve el alumno), segun Mesa.tsx y guion-pantalla-t1.ts ----
# (fase, tipo, texto) ; tipo: tap = una linea de dialogo con boton Siguiente; leer = parrafo fijo en la pantalla; ui = rotulo/boton
flujo = []
def a(f, k, x): flujo.append((f, k, x))
a("titulo", "ui", "ORIENTACIÓN · Mesa de verificación"); a("titulo", "ui", "Víspera del consejo")
for i in ["A1", "A2", "B-bienv-1"]: a("bienvenida", "tap", t(i))
a("jefa", "tap", t("A3")); a("jefa", "tap", "Primer encargo de la noche. Un dato corto, sin apuro.")
a("jefa", "tap", 'El director dijo en el pasillo: "los estudiantes duermen poco".')
a("jefa", "tap", "¿El colegio tiene algún dato sobre cuánto duermen los de 4.º? Lo necesito para el consejo de mañana.")
a("hoja", "ui", "Para empezar"); a("hoja", "leer", t("A4")); a("hoja", "leer", t("B-hoja-1"))
a("hoja", "ui", "Que responda Dani")
a("archivo1", "ui", "El archivo del colegio"); a("archivo1", "leer", t("A6")); a("archivo1", "leer", t("B-arch1-1")); a("archivo1", "ui", t("A7"))
PRIMER_PAPEL = len(flujo)  # a partir de aqui el alumno ya puede abrir un papel
a("asombro", "ui", t("A8"))
for x in ["Esa pregunta ya se hizo. Hace un año. Nadie la leyó.", t("B-asom-1"), t("B-asom-2")]: a("asombro", "tap", x)
a("cierre1", "tap", "A partir de hoy firma el departamento, y firmas tú.")
for i in ["B-cierre1-1", "B-cierre1-2", "B-cierre1-3", "B-cierre1-4", "A10", "B-cierre1-6"]: a("cierre1", "tap", t(i))
a("cierre1", "tap", "Buenas noches, doc. A ojo se ve que hoy trabajas hasta tarde.")
a("entrada2", "ui", "CERO DENUNCIAS"); a("entrada2", "tap", t("A11")); a("entrada2", "tap", t("B-entr2-1"))
a("archivo2", "leer", t("B-arch2-1")); a("archivo2", "ui", "Corcho"); a("archivo2", "leer", "Los papeles que abras se clavan aquí, por fecha.")
a("archivo2", "leer", t("B-arch2-2")); a("archivo2", "leer", t("B-arch2-3"))
for i in ["B-arch2-4", "B-arch2-5", "B-arch2-6"]: a("archivo2", "leer", t(i))
a("frase", "leer", t("A12")); a("frase", "leer", t("B-frase-1"))
a("confirma", "leer", "¿Firmar? Después no hay vuelta.")

print("== 1. Texto antes del primer papel que se puede abrir ==")
antes = flujo[:PRIMER_PAPEL]
por_fase = {}
for f, k, x in antes: por_fase.setdefault(f, {"tap": 0, "leer": 0, "ui": 0})[k] += 1
for f, v in por_fase.items(): print("  %-10s taps(Siguiente)=%d  parrafos fijos=%d  rotulos=%d" % (f, v["tap"], v["leer"], v["ui"]))
taps = sum(v["tap"] for v in por_fase.values()); leer_ = sum(v["leer"] for v in por_fase.values())
print("  TOTAL antes del 1.er papel: %d toques de dialogo + %d parrafos fijos = %d unidades de texto (+2 si elige a Dani)" % (taps, leer_, taps + leer_))
primer_toque = [x for x in antes if x[0] in ("titulo", "bienvenida", "jefa")]
print("  Dialogo hasta el primer boton que NO es 'Siguiente' (la hoja):", sum(1 for x in primer_toque if x[1] == "tap"), "lineas")
pal = lambda s: len(s.split())
print("  Palabras de dialogo antes de la hoja:", sum(pal(x[2]) for x in primer_toque if x[1] == "tap"))
print("  Palabras totales antes del 1.er papel:", sum(pal(x[2]) for x in antes if x[1] != "ui"))
for f in ["asombro", "cierre1", "entrada2"]:
    n = sum(1 for x in flujo if x[0] == f and x[1] == "tap"); print("  Lineas de dialogo en %s: %d" % (f, n))

print("\n== 2. Terminos: primera aparicion vs. donde se define ==")
terminos = {"ficha": r"[Ff]icha", "Credibilidad": r"Credibilidad", "Voz": r"\bVoz\b", "raya": r"\braya", "meta": r"\bmeta\b", "Horizonte": r"Horizonte",
            "corcho": r"[Cc]orcho", "pieza": r"\bpieza", "medidor": r"medidor", "consejo": r"consejo", "informe": r"informe", "Dani": r"Dani", "Beto": r"Beto", "archivo": r"archivo"}
for n, rx in terminos.items():
    idx = [i for i, x in enumerate(flujo) if re.search(rx, x[2])]
    if idx:
        i0 = idx[0]; print("  %-13s 1.a vez en [%s/%s] #%d: %s" % (n, flujo[i0][0], flujo[i0][1], i0, flujo[i0][2][:70]))
    else: print("  %-13s no aparece" % n)

print("\n== 3. Lineas parecidas entre si (ratio > 0.55) ==")
txt = [(i, x) for i, x in enumerate(flujo) if x[1] in ("tap", "leer") and len(x[2]) > 30]
vistos = 0
for i in range(len(txt)):
    for j in range(i + 1, len(txt)):
        r = difflib.SequenceMatcher(None, txt[i][1][2].lower(), txt[j][1][2].lower()).ratio()
        if r > 0.55: vistos += 1; print("  %.2f  [%s] %s\n        [%s] %s" % (r, txt[i][1][0], txt[i][1][2], txt[j][1][0], txt[j][1][2]))
if not vistos: print("  ninguna")

print("\n== 4. Voseo, guiones largos, huecos, bytes de control ==")
cadenas = []
for k, v in T.items(): cadenas.append(("orientacion:" + k, v))
for m in re.finditer(r'"((?:[^"\\\n]|\\.)*)"|\'((?:[^\'\\\n]|\\.)*)\'|`((?:[^`\\\n]|\\.)*)`', guion): cadenas.append(("guion", m.group(1) or m.group(2) or m.group(3) or ""))
for m in re.finditer(r'>\s*([^<>{}\n][^<>{}\n]+?)\s*<', mesa): cadenas.append(("Mesa jsx", m.group(1)))
for m in re.finditer(r'"([^"\n]{12,})"', mesa): cadenas.append(("Mesa str", m.group(1)))
def recorre(o, ruta):
    if isinstance(o, str): cadenas.append(("papeles:" + ruta, o))
    elif isinstance(o, dict):
        for k, v in o.items(): recorre(v, ruta + "/" + k)
    elif isinstance(o, list):
        for i, v in enumerate(o): recorre(v, ruta + "[%d]" % i)
recorre(papeles, "")
for fn in ["ayuda.ts", "revelacion-t1.ts"]:
    p = os.path.join(PS, fn)
    if os.path.exists(p):
        for m in re.finditer(r'"((?:[^"\\\n]|\\.){14,})"', leer(p)): cadenas.append((fn, m.group(1)))
print("  cadenas revisadas:", len(cadenas))
EXC = set("más además después jamás atrás detrás demás ahí aquí allí así sí mí está será qué cuál quién dónde cómo cuándo estás habrás sabrás verás tendrás podrás harás irás serás darás pasará quedará estará bajará subirá hará dirá habrá llegó llegué papá café también según cuánto cuántos cuántas porqué sé té dé aún él tú más interés mes inglés país once razón atención".split())
vos_rx = re.compile(r"\b(\w+(?:ás|és|ís))\b|\b(vos|sos|fijate|mirá|contá|calculá|decí|andá|ponete|tenés|podés|querés|sabés)\b", re.I)
voseo = []
for o, s in cadenas:
    for m in vos_rx.finditer(s):
        w = (m.group(1) or m.group(2)).lower()
        if w not in EXC and not w.endswith(("ción", "sión")): voseo.append((o, w, s[:60]))
print("  posibles voseos (revisar a ojo):", len(voseo)); [print("    ", v) for v in voseo[:15]]
guiones = [(o, s[:50]) for o, s in cadenas if "—" in s or "–" in s]; print("  guiones largos/medios:", len(guiones), guiones[:5])
huecos = [(o, s[:60]) for o, s in cadenas if re.search(r"\{[^}]*\}", s) and not o.startswith("orientacion")]
print("  huecos {..} en cadenas fuera del json de orientacion (excluye plantillas de codigo ${}):", [h for h in huecos if "${" not in h[1]][:10])
# huecos del json de orientacion: cada id con hueco debe llamarse con esas claves en el guion
ok = True
for k, v in T.items():
    hs = set(re.findall(r"\{(\w+)\}", v))
    if not hs: continue
    llamadas = re.findall(r'T\("%s"\s*,\s*\{([^}]*)\}' % re.escape(k), guion)
    cubre = any(all(re.search(r"\b%s\b" % h, ll) for h in hs) for ll in llamadas)
    print("   hueco", k, sorted(hs), "->", "llenado" if cubre else "SIN LLENAR"); ok &= cubre
print("  todos los huecos del json se llenan:", ok)
ctrl = []
for fn in [os.path.join(APP, "Mesa.tsx"), os.path.join(APP, "mesa.css"), os.path.join(PS, "guion-pantalla-t1.ts"), os.path.join(PS, "orientacion-t1.json"), os.path.join(PS, "papeles-t1.json")]:
    for i, ch in enumerate(leer(fn)):
        if ord(ch) < 32 and ch not in "\n\r\t": ctrl.append((os.path.basename(fn), hex(ord(ch))))
print("  bytes de control:", ctrl or "ninguno")

print("\n== 5. CSS: tamano minimo y contraste ==")
for m in re.finditer(r"([^{}]+)\{([^}]*font-size:\s*(\d+)px[^}]*)\}", css):
    px = int(m.group(3))
    if px < 12: print("  font-size %dpx en %s" % (px, " ".join(m.group(1).split())[:60]))
for m in re.finditer(r"font:\s*[^;]*?(\d+)px", css): print("  font shorthand px:", m.group(1))
def lum(h):
    h = h.lstrip("#"); c = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    c = [x / 12.92 if x <= 0.03928 else ((x + 0.055) / 1.055) ** 2.4 for x in c]; return .2126 * c[0] + .7152 * c[1] + .0722 * c[2]
def cr(a_, b_): la, lb = sorted([lum(a_), lum(b_)], reverse=True); return (la + .05) / (lb + .05)
pares = {"tenue sobre noche (.mesa-pequeno, rotulo tubo)": ("#b4abd3", "#0c0a1a"), "tenue sobre panel": ("#b4abd3", "#1d1838"),
         "texto sobre panel (dialogo)": ("#ece7f7", "#1d1838"), "ambar quien sobre panel": ("#ffcf7a", "#1d1838"), "boton oscuro sobre ambar": ("#1a1410", "#ffcf7a"),
         "papel jefa-dice sobre noche": ("#f1e8cf", "#0c0a1a"), "tinta sobre papel": ("#2a2236", "#f1e8cf"), "informe small": ("#4a4258", "#f1e8cf"),
         "corcho small": ("#f1dcb4", "#5a4228"), "corcho texto": ("#fff4dc", "#5a4228"), "rojo aviso sobre noche": ("#ff8f8a", "#0c0a1a"),
         "h3 papel sobre papel": ("#5a3a14", "#f1e8cf"), "informe h3": ("#7a1f1f", "#f1e8cf"), "sec boton": ("#ece7f7", "#1d1838"),
         "pieza on": ("#ece7f7", "#35508f"), "tinta azul tubo vs borde": ("#6f8cff", "#120f26")}
for n, (x, y) in pares.items(): r = cr(x, y); print("  %-48s %.2f %s" % (n, r, "" if r >= 4.5 else "<<< BAJO 4.5"))
