# RETOMAR el juego de RON_DOC (nota de relevo, 08-10-2026)

> Para quien llegue sin el contexto de la conversación (otra sesión, otra PC, o después de un corte). Léela entera antes de tocar nada.
> Ronald es el docente y dueño del proyecto. Habla directo, se frustra si le repiten preguntas o le explican con jerga. Explícale todo **en simple**.

## ⭐ EMPIEZA AQUÍ · Estado al 08-10-2026, 23:04 (PC RonMarty) · Ronald pidió dejar todo anotado para retomar en otra sesión

> Este bloque manda sobre todo lo que está más abajo (lo de abajo es historia y detalle). Si algo de abajo lo contradice, vale este bloque.

### ACTUALIZACIÓN 09-10, 07:12: ya hay pantalla (Paso 1 + Caso 2)
Ronald contestó la pregunta («un solo caso primero», opción B: Paso 1 + Caso 2). Hecho y subido: `src/app/juego-psicoestadistica/` (ver `BITACORA.md` §0, 09-10 07:12). **Falta verla en un navegador real** (esa sesión no tuvo la extensión de Chrome): abrir `npm run dev` y `/juego-psicoestadistica/` en celular y escritorio, mirar la escena de PixiJS y la legibilidad (regla «todo texto se mide»: correr `medir_legibilidad.py` o equivalente). Después: Ronald lo juega y dice qué cambiar; recién entonces se arman los casos 3 a 8 (mismo método: texto por script, lógica con pruebas, pantalla).

### En una frase
El Tema 1 de Psicoestadística Descriptiva («La mesa de verificación») tiene **todo lo de adentro hecho y subido a GitHub**, pero **todavía no se puede jugar**: falta la pantalla.

### Cómo explicárselo a Ronald (él se enredó con los nombres técnicos; usar siempre esta comparación)
Es como un juego de mesa. Ya están **el reglamento y las cartas escritas** (el diseño que él aprobó) y **el árbitro** (el programa que aplica las reglas solo). Falta **el tablero**: lo que se ve y se toca. No decirle «motor», «bloque», «ramas», «paridad» ni «fixtures». Una sola pregunta a la vez.

### Lo que YA está hecho (no rehacer; todo en GitHub, `git status` limpio al cerrar)
| Qué | Dónde | Estado |
|---|---|---|
| Diseño del Tema 1: 8 casos, reglas, textos, sonido | `docs/juego/gdd/02`, `04`, `05`, `07` | Aprobado por Ronald (plan y aspecto, candado en `content/islas.ts`) |
| Medidores, meta 65/65, versión distinta por alumno | `src/lib/juego/psicoestadistica/` (`reglas-t1`, `efectos-t1`, `medidores`, `version`, `simulador-t1`) | Hecho y probado |
| Carpetas de papeles, cifras de cada caso, qué pasa con cada decisión | `carpeta`, `cifras`, `tandas`, `bienestar`, `respuestas` | Hecho y probado (era lo que quedó a medias cuando se cortó la cuota; no se perdió nada) |
| Qué carta del final le toca a cada alumno (72 posibles) | `ramas-t1.ts` | Hecho y probado contra el modelo en Python |
| Registro para el docente: 8 casillas por alumno, hábitos, plaza fija | `registro-t1.ts` | Hecho y probado |
| Las 8 cartas del final con sus textos y cifras | `revelacion-t1.ts` + `guion-t1.json` | Hecho y probado |
| Ayuda que nunca traba: sobre de la jefa y expediente de otro año | `ayuda.ts` | Hecho y probado |
| El texto de los 72 papeles, con las cifras de cada alumno | `papeles-t1.ts` + `papeles-t1.json` | Hecho y probado |

Pruebas al cerrar: `npm test` 3.847 en verde (49 archivos), `npx tsc --noEmit` limpio. Último commit: `a68e79e` (más el de esta nota).

**Los textos no se escriben a mano en el código.** Salen de `05-mundo-y-narrativa.md` con tres scripts de `docs/juego/gdd/scripts-t1/` (correr con `python`, no `python -I`): `exportar_guion_t1.py` (cartas, sobres, expedientes), `exportar_papeles_t1.py` (papeles) y `exportar_ramas_t1.py` (datos de prueba). Si cambia la narrativa, se vuelven a correr.

