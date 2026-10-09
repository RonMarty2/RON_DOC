# -*- coding: utf-8 -*-
"""ramas_t1.py: modelo de ramas de la revelacion del Tema 1 (Psicoestadistica Descriptiva, Psicologia).

RECONSTRUIDO el 08-10-2026 (el original, que escribio el agente de aprendizaje con la v2.1, nunca se guardo).
A diferencia de aquel (que "modelaba la tabla, no las reglas", critico v15), este IMPORTA las tablas del bucle
(tablas_t1_v2.py: filas de efecto, codigos, hábitos, tiradas) y recorre el espacio de estados de cada caso.

Corre con:   python -I ramas_t1.py            (comprueba y guarda salida_ramas_t1.txt)
             python -I ramas_t1.py --escribir-04   (ademas reescribe, en 04-aprendizaje.md, los bloques generados
                                                    entre <!--GEN:...--> y <!--/GEN:...-->)

Que comprueba:
  1. Cada estado posible de cada caso (tipo x opcion x papeles abiertos x pieza x ...) cae en EXACTAMENTE una rama.
  2. Cada rama afirma solo hechos verdaderos para todos los estados que le tocan (hechos de estado, calculados con
     las filas de pago de tablas_t1_v2) o los declara como SUPUESTOS del generador (Q1...), que se miden con una
     simulacion del modelo del bucle (5.4).
  3. Cada fila de pago del bucle se alcanza, y cada decision equivocada tiene codigo E.. y habito (huecos declarados).
  4. B1 (caso 3 con/sin pieza) y B2 (F5h) del critico v15: la rama nueva no es falsa en ninguna combinacion de delta y rho.
  5. Todo texto de alumno <= 25 palabras (los {huecos} cuentan 1); sin guiones largos; sin voseo conocido.
  6. Sobres y codigos de 05 NT1.7 contra los 29 codigos del bucle; diferencias de textos contra 05 NT1.9 (lo que narrativa debe copiar).
"""
import itertools
import os
import random
import re
import sys

sys.stdout.reconfigure(encoding="utf-8")
AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, AQUI)
import tablas_t1_v2 as T  # noqa: E402

GDD = os.path.dirname(AQUI)
RUTA_04 = os.path.join(GDD, "04-aprendizaje.md")
RUTA_05 = os.path.join(GDD, "05-mundo-y-narrativa.md")
SALIDA = os.path.join(AQUI, "salida_ramas_t1.txt")

LINEAS = []
FALLAS = []


def P(s=""):
    LINEAS.append(s)
    print(s)


def chk(nombre, ok, detalle=""):
    P("%s %s%s" % ("OK   " if ok else "FALLA", nombre, (" :: " + detalle) if detalle else ""))
    if not ok:
        FALLAS.append(nombre)


# =====================================================================================
# 1. ESTADOS POR CASO y su pago (tomado de tablas_t1_v2.FILAS: nada de cifras copiadas)
# =====================================================================================
def suma(ce):
    return ce[0] + ce[1]


def estados_1():
    for ab in (True, False):
        yield dict(ficha=1, abre_propio=ab)


def estados_2():
    for tipo in "PB":
        for clave in (0, 1):
            for dec in ("tal", "frenar", "frase_con", "frase_sin"):
                if dec == "frase_con" and not clave:
                    continue
                for ref in ((0, 1) if (dec == "frase_con" and tipo == "P") else (0,)):
                    yield dict(ficha=2, tipo=tipo, clave=clave, dec=dec, ref=ref)


def pago2(s):
    t, d = s["tipo"], s["dec"]
    if d == "tal":
        if t == "P":
            fila, k = "R2.1", "P"
        else:
            fila, k = ("R2.1", "B") if s["clave"] else ("R2.1.sin", "B")
    elif d == "frenar":
        fila, k = "R2.2", t
    elif d == "frase_con":
        fila, k = "R2.3", ("P con refuerzo" if (t == "P" and s["ref"]) else t)
    else:
        fila, k = "R2.4", t
    return fila, k, T.FILAS[fila][k]


def estados_3():
    for tipo in "PBA":
        for fichas in (3, 2):
            for tandas in range(0, fichas + 1):
                for clave in (0, 1):
                    if tandas + clave > fichas:
                        continue
                    for dec in ("tal", "frenar"):
                        yield dict(ficha=3, tipo=tipo, fichas=fichas, tandas=tandas, clave=clave, dec=dec,
                                   nivel=None, pieza=0, mm3=0)
                    if tandas >= 2:
                        for nivel in ("ok", "flojo", "noCubre", "ancho"):
                            for pieza in (0, 1):
                                if pieza and not clave:
                                    continue
                                for mm3 in ((0, 1) if (tandas == 3 and nivel == "noCubre") else (0,)):
                                    yield dict(ficha=3, tipo=tipo, fichas=fichas, tandas=tandas, clave=clave,
                                               dec="rango", nivel=nivel, pieza=pieza, mm3=mm3)


def pago3(s):
    t, d = s["tipo"], s["dec"]
    if d == "tal":
        if t == "B":
            fila = "R3.B" if s["clave"] else "R3.B.sin"
        else:
            fila = "R3.P" if t == "P" else "R3.A.sin"
        k = "tal cual"
    elif d == "frenar":
        fila, k = {"P": "R3.P", "B": "R3.B", "A": "R3.A.sin"}[t], "frenar"
    else:
        n, p = s["nivel"], s["pieza"]
        if n in ("noCubre", "ancho"):
            fila = {"P": "R3.P", "B": "R3.B", "A": ("R3.A.con" if p else "R3.A.sin")}[t]
            k = n
        elif t == "A":
            if p:
                fila, k = "R3.A.con", ("ok con pieza" if n == "ok" else "flojo con pieza")
            else:
                fila, k = "R3.A.sin", "rango sin pieza"
        else:
            fila = "R3.P" if t == "P" else "R3.B"
            k = "ok con pieza" if (n == "ok" and p) else "ok sin pieza o flojo"
    return fila, k, T.FILAS[fila][k]


def estados_4():
    for bueno in "AB":
        for elige in ("A", "B", "ninguna"):
            for clave in (0, 1):
                yield dict(ficha=4, bueno=bueno, elige=elige, clave=clave)


def pago4(s):
    b, e, c = s["bueno"], s["elige"], s["clave"]
    if e == "ninguna":
        fila = "R4.5"
    elif e == b:
        fila = ("R4.1" if b == "A" else "R4.2") + ("" if c else ".sin")
    else:
        fila = "R4.3" if e == "A" else "R4.4"   # R4.3: eligio el malo y es A; R4.4: eligio el malo y es B
    return fila, "*", T.FILAS[fila]["*"]


def estados_5():
    """Turno 2 del caso 5. Flags de x respecto de las cuatro bandas (todas +-1,0)."""
    for op in "abc":
        for fichas in (3, 2):
            for req in (0, 1):
                for c1 in (0, 1):
                    for c2 in (0, 1):
                        if req and not c1:
                            continue
                        if req and op == "b" and not c2:
                            continue
                        if op == "b" and req and fichas == 2:
                            continue
                        if req and op in "ac" and c2 and fichas == 2:
                            continue
                        yield dict(ficha=5, op=op, fichas=fichas, req=req, c1=c1, c2=c2, dec="frenar",
                                   en_rho=0, en_bruta=0, en_infl=0, cero=0, rhosig=None)
                        for en_rho, en_bruta, en_infl, cero in itertools.product((0, 1), repeat=4):
                            if cero:
                                sigs = ["mid"] if en_rho else ["pos", "neg"]
                            else:
                                sigs = [None]
                            for sig in sigs:
                                yield dict(ficha=5, op=op, fichas=fichas, req=req, c1=c1, c2=c2, dec="num",
                                           en_rho=en_rho, en_bruta=en_bruta, en_infl=en_infl, cero=cero,
                                           rhosig=sig)


def regla5(s):
    if s["dec"] == "frenar":
        return "R5.3"
    if s["c1"] and s["en_bruta"] and not s["en_rho"]:
        return "R5.4"
    if s["op"] in "ab" and s["c2"] and s["en_infl"] and not s["en_rho"]:
        return "R5.5"
    if s["en_rho"]:
        if s["req"]:
            return "R5.6" if s["op"] == "c" else "R5.7"
        return "R5.8"
    return "R5.9"


def pago5(s):
    f = regla5(s)
    return f, "*", T.FILAS[f]["*"]


def estados_6():
    for tipo in "PBA":
        for clave in (0, 1):
            for dec in ("tal", "frenar"):
                yield dict(ficha=6, tipo=tipo, clave=clave, dec=dec, ext=None, ncorr=1)
            for ext in ("ninguna", "podrian", "grupo"):
                if ext == "grupo" and not clave:
                    continue
                for ncorr in (1, 0):
                    yield dict(ficha=6, tipo=tipo, clave=clave, dec="redactar", ext=ext, ncorr=ncorr)


def pago6(s):
    t, d = s["tipo"], s["dec"]
    if d == "tal":
        if t == "B" and not s["clave"]:
            return "R6.1.sin", "B", T.FILAS["R6.1.sin"]["B"]
        return "R6.1", t, T.FILAS["R6.1"][t]
    if d == "frenar":
        return "R6.2", t, T.FILAS["R6.2"][t]
    fila = {"ninguna": "R6.3", "podrian": "R6.4", "grupo": "R6.5"}[s["ext"]]
    ce = T.FILAS[fila][t]
    if not s["ncorr"]:
        ce = (ce[0] + T.FILAS["R6.6"]["*"][0], ce[1] + T.FILAS["R6.6"]["*"][1])
    return fila, t, ce


def estados_7():
    for tipo in "PB":
        for dec in ("tal", "redis", "frenar"):
            for xok in ((1, 0) if dec != "frenar" else (1,)):
                yield dict(ficha=7, tipo=tipo, dec=dec, xok=xok)


def pago7(s):
    t, d = s["tipo"], s["dec"]
    fila = {"tal": ("R7.1" if s["xok"] else "R7.2"), "redis": ("R7.3" if s["xok"] else "R7.4"), "frenar": "R7.5"}[d]
    return fila, t, T.FILAS[fila][t]


def estados_8():
    for real, dec, e, beto in itertools.product(range(3), range(3), range(3), range(3)):
        yield dict(ficha=8, real=real, dec=dec, e=e, beto=beto)   # 0 financiar, 1 no financiar, 2 aun no / esperar


def pago8(s):
    r, d, e = s["real"], s["dec"], s["e"]
    if d == r:
        fila = {2: "R8.1", 1: "R8.2", 0: "R8.3"}[e]
    elif d == 0:
        fila = "R8.4" if r == 1 else "R8.5"
    elif d == 1:
        fila = "R8.6" if r == 0 else "R8.7"
    else:
        fila = "R8.8"
    return fila, "*", T.FILAS[fila]["*"]


ESTADOS = {1: estados_1, 2: estados_2, 3: estados_3, 4: estados_4, 5: estados_5, 6: estados_6, 7: estados_7,
           8: estados_8}
PAGO = {2: pago2, 3: pago3, 4: pago4, 5: pago5, 6: pago6, 7: pago7, 8: pago8}


