# -*- coding: utf-8 -*-
"""Aplica a 05-mundo-y-narrativa.md (seccion narrativa v3) los cambios de la v3.1.
Fuentes: 04-aprendizaje.md (v2.1, T1.7b, copiado por script), 02 secc. 8.1 y 15.
Escribe por .tmp + os.replace. Aborta sin escribir si un texto viejo no esta (o esta de mas)."""
import os, re, sys

AQUI = os.path.dirname(os.path.abspath(__file__))
GDD = os.path.dirname(AQUI)
P05 = os.path.join(GDD, "05-mundo-y-narrativa.md")
P04 = os.path.join(GDD, "04-aprendizaje.md")

raw = open(P05, "rb").read().decode("utf-8")
crlf = "\r\n" in raw
txt = raw.replace("\r\n", "\n")
if "narrativa · versión 3.1" in txt:
    print("YA APLICADO: no se hace nada")
    sys.exit(0)

t04 = open(P04, "rb").read().decode("utf-8").replace("\r\n", "\n")
m = re.search(r"<!--GEN:T17B-->\n(.*?)\n<!--/GEN:T17B-->", t04, re.S)
assert m, "no esta el bloque T17B en 04"
bloque04 = m.group(1)

errores = []


def rep(old, new, count=1):
    global txt
    n = txt.count(old)
    if n != count:
        errores.append("esperaba %d y hay %d: %s" % (count, n, old[:90]))
        return
    txt = txt.replace(old, new)


# ---------------------------------------------------------------- NT1.9 (primero)
i0 = txt.index("### NT1.9 La revelación")
i1 = txt.index("### NT1.10 Lo que queda escrito")
viejo = txt[i0:i1]
j = viejo.index("**Cierre general (el camino)")
resto = viejo[j:]
resto = resto.replace("cuando se dieron vuelta las ocho**", "cuando se dieron vuelta las ocho cartas**")
resto = resto.replace("(por ficha)", "(por carta)")
nuevo9 = (
    "### NT1.9 La revelación: las 8 cartas (idea por idea, 72 ramas)\n\n"
    "**Formato.** Cada carta boca abajo, por idea. Al darla vuelta se ve **el momento del caso** (el papel que abrió o el que dejó, el número que escribió, lo que firmó) "
    "y debajo **tres líneas de 25 palabras o menos**: *Hiciste*, *Habría pasado* y *Cierre*. El **nombre técnico** se dice solo para lo que el alumno hizo o dejó de hacer. "
    "**«Carta» y no «ficha»** (v15, C7): las fichas son el tiempo del caso y el papel de cómo se obtuvo la cifra es un papel.\n\n"
    "**Los textos de abajo son los de `04-aprendizaje.md` v2.1, T1.7b, copiados tal cual con un script** (`scripts-t1/aplicar_narrativa_v31.py`, que lee el bloque entre las marcas `GEN:T17B`), "
    "para que haya una sola versión. La rama sale del cruce de `04` T1.7a (tipo × opción × papeles abiertos × pieza × regla de pago); son **72 ramas**: "
    "las 66 de la v2.1 original, las 5 del caso 2 en tipo B (F2f a F2j, que `04` ya trae con su id y su fila) y **F6k**, nueva. "
    "Esta versión incluye lo que pedía el crítico v15: **F3a** solo dice «se pudo presentar» si el rango llevó la pieza (el `ok` sin pieza va a F3b, «quedó en un anexo»); "
    "**F3k** (tipo B, rango que cubre) y **F6k** (tipo B, firmó tal cual con el clave abierto) existen; **F5h** ya no afirma que el taller cambió algo y dice «La cuenta bien hecha daba {rho}» "
    "(distingue la cuenta de la versión, ρ, del efecto real, que el alumno no ve); **F5a a F5c** no afirman causa. "
    "**Si `04` cambia, se vuelve a correr el script; no se edita a mano.** Huecos nuevos de esta revelación: `{rho}` y `{hechosA}` (NT1.4).\n\n"
    + bloque04.strip("\n")
    + "\n\n"
)
txt = txt[:i0] + nuevo9 + resto + txt[i1:]

# ---------------------------------------------------------------- cabecera y estado
rep("narrativa · versión 3 · 08-10-2026 (oficio de la carrera; alineada con el bucle v2 y el aprendizaje v2)",
    "narrativa · versión 3.1 · 08-10-2026 (oficio de la carrera; alineada con el bucle v2 y el aprendizaje v2.1)")
rep("los 27 sobres, los 8 casos y las 8 fichas.", "los 27 sobres, los 8 casos y las 8 cartas de la revelación.")
rep("más las ramas del caso 2 tipo B que `04` aún no trae (marcadas).",
    "(en la v3.1: las 72 ramas de la v2.1, ya con el caso 2 tipo B).")