### Lo que FALTA para que Ronald lo juegue en el celular, en orden
1. **La pantalla** (lo más grande): la oficina de noche, la carpeta, los papeles, los tubos, la jefa, los botones, las cartas. PixiJS dentro de la web, aspecto A «La redacción de noche». Lo único que existe es el boceto del Caso 2: `docs/juego/bocetos/motores/aspecto-A/index.html` (arte PROVISIONAL, paquetes Kenney de uso libre). **No existe todavía ninguna página del juego en `src/app/` para Psicoestadística.**
2. **Textos que faltan pasar al código** (ya están escritos en `05` NT1.5 a NT1.7; se copian con un script, igual que los papeles): lo que llega en cada caso y lo que dice la jefa al entrar, las reacciones de los personajes según el resultado, las piezas de frase de los casos 3 y 6, los avisos («¿Firmar? Después no hay vuelta», etc.) y el cierre del informe.
3. **La música dentro del juego**: hay 3 pruebas generadas (S0, S2, S9) en la cuenta de Flow Music de Ronald; **ningún MP3 está en el disco**; faltan las demás escenas. Método en `.claude/agents/disenador-de-sonido.md`. Ronald ya dijo «integra, y no vuelvas a preguntar» por la licencia.
4. **Tres datos del registro que dependen de la pantalla**: en qué intento acertó en la práctica libre, si cambió de costumbre de un caso al siguiente, y qué eligió en el gráfico del caso 7 antes y después.
5. **Revisión antes de publicar** (agente `revisar-publicacion`) y **una sola pasada del crítico** sobre el juego ya armado (regla del 08-10: una por tema).
6. **Ronald lo juega en el celular** y dice qué cambiar. Con lo aprendido se mejoran los agentes antes del Tema 2.

### Lo que tiene que hacer RONALD (solo él)
1. **Contestar una pregunta** (quedó hecha y sin respuesta el 08-10 a las 23:0x): **¿se arma primero un solo caso completo y jugable en el celular (el Caso 2, el del boceto), o los ocho de corrido?** Recomendado: **un solo caso primero**, para que vea algo pronto y se corrija el rumbo antes de armar los otros siete. No empezar la pantalla sin su sí.
2. **Si trabajó en la otra PC:** él recordaba que «se estaban haciendo los artes». En esta PC (RonMarty) no hay arte nuevo después del boceto de las 18:46, ni en GitHub, ni en los respaldos de git. Si quedó algo en la otra PC, hay que abrir Claude allá y pedirle **«sube lo que quedó sin subir»** (Synology no pasa la carpeta de git).
3. **Descargar los MP3** de las 3 pruebas de música desde su cuenta de Flow Music (o decir en qué PC quedaron).
4. Borrar, cuando quiera, la copia en conflicto `…_DownloadConflict.md` de `docs/juego/gdd/` (es una foto vieja; Claude no borra).
5. Al final: jugarlo en el celular.

### Qué hace la próxima sesión al llegar (en este orden, sin rehacer nada)
1. `git pull --ff-only` y `git status`. Debe estar limpio y al día. Si hay archivos sin subir, decir cuáles y de cuándo antes de tocar nada.
2. `npx tsc --noEmit` y `npm test`: deben dar 3.847 pruebas en verde.
3. Decirle a Ronald en 5 líneas, con la comparación del juego de mesa: qué hay, qué falta, y hacerle **solo** la pregunta del punto 1 de arriba (si no la contestó ya).
4. Con su sí: copiar con script los textos del punto 2 de «Lo que falta» **solo del caso que se va a armar**, y construir la pantalla como borrador («Jugar (en prueba)»).

### Cuidados (errores de hoy, para no repetir)
- **Subir solo si las pruebas pasan, mirando el código de salida.** El 08-10 a las 22:49 se subió un commit con una prueba que fallaba por tiempo, porque `npm test | tail` tapó el fallo; se corrigió a los dos minutos. Guardar la salida en un archivo y revisar `$?` antes de `git push`.
- **La hora se lee del reloj** (`date`), nunca se estima.
- Subir cada pieza apenas pase sus pruebas: si se corta la cuota, no queda nada suelto.

---

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

