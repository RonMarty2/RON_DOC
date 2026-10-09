# -*- coding: utf-8 -*-
"""Conteos de la narrativa v3.1 del Tema 1 (05). Solo lee. Se corre con python -I."""
import os, re

GDD = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
t05 = open(os.path.join(GDD, "05-mundo-y-narrativa.md"), "rb").read().decode("utf-8").replace("\r\n", "\n")
t04 = open(os.path.join(GDD, "04-aprendizaje.md"), "rb").read().decode("utf-8").replace("\r\n", "\n")

a = t05.index("## Psicoestadística Descriptiva (Psicología) · Tema 1 «La mesa de verificación» · narrativa")
b = t05.index("## AIEF · Tema 1 · versión 2", a)
sec = t05[a:b]
print("seccion 05: lineas %d a %d" % (t05[:a].count("\n") + 1, t05[:b].count("\n") + 1))

print("papeles C1-1..C8-9:", len(re.findall(r"^\| C[1-8]-[1-9] \|", sec, re.M)), "(esperado 72)")
print("filas de sobres S-:", len(re.findall(r"^\| S-(P1|E\d[a-f]) \|", sec, re.M)), "(esperado 30)")
print("sobres sin texto propio:", len(re.findall(r"^\| S-E\d[a-f] \|.*sin sobre", sec, re.M)), "(esperado 2: E5e y E8d)")
print("expedientes R-H:", len(re.findall(r"^\| R-H\d[ab] \|", sec, re.M)), "(esperado 8)")

# ramas: 05 contra 04
m4 = re.search(r"<!--GEN:T17A-->\n(.*?)\n<!--/GEN:T17A-->", t04, re.S)
ids04 = re.findall(r"^\| (F[1-8][a-p]) \|", m4.group(1), re.M)
i9 = sec.index("### NT1.9")
i10 = sec.index("### NT1.10")
nt19 = sec[i9:i10]
ids05 = re.findall(r"^\| (F[1-8][a-p]) \|", nt19, re.M)
print("ramas en 04 T1.7a:", len(ids04), "| ramas en 05 NT1.9:", len(ids05), "(esperado 72 y 72)")
print("mismos ids en el mismo orden:", ids04 == ids05)
print("sin repetidos en 05:", len(set(ids05)) == len(ids05))
print("F3k y F6k en 05:", "F3k" in ids05, "F6k" in ids05)
m4b = re.search(r"<!--GEN:T17B-->\n(.*?)\n<!--/GEN:T17B-->", t04, re.S).group(1).strip("\n")
print("bloque de textos de 05 identico al de 04 (T17B):", m4b in nt19)

# textos exactos de lo pedido
def linea(prefijo):
    for l in nt19.split("\n"):
        if l.startswith(prefijo):
            return l
    return ""
for k in ("| F3a |", "| F5h |", "| F3k |", "| F6k |"):
    print(k, "->", linea(k)[:200])

# codigos y habitos: 05 contra 02 8.1
t02 = open(os.path.join(GDD, "02-bucle-y-mecanicas.md"), "rb").read().decode("utf-8").replace("\r\n", "\n")
j = t02.index("**8.1 Una sola tabla de códigos de error y hábitos")
t81 = t02[j:t02.index("Más el sobre del paso 1", j)]
c02 = dict(re.findall(r"^\| (E\d[a-f]) \| \d \| .*? \| ([^|]+?) \| ", t81, re.M))
c05 = {}
for mm in re.finditer(r"^\| S-(E\d[a-f]) \| (E\d[a-f]) · .*? \| ([^|]+?) \| ", sec, re.M):
    c05[mm.group(1)] = mm.group(3).strip()
print("codigos en 02 8.1:", len(c02), "| en 05:", len(c05), "| mismos codigos:", set(c02) == set(c05))
dif = [k for k in c02 if c02[k].strip() != c05.get(k)]
print("habitos que difieren entre 02 y 05:", dif)

# estilo
print("guiones largos en la seccion:", sec.count("—"))
largas = []
for fr in re.findall(r"«([^»]+)»", sec):
    palabras = re.sub(r"\{[^}]+\}", "X", fr).split()
    if len(palabras) > 25:
        largas.append((len(palabras), fr[:70]))
print("frases entre « » con mas de 25 palabras:", len(largas), largas[:5])
ctrl = [c for c in sec if ord(c) < 32 and c not in "\n\t"]
print("bytes de control en la seccion:", len(ctrl))
for pal in ("titular", "Lectores", "Ficha 1", "Ficha 2", "Ficha 8", "Con una tanda no sabes", "número lindo", "con dos papeles todavía", "las ocho fichas", "66 ramas", "71 ramas", "por ficha"):
    print("restos de %r: %d" % (pal, sec.count(pal)))
