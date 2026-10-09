# -*- coding: utf-8 -*-
"""Exporta a JSON lo que el motor TS del Tema 1 necesita para la prueba de PARIDAD.

Corre con:  python exportar_fixtures_t1.py     (con `python`, NO `python -I`: numpy vive en el site-packages del usuario)

Escribe  src/lib/juego/psicoestadistica/fixtures/paridad-t1.json  (a un .tmp y luego os.replace).

Que exporta:
  1. Las tablas de tablas_t1_v2.py (filas de efecto, tiradas, codigos, metas).
  2. N_PARIDAD versiones muestreadas por numpy (el TS NO puede reproducir el flujo de numpy, asi que las
     versiones se pasan tal cual) y, para cada estrategia de simular_t1_v2.py, el C y la Voz finales de cada
     version. El TS aplica sus tablas a las MISMAS versiones y debe dar los mismos numeros, uno por uno.
  3. La tabla de cada opcion (c2..c8) por version, para fijar las opciones una por una.
  4. El barrido de las 21 600 politicas que nunca abren un papel, sobre esas versiones.
  5. Las tasas de las mismas estrategias sobre 20 000 versiones nuevas (semilla 20261008, como el simulador
     original): el TS las compara con su PROPIO muestreador (prueba estadistica, con tolerancia).
"""
import json
import os
import sys
import itertools

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import simular_t1_v2 as S  # noqa: E402  (agrega numpy al path y reconfigura stdout)
import tablas_t1_v2 as T  # noqa: E402
import numpy as np  # noqa: E402

RAIZ = os.path.abspath(os.path.join(HERE, "..", "..", "..", ".."))
DESTINO = os.path.join(RAIZ, "src", "lib", "juego", "psicoestadistica", "fixtures", "paridad-t1.json")

N_PARIDAD = 2000
SEMILLA_PARIDAD = S.SEMILLA + 3
N_GRANDE = S.N_GRANDE


def clave_opcion(o):
    return "|".join(o) if isinstance(o, tuple) else o


def todas(v, TC, TV):
    """nombre -> (C, V) finales por version, para todas las estrategias con nombre."""
    r = {}
    fijas = {
        "E-S1": ["tal", "tal", "A", ("a", "cero"), "tal", "tal", "fin"],
        "E-S2": ["frenar", "frenar", "ninguna", ("a", "frenar"), "frenar", "frenar", "esperar"],
        "E-S3": ["frase", "r2", "ninguna", ("a", "frenar"), "base", "tal", "esperar"],
        "E-S3b": ["frase", "r2", "ninguna", ("a", "cero"), "base", "tal", "esperar"],
        "E-S3c": ["frase", "r2", "ninguna", ("a", "frenar"), "base", "adapta", "esperar"],
    }
    for nombre, pol in fijas.items():
        r[nombre] = S.estrategia_fija(v, TC, TV, pol)
    for resp, nombre in (("firmar", "E-S4"), ("prudente", "E-S5")):
        DC, DV = S.azar_abre3(v, resp)
        r[nombre] = S.jugar(v, DC, DV)
    DC, DV = S.copia(v)
    r["E-S9"] = S.jugar(v, DC, DV)
    for resp in ("prudente", "firmar", "intermedio"):
        for p in (0.25, 0.50, 0.65, 0.80, 0.95, 1.00):
            DC, DV = S.entiende(v, p, resp)
            r["E-S10|%s|%.2f" % (resp, p)] = S.jugar(v, DC, DV)
    for caso in (7, 5, 8):
        for p in (0.65, 0.80, 1.00):
            DC, DV = S.sobrecorrige(v, p, caso, "prudente")
            r["SOBRE|%d|%.2f" % (caso, p)] = S.jugar(v, DC, DV)
    return r


def barrido(v, TC, TV):
    """Todas las politicas que nunca abren un papel: devuelve (mejor_tasa, mejor_pol, n>=10, n>=5, total, top5)."""
    rangos = [range(len(o[1])) for o in S.OPCIONES]
    res = []
    for pol in itertools.product(*rangos):
        C, V = S.evaluar_politica(v, TC, TV, pol)
        res.append((int(np.sum(S.pasa(C, V))), pol))
    res.sort(key=lambda x: (-x[0], x[1]))
    n = v["n"]
    return {
        "total": len(res),
        "mejorCuenta": res[0][0],
        "mejorPolitica": [clave_opcion(S.OPCIONES[i][1][res[0][1][i]]) for i in range(7)],
        "n10": sum(1 for c, _ in res if c / n >= 0.10),
        "n5": sum(1 for c, _ in res if c / n >= 0.05),
        "top5": [
            {"cuenta": c, "politica": [clave_opcion(S.OPCIONES[i][1][pol[i]]) for i in range(7)]}
            for c, pol in res[:5]
        ],
    }


