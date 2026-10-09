# Tema 1 · Psicoestadística (Psicología) · Mapa de ambientes · v20 horas · 09-10-2026

> **Aviso de honestidad (primera línea):** esta sesión no tuvo terminal ni navegador. Todo conteo de abajo está hecho **a mano** (conteos chicos, dicho en cada línea), no se tocó `src/` y **no se pudo hacer commit ni push desde esta sesión**: lo hace quien la lanzó (ver «Lista de salida»). Los tamaños de los PNG existentes (`ventana_noche`, `reloj_estante`) se ven en pantalla pero no se midieron con `verificar_arte.py`; el artista los confirma al empezar.
>
> **Cierra la v1 del 09-10** con las decisiones de Ronald del 09-10 (aprobadas, no se vuelven a preguntar) y las correcciones de la revisión v19 de `06-revisiones.md`. Reemplaza el mapa anterior (que empezaba a las 21:30 y amanecía en el caso 8).

## Decisiones de Ronald aplicadas (09-10)

1. La hora de la historia va de **23:00 a 05:30**.
2. El **amanecer llega solo al final de la prueba** (el cierre del informe). Antes, todo es noche.
3. El **reloj marca la hora exacta**.
4. **Dani ya no está en la escena**: es solo voz (nombre, color y cara en la caja de diálogo). La jefa aparece en su fase; el jugador no se ve.

## Decisiones pendientes de Ronald

Ninguna de gusto. Solo un ajuste de texto que habilita su aprobación del mapa y hace la narrativa (no este documento): en el caso 8 la jefa dice «Ugarte te espera en dirección»; sumar «Llegó temprano, antes del consejo.» (a las 04:50 sigue siendo de noche y el consejo es la mañana siguiente, así que los «mañana» de los casos 2 y 4 no se tocan).

## 1. La idea en simple

**La noche pasa mientras juegas.** Empiezas a las 23:00 con la oficina de noche y, cuando firmas el informe y se acaba la prueba, llegan las 05:30 y entra la primera luz por la ventana. Es **el mismo escritorio y el mismo dibujo base**; lo que cambia es la ventana, el reloj, el color general y uno o dos objetos según el caso.

Dos capas que no se mezclan (por eso el orden barajado de los casos 3 a 7 no rompe nada; comprobado en la v19 con las 120 permutaciones):

| Capa | De qué depende | Qué controla |
|---|---|---|
| **La hora** | De **cuántos casos llevas terminados** `k` (nunca de cuál caso es) | Cielo y luna en la ventana, ventanitas de la ciudad encendidas, **reloj (hora exacta)**, tinte general de la noche |
| **El lugar del caso** | De **qué caso es** (nunca de la posición ni de la versión) | Un objeto o dos sobre el fondo, y la dirección como cuarto aparte (solo el caso 8) |

**Reglas (con las correcciones v19):**
1. **El ambiente no depende de la versión (P, B o A) ni de los medidores.** Dos excepciones, dichas como lo que son, **consecuencias del mundo y no «ambiente»**: la lámpara baja cuando un medidor llega a 25 o menos (ya decidido), y el frío del caso 5 turno 2, que llega **con la llamada o la nota que solo existe si el alumno erró** (aviso de error, igual que la jefa con la cabeza entre las manos). Nada de color premia un acierto. *(v19 hallazgo 4)*
2. **La lámpara es solo la señal de medidor** (brillo fijo por hora: no sube ni baja con la noche). La hora vive en el cielo, el reloj y el tinte general. *(hallazgo 2)*
3. **El «archivo» no es un cuarto al que se va**: es **el mismo escritorio con el archivador abierto detrás** (la jefa trae los papeles); no hace falta línea de narrativa ni lugar nuevo. La **dirección** sí es cuarto aparte porque la historia lleva allí («Ugarte te espera en dirección»). *(hallazgo 1)*
4. **Un solo tipo de luz estable en los casos 3 y 6** (luz del techo, sin parpadeo ni zumbido); se distinguen por el objeto (tambor, pizarra). No se usa la palabra «tubo» para objetos de la escena (tubo = medidores). *(hallazgo 3)*
5. **Plaza fija y «otro trimestre de prueba»** tienen el mismo ambiente. La diferencia la dice la jefa con palabras.
6. **Un cambio de luz que anuncia algo llega con la reacción visible, no antes.**
7. **Con «reducir movimiento»** activado, la luna, las ventanitas y las manecillas no se animan: se muestra el estado de la hora actual, fijo.

