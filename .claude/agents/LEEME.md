# Agentes de RON_DOC

Los agentes de Claude Code del proyecto: un archivo `.md` por agente en esta carpeta, con su
cabecera (`name`, `description`, `tools`) y sus instrucciones. Los usan todas las sesiones, las de
la nube y las de la PC de Ronald, porque viajan con el repositorio.

## De dónde vienen (acordado el 2026-09-25)

Hay dos fuentes que se van a juntar:

- **Nube:** los que crea Claude en las sesiones en la nube, a medida que el trabajo los pide.
- **PC:** los creados en la copia sincronizada de la PC de Ronald (Synology/OneDrive), fuera de git.
  **Fusión hecha el 2026-09-26:** allí había uno solo, `revisar-publicacion` (como *skill*, en
  `.claude/skills/`, no en `.claude/agents/`); pasó al repositorio como agente, con su script en
  `scripts/revisar-publicacion.mjs`. Desde entonces esa copia **dejó de ser fuente**: los agentes
  nuevos se crean acá y se suben. En esa copia **no hacer `git push`**.

## Reglas para que no se pisen

1. **Un agente, un archivo, un nombre.** Antes de crear uno, mirar el registro de abajo: si ya hay
   uno que hace lo mismo, se mejora ese.
2. **Todo agente nuevo se anota en el registro** en el mismo commit: nombre, para qué sirve, origen
   (nube o PC) y fecha.
3. **Al traer los de la PC:** si un nombre choca con uno de la nube, no se reemplaza a ciegas. Se
   comparan los dos, se queda lo mejor de cada uno en un solo archivo y se anota en el registro
   qué se combinó. Ronald decide si hay duda.
4. **Nada privado:** sin claves, contraseñas ni rutas personales dentro de un agente (el
   repositorio es público).
5. La fusión termina cuando el registro dice lo mismo que hay en la PC: entonces la carpeta de
   OneDrive deja de ser fuente.

## Equipo de diseño del juego

Siete agentes, uno por parte del GDD (`docs/juego/gdd/LEEME.md`). Orden: **adaptador de dossier →
conversación con Ronald hasta que elige** → visión → bucle → aprendizaje → mundo → progresión; el
crítico revisa cada parte antes de llevarla a Ronald. Si al cambiar un agente
cambian las reglas comunes, se cambian en los seis.

**Se usan TODOS, cada uno en su etapa (Ronald, 27-09: «si hacemos juego debe usarse todos los agentes
que creamos, en la etapa que corresponde»).** Ninguna etapa se salta, aunque parezca rápida:

| Etapa | Agente | Qué deja |
|---|---|---|
| **Materia** (una vez) | `adaptador-de-dossier` (propuestas **con un boceto de pantalla de cada marco**, que dibuja el director) → **`critico-de-jugabilidad`** → Ronald elige el marco → `adaptador-de-dossier` (maqueta) → **`disenador-de-aprendizaje` (profundidad, como experto de la materia)** → **`critico-de-jugabilidad`** → Ronald aprueba la maqueta → `director-de-juego` (visión **y aspecto con 2 o 3 bocetos de pantalla**) → **`critico-de-jugabilidad`** → Ronald elige → `disenador-de-progresion` → **`critico-de-jugabilidad`** → Ronald aprueba | `00-adaptacion-<materia>`, `01-vision` (con «Aspecto y sensación»), `03-progresion-<materia>`; `aspecto: "aprobado AAAA-MM-DD"` en su isla |
| **Tema** 0. La idea, CON Ronald | el director la presenta en simple (qué vive el alumno, paso a paso) y, si el tema necesita otra pantalla, su boceto | Ronald la arma y la ajusta **antes** de que los agentes la detallen (Ronald, 27-09: «debería ser al inicio») |
| **0-bis. Ideas principales** (Tema 0 de cada materia y cada tema) | **`extractor-de-ideas`** | las 5 a 8 ideas u objetivos principales del dossier, en lenguaje de calle, con cómo se viven y qué dice la revelación (`ideas-<materia>-tema<N>.md`). **Ronald las aprueba; hasta entonces nadie diseña formas de juego** (Ronald, 08-10) |
| 1. Ficha | `adaptador-de-dossier` | la ficha del tema, con el dossier verificado |
| 2. Qué aprende y cómo se evalúa | `disenador-de-aprendizaje` | objetivos, errores típicos, **qué varía por alumno**, registro |
| 3. Cómo se juega | `disenador-de-bucle` | modalidad y mecánica del tema |
| 4. Personajes y diálogos | `disenador-narrativo` | quién aparece y qué dice (en tuteo) |
| 4-bis. Sonido | `disenador-de-sonido` | hoja de sonido por escena (música, capas por momento, efectos y el prompt para Flow Music), **justo después de diseñar cada nivel, isla o materia** y antes del crítico (Ronald, 08-10) |
| `artista-pixel` | Arte en pixel art con línea gráfica común: documentos, retratos, objetos, interfaz, ambientes por cambio de paleta | PC | 2026-10-09 | Pedido por Ronald («mejorar cómo se ven documentos, personajes y elementos, con una línea gráfica común»); método y herramientas en `scripts/generar_arte.py` |
| 4-ter. Arte | `artista-pixel` | el arte que se ve (documentos, retratos con gestos, objetos, interfaz) con la línea gráfica común `docs/juego/ARTE-LINEA-GRAFICA.md`, después del mapa de ambientes del tema y antes del crítico; se dibuja a mano solo lo que cambia cómo se siente el juego (Ronald, 09-10) |
| 5. Revisión del papel | `critico-de-jugabilidad` | **una sola revisión completa**, con aprendizaje, bucle, narrativa y sonido ya hechos (Ronald, 08-10: el Tema 1 tuvo cuatro y tardó demasiado). Lo corregido después se **recheca con scripts**, no con otra revisión completa. Hallazgos; **recién ahí se le muestra a Ronald** y él aprueba |
| 6. Construcción | Claude (motor con pruebas + pantalla) | el tema jugable en borrador, **sobre el motor de `docs/juego/PIEZAS-COMUNES.md`** (se importa, no se copia); lo nuevo que sirva a otros juegos se hace como motor y se anota ahí en el mismo commit; personajes, textos y dibujos son del juego (Ronald, 28-09, «como Doom») |
| 7. Revisión de lo jugable | `critico-de-jugabilidad` | hallazgos sobre el juego real, **antes de mostrárselo a Ronald y antes de darle el enlace o abrírselo** (se saltó 3 veces: AIEF 27-09, Psicoestadística ronda 1 28-09, Psicoestadística Paso 1 + Caso 2 el 09-10). Juega **cada pantalla con las cinco preguntas de orientación** (regla «Cada pantalla le dice al alumno qué hace»): quién soy y mi trabajo, objetivo de esta pantalla, qué toco y qué cuesta, qué significa cada término, qué pasó y qué sigue |
| 8. Antes de subir o publicar | `revisar-publicacion` | pruebas, compilación, borradores ocultos, Supabase |
| 9. Ronald lo juega en su celular | Ronald | aprueba el tema; recién ahí el siguiente |

### Aprendido construyendo (etapa 6; se suma una línea por error real, con su fecha)