rep("el aprendizaje (`04`, «Tema 1 · aprendizaje v1», T1.3 y T1.7)", "el aprendizaje (`04`, «Tema 1 · aprendizaje v2.1», T1.3 y T1.7)")
rep("el bucle (`02`, «Tema 1 · bucle y mecánicas v1», reglas G", "el bucle (`02`, «Tema 1 · bucle y mecánicas v2», reglas G")

rep("> **Estado:** entrega de la etapa de narrativa, para el crítico. Autor: diseñador narrativo. **Sin nota** en este tema.",
    "> **Qué cambió en la v3.1 (08-10-2026, sobre lo corregido en `04` v2.1 y `02` v2 §15; los ids no cambian):** "
    "(1) **Revelación:** 72 ramas, con **F3k** y **F6k**, **F3a** corregida (B1), **F5h** y **S-E5d** corregidas (B2: `E5d` exige ρ > 1), F5a a F5c sin causa (I6) y 22 textos más que cambian, todos copiados de `04` (NT1.9). "
    "(2) **Códigos, hábitos y sobres** (NT1.7): la tabla única de `02` 8.1, con 29 códigos y 30 sobres. "
    "(3) **Títulos y avisos del crítico v15:** caso 4 «Dos estudios, una sola cita» y caso 6 «Los 480 de la frase» (C1); caso 3 habla de «los estudiantes del colegio» y 480 es todo el colegio (I5a); "
    "caso 6, papel C6-2 en P y pieza `grupo` del tipo A partida en dos (I3); los cinco huecos del mundo (I5 a a e: el encargo del paso 1 y la hoja «Para empezar», Horizonte y Beto presentados, "
    "la tarjeta «Hace un mes» del caso 5, la entrada del caso 8); R8.4 a R8.7 separadas según financió o no (C5); la puerta de las tandas y las 2 fichas de Ugarte sin dar la lección (C6); "
    "`{fuente}` distinta por caso (C9); `{hechoClave}` en tres frases cortas (C3); dos globos largos partidos (C2); `S-E6b` sin el 480 (C4); «sin que nadie lo usara» (C10); «cartas» y no «fichas» (C7). "
    "(4) **Pendiente Ronald:** dos preguntas de gusto, abajo.\n"
    ">\n"
    "> **Estado:** entrega de la etapa de narrativa, para el crítico. Autor: diseñador narrativo. **Sin nota** en este tema.")

rep("> **Decisiones pendientes de Ronald: ninguna.** Hay tres propuestas de arte (NT1.3) y los ajustes de NT1.11, que el crítico mira.",
    "> **Decisiones pendientes de Ronald (2, de gusto; esta versión NO las resuelve, deja los textos como estaban y marca cada lugar con «pendiente Ronald»):**\n"
    "> 1. **La jefa se parece a Doña Teresa de AIEF** (la figura tras el vidrio, frases cortas que preguntan, aparece en cada entrada y cierre, sello). "
    "*Pendiente Ronald, recomendado A:* sacarle el vidrio y el sello. La jefa está en la sala, junto a la puerta con un termo; habla en frases más largas y de oficio («mira, con los chicos de 4.º pasó esto el año pasado…»); "
    "el cierre del informe es una firma a lapicera con el timbre del colegio, no un sello (el sonido E04 pasaría a pluma y timbre). Cuesta solo textos y un dibujo. "
    "B: que el sobre lo deje el propio colegio (un oficio, una nota de la secretaria) y que la jefa aparezca solo al arranque y al cierre. C: dejarlo así y avisar. Atenuante: AIEF es de Administración y este juego es de Psicología.\n"
    "> 2. **Caso 5, turno 1: ¿quién aprueba (a) y (b)?** Hoy la jefa levanta el pulgar y dice «Los que más lo necesitan. Bien.», que es la trampa; pero el pulgar significa «va al informe» en los otros siete casos. "
    "*Pendiente Ronald, recomendado:* mantener la trampa y que la aprobación venga de Beto («Son los que más lo necesitaban. A ojo se ve.») o del director Ugarte; la jefa contesta neutra con una pregunta («¿Con quién los vas a comparar?»), "
    "sin el sonido de «va»; y en el turno 2, si el alumno eligió (a) o (b), la jefa dice «Yo también dije que sí.» (la vergüenza queda compartida). Alternativa: dejar el pulgar y agregar solo esa frase. "
    "Quien lo aplica: `disenador-narrativo`, y `disenador-de-sonido` quita el E08 del turno 1.\n"
    "> Hay además tres propuestas de arte (NT1.3) y los ajustes de NT1.11, que el crítico mira.")

