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
| 5. Revisión del papel | `critico-de-jugabilidad` | **una sola revisión completa**, con aprendizaje, bucle, narrativa y sonido ya hechos (Ronald, 08-10: el Tema 1 tuvo cuatro y tardó demasiado). Lo corregido después se **recheca con scripts**, no con otra revisión completa. Hallazgos; **recién ahí se le muestra a Ronald** y él aprueba |
| 6. Construcción | Claude (motor con pruebas + pantalla) | el tema jugable en borrador, **sobre el motor de `docs/juego/PIEZAS-COMUNES.md`** (se importa, no se copia); lo nuevo que sirva a otros juegos se hace como motor y se anota ahí en el mismo commit; personajes, textos y dibujos son del juego (Ronald, 28-09, «como Doom») |
| 7. Revisión de lo jugable | `critico-de-jugabilidad` | hallazgos sobre el juego real, antes de mostrárselo a Ronald |
| 8. Antes de subir o publicar | `revisar-publicacion` | pruebas, compilación, borradores ocultos, Supabase |
| 9. Ronald lo juega en su celular | Ronald | aprueba el tema; recién ahí el siguiente |

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