## 2. Hora por casos terminados (`k`)

Una caja de tiempo chica: cada caso terminado suma 50 minutos de noche; el reloj marca la hora exacta y **no corre solo** (no hay presión de tiempo: el tiempo del juego sigue siendo las fichas). Se muestra al empezar el momento; durante el caso el minutero se desliza despacio a la hora siguiente (cosmético, cuando termina el caso).

| `k` (casos terminados) | Momento | Hora exacta | Ventana: cielo | Luna | Ventanitas de la ciudad encendidas (de 16) |
|---|---|---|---|---|---|
| 0 | Título, bienvenida, paso 1 | **23:00** | Noche azul oscura (`181425` arriba, `262b44` al horizonte) y estrellas | Alta, a la izquierda | 13 |
| 1 | Caso 2 | **23:50** | igual | Un poco más a la derecha | 12 |
| 2 | 1.er caso de 3 a 7 | **00:40** | Noche cerrada, estrellas más nítidas | Cruza el centro | 10 |
| 3 | 2.º caso de 3 a 7 | **01:30** | igual | Cruzó, baja a la derecha | 8 |
| 4 | 3.º caso de 3 a 7 | **02:20** | La más oscura | Más baja | 6 |
| 5 | 4.º caso de 3 a 7 | **03:10** | igual | Baja, casi en el borde | 4 |
| 6 | 5.º caso de 3 a 7 | **04:00** | Se empieza a vaciar el negro (`262b44` sube un escalón), **todavía noche** | Tocando los edificios | 3 |
| 7 | Caso 8 (siempre el último) | **04:50** | Noche, sin claridad nueva (el amanecer es solo del cierre) | Casi puesta | 3 |
| 8 (cierre) | Cierre del informe, revelación, final | **05:30** | **Primera luz**: franja `e4a672` y `feae34` al horizonte, resto `3a4466` a `5a6988`; estrellas fuera | Pálida, bajando, medio velada | 5 (las que se encienden con el día: la ciudad despierta) |

Entre `k = 0` y `k = 7` el cielo cambia por **mezcla de transparencia** entre `cielo_noche` y `cielo_alba` (0 % hasta `k = 7`); en `k = 8` pasa a 100 % con un fundido de 3 s. La mezcla no depende del caso, solo de `k`.

**Luz general (tinte del velo):** noche azul `181425`/`262b44` en `k = 0`, algo más cerrada hacia `k = 4` (misma paleta, un escalón), vuelve a abrirse hacia `k = 7`, y en `k = 8` aplica `ambiente-primera-luz.json`. **La lámpara no cambia con la hora.**

## 3. UNA tabla: un ambiente por momento (14 momentos)

Costo: **bajo** = solo luz o color o capas ya pagadas; **medio** = al menos un sprite nuevo sobre un fondo ya pagado; **alto** = un cuarto nuevo. «Música» dice si el ambiente pide algo a `07`.