# ---------------------------------------------------------------- NT1.3
rep("Esos nombres solo salen en las fichas del final.", "Esos nombres solo salen en las cartas del final.")
rep("- **Aparece en:** arranque, entrada y cierre de cada caso, sobres, puerta de las tandas, «¿firmar?», cierre del informe.",
    "- **Aparece en:** arranque, entrada y cierre de cada caso, sobres, puerta de las tandas, «¿firmar?», cierre del informe.\n"
    "- **Pendiente Ronald (I2, recomendado A):** el parecido con la jefa de AIEF (vidrio, frases cortas, sello). Ver las decisiones pendientes de arriba; hasta que decida, esta ficha queda como está.")
rep("- **Aparece en:** casos 4, 5 y 8; cierre de la revelación.",
    "- **Aparece en:** arranque (de paso, con su taza), casos 4, 5 y 8; cierre de la revelación.")
rep("| Caso 4 (eco), caso 5 (eco), caso 8 (propone), revelación |",
    "| Arranque (de paso), caso 4 (eco), caso 5 (eco), caso 8 (propone), revelación |")
rep("**La consultora Horizonte:** externa; el colegio la contrata cuando el departamento no responde a tiempo; solo aparece en una línea («Horizonte ya entregó su informe»).",
    "**La consultora Horizonte:** externa; el colegio la contrata cuando el departamento no responde a tiempo. La jefa la presenta en el arranque («Si no contestamos a tiempo, el colegio llama a Horizonte.») y después solo aparece en una línea («Horizonte ya entregó su informe»).")

# ---------------------------------------------------------------- NT1.4
rep("| `{fuente}` | Oficina que manda el oficio, informe o estudio (antes `{agencia}`) | Pool: Dirección Distrital Meridiano · Red Escolar Corriente · Observatorio Brújula · Programa Cuadrante |",
    "| `{fuente}` | Oficina que manda el oficio, informe o estudio (antes `{agencia}`). **Una distinta por caso** (casos 3, 6 y 7; v15 C9): así ninguna fuente queda ligada a un tipo y el alumno no aprende «Meridiano miente» | Pool: Dirección Distrital Meridiano · Red Escolar Corriente · Observatorio Brújula · Programa Cuadrante |")
rep("| `{hechoClave}` | El hecho del papel clave que salió en esa versión (caso 2, tipo P; 16 palabras o menos, K1) | Una de las tres frases de C2-1, C2-2, C2-3 |",
    "| `{hechoClave}` | El hecho del papel clave que salió en esa versión (caso 2, tipo P; una frase que se lee detrás de «Viste que», de 16 palabras o menos, K1; v15 C3). Una por clave: C2-1 «desde {mes} solo se anotan las denuncias firmadas por un adulto» · C2-2 «desde {mes} la denuncia formal exige firma de un adulto» · C2-3 «las derivaciones por conflicto pasaron de {d0} a {d1}» | Generador del caso 2 |")
rep("| `{den}` | Número de filas de la hoja del caso 6 (60, 60 o 12): lo cuenta el generador, la jefa no lo dice | Hoja generada |",
    "| `{den}` | Número de filas de la hoja del caso 6 (60, 60 o 12): lo cuenta el generador, la jefa no lo dice | Hoja generada |\n"
    "| `{rho}` | La cuenta bien hecha del caso 5 de esa versión, con un decimal y su signo (carta 5, F5h y F5i). Es la cuenta de la versión, no el efecto real del taller | `bienestar.ts` (ρ) |\n"
    "| `{hechosA}` | Caso 6, tipo A: lo que dijeron los papeles que el alumno abrió: «solo 12 de 60 respondieron», «la hoja se pasó en semana de exámenes» o los dos (carta 6, F6a) | Hoja y papeles abiertos |\n"
    "| `{horasAnt}`, `{col2Ant}` | Los valores de la fila del archivo, de hace un año (paso 1): **distintos** de `{horas}` y `{col2}` de hoy, para que el asombro no parezca armado (v15 I5b). `{col2Ant}` es la misma columna que `{col2}` con otro valor | Sorteo k=10 por papel |")
rep("**Regla:** el texto del papel dice el hecho con su hueco",
    "**Qué es el 480 (v15 I5a).** Son **todos los estudiantes del colegio**, repartidos en ocho cursos. Lo que habla de «los de 4.º» es el paso 1 (el encargo y los papeles con sueño), el caso 4 (los dos estudios del distrito) y la profesora de 4.º A. "
    "El caso 3 habla de **«los estudiantes del colegio»** y de su registro de 480; el caso 6 también.\n\n"
    "**Regla:** el texto del papel dice el hecho con su hueco")

