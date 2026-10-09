# RETOMAR el juego de RON_DOC (nota de relevo, 08-10-2026)

> Para quien llegue sin el contexto de la conversación (otra sesión, otra PC, o después de un corte). Léela entera antes de tocar nada.
> Ronald es el docente y dueño del proyecto. Habla directo, se frustra si le repiten preguntas o le explican con jerga. Explícale todo **en simple**.

## 0. Qué hacer al llegar (en este orden)

1. `git pull --ff-only` y `git status`. Si hay archivos sin subir, di cuáles y de cuándo antes de tocar nada.
2. Lee `BITACORA.md` §0 (lo más nuevo, arriba) y esta nota.
3. Estado al cortar (08-10, 18:51): **diseño en papel del Tema 1 COMPLETO** (ideas, forma, aspecto, aprendizaje v2.1, bucle v2, narrativa v3, sonido v1) y **revisado por el crítico (v15 en `06-revisiones.md`, línea 108): 2 bloqueos + 7 importantes SIN corregir**. **Nada en curso.** NO rehacer narrativa ni sonido: ya existen (`05-mundo-y-narrativa.md`, `07-sonido.md`). Sigue la lista «Lo que sigue» desde el punto 1 nuevo (corregir hallazgos de v15). Verifica en el disco antes de editar. **ACTUALIZADO 08-10 (noche): la v2 del BUCLE fue RECONSTRUIDA** (`02-bucle-y-mecanicas.md`, sección «Tema 1 · bucle y mecánicas v2», con scripts en `docs/juego/gdd/scripts-t1/`; 7 puntos quedaron marcados `[RECONSTRUIR]`, ver su sección 16). La v2.1 de APRENDIZAJE (`04-aprendizaje.md`) y `ramas_t1.py` NO existen en ningún lado (confirmado en las dos PC y en GitHub): se reconstruyen DESPUÉS, siguiendo la lista «Ajustes que necesita 04» del reporte del bucle (I1, B1, B2, I6, tipo B del caso 2, vocabulario). Orden: aprendizaje v2.1 -> copiar textos en narrativa -> sonido -> crítico otra vez.  **Actualización 09-10: aprendizaje v2.1 y ramas_t1.py ya reconstruidos y guardados en git.**
4. No empieces nada nuevo: pregúntale a Ronald en qué punto quiere seguir **solo si los archivos no lo dicen**.

## 1. Qué es el proyecto

RON_DOC: sitio web y app de Android (Capacitor, «Aula Virtual») con el **juego de cada materia** de Ronald. Cada materia es un juego global repartido en minijuegos (**islas metafóricas**); cada isla/tema que corresponda entrega un puntaje sobre 100 y hay uno global (Ronald pondera). Código: Next.js + Supabase. Pruebas: `npm test` (3.627 al 08-10) y `npx tsc --noEmit`. **Ronald autorizó subir directo a `main`** si las pruebas pasan (`CLAUDE.md`).

## 2. Lo que Ronald decidió (no se vuelve a preguntar)

- **Materia con la que se empieza de cero: Psicoestadística Descriptiva (Psicología)**, la que él domina. «De cero» = el aspecto y el motor visual; **se conservan** el motor invisible (`src/lib/juego/`: guardado, cuentas, versiones por alumno, escalera de ayuda, registro, nube, cálculos probados), los agentes y la maqueta como base.
- **Visión para todas las materias** (`docs/juego/VISION-RONALD.md`): se extrapola la **idea**, nunca la forma ni el contenido de otro juego; cada materia se ve, suena y se enseña distinto (estadística, finanzas y bolsa no se parecen).
- **Referencias de juegos famosos: sí** (1 a 3 por materia, diciendo qué se toma y qué se cambia). **No** se copia arte, personajes, nombres ni música de un juego comercial; el arte es propio o con licencia clara.
- **El juego enseña mientras se juega**: no es cuestionario bonito ni libro hecho juego; **nunca manda a leer el dossier ni dice «según el dossier»** (sin citas para el alumno); **no enseña software** (ni jamovi, EViews ni menús).
- **La calificación ya está decidida, no se pregunta.** El **Tema 1 de Psicoestadística Descriptiva probablemente no mide nota**; otros temas sí.
- **Cada materia abre descubriendo para qué sirve lo que se verá**, con revelación al final («apenas empieza»); la mecánica cambia por materia. Si la materia no empieza con una introducción, se hace un **Tema 0**.
- Calidad visual: «lo máximo». El boceto A (rectángulos dibujados por código) le pareció «un dibujo y ya».
- Sonido: música **8 bits** por escena; la probó en Flow Music y **le gustó mucho**. Va justo después de diseñar cada nivel, isla o materia.
- Avance: resúmenes de **5 líneas por etapa** («qué hice, qué ves, qué sigue»).