| # | Momento | Hora (reloj) | Lugar y qué se ve | Qué cambia respecto de la base | Costo | Música |
|---|---|---|---|---|---|---|
| 1 | **Título** | **23:00** (`k = 0`) | La oficina vacía, solo lámpara; ventana con luna alta y ciudad, reloj, libros. Sin jefa ni Dani. | Solo la hora de `k = 0` (luz más cerrada que la base). | Bajo | S0, sin cambio |
| 2 | **Bienvenida** (3 tarjetas) | **23:00** | La misma oficina. Con cada tarjeta se enciende algo: 1, la lámpara; 2, la ventana con la ciudad; 3 («Hoy lo ocupas tú»), la jefa junto a la puerta. | Solo luz por pasos. | Bajo | S0 |
| 3 | **Paso 1 · El primer encargo** | **23:00** | El mismo escritorio, con el **archivador abierto detrás** (estantes, cajas y cajones abiertos, polvo en el cono de la lámpara). Dani ya no está en el fondo; su respuesta llega por voz. | Un fondo parcial nuevo (`archivador_abierto`). | Medio | S1, sin cambio |
| 4 | **Caso 2 · El colegio sin denuncias** | **23:50** | La oficina con el **panel de acuerdos y su corcho de hilos** detrás de la mesa. | Un objeto (`corcho_hilos`). Igual para P y B. | Medio | S2 |
| 5 | **Caso 3 · La cifra del colegio** | **00:40 a 04:00** según su posición | El escritorio con el archivador abierto detrás (ya pagado) y el **tambor de las tandas** sobre la mesa. Luz del techo estable. | Un objeto (`tambor`). | Medio | S3, sin cambio. **Sin zumbido** (el del mapa v1 se quita). |
| 6 | **Caso 4 · Dos estudios, una sola cita** | **00:40 a 04:00** | La oficina base. Sobre la mesa **dos carpetas** (una gorda, otra delgada). Qué lado es el bueno cambia por versión y **no** cambia nada de la escena. | Un sprite (`carpetas`), sin segunda lámpara (se recorta por costo). | Medio | S4 |
| 7 | **Caso 5, turno 1 · «Hace un mes, otra noche como esta»** | **22:10** en el reloj (otra noche, un mes atrás; la tarjeta de tiempo lo dice). La hora del alumno no avanza. | La oficina del recuerdo: farolas tibias, patio con luces amarillas; la jefa con su termo. Sin luna. | `ambiente-recuerdo-tibio.json` más cielo `cielo_alba` fijo al 30 %. | Medio | S5 parte A, sin cambio |
| 8 | **Caso 5, turno 2 · «Hoy»** | **La hora de su posición** (00:40 a 04:00). | La oficina de esa noche. Entra neutro, igual para todos. El **frío** (lámpara blanco-azulada, menos color) llega **con la llamada del director vecino o la nota de la tallerista**, que solo existen si el alumno erró (decisión 1 de la sección 1: consecuencia, no ambiente). | Solo luz y color, y solo cuando el mundo reacciona (por código). | Bajo | S5 parte B: luz y música cambian juntas |
| 9 | **Caso 6 · Los 480 de la frase** | **00:40 a 04:00** | El escritorio con el archivador abierto detrás (ya pagado) y la **pizarra con marcas de conteo (palitos)**. Luz del techo **estable, igual que el caso 3**. | Un objeto (`pizarra_marcas`) sobre el `pizarron` existente. | Medio | S6 |
| 10 | **Caso 7 · El gráfico del informe** | **00:40 a 04:00** | La oficina base. **La lámina del informe**, grande, pegada en la pared junto a la puerta; tinte azul-violeta suave sobre ella. La lámina no cambia por P o B. | Un sprite (`lamina_informe`). | Medio | S7 (se mantiene el cuidado de no sugerir «escalón») |
| 11 | **Caso 8 · La dirección decide** | **04:50** (`k = 7`). **Sigue siendo de noche**: no hay amanecer aquí. | **La sala de dirección** (cuarto aparte, lo lleva la historia): escritorio ancho de madera, escudo del colegio, ventana grande al patio **oscuro con una farola**, Ugarte enfrente y Beto con su taza. Lámpara verde sobre el escritorio. | Fondo nuevo (`direccion_fondo`). La ventana usa las mismas capas de cielo del mapa. | Alto | S8, sin cambio. Opcional: grillos muy bajos |
| 12 | **Cierre del informe** | **05:30** (`k = 8`). **Aquí llega el amanecer.** | La oficina de vuelta, la jefa junto a la puerta, la lapicera y el timbre sobre la mesa. Primera luz por la ventana; luna pálida; ciudad que despierta. | `cielo_alba` al 100 % y `ambiente-primera-luz.json`. Lámpara sin cambio. | Bajo | Cambia de S8 a la música del cierre: **es un pedido a `disenador-de-sonido`** (S8 en Do menor contra una primera luz choca); alternativa sin pista nueva: fundido a silencio un compás y que S9 entre como ya estaba en `07`. |
| 13 | **Revelación · las 8 cartas** | **05:30** | La mesa vista de cerca, ocho cartas boca abajo. Cada carta que se da vuelta sube un poco la luz (de gris-azulado a luz de mañana), en cualquier orden y con cualquier rama. **La luz final es la misma para todos**, aunque haya fallado todo (ninguna carta ilumina más por haber acertado). | Solo luz, con las notas de E12. | Bajo | S9, sin cambio |
| 14 | **Final · el camino, la plaza, la pregunta de Beto** | **05:30** | La oficina con la **puerta abierta al patio** de primera mañana (farolas apagándose, el café de la esquina abierto); Beto apoya su taza. **Dani no está** ni en la silla. | Dos sprites (`puerta_patio`, `taza_beto`). | Medio | S10, sin cambio |

