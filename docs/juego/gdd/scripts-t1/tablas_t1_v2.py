# -*- coding: utf-8 -*-
"""Tablas del bucle v2 del Tema 1 (Psicoestadistica Descriptiva, Psicologia) como DATOS.

Las usan contar_t1_v2.py (comprueba el documento 02 contra estos datos) y simular_t1_v2.py
(simulacion). Cualquier numero que cambie en 02 se cambia aqui y se vuelve a correr.

Efectos: (Credibilidad, Voz). Tipos: P = con problema, B = bien, A = aun no se sabe.
Todo sale de 05 (reacciones del caso, NT1.6), 06 v13 (arreglos), 06 v14 (tablas v2).
"""

# ---- Metas y marcas -------------------------------------------------------------
META = 65          # C >= 65 y Voz >= 65 al cierre (G6, "plaza fija")
MARCA_FICHAS = 25  # a 25 o menos de C o de Voz, el caso siguiente tiene 2 fichas
INICIO = 50

# ---- G7: las 10 tiradas (caso 3, caso 6, caso 7) ----------------------------------
TIRADAS = [
    ("B", "B", "P"), ("B", "P", "P"), ("P", "B", "P"), ("B", "A", "P"), ("A", "B", "P"),
    ("P", "P", "B"), ("P", "B", "B"), ("B", "P", "B"), ("P", "A", "B"), ("A", "P", "B"),
]

# ---- Filas de efecto: id -> {tipo_o_condicion: (C, V)} ------------------------------
# La clave del dict interno es el tipo (P, B, A) o "*" si no depende del tipo.
FILAS = {
    # Caso 2 (P en 2 de 3 versiones, B en 1 de 3)
    "R2.1":     {"P": (-20, 10), "B": (10, 10)},   # firmar tal cual (B: con el clave abierto)
    "R2.1.sin": {"B": (5, 5)},                      # B, firmar tal cual sin abrir el clave (G5)
    "R2.2":     {"P": (3, -8), "B": (0, -15)},      # frenar
    "R2.3":     {"P": (8, 4), "P con refuerzo": (10, 4), "B": (10, 10)},   # frase con la pieza del clave
    "R2.4":     {"P": (-8, 4), "B": (0, 4)},        # frase sin la pieza del clave
    # Caso 3
    "R3.P":     {"tal cual": (-20, 10), "frenar": (6, -8), "ok con pieza": (8, 4),
                 "ok sin pieza o flojo": (3, 0), "noCubre": (-10, 4), "ancho": (0, -2)},
    "R3.B":     {"tal cual": (10, 10), "frenar": (0, -15), "ok con pieza": (0, 4),
                 "ok sin pieza o flojo": (0, 2), "noCubre": (-10, 4), "ancho": (0, -2)},
    "R3.B.sin": {"tal cual": (5, 5)},               # G5
    "R3.A.sin": {"tal cual": (-20, 10), "frenar": (0, -10), "rango sin pieza": (-8, 4),
                 "noCubre": (-10, 4), "ancho": (0, -2)},
    "R3.A.con": {"ok con pieza": (8, 4), "flojo con pieza": (3, 0), "noCubre": (-10, 4),
                 "ancho": (0, -2)},
    # Caso 4
    "R4.1":     {"*": (10, 10)},
    "R4.1.sin": {"*": (5, 5)},                      # G5
    "R4.2":     {"*": (8, 4)},
    "R4.2.sin": {"*": (4, 2)},                      # G5
    "R4.3":     {"*": (-20, 10)},
    "R4.4":     {"*": (-20, 4)},
    "R4.5":     {"*": (0, -10)},
    # Caso 5 (turno 1: R5.1, R5.2; turno 2: R5.3 a R5.9)
    "R5.1":     {"*": (0, 0)},
    "R5.2":     {"*": (0, -3)},
    "R5.3":     {"*": (2, -6)},
    "R5.4":     {"*": (-20, 4)},
    "R5.5":     {"*": (-20, 4)},
    "R5.6":     {"*": (12, 6)},
    "R5.7":     {"*": (6, 3)},
    "R5.8":     {"*": (4, 2)},                      # G5
    "R5.9":     {"*": (-10, 0)},
    # Caso 6
    "R6.1":     {"P": (-20, 10), "A": (-20, 10), "B": (10, 10)},
    "R6.1.sin": {"B": (5, 5)},                      # G5
    "R6.2":     {"P": (6, -8), "A": (0, -10), "B": (0, -15)},
    "R6.3":     {"P": (2, 1), "B": (0, 2), "A": (0, 1)},
    "R6.4":     {"P": (-8, 4), "A": (-8, 4), "B": (0, 4)},
    "R6.5":     {"P": (8, 4), "A": (8, 4), "B": (10, 10)},
    "R6.6":     {"*": (-10, 0)},                    # se suma a lo anterior
    # Caso 7
    "R7.1":     {"P": (-10, 10), "B": (10, 10)},
    "R7.2":     {"P": (-20, 10), "B": (4, 10)},
    "R7.3":     {"P": (8, 4), "B": (0, -4)},
    "R7.4":     {"P": (-8, 4), "B": (-6, -4)},
    "R7.5":     {"P": (6, -8), "B": (0, -15)},
    # Caso 8
    "R8.1":     {"*": (12, 8)},
    "R8.2":     {"*": (6, 4)},
    "R8.3":     {"*": (0, 0)},                      # G5
    "R8.4":     {"*": (-20, 6)},
    "R8.5":     {"*": (-15, 6)},
    "R8.6":     {"*": (-15, -8)},
    "R8.7":     {"*": (-10, -6)},
    "R8.8":     {"*": (0, -8)},
}

