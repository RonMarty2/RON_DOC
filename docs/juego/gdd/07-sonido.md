# 07 · Sonido

> **ACTUALIZADO 09-10 (Ronald): la música ya no va en tramos ni capas por fase.** Una pista entera por escena (`pista-s0/s1/s2/s10.mp3`, ~2:40 cada una), en bucle, con fundido cruzado de ~2,5 s solo cuando cambia la escena. Todo lo de abajo sobre tramos A/B/C/D y capas por fase queda como historia.

## Psicoestadística Descriptiva (Psicología) · Tema 1 «La mesa de verificación» · sonido · versión 2 (ajustes del crítico v15: I4 y C8) · 08-10-2026 · se agrega S.6 «Integración en la pantalla» (09-10-2026)

> **Estado:** entrega de la etapa 4-bis (sonido), para el crítico. Autor: diseñador de sonido. **Sin nota** en este tema.
> **Parte de:** la narrativa v3.1 (`05`, «Tema 1 · narrativa»: NT1.1 a NT1.11), el bucle (`02`, «Tema 1 · bucle y mecánicas v2»), el aprendizaje (`04`, «Tema 1 · aprendizaje v2.1») y el aspecto A (pixel art a color con luz de lámpara). Los nombres de la sección narrativa son los vigentes (Departamento de Orientación, Voz, Credibilidad, Firmar tal cual / Redactar / Frenar, Horizonte). Lo que digan otros documentos del Tema 1 sobre «redacción» o «editora» es vocabulario viejo y aquí no se usa.
> **Decisiones de Ronald que se respetan:** música 8 bits por escena (la probó en Flow Music y le gustó mucho); un juego distinto por materia; la licencia de Flow Music la resolvió él el 08-10 («integra, y no vuelvas a preguntar»; ver arriba).

### Licencia de Flow Music: Ronald la autorizó (08-10, vigente)

**Ronald autorizó integrar la música de Flow Music al juego** (08-10 noche, ante la pregunta «integrar ya o esperar a revisar la licencia» contestó «integra, y no vuelvas a preguntar»; constancia en `docs/juego/RETOMAR.md`, líneas 38, 161 y 166). Por eso **ya no se pregunta por la licencia**: las pistas descargadas pasan a `public/juego/psicoestadistica/audio/` y se publican con el sitio. *Esto reemplaza al aviso anterior («nada se integra»), que quedó viejo desde el 08-10.* Lo que aún no está hecho es lo práctico: descargar los archivos, recortarlos y cargarlos (ver S.6). Los efectos chicos se sintetizan por código (Decisión 2) y nunca dependieron de esa licencia.

### Decisiones pendientes de Ronald

1. **Licencia de Flow Music: resuelta por Ronald el 08-10** (ver arriba). Ya no es una decisión pendiente.
2. **Efectos chicos: ¿por código o por Flow? Decidida el 09-10 (Ronald delegó): TODOS por código.** Antes se recomendaba dejar a Flow los 4 con carácter (sobre, teléfono, pulgar, cabeza). Se cambia: en 8 bits un teléfono, dos notas que suben o dos que bajan y un roce de papel son ondas cuadradas y ruido, que el navegador fabrica sin descargar nada, sin gastar créditos y sin esperar la prueba de «Crear FX». Quedan 14 efectos por código (E01 a E14); Flow se usa solo para música. Si Ronald oye el teléfono y no le gusta, se pide a Flow solo ese, más adelante.
3. **Orden de generación para cuidar créditos.** Cada pedido devuelve 2 versiones y gasta 2 generaciones del plan gratuito. Recomendado: primero **3 pedidos** (Arranque, Caso 2 y Revelación = 6 generaciones), Ronald los escucha, y recién después se piden los demás. Si no le gusta el rumbo, no se gastó el resto.
4. **Decidida A, 08-10: la jefa del Tema 1 (`06` I2).** Ronald eligió la opción A (la jefa en la sala, sin vidrio ni sello; el cierre es una firma a lapicera con el timbre del colegio), así que **E04 pasa a pluma y timbre**: el rasgueo de la pluma y el golpe de un timbre, con el mismo timbre para los tres botones y un tono neutro distinto cada uno (como ya decía E04 desde la v2). Ya no hay golpe de sello de la jefa en ninguna hoja ni en el kit.
5. **Decidida, 08-10, aplicada: el caso 5 (`06` I7).** Ronald eligió lo recomendado: en el turno 1 la aprobación de las opciones la da Beto o Ugarte, no la jefa con el pulgar; la jefa solo hace una pregunta neutra. Por eso **se quitó E08 del turno 1 de S5** y la excepción de S.0 sobre el pulgar del caso 5 desapareció. El turno 2 sigue igual. Cuando Beto o Ugarte aprueban, el sonido **no suena a acierto**: su reacción es visible y no es una nota (no se inventó ningún efecto).

---

## S.0 Cómo suena este tema (la regla de oro y el sistema de capas)

**La regla de oro: el sonido nunca juzga antes que el mundo.** La jefa, la madre que llama, Ugarte y las notas son los que dicen si algo estuvo bien o mal. El sonido los acompaña, no se adelanta. Por eso:

- **Abrir un papel suena igual para todos los papeles**, sea el clave o un señuelo.
- **Tocar «Firmar tal cual», «Redactar» o «Frenar» suena igual en toda versión y toda situación.** No hay «ding» de acierto ni «buzz» de error al sellar.
- **La tensión la causan el botón y los medidores, no la respuesta**: sube cuando aparece «¿Firmar? Después no hay vuelta.» o cuando un medidor está en 25 o menos (ambos se ven en pantalla). Es igual cuando el alumno va bien y cuando va mal.
- **Los avisos de acierto y error solo suenan junto a una reacción que ya se ve** (la jefa levanta el pulgar, esconde la cabeza, cae un sobre, suena un teléfono). En el caso 5, turno 1, la aprobación de las opciones la dan Beto o Ugarte (Decisión 5, decidida y aplicada el 08-10) y la jefa solo hace una pregunta neutra: no hay pulgar y no suena E08; cuando Beto o Ugarte aprueban, el sonido no suena a acierto, porque su reacción se ve y no es una nota.
- **Acierto y error se deciden por la reacción que se ve, no por la acción del alumno** (`06` C8e). En algunas versiones «Firmar tal cual» es justo lo que la jefa aprueba, y entonces suena E08; en otras, lo que se ve es la llamada o el sobre. Nunca se ata un efecto a «firmaste tal cual» ni a «redactaste». E06 (sobre) y E07 (teléfono) suenan igual en toda versión.
- **Sin sonido el juego se entiende igual:** cada cue tiene su equivalente visible (globo, pose, sobre, tubo que se mueve). Hay botón de silenciar siempre visible.

**Capas por momento (iguales en todas las escenas; cada hoja dice qué cambia):**

| Momento | Cuándo entra (siempre algo visible) | Qué cambia en la música |
|---|---|---|
| **Calma** | Al abrir la escena y mientras abres papeles | Sección A: bucle base, el bajo y el arpegio. |
| **Duda** | Queda una sola ficha, o hay un medidor entre 26 y 40 | Sección B: entra una melodía interrogante, el bajo se afloja. |
| **Tensión** | Aparece «¿Firmar? Después no hay vuelta.», o un medidor está en 25 o menos | Sección C: más grave, ruido seco marcando el pulso, se calla un canal. |
| **Acierto** | La jefa pone el pulgar arriba o un personaje cierra con una frase buena | Un aviso corto (E08) sobre el bucle, que no se corta. |
| **Error** | La jefa esconde la cabeza, cae un sobre, o un personaje reclama | Un aviso corto (E09); el bajo se calla un compás y vuelve. |
| **Revelación** | Solo en la ficha de cada caso y en la escena final | Ver hojas S9 y S10. |

**Cómo se cortan las secciones.** Flow Music ignoró la duración pedida (se pidió ~60 s y salió de 2:38). Por eso cada pedido pide una sola pieza con **secciones marcadas en la línea de tiempo, medidas en compases** (A = 8 compases; B y C = 4), y la sesión las **recorta en los límites de compás** y las deja en bucle. Los tiempos de cada hoja están calculados con compás de 4 tiempos (segundos por compás = 240 ÷ BPM) y redondeados a mano; **no se comprobó con terminal**. Si Flow entrega una pieza larga, se corta lo que sirve; si las secciones no respetan los límites, se avisa a Ronald y se reajusta el pedido.