def a_lista_version(v, i):
    return {
        "b2": bool(v["b2"][i]),
        "ref": bool(v["ref"][i]),
        "t3": int(v["t3"][i]),
        "t6": int(v["t6"][i]),
        "t7": int(v["t7"][i]),
        "order": [int(x) for x in v["order"][i]],
        "mu": float(v["mu"][i]),
        "tandas": [float(x) for x in v["tandas"][i]],
        "cifra": float(v["cifra"][i]),
        "buenoA": bool(v["buenoA"][i]),
        "delta": float(v["delta"][i]),
        "rho": float(v["rho"][i]),
        "real8": int(v["real8"][i]),
        "beto": int(v["beto"][i]),
        "u": [float(x) for x in v["u"][i]],
    }


def main():
    # ---- 1. tablas ----
    tablas = {
        "META": T.META,
        "MARCA_FICHAS": T.MARCA_FICHAS,
        "INICIO": T.INICIO,
        "TIRADAS": [list(t) for t in T.TIRADAS],
        "FILAS": {k: {c: list(e) for c, e in d.items()} for k, d in T.FILAS.items()},
        "FILAS_POR_CASO": {str(k): n for k, n in T.FILAS_POR_CASO.items()},
        "G5_FILAS": T.G5_FILAS,
        "G5_MITAD": {k: list(x) for k, x in T.G5_MITAD.items()},
        "CODIGOS": {k: {"texto": d, "habitos": h} for k, (d, h) in T.CODIGOS.items()},
        "CODIGOS_POR_CASO": {str(k): n for k, n in T.CODIGOS_POR_CASO.items()},
        "HABITOS_ESPERADOS": T.HABITOS_ESPERADOS,
        "SIN_SOBRE": T.SIN_SOBRE,
    }

    # ---- 2 a 4. versiones de paridad ----
    rng = np.random.default_rng(SEMILLA_PARIDAD)
    v = S.versiones(N_PARIDAD, rng)
    TC, TV = S.tabla_opciones(v)
    estrategias = {}
    for nombre, (C, V) in todas(v, TC, TV).items():
        estrategias[nombre] = {"C": [int(x) for x in C], "V": [int(x) for x in V]}
    opciones = {}
    for i, (nom, ops, f) in enumerate(S.OPCIONES):
        opciones[nom] = {
            clave_opcion(o): {"C": [int(x) for x in TC[i][j]], "V": [int(x) for x in TV[i][j]]}
            for j, o in enumerate(ops)
        }
    bar = barrido(v, TC, TV)

    # ---- 5. 20 000 versiones nuevas, semilla del simulador original ----
    rng_g = np.random.default_rng(S.SEMILLA)
    vg = S.versiones(N_GRANDE, rng_g)
    TCg, TVg = S.tabla_opciones(vg)
    tasas = {}
    for nombre, (C, V) in todas(vg, TCg, TVg).items():
        tasas[nombre] = {
            "pasa": float(np.mean(S.pasa(C, V))),
            "C": float(np.mean(C)),
            "V": float(np.mean(V)),
        }
    pol_idx = S.politica_por_nombre([
        (tuple(x.split("|")) if "|" in x else x) for x in bar["mejorPolitica"]
    ])
    C, V = S.evaluar_politica(vg, TCg, TVg, pol_idx)
    tasas["MEJOR_SIN_PAPELES"] = {"pasa": float(np.mean(S.pasa(C, V))), "C": float(np.mean(C)), "V": float(np.mean(V))}

    salida = {
        "meta": {
            "semillaParidad": SEMILLA_PARIDAD,
            "nParidad": N_PARIDAD,
            "semillaGrande": S.SEMILLA,
            "nGrande": N_GRANDE,
            "nota": "Generado por docs/juego/gdd/scripts-t1/exportar_fixtures_t1.py. No se edita a mano.",
        },
        "tablas": tablas,
        "versiones": [a_lista_version(v, i) for i in range(N_PARIDAD)],
        "opciones": opciones,
        "estrategias": estrategias,
        "barrido": bar,
        "grande": tasas,
    }
    os.makedirs(os.path.dirname(DESTINO), exist_ok=True)
    tmp = DESTINO + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(salida, f, ensure_ascii=False, separators=(",", ":"))
    os.replace(tmp, DESTINO)
    print("OK", DESTINO, os.path.getsize(DESTINO), "bytes")
    print("estrategias:", len(estrategias), "| politicas barridas:", bar["total"], "| mejor:", bar["mejorCuenta"], "de", N_PARIDAD)
    print("mejor politica:", bar["mejorPolitica"])
    for k in ("E-S1", "E-S2", "E-S3", "E-S4", "E-S5", "E-S9", "MEJOR_SIN_PAPELES"):
        print("  grande", k, "%.4f" % tasas[k]["pasa"])


if __name__ == "__main__":
    main()
