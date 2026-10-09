# Encargo al agente `artista-pixel`: retratos, pared, escritorio y fichas del Tema 1 (09-10-2026)

> Si la sesión se cortó mientras este agente trabajaba, **relánzalo con este texto** (agente `artista-pixel`, `.claude/agents/artista-pixel.md`). Antes, mira `docs/juego/arte/psicoestadistica/`: si ya hay `.px` de retratos (`beto_retrato.px`, etc.), no los rehagas; continúa con lo que falta.

Lee primero `docs/juego/ARTE-LINEA-GRAFICA.md` (incluida la 4b «Separación entre la figura y el fondo»), tu archivo de agente, `docs/juego/arte/psicoestadistica/` (piezas hechas: `jefa_retrato.px`, `lampara_mesa.px`, los 9 `doc_*.px`, `hoja-de-estilo.png`, `comparacion-antes-ahora.png`), `docs/juego/gdd/aspecto-psicoestadistica-tema1-caras.md` y `docs/juego/bocetos/caras/index.html` (las funciones `caraBeto`, `caraUgarte`, `siluetaDani`, `iconoTelefono`, `iconoNota` son el punto de partida provisional) y `05-mundo-y-narrativa.md` NT1.3 (reparto). Ronald dijo que el primer retrato de la jefa «no cambió mucho» y que se gaste lo mínimo.

Dibuja con el método (`.px` en `docs/juego/arte/psicoestadistica/`, PNG con `scripts/generar_arte.py`, `scripts/verificar_arte.py`, MIRA la hoja ampliada):
1. Retratos de 32×32: **Beto** (gorra azul, silbato, sonrisa), **director Ugarte** (traje, pelo gris, serio), **Dani** (silueta), **la jefa con tres gestos** (neutral con brazos cruzados, preocupada con la cabeza entre las manos, contenta con el pulgar arriba), partiendo de `jefa_retrato.px` con más detalle de rostro.
2. Íconos de 32×32: **teléfono con ondas** (señora Quiroga) y **nota del director** (papel con timbre).
3. **Pared de ladrillo** y **tabla de madera del escritorio** como piezas de 16×16 que se repiten sin costuras (pared en rampas frías, madera en cálidas); deben separarse en valor de la jefa y de Dani (montaje ampliado para comprobarlo).
4. **Ficha** encendida y apagada de 14×14.
5. Versión «primera luz» (`ambiente-amanecer.json`) de lo nuevo.

Entrega: `.px` y PNG nuevos, hoja de estilo, salida de `verificar_arte.py` (todas cumplen), montaje de retratos en fila a 4× y montaje de pared y escritorio con la jefa delante. No tocar `src/`. Lo aprendido, en una línea por error real, en `.claude/agents/artista-pixel.md`.