**Cuentas a mano:** 14 filas; costo bajo 5 (filas 1, 2, 8, 12, 13), medio 8 (3, 4, 5, 6, 7, 9, 10, 14), alto 1 (11). 5 + 8 + 1 = 14.

**Horas, resumen:** 23:00 (filas 1 a 3), 23:50 (fila 4), cinco posiciones de 00:40, 01:30, 02:20, 03:10 y 04:00 (filas 5, 6, 8, 9, 10; la fila 7 marca 22:10 por ser recuerdo), 04:50 (fila 11), 05:30 (filas 12 a 14). Todas entre 23:00 y 05:30, salvo el recuerdo del caso 5, que es deliberadamente de otra noche.

## 4. Recomendación (UN conjunto)

**La tabla completa con un solo cuarto nuevo (la dirección).** El «archivo» pasa a ser un fondo parcial del mismo escritorio (v19 hallazgo 1a). Lo que más se nota con menos costo es la hora: la ventana viva (cielo, luna, ciudad) y el reloj con la hora exacta; casi todo es código sobre capas ya dibujadas.

**Orden de construcción** (se puede parar en cualquier punto y ya mejora lo de hoy):
1. Capas de ventana y reloj sin agujas (artista) y su animación por `k` en `EscenaPixi.tsx`.
2. Tinte de hora y `ambiente-primera-luz.json` en el cierre.
3. Objetos sueltos (corcho, tambor, carpetas, lámina, pizarra, puerta con patio, taza).
4. `archivador_abierto`.
5. La dirección.

**Ideas propias (marcadas):** el reloj como medida de avance sin barra de progreso; detalles baratos del paso del tiempo (la nube lenta, una ventanita que se apaga); los cinco 50 minutos exactos se ven en la hora del reloj y la caja de tiempo, sin cuenta regresiva. **Quitadas por costo o por mal significado:** la segunda lámpara del caso 4, la taza que se suma cada dos casos, el termo que se vacía, el zumbido de luz, el tubo parpadeante.

## 5. Música y sonido

- Pistas aprobadas (S0, S1, S2, S10): sin cambio. S3 a S9: sin cambio, salvo el cierre (fila 12): **pedido a `disenador-de-sonido`**, no un hecho.
- **Sonidos de ambiente opcionales por código** (suenan igual en toda versión): grillos lejanos muy bajos de la fila 1 a la 11 y pájaros desde la fila 12. **Se quita el zumbido** de luz (v19 hallazgo 10): un zumbido cerca de E10 se leería como alarma de medidor.

## 6. Qué `ambiente-*.json` cambia

Los JSON de `docs/juego/arte/psicoestadistica/` son cambios de paleta (colores EDG32 a otros EDG32). La **hora** se hace por código (mezcla de capas y tinte), no por JSON.

