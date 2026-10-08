# -*- coding: utf-8 -*-
"""Simulacion del bucle v2 del Tema 1 (reconstruida el 08-10-2026).

Corre con:  python -I simular_t1_v2.py   (guarda su salida en salida_simular_t1_v2.txt)

OJO: el simulador original del critico v14 (scratch/simular_t1_v2.py) se perdio. Este es un
simulador NUEVO hecho con las tablas de tablas_t1_v2.py y los supuestos que 06 v14 declara
(20 000 versiones, semilla 20261008, meta 65/65, rho ~ N(delta, 4,4) recortado a [-4, 10],
refuerzo del caso 2 con 50 %, media de 2 tandas con desvio 0,246 h, todos cuentan bien N y
escriben el x correcto del 7). Sus numeros se comparan con los de v14 en la salida.
Ningun supuesto sale de alumnos reales: p es una estimacion.
"""
import os
import sys
import itertools
import site

# python -I ignora el site-packages del usuario, donde esta numpy en esta PC: se agrega a mano
# (es la instalacion propia de Ronald, no datos descargados).
sys.path.append(site.getusersitepackages())
import numpy as np  # noqa: E402

sys.stdout.reconfigure(encoding="utf-8")
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import tablas_t1_v2 as T  # noqa: E402

SEMILLA = 20261008
N_GRANDE = 20000
N_BUSCA = 3000
COD = {"P": 0, "B": 1, "A": 2}
CASOS = [2, 3, 4, 5, 6, 7, 8]  # indice 0..6


def versiones(n, rng):
    v = {"n": n}
    v["b2"] = rng.random(n) < 1 / 3          # caso 2 es B en 1 de 3
    v["ref"] = rng.random(n) < 0.5           # el refuerzo entra a la carpeta el 50 %
    tir = np.array([[COD[x] for x in t] for t in T.TIRADAS])
    ti = rng.integers(0, 10, n)
    v["t3"], v["t6"], v["t7"] = tir[ti, 0], tir[ti, 1], tir[ti, 2]
    perm = np.argsort(rng.random((n, 5)), axis=1) + 1   # casos 3..7 -> indices 1..5
    v["order"] = np.concatenate([np.zeros((n, 1), int), perm, np.full((n, 1), 6)], axis=1)
    mu = rng.uniform(5.5, 7.5, n)
    v["mu"] = mu
    v["tandas"] = rng.normal(mu[:, None], 0.35, (n, 3))
    signo = np.where(rng.random(n) < 0.5, -1, 1)
    off = np.where(v["t3"] == 0, signo * rng.uniform(1.0, 1.6, n),
                   np.where(v["t3"] == 1, rng.uniform(-0.15, 0.15, n), rng.uniform(-0.5, 0.5, n)))
    v["cifra"] = mu + off
    v["buenoA"] = rng.random(n) < 0.5
    v["delta"] = np.where(rng.random(n) < 0.5, 0.0, 3.0)
    rho = rng.normal(v["delta"], 4.4)
    for _ in range(200):
        mal = (rho < -4) | (rho > 10)
        if not mal.any():
            break
        rho[mal] = rng.normal(v["delta"][mal], 4.4)
    v["rho"] = rho
    v["real8"] = rng.integers(0, 3, n)     # 0 financiar, 1 no financiar, 2 aun no
    r = rng.random(n)
    v["beto"] = np.where(r < 1 / 3, v["real8"], (v["real8"] + 1 + rng.integers(0, 2, n)) % 3)
    v["u"] = rng.random((n, 8))            # numeros para decisiones de las estrategias
    return v


def par(c, vv):
    return np.asarray(c, float), np.asarray(vv, float)


# ---------- opciones SIN abrir papeles (para la busqueda de la mejor politica) -----------
def c2_opt(v, o):
    B = v["b2"]
    if o == "tal":
        return np.where(B, 5, -20), np.where(B, 5, 10)
    if o == "frenar":
        return np.where(B, 0, 3), np.where(B, -15, -8)
    if o == "frase":
        return np.where(B, 0, -8), np.full(v["n"], 4)
    raise ValueError(o)


