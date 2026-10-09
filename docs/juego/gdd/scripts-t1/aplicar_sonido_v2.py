# -*- coding: utf-8 -*-
"""Aplica a 07-sonido.md los ajustes I4 y C8 del critico v15 (sonido v2).
Uso: python -I -X utf8 aplicar_sonido_v2.py
Idempotente: si un cambio ya esta aplicado, lo salta. Escribe por .tmp + os.replace
y conserva los finales de linea CRLF del archivo."""
import os
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
RUTA = os.path.join(os.path.dirname(AQUI), "07-sonido.md")

with open(RUTA, "rb") as f:
    crudo = f.read()
texto = crudo.decode("utf-8")
n_crlf = texto.count("\r\n")
n_lf = texto.count("\n")
if n_crlf != n_lf:
    sys.exit("Finales de linea mezclados: CRLF=%d LF=%d" % (n_crlf, n_lf))
t = texto.replace("\r\n", "\n")

C = []  # (id, viejo, nuevo, veces)


def c(i, viejo, nuevo, veces=1):
    C.append((i, viejo, nuevo, veces))


# Cabeceras (C8i) y titulos (C1 / ajuste 29)
c("cab1", "· sonido · versión 1 · 08-10-2026",
  "· sonido · versión 2 (ajustes del crítico v15: I4 y C8) · 08-10-2026")
c("cab2", "la narrativa v2 (`05`, «Tema 1 · narrativa»: NT1.1 a NT1.11), el bucle (`02`, «Tema 1 · bucle y mecánicas v1»), el aprendizaje (`04`, «Tema 1 · aprendizaje v1»)",
  "la narrativa v3.1 (`05`, «Tema 1 · narrativa»: NT1.1 a NT1.11), el bucle (`02`, «Tema 1 · bucle y mecánicas v2»), el aprendizaje (`04`, «Tema 1 · aprendizaje v2.1»)")
c("tit4", "Caso 4 · Dos encuestas, un titular", "Caso 4 · Dos estudios, una sola cita", 2)
c("tit6", "Caso 6 · El titular de los 480", "Caso 6 · Los 480 de la frase", 2)

# Decision 2 (C8a) y decisiones condicionales
c("dec2", "los 8 efectos más simples (clics, teclas, ticks, notas de las fichas)",
  "los 9 efectos más simples (E01 a E05 y E10 a E13: clics, teclas, ticks, campanilla de ayuda, notas de las fichas)")
c("dec45", "Si no le gusta el rumbo, no se gastó el resto.",
  "Si no le gusta el rumbo, no se gastó el resto.\n"
  "4. **Condicional, no aplicado: ¿qué elige Ronald para la jefa (`06` I2)?** Si elige la opción A (la jefa en la sala, sin vidrio ni sello; el cierre es una firma a lapicera con el timbre del colegio), **E04 pasa a pluma y timbre**: el rasgueo de la pluma y el golpe de un timbre, con el mismo timbre para los tres botones y un tono neutro distinto cada uno (como ya dice E04 desde la v2). Hasta que decida, E04 queda como está en el kit.\n"
  "5. **Condicional, no aplicado: ¿qué elige Ronald en el caso 5 (`06` I7)?** Si elige lo recomendado (la aprobación del turno 1 pasa a Beto o a Ugarte y la jefa contesta con una pregunta), **se quita E08 del turno 1 de S5** y la excepción de S.0 sobre el pulgar del caso 5 desaparece. Hasta que decida, S5 queda como está.")

# S.0: reaccion visible y condicional del caso 5
c("s0reac", "- **Sin sonido el juego se entiende igual:**",
  "- **Acierto y error se deciden por la reacción que se ve, no por la acción del alumno** (`06` C8e). En algunas versiones «Firmar tal cual» es justo lo que la jefa aprueba, y entonces suena E08; en otras, lo que se ve es la llamada o el sobre. Nunca se ata un efecto a «firmaste tal cual» ni a «redactaste». E06 (sobre) y E07 (teléfono) suenan igual en toda versión.\n"
  "- **Sin sonido el juego se entiende igual:**")
c("s0cond", "el aviso suena igual, porque acompaña al mundo y no a la verdad.",
  "el aviso suena igual, porque acompaña al mundo y no a la verdad. *(Condicional: si Ronald elige lo recomendado en `06` I7, esta excepción desaparece; ver Decisión 5.)*")