**Peso (estimado, sin medir):** las 11 pistas pedidas suman 528 s (de 36 a 67 s cada una); a ~96 kbps (unos 12 KB por segundo) pesan entre 0,4 y 0,8 MB cada una y unos **6,2 MB en total** (cuenta del crítico v15, `06` C8b; no son «4 a 6»). Una escena carga solo su pista, y se carga la de cada escena al entrar, nunca todas juntas. **Pendiente de medir con los archivos reales.**

**Web y app por igual.** El navegador no deja sonar nada hasta el primer toque: el sonido empieza **tras el primer toque** en la pantalla de título («Toca para empezar»). En la app de Android carga el mismo sitio, así que vale lo mismo. Si el alumno silencia, el estado se recuerda en el navegador (clave nueva, sin tocar las existentes). Cada pista es corta, en bucle y se corta con fundido al cambiar de escena.

**Paleta del Tema 1.** Todas las pistas comparten la sensación de **noche, lámpara y oficina** (arpegio de onda cuadrada suave, bajo triangular, ruido seco como reloj o papel), pero **cada escena tiene su propia pieza, tempo y tonalidad.** Nada de esto se parece al sonido de otra materia: finanzas, bolsa o estadística de empresariales harán su paleta desde cero.

---

## S.1 Resumen de las 11 escenas

| # | Escena | BPM | Tonalidad | Ánimo | Pista |
|---|---|---|---|---|---|
| S0 | Arranque («Víspera del consejo») | 66 | Re dórico | Nocturno, solitario, expectante | A 8 c + B 4 c |
| S1 | Caso 1 · El primer encargo | 84 | Sol mayor | Curioso, de rebusque | A 8 + B 4 + C 4 + D 2 |
| S2 | Caso 2 · El colegio sin denuncias | 76 | Mi menor | Curioso y neutro, de comparar fechas | A 8 + B 4 + C 4 |
| S3 | Caso 3 · La cifra de los de 4.º | 108 | Do mayor pentatónico | Mecánico, de tanteo | A 8 + B 4 + C 4 |
| S4 | Caso 4 · Dos estudios, una sola cita | 92 | Fa menor | De duelo, dos voces | A 8 + B 4 + C 4 |
| S5 | Caso 5 · El taller de pausas | 72 | Si bemol mayor, pasa a menor | Cálido, luego frío | A 8 + B 8 + C 4 |
| S6 | Caso 6 · Los 480 de la frase | 96 | La mixolidio | Exacto, de cuenta | A 8 + B 4 + C 4 |
| S7 | Caso 7 · El gráfico del informe | 88 | Si menor | Atento, de ojo | A 8 + B 4 + C 4 |
| S8 | Caso 8 · La dirección decide | 80 | Do menor | Serio, de sala de dirección | A 8 + B 4 + C 4 |
| S9 | Revelación · las 8 fichas | 60 | Sol mayor | Quieto, que se abre | A 8 + B 8 |
| S10 | Cierre · el camino y la plaza | 60 | Sol mayor, final abierto | Pensativo, «apenas empieza» | A 8 + cola 2 |

---

## S.2 Kit de efectos del Tema 1 (compartido por las escenas)

Un efecto igual para toda situación equivalente. Marca de origen: **[C]** = sintetizado por código (Decisión 2, recomendado); **[F]** = se pide a Flow («Crear FX e instrumentos», sin explorar todavía: la primera prueba decide).

| Id | Efecto | Descripción de una línea | Origen |
|---|---|---|---|
| E01 | Abrir un papel | Roce de papel corto (ruido seco de ~80 ms) con un tono bajo suave; **idéntico para todo papel**. | [C] |
| E02 | Gastar una ficha | Un «tick» doble grave y seco, como sellar una casilla. | [C] |
| E03 | Escribir un número | Un blip de onda cuadrada por dígito, **siempre el mismo tono** (que no suene a más ni a menos). | [C] |
| E04 | Sellar | Los tres botones con **el mismo timbre** (un clic corto de onda de pulso) y un **tono neutro distinto** cada uno (Firmar tal cual = grave, Redactar = medio, Frenar = agudo); **iguales en toda versión**, sin carga de «bueno» ni de «malo» (`06` I4.1). *Decisión 4 (decidida A, 08-10): suena a pluma y timbre; el rasgueo de la pluma y luego el golpe de un timbre, sin sello.* | [C] |
| E05 | «¿Firmar? Después no hay vuelta» | Una nota baja sostenida de ~1 s que se corta cuando respondes. | [C] |
| E06 | Cae el sobre de la jefa | Deslizar de papel y golpe suave sobre la mesa; **idéntico para todo sobre**, diga lo que diga, y solo cuando el sobre se ve caer. | [C] (antes [F]; S.6) |
| E07 | Teléfono que suena | Doble tono clásico de teléfono en 8 bits, un timbre por quien llama; solo suena **junto a la llamada visible**. | [C] (antes [F]; S.6) |
| E08 | Pulgar arriba | Dos notas cuadradas ascendentes, suaves; solo con la pose visible. | [C] (antes [F]; S.6) |
| E09 | Cabeza entre las manos | Dos notas triangulares descendentes, bajas; solo con la pose visible. | [C] (antes [F]; S.6) |
| E10 | Medidor sube o baja | Blip corto hacia arriba o abajo mientras el tubo se mueve; a 25 o menos, tres pitidos graves de aviso. | [C] |
| E11 | Ayuda que baja (escalera) | Campanilla descendente de cuatro notas, neutra; no dice si ayudó. | [C] |
| E12 | Dar vuelta una ficha | Nota de una escala ascendente de 8 sonidos: **la ficha número n suena siempre igual**, tenga la rama que tenga (ver S9). | [C] |
| E13 | Sonido de interfaz | Clic mínimo al silenciar o activar el sonido. | [C] |
| E14 | Clic de elección (nuevo, 09-10) | Tick corto de onda de pulso, siempre el mismo, para elegir o quitar una pieza de la frase, volver atrás o tocar un botón de menú; no dice si la elección es buena. | [C] |

**Prompt de prueba para Flow («Crear FX»), una sola vez, para ver cómo responde** (pide el teléfono, que es el efecto que más carácter necesita; con ese resultado se decide cómo pedir E06, E08 y E09):

> 8-bit chiptune sound effect for a pixel art game: an old office telephone ringing, two alternating square-wave tones, three short rings, then silence. About 2 seconds total. No music, no voice, dry and clean, NES era sound.

**Pendiente de aprender:** si «Crear FX» entrega duraciones cortas y respeta el tamaño pedido.

---

## S.3 Hojas de sonido por escena

### Hoja S0 · Arranque («Víspera del consejo») 

1. **Ánimo y drama.** Entras a una sala de noche, sola con una lámpara. Calma y un poco de soledad. **Tensión:** casi ninguna; solo la sospecha al leer «la semana pasada una salió mal». **Revelación:** la frase de la jefa «Hoy lo ocupas tú»; no hay revelación sonora.
2. **Pista de fondo.** 8 bits (la materia no pide otro estilo: es pixel art). **66 BPM, Re dórico.** Arpegio de onda cuadrada suave, bajo triangular de notas largas, ruido muy suave como un reloj lejano, melodía de onda de pulso que entra al compás 5. **Bucle: sí**, A = 8 compases (~29 s).
3. **Capas.** Calma = A. Duda = B (4 compases, ~15 s): la melodía sube un poco y queda sin resolver, para cuando la jefa pasa a «Primer encargo de la noche». Tensión: **no aplica** (aún no hay botón de sellar ni medidores). Acierto, error: no aplican. Revelación: no aplica.
4. **Efectos.** E13 (silenciar), E01 (al pasar cada tarjeta de bienvenida, versión suave), E02 (al responder la hoja «Para empezar»), E03 (al escribir mis datos). Propio: **«Dani cabecea»**, un soplo de aire suave (ruido filtrado) con un pulso agudo muy bajo, **sin notas descendentes** para que no se parezca a E09, el aviso de error (`06` I4.2); suena solo cuando la silueta se duerme.
5. **Prompt para Flow Music** (estructura que funcionó, con línea de tiempo):

> Instrumental 8-bit chiptune loop for a pixel art game scene: the title and opening of a game set in a school psychologist's office at night, one lamp on, the evening before an important meeting. Calm, nocturnal, a little lonely, quietly expectant. 66 BPM, D dorian. Soft square-wave arpeggio at low volume, triangle-wave bass with long notes, very light noise tick like a distant clock, a sparse pulse-wave melody that enters on bar 5. Timeline: [0:00-0:29] 8 bars, calm loop: arpeggio and bass first, melody enters on bar 5; [0:29-0:44] 4 bars, same loop with the melody rising slightly and ending on an unresolved note, like a question. No vocals, no lyrics. Seamless loop, clean mix, NES era sound.


---

### Hoja S1 · Caso 1 · El primer encargo (archivo del colegio)

