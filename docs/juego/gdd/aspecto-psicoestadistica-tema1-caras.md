# Tema 1 de Psicoestadística Descriptiva (Psicología): caras en los diálogos y tu personaje en la mesa

> **Versión:** 1 · **Fecha:** 09-10-2026 · **Estado:** PROPUESTA para que Ronald elija (no se le muestra sin pasar por el crítico). Autor: director de diseño.
> **Boceto vivo:** `docs/juego/bocetos/caras/index.html` (doble clic; tres opciones, tres pantallas cada una, a 376 px de ancho real).
> **No se reabre:** Dirección A «La redacción de noche» (elegida), cara solo para la jefa y 3 a 4 personajes principales, el resto en silueta (Ronald, 08-10).
> **No se toca nada de `src/`.** Esto es solo propuesta.

## Decisiones pendientes de Ronald

1. Elegir una de las tres opciones (recomiendo **B**), o mezclar.
2. Confirmar que **tu personaje va de espalda**, sin cara (recomendado), o preferir de perfil o con cara.

## Qué dijo Ronald y qué se hace con eso

Jugó el Paso 1 y el Caso 2. Dijo: «¿no debería haber una cara a la que relacionar los mensajes?» y «cuando salga algo que digo, ponerlo como nube de texto de mi imagen de persona en la mesa». Además tomó a la jefa (la figura con lentes de la derecha) por su propio personaje: **en la escena de hoy no existe ningún personaje del jugador**. Eso es un fallo de orientación (el alumno no sabe quién es él), no de gusto.

Se corrige con tres cosas, iguales en las tres opciones:
1. **Tu personaje está sentado a la mesa, de espalda, mirando la oficina**, con una etiqueta «TÚ» la primera vez que aparece la escena.
2. **Lo que tú dices o decides sale en una nube clara (papel) sobre tu personaje**; lo que dicen los demás sale en globo o panel oscuro. Dos colores distintos: nunca se confunde quién habla.
3. **Cada línea de otro lleva una cara** (o su equivalente) y el nombre.

## Tu personaje: de espalda, de perfil o con cara

| | De espalda (recomendado) | De perfil | Con cara |
|---|---|---|---|
| Quién se identifica | Todos: no tiene rostro ni género marcado | Casi todos, pero se ve nariz y peinado | Solo quien se parezca; si no, hay que dejar elegir |
| Qué cuesta | 1 dibujo (+1 para «escribe» o «sostiene la hoja») | 1 dibujo más difícil de variar | Dibujo + varios avatares o un editor |
| Riesgo | Parece «nadie»; se arregla con la etiqueta y la nube | Se lee como un personaje con nombre | Se confunde con la jefa si no se distingue su ropa |

Ropa: chaqueta verde azulada, distinta de la blusa guindo de la jefa y del negro de Dani.

## Reparto con cara (ya decidido, solo se muestra cómo)

| Personaje | Cómo se ve la cara | Dónde |
|---|---|---|
| La jefa (Ximena Rocabado) | Con cara, 3 poses (brazos cruzados, cabeza entre las manos, pulgar arriba) | Retrato = recorte del mismo dibujo de la escena |
| Beto | Con cara: gorra, silbato, bigote | Retrato nuevo |
| Director Ugarte | Con cara: pelo gris, traje, corbata | Retrato nuevo |
| Dani | **Silueta** oscura (el nombre cambia por alumno) | Retrato de silueta |
| Señora Quiroga (madre) | **Teléfono** con ondas; sin rostro | Retrato-ícono |
| Nota del director | **Papel con timbre** | Retrato-ícono |
| Narración | Sin retrato (texto en cursiva) | Nada |

## Las tres opciones

**A · Globos sobre los personajes.** Todo se dice en un globo sobre quien habla (como los juegos de aventura clásicos de LucasArts, p. ej. *Monkey Island*: la línea de cada personaje flota sobre su cabeza). Desaparece el panel de diálogo. La cara es el propio dibujo de la escena. Tu nube sale sobre tu cabeza.
- Lo malo: con letra de 20 px caben unas 3 líneas (cerca de 110 caracteres) antes de tapar el borde de arriba; una línea de la jefa de 25 palabras (unos 150 caracteres) obliga a partirla en dos globos. La cara de la jefa se ve de unos 60 px de alto y no cambia. La madre, la nota y las voces sin lugar en la escena quedan sin cara.
- Costo: **bajo**. Arte: 1 dibujo (tú). Código: el diálogo pasa del panel a la escena.