# Peso (C8b)
c("peso", "cada recorte de 25 a 50 s en mp3 de ~96 kbps pesa entre 300 y 600 KB; una escena carga solo su pista. Con 11 escenas son unos 4 a 6 MB en total, y se carga",
  "las 11 pistas pedidas suman 528 s (de 36 a 67 s cada una); a ~96 kbps (unos 12 KB por segundo) pesan entre 0,4 y 0,8 MB cada una y unos **6,2 MB en total** (cuenta del crítico v15, `06` C8b; no son «4 a 6»). Una escena carga solo su pista, y se carga")

# Kit
c("e04", "Tres variantes por botón, **iguales en toda versión**: Firmar tal cual = golpe sordo de sello; Redactar = campanita de máquina de escribir; Frenar = clic de freno.",
  "Los tres botones con **el mismo timbre** (un clic corto de onda de pulso) y un **tono neutro distinto** cada uno (Firmar tal cual = grave, Redactar = medio, Frenar = agudo); **iguales en toda versión**, sin carga de «bueno» ni de «malo» (`06` I4.1). *Condicional (Decisión 4): con la opción A en la jefa pasaría a pluma y timbre.*")
c("e06", "Deslizar de papel y golpe suave sobre la mesa. | [F] |",
  "Deslizar de papel y golpe suave sobre la mesa; **idéntico para todo sobre**, diga lo que diga, y solo cuando el sobre se ve caer. | [F] |")
c("e07", "Doble tono clásico de teléfono en 8 bits, tres timbres; solo suena **junto a la llamada visible**.",
  "Doble tono clásico de teléfono en 8 bits, un timbre por quien llama; solo suena **junto a la llamada visible**.")

# S0: Dani (I4.2)
c("dani", "un «zzz» de tres notas triangulares descendentes muy bajo, solo cuando la silueta se duerme.",
  "un soplo de aire suave (ruido filtrado) con un pulso agudo muy bajo, **sin notas descendentes** para que no se parezca a E09, el aviso de error (`06` I4.2); suena solo cuando la silueta se duerme.")

# S1 (C8c)
c("s1ten", "cuando aparece «¿Firmar? Después no hay vuelta.» al final del paso. Acierto/error:",
  "cuando se gastan las 3 fichas sin haber hallado nada (el contador en 0 se ve en pantalla). El paso 1 no tiene botón de firmar ni «¿Firmar?» (P1.6, sin sellar; `06` C8c). Acierto/error:")
c("s1efe", "E04 (Firmar tal cual), E05, E10 (aparecen los tubos).",
  "E10 (aparecen los tubos), E06 (cae el sobre `S-P1`). No lleva E04 ni E05: el paso no sella.")

# S2 (I4.4, C8c, C8d, C8e)
c("s2tab", "| Mi menor | Frío, hueco, incómodo |", "| Mi menor | Curioso y neutro, de comparar fechas |")
c("s2ani", "Algo frío y hueco: un número «lindo» que suena demasiado limpio. **Tensión:** firmar «cero denuncias» con el corcho de fechas a la vista. **Revelación:** la madre llama (si firmó tal cual) o el papel cuelga en el corcho con su hilo.",
  "Curioso y neutro: rebuscar y comparar fechas en un corcho, sin saber aún si el número es cierto (en 1 de cada 3 versiones el cero es cierto; el ánimo no desconfía por adelantado, `06` I4.4). **Tensión:** firmar «cero denuncias» con el corcho de fechas a la vista. **Revelación:** la madre llama (en las versiones donde esa es la reacción) o el papel cuelga en el corcho con su hilo.")
c("s2pis", "Una nota larga y hueca de triángulo que se repite como un conteo («cero»), arpegio cuadrado seco, ruido apenas audible.",
  "Una nota larga de triángulo que se repite como un conteo parejo, arpegio cuadrado seco, ruido apenas audible; neutra, sin sonar a duda.")
c("s2cap", "Acierto = E08 al pulgar arriba (si redactó con las dos piezas pedidas). Error = E09 + **el teléfono** (E07) si firmó tal cual; el bajo se calla un compás.",
  "Acierto = E08 cuando la jefa levanta el pulgar (la reacción que se ve: el bucle paga con **una** pieza del clave, R2.3, y en el tipo B también paga firmar tal cual). Error = E09 cuando la jefa esconde la cabeza, y **el teléfono** (E07) solo cuando suena la llamada de la señora Quiroga; el bajo se calla un compás. Se decide por la reacción, nunca por la acción (S.0).")