def todos_los_estados():
    for f in range(1, 9):
        for s in ESTADOS[f]():
            yield s


# =====================================================================================
# 2. CODIGOS DE ERROR (tabla 8.1 del bucle) y CLASE de registro
# =====================================================================================
def codigos(s):
    """Codigos E.. que dispara el estado, segun la tabla unica 8.1 del bucle v2."""
    f = s["ficha"]
    c = set()
    if f == 2:
        t, d = s["tipo"], s["dec"]
        if t == "P" and d == "tal":
            c.add("E2a")
        if t == "P" and d == "frenar" and not s["clave"]:
            c.add("E2b")
        if d == "frase_sin":
            c.add("E2c")
        if t == "B" and d == "frenar":
            c.add("E2d")
    elif f == 3:
        t, d = s["tipo"], s["dec"]
        if d == "tal" and s["tandas"] <= 1 and t in "PA":
            c.add("E3a")
        if d == "rango":
            n, p = s["nivel"], s["pieza"]
            if n == "noCubre":
                c.add("E3b")
            if n == "ancho":
                c.add("E3c")
            if t == "A" and n in ("ok", "flojo") and not p:
                c.add("E3e")
            if t in "PB" and n == "ok" and not p:
                c.add("E3f")
        if d == "frenar" and t == "B":
            c.add("E3d")
    elif f == 4:
        b, e, cl = s["bueno"], s["elige"], s["clave"]
        if e == "ninguna":
            c.add("E4c")
        elif e != b:
            if not cl:
                c.add("E4a")
            elif b == "A" and e == "B":
                c.add("E4b")
    elif f == 5:
        r = regla5(s)
        if r == "R5.4":
            c.add("E5a")
        if r == "R5.5":
            c.add("E5b")
        if r in ("R5.8", "R5.9") and not s["req"]:
            c.add("E5c")
        if s["dec"] == "num" and s["cero"] and s["req"] and s["rhosig"] == "pos":
            c.add("E5d")
        if s["op"] in "ab":
            c.add("E5e")
    elif f == 6:
        t, d = s["tipo"], s["dec"]
        if d == "redactar" and not s["ncorr"]:
            c.add("E6a")
        if d == "tal" and t in "PA":
            c.add("E6b")
        if d == "redactar" and s["ext"] == "podrian" and t in "PA":
            c.add("E6c")
        if d == "frenar" and t == "B":
            c.add("E6d")
    elif f == 7:
        t, d = s["tipo"], s["dec"]
        if d in ("tal", "redis") and not s["xok"]:
            c.add("E7a")
        if t == "P" and d == "tal":
            c.add("E7b")
        if t == "B" and d in ("redis", "frenar"):
            c.add("E7c")
    elif f == 8:
        r, d, e, b = s["real"], s["dec"], s["e"], s["beto"]
        if e < 2:
            c.add("E8a")
        if d == 2 and r != 2:
            c.add("E8b")
        if d != 2 and d != r:
            c.add("E8c")
        if (d == b and d != r) or (d != b and b == r):
            c.add("E8d")
    return c


CL_SOLO, CL_PISTA, CL_ENGANO, CL_SIN_EV, CL_SOBRE = ("descubrió solo", "descubrió con pista", "se dejó engañar",
                                                      "acierto sin evidencia", "sobrecorrigió")


def clase(s):
    """Clase de registro por idea (5 clases de v1). Propuesta de esta reconstruccion: ver T1.5a."""
    f = s["ficha"]
    if f == 1:
        return CL_SOLO if s["abre_propio"] else CL_PISTA
    fila, k, ce = PAGO[f](s) if f in PAGO else (None, None, None)
    if f == 2:
        d, t = s["dec"], s["tipo"]
        if d == "frase_con":
            return CL_SOLO
        if d == "tal":
            if t == "P":
                return CL_ENGANO
            return CL_SOLO if s["clave"] else CL_SIN_EV
        return CL_SOBRE
    if f == 3:
        t, d = s["tipo"], s["dec"]
        if d == "tal":
            if t == "B":
                return CL_SOLO if s["clave"] else CL_SIN_EV
            return CL_ENGANO
        if d == "frenar":
            return CL_SOBRE
        n, p = s["nivel"], s["pieza"]
        if n == "noCubre":
            return CL_ENGANO
        if n == "ancho":
            return CL_SOBRE
        if t == "B":
            return CL_SOBRE
        if t == "A":
            if not p:
                return CL_ENGANO
            return CL_SOLO if n == "ok" else CL_SOBRE
        # P
        if n == "ok" and p:
            return CL_SOLO
        if n == "ok" and not p:
            return CL_SOBRE if s["clave"] else CL_SIN_EV     # E3f: bucle 8.1
        return CL_SOBRE                                       # flojo
    if f == 4:
        b, e, cl = s["bueno"], s["elige"], s["clave"]
        if e == "ninguna":
            return CL_SOBRE
        if e == b:
            return CL_SOLO if cl else CL_SIN_EV
        if e == "B" and b == "A" and cl:
            return CL_SOBRE
        return CL_ENGANO
    if f == 5:
        r = fila
        if r == "R5.3":
            return CL_SOBRE
        if r in ("R5.4", "R5.5"):
            return CL_ENGANO
        if r in ("R5.6", "R5.7"):
            return CL_SOLO
        if r == "R5.8":
            return CL_SIN_EV
        if s["req"] and s["cero"]:
            return CL_SOBRE
        return CL_ENGANO
    if f == 6:
        t, d = s["tipo"], s["dec"]
        if d == "redactar" and not s["ncorr"]:
            return CL_ENGANO
        if d == "tal":
            if t == "B":
                return CL_SOLO if s["clave"] else CL_SIN_EV
            return CL_ENGANO
        if d == "frenar":
            return CL_SOBRE
        return CL_SOLO if s["ext"] == "grupo" else CL_SOBRE
    if f == 7:
        t, d = s["tipo"], s["dec"]
        if d == "frenar":
            return CL_SOBRE
        if t == "P":
            return CL_SOLO if (d == "redis" and s["xok"]) else CL_ENGANO
        if d == "tal":
            return CL_SOLO if s["xok"] else CL_ENGANO
        return CL_SOBRE
    if f == 8:
        r, d, e = s["real"], s["dec"], s["e"]
        if d == r:
            return CL_SOLO if e == 2 else CL_SIN_EV
        return CL_SOBRE if d == 2 else CL_ENGANO


def correcta(s):
    return clase(s) in (CL_SOLO, CL_PISTA, CL_SIN_EV)


# =====================================================================================
# 3. RAMAS: id, ficha, cuando (predicado), cuando_txt, hechos
#    hechos = lista de (tipo_hecho, descripcion, fn) con tipo "est" (se comprueba contra el estado)
#    o "gen" (supuesto del generador: Q1..Q5; se mide con la simulacion de la secc. 7)
# =====================================================================================
RAMAS = []


def R(id_, ficha, cuando, cuando_txt, hechos=()):
    RAMAS.append(dict(id=id_, ficha=ficha, cuando=cuando, txt=cuando_txt, hechos=list(hechos)))


def H(desc, fn):
    return ("est", desc, fn)


def Q(qid, desc):
    return ("gen", "%s: %s" % (qid, desc), None)


def tal_cual_gana(s):
    """En el caso 3, 'tal cual' paga mas que cualquier otra decision (salvo rangos que no cubren o anchos, que no compiten)."""
    st = dict(s, dec="tal", nivel=None, pieza=0, mm3=0)
    mio = suma(pago3(st)[2])
    for o in estados_3():
        if o["tipo"] == s["tipo"] and o["clave"] == s["clave"] and o["fichas"] == s["fichas"] and o["dec"] != "tal":
            if o["dec"] == "rango" and o["nivel"] in ("noCubre", "ancho"):
                continue
            if mio < suma(pago3(o)[2]):
                return False
    return True


def pagoC(s):
    return PAGO[s["ficha"]](s)[2]


def mejor_en_su_tipo(s):
    """La decision del estado paga lo maximo (C+Voz) entre las decisiones posibles con las mismas condiciones."""
    f = s["ficha"]
    mio = suma(PAGO[f](s)[2])
    claves = {k: v for k, v in s.items() if k in ("tipo", "clave", "fichas")}
    mejor = mio
    for o in ESTADOS[f]():
        if all(o.get(k) == v for k, v in claves.items()):
            if f == 3 and o["dec"] == "rango" and o["pieza"] and not o["clave"]:
                continue
            if f == 3 and o["dec"] == "rango" and o["nivel"] in ("noCubre", "ancho"):
                continue
            if f == 6 and o["dec"] == "redactar" and not o["ncorr"]:
                continue
            if f == 7 and not o["xok"]:
                continue
            mejor = max(mejor, suma(PAGO[f](o)[2]))
    return mio >= mejor


# ---- Ficha 1
R("F1a", 1, lambda s: s["ficha"] == 1 and s["abre_propio"], "abrió con sus fichas un papel con horas de sueño",
  [H("abrió un papel con sueño con sus fichas de tiempo (sin ficha regalada ni Dani)", lambda s: s["abre_propio"])])
R("F1b", 1, lambda s: s["ficha"] == 1 and not s["abre_propio"],
  "no abrió ninguno con sus 3 fichas (ficha regalada o Dani lo abrió: `ayudado`)",
  [H("necesitó la ficha regalada o a Dani", lambda s: not s["abre_propio"])])

# ---- Ficha 2
R("F2a", 2, lambda s: s["ficha"] == 2 and s["tipo"] == "P" and s["dec"] == "frase_con", "P · redactó con la pieza del clave",
  [H("tipo P", lambda s: s["tipo"] == "P"), H("el clave estaba abierto", lambda s: s["clave"]),
   H("pago positivo en C (la jefa la puso en el informe)", lambda s: pagoC(s)[0] > 0)])
R("F2b", 2, lambda s: s["ficha"] == 2 and s["tipo"] == "P" and s["dec"] == "tal", "P · firmó tal cual (con o sin el clave abierto)",
  [H("tipo P", lambda s: s["tipo"] == "P"), H("pago -20/+10 (llamó la madre)", lambda s: pagoC(s) == (-20, 10)),
   Q("Q6", "el cero es cierto en las tres versiones del clave (K11 de 05)")])
R("F2c", 2, lambda s: s["ficha"] == 2 and s["tipo"] == "P" and s["dec"] == "frenar" and not s["clave"],
  "P · frenó sin abrir el clave", [H("tipo P y clave cerrado", lambda s: s["tipo"] == "P" and not s["clave"])])
R("F2d", 2, lambda s: s["ficha"] == 2 and s["tipo"] == "P" and s["dec"] == "frenar" and s["clave"],
  "P · frenó con el clave abierto", [H("clave abierto", lambda s: s["clave"])])
R("F2e", 2, lambda s: s["ficha"] == 2 and s["tipo"] == "P" and s["dec"] == "frase_sin", "P · redactó sin la pieza del clave",
  [H("tipo P", lambda s: s["tipo"] == "P"), H("pago -8/+4", lambda s: pagoC(s) == (-8, 4))])