| Archivo | Qué pasa | Cambio |
|---|---|---|
| `ambiente-primera-luz.json` | **Se usa** en las filas 12 a 14 (cierre, revelación, final) | **Se edita:** se quitan las dos reglas `fee761 → ead4aa` y `feae34 → e4a672`, para que fichas encendidas, ventanitas y estrellas no se pongan pálidas (duda abierta del artista). El resto queda. |
| `ambiente-amanecer.json` | **Deja de usarse**: el amanecer ya no es un tramo propio, está dentro de `primera-luz`. | **No se borra** (nombres estables): se marca «sin uso, 09-10» en su campo `nota`. |
| `ambiente-recuerdo-tibio.json` | **Nuevo**, para la fila 7 (recuerdo del caso 5). | `262b44 → 3e2731`, `3a4466 → 733e39`, `5a6988 → c28569`, `8b9bb4 → e8b796`. Todo EDG32. |

No hace falta JSON para: la noche (es la paleta base), el frío del caso 5 turno 2 (luz por código, llega con la llamada), la dirección (es una pieza propia con su luz de lámpara verde).

## 7. CAPAS que dibuja `artista-pixel` (paleta EDG32; guía `docs/juego/ARTE-LINEA-GRAFICA.md`)

Escena de 188×150 px. Todo con contorno, 3 tonos por pieza y sombra a la luz de la lámpara. **Lo que se anima lo hace el código sobre estas capas; el artista no dibuja ningún estado intermedio.** Tamaños de las piezas que ya existen, a confirmar con `verificar_arte.py`: `ventana_noche` entra en 76×60 (se coloca en x 4, y 6) y `reloj_estante` en unos 44×60 (x 84, y 8).

| # | Capa (archivo) | Tamaño | Transparencia | Qué lleva (colores EDG32) |
|---|---|---|---|---|
| V1 | `ventana_marco` | 76×60 | Hueco interior de **68×52** transparente | Marco y cruz de madera `3e2731`/`733e39`, borde de luz `be4a2f`, repisa. **Sin cielo, sin luna, sin luces.** |
| V2 | `cielo_noche` | 68×52 | Opaco | Tres bandas pixeladas de arriba abajo: `181425`, `262b44`, `3a4466` al horizonte. Sin estrellas. |
| V3 | `cielo_alba` | 68×52 | Opaco | Cinco bandas: `262b44`, `3a4466`, `5a6988`, `e4a672`, `feae34` (horizonte). Sin sol, sin estrellas. |
| V4 | `estrellas` | 68×30 | Transparente | 14 puntos de 1 px: 10 `c0cbdc`, 4 `fee761`. Por código se desvanecen al amanecer. |
| V5 | `luna` | 9×9 | Transparente | Creciente `ead4aa`, sombra `8b9bb4`, sin contorno oscuro (contra el cielo). Por código se mueve en arco. |
| V6 | `ciudad_siluetas` | 68×20 | Transparente arriba | Edificios `181425`/`262b44`, ventanas **apagadas** `3a4466`; y **16 huecos de ventanita de 2×2** marcados en la siluetas. Va con `ciudad_luces.json` (las 16 coordenadas x, y) para que el código pinte 2×2 `fee761` o `feae34` encendidas. |
| V7 | `nube` | 14×5 | Transparente | `262b44` con borde `3a4466`; cruza lenta. |
| R1 | `reloj_cara` | 16×16 | Redondo, transparente fuera | Borde `733e39`, cara `ead4aa`, 12 marcas `3e2731`. **Sin manecillas.** Pivote al centro (8, 8), anotado en `reloj_cara.json`. Las manecillas las pinta el código: la de horas 1×4 px `3e2731`, la de minutos 1×6 px `181425`. |
| R2 | `estante_libros` | unos 44×44 | Transparente | El estante con los libros del `reloj_estante` actual, **sin el reloj**. |
| O1 | `archivador_abierto` | 40×64 | Transparente | Archivador con cajones abiertos, carpetas y papeles asomando, `5a6988`/`8b9bb4`, papel `c0cbdc`/`ead4aa`. |
| O2 | `corcho_hilos` | 40×30 | Transparente | Corcho `c28569`, 6 papeles, hilos `a22633`. |
| O3 | `tambor` | 20×20 | Transparente | Tambor con bolitas numeradas, `be4a2f`/`ead4aa`. |
| O4 | `carpetas` | 2 sprites de 18×14 | Transparente | Una gorda y una delgada, mismo color (`733e39`), para que ninguna delate. |
| O5 | `pizarra_marcas` | 36×30 | Transparente | Palitos de conteo `ffffff` en grupos de cinco sobre el pizarrón. |
| O6 | `lamina_informe` | 28×36 | Transparente | Lámina de informe con un gráfico de barras **neutro** (sin dar a entender si engaña), `124e89`/`0099db`. |
| O7 | `direccion_fondo` | 188×100 | Opaco | Escritorio ancho de madera, escudo del colegio, ventana grande al patio con la farola (`fee761`), paredes `3a4466`. Sin personajes. |
| O8 | `puerta_patio` | 40×60 | Transparente | Puerta abierta al patio, café de la esquina, farolas apagándose. |
| O9 | `taza_beto` | 8×8 | Transparente | Taza `c0cbdc` con vapor de 1 px. |