1. **Ánimo y drama.** Curiosidad de rebuscar en cajones. **Tensión:** gastar las 3 fichas sin hallar nada («¿Seguro que ahí no había nada?»). **Revelación:** al abrir un papel con sueño aparecen dos filas iguales, «Tú, hoy» y «Archivo»; la jefa: «Esa pregunta ya se hizo. Hace un año.»
2. **Pista de fondo.** 8 bits. **84 BPM, Sol mayor.** Melodía de pulso saltarina, arpegio cuadrado ligero, bajo triangular caminando, ruido como cajón que se abre. **Bucle: sí**, A = 8 compases (~23 s).
3. **Capas.** Calma = A. Duda = B (4 c, ~11 s): el bajo se detiene en cada segundo compás, queda una sola ficha. Tensión = C (4 c, ~11 s): más grave, ruido seco en cada tiempo, cuando se gastan las 3 fichas sin haber hallado nada (el contador en 0 se ve en pantalla). El paso 1 no tiene botón de firmar ni «¿Firmar?» (P1.6, sin sellar; `06` C8c). Acierto/error: no suenan en este paso (no hay respuesta que juzgar; solo cierre de la jefa). **Revelación = D (2 c, ~6 s)**: remate brillante ascendente para cuando aparecen las dos filas (ya visibles), una sola vez.
4. **Efectos.** E01 (abrir papel, **igual para el que trae sueño y para los señuelos**), E02 (gastar ficha), E03 (escribir mis tres respuestas), E10 (aparecen los tubos), E06 (cae el sobre `S-P1`). No lleva E04 ni E05: el paso no sella. Propio: **el asombro**, nota larga ascendente que acompaña a la aparición de las dos filas, **solo cuando ya están en pantalla** (nunca al abrir el papel, para no delatar cuál era).
5. **Prompt para Flow Music:**

> Instrumental 8-bit chiptune loop for a pixel art game scene: rummaging through old school archives in a night office, opening drawers and folders, curious and playful. 84 BPM, G major. Bouncy pulse-wave melody, light square-wave arpeggio, walking triangle-wave bass, soft noise like a drawer sliding. Timeline: [0:00-0:23] 8 bars, curious loop; [0:23-0:34] 4 bars, bass pauses every second bar, hesitant; [0:34-0:46] 4 bars, lower register, dry noise on every beat, tense; [0:46-0:52] 2 bars, a small bright rising flourish that resolves warmly, like discovering something. No vocals, no lyrics. Seamless loop, clean mix, NES era sound.

---

### Hoja S2 · Caso 2 · El colegio sin denuncias

1. **Ánimo y drama.** Curioso y neutro: rebuscar y comparar fechas en un corcho, sin saber aún si el número es cierto (en 1 de cada 3 versiones el cero es cierto; el ánimo no desconfía por adelantado, `06` I4.4). **Tensión:** firmar «cero denuncias» con el corcho de fechas a la vista. **Revelación:** la madre llama (en las versiones donde esa es la reacción) o el papel cuelga en el corcho con su hilo.
2. **Pista de fondo.** 8 bits. **76 BPM, Mi menor.** Una nota larga de triángulo que se repite como un conteo parejo, arpegio cuadrado seco, ruido apenas audible; neutra, sin sonar a duda. **Bucle: sí**, A = 8 compases (~25 s).
3. **Capas.** Calma = A. Duda = B (4 c, ~13 s): una segunda voz de pulso entra descendiendo. Tensión = C (4 c, ~13 s): el arpegio acelera a corcheas, el bajo se mantiene en una sola nota. Acierto = E08 cuando la jefa levanta el pulgar (la reacción que se ve: el bucle paga con **una** pieza del clave, R2.3, y en el tipo B también paga firmar tal cual). Error = E09 cuando la jefa esconde la cabeza, y **el teléfono** (E07) solo cuando suena la llamada de la señora Quiroga; el bajo se calla un compás. Se decide por la reacción, nunca por la acción (S.0). Revelación: la ficha 2 (S9).
4. **Efectos.** E01, E02, E04, E05, E10, E06 (cae el sobre). Sin E03: en este caso no se escribe un número. Propios: **colgar el papel en el corcho** (un pluck corto de cuerda, **igual para cualquier papel**), **teléfono de la señora Quiroga** (E07, solo con el globo en pantalla).
5. **Prompt para Flow Music:**

> Instrumental 8-bit chiptune loop for a pixel art game scene: searching and comparing dates on a cork board in a school office at night, curious and neutral, not yet knowing if a number on a report is true. 76 BPM, E minor. A single long triangle-wave note repeating like a steady count, dry square-wave arpeggio, almost silent noise texture, sparse. Timeline: [0:00-0:25] 8 bars, curious searching loop; [0:25-0:38] 4 bars, a second pulse-wave voice enters descending; [0:38-0:51] 4 bars, arpeggio doubles in speed while the bass holds one note, tense. No vocals, no lyrics. Seamless loop, clean mix, NES era sound.

---

### Hoja S3 · Caso 3 · La cifra de los de 4.º (las tandas)

1. **Ánimo y drama.** Tanteo mecánico: sacar tandas de diez, cada una distinta. **Tensión:** el oficio de {fuente} espera una cifra y cada tanda cuesta una ficha. **Revelación:** el rango escrito (o la cifra firmada tal cual) y la jefa.
2. **Pista de fondo.** 8 bits. **108 BPM, Do mayor pentatónico.** Ruido percusivo tipo «bombo de lotería», arpegio de pulso que cambia una nota en cada repetición, bajo triangular firme. **Bucle: sí**, A = 8 compases (~18 s).
3. **Capas.** Calma = A. Duda = B (4 c, ~9 s): se quita la percusión, queda una ficha. Tensión = C (4 c, ~9 s): percusión doble, registro más grave. Acierto/error: E08 o E09 solo con la pose de la jefa. Revelación: ficha 3.
4. **Efectos.** E01, E02, E03, E04, E05, E10, E06 (cae el sobre), E07 (llama la docente, solo con el globo en pantalla). Propio: **la máquina de tandas**, diez «ticks» en cascada **con el mismo ritmo en cada tanda** (lo que cambia son los números en pantalla, no el sonido); **escribir el rango** usa E03 (siempre el mismo tono); no hay sonido propio que reaccione al ancho, para que nadie lo tantee con el oído (`06` I4.5).
5. **Prompt para Flow Music:**

> Instrumental 8-bit chiptune loop for a pixel art game scene: drawing ten random samples again and again from a big pile of records, mechanical and probing, like a lottery drum. 108 BPM, C major pentatonic. Noise-channel percussion like tumbling balls, square-wave arpeggio where one note changes on every repeat, firm triangle-wave bass. Timeline: [0:00-0:18] 8 bars, mechanical probing loop; [0:18-0:27] 4 bars, percussion removed, only arpeggio and bass; [0:27-0:36] 4 bars, doubled percussion and a lower register, tense. No vocals, no lyrics. Seamless loop, clean mix, NES era sound.

---

### Hoja S4 · Caso 4 · Dos estudios, una sola cita

1. **Ánimo y drama.** Dos voces que se contestan: A y B. **Tensión:** elegir una, o ninguna, con la lista de quién respondió en la mano. **Revelación:** el plan de bienestar sostenido o caído.
2. **Pista de fondo.** 8 bits. **92 BPM, Fa menor.** Dos canales de pulso en pregunta y respuesta (uno a cada lado), bajo triangular, ruido tenue. **Bucle: sí**, A = 8 compases (~21 s).
3. **Capas.** Calma = A. Duda = B (4 c, ~10 s): las dos voces se superponen en la misma nota. Tensión = C (4 c, ~10 s): una voz calla, queda la otra sola con el bajo. La voz que calla alterna por versión (A o B) y no depende de cuál estudio es el bueno (`06` C8g). Acierto/error: E08/E09 con la pose. Revelación: ficha 4.
4. **Efectos.** E01, E02, E04, E05, E10, E06 (cae el sobre), E07 (llama la coordinadora, solo con el globo en pantalla). Propio: **abrir la lista de quién respondió**, volteo de página (distinto de E01, **igual para ambas listas**).
5. **Prompt para Flow Music:**

> Instrumental 8-bit chiptune loop for a pixel art game scene: comparing two competing surveys, two voices answering each other, judgmental and wary. 92 BPM, F minor. Two pulse-wave channels in call and response, one in each stereo side, triangle-wave bass, faint noise hi-hat. Timeline: [0:00-0:21] 8 bars, call-and-response loop; [0:21-0:31] 4 bars, both voices overlap on the same note, unsure; [0:31-0:42] 4 bars, one voice drops out, the other continues alone with the bass, tense. No vocals, no lyrics. Seamless loop, clean mix, NES era sound.