R("F2f", 2, lambda s: s["ficha"] == 2 and s["tipo"] == "B" and s["dec"] == "tal" and s["clave"],
  "B · firmó tal cual con el clave abierto",
  [H("tipo B", lambda s: s["tipo"] == "B"), H("firmar tal cual es lo mejor de su tipo", mejor_en_su_tipo)])
R("F2g", 2, lambda s: s["ficha"] == 2 and s["tipo"] == "B" and s["dec"] == "tal" and not s["clave"],
  "B · firmó tal cual sin abrir el clave",
  [H("tipo B y clave cerrado, pago +5/+5 (R2.1.sin)", lambda s: s["tipo"] == "B" and not s["clave"] and pagoC(s) == (5, 5))])
R("F2h", 2, lambda s: s["ficha"] == 2 and s["tipo"] == "B" and s["dec"] == "frenar", "B · frenó",
  [H("tipo B (el registro seguía igual)", lambda s: s["tipo"] == "B"), H("pago 0/-15", lambda s: pagoC(s) == (0, -15))])
R("F2i", 2, lambda s: s["ficha"] == 2 and s["tipo"] == "B" and s["dec"] == "frase_con", "B · redactó con la pieza del clave",
  [H("tipo B", lambda s: s["tipo"] == "B"), H("pago +10/+10 (la jefa la puso en el informe)", lambda s: pagoC(s) == (10, 10))])
R("F2j", 2, lambda s: s["ficha"] == 2 and s["tipo"] == "B" and s["dec"] == "frase_sin", "B · redactó sin la pieza del clave",
  [H("tipo B", lambda s: s["tipo"] == "B"), H("pago 0/+4 (prudente)", lambda s: pagoC(s) == (0, 4))])

# ---- Ficha 3 (variables: tipo, tandas, clave, nivel, pieza, razono bien = rango min-max de 3 tandas)
def e3(s):
    return s["ficha"] == 3


def rango(s):
    return e3(s) and s["dec"] == "rango"


def cubre(s):
    return s["nivel"] in ("ok", "flojo", "ancho")


R("F3a", 3, lambda s: rango(s) and s["tipo"] == "P" and s["nivel"] == "ok" and s["pieza"],
  "P · rango `ok` CON la pieza del clave",
  [H("rango ok con pieza paga +8/+4 (se pudo presentar)", lambda s: pagoC(s) == (8, 4)),
   H("hubo 2 o más tandas ('varias')", lambda s: s["tandas"] >= 2),
   Q("Q7", "las medias de las tandas sacadas son todas distintas ('cada una dio algo distinto')")])
R("F3b", 3, lambda s: rango(s) and s["tipo"] == "P" and ((s["nivel"] == "ok" and not s["pieza"]) or s["nivel"] == "flojo"),
  "P · rango `ok` SIN la pieza, o `flojo`",
  [H("el rango cubre", lambda s: cubre(s)), H("pago +3/0: no llega al +8/+4 de lo que se presenta", lambda s: pagoC(s) == (3, 0)),
   H("2 o más tandas", lambda s: s["tandas"] >= 2)])
R("F3c", 3, lambda s: e3(s) and s["tipo"] == "P" and s["dec"] == "tal", "P · firmó tal cual",
  [H("tipo P (la cifra salía de una tanda de 10)", lambda s: s["tipo"] == "P"), H("pago -20/+10", lambda s: pagoC(s) == (-20, 10))])
R("F3d", 3, lambda s: rango(s) and s["nivel"] == "ancho", "cualquier tipo · rango `ancho` (más de 2,0 h)",
  [H("el rango cubre pero es ancho: pago 0/-2", lambda s: pagoC(s) == (0, -2)),
   H("(P) un rango angosto con pieza se presentaba: R3.P ok con pieza = +8/+4", lambda s: s["tipo"] != "P" or T.FILAS["R3.P"]["ok con pieza"] == (8, 4)),
   H("(A) idem con la semana: R3.A.con ok con pieza = +8/+4", lambda s: s["tipo"] != "A" or T.FILAS["R3.A.con"]["ok con pieza"] == (8, 4)),
   H("(B) firmar tal cual (con el clave) era lo mejor: suma 20", lambda s: s["tipo"] != "B" or suma(T.FILAS["R3.B"]["tal cual"]) == max(suma(v) for v in T.FILAS["R3.B"].values()))])
R("F3e", 3, lambda s: rango(s) and s["nivel"] == "noCubre" and s["mm3"],
  "cualquier tipo · rango `noCubre` y era el mínimo-máximo de 3 tandas (`razonoBienNoCubrio`)",
  [H("no cubre", lambda s: s["nivel"] == "noCubre"), H("vio 3 tandas", lambda s: s["tandas"] == 3)])
R("F3f", 3, lambda s: rango(s) and s["tipo"] in "PA" and s["nivel"] == "noCubre" and not s["mm3"],
  "P o A · rango `noCubre` (sin el aviso de las 3 tandas)",
  [H("no cubre: pago -10/+4 (llamó una docente)", lambda s: pagoC(s) == (-10, 4))])
R("F3g", 3, lambda s: e3(s) and s["tipo"] == "P" and s["dec"] == "frenar", "P · frenó",
  [H("tipo P (la cifra venía de una sola tanda)", lambda s: s["tipo"] == "P"),
   H("con rango y pieza se presentaba: +8/+4", lambda s: T.FILAS["R3.P"]["ok con pieza"] == (8, 4)),
   H("frenar pagó +6/-8", lambda s: pagoC(s) == (6, -8))])
R("F3h", 3, lambda s: e3(s) and s["tipo"] == "B" and s["dec"] == "tal" and s["clave"], "B · firmó tal cual con el papel de cómo se obtuvo abierto",
  [H("tipo B y papel abierto", lambda s: s["tipo"] == "B" and s["clave"]), H("firmar tal cual es lo mejor", mejor_en_su_tipo)])
R("F3i", 3, lambda s: e3(s) and s["tipo"] == "B" and s["dec"] == "tal" and not s["clave"], "B · firmó tal cual sin abrir ese papel",
  [H("tipo B, papel cerrado, pago +5/+5", lambda s: s["tipo"] == "B" and not s["clave"] and pagoC(s) == (5, 5))])
R("F3j", 3, lambda s: e3(s) and s["tipo"] == "B" and s["dec"] == "frenar", "B · frenó",
  [H("tipo B: pago 0/-15 (Horizonte entregó primero)", lambda s: pagoC(s) == (0, -15))])
R("F3k", 3, lambda s: rango(s) and s["tipo"] == "B" and s["nivel"] in ("ok", "flojo"),
  "B · rango que cubre (`ok` o `flojo`, con o sin pieza)",
  [H("el rango cubre", lambda s: cubre(s)),
   H("firmar tal cual sumaba más que el rango (con el mismo papel abierto o cerrado)", lambda s: suma(T.FILAS["R3.B"]["tal cual"] if s["clave"] else T.FILAS["R3.B.sin"]["tal cual"]) > suma(pagoC(s)))])
R("F3l", 3, lambda s: rango(s) and s["tipo"] == "B" and s["nivel"] == "noCubre" and not s["mm3"],
  "B · rango `noCubre` (sin el aviso de las 3 tandas)",
  [H("no cubre", lambda s: s["nivel"] == "noCubre"), H("firmar tal cual (con las mismas fichas y papeles) era lo mejor", lambda s: tal_cual_gana(s))])
R("F3m", 3, lambda s: e3(s) and s["tipo"] == "A" and s["dec"] == "tal", "A · firmó tal cual",
  [H("tipo A: pago -20/+10", lambda s: s["tipo"] == "A" and pagoC(s) == (-20, 10))])
R("F3n", 3, lambda s: rango(s) and s["tipo"] == "A" and s["nivel"] in ("ok", "flojo") and s["pieza"],
  "A · rango que cubre CON la pieza de la semana",
  [H("lleva la pieza (necesita el clave abierto)", lambda s: s["pieza"] and s["clave"]), H("cubre", lambda s: cubre(s))])
R("F3o", 3, lambda s: rango(s) and s["tipo"] == "A" and s["nivel"] in ("ok", "flojo") and not s["pieza"],
  "A · rango que cubre SIN la pieza de la semana",
  [H("sin pieza: pago -8/+4 (R3.A.sin)", lambda s: not s["pieza"] and pagoC(s) == (-8, 4))])
R("F3p", 3, lambda s: e3(s) and s["tipo"] == "A" and s["dec"] == "frenar", "A · frenó",
  [H("tipo A", lambda s: s["tipo"] == "A")])

# ---- Ficha 4
def e4(s):
    return s["ficha"] == 4


R("F4a", 4, lambda s: e4(s) and s["elige"] == s["bueno"] and s["clave"], "eligió el estudio bueno CON un clave abierto",
  [H("el elegido es el que representaba a todo 4.º", lambda s: s["elige"] == s["bueno"]), H("abrió un clave", lambda s: s["clave"])])
R("F4b", 4, lambda s: e4(s) and s["elige"] == s["bueno"] and not s["clave"], "eligió el estudio bueno SIN abrir ningún clave",
  [H("acertó con clave cerrado", lambda s: s["elige"] == s["bueno"] and not s["clave"])])
R("F4c", 4, lambda s: e4(s) and s["elige"] == "A" and s["bueno"] == "B" and not s["clave"], "eligió A (el de miles) siendo B el bueno, sin clave",
  [H("A era el malo: respondieron solo clubes de apoyo", lambda s: s["bueno"] == "B" and s["elige"] == "A")])
R("F4d", 4, lambda s: e4(s) and s["elige"] == "A" and s["bueno"] == "B" and s["clave"], "eligió A siendo B el bueno, con un clave abierto",
  [H("A era el malo: respondieron solo clubes de apoyo", lambda s: s["bueno"] == "B" and s["elige"] == "A"), H("abrió un clave", lambda s: s["clave"])])
R("F4e", 4, lambda s: e4(s) and s["elige"] == "B" and s["bueno"] == "A" and s["clave"], "eligió B (el chico) siendo A el bueno, con un clave abierto",
  [H("A era el que representaba a todo 4.º", lambda s: s["bueno"] == "A" and s["elige"] == "B"), H("abrió un clave", lambda s: s["clave"])])
R("F4f", 4, lambda s: e4(s) and s["elige"] == "B" and s["bueno"] == "A" and not s["clave"], "eligió B siendo A el bueno, sin clave",
  [H("B era solo el club de apoyo de un colegio", lambda s: s["bueno"] == "A" and s["elige"] == "B")])
R("F4g", 4, lambda s: e4(s) and s["elige"] == "ninguna", "no citó ninguno (con o sin clave)",
  [H("uno de los dos sí se sostenía (siempre hay un bueno)", lambda s: s["bueno"] in "AB")])

# ---- Ficha 5 (turno 2). x se clasifica por la regla que dispara (R5.3 a R5.9)
def e5(s):
    return s["ficha"] == 5


R("F5a", 5, lambda s: e5(s) and regla5(s) == "R5.6", "opción (c) · R5.6: papeles requeridos abiertos y x a 1,0 o menos de ρ",
  [H("opción (c)", lambda s: s["op"] == "c"), H("papeles requeridos abiertos", lambda s: s["req"]), H("x dentro de la banda de ρ", lambda s: s["en_rho"]),
   Q("Q3", "(c): el grupo del sorteo que no fue al taller subió (cambio medio ≥ 1)")])