## 3. El método (orden obligatorio por tema; el Tema 0 igual) y los agentes

Agentes en `.claude/agents/` (viajan por git). Registro y etapas: `.claude/agents/LEEME.md`. Reglas comunes: `docs/juego/REGLAS-COMUNES-AGENTES.md` (una copia en cada agente).

1. **Análisis y 5 a 8 ideas principales** → agente `extractor-de-ideas` → `docs/juego/gdd/ideas-<materia>-tema<N>.md`. **Ronald las aprueba** (estado «APROBADA fecha»). Sin eso, el adaptador **se detiene**.
2. **2 o 3 formas de juego** a partir de esas ideas → `adaptador-de-dossier`; luego **`critico-de-jugabilidad`** las revisa **antes** de que Ronald elija (nada llega a Ronald sin el crítico; el crítico tiene Bash y recuenta con script).
3. **Ronald elige** y dice qué le gusta.
4. **Referencias, aspecto y arte** → `director-de-juego` (propone, no dibuja todavía) → Ronald elige → recién ahí bocetos **con arte real y en el motor propuesto**, no con rectángulos.
5. Aprendizaje (`disenador-de-aprendizaje`), bucle (`disenador-de-bucle`), narrativa (`disenador-narrativo`), **sonido** (`disenador-de-sonido`, etapa 4-bis, `07-sonido.md`), crítico, construcción como borrador, `revisar-publicacion`, Ronald lo juega en el celular.

**Cada agente entrega con lista de salida (✔/✘) y no se entrega con ✘; los conteos salen de un `.py` guardado en un archivo, nunca por heredoc ni `python -c`.** La sesión no adelanta el análisis ni elige referencias o estilo por su cuenta. Un cambio a un agente: dilo antes (qué gana, qué rompe) y escríbelo en los 7 agentes y en `REGLAS-COMUNES-AGENTES.md`.

## 4. Dónde está cada cosa: Psicoestadística Descriptiva (Psicología), Tema 1

| Qué | Archivo | Estado |
|---|---|---|
| Visión de Ronald en una página | `docs/juego/VISION-RONALD.md` | Confirmada |
| Análisis de cero del Tema 1 | `docs/juego/gdd/00-tema1-de-cero-psicoestadistica.md` | Hecho |
| **8 ideas del Tema 1** (3 momentos: «Está en todo», «Cuidado con los números», «Sirve para decidir») | `docs/juego/gdd/ideas-psicoestadistica-descriptiva-tema1.md` | **APROBADA 08-10** |
| Tres formas de juego | `docs/juego/gdd/00-tema1-formas-de-juego.md` | Revisadas por el crítico (v12 en `06-revisiones.md`) |
| **Forma elegida: «La mesa de verificación»** (el alumno verifica afirmaciones en una redacción) | `docs/juego/gdd/00-tema1-forma1-ficha.md` | **Elegida por Ronald; ficha corregida con los arreglos del crítico** |
| Maqueta de los 6 temas de la materia (v3.6) | `docs/juego/gdd/00-adaptacion-psicoestadistica-descriptiva-psicologia.md` | **Sin aprobar; de consulta**. El Tema 1 de la maqueta (muestreo con niebla) quedó superado por la forma elegida |
| Aspecto: 3 direcciones con juegos de referencia | `docs/juego/gdd/aspecto-psicoestadistica-tema1-propuestas.md` | **ELEGIDA por Ronald 08-10: Dirección A «La redacción de noche»** (pixel art a color con luz de lámpara), **con cara solo para la editora y 3 a 4 personajes principales; el resto en silueta.** |
| **Boceto vivo de la Dirección A** (Caso 2, PixiJS, arte PROVISIONAL + Kenney CC0) | `docs/juego/bocetos/motores/aspecto-A/index.html` | Hecho y visto en pantalla. Ronald: «lo veo bien». Letras corregidas y medidas con `medir_legibilidad.py`. **Falta:** que el juego «diga algo» (papeles con texto, diálogos): eso sale de aprendizaje, bucle y narrativa, no del aspecto |

**La forma elegida, en una línea:** carpeta de 6 papeles por caso (sacados de un fondo de 9, con 3 claves posibles y 1 por versión), 3 acciones por caso (2 si un medidor cae a 25 o menos), dos medidores que se empujan (Credibilidad y Lectores, meta 60), arranque con personaje de reserva Dani (su número no altera nada), revelación en 8 fichas boca abajo. Simulación de estrategias perezosas: publicar siempre, retener siempre y no abrir nada pasan la meta 0 %; entender 68,9 % (el 80 % de acierto de quien entiende es una **estimación**, solo se mide con alumnos reales).