---

### Hoja S5 · Caso 5 · El taller de pausas (dos turnos)

1. **Ánimo y drama.** Turno 1, cálido: aconsejas a quién llamar; Beto o Ugarte aprueban las opciones y la jefa solo hace una pregunta neutra. Turno 2, frío: pasó un mes y tienes que decir cuánto subió por el taller. **Tensión:** la llamada del director de {vecino}. **Revelación:** «Mis 13 peores subieron casi lo mismo sin taller.»
2. **Pista de fondo.** 8 bits. **72 BPM, Si bemol mayor** (turno 1) que **pasa a Si bemol menor** (turno 2). Pulso melódico cálido, arpegio cuadrado redondo, bajo triangular. **Bucle: sí**, A = 8 compases (~27 s) y B = 8 compases (~27 s).
3. **Capas.** Calma/turno 1 = A (cálido, mayor). **El turno 2 empieza también en A**, en mayor y con bajo, igual para todos: el sonido no anuncia nada antes de que el mundo hable. **Pasa a B** (la misma melodía en menor, el bajo se calla, queda solo el arpegio) **recién cuando llega la llamada del director vecino o la nota de la tallerista**, es decir, cuando ya se ve (`06` I4.3). B es solo eso; la Duda deja de llamarse B: **Duda = A con el arpegio un tono más bajo** (variación de A, sin sección propia). Tensión = C (4 c, ~13 s): ruido seco, registro grave, cuando suena «¿Firmar?». Acierto/error: E08/E09 con la pose. **La llamada del vecino** (E07) corta el bajo un compás. **La vergüenza** (cabeza entre las manos, eco de Beto) = E09 + el bajo en silencio un compás; es el mismo gesto de siempre, no un sonido nuevo. **Turno 1 (Decisión 5, decidida y aplicada el 08-10):** no suena E08 ni ningún aviso de acierto: la aprobación la dan Beto o Ugarte, su reacción se ve en pantalla y no es una nota, y la jefa solo hace una pregunta neutra. El turno 2 sigue igual.
4. **Efectos.** E01, E02, E03, E04, E05, E10, E11, E06 (cae el sobre; `S-E5e` no lleva sobre). Propios: **teléfono del vecino** (E07), **teléfono de Ugarte** (E07 en otro timbre).
5. **Prompt para Flow Music:**

> Instrumental 8-bit chiptune loop for a pixel art game scene: advising a school director on who to call to a wellbeing workshop, first warm and approving, then a month later cold when the results come in. 72 BPM, B-flat major in the first section, B-flat minor in the second. Warm pulse-wave melody, round square-wave arpeggio, triangle-wave bass. Timeline: [0:00-0:27] 8 bars, warm major loop; [0:27-0:53] 8 bars, same melody in minor, the bass drops out and only the arpeggio remains, colder; [0:53-1:07] 4 bars, low register, dry noise on every beat, tense. No vocals, no lyrics. Seamless loop, clean mix, NES era sound.

---

### Hoja S6 · Caso 6 · Los 480 de la frase

1. **Ánimo y drama.** Exactitud: contar 60 papeles de una lista antes de redactar. **Tensión:** la frase que la docente quiere en el acta. **Revelación:** la profesora de 4.º A que llama, o la conclusión que se sostiene.
2. **Pista de fondo.** 8 bits. **96 BPM, La mixolidio.** Un «tic» seco constante como un conteo, melodía de pulso corta y repetitiva, bajo triangular. **Bucle: sí**, A = 8 compases (20 s).
3. **Capas.** Calma = A. Duda = B (4 c, 10 s): falta un tic de vez en cuando. Tensión = C (4 c, 10 s): el tic se acelera. Acierto/error: E08/E09 con la pose; **la llamada de la profesora Camacho** con E07. Revelación: ficha 6.
4. **Efectos.** E01, E02, E03, E04, E05, E10, E06 (cae el sobre). Propio: **contar un papel** (tick suave por cada papel que el alumno marca al contar; **el mismo tick tenga o no tenga el conteo bien**).
5. **Prompt para Flow Music:**

> Instrumental 8-bit chiptune loop for a pixel art game scene: counting sixty records one by one before writing a sentence for the minutes of a school meeting, precise and exact. 96 BPM, A mixolydian. A steady dry tick like counting, a short repetitive pulse-wave melody, triangle-wave bass, light square-wave arpeggio. Timeline: [0:00-0:20] 8 bars, steady counting loop; [0:20-0:30] 4 bars, the tick occasionally drops a beat, doubtful; [0:30-0:40] 4 bars, tick speeds up and the register lowers, tense. No vocals, no lyrics. Seamless loop, clean mix, NES era sound.

---

### Hoja S7 · Caso 7 · El gráfico del informe

1. **Ánimo y drama.** Atención de ojo: leer un dibujo y compararlo con su hoja de datos. **Tensión:** escribir la diferencia «de verdad». **Revelación:** la nota de la docente que decidió otra cosa por el dibujo (o la confirmación de que estaba bien).
2. **Pista de fondo.** 8 bits. **88 BPM, Si menor.** Arpegio de pulso en patrón plano y parejo (dos notas que alternan, sin subir ni bajar de a escalones), bajo triangular sostenido, ruido tenue de regla. **Bucle: sí**, A = 8 compases (~22 s). **Cuidado:** la música es igual para los tipos P y B del caso y para cualquier gráfico; no se usa ningún motivo que sugiera «escalón» o «salto», para no avisar si el gráfico engaña (`06` C8f: el arpegio en escalera se cambió por uno plano).
3. **Capas.** Calma = A. Duda = B (4 c, ~11 s): el arpegio se detiene en una nota. Tensión = C (4 c, ~11 s): ruido seco y bajo grave. Acierto/error: E08/E09 con la pose. Revelación: ficha 7.
4. **Efectos.** E01, E02, E03, E04, E05, E10, E06 (cae el sobre). Propio: **abrir la hoja de datos**, volteo de página; **la regla** (tick fino cuando el alumno desliza para medir; igual en todo gráfico).
5. **Prompt para Flow Music:**

> Instrumental 8-bit chiptune loop for a pixel art game scene: studying a chart next to its data sheet on a desk lamp at night, attentive, measuring with the eye. 88 BPM, B minor. Slow pulse-wave arpeggio in a flat, even pattern that alternates between two notes without climbing or stepping, sustained triangle-wave bass, faint noise like a ruler tick. Timeline: [0:00-0:22] 8 bars, attentive loop; [0:22-0:33] 4 bars, the arpeggio stops on a held note, hesitant; [0:33-0:44] 4 bars, dry noise on every beat and a lower bass, tense. No vocals, no lyrics. Seamless loop, clean mix, NES era sound.

---

### Hoja S8 · Caso 8 · La dirección decide

1. **Ánimo y drama.** Sala de dirección, reunión de presupuesto: serio y formal, con Beto apostando un café. **Tensión:** poner hasta dos papeles sobre la mesa y decidir. **Revelación:** los dos calendarios, «Tu año» y «El año de Beto».
2. **Pista de fondo.** 8 bits. **80 BPM, Do menor.** Pulso grave y firme, arpegio cuadrado en acordes cerrados (formal), bajo triangular. **Bucle: sí**, A = 8 compases (24 s).
3. **Capas.** Calma = A. Duda = B (4 c, 12 s): entra una segunda voz, pregunta. Tensión = C (4 c, 12 s): se calla el arpegio y solo queda el pulso con el bajo, cuando suena «¿Firmar?». Acierto = E08 con la pose de la jefa o con la frase «Decidido» de Ugarte. Error = E09 con la pose. **Los dos calendarios:** una frase corta para «Tu año» y otra, en el mismo tono, para «El año de Beto» (**igual venga el año como venga**; lo que pasó lo dice el pie escrito). Revelación: ficha 8.
4. **Efectos.** E01, E02, E04, E05, E10, E06 (cae el sobre, cuando lo hay). Propios: **poner un papel sobre la mesa** (golpe suave de papel, igual para cualquiera), **pasar el calendario** (volteo de página). Sin E07: Ugarte habla en la sala y no hay llamada (`06` C8c).
5. **Prompt para Flow Music:**

> Instrumental 8-bit chiptune loop for a pixel art game scene: a school principal's office during a budget meeting, serious and formal, a decision must be made with the evidence on the table. 80 BPM, C minor. Firm low pulse-wave rhythm, closed-voicing square-wave arpeggio, triangle-wave bass. Timeline: [0:00-0:24] 8 bars, serious formal loop; [0:24-0:36] 4 bars, a second voice enters as a question; [0:36-0:48] 4 bars, the arpeggio drops out leaving only the low pulse and the bass, tense. No vocals, no lyrics. Seamless loop, clean mix, NES era sound.

