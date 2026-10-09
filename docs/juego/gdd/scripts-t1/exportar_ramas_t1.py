# -*- coding: utf-8 -*-
"""Exporta a JSON la RAMA de la revelacion y la CLASE de registro de cada estado del Tema 1, para la PARIDAD de ramas-t1.ts.

Corre con:  python exportar_ramas_t1.py     (con `python`, no `python -I`)

Importa ramas_t1.py (estados, `ramas_de`, `clase`, `cierre_de`, `regla5`) y escribe
src/lib/juego/psicoestadistica/fixtures/ramas-t1.json (a un .tmp y luego os.replace). La prueba `ramas-t1.test.ts`
exige que `ramaDe` y `claseDe` de TypeScript den lo mismo estado por estado.

Se quita la dimension `fichas` (3 o 2): no cambia la rama ni la clase. En el caso 5 se agregan `regla` (R5.3 a R5.9)
y `rhoPos`, que es lo que el motor TS conoce (no las cuatro banderas de banda).
"""
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import ramas_t1 as R  # noqa: E402  (reconfigura stdout)

RAIZ = os.path.abspath(os.path.join(HERE, "..", "..", "..", ".."))
DESTINO = os.path.join(RAIZ, "src", "lib", "juego", "psicoestadistica", "fixtures", "ramas-t1.json")


def principal():
    estados = []
    vistos = set()
    for s in R.todos_los_estados():
        s2 = {k: v for k, v in s.items() if k != "fichas"}
        if s["ficha"] == 5:
            s2["regla"] = R.regla5(s)
            s2["rhoPos"] = s["rhosig"] == "pos"
        ramas = R.ramas_de(s)
        if len(ramas) != 1:
            raise SystemExit("estado sin rama unica: %r -> %r" % (s, ramas))
        fila = {"estado": s2, "rama": ramas[0], "clase": R.clase(s)}
        clave = json.dumps(fila, sort_keys=True, ensure_ascii=False)
        if clave in vistos:
            continue
        vistos.add(clave)
        estados.append(fila)
    salida = {
        "ramas": R.RAMA_IDS,
        "cierres": {rid: R.cierre_de(rid) for rid in R.RAMA_IDS},
        "estados": estados,
    }
    texto = json.dumps(salida, ensure_ascii=False, separators=(",", ":"))
    os.makedirs(os.path.dirname(DESTINO), exist_ok=True)
    with open(DESTINO + ".tmp", "w", encoding="utf-8", newline="") as f:
        f.write(texto)
    os.replace(DESTINO + ".tmp", DESTINO)
    print("ramas", len(R.RAMA_IDS), "estados", len(estados), "escrito", DESTINO, len(texto), "bytes")


if __name__ == "__main__":
    principal()
