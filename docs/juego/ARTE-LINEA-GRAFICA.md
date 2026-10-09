# Línea gráfica de los juegos de RON_DOC

> Decidida con Ronald el 09-10-2026. **Una sola línea gráfica para todos los juegos** (así se reconoce que son de la misma casa); **el ambiente cambia por escena** (lugar, luz, color). Esta guía fija la línea; los ambientes de cada juego los propone el director de juego con el narrativo y los aprueba Ronald (`docs/juego/gdd/aspecto-<materia>-<tema>-ambientes.md`).
> Todo dibujo nuevo sigue esta guía y pasa el control `scripts/verificar_arte.py`. El arte que no la cumple es provisional y se reemplaza.

## 1. Qué es línea y qué es ambiente

| Es **línea** (igual en todos los juegos) | Es **ambiente** (cambia por escena y por juego) |
|---|---|
| Paleta base de 32 colores | Qué colores de esa paleta dominan en la escena |
| Tamaño de los dibujos y cómo se escalan | El lugar: oficina, archivo, patio, sala de consejo… |
| Contorno, sombreado, forma de las caras | La hora y la luz: lámpara, fluorescente, amanecer |
| Cómo se dibuja un documento, un botón, una ficha | Qué objetos hay en la escena |

**Cómo cambia un ambiente sin dibujar todo otra vez:** el arte se dibuja una vez con la paleta base y cada ambiente es una **tabla de cambio de colores** (cada color base pasa a otro color de la misma paleta) más la capa de luz del motor (velo, luz de la lámpara, polvo). Es la técnica profesional del *palette swap*.

## 2. Paleta base: EDG32 (ENDESGA, Lospec)

32 colores. **No se usa ningún color fuera de esta lista** (más el fondo transparente). La página de Lospec no declara una licencia; es una paleta de uso común entre desarrolladores, y se **da crédito a ENDESGA** en los créditos del sitio.

| Rampa | Colores (de claro a oscuro) |
|---|---|
| Piel y papel | `#ead4aa` `#e8b796` `#e4a672` `#c28569` `#b86f50` |
| Madera y tierra | `#d77643` `#be4a2f` `#733e39` `#3e2731` |
| Luz cálida | `#fee761` `#feae34` `#f77622` |
| Rojos y rosas | `#ff0044` `#e43b44` `#a22633` `#f6757a` `#b55088` `#68386c` |
| Verdes | `#63c74d` `#3e8948` `#265c42` `#193c3e` |
| Azules | `#2ce8f5` `#0099db` `#124e89` |
| Grises y noche | `#ffffff` `#c0cbdc` `#8b9bb4` `#5a6988` `#3a4466` `#262b44` `#181425` |

Reglas de uso: el **negro puro no existe**; lo más oscuro es `#181425`. El **blanco puro** solo para el brillo más fuerte. Texto que lee el alumno: contraste mínimo 4,5 a 1 (regla común).

## 3. Tamaños (siempre se escala por números enteros: 2×, 3×, 4×)

| Cosa | Tamaño de dibujo |
|---|---|
| Escena completa | 188 × 150 px lógicos |
| Personaje principal de cuerpo (la jefa) | 48 × 64 px |
| Retrato de diálogo | 32 × 32 px (se muestra a 2× o 3×) |
| Objeto grande (escritorio, estante) | múltiplos de 8 px |
| Objeto chico (taza, teléfono, lámpara de mesa) | 8 a 32 px |
| Documento (papel de la carpeta) | 40 × 50 px |
| Ícono de interfaz (ficha, botón) | 16 × 16 o 32 × 32 px |

Los dibujos se guardan al tamaño lógico, **sin suavizado** (el navegador los amplía con `image-rendering: pixelated`).

## 4. Contorno y sombreado

- **Contorno de 1 px del color más oscuro de la misma rampa** (nunca negro puro). Objetos lejanos o de fondo, sin contorno.
- **Tres tonos y un brillo por material:** luz, base, sombra, y un punto de brillo.
- **La luz principal viene de la lámpara, arriba a la izquierda.** Las sombras caen hacia abajo a la derecha, un tono más oscuro de la rampa.
- **Sin degradados ni transparencias a medias:** cada píxel es opaco o transparente. Se permite una trama de 2×2 solo en zonas grandes de transición.
- Siluetas que se lean a tamaño 1×: si no se entiende en miniatura, se simplifica.