---

### Hoja S9 · Revelación · las 8 fichas

1. **Ánimo y drama.** Quieto, pensativo, que se va abriendo. **Tensión:** ninguna; es mirar atrás. **Revelación:** cada ficha dada vuelta muestra el momento del caso; al estar las ocho boca arriba aparece «el camino».
2. **Pista de fondo.** 8 bits. **60 BPM, Sol mayor.** Colchón suave de triángulo y arpegio cuadrado lento; melodía de pulso muy escasa. **Bucle: sí**, A = 8 compases (32 s), B = 8 compases (32 s).
3. **Capas.** A = fichas boca abajo. **Cada ficha que se da vuelta añade una nota de la escala ascendente E12** (la ficha n suena la nota n), **en cualquier orden y sea cual sea su rama (A a F): ninguna suena distinto por haber acertado o fallado.** Al estar las ocho, entra B («el camino»): más lleno, el bajo y la melodía completa. Tensión, acierto, error: no aplican en esta escena (los fallos ya se contaron en cada caso; aquí solo se mira).
4. **Efectos.** E12 (8 notas), E13. Propio: **«Probar este caso con otras cifras»**, una campanilla corta al tocar el botón.
5. **Prompt para Flow Music:**

> Instrumental 8-bit chiptune loop for a pixel art game scene: looking back at eight cards laid face down on a desk, each one a moment from the night, reflective and calm, slowly opening up. 60 BPM, G major. Soft triangle-wave pad, slow square-wave arpeggio, very sparse pulse-wave melody. Timeline: [0:00-0:32] 8 bars, quiet reflective loop; [0:32-1:04] 8 bars, fuller: the bass and the complete melody enter, warm and open, not triumphant. No vocals, no lyrics. Seamless loop, clean mix, NES era sound.

---

### Hoja S10 · Cierre · el camino, la plaza y la pregunta de Beto

1. **Ánimo y drama.** Pensativo y con final abierto: «apenas empieza». **Tensión:** casi ninguna. **Revelación:** Beto, «Yo igual lo veo a ojo. Pero la próxima te pregunto de dónde sale.»; la jefa con la plaza fija o con «otro trimestre de prueba».
2. **Pista de fondo.** 8 bits. **60 BPM, Sol mayor con final abierto** (acorde suspendido sostenido, sin resolver). **Bucle: sí**, A = 8 compases (32 s) más una cola de 2 compases (~8 s) que se toca una vez al salir.
3. **Capas.** Calma = A. Cierre = cola (acorde suspendido). En **plaza fija** y **otro trimestre de prueba** no se usa E13 (es el clic de silenciar, de interfaz): suena solo lo que el mundo muestra (S.0), es decir E08 si la jefa levanta el pulgar en la plaza fija y ningún aviso si no hay pose. La cola de la música es la misma en los dos. No hay nota (G6). El crítico decide si ese E08 premia (`06` C8h). Duda, tensión, acierto, error: no aplican.
4. **Efectos.** E13 (solo silenciar), E12 final (la octava nota sostenida), E08 (solo en la plaza fija, con el pulgar a la vista). Propio: **la taza de Beto** al apoyarse (golpe suave de cerámica, ambiente).
5. **Prompt para Flow Music:**

> Instrumental 8-bit chiptune loop for a pixel art game scene: the closing of a night in a school psychologist's office, thoughtful and open-ended, the feeling that this is only the beginning. 60 BPM, G major, ending on an unresolved suspended chord. Soft triangle-wave pad, slow square-wave arpeggio, a gentle pulse-wave melody that asks a question. Timeline: [0:00-0:32] 8 bars, thoughtful loop; [0:32-0:40] 2 bars, a held suspended chord that fades out without resolving. No vocals, no lyrics. Seamless loop, clean mix, NES era sound.

---

## S.4 Qué tiene que escuchar y decidir Ronald

1. **Las 3 primeras pruebas** (S0, S2, S9): ¿se sienten como una oficina de psicólogo de noche? ¿la tensión y la calma se distinguen? ¿se pueden recortar en los compases pedidos?
2. **Si el bucle empalma** (el final con el inicio de A) y si Flow respeta las secciones en la línea de tiempo.
3. **La Decisión 2** (efectos por código o por Flow).
4. **La licencia de Flow Music: resuelta** (Ronald, 08-10: «integra»). Lo que Ronald hace ahora está en S.6, punto 6.
5. **Dos decisiones** (Decisiones 4 y 5): la jefa de `06` I2, **decidida A el 08-10 y aplicada** (E04 pasa a pluma y timbre), y el caso 5 de `06` I7, **decidida lo recomendado el 08-10 y aplicada** (se quitó E08 del turno 1 de S5).

## S.5 Avisos a otras partes

- *Narrativa:* los gestos de sonido de NT1.11 (teléfono, pluma y timbre, taza) están en el kit (E04, E07, S10). No se tocó ningún texto del alumno. *Narrativa (v15 I4.4):* el ánimo del caso 2 pasó a curioso y neutro; encaja con la jefa que dice «número redondo» (ajuste 28 de NT1.11).
- *Construcción:* un módulo de audio propio (`src/lib/juego/` según la regla de motor común), que (a) no suene hasta el primer toque, (b) tenga botón de silenciar visible con estado guardado en una clave nueva, (c) cargue solo la pista de la escena y la corte con fundido, (d) tenga los efectos [C] como funciones de Web Audio con pruebas. Un cambio nativo en la app no hace falta (el sitio carga igual). **No se escribió código.**
- *Crítico:* revisar la regla de oro (S.0) contra las 11 hojas y que ningún efecto marque correcto o incorrecto antes del mundo.

---

## S.6 Integración en la pantalla (09-10)

> **Para qué sirve:** dice qué suena en cada parte de la pantalla jugable que ya existe (`src/app/juego-psicoestadistica/Mesa.tsx`), con qué archivos y con qué reglas, para que la construcción lo programe sin inventar nada. **No se tocó código.** Hoy el proyecto **no tiene ningún sonido** (búsqueda en `src/`: solo aparecen palabras ajenas, «Editor de audio» en una plantilla financiera). La pantalla cubre el Paso 1 (hoja S1), el Caso 2 (hoja S2), el título (S0) y el fin; los casos 3 a 8 y la revelación (S9, S10) se suman después **sin tocar lo que ya funciona**.
> **Decisiones tomadas por mí** (Ronald delegó: «tú eres el experto»). Una opción por tema, sin menús.

### S.6.1 Qué música suena en cada parte de la pantalla

La pantalla tiene 13 partes («fases»). La regla de siempre: **la música sigue el momento que ya se ve** (fichas que quedan, botón «¿Firmar?»), nunca lo adelanta. Capas: **A** calma, **B** duda, **C** tensión, **D** remate de una sola vez. El pase de una capa a otra es un **fundido cruzado de 1 segundo** (0,3 s si el sistema pide «reducir movimiento»), que empieza en el momento del cambio, sin esperar al compás; el fundido tapa el empalme. La capa nueva arranca desde su inicio.