def rango_sin_pieza(v, a, b):
    mu = v["mu"]
    cubre = (a - 0.25 <= mu) & (mu <= b + 0.25)
    ancho = (b - a) > 2.0
    t = v["t3"]
    okC = np.where(t == 0, 3, np.where(t == 1, 0, -8))
    okV = np.where(t == 0, 0, np.where(t == 1, 2, 4))
    C = np.where(~cubre, -10, np.where(ancho, 0, okC))
    V = np.where(~cubre, 4, np.where(ancho, -2, okV))
    return C, V


def c3_opt(v, o):
    t = v["t3"]
    if o == "tal":
        return np.where(t == 1, 5, -20), np.where(t == 1, 5, 10)
    if o == "frenar":
        return np.where(t == 0, 6, 0), np.where(t == 0, -8, np.where(t == 1, -15, -10))
    m2 = v["tandas"][:, :2].mean(axis=1)
    if o == "r2":
        return rango_sin_pieza(v, m2 - 0.6, m2 + 0.6)
    if o == "ancho":
        return rango_sin_pieza(v, m2 - 1.3, m2 + 1.3)
    if o == "adapta":
        tc, vc = c3_opt(v, "tal")
        rc, rv = c3_opt(v, "r2")
        usa_tal = np.abs(v["cifra"] - m2) < 0.7
        return np.where(usa_tal, tc, rc), np.where(usa_tal, vc, rv)
    raise ValueError(o)


def c4_opt(v, o):
    A = v["buenoA"]
    if o == "A":
        return np.where(A, 5, -20), np.where(A, 5, 10)
    if o == "B":
        return np.where(A, -20, 4), np.where(A, 4, 2)
    if o == "ninguna":
        return np.zeros(v["n"]), np.full(v["n"], -10)
    raise ValueError(o)


def c5_turno1(v, t):
    n = v["n"]
    return np.zeros(n), np.full(n, -3 if t == "c" else 0)


def c5_turno2_sin_papeles(v, x):
    """x: None = frenar; numero = escribe x (R5.8 si |x - rho| <= 1, si no R5.9)."""
    n = v["n"]
    if x is None:
        return np.full(n, 2), np.full(n, -6)
    ok = np.abs(x - v["rho"]) <= 1.0
    return np.where(ok, 4, -10), np.where(ok, 2, 0)


def c5_opt(v, o):
    t1, t2 = o
    c1, v1 = c5_turno1(v, t1)
    c2, v2 = c5_turno2_sin_papeles(v, None if t2 == "frenar" else 0.0)
    return c1 + c2, v1 + v2


def c6_opt(v, o):
    t = v["t6"]
    n = v["n"]
    if o == "tal":
        return np.where(t == 1, 5, -20), np.where(t == 1, 5, 10)
    if o == "frenar":
        return np.where(t == 0, 6, 0), np.where(t == 0, -8, np.where(t == 1, -15, -10))
    if o == "base":
        return np.where(t == 0, 2, 0), np.where(t == 0, 1, np.where(t == 1, 2, 1))
    if o == "podrian":
        return np.where(t == 1, 0, -8), np.full(n, 4)
    raise ValueError(o)


def c7_opt(v, o):
    t = v["t7"]
    P = t == 0
    if o == "tal":
        return np.where(P, -10, 10), np.full(v["n"], 10)
    if o == "redisenar":
        return np.where(P, 8, 0), np.where(P, 4, -4)
    if o == "frenar":
        return np.where(P, 6, 0), np.where(P, -8, -15)
    if o == "adapta":
        a, b = c7_opt(v, "redisenar")
        c, d = c7_opt(v, "tal")
        return np.where(P, a, c), np.where(P, b, d)
    raise ValueError(o)