**B · Cara junto al texto, y tu nube sobre ti (recomendada).** El texto de los demás sigue en el panel de abajo, a letra grande, con un retrato de 56 x 68 px a su lado (sale por arriba del panel) y el nombre. Al hablar, el personaje se ilumina en la escena y los demás se oscurecen. Tu nube sale sobre tu cabeza; tu decisión («¿Firmar? Después no hay vuelta.») queda en el panel con sus botones. Referencia de juego: los cuadros de diálogo con retrato de *Phoenix Wright: Ace Attorney* y de *Undertale* (qué se toma: el retrato fijo junto al texto, que enseña a leer «quién habla» de un vistazo; qué se cambia: ahí el retrato es de cuerpo entero estilo anime, aquí es pixel art de la oficina, y tu personaje habla con nube en la escena).
- Lo bueno: es lo único que da cara a **todas** las voces (también la madre, la nota, Beto, el director, Dani) sin ocupar la escena; el texto no se encoge.
- Lo malo: el retrato tapa 34 px de la escena abajo a la izquierda; hay que dibujar 5 retratos más.
- Costo: **medio**. Arte: tu personaje + 5 retratos nuevos + 3 recortes de la jefa (que ya existen). Código: `Dialogo` gana un retrato; la escena gana tu personaje, la nube y la iluminación del que habla.

**C · Acercamiento de cámara.** Al hablar alguien, la escena se acerca a esa persona (la cara crece). El texto va en un rótulo abajo. Cuando hablas tú, la cámara se acerca a tu espalda y tu nube sale arriba.
- Lo bueno: la reacción de la jefa pega más; es lo que más se siente como un juego.
- Lo malo: los dibujos actuales se ven a cuadritos al ampliarlos 4 veces: hay que redibujar caras más grandes; muchas líneas seguidas con la cámara yendo y viniendo cansan; la madre y la nota igual necesitan un ícono.
- Costo: **alto** (todo lo de B más una cámara que se acerca y se aleja). Se puede sumar después sobre B sin rehacerlo.

## Recomendación (una)

**B.** Cumple literalmente lo que pidió Ronald (una cara por línea; tu nube de texto sobre tu personaje), mantiene el texto grande y legible en 376 px, y es la única que da cara a todo el reparto sin apretar la escena. Si algún día quiere más cine, C se monta encima de B sin rehacer nada.

## En el celular de 376 px (cómo cabe)

- Escena: 376 x 300 px (la oficina ampliada exacto 2 veces).
- Panel de B: retrato 62 x 74 px con marco; el texto va a 21 px y rodea el retrato; botones de 48 px de alto, de ancho completo (o dos de la mitad cada uno).
- Tu nube: 244 px de ancho sobre tu cabeza (no llega a la jefa, que está del lado derecho).
- Textos del boceto: cuerpo 20 a 21 px (VT323), nombres 12 px (Press Start 2P).
- Colores (contraste calculado con los dos colores, a mano):
  - Texto de otros `#ece7f7` sobre `#1d1838`: **14,0 a 1**.
  - Tu nube, tinta `#2a2236` sobre papel `#f1e8cf`: **12,5 a 1**.
  - Nombre `#ffcf7a` sobre `#1d1838`: **11,7 a 1**; `#5a3a14` sobre papel: **8,4 a 1**.
  - Botón `#1a1410` sobre `#ffcf7a`: **12,6 a 1**.

## Qué se puede hacer ya con arte provisional y qué necesita artista

- **Ya, con arte provisional (hecho por código, como el actual):** tu personaje de espalda, retratos de Beto, Ugarte, Dani (silueta), la madre (teléfono con ondas) y la nota; recortes de la jefa. Todo está dibujado en el boceto.
- **Necesita un artista (o un paquete de uso libre) para quedar bien:** las caras finales con 2 o 3 expresiones cada una (la jefa en un tamaño pensado para el retrato, no un recorte; Beto y Ugarte), y tu personaje con 2 poses (quieto y «escribiendo»). **No propongo ningún paquete nuevo**: los paquetes libres que ya se usan (Kenney, CC0) traen interfaz e íconos pero no retratos de este estilo; si más adelante se propone uno, se lee su licencia antes. Los íconos de un globo (exclamación, duda) pueden salir del *Emotes Pack* de Kenney, que ya está anotado.

## Qué más cambia (ideas propias, marcadas)

