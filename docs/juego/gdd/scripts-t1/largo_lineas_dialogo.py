# Largo (caracteres) de las lineas de dialogo del guion del Tema 1 y cuantas caben en 3 lineas de globo (A) o panel (B).
import json, os, re
base = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', '..', '..', 'src', 'lib', 'juego', 'psicoestadistica')
txt = []
def rec(o):
    if isinstance(o, str):
        if len(o) > 25: txt.append(o)
    elif isinstance(o, list):
        [rec(x) for x in o]
    elif isinstance(o, dict):
        [rec(v) for v in o.values()]
for f in ['guion-t1.json']:
    rec(json.load(open(os.path.join(base, f), encoding='utf-8')))
# pantalla.ts: cadenas largas entre comillas
s = open(os.path.join(base, 'guion-pantalla-t1.ts'), encoding='utf-8').read()
txt += [m for m in re.findall(r'"([^"\n]{26,})"', s)]
L = sorted(set(txt), key=len, reverse=True)
print('textos', len(L))
for n in (110, 150, 200, 250): print('mas de', n, 'caracteres:', sum(1 for t in L if len(t) > n))
for t in L[:6]: print(len(t), t[:90])