# Filas por caso (para contar)
FILAS_POR_CASO = {2: 5, 3: 5, 4: 7, 5: 9, 6: 7, 7: 5, 8: 8}

# G5: las 7 filas nombradas de "acierto sin evidencia"
G5_FILAS = ["R2.1.sin", "R3.B.sin", "R4.1.sin", "R4.2.sin", "R6.1.sin", "R5.8", "R8.3"]
# Las cinco primeras valen la mitad (redondeo hacia cero) de su fila con evidencia
G5_MITAD = {"R2.1.sin": ("R2.1", "B"), "R3.B.sin": ("R3.B", "tal cual"),
            "R4.1.sin": ("R4.1", "*"), "R4.2.sin": ("R4.2", "*"), "R6.1.sin": ("R6.1", "B")}

# ---- Codigos de error y habitos: UNA SOLA TABLA (hallazgo I1 de v15) ------------------
# codigo -> (descripcion corta, habitos)
CODIGOS = {
    "E2a": ("firmo tal cual con problema", ["H1", "H2"]),
    "E2b": ("freno con problema sin abrir el clave", ["H1"]),
    "E2c": ("frase sin la pieza del clave", ["H3"]),
    "E2d": ("freno en B (el cero se sostenia)", ["H3"]),
    "E3a": ("firmo tal cual con 1 tanda o menos", ["H1", "H2"]),
    "E3b": ("rango que no cubre", ["H4"]),
    "E3c": ("rango ancho", ["H3"]),
    "E3d": ("freno en B", ["H3"]),
    "E3e": ("rango en A sin la pieza", ["H4"]),
    "E3f": ("rango bueno en P o B sin la pieza", ["H1"]),
    "E4a": ("eligio sin abrir ninguno de los 4 papeles que destapan", ["H1", "H2"]),
    "E4b": ("eligio B siendo A el bueno habiendo visto que lo era", ["H3"]),
    "E4c": ("ninguna", ["H3"]),
    "E5a": ("subida bruta", ["H4"]),
    "E5b": ("inflado", ["H4"]),
    "E5c": ("sin comparar", ["H1"]),
    "E5d": ("escribio 0 con la comparacion abierta y rho mayor que 1", ["H3"]),
    "E5e": ("aconsejo (a) o (b) en el turno 1", ["H4"]),
    "E6a": ("N mal contado", ["H4"]),
    "E6b": ("tal cual en P o A", ["H2"]),
    "E6c": ("podrian sin motivo", ["H3"]),
    "E6d": ("freno en B", ["H3"]),
    "E7a": ("x incorrecto (escribio lo que se ve)", ["H4"]),
    "E7b": ("tal cual en P", ["H2"]),
    "E7c": ("redisenio o freno en B", ["H3"]),
    "E8a": ("decidio con menos de 2 claves sobre la mesa", ["H1"]),
    "E8b": ("espero cuando se podia decidir", ["H3"]),
    "E8c": ("financio o no financio contra la evidencia", ["H4"]),
    "E8d": ("coincidio con el colega o lo contradijo contra la evidencia", ["H3", "H4"]),
}
CODIGOS_POR_CASO = {2: 4, 3: 6, 4: 3, 5: 5, 6: 4, 7: 3, 8: 4}
HABITOS_ESPERADOS = {"H1": 7, "H2": 5, "H3": 12, "H4": 9}  # cuenta con E8d en H3 y en H4
# Codigos sin sobre propio (solo registro): S-E5e y S-E8d. Sobres = S-P1 + 29 codigos = 30.
SIN_SOBRE = ["E5e", "E8d"]


def efecto(fila, clave="*"):
    return FILAS[fila][clave]


def fmt(ce):
    """Formato del documento: signo menos U+2212 y mas explicito, 'C/V'."""
    def n(x):
        if x > 0:
            return "+%d" % x
        if x < 0:
            return "−%d" % (-x)
        return "0"
    return "%s/%s" % (n(ce[0]), n(ce[1]))