- **Idea propia:** la primera vez, un rótulo «TÚ» sobre tu personaje (el boceto lo muestra en A1 y B1). Desaparece después. Atiende lo que le pasó a Ronald con la jefa.
- **Idea propia:** la hoja «Para empezar» y las respuestas del alumno salen **en tu nube**, no en un panel: ves tu respuesta salir de tu boca.
- **Idea propia:** los botones «Firmar tal cual» y «Frenar» se muestran como tu nube con una sola palabra (la firma, el alto), antes de que hable la jefa.

## Límites de este boceto (dichos claro)

- El arte de los personajes es provisional y está dibujado a mano en el HTML; no es el nivel final.
- El boceto usa el mismo arte de la escena de hoy (PNG del juego); no tiene niebla, partículas ni música.
- Las frases de ejemplo: la de la jefa y la del encargo salen del guion del juego; la de la madre es del guion con el nombre del colegio quitado; la de tu nube («Bajaron las denuncias, pero antes cambió el registro.») es un ejemplo, no el texto real de la frase armada.
- La fuente VT323 se carga de internet; sin conexión, el navegador usa una letra de máquina de escribir más ancha y las líneas se ven más largas que en el juego.

## Lista de salida

> **Aviso inicial:** esta sesión **no tuvo terminal (Bash)**, así que no se pudo correr ningún script ni sacar una captura. Lo contable está calculado a mano y lo que pide medición queda **pendiente** (cuenta como ✘). La sesión que reciba esto debe abrir `index.html` a 376 px de ancho, hacer la captura y revisarlo.

| Regla | Marca | Prueba |
|---|---|---|
| Oficio de la carrera (3 líneas) | ✔ a mano | (1) Carrera: Psicología (nombre del documento del tema). (2) El profesional: psicólogo de colegio / orientador. (3) Papel del jugador: orientador del departamento que verifica lo que llega; tu personaje es ese orientador sentado a la mesa. |
| No reabre lo decidido (A «Redacción de noche»; cara solo jefa y 3 a 4) | ✔ a mano | Reparto: jefa, Beto, Ugarte con cara (3); Dani silueta; madre teléfono; nota papel |
| 2 o 3 bocetos, una recomendación | ✔ a mano | A, B, C; recomendada B |
| Cada boceto resuelve los 5 puntos (cara/quién habla, tu personaje, tu nube, 375 px, costo) | ✔ a mano | Tres secciones del boceto con 3 pantallas cada una; costo en este archivo |
| Boceto con imagen real, no rectángulos sueltos | ✔ a mano | Usa los PNG de `public/juego/psicoestadistica/` (sala, mesa, jefa, Dani, teléfono, lámpara, taza, luz) |
| Boceto en el motor (PixiJS) | **✘** no cumple | Es HTML estático (lo pidió el encargo); la luz es un PNG con mezcla de pantalla. Dicho. |
| Texto que se lee: 12 px, contraste 4,5, nada tapado, nada fuera | ✔ parcial (a mano) / **✘ pendiente** la medición | Tamaños y contrastes calculados arriba (los 4 pares dan 8,4 a 14,0). **Pendiente:** captura a 376 px y revisar que ningún globo tape la jefa ni se salga (no pude abrirlo) |
| Cada pantalla dice qué hace, qué se toca y qué pasó | ✔ a mano | Rótulo «TÚ» en A1 y B1; botón con texto; la decisión muestra «¿Firmar? Después no hay vuelta.». La orientación del resto es de la pantalla real, no de este boceto |
| Nada de otro juego de RON_DOC | ✔ a mano | Oficina de noche propia; personajes del guion del tema |
| Sin software, sin «según el dossier», sin nota | ✔ a mano | Releído |
| Tuteo, sin guiones largos, sin voseo | ✔ a mano | Releído; sin terminal no corrí `buscar_voseo.py`: **pendiente** su corrida |
| Referencias reales | ✔ a mano | *Monkey Island* (A), *Phoenix Wright* y *Undertale* (B), dichas de memoria y sin búsqueda en la web: qué se toma y qué se cambia está arriba |
| Licencias | ✔ a mano | No propongo ningún paquete nuevo; el arte nuevo es propio |
| Lo que pide Bash (conteos, medición) | **✘ pendiente** | Sin terminal en esta sesión; ver aviso |
| No se tocó `src/` ni nada del juego | ✔ a mano | Solo dos archivos nuevos: este y `docs/juego/bocetos/caras/index.html` |