| **Aprendizaje del Tema 1** (qué enseña cada caso, registro sin nota, 8 fichas de la revelación) | `docs/juego/gdd/04-aprendizaje.md`, sección «Tema 1 · aprendizaje v1» al principio | **Hecho 08-10** (agente `disenador-de-aprendizaje`). Conteos hechos a mano: el crítico los recuenta con script. Dos «voseo» que marca `buscar_voseo.py` son falsas alarmas (primera persona en notas del equipo) |
| **Bucle y mecánicas del Tema 1** (8 casos con reglas numéricas programables) | `docs/juego/gdd/02-bucle-y-mecanicas.md`, sección propia del Tema 1 | **HECHO 08-10** (agente `disenador-de-bucle`, sección «Tema 1 · bucle y mecánicas v1» al principio). Trae reglas G1 a G12, 14 mecánicas, arranque con Dani, tablas de efectos de los casos 2 a 8, revelación en 8 cartas y escalera sin bloquear; cerró los 4 pendientes del aprendizaje. **Lo que quedó sin hacer (el agente no tuvo terminal):** correr las simulaciones de las estrategias perezosas E-S3 a E-S10 con las tablas nuevas (la simulación de la ficha §8 ya no vale: el bucle cambió varias tablas); y que el **crítico** revise los **9 ajustes que el bucle hace a la ficha** (su sección 14). `buscar_voseo.py` da 14 avisos, todos en la línea 517 (la lista de salida citando las palabras buscadas): falsa alarma |

**Decisión de Ronald (08-10, 12:2x): «probemos todo con el primer tema de esta materia y vemos qué tal»** (le da miedo trabajar en vano). Se recorre **toda la cadena con el Tema 1 y nada más** antes de tocar otro tema u otra materia.

**Lo que sigue, en orden (actualizado 08-10 18:5x; lo anterior —bucle, narrativa, sonido, crítico— ya está HECHO):**
HECHO el 08-10: bucle v2, narrativa v3 (`05`, líneas 20 a 786), sonido v1 (`07-sonido.md`), crítico v15 (`06`, línea 108). No repetir.
1. **HECHO (RECONSTRUIDO 09-10): hallazgos del crítico v15 corregidos** en `04-aprendizaje.md` v2.1 (T1.x hasta T1.10, la lista de lo no reconstruible está en T1.10) y `scripts-t1/ramas_t1.py` (0 fallos, tsc OK, 3627 pruebas). El bucle v2 ya estaba en `02`. **Falta:** copiar los textos corregidos a `05` (narrativa: ramas F3k/F6k, avisos I2/I3/I5/I7/C1/C5/C6/C9 de `02` §15), ajustes I4/C6 en `07` (sonido), y que el crítico revise otra vez con los conteos del script.
2. **Dos preguntas de gusto para Ronald, en simple, con valor recomendado:** (a) la jefa se parece a la de AIEF: recomendado sacarle vidrio y sello; (b) caso 5, turno 1: mantener la trampa pero que la aprobación venga de Beto o del director, no de la jefa.
3. **Crítico otra vez** sobre lo corregido (punto 15 de su lista), con Bash. Pendiente además: simulaciones E-S3 a E-S10 y medir legibilidad con `medir_legibilidad.py` al construir.
4. (Ronald, 08-10 tarde, frustrado por tanto papel sin juego jugable) **Propuesta de la sesión, sin OK todavía:** corregir solo B1 y B2, construir ya el **Caso 2 completo y jugable en el celular** (el del boceto) y que Ronald lo juegue antes de seguir con los otros 7 casos y con los 7 importantes. Preguntarle si quiere esto.
5. **Plan en simple a Ronald** y su aprobación (candado `plan:` en `content/islas.ts`; el aspecto ya está aprobado). Sin eso no se programa.
6. **Construir el Tema 1 como borrador** (PixiJS, reutilizando `src/lib/juego/`), `npm test` + `npx tsc --noEmit`, `revisar-publicacion`, y que Ronald lo juegue en el celular. Medir las fichas y pantallas con `medir_legibilidad.py`.
7. Con lo aprendido de este tema se **mejoran los agentes** antes de pasar al Tema 2. Un tema a la vez.

## 5. Pendientes de Ronald y propuestas sin decidir

