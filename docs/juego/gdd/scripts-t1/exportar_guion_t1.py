# -*- coding: utf-8 -*-
"""Copia al motor los TEXTOS de la revelacion y de la ayuda del Tema 1, tal como estan en 05-mundo-y-narrativa.md.

Corre con:  python exportar_guion_t1.py     (con `python`, no `python -I`)

Lee 05 (NT1.6 «los dos anios», NT1.7 sobres, NT1.8 expedientes, NT1.9 las 72 ramas, cierres, camino y Beto) y escribe
src/lib/juego/psicoestadistica/guion-t1.json (a un .tmp y luego os.replace). Ese JSON NO se edita a mano: si cambia la
narrativa, se vuelve a correr este script. Si algo no cuadra (72 ramas, 28 sobres con texto, 8 expedientes, 11 cierres,
9 pies) el script falla y no escribe nada.

Forma de cada linea de una rama:
  - un texto                       -> "texto"
  - variantes por tipo u opcion    -> {"P": "...", "A": "...", "B": "..."}  o  {"a": "...", "b": "...", "c": "..."}
  - F6j «Habria pasado»            -> {"grupo": "..."}   (con otra extension el motor usa la linea de F6e, F6g o F6h)
  - F8e y F8f «Habria pasado»      -> null               (el motor usa el pie de «tu anio» de la tabla `pies`)
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
DESTINO = os.path.join(RAIZ, "src", "lib", "juego", "psicoestadistica", "guion-t1.json")

ETIQUETA = re.compile(r"(P|A|B|Opción a|Opción b|Opción c|Con `grupo`): «([^»]*)»")
NOMBRE = {"Opción a": "a", "Opción b": "b", "Opción c": "c", "Con `grupo`": "grupo"}


def bloque(texto, desde, hasta):
    a = texto.index(desde)
    b = texto.index(hasta, a)
    return texto[a:b]


def celdas(linea):
    return [c.strip() for c in linea.strip().strip("|").split(" | ")]


def linea_de_rama(celda):
    con_etiqueta = ETIQUETA.findall(celda)
    if con_etiqueta:
        return {NOMBRE.get(k, k): v for k, v in con_etiqueta}
    m = re.fullmatch(r"«([^»]*)»", celda)
    if m:
        return m.group(1)
    return None


def principal():
    with open(RUTA_05, encoding="utf-8") as f:
        t = f.read()
    a = t.index("## Psicoestadística Descriptiva (Psicología) · Tema 1")
    b = t.index("\n## ", a + 10)
    t1 = t[a:b]

    # --- NT1.9: ramas, cierres, camino, Beto
    nt19 = bloque(t1, "### NT1.9", "### NT1.10")
    ramas, cierres, de_rama = {}, {}, {}
    for linea in nt19.splitlines():
        if linea.startswith("| F"):
            c = celdas(linea)
            if not re.fullmatch(r"F[1-8][a-p]", c[0]) or len(c) != 3:
                raise SystemExit("fila de rama rara: %r" % linea[:80])
            ramas[c[0]] = {"hiciste": linea_de_rama(c[1]), "habria": linea_de_rama(c[2])}
        m = re.match(r"^Cierre (C\w+) \(([^)]*)\): «(.*)»$", linea)
        if m:
            cierres[m.group(1)] = m.group(3)
            for rid in m.group(2).split(", "):
                de_rama[rid] = m.group(1)
    camino = re.findall(r"^- «(.*)»$", bloque(nt19, "**Cierre general", "**Beto**"), re.M)
    beto = re.search(r"\*\*Beto\*\*.*?\*\*«(.*?)»\*\*", nt19).group(1)

    # --- NT1.6 caso 8: los pies de «tu anio»
    tabla = bloque(t1, "**Los dos años", "**Reacciones del cierre (director Ugarte)")
    fila_de = {"Financiar": 0, "No financiar": 1, "Esperar": 2}
    pies = {}
    for linea in tabla.splitlines():
        m = re.match(r"^\| \*\*(Financiar|No financiar|Esperar)\*\* \|", linea)
        if m:
            segs = re.findall(r"«([^»]*)»", linea)
            if len(segs) != 3:
                raise SystemExit("fila de pies rara: %r" % linea[:80])
            pies[str(fila_de[m.group(1)])] = segs   # pies[decision][real]

    # --- NT1.7: sobres
    nt17 = bloque(t1, "### NT1.7", "### NT1.8")
    sobres, sin_sobre = {}, []
    for linea in nt17.splitlines():
        m = re.match(r"^\| (S-\w+) \|", linea)
        if not m:
            continue
        ultima = celdas(linea)[-1]
        seg = re.match(r"^«([^»]*)»", ultima)
        if seg:
            sobres[m.group(1)] = seg.group(1)
        else:
            sin_sobre.append(m.group(1))

    # --- NT1.8: expedientes
    nt18 = bloque(t1, "### NT1.8", "### NT1.9")
    expedientes = {}
    for linea in nt18.splitlines():
        m = re.match(r"^\| (R-(H[1-4])[ab]) \| [^|]* \| \*\*«(.*?)»\*\* (.*) \|$", linea)
        if m:
            expedientes[m.group(1)] = {"habito": m.group(2), "titulo": m.group(3), "texto": m.group(4).strip()}

    # --- comprobaciones: si algo no cuadra, no se escribe
    fallas = []
    if len(ramas) != 72:
        fallas.append("ramas %d (esperado 72)" % len(ramas))
    if sorted(de_rama) != sorted(ramas):
        fallas.append("ramas sin cierre o cierres de ramas que no existen")
    if len(cierres) != 11:
        fallas.append("cierres %d (esperado 11)" % len(cierres))
    nulos = sorted(r for r, v in ramas.items() if v["hiciste"] is None or v["habria"] is None)
    if nulos != ["F8e", "F8f"] or ramas["F8e"]["hiciste"] is None or ramas["F8f"]["hiciste"] is None:
        fallas.append("lineas sin texto fuera de F8e/F8f: %r" % nulos)
    if set(ramas["F6j"]["habria"]) != {"grupo"}:
        fallas.append("F6j habria: %r" % ramas["F6j"]["habria"])
    if len(sobres) != 28 or sorted(sin_sobre) != ["S-E5e", "S-E8d"]:
        fallas.append("sobres con texto %d (esperado 28), sin texto %r" % (len(sobres), sin_sobre))
    if len(expedientes) != 8:
        fallas.append("expedientes %d (esperado 8)" % len(expedientes))
    if sorted(pies) != ["0", "1", "2"]:
        fallas.append("pies %r" % sorted(pies))
    if len(camino) != 3:
        fallas.append("camino %d globos (esperado 3)" % len(camino))
    if fallas:
        raise SystemExit("NO se escribe: " + "; ".join(fallas))

    salida = {
        "_aviso": "Generado por docs/juego/gdd/scripts-t1/exportar_guion_t1.py desde 05-mundo-y-narrativa.md. No editar a mano.",
        "ramas": ramas,
        "cierres": cierres,
        "pies": pies,
        "camino": camino,
        "beto": beto,
        "sobres": sobres,
        "expedientes": expedientes,
    }
    texto = json.dumps(salida, ensure_ascii=False, indent=1) + "\n"
    with open(DESTINO + ".tmp", "w", encoding="utf-8", newline="") as f:
        f.write(texto)
    os.replace(DESTINO + ".tmp", DESTINO)
    print("ramas", len(ramas), "cierres", len(cierres), "sobres", len(sobres), "expedientes", len(expedientes), "pies", sum(len(v) for v in pies.values()))
    print("escrito", DESTINO, len(texto), "bytes")


if __name__ == "__main__":
    principal()