def c8_valor(v, dec, e):
    """dec: array 0 financiar, 1 no financiar, 2 esperar. e: papeles clave sobre la mesa."""
    real = v["real8"]
    ok = dec == real
    C = np.where(ok, np.select([e == 2, e == 1], [12, 6], 0), 0).astype(float)
    V = np.where(ok, np.select([e == 2, e == 1], [8, 4], 0), 0).astype(float)
    mal = ~ok
    # financiar mal
    f = mal & (dec == 0)
    C = np.where(f & (real == 1), -20, C)
    V = np.where(f & (real == 1), 6, V)
    C = np.where(f & (real == 2), -15, C)
    V = np.where(f & (real == 2), 6, V)
    nf = mal & (dec == 1)
    C = np.where(nf & (real == 0), -15, C)
    V = np.where(nf & (real == 0), -8, V)
    C = np.where(nf & (real == 2), -10, C)
    V = np.where(nf & (real == 2), -6, V)
    es = mal & (dec == 2)
    C = np.where(es, 0, C)
    V = np.where(es, -8, V)
    return C, V


def c8_opt(v, o):
    n = v["n"]
    e0 = np.zeros(n, int)
    if o == "fin":
        return c8_valor(v, np.zeros(n, int), e0)
    if o == "nofin":
        return c8_valor(v, np.ones(n, int), e0)
    if o == "esperar":
        return c8_valor(v, np.full(n, 2), e0)
    if o == "beto":
        return c8_valor(v, v["beto"], e0)
    if o == "contra":
        dec = (v["beto"] + 1 + (v["u"][:, 7] < 0.5).astype(int)) % 3
        return c8_valor(v, dec, e0)
    raise ValueError(o)


OPCIONES = [
    ("c2", ["tal", "frenar", "frase"], c2_opt),
    ("c3", ["tal", "frenar", "r2", "adapta", "ancho"], c3_opt),
    ("c4", ["A", "B", "ninguna"], c4_opt),
    ("c5", [(a, b) for a in "abc" for b in ("frenar", "cero")], c5_opt),
    ("c6", ["tal", "frenar", "base", "podrian"], c6_opt),
    ("c7", ["tal", "redisenar", "frenar", "adapta"], c7_opt),
    ("c8", ["fin", "nofin", "esperar", "beto", "contra"], c8_opt),
]


def jugar(v, DC, DV):
    """DC, DV: arrays (7, n) con el efecto de cada caso (indice 0..6). Aplica en el orden de la
    version, con tope 0..100 despues de cada caso. Devuelve C, V finales."""
    n = v["n"]
    ar = np.arange(n)
    C = np.full(n, float(T.INICIO))
    V = np.full(n, float(T.INICIO))
    for k in range(7):
        idx = v["order"][:, k]
        C = np.clip(C + DC[idx, ar], 0, 100)
        V = np.clip(V + DV[idx, ar], 0, 100)
    return C, V


def pasa(C, V):
    return (C >= T.META) & (V >= T.META)


def tabla_opciones(v):
    TC, TV = [], []
    for nombre, ops, f in OPCIONES:
        cs, vs = [], []
        for o in ops:
            c, vv = f(v, o)
            cs.append(np.asarray(c, float))
            vs.append(np.asarray(vv, float))
        TC.append(cs)
        TV.append(vs)
    return TC, TV


def evaluar_politica(v, TC, TV, pol):
    DC = np.stack([TC[i][pol[i]] for i in range(7)])
    DV = np.stack([TV[i][pol[i]] for i in range(7)])
    return jugar(v, DC, DV)


def politica_por_nombre(nombres):
    pol = []
    for i, (nom, ops, f) in enumerate(OPCIONES):
        pol.append(ops.index(nombres[i]))
    return pol


# ---------- estrategias con nombre ----------------------------------------------------
def estrategia_fija(v, TC, TV, nombres):
    return evaluar_politica(v, TC, TV, politica_por_nombre(nombres))


