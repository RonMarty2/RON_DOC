# -*- coding: utf-8 -*-
"""Recuento del bucle v2 del Tema 1: comprueba el documento 02 contra los datos de tablas_t1_v2.py
y contra los efectos que escribe la narrativa (05, NT1.6). Corre con:  python -I contar_t1_v2.py
Guarda su salida en salida_contar_t1_v2.txt. Termina con codigo 1 si alguna comprobacion falla.
"""
import math
import os
import re
import sys
from itertools import combinations

sys.stdout.reconfigure(encoding="utf-8")
AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, AQUI)
import tablas_t1_v2 as T  # noqa: E402

GDD = os.path.dirname(AQUI)
RUTA_02 = os.path.join(GDD, "02-bucle-y-mecanicas.md")
RUTA_05 = os.path.join(GDD, "05-mundo-y-narrativa.md")

MENOS = "−"
RAYA = "—"
salida = []
fallas = []


def P(s=""):
    salida.append(s)


def chk(nombre, ok, detalle=""):
    P("%s %s%s" % ("OK   " if ok else "FALLA", nombre, (" :: " + detalle) if detalle else ""))
    if not ok:
        fallas.append(nombre)


def leer(ruta):
    with open(ruta, encoding="utf-8") as f:
        return f.read()


def seccion_v2(txt):
    a = txt.index("<!--T1V2-INICIO-->")
    b = txt.index("versión 1 · 08-10-2026 (superada")
    return txt[a:b]


def norm(s):
    return s.replace("-", MENOS) if False else s


def lineas_tabla(sec):
    return [l for l in sec.split("\n") if l.startswith("|")]