- **Licencia de Flow Music** (música generada): la revisa él. **Ninguna pista se integra ni se publica hasta entonces.**
- **Motor y arte:** se recomienda PixiJS dentro de la web (demos de la misma escena en HTML/CSS, PixiJS y Phaser en `docs/juego/bocetos/motores/index.html`; PixiJS y Phaser se ven casi igual, lo que sube la calidad es el **arte real**). Arte: paquetes de pixel art de uso libre (Kenney, itch.io, OpenGameArt); **verificar la licencia de cada paquete**; los personajes con cara expresiva rara vez vienen hechos. Sin decisión formal todavía.
- **Cambiar el tercer escalón de la escalera de ayuda** («lee en tu dossier…», en `src/lib/juego/escalera.ts` y el guion de AIEF) por ayuda dentro del juego: **pedido, necesita su OK** antes de tocar código (afecta pruebas).
- **Candado en el código** para que `npm test` no deje avanzar un tema sin ideas aprobadas (como `plan:` y `aspecto:` en `content/islas.ts`): propuesto, **sin OK**; se recomendó esperar.
- **Dos preguntas de gusto del Tema 1 sin contestar** (ya con valor por defecto en la ficha): personaje de reserva en el arranque (por defecto, Dani con opción de datos propios); el «aún no se sabe» como cierre posible (por defecto, sí).
- La copia en conflicto de Synology `…_DownloadConflict.md` en `docs/juego/gdd/` es una foto vieja; **la borra Ronald**.
- Los juegos de **AIEF y Proyectos II** (`src/app/juego-aief`, `juego-proyectos`) quedan **solo de consulta**, no se copian.
- Playground (Google Labs): **descartado**, no disponible en su región.

## 6. Cosas técnicas útiles

- **Chrome con la extensión de Claude:** para que se conecte a Claude Code hay que **cerrar la app Claude Desktop por completo** (cerrar sesión no basta; compruébalo con los procesos de `Claude.exe`) y recargar la extensión. Flow Music: `flowmusic.app` (sesión de Ronald, plan gratuito, sale en español; cada pedido devuelve 2 versiones y **ignoró la duración pedida**: pedimos ~60 s y salió de 2:38). Primera pista: «Foggy Observatory Dawn». Hay un Chrome aparte (`PerfilNotebookLM`, puerto 9223) donde corre **otra sesión de multimedia/NotebookLM: no tocarlo**.
- Los scripts que tocan archivos van a un `.py` y se ejecutan; los `heredoc` con `\` rompen. Los archivos de reglas se editan con scripts que respetan CRLF/LF.
- Los agentes del juego están en `.claude/agents/` y **viajan por git** (no por `conectar_agentes.py`, que es de las materias).
- Los textos para el alumno van en **tuteo, castellano neutro, sin guiones largos**; comprobar con `00_PANEL_MAESTRO/buscar_voseo.py` (en la carpeta madre `1.MATERIAS`).

## 7. Errores de hoy que no deben repetirse

1. **Saltar al arte, los motores y las referencias antes de analizar el tema.** Orden: dossier → ideas → formas → su gusto → aspecto.
2. **Preguntar lo ya decidido** (la nota, la materia, el orden). Se lee `BITACORA.md` y esta nota antes de preguntar.
3. **Entregar con un ✘** o sin pasar por el crítico.
4. **Hablarle con nombres internos** («mesa de conclusiones», «forma 1B»). Todo en lenguaje de calle y con una sola pregunta a la vez.
5. **Elegir referencias o estilo por cuenta de la sesión** antes de que corra el agente.
6. **Copiar la mecánica de un tema a otro** donde no encaja (cada materia, su forma).
7. **Dibujar bocetos con rectángulos de código** y llamarlos aspecto.
8. **Dar por hecho que algo está bien sin comprobarlo:** comprobar los archivos, los conteos (con script) y las frases citadas contra el disco.

> **DECISION 08-10 NOCHE (Ronald):** narrativa v3.1 y sonido v2 ya hechos y subidos; **no se lanza otro critico completo del papel** (el Tema 1 ya tuvo cuatro, la regla pasa a UNA por tema; lo corregido se rechequeo con scripts: 72 ramas, 30 sobres, 29 codigos, 0 fallos). Sonido: pruebas S0, S2 y S9 generadas en Flow Music (Browser 2, sesion de Ronald), le gustaron; la licencia sigue pendiente. **Sigue:** plan del Tema 1 en simple para Ronald con las dos preguntas de gusto (jefa sin vidrio y sello; caso 5 turno 1 con aprobacion de Beto o del director) y la meta 65/65; el critico completo vuelve en la etapa 7, sobre el juego construido.
