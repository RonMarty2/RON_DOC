# Revision v19 de ambientes del Tema 1: cuenta estados, costos, contrastes y mide la pagina a 376 px.
# Uso: python revisar_ambientes_t1.py [url]
import itertools, os, re, sys

AQUI = os.path.dirname(os.path.abspath(__file__))
GDD = os.path.dirname(AQUI)
MD = os.path.join(GDD, "aspecto-psicoestadistica-tema1-ambientes.md")
URL = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:8124/docs/juego/bocetos/ambientes/index.html"

# --- 1. Estados distintos que ve un alumno ---
HORAS = {0: "T1 22:00", 1: "T2 23:00", 2: "T3 00:00", 3: "T4 01:00", 4: "T5 02:00", 5: "T6 03:00", 6: "T7 04:30", 7: "T8 06:00"}
LUGAR = {1: "archivo", 2: "oficina+corcho", 3: "archivo+tambor", 4: "oficina+2 conos", 5: "oficina recuerdo / hoy", 6: "archivo+pizarra", 7: "oficina+lamina", 8: "direccion"}
estados = set()
perms = list(itertools.permutations([3, 4, 5, 6, 7]))
for p in perms:
    orden = [1, 2] + list(p) + [8]
    for k, caso in enumerate(orden):
        estados.add((caso, HORAS[k]))
print("permutaciones:", len(perms))
print("pares (caso, hora) distintos:", len(estados))
for caso in range(1, 9):
    hs = sorted(h for c, h in estados if c == caso)
    print(" caso", caso, LUGAR[caso], "->", len(hs), "horas:", ", ".join(hs))
# archivo en posiciones consecutivas
consec = sum(1 for p in perms if any(abs(p.index(a) - p.index(b)) == 1 for a, b in [(3, 6)]))
print("permutaciones donde caso 3 y caso 6 (ambos archivo) quedan seguidos:", consec, "de", len(perms))
print("permutaciones con caso 3 o 6 en la ultima posicion (justo antes de la direccion):", sum(1 for p in perms if p[-1] in (3, 6)))
print("permutaciones con caso 5 (flashback 'hace un mes') en cada posicion:", [sum(1 for p in perms if p[i] == 5) for i in range(5)])

# --- 2. Costos de la tabla ---
txt = open(MD, encoding="utf-8").read()
filas = [l for l in txt.splitlines() if re.match(r"\| \d+ \| \*\*", l)]
cuenta = {"Bajo": 0, "Medio": 0, "Alto": 0}
for l in filas:
    celdas = [c.strip() for c in l.strip("|").split("|")]
    costo = celdas[6]
    for k in cuenta:
        if costo.startswith(k):
            cuenta[k] += 1
print("filas:", len(filas), cuenta)

# --- 3. Contraste ---
def lum(h):
    h = h.lstrip("#"); r, g, b = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    f = lambda c: c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
def cr(a, b):
    la, lb = sorted([lum(a), lum(b)], reverse=True); return (la + 0.05) / (lb + 0.05)
for a, b in [("#e9e7f5", "#0e0d16"), ("#b9b6cf", "#0e0d16"), ("#e9e7f5", "#17152a"), ("#b9b6cf", "#17152a")]:
    print("contraste", a, "sobre", b, round(cr(a, b), 1))

# --- 4. Pagina a 376 px ---
try:
    from playwright.sync_api import sync_playwright
except Exception as e:
    print("sin playwright:", e); sys.exit()
with sync_playwright() as p:
    br = p.chromium.launch(channel="chrome")
    pg = br.new_page(viewport={"width": 376, "height": 800})
    pg.goto(URL); pg.wait_for_timeout(1500)
    sal = os.path.join(AQUI, "ambientes_376.png")
    pg.screenshot(path=sal, full_page=True)
    r = pg.evaluate("""() => {
      const out = {sw: document.documentElement.scrollWidth, iw: innerWidth, chicos: [], imgs: 0, rotas: 0, escenas: 0, altoEsc: []};
      const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      const vistos = new Set();
      while (tw.nextNode()) { const n = tw.currentNode; if (!n.textContent.trim()) continue;
        const el = n.parentElement; if (vistos.has(el) || el.closest('script,style')) continue; vistos.add(el);
        const fs = parseFloat(getComputedStyle(el).fontSize); if (fs < 12) out.chicos.push([el.tagName, fs, n.textContent.trim().slice(0, 30)]); }
      document.querySelectorAll('.mundo img').forEach(i => { out.imgs++; if (!i.complete || i.naturalWidth === 0) out.rotas++; });
      document.querySelectorAll('.esc').forEach(e => { out.escenas++; out.altoEsc.push(Math.round(e.getBoundingClientRect().height)); });
      const hs = [...document.querySelectorAll('.hora')].map(h => Math.round(h.getBoundingClientRect().width));
      out.horaAncho = hs.slice(0, 4);
      const hb = [...document.querySelectorAll('.hora')].map(h => h.scrollWidth > h.clientWidth + 1);
      out.horaDesborda = hb.filter(Boolean).length;
      const ch = [...document.querySelectorAll('.chip')].filter(c => c.getBoundingClientRect().right > innerWidth);
      out.chipFuera = ch.length;
      return out; }""")
    print("pagina 376: scrollWidth", r["sw"], "innerWidth", r["iw"], "| textos <12px:", len(r["chicos"]), r["chicos"][:5])
    print(" escenas:", r["escenas"], "alto:", r["altoEsc"][:3], "| imagenes:", r["imgs"], "rotas:", r["rotas"], "| ancho .hora:", r["horaAncho"], "desbordan:", r["horaDesborda"], "| chips fuera:", r["chipFuera"])
    print(" captura:", sal)
    br.close()