c("s2efe", "E01, E02, E03, E04, E05, E10. Propios: **colgar el papel",
  "E01, E02, E04, E05, E10, E06 (cae el sobre). Sin E03: en este caso no se escribe un número. Propios: **colgar el papel")
c("s2prom", "a cold, hollow feeling in a school office at night, a too-clean number on a report that does not feel right. 76 BPM, E minor. A single long hollow triangle-wave note repeating like a count,",
  "searching and comparing dates on a cork board in a school office at night, curious and neutral, not yet knowing if a number on a report is true. 76 BPM, E minor. A single long triangle-wave note repeating like a steady count,")
c("s2prom2", "[0:00-0:25] 8 bars, hollow uneasy loop;", "[0:00-0:25] 8 bars, curious searching loop;")

# S3 (I4.5, C8c)
c("s3efe", "E01, E02, E03, E04, E05, E10. Propio: **la máquina de tandas**",
  "E01, E02, E03, E04, E05, E10, E06 (cae el sobre), E07 (llama la docente, solo con el globo en pantalla). Propio: **la máquina de tandas**")
c("s3rango", "**escribir el rango**, dos notas, una grave y otra aguda, que se acercan o se alejan según lo ancho del rango que se ve (el ancho ya se ve, no se juzga).",
  "**escribir el rango** usa E03 (siempre el mismo tono); no hay sonido propio que reaccione al ancho, para que nadie lo tantee con el oído (`06` I4.5).")

# S4 (C8c, C8g)
c("s4efe", "E01, E02, E04, E05, E10. Propio: **abrir la lista",
  "E01, E02, E04, E05, E10, E06 (cae el sobre), E07 (llama la coordinadora, solo con el globo en pantalla). Propio: **abrir la lista")
c("s4cap", "una voz calla, queda la otra sola con el bajo.",
  "una voz calla, queda la otra sola con el bajo. La voz que calla alterna por versión (A o B) y no depende de cuál estudio es el bueno (`06` C8g).")

# S5 (I4.3)
c("s5cap", "Calma/turno 1 = A (cálido, mayor). **Turno 2 = B** (la misma melodía en menor, el bajo se calla, queda solo el arpegio). Duda = B más lenta (se baja un tono el arpegio).",
  "Calma/turno 1 = A (cálido, mayor). **El turno 2 empieza también en A**, en mayor y con bajo, igual para todos: el sonido no anuncia nada antes de que el mundo hable. **Pasa a B** (la misma melodía en menor, el bajo se calla, queda solo el arpegio) **recién cuando llega la llamada del director vecino o la nota de la tallerista**, es decir, cuando ya se ve (`06` I4.3). B es solo eso; la Duda deja de llamarse B: **Duda = A con el arpegio un tono más bajo** (variación de A, sin sección propia).")
c("s5cond", "E08 suena igual (es lo que muestra el mundo; ver S.0).",
  "E08 suena igual (es lo que muestra el mundo; ver S.0). *Condicional (Decisión 5): si Ronald elige lo recomendado en `06` I7, se quita este E08 del turno 1.*")
c("s5efe", "E01, E02, E03, E04, E05, E10, E11. Propios:",
  "E01, E02, E03, E04, E05, E10, E11, E06 (cae el sobre; `S-E5e` no lleva sobre). Propios:")

# S6
c("s6efe", "E01, E02, E03, E04, E05, E10. Propio: **contar un papel**",
  "E01, E02, E03, E04, E05, E10, E06 (cae el sobre). Propio: **contar un papel**")

# S7 (C8f)
c("s7pis", "Arpegio de pulso en escalera lenta, bajo triangular sostenido, ruido tenue de regla.",
  "Arpegio de pulso en patrón plano y parejo (dos notas que alternan, sin subir ni bajar de a escalones), bajo triangular sostenido, ruido tenue de regla.")
c("s7cui", "para no avisar si el gráfico engaña.",
  "para no avisar si el gráfico engaña (`06` C8f: el arpegio en escalera se cambió por uno plano).")
c("s7prom", "Slow pulse-wave arpeggio in a gentle stair-step pattern,",
  "Slow pulse-wave arpeggio in a flat, even pattern that alternates between two notes without climbing or stepping,")
c("s7efe", "E01, E02, E03, E04, E05, E10. Propio: **abrir la hoja de datos**",
  "E01, E02, E03, E04, E05, E10, E06 (cae el sobre). Propio: **abrir la hoja de datos**")