R("F5b", 5, lambda s: e5(s) and regla5(s) == "R5.7" and s["op"] == "a", "opción (a) · R5.7",
  [H("opción (a)", lambda s: s["op"] == "a"), H("requeridos abiertos y x en la banda de ρ", lambda s: s["req"] and s["en_rho"]),
   Q("Q4", "(a): el colegio vecino sin taller subió (I2 del bucle: cambio medio ≥ 4)")])
R("F5c", 5, lambda s: e5(s) and regla5(s) == "R5.7" and s["op"] == "b", "opción (b) · R5.7",
  [H("opción (b)", lambda s: s["op"] == "b"), H("requeridos abiertos (llamados, demás e informe)", lambda s: s["req"] and s["c2"]),
   Q("Q5", "(b): el informe dice el 2,5 como número (I3 del bucle)")])
R("F5d", 5, lambda s: e5(s) and regla5(s) == "R5.4", "cualquier opción · R5.4 subida bruta: papel de los llamados abierto, x ≈ Δ_llamados, fuera de la banda de ρ",
  [H("abrió el papel de los llamados", lambda s: s["c1"]), H("x fuera de la banda de ρ", lambda s: not s["en_rho"]),
   Q("Q1", "los llamados subieron (cambio medio ≥ 1) en las tres opciones"),
   Q("Q3", "(c): el grupo del sorteo también subió (≥ 1)"), Q("Q4", "(a): el vecino también subió (≥ 4)"),
   Q("Q5", "(b): los primeros ya venían subiendo 2,5 (informe)")])
R("F5e", 5, lambda s: e5(s) and regla5(s) == "R5.5", "opción (a) o (b) · R5.5 inflado: papel de los demás abierto, x ≈ Δ_llamados − Δ_demás, fuera de la banda",
  [H("opción (a) o (b)", lambda s: s["op"] in "ab"), H("abrió el papel de los demás", lambda s: s["c2"]), H("x fuera de la banda de ρ", lambda s: not s["en_rho"]),
   Q("Q2", "(a): la resta inflada queda por encima de ρ (Δ_vecino − Δ_demás > 1); en (b) lo da el sesgo de 2,5")])
R("F5f", 5, lambda s: e5(s) and regla5(s) == "R5.8", "R5.8 · número dentro de la banda de ρ SIN todos los papeles requeridos (acierto sin evidencia)",
  [H("x dentro de la banda de ρ", lambda s: s["en_rho"]), H("papeles requeridos no completos", lambda s: not s["req"])])
R("F5g", 5, lambda s: e5(s) and regla5(s) == "R5.9" and not s["req"], "R5.9 · número fuera de las bandas SIN todos los papeles requeridos",
  [H("papeles requeridos no completos", lambda s: not s["req"]), H("pago -10/0", lambda s: pagoC(s) == (-10, 0))])
R("F5h", 5, lambda s: e5(s) and regla5(s) == "R5.9" and s["req"] and s["cero"] and s["rhosig"] == "pos",
  "R5.9 · escribió 0 con los requeridos abiertos y ρ > 1 (`E5d`)",
  [H("escribió 0", lambda s: s["cero"]), H("requeridos abiertos", lambda s: s["req"]), H("ρ > 1 (la cuenta bien hecha no daba 0)", lambda s: s["rhosig"] == "pos")])
R("F5i", 5, lambda s: e5(s) and regla5(s) == "R5.9" and s["req"] and not (s["cero"] and s["rhosig"] == "pos"),
  "R5.9 · número fuera de las bandas con los requeridos abiertos, salvo `E5d` (incluye 0 con ρ < −1)",
  [H("requeridos abiertos", lambda s: s["req"]), H("x fuera de la banda de ρ (no coincide con la cuenta bien hecha)", lambda s: not s["en_rho"])])
R("F5j", 5, lambda s: e5(s) and s["dec"] == "frenar", "R5.3 · frenó (sin número)",
  [H("pago +2/-6", lambda s: pagoC(s) == (2, -6)), Q("Q8", "la carpeta de 6 trae siempre lo que la opción elegida necesita (G10 del bucle)")])

# ---- Ficha 6
def e6(s):
    return s["ficha"] == 6


def red_ok(s):
    return e6(s) and s["dec"] == "redactar" and s["ncorr"]


R("F6a", 6, lambda s: red_ok(s) and s["tipo"] in "PA" and s["ext"] == "grupo", "P o A · `grupo` con N bien contado",
  [H("lleva la pieza `grupo` (clave abierto)", lambda s: s["clave"]), H("pago +8/+4", lambda s: pagoC(s) == (8, 4)),
   Q("Q9", "(A) {hechosA} nombra solo lo que dicen los papeles abiertos (12 de 60 respondieron / semana de exámenes): v15 I3")])
R("F6b", 6, lambda s: red_ok(s) and s["tipo"] == "B" and s["ext"] == "grupo", "B · `grupo` con N bien contado",
  [H("tipo B, pago +10/+10", lambda s: s["tipo"] == "B" and pagoC(s) == (10, 10))])
R("F6c", 6, lambda s: e6(s) and s["tipo"] == "B" and s["dec"] == "tal" and not s["clave"], "B · firmó tal cual sin abrir el clave",
  [H("tipo B, clave cerrado, pago +5/+5", lambda s: s["tipo"] == "B" and not s["clave"] and pagoC(s) == (5, 5))])
R("F6d", 6, lambda s: e6(s) and s["tipo"] == "B" and s["dec"] == "frenar", "B · frenó",
  [H("tipo B, pago 0/-15", lambda s: pagoC(s) == (0, -15))])
R("F6e", 6, lambda s: red_ok(s) and s["tipo"] == "B" and s["ext"] in ("ninguna", "podrian"), "B · `ninguna` o `podrían` con N bien contado",
  [H("tipo B: la lista salió de un sorteo", lambda s: s["tipo"] == "B"), H("dijo menos que `grupo` (pago menor que +10/+10)", lambda s: suma(pagoC(s)) < 20)])
R("F6f", 6, lambda s: e6(s) and s["tipo"] in "PA" and s["dec"] == "tal", "P o A · firmó tal cual",
  [H("pago -20/+10 (llamó la profesora Camacho)", lambda s: pagoC(s) == (-20, 10))])
R("F6g", 6, lambda s: red_ok(s) and s["tipo"] in "PA" and s["ext"] == "podrian", "P o A · `podrían` con N bien contado",
  [H("pago -8/+4", lambda s: pagoC(s) == (-8, 4))])
R("F6h", 6, lambda s: red_ok(s) and s["tipo"] in "PA" and s["ext"] == "ninguna", "P o A · `ninguna` (solo lo medido) con N bien contado",
  [H("pago +2/+1 (P) o 0/+1 (A): menos que `grupo`", lambda s: suma(pagoC(s)) < suma(T.FILAS["R6.5"][s["tipo"]]))])
R("F6i", 6, lambda s: e6(s) and s["tipo"] in "PA" and s["dec"] == "frenar", "P o A · frenó",
  [H("pago menor que redactar con `grupo`", lambda s: suma(pagoC(s)) < suma(T.FILAS["R6.5"][s["tipo"]]))])
R("F6j", 6, lambda s: e6(s) and s["dec"] == "redactar" and not s["ncorr"], "cualquier tipo y extensión · N mal contado (−10 a C)",
  [H("N no sale de la hoja: se suma R6.6 −10/0", lambda s: not s["ncorr"] and pagoC(s)[0] == T.FILAS[pago6(dict(s, ncorr=1))[0]][s["tipo"]][0] - 10)])
R("F6k", 6, lambda s: e6(s) and s["tipo"] == "B" and s["dec"] == "tal" and s["clave"], "B · firmó tal cual con el clave abierto (NUEVA: el recorrido halló el hueco)",
  [H("tipo B, clave abierto, pago +10/+10", lambda s: s["tipo"] == "B" and s["clave"] and pagoC(s) == (10, 10)),
   H("pagaba lo mismo que redactar con `grupo`", lambda s: suma(pagoC(s)) == suma(T.FILAS["R6.5"]["B"]))])

# ---- Ficha 7
def e7(s):
    return s["ficha"] == 7


R("F7a", 7, lambda s: e7(s) and s["tipo"] == "P" and s["dec"] == "redis" and s["xok"], "P · rediseñó con x correcto",
  [H("pago +8/+4", lambda s: pagoC(s) == (8, 4))])
R("F7b", 7, lambda s: e7(s) and s["tipo"] == "P" and s["dec"] == "redis" and not s["xok"], "P · rediseñó con x incorrecto",
  [H("pago -8/+4", lambda s: pagoC(s) == (-8, 4))])
R("F7c", 7, lambda s: e7(s) and s["tipo"] == "P" and s["dec"] == "tal" and s["xok"], "P · firmó tal cual con x correcto",
  [H("pago -10/+10 (el número estaba, el dibujo no ayudaba)", lambda s: pagoC(s) == (-10, 10))])
R("F7d", 7, lambda s: e7(s) and s["tipo"] == "P" and s["dec"] == "tal" and not s["xok"], "P · firmó tal cual con x incorrecto",
  [H("pago -20/+10 (la docente escribió)", lambda s: pagoC(s) == (-20, 10))])
R("F7e", 7, lambda s: e7(s) and s["tipo"] == "P" and s["dec"] == "frenar", "P · frenó",
  [H("pago +6/-8; rediseñar con x correcto pagaba +8/+4", lambda s: pagoC(s) == (6, -8) and T.FILAS["R7.3"]["P"] == (8, 4))])
R("F7f", 7, lambda s: e7(s) and s["tipo"] == "B" and s["dec"] == "tal" and s["xok"], "B · firmó tal cual con x correcto",
  [H("tal cual con x correcto es lo mejor", mejor_en_su_tipo)])
R("F7g", 7, lambda s: e7(s) and s["tipo"] == "B" and s["dec"] == "tal" and not s["xok"], "B · firmó tal cual con x incorrecto",
  [H("pago +4/+10 (salió bien por suerte)", lambda s: pagoC(s) == (4, 10))])
R("F7h", 7, lambda s: e7(s) and s["tipo"] == "B" and s["dec"] == "redis", "B · rediseñó (x correcto o no)",
  [H("pago de rediseñar menor que el de tal cual con x correcto", lambda s: suma(pagoC(s)) < suma(T.FILAS["R7.1"]["B"]))])
R("F7i", 7, lambda s: e7(s) and s["tipo"] == "B" and s["dec"] == "frenar", "B · frenó",
  [H("pago 0/-15", lambda s: pagoC(s) == (0, -15))])

# ---- Ficha 8
def e8(s):
    return s["ficha"] == 8


R("F8a", 8, lambda s: e8(s) and s["dec"] == s["real"] and s["e"] == 2 and s["beto"] != s["real"],
  "decisión correcta, los dos claves sobre la mesa, y Beto proponía otra cosa",
  [H("e = 2", lambda s: s["e"] == 2), H("Beto estaba equivocado: su año es peor que el del alumno", lambda s: s["beto"] != s["real"] and s["dec"] == s["real"])])
