# 06 · Revisiones: lo que falla en lo propuesto

**Versión 15 · 08-10-2026** (la entrada más nueva, narrativa v3 y sonido v1 del Tema 1 de Psicoestadística, está justo debajo de las decisiones; la v14, simulación del bucle v2, va después; la v14 está antes de la v13; la v13, antes de la v12) · Agente: `critico-de-jugabilidad` · Lo más nuevo arriba.

## v22 · plan «objetivo y causa» del Caso 2 (09-10-2026) · Tema 1 de Psicoestadística (Psicología)

**Qué se revisó (papel, sin navegador, por pedido):** `plan-psicoestadistica-tema1-objetivo-y-causa.md` contra `Mesa.tsx` (fases `entrada2`, `archivo2`, `frase`, `confirma`, `reaccion`, `fin`), `guion-pantalla-t1.ts` (`reaccionCaso2`, `porQueSeMovieron`), `efectos-t1.ts` (filas R2.x), `respuestas.ts` (`resolverCaso2`), `cifras.ts` (`caso2`, `HECHO_CLAVE_2`), `papeles-t1.json` (C2-1 a C2-9), `orientacion-t1.json` (A11, A12, B-arch2-x, B-cierre1-2). Script guardado: `scripts-t1/contar_plan_objetivo_v22.py` (salida: 15 filas, 75 celdas, **12 celdas con más de una oración**, 0 celdas con más de 25 palabras antes de llenar los huecos, 0 guiones largos, sin voseo). Oficio: las tres líneas están y «psicólogo de colegio que decide si un informe sale» es del oficio: ✔. Cifras del cuadro contra la tabla: las 15 filas coinciden con R2.1 a R2.4 (a mano, cotejadas una a una).

**Veredicto:** se puede mostrar a Ronald **con 3 cambios de texto** (hallazgos 1 a 3). Nada bloquea el diseño. El cuadro «Qué pasó» ataca justo lo que dijo Ronald (qué provocó cada cosa); la parte de «objetivo» cambia menos de lo que el plan cuenta (hallazgo 4).

### Las tres preguntas, como alumno que no sabe nada, con el plan aplicado
- **(a) ¿Qué hago?** «Debo averiguar cómo se contó el cero del titular. Abro papeles (tengo 3 fichas, hay 6) y luego firmo, redacto o freno.» Se entiende **si** la línea fija «Tu objetivo» queda a la vista; el objetivo ya no depende de recordar un globo.
- **(b) ¿Qué cambió y por qué?** Con el cuadro: «Firmé, y el papel decía que desde mayo solo se anotan denuncias con firma de un adulto; por eso Credibilidad bajó 20». Sí se entiende, con una duda: los medidores se mueven al empezar la reacción y el cuadro llega 3 o 4 toques después (hallazgo 6).
- **(c) ¿Qué me llevo?** «Antes de creer un cero hay que saber cómo se contó.» Lo dice la pantalla final. En la versión sana (1 de 3) me llevo «firmar con papel está bien», que es verdad pero menos vistoso.

### «Pulsa cualquier cosa»: P (con problema, 2 de 3) y B (sana) × firmar / redactar / frenar × clave abierta (K) o no
| Versión | Decisión | Cred / Voz | ¿Se distingue lo malo de lo bueno y por qué? |
|---|---|---|---|
| P | firmar K / sin K | −20 / +10 (igual con y sin K) | Sí: Cred baja y el cuadro dice por qué. Con K duele más (sabías). |
| P | frase con pieza | +8 / +4 (+10 con buzón) | Sí: la mejor; el cuadro cuenta que firmar habría dado −20. |
| P | frase sin pieza | −8 / +4 | Sí: «sonaba prudente pero no decía cómo se contó». |
| P | frenar K / sin K | +3 / −8 | Parcial: sube Cred sin haber sabido; el cuadro lo marca («no sabías por qué»). |
| B | firmar K / sin K | +10/+10 y +5/+5 | Distingue solo gracias a «Si estuviera mal contado: −20» (única señal de que acertó por suerte). |
| B | frase con pieza / sin | +10/+10 y 0/+4 | Sí. |
| B | frenar | 0 / −15 | Sí: «era cierto y presentaron sin ti». |
Sin K el 100 % de las filas queda explicado por el cuadro: **la pantalla ya no es «sube pulses lo que pulses»**. Queda una verdad de diseño: en B firmar con K y la mejor frase empatan (+10/+10); el alumno concluirá «firmar es igual de bueno» y la línea «Con otra decisión: habría dado lo mismo» se lo confirma. Es correcto, pero no enseña que redactar vale más.

### Hallazgos (de más a menos grave)
| # | Gravedad | Qué pasa | Por qué importa | Propuesta | Agente que debió evitarlo |
|---|---|---|---|---|---|
| 1 | 🟠 | Las líneas bajo los botones (sección 2) **dicen cuál es la correcta**: «Redactar: escribes solo lo que sabes de cómo se contó» y «Frenar: úsalo si no puedes saber cómo se contó». Con «Averigua cómo se contó el cero» arriba, el alumno que quiere terminar elige «Redactar» leyendo, sin mirar un papel. Además `B-cierre1-2` (antes del Caso 2) ya dice «Una frase bien sostenida sube los dos». Es la elección entre frases donde la prudente se nota sin calcular | Se pierde el descubrimiento: la regla se aprende sin usarla | Las líneas dicen **el acto y su costo**, no el criterio: «Firmar tal cual: el cero va al consejo con tu firma.» / «Redactar la frase: en lugar del cero, escribes con las piezas de los papeles que abriste.» / «Frenar: el informe no sale esta noche.» Quitar «Úsalo si…». Dejar `B-cierre1-2` como está (es de Ronald/aprobado) y avisarle | disenador-narrativo (2.ª vez: pista que regala, ver v16) |
| 2 | 🟠 | «Una frase por renglón»: **12 de 75 celdas** del cuadro llevan dos oraciones («Quedó sin abrir: {papel}. Decía: {hecho}.», «…habría dado lo mismo. Frenar te habría costado 15 de Voz.»). También «Tu objetivo: … Toca un papel…; cada uno gasta una ficha.» (3 ideas) y B-conf-1 (2). Al llenar los huecos, «Quedó sin abrir… Decía…» pasa de 25 palabras (nombre del papel de 4 a 6 más un hecho de hasta 16). La lista de salida del plan dio ✔ «a mano» a «25 palabras» y «un renglón» y no es cierto | Es regla de Ronald y la prueba nueva del plan solo cuenta palabras, no oraciones | Partir en dos renglones del cuadro («Quedó sin abrir.» como etiqueta de «Cómo se contó» y el hecho en el renglón siguiente) y añadir a la prueba nueva: una oración por renglón, 25 palabras **después** de llenar huecos con las 3 versiones del clave | director-de-juego (lista con ✔ «a mano» de algo contable; 2.ª vez) |
| 3 | 🟠 | La pregunta 1 del plan se apoya en que decir la frase antes arregla el objetivo, pero **A11 ya dice «¿Ese cero se sostiene?»** y `B-arch2-1` ya dice «Busca qué respalda ese cero». Ronald igual no entendió. El plan lo reescribe casi igual («cómo se contó») y mezcla dos vocabularios: «se sostiene» (Paso 1, B-cierre1-2, cuadro «no se sostenía») y «cómo se contó» | El cambio de palabras no sería lo que arregla; lo que arregla es la **línea fija visible** y el **cuadro**. Dos vocabularios confunden | Decirle a Ronald la verdad: el texto ya existía; lo nuevo es que no se pierde (fija arriba) y que ahora hay causa. Unificar: «cómo se contó» en el Caso 2 y no mezclarlo con «se sostiene» en el mismo cuadro | director-de-juego |
| 4 | 🟡 | Se repite el objetivo **cinco veces** (globo 1, globo 2, J4, línea fija, confirmación). Con v20 hallazgo 6 (8 toques antes del primer toque real) esto alarga la entrada | Cansa; las líneas que repiten se sienten forzadas | Dejar globo 1 (con el titular), la línea fija y B-conf-1; quitar globo 2 o J4 (basta la regla de la jefa) | disenador-narrativo (2.ª vez) |
| 5 | 🟡 | `hechoClaveSana` de C2-3 dice «las derivaciones por conflicto también bajaron, de {d0} a {d1}»: en el código B hace `d1 = d0 − (1 a 3)`, así que es cierto. Pero «Quedó sin abrir: {papel}. Mostraba que…» en P/B revela el papel clave tras decidir: bien. **En B-firmar-sin K**, «Si el cero hubiera estado mal contado, firmar así te habría costado 20» es hipotético, no el número de esta partida: decirlo «Si…» (ya está) y no prometer más | La línea no miente; que no se lea como puntaje real | Mantener el «Si…» y no llamarla «puntos reales de la tabla» en la ficha | disenador-aprendizaje |
| 6 | 🟡 | El cuadro sale cuando termina `reaccionFin`, después de 3 o 4 toques de diálogo (la madre dice tres líneas). Los tubos ya se movieron al empezar la reacción | El alumno ve el cambio y recibe la causa más tarde | Mostrar el cuadro junto a la primera línea de reacción, o mover los tubos recién al abrirlo | construcción |
| 7 | 🟡 | B-conf-1 («No abriste ningún papel. ¿Decides sin saber…?») es una línea de la jefa en un párrafo suelto (`mesa-aviso`), sin cara ni caja. Sigue sin resolver J5 de v20 («Lo he pensado bien» ya está oculto sin papeles, ✔) | Rompe «lo que dicen los demás va en caja con cara» | Pasar B-conf-1 por `Dialogo` con la jefa | construcción |
| 8 | 🟡 | Proporción: 15 textos ×5 renglones para 9 filas de pago. Cred y Voz dependen de la **fila**, no de K: son 9 pares, no 15. Solo «Cómo se contó» y «Con otra decisión» cambian con K | Más texto = más fallas de la clase 2 | Generar «Con otra decisión» con una plantilla («Con {mejor alternativa} habría {cambioDe}») calculada con `efectoDe`; escribir a mano solo los 9 pares y la línea «Quedó sin abrir» | director-de-juego |
| 9 | 🟡 | Todo lo que el texto nombra se ve, salvo el titular del informe: hoy solo aparece la `Grafica` en el corcho; el plan ya lo pide («dejar visible el informe»). «Consejo» y «distrito» no se definen en el Caso 2 (A1 dice «consejo»; «distrito» solo en la reacción) | Término sin definir | Anotar en construcción que el titular y su gráfica queden plegados sobre los papeles; no usar «distrito» en el cuadro | disenador-narrativo |

**Estrategia dominante nueva:** ninguna. Probé: abrir siempre los 3 primeros papeles y redactar (es lo que el juego busca; requiere hallar el clave: 3 fichas de 6, con 4 papeles de pinta relevante), frenar siempre (P +3/−8, B 0/−15), firmar siempre (−20 en P), nunca abrir y redactar (−8/+4 en P, 0/+4 en B). El cuadro no abre una ruta nueva; «Con otra decisión» revela la mejor alternativa **después** de sellar (sin vuelta), así que no sirve para tantear en la misma partida.
**Pista antes de decidir:** solo las líneas de botones (hallazgo 1). «Los papeles de la carpeta te lo dicen» (globo 2) avisa que la clave está en la carpeta pero no cuál papel.
**Proporcionalidad:** el trabajo es medio (una función, un json, una tarjeta, una línea fija, 6 pruebas); vale la pena, pero se puede recortar con hallazgos 4 y 8.

**Bien, no tocar:** no cambiar la tabla de efectos (los números están bien; era un problema de causa); «Paso 1» sin tocar; la frase de cierre destacada; no nombrar la técnica antes de la revelación; el «Quedó sin abrir» que muestra el clave tras decidir.

**Mejoras a agentes que propongo:** `director-de-juego`: no dar ✔ «a mano» a «una oración por renglón» ni a «25 palabras»; contarlos con script (hallazgo 2, 2.ª vez). `disenador-narrativo`: las líneas de botones describen el acto, no el criterio correcto (hallazgo 1, 2.ª vez); y no repetir el mismo objetivo más de tres veces en una entrada (hallazgo 4). `disenador-de-aprendizaje`: ninguna. `disenador-de-bucle`, `disenador-de-sonido`: ninguna.

## v21 · capas de la oficina viva (09-10-2026) · ventana, cielos, estrellas, luna, ciudad, nube, reloj, estante del Tema 1 de Psicoestadística

**Qué se revisó:** las 9 capas de `public/juego/psicoestadistica/arte/` ampliadas (montaje en scratchpad sobre magenta), `scripts/verificar_arte.py` (todas OK: solo EDG32, 0 semitransparencias), y los JSON de `ciudad_luces` (16 huecos 2x2, 68x20) y `reloj_cara` (pivote 8,8, 16x16) contra la guía y el mapa «v20 horas».

### Hallazgos (agente que debió evitarlo: `director-de-juego` en medidas, dibujo del artista en el resto)

1. **Bloqueante, tamaños:** `ventana_marco` es 76x60 (ventana actual 72x60) y `estante_libros` 44x44 (el actual `reloj_estante` 42x54; reloj va en pieza aparte de 16x16). Hay que fijar una medida y recortar o recolocar antes de animar, si no los cielos (68x52) no cubren el hueco ni calzan con el marco.
2. **Bloqueante, cruz del marco** dentro del hueco (ya marcado): con ella las capas de cielo, estrellas y ciudad se ven partidas en cuatro cuadros y la luna puede quedar tapada. Quitarla o pintarla como capa aparte.
3. **Bloqueante, ciudad de noche** (ya marcado): 262b44 sobre 3a4466 casi no se separa; los 16 huecos de luz no se leerán. Subir el contraste (edificios más oscuros que el horizonte o horizonte más claro).
4. **No bloqueante, libros** acostados pequeños y oscuros (ya marcado), el contorno casi desaparece contra el estante.
5. **Nuevo, no bloqueante, nube** 14x5: plana, mismo valor que el cielo (se pierde, parece una mancha); darle un tono más claro y una cima redondeada.
6. **Nuevo, no bloqueante, luna** 9x9: media luna con píxeles gris azulados sueltos en el borde interior; se lee como ruido. Redibujar el limbo limpio.
7. **Nuevo, no bloqueante, reloj_cara:** hay píxeles marrones en los costados fuera del círculo (se ven como asas); y la marca de las 12 y las 6 es distinta de las 3 y las 9. Limpiarlos para que las manecillas giren sobre una cara pareja.
8. **Nuevo, menor:** `cielo_noche` tiene 3 bandas y `cielo_alba` 5; el alba no trae banda intermedia hacia el tono de «primera luz»; la transición se hará por cambio de color en el código, está bien.

**Bien, no tocar:** paleta y 0 semitransparencias; las estrellas (2 colores, dispersas); el cielo de alba con degradado en bandas; el reloj con pivote centrado y manecillas pintadas por código.

**Mejoras a agentes que propongo:** `director-de-juego`: al encargar capas, fijar el tamaño en píxeles de cada una en una tabla y verificarlo con script (hallazgo 1, 1.ª vez).

## v20 · pantalla jugable con arte propio, caras y líneas del jugador (09-10-2026) · Paso 1 + Caso 2 del Tema 1 de Psicoestadística

**Qué se revisó (sin navegador, por pedido):** `EscenaPixi.tsx`, `Mesa.tsx` (Dialogo, hoja, confirma, reacción), `mesa.css`, `guion-pantalla-t1.ts`, `orientacion-t1.json` (J1 a J6 y los textos vecinos), la guía `ARTE-LINEA-GRAFICA.md` y las imágenes (`montaje-*.png`, retratos). Armé la escena a 1× y 4× con las mismas coordenadas del código y la miré. Scripts guardados: `scripts-t1/contraste_caja_tuya_v20.py` (salida en `salida_contraste_caja_tuya_v20.txt`) y `scripts-t1/listar_textos_v20.py`. `verificar_arte.py public/juego/psicoestadistica/arte`: **44 de 44 cumplen la línea gráfica** (solo EDG32, sin semitransparencias). Papel del jugador: «Eres el psicólogo o la psicóloga del colegio» (A2): oficio de la carrera, ✔.

**Veredicto:** mejora grande contra la versión que perdió a Ronald: la escena ya se lee (jefa grande con lentes a la derecha, lámpara, teléfono con ondas, silueta de Dani) y todos los que hablan tienen cara salvo el jugador. **Se puede mostrar a Ronald con 2 arreglos de texto (J2 y J5) y 1 decisión de arte (valor contra tono, hallazgo 3).** Nada bloquea; lo demás es orientación y pulido.

### Hallazgos (de más a menos grave)

| # | Gravedad | Dónde | Qué pasa | Por qué importa | Arreglo mínimo | Agente que debió evitarlo |
|---|---|---|---|---|---|---|
| 1 | 🟠 | `Mesa.tsx:738-739`, J5 («Lo he pensado bien. Esta es mi decisión.») | J5 sale **igual siempre**, también cuando arriba aparece `SIN_PAPELES_AL_FIRMAR` (no abrió ningún papel). Además J5 no va en la caja verde: es un `<p class="mesa-tuyo">` suelto en la confirmación y la regla `.mesa-dialogo.tuyo .mesa-tuyo` (`mesa.css:63`) no lo alcanza: sale en texto normal, sin «Tú» ni borde | El perezoso lee «no abriste nada» y justo debajo «Lo he pensado bien»: el juego le pone en la boca algo falso (suena a sarcasmo o a error) y rompe «lo del jugador va en otra caja» | (a) mostrar J5 con la caja verde y el rótulo «Tú»; (b) ocultarlo cuando `carpeta2.abiertos.length === 0` o darle variante neutra («Voy a firmar.»). Tocar el texto exige NT1.12 y regenerar el json | disenador-narrativo (J5 «sea cual sea la decisión» no consideró el aviso de cero papeles); construcción |
| 2 | 🟠 | J2, `Mesa.tsx:477` | J2 («Primero mi fila de la hoja. Después miro qué hay en el archivo.») se dice **antes** de ver la hoja y de elegir entre «Poner las mías» y «Que responda Dani». Si delega, ya «dijo» lo contrario. NT1.12 pide J2 «tras B-hoja-1, al llenar o delegar»: el código lo adelanta. J3 pasa igual: la tabla lo pone «al abrir el primer papel» y el código lo dice solo en la rama de Dani (`Mesa.tsx:506`), no en la de «propias» | Se siente forzado y contradice la única elección de la hoja | Mover J2 a después de elegir, o reescribirlo sin plan («Veamos la hoja.»); J3 en las dos ramas o en ninguna | construcción (no respetó el momento de la tabla); disenador-narrativo |
| 3 | 🟠 | `ARTE-LINEA-GRAFICA.md` §4b contra `pared_ladrillo` (`#5a6988 #3a4466 #262b44`), `dani_silueta_fondo`, `jefa_neutral` | La regla pide **dos escalones de valor** entre figura y fondo. Medido: cuerpo de Dani `#181425` contra ladrillo `#262b44` = 1,30 y contra `#3a4466` = 1,89; su contorno claro `#5a6988` contra ladrillos `#5a6988` = 1,00 (se pierde donde cae uno); pelo de la jefa `#3e2731` contra `#3a4466` = 1,02 y contra `#5a6988` = 2,48; ropa `#a22633` 1,30 a 1,89 | Por **valor** no se cumple. Mirando la imagen 4× se separan por **tono** (marrón y vino cálido contra azul frío; Dani, silueta negra), pero la guía no lo dice y el próximo crítico no sabrá qué creer. A 1× el borde de Dani es un hilo | Enmendar §4b («valor o tono: fondo frío y figuras cálidas cuentan») con esta medición, y subir una luz de borde clara de 1 px al pelo de la jefa y a Dani. Decide Ronald/director | director-de-juego (guía) / artista-pixel |
| 4 | 🟡 | `Mesa.tsx:80-86` (`CARA`), `Mesa.tsx:420` | `CARA.jefa` es siempre `jefa_retrato`. La escena cambia el gesto del cuerpo (cabeza entre las manos, pulgar), pero la cara de la caja no | En una reacción grave, el cuerpo dice «preocupada» y la cara chica «tranquila»; `jefa_preocupada` y `jefa_contenta` existen y no se usan en la caja | `Dialogo` usa `jefa_<pose>` cuando habla la jefa (`l.pose` ya viene en la reacción) | construcción |
| 5 | 🟡 | `Mesa.tsx:479-488` (hoja) | En la hoja la jefa y la presentación de Dani son párrafos en cursiva con comillas, **sin cara ni caja**; todo lo demás tiene retrato. B-hoja-1 dice «En la silla del fondo está Dani» y en la escena **no hay silla**, solo la silueta | Único tramo donde habla alguien sin retrato; el alumno no sabe cuál figura es Dani | Pasarlas por `Dialogo`; decir «la silueta del fondo» | construcción; disenador-narrativo |
| 6 | 🟡 | `Mesa.tsx:475,477` | **8 pulsaciones de «Siguiente»** antes del primer toque real (3 de narración + J1, 3 de jefa + J2). J2≈A4, J3≈A6, y J4 («Tengo la carpeta. Reviso…») viene pegada a B-entr2-1 («Tienes la carpeta. Mira…») | Las líneas que solo repiten no dan nada y alargan; se sienten forzadas. **No delatan aciertos** (ninguna nombra papel, cifra ni si la decisión es buena) | Dejar J1, J5 y J6; J2 a J4 solo si aportan una duda o una elección | disenador-narrativo |
| 7 | 🟡 | `mesa.css:64-65` | Dos reglas `.mesa-quien`; gana la segunda, así que «Tú» sale en ámbar (`#ffcf7a`, 8,48 sobre `#1c3a34`: pasa) como el de la jefa; la primera y la línea 63 son código muerto | Lo que identifica al jugador es solo el borde y el fondo verdes | `.mesa-dialogo.tuyo .mesa-quien { color: #9fe8d2 }` | construcción |
| 8 | 🟡 | `EscenaPixi.tsx:45` | El `aria-label` dice «la jefa junto a la puerta»; no hay puerta, y no nombra a Dani ni al teléfono | Un lector de pantalla describe lo que no existe | «…la jefa a tu lado, la silueta de Dani al fondo y el teléfono junto a la lámpara.» | construcción |
| 9 | 🟡 | `EscenaPixi.tsx:63-68` | Las 60 filas de arriba (40 % de la escena) son pared lisa: a 375 px el lienzo mide 300 px y el diálogo (más los tubos del caso 2) baja bajo el pliegue. El «z z» de Dani mide ~10 px y queda pegado al pelo de la jefa (Dani `x 72..136`, jefa `118..182`: se solapan 18 px) | La escena gasta altura que el diálogo necesita; la única pista de que Dani duerme casi no se lee | Recortar el lienzo o poner algo en la pared (reloj, corcho: ya está en el mapa de ambientes); separar a Dani 20 px | director-de-juego |
| 10 | 🟡 | `Mesa.tsx:471`, `mesa.css:62-73` | El título dice «Arte provisional.» aunque solo la luz y el polvo lo son. Retratos: pelo de la jefa (`#3e2731`) sobre el fondo de la caja (`#120f26`) ≈ 1,3, la cabeza se aplana; el montaje asumía `#07060d` | El docente duda del arte nuevo; el retrato queda más plano de lo que se ve en el montaje | «Luz provisional.»; fondo de la cara `#07060d` o marco claro | construcción |

### Lo que se comprobó y está bien (no tocar)
- **Caras y silueta a 1×:** jefa con lentes, Beto con gorra azul y silbato, director con corbata roja, teléfono con ondas naranja, nota con sello rojo y Dani oscuro con «z z» se distinguen en el montaje de retratos. La nota se lee más como certificado que como «nota de Dirección»; el nombre de la caja lo compensa.
- **La escena sola:** a 1× se entiende (mesa, lámpara, teléfono, dos personas). La jefa no se confunde con el jugador: la caja verde «Tú» no tiene cara y el narrador dice «Eres el psicólogo o la psicóloga».
- **Caja verde:** texto `#ece7f7` sobre `#1c3a34` = 10,17; borde `#6fd0b4` sobre el fondo de la página = 10,58. Contra el panel ajeno (`#1d1838`) el fondo da 1,37: la diferencia la hacen borde y rótulo, aceptable.
- **Las líneas del jugador no delatan aciertos:** J1 a J6 son iguales en toda versión y rama (salvo el choque de J5 con cero papeles, hallazgo 1).
- Arte: 44 de 44 cumplen EDG32; pared y escritorio en mosaico sin costura visible.

### Mejoras a agentes que propongo
- `disenador-narrativo`: toda línea del jugador «sea cual sea la decisión» se prueba contra los avisos de cero acciones (firmar sin abrir papeles) antes de entregarse.
- `construccion` / `critico-de-jugabilidad`: comprobar el **momento** de cada línea del jugador contra la tabla de NT1.12 con una prueba (J2 y J3 hoy salen antes o en una sola rama).
- `director-de-juego` / `artista-pixel`: la regla 4b se mide con script o se enmienda a «valor o tono»; hoy el arte cumple por tono y falla por valor.

### En simple, para Ronald
Se entiende mucho mejor: ves a la jefa grande, la lámpara, el teléfono, la silueta de Dani, y lo tuyo sale en una caja verde sin cara. Falta pulir: (1) si firmas sin abrir ningún papel, tu caja dice «Lo he pensado bien», que es falso; (2) tu frase «primero mi fila de la hoja» sale antes de que elijas si responde Dani; (3) la cara de la jefa en la caja no cambia aunque su cuerpo diga «preocupada»; (4) la guía de arte pide contraste de claridad que el dibujo cumple por color pero no por brillo: hay que decidir si se enmienda la guía.

## v19 · ambientes (09-10-2026) · mapa de ambientes del Tema 1 de Psicoestadística («la noche pasa»)

**Qué se revisó:** `docs/juego/gdd/aspecto-psicoestadistica-tema1-ambientes.md` (14 filas) y `docs/juego/bocetos/ambientes/index.html`, contra `02`, `04`, `05`, `07` y `src/app/juego-psicoestadistica/EscenaPixi.tsx`. Script guardado: `docs/juego/gdd/scripts-t1/revisar_ambientes_t1.py` (salida en `salida_revisar_ambientes_t1.txt`; captura `ambientes_376.png`). Salida: 120 permutaciones; 28 pares (caso, hora) distintos (casos 3 a 7: 5 horas cada uno; paso 1, caso 2 y caso 8: 1); casos 3 y 6 (los dos «archivo») quedan seguidos en 48 de 120 órdenes y uno de los dos es el último antes de la dirección en 48 de 120; filas 14 = bajo 7 + medio 5 + alto 2 (coincide con la ficha); contrastes del texto de la página 15,8 / 9,8 / 14,6 / 9,1; **página abierta con Chrome real a 376 px: sin desborde horizontal (scrollWidth 376), 0 textos menores de 12 px, 17 escenas, 111 imágenes, 0 rotas.** La ✘ «pendiente» de la ficha queda cerrada.

**Veredicto:** la idea de dos capas (hora por casos terminados, lugar por caso) **funciona con las 120 permutaciones**: no hay contradicción de hora y el ambiente no depende de P/B/A. Pero tiene dos choques con lo ya aprobado y cuatro huecos que conviene cerrar antes de mostrarla.

### Hallazgos

| # | Gravedad | Fila | Qué pasa (texto exacto) | Por qué importa | Arreglo mínimo | Agente que debió evitarlo |
|---|---|---|---|---|---|---|
| 1 | 🔴 | 3, 5, 9 | «**El archivo del colegio** (lugar nuevo A)», «ahora la secretaría», «una sala de listas». La narrativa (NT1.1) pone todo en **una sola sala** (mesa, panel, archivador, teléfono, silla de Dani); solo el caso 8 tiene puente («Ugarte te espera en dirección»). Los casos 3 y 6 no tienen ninguna línea que lleve al alumno a otro lugar, y en el paso 1 la silla de Dani está en el fondo de la sala (M14) | El alumno de pronto está en «la secretaría» sin saber cómo llegó: es la regla «ninguna escena aparece de la nada» y «¿dónde estoy?». Además el aspecto A es la mesa en primera persona; esto ya parece cambiar de sala | Dos opciones. **(a, recomendada)** el «archivo» no es un lugar al que se va: es **el mismo escritorio con el archivador abierto detrás** (estantes en el fondo de la sala, sin cambiar de lugar); la jefa trae los papeles. Costo menor que un lugar nuevo y cero líneas de narrativa. **(b)** mantener el lugar y pedir a la narrativa una línea de entrada en los casos 3 y 6 («Bajemos al archivo») y definir qué pasa con Dani en el paso 1 | director-de-juego (no leyó NT1.1 y M14) |
| 2 | 🟠 | todas (T3 a T10) | La **lámpara** ya es una señal del mundo: baja cuando un medidor llega a 25 o menos (`05` «tras una caída, la lámpara baja»). El mapa le hace además subir y bajar por hora: en la página, brillo .6 / .5 / .55 / .4 / .45 / .5 según la fila, «lámpara casi apagada» a las 06:30 y «apagada» a las 07:00 | Un mismo canal con dos significados: a las 03:00 una lámpara baja ya es normal y no se distingue de la señal de «te queda menos noche», y de día la señal desaparece. Al revés, el alumno aprende «lámpara tenue = hora» y pierde la señal. En el caso 8 (06:00) el aviso de dos fichas lo da solo Ugarte con palabras | Que la **hora** viva en cielo, reloj y color general, y que el **brillo de la lámpara** quede reservado a la señal de medidor. Si la lámpara debe cambiar de día, que la señal de 25 use otro canal (el tubo mismo ya parpadea) y se anote | director-de-juego (2.ª vez de un canal compartido en el aspecto) |
| 3 | 🟠 | 5, 9 | Caso 3: «tubo fluorescente blanco-verdoso, **un poco parpadeante**»; caso 6: «luz cenital blanca y estable, sin parpadear» (la página lo anima con `parpadeo`) | Dos casos con el mismo lugar y luces opuestas enseñan «parpadea = ojo, hay trampa; estable = limpio», y eso es **independiente de la versión**: en las versiones B del caso 3 el alumno entra sospechando de más (patrón aprendido, sesgo igual para todos). Además «tubo» ya significa en el juego los **medidores** (`07`: «tubo que se mueve», E10): un tubo que parpadea se lee como alarma de medidor, y su zumbido suena cerca de E10 | Misma luz estable en 3 y 6 (distinguir el caso por el objeto: tambor y pizarra). Llamar «luz del techo» a la lámpara del archivo, nunca «tubo» | director-de-juego; disenador-de-sonido (el zumbido nuevo repite el problema) |
| 4 | 🟠 | 8 | «**Entra neutro**... El frío llega **con la llamada del director vecino o la nota de la tallerista**» | En la narrativa (R5.4 a R5.9) esa llamada o nota solo llega cuando el alumno **erró** (subida bruta, inflado, «otro»); con R5.6 a R5.8 no hay llamada. El frío es entonces el aviso de error: coherente con S5, pero la sección 1 dice que «el ambiente nunca depende de si acertó» y esta fila la contradice | Decirlo claro como consecuencia (el mundo reacciona a lo que el alumno ya firmó, igual que la jefa con la cabeza entre las manos) y corregir la regla 1 de la sección 1. No agregar nada de color al acierto | director-de-juego |
| 5 | 🟠 | 11, 12 | Caso 8 a las **06:00** «reunión de presupuesto» y la jefa dice «consejo de mañana» desde la noche; el cierre a las 06:30 y la revelación a las 07:00 son «esta noche» («da vuelta lo que pasó esta noche»). Ugarte en dirección al amanecer | Si es la víspera, a las 06:00 ya es el día del consejo y los textos «de mañana» (casos 2, 4) quedan al revés; un director en reunión de presupuesto a esa hora es forzado. La línea extra «Llegó temprano, antes del consejo.» de la decisión 2 es **necesaria y pequeña**, pero no alcanza | Mantener la línea y pedir a la narrativa revisar los «mañana» de los casos 2 y 4 («para el consejo»), o recortar el amanecer a «primera luz» (05:30) y dejar el sol pleno solo para revelación y final |  disenador-narrativo (no estaba en el mapa) / director-de-juego |
| 6 | 🟠 | 3, 11, 5 | Costos: «Medio» para las filas con objeto nuevo y «bajo» para varias luces. Según la guía hay que **redibujar todo el arte** y cada objeto (corcho, tambor, pizarra, lámina, carpetas, puerta con patio, taza, segunda lámpara) es un sprite nuevo de 3 tonos y contorno; la escena es 188×150 y el reloj de pared es un sprite fijo (`sala` ya trae uno), así que **«el reloj marca la hora» pide ocho posiciones de agujas** que no están en ninguna fila. La **hora** sí es barata: el motor ya usa `velo.tint`, luces ADD y `alpha` (`EscenaPixi.tsx`) | El orden de construcción se apoya en «hora = sin dibujo»; es cierto salvo el reloj. El «alto» del archivo y de la dirección está bien medido, pero no incluye la narrativa del hallazgo 1 | Subir el reloj a «medio» (8 posiciones o dos agujas por código); sumar «sprite nuevo» a cada fila con objeto; mantener alto en las dos habitaciones | director-de-juego |
| 7 | 🟡 | 3 | Fila 3 pone el **paso 1 entero** en el archivo; la fila no dice dónde está Dani ni la hoja «Para empezar» | Si se elige la opción (b) del hallazgo 1, Dani (silueta en la silla) quedaría fuera de escena | Una línea en la fila: Dani sigue en su silla, el archivo es el fondo | director-de-juego |
| 8 | 🟡 | 13 | Revelación: «cada carta que se da vuelta sube un poco la luz ... en cualquier orden», con notas E12 | Está bien en lo que no delata. Falta decir que **la luz final es la misma** aunque el alumno haya fallado todo; la muestra con barra (0 a 8) lo cumple | Una línea de «mismo valor final para todos» | director-de-juego |
| 9 | 🟡 | 12, sonido | «S9 A entra un paso antes, al cierre del informe» | S9 A es «fichas boca abajo» y la revelación es su escena (`07` hoja S9 y S.6). Entrar en el cierre le quita el efecto de arranque de la revelación y no hay tramo de cierre en el mapa de música: hoy S8 sigue hasta la pantalla de cierre. Es coherente con el espíritu (Do menor en un sol bajo choca) pero **cambia una asignación aprobada de `07`** | Decirlo como pedido a `disenador-de-sonido`, no como hecho; alternativa: fundido a silencio un compás en el cierre y que S9 entre como ya estaba | director-de-juego |
| 10 | 🟡 | sección 5 | Grillos, zumbido, pájaros: «efectos por código nuevos» | La regla de `07` S.0 es que todo sonido tiene su equivalente visible y nada juzga; estos no juzgan (suenan igual en toda versión) pero no están en el kit y hoy ninguno tiene su cuadro visible (el zumbido del hallazgo 3 sí juzgaría) | Dejar solo grillos y pájaros como opcionales; quitar el zumbido | disenador-de-sonido |

### Respuestas a las siete preguntas
1. **¿Delata la respuesta?** No por tipo (P/B/A), ni por rama, ni por versión: ningún objeto cambia con ellos (carpeta gorda y delgada del caso 4 son A y B, y el bueno es A en el 50 % de las versiones: no filtra). Los dos puntos grises son el parpadeo (3) y el frío del caso 5 (4).
2. **Orden barajado:** funciona. La hora sale de casos terminados, el lugar del caso; la prueba con las 120 permutaciones da 28 estados distintos y ninguno incoherente. Las que producen rarezas: archivo seguido de archivo (48 de 120) y un caso de archivo justo antes de la dirección (48 de 120), que vuelve más brusco el salto, pero no contradice nada. El flashback del caso 5 («hace un mes») cae en cada posición con igual frecuencia (24 de 120) y su tarjeta de tiempo ya lo aclara.
3. **Historia:** choques en hallazgos 1 y 5. La línea nueva del caso 8 («Llegó temprano, antes del consejo.») es necesaria y pequeña, pero hay que revisar «mañana» en dos casos.
4. **Costo:** ver hallazgo 6. Recortaría primero **el archivo como lugar** (hallazgo 1a) y la segunda lámpara/dos conos del caso 4 (más costo que valor), después los objetos de 5 y 9; la hora, el cielo y la dirección se quedan.
5. **Música:** coherente con S.0 salvo el cambio de S9 (hallazgo 9) y el zumbido (10).
6. **Orientación:** el cambio de hora es suave y el reloj de la pared ayuda, pero un lugar nuevo sin puente es la mayor confusión posible (hallazgo 1). El alumno nunca sabe qué hora es sin mirar el reloj: de 188×150 px a 376 px el reloj mide unos 30 px y las agujas se leen (visto en la captura).
7. **Muestras:** abren y se leen a 376 px (ver cifras arriba), pero **no muestran lo que describen**: las filas 3, 5, 9 y 11 se ven como la misma oficina con otro color; el «archivo» y la «dirección» no se ven. Honesto en el aviso de la página; Ronald decidirá sin ver el lugar.

### Lo que está bien y conviene no tocar
La separación hora/lugar; la regla de que plaza fija y otro trimestre tienen el mismo ambiente; el recuerdo cálido del caso 5 con tarjeta de tiempo; la revelación que se ilumina sin depender de la rama; la hora como capa barata con el motor actual.

### Mejoras a agentes que propongo
- `director-de-juego`: antes de proponer un lugar nuevo, comprobar en NT1.1 y en el bucle que el alumno ya está en ese lugar o que existe una línea de narrativa que lo lleva; y cuando una señal del mundo ya existe (la lámpara de 25), no darle otro significado.
- `disenador-de-sonido`: ningún efecto de ambiente que pueda leerse como alarma (zumbido de «tubo») cerca de E10.
- `disenador-narrativo`: ninguna mejora propia: el hallazgo 5 nace de una propuesta nueva del director.

### En simple, para Ronald
**Todavía no.** La idea de que la noche pase (la hora según cuántos casos llevas, el lugar según el caso) funciona con todos los órdenes posibles y no regala respuestas. Antes de mostrártela hay que arreglar dos cosas: (1) el «archivo» y la «dirección» como lugares nuevos hacen que el alumno aparezca en otro cuarto sin explicación; lo más simple es que el archivo sea el mismo escritorio con el archivador abierto detrás, y la dirección sí como cuarto aparte porque ahí lo lleva la historia; (2) la lámpara ya avisa «te queda menos tiempo», así que no puede además marcar la hora, y la luz parpadeante del caso 3 enseñaría «parpadea = hay trampa». Lo que tendrás que decidir tú: si el amanecer cae a las 06:00 (obliga a cambiar los «mañana» de dos casos) o antes a «primera luz» (recomendado), y si el archivo es un cuarto nuevo o el mismo escritorio (recomendado el mismo).

## v18 · bocetos de caras (09-10-2026) · aspecto del Tema 1 de Psicoestadística, opciones A, B, C

**Qué se revisó:** `docs/juego/bocetos/caras/index.html` (9 pantallas) y `docs/juego/gdd/aspecto-psicoestadistica-tema1-caras.md`. Con navegador real (Playwright, 376 px) y scripts guardados: `docs/juego/gdd/scripts-t1/medir_bocetos_caras.py` (pantallas, letras, botones, posiciones, contrastes, capturas) y `docs/juego/gdd/scripts-t1/largo_lineas_dialogo.py` (largo de las 241 líneas del guion). Salida: 9 pantallas (3 por opción); ningún texto menor de 12 px; botones de 48 a 58 px de alto; contrastes 13,98 / 12,45 / 11,66 / 8,38 / 12,56 (coinciden con la ficha). Líneas del guion de más de 110 caracteres: 19; de más de 150: 0 (la más larga, 138; la ficha dice «25 palabras, 150 caracteres»: es más de lo que existe).

**Veredicto:** se puede mostrar a Ronald con 3 correcciones chicas de texto y 1 de dibujo (abajo). B sigue siendo la recomendada.

| # | Gravedad | Qué pasa | Por qué importa | Arreglo mínimo | Agente que debió evitarlo |
|---|---|---|---|---|---|
| 1 | 🟠 | **Tu personaje casi no se ve.** Mide 60x72 px contra 96x128 de la jefa, está bajo el velo oscuro, de espalda, con chaqueta verde azulada apagada, y a su derecha está Dani en silueta casi igual de oscuro. En la captura de B1 y A1 lo que identifica a «TÚ» es el rótulo, que desaparece después. El mismo error que Ronald cometió (confundir figuras) puede repetirse con Dani. | Ronald pidió «mi imagen de persona». Si solo se lee por el rótulo, tras desaparecer vuelve la duda. | Dibujarlo del mismo alto que la jefa (o 90 %), sin velo (un borde de luz de la lámpara) y con un tono claro; el rótulo «TÚ» se queda hasta la primera nube, y la nube siempre dice «TÚ». Separarlo de Dani. | `director-de-juego` (no midió contraste entre figuras) |
| 2 | 🟠 | **La opción A no resuelve a Beto, al director, a la madre ni a la nota**: no están en la escena, no hay «sobre quién flotar». La ficha lo admite solo para madre y nota; Beto y Ugarte también quedan sin cara y sin dueño. Además la ficha dice que en A «la cara es el dibujo de la escena» (chica). | Ronald pidió una cara para los mensajes; A incumple eso en 4 de los 6 que hablan. | Decirlo en la ficha: A solo sirve si se agregan sprites de Beto y Ugarte a la escena. No es opción real; no hace falta tocarla, solo corregir el texto. | `director-de-juego` |
| 3 | 🟠 | **El costo de B está subdicho.** «Medio» omite: (a) en `Mesa.tsx` el tipo `Quien` no tiene «tú»: no existe ninguna línea del alumno en el guion; hay que crearlas (la frase armada y la respuesta de la hoja salen hoy en botones y piezas, no en diálogo) y ponerlas en la nube; (b) `EscenaPixi.tsx` hoy no tiene ni al jugador ni la atenuación por quién habla (es un `useEffect` que recibe pose, suena y daniCabecea): hay que añadir `habla` y recargar texturas; (c) `Dialogo` no sabe hoy de retratos. | Si B se aprueba como «medio» y es «medio-alto», se rompe el plan. | Costo dicho como «medio-alto»: 1 tipo nuevo, ~6 líneas nuevas del alumno en el guion, 6 retratos, 1 prop nueva en la escena. No cambia la recomendación. | `director-de-juego` |
| 4 | 🟡 | **La nube «Tú» en el boceto sale pegada con el panel «¿Firmar?»** (A2, B2, C2): se ve la frase terminada y los botones a la vez. En el juego real la frase se arma con piezas (`fase "frase"`) antes; el momento de la nube es tras la confirmación. | Ronald podría creer que la nube sale mientras armas. | Rotular en la captura: «tras armar y confirmar». | `director-de-juego` |
| 5 | 🟡 | **La nube de 244 px tapa la lámpara y parte de Dani** (A2/B2: bottom 194, left 8 a 252, Dani empieza en 168). Es solo estética. | Menor. | Subir 30 px o bajar a 3 líneas. | `director-de-juego` |
| 6 | 🟡 | **Ícono de la madre: ondas sobre una caja** se lee como radio, no como teléfono. | Poco importa si el nombre dice «(teléfono)». | Darle un auricular. | `director-de-juego` |
| 7 | 🟡 | **Letra del boceto distinta de la del juego** (21 px en el boceto, 23 px en `mesa.css`), y los retratos añaden 62 px a la izquierda. A 23 px, B1 pierde una línea más; la jefa de 138 caracteres ocuparía 5 líneas. | El panel crece y empuja los botones; en 812 px de alto cabe, pero se debe medir. | Medir con 23 px en la construcción. | `director-de-juego` |

**Respuestas a las seis preguntas**
1. Lo pedido por Ronald (cara por mensaje, su personaje, su nube): **B y C lo cumplen; A no** (ver 2). La nube del jugador está en las tres.
2. Lo decidido no se reabre: respetado (Dirección A; cara solo jefa, Beto, Ugarte; Dani silueta; sin dossier ni software; ≥ 12 px; botones ≥ 44 px; 376 px). Sin hallazgo.
3. Orientación: «Tú» solo queda claro con rótulo y nube (hallazgo 1). Se sabe quién habla en cada línea en B (nombre + retrato; la nota y la madre tienen ícono con nombre). Ningún globo tapa a la jefa en A1; los globos de A tapan reloj y ventana, no la jefa. La narración no tiene retrato (bien).
4. Costos: A «bajo» es verdad pero no cubre el reparto; B «medio» es medio-alto (hallazgo 3); C «alto» es correcto. B es la correcta.
5. **Assets:** la ficha dice «no propongo ningún paquete» y deja todo para un artista. Es floja: Ronald preguntó eso. Falta decir que (a) retratos de personajes en pixel art con licencia clara existen (itch.io: paquetes CC0 o con crédito; hay que mirar la licencia de cada uno al descargar, no confío en memoria), (b) el estilo del paquete tiene que calzar con la oficina que ya existe, si no se ve un collage, (c) lo más barato y seguro es encargar o generar los 6 retratos y 2 poses del jugador con el mismo estilo en una sola tanda. Recomendado: mantener el arte propio para la mesa y pedir a Ronald una decisión con una muestra de 3 paquetes ya probados (el director no la hizo).
6. Límites del director: la captura **sí** salió y la letra cargó (necesitó internet); sin conexión cambia el ancho. Las referencias (*Monkey Island*, *Phoenix Wright*, *Undertale*) no se verificaron, pero no condicionan la elección. La ficha decía «sin captura, medición pendiente»: ahora está medida y lo pendiente se cierra con los números de arriba.

**Bien, no tocar:** reparto con cara decidido (jefa, Beto, Ugarte), silueta de Dani, nube clara contra panel oscuro, recorte de la jefa 2x, botones de 48 px, contrastes.

**Mejoras a agentes que propongo**
- `director-de-juego`: un boceto de aspecto con personajes en escena se mide con captura antes de entregar (tamaño relativo y contraste entre figuras), y todo costo «medio» incluye las líneas nuevas de guion y los cambios en la escena. Apoyado en 1 y 3.
- Resto: ninguna.

## Decisiones pendientes de Ronald

### De la revisión de la narrativa v3 y el sonido v1 del Tema 1 de Psicoestadística (papel + scripts, 08-10, v15)

**DECIDIDAS 08-10 (Ronald):** (1) la jefa, opción A (sin vidrio ni sello). (2) caso 5, turno 1: aprueba Beto, la jefa solo pregunta, y en el turno 2 dice «Yo también dije que sí.». Aplicadas en `05` y `07`. Sin pendientes de gusto.

Ninguna pregunta de gusto nueva. Dos cosas que conviene que veas en simple, ambas con valor recomendado que no bloquea nada:
1. **La jefa del Departamento se parece a la de AIEF** (hallazgo I2): también habla desde un vidrio, con frases cortas, y también sella. Recomendado: sacarle el vidrio y el sello y darle otra manera de hablar. Alternativa: dejarla igual (los alumnos de Psicología no juegan AIEF).
2. **Caso 5, turno 1** (hallazgo I7): la jefa aprueba con el pulgar arriba una elección que después sale mal. Recomendado: mantener la trampa, pero que la aprobación venga de Beto o del director y no de la jefa.
Hay **2 bloqueos** (dos textos de la revelación que dirían algo falso) y 7 importantes; los corrigen aprendizaje, narrativa, bucle y sonido antes de construir (tabla «Quién lo arregla» al final de la entrada).

### De la revisión del aprendizaje y el bucle del Tema 1 de Psicoestadística (papel, 08-10, v13)

Ninguna pregunta nueva. Hay **1 bloqueo** (la meta se pasa sin abrir un solo papel) y varios importantes; todos se
corrigen en números y reglas del bucle, que ya están pensadas como datos ajustables (`reglas-t1.ts`), sin reabrir
nada de lo que elegiste. No se programa hasta corregirlos.

### De la revisión de la maqueta de Psicoestadística Descriptiva · Psicología, versión 3.4 (papel, 08-10)

Ninguna pregunta nueva. Un bloqueo y cinco importantes de diseño: los corrige el adaptador antes de que veas la
maqueta, sin reabrir nada de lo que decidiste.

### De la revisión de la maqueta de Psicoestadística Descriptiva · Psicología, ronda 3.1 (papel, 29-09)

Ninguna pregunta nueva. Los dos bloqueos y los importantes son de diseño: los corrige el adaptador antes de
que veas la maqueta, y recibes la versión corregida con una línea de qué cambió.

### De la revisión de la maqueta de Psicoestadística Descriptiva · Psicología, ronda 2 (papel, 28-09)

Ninguna pregunta nueva. Los hallazgos son de diseño y los corrige el adaptador antes de que veas la
maqueta; recibes la versión corregida con una línea de qué cambió.

### De la revisión del marco A de Psicoestadística Descriptiva · Psicología (papel, 28-09)

**Resueltas por Ronald el 28-09** (quedan por historia): el Tema 4 entero antes que el 5, y el escalón «a
leer» no manda a esas tres páginas.

Lo de fondo (hallazgos 1 a 6) es diseño y lo resuelve la ronda 2 del adaptador sin reabrir tu elección.
Quedan dos cosas tuyas, y ninguna es de gusto:

1. **El orden en que dictas los Temas 4 y 5** (es un dato, no gasta la pregunta de la ronda): ¿el Tema 4
   entero y después probabilidad, como el dossier, o probabilidad antes que correlación y regresión, como
   el calendario de EAD-111? De eso depende dónde se juega la probabilidad condicionada (hallazgo 6).
2. **Tres páginas del dossier que dicen otra cosa que el juego** (hallazgo 12): Sturges «impar» (D2 §2.2),
   la covarianza dividida por N (D4 §4.4) y «R² explica» (D4 §4.5 y D6 §6.3). Recomendado: el escalón «a
   leer» manda a otra página (los ejemplos de D2 §2.2, D6 §6.3, el recuadro «Qué NO» de D4 §4.5) y tú
   corriges esas frases cuando vuelvas a tocar esos dossiers.

### De la revisión de lo jugable del Tema 1 de AIEF (etapa 7, 28-09)

Ninguna pregunta nueva. Lo que se arregla es construcción y texto. El hallazgo 4 (tanteo en los repasos
de 1.2) se resuelve con diseño (recomendado: repaso con el par) o con la nota, que es la pregunta ya
abierta de `04` A2.5.

### De la revisión del Tema 1 de AIEF, versión 2 (papel)

Ninguna pregunta nueva del crítico. La única abierta es la de `04` A2.5: **si la ayuda baja la nota del
tema**. No se responde aquí; el hallazgo 5 de abajo trae un dato que conviene tener a la vista al decidirla.

### De la revisión del Tema 1 de AIEF (papel y prototipo, etapas 5 y 7)

Ninguna pregunta nueva: lo que se corrige abajo es diseño (delegado) y no cambia nada que hayas
aprobado. Sigue abierta una que no es de esta etapa y conviene mostrarte en el plan simple del Tema 1:

1. La de `03-progresion-aief.md` (si el alumno escribe en el juego el borrador de su emprendimiento).
   Opinión en una línea: el borrador sin nota es lo sensato; cuesta un campo de texto y no pisa el reto.
2. ~~Cuánto pesa el juego en la nota del tema (40 % registro, 60 % defensa)~~ **Sale de la lista:** regla
   de Ronald del 27-09, el juego entrega una nota sobre 100 por tema y la ponderación la hace él; no se le
   propone ni se le pregunta un reparto.

### De la revisión de `00-adaptacion-aief.md` v2 (Ronda 2)

La pregunta del adaptador (¿rechazar a un buen cliente cuenta como error?) sigue siendo la de la ronda;
el crítico también recomienda **sí**. Se suma una sola de criterio, porque toca contenido inventado:

1. **Con qué regla se decide el monto en los Temas 1 y 2**, que todavía no enseñan a medir capacidad de
   pago (hallazgo 3 de la v2). Recomendado: **una regla de la agencia en el manual**, inventada por el
   juego y marcada como tal, que use el número del tema (por ejemplo, en el Tema 2, "la cuota no pasa de
   tal parte de la utilidad neta con IUE, y nunca de la caja que hay"). Alternativa: sin crédito en los
   Temas 1 y 2 (sólo aceptar o devolver balances), con el costo de que la versión mínima ya no prueba el
   bucle del crédito.

### De la revisión de `00-adaptacion-aief.md` v1

La pregunta de gusto (A, B o C) quedó resuelta: Ronald delegó y se eligió A. El final como pieza propia
de **Cierre** quedó adoptado en la Ronda 2 (hallazgo 2 de la v1), así que sale de esta lista.

1. **El IUE en los casos de D5, D6 y D7** (hallazgo 5 de la v1). Sigue abierta. La Ronda 2 ya lo
   mitiga (el escalón "a leer" apunta a D2 §2.2), pero lo recomendado sigue siendo corregir esos
   ejemplos del dossier para que lleven su línea de IUE: el curso ve esos números en clase.

### De la revisión de `01-vision.md` v1

Se suman a las cinco que esa parte ya lista.

1. **Qué hace que la investigación sea un juego y no una ficha repartida en tres lugares** (hallazgo 1).
   Recomendado: la opción B (datos de más y una contradicción que resolver).
2. **Si lo que pasa de un caso al siguiente son números (caja, reputación) o sólo la historia** (hallazgo 3).
   Recomendado: sólo la historia en el nivel 1.
3. **Cuántos casos tiene la isla**: uno por semana o uno por unidad (hallazgo 5). Recomendado: uno por unidad.
4. **Si la nota sale "del caso más la defensa" (lo que dice IDEA-JUEGO §3 y la escena 1) o "sólo de la
   defensa"** (lo que dice el pilar 5). Hoy los dos textos se contradicen (hallazgo 4).

---

## 09-10-2026 · Psicoestadística Descriptiva (Psicología), Tema 1: segunda vuelta de la pantalla (Paso 1 + Caso 2) tras los textos de orientación NT1.12 (v17)

**Qué se revisó.** `Mesa.tsx`, `mesa.css`, `guion-pantalla-t1.ts` y `orientacion-t1.json` actuales (commit 52403ad). Script guardado: `docs/juego/gdd/scripts-t1/revisar_pantalla_v17.py` (salida en `salida_revisar_pantalla_v17.txt`). Pruebas de la carpeta del tema y de la pantalla: 21 archivos, 314 pruebas, código de salida 0. **No se midió con captura a 375 px** (no hay navegador en esta sesión): el tamaño de letra y la ventana al frente se comprobaron leyendo el CSS; los contrastes, calculados con script.

**Estado de los 15 hallazgos de la v16:** 13 CORREGIDOS, 1 PARCIAL (H9), 1 sin cambio por decisión (H15). Ninguno SIGUE.

| H | Estado | Prueba |
|---|---|---|
| H1 quién eres | CORREGIDO | `A2` «Eres el psicólogo o la psicóloga del colegio.», `B-bienv-1` «Tu trabajo: mirar los papeles y decir si una afirmación se sostiene…», `A3` «Soy Ximena Rocabado, jefa del departamento.» |
| H2 encargo y hoja | CORREGIDO | `A4` «Primero llena tú la hoja… Tu fila servirá para comparar con lo que haya en el archivo.» (`HOJA.jefa`) |
| H3 Dani | CORREGIDO | `B-hoja-1` «En la silla del fondo está {dani}, practicante del departamento…» y botón `A5` «Que responda {dani}» |
| H4 qué buscar/qué cuesta | CORREGIDO | `A6` «Busca si ya preguntó cuánto duermen los de 4.º.», `B-arch1-1` «Cada papel abierto gasta una ficha…», rótulo `A7` «Fichas: papeles que puedes abrir» (`Fichas` en `Mesa.tsx` l.123-132) |
| H5 asombro | CORREGIDO | título `A8` «Lo que encontraste: el colegio ya lo preguntó»; `B-asom-1/2` |
| H6 medidores | CORREGIDO | `B-cierre1-1…5` (Credibilidad/Voz definidos, qué baja cada uno, raya 25 y 65), rótulos `ROTULOS_TUBOS` («Que te crean», «Que te consulten») bajo cada tubo (l.112), `A10` define Horizonte. Los tubos aparecen en la misma línea que dice «Ahora aparecen dos medidores» (`tubos: i === 1`, l.568): no se anuncian antes de verse |
| H7 informe | CORREGIDO | `A11` + `B-entr2-1` «Mira qué papeles lo respaldan o no, y después decides.» |
| H8 botones de decidir | CORREGIDO | l.629, 635, 648 (una línea bajo cada botón), l.614 «Primero abre algún papel.» sin bloquear, l.698 aviso en la confirmación si 0 papeles |
| H9 corcho/gráfica | PARCIAL | Se añadieron `B-arch2-2/3`; la gráfica sigue repetida (l.582 y l.610) y no marca el mes de la caída |
| H10 frase | CORREGIDO | `A12`, botón `A13` «Firmar la frase ▸»; «Sellar» ya no se ve (solo el nombre interno `sellar`) |
| H11 confirmación | CORREGIDO | `Mesa.tsx` l.695-710: `role="alertdialog"` dentro de `.mesa-lector`; `mesa.css` l.87 `position: fixed; inset: 0; z-index: 50; align-items: flex-end` y l.151 `.mesa-lector .mesa-confirma`. Está al frente, abajo, con el fondo oscurecido: no queda fuera de vista |
| H12 qué lo causó | CORREGIDO | `B-reac-1…5` (por qué subió/bajó) y `B-reac-6` (cuánto), `B-fin-1…3` (valores y papel clave). Comprobado contra `efectos-t1.ts`: «frenar baja Voz» (R2.2: Voz −8/−15), «firmar mal baja Credibilidad y da Voz» (R2.1 P: −20/+10), «una frase sostenida sube los dos» (R2.3: +8/+4 y +10/+10) |
| H13 Beto | CORREGIDO | `B-cierre1-6` «Ahí pasa Beto, profe de educación física y tutor de 4.º.» |
| H14 «2 de 8» | CORREGIDO | `B-titulo-1` «Prueba: 2 casos de los 8 del juego.» |
| H15 Dani cabecea | Sin cambio (se mantiene, como decía la v16) | — |

**Recorrido mental con las cinco preguntas.** (1) *Quién soy*: se dice en la 2.ª y 3.ª línea. (2) *Objetivo de esta pantalla*: ahora lo dicen hoja, archivo, caso 2 (`B-entr2-1`, `B-arch2-1`) y frase (`A12`). (3) *Qué toco y qué cuesta*: ficha explicada antes del primer papel; los tres botones del informe dicen lo que hacen. (4) *Términos*: el script da la primera aparición de cada uno; ninguno se usa antes de definirse (ficha: `B-arch1-1`, en la pantalla donde aparece; Credibilidad, Voz, raya, meta, medidor: `B-cierre1-1…4`; Horizonte: `A10`; corcho: se explica en su propio pie al abrirse el caso; pieza: `A12`/`B-frase-1`). (5) *Qué pasó/qué sigue*: reacción + «Credibilidad sube N · Voz baja N» + cierre con valores. La regla «la jefa no corrige mientras decides» se cumple en el Caso 2: entre `A11` y «Sí, al consejo» no hay diálogo nuevo de la jefa, solo la consigna fija y «Primero abre algún papel.» (instrucción, no corrección). El sabe, el que no sabe y el perezoso: la frase solo paga (R2.3) si lleva la pieza del papel clave (`respuestas.ts` l.160), así que anunciar «una frase bien sostenida sube los dos» no regala una receta; firmar sin abrir y frenar siguen sin ser dominantes.

**Conteos (script).** Antes del primer papel que se puede abrir: 7 toques de «Siguiente» (3 bienvenida + 4 jefa) + 4 párrafos fijos (hoja 2, archivo 2) = 11 unidades de texto, 185 palabras; 13 si elige a Dani. Diálogo en asombro: 3 líneas; cierre del Paso 1: 8; entrada del Caso 2: 2. Voseo: 0; guiones largos: 0; bytes de control: 0; los 6 huecos de `orientacion-t1.json` (`dani`, `dC`, `dV`, `c`, `voz`, `papelClave`) se llenan en el guion; los huecos de los papeles los llena `papelDe`. Contrastes: el peor par vale 6,12 (todos pasan 4,5).

### 🟠 Nuevos

**N1. Sigue habiendo demasiado texto antes del primer papel (11 unidades, 185 palabras).** La v16 pedía bajar de 7 a 5 líneas (H1) y quedaron 7: se cambió el contenido, no el largo. Texto de relleno: «Primer encargo de la noche. Un dato corto, sin apuro.» y el encargo se dice dos veces (`ENCARGO` 2.ª línea y luego `A6` «Busca si ya preguntó cuánto duermen los de 4.º»). Arreglo mínimo (`guion-pantalla-t1.ts`): quitar «Primer encargo de la noche…» y unir las dos líneas de `ENCARGO` en una; quedan 6 toques; si además se unen `A1` y `A2`, 5.

**N2. Letra de menos de 12 px en lo que se toca y en los títulos (regla de legibilidad).** `mesa.css`: `.mesa-boton` 11 px (todos los botones, incluido «Siguiente ▸»), `.mesa-quien` 10 px (quién habla), `.mesa h3` 10 px («Corcho», «Tu frase para el informe», «Acuerdo del consejo», título del papel) y `.mesa-informe h3` 11 px (el titular del informe que hay que comprobar). Es letra de píxel y ancha, pero la regla pide 12 px. Arreglo: subir las cuatro a 12 px y comprobar a 375 px que «Continuar donde quedé ▸» y «Que responda {dani}» no se cortan.

### 🟡 Nuevos

- **N3. Asombro repite.** «Esa pregunta ya se hizo. Hace un año. Nadie la leyó.» y `B-asom-1` «el colegio ya hizo esta pregunta, y nadie usó la respuesta» dicen lo mismo, y `B-asom-2` repite `B-bienv-1` («Tu trabajo es eso…»). Dejar dos líneas: la original y «Eso era lo que te pedí».
- **N4. Retomar.** «Continuar donde quedé» en el Caso 2 entra a la carpeta sin el titular del informe, y la consigna habla de «ese cero» (`Mesa.tsx` l.296-299). Y los números propios de la hoja no se guardan (solo `propias: true`), así que tras recargar la tabla muestra la fila de Dani. Arreglo: mostrar el titular en la pantalla de la carpeta; guardar los tres números en el evento.
- **N5. Tubos y Horizonte.** Las dos rayas no llevan número en el dibujo (solo en el diálogo y en el `aria-label`); `A10` «si no contestamos a tiempo, el colegio la llama» no dice qué se pierde. Poner «25» y «65» bajo cada raya y una frase de consecuencia («y entonces mi puesto no depende de ti»).
- **N6. La ficha regalada pasa sin avisar.** Al acabarse las fichas, la jefa dice solo «¿Seguro que ahí no había nada?» y aparece un círculo más; Dani abre con «Mira este...» sin decir que esa no gasta. Y tras pulsar «Que responda Dani» el primer texto es «Yo respondo, si quieres.», que ya no corresponde. Cambiar a «Te regalo una ficha más. ¿Seguro que ahí no había nada?» y «Yo respondo».
- **N7. «Ficha» tiene dos sentidos.** Los papeles C1-1 («Ficha de ingreso») y C1-3 («ficha de dos líneas») usan la palabra en el sentido escolar, y la interfaz la usa como moneda. Cambiar en esos dos papeles a «registro de ingreso» / «nota de dos líneas».
- **N8. `B-reac-5` suaviza.** «no suma Credibilidad» aparece justo antes de «Credibilidad baja 8» (R2.4, tipo P). Cambiar a «agrada, pero no se sostiene con papeles».
- **N9. H9 queda a medias.** La gráfica repetida (l.582 y l.610) no marca el mes de la caída: dejar solo la del corcho y resaltar esa barra.

### Lo que está bien y conviene no tocar
La confirmación al frente (H11), los textos «qué hace cada botón», el orden quién-eres → qué-buscar → qué-significa → qué-pasó, y que los tubos aparezcan en la misma línea que los presenta.

### En lenguaje simple
Ya se puede mostrar a Ronald, con una advertencia: la historia ahora se entiende (quién eres, qué buscas, qué cuesta cada papel, qué significan los dos medidores, por qué subieron o bajaron). Dos cosas conviene arreglar antes o decirle que están pendientes: (1) todavía se lee mucho antes de tocar el primer papel (11 bloques de texto), y (2) varios botones y títulos tienen la letra más chica de lo permitido. Lo demás son detalles de redacción. Falta una captura en un celular real o en pantalla de 375 px para dar el visto bueno final a la ventana de confirmación.

---

## 09-10-2026 · Psicoestadística Descriptiva (Psicología), Tema 1: la primera pantalla jugable (Paso 1 + Caso 2), jugada mentalmente (v16)

**Qué se revisó.** `src/app/juego-psicoestadistica/Mesa.tsx`, `guion-pantalla-t1.ts` y `papeles-t1.json` (C1-1 a C1-9, C2-1 a C2-9), contra `02` §4 y §5.1 y `05` NT1.5 y NT1.6. Recuento con `docs/juego/gdd/scripts-t1/contar_pantalla_t1.py`: 13 fases, todas con pantalla en `Mesa.tsx`; 7 líneas de diálogo antes del primer toque (bienvenida 3, jefa 2, encargo 2; el script cuenta 1 en JEFA_LLEGADA porque las dos van en la misma línea del archivo, contadas a ojo en el archivo son 2); 4 líneas de cierre del Paso 1; 9 papeles por carpeta. La palabra «Fichas» sale 10 veces en `Mesa.tsx` y 0 veces en el guion: ningún personaje la explica. «Credibilidad» y «Voz» salen una vez, solo como rótulo del medidor, y la jefa nunca dice sus nombres. Esta pantalla se le mostró a Ronald sin crítico; su queja («no entiendo el flujo, ni qué estoy haciendo ni qué quiere que haga») es correcta.

**Diagnóstico en una frase.** Cada pantalla es correcta por separado, pero ninguna dice **el objetivo del momento** ni **qué se toca**, y la historia se cuenta (7 líneas) antes de que el alumno sepa quién es. El diseño `02`/`05` tiene la mayor parte de la orientación **en la cabeza del diseñador** (a) y dos huecos propios (b).

### 🔴 Bloquean la comprensión

**H1. Nunca se dice quién eres ni cuál es tu trabajo (pantallas `bienvenida` y `jefa`). (a) el diseño lo da por sabido.**
Texto: «Este es el Departamento de Orientación… Hoy lo ocupas tú.» y la jefa: «Llegaste al escritorio. Sin papeles no hay informe.» No aparece «psicólogo», «psicóloga» ni «tu trabajo es comprobar si lo que afirman es cierto antes de que llegue al consejo». La segunda frase de la jefa es un enigma. El alumno no sabe si es practicante, jefe o cliente.
Arreglo mínimo (`BIENVENIDA` y `JEFA_LLEGADA`): cambiar la 3.ª línea de bienvenida por «Eres el psicólogo o la psicóloga del colegio. Tu trabajo esta noche: revisar lo que afirman antes de que llegue al consejo.» y la 1.ª de la jefa por «Soy la jefa del departamento. Esta noche me ayudas con los papeles.» (quitar «Sin papeles no hay informe»). Bajar de 7 a 5 líneas: unir las dos primeras de bienvenida.

**H2. El primer encargo y la hoja parecen dos tareas sin relación (`ENCARGO` → `hoja`). (b) el diseño mismo.**
La jefa pide «¿El colegio tiene algún dato sobre cuánto duermen los de 4.º?» y la pantalla siguiente se llama «Para empezar», con «Es la hoja que llena cada estudiante al ingresar. Hoy la llenas tú», tres preguntas personales y los botones «Responde Dani» / «Poner las mías». El alumno cree que contestar la hoja ES el encargo, o que no tiene que ver. Nunca se dice para qué sirve (que su fila servirá para comparar con el archivo).
Arreglo: texto de `HOJA.jefa`: «Antes de buscar en el archivo, llena tú la hoja que llenan los estudiantes. Después vemos si el colegio ya preguntó esto.» (no explica estadística, solo el orden de lo que hará).

**H3. Dani aparece de la nada (`hoja`, botón «Responde Dani»). (a) `05` NT1.3 lo describe, la pantalla no lo presenta.**
Texto exacto: «Yo respondo, si quieres. Anoche fueron… Ayer me fue... {número}.» y «...perdón. ¿Dónde estaba?». El alumno no sabe quién es Dani (la silueta del fondo no se menciona antes), y el botón «Responde Dani» se lee como «responde con un dato inventado».
Arreglo: añadir en `JEFA_LLEGADA` o `ENCARGO` una línea de la jefa: «Dani es el practicante; si no quieres poner tus datos, responde por ti.» y rotular el botón «Que responda Dani (el practicante)».

**H4. `archivo1`: no se dice qué buscar, qué tocar ni qué cuesta (pantalla «El archivo del colegio»). (a) el diseño P1.3 lo tiene, la pantalla no.**
Texto: «El colegio archiva todo y nadie lo mira. A ver qué encuentras.» Debajo, «Fichas ○○○» y 9 botones con solo el nombre (Cuaderno de la enfermería, Registro de tardanzas…). No dice «busca si el colegio ya preguntó cuánto duermen los de 4.º», ni que tocar un papel lo abre, ni que cada papel abierto gasta una ficha (esa frase solo existe en el `aria-label`, que ve el lector de pantalla pero no el alumno). «Fichas» es un nombre sin significado.
Arreglo (`ARCHIVO.jefa`): «Busca en el archivo si el colegio ya preguntó cuánto duermen los de 4.º. Toca un papel para abrirlo: cada uno gasta una ficha y tienes {n}.» y en `Fichas` cambiar el rótulo «Fichas» por «Papeles que puedes abrir».

**H5. `asombro`: aparece una tabla sola y el paso nunca cierra el encargo. (b) el diseño mismo.**
Al cerrar el papel salta a «Lo que encontraste»: una tabla «Tú, hoy / Archivo, {fecha}» y la jefa: «Esa pregunta ya se hizo. Hace un año. Nadie la leyó.» El alumno no sabe por qué la tabla es un hallazgo, no se contesta lo que el director afirmó («los estudiantes duermen poco») ni lo que pidió la jefa, y el botón es solo «Seguir». La acción «abriste el papel correcto» no se reconoce.
Arreglo (sin enseñar estadística): título «Lo que encontraste: el colegio ya lo preguntó» y, antes de `CIERRE_PASO1`, una línea de la jefa: «Eso era lo que buscábamos. Ya existía y nadie lo usó. Este es tu trabajo: mirar antes de creer.» (la frase de oficio, no el concepto).

**H6. Los medidores aparecen y la jefa no dice cuál es cuál (`cierre1`, `CIERRE_PASO1.jefa`).**
Texto: «Dos medidores. Si firmas sin mirar, baja uno. Si frenas todo, baja el otro.» Los tubos se llaman «Credibilidad» y «Voz» (solo en `Tubos`), con dos marcas blancas sin nombre y un color que cambia a rojo/verde sin leyenda. El alumno no sabe cuál baja con qué, qué es «firmar», qué son las marcas ni cuál es la meta (`META_CIERRE` nunca se dice). «Horizonte» (línea 3) nunca se explicó.
Arreglo: «Credibilidad: cuánto te creen cuando firmas. Voz: cuánto te consultan cuando frenas. Firmar sin mirar baja la Credibilidad; frenarlo todo baja la Voz. La marca roja es el peligro; la verde, lo que quiero ver al final.» y cambiar «Horizonte» por «el colegio llama a una consultora externa». Rótulo bajo el tubo: «Que te crean» / «Que te consulten».

### 🟠 Confunden

**H7. `entrada2`: el informe se lee como del alumno y la jefa no dice qué hacer.** Texto: «El director lo quiere en el informe de mañana. Cero. Es un número redondo. Tienes la carpeta.» El alumno no sabe si debe escribir el informe, creerlo o comprobarlo. Arreglo (`CASO2.jefa`): «El director afirma esto para el consejo. Antes de que lo firmemos, mira en la carpeta si se sostiene. Después decides.»

**H8. `archivo2`: los tres botones de decisión están visibles desde el primer segundo, con 0 papeles abiertos.** «Firmar tal cual / Redactar la frase / Frenar» invitan a decidir sin mirar, y no dicen qué hace cada uno ni que cada uno mueve un medidor distinto. Es la estrategia del perezoso (firmar o frenar al instante) con aspecto de juego normal. Arreglo (`Mesa.tsx`, bloque `fase === "archivo2"`): mostrar bajo los botones una línea de cada uno («Firmar tal cual: el informe va al consejo como está.» / «Redactar la frase: tú escribes qué se puede afirmar.» / «Frenar: el informe no sale esta noche.») y, con 0 papeles abiertos, anteponer «Primero abre algún papel» sin bloquear.

**H9. El corcho y la gráfica no dicen qué se ve (`archivo2`).** «Los papeles que abras se clavan aquí, por fecha.» No explica que lo que importa es qué ocurrió cerca del mes en que bajaron las denuncias, y la gráfica «Denuncias por mes» aparece dos veces (en `entrada2` y dentro del corcho). Arreglo: poner en el corcho «Mira qué pasó justo antes de que bajaran las denuncias.» (orientación sin dar el papel) y quitar la gráfica repetida del corcho o marcar el mes de la caída.

**H10. `frase`: las piezas iniciales son tres vaguedades y el sentido de «sellar la frase» no se entiende.** Con 0 papeles solo hay «según fuentes del colegio», «datos preliminares», «el director informa». «Elige 2 o 3 piezas. Cada papel que abres agrega una.» no dice para qué es la frase (lo que el departamento afirma en lugar del cero). Además, la pantalla usa «Sellar» en un botón y «Firmar» en la confirmación; el diseño `05` dice «la agencia informa» y el código «el director informa». Arreglo (`Mesa.tsx`, párrafo de `mesa-frase`): «Esta frase va en el informe en lugar del cero: elige 2 o 3 piezas que puedas sostener con lo que abriste.»; unificar el verbo («Firmar la frase»).

**H11. `confirma` queda debajo de toda la pantalla larga.** En 375 px, abanico + corcho + gráfica + botones empujan el cuadro «¿Firmar? Después no hay vuelta.» fuera de vista; el alumno toca «Firmar tal cual» y no ve qué cambió. Arreglo: en `Mesa.tsx`, cuando `fase === "confirma"` mostrar la confirmación fija arriba o hacer scroll al cuadro.

**H12. `reaccion` y `fin`: el alumno ve que algo bajó o subió, pero no qué lo causó.** La madre pregunta «¿Y antes de {mes}, cuántas denuncias había?»; la jefa dice «No firmamos. Se nota que esperaste.» Nadie dice «por eso bajó la Credibilidad». En `fin` solo hay «Jugaste el primer encargo y el primer caso…» sin los valores de los medidores ni qué papel decidía. Arreglo mínimo: en `fin`, una línea «Credibilidad {c} · Voz {voz}» y, si se firmó sin abrir el papel clave, «No abriste el papel que cambiaba la historia: era {nombre}.» (usa `resultado`); sin explicar el concepto.

### 🟡 Cosméticos

- **H13.** Beto: «Buenas noches, doc. A ojo se ve que hoy trabajas hasta tarde.» aparece sin presentación y no hace nada; se puede quitar o dejarlo con «Soy Beto, de la portería.».
- **H14.** Se cuenta primero el desenlace de la prueba («los otros seis casos todavía no están») recién en `fin`; conviene decirlo en la pantalla `titulo` (`G.TITULO.pequeno` ya dice «Víspera del consejo»; añadir «Prueba: 2 de 8 casos»).
- **H15.** `Dani cabecea` (25 s) solo es visible en la escena; con la escena chica nadie lo nota. Mantener, no sirve de orientación.

### Lo que hay que arreglar primero, en lenguaje simple

1. Decir en la primera pantalla **quién eres y cuál es tu trabajo** (H1).
2. Que la jefa diga en una frase **qué buscar y qué tocar** en cada pantalla de papeles: «busca si el colegio ya preguntó esto; toca un papel; cada uno gasta una ficha» (H4, H7).
3. Explicar **una vez** los dos tubos y qué baja cada uno, con nombres claros (H6).
4. Unir el encargo con la hoja de Dani, y presentar a Dani (H2, H3).
5. Cerrar cada paso con una frase que diga **qué pasó y qué sigue** (H5, H12).
6. Que los botones de decidir digan lo que hacen, y que no se pueda firmar sin haber mirado un papel sin que lo avise la pantalla (H8, H11).

Nada de esto enseña estadística ni manda a leer el dossier; todo es orientación de qué hacer. Tras corregir, se re-juega esta misma pantalla con los tres alumnos (el que sabe, el que no sabe y el perezoso que firma o frena de inmediato).

---

## 08-10-2026 · Psicoestadística Descriptiva (Psicología), Tema 1 «La mesa de verificación» en el oficio de psicólogo de colegio: narrativa v3 y sonido v1 contra bucle v2 y aprendizaje v2.1 (papel + scripts, v15)

**Qué se revisó.** `05-mundo-y-narrativa.md` (sección «narrativa v3», líneas 20 a 786), `07-sonido.md` (v1, completo), contra `02-bucle-y-mecanicas.md` (v2, líneas 23 a 615), `04-aprendizaje.md` (v2.1, líneas 23 a 605) y `06` v14 (la simulación del bucle **no se repitió**). Revisión única, antes de mostrarle el plan a Ronald. **Con terminal:** todo conteo salió de un `.py` guardado en `scratch/` (`python -I`, salida en UTF-8): `v15_conteos.py`, `v15_ids.py`, `v15_vocab.py`, `v15_ramas_cmp.py`, `v15_ramas_falsas.py`, `v15_palabras.py`, `v15_efectos_uso.py`, `v15_origen.py`, `v15_contraste.py`, `v15_citas.py`, `v15_efectos.py`, `v15_extraer.py`. No se corrigió ningún documento de otro agente; cada hallazgo dice quién lo arregla.

**Las tres líneas del oficio (regla «El juego se hace para el oficio de la carrera»).** (1) Carrera: Psicología (Psicoestadística Descriptiva, Psicología). (2) Un psicólogo de colegio recibe informes, oficios, actas y frases de reunión («cero denuncias», «el taller funciona») y dice qué se puede afirmar con los datos del colegio. (3) Papel del jugador: psicólogo o psicóloga del Departamento de Orientación. **Pregunta del crítico: ¿este papel lo haría un profesional de la carrera del alumno? Sí.** Papeles del archivo (cuaderno de enfermería, libro de registro, buzón anónimo, informe del orientador), voces (madre que llama, docente, director, tallerista, practicante) y casos (denuncias registradas, taller de pausas, dos estudios de estrés, plan de bienestar) son del oficio. Un retoque de oficio, menor: el caso 7 le da al jugador la autoridad de «recortar» un presupuesto («¿A cuál recortas?») y el caso 8 dice que decide el director; debería ser «¿A cuál le recomendarías recortar?».

### Veredicto corto

| Pregunta | Respuesta |
|---|---|
| ¿Se puede mostrar el plan a Ronald tal cual? | **No todavía.** 2 bloqueos baratos (dos textos de la revelación falsos en la mayoría de sus apariciones) y 7 importantes. Nada obliga a rehacer una mecánica ni a tocar un número del bucle. |
| ¿Cuadran ids, números, botones y vocabulario entre las cuatro partes? | **Casi.** Cuadran 72 papeles, 30 sobres, 8 expedientes, 71 ramas, 20 ajustes, 11 hojas, 13 efectos, 11 prompts, metas 65/65 y marcas 25/65, botones y 53 efectos de reacción. **No cuadran:** los códigos de error y los hábitos entre `02` y `04` (I1) y «titular» en dos títulos de caso (C1). |
| ¿Algún texto o sonido da la respuesta o juzga antes que el mundo? | **Sí, poco y arreglable:** timbres de `E04` con carga de «bueno» y «malo», el ronquido de Dani parecido al aviso de error, el turno 2 del caso 5 que arranca en menor, el ánimo «hueco e incómodo» del caso 2 (I4), y dos líneas (una de la jefa y una de Ugarte) que dicen la lección o una pista (C6). |
| ¿Alguna rama de la revelación dice algo falso? | **Sí, dos** (B1 y B2). En las otras 69 no encontré falsedad contra las reglas del bucle v2 (68 hechos comprobados por el script de aprendizaje y mi recorrido a mano de las 71 contra las tablas de `02`); quedan dos detalles menores en C10 y C11. |
| ¿Se parece a AIEF? | **Sí en la figura de la jefa y el sello** (I2). Nombres, lugar y casos son distintos. |

### Hallazgos, de más grave a menos grave

**BLOQUEA**

**B1. La rama F3a dice «se pudo presentar» cuando el juego acaba de mostrar que el rango quedó en un anexo (`04` T1.7a/T1.7b, `05` NT1.9).**
*Qué pasa.* El bucle v2 hizo que el rango `ok` del caso 3 **solo pague entero con la pieza del papel clave**; sin pieza rinde como `flojo` y la narrativa lo muestra con «Queda en un anexo del informe. Cubre. Pero ¿de dónde salió la cifra de la fuente?» y el sobre `S-E3f`. Pero la tabla de ramas de `04` (F3a: «P · rango `ok` que cubre») **no tiene la dimensión «con pieza o sin pieza»** para los tipos P y B (solo la usa en A). Resultado: quien sacó 2 tandas, escribió un rango `ok` sin la pieza, vio «queda en un anexo» y después da vuelta la ficha 3, lee: *«Tu rango dijo cuánto se mueve la cifra, y por eso se pudo presentar.»* Falso. Con una simulación (`v15_ramas_falsas.py`, supuesto: 2 tandas y 1 papel abierto al azar de 6, tipo P): **sin pieza en 75,7 %** de los casos; con 0 papeles, 100 %. Quien abre el clave por el nombre («Ficha de cómo se obtuvo…») sí tiene pieza; el que no, ve una ficha que contradice su pantalla.
*Por qué importa.* Es justo el caso que el bucle cerró (hallazgo 2 de v13) y la revelación lo desmiente; además el script de aprendizaje (`ramas_t1.py`) dio «0 caen en 0 o 2 ramas» porque su modelo no tiene esa variable.
*Propuesta.* Aprendizaje: F3a solo con «`ok` **con** pieza»; «`ok` sin pieza» pasa a F3b (que ya dice «quedó en un anexo… nadie lo comentó»), con el cuándo «`flojo` o `ok` sin pieza»; agregar «pieza» como variable de P y B en `ramas_t1.py`. Narrativa vuelve a copiar con `armar_nt19.py`. Lo hace: `disenador-de-aprendizaje`, luego `disenador-narrativo`.

**B2. La rama F5h dice «esta vez el taller sí cambió un poco» y es falsa en 57 % de sus apariciones (`04` F5h, `05` NT1.9, bucle E5d).**
*Qué pasa.* El bucle define `E5d` como «escribió 0 con la comparación abierta y `|0 − ρ| > 1`». `ρ` es **la cuenta buena de esa versión** (con ruido de 13 contra 13), no el efecto del taller `δ`; y `δ` vale 0 en la mitad de las versiones. Aprendizaje escribió F5h como «escribió 0 con **efecto real**» y la narrativa copió «Esta vez sí cambió un poco… quedaba un efecto pequeño». `v15_ramas_falsas.py` (ρ ~ N(δ, 4,4) recortado a [−4, 10], como el simulador v14): `E5d` ocurre en 80,9 % de las versiones; **en 48,2 % de esas `δ = 0` (el taller no hizo nada) y en 8,8 % `δ = 3` pero `ρ < 0`**: la ficha dice algo falso o engañoso en **57,0 %** de las veces que aparece. Y el sobre `S-E5d` («¿de verdad no quedó nada?») empuja en el mismo sentido.
*Por qué importa.* Es el caso donde Ronald (que enseña esto) más va a mirar: afirmar un efecto que no existe, en la ficha que cierra la regresión a la media.
*Propuesta.* Bucle: `E5d` = «escribió 0, comparación abierta y `ρ > 1`» (así el sobre `S-E5d` «¿de verdad no quedó nada?» no sale cuando la cuenta buena es negativa; ese caso cae en R5.9 genérico → F5i, que es verdadera). Aprendizaje: F5h dice «Abriste con qué comparar y escribiste 0. La cuenta bien hecha daba {rho}.» (hueco `{rho}` del generador, 3 palabras) y su «Habría pasado» deja de afirmar causa. Lo hacen: `disenador-de-bucle` (definición), `disenador-de-aprendizaje` (texto), `disenador-narrativo` (copia y sobre `S-E5d`).

**INJUSTO / IMPORTANTE**

**I1. Hay dos tablas distintas de hábitos y de códigos de error, y el registro no se puede construir con las dos (`02` §8.2 contra `04` T1.5a/T1.5b).**
*Qué pasa* (`v15_ids.py`). `02` define **29** códigos `E…`; `04` define **26**: faltan `E2d` (frenó en B), `E3f` (rango bueno sin pieza) y `E5e` (aconsejó a o b), que ya tienen sobre en `05`. Peor, las clases de hábito **no coinciden en 11 casos**: `04` mete `E2c, E3c, E6c, E8d` en H3 y `E3b, E3e, E8c, E8d` en H4 (para no dejar códigos sin hábito) y avisa que «el bucle la adopta en su 8.2»; el bucle **no la adoptó**: deja `E2c, E3b, E3c, E3e, E6c, E8c, E8d` en «ninguna» (22 de 29 con hábito, 7 sin) y pide a aprendizaje que decida. Además `04` T1.5a fila del caso 2 dice **«acierto sin evidencia: no existe en este caso»**, y el propio `04` F2g y el bucle `R2.1.sin` (tipo B, firmar tal cual sin abrir el clave) **sí lo definen**. `04` T1.3 (ideas 2 y 6), T1.4 y T1.6 siguen diciendo «siempre con problema» y «48 filas vacías de 60», ya falsos (la nota de la línea 25 los salva solo si el lector la recuerda).
*Por qué importa.* `registro-t1.ts` y `ayuda.ts` (qué expediente sale) leen esas tablas; con dos versiones, el hábito H4 se dispara distinto según qué documento se programe, y el docente vería clases distintas a las diseñadas.
*Propuesta.* Una sola tabla: la de `04` T1.5b **más las tres filas faltantes** (`E2d` → sobrecorrigió, H3; `E3f` → acierto sin evidencia o sobrecorrigió, H1 solo si el clave estaba cerrado; `E5e` → registro, H4 dentro del caso 5), y el bucle §8.2 la copia con script. Corregir la fila del caso 2 de T1.5a (en B sí existe) y limpiar T1.3, T1.4 y T1.6. Lo hacen: `disenador-de-aprendizaje` y, después, `disenador-de-bucle`.

**I2. Parecido con AIEF: la jefa tras el vidrio, el sello y la presión por medidores (regla 13).**
*Qué pasa.* AIEF (`05` N2.2): «Doña Teresa, jefa de agencia, unos cuarenta años detrás del mismo vidrio… una línea por vez, dice la regla o hace una pregunta, nunca dice por qué», aparece en la llegada, al cierre de cada práctica y al final, y presiona con la pared roja. Aquí (`05` NT1.1, NT1.3, NT1.5): «un cubículo de vidrio donde trabaja la jefa», «Jefa (pose brazos cruzados, desde el vidrio)», frases de 4 a 10 palabras, «pregunta de vuelta en vez de corregir», «no explica», aparece en la entrada y el cierre de cada caso, y su sobre con una pregunta ocupa el lugar de la «línea después de cada práctica» de Doña Teresa. A eso se suman el sello (`07` E04 «golpe sordo de sello»; `02` «SELLA») y dos medidores como presión; el mismo oficio de escritorio con papeles. NT1.1 declara «la jefa no se asoma a sugerir», que es la frase de `PIEZAS-COMUNES` §4 contra la que hay que cuidarse: se evitó el verbo y no la figura.
*Por qué importa.* Un alumno que jugó los dos sentiría «la misma jefa con otro nombre». **Atenuante real:** AIEF es de Administración y este es de Psicología; son cursos distintos y casi nadie jugará ambos. Por eso es importante y no bloqueo; sí lo verá Ronald, que ve las dos.
*Propuestas.* **A (recomendada, solo textos y un dibujo):** la jefa está **en la sala**, sin vidrio (junto a la puerta, con un termo, de pie o sentada en el borde de otra mesa); habla en frases **más largas y de oficio** («mira, con los chicos de 4.º pasó esto el año pasado…») y **no** en reglas de una línea; el cierre del informe es una **firma a lapicera con el timbre del colegio**, no un sello; el sonido E04 cambia a pluma y timbre. **B:** cambiar quién da el sobre (que lo deje el propio colegio: un oficio, una nota de la secretaria) y la jefa solo aparece al arranque y al cierre. **C:** dejarlo y avisar a Ronald. Cuesta menos A. Lo hacen: `director-de-juego` (arte) con `disenador-narrativo` (voz) y `disenador-de-sonido` (E04).

**I3. Caso 6: un papel clave no trae el hecho que la pieza afirma, y la pieza del tipo A regala un papel (`05` NT1.6; `02` 5.5).**
*Qué pasa.* En el tipo P la pieza `grupo` dice «y todos son de {curso}». Los claves de P son **C6-1** («Los 60 son todos los estudiantes de {curso}») y **C6-2** («El colegio tiene ocho cursos. {curso} es uno de ellos»); el bucle dice que sirven los dos. Pero **C6-2 no dice que los 60 de la hoja sean de {curso}** (la hoja no trae curso): quien solo abrió C6-2 recibe una pieza que afirma algo que no vio. En el tipo A la pieza lleva dos hechos («12 respuestas **en semana de exámenes**») pero sus claves son dos papeles distintos (C6-1 «solo 12 devolvieron» y C6-3 «semana de exámenes»): quien abrió solo uno recibe gratis el dato del otro. El caso 3 sí lo hizo bien (pieza según cuál clave se abrió).
*Por qué importa.* Rompe «la pieza específica existe solo si abriste el papel que la trae» (M3) y regala una de las dos fichas del caso.
*Propuesta.* Narrativa: C6-2 en P pasa a «Composición por curso. Las respuestas de esta lista son de {curso}, uno de los ocho cursos del colegio.»; la pieza de A se parte en dos (una por papel, como el caso 3). Bucle: confirmar. Lo hace: `disenador-narrativo`.

**I4. Cinco sonidos que juzgan, o contradicen la regla de oro de la propia hoja (`07`).**
1. **E04: los tres botones suenan distinto con carga distinta** (L79): «Firmar tal cual = golpe sordo de sello; Redactar = campanita de máquina de escribir; Frenar = clic de freno». Una campanita contra un golpe sordo enseña «redactar es lo bueno, firmar es lo malo» en cada caso, aunque en el tipo B firmar tal cual sea lo mejor (+10/+10). S.0 promete «suena igual en toda versión»; entre botones no. *Propuesta:* los tres con el mismo timbre y distinto tono neutro, o uno solo.
2. **El ronquido de Dani es casi el aviso de error** (L84 y L105): E09 «dos notas triangulares descendentes, bajas» frente a «Dani cabecea: tres notas triangulares descendentes muy bajo». Suena cuando el alumno tarda (`05` NT1.7, ambiente), es decir, **antes de decidir**, y se oye como «te equivocaste». *Propuesta:* ruido de aire o un pulso agudo, sin notas descendentes.
3. **S5: el turno 2 arranca en menor y sin bajo** (L165) para todos, antes de que nadie diga nada. Anuncia «algo salió mal» antes de que llame el director vecino; el alumno que eligió (c) también lo oye. *Propuesta:* el turno 2 empieza en A y cambia a B recién cuando llega la llamada o la nota (el mundo habla primero). Además S5 usa «B» a la vez para «turno 2» y para «Duda más lenta»: hay que separarlas.
4. **S2: «frío, hueco, incómodo»** (L127): desconfía por adelantado del cero en todas las versiones; es lo mismo que la jefa cuando dice «Es un número lindo para un consejo» (`05` L206). En B (1 de 3) el cero es cierto. No delata el tipo, pero enseña «el caso 2 se desconfía». *Propuesta:* ánimo curioso y neutro («rebuscar, comparar»); y la jefa dice «Es un número redondo».
5. **S3: «escribir el rango» suena dos notas que se acercan o se alejan según el ancho** (L142), contra `E03` («siempre el mismo tono, que no suene a más ni a menos», L78). Es un sonido que reacciona al valor escrito: quien lo oiga acercarse aprende «ancho = malo» sin leer la hoja (el ancho ya es error en el nivel `ancho`) y puede tantear con el oído. *Propuesta:* quitar el efecto propio y usar E03.
Lo hace: `disenador-de-sonido`.

**I5. El mundo tiene cinco huecos que Ronald notaría («ninguna escena aparece de la nada»).**
a) **480 es dos poblaciones.** Caso 3: «los estudiantes de **4.º** duermen {cifra}», «registro de los **480**», «150 elegidos al azar entre los 480» (`05` L243 a L264). Caso 6: «uno de cada cuatro estudiantes **del colegio**», «60 salieron por sorteo entre los **480 inscritos**», «el colegio tiene ocho cursos», y la profesora de «4.º A» (L361 a L376). Si 480 es todo el colegio, el caso 3 habla de 4.º con un registro de todo el colegio; si 480 es 4.º, el caso 6 habla de «el colegio» con 4.º. *Propuesta:* el caso 3 pasa a «los estudiantes del colegio» (título, oficio, fichas F3c, F3f, F3h, F3j); 4.º queda solo en el caso 4 y en el paso 1, que no cuentan. Lo hace: `disenador-narrativo` y `disenador-de-aprendizaje` (copia).
b) **El paso 1 deja colgado su encargo.** La jefa pide «¿Cuántas horas duermen los de 4.º del colegio? Lo necesito para el consejo de mañana» y el paso termina con un asombro y «A partir de hoy firma el departamento». Nadie la contesta y el papel trae solo una «fila de ejemplo». *Propuesta:* el encargo pasa a una pregunta que el hallazgo sí contesta: «¿El colegio tiene algún dato sobre cuánto duermen los de 4.º?». Además la hoja «Para empezar» (3 preguntas personales) llega sin motivo en el mundo: una línea («es la ficha que llenan al ingresar; hoy la llenas tú») basta. Y la «fila de hace un año» repite los **mismos valores** que `{horas}`, `{minutos}`, `{animo}` de hoy (NT1.4 y C1-1 a C1-3): parece armado, justo lo que v13 hallazgo 9 quiso evitar con las columnas; usar valores distintos (`{horasAnt}`).
c) **Horizonte y Beto no se presentan.** Los casos 3 a 7 salen barajados y el primero que toque a Horizonte («Horizonte cita en su informe…», caso 4; «Mismo dato, otro dibujo», caso 7) lo hace sin que nadie haya dicho que es la consultora que el colegio llama si el departamento tarda; Beto aparece como eco en el caso 4 o 5 sin presentación (`05` NT1.3 dice de Horizonte que «solo aparece en una línea»). *Propuesta:* en el arranque, una frase de la jefa («si no contestamos a tiempo, el colegio llama a Horizonte») y Beto de paso con su taza («A ojo se ve», que hoy es solo «ambiente opcional» en NT1.7).
d) **El caso 5 salta un mes dentro de «una noche»** (`05` L325: «Pasó un mes. Hoja nueva.») y el marco son «la víspera del consejo», «se acabó la noche», «hoy tienes menos noche»; como los casos 3 a 7 se barajan, después del turno 2 el alumno vuelve a «esta noche». *Propuesta:* el turno 1 lleva una tarjeta «Hace un mes, otra noche como esta» y el turno 2 vuelve a «hoy»; así el mes pasó antes, no durante.
e) **El caso 8 empieza en otro lugar sin transición** («Sala de dirección… reunión de presupuesto») y con la jefa ausente. *Propuesta:* una línea de la jefa («Ugarte te espera en dirección») al cerrar el caso 7 o 3 a 7.

**I6. Las fichas F5a, F5b y F5c afirman causa donde el bucle solo garantiza una comparación (`04`/`05` NT1.9).**
«Comparaste… y tu número **separó lo que hizo el taller** de lo que subió solo.» Con 13 contra 13 la cuenta buena `ρ` incluye ruido (el propio bucle lo dice: desvío de la diferencia ≈ 4,4 puntos) y `δ` puede ser 0: en una versión con `δ = 0` y `ρ = +6`, el taller no hizo nada y la ficha dice que el número lo separó. Es una afirmación causal falsa para un docente de estadística. *Propuesta:* «Comparaste con el grupo del sorteo y descontaste lo que subió solo.» (F5a), igual con `{vecino}` y con «los demás y el informe». Y en el cierre, la misma idea sin causa. Lo hace: `disenador-de-aprendizaje`, luego narrativa.

**I7. Caso 5, turno 1: la decisión de diseño de que la jefa apruebe la trampa (pedido (4)).**
*Qué hace.* Si el alumno aconseja (a) o (b), la jefa levanta el pulgar y dice «Los que más lo necesitan. Bien.»; si aconseja (c), Ugarte protesta («¿Por qué dejas a 13 sin ayuda?», −3 Voz). En el turno 2 la aprobación se cae.
*Veredicto: la trampa es buena y enseña lo que Ronald pidió (la vergüenza), pero la forma actual cuesta tres cosas.* (1) **Rompe la única señal confiable del juego:** en los otros siete casos el pulgar arriba significa «va al informe» y suena E08; aquí significa lo contrario, y después se vuelve a usar sin aviso. (2) **Rompe a la jefa:** su ficha dice «No elogia: dice "Va al informe."», «quiere gente que pregunte, no que sepa», y aquí aprueba un diseño sin preguntar nada. (3) **Castiga la opción metodológicamente correcta con una queja realista pero sin salida:** en la práctica abierta se repite y el alumno aprende «(c) molesta». No es una mentira (ayudar a los que más lo necesitan es cierto), por eso no es bloqueo.
*Propuesta (recomendada).* Mantener la trampa, **pasar la aprobación a Beto o a Ugarte** («Son los que más lo necesitaban. A ojo se ve.» ya existe para Beto) y que la jefa conteste neutra con una pregunta de las suyas («¿Con quién los vas a comparar?»: pregunta, no pista, pues los tres botones ya están a la vista); sin E08 en ese momento. Y en el turno 2, cuando llegue la llamada del vecino, que la jefa diga **«Yo también dije que sí»** si el alumno eligió (a) o (b): la vergüenza queda compartida y el mundo es honesto. *Alternativa:* dejar el pulgar y agregar solo esa frase del turno 2 (menos trabajo, mantiene el problema 1). Lo hace: `disenador-narrativo`; `disenador-de-sonido` quita el E08 de S5 turno 1.

**COSMÉTICO**

**C1. «titular» sigue en los títulos de dos casos y el aviso final de la narrativa es falso.** «Dos encuestas, un titular» y «El titular de los 480» están en 10 líneas de `02`, `04`, `05` y `07` (`v15_vocab.py`). La narrativa conserva los títulos a propósito, pero «titular» es de prensa y la instrucción de la revisión es que no quede fuera de las notas de renombre. *Propuesta:* «Dos estudios, una sola cita» y «Los 480 de la frase». Además `05` L741 dice que `02` y `04` «aún dicen publicar, Lectores, portada y editora»: ya no es cierto (solo quedan en las tablas de equivalencia). Lo hace: `disenador-narrativo`, y los otros tres copian.
**C2. Dos frases pasan de 25 palabras en el peor caso** (`v15_palabras.py`: 637 frases, 2 de 26): L244 («Llegó un oficio de {fuente}. Tienes el registro de los 480 y la máquina de tandas: diez al azar. Cada tanda cuesta una ficha.») y L234 (la madre). La lista dice «0 de más de 25». Recortar.
**C3. `hechoClave` no es una frase en los tres claves** (`05` NT1.4; F2a «Viste que {hechoClave}»): C2-3 es «Derivaciones por conflicto entre estudiantes: de {d0} a {d1}…» (22 palabras, no cumple K1 de 16 y no se lee detrás de «Viste que»). Definir tres frases cortas, una por clave («las derivaciones por conflicto pasaron de {d0} a {d1}»).
**C4. Sobre `S-E6b`: «Dice 480. ¿A cuántos viste?»** La frase de la docente no dice 480 y la jefa no lo dijo; el 480 solo está en papeles. Usar «Dice "del colegio". ¿A cuántos viste?».
**C5. Reacción R8.4 a R8.7:** «Puse el dinero donde me dijiste» también sale cuando recomendó **no financiar**. Separar: «No gasté en el taller, como dijiste».
**C6. Dos líneas de la jefa y de Ugarte dicen la lección o una pista.** «Con una tanda no sabes cuánto se mueve» (puerta del rango; es la idea 3 dicha antes de verla) → «Para redactar un rango necesitas 2 tandas». Ugarte con 2 fichas: «con dos papeles todavía se puede» (revela que hacen falta dos) → «Hoy hay menos tiempo en la reunión».
**C7. Fichas, cartas y papeles se llaman igual.** El bucle (V1) las llama «cartas» para no confundirlas con las fichas de tiempo; `04`, `05` y `07` dicen «las ocho fichas», «gastar una ficha» y «dar vuelta una ficha» (E02, E12, S9), y el papel C3-1 se llama «Ficha de cómo se obtuvo…». Unificar en «cartas» en `04`, `05` y `07`.
**C8. Sonido: huecos y descuidos.** (a) La Decisión 2 dice «los 8 efectos más simples por código y 4 por Flow»: son **9 y 4** (`v15_origen.py`; E11 olvidado). (b) El peso: los 11 prompts suman 528 s, **6,2 MB a 96 kbps**, no «4 a 6». (c) `E06` (cae el sobre) no está en ninguna hoja; `E07` falta en S3 (llama una docente) y S4 (llama la coordinadora) y sobra en S8 («teléfono de Ugarte», que está en la sala); `E03` sobra en S2 (no se escribe número); `E04` y `E05` sobran en S1 (el paso 1 no tiene botón de firmar ni «¿Firmar?»: P1.6, sin sellar). (d) S2: «si redactó con las dos piezas pedidas»: el bucle paga con **una** pieza del clave (R2.3). (e) S2 y S1 deciden por la acción («si firmó tal cual», «error») y no por la reacción: en el tipo B firmar tal cual es el pulgar arriba; la regla debe ser «por la reacción que se ve». (f) S7: la nota dice «ningún motivo que sugiera escalón» y el prompt pide «a gentle stair-step pattern» y «arpegio en escalera lenta»: el caso 7 es el del eje truncado; cambiar a un patrón plano. (g) S4: en la sección C «una voz calla, queda la otra»: falta decir que alterna por versión y no depende de cuál estudio es el bueno. (h) S10: «plaza fija» y «otro trimestre» usan «E13», que es el clic de silenciar, y la jefa levanta el pulgar (E08) en la plaza fija. (i) Las cabeceras de `07` citan «narrativa v2», «bucle v1», «aprendizaje v1»: son v3, v2 y v2.1.
**C9. `{fuente}` fijo o por caso.** Si es una por versión, «Dirección Distrital Meridiano» aparece en los casos 3, 6 y 7 y el alumno aprende «Meridiano miente» (su caso 3 fue P y el 6 fue B). Sortear una por caso.
**C10. «Archivo del colegio… sin que nadie lo pidiera»** (F1a y `S-P1`): C1-2 es la «encuesta anual de la secretaría», que alguien sí pidió. Cambiar por «sin que nadie lo usara».
**C11. F4d dice que un papel «mostraba quién respondió en cada estudio»**, pero los claves C4-3 y C4-4 muestran **un** estudio. Cambiar por «en uno de los estudios».
**C12. Dos corchos en la misma sala.** NT1.11 #10 conserva el corcho con hilos del caso 2 (M4) y agrega el «panel de acuerdos» con tarjetas: aclarar si son el mismo muro. Y la pantalla de título no tiene el «Toca para empezar» que el sonido necesita (el navegador no suena sin un toque).
**C13. Lo que quedó de v1 en otros archivos.** `PIEZAS-COMUNES.md` §4 dice «narrativa v1» y su lista de expedientes no incluye Santa Rosa ni Los Naranjos; el caso 7 pide «¿A cuál recortas?» (ver oficio).

### Cuántos y cómo se contó (lo que pide la regla 14)

| Conteo | Dice la lista | Resultado del script | Script |
|---|---|---|---|
| Papeles C1-1 a C8-9 | 72 | **72** (9 por caso) | `v15_conteos.py` |
| Sobres `S-…` | 30 (`S-P1` + 29 códigos) | **30**; 29 `E…` cuadran con los 29 del bucle | `v15_conteos.py`, `v15_ids.py` |
| Expedientes `R-H…` | 8 | **8** (2 por hábito) | `v15_conteos.py` |
| Ramas de la revelación | 71 (66 + 5 del tipo B) | **71**; `04` y `05` idénticos en texto; máximo 22 palabras en las 66 filas de tres columnas (las 5 del tipo B las midió aprendizaje: máximo 25) | `v15_conteos.py`, `v15_ramas_cmp.py` |
| Ajustes de NT1.11 | 20 | **20** | `v15_conteos.py` |
| Hojas, efectos, prompts, filas de S.1 | 11, 13, 11, 11 | **11, 13, 11, 11** (+1 prompt de efecto) | `v15_conteos.py` |
| Origen de los efectos | 8 por código + 4 por Flow | **9 + 4** | `v15_origen.py` |
| Tiempos de los prompts (240 ÷ BPM × compases) | cuadran | **0 de 31 tramos fuera** de 1,6 s | `v15_conteos.py` |
| Meta 65/65 y marcas 25/65 | 65 y 25 | `05` y `02` coinciden; los «60» que quedan son columnas «antes»; `07` no cita 65 | `v15_ids.py` |
| Códigos `E…` | 29 en `02` y `05` | `04` tiene **26** (faltan E2d, E3f, E5e); hábitos **difieren en 11** | `v15_ids.py` |
| Reacciones `R…` | 41 en `02` | 37 en `05`; las 4 que faltan (`R5.1`, `R5.2`, `R8.5`, `R8.6`) están cubiertas en tablas agrupadas; `05` no define ninguna que `02` no tenga | `v15_ids.py` |
| Efectos (±) escritos en `05` frente a las tablas de `02` | cuadran | 53 líneas listadas, **0 diferencias** (comparación a mano sobre la lista del script) | `v15_efectos.py` + a mano |
| Contraste de los colores de texto | 13,3 y 15,3 | **13,4 y 15,3 a 1** | `v15_contraste.py` |
| Frases de más de 25 palabras (peor caso con huecos) | 0 | **2** (de 637) | `v15_palabras.py` |
| Citas al dossier o software en lo que lee el alumno | 0 | **0** (solo en notas y listas) | `v15_citas.py` |
| Vocabulario viejo fuera de notas de renombre | 0 | **«titular»** en 10 líneas (C1) y un aviso falso en `05` L741 | `v15_vocab.py` |
| Voseo (`buscar_voseo.py`) | sin voseo | `05` y `07`: **sin voseo**; `02`: 1 aviso («cambié») y `04`: 2 («medí», «releí»), los tres de notas del equipo en primera persona (falsa alarma) | `buscar_voseo.py` sobre `v15_sec_*.md` |
| Guiones largos | 0 | **0** en lo que lee el alumno (2 en líneas de listas que citan el signo) | `v15_extraer.py` |

### Jugar mentalmente el arranque y los 8 casos

Tres alumnos: **el que sabe** (abre por el nombre del papel y redacta), **el que no sabe** (abre al azar) y **el apurado** (el primer botón). Y Ronald (qué diría).

| Escena | El que sabe | El que no sabe | El apurado | Ronald |
|---|---|---|---|---|
| **Arranque + paso 1** | Toca las tres tarjetas, deja que Dani responda, abre «Cuaderno de enfermería»: asombro | Con 3 fichas halla uno de los dos papeles con sueño en 80 % (ya contado en el bucle); si no, ficha regalada y Dani | Cualquier papel, ve el asombro igual | «¿Y por qué me preguntan cuánto dormí?» y «¿y la cifra que pidió la jefa?» (I5b). Le va a gustar Dani |
| **Caso 2** | Abre correo/libro/informe del orientador (los tres claves tienen siempre el mismo nombre), redacta con las 2 piezas | 50 % de dar con el clave; si no, frase genérica: «Nuestras cifras son correctas» | Firma tal cual: llama la señora Quiroga (2 de 3). En B cobra +5 y «¿En qué papel te apoyabas?» | La llamada de la madre es lo más fuerte del tema. Le preocupará que el sonido ya anuncie «hueco» (I4.4) |
| **Caso 3** | 2 tandas + «Ficha de cómo se obtuvo»: pieza y rango `ok` | 2 o 3 tandas sin el clave: `ok` sin pieza, «queda en un anexo»; luego F3a le dice «se pudo presentar» (B1) | Firma la cifra del oficio | Notará 4.º contra 480 (I5a) |
| **Caso 4** | Abre «Lista de quienes respondieron» y cita el bueno | Elige el de «miles» | Elige el de «miles» | Le gusta que sea del distrito |
| **Caso 5** | Turno 1: (c), Ugarte protesta; turno 2: resta y escribe `ρ` | (a): la jefa lo felicita; turno 2: resta con papeles que no están | (a) y escribe la subida de los llamados: llama el vecino | Aquí discutirá F5a a F5c (I6) y la ficha F5h (B2); le gustará la trampa si la aprueba otro (I7) |
| **Caso 6** | Cuenta 60 filas (con toques), abre el clave, `grupo` | Base + «podrían» | Firma tal cual: llama Camacho | Contar 60 filas en un celular es lo más pesado del tema; que marcar sea opcional ayuda |
| **Caso 7** | Antes, de lector elige; después resta 64,8 − 63,0 y rediseña en P | Resta bien, firma tal cual en P: −10/+10, casi gratis | Igual | Lo que enseña es el «lector antes y después»; la resta es trivial (ya aceptado en D-T1-2) |
| **Caso 8** | Pone «Seguimiento» y «Listas y fechas» sobre la mesa, decide | Pone cualquier papel; R8.3 0/0 | Sigue a Beto | La pregunta de Ugarte «¿Cuántos eran?» sirve |
| **Cierre y revelación** | Da vuelta las 8 cartas; Beto cierra con su pregunta | Igual | Cierra rápido | Las dos fichas falsas (B1, B2) son lo primero que verá |

**Patrón que se aprende una vez** (no es un bloqueo, ya medido en v14: 4,8 % la mejor política sin papeles): los claves tienen siempre el mismo nombre en cada caso («Ficha de cómo se obtuvo…», «Lista de quienes respondieron…», «Cómo se eligieron los 60», «Seguimiento del semestre»). Un alumno que lo sepa abre el clave casi siempre (p cerca de 1); entonces lo que cuenta es leer bien, que es lo que se quiere.

### La lista de decisiones de diseño que se revisaron (pedido (4))

| Pieza | Resultado |
|---|---|
| Los 20 ajustes de NT1.11 | 20 presentes (`v15_conteos.py`). Contrastados a mano contra `02` y `04`: sin diferencias, salvo el 19 (las ramas F2f a F2j), que **ya está resuelto en `04` v2.1** con textos idénticos y la narrativa sigue llamando pendiente (su lista de salida lleva un ✘ viejo), y el 11, que introduce a Horizonte sin presentarlo (I5c) |
| Caso 5, turno 1 | Ver I7 |
| Decisiones de `07` (licencia, efectos por código, orden de pedidos) | La licencia es de Ronald y queda bien dicha; «por código» está bien recomendado pero con la cuenta equivocada (C8a); el orden de 3 pedidos (S0, S2, S9) es sensato |
| Ajustes del sonido a otras partes (`07` S.5) | Gestos de NT1.11 (teléfono, sello, taza) → E07, E04, S10: presentes; el sello sigue siendo el parecido de I2 |

### Lo que está bien y conviene no tocar

- El tipo B del caso 2 y sus cinco ramas (F2f a F2j) están en `04` y en `05` con el mismo texto; la narrativa lo documentó honestamente como propuesta.
- Los 72 papeles conservan el mismo nombre en todas las versiones y cambian el texto (clave o banal): no se puede deducir el tipo por el título.
- Meta 65/65 y marcas 25/65 están igual en las tres partes; 53 efectos de reacción coinciden con las tablas del bucle.
- La regla de oro del sonido (S.0) es buena; las excepciones de I4 son de cinco filas.
- La jefa que nunca nombra el concepto, los sobres con una pregunta y el cierre de Beto («la próxima te pregunto de dónde sale») cumplen «no es una lección» salvo C6.
- Los tiempos de los 11 prompts salen exactos (240 ÷ BPM × compases).

### Quién lo arregla (sin tocar nada aquí)

| Hallazgo | Quién | Qué |
|---|---|---|
| B1, B2, I6, C11 | `disenador-de-aprendizaje`, luego `disenador-narrativo` | T1.7a/T1.7b (F3a/F3b, F5a a F5c, F5h, F4d); `ramas_t1.py` con «pieza» en P y B y con `ρ`; copiar a NT1.9 |
| B2 (definición) | `disenador-de-bucle` | `E5d` con `ρ > 1` |
| I1 | `disenador-de-aprendizaje` y `disenador-de-bucle` | Una tabla de hábitos y 29 códigos; limpiar T1.3, T1.4, T1.6 |
| I2 | `director-de-juego`, `disenador-narrativo`, `disenador-de-sonido` | Jefa sin vidrio ni sello, otra voz; decide Ronald si prefiere C |
| I3, I5, I7, C1 a C6, C9, C10, C12 | `disenador-narrativo` | Textos y huecos |
| I4, C7, C8 | `disenador-de-sonido` (C7 también 04 y 05) | Kit y hojas |
| C13 | quien construye / `director-de-juego` | `PIEZAS-COMUNES` §4 |

### Qué falló o faltó en los agentes (para mejorarlos, uno por vez)

1. **Las cuatro entregas llegaron con ✘ o con ✔ sin prueba**, contra la regla «no se entrega con ✘»: narrativa con 3 ✘ (ramas del tipo B, que `04` v2.1 ya resolvió, K1 a K11 y legibilidad), aprendizaje con 1 ✘ (motor de registro), bucle con 2 ✘ (simulación, voseo) y sonido con ✔ en «tuteo» aunque `buscar_voseo.py` figura «sin correr». Aprendizaje v2, bucle v2 y sonido dijeron «sin terminal» y entregaron igual, en vez de avisar antes de entregar; la narrativa sí tuvo terminal y aun así dejó sus ✘ sin cerrar.
2. **Los scripts de verificación modelan la tabla, no las reglas.** `ramas_t1.py` dio «0 errores» con un modelo que no tiene la pieza del caso 3 en P y B ni la relación entre `ρ` y `δ`; las reglas v2 del bucle no llegaron al modelo (B1, B2). Mejora propuesta para el agente de aprendizaje: que su script de ramas importe los estados del bucle (o los pida) en vez de rehacerlos.
3. **Nadie reconcilió las dos tablas de hábitos** aunque cada una dice que la otra la adopta (I1). Mejora: una sola fuente (la de aprendizaje) y el bucle la copia con script.
4. **El sonido se escribió sin leer los textos del alumno una por una:** reglas de oro contradichas por el propio kit (E04, E03 contra S3, stair-step) y efectos inventados sin mecánica (la regla de S7, E04/E05 en el paso 1).
5. **La narrativa no se probó recorriendo el orden barajado del alumno:** Horizonte, Beto, el mes del caso 5 y el 480 funcionan en el orden del papel y no en el que verá cada alumno.
6. **Mejora propuesta al crítico (regla de las mejoras, punto 5; sin aplicar):** incluir en la revisión de narrativa un script que, para cada rama de la revelación, enumere los estados que el bucle puede producir (no los de la tabla) y marque los que no tienen rama o cuya rama afirma un hecho distinto del estado. Hoy lo hice con dos simulaciones a mano; B1 y B2 se habrían visto antes.

### Lista de salida de esta revisión

| Regla | ✔/✘ | Cómo | Prueba contada |
|---|---|---|---|
| Oficio de la carrera (3 líneas y la pregunta) | ✔ | a mano | Arriba: Psicología · psicólogo de colegio · psicólogo del Departamento de Orientación; respuesta «sí»; dos retoques menores (caso 7). El juicio no se puede contar |
| Conteos de narrativa (72, 30, 8, 71, 20) | ✔ | script | `v15_conteos.py`: 5 de 5 coinciden |
| Conteos de sonido (11 hojas, 13 efectos, 11 prompts, 11 filas) | ✔ | script | `v15_conteos.py`: 4 de 4; tiempos 0 de 31 fuera; origen 9 + 4 (la Decisión 2 dice 8, C8a) |
| Ids, metas y botones entre las cuatro partes | ✘ | script | `v15_ids.py`: 29/29/29 y R cuadran; **no cuadran** E del aprendizaje (26) ni 11 clases de hábito (I1) |
| Vocabulario viejo (redacción, editora, titular, agencia, Lectores) | ✘ | script | `v15_vocab.py`: «titular» en 10 líneas (C1); lo demás solo en notas de renombre |
| Ninguna rama de la revelación dice algo falso | ✘ | script | `v15_ramas_falsas.py`: F3a falsa en 75,7 % (con 1 papel abierto) y F5h en 57,0 % (B1, B2); las otras 69: resisten (68 hechos del script de aprendizaje) |
| Ningún texto o sonido da la respuesta ni juzga antes que el mundo | ✘ | a mano | I4 (cinco sonidos) y C6 (dos líneas). Releí las 11 hojas y los 637 textos entre comillas; no se puede contar |
| Revelación de `05` = `04` | ✔ | script | `v15_ramas_cmp.py`: 71 ramas, 0 textos distintos (66 + 5 en tabla de cuatro columnas) |
| Los 20 ajustes de NT1.11 | ✔ | script + a mano | 20 presentes; contenido contrastado a mano contra `02` y `04` |
| Efectos (±) de `05` contra las tablas de `02` | ✔ | script + a mano | 53 líneas listadas por script; comparación a mano, 0 diferencias |
| Estrategia dominante nueva | ✔ | a mano | No se repitió la simulación (v14: 4,8 %). Se jugó el texto: patrón de nombres de papeles fijos (p cerca de 1, no hace ganar sin leer); pistas de la jefa solo después de sellar. Ningún texto nuevo mueve un número |
| Lo que cuenta para la nota no se puede copiar | ✔ | a mano | Sin nota en este tema. El tipo, el clave y las cifras salen de la semilla (v14); la ficha varía por rama. No se vuelve a contar |
| Parecido con otro juego (regla 13) | ✘ | a mano | I2: la figura de la jefa y el sello; nombres, lugar y casos distintos |
| Pasó por el motor sin copiar (regla 13, lado código) | ✔ | a mano | `02` §3 reutiliza `partida.ts`, `version-alumno.ts`, `azarConSemilla`, `nube.ts`, `problemasDeTexto`; «No se usa `escalera.ts`». No hay código del tema todavía |
| Texto que se lee: 12 px, 4,5 a 1, nada tapado | pendiente | contraste por script; el resto pendiente | `v15_contraste.py`: 13,4 y 15,3 a 1. Sin pantalla no hay medición de tamaño ni de tapado: se hace con `medir_legibilidad.py` al construir (cuenta como ✘ para la construcción) |
| Citas al dossier / software | ✔ | script | `v15_citas.py`: 0 en lo que lee el alumno |
| Tuteo, castellano neutro, sin guiones largos | ✔ | script | `buscar_voseo.py`: `05` y `07` sin voseo; 3 avisos en `02` y `04` son primera persona en notas del equipo; guiones largos: 0 |
| Web y app por igual | ✔ | a mano | `07` S.0 (primer toque, silenciar, pista por escena); falta el «Toca para empezar» en la narrativa (C12) |
| Individual, sin careo | ✔ | a mano | Beto, Ugarte y Horizonte son personajes; ningún texto pide un compañero |
| No es una lección | ✔ | a mano | Dos líneas dicen la lección (C6); las fichas de la revelación nombran conceptos por diseño aprobado |
| Reportó todo lo que no hizo | ✔ | — | No se corrigieron documentos de otros; no se probó el audio ni se midió pantalla |
| Entregas sin ✘ | ✘ | script | Las cuatro llegaron con ✘ o con ✔ sin prueba (ver «Qué falló o faltó») |

**NOTA 08-10 (noche):** `04-aprendizaje.md` v2.1, `02-bucle` v2 y los scripts del crítico no se habían guardado nunca. El bucle v2 se reconstruyó (`02`, sección v2; scripts en `scripts-t1/`); aprendizaje v2.1 TAMBIEN se reconstruyo (09-10): `04` secciones T1.x hasta T1.10 y `scripts-t1/ramas_t1.py` (0 fallos). B1, B2 e I1 quedaron corregidos en 04; lo que no se pudo reconstruir esta listado en 04 T1.10. Falta que el critico lo vuelva a revisar.

**Resultado de la lista: 5 ✘ (ids, vocabulario, ramas falsas, sonido/texto que juzga, parecido) y 1 pendiente (legibilidad).** Es una lista de hallazgos, no una entrega: se vuelve a jugar lo corregido (punto 15) cuando los agentes los arreglen.

---

## 08-10-2026 · Psicoestadística Descriptiva (Psicología), Tema 1: simulación definitiva del bucle v2 (script, v14)

**Qué se hizo.** Se rehicieron los scripts con las tablas v2 de `02-bucle-y-mecanicas.md` (secc. 0, 2, 5 y los seis cambios de 11.5) y se
corrió todo: E-S1 a E-S10, las estrategias de sobrecorregir (E-S6, E-S7, E-S8), la búsqueda de la mejor política sin abrir un solo papel y el
recuento de los conteos del bucle. **20 000 versiones por estrategia, semilla 20261008, meta 65/65, `python -I`.** No se editó 02, 04, 05 ni 07.
Los scripts v1 (`simular_t1.py`, `buscar_perezoso_t1.py`, `variantes_t1.py`, `extra_t1.py`, `contar_t1.py`) quedan intactos como historia de la v13.

**Archivos guardados (todos en `scratch/`):** `simular_t1_v2.py` → `salida_v2_simular.txt` · `buscar_perezoso_t1_v2.py` → `salida_v2_buscar_perezoso.txt` ·
`variantes_t1_v2.py` → `salida_v2_variantes.txt` · `extra_t1_v2.py` → `salida_v2_extra.txt` · `contar_t1_v2.py` → `salida_v2_contar.txt`.

### Veredicto corto

| Pregunta | Respuesta |
|---|---|
| ¿Se cumple el umbral (la mejor política sin papeles, por debajo de 15 %)? | **Sí, con mucho margen: 4,8 %** (re-medida en otras 20 000 versiones; 21 600 políticas). Sin mirar el dibujo del 7: 3,2 %. Ninguna política pasa 10 %. No hace falta una variante. |
| ¿Algo bloquea? | **Nada bloquea.** |
| ¿Algo falla en el recuento? | **0 de 58 comprobaciones fallan.** Solo un número del texto no coincide con el cálculo (cosmético, abajo). |
| ¿Qué queda abierto? | Un hueco que el bucle y el crítico no probaron: quien **abre 3 papeles al azar y se cubre con lo intermedio** pasa **61,7 %** (injusto, abajo; decide Ronald). |

### La tabla: % que pasa la meta (C ≥ 65 y Voz ≥ 65), tablas v2, 20 000 versiones

| Estrategia | v2 (esta corrida) | Referencia v13 (tablas viejas, ya no valen) |
|---|---|---|
| E-S1 firmar siempre (c5: (a) y 0) | **0,0 %** | 0,0 % |
| E-S2 frenar siempre | **0,0 %** | 0,0 % |
| E-S3 intermedia sin papeles (c5 frenar, c7 tal cual) / E-S3b (c5 escribe 0) / E-S3c (y c7 mira el dibujo) | **0,0 / 0,0 / 0,0 %** | 0,0 / 10,3 / 10,3 % |
| **Mejor política fija sin abrir papeles** (21 600; re-medida) | **4,8 %** | 59,5 % (variante G: 12,1 %) |
| …la mejor sin mirar el dibujo del 7 / sin dibujo y sin comparar la cifra del oficio con las tandas | 3,2 % / 2,9 % | 43,6 % |
| E-S4 abre 3 al azar; si no halla, firma | **22,0 %** (falla por C en el 78 %) | 29,7 % (variante G: 23,7 %) |
| E-S5 abre 3 al azar; si no halla, frena | **8,8 %** (falla por Voz en el 81 %) | 13,0 % |
| E-S6 rediseña siempre el 7, lo demás p = 0,65 / 0,80 / 1,00 | 53,0 / **77,4** / 100 % | 80,9 % con p = 0,8 |
| E-S7 escribe 0 siempre en el 5, lo demás p = 0,65 / 0,80 / 1,00 | 61,4 / **83,9** / 100 % | 93,5 % con p = 0,8 |
| E-S8 espera siempre en el 8, lo demás p = 0,65 / 0,80 / 1,00 | 42,6 / **67,6** / 100 % | 79,0 % con p = 0,8 |
| E-S9 copia las decisiones de otra versión | **0,3 %** | 7,9 % (la ficha daba 0,5 %) |
| **E-S10 entiende**, si falla cubre con lo prudente, p = 0,50 / 0,65 / **0,80** / 0,95 | 37,6 / 64,6 / **87,5** / 99,3 % | variante G: 32,8 / 59,5 / 83,7 / 98,8 % |
| E-S10, si falla **firma** (como la ficha), p = 0,50 / 0,65 / 0,80 / 0,95 | 43,5 / 68,4 / 89,0 / 99,4 % | |
| E-S10, si falla va a lo **intermedio** (ver abajo), p = 0,25 / 0,50 / 0,65 / **0,80** / 0,95 | 26,6 / 67,4 / 85,6 / **96,1** / 99,8 % | |
| p = 0 (nunca da con el clave, siempre prudente) | 0,0 % | 0,0 % |

**El 80 % es una estimación, no un dato:** solo se mide con alumnos reales. Lo que sí está medido es la **forma**: las tres sobrecorrecciones
(E-S6, E-S7, E-S8) quedan **por debajo** de quien entiende con el mismo p (77,4 / 83,9 / 67,6 contra 87,5), que era lo que había que probar.

**Otras corridas (10 000 versiones, una cosa movida por vez; `salida_v2_variantes.txt`):**

| Variante | Mejor sin papeles | Entiende p = 0,50 / 0,65 / 0,80 / 0,95 |
|---|---|---|
| Control (tablas v2, meta 65/65) | 4,7 % | 38,2 / 65,5 / 87,6 / 99,3 |
| **Meta 60/60** | **14,6 %** (a 0,4 puntos del límite) | 49,2 / 75,2 / 93,0 / 99,7 |
| Meta 70/70 | 1,0 % | 27,0 / 52,8 / 79,8 / 98,0 |
| Caso 2 siempre con problema (D-T1-1 apagado) | 3,4 % | 37,7 / 65,3 / 87,6 / 99,4 |
| Frenar en el caso 2 vuelve a +6/−8 | 4,7 % (igual) | igual |
| Esperar de más en el 8 vuelve a 0/−4 | 6,2 % | 38,9 / 66,1 / 87,9 / 99,3 |

**Qué enseña.** (1) El umbral lo sostiene la **meta 65/65**: con 60 la mejor política sin papeles queda en 14,6 %, justo debajo del límite y sin margen;
con 65 queda en 4,8 %. (2) **D-T1-1 casi no mueve nada** en esta medida (4,8 % con B en 1 de 3; 3,4 % sin B): sirve contra el dictado entre compañeros,
no contra el perezoso; se puede dejar como está. (3) El cambio «frenar en el caso 2: +6 → +3» **no cambia ningún número** (la mejor política ya no
frena en el 2); no está de más, pero hoy no sostiene nada. (4) «Esperar de más 0/−8» sí pesa un poco (4,7 → 6,2 % al quitarlo).

### Hallazgos, de más grave a menos grave

**BLOQUEA. Ninguno.**

**INJUSTO / IMPORTANTE. 1. Quien abre 3 papeles al azar y se cubre con lo intermedio pasa 61,7 % (decide Ronald; valor recomendado: dejar la meta en 65 y medir con alumnos).**
*Qué pasa.* E-S4 y E-S5 (las de la ficha) se cubren solo con «firmar» o «frenar». Un alumno que abre 3 papeles sin criterio, lee lo que sale y, cuando no
halla el clave, usa lo intermedio (frase sin pieza, rango de 2 tandas, «ninguno» en el 4, frenar en el 5, base sin extensión en el 6, mirar el dibujo en el 7,
esperar en el 8) pasa **61,7 %** (C medio 78,7; Voz medio 69,6), igual que quien entiende con p ≈ 0,45 cubriéndose igual (p = 0,50: 67,4 %). No es un
error de las tablas: abrir 3 de 6 da con el clave en la mitad de los casos por construcción (3/6). Pero **la tabla E-S10 de la ficha es pesimista** porque
supone que quien no da con el clave «cubre con lo prudente» (que cuesta Voz), y eso subestima a todos los que pasan. Comparación justa, la misma que debe leerse:

| Meta | Azar + intermedio | Entiende (+ intermedio) p = 0,50 | 0,65 | 0,80 | 0,95 |
|---|---|---|---|---|---|
| 60/60 | 75,6 % | 81,7 | 94,0 | 99,0 | 100 |
| **65/65** | **61,7 %** | 67,4 | 85,6 | 96,1 | 99,8 |
| 70/70 | 46,9 % | 53,9 | 75,6 | 92,2 | 99,6 |
| 75/75 | 28,9 % | 38,7 | 60,8 | 82,3 | 97,2 |

*Por qué importa.* El tema no tiene nota: lo que cambia es el diálogo de la plaza fija y el registro. Pero con 65 más de la mitad de quienes **no deciden con
criterio, solo abren y leen** verán «plaza fija». El registro (acierto sin evidencia, hábitos) sí los distingue; la meta no.
*Propuesta (no se aplicó nada).* Opción A, **recomendada**: dejar 65/65 y no tocar tablas; la separación entre azar y p = 0,80 es de 34 puntos y el 80 %
es una estimación; se mide con alumnos reales y se decide con datos. Opción B: meta 70/70 (azar + intermedio 46,9 %; mejor sin papeles 1,0 %), a costa de que
quien entiende con p = 0,65 pase 75,6 % en vez de 85,6 %. **Decide Ronald; valor recomendado: A.** El cambio es un número en `reglas-t1.ts`.

**INJUSTO / IMPORTANTE. 2. Los números de E-S10 del bucle (11.5) y de la ficha deben decir con qué respaldo se calcularon.** Con «lo prudente» sale 37,6 / 64,6 / 87,5 / 99,3 %;
con «firmar» 43,5 / 68,4 / 89,0 / 99,4; con «lo intermedio» 67,4 / 85,6 / 96,1 / 99,8 (p = 0,50 / 0,65 / 0,80 / 0,95). La diferencia entre los dos extremos en p = 0,50 es de
30 puntos. Si el bucle declara una sola cifra, el lector cree que es «el» pase de quien entiende. *Propuesta:* declarar el rango (por ejemplo, «87 a 96 % con p = 0,80»).

**INJUSTO / IMPORTANTE. 3. E-S4 (abre 3 al azar y firma si no halla) pasa 22,0 %**, por encima del umbral de 15 %, que el bucle propone solo para «sin papeles». No contradice nada
(abre papeles, y pasa menos que quien entiende con p = 0,50: 37,6 %), pero hay que decirlo para que nadie lea «15 %» como techo de todas las perezosas. Falla por Credibilidad en el 78 % de
los casos (firma lo equivocado), que es justo lo que enseña el tema.

**COSMÉTICO. 4. «Escribir 0» en el caso 5.** El bucle (5.4) dice que vale en ≈ 18 % (δ = 0) y ≈ 14 % (δ = 3), «alrededor de 1 de cada 6». Con el filtro I5 (ρ entre −4 y +10)
sale **22,2 % y 15,9 %** (≈ 1 de cada 5). Las cifras del texto son las de la normal sin recortar. No mueve ninguna tabla.

**COSMÉTICO. 5. El refuerzo del caso 2 entra a la carpeta solo la mitad de las veces** (G10: el clave y los 2 señuelos de la ventana entran siempre; los otros 3 se sortean entre 6, y el
refuerzo es uno de esos 6). El texto de R2.3 («+10/+4 si lleva también la del refuerzo») no lo dice; el simulador lo supone (3/6). Si Ronald quiere que el refuerzo entre siempre, se agrega a G10.

**COSMÉTICO. 6. Dos pruebas de sensibilidad que no cambian nada, para dejar constancia:** (a) si el **largo de la hoja del caso 6** (12 contra 60 filas) delatara el tipo A, la mejor política
sin papeles sigue en 4,8 % (con la política «adapta» del 6: 4,5 %); (b) si el perezoso escribe el número constante óptimo en el 5 (1,5 en vez de 0 o 3), tampoco sube (4,4 %).

### Recuento con script (`contar_t1_v2.py`): 58 comprobaciones, 0 fallan

Coinciden: G1 a G12 (12), M1 a M14 (14), P1.1 a P1.6, V1 a V6, **46 filas R2 a R8** (R2 5, R3 5, R4 7, R5 9, R6 7, R7 5, R8 8), 17 cambios de la secc. 0, 15 ajustes de la secc. 14,
**G5: 7 filas nombradas y las 7 existen** (cinco valen exactamente la mitad con redondeo hacia cero; R5.8 = +4/+2 y R8.3 = 0/0 son valores explícitos, como G5 permite), las 10 tiradas de G7
(son exactamente las 10 que cumplen las restricciones y coinciden con las del simulador; caso 3 y 6: P 4 B 4 A 2; caso 7: P 5 B 5), **29 códigos de error** (E2 4, E3 6, E4 3, E5 5, E6 4, E7 3, E8 4),
**4 clases de hábito; 22 códigos en alguna clase y 7 en «ninguna»** (por clase: H1 7, H2 5, H3 8, H4 5; ningún código sin clasificar ni definido dos veces ni citado sin definición), las diez sumas de E-S1 (máximo 0; cota 50 + 0 + 5 + 5 + 4 + 0 = 64 < 65;
aumentos posibles 29), las cotas aritméticas de quien entiende (64 y 31), el neto del 5 ((c) +12/+3; (a) +6/+3), las combinatorias de fichas (0,50 / 0,33 / 0,80 / 0,60 / 0,20 / 0,067 / 0,05),
la confiabilidad 100/164 = 0,61, el desvío 4,4, los 13 peores que suben ≈ 6,8 (el texto dice «alrededor de 7») y los 47 que bajan ≈ 1,9 («alrededor de 2»), los 5 grupos de la tabla 11.3,
0 guiones largos, 0 voseo (regex propia, **no** `buscar_voseo.py`: ese control sigue pendiente) y los 9 papeles del fondo del turno 2 del caso 5. Quien lo hace todo bien (p = 1) termina con C ≥ 98 y Voz ≥ 87 en las 20 000 versiones.
**No coincide:** solo el hallazgo 4 de arriba (la probabilidad de que «escribir 0» valga). El vocabulario viejo (Lectores, mesa fija, etc.) aparece en 14 palabras y todas las líneas son las permitidas por la lista de salida
(tabla de nombres que cambian, nota de renombre, secc. 13, etc.; las coincidencias de «edición» eran «medición»).

### Supuestos del simulador (ninguno sale de alumnos reales)

`p` es una estimación de quien entiende (con dos papeles necesarios cada uno sale con √p); el simulador **no** modela fichas de la práctica ni del Paso 1; ρ se sortea N(δ, 4,4) recortado a [−4, 10] (I5) sin imponer I1 a I4
(solo importan las bandas para quien escribe la subida bruta o la inflada, que el perezoso sin papeles no hace); el refuerzo del caso 2 entra el 50 %; la media de 2 tandas tiene desvío 0,246 h y cubre el 99,9 %; todos cuentan bien el
`N` del caso 6 y escriben el `x` correcto del 7 (lo da la hoja); «mirar la hoja contra el dibujo» en el 7 se cuenta como política gratuita aunque ya es entender la idea 7 (D-T1-2); la política «adapta» del caso 3 (comparar la cifra
del oficio con la media de 2 tandas) se conserva porque es información gratuita legítima del caso 3. La búsqueda elige la política con 20 000 versiones y la **vuelve a medir con otras 20 000** (evita el sesgo del ganador).

### Lo que el bucle y el crítico no detectaron

1. **El respaldo cuenta tanto como p** (hallazgos 1 y 2): la v13 y la lista de salida probaron fallbacks de «firmar» o «frenar»; nadie probó «abro al azar y me cubro con lo intermedio».
2. **`python -I` ignora `PYTHONIOENCODING`** y escribe bytes cp1252 sueltos en las salidas guardadas (las «ñ» y tildes salían como `�`); se resolvió con `sys.stdout.reconfigure(encoding="utf-8")` en `simular_t1_v2.py`
   (los demás scripts lo importan). Las salidas v13 (`salida_*.txt`) pudieron quedar con ese defecto.
3. **Una política de 21 600 (no 27 000)**: sin la política «adapta» del caso 6 (la hoja ya no tiene filas en blanco) son 3·5·3·6·4·4·5 = 21 600; con la sensibilidad (adapta del 6 y el número 1,5 en el 5) son 36 000.
4. Mejora propuesta a la regla del crítico (REGLA DE LAS MEJORAS, punto 5; sin aplicar): que la simulación estándar de un bucle incluya una estrategia «azar + respaldo intermedio» (E-S4b), porque es la que mide si la meta separa a quien decide de quien solo abre.

**Qué sigue.** Decidir la meta (recomendado: 65/65 sin tocar) con los números del hallazgo 1; declarar el respaldo de E-S10 en la ficha y en 11.5 (hallazgo 2); correr `buscar_voseo.py` (pendiente en la lista de salida);
y pasar al crítico de jugabilidad con estas cifras en lugar de las de la v13.

---

## 08-10-2026 · Psicoestadística Descriptiva (Psicología), Tema 1: aprendizaje v1 y bucle v1 (papel, v13)

**Qué se revisó.** `04-aprendizaje.md` (sección «Tema 1 · aprendizaje v1») y `02-bucle-y-mecanicas.md` (sección «Tema 1 ·
bucle y mecánicas v1»), contra la ficha elegida `00-tema1-forma1-ficha.md`, las 8 ideas APROBADAS y lo que Ronald decidió
(sin nota, sin software, sin «según el dossier», individual, versión por alumno). Con terminal: **todos los conteos se
recontaron con script** y **las estrategias perezosas se simularon con las tablas NUEVAS del bucle**. Se jugaron los 8
casos como el que sabe, el que no sabe, el apurado y Ronald. No se corrigió ningún documento ajeno ni se tocó
`05-mundo-y-narrativa.md` (lo escribe otro agente ahora).

**Scripts** (todos en `scratch/`, corridos con `python -I`, salidas guardadas en `scratch/salida_*.txt`):
`contar_t1.py` (conteos), `simular_t1.py` (E-S1 a E-S10, 20 000 versiones cada una, semilla 20261008),
`buscar_perezoso_t1.py` (las 27 000 políticas posibles sin abrir ningún papel), `variantes_t1.py` (arreglos probados),
`extra_t1.py` (fichas, tipos, caso 5).

**Salida de `contar_t1.py` (resumen):** 50 comprobaciones, **0 fallan**. Coinciden: G1 a G12 (12), M1 a M14 (14), P1.1 a P1.6,
V1 a V6, filas R2 4, R3 4, R4 5, R5 9, R6 6, R7 5, R8 8, las 10 tiradas de G7 (y son **exactamente** las 10 que cumplen
sus restricciones; caso 3 y 6: P4 B4 A2; caso 7: P5 B5), los 26 códigos de error (E2 3, E3 5, E4 3, E5 4, E6 4, E7 3, E8 4),
la suma de las 10 tiradas de E-S1 (10, −20, −20, −20, −20, −30, 0, 0, −30, −30), la cota 56 < 60 de E-S1, las cotas 64 y 28
de quien entiende, las probabilidades 0,50 / 0,80 / 0,60 / 0,20 / 0,067 / 0,05, los 9 ajustes de la secc. 14, 8 ideas, 8
bloques de T1.3, errores típicos por idea [1,3,4,3,4,4,3,4], 10 ítems de registro, 4 escalones, 8 fichas, 6 hallazgos H.
Lo que **no** coincide con lo declarado (aunque ninguna cifra declarada es falsa):
- Fondos de papeles: G10 pide 9 por caso. Tras sacar la hoja adjunta, el **caso 6 queda con 8** y el **caso 8 con 6** (la
  ficha lista 6; el bucle dice «los 4 restantes se sortean» sin decir de dónde). Casos 2, 3, 4, 5 y 7 tienen 9.
- 3 líneas de la revelación pasan el tope de 25 palabras que declara T1.7: cierre de la ficha 5 (27), cierre de la ficha 8
  (29), cierre general (34).
- 12 de los 26 códigos de error **no caen en ningún hábito** (H1, H2, H3): E2c, E3b, E3c, E3e, **E5a, E5b**, E5d, **E6a**,
  E6c, **E7a**, E8c, E8d.
- G7: dados dos de los tres tipos, el tercero queda fijado en 6 de 10 tiradas para el caso 7 y en 4 de 10 para el 3 y el 6.

**Salida de `simular_t1.py` (tablas del bucle, meta C y L ≥ 60 tras el caso 8):**
```
E-S1 publicar siempre                                  pasa   0.0 %  (C 8,3  | L 100)
E-S2 retener siempre                                   pasa   0.0 %  (C 66,5 | L 0)
E-S3 intermedia sin papeles (c5 retener)               pasa   0.0 %
E-S3b igual, c5 escribe 0                              pasa  10.3 %
E-S3c igual y c7 mira la hoja contra el dibujo         pasa  10.3 %
E-S4 abre 3 al azar; si no halla, publica              pasa  29.7 %   (ficha: 22,0)
E-S5 abre 3 al azar; si no halla, retiene              pasa  13.0 %   (ficha: 22,4)
E-S6 rediseña siempre c7, lo demás p=0,8               pasa  80.9 %
E-S7 escribe 0 siempre c5, lo demás p=0,8              pasa  93.5 %
E-S8 espera siempre c8, lo demás p=0,8                 pasa  79.0 %
E-S9 copia las decisiones de otra versión              pasa   7.9 %   (ficha: 0,5)
E-S10 entiende p=0,50 / 0,65 / 0,80 / 0,95             pasa  47.9 / 71.9 / 90.7 / 99.4 %   (ficha: 12,5 / 32,9 / 64,6 / 94,8)
   misma p pero, si falla el papel, PUBLICA (como la ficha)  55.5 / 79.0 / 94.7 / 99.9 %
```
**Salida de `buscar_perezoso_t1.py`:** de 27 000 políticas fijas sin abrir papeles, **la mejor pasa 59,5 %**
(C medio 57,7, L medio 67,9): caso 2 retener, caso 3 «2 tandas; si su media queda a menos de 0,7 h de la cifra de la agencia,
publicar; si no, rango de 1,2», caso 4 la grande, caso 5 aconsejar (a) y retener, caso 6 publicar tal cual, caso 7 comparar
la hoja con el dibujo, caso 8 esperar. 10 políticas pasan ≥ 50 %, 1 274 pasan ≥ 20 %, 4 354 pasan ≥ 10 %. Sin mirar el dibujo
del caso 7: 43,6 %.

**Supuestos del simulador (todos marcados; ninguno sale de alumnos reales):** `p` es el acierto de quien entiende y es una
**estimación**; con dos papeles necesarios cada uno sale con √p; si quien entiende no da con el clave «cubre» con la acción
prudente (variante «publica» más abajo); todos cuentan bien el `N` del caso 6; la media de 2 tandas tiene desvío 0,246 h
(bucle 5.2); quien sabe el caso 8 con un solo papel acierta 2/3 (cuenta a mano). La simulación sigue las tablas R2 a R8 tal
cual están escritas, incluidos los vacíos.

### Veredicto corto

| Parte | ¿Se puede construir? | Bloqueos | Importantes |
|---|---|---|---|
| Aprendizaje v1 | Sí, tras corregir textos de fichas y cifras viejas | 0 | 2 (hallazgos 5 y 6) |
| Bucle v1 | **No todavía**: la lista de salida da ✔ a «sin estrategia dominante» y no es cierto | **1** | 5 (hallazgos 2, 3, 4, 7 y 8) |

### Hallazgos, de más grave a menos grave

**1. BLOQUEA. Se pasa la meta sin abrir un solo papel (59,5 %), y la lista de salida dice lo contrario.**
*Qué pasa.* El bucle cerró E-S1 y E-S2 a mano y dejó E-S3 a E-S10 «sin correr». Corridas, **E-S3 deja de ser lo que
promete**: una política fija que nunca abre un papel pasa el 59,5 %, contra el 0 % que prometía la ficha (secc. 8) para «no
abrir nada». La receta usa solo lo gratis: el caso 2 siempre es problema, así que «retener» (+6/−8); el caso 3 compara la
media de 2 tandas con la cifra de la agencia (separa «con problema» de los otros dos en el 98 % de las versiones); el caso 4
elige la grande (+10 L aunque se equivoque); el caso 6 publica tal cual o deja la base sin extensión (nunca baja de 0); el
caso 7 compara la hoja con el dibujo; el caso 8 espera (0/−4). Tres causas, las tres de diseño: (a) **prudencias que no
cuestan** (R6.3 base sin extensión, retener del caso 2, esperar del 8, rango de 2 tandas); (b) **información gratis** (la
hoja adjunta, las tandas, el tipo A visible en la lista de 60); (c) **G5 declarada y no aplicada**: G5 dice que un acierto
sin evidencia cobra «mitad o menos», pero R3-B (publicar tal cual sin la ficha), R4 (elegir el bueno sin abrir) y R6-B
(publicar tal cual sin el clave) pagan lo mismo que con evidencia; solo R5.8 y R8.3 lo aplican. Además, **el caso 2 y el 5 son
siempre problema** y el 8 se resuelve «esperando»: un compañero puede dictar «en el 2 retén, en el 8 espera, en el 4 la
grande» y vale para todas las versiones (punto 11 del crítico: respuestas que no cambian de un alumno a otro).
*Por qué importa.* El tema no mide nota y la meta solo cambia el último diálogo («mesa fija»), así que el daño no es una
nota injusta: es que el cierre del juego premia no mirar nada y que el registro («acierto sin evidencia») queda lleno de
alumnos que «ganaron». También se pierde el valor del Tema 1 como diagnóstico: la mitad del curso podría ver «mesa fija» sin
haber visto un papel. La vara de Ronald es clara: una forma simple de ganar sin entender es un bloqueo.
*Propuesta (probada con `variantes_t1.py`, 3 000 versiones por política, 8 000 por estrategia):*
| Arreglo | Mejor sin abrir papeles | Azar y publica | Entiende p=0,50 / 0,65 / 0,80 |
|---|---|---|---|
| Tablas del bucle tal cual, meta 60 | 58,9 % | 29,9 % | 48,2 / 72,3 / 90,5 % |
| Meta 70/70 | 35,2 % | 20,9 % | 25,0 / 51,1 / 78,7 % |
| Aplicar G5 (mitad) en R3-B, R4 y R6-B | 38,7 % | 29,9 % | 48,2 / 72,3 / 90,5 % |
| Prudencias más baratas: retener c2 +3/−8, R6.3 en P +2/+1 (B 0/+2, A 0/+1), esperar 0/−8 y sin evidencia 0/0 | 51,8 % | 29,8 % | 45,3 / 70,8 / 90,0 % |
| **Las dos anteriores juntas + meta 65/65 (recomendado)** | **12,1 %** | 23,7 % | 32,8 / 59,5 / 83,7 % |
| Las dos anteriores juntas, meta 60 | 25,4 % | 29,8 % | 45,3 / 70,8 / 90,0 % |
Recomendado: aplicar G5 de verdad (filas «sin evidencia» en R3-B, R4, R6-B), abaratar las prudencias y subir la meta a 65/65;
los números van en `reglas-t1.ts` y el bucle ya dijo que se ajustan tras probar. Esto **no es una receta cerrada**: G5 solo
se simuló en las políticas de «no abrir»; hay que volver a correr `simular_t1.py` con las tablas definitivas antes de
construir (regla 15 del crítico: un arreglo es código nuevo). Y las cifras de p son estimaciones: se afinan con alumnos.
Para los constantes (caso 2 y caso 5 siempre problema): que **al menos una** de las dos sea «bien» en alguna versión sería
lo ideal, pero Ronald eligió esas dos como constantes (el primer golpe y la vergüenza); si se mantienen, que su respuesta
correcta cambie de **pieza** (cuál papel destapa, ya cambia) y que la prudencia no sea la ganadora (arreglo de arriba).

**2. IMPORTANTE. El cierre del problema del rango (H2) no cerró: «rango de 1,2 con 2 tandas» sigue pagando.**
*Qué pasa.* El bucle (11.6) dice haber cerrado la estrategia «siempre ancho 1,2 con 2 tandas» con la puerta de 2 tandas, el
nivel `flojo` (1,2 a 2,0) y la cifra de la agencia a más de 1,0 h. Pero `ok` es `b − a ≤ 1,2` (5.2): un rango de **exactamente
1,2 centrado en la media de 2 tandas** es `ok`, cubre 99,9 % (cuenta del propio bucle) y paga +8/+4 en el tipo P **sin abrir
ningún papel**. Los papeles del caso 3 solo separan «bien» de «aún no» (el acta), y eso, que sería lo que la idea 3 quiere,
queda en el 20 % de las versiones.
*Por qué importa.* El caso 3 se vuelve «saca 2 tandas y escribe 1,2». La idea 3 (una tanda no es la cifra) sí se vive; el
papel clave deja de hacer falta en 8 de cada 10 versiones.
*Propuesta.* Que `ok` pague +8/+4 solo si la frase lleva la pieza del papel clave (como R2.3 y R3.A.con); sin pieza, rango
bueno = `flojo` (+3/0). O bajar el tope de `ok` a 0,9 h y exigir 3 tandas para ese ancho. La primera mantiene las 3 fichas
(2 tandas + 1 papel) y es coherente con el resto de las frases con piezas.

**3. IMPORTANTE. Caso 5: la opción que Ronald quiere enseñar (el sorteo) es la peor pagada, y «escribir 0 siempre» le gana a
quien entiende.**
*Qué pasa.* Con las tablas R5, quien entiende (p=0,8) pasa 90,7 % eligiendo el sorteo (c) y **95,5 % eligiendo (a) con el vecino**
(`extra_t1.py`), porque (c) cuesta −6 Lectores en el turno 1 y Lectores es la medida que manda en la meta (de los que
fallan con p=0,8, el 9,3 % de las versiones falla «solo L» y 0,0 % «solo C»). Además E-S7 («siempre escribir 0», con los papeles de (c)
abiertos con probabilidad p) pasa **93,5 %, más que quien entiende**: escribir un número siempre da L +4 (R5.9: −10/+4),
mientras que el «retener» prudente de R5.3 da L −6. Y la ficha decía «solo con el grupo del sorteo (c) el número cuenta» (§4);
el bucle lo cambió a que (a) con el vecino también cuente (ajuste 3, declarado).
*Por qué importa.* No rompe la forma elegida, pero la ficha 5 de la revelación nombra el «grupo de control»: la mayoría de
los que juegan bien habrán usado el vecino. Y que lo correcto pague menos que lo ciego es un error de economía, no de gusto.
*Propuesta.* Que la meta cuente por Lectores y Credibilidad de forma simétrica (ver hallazgo 1) y que (c) cuente 0/0 en el
turno 1, con el costo de la protesta (−6) pasado a «solo si no abres el papel del grupo». O que R5.9 cobre L −4 en lugar de
+4 («publicar un número que no sale de tus papeles»). Y decir en el informe del tallerista (opción b) el **2,5 como número**,
no como «ya venían subiendo»: sin él, el número de (b) es una adivinanza.

**4. IMPORTANTE. Caso 6 y 7: la hoja adjunta (ajuste 1) deja los papeles claves como decorado y rompe el registro.**
*Qué pasa.* En el caso 7 el tipo se ve comparando la hoja (A 64,8, B 63,0) con el dibujo; las tres «claves» (correo, captura,
ficha técnica) solo confirman. R7 no usa los papeles y el bucle no define «acierto sin evidencia» para el 7. En el caso 6, el
tipo A se ve a simple vista (48 filas vacías de 60). Pero T1.5 clasifica por «abrió el clave, decidió bien»: para el 7 la
clasificación `descubrió solo` y `acierto sin evidencia` no se puede calcular, y el 7 siempre sale `descubrió con pista` o
`se dejó engañar` por el número.
*Por qué importa.* Para Ronald, el registro por idea es lo que sirve. En la idea 7 deja de significar lo que dice.
*Propuesta.* Que el caso 7 mida la decisión de verdad (el lector antes/después y `x` correcto) y que el registro de la idea 7
se base en eso, no en abrir; o que la hoja del 7 no traiga la escala (que la dé el papel clave): vuelve a «ver antes de
calcular» y la carpeta vuelve a servir. Elegir una y dejarlo escrito.

**5. IMPORTANTE. Los textos de las fichas de la revelación se eligen por «abrió / no abrió» y dicen cosas que dependen del
tipo y de la opción.**
*Qué pasa.* T1.7 da dos ramas por ficha («abrió» / «no abrió») y el bucle (V3) elige la rama por la clasificación. Pero:
ficha 4, rama «no la abrió»: «Había respondido solo quien ya estaba en el club de apoyo», **falso en el 50 % de las versiones**
(A era la buena); ficha 5, rama «no comparó»: nombra al «colegio vecino», que no existe si eligió (c); ficha 3, rama «una
sola»: «publicaste la cifra de una tanda» no vale en tipo B donde publicó la de la agencia; ficha 6, rama «titular de más»:
«60 de un solo curso» solo vale en tipo P; ficha 8, rama «decidió con uno»: no dice si acertó. El bucle ya avisó de 3 huecos
por carta (24 textos); falta decir que **dos de las ramas existentes también están mal asignadas**.
*Propuesta.* Que cada ficha tenga la rama por **tipo/opción**, no solo por «abrió»: lista de combinaciones por ficha (ficha 4:
{abrió, no abrió} × {A buena, B buena}; ficha 5: {a, b, c} × {con, sin comparar}; ficha 3, 6: {P, B, A}). Es trabajo de
narrativa con una tabla que ya sale del bucle; se le pasa antes de que escriba las fichas.

**6. IMPORTANTE. Las cifras de las estrategias perezosas que cita el aprendizaje (T1.6) son las de la ficha y ya no valen.**
T1.6 cita «0 %, 22 %, 0,5 %». Con las tablas del bucle son 10 % (sin papeles, c5 escribiendo 0), 29,7 % (azar y publica) y
7,9 % (copiar). Y `04` dice «las estrategias de la ficha pasan la meta 0 %»; la mejor pasa 59,5 %. Se corrigen al arreglar
el hallazgo 1 y volver a simular; mientras tanto no se citan.

**7. IMPORTANTE. Los hábitos casi no se disparan en los casos donde el escalón 3 más haría falta.**
*Qué pasa.* El archivo (escalón 3) en la partida oficial sale solo con un **hábito** (misma clase de error en dos casos). 12 de
los 26 códigos no pertenecen a ninguno: entre ellos E5a y E5b (la subida bruta y el número inflado, la vergüenza del caso 5),
E6a (conteo mal) y E7a (escribió lo que se ve).
*Por qué importa.* Quien más necesita el recorte de otra edición es quien cae en el caso 5, y es justo el que nunca lo recibe.
*Propuesta.* Una cuarta clase H4 «creyó lo que mostraba el resultado propio o el dibujo» con E5a, E5b, E6a, E7a, que se
cumple con dos casos distintos o con un solo caso (el 5 tiene dos turnos). Coste: una fila en la tabla 8.2.

**8. IMPORTANTE. Caso 5: la hoja fuerza una precisión que 13 contra 13 no tiene, y choca con el caso 8.**
*Qué pasa.* Las invariantes I1 a I4 vuelven a sortear hasta que el efecto medido quede a 0,8 de δ. Con el propio modelo del
bucle (desvío de la diferencia entre dos grupos de 13 ≈ 4,4 puntos, cuenta a mano), solo el 14 % de los sorteos cumpliría I1,
así que el generador descarta ~6 de cada 7. Resultado: el alumno ve que «13 contra 13 mide el efecto con ±0,8», mientras que en el
caso 8 «9 contra 9» es «aún no se sabe». Enseña una precisión falsa en el caso donde se enseña la regresión.
*Propuesta.* Dejar que ρ varíe como varía (hasta ±4) y que la banda buena siga siendo `|x − ρ| ≤ 1` (el alumno calcula ρ, no
adivina δ); o cuadrar la lección diciendo, en el informe del tallerista, que son pocos. Barato; hay que decidirlo antes de
escribir `bienestar.ts`.

**9. COSMÉTICO / A VIGILAR.**
- **Dos fichas en el último caso.** El castigo de 2 fichas cae sobre quien ya anda mal, y en el caso 8 hacen falta dos claves
  (azar 1/15). En lo simulado ocurre en 39,8 % de las versiones de «azar y publica», 41,5 % de «azar y retiene», 5,3 % de quien
  entiende con p=0,5 y 0,2 % con p=0,8. Es lo que Ronald eligió y se queda; solo avisar al narrador de que el caso 8 con 2 fichas
  tiene que seguir siendo «jugable» (la editora lo dice).
- **Contar 60 filas en el celular** (caso 6) es el momento más tedioso del tema. Que cada fila se pueda tocar para marcarla
  (el contador sube solo, el número sigue siendo el que escribe el alumno) ahorra errores de dedo, no la cuenta.
- **El asombro del Paso 1** depende de que el archivo traiga filas con las mismas tres columnas que contestó el alumno
  (horas de sueño, minutos de celular, estado de ánimo 0 a 100): suena armado. Mejor que coincida una sola o dos columnas.
- **G9 usa `semilla + k`.** Las versiones v y v+1 comparten flujos de azar (el `orden` de v es el `tipos` de v+1). No daña
  nada; `semilla * 100 + k` lo evita.
- **«Al elegir (a) por segunda vez»** (T1.3, idea 5): en la partida oficial el caso 5 se juega una vez; solo vale en práctica.
- **G10** no fuerza que los 2 señuelos con fecha en la ventana del caso 2 (calendario, lista de tutores) entren entre los 6
  papeles de la versión.
- **«Probar este caso con otras cifras»** (8.4) es ilimitado y sin registro de valores: sin nota no daña; si el tema llegara a
  pesar, es tanteo.
- **Líneas de revelación largas:** 3 pasan 25 palabras (ver arriba).

### Los 9 ajustes que el bucle hace a la ficha (secc. 14 del bucle)

| # | Ajuste | ¿Rompe algo que Ronald eligió? | Nota |
|---|---|---|---|
| 1 | Hoja adjunta en 6 y 7 | No rompe la forma; **debilita la carpeta con señuelos** en esos dos casos | Hallazgo 4 |
| 2 | Caso 3: puerta de 2 tandas, nivel `flojo`, tabla por tipo | No | La puerta de 2 tandas es buena (enseña por consecuencia); el nivel `ok` queda abierto (hallazgo 2) |
| 3 | Caso 5: tres caminos, sesgo +2,5, bandas ±1,0 | No rompe la vergüenza; **cambia la ficha**: (a) con vecino también cuenta | Hallazgos 3 y 8 |
| 4 | Caso 6: base con `N` siempre; cuatro extensiones | No | `podrían` ≡ sin clave es correcto |
| 5 | Caso 7: rótulo con `x` en toda publicación; tal cual en P baja a −10/+10 | No | El número ahora decide en cada rama |
| 6 | Caso 8: papeles sobre la mesa; «financiar cuando aún no» −15/+6 | No | Bien resuelto (H3) |
| 7 | Escalón 3 en la oficial al cumplirse un hábito (DEFECTO) | No | Hallazgo 7 |
| 8 | «Probar este caso con otras cifras» (DEFECTO) | No | Es el escalón 4, ahora sí claro |
| 9 | Hay que volver a simular | Hecho aquí | Resultado en el hallazgo 1 |
**Ninguno rompe lo que Ronald eligió.** Dos (el 1 y el 3) debilitan la intención de la ficha y están en los hallazgos.

### Los 8 casos, jugados

*El que sabe, el que no sabe, el apurado; y Ronald.* Lo que cada uno hace donde se pierde, se aburre o hace trampa:
- **Paso 1.** El que no sabe pulsa Dani y sigue; igual ve el asombro (la editora regala una ficha y, si hace falta, Dani abre el
  papel). Bien pensado, sin trampa posible. Ronald: es la pieza que más se parece a «los datos están en todas partes»; solo la
  coincidencia exacta de las tres columnas suena armada (hallazgo 9).
- **Caso 2** (siempre problema). El que no sabe publica y llama una madre: golpe bueno. El apurado aprende en la práctica que
  «retener» o la frase genérica no cuestan casi nada: el caso es siempre el mismo problema (hallazgo 1). Ronald lo va a
  sentir como el mejor momento si la narrativa le da cara a la madre.
- **Caso 3.** El que sabe saca 2 tandas y compara con la cifra; el apurado las saca y escribe 1,2 (hallazgo 2). Se aburre el que
  no sabe qué hacer con la máquina: la puerta de 2 tandas lo salva (bien).
- **Caso 4.** El apurado elige la grande: 50 % de aciertos y +10 Lectores aunque se equivoque (R4.3: −20/+10). Eso no es un
  patrón dictable, pero sí un sesgo de la tabla hacia «la grande». Ronald: se entiende en un segundo.
- **Caso 5.** El que no sabe aconseja (a), ve subir a los 13 y escribe la subida: llega la vergüenza. Bien. El que sabe elige
  (a) con el vecino y no (c), porque (c) le cuesta (hallazgo 3).
- **Caso 6.** Contar 60 filas en el celular cansa (hallazgo 9); el apurado publica tal cual o la base sin extensión.
- **Caso 7.** El mejor «juego» del tema: lector primero, después los números. El apurado no necesita abrir nada: compara la
  hoja con el dibujo (hallazgo 4). Ronald: esto es «primero se ve, después se calcula».
- **Caso 8.** El que no sabe financia lo que parece funcionar; el apurado espera siempre y casi no paga (0/−4). El colega «a
  ojo» y los dos años lado a lado son lo más fuerte del tema.
- **Revelación.** Dar vuelta 8 fichas es bueno; los textos por rama están mal asignados (hallazgo 5).

### Qué está bien y conviene no tocar

- Las 10 tiradas de G7 son exactamente las que cumplen sus restricciones; los conteos P/B/A son los declarados.
- E-S1 y E-S2 «exactas a mano» se confirman con 0,0 % en 20 000 versiones.
- La puerta de 2 tandas, el rótulo con `x` en toda publicación, el lector del caso 7 antes y después sin juzgar, el colega «a ojo»
  que acierta 1 de cada 3, la prohibición de que el escalón bloquee «Siguiente caso» (8.5), la partida reconstruida desde
  eventos y las piezas de motor (`partida.ts`, `version-alumno.ts`, `azarConSemilla`, `problemasDeTexto`) **existen en el
  código** con esos nombres (comprobado en `src/`).
- La combinatoria de fichas (0,50 / 0,80 / 0,20) es correcta (script).

### Para mejorar los agentes (qué falló o faltó)

- **`disenador-de-bucle`.** (1) Entregó con un ✔ de «sin estrategia dominante» apoyado en dos pruebas exactas y ocho «sin
  correr»; correrlas cambió el veredicto. Debe **buscar la mejor política sin papeles** (todas las combinaciones de acciones por
  caso) además de las estrategias con nombre: una búsqueda así encontró 59,5 % que ninguna estrategia nombrada mostraba. (2) Una
  regla general (G5) no está en las tablas que dice gobernar: falta una **prueba cruzada** «cada regla general aparece en
  todas las tablas». (3) Cerró un hallazgo (H2) con una frase («queda cerrado») que su propia regla de `ok` contradice: falta
  releer el arreglo como el alumno perezoso. (4) G10 declara 9 papeles por caso y deja 6 y 8 sin decirlo. (5) Sin terminal no
  debió dar ✔ a cifras: la lista de salida debió marcarlas «pendiente».
- **`disenador-de-aprendizaje`.** (1) Los textos de revelación se escriben por «hizo/no hizo» sin cruzar con tipo y opción:
  hace falta una **tabla de ramas** (ficha × tipo × opción) antes de escribirlas. (2) Citó cifras de otra tabla (T1.6). (3)
  Marcó un tope de 25 palabras y no lo contó. (4) Definió clasificaciones (`descubrió solo`, `acierto sin evidencia`) que no
  existen para un caso sin papel clave (el 7).
- **Los dos.** Entregaron sin terminal y con ✔; un ✔ sin la prueba al lado es lo que la regla ya prohíbe. Recomendado: que la
  lista de salida tenga una columna «contado con script / a mano / pendiente» y que lo «pendiente» cuente como ✘.

### Lista de salida del crítico

- ✔ Conteos recontados con script (`scratch/contar_t1.py`, 50 comprobaciones, 0 fallan, 4 hallazgos extra); mencionados arriba.
- ✔ Estrategias E-S1 a E-S10 corridas con las tablas nuevas (`scratch/simular_t1.py`, salida en `scratch/salida_simular.txt`),
  más la búsqueda de la mejor política sin papeles (27 000) y 8 variantes probadas.
- ✔ Los 9 ajustes de la secc. 14 revisados uno por uno (tabla): ninguno rompe lo elegido por Ronald; dos lo debilitan.
- ✔ Los 8 casos jugados como el que sabe, el que no sabe, el apurado y Ronald.
- ✔ Punto 11 (¿se puede copiar?): revisado; las respuestas del caso 2, 5 y del 8 «esperar» no cambian de alumno a alumno
  (hallazgo 1); el resto cambia de tipo, papel clave y cifras (confirmado con G7 y el generador).
- ✔ Punto 10 (lo prometido contra lo que existe): las piezas de motor citadas existen en `src/` con esos nombres; lo que falta
  se nombra como trabajo en el bucle (secc. 13).
- ✔ Estimaciones marcadas: el acierto de quien entiende (p) es una estimación y no un dato; los supuestos del simulador están
  listados arriba.
- ✔ No se corrigió ningún documento de otro agente ni `05-mundo-y-narrativa.md`; solo se editó `06-revisiones.md` y se
  agregó código de prueba en `scratch/`.
- ✔ Sin preguntas nuevas a Ronald; nada se presentó como decidido sin estar en sus decisiones.
- ✔ Tuteo y sin guiones largos en lo que lee el alumno: no aplica (esta entrega es solo para el equipo).
- ✔ Legibilidad: no aplica (papel). Se avisó que `medir_legibilidad.py` debe recorrer las 8 fichas y la hoja de 60 filas.

## 08-10-2026 · Psicoestadística Descriptiva (Psicología), Tema 1: las tres formas de juego de descubrimiento (papel, v12)

**Qué se revisó.** `00-tema1-formas-de-juego.md` («La mesa de verificación», «Tu número», «Un año en el colegio»)
contra las 8 ideas APROBADAS (no reabiertas) y contra lo decidido por Ronald: introducción de descubrimiento, revelación
al final que dice «apenas empieza», probablemente sin nota, sin software, sin «según el dossier», sin referencias ni arte.
Jugadas con los tres alumnos (el que sabe, el que no sabe, el apurado). Conteos con
`scratchpad/critico_tema1.py` (corrido con `python -I`; se cita su salida abajo).

**Salida del script:**
```
Forma 1: pasos 8, ideas [1..8], pasos con verbo de ver/mirar 3 -> [3, 7, 8]
Forma 2: pasos 8, ideas [1..8], pasos con verbo de ver/mirar 7 -> [1, 2, 3, 4, 5, 7, 8]
Forma 3: pasos 8, ideas [1..8], pasos con verbo de ver/mirar 2 -> [3, 7]
Forma 1: menu de 5 preguntas; 6 casos con fallo (ideas 2 a 7)
  presupuesto 1: politica fija atrapa 2 de 6 | quien lee la afirmacion y pide 1 atrapa 6
  presupuesto 2: 3 de 6 | presupuesto 3: 4 de 6 | presupuesto 4: 5 de 6 | presupuesto 5: 6 de 6
Forma 2: tu bienestar 0 -> media del curso 61,46 (-1,02) | 50 -> 62,28 (-0,20) | 100 -> 63,10 (+0,62)
Referencia: la regresion a la media del dossier mueve 4,47 y -2,02
```
Cobertura: las tres cubren las 8 ideas en su tabla (8 de 8 cada una). Que una idea tenga fila no prueba que se **viva**;
eso se juzga abajo.

### Veredicto corto

| Forma | ¿Juego o cuestionario bonito? | Bloqueos | Ideas que se viven de verdad |
|---|---|---|---|
| 1 Mesa de verificación | Juego de investigación, con riesgo de cuestionario | 0 (3 importantes) | 2, 3, 4, 6, 7 bien; 5 a medias; 1 y 8 dependen de escribir bien |
| 2 Tu número | Mitad demostración: 7 de 8 pasos son «ver» | **1** | 1 y 2 bien; 3 bien; 4, 5, 7 se miran, no se viven |
| 3 Un año en el colegio | El más juego, con la trampa «al que gana lo aplauden» | 0 (costo y sub-simulación) | 2, 4, 5 muy bien si la simulación es real; 6 a 8 se vuelven escena |

### Hallazgos de la Forma 1 · La mesa de verificación

**1.1 IMPORTANTE. El menú de preguntas ES la lección.** Las 5 preguntas fijas («¿cómo se contó?», «¿a quién se preguntó?»,
«¿contra quién se comparó?», «¿cuántos eran?», «¿dónde empieza el eje?») son casi las cuatro ideas 2, 4, 5, 7 en forma de
lista. El alumno que no sabe no descubre qué preguntar: le dan el temario y elige. Y el que sabe, sin presupuesto estrecho,
las pide todas. *Prueba (script):* con una política fija aprendida en la primera partida (pedir siempre las mismas
preguntas), el presupuesto 1 atrapa 2 de 6 casos, el 2 atrapa 3, el 4 atrapa 5 y el 5 atrapa 6 de 6; quien lee la
afirmación y pide una sola atrapa los 6. La estrategia no es «pedirlo todo» (el presupuesto la frena), es **memorizar la
correspondencia afirmación→pregunta**, y las afirmaciones la delatan solas («bajaron las denuncias a cero», «una encuesta
de miles»). **Propuesta:** que lo que se pide no sea una pregunta de menú sino **un documento de la carpeta para abrir**
(el formulario, la lista de quienes respondieron, la hoja del grupo sin taller, los números de cada mes). El alumno ve
rótulos de cosas del mundo, no conceptos; el hallazgo está dentro del documento y hay señuelos que no destapan nada. El
presupuesto debe fijarse por debajo del número de documentos útiles, y el doc de diseño **no dice cuál es hoy** (falta).

**1.2 IMPORTANTE. Sin apuesta acumulada, el apurado hace clic y ya.** «Publicar o retener» tiene consecuencias por caso
(llamada de una madre, competencia) pero no hay un marcador que se arrastre (credibilidad de la redacción frente a lectores
frente a la competencia). Alumno apurado: publica siempre, lee ocho consecuencias suaves, llega a la revelación. Es
justamente el «sin pensar» que ya vimos en AIEF. **Propuesta:** dos medidores visibles que se empujan en sentidos
contrarios (credibilidad y lectores), de modo que retener siempre y publicar siempre pierdan, y que en el caso «bien» y en
el de «aún no se sabe» la mejor jugada sea publicar con un matiz.

**1.3 IMPORTANTE. Ritmo repetido.** Siete veces: lees afirmación, pides evidencia, publicas. Las piezas distintas (paso 1
buscar cifra, paso 3 repetir tandas, paso 6 armar titular, paso 7 ser primero el lector, paso 8 decisión de dirección) lo
rescatan, pero los pasos 2, 4 y 5 son el mismo molde. Hay que forzar variedad en lo que se hace (en el 4 pedir la lista de
respondientes y poder elegir entre dos encuestas ya hechas; en el 5, ver la tabla antes y después), no sólo en el contenido.

**1.4 menor. Las ideas 1 y 8 viven según cómo se escriban.** El paso 1 es bueno (hallar la cifra ya escrita). El paso 8
depende de que «aún no se sabe» sea una salida real y no la respuesta del último caso de siempre; si el último caso de
cada versión es el de «no alcanza», se aprende como patrón. Alternar por versión.

**1.5 menor. Copiable.** Sin nota no importa (decidido). Aun así, la pregunta clave por caso debe cambiar **entre versiones
para el mismo paso**, no sólo entre casos de una versión: el texto lo deja ambiguo.

**Estrategia dominante F1:** no hay una «simple» si se hacen 1.1 y 1.2; hoy existe la de memorizar afirmación→pregunta.
**¿Puede creer que ya sabe?** Sí, el que acierta siempre queda halagado; lo frena que ve los nombres en la revelación y
el caso «bien», pero conviene que el primer caso lo pille desprevenido (ver abajo).
**Metáfora para psicología:** la redacción es ajena a la carrera. Se sostiene porque los casos son de colegio y bienestar;
conviene que la afirmación venga del mundo de psicólogos (un taller de bienestar del colegio, una encuesta de estrés) y
la redacción sea sólo el lugar donde llega.
**Costo declarado:** medio-bajo es realista para la estructura; el trabajo real son 8 casos con una carpeta de documentos
cada uno, cada documento con su cifra y cada rama de decisión con su consecuencia. Dígase eso.

### Hallazgos de la Forma 2 · Tu número

**2.1 BLOQUEO. El número del alumno no cambia nada de lo importante, y la propuesta dice que sí.** «Escribir cualquier
número hace que el curso salga sin gracia» y «la respuesta correcta es distinta para cada uno» son falsos tal como están.
*Prueba (script):* un bienestar de 0 mueve la media del curso de 60 de 62,48 a 61,46 (−1,02 de 100), uno de 100 a 63,10
(+0,62) y uno de 50 a 62,28; la regresión a la media del dossier mueve 4,47 y −2,02. Los fenómenos (regresión, sesgo,
indicador movido) los fija el generador, no el 61.º dato. Un alumno que escribe «50» (o broma, o 0) vive exactamente lo
mismo. Resultado: el mérito de la forma («esto me pasó a mí») sólo existe en la apertura y la revelación; los pasos 3 a 8
son un curso de 60 ajeno en el que mirar. **Propuesta:** o su número decide algo real (¿está entre los 13 peores?, ¿se
queda o se va a casa antes de la encuesta? Eso exige que el generador lo incluya por regla, no por suerte), o la forma se
reduce a lo que sí hace: una apertura de dos o tres preguntas (que es la pieza que la mezcla ya toma).

**2.2 IMPORTANTE. Siete de ocho pasos son «ver».** El script cuenta 7 pasos con «ve que / ve cómo / los mira /
reaccionan». Eso es una demostración animada, un libro hecho juego: el alumno no decide casi nada que cambie algo. Sólo el
paso 3 (mirar diez al azar una y otra vez) es un juguete real. **Propuesta:** si se conserva algo de la 2, que sea ese
juguete y la apertura.

**2.3 IMPORTANTE. Supuestos sobre la conducta del jugador.** «Él es de los que se van» (paso 4) y «los 13 peores» (paso 5)
presuponen su número y su decisión; si escribió 90, no está entre los 13; si decide quedarse en el pasillo, no se va. Se
resuelve fijando el rol (eres un 61.º entre dos) sin hacer depender el fenómeno de él.

**2.4 IMPORTANTE. Privacidad y tono.** Datos propios de sueño, celular y ánimo en un curso de psicología son delicados
(y pueden ser bromas o verdad incómoda) y la revelación dice «tu número estaba en el registro y en el titular»: en una app
conectada a la nube el alumno puede leerlo como que sí viajó. Con personaje de reserva por defecto se salva, pero entonces
se pierde la ventaja que justificaba la forma.

**2.5 menor. Costo.** «Medio» está subdeclarado: un generador cuyos fenómenos siempre aparezcan para cualquier entrada
es, de hecho, la simulación de la Forma 3 más una pantalla de captura.

**Metáfora para psicología:** la más cercana a la carrera (autoinforme, escalas de bienestar). Lo mejor de la forma.
**Estrategia dominante F2:** «50 siempre» no se castiga (ver 2.1). **¿Cree que ya sabe?** Sí: «ya soy un dato».
**Dónde se pierde:** del paso 4 al 7, sin nada que hacer.

### Hallazgos de la Forma 3 · Un año en el colegio

**3.1 IMPORTANTE. La trampa premia al engañado.** «Dar a los peores, celebrar, el director aplaude»: si el marcador del
año sube con la mejora aparente, el apurado gana el año **haciendo el error exacto que se quiere mostrar**, y la
enseñanza queda toda en la revelación (un libro). Está bien que el engaño sea natural; no está bien que el mundo lo
premie sin que algo ya empiece a oler mal antes del último turno (la enfermería, el colegio vecino, un mes después). Con
cuatro turnos el rastro llega tarde. **Propuesta:** que el regreso al valor previo aparezca en el turno siguiente, antes
de que el director repita la frase en la asamblea.

**3.2 IMPORTANTE. «Sorteo» domina.** En el paso 4 (elegir formulario/enlace/sorteo), si el sorteo no cuesta de verdad o
nunca falla, «siempre sorteo» gana sin vivir el sesgo; y quien sabe nunca lo experimenta. Lo mismo con «dejar un grupo
sin taller» en el paso 5. Es el patrón «el que sabe se salta la lección»: aceptable si hay costo (tiempo, dinero, el
director que protesta) y se declara.

**3.3 IMPORTANTE. Costo subdeclarado y versión mínima débil.** Se dice «alto» (cierto), pero la versión mínima (4 turnos, 3
ideas simuladas, el resto «escenas») deja cinco de las ocho ideas contadas, y entonces la forma pierde lo que la
justificaba. Además el contrafactual (el colegio vecino) es un segundo colegio simulado. Para una persona, esta forma es la
más peligrosa de terminar, y la que más se parece a un juego de gestión que hay que equilibrar.

**3.4 menor. Variar de colegio entre alumnos** es lo mejor de la forma para el copiado; pero sin nota no se necesita.
**3.5 menor. El turno se puede hacer largo** y el apurado se aburre en pasos con muchos archivos. Las tres piezas (ideas 1,
5, 6) con bastante lectura.

**Metáfora para psicología:** muy buena: es el trabajo del psicólogo escolar. Más cercana a la carrera que la redacción.
**Estrategia dominante F3:** ninguna simple, salvo 3.1 y 3.2. **¿Cree que ya sabe?** El que «gana el año» sí.

### ¿Se sostiene la mezcla propuesta (la 1 con piezas de la 3 y de la 2)?

**Sí, con dos recortes; si no, es demasiado.**
- **Pieza de la 3 (aplicar uno mismo el taller):** es lo que más vale, y se hace barato: dos turnos y un solo caso. Pero
  rompe el marco: un verificador de datos no aplica talleres. **Propuesta:** hacerlo desde la redacción, en la propia
  estructura del caso: el alumno aconseja a quién llamar al taller (las y los del peor puntaje, que él elige) y luego
  verifica el resultado que él mismo propuso. Mantiene la vergüenza y no abre otro juego.
- **Pieza de la 2 (apertura con tu número):** es solo apertura y revelación, sin consecuencias en el medio (2.1). Está
  bien si se la trata como un gesto, no como mecánica. No hay que dejar que su número altere nada de los casos. Con
  personaje de reserva por defecto y opción de poner el suyo.
- **Demasiado** sería: apertura personal + casos de redacción + simulación de dos turnos + repaso con nombres. Cuatro
  texturas en un tema sin nota. La mezcla se sostiene si **todo ocurre dentro de la carpeta y la redacción**: la apertura
  se cuenta como la primera pregunta del primer encargo («¿cuántas horas duermes?»), el taller es uno de los casos y la
  revelación es el repaso.

### La revelación (las tres)

**R1 IMPORTANTE (común).** Pasar «rápido» el día con ocho nombres técnicos nuevos de golpe es el momento en que se vuelve
libro. **Propuesta:** que sea tocar el hilo: cada caso es una ficha que el alumno puede dar vuelta, y el nombre aparece al
dársela; el cierre («apenas empieza») muestra el camino de temas. No debe mencionar nada que el alumno no haya visto en
su partida: si publicó mal se lo dice, si pidió bien se lo dice, no se regala antes de jugar.
**R2 menor (por forma).** F1 y F3 tienen revelación creíble porque se apoya en lo que el alumno hizo. F2 dice «tu número
viajó», que el alumno sabe ficción.

### Recomendación a Ronald (en términos de la experiencia del jugador)

**La 1, «La mesa de verificación», como columna, con tres arreglos.** Es la que da más probabilidad de que el alumno diga
«esto se estudia» sin sentir clase: investigar, equivocarse un par de veces, ver la consecuencia, descubrir qué habría
destapado el problema. Con los arreglos de abajo es la más barata de construir bien.
1. Cambiar el menú de preguntas por **documentos para abrir** (1.1) y dos medidores que se empujan (1.2).
2. El caso del taller con el alumno **aconsejando** y luego verificando lo suyo (la vergüenza de la 3, dentro del marco).
3. Apertura de dos o tres preguntas propias (de la 2) como primer encargo, sin que su número cambie nada, con personaje de
   reserva por defecto.
La 3 completa sería la experiencia más rica pero es la que no terminará una sola persona; la 2 completa deja al alumno
mirando. **La mezcla sin esos recortes es demasiado.**

### Lo que está bien y conviene no tocar

- Que cada forma pida algo distinto al jugador (investigar, ser el dato, administrar). La 1 y la 3 son juegos genuinamente
  distintos, no el mismo con otra piel.
- El caso «la afirmación está bien y publicar es correcto» y la salida «aún no se sabe»: dan la honestidad de la idea 8 y
  evitan «desconfía de todo».
- Que ningún caso diga «esto es un sesgo» hasta la revelación.
- El paso 3 de la forma 2 (diez al azar, otra vez) como juguete, y el paso 2 de la 3 (el indicador que se mueve por otra
  razón).
- Las dos preguntas de gusto de Ronald son de gusto de verdad; la segunda (a veces «aún no se sabe») conviene responderla
  que sí.

### Lista de salida del crítico

- ✔ Tres alumnos jugados en cada forma; cobertura de las 8 ideas contada por script (8 de 8 por forma).
- ✔ Estrategia dominante buscada con prueba: 1.1 (script, política fija), 2.1 (script, media), 3.1 y 3.2 por análisis.
- ✔ Hallazgos ordenados por gravedad; copiabilidad vista (sin nota: menor).
- ✔ Sin reabrir ideas ni decisiones de Ronald; sin referencias de juegos, arte ni sonido.
- ✔ Tuteo, sin guiones largos. Ningún otro archivo editado.

---

## 08-10-2026 · Psicoestadística Descriptiva (Psicología), maqueta v3.5: lo corregido, jugado otra vez (papel, v11)

**Qué se revisó.** La versión 3.5 de `00-adaptacion-psicoestadistica-descriptiva-psicologia.md`: §R3.0-sexies y todo lo
marcado «3.5» (Tema 6 casos 2, 3 y 4, 4A caso 3, Tema 5 caso 3, filas 20, 56 a 58, 68, 76, 78, §R3.6 con sus dos tablas, §R3.8 y la «Lista de salida · versión 3.5»), contra mi v10. No reabro nada de Ronald. Nada está construido
(motor nuevo = trabajo). No usé la copia en conflicto de Synology. **Sin terminal en esta sesión**: recontado a mano,
fila por fila, no con script.

**Veredicto.** **Sin bloqueos.** La 3.5 resuelve de verdad el bloqueo de la v10 y los demás hallazgos: lo comprobé en el
cuerpo, no en la tabla (abajo). «A baja B» ya no se sostiene en ninguna versión y la consecuencia ya no dice «lo movía X».
Lo que queda son **cinco importantes**, todos de especificación (porcentajes, márgenes, qué se turna), nada de diseño
nuevo; salen con una pasada corta del adaptador. **Puede ir a Ronald después de esa pasada, sin otra ronda de crítico**
(los ajustes los revisa el propio adaptador contra esta lista). Los conteos son verdad (recuento abajo), con una
excepción: las «9 respuestas fijas» no son las que hay (importante 3).

### Verificación de la v10, hallazgo por hallazgo, en el cuerpo

| v10 | ¿Resuelto en el cuerpo? | Dónde y cómo |
|---|---|---|
| 1 (bloqueo) | **Sí** | Tema 6 caso 3: «A baja B nunca se sostiene», y las 6 consecuencias dependen de lo firmado y de la evidencia; «se mantiene» ya no premia la causa. Quedan afinar los márgenes (importante 4) |
| 2 | **Sí, con un margen sin número** | La frase «la mitad central… [RIC] puntos» existe y usa el número; «el promedio representa al grupo» se juzga con «buena parte de la escala», sin porcentaje (importante 4) |
| 3 | **Sí** | Hueco obligatorio con tres opciones siempre en pantalla; el balance de las tres formas queda sin fijar (importante 1) |
| 4 | **Sí, con un caso roto** | Predicción por N horas en redes, b y a de la herramienta; falla en las versiones de nube curva (importante 2) |
| 5 | **Sí en el caso 2, trasladado** | Una sola frase fija en la mesa del caso 2; las otras pasaron al caso 4 sin turno (importante 3) |
| 6 | **Sí** | Grep propio: «I14» sólo en notas SUPERADO o en el relato de lo corregido; las páginas viejas sólo en notas que dicen que ya no existen. Resta una línea viva (menor 8) |
| 7 | **Sí** | Aplicada; ver menor 6 |
| 8 | **Sí** | Fila 58 en 1 (línea 982 de la tabla) |
| 9 | **Sí** | Rótulo del Tema 5 con la fila 73 (línea 747); forma (c) definida (línea 1118) |
| 10 | **Sí** | 4A caso 3 con «hasta 3» y «al menos 12» (línea 669) |
| 11 | **En parte** | El tope conjunto está (§R3.8), pero la lista de fijas está mal contada (importante 3) |
| 12 | **Sí** | «La ficha del archivo dice el tipo» |

### Hallazgos, de más grave a menos grave

**Importantes:**

1. **La forma (c) vuelve a la hora de «no se puede decir con una recta» la respuesta que más gana.** **Qué pasa:**
   (c) dice que si 4B caso 4 trae r alto, el Tema 6 caso 3 es curva con r bajo. Entonces todo alumno con r alto en 4B
   recibe la curva en el Tema 6 (con el 50 % de la clase en r alto, ya es la mitad), y a eso se suman las versiones de
   r bajo que también sorteen curva. «Siempre no se puede decir con una recta» gana al menos la mitad de las veces: es
   una estrategia dominante barata, y es un dato que se corre de boca en boca («si tu 4B fue r alto, en el 6 es
   curva»). **Por qué importa:** la regla 6 de mi encargo; la 3.5 dice que cada opción fija gana una de tres formas,
   y eso sólo es verdad si las tres son tercios. **Propuesta (decisión (b): la confirmo con esta condición):**
   `versionValida` fija que la curva sea un tercio de las versiones del Tema 6 caso 3, no más. Para eso, 4B caso 4
   trae r alto en un tercio de las versiones y r bajo en dos tercios; el tercio de r alto es el que fuerza la curva
   en el 6, y en las de r bajo el Tema 6 reparte a mitades «se debilita» y «se mantiene», sin curva. Así cada forma
   cae en un tercio y la garantía de r bajo con curva sigue. Si se prefiere, se vuelve a (a) dentro de 4B caso 4 y se
   quita (c), a costa de duplicar la loma.

2. **Tema 6 caso 4: la repregunta de predicción se contradice con la nube curva.** **Qué pasa:** los casos 3 y 4 usan
   el mismo archivo (A redes, B bienestar). En las versiones de nube curva (r global como 0,09), la herramienta da b y
   a de una recta que no describe esa nube, y la respuesta correcta a «¿qué bienestar prevé para N horas?» es
   ambigua: «no se predice» porque N está fuera del rango, o porque no hay recta. Un alumno que contestó «no se puede
   decir con una recta» en el caso 3 y calcula un ŷ en el 4 se contradice, y el juego tendría que castigar una
   respuesta o la otra. **Por qué importa:** la pregunta tiene dos respuestas correctas posibles, que es lo que
   la v10 buscaba quitar. **Propuesta:** en las versiones de nube curva la familia de predicción es la que se omite
   (cuatro de cinco: la quinta, justamente esa), y `versionValida` exige en las demás que N quede a un margen claro
   dentro o fuera del rango (por ejemplo, al menos 15 % del largo del rango más allá de cada extremo, o claramente
   interior), para que nadie discuta un N en el borde. Con eso la repregunta es jugable en todas sus versiones:
   dentro, escribes el ŷ; fuera, «no se predice»; y «siempre predigo» o «nunca predigo» pierden la mitad.

3. **La decisión (a) cumple la regla 5 en el caso 2 pero no en el 4, y las «9 respuestas fijas» están mal contadas.**
   **Qué pasa:** «la distribución es normal» y los cuatro decimales se mudaron al caso 4. Allí ya había la pieza
   «lo sacamos y no lo dijimos» (por turno), «¿entonces el grupo tiene burnout?» (repregunta, nunca se sostiene) y la
   frase de causa. Sumadas, el caso 4 tiene hasta cuatro cosas que nunca se sostienen y sólo una declara turno. La
   lista de salida dice «ninguna mesa tiene más de una» y cuenta 9 fijas, pero esas dos mudadas, y el burnout si sale
   en toda versión, no están en la cuenta de 9: la cuenta bajó porque las piezas cambiaron de lugar, no porque
   desaparecieran. El tope conjunto de la menor 11 de la v10 depende de que la lista sea la verdadera.
   **Por qué importa:** es el mismo defecto que la v10 encontró, trasladado, y el tope se aplicaría a una lista
   incompleta. **Propuesta, y respuesta a la decisión (a): la confirmo, con condiciones.** Mi alternativa (un toque
   único «cifras que no van al informe» en el caso 2) la retiro: junta las dos pero deja la mesa del caso 2 con dos
   cosas que nunca se sostienen (ese toque y «varía más que»), así que el adaptador resuelve mejor. Condiciones:
   (i) «es normal» queda como repregunta de la familia «medida» y esa familia nunca se omite de las cuatro (así su
   trampa llega a toda versión; la que se omite rota entre datos, causa y alcance); (ii) los cuatro decimales y
   «lo sacamos y no lo dijimos» se turnan, uno por versión como mucho en el informe; (iii) el burnout y la causa
   cuentan como repregunta, no como pieza del informe, y se dice cuántas de las cuatro familias llevan una que nunca
   se sostiene por versión (a lo más dos). Con eso la lista cuenta honestamente **9 fijas más los decimales si son
   fijos, o 9 si se turnan**; que diga cuál es.

4. **Márgenes de `versionValida` sin número, justo donde la v10 pidió números.** **Qué pasa:** tres lugares quedan en
   lenguaje corriente:
   - **Caso 2:** «el promedio representa al grupo» se juzga con «si el tramo cubre buena parte de la escala». «Buena
     parte» es lo que la v10 tuvo que cerrar en 4A y en el CV, y vuelve a abrir la discusión de un 8.
   - **Caso 3:** «se debilita» (los dos R² de grupo bajo la mitad del global) y «se mantiene» (al menos el 80 %) dejan
     una **zona intermedia** (entre 50 y 80 %) y la curva (r bajo) puede cumplir «bajo la mitad» por azar. No dice qué
     gana si una versión cae en la zona o en dos casos a la vez.
   - **Caso 3, los R² de grupo:** se dice «con tus R²» y a la vez que cada R² es un cuadrado de su r. Si el hueco se
     juzga con tus R² sin validarlos aparte, escribir un R² inventado y coherente con el hueco elegido sería una
     salida (o, si el hueco se juzga con los datos verdaderos, esos dos campos serían peaje).
   **Por qué importa:** son las reglas que impiden la discusión y los peajes; sin número, se arreglan "a ojo" al
   construir. **Propuesta:** (i) «el promedio representa al grupo» no se sostiene si el RIC es de al menos la mitad del
   largo de la escala y sí si es de menos de un quinto; `versionValida` descarta lo que cae entre medio. (ii) Zona
   intermedia: `versionValida` la excluye (ninguna versión cae entre 50 y 80 %), y la curva se define por la nube y
   gana siempre (r global menor que 0,2 con forma curva), con las versiones de «se debilita» o «se mantiene»
   exigiendo r global moderado (por ejemplo, al menos 0,25). (iii) Los R² de grupo se validan contra los datos
   (cada campo tiene su respuesta única), y el hueco se juzga contra los datos, no contra lo escrito; cada R²
   decide además qué consecuencia aparece (por ejemplo, un R² mal escrito que cruza el margen avisa en la audiencia
   «sus dos grupos mostraban otra cosa»). Así los dos campos pesan sin ser peaje ni prestarse a ajustar.

5. **El Tema 6 casos 2 y 4 comparten tres piezas por turno sin que el turno esté definido.** **Qué pasa:** la 3.5
   pone por turno «lo sacamos…» y la familia que se omite, pero no dice a qué tabla se atan: si dos alumnos de
   versión parecida pueden tener la misma combinación, el reparto no cambia con el alumno. **Por qué importa:**
   regla 11 (que dos compañeros no puedan dictarse). **Propuesta:** la combinación de familias omitidas, de
   decimales o «lo sacamos», y de N dentro o fuera, es un dato más de la versión y se barre con el resto en la
   prueba de que dos versiones no comparten respuesta correcta (que ya existe en la 3.4 para otros casos).

**Menores:**

6. **La pantalla partida del caso 3: sí funciona, con tres cuidados.** *Primero se ve, después se calcula* se cumple
   mejor que en cualquier otro punto del Tema 6, y se dibuja con la nube y las rectas que 4B ya va a tener. Cuidados:
   (i) «tocar la línea de X» en un celular es un blanco finísimo: que sea un botón o un asa grande («Partir por horas
   de sueño»); (ii) dos colores no bastan para un daltónico: que además cambien la forma del punto (círculo y
   cuadrado); (iii) el corte es automático (la mediana de X), así que el toque no es una decisión sino una revelación:
   está bien, pero no cuenta como número ni como decisión en ninguna tabla. Una variante opcional, con costo: dejar
   elegir entre dos variables para partir (una que debilita y otra que no) vuelve el toque una decisión, pero agrega
   una segunda tercera variable al dossier; yo no la haría.

7. **La fila 76 cuenta 2 usos por elevar dos r al cuadrado.** Lo que se practica es una situación (la tercera
   variable) con un hueco y tres productos; los dos «usos» son el mismo cálculo dos veces. La convención de §R3.5
   lo permite y el adaptador la anotó, pero entonces las filas de una sola vez serían 12 y las de dos o más 56. No
   cambia nada del juego; decirlo en el conteo.

8. **Una línea viva con el criterio viejo.** En §R3.8, «Reglas del juego, marcadas así en el manual», la última
   frase dice que «muy heterogéneo» se juzga comparando dos CV; en la 3.5 esa frase ya no existe (es «las horas
   varían más…»). Cambiarla por la comparativa o marcarla SUPERADO.

9. **Los dos R² de grupo de la tabla «Cada número decide» (fila 57)** dicen «3 campos» pero cuentan los 3 como uno
   solo; al corregir el importante 4 (iii), separar en dos filas los R² de grupo para que la cuenta de "números que
   deciden" cuadre con lo que de verdad decide cada uno.

### Las jugadas, caso por caso

- **Caso 2 (el centro vacío).** *El que sabe:* elige RIC para la escala, CV para las horas, escribe el tramo, y ve
  que «el promedio representa al grupo» depende de su número; frena «la cohesión varía más que las horas»; juzga
  «las horas varían más que los kilómetros» con su CV contra el dado. *El que no sabe:* la escalera lo lleva al RIC
  por el tipo de la ficha, y el tramo escrito con la desviación o el rango lo castiga en la frase del tramo. *El
  perezoso:* «siempre CV» o «siempre RIC» pierde en una variable; «frena lo que suene grande» ya no rinde, porque
  hay una sola frase fija y las demás se deciden con números. Queda bien. Sólo falta el número de «buena parte».
- **Caso 3 (la tercera variable).** *El que sabe:* parte la nube, lee, escribe tres R², elige el hueco que sus
  datos dicen y no firma «A baja B». *El que no sabe:* ve la nube en dos colores y puede acertar el hueco a ojo; está
  bien (primero se ve), pero por eso los dos R² de grupo tienen que decidir algo propio (importante 4). *El perezoso:*
  «siempre se debilita» o «siempre se mantiene» gana un tercio; «siempre curva» ganaría la mitad o más con (c) tal
  como está (importante 1); dejar el hueco vacío no se puede; «A baja B» pierde en las tres formas, siempre.
  **«A baja B» nunca se sostiene: confirmado.** Se enseña una vez y se aprende («no la firmes»), pero pesa poco y está
  dicho como fija. **El hueco de tres opciones, ganado sin pensar:** no, salvo por (c).
- **Caso 4 (la audiencia).** *El que sabe:* dentro del rango calcula el ŷ; fuera, «no se predice»; frena «es normal»
  con la forma y los decimales con la falsa precisión. *El que no sabe:* la escalera lo lleva a D4 4.6. *El perezoso:*
  «siempre predigo» y «nunca predigo» pierden la mitad; en las versiones curva la pregunta no se puede responder
  limpia (importante 2). Con N dentro o fuera **la repregunta es jugable**, con los dos arreglos de arriba.

### Las tres decisiones del adaptador

- **(a) «es normal» y los cuatro decimales al caso 4:** **confirmada con condiciones** (importante 3). Retiro mi
  alternativa del toque único: deja dos cosas fijas en la mesa del caso 2.
- **(b) la forma (c) «garantizado entre dos temas»:** **confirmada con la condición del importante 1** (tercios). Sin
  ella, la curva favorece a una estrategia fija.
- **(c) tope conjunto de peso para 9 respuestas fijas:** **confirmado como idea**, **rechazada la cuenta de 9** hasta
  que se resuelva el importante 3. El tope es una regla de progresión, no un reparto, y no reabre lo de Ronald.

### Recuento a mano (sin terminal: no pude correr `contar.py`)

| Conteo de la lista de salida 3.5 | Mi recuento | ¿Coincide? |
|---|---|---|
| §R3.5: 78 filas, del 1 al 78 | 78, sin huecos ni repetidas | ✔ |
| Por lugar: T1 6 · 2A 9 · 2B 7 · 3A 8 · 3B 7 · 4A 3 · 4B 7 · T5 10 · T6 11 · ya jugada 1 · dossier 8 · ninguno 1 | Idéntico (suma 78) | ✔ |
| 68 con juego | 78 menos 8 dossier, 1 ninguno y 1 ya jugada = 68 | ✔ |
| 57 en dos o más y 11 en una | Las de una: 3, 24, 39, 50, 58, 59, 66, 70, 71, 77, 78 = 11; 68 menos 11 = 57 | ✔ |
| Trampas 44 | 44 filas (de la 1122 a la 1165) | ✔ |
| 23 «siempre», 12 (a), 13 (b), 1 (c) | 23, 12, 13 y 1; sólo siempre 18, sólo (a) 11, sólo (b) 9 | ✔ |
| Alumno perezoso 57 | 57 filas (1055 a 1111) | ✔ |
| Peajes 0 en 58 números | 58 filas; por juego 3 · 7 · 7 · 6 · 8 · 5 · 9 · 8 · 5; sin peaje declarado | ✔ en el conteo, con reserva en las filas 56 y 57 (importante 4) |
| 9 respuestas fijas | La lista de 9 es la escrita, pero no incluye los decimales ni el burnout del caso 4 | ✘ (importante 3) |

### Lista de salida del crítico (v11)

| Regla | ✔/✘ | Dónde se ve |
|---|---|---|
| 1. Tres alumnos | ✔ | «Las jugadas, caso por caso» |
| 2. ¿Divertido? ¿monótono? | ✔ | Menor 6: la pantalla partida da forma propia al caso 3; los casos 2 y 4 siguen siendo números y frases |
| 3. Contra la visión y los pedidos de Ronald | ✔ | La partición es primero se ve; nada reabierto |
| 4. Contra el aprendizaje | ✔ | Importantes 1, 2 y 4 |
| 5. Contra la realidad (celular, conexión, una persona) | ✔ | Menor 6 (blanco táctil, daltonismo); el caso 3 queda en 3 campos y 1 botón |
| 6. Estrategia dominante, patrón, peaje, frase obvia | ✔ | Importantes 1, 3 y 4; los arreglos propuestos no llevan una mecánica de otro tema |
| 7. Orden real de dictado | ✔ | Predicción con b y a de D4, tramo del RIC de D3, antes del 6 |
| 8. Coherencia con el dossier | ✔ | Páginas ya vigentes; menor 8 |
| 9. Tanteo | ✔ | Importante 2: «no se predice» es un botón al lado de un número; con N lejos del borde no se puede tantear |
| 10. Lo prometido contra lo que existe | ✔ | Motor, nubes partidas y `versionValida` nuevos son trabajo, no hecho |
| 11. ¿Se puede copiar? | ✔ | Importante 5; lo demás varía |
| 12. Revisar lo jugable | No aplica | Nada construido |
| 13. ¿Otro juego? ¿Reutilizado bien? | ✔ | Nada de otro juego en lo marcado 3.5 |
| Ronald decide; lo aprobado no se reabre | ✔ | Ninguna decisión nueva |
| Lee antes de proponer | ✔ | «Qué se revisó» |
| El juego no es una lección | ✔ | Las consecuencias son audiencias y programas, no textos |
| Individual, sobre 100, sin reparto | ✔ | El tope conjunto no es un reparto |
| Por temas, sin tiempo; estructura escalable | ✔ | Sin plazos; 0 casos nuevos |
| Lista de salida con prueba contada | ✔ | Recuento propio a mano, línea por línea; coincide salvo las fijas |
| Tuteo, sin guiones largos | ✔ | Esta entrada no usa el guion largo |

**No tocar:** la forma «A baja B nunca se sostiene» y las 6 consecuencias del caso 3; el hueco de tres opciones siempre
en pantalla; la frase del tramo del RIC; la comparativa de CV con «hasta 3» y «al menos 12»; la predicción por N horas
en redes con b y a de la herramienta; el tope conjunto como idea; los conteos de §R3.5 y §R3.6.

---

## 08-10-2026 · Psicoestadística Descriptiva (Psicología), maqueta v3.4: lo nuevo, jugado (papel, v10)

**Qué se revisó.** La versión 3.4 de `00-adaptacion-psicoestadistica-descriptiva-psicologia.md`: §R3.0-quinquies
y todo lo marcado «3.4» en §R3.3 (3B casos 2 a 4, 4A caso 3, 4B caso 4, Tema 5 casos 1 a 3, Tema 6 casos 2 a 4),
§R3.5, §R3.6 (las dos tablas) y la «Lista de salida · versión 3.4», contra `04-aprendizaje.md` (V3.1 a V3.5 y M1 a
M10) y mi v9. No reabro lo que decidió Ronald. Nada de esta isla está construido, así que no hay código que
comprobar; el motor nuevo sigue siendo trabajo (§R3.7). No usé la copia en conflicto de Synology.

**Veredicto.** Los conteos de la lista de salida son verdad. Recontados a mano, tabla por tabla, porque en esta
sesión no tenía terminal para correr un script: §R3.5 son 78 filas, de la 1 a la 78, sin huecos ni repetidas; por
lugar, Tema 1: 6 · 2A: 9 · 2B: 7 · 3A: 8 · 3B: 7 · 4A: 3 · 4B: 7 · Tema 5: 10 · Tema 6: 11 · ya jugada: 1 · dossier:
8 · ninguno: 1 (suma 78), 68 con juego, 58 en dos o más y 10 en una (3, 24, 39, 50, 59, 66, 70, 71, 77, 78).
«Cada número decide»: 58 filas, por juego 3 · 7 · 7 · 6 · 8 · 5 · 9 · 8 · 5. Trampas «En toda versión»: 44, y por
forma 23 «siempre», 13 (a) y 13 (b), con 18, 12 y 9 de «sólo». Alumno perezoso: 55 filas (46 + 9). Los lugares de
«SUPERADO por la 3.4» son 8, como dice. Lo que **no** es verdad son tres líneas de esa lista (hallazgos 2, 5 y 6).

La 3.4 mejora de verdad el juego: la loma con r bajo (el uso «cerrar el programa» vale en un barrio y no en otro),
el control chico de 3B, las unidades de 3B caso 2 y el n = 14 contra n = 17 de 3B caso 3 están bien pensados (los
lugares 4,25 y 10,75, y 5 y 13, salen de L = 1 + (n − 1)·k/100; los 4 por curso sobre el D9 de 41 y los 8, 3 y 5 del
sorteo también cuadran). **Sigue siendo juego** en el Tema 1, 2A, 3A, 4B caso 4, el Tema 5 y 3B caso 4. **Pierde
forma de juego el Tema 6**: sus casos 2, 3 y 4 son tres veces la misma pantalla (escribe números, aprueba o
frena frases del informe), sin nada que se vea ni se toque distinto (hallazgo 9). **Un bloqueo:** el caso 3 del
Tema 6, el que la 3.4 acaba de arreglar, le enseña al revés qué prueba una tercera variable.

### Hallazgos, de más grave a menos grave

**Bloqueo (no se le muestra a Ronald así):**

1. **La consecuencia del Tema 6 caso 3 enseña causa desde una correlación parcial.** **Qué pasa:** el caso dice
   que la relación entre redes y bienestar se «debilita» o se «mantiene» dentro de los grupos de la tercera
   variable, y la consecuencia en el mundo se escribe como verdad causal oculta:
   - si firmaste «A baja B» donde se debilitaba, «recortó las redes y el bienestar casi no se movió **(lo movía
     X)**»;
   - si firmaste «parte pasa por X» donde se mantenía, «dejó las redes como estaban aunque la relación seguía en
     pie […] y el bienestar de esos chicos no mejoró».

   La segunda línea dice que, si la relación sobrevive a mirar personas con X parecido, las redes sí afectaban el
   bienestar. Es exactamente «asociación sobre una variable controlada = causa», lo contrario de lo que el mismo
   caso pide firmar («asociadas, no causa»), y el propio «Cuidado de redacción» del caso (que se debilite es una
   pista, no una prueba; partir en dos recorta el rango de X). Además, en la versión «se mantiene» el texto no
   dice qué pasa con «A baja B»: leído con la consecuencia, esa frase pasaría a valer. **Por qué importa:** los
   conceptos no se negocian, y esto lo premia en un tercio de las versiones; Ronald no puede verlo en la maqueta
   si no domina el tema. **Propuesta:** (i) «A baja B» **nunca se sostiene, en ninguna versión** (es la frase de
   causa de la regla 5), y la regla 7 sigue cumpliéndose por el R² de cada grupo que escribes. (ii) La
   consecuencia depende de **lo que firmaste y de qué podía sostener tu evidencia**, no de una causa que sólo sabe
   el generador: «A baja B» → la escuela prohíbe las redes en el patio y en la audiencia le preguntan «¿cómo
   sabe que fue por las redes?», sin respuesta (esa repregunta de causa ya existe en el caso 4); «parte pasa por X»
   donde los R² de grupo no bajaron → el programa de sueño que se financió no toca lo que los datos seguían
   mostrando, y la concejala lo dice. (iii) Si se quiere conservar un efecto medible al trimestre, que sea sobre lo
   que se hizo (cuánto dinero, qué programa), nunca sobre «lo movía X».

**Importantes:**

2. **Tema 6 caso 2: el RIC de la escala es un número de peaje, y la lista de salida da ✔ a «0 peajes».** **Qué
   pasa:** los dos campos son la dispersión de la cohesión (escala) y la de las horas (razón). Las frases que
   hay en la mesa: «hay dos grupos» (lo decide el histograma), «la cohesión es baja» (el baremo), «el estudiante
   típico tiene X» (el centro vacío), «muy heterogéneo» (tu CV de las horas contra el CV dado), «varía más que
   las horas» (nunca se sostiene, con cualquier número), «es normal» y los cuatro decimales (toques). Ninguna
   usa el valor del RIC. Lo que importa es el toque «elijo RIC para la escala», no el número; y la fila 56 dice
   que decide «si “varía más que” compara bien», pero esa frase no se sostiene nunca, así que el número tampoco
   puede decidirla. **Por qué importa:** es el defecto que en la v8 fue bloqueo (5 peajes) y la lista lo declara
   inexistente con ✔; un alumno que sabe elige RIC y escribe cualquier cosa parecida. **Propuesta:** darle una
   frase que dependa de él: «la mitad central de las familias puntúa en un tramo de [RIC] puntos», con la lectura
   equivocada típica (la s, o el rango máximo menos mínimo), y que «el promedio representa al grupo» se juzgue con
   ese tramo contra la escala. Alternativa: quitar el campo y dejar sólo el toque de la elección (con el costo de
   que baja un número y el caso queda en 1 campo más 2 toques). Recomendada la primera: no pierde el elegir.

3. **Tema 6 caso 3: quien nunca usa la pieza «parte pasa por X» gana sin mirar los R².** **Qué pasa:** la
   frase se arma con piezas (comparten, asociadas, no causa, y la opcional de la tercera variable). Si «parte
   pasa por X» es una pieza que se puede dejar fuera, el alumno que arma siempre «comparten el X %, asociadas, no
   causa» y nunca la tercera variable acierta en las versiones «se mantiene» y «curva» y sólo falla en
   «se debilita», donde nada dice que omitirla se castigue. Los tres R² que escribió quedarían sin efecto para
   él. **Por qué importa:** la 3.4 cerró la regla 7 por (b) («el R² de cada grupo decide la pieza»), pero la
   decisión sólo existe si la pieza es obligatoria de decidir. **Propuesta:** la frase tiene un hueco que **no se
   puede dejar vacío**: «Al comparar personas con X parecido, la relación [se debilita / se mantiene / no se
   puede decir con una recta]». Las tres opciones están siempre en pantalla; con tus R² una es la correcta y la
   otra no, y omitir deja de ser una estrategia. Hace falta además una consecuencia en la versión «curva» (hoy
   sólo se escriben las de «debilita» y «mantiene»): la escuela ve una nube con forma y descarta la relación, o el
   programa se cierra, según la frase.

4. **Tema 6 caso 4: la repregunta de predicción no se puede jugar tal como está escrita.** **Qué pasa:** el
   ejemplo es «¿qué bienestar prevé para quien duerme tres horas?» y el campo es «el ŷ que ya sabes escribir desde
   4B caso 2». Pero la relación del Tema 6 es redes (A) con bienestar (B); las horas de sueño son la tercera
   variable X. Una recta de B sobre A no predice nada desde el sueño, y la de B sobre X nunca se armó. Tampoco dice
   de dónde salen b y a del archivo (en 4B caso 2 se escriben, 4 campos; aquí el caso 4 queda en 2 o 3).
   **Por qué importa:** es la quinta familia que la 3.3 y la 3.4 prometieron; si se construye así, un alumno recibe
   una pregunta sin recta. **Propuesta:** la repregunta pide «¿qué bienestar prevé para quien pasa N horas en
   redes?», con N dentro del rango del archivo en unas versiones y fuera en otras (cuál, cambia); la herramienta
   da b y a (ya se escribieron en 4B caso 2, regla de la propia maqueta de pasar a herramienta lo ya
   practicado) y el alumno escribe el ŷ o «no se predice». La fila 78 y §R3.9 lo dicen.

5. **Tema 6 caso 2: la mesa rompe la regla 5 y «muy heterogéneo» no tiene un criterio.** **Qué pasa:**
   - La regla 5 dice «como mucho una [que nunca se sostiene] por mesa». Este caso ya tiene tres en toda versión:
     «la cohesión varía más que las horas» (la 3.4 la deja fija), «la distribución es normal» (D3 3.4.1) y la media
     con cuatro decimales (D6 6.4). Con tres de seis o siete frases, «frena lo que suene a conclusión grande»
     rinde mucho, y las tres se aprenden en la práctica abierta y se dictan.
   - «El grupo es muy heterogéneo» es una frase absoluta que se juzga contra un solo CV dado. Con un 38 % y un 50
     % dados, ¿es «muy»? El dossier ejemplifica con 10 % contra 50 %, pero ya no trae un umbral (el juego lo
     quitó en la 3.3). Un alumno puede defender las dos respuestas.

   **Por qué importa:** una respuesta discutible baja la confianza del curso en el juego, y el peso de tres fijas
   no está dicho. **Propuesta:** (i) de las tres, «varía más que» queda fija (es el único lugar de su trampa) y las
   otras dos se turnan o se juntan en un solo toque («cifras que no van al informe»); (ii) la frase pasa a
   comparativa, que sí se juzga con lo que hay en pantalla: «las horas varían más entre las familias que los
   kilómetros» (tu CV contra el CV dado). Cada versión pone una diferencia grande y otra casi igual (el patrón
   «una muerde y otra no»).

6. **La lista de salida da ✔ a lo viejo marcado, y quedan reglas y páginas viejas en el cuerpo.** **Qué pasa:**
   la 3.3 declaró SUPERADO el filtro de Sturges «impar» (I14) y las páginas que ya no existen (D6 pág. 7 y 8, D3
   pág. 5 y 17, D2 págs. 18 y 19, D4 pág. 20, D5 pág. 15), pero siguen escritas, sin marca, en las partes que
   mandan:
   - I14 como regla viva: §R3.3 2A caso 2 (el «ya es impar» y su `versionValida`), 2A caso 3 («el mismo
     `versionValida` de Sturges (I14)»), la fila 20 de §R3.5 («n con el entero más cercano ya impar») y §R3.7
     («el n de Sturges […] ya impar (I14)»).
   - Páginas: «D2 pág. 19» (2B caso 3), «D2 pág. 18» (3A caso 2 y §R3.1), «D6 pág. 8» (3A caso 2 y la tabla de
     §R3.1, en dos filas), «D4 pág. 20» y «D5 pág. 15» (la tabla de §R3.1).

   **Por qué importa:** quien construya 2A lee que debe filtrar los n, contra el D2 vigente; y la escalera «a leer»
   manda a páginas que ya no tienen esa frase. Es lo mismo que el ✔ «Lo viejo marcado SUPERADO» decía haber
   cerrado. **Propuesta:** el adaptador borra o marca esas diez líneas y la lista de salida cuenta los lugares con
   el grep de las dos cosas (I14 y las siete páginas viejas) en lugar de «8 lugares con 3.4».

**Menores:**

7. **El Tema 6 se siente como la misma pantalla tres veces (casos 2, 3 y 4).** Escribir números y aprobar o frenar
   frases con consecuencia es la mecánica de toda la serie, pero en el Tema 6 no hay nada que se vea o se toque
   distinto. Una idea mía, barata y opcional, para el caso 3: la nube de redes y bienestar está a la vista y el
   alumno **toca la línea de la tercera variable para partirla**: la nube se pinta en dos colores y cada color
   muestra su propia recta. Es el «primero se ve, después se calcula» de Ronald aplicado al hallazgo 1 y 3, y se
   dibuja con lo que `src/lib/estadistica/` ya va a tener (nubes con forma pedida).
8. **Fila 58, la unión, no sube a 2.** El M10 agrega «reservar sólo los que dieron positivo en las dos» como
   instancia del «y» contra el «o», pero lo que el alumno produce sigue siendo un solo número (los que llegan a la
   agenda); ese error es una variante de ese campo, no un segundo uso. Si no se agrega una decisión o un segundo
   campo (por ejemplo, el proveedor trae «cuántos en las dos» **y** «cuántos en alguna» y el alumno elige cuál
   corresponde a reservar), la fila queda en 1 y las filas de una sola vez son 11, no 10. Hay que decirlo en la
   lista, que hoy cuenta 58 en dos o más.
9. **Rótulos de la 3.4 sin actualizar.** El encabezado del Tema 5 en §R3.3 lista «57 a 59, 61 a 65 y 72» y no
   incluye la 73, que la 3.4 mudó a ese tema. Y en la tabla «En toda versión», el r bajo con curva se marca (a) y la
   regla 7 define (a) como «dos instancias en el mismo caso», pero aquí las dos instancias están en dos temas
   (4B caso 4 y Tema 6 caso 3) y `versionValida` debe atar las versiones de ambos temas: decirlo como forma propia
   «(c) garantizado entre dos temas». Cuando 4B caso 4 trae r bajo sí cumple por (a) dentro del mismo caso (la
   loma muerde y el barrio recto y difuso no); cuando trae r alto, sólo lo cubre el Tema 6 si su nube es curva, y
   eso depende de que `versionValida` ate las versiones de los dos temas.
10. **4A caso 3, «casi iguales» necesita un umbral.** 31 % contra 29 % es «sin relación» y «una diferencia
    grande» es «depende del turno»: `versionValida` debe fijar los dos márgenes (por ejemplo, una diferencia de
    hasta 3 puntos contra una de al menos 12) para que el alumno no discuta un 8. Sin la regla, el M8 abre
    el caso que el D5 5.4 quiere cerrar.
11. **Las respuestas fijas acumuladas.** Con la 3.4, son fijas (siempre las mismas, de poco peso): «el doble» de
    un puntaje de escala, «los de la joroba son…», «es válido porque correlaciona», «varía más que», «el 50 %» de
    la escuela rural y «A baja B». Cada una está permitida por la regla 5, pero juntas se enseñan en la práctica
    abierta y se dictan. Que la progresión ponga un **tope conjunto** a lo que pesan (no un reparto: la
    ponderación sigue siendo de Ronald) y que la lista de salida diga cuántas son.
12. **El tipo de variable llega escrito en la ficha (Tema 6 caso 2).** Está bien para el CV y el RIC y no cambia mi
    juicio; sólo hay que cuidar que sea la **ficha del archivo** la que lo diga, como en un informe real, y no una
    etiqueta que acompañe el campo, o el alumno vuelve a rellenar lo que el rótulo ya dijo.

### La lista de salida del adaptador (versión 3.4), comprobada

| Línea de su lista | ¿Es cierto? | Por qué |
|---|---|---|
| Revisión del de aprendizaje, corregida (1 + 4 + 10) | ✔ en lo escrito, ✘ en parte en el fondo | V3.1 está tomada con una consecuencia que enseña mal (hallazgo 1) y V3.3 con una repregunta sin recta (hallazgo 4); los demás están |
| Cobertura: 78 filas, 0 sin lugar | ✔ | Recontada, igual |
| Profundidad: 68 con juego, 58 en dos o más, 10 en una | ✔ en el conteo, ✘ en parte | La fila 58 no tiene segundo uso (hallazgo 8) |
| La tercera variable en toda versión, con campo y consecuencia | ✘ en parte | La consecuencia es causal (hallazgo 1), la pieza se puede omitir (hallazgo 3) y «curva» no tiene consecuencia |
| Ninguna estrategia gana sin entender (55 filas) | ✔ en el conteo, ✘ en parte | Omitir la tercera variable gana (hallazgo 3); «frena lo grande» rinde en T6 caso 2 (hallazgo 5) |
| El patrón que se aprende una vez | ✔ | La consecuencia del r bajo y la loma apunta a lados distintos; sólo preocupan las fijas acumuladas (menor 11) |
| Cada número decide: 58 con consecuencia, 0 peajes | ✘ | El RIC de la escala (fila 56) no decide nada (hallazgo 2); el conteo 58 y los 9 juegos cuadran |
| Cada trampa en toda versión: 44 de 44 | ✔ en el conteo, ✘ en parte | El conteo cuadra; el r bajo con curva se marca (a) y es otra forma (menor 9) |
| Lo viejo marcado SUPERADO | ✘ | Diez líneas vivas con I14 y páginas que ya no existen (hallazgo 6) |
| Orden real de dictado | ✔ | Nada usa algo que se dicta después; la predicción usa la recta de D4, antes del 6 |
| Individual, sobre 100, no copiar | ✔ | Cada cambio de la 3.4 varía por versión; las fijas pesan poco (menor 11) |
| No se reabre lo decidido; sin commit | ✔ | Nada reabierto |
| Tuteo y sin guiones largos | ✔ | Búsqueda del guion largo en el archivo: 0 coincidencias |

### Los tres alumnos con lo nuevo, en corto

- **El que sabe:** disfruta la loma con r bajo, el sorteo de 3B y las dos unidades. En el Tema 6 pasa del caso 2 al
  3 y al 4 haciendo lo mismo y, en el caso 3, ve que le premian «dejar las redes» como si se hubiera probado
  la causa (hallazgo 1).
- **El que no sabe:** la escalera lo lleva a los números; el R² de cada grupo lo obliga a comparar, si la pieza es
  obligatoria (hallazgo 3). Con la consecuencia actual aprende que lo que sobrevive al control es causa.
- **El que quiere terminar rápido:** en el Tema 6 arma «comparten el X %, asociadas, no causa» sin tocar la tercera
  variable, frena las tres frases que suenan grandes y escribe cualquier número de dispersión para la escala
  (hallazgos 2, 3 y 5). «Siempre CV» o «siempre RIC» pierden bien; «r bajo, rechaza» y «r bajo, aprueba» también.

**No tocar:** la loma con r bajo y el barrio difuso (el patrón «una muerde y otra no» con una nube que se ve);
el n = 14 contra n = 17 con interpolación; el grupo de control sorteado (3 contra 5, con diferencia grande o
claramente chica); las unidades que cambian por un factor; el CV dado de una segunda variable de razón; que la
quinta familia entre por turno (cuatro de cinco) y la defensa oral cubra las cinco; el conteo rehecho de las 44
trampas, que cuadra.

### Lista de salida del crítico (v10)

| Regla | ✔/✘ | Dónde se ve |
|---|---|---|
| 1. Tres alumnos | ✔ | «Los tres alumnos con lo nuevo» |
| 2. ¿Divertido? ¿monótono? | ✔ | Veredicto; menor 7 (Tema 6) |
| 3. Contra la visión y los pedidos de Ronald | ✔ | Menor 7 (primero se ve); no es cuestionario salvo T6 |
| 4. Contra el aprendizaje | ✔ | Hallazgos 1, 3 y 5 |
| 5. Contra la realidad (celular, conexión, una persona) | ✔ | Campos máximos 10 (3A caso 2), sin cambio; T6 caso 3 queda en 3 y caso 2 en 2 más 2 toques |
| 6. Estrategia dominante, patrón, peaje, frase obvia; cuidado con el propio arreglo | ✔ | Hallazgos 2, 3 y 5; el arreglo propuesto para T6 no lleva una mecánica de otro tema (el corte de la nube es de este caso) |
| 7. Orden real de dictado | ✔ | Comprobado T1 a T6 con el 4 antes del 5; hallazgo 4 usa la recta de D4 |
| 8. Coherencia con el dossier que se manda a leer | ✔ | Hallazgo 6 (páginas viejas) |
| 9. Tanteo | ✔ | Sin tanteo nuevo: los números de 3B caso 3 y 4A caso 3 se escriben de datos, no de la consecuencia |
| 10. Lo prometido contra lo que existe | ✔ | «Qué se revisó»: motor nuevo es trabajo, no hecho |
| 11. ¿Se puede copiar? | ✔ | Menor 11 (fijas); lo demás varía |
| 12. Revisar lo jugable | No aplica | Nada construido |
| 13. ¿Otro juego? ¿se reutilizó bien? | ✔ | Sin nombres ni escenas nuevas de otros juegos en lo marcado 3.4 |
| Ronald decide; lo aprobado no se reabre | ✔ | Ninguna decisión nueva; nada APROBADO tocado |
| Lee antes de proponer | ✔ | «Qué se revisó» |
| El juego no es una lección | ✔ | Las propuestas son consecuencias y decisiones, no escenas |
| Individual, sobre 100, sin reparto | ✔ | El menor 11 pide un tope, no un reparto |
| Por temas, sin tiempo; estructura escalable | ✔ | «Al trimestre» es tiempo del mundo; 0 casos nuevos |
| Lista de salida con prueba contada | ✔ | Recuento propio hecho a mano, línea por línea (sin terminal en esta sesión); coincide con el del adaptador salvo lo dicho |
| Tuteo, sin guiones largos | ✔ | Esta entrada no usa guion largo |

---

## 29-09-2026 · Psicoestadística Descriptiva (Psicología), maqueta ronda 3.1: ¿sigue siendo juego con 32 casos? (papel, v9)

**Qué se revisó.** La ronda 3, versión 3.1, de `00-adaptacion-psicoestadistica-descriptiva-psicologia.md`
(§R3.0-bis a §R3.9 y su «Lista de salida · ronda 3.1»), con lo que sigue vigente de la ronda 2 (§R2.1, §R2.4,
§R2.5, §R2.6, §R2.7), contra la revisión de profundidad del de aprendizaje (`04-aprendizaje.md`, PD.1 a PD.8),
la v8 de este archivo y `PIEZAS-COMUNES.md` §4. Contra el código: `version-alumno.ts` sigue dando una sola
versión por alumno y semilla, y `src/lib/estadistica/` no existe; la maqueta los nombra como trabajo (§R2.5,
§R3.7), no como hecho. No hay nada construido de esta isla. No se usó la copia en conflicto de Synology.

**Veredicto.** Los conteos de la lista de salida **cuadran**: los reconté a mano, tabla por tabla, y dan lo
mismo (abajo). La profundidad que pidió Ronald está: los hermanos juntos, cada tema sube, las trampas del
dossier tienen caso. **Sigue siendo juego** en el Tema 1, 2A caso 3, 2B caso 3, 3A, 4B caso 4, el Tema 5 y la
audiencia. **En 3B y 4B se vuelve un cuestionario largo con dibujos:** caso tras caso, calcular a mano y
después aprobar o frenar frases (hallazgo 5). Hay **dos bloqueos**: la regla 7 («cada trampa en toda
versión») se da por cumplida en 39 de 39 y en cuatro trampas sigue siendo «a veces», justo lo que el I1 del de
aprendizaje pedía cerrar; y la idea P5 («el taller funcionó») enseña al revés la regresión a la media en la
mitad de las versiones. Los dos se arreglan con líneas, sin casos nuevos.

### La lista de salida del adaptador, comprobada

| Línea de su lista | ¿Es cierto? | Por qué |
|---|---|---|
| Cada número decide: 58, 58 con consecuencia | ✔ en el conteo, ✘ en parte en el fondo | Recontado: 58 filas (1: 3 · 2A: 7 · 2B: 7 · 3A: 6 · 3B: 8 · 4A: 5 · 4B: 9 · 5: 8 · 6: 5) y los campos de cada caso de §R3.3 están todos en la tabla. Pero en dos filas el número no cambia la decisión (27 y 44, hallazgo 4) y en dos la consecuencia es sólo un dibujo (12 y 14, hallazgo 8) |
| Cada trampa en toda versión: 39 de 39 | ✘ | Recontado: 39 filas. En 4 de ellas lo que cambia de un alumno a otro es **si la trampa muerde**, en su único lugar (hallazgo 1) |
| Ninguna estrategia gana sin entender: 43 trampas | ✔ en el conteo, ✘ en parte | Recontado: 43 filas, 17 marcadas 3.1. Falta la estrategia nueva que nace de las reglas 3 y 6 juntas (hallazgo 3) y las decisiones de respuesta fija (hallazgo 4) |
| El patrón que se aprende una vez | ✘ en parte | Hallazgo 4: 3B caso 3, el asistente de 5 caso 2 y la compra del test siempre tienen la misma respuesta, fuera de la regla 5 |
| Revisión del de aprendizaje, corregida: 2 de 2, 14 de 14 | ✘ en parte | B1a, B1b y B2 resueltos de verdad. I1 resuelto en 3 casos y no en otros 4 (hallazgo 1). I3 tomado con un grupo de comparación que no compara (hallazgo 2). Los demás, resueltos |
| Cobertura: 71 filas, 0 sin lugar | ✔ | Recontado: Tema 1: 6 · 2A: 9 · 2B: 6 · 3A: 8 · 3B: 5 · 4A: 3 · 4B: 7 · 5: 8 · 6: 9 · ya jugada: 1 · dossier: 8 · ninguno: 1 = 71. Detalles de rótulos en el hallazgo 9 |
| Profundidad: 61 con juego, 52 en dos o más, 9 en una | ✔ | Recontado: las 9 de una vez son 3, 24, 39, 50, 58, 59, 66, 70 y 71 |
| Cada tema, una serie: 32 casos, 9 con ayuda | ✔ | 3, 3, 3, 4, 4, 3, 4, 4, 4; los 9 casos 1 con ayuda |
| Ideas propias: 12 del adaptador, 14 del de aprendizaje | ✔ | Contadas en §R3.1 |
| Motor común «como Doom» | ✘ en parte | Hallazgo 6: dos nombres de AIEF |
| Orden de dictado; web y Android; tuteo y sin guiones largos; lo que dijo Ronald; individual; no es lección | ✔ | Comprobadas; ningún caso usa algo que se dicte después; máximo de campos 10 (3A caso 2) |

### Hallazgos, de más grave a menos grave

**Bloqueos (no se le muestra a Ronald así):**

1. **La regla 7 cuenta de más: en cuatro trampas lo que cambia es si la trampa está.** **Qué pasa:** la propia
   tabla «En toda versión» lo dice en su columna «qué cambia»:
   - **El tamaño no arregla el método** (T1 caso 3, único lugar): «en parte de las versiones la grande es la
     sorteada». Ahí el alumno que cree que lo grande es mejor elige la grande y acierta: nunca lo muerde.
   - **La forma depende de las paredes** (2A caso 3, único lugar): «si el pico se muda». Donde no se muda, no hay
     trampa.
   - **La moda no es la mayoría** (3A caso 2, único lugar): «si llega a la mitad». Donde llega, «moda = mayoría»
     acierta.
   - **La relación vive en las celdas** (4A caso 3, único lugar): «en parte de las versiones, en los dos o en
     ninguno». Donde los dos mercados son iguales, «mismo total, mismo problema» se aprueba y se premia el
     razonamiento que D4 §4.2 prohíbe.

   **Por qué importa:** es exactamente el defecto que el I1 del de aprendizaje mandó cerrar («deja alumnos que
   nunca la enfrentan en su vez oficial»), y la lista da ✔ 39 de 39. Es el mismo criterio del B2: un ✔ vale
   sólo con la prueba contada, y aquí la prueba cuenta cuatro filas que no cumplen. **Propuesta**, con el
   patrón que la 3.1 ya usa bien en 3A caso 3 y en las tortas de 2B caso 2 (**dos instancias en el mismo caso:
   una muerde y otra no; cuál, cambia**):
   - **T1 caso 3:** la encuesta grande tiene **siempre** un método que deja gente afuera. Lo que cambia es si
     la chica está bien sorteada (se anuncia la chica) o tiene su propio sesgo en el otro sentido (no se
     anuncia ninguna como cifra de la ciudad: se dice lo que sí se midió, o se espera el censo). Así «siempre
     la chica» también pierde.
   - **2A caso 3:** el director trae su polígono para **dos pares** de centros; en un par el pico se muda con
     tus paredes y en el otro no; cuál par, cambia.
   - **3A caso 2:** «la mayoría puntúa X» llega sobre **dos cursos**; en uno la moda reúne a más de la mitad y
     en el otro no; cuál, cambia.
   - **4A caso 3:** en toda versión un mercado depende del turno y el otro no (cuál, cambia). «Tienen el mismo
     problema: sus totales son iguales» pasa a ser de las que nunca se sostienen (su «porque» es la trampa), con
     poco peso, y lo que decide es la brigada de cada mercado, con tus cuatro porcentajes.
   - Y la regla 7 aclara su última frase: «si la frase que la usa es cierta» vale **sólo si en el mismo caso
     hay otra instancia donde la trampa muerde**, o si el alumno escribe el número que la decide (como en el
     cambio de las denuncias o el percentil de Tomás, que están bien).

2. **La idea P5 («el taller funcionó») enseña al revés la regresión a la media.** **Qué pasa:** en 3B caso 4 se
   compara cuánto bajaron los derivados (todos sobre el D9) con cuánto bajaron, sin taller, «los que quedaron
   justo debajo del D9», y «en unas versiones los derivados bajaron mucho más (el taller funcionó) y en otras lo
   mismo (regresión a la media)». Pero la regresión a la media es **mayor cuanto más lejos del centro está el
   puntaje**: los derivados, más extremos, bajan más que los de justo debajo **aunque el taller no haga nada**.
   Con ese grupo de comparación, «bajaron más» no prueba que funcionó, e «igual» sugeriría que el taller hizo
   daño. **Por qué importa:** los conceptos correctos no se negocian, y aquí la versión «funcionó» premia la
   falacia que D1 §1.4 enseña a evitar; Ronald no puede verlo en la maqueta si no domina el tema. **Propuesta**
   (recomendada): el grupo de comparación tiene que ser **igual de extremo**. Como hay tres cupos para dos
   cursos, la directora **sortea los cupos entre los que pasan el D9** (regla del juego, marcada); al trimestre
   escribes cuánto bajaron **los que pasaron el D9 y no salieron sorteados**. Es la asignación aleatoria y el
   grupo de control de D1 §1.4, jugados. En las versiones sin efecto los dos grupos bajan parecido (regresión);
   en las con efecto, los del taller bajan más. `versionValida` asegura que siempre haya más alumnos sobre el D9
   que cupos. Alternativa: sacar P5 de 3B y dejar la regresión sólo en la lista de espera sorteada del Tema 6
   (costo: la fila 8 vuelve a un caso, lo que el I3 pedía subir).

**Importantes:**

3. **Con la regla 6, las frases que citan un número se juzgan buscando si ese número está en la pantalla.**
   **Qué pasa:** la regla 3 dice que las conclusiones citan tu número, «a veces el correcto y a veces el que da
   un error típico (la media con n, el límite en lugar de la marca)». La regla 6 abre la mesa con tus números
   ya corregidos. Juntas, una frase con «la media con n» se frena porque el número **no coincide** con ninguno
   de los tuyos: el alumno que quiere terminar rápido aprende «si el número está en mi pantalla, apruebo
   señalándolo; si no está, freno». Eso no mide lectura (el error de cuenta ya lo cobró la escalera) y es un
   patrón que se aprende una vez. **Por qué importa:** la mesa es la mecánica central de la ronda 3 y la regla 2
   («menos de una vez en diez al azar») supone que elegir la prueba cuesta. **Propuesta:** la regla 3 cambia: el
   número equivocado de una frase es **siempre otro número tuyo o una lectura equivocada** (la media donde iba
   la mediana, r donde iba r², el porcentaje donde iba el percentil, el conteo donde iba la proporción, la fila
   donde iba la columna), nunca un error de cuenta. Y parte de las frases afirman un umbral o una comparación
   («más de la mitad», «B es el más parejo»), no un valor que se copia. Así el número de la frase **siempre**
   está en tu pantalla y hay que saber si es el que corresponde.

4. **Decisiones con respuesta fija fuera de la regla 5, y dos números que no deciden.** **Qué pasa:**
   - **3B caso 3:** llega un caso extremo; la directora dice «empeoró: la dispersión se duplicó» o «sigue igual
     de parejo». Con un solo extremo la respuesta es siempre la misma (el grupo no cambió; lo muestra el RIC),
     cambie la frase o no. Tu s con el caso (fila 27) no cambia esa decisión: es un peaje de hecho. Y la s de
     antes no la escribe nadie: no se dice de dónde sale.
   - **4B caso 4:** «tres barrios cuyas tablas dan un r parecido» y escribes los tres r (fila 44). Si son
     parecidos, no deciden nada entre barrios: decide la forma. Son tres Pearson a mano en el celular para
     confirmar lo que la consigna ya dijo.
   - **5 caso 2:** el asistente siempre se equivoca («el próximo seguro es real»): «nunca aceptes lo del
     asistente» gana. Y si la escuela que nombra es justo la que merece ir primero, aceptar sería la acción
     correcta por mala razón.
   - **4B caso 3:** comprar el test es siempre un error.

   **Por qué importa:** con la práctica abierta antes de la vez oficial, toda respuesta fija se aprende en la
   práctica y se dicta a un compañero. La regla 5 lo acepta sólo para las frases «Qué NO», con poco peso; estas
   no están declaradas así. **Propuesta:** 3B caso 3, en unas versiones llega **un** caso extremo (s salta, el
   RIC no: el grupo sigue igual y esa persona va a derivación por tu valla) y en otras llegan **varios** que
   abren al grupo (los dos crecen: empeoró de verdad); la s de antes la da la herramienta. 4B caso 4, la
   concejala trae el r de los tres barrios (herramienta: ya lo calculaste en los casos 1 a 3) y escribes r sin
   el punto (1 campo) y, en la loma, el ŷ de un extremo que la recta no alcanza (1 campo). 5 caso 2, el
   asistente propone dos cambios de orden: uno por «el próximo seguro» (nunca) y otro por los positivos reales
   por hora de evaluación (a veces vale), y la escuela del primero nunca es la que merece ir primero. 4B caso 3,
   la compra se declara de las que nunca se sostienen, con poco peso, y la fila 43 dice lo que el número decide
   (la frase «comparten el X %»), no «si se compra».

5. **En 3B y 4B el ritmo es «calcula y juzga frases» caso tras caso.** **Qué pasa:** jugando como el que sabe,
   3B tiene mesa en los casos 2, 3 y 4, y 4B en los casos 2, 3 (dos mesas: los estudios y el test) y 4. El Tema
   3 suma 8 casos, unos 34 campos oficiales (sin contar los casos con ayuda) y 5 mesas; y los campos más pesados
   son de cálculo a mano (tres s y tres CV en 3B caso 2; cuatro r en 4B caso 4). Los campos están contados; el
   **cálculo** no. **Por qué importa:** Ronald pidió profundidad, no una guía de ejercicios con veredictos; el
   riesgo que §R3.7 nombra («que juzgar se sienta un verdadero o falso») aparece justo donde la mesa se repite
   sin la forma de su juego. **Propuesta:** **una mesa por juego**, en el caso donde vive su trampa; en los otros
   casos el número decide la acción propia del juego (a quién va el especialista, quién se deriva, los cupos)
   sin frases. En 3B: el caso 2 decide el especialista con el CV y sus dos frases pasan a la mesa del caso 4. En
   4B: el caso 3 se parte en dos firmas en dos pantallas (como 3B caso 4). Y cada ficha dice **cuántos datos
   tiene cada grupo** y qué suma la herramienta después del caso con ayuda, con el criterio de la propia
   maqueta: lo que ya se practicó en el juego pasa a herramienta.

6. **Dos nombres de AIEF.** **Qué pasa:** «Rosa, que usa 5 horas, dormirá X» (4B caso 2) y «a Julia la llamaron
   al celular de su tía» (§R2.1). Doña Rosa y Doña Julia son clientas de «La ventanilla»
   (`src/lib/juego/aief/tema1.ts`). **Por qué importa:** regla «como Doom»: un alumno que jugó los dos no puede
   reconocer a nadie. **Propuesta:** cambiar los dos ejemplos, y que las plantillas de nombres de esta isla
   excluyan los de `PIEZAS-COMUNES.md` §4 (una prueba que lo compruebe).

**Menores:**

7. **5 caso 3 no dice qué es «la buena».** «Cuál de las tres opciones se compra depende de la prevalencia, de la
   capacidad y de cuántos coinciden»: falta qué se busca con la agenda fija (ver a todos los que tienen el
   trastorno si caben; si no, a la mayor cantidad de reales). Va como regla del juego, marcada (M6).
8. **El ángulo del sector sólo dibuja** (filas 12 y 14). Que tenga efecto en el mundo: la torta impresa con tu
   ángulo muestra un motivo más chico de lo que es y el programa de ese motivo reclama en la prensa.
9. **Rótulos que no siguieron a la 3.1.** Los encabezados de §R3.3 no listan las filas sumadas (2B: 11, 17 y 18;
   3B: 8; 4B: 11). Las filas 8 y 17 dicen «Tema 6» aunque su caso con campo está antes (3B, 2B): decir cuál es
   su tema de casa. La fila 36 todavía dice «en parte de las versiones». §R3.2 dice que a 3A caso 2 «le sigue
   3B caso 4 (7)», pero 2A caso 2 llega a 8. La fila 38 cuenta la ojiva de 2A caso 2 como percentil, que se
   dicta en D3 (no cambia el conteo: 3B caso 4 ya tiene tres).
10. **2B caso 3, orden de los gráficos.** Si los cinco van siempre en el mismo orden, «el cuarto se frena»
    se aprende en la práctica: el orden cambia con la versión.
11. **4B caso 2, la mediana del turno.** Una mediana sola no decide a qué turno va la charla: decir con qué se
    compara (las de los otros turnos, que llegan dadas).

### Los bloqueos anteriores: ¿resueltos o sólo nombrados?

| Bloqueo | Cómo quedó |
|---|---|
| v8 1 · subtemas sin lugar | Resuelto: 71 filas, 0 sin lugar, recontadas |
| v8 2 · números de peaje | Resuelto en lo que la v8 nombró; la 3.x trajo dos peajes de hecho nuevos (hallazgo 4) |
| De aprendizaje B1a · «el doble» sin cero | Resuelto: en toda versión, y «el doble» de razón a veces es cierto (orden, hallazgo 10) |
| De aprendizaje B1b · r alto no prueba validez | Resuelto: en toda versión, con un campo que decide «comparten el X %» |
| De aprendizaje B2 · §R3.5 contaba de más | Resuelto: ángulo en 2B casos 1 y 2; cuartiles en 3B casos 3 y 4 |
| De aprendizaje I1 · trampas «a veces» | A medias: resuelto en la ordinal, las escalas y el rango; quedan cuatro (hallazgo 1) |
| De aprendizaje I3 · regresión a la media | Tomado con un error de concepto (hallazgo 2) |
| De aprendizaje I13 · error arrastrado | Tomado; deja un patrón nuevo junto con la regla 3 (hallazgo 3) |

### Los tres alumnos, en corto

- **El que sabe:** disfruta el Tema 1, las paredes del director, las tres formas, los tres barrios y la
  audiencia. En 3B y 4B pasa de calcular a juzgar frases tres veces seguidas y hace cuatro Pearson para ver
  que dan igual (hallazgos 4 y 5).
- **El que no sabe:** la escalera lo lleva a los números correctos y la mesa lo obliga a elegir cuál decide:
  eso enseña. Si su versión trae la encuesta grande sorteada, los mercados iguales o la moda que sí es mayoría,
  termina creyendo lo que el dossier prohíbe (hallazgo 1); si trae «el taller funcionó», aprende la regresión
  al revés (hallazgo 2).
- **El que quiere terminar rápido:** juega la práctica abierta, aprende que el asistente, la compra del test,
  el grupo que «empeoró» y las frases que generalizan tienen siempre la misma respuesta, y en la vez oficial
  frena por coincidencia de números (hallazgos 3 y 4). Lo demás lo frena.

**No tocar:** el Tema 1 con un solo juego; las tres formas de 3A caso 2; las dos tablas de 3A caso 3 y las dos
tortas de 2B caso 2 (el patrón «una muerde y otra no»); «el doble» con y sin cero; las paredes del director; la
unión con sillas vacías; la regla 6 como idea (mide la lectura, no la cuenta); la práctica abierta con semilla
aparte; los conteos con script, que esta vez cuadran.

### Lista de salida del crítico (v9)

| Regla | ✔/✘ | Dónde se ve |
|---|---|---|
| 1. Tres alumnos | ✔ | «Los tres alumnos» |
| 2. ¿Divertido? ¿monótono o sin marco? | ✔ | Veredicto; hallazgo 5 |
| 3. Contra la visión (cuestionario, elige en vez de calcular, se ve antes) | ✔ | Hallazgos 3 y 5 (`01-vision.md` de esta isla todavía no existe) |
| 4. Contra el aprendizaje (ganar sin entender, pista, registro) | ✔ | Hallazgos 1, 2 y 3 |
| 5. Contra la realidad (celular, conexión, una persona, retomar) | ✔ | Hallazgo 5 (cálculo en el celular); motor nuevo comprobado contra `version-alumno.ts` y `src/lib/estadistica/` |
| 6. Estrategia dominante, patrón, peaje, frase obvia; cuidado con el propio arreglo | ✔ | Hallazgos 3 y 4; ninguna propuesta lleva una mecánica a otro tema: el patrón «una muerde y otra no» ya es de cada caso |
| 7. Orden real de dictado | ✔ | Comprobado T1 → T6 con el 4 antes del 5, también la propuesta del hallazgo 2 (D1 antes que D3) |
| 8. Coherencia con el dossier que se manda a leer | ✔ | Sin hallazgo nuevo; PD.5 ya en §R3.8 |
| 9. Tanteo | ✔ | Hallazgo 4 (respuestas fijas que se aprenden en la práctica) |
| 10. Lo prometido contra lo que existe | ✔ | «Qué se revisó»: motor nuevo nombrado como trabajo |
| 11. ¿Se puede copiar?, parte por parte | ✔ | Hallazgo 4; lo demás varía (columna «qué cambia», recontada) |
| 12. Revisar lo jugable | No aplica | Nada construido de esta isla |
| 13. ¿Otro juego? ¿se reutilizó bien? | ✔ | Hallazgo 6 |
| Ronald decide; lo aprobado no se reabre | ✔ | Nada APROBADO en la ronda 3; ninguna pregunta nueva |
| Lee antes de proponer | ✔ | «Qué se revisó» |
| Lo que Ronald ya dijo (no cuestionario, escribe el número, primero se ve) | ✔ | Hallazgos 3 y 5 |
| Juego con sabor a la materia; conceptos correctos | ✔ | Veredicto; hallazgo 2 |
| Un juego por materia y carrera; motor «como Doom» | ✔ | Hallazgo 6 |
| Lo que cuenta no se puede copiar | ✔ | Hallazgo 4 |
| Individual, sobre 100, sin reparto | ✔ | Ninguna propuesta reparte la nota; «poco peso» es la regla 5 ya escrita |
| El juego no es una lección | ✔ | Las propuestas son decisiones y números con consecuencia |
| Todos los agentes en su etapa; sin idas y vueltas | ✔ | Revisión única antes de Ronald; corrige el adaptador |
| Aspecto con bocetos; cómo llega el alumno | No aplica | La maqueta no toca aspecto ni páginas |
| Marco fijo, modalidad variable; el marco es el mundo | ✔ | Hallazgo 5 pide menos mesa, no otra mecánica |
| Cómo se planifica (diseño inverso, arco, escalera, contraste) | ✔ | Hallazgos 1 y 2 |
| Lo que Ronald decide se vuelve regla | ✔ | No hubo decisión nueva |
| Por temas, sin tiempo | ✔ | Sin plazos ni duraciones; «al trimestre» es tiempo del mundo |
| Primero la maqueta; un concepto, su tema de casa | ✔ | Hallazgo 9 |
| Estructura escalable | ✔ | 0 casos nuevos en las propuestas |
| Web y Android por igual | ✔ | Hallazgo 5 |
| Un tema a la vez | ✔ | La versión mínima sigue siendo el Tema 1 |
| Lista de salida con prueba contada | ✔ | Esta lista; la del adaptador, recontada arriba |
| Una idea de Ronald es un ejemplo | ✔ | El patrón «una muerde y otra no» y el sorteo de cupos (hallazgos 1 y 2) salen de la propia maqueta y de D1 §1.4 |
| Términos técnicos explicados | ✔ | Los que uso ya están en el documento revisado |
| Tuteo, sin guiones largos, castellano neutro | ✔ | Sin guiones largos en esta entrada |
| Realista con el tamaño | ✔ | Todo con líneas y restricciones de `versionValida`; hallazgo 5 baja cálculo |
| Escribir en su archivo con versión, fecha y pendientes | ✔ | Encabezado v9 y «Decisiones pendientes» |

---

## 28-09-2026 · Psicoestadística Descriptiva (Psicología), maqueta de la ronda 2: ¿juego o cuestionario bonito? (papel, v8)

**Qué se revisó.** La ronda 2 de `00-adaptacion-psicoestadistica-descriptiva-psicologia.md` (§R2.0 a
§R2.8 y su «Lista de salida · ronda 2»), contra la v7 de este archivo (menos el arreglo 1, que Ronald
rechazó), IDEA-JUEGO §21 y §22 y `PIEZAS-COMUNES.md`. Lo que la maqueta da por hecho para el reintento, el
celular y la conexión se comprobó contra el código: `version-alumno.ts`, `escalera.ts`, `partida.ts`,
`nativo.ts`, `EscenaPlanta.tsx` y `EscenaVentanilla.tsx`. No hay nada construido de esta isla.

**Veredicto.** Mucho mejor que la ronda 1: el Tema 1 tiene un solo juego, el sesgo apunta a los dos lados,
la condicionada se juega una vez, el mapa no se arrastra y la maqueta aguanta el orden de dictado. A la
pregunta de Ronald, la respuesta honesta hoy es **«seis juegos y tres ejercicios con consecuencia»**: el 1,
3A, 4B, 5 y 6 (y en parte el 2B) tienen una decisión que el cálculo informa pero no dicta, y algo que
sorprende; en el **2A, 3B y 4A** la «decisión» es la salida del cálculo. Además quedan números de peaje
que la lista de salida da por cerrados, y subtemas esenciales sin lugar en §R2.2, que es justo la tabla
que Ronald va a aprobar. **Dos bloqueos**; los dos se arreglan con líneas, sin cambiar la maqueta.

### La lista de salida del adaptador, comprobada

| Línea de su lista | ¿Es cierto? | Por qué |
|---|---|---|
| Mapa de cobertura sin temas esenciales afuera | ✘ | Hallazgo 1: percentil, marca de clase y centro agrupado, moda, fases del análisis y error muestral no tienen lugar |
| Ninguna estrategia gana sin entender (patrón, número de peaje, frase obvia) | ✘ en parte | Hallazgos 2, 5 y 6 |
| Lo que Ronald ya dijo: «cada juego dice qué número se escribe y qué cambia» | ✘ en parte | Hallazgo 2 |
| Juego con sabor a la materia: «cada juego decide algo de la ciudad con el número» | ✘ en parte | Hallazgo 3: en tres juegos el número decide solo |
| Realista con el tamaño; web y Android | ✘ en parte | Hallazgo 4: «otro intento es otra ciudad», el botón atrás y el guardado al volver se dan por hechos |
| Las demás (orden de dictado, copia, individual, no es lección, lo que dijo Ronald, traspaso, tuteo y sin guiones largos) | ✔ | Comprobadas; guiones largos y voseo: 0 en el documento |

### Hallazgos, de más grave a menos grave

**Bloqueos (no se le muestra a Ronald así):**

1. **§R2.2 deja subtemas esenciales sin lugar, y lo que Ronald aprueba es esa tabla.** **Qué pasa:** la
   esencia (§1.3) pide percentil con n + 1, marca de clase, media y mediana agrupadas, moda, fases del
   análisis «y por qué no se reordenan» y error muestral contra no muestral. En la ronda 2: el
   **percentil** no se juega en ningún lado (3B pide sólo cuartiles, RIC y vallas), aunque la propia tabla
   §R2.0 dice que 3B enseña «no confundir percentil con porcentaje»; la **marca de clase y el centro
   agrupado** desaparecieron (la ronda 1 los tenía entre el Tema 2 y el 3; la tabla «qué usa cada pieza» ya
   no); la **moda** no aparece; las **fases** se mandan al Tema 6 en la fila de 1.1 y 1.4, pero la
   descripción del Tema 6 sólo juega el grupo de control; el **error muestral** no se nombra (el Tema 1
   juega sólo el sesgo). **Por qué importa:** Ronald aprobaría una tabla incompleta y el ✔ de cobertura es
   falso. **Propuesta:** una fila por cada uno en §R2.2. Recomendado: percentil en **3B** (Tomás «sacó
   85»; escribes su percentil y la derivación depende de él, no del puntaje); marca de clase y centro
   agrupado como último paso de **2A**, o dossier si no se quiere alargar 2A (y decirlo); moda en **3A**
   junto a media y mediana, o dossier; fases, **dossier** (el Tema 6 no las juega); error muestral en el
   **Tema 1** (hallazgo 6).

2. **Quedan números de peaje, y la lista dice que no.** **Qué pasa**, número por número: en **4B**, el
   signo de la covarianza (es el signo de r, ya visible en la nube, y r se pide con la fórmula de D6 §6.3,
   que no la necesita) y **R²** (no mueve nada en 4B; la frase de R² está en el Tema 6); en **2A**, «en la
   ojiva lees el corte» sin decir qué decide ese corte; en **3A**, «eliges qué centro informar» sin
   consecuencia (el «si lo hace mal» de §R2.0 no la trae); en **2B**, si el presupuesto alcanza para K
   programas, ordenar basta para saber qué se financia y el acumulado no decide nada. **Por qué importa:**
   es la pregunta de Ronald y el control del 28-09 («cada número que escribe el alumno cambia lo que
   pasa»). **Propuesta:** cada número se ata a algo o sale. **4B:** el signo de la covarianza sale del
   juego (dossier); R² entra en la frase para la concejala («comparten tal parte de su variación»), armada
   con piezas, que decide si financia la búsqueda, o sale de 4B y queda sólo en el Tema 6. **2A:** el
   médico da los cupos y tú lees en la ojiva desde qué espera se atiende primero: el corte decide quién
   entra. **3A:** el centro que informas clasifica al grupo («leve» o «moderado», como el paciente que
   arrastra la media en D3 §3.1) y con eso recibe el recurso de ese nivel. **2B:** el acumulado es lo que la
   concejala anuncia («resolvemos el X %»); si escribes 80 donde era 62, meses después la promesa se cae en
   público. O los programas cuestan distinto y el corte no es «los K primeros».

**Importantes:**

3. **En tres juegos la decisión es la salida del cálculo (2A, 3B, 4A).** **Qué pasa:** jugando como el que
   sabe, en 2A llenas la tabla y el umbral y los cupos salen de ese número; en 3B escribes cuartiles y
   vallas y derivar es «quien pasa la valla»; en 4A lees qué pregunta el pedido, eliges el denominador y la
   brigada va sola. No hay nada que el número informe y tú decidas: con dibujos y consecuencia, pero es la
   forma de un cuestionario. **Por qué importa:** es lo que Ronald preguntó; si se le dice «nueve juegos»,
   espera nueve juegos. **Propuesta**, dentro de la modalidad de cada tema (no se trae mecánica de otro):
   **2A**, lo del hallazgo 2 (cupos fijos, el corte lo eliges en la ojiva); **3B**, pocas derivaciones para
   dos grupos, el mismo puntaje extremo en uno y del montón en otro, y el percentil de Tomás contra el
   «sacó 85 %»: hay que decidir a quién, no sólo marcar a los de afuera; **4A**, el mismo pedido usa los dos
   denominadores: la brigada va al turno de mayor riesgo (por fila) y los materiales se calculan por
   cantidad de estresados (conjunta); mezclarlos deja al turno correcto sin materiales o al grande con la
   brigada. Y en el resumen para Ronald, decir qué juegos son fuertes y cuáles son pasos cortos, sin
   venderlos iguales.

4. **Se da por hecho lo que el motor no tiene.** **Qué pasa:** el cierre del tanteo en los nueve juegos es
   «otro intento es otra ciudad» (§R2.1, §R2.4, §R2.6 punto 8), y el escalón (d) es «otro pedido con otros
   números». En el código, `versionDeAlumno` da **una sola versión por alumno y por semilla**, y
   `escalera.ts` dice que el cuarto escalón «queda para cuando el registro guarde la versión de cada paso
   (hoy toda la partida usa una sola versión)». «El botón atrás cierra la hoja abierta»: ningún juego
   maneja el botón atrás (`nativo.ts` sólo escucha el regreso del inicio de sesión). El guardado al volver
   la conexión existe, pero **copiado** dentro de `EscenaPlanta.tsx` y `EscenaVentanilla.tsx`, no en el
   motor. **Por qué importa:** la versión mínima (Tema 1) necesita las tres cosas; si no están en el costo,
   aparecen al construir. **Propuesta:** sumar a §R2.5, en «nuevo y se hace como motor», la versión por
   intento (semilla `"<isla>:<tema>:<intento>"`) guardada en la partida y leída por el registro y la página
   del docente, y el botón atrás que cierra la hoja; en «hay que despegar», el guardado con reintento de
   las dos escenas a una pieza común.

5. **Dos decisiones que se ganan con un patrón.** **Qué pasa:** (a) en 4B la ordenanza trata r como causa
   **en todas las versiones**, así que «nunca firmes lo que propone la concejala» acierta siempre (mi
   arreglo 3 de la v7 la dejó así); el alumno aprende «la concejala se equivoca», no «r no es causa». (b)
   En el Tema 5, «qué carta recibe cada familia» no dice cómo se arma: si son dos cartas («posible
   dislexia» o «le haremos una evaluación»), la prudente se nota sin calcular. **Propuesta:** (a) en 4B la
   concejala trae **dos o tres usos del mismo dato**, cada uno válido o no según la versión: buscar por
   pantalla (válido si r es fuerte), prever cupos con ŷ (válido dentro del rango), la ordenanza (nunca
   válida, pero mezclada con las otras); «rechaza todo» y «aprueba todo» pierden. (b) En el 5 la carta se
   arma con piezas y lleva **tu número** («de cada 10 niños con este resultado, X…»); con prevalencia alta
   o baja, la carta correcta cambia.

6. **El Tema 1 (la versión mínima) mezcla dos «lo que no viste».** **Qué pasa:** «para los que no viste,
   escribes quién quedó afuera y si eso sube o baja el resultado». Un colegio **sin encuestas** no tiene
   sesgo que corregir: no tiene datos. El sesgo es de los colegios que mediste **con un método que deja
   gente afuera** (la puerta, el teléfono). Falta decir qué es acertar: con 60 encuestas repartidas, un
   buen método puede errar por azar y el censo lo va a mostrar. Y «sube o baja» es un sí o no: al azar se
   acierta la mitad. **Por qué importa:** es la primera pieza que se construye y el concepto central de la
   materia. **Propuesta**, para la ficha: (a) la dirección del sesgo corrige la proporción de los colegios
   medidos con puerta o teléfono; de los colegios sin encuestas no se afirma nada (la frase no puede
   cubrirlos), y repartir las 60 es la decisión de cubrir más colegios o medir mejor cada uno; (b) se
   califica lo razonado con tus datos, no lo que muestre el censo, y la consecuencia distingue «tu método
   dejó gente afuera» (sesgo) de «te tocó una muestra rara» (error muestral, que así queda jugado); (c)
   «sube o baja» sólo puntúa junto con una colocación coherente con esa dirección.

7. **El Tema 6 vuelve a calcular los Temas 3 y 4.** **Qué pasa:** «los estadísticos los escribes tú, desde
   los datos», para cada variable del informe: otra vez medias, desviaciones, porcentajes y r, en la pieza
   más larga, al final. **Por qué importa:** «un concepto, un solo lugar» (§21) y cansancio justo antes del
   cierre; lo propio del Tema 6 es qué estadístico y qué gráfico corresponde, en qué orden, cómo se dice y
   qué limitación se nombra. **Propuesta:** el archivo de pruebas trae los estadísticos ya calculados,
   **algunos mal elegidos para su variable** (la media de una ordinal, una torta con doce sectores), y tú
   escribes sólo lo que la repregunta ataca (el n de la muestra, el R² de la frase).

8. **Carga de escritura en el celular (2A).** **Qué pasa:** n, h, N y H por fila, más k, amplitud, límites y
   umbral: unos 30 campos con el teclado del teléfono. **Propuesta:** escribes lo que decide (el umbral, k,
   la amplitud, los primeros límites y una o dos filas que el juego elige por versión); el resto de la
   tabla se llena desde tus paredes. Como criterio de toda ficha: contar los campos que se escriben.

9. **Lo que da ganas de seguir sigue sin forma.** **Qué pasa:** §R2.6 punto 9 lo da por tomado («la gente
   que alcanzaste queda en la ciudad»), pero no dice cómo se ve. **Propuesta, barata:** cada lugar del mapa
   guarda a la gente de su pedido, tocable, con la línea de lo que le pasó, y se enciende cuando cierras su
   pedido. Lo detalla la progresión; la maqueta sólo tiene que decirlo en una línea.

**Menores:**

10. **La ronda 1 sigue diciendo lo contrario, y el director la va a leer.** El gancho y el género del marco A
    (§4) venden la niebla en toda la ciudad, «horas de psicólogo», el mapa «que se mueve con el dedo» y «el
    mapa guarda las nubes»; §7 y §8 parten el Tema 4 en dos. **Propuesta:** una línea al inicio de §4, §7 y
    §8 («donde contradiga a la ronda 2, manda la ronda 2») y el gancho y el género del juego entero en
    §R2.1, sin la niebla como marco.
11. **El hub tiene unos ocho lugares y el Tema 1 necesita ocho colegios.** Decir que el Tema 1 se abre en
    su propia pantalla (la zona de los colegios) desde el hub.
12. **D6 §6.3 es a la vez la página recomendada para r y una de las prohibidas** («la motivación explica el
    42 %»). El escalón «a leer» manda a la fórmula o al ejemplo de r, con su página, no a la sección entera.
13. **«La fila en la puerta» (2A) se parece a la cola de clientes de La ventanilla.** Dibujar la
    consecuencia de otra forma (la sala de espera vista desde arriba, la agenda del médico), nunca gente en
    fila ante un mostrador.
14. **Un tema con dos juegos entrega una nota sobre 100:** que la progresión diga cómo, sin preguntarle a
    Ronald un reparto.
15. **Redibujos y tablas que calculan solos.** En 4A, «tocar una fila la vuelve el 100 %» marca el total,
    pero no muestra los porcentajes: los escribes tú. Los gráficos que se redibujan con tu número (2A, 2B,
    3B) muestran si alguien queda afuera, no el valor correcto: se califica el valor exacto. En 4B, decir
    qué se decide cuando la nube es curva (hoy se mira y no pasa nada).

### Los arreglos de la v7: ¿resueltos o sólo nombrados?

| v7 | Cómo quedó |
|---|---|
| 2. Sesgo en un solo sentido | Resuelto en el Tema 1; falta separar colegios sin datos de colegios medidos con sesgo (hallazgo 6) |
| 3. Frase obvia | Resuelto en el Tema 1; en 4B a medias (ordenanza siempre inválida) y en el 5 sin tratar (hallazgo 5) |
| 4. Número de peaje | Resuelto en el Tema 1; quedan en 2A, 2B, 3A y 4B (hallazgo 2) |
| 5 y 6. Cinco juegos en el Tema 1; demasiadas modalidades | Resueltos |
| 7. Personas que regalan la respuesta | Resuelto como regla |
| 8. Tanteo con la revelación | Resuelto en el diseño; el motor no lo tiene (hallazgo 4) |
| 9. Ganas de seguir | Sólo nombrado (hallazgo 9) |
| 10. Copia | Resuelto: varía todo lo que cuenta; el orden del informe pesa poco y se dice |
| 11. Mapa que se arrastra | Resuelto |
| 12 y 13. Páginas del dossier; orden de dictado | Resueltos por Ronald; un detalle en el hallazgo 12 |
| 14. Parecidos | Resuelto, salvo la fila (hallazgo 13) |

### Los tres alumnos, en corto

- **El que sabe:** disfruta el 1, el 3A (error o persona real), el 4B (el punto suelto y para qué sirve r),
  el 5 y la audiencia. En el 2A llena treinta casillas; en el 3B y el 4A termina sin haber decidido nada;
  en el 6 vuelve a calcular lo del 3 y el 4.
- **El que no sabe:** en el 1 ve que su método dejó gente afuera, pero si el censo le muestra un error por
  azar no sabe si fue culpa suya (hallazgo 6). En el 4A, si lee bien el pedido, el pedido le dice el
  denominador: aprende a leer, no a condicionar (hallazgo 3).
- **El que quiere terminar rápido:** con calculadora y escalera pasa los números; «nunca firmes la
  ordenanza» y «la carta prudente» le dan puntos sin entender (hallazgo 5); «sube o baja» al azar acierta
  la mitad (hallazgo 6). Lo demás lo frena.

**No tocar:** un solo juego en el Tema 1, con la niebla sólo ahí; el sesgo en los dos sentidos; error o
persona real en 3A y 4B; la condicionada una sola vez, en el 4A; las pruebas tentadoras a veces válidas
del Tema 6; el mapa fijo que se toca; los puntos de control; «se califica lo firmado antes de la
consecuencia».

### Lista de salida del crítico (v8)

| Regla | ✔/✘ | Dónde se ve |
|---|---|---|
| 1. Tres alumnos | ✔ | «Los tres alumnos» |
| 2. ¿Divertido? ¿monótono o sin marco? | ✔ | Veredicto; hallazgos 3 y 9 |
| 3. Contra la visión y los pedidos (cuestionario, elige en vez de calcular, se ve antes) | ✔ | Hallazgos 2, 3 y 5 (`01-vision.md` de esta isla todavía no existe) |
| 4. Contra el aprendizaje (ganar sin entender, pista, registro) | ✔ | Hallazgos 1, 6 y 7 |
| 5. Contra la realidad (celular, conexión, una persona, retomar) | ✔ | Hallazgos 4 y 8 |
| 6. Estrategia dominante, patrón, peaje, frase obvia; cuidado con el propio arreglo | ✔ | Hallazgos 2, 5 y 6; ninguna propuesta lleva la niebla ni otra mecánica a otro tema; el 5a corrige un arreglo mío de la v7 |
| 7. Orden real de dictado | ✔ | Comprobado T1 → T6 con el 4 antes del 5: sin hallazgo |
| 8. Coherencia con el dossier que se manda a leer | ✔ | Hallazgo 12 |
| 9. Tanteo | ✔ | Hallazgos 4, 6 y 15 |
| 10. Lo prometido contra lo que existe | ✔ | Hallazgo 4, contra el código |
| 11. ¿Se puede copiar?, parte por parte | ✔ | Tabla de arreglos, fila 10: sin hallazgo nuevo |
| 12. Revisar lo jugable | No aplica | Nada construido de esta isla |
| 13. ¿Otro juego? ¿se reutilizó bien? | ✔ | Hallazgos 13 (la fila) y 4 (guardado copiado en dos escenas) |
| Ronald decide; lo aprobado no se reabre | ✔ | Ninguna decisión suya se reabre; nada estaba APROBADO; ninguna pregunta nueva |
| Lee antes de proponer | ✔ | «Qué se revisó» |
| Lo que Ronald ya dijo (no cuestionario, escribe el número, primero se ve) | ✔ | Hallazgos 2, 3 y 15 |
| Juego con sabor a la materia | ✔ | Veredicto; hallazgo 3 |
| Un juego por materia y por carrera; motor común «como Doom» | ✔ | Hallazgos 4 y 13 |
| Lo que cuenta para la nota no se puede copiar | ✔ | Regla 11 |
| Individual, sobre 100, sin reparto | ✔ | Hallazgo 14 (no se propone reparto) |
| El juego no es una lección | ✔ | Toda propuesta es una decisión con consecuencia; ninguna explica |
| Todos los agentes en su etapa; sin idas y vueltas | ✔ | Revisión única antes de Ronald; corrige el adaptador |
| Aspecto con bocetos | ✔ | Hallazgos 10, 11 y 13 son para que el director no dibuje lo reemplazado |
| Cómo llega el alumno | ✔ | Sin cambios |
| Marco fijo, modalidad variable; el marco es el mundo | ✔ | Cada propuesta queda dentro de la modalidad de su tema; que un tema no use la niebla no se anotó |
| Cómo se planifica (diseño inverso, arco, escalera, contraste, lo que responde el dossier) | ✔ | Hallazgos 1 y 4 |
| Lo que Ronald decide se vuelve regla | ✔ | No hubo decisión nueva |
| Por temas, sin tiempo | ✔ | Sin plazos ni duraciones |
| Primero la maqueta; lo que un tema posterior profundiza se juega allá | ✔ | Hallazgos 1 y 7 |
| Estructura escalable | ✔ | Hallazgo 4: lo copiado pasa al motor |
| Web y Android por igual | ✔ | Hallazgos 4 y 8 |
| Un tema a la vez | ✔ | La versión mínima sigue siendo el Tema 1 |
| Lista de salida; nada llega a Ronald sin el crítico | ✔ | Esta lista; la del adaptador, comprobada arriba |
| Términos técnicos explicados | ✔ | Los que uso ya están explicados en el documento revisado |
| Tuteo, sin guiones largos, castellano neutro | ✔ | Sin guiones largos en esta entrada |
| Realista con el tamaño | ✔ | Hallazgos 4 y 8 |
| Escribir en su archivo con versión, fecha y pendientes | ✔ | Encabezado v8 y «Decisiones pendientes» |

---

## 28-09-2026 · Psicoestadística Descriptiva (Psicología), marco A «El Observatorio»: ¿es un juego? (papel)

**Qué se revisó.** El marco elegido por Ronald (A con las personas con nombre de B) en
`00-adaptacion-psicoestadistica-descriptiva-psicologia.md` (ronda 1: §3 modalidades, §4 marco A, §6
comprobaciones, §7 maqueta) y los bocetos `bocetos/psicoestadistica-psicologia-A.html` (y `-B.html` por
las personas), contra IDEA-JUEGO §9 a §21 y `PIEZAS-COMUNES.md`. No hay nada construido de esta isla: todo
lo que la propuesta da por hecho (estadística con pruebas, población con semilla, gráficos desde datos,
mapa) es trabajo, no hecho. La pregunta de Ronald: *«¿estás seguro que es un juego, no sólo un
cuestionario bonito?»*.

**Veredicto.** **En el Tema 1 sí es un juego:** apuestas sin ver toda la ciudad y la ciudad te muestra
después en qué te equivocaste; eso no se puede hacer en un cuestionario. **Del Tema 2 al 6, tal como está
escrito, es sobre todo llenar números con el mapa de fondo y, al final, elegir la frase prudente entre
dos:** un cuestionario bonito en varios tramos. Se arregla sin cambiar la elección de Ronald (hallazgos 1
a 4), y la maqueta todavía no aplica la regla del 28-09 (hallazgo 5).

### Hallazgos, de más grave a menos grave

1. **La niebla sólo juega en el Tema 1, y el censo la gasta ahí mismo.** **Qué pasa:** el «Dos minutos
   jugados» dice que al llegar el censo «la niebla se levanta de toda la ciudad»; §4 dice que «el mapa
   guarda las nubes de los colegios que nunca miraste». Las dos no pueden ser. Si el censo destapa todo, del
   Tema 2 en adelante no queda niebla. Y aunque quedara: en el Tema 2 los datos son los registros completos
   del centro de salud, en el 5 un tamizaje, en el 6 un informe; nada se decide sobre el mapa. El propio
   director lo vio en el boceto del Tema 4 («el mapa queda de adorno»). **Por qué importa:** el marco que
   Ronald eligió es el mapa; si el mapa no decide nada del Tema 2 en adelante, lo que queda son pantallas de
   cálculo, que es justo lo que Ronald teme. **Propuesta:** **niebla por capas**: cada pedido es otra
   pregunta sobre la ciudad (sueño, estrés en el mercado, lectura, espera en el centro de salud). Los
   lugares que ya conoces se ven, pero lo que el pedido pregunta vuelve a estar tapado hasta que lo mides.
   Y en cada tema, una **decisión que se pone en el mapa** y un **«meses después» que se ve en el mapa**:

   | Tema | Qué pones en el mapa | Qué muestra el «meses después» |
   |---|---|---|
   | 1 | Dónde encuestas y dónde van los talleres | El censo escolar, sólo de la capa «sueño» |
   | 2 | Camas o turnos del centro de salud; el presupuesto por motivo (Pareto) | La fila en la puerta del centro de salud: quién esperó y por qué motivo |
   | 3 | Taller grupal o especialista en cada barrio | Quién mejoró y quién quedó sin atender en cada barrio |
   | 4a | La brigada en un turno o puesto del mercado | El estrés del mercado, por turno |
   | 5 | A quiénes evalúa la única evaluadora y qué carta recibe cada familia | Qué niños tenían el trastorno y cuáles quedaron con la etiqueta |
   | 4b | A quién buscas con el dato (válido) y si firmas la ordenanza (no) | El sueño del barrio al año siguiente; los cupos que faltaron en el barrio fuera de rango |
   | 6 y Audiencia | Nada: la ciudad es tu evidencia | Te repreguntan por lo que la ciudad mostró |

   Donde no haya decisión en el mapa (6), se dice, y el mapa es el archivo de la evidencia, no un menú.

2. **Estrategia dominante nacida del marco: «lo que no viste siempre está peor».** **Qué pasa:** en el
   ejemplo, el censo castiga a los colegios sin lista. Si la revelación siempre muestra que lo no medido
   estaba peor (y es lo que hace falta para que la lección «golpee»), el alumno que quiere terminar rápido
   aprende en el primer pedido a poner la ayuda donde hay niebla, sin razonar el sesgo. **Por qué
   importa:** el dossier pide saber **hacia dónde** sesga (sube o baja, D1 §1.3), y así el juego premia una
   regla fija. Es la lección de AIEF del 26-09 (rechazar a todos). **Propuesta:** en la mitad de las
   versiones, el grupo que la muestra deja afuera **está mejor** (por ejemplo, la encuesta en la puerta a
   las once pesca a los que llegan tarde porque durmieron mal: la muestra exagera y lo no visto está mejor).
   La pista para saber hacia dónde está en el mundo: **quién quedó afuera y por qué** (hallazgo 7). Lo que
   se califica: el alumno escribe la dirección del sesgo y pone la ayuda de acuerdo con ella. Prueba del
   perezoso: «siempre a la niebla» y «siempre a lo medido» pierden en la mitad de las versiones.

3. **Decidir entre dos frases es una pregunta de opción múltiple con la respuesta obvia.** **Qué pasa:** en
   el boceto del Tema 4 la decisión son dos botones: «la pantalla les quita el sueño» o «van juntas; con
   esto no se sabe si una causa la otra». Cualquiera elige la segunda sin mirar la nube ni calcular r. El
   mismo documento lo anticipa (§6.1, «firmar siempre la frase prudente… no decide nada») pero el boceto no
   lo resuelve. Además choca con «el alumno escribe, no elige». **Por qué importa:** es el momento que
   enseña «correlación no es causa», y así se gana sin entenderlo. **Propuesta:** que el **mismo r** se use
   dos veces y empuje en los dos sentidos: (a) **para buscar a quién ayudar** (quien usa mucha pantalla
   probablemente duerme poco: buscarlo ahí es válido, y si te niegas a usar el dato, la brigada no los
   encuentra); (b) **para decidir qué cambiar** (la ordenanza: no válido; si la firmas, al año siguiente
   el sueño está igual). La frase, cuando haga falta, se **arma con piezas** (de quiénes, cuántos, qué
   verbo: «van juntas», «causa», «explica») que cambian con la versión; nunca dos botones.

4. **En el Tema 1, el número que escribes no cambia lo que pasa.** **Qué pasa:** escribes 0,35 (21 de 60)
   y después pones los talleres; lo que decide si aciertas es cómo muestreaste, no el número. El cálculo es
   un peaje antes de la decisión. **Por qué importa:** es la diferencia entre juego y cuestionario con
   dibujos: en AIEF se corrigió igual («calcular la consecuencia», IDEA-JUEGO §8.2). **Propuesta:** que el
   alumno calcule la proporción **por colegio medido** (una tablita chica) y que ese número ordene dónde van
   los talleres entre lo que viste; y que para lo que no viste decida con la dirección del sesgo
   (hallazgo 2). Del Tema 2 al 5 el número sí alimenta la decisión (umbral y camas, s y a qué barrio, el
   porcentaje por fila y el turno, el VPP y a quién se evalúa): conservarlo.

5. **La maqueta no aplica la regla del 28-09: el Tema 1 sigue con cinco juegos.** **Qué pasa:** §7.2 le da
   al Tema 1 la encuesta y el censo, las denuncias de acoso, el gráfico de la concejala, los diez peores y la
   clasificación de columnas. **Por qué importa:** Ronald ya lo dijo de esta misma ronda: «abarca mucho y
   aprieta poco». **Propuesta** (dónde se juega cada subtema; lo confirma el adaptador en la ronda 2):

   | Subtema del Tema 1 | Dónde se juega |
   |---|---|
   | 1.3 muestra y sesgos, 1.5 la frase que se sostiene | **Tema 1: su único juego** (la encuesta con niebla) |
   | 1.6 niveles de medición | Tema 2: primer paso de ordenar la pila (el nivel decide la tabla y el gráfico); el «colegio promedio 3,4» cabe ahí o en el Tema 3 |
   | 1.7 gráficos y eje truncado | Tema 2.3 y 2.4, junto con el pictograma engañoso (el gráfico de la concejala se rehace ahí) |
   | 1.2 y 1.8 indicador y fenómeno (las denuncias) | Tema 6: una repregunta de limitaciones («¿qué mide tu indicador?»); si no calza, dossier |
   | 1.1 y 1.4 grupo de control, regresión a la media | Ningún tema posterior lo profundiza. Recomendado: repregunta de la Audiencia («¿contra qué lo comparas?»). Alternativa: sólo dossier |
   | 1.1 historia, campos de la psicología | Dossier |

   Además, la versión mínima jugable queda en un tamaño que una persona puede construir y probar.

6. **Demasiadas modalidades, y algunas repetidas.** **Qué pasa:** §3 tiene unas 22 modalidades distintas
   para seis temas; cada una es otra pantalla que construir (armar tabla, paredes, ojiva, Pareto, caja,
   nube, árbol…). Y hay dobles: la condicionada se juega en 4.2 y en 5.2 («la misma lógica que 4.2»); la
   repregunta se juega en 6.2 y 6.3, en 6.4 y en la Audiencia final. **Por qué importa:** el riesgo de «tan
   variado que parecen juegos distintos», el costo para una persona, y la regla «un concepto, un solo
   lugar». **Propuesta:** uno o dos juegos por tema; lo demás son **pasos del mismo pedido** (Tema 2: tabla,
   paredes y ojiva son tres pasos de la misma pila, no tres juegos). La condicionada se juega en el tema que
   se dicte primero (4a o 5; depende del dato que se le pide a Ronald) y el otro la usa. El Tema 6 y la
   Audiencia son **una sola pieza** con repreguntas.

7. **Las personas con nombre pueden regalar la respuesta o quedar de adorno.** **Qué pasa:** la línea de
   ejemplo que eligió Ronald («trabaja en el mercado y por eso no estaba en la encuesta») es la conclusión
   del sesgo. Si se lee antes de decidir, la dice por el alumno; si nadie la toca, es decoración. **Por qué
   importa:** es lo que Ronald tomó de B para que el número tenga cara. **Propuesta:** dos tipos de línea.
   **Antes de decidir, una pista, no una conclusión** («sale del puesto a la una y entra al colegio a las
   dos»; «en su casa no hay teléfono»). **Después del «meses después», la consecuencia** («no le llegó el
   taller»; «quedó con la etiqueta»). Las líneas salen de plantillas con la semilla de la versión (como las
   caras que salen del nombre), así no hay elenco fijo ni texto a mano por persona, y cambian de un alumno
   a otro. Algunas personas vuelven en temas siguientes (la chica del turno tarde reaparece en el mercado):
   da hilo sin encadenar números.

8. **Tanteo con la revelación.** **Qué pasa:** el censo muestra la respuesta. Si el alumno puede volver al
   mismo pedido con la misma versión (o cerrar y reabrir antes de que se guarde), repite ajustando sin
   razonar. **Propuesta:** lo que se califica es lo firmado **antes** de la revelación, y se guarda en ese
   momento; un nuevo intento después de ver el censo es **otra ciudad** (el escalón «otros números», que el
   documento ya llama «otro pedido, en otro barrio»). Ninguna línea de persona ni capa del mapa se destapa
   antes de firmar.

9. **¿Qué da ganas de seguir?** **Qué pasa:** §4 dice que la progresión es «la gente que tu trabajo
   alcanzó», pero no dice cómo se ve, y del Tema 2 en adelante nada se suma al mapa. **Propuesta, barata:**
   una capa del mapa que se queda de un tema a otro con **la gente que alcanzaste y la que no** (sólo
   historia, no cuenta para la nota ni pasa números al tema siguiente), y que cada revelación deje una
   pregunta abierta que es el pedido siguiente («¿y en el mercado?»). No son puntos: es la ciudad.

10. **¿Se puede copiar?, parte por parte.** Los números de los Temas 2 a 5 salen de la versión: bien. **Se
    copia:** (a) en el Tema 1, «pon los talleres donde hay niebla» si no se aplica el hallazgo 2; (b) la
    clasificación de columnas si las columnas son siempre las mismas (horas de sueño, turno, colegio,
    escala 1 a 5): que salgan de un repertorio por versión; (c) el orden del informe del Tema 6 (muestra,
    una variable, dos variables) es igual para todos: que varíe la pregunta del informe, y con ella qué
    evidencia la responde, o que esa parte pese poco y se diga en la ficha; (d) las frases de dos botones
    (hallazgo 3).

11. **Celular y costo del mapa.** **Qué pasa:** §4 pide un mapa por barrios «que se mueve con el dedo» y el
    boceto dice «arrastras tus 60 encuestas sobre el mapa». Arrastrar en un celular pelea con el
    desplazamiento de la página y es lo más caro del arte. **Propuesta:** un **mapa fijo que entra en la
    pantalla** (ocho lugares en grilla, como ya dibuja el boceto), sin desplazarlo; las encuestas se asignan
    tocando un lugar (de a 10), no arrastrando. La población con semilla se genera en el teléfono, así que
    sin conexión se juega igual; eso está bien pensado.

12. **Páginas del dossier que contradicen el juego** (la escalera manda a leer). El adaptador ya las halló
    (§1.4, puntos 2, 3 y 5); aquí sólo importa adónde manda el escalón «a leer»: Sturges «impar» en la
    definición de D2 §2.2 (el juego pide el entero más cercano), la covarianza con N en D4 §4.4 junto a la
    s con n − 1 de D3 §3.2 (da un r que no es el de Pearson) y «R² explica» en D4 §4.5 y D6 §6.3.
    **Propuesta:** mandar a los ejemplos de D2 §2.2, a D6 §6.3 para r y al recuadro «Qué NO» de D4 §4.5; y
    que Ronald corrija esas frases cuando vuelva a tocar los dossiers (pendiente arriba).

13. **Orden de dictado supuesto.** §6.2 toma como supuesto «T4 partido y T5 antes de T4b». Por la regla del
    28-09 es un dato: se le pregunta a Ronald aparte, en una línea (pendiente arriba), antes de que la ronda
    2 fije las piezas.

14. **Parecidos (punto 13).** Nada de AIEF ni de Proyectos II. Dos cuidados: el tamizaje del Tema 5 comparte
    concepto con el del Aula de Probabilidad (PHQ-9 en una universidad); está bien mientras el juego no use
    universidad, PHQ-9 ni frases del Aula. Y el «meses después» no se dibuja con un calendario (es pieza de
    AIEF): aquí es la niebla que se va.

### Los tres alumnos, en corto

- **El que sabe (Tema 1 y Tema 4 del boceto):** disfruta la apuesta del Tema 1 y la revelación; en el Tema
  4 calcula r, toca el punto suelto y después elige una frase que habría elegido sin calcular. Se aburre
  en el 4.
- **El que no sabe:** en el Tema 1 se equivoca, ve el censo y entiende que su muestra dejó gente afuera;
  eso enseña. Pero con el ejemplo actual aprende «la niebla está peor», no «este grupo faltó por esto y
  empuja hacia acá» (hallazgo 2).
- **El que quiere terminar rápido:** escribe los números con la escalera, pone la ayuda donde hay niebla y
  firma siempre la frase prudente. Hoy, con eso, pasa casi todo. Con los hallazgos 2, 3 y 8, no.

**No tocar:** la niebla y el censo como juego del Tema 1 (es la forma exacta de muestra y población); tocar
el punto suelto de la nube y ver quién es antes de calcular (Tema 4, «primero se mira»); los dos barrios con
la misma media (Tema 3); el tamizaje con una sola evaluadora (Tema 5); los puntos de control por tema; las
decisiones del §1.4 sobre qué fórmula pide el juego.

---

## 28-09-2026 · AIEF Tema 1 «La ventanilla»: revisión de lo jugable (etapa 7)

**Qué se revisó.** El código construido (commit `fa90763`): `src/lib/juego/aief/tema1.ts`,
`guion-tema1.ts`, `src/app/juego-aief/EscenaVentanilla.tsx`, `tema1.test.ts`, contra `02` B2.10 puntos 1
a 13. Lo jugué leyendo el código con la versión 0 (el ejemplo, que ya se probó en 375×812) y razonando el
sorteo de las versiones 417 y 5 (no ejecuté código: las cifras exactas de esas dos no se comprobaron aquí).

**Veredicto.** Los 13 puntos están, con dos faltas parciales (1 bis y 12, abajo). El diseño se sostiene
en el código: ningún ✔ de decisiones antes del cierre, escalón (d) en NC y valor de hoy, 1.3 siempre
contraoferta con los perezosos probados en las 999 versiones, el par «una se queda, una se devuelve»
con la prueba de que ningún dictamen repetido gana la jornada. Se lee como juego: nadie explica y cada
error es algo que le pasa a alguien. **Hay tres defectos que conviene arreglar antes de que Ronald lo
pruebe** (1 a 3; los tres son baratos) y el resto puede esperar a los puntos 14 a 16.

### Arreglar antes de que Ronald lo pruebe

1. **Una ficha del cierre enseña lo contrario** (grave, texto). **Qué pasa:** norma bien + defecto de
   mejora (lo correcto es aceptar con observación) y el alumno devuelve: `finalT12` da
   `devolvio-uno-bueno` y `queFuePaso` escribe «No había por qué devolverlo ni observarlo». Observarlo era
   justo lo que tocaba. **Por qué importa:** es la carpeta del cruce que el tema quiere enseñar, y la
   consecuencia le dice al alumno que la regla está mal. **Propuesta:** para ese caso, una línea propia:
   «No había por qué devolverlo. Se molestó y se fue enfrente.» (dejar la actual sólo para el sano), y
   una prueba que recorra las 5 formas × 3 dictámenes y compruebe que ninguna línea contradice el
   dictamen correcto.
2. **«El cliente se fue» aparece en el cliente siguiente** (bug de pantalla). **Qué pasa:** al cuarto
   fallo se llama `setAviso(g.SE_FUE)`, pero el aviso no se borra al cambiar de carpeta (el efecto de
   `clavePaso` borra texto y pista, no el aviso). Si se va el segundo cliente de 1.2, la frase «El cliente
   se fue sin respuesta» sale arriba del campo del cliente de 1.3, que recién llega. **Propuesta:**
   mostrar la salida como un momento propio (la frase y «SEGUIR ▶», con el nombre de quien se fue) y
   borrar el aviso al cambiar de carpeta.
3. **El botón que manda la NC se llama «BUSCAR EN EL MANUAL ✔»** (al lado de «📖 MANUAL»). **Qué pasa:**
   quien lo toca para abrir el manual con un número tentativo escrito gasta un intento, y con el escalón
   (d) cuatro intentos hacen que el cliente se vaya. **Propuesta:** «ANOTAR LA NC ✔».

### Puede esperar (puntos 14 a 16 o antes de que cuente para la nota)

4. **Tanteo en los repasos de 1.2.** La jornada está cerrada, pero el repaso trae **una** carpeta y los
   repasos no tienen tope: «aceptar + nada que observar» siempre acierta la forma «bien y sano» (1 de 4
   repasos), así que el que quiere terminar sin pensar aprueba en unos cuatro repasos, siempre que
   acierte la NC (y la NC se busca en el manual). **Propuesta (recomendada):** que el repaso de 1.2
   traiga también el par (una se queda, una se devuelve); la prueba que ya existe lo deja en 0 %. Cuesta
   una carpeta más por repaso. Alternativa: que la nota cuente los repasos (queda en `04` A2.5 y en el
   punto 16).
5. **Punto 1 bis a medias.** Está: sin cuenta, siempre la versión 0 rotulada «no cuenta para la nota»;
   con cuenta, sin número a la vista; la versión 0 nunca se sube. **Falta:** `#v=N` para la cuenta de
   docente (hoy Ronald no puede abrir la versión de un alumno) y la marca de cuenta en la partida local.
   Además, el guardado en la nube es un `upsert`: si el alumno abre sin red un celular con una partida
   local vieja y juega un paso, al volver la red esa partida corta **pisa** la más avanzada que hizo en
   otro equipo. **Propuesta:** subir sólo si la local tiene al menos tantos eventos como la de la nube (o
   unir por hora), con prueba. Entra con el punto 15.
6. **Toques sin vuelta atrás en 1.2.** El sello de calidad (7 botones en grilla) y el dictamen se
   registran al primer toque; en 1.1 hay «CAMBIAR EL SELLO», aquí no. Un dedo que se resbala cuesta un
   repaso. **Propuesta:** elegir sello y dictamen y firmar con un botón aparte (sigue sin ✔). Punto 15.
7. **Celular (punto 15, ya previsto):** el manual es una sección debajo del diálogo, no una hoja
   inferior, y el botón atrás sale del juego en vez de cerrarlo; al pasar a la segunda carpeta de 1.2 el
   campo toma el foco y en Android el teclado tapa la carpeta; el chip de arriba explica «entra con tu
   cuenta» sólo al pasar el mouse (`title`).
8. **Redacciones que repiten el título de su NC** (punto 14): «Ajustó todo el balance por inflación»
   (NC 3, «ajuste por inflación») y «Un perito revalorizó la maquinaria» (NC 4, «Revalorización técnica»,
   y es la del ejemplo). Buscan por palabra, no por idea. El comentario de `Operacion.redacciones` dice
   que ninguna repite el título: no es cierto.
9. **Menores del plan:** la práctica del carpintero no tiene las dos barras (B2.3 c, «si alcanza»); Doña
   Teresa no dice la regla del monto en la Llegada (está en el manual, que se abre solo). No bloquean.

### ¿Se puede copiar?

- **1.2 y 1.3:** no. Operación, redacción, norma citada, papel, orden y todas las cifras de 1.3 salen de
  la versión; dos compañeros comparan y sus respuestas no coinciden. Con 40 alumnos puede tocar una
  versión repetida (la prueba de `version-alumno` admite hasta dos coincidencias): riesgo chico, se
  acepta.
- **1.1:** los nombres y el orden se sortean, pero cada frase (15 en total) delata su rol, así que una
  lista «si dice esto, tal sello y tal hoja» sirve para todos. Es aprender el Cuadro 1 de memoria y 1.1
  pesa poco; se acepta como está y se dice en la ficha. Más frases por rol (punto 14) lo diluyen.

### Los tres alumnos, en corto (versión 0)

- **El que sabe:** pasa todo en una jornada; en el carpintero usa la regla de ayer, sale gris y ve cuánto
  le prestó la cooperativa: es el momento que enseña, funciona.
- **El que no sabe:** en 1.2 encuentra la NC recorriendo los títulos (fácil en el ejemplo, por el
  hallazgo 8), aprende el pagaré por la práctica y cae en el cruce «norma mal con defecto de mejora» si
  no abre la página «Calidad»; ahí es donde el hallazgo 1 le daría la lección equivocada.
- **El que quiere terminar rápido:** en 1.1 no hay atajo (cada falla trae otra persona); en 1.3 ningún
  número fijo gana; en 1.2 el único atajo es el del hallazgo 4.

**No tocar:** las prácticas con «se adelanta el tiempo» (se leen como juego, no como escena), la línea
del carpintero con la cifra de la cooperativa, el registro sin ✔ en decisiones, `t13Valida` y la prueba
de que ningún dictamen repetido gana la jornada.

---

## 27-09-2026 · AIEF Tema 1, versión 2: revisión del papel (etapa 5)

**Qué se revisó.** `04` «AIEF · Tema 1 · versión 2» (A2.1 a A2.10), `02` «Tema 1 · versión 2» (B2.1 a
B2.11), `05` «Tema 1 · versión 2» (N2.1 a N2.9), contra mis 8 imprescindibles de la entrada de abajo, la
maqueta (`00` R3.2) y las reglas del 27-09. Para lo que el papel da por hecho miré el código de hoy:
`EscenaVentanilla.tsx` (cómo elige la versión), `version-alumno.ts`, `ventanilla.ts` y `guion-tema1.ts`
(`valorDelCliente`). Es revisión de papel: la v2 todavía no está construida.

**Veredicto.** Las tres partes son coherentes entre sí y la v2 hace lo que Ronald pidió: **se aprende por
consecuencia y no hay lección** (cada cosa que se agrega es una línea de hecho o una regla, nunca un
porqué). Siete de los ocho imprescindibles quedan resueltos en el papel; el 7 queda a medias. Aparecen
**un hueco grave que ninguna parte vio** (hallazgo 1, en el código de hoy) y dos de texto (2 y 3).

### Respuestas a lo pedido, en corto

1. **Imprescindibles.** 1 (1.3 siempre contraoferta, valor de hoy múltiplo de 500): sí. 2 (regla del monto
   en el manual): sí. 3 (NC con escalón d): sí, y en la práctica se cierra el campo sin dar el número. 4 (sin
   ✔ antes del cierre): sí. 5 (1.2 sin delatores): sí. 6 (par «una se queda, una se devuelve», sello que
   cuenta y nombrado al cierre, fuera el papel 2): sí, pero falta el texto del manual que lo hace jugable
   (hallazgo 2). 7 (1.1 con nombres sorteados, cinco hojas, inversionista reescrito): **a medias**, la frase
   reescrita apunta a otra hoja (hallazgo 3). 8 (semilla propia y generación guardada): sí, primero en B2.10.
2. **Coherencia.** Las tres partes cuentan la misma jornada con el mismo orden y los mismos pesos. Los dos
   puntos donde `05` se aparta de `02` **están bien y valen los de `05`**: «Déjala por hoy» es mejor que
   «Mira el resto de la carpeta» (esa frase señalaba el pagaré antes de firmar); y la carpeta con nota de
   1.3 con otro rubro es lo que ya pedía `04` A2.2. Con la maqueta: nada de lo aprobado cambia de lugar,
   pero la sierra de Don Julio (`00` R3.2) pasa a ser sólo la práctica: va en el plan simple como cambio,
   en una línea (hallazgo 8).
3. **¿Se aprende sin lección?** Sí. Las tres prácticas son decidir, un toque y una línea de hecho («No
   pagó», «Se fue enfrente»); ninguna pasa de dos líneas. La línea gris con el monto T de la cooperativa
   **enseña y no regala**: deja ver que por la misma sierra alguien prestó más, y sus números no sirven para
   la carpeta con nota. Recomiendo dejarla con la cifra. La línea de hombros de Doña Nieves se lee como
   personaje, no como explicación. **Saltar una práctica** no se puede (son paso obligado), pero se puede
   pasar a toques sin pensar; no cuesta puntos y la consecuencia se ve igual, así que no es trampa. **Explotar
   una práctica**, sólo por el hueco del hallazgo 1.
4. **¿Se puede copiar algo que dé puntos?** Valor de hoy, monto, dictamen y sello cambian por alumno: no se
   dictan. La NC y 1.1 dejan una «lista de claves» (alquiler → 10; «quiero saber si me cobra» → proveedor),
   pero esa lista **es** el concepto (una versión corta del manual y del Cuadro 1); con 20 y 15 puntos y la
   defensa preguntando con otra operación, se acepta. El copiado real es el del hallazgo 1.
5. **¿La jornada quedó corta?** Sí: del mismo largo que la v1 (unos 25 toques y 6 números en 375×812), con
   una línea de texto menos y varios párrafos menos. No crece.

### Hallazgos, de más grave a menos grave

**1. 🔴 Cualquiera puede jugar tu versión sin cuenta, ensayar las carpetas con nota y ver la pared.**
- *Qué pasa.* Sin sesión, `EscenaVentanilla.tsx` toma la versión de la dirección (`#v=N`, de 0 a 999), y
  con sesión la pantalla muestra «TUS DATOS: VERSIÓN N». Basta abrir `/juego-aief#v=N` en otra pestaña
  privada o en el celular de un compañero: se juegan **las mismas carpetas con nota**, se da vuelta la pared
  y se vuelve a la cuenta con todas las respuestas. Además, si ese ensayo quedó en el mismo navegador y la
  nube está vacía, `leerLocal(v)` lo sube como la partida del alumno.
- *Por qué importa.* Anula «la carpeta no se rehace», el escalón en que acertó (y con eso cualquier
  respuesta a la pregunta de A2.5) y la regla del 27-09 de que lo que da puntos no se copia: un compañero
  juega tu versión por ti. Ninguna parte del papel lo trata; la semilla propia (imprescindible 8) no lo
  arregla, porque el número igual se ve en pantalla.
- *Propuesta (recomendada, barata):* sin cuenta se juega **sólo la versión 0**, el caso de ejemplo sin nota
  (o una versión al azar que no se puede elegir); `#v=` queda sólo para la cuenta de Ronald; la pantalla
  del alumno no muestra el número de versión (va en la hoja de Ronald); y una partida local jugada sin
  cuenta nunca se sube a una cuenta. Suma un punto al principio de B2.10, junto con la semilla.

**2. 🟠 El manual no tiene el texto de la calidad: nadie le dice al alumno qué es «aceptar con observación».**
- *Qué pasa.* `04` A2.1 y A2.7 cuentan con una herramienta en el manual («los seis sellos en sus dos
  pisos» y «la tabla de dictámenes, regla del juego»), y la hoja de observación no dice qué característica es
  fundamental (B2.5). Pero `05` N2.4 sólo escribe tres líneas («La norma, en la operación marcada…», «como
  mucho un defecto») y ninguna parte escribe cuáles son los dos pisos ni cuándo se acepta con observación.
  La práctica del pagaré muestra una fundamental; **ninguna muestra una de mejora**. La primera vez que el
  alumno ve un defecto de mejora, cuenta, y la respuesta (aceptar con observación y no devolver) es una
  regla de la agencia que el dossier no trae.
- *Por qué importa.* Castiga al que sabe (quien leyó el dossier puede devolver un balance de julio con buena
  razón y sale gris) y vuelve azar 10 de los 20 puntos del dictamen.
- *Propuesta.* Narrativa escribe la hoja del manual, sin explicar: «Fundamentales: relevancia y
  representación fiel. De mejora: comparabilidad, verificabilidad, oportunidad y comprensibilidad. Norma
  mal o defecto fundamental: devuelve. Defecto de mejora con la norma bien: acepta con observación.»
  Marcada **regla del juego**. Aparece junto con la hoja de observación, después del pagaré.

**3. 🟠 1.1: la frase nueva del inversionista pide la hoja del empleado.**
- *Qué pasa.* «¿Fue suerte, o gana así todos los años?» pregunta si los resultados se sostienen: es la hoja
  «continuidad y resultados» (la del empleado), no «rentabilidad y patrimonio». Y «Gerencia 2» («somos dos
  para atender, no sé si nos alcanza para sumar a alguien») suena a capacidad de pagar un sueldo, no a
  «márgenes por línea». Sacar la hoja del banco resolvió el choque proveedor y banco, pero quedan cuatro
  hojas vecinas y las frases tienen que apuntar a una sola.
- *Por qué importa.* «Sello bien y hoja mal cuenta como falla»: con una frase que apunta a otra hoja, el que
  entiende falla. Es el imprescindible 7 a medias.
- *Propuesta.* Inversionista 2: «Puse dinero en la ferretería. ¿Cuánto me rinde lo que puse y cuánto vale
  hoy mi parte? De eso depende si pongo más.» Gerencia 2: «¿Qué nos deja más, los clavos o la pintura? Quiero
  saber qué traer más para diciembre.» Y una prueba de construcción: cada frase de 1.1 revisada contra la
  columna «Qué mira primero» del Cuadro 1, una sola hoja defendible por frase.

**4. 🟡 En el par de 1.2, la primera carpeta dice de qué lado cae la segunda.**
- *Qué pasa.* Como siempre es «una se queda, una se devuelve», quien está seguro de la primera sabe si la
  segunda se queda o se va. Si la primera se queda, la segunda es DEVOLVER en sus tres formas.
- *Por qué importa.* Regala hasta 5 puntos (un dictamen); la NC y el sello de la segunda siguen haciendo
  falta, y cualquier otro armado del par reabre «devolver siempre».
- *Propuesta.* Se acepta y se dice en la ficha (es el costo de cerrar la estrategia dominante). Si se
  quiere cerrar del todo: que el repaso de 1.2 traiga una carpeta sorteada sin pareja, y que la rúbrica de
  la defensa pida el dictamen de la segunda con su porqué.

**5. 🟡 Tres cabos del puntaje (A2.5).**
- Cuando la NC cae por el escalón (d), la carpeta entera se pierde: `02` B2.11 pidió una regla y `04` no la
  escribió. Propuesta: los tres ítems de esa carpeta se cuentan con el escalón de la carpeta de repaso donde
  salgan bien.
- A2.5 pone la calidad y medio dictamen en «1.3» (subtema del dossier) y `02` dice «la calidad pesa en 1.2»
  (parte del juego). No es un choque de fondo; basta decir en A2.5 que las etiquetas son del dossier.
- **Dato para la pregunta abierta (no la responde):** con el piso de 50, quien termina moliendo repasos
  (la NC probando cuatro números por carpeta, el valor de hoy siguiendo las pistas) llega a 50 sin entender;
  y sin descuento llega a 100. El registro guarda el escalón en los dos casos.

**6. 🟡 La tercera frase del cliente de 1.3 mezcla precio de venta con reexpresión.**
- *Qué pasa.* «Si hoy vendo mi [garantía] me pagan Bs C» afirma un precio de mercado real. Un alumno atento
  puede razonar que entonces el valor de hoy es C. (En el código, C = `valorDelCliente`, siempre mayor que el
  valor de hoy: no regala la respuesta, pero confunde la idea.)
- *Propuesta.* Cambiarla por algo que sea opinión del cliente: «Mi cuñado dice que hoy vale Bs C. Eso ya
  es ganancia, ¿no?».

**7. 🟡 Castellano neutro.** «Plata» por dinero en la frase del inversionista (`05` N2.3) y en la pista
concreta de 1.1 (N2.8 #5): va «dinero». «Don Rolando, cooperativa minera» en la agencia de Cliza choca con
el mismo motivo por el que `05` descartó la petrolera; alcanza con que diga de dónde viene («de Potosí,
cooperativa minera»).

**8. 🟡 Alineaciones de papel antes de construir.**
- `02` B2.3 (b) todavía dice «Mira el resto de la carpeta»: se construye con la línea de `05` N2.4.
- La sierra de Don Julio queda sólo en la práctica: se anota como adaptación en `00` R3.2 y va en el plan
  simple como cambio, en una línea.
- `04` A1.4 (40 % registro, 60 % defensa) y lo que `03` P3.3 herede de ahí quedan sin efecto por la regla
  del 27-09 (el juego entrega 100 por tema; la ponderación es de Ronald). Saqué la pregunta de mi lista.

### Los tres alumnos, en la v2 (versión 417 y 5, con las reglas del sorteo)

- **La que sabe:** en 1.1 acierta salvo con el inversionista de la frase nueva (hallazgo 3). En la práctica
  del pagaré puede caer como todos, y lo entiende en una línea. En 1.2 no sabe qué hacer con un defecto de
  mejora si el manual no lo dice (hallazgo 2). En 1.3 calcula y sale verde. Pasa con una jornada y un repaso.
- **El que no sabe:** las tres prácticas le muestran lo que tiene que mirar, y las pistas (a) le recuerdan
  la práctica. Es el camino que más mejoró frente a la v1.
- **El que quiere terminar rápido:** hoy su mejor jugada no está en la ventanilla sino fuera: abrir
  `#v=N` sin cuenta, ver la pared y volver (hallazgo 1). Cerrado eso, sólo le queda moler repasos, que el
  registro muestra.

### Lo que está bien y no conviene tocar

- El patrón práctica sin nota, consecuencia en el momento, una línea de la jefa, herramienta nueva.
- «Déjala por hoy» y el pagaré excluido de las carpetas con nota de la misma jornada.
- La línea gris con el monto T de la cooperativa.
- Sacar la línea escrita al cliente y pasarla a la defensa.
- El orden de recorte de A2.4 (nunca las prácticas de 1.2 y 1.3).

### Qué falta para mostrárselo a Ronald

**No está listo todavía.** Falta, en este orden:

1. Decidir y anotar en B2.10 que sin cuenta sólo se juega el ejemplo, sin número de versión a la vista
   (hallazgo 1).
2. El texto de la hoja del manual de calidad, con los dos pisos y los tres dictámenes (hallazgo 2).
3. Las frases de inversionista 2 y gerencia 2 reescritas, con la prueba de «una sola hoja por frase»
   (hallazgo 3).

Con esos tres, **listo para mostrarle a Ronald**, con la pregunta de A2.5 como única pregunta. Lo demás
(hallazgos 4 a 8) se corrige en la construcción sin volver a esta etapa.

---

## 27-09-2026 · AIEF Tema 1: revisión del papel (etapa 5) y del prototipo jugable (etapa 7)

**Qué se revisó.** El papel: `00-adaptacion-aief.md` (R3.1, R3.2, R3.2-bis, maqueta R2), `01-vision.md`
(AIEF v1), `03-progresion-aief.md` (v1), y para el Tema 1 `04-aprendizaje.md`, `02-bucle-y-mecanicas.md`
y `05-mundo-y-narrativa.md`. Lo jugable: `src/lib/juego/aief/tema1.ts`, `ventanilla.ts`,
`guion-tema1.ts`, sus tres `.test.ts`, `src/app/juego-aief/EscenaVentanilla.tsx` y `ventanilla.css`,
`version-alumno.ts`, `public/sw.js`, `content/islas.ts`.

**Cómo se jugó.** Con la versión 0 (Don Julio: 90.000, índices 100 y 115; Don Ramiro arrendamiento
mal hecho, Doña Carmen flujo bien hecho), la 417 y la 5, como la que sabe, el que no sabe y el que quiere
terminar rápido. **Límite honesto:** en esta etapa no tengo cómo ejecutar código, así que de la 417 y la 5
no saqué las cifras exactas: las jugué con las reglas del generador, que valen para todas las versiones
distintas de 0 (libros de 40.000 a 150.000 en pasos de 5.000, índice de hoy de 110 a 140 en pasos de 5,
índice de compra siempre 100, mitad sí completo y mitad contraoferta; en 1.2, un par «una bien hecha y una
para devolver» sacado de 9 operaciones). Los hallazgos no dependen de la cifra exacta.

**Veredicto.** El papel es coherente con la maqueta aprobada y entre sus cinco partes, salvo los choques
menores de los hallazgos 10 y 11. **El prototipo no está listo para mostrárselo a un curso ni para contar
en la nota:** hay tres formas de pasar el Tema 1 sin entender (hallazgos 1 a 3) que **ninguna de las
partes del papel detectó**, porque la prueba de los perezosos mira la jornada mezclada del Tema 2 y no la
del Tema 1. Todo se arregla sumando reglas al sorteo y a la pantalla, sin tocar la maqueta.

### Hallazgos, de más grave a menos grave

**1. 🔴 En el único crédito del Tema 1, «prestar siempre lo que pide» gana la mitad de las veces.**
- *Qué pasa.* La carpeta de 1.3 sortea mitad sí completo y mitad contraoferta (`carpetaT13`). En la mitad
  de sí completo, escribir lo que pide es el monto correcto, sin haber aplicado el 60 % (y escribir lo que
  dice el cliente también, `comunValida` lo permite). El perezoso calcula el valor de hoy porque la
  pantalla lo obliga, y después firma «lo que pide»: 50 % de pasar en la jornada, 75 % sumando un repaso.
  La prueba «nadie gana una jornada sin entender» (`ventanilla.test.ts`) pasa porque mira la jornada
  t13 + t22 + t23 juntas, donde el t22 siempre es contraoferta; **el Tema 1 no tiene t22**.
- *Por qué importa.* Es la estrategia dominante del punto 6: la decisión que cierra el tema se gana sin
  usar la regla del día. Y es la carpeta que pesa 50 % del registro (`04` A1.4).
- *Propuesta.* En el Tema 1, la carpeta de 1.3 es **siempre contraoferta** (el tope queda entre el
  mínimo y lo que pide), en la jornada y en cada repaso. El sí completo ya lo enseña la Llegada con Doña
  Rosa. Y una prueba propia del Tema 1: en las 999 versiones, «lo que pide», «cero», «el mínimo», «la regla
  de ayer» y «el valor del cliente» no aciertan nunca la carpeta de 1.3.

**2. 🔴 El número de NC se puede sacar probando del 0 al 14.**
- *Qué pasa.* El campo de la NC se corrige en el momento y no tiene tope de intentos (`enviarNC`): la
  escalera llega a «leer» y ahí se queda. Son 15 números posibles, y las pistas («supusiste el vacío»,
  «ese es el de la norma internacional») achican la búsqueda. Y como el dictamen sale casi solo una vez que
  se tiene la NC correcta (si la norma citada no es esa NC, devolver), **quien prueba números pasa 1.2
  sin haber abierto el manual**.
- *Por qué importa.* Buscar la NC en el manual es lo que 1.2 enseña (`04` A1.1). Es el tanteo del punto 9.
  El registro guarda cada intento, así que tú lo verías en la defensa, pero el juego lo deja pasar.
- *Propuesta.* El escalón (d) de la escalera, que el papel no aplicó a la NC: después del escalón «leer»,
  un fallo más y **el cliente se cansa de esperar y se va** («vuelvo otro día»). La carpeta cuenta como
  fallada y el repaso trae otra operación. Así probar al azar cuesta una jornada, no diez segundos. Lo
  mismo, más adelante, para el valor de hoy (hoy es menos grave: el espacio de respuestas es enorme).

**3. 🔴 La pantalla muestra si acertaste antes del cierre, y en 1.2 eso regala la segunda carpeta.**
- *Qué pasa.* El panel «REGISTRO · lo ve el docente» está a la vista del alumno y pone ✔ al lado de cada
  dictamen y de cada monto apenas se firman (`describir` devuelve `bien`). Como el par de 1.2 trae
  **siempre una para aceptar y una para devolver**, el que adivina la primera y mira si salió el ✔ sabe la
  respuesta de la segunda. Aun sin el ✔, el que descubre que siempre viene «una y una» acierta la jornada
  el 50 % de las veces, no el 25 % que calcula `02` B1.8.
- *Por qué importa.* Rompe el pilar 3 de la visión («no se ven hasta el cierre, nada las delata») y el
  «resultado al cierre» que Ronald aprobó en R3.1. En 1.1 del prototipo pasa lo mismo, y cuando entre la
  hoja de calidad también delataría el sello.
- *Propuesta.* (a) El registro que ve el alumno no marca nada de las decisiones (dictamen, sello, monto)
  hasta que se da vuelta la pared; lo completo lo ve Ronald en su hoja. (b) El par de 1.2 deja de ser
  «una y una» en el dictamen y pasa a ser «**una que se queda y una que se devuelve**», donde quedarse
  puede ser aceptar o aceptar con observación, y devolver puede ser por la norma o por un defecto
  fundamental (hallazgo 5). (c) Sumar a las pruebas al perezoso que conoce el patrón.

**4. 🟠 El manual no dice cómo se decide el monto: se puede calcular bien y salir en rojo por Bs 50.**
- *Qué pasa.* El manual muestra la regla cero y la del Tema 1 («presta hasta el 60 %»), pero no dice
  tres cosas que el juego corrige: que nunca se presta más de lo que piden, que por debajo del mínimo es
  cero, y que la agencia presta **en múltiplos de Bs 100 hacia abajo**. Sólo aparecen en la pista del
  repaso, después de fallar. Con los pasos del generador, más o menos uno de cada cinco topes termina en
  50 (60 % de 95.000 × 1,15 = 65.550): quien escribe el 60 % exacto (65.550) sale **rojo** por Bs 50 y
  va al repaso con la pista «el monto no salió de la regla del día», que es falsa.
- *Por qué importa.* Castiga al que sabe, y la pista le enseña algo equivocado.
- *Propuesta.* La hoja de la regla cero ya trae las tres cifras (lo que pide, su mínimo, el tope) y el
  redondeo, con el sello de «regla del juego», y Doña Teresa lo dice en la Llegada. Además, en el Tema 1 el
  tope sale siempre en múltiplos de Bs 100 (una condición más en `versionValida`): el redondeo no enseña
  nada de reexpresión y no tiene por qué decidir un color.

**5. 🟠 La hoja de calidad aprobada no tiene definido cómo se arma el par de 1.2.**
- *Qué pasa.* `02` B1.6 y `05` N1.4 suman un defecto sorteado y tres dictámenes (aceptar, aceptar con
  observación, devolver), pero nadie dice cómo queda el par de dos carpetas. Si se sigue sorteando «una bien
  normada y una mal normada», la bien normada con defecto fundamental también se devuelve, y «devolver
  siempre» acierta la jornada alrededor de una vez de cada tres (sin contar el sello).
- *Por qué importa.* Reabre la estrategia dominante que R3.2-bis había cerrado.
- *Propuesta.* El par de la jornada es siempre **una que se queda (aceptar o con observación) y una que se
  devuelve (por la norma o por un defecto fundamental)**; el sello de calidad **cuenta para pasar**
  (como ya dice B1.6); y el sello equivocado se **nombra en la ficha de la pared** al cierre («el auditor
  anotó que no viste que el balance llegó en julio»), como pidió la visión (V1.8 punto 2), no sólo en el
  repaso. Cortar el papel 2 de N1.4 (el balance de la fraternidad): se lee igual de bien como falla de
  representación fiel, y una respuesta discutible en un sello que cuenta es injusta.

**6. 🟠 En 1.1, el nombre de la persona dice su papel, en el prototipo y en el plan.**
- *Qué pasa.* El prototipo muestra «Doña Elena, le vende clavos y tornillos a la ferretería» arriba de la
  pregunta (el rol, que es la respuesta; ya lo vio `05` N1.5 punto 1). Pero el arreglo de `05` N1.2 deja
  **cada nombre fijo por rol en todas las versiones** (Doña Elena siempre es la proveedora): un compañero
  le dicta al otro «a Doña Elena, vender a 30 días y la hoja de corto plazo». Y el prototipo es, además, un
  cuestionario de tres opciones con «No es esa» al instante y reintento sobre la misma persona.
- *Por qué importa.* Regla del 27-09: lo que cuenta para la nota no se copia. 1.1 pesa poco, pero pesa.
- *Propuesta.* Los nombres se sortean por versión, aparte del rol (son sólo texto). Y construir 1.1 como
  `02` B1.3 (sellos y hojas que no se gastan, persona que se va y llega otra), sin el «No es esa».

**7. 🟠 En 1.1, las seis hojas «qué mira primero» se pisan entre sí.**
- *Qué pasa.* «Capacidad de pago de corto plazo» (proveedor) y «liquidez y endeudamiento» (banco) son casi
  lo mismo para un alumno; «rentabilidad y patrimonio», «márgenes por línea», «utilidad antes de
  impuestos» y «continuidad y resultados» también se tocan. Y la frase 2 del inversionista («abrir otra
  tienda en Tolata») suena a la decisión de la gerencia, «invertir».
- *Por qué importa.* «Sello bien y hoja mal cuenta como falla» (`02` B1.3): si dos hojas son defendibles,
  la falla es azar, no ignorancia.
- *Propuesta.* Como el banco nunca llega a la fila, su hoja sale de la lista (cinco hojas, no seis); y la
  hoja se revisa contra la columna del Cuadro 1 aceptando la vecina cuando el dossier la comparte
  (proveedor: corto plazo o liquidez). Reescribir la frase 2 del inversionista sobre **su** plata, sin la
  tienda nueva.

**8. 🟠 El número de NC se copia con una lista de nueve renglones.**
- *Qué pasa.* Las carpetas de 1.2 salen de 9 operaciones con un solo texto cada una, y la NC de cada
  operación es la misma para todos. Una lista del tipo «alquiler: 10; dueña de otra: 8; dólares: 6…»
  resuelve la NC de cualquier versión sin abrir el manual. Sólo se usan 8 de las 14 NC.
- *Por qué importa.* Punto 11: lo que cambia por alumno es cuál operación le toca, no la respuesta a esa
  operación. Y la NC es lo que sostiene el 40 % del registro.
- *Propuesta.* Dos o tres redacciones por operación con otros detalles (el alquiler del local, el de un
  camión, el de una máquina), y operaciones para las NC que faltan con clientes que calzan (una cooperativa
  minera para la NC 5, una distribuidora de combustible para la NC 9, dos tipos de cambio para la NC 12).
  La lista para copiar se vuelve tan larga como el manual, que es lo que se busca.

**9. 🟡 Tres cosas del celular prometidas en el papel que el código todavía no hace.**
- El manual no es una hoja que sube desde abajo: aparece **debajo** del diálogo, y con la NC hay que ir y
  volver con el dedo entre el campo y la lista de 14 normas.
- El botón atrás no está manejado: sale de `/juego-aief`. No se pierde nada (cada paso se guarda), pero
  se repiten las pantallas de introducción.
- La franja de cifras de 1.3 va **arriba** del diálogo; con el teclado abierto en 375×812 se va de la
  pantalla. Y `/juego-aief` no está en la precarga de `public/sw.js`, así que sin red sólo abre si ya se
  había abierto antes.
- *Propuesta:* trabajo de construcción, ya pedido por `02` B1.10; se mide en 375×812 antes de mostrarlo.

**10. 🟡 Choques menores entre las partes del papel.**
- La calidad se juega en 1.2 (`02` B1.6, `05` N1.4), pero `03` P2 dice que la «deja» 1.3, y `04` A1.4
  saca su peso del 50 % de 1.3. Corrección: la calidad pesa dentro de 1.2 (o aparte), no dentro de 1.3.
- `04` A1.1 sigue con «cambió el método de depreciación» como defecto de comparabilidad; `05` N1.4 lo
  cambió por los fletes. Vale el de `05`.
- `01` V1.7 todavía dice «familias de Los Cóndores» y `00` R3.1 también; `03` las reemplazó por montos por
  alumno (bien hecho: las familias se copiaban). Hay que alinear esas dos líneas.
- `03` mueve Sumaj Manos del Tema 7 al Cierre y parte el Tema 5 en tres piezas. Está bien fundado en el
  dossier, pero **cambia la maqueta que Ronald aprobó**: tiene que ir en el plan como cambio, no escondido
  en «decidido en esta etapa».

**11. 🟡 La nota bien hecha que razona mal (pedido de `01` V1.8 punto 5 y `05` N1.3).**
- *Decisión de esta etapa:* la justificación «como Bolivia ya adoptó las NIIF» **sale de las notas del
  contador** y queda sólo en las frases del cliente (grupo B de N1.3, que ya salen igual con carpetas para
  aceptar y para devolver). Las notas usan una sola justificación con NIIF, «porque ninguna NC boliviana lo
  regula», que es verdad en la bien hecha y es justo el error («supuso el vacío») en la mal hecha. Así no
  hay delator y nadie defiende como bien hecho un papel con una frase falsa.
- En la cara «mal» del flujo (`02` B1.4), el contador no cita la NC 1, 11 ni 14 (son de presentación
  general y un alumno podría defenderlas); cita una claramente ajena.

**12. 🟡 Cosas chicas del prototipo que el papel ya pidió y conviene no olvidar.**
- «Don Efraín, transporte» en 1.2 (obligatorio cambiarlo, `03` P7.2); «Bienvenido» con género; el final
  que anuncia «el Tema 2»; «Tema 1 aprobado» y «regla del Tema 1» rompen la ficción (`05` N1.5).
- La versión del alumno se calcula con la semilla de Proyectos II (`versionDeAlumno(alumnoId)` sin
  semilla propia): cada alumno tiene la misma versión en las dos islas. No rompe nada hoy; conviene una
  semilla `aief` antes de que alguien juegue con cuenta, porque después cambiarla le cambia las carpetas.
- La línea al cliente acepta cualquier texto de 20 letras. Como es evidencia y no nota, alcanza con la
  línea guiada de `05` N1.5 punto 15.

**Sobre las reglas «propuesta» de la progresión (pedido de `03` P9), en una línea cada una, para sus
fichas:** la regla 3 («un solo cupo») es elegir entre dos: sin un monto escrito que también decida, es un
sí o no disfrazado. El Tema 7 sin crédito tiene que pedir un número escrito (mora sobre patrimonio, CAR
ajustado) antes de «sano o frágil», o se vuelve cuestionario de dos botones. «Siempre la regla de ayer» y
«siempre el mínimo» hay que probarlos en cada tema por separado, no en una jornada mezclada (lección del
hallazgo 1).

### Los tres alumnos, en el prototipo de hoy

- **La que sabe** (versión 417 o 5): la Llegada, tres toques en 1.1, busca las dos NC en el manual (tiene
  que bajar y subir la pantalla), compara con la nota y dictamina bien, calcula el valor de hoy y firma el
  60 %. Si su tope termina en 50 sale roja por no redondear una regla que nadie le dijo (hallazgo 4). Si no,
  pasa en una jornada. Nota que el registro le avisa con un ✔ antes del cierre y la pared ya no sorprende.
- **El que no sabe:** en 1.1 descarta de a una opción («No es esa») y pasa en tres toques. En la NC, las
  pistas enseñan de verdad («esa NC regula otra cosa; lee su título»). En 1.3 cae en el valor en libros o
  en el del cliente, las pistas lo llevan a la fórmula, y el monto con la regla de ayer sale gris con una
  pista precisa en el repaso. **Este camino funciona bien:** es lo mejor del prototipo.
- **El que quiere terminar rápido:** tres toques en 1.1; la NC probando del 0 al 14; el dictamen por el ✔
  de la primera carpeta; el valor de hoy siguiendo la pista que dicta la fórmula; el monto «lo que pide»;
  la línea «aaaaaaaaaaaaaaaaaaaaaa». Pasa el Tema 1 en una o dos jornadas sin haber abierto el manual ni
  aplicado el 60 %. Con los hallazgos 1 a 3 arreglados, este camino se cierra.

### Lo que está bien y no conviene tocar

- El motor de montos y colores (`montoCorrecto`, `colorDelCierre`, `diagnosticoMonto`) con sus pruebas, y
  la regla «la carpeta no se rehace, el repaso trae otros números» (`versionDeRepaso`).
- Las pistas del valor de hoy y de la NC: cada una nombra el error concreto sin dar el número.
- Rehacer todo el avance desde los eventos (`avanceDe`): se retoma donde quedó y tú puedes recalcular el
  registro.
- La regla que choca (libros contra valor de hoy) y el «gris» de la cooperativa de enfrente: se entiende
  sin explicarlo.
- El guardado local por evento y el reintento a la nube cuando vuelve la red.

### Qué cambiar en el Tema 1 para construirlo según el plan

**Imprescindible (antes de mostrarlo a un curso o de que cuente para la nota):**

1. 1.3 siempre contraoferta en el Tema 1, con el tope en múltiplos de Bs 100, y la prueba de los
   perezosos sobre la jornada del Tema 1 (hallazgos 1 y 4).
2. La regla del monto completa en el manual: lo que pide, su mínimo, el tope y el redondeo (hallazgo 4).
3. La NC con escalón (d): pasado «leer», un fallo más y el cliente se va (hallazgo 2).
4. Ningún ✔ de decisiones a la vista del alumno antes del cierre (hallazgo 3).
5. 1.2 sin delatores: nota con forma única y sin «como Bolivia ya adoptó», frase del cliente sorteada
   aparte, acierto de la NC neutro, flujo menos frecuente y con dos caras (hallazgo 11, `02` B1.4).
6. La hoja de calidad con el par «una se queda, una se devuelve», el sello que cuenta y se ve en la pared,
   sin el papel 2 (hallazgo 5).
7. 1.1 como `02` B1.3, con nombres sorteados aparte del rol, cinco hojas y la frase del inversionista
   reescrita (hallazgos 6 y 7).
8. Semilla propia de AIEF para la versión y la partida que guarda con qué generación de carpetas se jugó
   (hallazgo 12, `02` B1.11 punto 1): las dos cuestan poco hoy y mucho después.

**Puede esperar (se hace, pero no bloquea la primera prueba):**

- Más operaciones y redacciones en 1.2 (hallazgo 8); mientras tanto, la defensa pregunta la NC con otra
  operación.
- Índice de compra distinto de 100 (`02` B1.5).
- La Llegada como pieza aparte y lo que el Cierre tiene que leer de la pared (`03` P7.1 y P7.4): hacen
  falta cuando se construya la segunda pieza, no antes.
- Manual como hoja inferior, botón atrás, cifras fijas con el teclado y precarga sin red (hallazgo 9):
  imprescindibles antes de que lo juegue un curso en la app, no antes de que tú lo pruebes.
- La hoja por alumno para tu defensa (`04` A1.4): imprescindible antes de que cuente para la nota.
- Los textos de `05` N1.5 que no son delatores (Doña Nieves, cooperativa en la Llegada, recuerdo de 1985,
  línea guiada).

---

## 27-09-2026 · Revisión de `00-adaptacion-aief.md` versión 2 (adaptador-de-dossier, Ronda 2)

**Qué se revisó:** la Ronda 2 de `docs/juego/gdd/00-adaptacion-aief.md` (maqueta general del Marco A,
"La ventanilla"), contra `IDEA-JUEGO.md` §9 a §17, la revisión de la v1 (abajo) y lo que ya existe en
`src/lib/juego/` (`registro.ts`, `nube.ts`, `escalera.ts`). **Los dossiers no estaban en este equipo:**
se trabajó sobre lo que la Ronda 1 resumió y la revisión de la v1 verificó. Se jugó mentalmente la
versión mínima (Llegada, máquina del Tema 1, tres carpetas del Tema 2) como seis alumnos: la que sabe,
el que no sabe, y los perezosos "siempre no", "siempre sí", "al azar", "prestar poco" y "copiar", más
uno que la Ronda 2 no jugó: **"ajustar por el color"**.

**Veredicto:** **construir la versión mínima con ajustes.** El bloqueo 2 de la v1 (orden de dictado)
está resuelto de verdad. El bloqueo 1 (estrategia dominante) está resuelto en la idea (meta, gris,
clientes buenos sorteados, monto escrito), pero la regla de colores tal como está escrita lo reabre por
dos lados: el monto termina siendo un sí o no disfrazado, y reintentar la misma carpeta con el color a
la vista deja encontrar el monto sin calcular (hallazgos 1 y 2). Los dos se arreglan con reglas, sin
tocar la maqueta; conviene fijarlos en la ficha de la versión mínima antes de escribir código.

### Los dos bloqueos de la v1, comprobados

**Orden de dictado (bloqueo 2): resuelto.** Recorrido en el orden de R2.2: Llegada, T1, T2, escena de
Don Efraín, 4a, T3, 4b, T5, T7, T6, Cierre. Ninguna pieza usa algo de una posterior: el 4a explica "no
pasó por caja" sin el vocabulario del Tema 3; el 7 trae la tarjeta de tres ratios; el 6 se sostiene
solo con una línea condicionada; el Cierre va al final y el supervisor ya apareció en el 7. Los números
salen del punto de control y la historia de líneas condicionadas, así que otro orden (el 3 antes del
4a) tampoco rompe. Quedan dos cabos chicos (hallazgo 7): qué pasa si un alumno abre un tema sin haber
jugado la Llegada, y el [verificar] de dónde entran 4b y T5, que no cambia nada porque ninguno depende
del otro.

**Estrategia dominante (bloqueo 1): resuelta a medias.** Jugado:

| Perezoso | Qué le pasa con la regla de R2.1 | ¿Gana sin entender? |
|---|---|---|
| Siempre no | Grises en los buenos; no pasa | No |
| Siempre sí, lo que pide | Rojo en los que piden más de lo que pueden pagar | No |
| Al azar | Rojo o gris casi siempre | No, **salvo que reintente** (ver "ajustar por el color") |
| Prestar poquito | Por debajo de lo que necesita: gris | No |
| Copiar | Otra versión; con cinco familias de Cóndores comparte familia con uno de cada cinco compañeros (hallazgo 7) | No en la versión mínima |
| Mover cuentas | La luz sólo se prende al cerrar; cada cierre fallido es un intento | No |
| **Ajustar por el color** | Presta algo; si sale rojo baja, si sale gris sube; en tres intentos cae en verde | **Sí** (hallazgo 2) |

### Hallazgos, de más grave a menos grave

#### 1. (Bloquea) Con la regla de colores como está, el monto es un "sí o no" disfrazado, y el buen rechazo no tiene color

- **Qué pasa.** R2.1 dice: verde si el monto queda entre "lo que el cliente necesita" y "la capacidad
  de pago"; gris por debajo de lo que necesita; rojo por encima de la capacidad. Si el cliente pide
  justo lo que necesita (como Don Efraín, que pide 20 mil para las luces), hay sólo dos casos: si su
  capacidad alcanza, la única respuesta verde es "lo que pide"; si no alcanza, cualquier monto positivo
  es rojo o gris, y la única respuesta buena es cero. Escribir el número es entonces elegir entre "lo que
  pide" y "cero": la opción múltiple que Ronald rechazó, con teclado. Y rechazar a un mal cliente (la
  respuesta correcta en la mitad de las carpetas) no tiene color: ni verde ("prestaste y paga") ni gris
  ("era bueno").
- **Por qué importa.** Es el corazón del bucle. Si el monto no se calcula, el número que "lo sostiene"
  es un trámite, y la pared no distingue un buen rechazo de una carpeta sin jugar.
- **Propuesta concreta.** Que cada carpeta tenga tres cifras, sorteadas por versión, y tres casos en
  proporciones parecidas:
  - **lo que pide**, **lo mínimo que le sirve** (a la vista o encontrable en la carpeta: la cotización
    de las luces, la planilla que tiene que pagar) y **lo que puede pagar** (sólo sale del número del
    tema);
  - **capacidad por encima de lo que pide:** se presta lo que pide; **capacidad entre el mínimo y lo que
    pide:** contraoferta, y el monto exacto sale del cálculo (este es el caso que hace pensar);
    **capacidad por debajo del mínimo:** cero;
  - un **cuarto resultado en la pared, "bien rechazado"** (ficha verde con otra marca: "se fue a la
    cooperativa de enfrente y allá cayó en mora"), para que el buen "no" también se vea y se premie.
  - "Siempre lo que pide" falla en dos de cada tres; "siempre cero" falla en dos de cada tres; sólo el
    que calcula acierta la contraoferta.

#### 2. (Bloquea) Reintentar la misma carpeta con el color a la vista deja encontrar el monto sin calcular

- **Qué pasa.** R2.1 dice que cada rojo o gris "sube un escalón de la ayuda", pero no qué carpeta se
  juega después. Si es la misma, el color le dice al alumno para qué lado moverse: rojo, baja; gris,
  sube. Con una banda verde ancha, tres intentos alcanzan para caer en verde por tanteo, antes de que
  llegue el escalón (d) "otros números". Es la luz que se enciende al cuadrar (hallazgo 4 de la v1)
  vuelta a aparecer en la decisión.
- **Por qué importa.** Es una estrategia dominante: gana sin entender y el registro guarda un verde
  "al tercer intento" que no dice nada.
- **Propuesta concreta.** Dos reglas, que además hacen más juego (hallazgo 5):
  - **El "meses después" llega al final de la jornada**, no carpeta por carpeta: atiendes las carpetas
    del día y al cerrar la ventanilla se da vuelta la pared, como el resumen del día de *Papers, Please*.
    Sin color en el momento, no hay hacia dónde tantear.
  - **Una decisión equivocada no se rehace: llega otro cliente** (otra carpeta con otros números, que es
    el escalón (d) aplicado de entrada a las decisiones). La consecuencia y la pista de los escalones
    (a) a (c) acompañan a la carpeta nueva. El número que sostiene la decisión (la utilidad neta, las
    fuentes reales) sí se corrige en la misma carpeta, con su escalera y **antes** de escribir el monto.

#### 3. (Importante, toca la versión mínima) En los Temas 1 y 2 no hay con qué calcular "lo que puede pagar"

- **Qué pasa.** La función del "meses después" compara el monto con la capacidad de pago, pero la
  capacidad de pago (flujo de operación, prueba ácida, cobertura) se enseña recién en los Temas 5 y 6.
  En el Tema 2, lo único que hay es la utilidad neta, y la lección de T2.3 es justamente que **la
  utilidad no es caja**: si el juego calcula la capacidad con la utilidad, contradice lo que enseña. Y
  R2.1 pide escribir "la cuota", que necesita tasa y plazo: es Matemática Financiera, no AIEF.
- **Por qué importa.** La versión mínima es Temas 1 y 2: si ahí el monto no se puede sostener con lo
  enseñado, lo primero que ve el curso es adivinar.
- **Propuesta concreta** (decisión pendiente de Ronald, arriba):
  - **A. Recomendada: una regla de la agencia en el manual**, como el reglamento de *Papers, Please*.
    Cada tema suma una regla de crédito que usa su número. Tema 1: "la garantía se toma al valor
    reexpresado, no al que dice el cliente" (la máquina que "creció"); Tema 2: "la cuota no pasa de
    tal parte de la utilidad neta con IUE, y nunca de la caja que hay" (la cooperativa que ganó y no
    tiene caja cae sola en la segunda mitad de la regla). Es contenido inventado (§9): se marca así en
    la ficha y Ronald lo revisa. La regla crece con el manual: en el Tema 5 se reemplaza por el flujo.
  - **B. Sin crédito en los Temas 1 y 2**: sólo aceptar o devolver balances; el crédito empieza en el
    4a. Más fiel, pero la versión mínima ya no prueba lo que dice que prueba (que el número decida el
    monto).
  - En las dos: **quitar "la cuota"** de lo que escribe el alumno, o dársela hecha en la carpeta.

#### 4. (Importante) La meta de colocación sobra como condición y puede delatar la respuesta

- **Qué pasa.** La condición para pasar es "cumplir la meta sin rojos ni grises". Si no hay grises, ya
  se le prestó a todos los buenos, así que la meta se cumple sola o no se puede cumplir: sobra. Y si es
  un número a la vista con tres carpetas ("coloca 45 mil"), el alumno puede deducir cuáles aprobar y por
  cuánto sumando lo que pide cada uno, sin leer un papel.
- **Propuesta concreta.** La meta queda como **presión del mundo, no como condición**: la jefa la
  menciona, se ve cuánto falta y comenta al cierre de la jornada ("este mes nos faltó colocar"). La
  condición para pasar el tema es sólo "sin rojos ni grises, con los números bien escritos". Si Ronald
  prefiere que la meta cuente, que sea holgada (varias combinaciones la cumplen) y nunca igual a la suma
  de los buenos de esa versión.

#### 5. (Importante) Divertido: falta el ritmo de la jornada, y sin él son tres ejercicios con dibujos

- **Qué pasa.** La maqueta tiene lo que da ganas de seguir a lo largo de la materia (Don Efraín que
  vuelve, la pared que se llena, la mesa que se da vuelta en el Tema 7). Pero dentro de un tema, la
  versión mínima se juega así: carpeta, número, monto, color; carpeta, número, monto, color. Sin la
  tensión de *Papers, Please* (una cola que espera, reglas que se suman y se contradicen, el resumen del
  día que llega de golpe) se siente una hoja de ejercicios en tres pantallas. Y el Tema 1 que entra en
  la versión mínima es un solo cálculo (la máquina).
- **Por qué importa.** Ronald pidió un juego con sabor a la materia. La primera prueba con un curso es
  justo la versión mínima: si ahí se siente una clase con dibujos, se juzga todo el marco por eso.
- **Propuesta concreta** (barata, casi todo texto):
  - **La jornada como unidad**: una cola de clientes en la puerta (se ven los que esperan), las
    carpetas en el orden en que llegan, y el cierre del día con la pared que se da vuelta (hallazgo 2)
    y dos líneas de la jefa.
  - **Una regla nueva que choca con la anterior**, una por tema (la del hallazgo 3): es lo que hace
    pensar en *Papers, Please* y no cuesta arte.
  - **Una carpeta con sorpresa** en la versión mínima: la cooperativa que ganó y no paga tiene que ser
    la última del día, para que el "ganó pero no tiene caja" llegue como giro.
  - **Sin reloj**: la cola da tensión sin castigar por lentitud, que en un celular con el teclado
    abierto sería injusto.

#### 6. (Importante) Web y app: "sigues jugando sin conexión" está prometido como hecho y hoy no existe

- **Qué pasa.** R2.1 y R2.6 dicen que cada paso se guarda en el teléfono y se sube al volver, y que
  nada necesita algo propio del teléfono. Lo que hay hoy: `registro.ts` y `nube.ts` están atados a
  `isla: "proyectos"` y `escena: "planta"` (la clave del navegador, la lectura y el filtro de la tabla);
  la escalera (`escalera.ts`) no tiene el escalón (d) "otros números", y lo dice en su comentario; el
  guardado de la escena 1 sólo se reintenta con la próxima respuesta (hallazgo 4 de la revisión de
  `01-vision.md`); la página del juego no entra en la precarga del service worker; y la app de Android
  carga el sitio publicado, así que si se abre sin red y la página no quedó guardada, no arranca.
  Entrar con Google necesita red en las dos.
- **Por qué importa.** El curso juega en el micro. Si la versión mínima pierde una jornada por un corte
  de señal, la prueba se juzga por eso y no por el juego.
- **Propuesta concreta.** Anotarlo en la ficha de la versión mínima como **trabajo de código, que suma y
  no rompe**:
  - `registro.ts` y `nube.ts` reciben la isla y la escena como dato; lo guardado con
    `proyectos`/`planta` se sigue leyendo igual (reglas 2 a 4 de «Estructura»);
  - una cola de guardado en el teléfono que reintenta al volver la red (también después de entregar);
  - el registro guarda la versión **de cada carpeta** (lo pide el hallazgo 2) y la escalera suma el
    escalón (d);
  - la ruta del juego en la precarga;
  - se puede jugar sin cuenta y entrar después: la partida local se sube al entrar.
  - Del lado del celular, dejar escrito: el botón atrás cierra primero la hoja del manual, después la
    pared, después vuelve de la carpeta al escritorio, y recién ahí pregunta si sales; el campo del
    monto acepta "20000", "20.000" y "20 000" y muestra el número como lo leyó ("Bs 20.000") antes de
    firmar; la cifra que estás usando queda fija arriba del campo con el teclado abierto (medido en
    375×812).

#### 7. (Menor) Precisiones

- **Llegada no jugada:** si un alumno abre el Tema 2 sin haber pasado por la Llegada (entró tarde, o
  Ronald habilitó varias piezas juntas), la Llegada se juega sola antes. Decirlo en R2.2.
- **Cinco familias de Cóndores:** en un curso de 40, ocho alumnos comparten familia. Que la familia sólo
  fije los números de la cadena y que cada pieza sortee **por alumno** qué clientes son buenos, sus
  montos y la frase a desmentir. No afecta a la versión mínima.
- **Tema 7, "calificas tu propio banco":** en R2.2 es el supervisor el que califica y tú el que responde.
  Unificar. Y la "corrida que no hacía falta" también tiene que salir de una función con pruebas, como
  el "meses después".
- **La Ronda 1 quedó contradiciendo a la 2** en el mismo archivo: §6.1 ("la letra A es tu cartera"),
  §6.2 (ascenso a analista), §6.4 ("fichas por defecto") y la razón 2 de §7. Quien construya puede
  leerlas como vigentes. Poner al inicio de §6 y §7 una línea: "reemplazado por R2.2 y R2.3".
- **"Desmentir la frase con un número escrito"** es el verbo fijo del bucle, pero no se dice qué pasa si
  el número está bien y la decisión mal (o al revés). Que el registro los guarde por separado: para la
  defensa sirven los dos.

### Lo que está bien y conviene no tocar

- El Tema 4 en dos piezas, el Inicio y el Cierre propios, y la escena de Don Efraín que se juega antes
  de lo primero que la necesite: resuelven el orden de dictado sin rehacer nada.
- La cartera como historia y no como cálculo, con el banco del Tema 7 en sus propios números.
- La luz de control que sólo se prende al cerrar el cuadro.
- Los temas sin crédito con dos lados (aceptar o devolver balances; sano o frágil).
- El celular de R2.1: una carpeta por pantalla, tocar en vez de arrastrar, el manual como hoja que sube.
- R2.5: el escalón "a leer" que evita los ejemplos que contradicen al juego, y la frase de D4 §4.3 dicha
  como es.
- Una sola pregunta para Ronald, de criterio, con recomendación y alternativa.

### Avisos para otras partes

- `adaptador-de-dossier`: hallazgos 1 a 5 y 7 para las fichas de la versión mínima (Llegada, T1, T2).
- `disenador-de-bucle` y `disenador-de-aprendizaje` (cuando corran): la jornada con resultado al cierre
  (hallazgos 2 y 5), los tres casos y el "bien rechazado" (hallazgo 1), y la decisión equivocada que se
  rehace con otra carpeta (escalón (d) de entrada).
- Código (no es del GDD): hallazgo 6, todo aditivo.

---

## 26-09-2026 · Revisión de `00-adaptacion-aief.md` versión 1 (adaptador-de-dossier, Ronda 1)

**Qué se revisó:** `docs/juego/gdd/00-adaptacion-aief.md` v1 (tres marcos, maqueta de A y
recomendación), contra `IDEA-JUEGO.md` §9 a §16, `CLAUDE.md` («Estructura»), `LEEME.md` del GDD y la
revisión anterior. Se leyeron (sin copiarlos ni modificarlos) los siete dossiers `.tex` de AIEF y las
cinco guías de lectura, para comprobar cobertura, cifras y las inconsistencias de §1.4. Se jugó
mentalmente el Marco A como tres alumnos de 4.º semestre en un celular: la que sabe, el que no sabe y
el que quiere terminar rápido; y se leyó como lo leería Ronald.

**Veredicto:** llevar a Ronald **con ajustes**. La lectura del dossier es seria (cobertura completa,
cifras correctas, siete de ocho hallazgos de §1.4 reales) y A es la mejor de las tres. Pero el bucle de
A todavía no tiene lo que hace jugar a *Papers, Please*: nada empuja a aprobar, así que "desconfía de
todos" gana sin entender (hallazgo 1). Y el "inicio y fin de verdad", que es una de las tres razones de
la recomendación, no sobrevive al orden en que Ronald dicta los temas (hallazgo 2). Esos dos se
corrigen antes de mostrarlo; el resto puede ir como nota.

### Verificación contra el dossier

- **Cobertura:** los 41 subtemas de los siete dossiers (T1 3, T2 3, T3 3, T4 6, T5 9, T6 5, T7 12)
  aparecen en la tabla de §3 y en el mapa de §5. Ninguno queda afuera.
- **Cifras que cita el documento, recalculadas:** reexpresión 120.000 × 1,12 = 134.400 (D1); IUE sobre
  ventas 200.000 contra 30.000 (D2 dice "casi siete veces"; el documento dice "siete veces", ver
  hallazgo 9); fuentes 43.000 y aplicaciones 47.000 con caja −4.000, fuentes reales 43.000 − 25.000 =
  18.000 (41,9 %) y aplicaciones reales 22.000 (D4 §4.2 y §4.3); pronto pago 0,02/0,98 × 365/50 = 14,9 %
  (D4 §4.6); flujo 40.000 + 12.000 + 2.000 + 4.000 = 58.000 y caja 26.000 + 15.000 = 41.000 (D5 §5.1);
  razón corriente de La Espiga 48.500/9.600 = 5,05 (D5 §5.9); ROE 40.000/175.000 = 22,9 % contra
  40.000/40.000 = 100 % (D6 §6.1); ROE de Sumaj Manos 11.000/16.000 = 68,8 % (D7 §7.10); siete puntos de
  mora hasta perder el patrimonio (D7 §7.3). Todas correctas. Las cuentas inventadas de los "dos
  minutos" de B (900.000 + 140.000 = 1.040.000) y de C (saldos 56.000, 43.000 y −4.000; faltan 9.000
  para el mínimo de 5.000; con el pago corrido, 16.000) también cuadran.
- **Los cruces de calendario de §1.1 son reales:** D4 va en las semanas 4, 6 y 8 y D3 en la 5; D7 en las
  semanas 14 a 16 (su cierre, §7.12, en la 19) y D6 en la 17; la cabecera de D6 lo marca como
  dependencia pendiente.
- **§1.4, inconsistencias del dossier:**
  1. IUE que aparece y desaparece: **real.** D6 trabaja a Los Cóndores con utilidad operativa 43.000,
     gastos financieros 3.000 y utilidad neta 40.000, sin impuesto; Amaru: 38.000 − 4.000 = 34.000 y
     utilidad neta 28.000 (impuesto implícito del 17,6 %).
  2. D7 §7.7 "las NIIF, en su lectura boliviana": **real**, choca con D1 §1.2.
  3. D2 §2.3 cita "la cooperativa minera del apartado" cuando el ejemplo del apartado es la de quinua:
     **real.**
  4. D3 §3.2, la donación como "transacción con terceros" cuando la definición da sólo dos categorías:
     **real.**
  5. D5 §5.1, los 18.000 como "utilidad del año pasado y plata no pagada": **real, con un matiz.** El
     cobro de cuentas por cobrar (2.000) sí puede leerse como venta del año pasado; lo que la frase
     omite es la depreciación (12.000), que es dos tercios de la diferencia.
  6. D6, cajas de trampas y de enlace repetidas al final de §6.5: **real** (dos juegos de errores y dos
     enlaces, uno hacia el Tema 7 y otro hacia el Hito 5).
  7. Guías de lectura: **real.** La del Tema 5 dice "otra vez con Los Cóndores" en §5.9 y además ubica el
     glosario en la página 54 y en la 56 a 57 dentro de la misma guía; la del Tema 4 dice cinco saldos a
     determinar y el balance de Wara tiene siete; la del Tema 7 promete umbrales verde, amarillo y rojo y
     la figura sólo colorea los valores de un caso.
  8. Voseo en D3 a D7: **real**, aunque mezclado con tuteo en el mismo dossier. No afecta al juego.
  - **Uno más, que §1.4 no anota:** D4 §4.3 dice que las fuentes reales (18.000) "ya se aplicaron casi en
    su totalidad", pero las aplicaciones reales son 22.000: se aplicó todo y 4.000 más, que salieron de
    la caja. La escena de A repite la frase ("ya se aplicaron casi todas").

### Hallazgos, de más grave a menos grave

#### 1. (Bloquea) En A, "rechaza a todos" gana sin entender: falta lo que empuja a decir que sí

- **Qué pasa.** El gancho dice que todos traen papeles "que dicen la verdad a medias", y la escena de
  ejemplo premia desconfiar (la ficha de quien presta los 20 mil sale amarilla; la de quien propone
  menos sale verde). El alumno que quiere terminar rápido aprende en dos clientes la regla "rechaza o
  presta menos" y gana todas las fichas verdes sin hacer una cuenta. En *Papers, Please* eso no pasa
  porque rechazar tiene costo: la mayoría de los papeles están en regla, te pagan por cada persona que
  atiendes bien y tu familia pasa frío si eres demasiado estricto. En A no hay ningún costo por negar
  un crédito, y la cartera sólo "se cobra" en el Tema 7, así que tampoco hay tensión durante la
  materia. Además no se dice de dónde sale el "meses después": si es un resultado escrito a mano para
  cada opción, la decisión es una opción múltiple con animación.
- **Por qué importa.** Es el corazón del bucle y la razón de elegir A. Sin costo por decir que no, no es
  un juego (no hay dilema) y se puede ganar sin entender, que es lo que Ronald rechazó.
- **Propuesta concreta.** Agregar al marco, en una línea cada uno:
  - **Una meta de colocación**: la jefa necesita que la agencia preste; un buen cliente rechazado se
    va a la competencia y su ficha queda gris en la cartera ("cliente perdido"). Verde, rojo y gris
    pesan igual en el cierre.
  - **Clientes buenos de verdad**: más o menos la mitad de las carpetas merecen el sí, y la versión de
    cada alumno sortea cuáles (sin eso, la regla "casi siempre no" vuelve).
  - **La decisión se escribe**: el alumno escribe el monto que aprueba (y la cuota o la condición), no
    elige entre "aprobar" y "rechazar". El "meses después" **sale de una función con pruebas** (por
    ejemplo, cuota contra fuentes reales o contra el flujo de operación de su versión), no de un guion
    por opción.

#### 2. (Bloquea) El inicio y el fin no sobreviven al orden en que Ronald dicta los temas

- **Qué pasa.** La maqueta (§6.2) cuenta una historia lineal: los Cóndores "llegan por primera vez" en
  el Tema 3 y "vuelven" en el 4; el comité del Tema 6 te asciende a analista; el Tema 7 es el desenlace
  con el supervisor, tu cartera como letra A y "ahora con el tuyo". Pero Ronald dicta D4 §4.1 a §4.3
  antes que D3, y D7 antes que D6. En el orden real, Don Efraín "vuelve" antes de haber llegado, el
  final se juega antes del comité, y el ascenso llega después del final. §6.4 resuelve los **números**
  con puntos de control, pero no la **historia**, y la razón 2 de la recomendación ("tiene inicio y fin
  de verdad") queda en falso.
- **Por qué importa.** La maqueta es justo lo que Ronald aprueba en esta etapa (IDEA-JUEGO §13). Si el
  final no puede quedar al final, el arco que se le vende no es el que va a jugar su curso.
- **Propuesta concreta** (tres cambios chicos, que además suman piezas en vez de rehacer):
  - **El final es su propia pieza, "Cierre"**: el supervisor mira tu cartera y "ahora con el tuyo"
    (D7 §7.12). Ronald la habilita al último. El propio dossier ya lo hace así: el cierre de D7 va
    después del Tema 6.
  - **El primer encuentro con Los Cóndores es una escena propia** que se juega antes del tema que se
    abra primero (el 3 o el 4). Las líneas de historia se escriben según lo ya jugado ("la otra vez
    viniste por..."), no según el número del tema.
  - **El ascenso deja de ser requisito del Tema 7**: el comité del 6 y el banco del 7 se sostienen
    solos; si el 6 se juega después, el comité lo lee como "ahora que ya viste un banco por dentro".

#### 3. (Importante) "Tu cartera es la letra A del CAMEL" contradice el punto de control y arrastra el error a lo evaluado

- **Qué pasa.** §6.4 promete que "los números no arrastran el error", pero si la A del CAMEL de tu banco
  se calcula con tus fichas, el alumno que falló en los Temas 2 a 6 llega al Tema 7 con otros números y
  otra calificación de su banco. Y quien no jugó todos los temas recibe fichas "por defecto", así que su
  CAMEL lo decidió el juego. Es el mismo problema que la revisión de `01-vision.md` (hallazgo 3) marcó
  para la caja y la reputación.
- **Por qué importa.** El cálculo del Tema 7 (mora contra patrimonio, CAR, dominancia) cuenta para la
  nota; si depende de errores anteriores, se castiga dos veces, y el "diagnóstico correcto" deja de ser
  el mismo para dos alumnos con la misma versión.
- **Propuesta concreta.** El banco del Tema 7 tiene sus números de versión (punto de control, como todo
  lo demás). La cartera del alumno entra como **historia**, no como cálculo: el supervisor abre tu pared
  de fichas y comenta las rojas y las grises en dos líneas, y eso pasa al registro para la defensa oral,
  que es donde Ronald puede preguntar "¿por qué le prestaste a este?". Opción B, más cara: la A se
  calcula con tu cartera sólo en el Cierre, fuera de lo que se califica.

#### 4. (Importante) Las luces que "se encienden al cuadrar" permiten ganar probando

- **Qué pasa.** La escena de A lo muestra sin querer: el alumno pone las cuentas por cobrar en fuentes,
  la luz queda gris, las pasa a aplicaciones y "ahora sí". Con una luz que responde en cada movimiento,
  el que no sabe mueve cuentas de columna hasta que prende. Lo mismo vale para el balance que se
  enciende (T2.1) y el cuadre doble del estado de cambios (T3).
- **Por qué importa.** Es "ganar sin entender" dentro de la modalidad, y el registro guarda un acierto
  que no dice nada. La escalera de ayuda nunca se activa porque el alumno nunca "falla".
- **Propuesta concreta.** La luz se prende sólo cuando el alumno **cierra** el cuadro y escribe los dos
  totales; cada cierre fallido cuenta como un intento y sube un escalón de la escalera (primero la
  consecuencia, "la caja no te cuadra por 4.000"; después "revisa las que subieron del lado izquierdo";
  después la sección del dossier; después otra versión). El registro guarda cuántos cierres hizo falta.

#### 5. (Importante) El IUE al 25 % es lo correcto, pero choca con el escalón (c) de la ayuda

- **Qué pasa.** La decisión del adaptador es la correcta (la ley boliviana grava con el IUE, y D2 lo
  enseña así). Pero el juego tendrá utilidades netas con IUE para Los Cóndores y La Espiga, y cuando el
  alumno falle tres veces la escalera lo manda a leer D5 §5.1 o D6 §6.4, que calculan sin IUE. En ese
  momento la ayuda contradice al juego. Pasa lo mismo, en menor medida, con D5 §5.1 (hallazgo 5 de
  §1.4) y con D4 §4.3 (la frase de "casi en su totalidad").
- **Por qué importa.** Es un cambio de **cálculo** del dossier, que según IDEA-JUEGO §14.3 sí importa.
  Además Ronald dicta con el dossier: si el curso ve 40.000 en clase y otro número en el juego, pregunta
  cuál está bien.
- **Propuesta concreta.** Decisión de Ronald (arriba): **(recomendada)** corregir los ejemplos de D5, D6
  y D7 para que lleven su línea de IUE; o, si no los corrige, que el escalón (c) de esos subtemas apunte
  a D2 §2.2 y que la primera pantalla de cada carpeta muestre la línea del IUE a la vista. Anotar en el
  documento qué escalón (c) apunta a qué sección, para revisarlo cuando cambie el dossier.

#### 6. (Importante) En el celular, la escena de A no entra como está escrita

- **Qué pasa.** La escena de ejemplo pide dos balances lado a lado, arrastrar cuentas a columnas y tener
  a la vista el manual, la carpeta y la cartera. En 375 px de ancho, con el teclado abierto para escribir
  las fuentes reales, no hay lugar para dos balances; arrastrar con el dedo en una lista larga, con mala
  conexión y un celular modesto, es la parte que más falla.
- **Propuesta concreta.** Un documento por pantalla con pestañas ("antes", "después", "acta"); asignar
  tocando la cuenta y después la columna, no arrastrando; el manual como una hoja que sube desde abajo.
  Medirlo en 375×812 con el teclado abierto, como la escena de Proyectos II. Lo de jugar sin red sigue
  pendiente desde la revisión de `01-vision.md` (hallazgo 4) y vale igual para esta isla.

#### 7. (Importante) El costo de A está contado por tema, pero lo caro es la cadena de Los Cóndores

- **Qué pasa.** §4 dice que lo caro son "los documentos por versión, uno por tema", como `planta.ts`.
  Pero Los Cóndores atraviesan los Temas 3 a 6 con el cierre de uno como apertura del otro. Con una
  versión por alumno, eso es un generador de **una empresa entera por alumno** (balances, resultados,
  acta de socios, flujo, presupuesto, ratios) que tiene que cuadrar en todos los temas y conservar en
  cada uno su lección (el aporte en especie, las cuentas por cobrar, el error del IVA que no rompe el
  cuadre, el ROE engañoso). Eso es varias veces `planta.ts`. Y la versión mínima tiene una contradicción:
  justifica empezar por el Tema 2 porque "todo lo demás usa lo que produce", cuando §6.4 dice que cada
  tema arranca de su punto de control.
- **Propuesta concreta.** Decirlo en el costo y ofrecer la versión barata: **cada tema sortea sólo sus
  datos nuevos** y los de la cadena salen de una familia chica de Cóndores (por ejemplo, cinco familias
  armadas y probadas una vez), en lugar de generar la cadena entera por alumno. Para la versión mínima,
  preferir lo que tiene dilema y consecuencia: el hub, la cooperativa que ganó y no paga (T2.3) con su
  "meses después" y la escena de la máquina (T1.3), antes que clasificar partidas del balance (T2.1),
  que es lo más escolar de la materia y lo primero que vería el curso.

#### 8. (Menor) Los "dos minutos" del Marco B resuelven un caso del dossier en un repositorio público

- **Qué pasa.** La audiencia de B usa el Caso 3 de D2 (la cooperativa minera, sus 140.000, su
  patrimonio inicial y el pago a 60 días) y responde sus cuatro consignas. La guía del Hito 2 lo usa
  como ejemplo de cierre de clase. §1.3 excluye con razón a Wara, Q'ente y Amaru; este no es un
  entregable, pero queda resuelto a la vista de todos.
- **Propuesta concreta.** Cambiar empresa y números en el ejemplo de B (el juego puede, §9). Y agregar
  a §1.3 una regla general: los casos de "Estudio de Casos" del dossier inspiran, pero no se publican
  con sus números.

#### 9. (Menor) Precisiones

- §1.2, T2: "siete veces más" es "casi siete veces" (200.000 contra 30.000).
- Escena de A, Tema 4: "ya se aplicaron casi todas" es falso con esos números (se aplicaron 22.000 de
  18.000). Mejor: "y se gastó todo eso y 4.000 más de la caja".
- T7.10 a 7.12, mentoría: "eliges dos acciones" es elegir de una lista. Que el alumno escriba, para cada
  acción, lo que cuesta y con qué la paga la dueña (la viabilidad es el concepto), no sólo cuál elige.
- §1.4 punto 7: agregar lo del glosario del Tema 5 (dos páginas distintas en la misma guía); punto 8:
  aclarar que los dossiers mezclan voseo y tuteo.

### Sobre la recomendación

**Se mantiene A**, con los hallazgos 1 y 2 corregidos. Las razones 1 y 3 están bien fundadas: el
dossier pone al banco como usuario desde D1 y trae literalmente al oficial de crédito con dos
solicitudes y un cupo (D3, Caso 3); y es el más barato de dibujar. La razón 2 se sostiene sólo con el
Cierre como pieza propia. B pierde el hilo de Los Cóndores y es el más caro en escritura; C deja fuera
de lugar al Tema 1 y al 7. Una sugerencia que hace a A más juego: **tomar de B más que la objeción del
Tema 7**. La escena de Don Efraín ya lo hace sin nombrarlo ("este año generamos 43 mil"): que cada
cliente traiga una frase que es un "Qué NO se puede afirmar" del dossier, y que desmentirla con un
número escrito sea el verbo fijo del bucle de A. Da tensión, calza con la esencia de §1.3 ("ningún
número decide solo") y no cuesta arte.

### Lo que está bien y conviene no tocar

- La tabla de diseño inverso (§1.2) y la esencia de §1.3: claras, verificables y fieles al dossier.
- La tabla de modalidades por tema (§3): cada una sale del verbo del subtema, con alternativa.
- Excluir Wara, Q'ente y Amaru, y citar por sección ("D4 §4.3") en vez de copiar texto.
- Los casos de contraste por tipo de entidad (§6.3): salen del dossier y no se inventan.
- El Tema 7 como "dar vuelta la mesa": el mejor momento de la propuesta.
- Tuteo en todo, sin guiones largos, términos explicados, una sola pregunta de gusto, nada en semanas.
- §6.5 (isla propia, un tema una pieza, la cartera como entradas del registro): cumple la estructura
  escalable.

### Avisos para otras partes

- `adaptador-de-dossier`: hallazgos 1, 2 y 7 para la ronda 2; el 8 es una regla que conviene sumar a su
  agente (los casos de "Estudio de Casos" no se publican con sus números).
- `disenador-de-aprendizaje` (cuando corra): la escalera tiene que anotar a qué sección apunta cada
  escalón (c), por el hallazgo 5.
- Dossier (fuera del repositorio, lo decide Ronald): el IUE en D5 a D7, la frase de D4 §4.3 y los
  ocho puntos de §1.4.

---

## 26-09-2026 · Revisión de `01-vision.md` versión 1 (director-de-juego)

**Qué se revisó:** `docs/juego/gdd/01-vision.md` v1, contra `IDEA-JUEGO.md`, `LEEME.md` del GDD,
`CLAUDE.md`, `BITACORA.md` §0 y la escena 1 que existe (`src/lib/juego/guion-planta.ts`,
`src/app/juego-proyectos/EscenaPlanta.tsx`, `src/lib/juego/nube.ts`). Se jugó mentalmente la escena 1
más lo que la visión le agrega (llegada, investigación, minijuego, caso 2) como tres alumnos: la que
sabe, el que no sabe y el que quiere terminar rápido.

**Veredicto:** llevar a Ronald **con ajustes**. El género recomendado es razonable y barato, los
pilares y los anti-pilares están bien, y el glosario sirve. Pero la visión vende como resuelto lo que
todavía es sólo un nombre: la parte que haría que esto no sea un cuestionario (la investigación) no
está definida, y la capa de gestión choca con las versiones y con la nota. Antes de mostrarla hay que
corregir los hallazgos 1 a 4; el resto puede ir como nota.

### Hallazgos, de más grave a menos grave

#### 1. La investigación, que es lo que separa esto de un cuestionario, no está diseñada y hoy sería falsa

- **Qué pasa.** Todo el argumento contra el "cuestionario con puntos" descansa en la fase de
  investigación de *Ace Attorney*: "el alumno encuentra los datos en el mundo: la placa del
  pasteurizador, los tanques, el cuaderno de producción". Pero en la escena 1 los datos ya están a la
  vista en una ficha (`fichaMaquinas` y `condicionesPlanta`: exactamente los cinco números que hacen
  falta, ni uno más). Si la investigación consiste en tocar tres objetos del dibujo para destapar esos
  mismos cinco números, es la misma ficha con tres clics de más: **decorado**. El alumno que quiere
  terminar rápido toca todo sin mirar (no hay costo), el que sabe se aburre, y nadie decidió nada.
  En *Ace Attorney* la investigación funciona porque lo difícil no es encontrar la prueba, es **darse
  cuenta de cuál contradice a quién**; eso es lo que la visión no toma.
- **Por qué importa.** Es la crítica central de Ronald. Si la primera prueba con un curso muestra
  "leer, tocar, escribir un número, elegir A/B/C", Ronald va a ver el mismo cuestionario animado que
  rechazó, ahora con más pantallas. Además el pilar 2 ("los datos se encuentran en el mundo, no en un
  enunciado") se cumple en la letra y no en el fondo.
- **Propuesta concreta.** Que 01 diga qué verbo nuevo tiene el jugador en la investigación, con tres
  opciones para Ronald (el detalle va en `02-bucle-y-mecanicas.md`):
  - **A. Recolectar (lo mínimo, barato).** Tocar objetos revela datos; se anotan solos en la libreta.
    Costo bajo, pero es decorado: no lo recomiendo solo.
  - **B. Datos de más y una contradicción (recomendada).** En la planta hay más información de la que
    se necesita (la placa dice 300 L/h de nominal, el cuaderno de producción dice lo que salió de
    verdad ayer; hay un dato que sobra, como la cámara de frío o el precio de la leche) y **alguien
    dice algo falso** (el hijo: "la envasadora es el problema"). El alumno **anota en su libreta sólo
    lo que elige** y después calcula con su libreta, no con una ficha. Así la investigación se
    evalúa ("anotó el dato que sobra", "no anotó la eficiencia") y el "presentar la prueba" de Ace
    Attorney existe de verdad: en la defensa escrita señala el dato de su libreta que desmiente al hijo.
    Costo medio: más guion por caso y reglas de versión que controlen también los datos de sobra.
  - **C. Preguntar con límite.** Puedes hacerle tres preguntas a Don Mario antes de calcular; elegir mal
    obliga a volver. Más juego, pero castiga al que no sabe qué preguntar justo en el primer caso.
  - Y en cualquiera: **la ficha con los cinco números justos desaparece** de la pantalla de cálculo;
    queda la libreta del alumno.
- Ojo con los números de la opción B: el dato de sobra y el "valor nominal" tienen que salir del dossier
  (`[DATO DEL DOSSIER]` si no están) y de `planta.ts` con pruebas, no inventados en el guion.

#### 2. El género nombra la crítica de Ronald pero no la resuelve: la resuelve la llegada, que sirve para cualquier género

- **Qué pasa.** La tabla 2.1 dice que el juego de casos "resuelve tu crítica por diseño: todo caso
  empieza con el encargo y la visita". Pero una llegada (onboarding) con encargo y visita se le puede
  poner a un tycoon, a una novela visual o a lo que sea; no es una propiedad del género. Y la otra
  mitad de la crítica ("cuestionario con puntos") el género tampoco la toca: el bucle central que
  queda (leer, escribir un número, elegir entre A, B y C, ver la consecuencia) es el mismo de la escena
  1 de hoy. La propia IDEA-JUEGO §8.2 ya había marcado que "la decisión es de opción múltiple y ya
  está resuelta" para quien calculó bien; la visión no dice cómo cambia eso.
  La comparación está además inclinada: a D (roguelite) se la descarta porque "las partidas al azar
  chocan con los números del dossier", cuando la escena 1 ya genera 999 versiones con semilla dentro
  de límites del dossier, que es el mismo mecanismo.
- **Por qué importa.** Ronald pidió que le definan y le recomienden un tipo de juego. Si la
  recomendación se apoya en un argumento que no es del género, Ronald elige por la razón equivocada y,
  cuando la llegada no alcance, no va a saber qué falló.
- **Propuesta concreta.** Separar las dos cosas en 2.2: (a) "la escena no aparece de la nada" se
  resuelve con la llegada y el encargo, y eso entra sea cual sea el género; (b) "no es un cuestionario"
  se resuelve con los verbos del jugador: investigar con criterio (hallazgo 1), **decidir entre
  opciones que no se resuelven solas con el cálculo** (por ejemplo, el tanque o no comprar si Don
  Mario tiene poca caja y un pedido grande en riesgo: el número informa, no decide) y defender.
  El juego de casos sigue siendo la recomendación, pero por lo que realmente aporta: una unidad que
  calza con la semana del dossier, un cierre que es la defensa oral, y bajo costo. Corregir la fila
  de D para que no use un argumento falso.

#### 3. La capa de gestión (caja y reputación entre casos) choca con las versiones, con el dossier y con la nota

- **Qué pasa.** La visión propone que "si le aconsejaste bien, llega con más producción; si no, llega
  con menos caja y desconfiado". Eso tiene tres problemas:
  1. **El error se arrastra a la nota.** Si el caso 2 cuenta para la nota y empieza peor porque
     fallaste el caso 1, el que no sabía queda penalizado dos veces. En un juego de entretenimiento
     eso es tensión; en uno que pone nota es injusto y Ronald lo va a tener que explicar.
  2. **No sale del dossier.** El dossier de la Semana 2 tiene un caso con sus números; "Don Mario con
     menos caja" es una segunda versión del caso 2 que nadie escribió. El pilar 4 ("los números
     salen del dossier") se rompe o el trabajo de cada caso se duplica.
  3. **Hoy no hay rama real.** La escena 1 permite "volver a intentar" tras la mala decisión, así
     que casi todos terminan con el tanque. La rama "mal aconsejado" sólo la verían quienes no
     vuelven a intentar.
- **Por qué importa.** Es lo que la visión presenta como la diferencia con un cuestionario (el mundo
  recuerda), y es la parte más cara y más frágil del documento.
- **Propuesta concreta.** Dos opciones para Ronald:
  - **A. Sólo la historia pasa entre casos (recomendada para el nivel 1).** Don Mario recuerda qué le
    aconsejaste y lo dice en una línea al empezar el caso 2; los números del caso 2 son los del
    dossier (con la versión del alumno), iguales para quien acertó o falló. Costo: casi nada. La
    reputación queda como adorno narrativo (quién te recomienda), sin números.
  - **B. Caja y reputación con números, fuera de la nota.** Se arrastran, pero la nota del caso sólo
    mira el razonamiento dentro del caso. Costo: dos variantes por caso y reglas de versión para
    ambas. Mejor para el nivel 3 (sobre SIMPRO), donde la economía sí existe.
  Corregir en consecuencia la decisión pendiente 2 y el punto 3 de la sección 3.

#### 4. Contradicciones con lo decidido y con la escena 1

- **La nota.** El pilar 5 dice "la nota se pone en la defensa, no en el juego" y la decisión pendiente
  4 dice "el caso registra cómo razonó, la defensa pone la nota". IDEA-JUEGO §3 dice "la nota sale del
  caso más la defensa", y la escena 1 ya se lo dice al alumno (`FINAL` en `guion-planta.ts`: "La nota
  sale de acá más tu defensa en clase"). Un pilar no puede fijar lo que la misma parte deja como
  decisión pendiente. **Propuesta:** el pilar 5 queda como "todo se juega para poder defenderlo" y la
  frase sobre la nota se quita hasta que Ronald decida el reparto en `04-aprendizaje.md`.
- **"Proyectado, el modo proyector de las láminas ya existe".** Existe para `LaminaShell`; la escena
  del juego no usa ese shell, y el modo proyector de las láminas todavía está pendiente de que Ronald
  lo pruebe en clase (CLAUDE.md). **Propuesta:** decir "habría que adaptarlo".
- **"Se puede jugar sin red; se guarda cuando vuelve la conexión".** No es lo que hay: la página del
  juego es borrador y los borradores no entran en la precarga del service worker
  (`scripts/precarga-sw.mjs` sólo precarga lo del sitemap); entrar con Google necesita red; y el
  guardado en `EscenaPlanta.tsx` se reintenta "con la próxima respuesta", así que si falla al
  **entregar** (el último paso) no hay próxima respuesta y la entrega queda sin subir hasta recargar.
  **Propuesta:** en 01 decirlo como requisito ("tiene que poder…"), no como hecho, y anotar el
  reintento de la entrega como tarea para el código.
- **"La escena 1 es la vertical slice".** Una vertical slice es con la calidad final; el arte es con
  código "hasta probar con un curso" (decidido). **Propuesta:** "es la primera rebanada; la calidad
  final del arte se decide después de la prueba".
- **Datos nuevos sin marca.** "Llegas en la flota a Punata" y "tu mentora de la consultora" son
  propuestas de mundo (parte 05, que no existe); están escritas como hechos. Marcarlas como supuestos.

#### 5. El tamaño: un caso por semana es demasiado para una persona, y 20 a 40 minutos es demasiado para un celular

- **Qué pasa.** La escena 1, que ya existe, llevó varios días de trabajo: motor con versiones y reglas
  que conservan la lección, diagnóstico de errores típicos, pistas, guion revisado en 200 versiones,
  pruebas, registro y página del docente. La visión propone un caso **por semana** (unas 16 por isla)
  con investigación, minijuego y variantes por caja. Sobre la duración: el definidor de esta revisión
  apunta a 10 a 20 minutos por escena; la escena 1 de hoy se juega en unos 10 a 15, y con llegada e
  investigación llega a 20. Pedir 40 minutos en un micro, con el teclado del celular tapando media
  pantalla, es pedir que lo dejen a la mitad.
- **Por qué importa.** El riesgo que ya se le dijo a Ronald (IDEA §4: "un juego se come el tiempo si
  no se limita") vuelve por la puerta de atrás. Y un caso que no se termina no llega a la defensa.
- **Propuesta concreta.** Opciones: **A. un caso por unidad del dossier** (4 a 6 por isla, recomendado);
  **B. un caso por semana, pero corto** (sólo cálculo y decisión, sin investigación, casi un
  ejercicio); **C. un caso por semana completo** (costo de semanas por caso, no lo recomiendo).
  Duración objetivo: **10 a 20 minutos por caso**, partido en tramos de 5 que se guardan solos.
  El minijuego de ordenar máquinas, marcarlo como opcional y para después de la prueba con un curso.

#### 6. El celular: "un cálculo por pantalla" y "calculas con tu libreta" se pisan

- **Qué pasa.** Si los datos salen de la investigación (hallazgo 1), al calcular el alumno necesita
  ver su libreta y escribir a la vez. En 375 px con el teclado abierto quedan unos 350 px de alto.
  La visión dice "un cálculo por pantalla" pero no dónde queda la libreta.
- **Propuesta concreta.** Que 02 defina la libreta como una franja fija arriba del campo (plegable), y
  que se mida con Playwright en 375×812 con el teclado abierto, como se midió la escena 1.

#### 7. Poco claro para quien no es desarrollador de videojuegos

- La tabla 2.1 (cuatro columnas por seis filas) no se lee en un celular y mezcla criterios; Ronald va
  a leerla en la artifact o en el teléfono. **Propuesta:** una tarjeta por género con tres líneas
  ("qué haces", "qué pide al alumno", "por qué sí o por qué no").
- "*Case-based adventure* con *management layer*" está bien como etiqueta, pero conviene una frase de
  la vida real: "cada semana te llega un cliente, visitas su empresa, haces la cuenta y le aconsejas".
- Términos que se definen y después no se usan (estado de falla) o que se usan sin definir (flota,
  "presentar la prueba" como mecánica). Revisar.

#### 8. Las medidas de éxito miden la obligación, no el juego

- "8 de cada 10 lo entregan": si cuenta para la nota, lo entregan aunque sea aburrido. "¿Volverías
  a jugar?" preguntado a alumnos que el docente va a evaluar da siempre que sí. "Mejor que un curso
  sin el juego" no tiene contra qué compararse.
- **Propuesta:** medir lo que no se puede fingir: cuántos **reabren** el caso después de entregarlo
  o antes de que sea obligatorio, cuánto tiempo pasan en la investigación contra la pantalla de
  cálculo, y la pregunta de comprensión al final (esa sí está bien). Para comparar la defensa,
  pedirle a Ronald una nota de referencia de un curso anterior con el mismo tema.

### Lo que está bien y conviene no tocar

- Los cinco pilares (salvo la frase de la nota del 5) y los anti-pilares: son claros y ya sirven de filtro.
- El glosario de la sección 0: justo lo que Ronald pidió.
- Dejar el tycoon completo para el nivel 3 y meter SIMPRO como herramienta dentro de los casos.
- *Papers, Please* como referencia de tamaño y de "el error llega después, como consecuencia".
- La pregunta de una línea "¿de qué era la empresa y qué problema tenía?" para medir la llegada.

### Avisos para otras partes

- `02-bucle-y-mecanicas.md`: tiene que definir el verbo de la investigación (hallazgo 1) y la
  decisión que no se resuelve sola con el cálculo (hallazgo 2).
- Código (no es del GDD): el reintento de guardado tras la entrega en `EscenaPlanta.tsx` (hallazgo 4).