| Fase de pantalla | Música | Cuándo entra | Cuándo cambia o se corta | Bucle |
|---|---|---|---|---|
| **titulo** | Ninguna | La pantalla de título está en silencio: el navegador no deja sonar hasta el primer toque | Al tocar «Empezar», «Continuar donde quedé» o «Empezar de nuevo» (el primer toque) entra la música de la fase que sigue, con **entrada gradual de 1,5 s**. Si se retoma, entra la pista de la fase donde se retoma | no aplica |
| **bienvenida** | S0 capa A | Con el primer toque | Sigue mientras se leen las tarjetas | Sí (S0-A, ~29 s) |
| **jefa** | S0 capa A, luego S0 capa B | A durante «Llegaste al escritorio…»; **B entra con la segunda línea de la jefa** («Primer encargo de la noche…», la hoja S0 lo pide así) | B sigue durante el encargo | Sí (S0-B, ~14,5 s) |
| **hoja** | S0 capa B | Sigue de la fase anterior | Se corta con fundido de 2 s al pasar a archivo1 | Sí |
| **archivo1** | S1 capa A; B con 1 ficha; C con 0 fichas | Fundido de 2 s desde S0. **B** entra cuando queda **1 ficha** (el contador se ve). **C** entra cuando quedan **0 fichas y aún no apareció el papel con el sueño** (el contador en 0 se ve) | Si el alumno abre el papel con el sueño, pasa a asombro. Lo que regala la jefa o abre Dani **no cambia la capa** | Sí (S1-A ~23 s; S1-B y S1-C ~11,5 s) |
| **asombro** | S1 capa D, **una sola vez** | **Cuando la tabla de las dos filas ya está en pantalla** (nunca al abrir el papel, para no delatar cuál era) | Termina sola (~6 s) y vuelve S1-A, más baja (60 %) | No (una vez) y luego A en bucle |
| **cierre1** | S1 capa A | Sigue | Fundido de 2 s a S2 al pasar a entrada2 | Sí |
| **entrada2** | S2 capa A | Fundido de 2 s desde S1 | Sigue en la fase archivo2 | Sí (S2-A ~25 s) |
| **archivo2** | S2 capa A; B con 1 ficha | **B** cuando queda **1 ficha** | Pasa a C si aparece «¿Firmar?» (fase confirma) | Sí (S2-B y S2-C ~12,5 s) |
| **frase** | La que estaba (A o B) | Sigue sin cambiar | Pasa a C si aparece «¿Firmar?» | Sí |
| **confirma** | S2 capa C | **Cuando aparece «¿Firmar? Después no hay vuelta.»** (se ve en pantalla), junto con E05 | Si el alumno vuelve atrás («No»), regresa a la capa que tenía (A o B). Si confirma, pasa a reaccion | Sí |
| **reaccion** | S2 capa A, más baja (60 %) | Al sellar, la música vuelve a la calma. **Un medidor en 25 o menos** la pasa a C (se ve en el tubo) | Cuando suena el teléfono de la madre la música baja a 20 % durante 1,5 s y vuelve | Sí |
| **fin** | S10 capa A (**cuando exista**) | Fundido de 2 s desde S2 | Hasta salir de la pantalla. **Mientras S10 no esté generada, el fin queda en silencio** (la música de S2 se apaga con fundido de 3 s); no se usa ninguna otra pista como relleno | Sí (S10-A, 32 s) |

**Cuántas pistas ya tienen sus tramos:** S0 (A, B), S1 (A, B, C, D), S2 (A, B, C) y S10 (A y cola de 2 compases, ver abajo). **Si un tramo no existe todavía (B o C), la pantalla se queda en la capa A:** el juego no se rompe y el aviso de «¿Firmar?» (E05) y los tubos siguen dando la tensión.

**Primera versión (lo mínimo que se oye bien):** A en S0, S1 y S2 más lo demás cuando Ronald apruebe los recortes. Ver S.6.5.

### S.6.2 Qué efecto suena en cada cosa que pasa

Todos los efectos se **sintetizan por código** (ondas cuadradas, triángulo y ruido). **Decisión 2 final:** los 14 por código; ninguno por Flow. Cada efecto tiene su equivalente visible, así que sin sonido el juego se entiende igual.

| Qué pasa en la pantalla | Efecto | Origen | Equivalente visible (sin sonido) |
|---|---|---|---|
| Tocar «Empezar», «Continuar» o «Empezar de nuevo» (primer toque) | Ninguno; solo arranca la música | [C] | El cambio de pantalla |
| Pasar una línea de diálogo (botón ▸) | Ninguno (se oiría cientos de veces) | no aplica | El texto nuevo |
| Silenciar o activar el sonido | **E13** | [C] | El icono cambia |
| Tocar «Mis propias respuestas», «Atrás», «Volver a los papeles», «Jugar otra versión», «Repetir», «Volver a la materia» | **E14** | [C] | Cambia la pantalla |
| Escribir en las casillas de la hoja (cada dígito) | **E03**, siempre el mismo tono | [C] | El número escrito |
| Contestar la hoja (botón de Dani o «Seguir ▸» con las casillas bien) | **E02** | [C] | Se pasa al archivo |
| Dani cabecea (tarda 25 s) | **Soplo de Dani** (propio de S0; aire suave, sin notas que bajen) | [C] | La silueta se mueve |
| Abrir un papel nuevo (caso 1 o 2) | **E01** y luego **E02** (se gasta la ficha); idénticos para todo papel | [C] | El papel se abre y baja el contador |
| Volver a leer un papel ya abierto | **E01** solamente (no gasta ficha) | [C] | El papel se abre |
| Cerrar el lector de un papel | Ninguno | no aplica | Se cierra |
| Aviso de la jefa que regala una ficha | **E11** (campanilla descendente, neutra, no dice si ayudó) | [C] | La línea de la jefa y el contador que sube |
| Dani abre el papel por ti | **E11**; luego **E01** cuando se abre el lector | [C] | Línea de Dani y el papel abierto |
| Aparece la tabla del asombro (dos filas) | **Solo la capa D de la música** (S.6.1). La nota larga ascendente de la hoja S1 **no se usa en esta primera versión**, para que no choque con D | [C] | Las dos filas de la tabla |
| La jefa levanta el pulgar en el asombro | **Ninguno** (la hoja S1 dice que no suena acierto en el Paso 1) | no aplica | La pose |
| Aparecen los tubos (primera línea del cierre del Paso 1) | **E10** | [C] | Se ven los tubos |
| Colgar un papel en el corcho (Caso 2, al cerrar el lector de un papel nuevo) | **Pluck de corcho** (propio de S2), igual para todo papel | [C] | El papel aparece en la lista del corcho |
| Tocar «Firmar tal cual», «Redactar» o «Frenar» | **E04 primera parte** (clic con tono neutro: grave, medio o agudo), igual en toda versión | [C] | El botón se aprieta y aparece «¿Firmar?» |
| Elegir o quitar una pieza de la frase | **E14** | [C] | La pieza queda marcada |
| «Sellar la frase ▸» | **E04 primera parte**, tono medio (Redactar) | [C] | Aparece «¿Firmar?» |
| Aparece «¿Firmar? Después no hay vuelta.» | **E05** (nota baja de ~1 s que se corta al responder) | [C] | El mensaje en pantalla |
| Responder «No» (volver) | **E14**; se corta E05 | [C] | Se vuelve a los papeles o a la frase |
| Responder «Sí» (sellar) | **E04 segunda parte**: pluma y timbre, igual para los tres botones (Decisión 4); se corta E05 | [C] | Empieza la reacción |
| Los tubos se mueven | **E10** (blip arriba o abajo según el tubo); un medidor en **25 o menos** suma tres pitidos graves | [C] | El tubo sube o baja y se ve el número |
| La jefa levanta el pulgar (solo en la fase de reacción) | **E08** | [C] | La pose |
| La jefa esconde la cabeza (solo en la reacción) | **E09** (en esta primera versión no se calla el bajo un compás, como pedía S2: la música es un tramo ya grabado y no se puede quitar un canal; suena solo E09) | [C] | La pose |
| Suena el teléfono de la madre (línea de la madre) | **E07**; la música baja a 20 % mientras suena | [C] | El teléfono vibra en la escena y sale el globo |
| Aparece la tarjeta «Acuerdo del consejo» | Ninguno (el sonido no premia ni castiga) | no aplica | La tarjeta |
| Cae el sobre de la jefa (aparece la tarjeta «Sobre de la jefa») | **E06**, igual para todo sobre | [C] | La tarjeta |
| Botón «Continuar ▸» tras la reacción | **E14** | [C] | Cambia la pantalla |
| Llegar al fin | Se apaga la música con fundido (o entra S10-A si existe) | [C] | El texto de fin |

Efectos que **todavía no se usan** porque su escena no está: E12 (fichas de la revelación), la taza de Beto (S10), pasar el calendario (S8), las máquinas de los casos 3 a 8. El kit S.2 los conserva.

### S.6.3 Reglas de uso