- **09-10 · La orientación no estaba en el diseño.** El diseño aprobado (ideas, forma, aprendizaje, bucle, narrativa, sonido) pasó por el crítico del papel (v15) y aun así la pantalla armada no decía qué hacer: Ronald se perdió. Lo que el papel no mostraba (qué es una ficha, qué mide cada tubo, quién es Dani) salió al jugarla. **Aprendizaje:** el diseño debe traer los textos de orientación (regla de las cinco preguntas) y el crítico de lo jugable es insustituible; el crítico del papel no lo reemplaza.
- **09-10 · Se le abrió el juego a Ronald sin el crítico.** Las pruebas automáticas recorrían la pantalla (3.900 en verde) y se creyó suficiente: comprueban que los botones funcionan, **no que se entienda**. Verde de pruebas ≠ jugable para una persona.
- **09-10 · Hora inventada.** La fila de `EN CURSO.md` se escribió con «07:05» sin mirar el reloj (eran las 06:56). Se leyó `date` y se corrigió. La hora se lee siempre del reloj.
- **09-10 · `npm install` bloqueado.** En esta sesión `npm_config_allow_scripts` está definida y `npm install` falla (EALLOWSCRIPTS). Se corre `env -u npm_config_allow_scripts npm install …`. Lo mismo para `next dev` y `next build`.
- **09-10 · Servidor de prueba con error 500.** Después de `next build`, `next dev` falla con «Cannot find module './873.js'» porque `.next` quedó mezclada. Se detiene el servidor, se borra `.next` (es caché) y se reinicia.
- **09-10 · Bloques de shell con `cat <<EOF` largos fallan** si traen comillas raras: escribir los archivos con la herramienta de escritura, no con heredoc (ya estaba en las lecciones de `1.MATERIAS`).
- **09-10 · Sin navegador no se puede ver la pantalla.** La extensión «Claude in Chrome» no estaba conectada, y por eso tampoco se pudieron bajar las pistas de Flow Music. Sin ella: `jsdom` + `@testing-library/react` (`Mesa.test.tsx`) recorren el flujo, pero **no sustituyen mirar la pantalla**. Al empezar una sesión de juego, comprobar que la extensión responde (`tabs_context_mcp`); si no, avisar a Ronald **al inicio**, no al final.
- **09-10 · «Suena» dicho sin haberlo oído.** Se dio la música por integrada con 3.948 pruebas en verde, y al abrirlo Ronald no oyó nada. Causa: el servidor de prueba de Next responde «204 vacío» a un `fetch` de mp3 sin `Range` (con curl daba 200); el manifiesto cargaba, ninguna pista se decodificaba y nada fallaba en voz alta. **Aprendizaje:** (1) una prueba de que «el archivo existe» no prueba que «suene»: se comprueba con el estado real del motor en el navegador (`window.__sonido()` en la consola: contexto, pista sonando, volúmenes); (2) un fallo de carga no se traga en silencio sin dejar rastro; (3) antes de decirle a Ronald «ya suena», abrir la página con la extensión de Chrome y leer `window.__sonido()`. (4) Con la extensión de Chrome conectada se **ve** la pantalla real: hacerlo antes de entregar, no después.
- **09-10 · Arte: conversión automática y contraste.** La conversión a la paleta fundió el pelo con la pared y llenó de ruido el escritorio; el primer retrato dibujado a mano no fue mejor que el del script; lo que sí mejoró fue el papel. Regla de «separación entre figura y fondo» en la guía y método barato en `artista-pixel`: dibujar a mano solo documentos, retratos e interfaz; conversión solo para objetos pequeños y lisos; pared y escritorio con piezas repetidas.
- **09-10 · Ronald se cansa de repetir lo mismo.** Tuvo que pedir «anota todo», «sube a GitHub», «registra en los agentes» varias veces. **Hábito automático, sin que lo pida:** cada vez que se corrige algo que Ronald notó o aparece un error, en el mismo turno (1) se anota en el agente que debió evitarlo, (2) se suma la línea fechada en este «Aprendido construyendo», (3) se actualiza `docs/juego/RETOMAR.md` y la bitácora, (4) commit y push, y (5) al final del mensaje se dice en una línea qué se anotó y dónde.
- **09-10 · Los textos del juego salen de la narrativa por script** (`scripts-t1/exportar_*.py`), no se escriben a mano; una prueba (`guion-pantalla-t1.test.ts`) compara y **rechaza lo inventado** (se probó que el control rechaza un texto cambiado).

- **09-10 · La nube pisaba lo jugado sin conexión.** En `EscenaVentanilla` y `EscenaPlanta`, al abrir con cuenta, la partida de la nube reemplazaba a la local aunque la local tuviera más eventos (conexión cortada, o el alumno ya jugando mientras la nube respondía). **Aprendizaje:** toda pantalla nueva que lea de la nube usa `elegirPartida` (nunca reemplaza a ciegas) y su prueba cubre el caso «local más adelantada».

- **09-10 · La noche pasa se vuelve regla común.** Ronald pidió que la ventana, la luna, la ciudad y el reloj se animen con la historia, y que la idea valga para todos los juegos. Cuentas comunes en `src/lib/juego/ambiente-vivo.ts` con perfil por tema; primer perfil `PERFIL_T1`. Pendiente conocido: el crítico v21 pidió retocar luna (píxeles sueltos), nube (se pierde en el cielo), reloj (píxeles fuera del círculo) y el contraste de la ciudad lejana.

