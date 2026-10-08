# RETOMAR el juego de RON_DOC (nota de relevo, 08-10-2026)

> Para quien llegue sin el contexto de la conversación (otra sesión, otra PC, o después de un corte). Léela entera antes de tocar nada.
> Ronald es el docente y dueño del proyecto. Habla directo, se frustra si le repiten preguntas o le explican con jerga. Explícale todo **en simple**.

## 0. Qué hacer al llegar (en este orden)

1. `git pull --ff-only` y `git status`. Si hay archivos sin subir, di cuáles y de cuándo antes de tocar nada.
2. Lee `BITACORA.md` §0 (lo más nuevo, arriba) y esta nota.
3. Mira si existe `docs/juego/gdd/aspecto-psicoestadistica-tema1-propuestas.md` (ver §4, «En curso»). Si no existe y la última sesión se cortó, hay que volver a lanzar al director (§4).
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
| Aspecto: 3 direcciones con juegos de referencia | `docs/juego/gdd/aspecto-psicoestadistica-tema1-propuestas.md` | **EN CURSO**: lo escribe el `director-de-juego`. Si no existe, relanzarlo con este encargo: «3 direcciones de aspecto distintas para la forma 1, cada una con referencias (qué se toma y qué se cambia), cómo se vería la pantalla, arte de calidad real y de dónde saldría, sonido, celular vertical, riesgo; sin dibujar bocetos» |

**La forma elegida, en una línea:** carpeta de 6 papeles por caso (sacados de un fondo de 9, con 3 claves posibles y 1 por versión), 3 acciones por caso (2 si un medidor cae a 25 o menos), dos medidores que se empujan (Credibilidad y Lectores, meta 60), arranque con personaje de reserva Dani (su número no altera nada), revelación en 8 fichas boca abajo. Simulación de estrategias perezosas: publicar siempre, retener siempre y no abrir nada pasan la meta 0 %; entender 68,9 % (el 80 % de acierto de quien entiende es una **estimación**, solo se mide con alumnos reales).

**Lo que sigue, en orden:** (1) cuando el director entregue, mostrarle a Ronald las 3 direcciones en simple y **que él elija**; (2) bocetos con arte real y PixiJS de la dirección elegida; (3) aprendizaje, bucle, narrativa y sonido sobre la ficha; (4) crítico; (5) construir el Tema 1 como borrador y que Ronald lo juegue en el celular. Un tema a la vez, plan aprobado antes de programar.

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
