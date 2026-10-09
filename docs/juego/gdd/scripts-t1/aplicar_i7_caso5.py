import os, sys
P = r"C:\Users\lmigu\SynologyDrive\12.NUBES\OneDrive\UNIFRANZ\1.MATERIAS\RON_DOC\docs\juego\gdd\05-mundo-y-narrativa.md"
raw = open(P, "rb").read()
crlf = b"\r\n" in raw
t = raw.decode("utf-8").replace("\r\n", "\n")
if "Decidido (Ronald, 08-10) I7" in t:
    print("ya aplicado"); sys.exit(0)

def rep(old, new):
    global t
    assert t.count(old) == 1, (t.count(old), old[:60])
    t = t.replace(old, new)

rep("(4) **Pendiente Ronald:** dos preguntas de gusto, abajo.",
    "(4) **Decididas por Ronald (08-10):** las dos preguntas de gusto (I2 en A; I7 en lo recomendado), abajo.")
rep("la 1 quedó **decidida (A, 08-10)** y está aplicada en NT1.1, NT1.3 y NT1.5; la 2 sigue pendiente (de gusto; esta versión NO la resuelve, deja los textos como estaban y marca cada lugar con «pendiente Ronald»):",
    "las dos quedaron **decididas el 08-10**: la 1 (A) está aplicada en NT1.1, NT1.3 y NT1.5; la 2 (lo recomendado) está aplicada en NT1.6, caso 5, turnos 1 y 2:")
i = t.index("> 2. **Caso 5, turno 1: ¿quién aprueba (a) y (b)?**")
j = t.index("\n", i)
t = t[:i] + ("> 2. **DECIDIDO (Ronald, 08-10) I7, lo recomendado: caso 5, turno 1.** Se mantiene la trampa, pero la aprobación de (a) y (b) la da Beto («Son los que más lo necesitaban. A ojo se ve.») y no la jefa. La jefa contesta con una pregunta neutra, sin pose de pulgar ni aprobación. En el turno 2, si el alumno eligió (a) o (b), la jefa dice «Yo también dije que sí.» (la vergüenza queda compartida). `disenador-de-sonido` quita el E08 del turno 1 (`07`, Decisión 5)." ) + t[j:]

rep("- **Reacciones del turno 1:** (a) o (b): jefa, pulgar arriba: «Los que más lo necesitan. Bien.» *(es la trampa: la aprobación llega.)* (c): director Ugarte, por teléfono: **«¿Por qué dejas a 13 sin ayuda?»** (−3 Voz).\n- **Beto (si eligió (a) o (b)):** «Son los que más lo necesitaban. A ojo se ve.»\n",
    "- **Reacciones del turno 1:** (a) o (b): **Beto**, taza en mano: **«Son los que más lo necesitaban. A ojo se ve.»** *(es la trampa: la aprobación llega, pero de quien aprueba sin papeles.)* La jefa, sin pose de pulgar, destapa el termo y pregunta, sin aprobar ni desaprobar: **«Mira, antes de anotar a nadie te pregunto una sola cosa: ¿con quién los vas a comparar?»** *(sin el sonido de «va»; ver `07`.)* (c): director Ugarte, por teléfono: **«¿Por qué dejas a 13 sin ayuda?»** (−3 Voz).\n")
rep("- **Pendiente Ronald (I7, recomendado):** la aprobación de (a) y (b) pasa de la jefa a Beto o a Ugarte, la jefa contesta con una pregunta neutra y, en el turno 2, dice «Yo también dije que sí.» si eligió (a) o (b). Ver las decisiones pendientes de arriba.",
    "- **Decidido (Ronald, 08-10) I7:** la aprobación de (a) y (b) es de Beto, la jefa contesta con una pregunta neutra y, en el turno 2, dice «Yo también dije que sí.» si eligió (a) o (b). Nota para el equipo: Beto aprueba como siempre, a ojo y sin papeles; no dice si acertó (el mundo no da la respuesta, la da el turno 2).")
rep("- **Jefa (entrada del turno 2, brazos cruzados):** «Hoja nueva. Dime cuánto subió por el taller.»",
    "- **Jefa (entrada del turno 2, brazos cruzados):** si eligió (a) o (b), primero **«Yo también dije que sí.»** y luego «Hoja nueva. Dime cuánto subió por el taller.» Si eligió (c), solo la segunda frase.")
rep("**I7 sigue como «pendiente Ronald»** (quién aprueba (a) y (b) en el turno 1 del caso 5), con el valor recomendado escrito; esos textos no cambian hasta que decida.",
    "**I7 decidida (Ronald, 08-10, lo recomendado) y aplicada:** en el caso 5, turno 1, aprueba Beto, la jefa pregunta neutra y en el turno 2 dice «Yo también dije que sí.».")
rep("| I7 (caso 5, turno 1) | **✘** | pendiente | **Decisión de gusto de Ronald**, no se resuelve aquí; queda escrita con valor recomendado al inicio de la sección y en NT1.6. Cuenta como ✘ hasta que decida |",
    "| I7 (caso 5, turno 1) | ✔ | a mano | Decidido por Ronald (08-10, lo recomendado) y aplicado en NT1.6, caso 5: turno 1 aprueba Beto, la jefa pregunta neutra; turno 2 «Yo también dije que sí.»; trampa y números intactos |")
rep("hay **3 ✘ pendientes** (I7 que decide Ronald; los supuestos del generador Q1 a Q9 de `04` T1.8, que se prueban en construcción; y la legibilidad en pantalla)",
    "hay **2 ✘ pendientes** (los supuestos del generador Q1 a Q9 de `04` T1.8, que se prueban en construcción; y la legibilidad en pantalla)")
rep("Ninguno es un error del texto; son cosas que otra etapa o Ronald deben cerrar.", "Ninguno es un error del texto; son cosas que otra etapa debe cerrar.")
rep("pulgar arriba cuando va al informe.\n", "pulgar arriba cuando va al informe. En el caso 5, turno 1, no usa ninguna pose de aprobación (I7).\n")
out = t.replace("\n", "\r\n") if crlf else t
bad = [c for c in out.encode("utf-8") if c < 32 and c not in (10, 13, 9)]
assert not bad
open(P + ".tmp", "wb").write(out.encode("utf-8"))
os.replace(P + ".tmp", P)
print("ok", crlf)