# ---------------------------------------------------------------- NT1.5 (paso 1)
rep("**Encargo (jefa):** «El director dijo en el pasillo: \"los estudiantes duermen poco\". ¿Cuántas horas duermen los de 4.º del colegio? Lo necesito para el consejo de mañana.»",
    "**Encargo (jefa), en dos globos:** «El director dijo en el pasillo: \"los estudiantes duermen poco\".» · «¿El colegio tiene algún dato sobre cuánto duermen los de 4.º? Lo necesito para el consejo de mañana.» *(v15 I5b: el encargo ahora es una pregunta que el hallazgo del papel con sueño sí contesta.)*")
rep("(la jefa las pasa en una hoja; título de la hoja: «Para empezar»):",
    "(la jefa las pasa en una hoja; título de la hoja: «Para empezar»; la jefa: «Es la hoja que llena cada estudiante al ingresar. Hoy la llenas tú.»):")
rep("«Tú, hoy» (o la de {dani}) y «Archivo, {fechaAnio}».",
    "«Tú, hoy» (o la de {dani}) y «Archivo, {fechaAnio}», con valores distintos de los de hoy (`{horasAnt}` y `{col2Ant}`).")
rep("fila de ejemplo: horas dormidas {horas} · {col2}. Fecha: {fechaAnio}. Anotado por la enfermera Elvira.»",
    "fila de ejemplo: horas dormidas {horasAnt} · {col2Ant}. Fecha: {fechaAnio}. Anotado por la enfermera Elvira.»")
rep("Fila de ejemplo: {horas} · {col2}. Fecha: {fechaAnio}.»", "Fila de ejemplo: {horasAnt} · {col2Ant}. Fecha: {fechaAnio}.»")
rep("Ejemplo: {horas} · {col2}. Fecha: {fechaAnio}.»", "Ejemplo: {horasAnt} · {col2Ant}. Fecha: {fechaAnio}.»")
rep("Jefa: «Dos medidores. Si firmas sin mirar, baja uno. Si frenas todo, baja el otro.» *(es la única frase de reglas del juego, y solo dice qué mueve qué)*.",
    "Jefa: «Dos medidores. Si firmas sin mirar, baja uno. Si frenas todo, baja el otro.» *(es la única frase de reglas del juego, y solo dice qué mueve qué)*. "
    "Luego, para presentar a Horizonte (v15 I5c): «Si no contestamos a tiempo, el colegio llama a Horizonte.» "
    "Y **Beto** pasa con su taza junto a la puerta, sin cara que juzga: «Buenas noches, doc. A ojo se ve que hoy trabajas hasta tarde.» *(ambiente; presenta a Beto y su muletilla, no opina de ningún caso.)*")

# ---------------------------------------------------------------- caso 2
rep("Cero. Es un número lindo para un consejo. Tienes la carpeta.»", "Cero. Es un número redondo. Tienes la carpeta.»")
rep("A mi hijo lo empujaron y no se podía denunciar. Dicen que el colegio es seguro.»",
    "A mi hijo lo empujaron y no se podía denunciar.» Segundo globo: «Dicen que el colegio es seguro.»")

# ---------------------------------------------------------------- caso 3
rep("#### Caso 3 · «La cifra de los de 4.º» (idea 3)", "#### Caso 3 · «La cifra del colegio» (idea 3)")
rep("«Oficio: los estudiantes de 4.º duermen {cifra} horas en promedio.»", "«Oficio: los estudiantes del colegio duermen {cifra} horas en promedio.»")
rep("**Jefa (entrada):** «Llegó un oficio de {fuente}. Tienes el registro de los 480 y la máquina de tandas: diez al azar. Cada tanda cuesta una ficha.»",
    "**Jefa (entrada), en dos globos:** «Llegó un oficio de {fuente}. Tienes el registro de los 480 estudiantes del colegio.» · «La máquina saca diez al azar por tanda. Cada tanda cuesta una ficha.»")
rep("**Puerta del rango (jefa, con 0 o 1 tanda):** «Con una tanda no sabes cuánto se mueve.»",
    "**Puerta del rango (jefa, con 0 o 1 tanda):** «Para redactar un rango necesitas 2 tandas.» *(v15 C6: antes decía la idea 3 antes de verla.)*")
