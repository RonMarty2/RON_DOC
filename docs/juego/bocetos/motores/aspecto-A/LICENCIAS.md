# Licencias del boceto La redaccion de noche (Direccion A)

Generado por `descargar_assets.py` el 2026-10-08. La licencia se LEE del `License.txt` de cada zip; si no dice CC0, el paquete se rechaza.

## Paquetes de Kenney (https://kenney.nl)

| Paquete | Estado | De donde | Primera linea de su License.txt | PNG |
|---|---|---|---|---|
| pixel-ui-pack | OK CC0 | https://kenney.nl/media/pages/assets/pixel-ui-pack/821e760f21-1677661508/kenney_pixel-ui-pack.zip | ############################################################################### | 36 |
| emotes-pack | OK CC0 | https://kenney.nl/media/pages/assets/emotes-pack/d00a3dcb06-1677578798/kenney_emotes-pack.zip | Emotes | 513 |
| 1-bit-pack | OK CC0 | https://kenney.nl/media/pages/assets/1-bit-pack/aa867a1f37-1677578516/kenney_1-bit-pack.zip | 1-Bit Pack (1.2) | 14 |
| cursor-pixel-pack | OK CC0 | https://kenney.nl/media/pages/assets/cursor-pixel-pack/092f2b012b-1720601332/kenney_cursor-pixel-pack.zip | Cursor Pixel Pack (1.0) | 223 |

Todos los archivos de un paquete comparten su licencia (CC0: dominio publico, sin obligacion de dar credito; igual se agradece a Kenney).

## Piezas de Kenney que usa `index.html`

- `emote_alerta`: emotes-pack/PNG/Pixel/Style 1/emote_exclamation.png
- `emote_feliz`: emotes-pack/PNG/Pixel/Style 1/emote_faceHappy.png
- `emote_triste`: emotes-pack/PNG/Pixel/Style 1/emote_faceAngry.png
- `emote_duda`: emotes-pack/PNG/Pixel/Style 1/emote_question.png
- `cursor`: no encontrada

Lo que NO se uso del todo: `pixel-ui-pack` y `1-bit-pack` se bajaron y estan en `assets/kenney/`, pero este boceto usa botones, tubos y fichas PROVISIONALES propios (ver abajo); se pueden cambiar por piezas de esos paquetes en la siguiente vuelta.

## PixiJS

- PixiJS 7.4.2 (licencia MIT, jsDelivr), 456133 bytes, sha256 9ddba9cd78bc8610. Se carga del CDN `cdn.jsdelivr.net/npm/pixi.js@7.4.2` y, si falla, de `assets/vendor/`.

## Arte PROVISIONAL propio (hecho por script)

Todo `assets/provisional/*.png` y `arte-provisional.js` lo dibuja `generar_arte_provisional.py` (pixel art hecho por codigo). No viene de ningun otro juego ni paquete. Es PROVISIONAL: un artista lo reemplaza. Piezas: sala, mesa, lampara, cono de luz, carpeta, 6 papeles, hoja de lectura, tubos de tinta, fichas, titular, 3 botones, cubiculo, editora (3 poses), silueta de Dani, telefono, taza, polvo, sombra, etiqueta, sellos.

## Fuente de letra

- Press Start 2P (Google Fonts, licencia SIL OFL 1.1), cargada por CDN desde fonts.googleapis.com; si falla, cae a monospace.
