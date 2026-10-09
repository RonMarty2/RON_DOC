# -*- coding: utf-8 -*-
"""Copia al motor los TEXTOS de los 72 papeles del Tema 1 (C1-1 a C8-9), tal como estan en 05-mundo-y-narrativa.md.

Corre con:  python exportar_papeles_t1.py     (con `python`, no `python -I`)

Lee las tablas de papeles de 05 (NT1.5 y NT1.6) y escribe src/lib/juego/psicoestadistica/papeles-t1.json (a un .tmp y
luego os.replace). Ese JSON NO se edita a mano. Si no salen 72 papeles con texto, el script falla y no escribe nada.

Cada papel: {"nombre": ..., "textos": {clave: texto}, "piezas": {clave: [frases]}}. Las claves de `textos`:
  "*"        el papel dice siempre lo mismo
  "P","B","A" lo que dice cuando ES el clave de la version, segun el tipo del caso (casos 2, 3, 6 y 7; C2-4 tambien)
  "banal"    lo que dice cuando ese dia no es el clave
  "A","B"    (caso 4) segun cual de los dos estudios es el bueno
  "0","1","2" (C8-2) segun lo que decia la evidencia: financiar, no financiar, aun no
  "extra_b"  (C5-7) lo que se agrega en la opcion (b)
`piezas` (solo caso 2): las piezas de frase que el papel agrega al armador, por tipo o "*".
"""
import json
import os
import re
import sys

sys.stdout.reconfigure(encoding="utf-8")
HERE = os.path.dirname(os.path.abspath(__file__))
GDD = os.path.dirname(HERE)
RAIZ = os.path.abspath(os.path.join(HERE, "..", "..", "..", ".."))
RUTA_05 = os.path.join(GDD, "05-mundo-y-narrativa.md")
DESTINO = os.path.join(RAIZ, "src", "lib", "juego", "psicoestadistica", "papeles-t1.json")


def segmentos(celda):
    """Los textos entre comillas angulares de PRIMER nivel (un texto puede traer otras comillas adentro)."""
    salida, nivel, inicio = [], 0, None
    for i, ch in enumerate(celda):
        if ch == "«":
            if nivel == 0:
                inicio = i + 1
            nivel += 1
        elif ch == "»":
            nivel -= 1
            if nivel == 0:
                salida.append(celda[inicio:i])
    if nivel != 0:
        raise SystemExit("comillas sin cerrar: %r" % celda[:80])
    return salida


def uno(celda, donde):
    s = segmentos(celda)
    if len(s) != 1:
        raise SystemExit("%s: se esperaba un texto y hay %d: %r" % (donde, len(s), celda[:100]))
    return s[0]


def por_tipo(celda):
    """«**P:** «..» **B:** «..»» o «**solo A:** «..»» -> {tipo: texto}."""
    salida = {}
    for m in re.finditer(r"\*\*(?:solo )?([PBA]):\*\* ", celda):
        resto = celda[m.end():]
        salida[m.group(1)] = segmentos(resto)[0]
    return salida


def piezas(celda):
    m = re.match(r"^P: (.*?) B: (.*)$", celda)
    if m:
        return {"P": segmentos(m.group(1)), "B": segmentos(m.group(2))}
    return {"*": segmentos(celda)}


def principal():
    with open(RUTA_05, encoding="utf-8") as f:
        t = f.read()
    a = t.index("### NT1.5")
    b = t.index("### NT1.7", a)
    papeles = {}
    for linea in t[a:b].splitlines():
        m = re.match(r"^\| (C([1-8])-([1-9])) \| ", linea)
        if not m:
            continue
        pid, caso, n = m.group(1), int(m.group(2)), int(m.group(3))
        c = [x.strip() for x in linea.strip().strip("|").split(" | ")]
        nombre = c[1]
        p = {"nombre": nombre, "textos": {}}
        if caso == 1:
            p["textos"]["*"] = uno(c[3], pid)
        elif caso == 2:
            if n <= 3:
                p["textos"] = {"P": segmentos(c[2])[0], "B": segmentos(c[3])[0], "banal": uno(c[4], pid)}
                p["piezas"] = piezas(c[5])
            elif n == 4:
                p["textos"] = {"P": segmentos(c[2])[0], "B": segmentos(c[3])[0]}
                p["piezas"] = piezas(c[5])
            else:
                p["textos"]["*"] = uno(c[3], pid)
                p["piezas"] = piezas(c[4])
        elif caso in (3, 6, 7):
            claves = por_tipo(c[2])
            p["textos"] = dict(claves)
            p["textos"]["banal"] = uno(c[3], pid)
            if not claves and not c[2].startswith("señuelo"):
                raise SystemExit("%s: celda de clave rara: %r" % (pid, c[2][:60]))
        elif caso == 4:
            if c[3] == "igual":
                p["textos"]["*"] = uno(c[2], pid)
            else:
                p["textos"] = {"A": uno(c[2], pid), "B": uno(c[3], pid)}
        elif caso == 5:
            s = segmentos(c[2])
            p["textos"]["*"] = s[0]
            if n == 7:
                if len(s) != 2:
                    raise SystemExit("C5-7: se esperaban 2 textos")
                p["textos"]["extra_b"] = s[1]
            elif len(s) != 1:
                raise SystemExit("%s: %d textos" % (pid, len(s)))
        elif caso == 8:
            if n == 1:
                p["textos"]["*"] = uno(c[2], pid)
                if not (c[3].startswith("Mismo texto") and c[4].startswith("Mismo texto")):
                    raise SystemExit("C8-1 cambio de forma")
            elif n == 2:
                p["textos"] = {"0": uno(c[2], pid), "1": uno(c[3], pid), "2": uno(c[4], pid)}
            else:
                p["textos"]["*"] = uno(c[2], pid)
        if pid in papeles:
            raise SystemExit("papel repetido: " + pid)
        papeles[pid] = p

    esperados = ["C%d-%d" % (c, n) for c in range(1, 9) for n in range(1, 10)]
    fallas = []
    if sorted(papeles) != esperados:
        fallas.append("papeles %d (esperado 72); faltan %r" % (len(papeles), sorted(set(esperados) - set(papeles))))
    for pid, p in papeles.items():
        if not p["nombre"] or not p["textos"] or any(not v for v in p["textos"].values()):
            fallas.append("%s sin nombre o sin texto" % pid)
    if fallas:
        raise SystemExit("NO se escribe: " + "; ".join(fallas))

    salida = {
        "_aviso": "Generado por docs/juego/gdd/scripts-t1/exportar_papeles_t1.py desde 05-mundo-y-narrativa.md. No editar a mano.",
        "papeles": {pid: papeles[pid] for pid in esperados},
    }
    texto = json.dumps(salida, ensure_ascii=False, indent=1) + "\n"
    with open(DESTINO + ".tmp", "w", encoding="utf-8", newline="") as f:
        f.write(texto)
    os.replace(DESTINO + ".tmp", DESTINO)
    huecos = sorted(set(re.findall(r"\{\w+\}", texto)))
    print("papeles", len(papeles), "huecos", " ".join(huecos))
    print("escrito", DESTINO, len(texto), "bytes")


if __name__ == "__main__":
    principal()