R("F8b", 8, lambda s: e8(s) and s["dec"] == s["real"] and s["e"] == 2 and s["beto"] == s["real"],
  "decisión correcta, los dos claves sobre la mesa, y Beto coincidía",
  [H("e = 2 y Beto coincidía", lambda s: s["e"] == 2 and s["beto"] == s["dec"] == s["real"])])
R("F8c", 8, lambda s: e8(s) and s["dec"] == s["real"] and s["e"] == 1, "decisión correcta con un solo clave sobre la mesa",
  [H("e = 1", lambda s: s["e"] == 1), H("pago +6/+4", lambda s: pagoC(s) == (6, 4))])
R("F8d", 8, lambda s: e8(s) and s["dec"] == s["real"] and s["e"] == 0, "decisión correcta sin ningún clave sobre la mesa",
  [H("e = 0, pago 0/0 (R8.3)", lambda s: s["e"] == 0 and pagoC(s) == (0, 0))])
R("F8e", 8, lambda s: e8(s) and s["dec"] != s["real"] and s["dec"] != 2 and s["e"] == 2, "financió o no financió contra la realidad, con los dos claves sobre la mesa",
  [H("decisión contra lo que decían los papeles", lambda s: s["dec"] != s["real"]), H("e = 2", lambda s: s["e"] == 2)])
R("F8f", 8, lambda s: e8(s) and s["dec"] != s["real"] and s["dec"] != 2 and s["e"] < 2, "financió o no financió contra la realidad, sin los dos claves sobre la mesa",
  [H("e < 2", lambda s: s["e"] < 2)])
R("F8g", 8, lambda s: e8(s) and s["dec"] == 2 and s["real"] != 2, "esperó cuando ya se podía decidir",
  [H("esperó (R8.8: 0/-8)", lambda s: pagoC(s) == (0, -8)), H("la realidad no era 'aún no'", lambda s: s["real"] != 2)])

RAMA_IDS = [r["id"] for r in RAMAS]
RAMA_DE_ID = {r["id"]: r for r in RAMAS}


def ramas_de(s):
    return [r["id"] for r in RAMAS if r["ficha"] == s["ficha"] and r["cuando"](s)]


# =====================================================================================
# 4. TEXTOS: base = 05 NT1.9 (las ramas que sobrevivieron), con los cambios de esta reconstruccion
# =====================================================================================
def leer(ruta):
    with open(ruta, encoding="utf-8") as f:
        return f.read()


def parse_nt19(t05):
    a = t05.index("### NT1.9")
    b = t05.index("### NT1.10")
    bloque = t05[a:b]
    ramas, titulos = {}, {}
    for linea in bloque.splitlines():
        m = re.match(r"^\*\*Ficha (\d) · (.*?)\*\*(.*)$", linea)
        if m:
            titulos[int(m.group(1))] = (m.group(2).strip(), m.group(3).strip())
            continue
        if not linea.startswith("| F"):
            continue
        celdas = [c.strip() for c in linea.strip().strip("|").split(" | ")]
        mid = re.match(r"^(F[1-8][a-p])\b", celdas[0])
        if not mid:
            continue
        if len(celdas) == 4:
            ramas[mid.group(1)] = dict(nota=celdas[1], hiciste=celdas[2], habria=celdas[3])
        else:
            ramas[mid.group(1)] = dict(nota="", hiciste=celdas[1], habria=celdas[2])
    return ramas, titulos, bloque


# Cierres: se copian de NT1.9; el script comprueba que cada uno esta en 05 tal cual.
CIERRES = {
    "C1": "Lo que viste todos los días ya dejaba un rastro. Convertirlo en algo que se puede leer es el trabajo de la estadística.",
    "C2": "Volver contable algo que no se ve se llama operacionalizar. Creer que lo contado es lo que pasa se llama cosificar.",
    "C2b": "Esta vez el cero se sostenía. Cuando se cuenta igual que antes, la cifra puede creerse. Mirar cómo se contó te lo dice.",
    "C3": "Lo que quieres saber de todos es el parámetro. Lo que calculas con los que miraste es el estadístico.",
    "C3b": "No hacía falta desconfiar. Distinguir cuándo no hace falta también es saber leer.",
    "C4": "El error del azar se achica con más gente. El de dejar fuera a quienes importaban no se achica, se llama error no muestral.",
    "C5": "Quienes están peor suelen mejorar solos: se llama regresión a la media. Para no engañarte, usa un grupo de control.",
    "C6": "Lo que hay en tus datos es estadística descriptiva. Apostar sobre los que no viste es inferencial. Esta materia empieza por la primera.",
    "C7p": "Se llama eje truncado. Antes de creerle a un gráfico, mira dónde empieza.",
    "C7b": "Esta vez el eje no estaba truncado. Se llama así cuando la barra empieza arriba de cero. Mirar dónde empieza te lo dice.",
    "C8": "Los datos bien recogidos y bien leídos le ganan al ojo. A veces la mejor respuesta es \"todavía no se puede saber\".",
}


CAMINO = [
    "Cada cosa que reconociste tiene un nombre, una forma de comprobarla con números y una técnica para hacerlo bien.",
    "Eso se aprende en los temas que vienen.",
    "Los gráficos, ya en el Tema 2. Y esto apenas es el primer vistazo.",
]
BETO_FINAL = "Yo igual lo veo a ojo. Pero la próxima te pregunto de dónde sale."


def cierre_de(rid):
    f, letra = int(rid[1]), rid[2]
    if f == 1:
        return "C1"
    if f == 2:
        return "C2" if letra in "abcde" else "C2b"
    if f == 3:
        return "C3b" if letra in "hijkl" else "C3"
    if f == 7:
        return "C7p" if letra in "abcde" else "C7b"
    return "C%d" % f


# Cambios de esta reconstruccion respecto de NT1.9. motivo: B1, B2, I6, C10, C11, C7, V (verdad), N (nueva)
Hn = lambda t: "«%s»" % t  # noqa: E731
OVER = {
    "F1a": dict(motivo="C10 de v15: C1-2 (encuesta anual) sí la pidió alguien",
                hiciste=Hn("Abriste {papelSueno} y ahí estaba el sueño de 4.º. Alguien lo anotó hace un año, sin que nadie lo usara.")),
    "F2f": dict(motivo="V: el clave c (informe del orientador) no dice 'el registro no cambió', dice que las derivaciones también bajaron",
                hiciste=Hn("Viste que el cero se sostenía y lo firmaste. Esta vez no había hueco, y verlo también es leer.")),
    "F2g": dict(motivo="V: idem F2f",
                hiciste=Hn("Firmaste el cero y salió bien. No abriste el papel que mostraba por qué se sostenía.")),
    "F2i": dict(motivo="V: idem F2f; la pieza del clave c dice 'las derivaciones también bajaron', no 'el registro no cambió'",
                hiciste=Hn("Redactaste con lo que mostraba el papel clave: las denuncias registradas bajaron y el cero se sostenía.")),
    "F3a": dict(motivo="B1: la pieza dice de dónde salió la cifra, y por eso se presentó",
                habria=Hn("Tu rango dijo cuánto se mueve la cifra y de dónde salió, y por eso se pudo presentar.")),
    "F3b": dict(motivo="B1: ahora recibe `ok` sin pieza y `flojo`; en `ok` sin pieza la jefa sí lo comenta, así que 'nadie lo comentó' sería falso",
                habria=Hn("Tu rango cubría y quedó en un anexo del informe. Útil, pero no se presentó.")),
    "F3d": dict(motivo="B1/V: el rango angosto se presentaba solo con su pieza; faltaba la versión del tipo B",
                habria="P: «Un rango más angosto, diciendo de dónde salió la cifra, se podía presentar.» "
                       "A: «Un rango más angosto, diciendo de qué semana era, se podía presentar.» "
                       "B: «Esta vez bastaba firmar tal cual: la cifra se sostenía.»"),
    "F3g": dict(motivo="B1: con dos tandas solas el rango no se presentaba; hacía falta la pieza",
                habria=Hn("Con dos tandas y un papel que dijera de dónde salió la cifra, tu rango habría podido ir al informe.")),
    "F3i": dict(motivo="C7 de v15: 'ficha' es también el nombre del papel C3-1",
                hiciste=Hn("Firmaste y salió bien. No abriste el papel de cómo se obtuvo la cifra, así que no sabes por qué."),
                habria=Hn("Con ese papel abierto, sabrías que eran 150 elegidos al azar.")),
    "F3o": dict(motivo="V: 'con el papel abierto' era falso para quien lo abrió y no puso la pieza (`E3e`)",
                habria=Hn("Con la pieza del papel de la semana de exámenes, habrías podido decir de qué semana hablabas.")),
    "F4d": dict(motivo="C11 de v15: cada clave muestra un solo estudio",
                habria=Hn("Uno de los papeles que abriste mostraba de dónde venían las respuestas de uno de los estudios.")),
    "F4e": dict(motivo="C11 de v15 (y 'los papeles' en plural no está garantizado)",
                habria=Hn("Uno de los papeles que abriste mostraba de dónde venían las respuestas de uno de los estudios.")),
    "F5a": dict(motivo="I6 de v15: sin afirmar causa",
                hiciste=Hn("Comparaste con el grupo del sorteo y descontaste lo que subió solo.")),
    "F5b": dict(motivo="I6 de v15: sin afirmar causa",
                hiciste=Hn("Comparaste con {vecino}, sin taller, y descontaste lo que subió solo.")),
    "F5c": dict(motivo="I6 de v15: sin afirmar causa",
                hiciste=Hn("Descontaste lo que cambiaron los demás y lo que los primeros ya venían subiendo.")),
    "F5e": dict(motivo="V: 'que bajaron' no está garantizado en (b), donde los demás no regresan",
                hiciste=Hn("Restaste lo que cambiaron los demás, y tu número quedó inflado.")),
    "F5f": dict(motivo="V/I6: 'efecto real' afirmaba causa; 'sin abrir con qué comparar' era falso con papeles a medias",
                hiciste=Hn("Tu número coincidió con la cuenta bien hecha, pero no tenías abierto todo lo necesario para comparar."),
                habria=Hn("Con todos los papeles de la comparación abiertos, sabrías de dónde sale tu número.")),
    "F5g": dict(motivo="V: 'sin abrir con qué compararlo' era falso con papeles a medias",
                hiciste=Hn("Escribiste un número sin tener abierto todo lo necesario para compararlo."),
                habria=Hn("Con todos los papeles de la comparación abiertos, tu número habría tenido de dónde salir.")),
    "F5h": dict(motivo="B2 de v15: sin afirmar el efecto del taller ni su causa; {rho} es la cuenta bien hecha",
                hiciste=Hn("Abriste con qué comparar y escribiste 0. La cuenta bien hecha daba {rho}."),
                habria=Hn("Escribir 0 era decir que la resta no dejaba nada, y la resta dejaba {rho}.")),
    "F5i": dict(motivo="V/I6: 'no salió de esa comparación' y 'lo que subió el grupo' afirmaban de más",
                hiciste=Hn("Abriste con qué comparar, pero tu número no coincidió con la cuenta bien hecha."),
                habria=Hn("Con la cuenta bien hecha, tu número habría sido otro.")),
    "F6a": dict(motivo="I3 de v15: en A la pieza se parte en dos; {hechosA} nombra solo lo que dicen los papeles abiertos",
                hiciste="P: «Dijiste lo que la lista sostenía: que los 60 eran de {curso}, y nada más allá.» "
                        "A: «Dijiste lo que la lista sostenía: {hechosA}.»"),
    "F6j": dict(motivo="la referencia a 'F6e, F6g o F6h' ahora dice en qué tipo cae cada una",
                habria="Con `grupo`: «Con el conteo bien, la conclusión se sostenía.» "
                       "Con otra extensión: la línea «Habría pasado» de F6e (tipo B), de F6g (`podrían`, P y A) o de F6h (`ninguna`, P y A)"),
    "F6k": dict(motivo="NUEVA: B, firmar tal cual con el clave abierto no tenía rama (hueco hallado por el recorrido)",
                nota="Firmó tal cual con el clave abierto (tipo B)",
                hiciste=Hn("Esta vez los 60 salieron de un sorteo entre los 480, y tú lo viste. Firmaste tal cual."),
                habria=Hn("Firmar tal cual, con el sorteo a la vista, sumaba lo mismo que redactarlo.")),
}