# ---------- estrategias que abren papeles (modelo de "da con el clave") ----------------
def efectos_con_clave(v):
    """Efectos de la decision correcta con evidencia, por caso (arrays n)."""
    n = v["n"]
    z = np.zeros(n)
    e = {}
    B2 = v["b2"]
    # caso 2: P frase con clave (+8/+4); B frase con clave o tal cual (+10/+10)
    e[0] = (np.where(B2, 10, 8).astype(float), np.where(B2, 10, 4).astype(float))
    t3 = v["t3"]
    e[1] = (np.where(t3 == 1, 10, 8).astype(float), np.where(t3 == 1, 10, 4).astype(float))
    A = v["buenoA"]
    e[2] = (np.where(A, 10, 8).astype(float), np.where(A, 10, 4).astype(float))
    e[3] = (np.full(n, 12.0 - 0.0), np.full(n, 6.0 - 3.0))   # (c): R5.6 +12/+6 y el sorteo cuesta -3
    t6 = v["t6"]
    e[4] = (np.where(t6 == 1, 10, 8).astype(float), np.where(t6 == 1, 10, 4).astype(float))
    t7 = v["t7"]
    e[5] = (np.where(t7 == 0, 8, 10).astype(float), np.where(t7 == 0, 4, 10).astype(float))
    return e


def fallback(v, tipo):
    """Efectos de la accion de respaldo sin evidencia por caso (arrays)."""
    n = v["n"]
    if tipo == "prudente":
        nombres = ["frenar", "frenar", "ninguna", ("c", "frenar"), "frenar", "frenar", "esperar"]
    elif tipo == "firmar":
        nombres = ["tal", "tal", "A", ("c", "cero"), "tal", "tal", "fin"]
    elif tipo == "intermedio":
        nombres = ["frase", "r2", "ninguna", ("c", "frenar"), "base", "adapta", "esperar"]
    else:
        raise ValueError(tipo)
    DC, DV = [], []
    for i, (nom, ops, f) in enumerate(OPCIONES):
        c, vv = f(v, nombres[i])
        DC.append(np.asarray(c, float))
        DV.append(np.asarray(vv, float))
    return DC, DV


def entiende(v, p, resp, sobre=None, q=None):
    """Quien da con el clave de cada caso con probabilidad p (q: lista de 7 probabilidades por caso
    si se quiere otra). Con dos papeles necesarios (casos 5 y 8) cada uno sale con raiz de p."""
    n = v["n"]
    u = v["u"]
    ev = efectos_con_clave(v)
    fC, fV = fallback(v, resp)
    prob = q if q is not None else [p, p, p, p, p, 1.0, p]
    DC, DV = [], []
    for i in range(7):
        if i == 5:
            dc, dv = ev[5]
            DC.append(dc.copy())
            DV.append(dv.copy())
            continue
        if i == 6:
            # caso 8: e = 2 con prob p, e = 1 con 2*sqrt(p)*(1-sqrt(p)), si no 0
            s = np.sqrt(prob[6])
            p2 = prob[6]
            p1 = 2 * s * (1 - s)
            r = u[:, 6]
            e = np.where(r < p2, 2, np.where(r < p2 + p1, 1, 0))
            real = v["real8"]
            # con e = 1 acierta con 2/3
            acierta1 = u[:, 5] < 2 / 3
            dec = np.where(e == 2, real, np.where(e == 1, np.where(acierta1, real, (real + 1) % 3), -1))
            ok = (dec == real)
            cC = np.where(e == 2, 12, 6).astype(float)
            cV = np.where(e == 2, 8, 4).astype(float)
            wc, wv = c8_valor(v, np.where(dec < 0, 2, dec), np.zeros(n, int))
            if resp == "prudente" or resp == "intermedio":
                respC, respV = c8_opt(v, "esperar")
            else:
                respC, respV = c8_opt(v, "fin")
            C8 = np.where(e == 0, respC, np.where(ok, cC, wc))
            V8 = np.where(e == 0, respV, np.where(ok, cV, wv))
            DC.append(C8)
            DV.append(V8)
            continue
        hallo = u[:, i] < (prob[i] if i != 3 else prob[3])
        dc, dv = ev[i]
        if i == 3:
            # caso 5: sin los papeles, turno 1 (c) y respaldo del turno 2
            c1, v1 = c5_turno1(v, "c")
            if resp == "firmar":
                c2_, v2_ = c5_turno2_sin_papeles(v, 0.0)
            else:
                c2_, v2_ = c5_turno2_sin_papeles(v, None)
            dcF, dvF = c1 + c2_, v1 + v2_
            # con papeles: escribe rho: R5.6 con (c)
            DC.append(np.where(hallo, dc, dcF))
            DV.append(np.where(hallo, dv, dvF))
            continue
        DC.append(np.where(hallo, dc, fC[i]))
        DV.append(np.where(hallo, dv, fV[i]))
    return np.stack(DC), np.stack(DV)