1. **Volumen relativo** (cifras de partida para probar, escala 0 a 1): música **0,30**; efectos **0,55**; los avisos que acompañan a una pose o llamada (E07, E08, E09, E06) **0,65**. Cuando suena el teléfono de la madre, la música baja a **0,20** de su volumen normal durante 1,5 s. Nunca dos efectos de aviso al mismo tiempo: si se encima uno nuevo, el anterior se corta. Ronald ajusta estos números al escucharlo.
2. **La música no tapa ni sustituye nada.** Todo lo importante sigue escrito en la pantalla (frases, contador, tubos, «¿Firmar?»). Quitar el sonido no cambia nada de lo que el alumno puede entender o decidir.
3. **Botón de silencio**, siempre visible en todas las fases (arriba a la derecha, con un área táctil de unos 44 px y el texto «Sonido: sí / no» para el lector de pantalla). **Se recuerda** en el navegador del alumno, en una clave nueva y común a todos los juegos: `ron-doc-juego:sonido` (valor `si` o `no`). Silenciar corta música y efectos; el estado se aplica al volver a jugar.
4. **«Sin sonido» del sistema:** el navegador no deja leer si el teléfono tiene el sonido apagado, pero un teléfono en silencio ya no emite nada, así que no hace falta nada más. Sí se lee **reducir movimiento** (`prefers-reduced-motion`): no silencia, pero los cruces de música pasan de 1 s a 0,3 s y la música no baja y sube al sonar el teléfono (queda fija). Honestidad: esta preferencia es sobre movimiento; el sonido lo controla el botón de silencio.
5. **El audio solo arranca tras el primer toque** (regla de autoplay de los navegadores). El primer toque es el de «Empezar», «Continuar» o «Empezar de nuevo» de la pantalla de título; en ese mismo toque se «despierta» el sonido del navegador. En la app de Android (que carga el mismo sitio) vale lo mismo; no se depende de ninguna configuración especial del teléfono. Si el alumno entra por un enlace que lo lleva a otra fase, suena tras su primer toque en cualquier botón.
6. **Se pausa en segundo plano:** si la pestaña se oculta (otra pestaña, pantalla apagada) o la app pasa a segundo plano, la música y los efectos se pausan; al volver siguen donde iban, sin salto. Si el teléfono recibe una llamada, el sistema ya corta el audio.
7. **Si un archivo no existe o no carga:** silencio en esa capa y el juego sigue como si nada, sin mensaje de error. Si falta B o C, se sigue en A (S.6.1). Si el navegador no tiene sonido (sin Web Audio), el botón de silencio se esconde y el juego funciona igual.
8. **Carga:** al entrar a una escena se carga **solo su pista** (más la de la escena que sigue, en segundo plano, para que el cambio no se corte); nunca todas juntas. Los archivos de audio **no** se precargan en el almacenamiento sin red del sitio (los efectos no pesan, la música se pide cuando hace falta).
9. **Ni música ni efectos se parecen a los de otro juego:** esta paleta es del Tema 1 (noche, lámpara, oficina). Otras materias harán la suya desde cero.

### S.6.4 Archivos

- **Formato:** **MP3, 96 kbps, estéreo** para todas las pistas. Se elige MP3 y no OGG porque es el que suenan sin excepciones los navegadores de celular y la app. El defecto del MP3 es un pequeño hueco al repetir un bucle; se resuelve al recortar (cada tramo ya lleva un fundido cruzado de 100 a 200 ms entre su final y su principio, S.6.5) y por el fundido de 1 s al cambiar de capa.
- **Peso:** tope **400 KB por archivo** (un tramo de 8 compases dura de 22 a 32 s y pesa de 270 a 390 KB). Estimado para lo jugable ahora: **11 tramos, unos 2,2 MB en total** (cuenta con un script: 12 KB por segundo, sin medir todavía; se mide con los archivos reales). Una escena carga unos 0,3 a 0,8 MB.
- **Carpeta:** `public/juego/psicoestadistica/audio/`. Los archivos **crudos** de Flow (de unos 3 minutos y 3 MB cada uno) **no se suben al repositorio**: quedan fuera del proyecto y de ahí se recortan.
- **Nombres estables** (en minúscula, sin espacios, `escena-capa.mp3`; no se renombran después): `s0-a.mp3`, `s0-b.mp3`, `s1-a.mp3`, `s1-b.mp3`, `s1-c.mp3`, `s1-d.mp3`, `s2-a.mp3`, `s2-b.mp3`, `s2-c.mp3`, `s10-a.mp3`, `s10-cola.mp3`. Más adelante: `s3-a.mp3` y siguientes, y `s9-a.mp3`, `s9-b.mp3`.
- **Manifiesto** (un solo archivo que el código lee, `public/juego/psicoestadistica/audio/manifiesto.json`): para **sumar una pista basta con agregarla ahí**, sin tocar la pantalla. Forma:

```json
{
  "version": 1,
  "volumen": { "musica": 0.30, "efectos": 0.55, "avisos": 0.65 },
  "pistas": {
    "s0-a": { "archivo": "s0-a.mp3", "bucle": true,  "volumen": 1.0, "duracion": 29.1 },
    "s0-b": { "archivo": "s0-b.mp3", "bucle": true,  "volumen": 1.0, "duracion": 14.5 },
    "s1-d": { "archivo": "s1-d.mp3", "bucle": false, "volumen": 1.0, "duracion": 5.7 }
  },
  "escenas": {
    "s0": { "calma": "s0-a", "duda": "s0-b" },
    "s1": { "calma": "s1-a", "duda": "s1-b", "tension": "s1-c", "remate": "s1-d" },
    "s2": { "calma": "s2-a", "duda": "s2-b", "tension": "s2-c" }
  }
}
```

  Reglas del manifiesto: la capa que falte se reemplaza por `calma`; `bucle: false` suena una vez y vuelve a `calma`; `volumen` de cada pista es un ajuste fino (1,0 por defecto) que se multiplica por el volumen de música. La relación entre fase de pantalla y escena (S.6.1) queda en una función corta del código con sus pruebas, no en el manifiesto.

### S.6.5 Cómo se recorta la pista de Flow (lo hace la sesión, no Ronald)

Flow entrega pistas de unos 3 minutos (no respeta la duración pedida). Por cada pista cruda, la sesión **mide el pulso** con las herramientas ya instaladas (`ffmpeg`, `librosa`), elige cortes en el primer tiempo de un compás y en un valle de energía, une el final con el principio con un fundido cruzado de 100 a 200 ms y exporta a MP3 96 kbps. **Lo que suene mal lo decide el oído de Ronald**: cada recorte se entrega primero para escuchar, y recién cuando él dice «ok» entra a `public/`. Si en la pista cruda no hay secciones distintas (como en la «Pixel Pulse» de S2, que se pidió con una sola atmósfera), se recorta solo la capa A y B y C quedan para una segunda generación (S.6.6).

### S.6.6 Lista exacta de lo que Ronald debe bajar de Flow Music