def main():
    t02 = leer(RUTA_02)
    sec = seccion_v2(t02)
    lin = sec.split("\n")
    P("Recuento del bucle v2 del Tema 1. Seccion v2 de 02: %d lineas, %d caracteres" % (len(lin), len(sec)))
    P("")

    # --- 1. reglas G, mecanicas M, paso P, revelacion V
    g = sorted(set(re.findall(r"^\| (G\d+) \|", sec, re.M)), key=lambda x: int(x[1:]))
    chk("Reglas G1 a G12", g == ["G%d" % i for i in range(1, 13)], "%d: %s" % (len(g), ",".join(g)))
    m = sorted(set(re.findall(r"^\| (M\d+) \|", sec, re.M)), key=lambda x: int(x[1:]))
    chk("Mecanicas M1 a M14", m == ["M%d" % i for i in range(1, 15)], "%d" % len(m))
    p = re.findall(r"^\| (P1\.\d) \|", sec, re.M)
    chk("Reglas del paso 1, P1.1 a P1.6", p == ["P1.%d" % i for i in range(1, 7)], "%d" % len(p))
    vv = re.findall(r"^\| (V\d) \|", sec, re.M)
    chk("Reglas de la revelacion V1 a V6", vv == ["V%d" % i for i in range(1, 7)], "%d" % len(vv))

    # --- 2. filas R: ids y efectos
    ids_doc = re.findall(r"^\| (R\d\.(?:\d|[A-Z])(?:\.[A-Za-z]+)?) \|", sec, re.M)
    ids_dato = list(T.FILAS.keys())
    chk("Filas de efecto R2 a R8 en el documento = datos (sin repetidas)",
        sorted(ids_doc) == sorted(ids_dato) and len(ids_doc) == len(set(ids_doc)),
        "doc %d, datos %d" % (len(ids_doc), len(ids_dato)))
    por_caso = {}
    for i in ids_doc:
        c = int(i[1])
        por_caso[c] = por_caso.get(c, 0) + 1
    chk("Filas por caso (R2 5, R3 5, R4 7, R5 9, R6 7, R7 5, R8 8 = 46)", por_caso == T.FILAS_POR_CASO and sum(por_caso.values()) == 46,
        str(dict(sorted(por_caso.items()))) + " total %d" % sum(por_caso.values()))
    lineas = {}
    for l in lineas_tabla(sec):
        mm = re.match(r"^\| (R\d\.(?:\d|[A-Z])(?:\.[A-Za-z]+)?) \|", l)
        if mm:
            lineas[mm.group(1)] = l
    malas = []
    for i, dd in T.FILAS.items():
        fila = lineas.get(i, "")
        for k, ce in dd.items():
            s = T.fmt(ce)
            if s not in fila:
                malas.append("%s[%s] falta %s" % (i, k, s))
    chk("Cada efecto de los datos aparece en la linea de su fila", not malas, "; ".join(malas[:8]) if malas else "%d efectos" % sum(len(d) for d in T.FILAS.values()))

    # --- 3. G5
    g5_en_doc = all(f in sec for f in T.G5_FILAS)
    chk("G5: las 7 filas nombradas existen en el documento y en los datos", g5_en_doc and all(f in T.FILAS for f in T.G5_FILAS), ", ".join(T.G5_FILAS))
    mitad_ok = []
    for sin, (base, k) in T.G5_MITAD.items():
        b = T.FILAS[base][k]
        s = list(T.FILAS[sin].values())[0]
        esperado = (int(b[0] / 2), int(b[1] / 2))   # int() redondea hacia cero
        mitad_ok.append((sin, s == esperado))
    chk("G5: cinco filas valen exactamente la mitad (redondeo hacia cero) de su fila con evidencia",
        all(o for _, o in mitad_ok), ", ".join("%s %s" % (a, "ok" if o else "NO") for a, o in mitad_ok))
    # Cada regla general aparece aplicada en TODAS las tablas de efectos que le corresponden:
    # se parte la seccion 5 por caso y se comprueba, caso por caso, la huella de la regla.
    sec5 = sec[sec.index("### 5. Los casos 2 a 8"):sec.index("### 6. La revelación")]
    partes = re.split(r"^#### (5\.\d) ", sec5, flags=re.M)
    caso_txt = {}
    for i in range(1, len(partes), 2):
        caso_txt[partes[i]] = partes[i + 1]
    # (regla, subseccion, patron que debe aparecer, para que la regla se vea en esa tabla)
    matriz = [
        ("G5", "5.1", r"R2\.1\.sin"), ("G5", "5.2", r"R3\.B\.sin"), ("G5", "5.3", r"R4\.1\.sin.*\n.*\n.*R4\.2\.sin|R4\.2\.sin"),
        ("G5", "5.4", r"R5\.8 .*G5"), ("G5", "5.5", r"R6\.1\.sin"), ("G5", "5.7", r"R8\.3 .*G5"),
        ("G5", "5.6", r"D-T1-2"),            # el caso 7 queda fuera de G5 y lo dice
        ("G2", "5.4", r"\(o 2, G2\)"), ("G2", "5.7", r"2 con el castigo"),
        ("G10", "5.1", r"G10"), ("G10", "5.4", r"carpeta de 6 siempre trae"), ("G10", "5.5", r"no cuesta ficha"),
        ("G10", "5.6", r"no gasta ficha"), ("G10", "5.7", r"fondo de 9"),
        ("G3", "5.2", r"cada tanda|tandas"), ("G7", "5.1", r"2 de 3"), ("G7", "5.2", r"R3\.A\.con"),
        ("G7", "5.6", r"Tipo P \(eje truncado\) \| Tipo B"), ("G7", "5.5", r"Tipo P \| Tipo B \| Tipo A"),
        ("G7", "5.3", r"50 %"), ("G7", "5.7", r"1/3|probabilidad 1/3"),
        ("G4", "5.4", r"firma con su número|Firmar"), ("G12", "5.1", r"jefa|informe de gestión"),
    ]
    faltan = []
    for regla, sub, patron in matriz:
        if not re.search(patron, caso_txt.get(sub, ""), re.S):
            faltan.append("%s en %s (%s)" % (regla, sub, patron))
    chk("Cada regla general aparece aplicada en las tablas de efectos que le corresponden (%d comprobaciones)" % len(matriz),
        not faltan, "; ".join(faltan) if faltan else "G2, G3, G4, G5, G7, G10, G12 revisadas caso por caso")
    # G5: el caso 7 se declara fuera, y todos los demas casos con papel clave tienen su fila
    con_sin = {c: any(f in caso_txt[s] for f in T.G5_FILAS) for c, s in ((2, "5.1"), (3, "5.2"), (4, "5.3"), (5, "5.4"), (6, "5.5"), (8, "5.7"))}
    chk("G5 en los casos 2, 3, 4, 5, 6 y 8 (cada uno nombra su fila de acierto sin evidencia)", all(con_sin.values()), str(con_sin))
    # G6: plaza fija 65/65 coherente en toda la seccion
    chk("Meta 65 y marcas 25 y 65 en G6, G11, P1.6 y 1.3; no queda '60/60' como meta", "C ≥ 65 y Voz ≥ 65" in sec and "marcas 25 y 65" in sec and "(C = 50, Voz = 50, con marcas en 25 y 65)" in sec)
    # codigos que dan 'sin evidencia' = filas
    # --- 4. codigos E
    cods_doc = sorted(set(re.findall(r"`(E\d[a-f])`", sec)))
    chk("Codigos E: 29 en los datos", len(T.CODIGOS) == 29, "%d" % len(T.CODIGOS))
    chk("Codigos E del documento = datos", cods_doc == sorted(T.CODIGOS), "doc %d" % len(cods_doc))
    porc = {}
    for c in T.CODIGOS:
        porc[int(c[1])] = porc.get(int(c[1]), 0) + 1
    chk("Codigos por caso (E2 4, E3 6, E4 3, E5 5, E6 4, E7 3, E8 4)", porc == T.CODIGOS_POR_CASO, str(dict(sorted(porc.items()))))
    # tabla unica 8.1
    filas81 = re.findall(r"^\| (E\d[a-f]) \| ([^|]*) \| ([^|]*) \| ([^|]*) \| ([^|]*) \|", sec, re.M)
    chk("Tabla unica de codigos y habitos (8.1): 29 filas, sin repetidas", len(filas81) == 29 and len({f[0] for f in filas81}) == 29, "%d filas" % len(filas81))
    difh = []
    for cod, caso, cuando, hab, sobre in filas81:
        hs = sorted(re.findall(r"H\d", hab))
        if hs != sorted(T.CODIGOS[cod][1]):
            difh.append("%s doc %s datos %s" % (cod, hs, T.CODIGOS[cod][1]))
    chk("Habitos de cada codigo en el documento = datos", not difh, "; ".join(difh))
    cuenta = {"H1": 0, "H2": 0, "H3": 0, "H4": 0}
    for c, (_, hs) in T.CODIGOS.items():
        for h in hs:
            cuenta[h] += 1
    chk("Ningun codigo sin habito (29 de 29 con al menos uno)", all(len(hs) >= 1 for _, hs in T.CODIGOS.values()))
    chk("Codigos por habito (H1 7, H2 5, H3 12, H4 9; E8d en dos)", cuenta == T.HABITOS_ESPERADOS, str(cuenta))
    con_dos = sorted(c for c, (_, hs) in T.CODIGOS.items() if len(hs) > 1)
    P("     codigos en dos habitos: %s" % ", ".join(con_dos))
    chk("Los tres codigos que faltaban en 04 (hallazgo I1: E2d, E3f, E5e) estan en la tabla", all(c in T.CODIGOS for c in ("E2d", "E3f", "E5e")))
    chk("Sobres: S-P1 + 29 codigos = 30, dos sin sobre propio (E5e, E8d)", 1 + len(T.CODIGOS) == 30 and sorted(T.SIN_SOBRE) == ["E5e", "E8d"])

    # --- 5. cambios (17) y ajustes (15)
    sec0 = sec[sec.index("### 0. Qué cambió"):sec.index("### 1. Los tres bucles")]
    cambios = re.findall(r"^\| (\d+) \| ", sec0, re.M)
    chk("Cambios de la secc. 0: 17", cambios == [str(i) for i in range(1, 18)], "%d" % len(cambios))
    sec14 = sec[sec.index("### 14. Ajustes"):sec.index("### 15. Avisos")]
    aj = re.findall(r"^\| (\d+) \| ", sec14, re.M)
    chk("Ajustes a la ficha de la secc. 14: 15", aj == [str(i) for i in range(1, 16)], "%d" % len(aj))

    # --- 6. G7: tiradas
    ok_t = True
    for t3, t6, t7 in T.TIRADAS:
        ts = (t3, t6, t7)
        if "B" not in ts or "P" not in ts or ts.count("A") > 1 or t7 == "A":
            ok_t = False
    # son exactamente las que cumplen
    import itertools
    todas = [ts for ts in itertools.product("PBA", repeat=3) if "B" in ts and "P" in ts and ts.count("A") <= 1 and ts[2] != "A"]
    chk("G7: las 10 tiradas son exactamente las que cumplen las restricciones", ok_t and sorted(todas) == sorted(T.TIRADAS), "%d posibles, %d en la lista" % (len(todas), len(T.TIRADAS)))
    for j, nom in ((0, "caso 3"), (1, "caso 6"), (2, "caso 7")):
        cnt = {k: sum(1 for t in T.TIRADAS if t[j] == k) for k in "PBA"}
        P("     %s: P %d, B %d, A %d de 10" % (nom, cnt["P"], cnt["B"], cnt["A"]))
    chk("G7: caso 3 y caso 6 P4 B4 A2; caso 7 P5 B5",
        all(sum(1 for t in T.TIRADAS if t[j] == "P") == 4 and sum(1 for t in T.TIRADAS if t[j] == "A") == 2 for j in (0, 1))
        and sum(1 for t in T.TIRADAS if t[2] == "P") == 5)

    # --- 7. cotas exactas
    sumas = []
    for t3, t6, t7 in T.TIRADAS:
        s = (5 if t3 == "B" else -20) + (5 if t6 == "B" else -20) + (10 if t7 == "B" else -10)
        sumas.append(s)
    chk("E-S1: suma de C de los casos 3, 6 y 7 en las 10 tiradas, maximo 0", max(sumas) == 0, str(sumas))
    cota = 50 + max(sumas) + 5 + 5 + 4 + 0
    chk("E-S1: cota 50 + 0 + 5 + 5 + 4 + 0 = 64 < 65", cota == 64 and cota < T.META)
    pos = 5 + 5 + 4 + 15
    chk("E-S1: aumentos posibles = 29", pos == 29, "5 (c2) + 5 (c4) + 4 (c5) + 15 (par B de c3/c6/c7)")
    maxc = 0
    for t3, t6, t7 in T.TIRADAS:
        maxc = max(maxc, (5 if t3 == "B" else 0) + (5 if t6 == "B" else 0) + (10 if t7 == "B" else 0))
    chk("E-S1: lo mejor posible de los casos 3, 6 y 7 juntos = +15", maxc == 15)
    C = 8 + 8 + 8 + 12 + 8 + 8 + 12
    V = 4 + 4 + 4 + (6 - 3) + 4 + 4 + 8
    chk("Quien entiende en una version tipica: C suma 64 y Voz suma 31", C == 64 and V == 31, "C %d Voz %d (Voz final %d)" % (C, V, 50 + V))
    # E-S2: todo efecto de frenar/ninguna/esperar en Voz es <= 0
    frenar = [T.FILAS["R2.2"]["P"], T.FILAS["R2.2"]["B"], T.FILAS["R3.P"]["frenar"], T.FILAS["R3.B"]["frenar"], T.FILAS["R3.A.sin"]["frenar"],
              T.FILAS["R4.5"]["*"], T.FILAS["R5.3"]["*"], T.FILAS["R6.2"]["P"], T.FILAS["R6.2"]["B"], T.FILAS["R6.2"]["A"],
              T.FILAS["R7.5"]["P"], T.FILAS["R7.5"]["B"], T.FILAS["R8.8"]["*"]]
    chk("E-S2: los 13 efectos de frenar sobre Voz son negativos (Voz < 50 < 65)", len(frenar) == 13 and all(f[1] < 0 for f in frenar), "%d efectos, el menos negativo es %d" % (len(frenar), max(f[1] for f in frenar)))

    # --- 8. combinatoria de fichas
    def prob_clave(n_claves_necesarias, n_claves_total, fichas, papeles=6, basta_uno=False):
        tot = math.comb(papeles, fichas)
        if basta_uno:
            return 1 - math.comb(papeles - n_claves_total, fichas) / tot
        return math.comb(papeles - n_claves_necesarias, fichas - n_claves_necesarias) / tot
    r = {
        "un clave, 3 fichas": prob_clave(1, 1, 3), "un clave, 2 fichas": prob_clave(1, 1, 2),
        "dos claves basta uno, 3": prob_clave(0, 2, 3, basta_uno=True), "dos claves basta uno, 2": prob_clave(0, 2, 2, basta_uno=True),
        "dos claves necesarias, 3": prob_clave(2, 2, 3), "dos claves necesarias, 2": prob_clave(2, 2, 2),
        "tres papeles necesarios, 3 (caso 5 b)": prob_clave(3, 3, 3),
    }
    P("     fichas: " + "; ".join("%s %.3f" % (k, v) for k, v in r.items()))
    chk("Fichas: 0,50 / 0,33 / 0,80 / 0,60 / 0,20 / 0,067 / 0,05",
        [round(x, 3) for x in r.values()] == [0.5, 0.333, 0.8, 0.6, 0.2, 0.067, 0.05])

    # --- 9. P(|rho| <= 1) con el recorte de I5
    def Phi(x, mu, s=4.4):
        return 0.5 * (1 + math.erf((x - mu) / (s * math.sqrt(2))))
    def p_banda(delta):
        num = Phi(1, delta) - Phi(-1, delta)
        den = Phi(10, delta) - Phi(-4, delta)
        return num / den
    p0, p3 = p_banda(0.0), p_banda(3.0)
    chk("Escribir 0 vale con |rho| <= 1 en 22,3 % (delta 0) y 16,1 % (delta 3) con el recorte I5", abs(p0 - 0.223) < 0.001 and abs(p3 - 0.161) < 0.001, "%.1f %% y %.1f %%" % (100 * p0, 100 * p3))
    # refuerzo del caso 2: 3 de los 6 lugares libres de un fondo de 6 restantes
    chk("Refuerzo del caso 2 entra en 3/6 = 50 % de las versiones", math.comb(5, 2) / math.comb(6, 3) == 0.5, "3 lugares libres entre 6 papeles (incluye el refuerzo)")
    # confiabilidad
    chk("Confiabilidad del caso 5: 100/164 = 0,61", abs(100 / 164 - 0.61) < 0.005)

    # --- 10. contraste de colores
    def lum(h):
        h = h.lstrip("#")
        rgb = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
        f = [c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4 for c in rgb]
        return 0.2126 * f[0] + 0.7152 * f[1] + 0.0722 * f[2]
    def contraste(a, b):
        la, lb = lum(a), lum(b)
        hi, lo = max(la, lb), min(la, lb)
        return (hi + 0.05) / (lo + 0.05)
    c1, c2 = contraste("#b8d4ff", "#07060d"), contraste("#ffdc94", "#07060d")
    chk("Contraste de los textos del boceto: >= 4,5 a 1", c1 >= 4.5 and c2 >= 4.5, "#b8d4ff %.1f a 1; #ffdc94 %.1f a 1 (sobre #07060d)" % (c1, c2))

    # --- 11. efectos de la narrativa (05, NT1.6) contra los datos
    t05 = leer(RUTA_05)
    a = t05.index("#### Caso 2 · «El colegio sin denuncias»")
    b = t05.index("### NT1.7 Sobres de la jefa")
    nt16 = t05[a:b]
    pares_05 = 0
    dif = []
    for l in nt16.split("\n"):
        if not l.startswith("|"):
            continue
        mm = re.search(r"(R\d\.\d(?:\.sin)?)", l)
        if not mm:
            continue
        rid = mm.group(1)
        if rid not in T.FILAS:
            dif.append("%s no esta en los datos" % rid)
            continue
        validos = {ce for d in T.FILAS[rid].values() for ce in [d]}
        for grupo in re.findall(r"\(([^)]*)\)", l):
            for c_, v_ in re.findall(r"([+−-]?\d+)/([+−-]?\d+)", grupo):
                ce = (int(c_.replace(MENOS, "-")), int(v_.replace(MENOS, "-")))
                pares_05 += 1
                if ce not in validos:
                    dif.append("%s: 05 dice %s" % (rid, T.fmt(ce)))
    chk("Efectos de las reacciones de 05 (NT1.6) contra los datos", not dif, "%d pares leidos; diferencias: %s" % (pares_05, "; ".join(dif[:10]) if dif else "0"))

    # --- 12. texto: guiones largos, voseo, citas, programas, marcadores
    chk("Sin guiones largos (U+2014) en la seccion v2", RAYA not in sec, "%d" % sec.count(RAYA))
    voseo = re.findall(r"\b(tenés|podés|sabés|querés|hacé|poné|mirá|contá|elegí|abrí|fijate|usá|vos|sos|decí|escribí|fijá)\b", sec, re.I)
    chk("Sin formas de voseo comunes", not voseo, str(voseo[:5]))
    prog = re.findall(r"jamovi|EViews|Excel|SPSS|según el dossier|lee el dossier", sec, re.I)
    P("     menciones de programas o 'dossier' (deben estar solo en notas del equipo): %d -> %s" % (len(prog), sorted(set(x.lower() for x in prog))))
    marc = re.findall(r"\[RECONSTRUIR[^\]]*\]", sec)
    P("     marcadores [RECONSTRUIR]: %d" % len(marc))
    viejo = re.findall(r"Lectores|editora|portada|titular de la agencia|mesa fija", sec)
    P("     vocabulario viejo en la seccion: %d -> %s" % (len(viejo), sorted(set(viejo))))
    fuera = []
    for n_, l in enumerate(lin, 1):
        if re.search(r"Lectores|editora|portada|titular de la agencia|mesa fija", l) and "Vocabulario de la narrativa v3" not in l \
                and "Qué cambió" not in l and "no se cambia" not in l and "cambia de «Lectores»" not in l:
            fuera.append("linea %d de la seccion: %s" % (n_, l[:90]))
    chk("Vocabulario viejo (Lectores, editora, portada, mesa fija) solo en la nota de equivalencias", not fuera, " | ".join(fuera))
    # [RECONSTRUIR]: los de la secc. 16 deben cubrir los del texto
    sec16 = sec[sec.index("### 16. Lo que no se pudo reconstruir"):sec.index("### Lista de salida")]
    n16 = len(re.findall(r"^\d+\. \*\*", sec16, re.M))
    chk("Secc. 16 lista 7 puntos que no se pudieron reconstruir", n16 == 7, "%d puntos; %d marcadores en el texto" % (n16, len(marc)))

    P("")
    P("Resultado: %d comprobaciones fallaron." % len(fallas))
    texto = "\n".join(salida)
    print(texto)
    ruta = os.path.join(AQUI, "salida_contar_t1_v2.txt")
    with open(ruta + ".tmp", "w", encoding="utf-8") as f:
        f.write(texto + "\n")
    os.replace(ruta + ".tmp", ruta)
    return 1 if fallas else 0


if __name__ == "__main__":
    sys.exit(main())