# S8 (C8c)
c("s8efe", "E01, E02, E04, E05, E10. Propios: **poner un papel sobre la mesa** (golpe suave de papel, igual para cualquiera), **teléfono de Ugarte** (E07), **pasar el calendario** (volteo de página).",
  "E01, E02, E04, E05, E10, E06 (cae el sobre, cuando lo hay). Propios: **poner un papel sobre la mesa** (golpe suave de papel, igual para cualquiera), **pasar el calendario** (volteo de página). Sin E07: Ugarte habla en la sala y no hay llamada (`06` C8c).")

# S10 (C8h)
c("s10cap", "**Plaza fija** y **otro trimestre de prueba** usan el mismo aviso corto (E13) para no premiar ni castigar: no hay nota (G6).",
  "En **plaza fija** y **otro trimestre de prueba** no se usa E13 (es el clic de silenciar, de interfaz): suena solo lo que el mundo muestra (S.0), es decir E08 si la jefa levanta el pulgar en la plaza fija y ningún aviso si no hay pose. La cola de la música es la misma en los dos. No hay nota (G6). El crítico decide si ese E08 premia (`06` C8h).")
c("s10efe", "E13, E12 final (la octava nota sostenida).",
  "E13 (solo silenciar), E12 final (la octava nota sostenida), E08 (solo en la plaza fija, con el pulgar a la vista).")

# S.4 / S.5 / lista
c("s4dec", "4. **La licencia de Flow Music** (suya). Hasta entonces: solo pruebas, nada se integra.",
  "4. **La licencia de Flow Music** (suya). Hasta entonces: solo pruebas, nada se integra.\n"
  "5. **Las dos decisiones condicionales** (Decisiones 4 y 5): la jefa de `06` I2 (si elige A, E04 pasa a pluma y timbre) y el caso 5 de `06` I7 (si elige lo recomendado, se quita E08 del turno 1). No están aplicadas.")
c("avnarr", "No se tocó ningún texto del alumno.",
  "No se tocó ningún texto del alumno. *Narrativa (v15 I4.4):* el ánimo del caso 2 pasó a curioso y neutro; encaja con la jefa que dice «número redondo» (ajuste 28 de NT1.11).")
c("lista", "## Lista de salida · Tema 1 · sonido v1", "## Lista de salida · Tema 1 · sonido v2")
c("listafila", "| Licencia pendiente de Ronald, dicha en el documento |",
  "| Ajustes del crítico v15: I4 (cinco sonidos que juzgan) y C8 (huecos y descuidos) | I4.1 en E04; I4.2 en S0; I4.3 en S5; I4.4 en S1 y S2; I4.5 en S3; C8a en Decisión 2; C8b en «Peso»; C8c en S1 a S8 y E06/E07; C8d y C8e en S2 y S.0; C8f en S7; C8g en S4; C8h en S10; C8i en cabeceras. Búsqueda con Grep de cada cambio | ✔ (a mano; el crítico recuenta con script) |\n"
  "| C6 (dos líneas de la jefa y de Ugarte) | **No toca al sonido:** `07` no cita ninguna de las dos frases (Grep de «una tanda no sabes» y «todavía se puede»: 0); las corrige `disenador-narrativo` | ✔ (no aplica) |\n"
  "| Decisiones de Ronald sin resolver (jefa `06` I2; caso 5 `06` I7) | Decisiones 4 y 5 de este archivo, marcadas «condicional, no aplicado» | ✘ pendiente de Ronald |\n"
  "| Licencia pendiente de Ronald, dicha en el documento |")

errores = []
for i, viejo, nuevo, veces in C:
    n_viejo = t.count(viejo)
    if n_viejo == 0 and t.count(nuevo) >= 1:
        print("ya aplicado:", i)
        continue
    if n_viejo != veces:
        errores.append("%s: se esperaban %d coincidencias y hay %d" % (i, veces, n_viejo))
        continue
    t = t.replace(viejo, nuevo)
    print("aplicado:", i)

if errores:
    print("\n".join(errores))
    sys.exit("No se escribio nada.")

salida = t.replace("\n", "\r\n").encode("utf-8")
tmp = RUTA + ".tmp"
with open(tmp, "wb") as f:
    f.write(salida)
os.replace(tmp, RUTA)
print("OK, bytes:", len(salida))