- **09-10 · La música tardaba en cargar en el celular.** Ronald lo sintió como pérdida de inmersión. Causa: las pistas (8 MB) se bajaban recién tras el primer toque y el service worker no guardaba mp3, así que se repetía en cada visita; además el despliegue llevaba horas fallando por Node 20 y no se veía lo nuevo. **Aprendizaje (`disenador-de-sonido` y quien arme audio):** todo audio nuevo se precarga al abrir la pantalla y se guarda en la caché de audio; si se cambia una pista, se cambia el nombre del archivo; y tras cada subida se mira que el deploy de GitHub haya salido en verde, no solo las pruebas locales.

- **09-10 · Texto apretado y rayas sin nombre.** Ronald: «los textos están todos apretados, es cansador»; «no sé a qué se refiere con raya de 25 o de 65». Causa: cada cita de la jefa era un bloque corrido de 3 o 4 frases, y la narrativa nombraba marcas del medidor que en pantalla no tenían rótulo. **Aprendizaje (`disenador-narrativo`, `disenador-de-aprendizaje`, quien arme pantallas):** una frase por renglón en todo texto que lee el alumno; toda marca, color o rayita que el texto nombra tiene su rótulo visible en pantalla y el texto la describe como se ve (color + número), nunca con una palabra que solo existe en la narrativa. Antes de mostrar una pantalla, leerla en celular con la pregunta «¿cada palabra del texto señala algo que se ve?».

Si una etapa se saltó (como pasó con el Tema 1 de AIEF el 27-09: se construyó con las fichas sin pasar
por aprendizaje, bucle, narrativa ni el crítico sobre lo jugable), se hace antes de mostrarle el tema a
Ronald y se anota en la bitácora.

**Nada llega a Ronald sin el crítico, y lo aprobado no se reabre** (Ronald, 28-09: *«estamos volviendo a
hacer algo que ya hicimos… ¿cómo sé ahora que esta es la buena? ¿No deberías blindar los agentes?»*). La
ronda 1 de Psicoestadística se le mostró sin pasar por el crítico (la tabla de la etapa de materia no lo
nombraba); el crítico la revisó después, cuando Ronald ya había elegido, y hubo que rehacerla. Desde ahora:

1. **Toda entrega de un agente pasa por el crítico antes de mostrársela a Ronald**, en la etapa de materia
   y en la de tema (la tabla de arriba lo marca en cada paso). Lo que el crítico encuentre lo corrige el
   agente que corresponda, y Ronald ve la versión corregida, con una línea de qué se corrigió.
2. **Cada agente entrega con su lista de salida**: una línea por regla de su archivo, con ✔ o ✘ y dónde se
   ve. Una entrega con ✘ no pasa al crítico.
3. **Una pieza es «la buena» cuando** pasó su lista de salida, el crítico no encontró bloqueos y Ronald la
   aprobó. Ahí se marca **APROBADA** con la fecha, y ningún agente la reabre: sólo Ronald puede pedir
   cambiarla. Las rondas que quedan son las que traen una decisión nueva de Ronald, no arreglos que un
   control debía encontrar antes.

**Cada agente trabaja de cero (Ronald, 28-09: «quiero ver cómo se comportan de cero»).** La sesión no
hace el trabajo de un agente antes de que corra: no adelanta el análisis de una materia (qué falta, qué
temas tiene, qué no calza) en el catálogo, la bitácora ni la conversación. El agente lee el dossier y el
código por su cuenta y lo encuentra él. Así Ronald ve lo que el agente sabe hacer, y lo que no encuentra
se vuelve una mejora del agente. Tampoco se empieza a construir nada de una materia hasta que Ronald lo
diga.

**Regla permanente (Ronald, 26-09):** todo lo que se planifica o decide con Ronald se vuelve regla del
agente o los agentes que correspondan, en el mismo commit.

