import os
base = os.path.dirname(os.path.abspath(__file__))
gdd = os.path.dirname(base)
juego = os.path.dirname(gdd)

def leer(p):
    with open(p, encoding="utf-8", newline="") as f:
        return f.read()

def guardar(p, t):
    with open(p + ".tmp", "w", encoding="utf-8", newline="") as f:
        f.write(t)
    os.replace(p + ".tmp", p)

# 02: nota I2/I7 de la narrativa
p02 = os.path.join(gdd, "02-bucle-y-mecanicas.md")
t = leer(p02)
v1 = "recomendado sacarle vidrio y sello (decide Ronald, valor recomendado A del crítico)"
n1 = "DECIDIDO A por Ronald el 08-10 (sin vidrio ni sello; termo, frases largas, lapicera y timbre)"
v2 = "(3) **I7:** caso 5, turno 1: la aprobación de (a) y (b) no debe venir de la jefa."
n2 = "(3) **I7:** caso 5, turno 1: la aprobación de (a) y (b) no debe venir de la jefa. DECIDIDO por Ronald el 08-10: la da Beto, la jefa solo pregunta y en el turno 2 dice «Yo también dije que sí.»."
c = 0
for v, n in ((v1, n1), (v2, n2)):
    if v in t and n not in t:
        t = t.replace(v, n); c += 1
guardar(p02, t); print("02 cambios:", c)

# 06: nota del crítico, al inicio de la entrada v15 (decisiones)
p06 = os.path.join(gdd, "06-revisiones.md")
t = leer(p06)
marca = "**DECIDIDAS 08-10 (Ronald):**"
if marca in t:
    print("06 ya estaba")
else:
    ancla = "Ninguna pregunta de gusto nueva. Dos cosas que conviene que veas en simple"
    nota = ("**DECIDIDAS 08-10 (Ronald):** (1) la jefa, opción A (sin vidrio ni sello). (2) caso 5, turno 1: aprueba Beto, la jefa solo pregunta, "
            "y en el turno 2 dice «Yo también dije que sí.». Aplicadas en `05` y `07`. Sin pendientes de gusto.\r\n\r\n")
    if ancla in t:
        t = t.replace(ancla, nota + ancla, 1); guardar(p06, t); print("06 ok")
    else:
        print("06: ancla no encontrada")

# RETOMAR
pr = os.path.join(juego, "RETOMAR.md")
t = leer(pr)
marca = "PREGUNTAS DE GUSTO CERRADAS 08-10"
if marca in t:
    print("RETOMAR ya estaba")
else:
    t = t.rstrip("\r\n") + "\n\n> **" + marca + " (Ronald):** jefa opción A y caso 5 turno 1 con aprobación de Beto, ya aplicadas en `05` y `07`. Con eso no queda ninguna pregunta de gusto. **Sigue:** presentar el plan completo del Tema 1 en simple a Ronald (meta 65/65 por defecto) y esperar su aprobación (candado `plan:` en `content/islas.ts`). Pendientes suyos: licencia de Flow Music; descarga de «Late Night Office» (el MP3 no apareció en Descargas de esta PC, comprobar en qué PC está el Chrome 'Browser 2').\n"
    guardar(pr, t); print("RETOMAR ok")