Estado según este archivo y las notas del agente (`.claude/agents/disenador-de-sonido.md`). Los archivos se bajan **de a uno, con el permiso de Ronald en el chat** (nombre, origen y tamaño), a una carpeta **fuera del proyecto** (por ejemplo `Descargas\musica-t1\`); la sesión recorta y sube los tramos finales.

| # | Escena | Estado | Qué bajar (nombre en Flow) | Archivo crudo | Tramos finales |
|---|---|---|---|---|---|
| 1 | S0 Arranque | **Ya generada** (2 pistas; Ronald: «suena a una escena de noche medio tensa, está bien») | «**Restructured 8-Bit Chiptune**» (2:56; trae dos secciones separadas que Ronald sí sintió distintas) | `crudo-s0.mp3` | `s0-a.mp3`, `s0-b.mp3` |
| 2 | S2 Caso 2 | **Ya generada** («Pixel Pulse», 2:47, una sola atmósfera; sin reestructurar) | «**Pixel Pulse**» | `crudo-s2.mp3` | `s2-a.mp3` ahora; `s2-b.mp3` y `s2-c.mp3` después (ver abajo) |
| 3 | S1 Caso 1 | **Falta generarla** (la hoja S1 existe, no hay pista) | Pedirla con el prompt de abajo, bajar la mejor | `crudo-s1.mp3` | `s1-a.mp3`, `s1-b.mp3`, `s1-c.mp3`, `s1-d.mp3` |
| 4 | S10 Cierre (suena en la fase «fin») | **Falta generarla** | Pedirla con el prompt de abajo | `crudo-s10.mp3` | `s10-a.mp3`, `s10-cola.mp3` |
| 5 | S9 Revelación | **Ya generada** («Reflective Cards Loop» 2:08 y «Take 2» 2:58) | **No hace falta ahora**: la revelación no está en la pantalla. Se baja cuando se construya | `crudo-s9.mp3` | `s9-a.mp3`, `s9-b.mp3` |

Total ahora: **4 descargas** (S0, S2 y las dos nuevas) y **2 pedidos nuevos a Flow** (S1 y S10; un pedido devuelve una canción en el modo Producer). Costo en créditos: **no se ve en pantalla** (el contador de la esquina son puntos de progreso); el plan de Ronald es PLUS.

**Para S2, B y C:** la pista bajada es de una sola atmósfera. Recomendación: **primero jugar con solo la capa A** y escuchar; si Ronald quiere sentir los cambios, se pide **una** reestructura al Producer (una generación): «Restructure this track in two clearly separate sections, with one second of near silence between them: first section 8 bars calm and steady, second section 8 bars tense, lower, with the arpeggio doubled in speed. Keep the same instruments and tempo.» Eso da B y C de S2.

**Prompt para S1** (versión con «Structure:» en lugar de tiempos en segundos, porque el Producer los ignora; después de generar, pedir la reestructura de abajo):

> Instrumental 8-bit chiptune loop for a pixel art game scene: rummaging through old school archives in a night office, opening drawers and folders, curious and playful. 84 BPM, G major. Bouncy pulse-wave melody, light square-wave arpeggio, walking triangle-wave bass, soft noise like a drawer sliding. Structure: section A is 8 bars, curious loop; section B is 4 bars, the bass pauses every second bar, hesitant; section C is 4 bars, lower register with dry noise on every beat, tense; section D is 2 bars, a small bright rising flourish that resolves warmly, like discovering something. No vocals, no lyrics. Seamless loop, clean mix, NES era sound.

Reestructura para S1 (segundo paso): «Restructure this track in four clearly separate sections with one second of near silence between them: A 8 bars curious and playful, B 4 bars hesitant with the bass pausing, C 4 bars lower and tense with dry noise on every beat, D 2 bars a short bright rising flourish. Keep the same instruments and tempo.»

**Prompt para S10** (misma regla, sin tiempos):

> Instrumental 8-bit chiptune loop for a pixel art game scene: the closing of a night in a school psychologist's office, thoughtful and open-ended, the feeling that this is only the beginning. 60 BPM, G major, ending on an unresolved suspended chord. Soft triangle-wave pad, slow square-wave arpeggio, a gentle pulse-wave melody that asks a question. Structure: section A is 8 bars, a thoughtful loop; then a 2-bar tail with a held suspended chord that fades out without resolving. No vocals, no lyrics. Seamless loop, clean mix, NES era sound.

### S.6.7 Cómo probarlo y qué aprender

1. **La sesión de construcción** programa el módulo de audio según S.6.1 a S.6.4 y lo prueba con pruebas automáticas (que ninguna fase falte, que sin archivos no falle, que silenciar corte todo). **Eso no sustituye el oído de Ronald.**
2. **Ronald juega una vez completa** (título a fin) en el celular, con audífonos y sin ellos, y me dice (en palabras simples, sin números):
   - ¿La música de cada parte se parece a lo que pasa (curiosa en el archivo, neutra en el corcho, tensa en «¿Firmar?»)?
   - ¿Los cambios (la duda, la tensión, el remate al aparecer las dos filas) se sienten naturales o se notan como un corte?
   - ¿El bucle se repite sin que se note el salto?
   - ¿Algún sonido te hizo pensar «lo hice bien» o «lo hice mal» antes de que lo dijera la jefa? **Si pasó, es un error grave**: se corrige primero.
   - ¿La música cansa, tapa algo o está muy fuerte? ¿Los efectos suenan bien o molestan (en especial el teléfono, que es el más fuerte)?
   - ¿Se entiende todo con el sonido apagado?
3. **Se mide aparte** (la sesión): el peso real de cada archivo, el salto de volumen en cada empalme y que nada suene antes del primer toque.
4. **Qué se anota en «Lo aprendido»** del agente (`.claude/agents/disenador-de-sonido.md`) después de la prueba: qué dijo Ronald de cada punto de arriba, el peso real, si el bucle empalma, si el Producer respetó la reestructura de S1, y si los efectos por código bastan o hay que pedir alguno a Flow.

### S.6.8 Qué falta

- **Ronald:** bajar las dos pistas ya generadas (S0 y S2), decidir si se piden S1 y S10 a Flow (dos pedidos) y escuchar la prueba.
- **Construcción:** el módulo de audio, el botón de silencio y las pruebas (todavía no escrito).
- **Sonido (yo):** al llegar los casos 3 a 8 y la revelación, sumar su fila de eventos a la tabla S.6.2 y sus pistas al manifiesto.

---

## Lista de salida · Tema 1 · sonido v2

Los conteos salen de búsquedas sobre este archivo con la herramienta Grep (sin terminal ni script); lo que se hizo a mano se marca «a mano». El crítico los recuenta con script.

| Regla | Prueba | Estado |
|---|---|---|
| Una hoja por escena (arranque, 8 casos, revelación, cierre = 11) | 11 títulos «### Hoja S» (Grep: 11) | ✔ |
| Ánimo y drama en cada hoja | 11 líneas «1. **Ánimo y drama.**» (Grep: 11) | ✔ |
| BPM y tonalidad en cada hoja | 11 líneas «2. **Pista de fondo.**» con «BPM» y «Bucle: sí» (Grep: 11) y tabla S.1 de 11 filas (Grep: 11) | ✔ |
| Bucle sí/no y duración en cada hoja | las mismas 11 líneas dicen «Bucle: sí» y los compases (segundos redondeados a mano) | ✔ |
| Capas (calma, duda, tensión, acierto, error, revelación) | punto 3 de cada hoja + tabla S.0; las que no aplican, dicho con el motivo | ✔ (a mano, 11 hojas) |
| Efectos por escena, con descripción de una línea | kit S.2 de 13 efectos (Grep: 13 filas E01 a E13) + punto 4 de 11 hojas (Grep: 11) | ✔ |
| Prompt para Flow Music, listo para pegar, en inglés | 11 prompts «> Instrumental 8-bit chiptune loop» (Grep: 11) más 1 prompt de prueba de efecto | ✔ |
| Ningún sonido da la respuesta | S.0 «regla de oro»; cuidados explícitos en S1, S3, S5, S6, S7, S8, S9 | ✔ (a mano) |
| Volumen y silencio; el juego se entiende sin sonido | S.0 («Sin sonido el juego se entiende igual», botón de silenciar) y S.5 | ✔ |
| Web y app por igual, primer toque, pistas cortas con bucle | S.0 («Web y app por igual», «Peso») | ✔ |
| Ajustes del crítico v15: I4 (cinco sonidos que juzgan) y C8 (huecos y descuidos) | I4.1 en E04; I4.2 en S0; I4.3 en S5; I4.4 en S1 y S2; I4.5 en S3; C8a en Decisión 2; C8b en «Peso»; C8c en S1 a S8 y E06/E07; C8d y C8e en S2 y S.0; C8f en S7; C8g en S4; C8h en S10; C8i en cabeceras. Búsqueda con Grep de cada cambio | ✔ (a mano; el crítico recuenta con script) |
| C6 (dos líneas de la jefa y de Ugarte) | **No toca al sonido:** `07` no cita ninguna de las dos frases (Grep de las dos frases fuera de esta fila: 0); las corrige `disenador-narrativo` | ✔ (no aplica) |
| Decisiones de Ronald (jefa `06` I2: decidida A, 08-10, aplicada; caso 5 `06` I7: decidida, 08-10, aplicada) | Decisión 4 aplicada; Decisión 5 «decidida, 08-10, aplicada» (E08 fuera del turno 1 de S5; S.0 y S.4 al día) | ✔ |
| Licencia de Flow Music | sección «Licencia de Flow Music: Ronald la autorizó (08-10, vigente)» al principio, con cita de `RETOMAR.md`; ya no se pregunta | ✔ |
| S.6 Integración (09-10): tabla fase a pista (13 fases), tabla evento a efecto, reglas, archivos y manifiesto, lista de descargas, prueba | Script de recuento (13 fases, ids de efecto E01 a E14 todos definidos en S.2, eventos de `Mesa.tsx` cubiertos); ver resumen de la entrega | ✔ |
| Cada escena, su propia música; ninguna copiada de otra materia | tabla S.1: 11 filas; 9 BPM distintos (66, 84, 76, 108, 92, 72, 96, 88, 80) más 60 repetido en S9 y S10, y tonalidades distintas salvo Sol mayor en S1, S9 y S10; la paleta general se declara propia del Tema 1 | ✔ (S9 y S10 comparten tempo y tonalidad a propósito, son dos momentos del mismo cierre) |
| Oficio de la carrera (3 líneas) | Carrera: Psicología. Oficio: psicólogo o psicóloga de colegio que verifica afirmaciones con datos. Papel del jugador: psicólogo del Departamento de Orientación (vigente en `05` NT1.1 a NT1.3). Las 11 hojas usan oficina, papeles, teléfono, sala de dirección | ✔ |
| Tuteo y sin guiones largos | Grep de «—» y de 9 formas de voseo: 0 coincidencias salvo esta misma línea de la tabla. `buscar_voseo.py` sin correr (ver pendientes) | ✔ (Grep) |
| Texto que lee el alumno medido | **No aplica:** esta etapa no define texto de pantalla; sus frases se citan de `05` | ✔ (no aplica) |
| La calificación | **No aplica:** sin nota; solo se registra el sonido silenciado o no | ✔ |

**Pendientes por falta de terminal:** (1) correr `buscar_voseo.py` sobre este archivo; (2) medir peso real de los archivos cuando existan; (3) comprobar con script los segundos por compás.