**Ojo con Synology** (hallado en Axiom, 27-09): Synology Drive no suele sincronizar carpetas que
empiezan con punto, así que `.claude/agents/` puede no viajar entre la PC y la laptop si RON_DOC vive
dentro de Synology. La salida recomendada es trabajar sobre un clon de GitHub fuera de Synology (git
lleva la carpeta). Axiom lo resolvió con una copia visible en `agentes/` y un script que sincroniza.

## Registro

| Agente | Para qué | Origen | Fecha | Notas |
|---|---|---|---|---|
| `adaptador-de-dossier` | Primer paso: dossier → 2 o 3 propuestas de juego para conversar con Ronald (`docs/juego/gdd/00-adaptacion-<materia>.md`) | Nube | 2026-09-26 | Pedido de Ronald: los demás corren después de que él elige. 26-09 (PC): lee los dossiers de la carpeta de materias sin subirlos y anota su huella (`scripts/huella-dossier.mjs`); comprueba que ninguna estrategia gane sin entender y que la maqueta aguante el orden real de dictado (fallas que detectó el crítico en la ronda 1 de AIEF). 28-09 (PC): el costo de cada propuesta se separa en motor que se reutiliza, lo que hay que despegar y lo nuevo, según `docs/juego/PIEZAS-COMUNES.md`; cada propuesta dice en qué se distingue de los juegos que ya existen; un juego por carrera cuando la materia lo pide (Psicoestadística Descriptiva). La regla «como Doom» quedó también en los otros seis |
| `director-de-juego` | Visión, género, pilares (`docs/juego/gdd/01-vision.md`) | Nube | 2026-09-26 | Equipo de diseño del juego; reglas comunes repetidas en cada uno |
| `disenador-de-bucle` | Bucle principal, mecánicas, minijuegos, economía (`02`) | Nube | 2026-09-26 | |
| `disenador-de-progresion` | Beat chart de cada materia (`03-progresion-<materia>`) | Nube | 2026-09-26 | Necesita el temario de Ronald |
| `disenador-de-aprendizaje` | Alineación objetivo-mecánica, errores típicos, rúbrica (`04`) | Nube | 2026-09-26 | 28-09 (PC): entra también en la etapa de materia, después de la maqueta y antes del crítico, como **revisor experto de la materia** (cada concepto practicado, hermanos juntos, serie de casos, práctica abierta). Nació de la maqueta liviana de Psicoestadística que sólo Ronald, experto en ella, detectó |
| `disenador-narrativo` | Mundo, personajes, contexto de cada escena, diálogos (`05`) | Nube | 2026-09-26 | |
| `critico-de-jugabilidad` | Revisa propuestas como alumno y como Ronald (`06-revisiones`) | Nube | 2026-09-26 | |
| `extractor-de-ideas` | Ideas u objetivos principales de cada tema y del Tema 0 de cada materia, para que Ronald las apruebe antes de diseñar (`ideas-<materia>-tema<N>.md`) | PC | 2026-10-08 | Pedido de Ronald: forzar el orden dossier → ideas → formas de juego, sin depender de la memoria de la sesión. Se mejora en «Lo aprendido» |
| `disenador-de-sonido` | Sonido por escena: música, capas, efectos y prompt para Flow Music (`07-sonido.md`) | PC | 2026-10-08 | Pedido de Ronald tras probar Flow Music (le gustó la primera pista). Se mejora con cada prueba (apartado «Lo aprendido»). Lo legal de Flow Music sigue pendiente: ninguna pista se integra todavía |
| `revisar-publicacion` | Antes y después de publicar: pruebas, compilación, variables y Supabase despierto, corridas de GitHub, juego conectado, borradores ocultos (`scripts/revisar-publicacion.mjs`). Sólo lee | PC | 2026-09-25 | Nació del Supabase pausado y del deploy sin variables del 25-09. Creado como *skill* en la copia sincronizada; pasado acá el 26-09 sin cambios de lógica, sólo sin rutas personales |
- 09-10 (sonido): Ronald oyó cortes en la música armada con tramos y capas por fase. Regla nueva: pista entera por escena en bucle, fundido cruzado solo al cambiar de escena (ver `disenador-de-sonido.md`). Además los MP3 nunca se habían subido a git por `*.mp3` en `.gitignore`: lo que «funciona en mi PC» puede no estar en el repositorio; comprobar con `git ls-files`.