rep("aparece la frase **«Los de 4.º duermen entre {a} y {b} horas.»**", "aparece la frase **«Los estudiantes del colegio duermen entre {a} y {b} horas.»**")
rep("| C3-1 | Ficha de cómo se obtuvo la afirmación |", "| C3-1 | Papel de cómo se obtuvo la afirmación |")
rep("«Ficha del oficio: lo envió {fuente} por correo; lo firma el funcionario de turno.»", "«Hoja del oficio: lo envió {fuente} por correo; lo firma el funcionario de turno.»")
rep("«Hoja del turno tarde: lista de 4.º con nombre y curso, sin respuestas.»", "«Hoja del turno tarde: lista de estudiantes con nombre y curso, sin respuestas.»")
rep("| Firmar tal cual en B con la ficha abierta (+10/+10) |", "| Firmar tal cual en B con el papel de cómo se obtuvo abierto (+10/+10) |")
rep("| Firmar tal cual en B sin abrir la ficha (+5/+5) |", "| Firmar tal cual en B sin abrir ese papel (+5/+5) |")

# ---------------------------------------------------------------- caso 4
rep("#### Caso 4 · «Dos encuestas, un titular» (idea 4)", "#### Caso 4 · «Dos estudios, una sola cita» (idea 4)")

# ---------------------------------------------------------------- caso 5
rep("**Turno 1 · aconsejas.**\n",
    "**Turno 1 · aconsejas.** Tarjeta de tiempo al entrar: **«Hace un mes, otra noche como esta.»** *(v15 I5d: el mes pasa antes del turno 2, no durante la noche.)*\n")
rep("- **Beto (si eligió (a) o (b)):** «Son los que más lo necesitaban. A ojo se ve.»",
    "- **Beto (si eligió (a) o (b)):** «Son los que más lo necesitaban. A ojo se ve.»\n"
    "- **Pendiente Ronald (I7, recomendado):** la aprobación de (a) y (b) pasa de la jefa a Beto o a Ugarte, la jefa contesta con una pregunta neutra y, en el turno 2, dice «Yo también dije que sí.» si eligió (a) o (b). Ver las decisiones pendientes de arriba.")
rep("**Turno 2 · un mes después, verificas lo tuyo.**", "**Turno 2 · un mes después, verificas lo tuyo.** Tarjeta de tiempo: **«Hoy.»**")
rep("«Pasó un mes. Hoja nueva. Dime cuánto subió por el taller.»", "«Hoja nueva. Dime cuánto subió por el taller.»")

# ---------------------------------------------------------------- caso 6
rep("#### Caso 6 · «El titular de los 480» (idea 6)", "#### Caso 6 · «Los 480 de la frase» (idea 6)")
rep("Tipo A: «con 12 respuestas en semana de exámenes aún no se sabe». *(`{curso}` = «4.º B».)*",
    "Tipo A, **una pieza por papel** (v15 I3, como en el caso 3): si abrió C6-1, «con solo 12 respuestas aún no se sabe»; si abrió C6-3, «con respuestas de la semana de exámenes aún no se sabe»; si abrió los dos, «con 12 respuestas en semana de exámenes aún no se sabe». *(`{curso}` = «4.º B».)*")
rep("| C6-2 | Composición del colegio por curso | **solo P:** «El colegio tiene ocho cursos. {curso} es uno de ellos.» |",
    "| C6-2 | Composición del colegio por curso | **solo P:** «Composición por curso. Las respuestas de esta lista son de {curso}, uno de los ocho cursos del colegio.» |")

# ---------------------------------------------------------------- caso 7
rep("Pregunta de la pantalla: **«¿A cuál recortas el presupuesto?»**", "Pregunta de la pantalla: **«¿A cuál le recomendarías recortar el presupuesto?»**")
rep("**«Con este dibujo, ¿recortarías el mismo?»**", "**«Con este dibujo, ¿le recomendarías recortar el mismo?»**")

# ---------------------------------------------------------------- caso 8
rep("**Escena.** Sala de dirección del colegio, en la reunión de presupuesto.",
    "**Entrada (jefa, al cerrar el caso anterior; v15 I5e):** «Ugarte te espera en dirección.»\n**Escena.** Sala de dirección del colegio, en la reunión de presupuesto.")
rep("**«Hoy hay menos tiempo en la reunión. Elige bien qué abres; con dos papeles todavía se puede.»**", "**«Hoy hay menos tiempo en la reunión.»** *(v15 C6: se quitó «con dos papeles todavía se puede», que revelaba que hacen falta dos.)*")
rep("| R8.4 a R8.7 (financiar o no, contra la evidencia) | Ugarte: «Lo pensaba distinto. Puse el dinero donde me dijiste.» Al año siguiente se ve el pie de la tabla. |",
    "| R8.4 y R8.5 (financió contra la evidencia) | Ugarte: «Lo pensaba distinto. Puse el dinero donde me dijiste.» Al año siguiente se ve el pie de la tabla. |\n"
    "| R8.6 y R8.7 (no financió contra la evidencia) | Ugarte: «Lo pensaba distinto. No gasté en el taller, como dijiste.» Al año siguiente se ve el pie de la tabla. *(v15 C5: antes la frase del dinero salía también cuando recomendó no financiar.)* |")