> **PREGUNTAS DE GUSTO CERRADAS 08-10 (Ronald):** jefa opción A y caso 5 turno 1 con aprobación de Beto, ya aplicadas en `05` y `07`. Con eso no queda ninguna pregunta de gusto. **Sigue:** presentar el plan completo del Tema 1 en simple a Ronald (meta 65/65 por defecto) y esperar su aprobación (candado `plan:` en `content/islas.ts`). Pendientes suyos: descarga de «Late Night Office» (el MP3 no apareció en Descargas de esta PC, comprobar en qué PC está el Chrome 'Browser 2').

> **08-10, noche (Ronald, en el chat):** aprobó el plan del Tema 1 (8 casos, meta 65/65, jefa opción A, caso 5 con Beto) y, ante la pregunta A (integrar la música ya) o B (esperar a que revise la licencia), contestó «intégra, y no vuelvas a preguntar». Constancia del hecho: la música de Flow Music (cuenta PLUS de Ronald) se integra al Tema 1. Falta aún escribir `plan: "aprobado 2026-10-08"` al crear la isla de Psicoestadística en `content/islas.ts` (hoy esa isla no existe en el archivo).

> **MOTOR T1 BLOQUE 1 HECHO (08-10, noche):** `src/lib/juego/psicoestadistica/` con `reglas-t1.ts` (meta 65/65 en un solo lugar), `efectos-t1.ts`, `medidores.ts`, `version.ts`, `simulador-t1.ts`, pruebas y fixtures de paridad con Python (`scripts-t1/exportar_fixtures_t1.py`, correr con `python`, no `-I`). 3670 pruebas, tsc OK. **Falta del motor (TODO anotado al inicio de `version.ts`):** la carpeta de papeles (cuales 6 de 9, claves, refuerzo del caso 2), las cifras de cada caso (mu, tandas, rho, N, ejes, medias del caso 8, respuestas de Dani), los huecos `{mes}`, `{d0}`, `{hechoClave}`, `{curso}`, un colegio por caso o uno por tema, fuente del caso 4, semilla de la practica abierta. **Sigue:** bloque 2 del motor (carpeta y cifras por caso, reglas de respuesta y diagnostico por codigo E), luego bloque 3 (revelacion, 72 ramas y registro), luego pantalla y musica.