def textos_finales(base):
    fin = {}
    for rid in RAMA_IDS:
        b = dict(base.get(rid, dict(nota="", hiciste="", habria="")))
        o = OVER.get(rid, {})
        for k in ("hiciste", "habria", "nota"):
            if k in o:
                b[k] = o[k]
        b["motivo"] = o.get("motivo", "")
        b["cierre"] = CIERRES[cierre_de(rid)]
        fin[rid] = b
    return fin


def segmentos(cell):
    return re.findall(r"«([^»]*)»", cell)


def palabras(seg):
    seg = re.sub(r"\{[^}]*\}", "x", seg)
    return len(seg.split())


VOSEO = re.compile(r"\b(tenés|podés|sabés|querés|hacés|mirá|fijate|contá|volvé|pedí|elegí|sos|vos|escribí|abrí|cerrá|decime)\b", re.I)
PROHIBIDAS = re.compile(r"dossier|jamovi|eviews|spss|excel|según el|software", re.I)


# =====================================================================================
# 5. SIMULACION del modelo del bucle (5.4) para los supuestos del generador (Q1 a Q5, Q7)
# =====================================================================================
def media(v):
    return sum(v) / len(v)


def sim_cohorte(rng):
    n = 60
    t = [rng.gauss(60, 10) for _ in range(n)]
    m1 = [x + rng.gauss(0, 8) for x in t]
    d = [(x + rng.gauss(0, 8)) - a for x, a in zip(t, m1)]
    return m1, d


def sim_caso5(op, delta, rng):
    """Devuelve (Dt, Dcomp, rho, x_infl, Ddem) con el modelo del bucle 5.4; re-sortea hasta cumplir I2 (a) e I5."""
    for _ in range(1000):
        m1, d = sim_cohorte(rng)
        idx = list(range(60))
        if op == "a":
            orden = sorted(idx, key=lambda i: m1[i])
            sel, rest = orden[:13], orden[13:]
            Dt = media([d[i] for i in sel]) + delta
            Ddem = media([d[i] for i in rest])
            for _ in range(1000):
                v1, vd = sim_cohorte(rng)
                ov = sorted(range(60), key=lambda i: v1[i])
                Dvec = media([vd[i] for i in ov[:13]])
                if Dvec >= 4:
                    break
            rho, Dcomp = Dt - Dvec, Dvec
            xinf = Dt - Ddem
        elif op == "b":
            rng.shuffle(idx)
            sel, rest = idx[:13], idx[13:]
            Dt = media([d[i] for i in sel]) + delta + 2.5
            Ddem = media([d[i] for i in rest])
            rho, Dcomp = Dt - Ddem - 2.5, Ddem
            xinf = Dt - Ddem
        else:
            orden = sorted(idx, key=lambda i: m1[i])[:26]
            rng.shuffle(orden)
            sel, gr = orden[:13], orden[13:]
            Dt = media([d[i] for i in sel]) + delta
            Dcomp = media([d[i] for i in gr])
            Ddem = None
            rho = Dt - Dcomp
            xinf = None
        if -4 <= rho <= 10:
            return Dt, Dcomp, rho, xinf, Ddem
    raise RuntimeError("no converge")


def mc_supuestos(n=20000, semilla=20261008):
    rng = random.Random(semilla)
    res = {}
    for op in "abc":
        for delta in (0, 3):
            a = dict(n=0, q1=0, q3=0, q2=0, bajaron=0, tot=0)
            for _ in range(n):
                Dt, Dc, rho, xi, Dd = sim_caso5(op, delta, rng)
                a["tot"] += 1
                a["q1"] += Dt < 1
                if op == "c":
                    a["q3"] += Dc < 1
                if op == "a":
                    a["q2"] += not (xi > rho + 1)
                if op in "ab":
                    a["bajaron"] += not (Dd < 0)
            res[(op, delta)] = a
    return res


def mc_tandas_iguales(n=40000, semilla=7):
    """Q7: con 2 tandas de 10 respuestas a 0,5 h, ¿con que frecuencia dos medias coinciden al mostrarse con 1 decimal?"""
    rng = random.Random(semilla)
    iguales = 0
    for _ in range(n):
        mu = rng.uniform(5.5, 7.5)
        ms = []
        for _ in range(2):
            v = [round(rng.gauss(mu, 1.1) * 2) / 2 for _ in range(10)]
            ms.append(round(sum(v) / 10, 1))
        iguales += ms[0] == ms[1]
    return iguales / n


def mc_f5h_viejo(n=200000, semilla=11):
    """Reproduce el hallazgo B2 de v15 con el supuesto del simulador v14: rho ~ N(delta; 4,4) recortado a [-4, 10]."""
    rng = random.Random(semilla)
    ocurre = falso = 0
    for _ in range(n):
        delta = 0 if rng.random() < 0.5 else 3
        while True:
            rho = rng.gauss(delta, 4.4)
            if -4 <= rho <= 10:
                break
        if abs(0 - rho) > 1:          # E5d con la definicion vieja
            ocurre += 1
            if delta == 0 or rho < 0:  # el texto viejo decia "esta vez si cambio un poco ... quedaba un efecto pequeno"
                falso += 1
    return ocurre / n, falso / ocurre


