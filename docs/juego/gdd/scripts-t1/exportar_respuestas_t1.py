# -*- coding: utf-8 -*-
"""Exporta a JSON los estados de cada caso del Tema 1 con su pago y sus codigos, para la PARIDAD de respuestas.ts.

Corre con:  python exportar_respuestas_t1.py     (con `python`, no `python -I`)

Importa ramas_t1.py (estados_N, pago_N y codigos, que recorren TODOS los estados posibles de cada caso) y escribe
src/lib/juego/psicoestadistica/fixtures/respuestas-t1.json (a un .tmp y luego os.replace). La prueba
`respuestas-paridad-t1.test.ts` lleva cada estado abstracto a una version concreta del motor TS y compara el
efecto, la fila y los codigos E.. uno por uno.

Se quita la dimension `fichas` (3 o 2): no cambia el pago ni los codigos, solo cuantas cosas se pueden abrir.
"""
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import ramas_t1 as R  # noqa: E402  (reconfigura stdout)

RAIZ = os.path.abspath(os.path.join(HERE, "..", "..", "..", ".."))
DESTINO = os.path.join(RAIZ, "src", "lib", "juego", "psicoestadistica", "fixtures", "respuestas-t1.json")


def principal():
    salida = {}
    for ficha in range(2, 9):
        vistos = set()
        filas = []
        for s in R.ESTADOS[ficha]():
            s2 = {k: v for k, v in s.items() if k != "fichas"}
            clave = json.dumps(s2, sort_keys=True)
            if clave in vistos:
                continue
            vistos.add(clave)
            fila, k, ce = R.PAGO[ficha](s)
            filas.append({"estado": s2, "fila": fila, "clave": k, "ce": list(ce), "codigos": sorted(R.codigos(s))})
        salida[str(ficha)] = filas
        print("caso", ficha, len(filas), "estados")
    texto = json.dumps(salida, ensure_ascii=False, separators=(",", ":"))
    os.makedirs(os.path.dirname(DESTINO), exist_ok=True)
    with open(DESTINO + ".tmp", "w", encoding="utf-8", newline="") as f:
        f.write(texto)
    os.replace(DESTINO + ".tmp", DESTINO)
    print("escrito", DESTINO, len(texto), "bytes")


if __name__ == "__main__":
    principal()