> **SI SE CORTA LA CUOTA (08-10, 22:3x) - LEER ESTO PRIMERO, NO EMPEZAR DE CERO (Ronald lo pidio expresamente):**
> 1. **Estado:** el Tema 1 de Psicoestadistica esta APROBADO por Ronald (plan, 8 casos, meta 65/65, jefa opcion A sin vidrio ni sello, caso 5 turno 1 con aprobacion de Beto, musica de Flow Music INTEGRADA y no preguntar mas por la licencia). La isla ya existe en `content/islas.ts` (commit c11cc09). **Motor bloque 1 subido (commit 60a8de8, 3670 pruebas).**
> 2. **Bloque 2 del motor EN CURSO** cuando se escribio esto: un agente (`general-purpose`) estaba creando en `src/lib/juego/psicoestadistica/` los archivos `carpeta.ts`, `cifras.ts`, `respuestas.ts`, `bienestar.ts`, `tandas.ts`, `aleatorio-t1.ts`, sus `*.test.ts` y `fixtures/respuestas-t1.json` (+ `scripts-t1/exportar_respuestas_t1.py`). **Estaban SIN SUBIR a git.** Los archivos estan en disco (Synology los sincroniza, pero NO la carpeta `.git`).
> 3. **Que hacer al llegar (en este orden, sin rehacer nada):** `git pull --ff-only` y `git status`; `npx tsc --noEmit` y `npm test`. Si pasan (3670 + las nuevas) y los archivos del bloque 2 estan completos, **commit y push** (mensaje: bloque 2 del motor T1). Si fallan, **arreglar lo que falla**, no reescribir: leer primero el reporte del bloque 1 en este mismo archivo y los TODO del inicio de `version.ts`. Los TODO del bloque 1 (carpeta de papeles G10, cifras por caso, {mes}/{d0}/{hechoClave}/{curso}, colegio por caso, fuente del caso 4, semilla de practica abierta) son lo que el bloque 2 debia resolver.
> 4. **Despues, en orden:** bloque 3 del motor (revelacion de 72 ramas con F3k y F6k, registro de habitos H1 a H4, escalera de ayuda y sobres; reutiliza `src/lib/juego/escalera.ts`, `partida.ts`, `registro.ts`), luego la pantalla (PixiJS, aspecto A «La redaccion de noche», boceto vivo en `docs/juego/bocetos/motores/aspecto-A/index.html`), luego la musica (3 pruebas S0, S2, S9 ya generadas en la cuenta de Flow Music de Ronald; faltan las otras escenas; el MP3 aun no se descargo; metodo en `.claude/agents/disenador-de-sonido.md`), luego `revisar-publicacion`, luego **el critico completo UNA vez sobre el juego construido** (regla nueva del 08-10), luego Ronald lo juega en el celular.
> **MOTOR T1 BLOQUE 2 HECHO Y SUBIDO (08-10, 22:45):** la sesion que lo escribia se corto; la siguiente lo encontro completo en disco, lo comprobo (`npx tsc --noEmit` limpio, `npm test` 3816 pruebas en 45 archivos, 189 de ellas en `src/lib/juego/psicoestadistica/`) y lo subio sin reescribir nada. Los 7 TODO de `version.ts` quedaron resueltos (ver su cabecera). **Arte:** Ronald recordaba que «se estaban haciendo los artes»; barrido del disco, de las ramas de GitHub y de las carpetas temporales: **no hay arte nuevo** despues del boceto vivo (`docs/juego/bocetos/motores/aspecto-A/`, 18:46) y no existe aun ninguna pantalla en `src/app/` para Psicoestadistica. **Sigue: bloque 3 del motor** (punto 4 de abajo), luego la pantalla con el arte.
> **MOTOR T1 BLOQUE 3 HECHO Y SUBIDO (08-10, 22:57):** `ramas-t1.ts` (las 72 ramas, la clase de registro y el cierre de cada rama; paridad contra `ramas_t1.py` en 612 estados, fixture de `scripts-t1/exportar_ramas_t1.py`), `registro-t1.ts` (de lo que hizo el alumno salen estado, rama, clase, codigos, habitos, tubos caso por caso y plaza fija; evento nuevo `entrada` en `EventoT1`; linea del docente con 8 casillas), `revelacion-t1.ts` (las 8 cartas con huecos llenos, camino y globo de Beto) y `ayuda.ts` (sobre de la jefa y expediente; nunca bloquea; `EXPEDIENTES_EN_OFICIAL`). Los TEXTOS estan en `guion-t1.json`, que `scripts-t1/exportar_guion_t1.py` copia de `05` (no se edita a mano; si cambia la narrativa se vuelve a correr). **Lo que el motor aun NO calcula** (necesita eventos de la pantalla): escalon en que acerto, cambio de opinion entre casos y lector del caso 7 antes y despues; tampoco existen `armador.ts` ni los textos de los papeles, reacciones y dialogos (estan en `05` NT1.5 y NT1.6, falta copiarlos con script como se hizo con las cartas). **Sigue: la pantalla** (PixiJS, aspecto A, boceto en `docs/juego/bocetos/motores/aspecto-A/index.html`), empezando por copiar a JSON los textos de papeles y reacciones.
> **PAPELES DEL TEMA 1 EN EL MOTOR (08-10, 23:00):** `papeles-t1.json` (los 72 papeles C1-1 a C8-9, copiados de `05` NT1.5 y NT1.6 por `scripts-t1/exportar_papeles_t1.py`; no se edita a mano) y `papeles-t1.ts` (`papelesDe(paquete, caso, {opcion, hoy})` da los 6 papeles de la carpeta con el texto que toca segun el tipo y si es el clave, con las cifras de la version; `piezasDePapel` da las piezas de la frase del caso 2). Probado en las 999 versiones. **Falta copiar del mismo modo, cuando la pantalla los pida:** entradas de cada caso (lo que llega y lo que dice la jefa), reacciones por resultado, piezas de los casos 3 y 6, puertas y cierre del informe (todo en `05` NT1.5 a NT1.7). **Sigue: la pantalla.**
> 5. **Reglas que Ronald repitio hoy:** explicar en simple y de a una pregunta; tuteo; no preguntar por la licencia de la musica; no lanzar criticos completos de mas; guardar aqui todo para que ninguna sesion empiece en blanco.