# ---------------------------------------------------------------- NT1.7 sobres: tabla unica de 02 8.1
a = txt.index("| Id | Código | Sobre (jefa, firma «X. R.») |")
b = txt.index("| S-E8d |", a)
b = txt.index("\n", b)
filas = [
    ("S-P1", "idea 1, sin abrir sueño", "—", "«Alguien en el colegio anotaba el sueño sin que nadie lo usara. ¿Quién?»"),
    ("S-E2a", "E2a · Firmó tal cual con problema (R2.1 en P)", "H1, H2", "«Cero es un número redondo. ¿Cuántas denuncias había el mes antes de que cayera?»"),
    ("S-E2b", "E2b · Frenó con problema sin abrir el clave (R2.2 en P)", "H1", "«Frenar también es una decisión. ¿Qué te falta saber para firmar?»"),
    ("S-E2c", "E2c · Frase sin ninguna pieza del clave, en P o en B (R2.4)", "H3", "«Esa frase vale para cualquier colegio. ¿Qué hay en esta carpeta que sea solo de este?»"),
    ("S-E2d", "E2d · Frenó en B: el cero se sostenía (R2.2 en B)", "H3", "«Dudaste de un cero. ¿Qué mostraba el libro de este trimestre frente al anterior?»"),
    ("S-E3a", "E3a · Firmó tal cual con 1 tanda o menos, en P o A", "H1, H2", "«Sacaste una tanda. Si pides otra, ¿te dará lo mismo?»"),
    ("S-E3b", "E3b · Rango `noCubre`", "H4", "«Otra tanda dio otra cifra. ¿Cuánto se mueve de una a otra?»"),
    ("S-E3c", "E3c · Rango `ancho`", "H3", "«Con ese rango nadie se equivoca. Tampoco nadie decide nada.»"),
    ("S-E3d", "E3d · Frenó en B", "H3", "«Dudaste de una cifra que venía de muchos. ¿Qué dice el papel de cómo se obtuvo?»"),
    ("S-E3e", "E3e · Rango en A sin la pieza (R3.A.sin)", "H4", "«Tu rango describe el registro. ¿De qué semana es ese registro?»"),
    ("S-E3f", "E3f · Rango `ok` en P o B sin la pieza", "H1", "«Tu rango cubre. ¿Qué papel dice de dónde salió la cifra de la fuente?»"),
    ("S-E4a", "E4a · Eligió sin abrir ninguno de los 4 papeles que destapan", "H1, H2", "«Cuántos respondieron te lo dice el estudio. ¿Quiénes? Eso lo dice otra hoja.»"),
    ("S-E4b", "E4b · Eligió B siendo A el bueno, habiendo abierto un papel que lo mostraba", "H3", "«Siempre la más chica, ¿no? Mira de nuevo quiénes respondieron en cada una.»"),
    ("S-E4c", "E4c · Ninguna", "H3", "«No citar ninguno es una decisión. ¿Había uno de los dos que sí se sostenía?»"),
    ("S-E5a", "E5a · Subida bruta (R5.4)", "H4", "«Qué bien suben. ¿Y los que no fueron al taller? ¿Y los del colegio de al lado?»"),
    ("S-E5b", "E5b · Inflado (R5.5)", "H4", "«Restaste a otros que bajaron. ¿Eran comparables con los 13 que llamaste?»"),
    ("S-E5c", "E5c · Sin comparar: R5.8 o R5.9 sin los papeles requeridos", "H1", "«Tu número no tiene con qué compararse. ¿Qué papel te daba una vara?»"),
    ("S-E5d", "E5d · Escribió 0 con los papeles requeridos abiertos y `ρ > 1` (v15 B2; con `ρ` negativa no sale este sobre)", "H3", "«Abriste con qué comparar y escribiste cero. Vuelve a restar: ¿de verdad no quedó nada?»"),
    ("S-E5e", "E5e · Aconsejó (a) o (b) en el turno 1", "H4", "*(sin sobre: solo se registra)*"),
    ("S-E6a", "E6a · `N` mal contado (R6.6)", "H4", "«Cuéntalos de nuevo, de diez en diez.»"),
    ("S-E6b", "E6b · Firmó tal cual en P o A (R6.1)", "H2", "«Dice \"del colegio\". ¿A cuántos viste?»"),
    ("S-E6c", "E6c · `podrían` en P o A (R6.4)", "H3", "«\"Podrían ser\". Eso se lo pondrías a cualquier conclusión. ¿Qué dice la carpeta sobre estos 60?»"),
    ("S-E6d", "E6d · Frenó en B (R6.2 en B)", "H3", "«Frenaste algo que se sostenía. ¿Qué dice el papel sobre cómo se eligieron?»"),
    ("S-E7a", "E7a · `x` incorrecto: escribió lo que se ve", "H4", "«Mira la hoja y mira el dibujo. ¿Cuántos puntos hay de verdad entre A y B?»"),
    ("S-E7b", "E7b · Firmó tal cual en P", "H2", "«¿Dónde empieza la barra más baja?»"),
    ("S-E7c", "E7c · Rediseñó o frenó en B", "H3", "«Este gráfico no hacía falta rehacerlo. ¿Qué papel te lo decía?»"),
    ("S-E8a", "E8a · Decidió con `e` menor que 2 (también si acertó)", "H1", "«Hay dos papeles que cambian la reunión. ¿Cuáles pusiste sobre la mesa?» *(más la pregunta de Ugarte en la reacción: «¿Con qué lo comparaste?» «¿Cuántos eran?»)*"),
    ("S-E8b", "E8b · Esperó cuando se podía decidir (R8.8)", "H3", "«Esperar costó un trimestre. ¿Qué papel justificaba esperar?»"),
    ("S-E8c", "E8c · Financió o no financió contra la evidencia (R8.4 a R8.7)", "H4", "«Tu recomendación no coincide con tu propia mesa. Mira de nuevo los dos papeles.»"),
    ("S-E8d", "E8d · Coincidió con el colega o lo contradijo contra lo que decía la evidencia", "H3, H4", "*(sin sobre: solo se registra)*"),
]
tabla = ["| Id | Código del bucle (`02` 8.1) | Hábito | Sobre (jefa, firma «X. R.») |", "|---|---|---|---|"]
for f in filas:
    tabla.append("| %s | %s | %s | %s |" % f)