def azar_abre3(v, resp):
    """Abre 3 de 6 papeles al azar en cada caso; si halla el clave decide bien, si no firma/frena."""
    q = [0.50, 0.50, 0.80, 0.20, 0.50, 0.50, 0.20]
    n = v["n"]
    u = v["u"]
    ev = efectos_con_clave(v)
    fC, fV = fallback(v, resp)
    DC, DV = [], []
    for i in range(7):
        if i == 6:
            # ambos claves 0,20; uno solo 0,60; ninguno 0,20
            r = u[:, 6]
            e = np.where(r < 0.20, 2, np.where(r < 0.80, 1, 0))
            real = v["real8"]
            acierta1 = u[:, 5] < 2 / 3
            dec = np.where(e == 2, real, np.where(e == 1, np.where(acierta1, real, (real + 1) % 3), -1))
            ok = dec == real
            cC = np.where(e == 2, 12, 6).astype(float)
            cV = np.where(e == 2, 8, 4).astype(float)
            wc, wv = c8_valor(v, np.where(dec < 0, 2, dec), np.zeros(n, int))
            respC, respV = c8_opt(v, "esperar" if resp == "prudente" else "fin")
            DC.append(np.where(e == 0, respC, np.where(ok, cC, wc)))
            DV.append(np.where(e == 0, respV, np.where(ok, cV, wv)))
            continue
        hallo = u[:, i] < q[i]
        dc, dv = ev[i]
        if i == 3:
            c1, v1 = c5_turno1(v, "a")
            if resp == "firmar":
                c2_, v2_ = c5_turno2_sin_papeles(v, 0.0)
            else:
                c2_, v2_ = c5_turno2_sin_papeles(v, None)
            dcF, dvF = c1 + c2_, v1 + v2_
            # con (a): R5.7 +6/+3
            DC.append(np.where(hallo, 6.0, dcF)); DV.append(np.where(hallo, 3.0, dvF))
            continue
        DC.append(np.where(hallo, dc, fC[i])); DV.append(np.where(hallo, dv, fV[i]))
    return np.stack(DC), np.stack(DV)