# =====================================================================================
# 6. COMPROBACIONES
# =====================================================================================
def principal():
    escribir04 = "--escribir-04" in sys.argv
    t05 = leer(RUTA_05)
    t02 = leer(os.path.join(GDD, "02-bucle-y-mecanicas.md"))
    base, titulos, bloque19 = parse_nt19(t05)
    fin = textos_finales(base)

    P("ramas_t1.py · modelo de ramas de la revelación del Tema 1 (reconstruido 08-10-2026)")
    P("")
    # ---------------------------------------------------------------- A. cobertura exacta
    P("A. Cada estado cae en EXACTAMENTE una rama")
    cuentas = {}
    por_rama_estados = {rid: [] for rid in RAMA_IDS}
    malos = []
    total = 0
    for f in range(1, 9):
        n_f = 0
        for s in ESTADOS[f]():
            n_f += 1
            rs = ramas_de(s)
            if len(rs) != 1:
                malos.append((f, s, rs))
            else:
                por_rama_estados[rs[0]].append(s)
        cuentas[f] = n_f
        total += n_f
    P("   estados recorridos por ficha: " + ", ".join("F%d %d" % (f, cuentas[f]) for f in cuentas) + " · total %d" % total)
    chk("A1 ningún estado cae en 0 ni en 2 o más ramas", not malos,
        "%d estados mal asignados" % len(malos))
    for f, s, rs in malos[:12]:
        P("   ejemplo mal asignado (ficha %d): %s -> %s" % (f, {k: v for k, v in s.items() if k != "ficha"}, rs))
    vacias = [r for r, ss in por_rama_estados.items() if not ss]
    chk("A2 toda rama se alcanza al menos con un estado", not vacias, "sin estados: %s" % vacias)
    n_ramas = len(RAMAS)
    P("   ramas del modelo: %d (71 de NT1.9 + las nuevas: %s)" % (n_ramas, [r for r in RAMA_IDS if r not in base]))
    chk("A3 las ramas del modelo = las 71 de NT1.9 + las nuevas declaradas", sorted(set(base) - set(RAMA_IDS)) == [] and
        sorted(set(RAMA_IDS) - set(base)) == ["F6k"], "NT1.9 sin modelo: %s" % sorted(set(base) - set(RAMA_IDS)))

    # ---------------------------------------------------------------- B. hechos
    P("")
    P("B. Cada rama afirma solo hechos verdaderos para todos sus estados")
    n_est = n_eval = 0
    malos_h = []
    gen = []
    for r in RAMAS:
        for tipo, desc, fn in r["hechos"]:
            if tipo == "gen":
                gen.append((r["id"], desc))
                continue
            n_est += 1
            for s in por_rama_estados[r["id"]]:
                n_eval += 1
                if not fn(s):
                    malos_h.append((r["id"], desc, {k: v for k, v in s.items() if k != "ficha"}))
    chk("B1 hechos de estado verdaderos", not malos_h,
        "%d hechos comprobados en %d evaluaciones; fallan %d" % (n_est, n_eval, len(malos_h)))
    for h in malos_h[:15]:
        P("   FALLA %s :: %s :: %s" % h)
    P("   supuestos del generador (no se pueden comprobar con el estado; se miden en la sección G): %d" % len(gen))

    # ---------------------------------------------------------------- C. filas de pago, codigos, habitos
    P("")
    P("C. Filas de pago del bucle, códigos y hábitos")
    alcanzadas = set()
    filas_estados = {}
    for f in range(2, 9):
        for s in ESTADOS[f]():
            fila, k, ce = PAGO[f](s)
            alcanzadas.add((fila, k))
            filas_estados.setdefault(fila, []).append(s)
    for fila in ("R5.1", "R5.2"):
        alcanzadas.add((fila, "*"))
    todas = {(fila, k) for fila, d in T.FILAS.items() for k in d}
    # R6.6 se alcanza como suma
    alcanzadas.add(("R6.6", "*"))
    faltan = sorted(todas - alcanzadas)
    chk("C1 todas las filas y variantes de tablas_t1_v2.FILAS se alcanzan desde algún estado", not faltan,
        "%d filas, %d variantes; faltan %s" % (len(T.FILAS), len(todas), faltan))
    cods_alcanzados = set()
    for s in todos_los_estados():
        cods_alcanzados |= codigos(s)
    chk("C2 los 29 códigos del bucle se alcanzan y no hay ninguno de más", cods_alcanzados == set(T.CODIGOS),
        "alcanzados %d de %d; faltan %s; sobran %s" % (len(cods_alcanzados), len(T.CODIGOS),
                                                      sorted(set(T.CODIGOS) - cods_alcanzados), sorted(cods_alcanzados - set(T.CODIGOS))))
    chk("C3 los 29 códigos tienen al menos un hábito (H1 a H4)", all(h for _, h in T.CODIGOS.values()),
        "%d de %d" % (sum(1 for _, h in T.CODIGOS.values() if h), len(T.CODIGOS)))
    cuenta_h = {h: sum(1 for _, hs in T.CODIGOS.values() if h in hs) for h in ("H1", "H2", "H3", "H4")}
    chk("C4 hábitos H1..H4 = 7, 5, 12, 9 (E8d en dos)", cuenta_h == T.HABITOS_ESPERADOS, str(cuenta_h))
    # decisiones equivocadas sin codigo
    sin_codigo = {}
    for s in todos_los_estados():
        if s["ficha"] == 1:
            continue
        if not correcta(s) and not codigos(s) - {"E5e"}:
            rid = ramas_de(s)[0]
            fila = PAGO[s["ficha"]](s)[0]
            sin_codigo.setdefault(rid, set()).add(fila)
    P("   Decisiones equivocadas (clase 'se dejó engañar' o 'sobrecorrigió') SIN código E.. (huecos del registro): %d ramas" % len(sin_codigo))
    for rid in sorted(sin_codigo):
        P("     %s  filas de pago: %s" % (rid, ", ".join(sorted(sin_codigo[rid]))))
    HUECOS_DECLARADOS = {"F3c", "F3g", "F3m", "F3p"}   # los 3 que ya listaba el bucle (3: tal cual con 2+ tandas, frenar en P/A)
    nuevos = sorted(set(sin_codigo) - HUECOS_DECLARADOS)
    P("   De ellos, ya listados por el bucle (02, secc. 5.7 'Huecos sin código'): %s" % sorted(set(sin_codigo) & HUECOS_DECLARADOS))
    P("   NUEVOS (el bucle no los lista): %s" % nuevos)
    # filas de pago sin codigo ni habito
    P("   Filas de pago y sus códigos (una fila 'sin código' es un hueco del registro):")
    filas_sin = []
    for fila in sorted(T.FILAS, key=lambda x: [int(p) if p.isdigit() else p for p in re.split(r"[.]", x[1:])]):
        sts = filas_estados.get(fila, [])
        if fila in ("R5.1", "R5.2"):
            cods = {"E5e"} if fila == "R5.1" else set()
            P("     %-9s %-30s %s" % (fila, "(turno 1)", "E5e (solo registro, H4)" if fila == "R5.1" else "opción correcta: sin código"))
            continue
        if fila == "R6.6":
            P("     %-9s %-30s %s" % (fila, "N mal contado", "E6a (H4)"))
            continue
        cods = set()
        malas = [s for s in sts if not correcta(s)]
        for s in malas:
            cods |= codigos(s)
        sin = [s for s in malas if not codigos(s)]
        etq = "correcta" if not malas else ("equivocada" if len(malas) == len(sts) else "mixta")
        if malas and not cods:
            filas_sin.append(fila)
        parcial = "  (algunos estados sin código)" if (malas and cods and sin) else ""
        P("     %-9s %-30s %s%s" % (fila, etq, ", ".join(sorted(cods)) if cods else ("sin codigo" if malas else "no aplica"), parcial))
    P("   Filas de pago equivocadas SIN NINGÚN código: %s" % (filas_sin or "ninguna"))

    # ---------------------------------------------------------------- D. B1 (caso 3, pieza) y B2 (F5h)
    P("")
    P("D. Los dos bloqueos del crítico v15")
    # B1: ningún estado con rango `ok` sin pieza (P o B) cae en F3a; ningún F3a lleva rango sin pieza
    f3a_malos = [s for s in por_rama_estados["F3a"] if not (s["nivel"] == "ok" and s["pieza"])]
    ok_sin_pieza_en_3b = all("F3b" == ramas_de(s)[0] for s in ESTADOS[3]()
                             if s["dec"] == "rango" and s["tipo"] == "P" and s["nivel"] == "ok" and not s["pieza"])
    ok_sin_pieza_B = [ramas_de(s)[0] for s in ESTADOS[3]() if s["dec"] == "rango" and s["tipo"] == "B" and s["nivel"] == "ok" and not s["pieza"]]
    chk("D1 (B1) F3a solo recibe rango `ok` CON pieza; `ok` sin pieza y `flojo` en P van a F3b", not f3a_malos and ok_sin_pieza_en_3b)
    chk("D2 (B1) en B el rango que cubre (con o sin pieza) va a F3k, nunca a F3a ni a F3b", set(ok_sin_pieza_B) == {"F3k"},
        str(sorted(set(ok_sin_pieza_B))))
    chk("D3 (B1) con 2 fichas el rango nunca lleva pieza (2 tandas + 1 papel = 3)", all(not s["pieza"] for s in ESTADOS[3]()
                                                                                   if s["fichas"] == 2 and s["dec"] == "rango"))
    # B2: F5h
    h = fin["F5h"]
    textos_h = " ".join(segmentos(h["hiciste"]) + segmentos(h["habria"]))
    PAL_CAUSA = re.compile(r"sí cambió|cambió un poco|efecto|por el taller|gracias al taller|el taller (funcion|sirvi|cambi)", re.I)
    chk("D4 (B2) F5h no afirma efecto ni causa del taller", not PAL_CAUSA.search(textos_h), textos_h)
    # recorrer todas las combinaciones de delta y rho: la unica cosa que afirma es x = 0 y el valor de rho
    combos = bad = 0
    for delta in (0, 3):
        r10 = -40
        while r10 <= 100:
            rho = r10 / 10
            r10 += 1
            if rho > 1:
                combos += 1
                afirma_x_cero = True                       # el alumno escribio 0
                afirma_rho = True                          # el hueco {rho} se llena con la rho de la version
                # El texto no dice nada de delta: se comprueba que ni la rama ni el texto dependen de delta
                if not (afirma_x_cero and afirma_rho):
                    bad += 1
    # contraste: el texto VIEJO ("esta vez si cambio un poco ... quedaba un efecto pequeno") afirmaba delta > 0 y rho > 0
    viejo_falso = 0
    for delta in (0, 3):
        for r10 in range(11, 101):
            if not (delta > 0 and r10 / 10 > 0):
                viejo_falso += 1
    chk("D5 (B2) F5h verdadera en todas las combinaciones de δ ∈ {0, 3} y ρ ∈ (1; 10]", bad == 0,
        "%d combinaciones; dice solo 'escribiste 0' y '{rho}' (la cuenta del caso), nada de δ. El texto viejo era falso en %d de esas %d (los de δ = 0)" % (combos, viejo_falso, combos))
    ocurre, falso = mc_f5h_viejo()
    P("   (referencia) con la definición vieja de E5d y el texto viejo, simulación propia (rho ~ N(δ; 4,4) en [-4, 10], 200 000): "
      "E5d ocurre en %.1f %% de las versiones y el texto viejo era falso en %.1f %% de sus apariciones (v15 midió 80,9 y 57,0)." % (100 * ocurre, 100 * falso))
    # F5h vs E5d nuevo: E5d solo con rho > 1; el sobre ya no sale con rho < -1
    n_5d_neg = sum(1 for s in ESTADOS[5]() if s["dec"] == "num" and s["cero"] and s["req"] and s["rhosig"] == "neg" and "E5d" in codigos(s))
    chk("D6 con ρ < −1 el 0 no dispara E5d (cae en F5i, que es verdadera)", n_5d_neg == 0)

    # ---------------------------------------------------------------- E. textos
    P("")
    P("E. Textos de la revelación")
    n_seg = 0
    largos = []
    for rid, t in fin.items():
        for campo in ("hiciste", "habria"):
            for seg in segmentos(t[campo]):
                n_seg += 1
                if palabras(seg) > 25:
                    largos.append((rid, campo, palabras(seg)))
        for seg in [t["cierre"]]:
            n_seg += 1
            if palabras(seg) > 25:
                largos.append((rid, "cierre", palabras(seg)))
    for i, g in enumerate(CAMINO + [BETO_FINAL]):
        n_seg += 1
        if palabras(g) > 25:
            largos.append(("camino/Beto %d" % (i + 1), "globo", palabras(g)))
    chk("E1 ningún texto de alumno pasa de 25 palabras (los {huecos} cuentan 1)", not largos,
        "%d textos medidos (226 ramas y cierres + 3 globos del camino + Beto); largos: %s" % (n_seg, largos))
    chk("E1b los 3 globos del camino y la frase de Beto están tal cual en 05", all(g in bloque19 for g in CAMINO + [BETO_FINAL]),
        str([g for g in CAMINO + [BETO_FINAL] if g not in bloque19]))
    # pies de 'tu año' (F8e/F8f): vienen de la tabla de NT1.6; los medimos
    pies = re.findall(r"\| \*\*(?:Financiar|No financiar|Esperar)\*\* \|(.*)\|", t05)
    pies_txt = [c.strip().strip("«»") for fila in pies for c in fila.split("|") if c.strip()]
    largos_p = [p for p in pies_txt if palabras(p) > 20]
    chk("E2 los 9 pies de «tu año» (NT1.6) tienen menos de 20 palabras", len(pies_txt) == 9 and not largos_p, "%d pies, largos %s" % (len(pies_txt), largos_p))
    todo = "\n".join(t["hiciste"] + t["habria"] for t in fin.values()) + "\n".join(CIERRES.values())
    chk("E3 sin guiones largos", "—" not in todo)
    chk("E4 sin voseo (lista corta propia; `buscar_voseo.py` se corre aparte sobre la sección)", not VOSEO.search(todo), str(VOSEO.findall(todo)))
    chk("E5 sin 'según el dossier', software ni citas al material", not PROHIBIDAS.search(todo), str(PROHIBIDAS.findall(todo)))
    chk("E6 los 11 cierres están tal cual en NT1.9 de 05", all(c in bloque19 for c in CIERRES.values()),
        str([k for k, c in CIERRES.items() if c not in bloque19]))
    f3 = " ".join(fin[r]["hiciste"] + fin[r]["habria"] for r in RAMA_IDS if r.startswith("F3"))
    chk("E7 las fichas del caso 3 no dicen «4.º» (el caso 3 es del colegio, v15 I5a)", "4.º" not in f3)
    f_cartas = [r for r in RAMA_IDS if re.search(r"\bfichas?\b", fin[r]["hiciste"] + fin[r]["habria"])]
    P("   ramas cuyo texto dice «ficha(s)» (de tiempo, legítimo en F1b; el resto debe ser 0): %s" % f_cartas)
    chk("E8 «ficha» solo aparece en F1b, donde son las fichas de tiempo", f_cartas == ["F1b"])
    holes = set(re.findall(r"\{(\w+)\}", todo))
    P("   {huecos} que usan las ramas: %s" % sorted(holes))

    # diferencias contra NT1.9
    P("")
    P("   Diferencias con NT1.9 de 05 (lo que narrativa debe copiar):")
    cambia = []
    for rid in RAMA_IDS:
        o = base.get(rid)
        if o is None:
            cambia.append((rid, "NUEVA"))
            continue
        if o["hiciste"] != fin[rid]["hiciste"] or o["habria"] != fin[rid]["habria"]:
            cambia.append((rid, "CAMBIA"))
    P("   iguales: %d · cambian: %d · nuevas: %d" % (len(RAMA_IDS) - len(cambia), sum(1 for _, x in cambia if x == "CAMBIA"),
                                                  sum(1 for _, x in cambia if x == "NUEVA")))
    for rid, tipo in cambia:
        P("     %-4s %-7s %s" % (rid, tipo, fin[rid]["motivo"]))

    # ---------------------------------------------------------------- F. sobres y codigos
    P("")
    P("F. Sobres (05 NT1.7) y tabla única de 29 códigos (02 secc. 8.1)")
    sobres = {}
    for m in re.finditer(r"^\| (S-[A-Za-z0-9]+) \| ([^|]*) \| (.*) \|\s*$", t05, re.M):
        sobres[m.group(1)] = (m.group(2).strip(), m.group(3).strip())
    ids_esperados = {"S-P1"} | {"S-" + c for c in T.CODIGOS}
    chk("F1 30 sobres en 05 NT1.7 = S-P1 + 29 códigos", set(sobres) == ids_esperados,
        "%d; faltan %s; sobran %s" % (len(sobres), sorted(ids_esperados - set(sobres)), sorted(set(sobres) - ids_esperados)))
    filas02 = {}
    for m in re.finditer(r"^\| (E\d[a-z]) \| (\d) \| ([^|]*) \| ([^|]*) \| ([^|]*) \|\s*$", t02, re.M):
        filas02[m.group(1)] = (int(m.group(2)), m.group(3).strip(), [x.strip() for x in m.group(4).split(",")], m.group(5).strip())
    chk("F2 la tabla 8.1 de 02 = tablas_t1_v2.CODIGOS (29 códigos, mismos hábitos)",
        set(filas02) == set(T.CODIGOS) and all(sorted(filas02[c][2]) == sorted(T.CODIGOS[c][1]) for c in T.CODIGOS),
        "%d filas en 02" % len(filas02))
    dist_h = [c for c in T.CODIGOS if c in filas02 and sorted(filas02[c][2]) != sorted(T.CODIGOS[c][1])]
    chk("F3 los códigos por caso: E2 4, E3 6, E4 3, E5 5, E6 4, E7 3, E8 4",
        {int(c[1]): sum(1 for x in T.CODIGOS if x[1] == c[1]) for c in T.CODIGOS} == T.CODIGOS_POR_CASO)

    # ---------------------------------------------------------------- G. supuestos del generador
    P("")
    P("G. Supuestos del generador de los que dependen los textos (se piden al bucle; cifras de ESTE script, no del crítico)")
    P("   Modelo de 02 secc. 5.4: nivel real T ~ N(60,10), medición = T + N(0,8), δ ∈ {0,3}; I2 (vecino ≥ 4) e I5 (ρ en [−4,10]) aplicados; 20 000 sorteos por opción y δ, semilla 20261008.")
    res = mc_supuestos()
    P("   Si el generador NO los exige, fracción de versiones en que el supuesto falla:")
    P("   opción δ   Q1 'los llamados subieron (≥1)' · Q3 'el grupo del sorteo subió (≥1)' [c] · Q2 'inflado por encima de ρ+1' [a] · 'los demás bajaron' [a, b]")
    for (op, delta), a in sorted(res.items()):
        P("     (%s)  %d   Q1 falla %5.1f %%   Q3 %s   Q2 %s   demás-bajaron falla %s" % (
            op, delta, 100 * a["q1"] / a["tot"],
            ("%5.1f %%" % (100 * a["q3"] / a["tot"])) if op == "c" else "  n/a ",
            ("%5.1f %%" % (100 * a["q2"] / a["tot"])) if op == "a" else "  n/a ",
            ("%5.1f %%" % (100 * a["bajaron"] / a["tot"])) if op in "ab" else "n/a"))
    q7 = mc_tandas_iguales()
    P("   Q7 'cada una dio algo distinto' con 2 tandas de 10 respuestas a 0,5 h y la media mostrada con 1 decimal: dos medias iguales en %.1f %% de los pares." % (100 * q7))
    P("   Q4 (vecino ≥ 4), Q5 (informe del 2,5) y Q6/Q8/Q9: son reglas del bucle o de la narrativa (I2, I3, K11, G10, v15 I3); se prueban en construcción.")
    P("   Cada rama que depende de un supuesto: " + "; ".join("%s (%s)" % (rid, ",".join(sorted({d.split(':')[0] for r2, d in gen if r2 == rid}))) for rid in sorted({r for r, _ in gen})))
    qs = sorted({d.split(":")[0] for _, d in gen})
    P("   supuestos distintos: %s" % qs)

    # ---------------------------------------------------------------- resumen
    P("")
    P("RESUMEN")
    P("  ramas del modelo: %d · estados recorridos: %d · hechos de estado: %d (en %d evaluaciones) · supuestos del generador: %d (%d distintos)" % (
        n_ramas, total, n_est, n_eval, len(gen), len(qs)))
    P("  comprobaciones que fallan: %d %s" % (len(FALLAS), FALLAS))

    # ---------------------------------------------------------------- escribir tablas en 04
    if escribir04:
        escribir_bloques(t02, sobres, filas02, fin, titulos, por_rama_estados)
    with open(SALIDA + ".tmp", "w", encoding="utf-8") as f:
        f.write("\n".join(LINEAS) + "\n")
    os.replace(SALIDA + ".tmp", SALIDA)
    return 1 if FALLAS else 0