txt = txt[:a] + "\n".join(tabla) + txt[b:]
rep("Se elige por el código `E…` de la secc. 5 del bucle.",
    "Se elige por el código `E…` de la tabla única de `02` 8.1 (29 códigos, 30 sobres con `S-P1`, dos sin texto propio; los hábitos H1 a H4 son los de `02` 8.2 y `04` T1.5b).")
rep("- **Puerta de las tandas (caso 3):** «Con una tanda no sabes cuánto se mueve.»", "- **Puerta de las tandas (caso 3):** «Para redactar un rango necesitas 2 tandas.»")
rep("- **Antes de las ocho fichas, jefa:**", "- **Antes de las ocho cartas, jefa:**")

# ---------------------------------------------------------------- NT1.8
rep("| R-H1a | H1 · decidir sin abrir el clave |", "| R-H1a | H1 · decidir sin abrir lo que importa |")
rep("| R-H3a | H3 · frenar o dudar de más |", "| R-H3a | H3 · frenar, dudar o redactar de menos |")
rep("| R-H4a | H4 · creyó lo que se ve a primera vista |", "| R-H4a | H4 · creer lo que muestra el resultado propio o el dibujo |")

# ---------------------------------------------------------------- NT1.10 y NT1.11
rep("Las ramas de la revelación son ahora las 66 de `04` T1.7a/T1.7b (más 5 del caso 2 tipo B, marcadas), que resuelven",
    "Las ramas de la revelación son las 72 de `04` T1.7a/T1.7b (v2.1, con el caso 2 tipo B y F6k), que resuelven")
rep("las 66 ramas de `04` T1.7b copiadas por script, más 5 ramas del caso 2 tipo B (F2f a F2j) que `04` no trae; **pedido a aprendizaje:** adoptarlas con sus ids y su fila en T1.7a.",
    "las 72 ramas de `04` v2.1 (T1.7a y T1.7b) copiadas por script; las 5 del caso 2 tipo B (F2f a F2j) ya las trae `04` con su id y su fila.")