def copia(v):
    """Copia las decisiones de OTRA version (la siguiente). Decisiones por categoria, sin papeles."""
    w = {k: (np.roll(x, 1, axis=0) if isinstance(x, np.ndarray) and x.ndim >= 1 and len(x) == v["n"] else x)
         for k, x in v.items()}
    n = v["n"]
    nombres = []
    DC, DV = [], []
    # caso 2: frase
    c, vv = c2_opt(v, "frase"); DC.append(c); DV.append(vv)
    # caso 3: tal cual si el otro era B, si no rango r2
    ct, vt = c3_opt(v, "tal"); cr, vr = c3_opt(v, "r2")
    tb = w["t3"] == 1
    DC.append(np.where(tb, ct, cr)); DV.append(np.where(tb, vt, vr))
    # caso 4: el bueno de la otra version
    ca, va = c4_opt(v, "A"); cb, vb = c4_opt(v, "B")
    DC.append(np.where(w["buenoA"], ca, cb)); DV.append(np.where(w["buenoA"], va, vb))
    # caso 5: (c) y escribe 0
    c, vv = c5_opt(v, ("c", "cero")); DC.append(c); DV.append(vv)
    # caso 6: tal cual si el otro era B, si no base
    ct, vt = c6_opt(v, "tal"); cb_, vb_ = c6_opt(v, "base")
    tb = w["t6"] == 1
    DC.append(np.where(tb, ct, cb_)); DV.append(np.where(tb, vt, vb_))
    # caso 7: rediseniar si el otro era P, si no tal cual
    cr, vr = c7_opt(v, "redisenar"); ct, vt = c7_opt(v, "tal")
    tp = w["t7"] == 0
    DC.append(np.where(tp, cr, ct)); DV.append(np.where(tp, vr, vt))
    # caso 8: la decision correcta de la otra version
    c, vv = c8_valor(v, w["real8"], np.zeros(n, int)); DC.append(c); DV.append(vv)
    return np.stack(DC), np.stack(DV)


def sobrecorrige(v, p, caso, resp):
    DC, DV = entiende(v, p, resp)
    DC = DC.copy(); DV = DV.copy()
    n = v["n"]
    if caso == 7:
        c, vv = c7_opt(v, "redisenar"); DC[5] = c; DV[5] = vv
    elif caso == 5:
        # escribe 0 siempre; con papeles abiertos (prob p) y rho dentro de 1: R5.6; si no R5.9
        hallo = v["u"][:, 3] < p
        ok = np.abs(v["rho"]) <= 1.0
        c1, v1 = c5_turno1(v, "c")
        cc = np.where(hallo, np.where(ok, 12, -10), np.where(ok, 4, -10))
        vv_ = np.where(hallo, np.where(ok, 6, 0), np.where(ok, 2, 0))
        DC[3] = c1 + cc; DV[3] = v1 + vv_
    elif caso == 8:
        # espera siempre: con e papeles; si lo real es "aun no" paga como correcto, si no 0/-8
        real = v["real8"]
        s = np.sqrt(p); r = v["u"][:, 6]
        e = np.where(r < p, 2, np.where(r < p + 2 * s * (1 - s), 1, 0))
        c, vv = c8_valor(v, np.full(n, 2), e)
        DC[6] = c; DV[6] = vv
    return DC, DV


def pct(x):
    return "%5.1f %%" % (100.0 * float(np.mean(x)))