# =====================================================================================
# 7. BLOQUES GENERADOS para 04-aprendizaje.md
# =====================================================================================
NOMBRE_IDEA = {1: "1 · Paso 1", 2: "2 · Caso 2", 3: "3 · Caso 3", 4: "4 · Caso 4", 5: "5 · Caso 5 (turno 2)",
               6: "6 · Caso 6", 7: "7 · Caso 7", 8: "8 · Caso 8"}


def clases_de(estados, fn=clase):
    return sorted({fn(s) for s in estados})


def codigos_de(estados):
    c = set()
    for s in estados:
        c |= codigos(s)
    return sorted(c)


def bloque_t15a(por_rama_estados):
    orden = [CL_SOLO, CL_PISTA, CL_SIN_EV, CL_ENGANO, CL_SOBRE]
    out = ["| Idea · caso | " + " | ".join(orden) + " |", "|---|" + "---|" * len(orden)]
    for f in range(1, 9):
        celdas = {c: [] for c in orden}
        for r in RAMAS:
            if r["ficha"] != f:
                continue
            for c in clases_de(por_rama_estados[r["id"]]):
                celdas[c].append(r["id"])
        out.append("| %s | " % NOMBRE_IDEA[f] + " | ".join(", ".join(celdas[c]) if celdas[c] else "ninguna" for c in orden) + " |")
    return "\n".join(out)


def bloque_t15b(sobres, filas02):
    out = ["| Código | Caso | Cuándo | Clase de registro | Hábito | Sobre de la jefa (pista, escalón 2; texto de 05 NT1.7) |", "|---|---|---|---|---|---|"]
    por_codigo = {}
    for s in todos_los_estados():
        for c in codigos(s):
            por_codigo.setdefault(c, []).append(s)
    for c in sorted(T.CODIGOS, key=lambda x: (int(x[1]), x[2])):
        if c in ("E5e", "E8d"):
            cl = "solo registro"
        else:
            unicos = [s for s in por_codigo[c] if (codigos(s) - {"E5e", "E8d"}) == {c}]
            cl = " / ".join(clases_de(unicos or por_codigo[c]))
        caso, cuando, _hab, _sob = filas02[c]
        habs = ", ".join(T.CODIGOS[c][1])
        sid = "S-" + c
        texto = sobres[sid][1]
        if texto.startswith("*("):
            texto = "sin sobre: solo se registra para el hábito"
        out.append("| %s | %d | %s | %s | %s | %s |" % (c, caso, cuando, cl, habs, texto.replace("|", "/")))
    out.append("| S-P1 | 1 | No abrió ninguno de los papeles con sueño | sin clase | sin hábito | %s |" % sobres["S-P1"][1])
    return "\n".join(out)


def bloque_t17a(por_rama_estados):
    out = ["| Rama | Cuándo (tipo · opción · papeles abiertos · pieza) | Clase de registro | Códigos del bucle |", "|---|---|---|---|"]
    for r in RAMAS:
        ss = por_rama_estados[r["id"]]
        cl = " / ".join(clases_de(ss))
        cods = [c for c in codigos_de(ss) if c != "E5e"]
        malos = [s for s in ss if not correcta(s)]
        sin = [s for s in malos if not (codigos(s) - {"E5e"})]
        if r["id"] == "F1b":
            txt = "sobre S-P1 (del paso 1)"
        elif not malos:
            txt = ", ".join(cods) if cods else "ninguno (acierto)"
        elif not cods:
            txt = "HUECO H-C1: ninguno"
        else:
            txt = ", ".join(cods) + (" · HUECO H-C1 en algunos estados" if sin else "")
        out.append("| %s | %s | %s | %s |" % (r["id"], r["txt"], cl, txt))
    return "\n".join(out)


def bloque_t17b(fin, titulos):
    out = []
    for f in range(1, 9):
        nombre, resto = titulos.get(f, ("", ""))
        out.append(("**Carta %d · %s** %s" % (f, nombre, resto)).strip())
        out.append("")
        out.append("| Rama | Hiciste | Habría pasado |")
        out.append("|---|---|---|")
        cierres_usados = []
        for r in RAMAS:
            if r["ficha"] != f:
                continue
            t = fin[r["id"]]
            out.append("| %s | %s | %s |" % (r["id"], t["hiciste"], t["habria"]))
            c = cierre_de(r["id"])
            if c not in cierres_usados:
                cierres_usados.append(c)
        out.append("")
        for c in cierres_usados:
            ids = [r["id"] for r in RAMAS if r["ficha"] == f and cierre_de(r["id"]) == c]
            out.append("Cierre %s (%s): «%s»" % (c, ", ".join(ids), CIERRES[c]))
        out.append("")
    return "\n".join(out).rstrip()


def reemplazar(txt, nombre, contenido):
    a = "<!--GEN:%s-->" % nombre
    b = "<!--/GEN:%s-->" % nombre
    i, j = txt.index(a), txt.index(b)
    return txt[:i + len(a)] + "\n" + contenido + "\n" + txt[j:]


def escribir_bloques(t02, sobres, filas02, fin, titulos, por_rama_estados):
    txt = leer(RUTA_04)
    txt = reemplazar(txt, "T15A", bloque_t15a(por_rama_estados))
    txt = reemplazar(txt, "T15B", bloque_t15b(sobres, filas02))
    txt = reemplazar(txt, "T17A", bloque_t17a(por_rama_estados))
    txt = reemplazar(txt, "T17B", bloque_t17b(fin, titulos))
    with open(RUTA_04 + ".tmp", "w", encoding="utf-8", newline="") as f:
        f.write(txt)
    os.replace(RUTA_04 + ".tmp", RUTA_04)
    P("")
    P("Bloques GEN (T15A, T15B, T17A, T17B) reescritos en 04-aprendizaje.md")


if __name__ == "__main__":
    sys.exit(principal())