rep("**Revelación ficha 3, rama F:**", "**Revelación carta 3, rama F3e:**")
rep("Los demás títulos de la ficha se conservan.", "Los casos 4 y 6 también cambian de título en la v3.1 (ajuste 29); los demás títulos de la ficha se conservan.")
rep("| 20 | **Caso 8 con 2 fichas:** Ugarte lo dice con naturalidad. | Bucle 15, aviso 7 |",
    "| 20 | **Caso 8 con 2 fichas:** Ugarte lo dice con naturalidad. | Bucle 15, aviso 7 |\n"
    "| 21 | **v3.1 · Revelación a 72 ramas:** entran **F3k** y **F6k**; cambian 22 textos de `04` v2.1 (F1a, F2f, F2g, F2i, F3a, F3b, F3d, F3g, F3i, F3o, F4d, F4e, F5a, F5b, F5c, F5e, F5f, F5g, F5h, F5i, F6a, F6j); «cartas» en lugar de «fichas». | `04` T1.9, narrativa (1) y (5); v15 C7 |\n"
    "| 22 | **v3.1 · B1:** F3a solo dice «se pudo presentar» si el rango llevó la pieza del clave; el `ok` sin pieza va a F3b («quedó en un anexo»), que cuadra con la reacción y el sobre `S-E3f`. | v15 B1 |\n"
    "| 23 | **v3.1 · B2:** F5h dice «Abriste con qué comparar y escribiste 0. La cuenta bien hecha daba {rho}.» y ya no afirma que el taller cambió algo (distingue ρ del efecto real); `S-E5d` solo sale con ρ > 1. | v15 B2 |\n"
    "| 24 | **v3.1 · Códigos y hábitos:** la tabla de sobres usa los 29 códigos de `02` 8.1 con su hábito; los expedientes nombran los hábitos como `02` 8.2. | v15 I1 |\n"
    "| 25 | **v3.1 · I2 e I7 quedan como «pendiente Ronald»** (la jefa parecida a la de AIEF; quién aprueba (a) y (b) en el turno 1 del caso 5), con el valor recomendado escrito; los textos no cambian hasta que decida. | v15 I2, I7; decisión de Ronald |\n"
    "| 26 | **v3.1 · I3 (caso 6):** C6-2 en P dice que las respuestas de la lista son de {curso}; la pieza `grupo` del tipo A es una por papel (y las dos juntas si abrió los dos). | v15 I3; `02` 5.5 |\n"
    "| 27 | **v3.1 · I5:** (a) 480 es el colegio y el caso 3 habla de «los estudiantes del colegio»; (b) el encargo del paso 1 es «¿el colegio tiene algún dato…?», la hoja «Para empezar» tiene motivo y la fila del archivo usa `{horasAnt}` y `{col2Ant}`; (c) la jefa presenta a Horizonte y Beto pasa con su taza en el arranque; (d) tarjetas «Hace un mes, otra noche como esta» y «Hoy» en el caso 5; (e) «Ugarte te espera en dirección». | v15 I5 |\n"
    "| 28 | **v3.1 · Textos:** puerta de las tandas «Para redactar un rango necesitas 2 tandas» y Ugarte con 2 fichas «Hoy hay menos tiempo en la reunión» (C6); R8.4/R8.5 y R8.6/R8.7 con frases distintas (C5); `{fuente}` por caso (C9); `{hechoClave}` en tres frases (C3); globos de la madre y de la entrada del caso 3 partidos (C2); `S-E6b` sin el 480 (C4); `S-P1` «sin que nadie lo usara» (C10); caso 7 «¿A cuál le recomendarías recortar?» (retoque de oficio de v15); jefa del caso 2 «número redondo» (I4, 4). | v15 C2 a C10 |\n"
    "| 29 | **v3.1 · Títulos (C1):** caso 4 «Dos estudios, una sola cita» (antes «Dos encuestas, un titular») y caso 6 «Los 480 de la frase» (antes «El titular de los 480»). Los ids de los casos no cambian. | v15 C1 |")
rep("*Bucle y aprendizaje:* sus textos aún dicen «publicar», «Lectores», «portada» y «editora» (`02` secc. 5, `04` T1.3 y T1.7); los números y reglas valen igual, las etiquetas se alinean con esta sección en construcción.",
    "*Bucle y aprendizaje:* `02` v2 y `04` v2.1 ya usan «Firmar tal cual», «Voz», «cartas» y «jefa»; «publicar», «Lectores», «portada» y «editora» quedan solo en sus tablas de equivalencia (v15 C1). Aprendizaje debe copiar los dos títulos nuevos (casos 4 y 6) y la puerta del rango.")
rep("*Crítico:* mirar los 20 ajustes de arriba,", "*Crítico:* mirar los 29 ajustes de arriba,")

# ---------------------------------------------------------------- fin
if errores:
    print("ERRORES (no se escribio nada):")
    for e in errores:
        print(" -", e)
    sys.exit(1)

salida = txt.replace("\n", "\r\n") if crlf else txt
tmp = P05 + ".tmp"
with open(tmp, "wb") as f:
    f.write(salida.encode("utf-8"))
os.replace(tmp, P05)
print("OK escrito; CRLF=%s" % crlf)