def main():
    out = []
    P = out.append
    rng = np.random.default_rng(SEMILLA)
    v = versiones(N_GRANDE, rng)
    TC, TV = tabla_opciones(v)

    P("Simulacion bucle v2 Tema 1 (reconstruida). %d versiones, semilla %d, meta C y Voz >= %d" % (N_GRANDE, SEMILLA, T.META))
    P("")
    P("== Comprobaciones exactas ==")
    # E-S1 sumas de las 10 tiradas (casos 3, 6, 7 con 'firmar tal cual', sin papeles)
    sumas = []
    for t3, t6, t7 in T.TIRADAS:
        s = 0
        for t, caso in ((t3, 3), (t6, 6)):
            s += 5 if t == "B" else -20
        s += 10 if t7 == "B" else -10
        sumas.append(s)
    P("E-S1, suma de C de los casos 3, 6 y 7 en las 10 tiradas: %s (maximo %d)" % (sumas, max(sumas)))
    cota_es1 = T.INICIO + max(sumas) + 5 + 5 + 4 + 0
    P("E-S1, cota: 50 + %d + 5 (c2 B sin evidencia) + 5 (c4) + 4 (c5, R5.8) + 0 (c8, R8.3) = %d  < %d: %s" % (max(sumas), cota_es1, T.META, cota_es1 < T.META))
    aumentos = 5 + 5 + 4 + 15
    P("E-S1, aumentos posibles: 5 (c2) + 5 (c4) + 4 (c5) + 15 (el mejor par B de c3, c6, c7) = %d" % aumentos)
    cotaC = 8 + 8 + 8 + 12 + 8 + 8 + 12
    cotaV = 4 + 4 + 4 + (6 - 3) + 4 + 4 + 8
    P("Quien entiende, todo bien en una version tipica: C suma %d (queda en 100 por el tope), Voz suma %d (queda en %d)" % (cotaC, cotaV, T.INICIO + cotaV))
    P("")

    P("== Estrategias con nombre (20 000 versiones) ==")
    es1 = estrategia_fija(v, TC, TV, ["tal", "tal", "A", ("a", "cero"), "tal", "tal", "fin"])
    es2 = estrategia_fija(v, TC, TV, ["frenar", "frenar", "ninguna", ("a", "frenar"), "frenar", "frenar", "esperar"])
    es3 = estrategia_fija(v, TC, TV, ["frase", "r2", "ninguna", ("a", "frenar"), "base", "tal", "esperar"])
    es3b = estrategia_fija(v, TC, TV, ["frase", "r2", "ninguna", ("a", "cero"), "base", "tal", "esperar"])
    es3c = estrategia_fija(v, TC, TV, ["frase", "r2", "ninguna", ("a", "frenar"), "base", "adapta", "esperar"])
    P("E-S1 firmar siempre (c5: (a) y 0)                          pasa %s   (C media %.1f | Voz media %.1f)" % (pct(pasa(*es1)), es1[0].mean(), es1[1].mean()))
    P("E-S2 frenar siempre                                         pasa %s   (C media %.1f | Voz media %.1f)" % (pct(pasa(*es2)), es2[0].mean(), es2[1].mean()))
    P("E-S3 intermedia sin papeles (c5 frenar, c7 tal cual)        pasa %s" % pct(pasa(*es3)))
    P("E-S3b igual, c5 escribe 0                                   pasa %s" % pct(pasa(*es3b)))
    P("E-S3c igual y c7 mira el dibujo contra la hoja              pasa %s" % pct(pasa(*es3c)))

    for resp in ("firmar", "frenar"):
        r = "firmar" if resp == "firmar" else "prudente"
        DC, DV = azar_abre3(v, r)
        C, V = jugar(v, DC, DV)
        etiqueta = "E-S4 abre 3 al azar; si no halla, firma " if resp == "firmar" else "E-S5 abre 3 al azar; si no halla, frena "
        P("%s            pasa %s   (C < meta en %s | Voz < meta en %s)" % (etiqueta, pct(pasa(C, V)),
          pct(C < T.META), pct(V < T.META)))
    DC, DV = copia(v)
    C, V = jugar(v, DC, DV)
    P("E-S9 copia las decisiones de otra version                  pasa %s" % pct(pasa(C, V)))
    P("")
    P("E-S10 quien entiende, segun su respaldo y p (acierto del clave: ESTIMACION, no dato):")
    for resp in ("prudente", "firmar", "intermedio"):
        fila = []
        for p in (0.25, 0.50, 0.65, 0.80, 0.95, 1.00):
            DC, DV = entiende(v, p, resp)
            C, V = jugar(v, DC, DV)
            fila.append("%.2f: %s" % (p, pct(pasa(C, V)).strip()))
        P("   si falla, %-10s  %s" % (resp, " | ".join(fila)))
    P("")
    P("Sobrecorregir un caso y, en lo demas, entender (respaldo prudente):")
    for caso, nom in ((7, "E-S6 redisena siempre el 7"), (5, "E-S7 escribe 0 siempre en el 5"), (8, "E-S8 espera siempre en el 8")):
        fila = []
        for p in (0.65, 0.80, 1.00):
            DC, DV = sobrecorrige(v, p, caso, "prudente")
            C, V = jugar(v, DC, DV)
            fila.append("p=%.2f: %s" % (p, pct(pasa(C, V)).strip()))
        P("   %-34s %s" % (nom, " | ".join(fila)))
    P("")

    # ---- busqueda de la mejor politica fija sin abrir un solo papel ----
    P("== Busqueda de la mejor politica que NUNCA abre un papel ==")
    n_pol = int(np.prod([len(o[1]) for o in OPCIONES]))
    P("Espacio: %s = %d politicas (c2 3, c3 5, c4 3, c5 6, c6 4, c7 4, c8 5). Se evalua en %d versiones y se re-mide la ganadora en %d nuevas." % (
        "x".join(str(len(o[1])) for o in OPCIONES), n_pol, N_BUSCA, N_GRANDE))
    rng2 = np.random.default_rng(SEMILLA + 1)
    vb = versiones(N_BUSCA, rng2)
    TCb, TVb = tabla_opciones(vb)
    res = []
    rangos = [range(len(o[1])) for o in OPCIONES]
    for pol in itertools.product(*rangos):
        C, V = evaluar_politica(vb, TCb, TVb, pol)
        res.append((float(np.mean(pasa(C, V))), pol))
    res.sort(key=lambda x: -x[0])
    P("Mejores 5 en la muestra de busqueda:")
    for pr, pol in res[:5]:
        P("   %5.1f %%  %s" % (100 * pr, [OPCIONES[i][1][pol[i]] for i in range(7)]))
    rng3 = np.random.default_rng(SEMILLA + 2)
    vn = versiones(N_GRANDE, rng3)
    TCn, TVn = tabla_opciones(vn)
    P("Re-medida de las 5 mejores en %d versiones nuevas:" % N_GRANDE)
    mejor = 0.0
    for pr, pol in res[:5]:
        C, V = evaluar_politica(vn, TCn, TVn, pol)
        x = float(np.mean(pasa(C, V)))
        mejor = max(mejor, x)
        P("   %5.1f %%  %s" % (100 * x, [OPCIONES[i][1][pol[i]] for i in range(7)]))
    P("MEJOR POLITICA SIN PAPELES (re-medida): %.1f %%   (v14 del critico: 4,8 %%; umbral declarado: menos de 15 %%)" % (100 * mejor))
    n10 = sum(1 for pr, _ in res if pr >= 0.10)
    n5 = sum(1 for pr, _ in res if pr >= 0.05)
    P("Politicas que pasan >= 10 %% en la muestra de busqueda: %d de %d ; >= 5 %%: %d" % (n10, n_pol, n5))
    # sin mirar el dibujo (c7 sin 'adapta')
    res_sin = [(pr, pol) for pr, pol in res if OPCIONES[5][1][pol[5]] != "adapta"]
    pr, pol = res_sin[0]
    C, V = evaluar_politica(vn, TCn, TVn, pol)
    P("Sin mirar el dibujo del caso 7 (la mejor de las restantes), re-medida: %.1f %%" % (100 * float(np.mean(pasa(C, V)))))

    # ---- sensibilidad: meta 60 / 70 con la mejor politica ----
    for meta in (60, 70):
        T.META = meta
        mejor_m = 0.0
        for pr, pol in res[:50]:
            C, V = evaluar_politica(vn, TCn, TVn, pol)
            mejor_m = max(mejor_m, float(np.mean(pasa(C, V))))
        P("Sensibilidad: con meta %d/%d, la mejor de las 50 primeras pasa %.1f %%" % (meta, meta, 100 * mejor_m))
    T.META = 65

    texto = "\n".join(out)
    print(texto)
    ruta = os.path.join(os.path.dirname(os.path.abspath(__file__)), "salida_simular_t1_v2.txt")
    with open(ruta + ".tmp", "w", encoding="utf-8") as f:
        f.write(texto + "\n")
    os.replace(ruta + ".tmp", ruta)


if __name__ == "__main__":
    main()