## 4b. Separación entre la figura y el fondo (Ronald, 09-10: «cuidado con la combinación de colores y la pérdida de detalle»)

- **Una figura nunca tiene el mismo valor (claridad) que el fondo que tiene detrás.** Pelo oscuro sobre pared oscura se funde y se pierde la silueta; pasó al convertir automáticamente la escena a la paleta: el pelo `#3e2731` y la pared `#262b44` cayeron los dos en `#181425`. Regla: entre la figura y su fondo hay **al menos dos escalones de valor** de la rampa de grises y noche, o un contorno claro de 1 px (una «luz de borde» del color de la lámpara).
- **El fondo usa rampas frías (azul, gris-azulado) y las figuras rampas cálidas (piel, madera, vino)**: así se separan por tono además de por valor.
- **Las superficies con textura (pared de ladrillo, escritorio de madera) no se convierten automáticamente a la paleta**: el cambio automático las llena de ruido o las aplana. Se **redibujan con una pieza repetida** (un ladrillo, un trozo de tabla) o se dejan como están, marcadas como provisionales.
- **Todo cambio automático de color se mira antes de usarlo**, con la pantalla ampliada, comparando contra el original (`docs/juego/arte/<juego>/escena-antes-convertida.png` es el ejemplo de lo que sale mal).

## 5. Personajes y caras

- Proporción ligeramente caricaturesca: cabeza de un tercio del alto en los personajes principales.
- Ojos de 2 × 2 px; un **rasgo distintivo por personaje** (lentes de la jefa, gorra y silbato de Beto, traje del director).
- La jefa tiene **3 poses y 3 gestos** como mínimo (brazos cruzados, cabeza entre las manos, pulgar arriba). Cara solo para los personajes principales; el resto va en silueta, como se decidió.
- Un personaje se dibuja una vez, con su rampa de piel y ropa; los retratos salen de la misma paleta del cuerpo.

## 6. Documentos y objetos del juego

Un tipo de papel por documento (cuaderno, informe, acta, calendario, lista, oficio, carta…), todos con la misma forma de hoja y **un detalle que lo distingue a un vistazo** (cuadrícula, membrete, sello, tabla). Los papeles que se abren se leen en el lector con letra del juego; el dibujo solo sirve para reconocerlos en la carpeta.

## 7. Cómo se dibuja cada pieza (método)

1. Cada sprite se escribe como **texto**: una letra por color de la paleta y una línea por fila de píxeles, en `docs/juego/arte/<juego>/<pieza>.px`.
2. `scripts/generar_arte.py` (**por hacer**, es el primer paso de la prueba) los convierte a PNG y arma una **hoja de estilo** (todas las piezas juntas, ampliadas) para compararlas.
3. Se **mira** la hoja ampliada y se corrige. Un dibujo no se da por bueno sin verlo.
4. `scripts/verificar_arte.py` comprueba: solo colores de la paleta, ningún píxel semitransparente, tamaño esperado. Los efectos de luz (cono, brillo, polvo; archivos con «luz», «cono» o «mota» en el nombre) son la excepción: llevan transparencia a propósito. **Estado 09-10:** el arte provisional actual no cumple (0 de 10 sprites; la oficina usa 75 a 119 colores en lugar de los 32): se reemplaza.
5. El crítico revisa la hoja de estilo contra esta guía antes de que Ronald la vea.

Herramientas gratuitas por si alguien quiere retocar un PNG a mano: Pixelorama, LibreSprite, Piskel.

## 8. Qué se reutiliza en otros juegos

La paleta, esta guía, el control y los **métodos** (palette swap por ambiente, dibujo en texto). **No** se reutilizan personajes, escenarios ni objetos de otro juego: cada materia dibuja los suyos con la misma línea (regla «motor común, juego propio»).

## 9. Créditos

Paleta EDG32 por ENDESGA (lospec.com/palette-list/endesga-32).