**Se retira de la escena:** `dani_silueta` y `dani_silueta_fondo` (Dani ya no se dibuja; si hay retrato en la caja de diálogo, es otro archivo y queda). Total: **19 archivos nuevos o separados** (V1 a V7, R1, R2, O1 a O9 con O4 doble) y 3 JSON de coordenadas (`ciudad_luces.json`, `reloj_cara.json`, y el de paleta del recuerdo).

## Lista de salida

| Regla | Estado | Prueba |
|---|---|---|
| Decisiones de Ronald del 09-10 aplicadas (23:00 a 05:30, amanecer solo al cierre, hora exacta, Dani fuera) | ✔ a mano | Sección «Decisiones aplicadas», tabla 2 (horas) y filas 1, 11, 12, 14. |
| Una tabla, una fila por momento | ✔ a mano | 14 filas; caso 5 en dos. |
| Horas dentro de 23:00 a 05:30 | ✔ a mano | Horas: 23:00, 23:50, 00:40, 01:30, 02:20, 03:10, 04:00, 04:50, 05:30; el recuerdo del caso 5 (22:10) está dicho como otra noche. |
| Casos 3 a 7 sin depender del orden | ✔ a mano | Hora por `k`, lugar por caso (sección 1; la v19 corrió las 120 permutaciones). |
| Correcciones v19 hallazgos 1 a 10 | ✔ a mano | 1: archivo = archivador (filas 3, 5, 9); 2: lámpara fija; 3: luz estable y sin «tubo»; 4: frío como consecuencia; 5: amanecer solo al cierre, caso 8 a 04:50, línea «Llegó temprano»; 6: reloj medio, sprites contados en la sección 7; 7: Dani fuera; 8: luz final igual; 9: pedido a sonido; 10: sin zumbido. |
| Costos y conteo | ✔ a mano | 5 + 8 + 1 = 14. |
| El ambiente no se vuelve un chivato | ✔ a mano | Reglas 1 y 6; frío = consecuencia. |
| Cuántos dibujos | ✔ a mano | 19 archivos de arte (sección 7). |
| No se toca `src/` | ✔ a mano | Solo este documento. |
| Tuteo, sin guiones largos | ✔ a mano | Releído. |
| Texto del mapa: tamaño y contraste | ✔ n/a | No hay pantalla ni boceto nuevo; la página `bocetos/ambientes/index.html` es de la v1 y **ya no corresponde a estas horas** (se actualiza o se retira cuando exista el arte). |
| Comprobación en disco, commit y push | ✘ pendiente | No hubo terminal en esta sesión: quien la lanzó debe abrir el archivo, buscar «v20 horas», y hacer `git pull --ff-only`, commit y `git push origin HEAD:main`. |
