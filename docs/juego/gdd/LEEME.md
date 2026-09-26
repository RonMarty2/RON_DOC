# GDD: documento de diseño del juego de RON_DOC

El plano del juego, dividido en partes. Cada parte tiene un agente responsable en `.claude/agents/`
(registro en `.claude/agents/LEEME.md`). **Ronald decide**; los agentes proponen con opciones y una
recomendación.

| Parte | Archivo | Agente | Qué responde |
|---|---|---|---|
| **Adaptación del dossier** | `00-adaptacion-<materia>.md` | `adaptador-de-dossier` | Qué ideas de juego salen del dossier de la materia, conversadas con Ronald hasta que elige una |
| Visión y género | `01-vision.md` | `director-de-juego` | Qué tipo de juego es, para quién, sus pilares y qué no es |
| Bucle y mecánicas | `02-bucle-y-mecanicas.md` | `disenador-de-bucle` | Qué hace el jugador una y otra vez, con qué acciones, y qué recursos mueve |
| Progresión (beat chart) | `03-progresion-<materia>.md` | `disenador-de-progresion` | El recorrido de la materia nivel por nivel, en orden |
| Aprendizaje y evaluación | `04-aprendizaje.md` | `disenador-de-aprendizaje` | Qué mecánica enseña cada objetivo y cómo cuenta para la nota |
| Mundo y narrativa | `05-mundo-y-narrativa.md` | `disenador-narrativo` | Dónde estamos, quiénes son los personajes, qué contexto trae cada escena |
| Revisiones | `06-revisiones.md` | `critico-de-jugabilidad` | Qué falla en lo propuesto, visto como jugador y como alumno |

**Orden de trabajo (26-09):** 1) el **adaptador** pasa el dossier a 2 o 3 propuestas de juego;
2) **conversación con Ronald**, ronda por ronda, hasta que elige una; 3) recién entonces corren
visión → bucle → aprendizaje → mundo → progresión, puliendo y recomendando sobre lo elegido. La crítica
revisa cada parte antes de llevarla a Ronald. Principio que manda: juego con sabor a la materia, no
materia con sabor a juego (`docs/juego/IDEA-JUEGO.md` §9).

`01-vision.md` v2 se escribió antes de este orden: queda como antecedente y se rehace sobre la
propuesta que Ronald elija. Una parte cambia cuando Ronald decide; cada archivo
lleva al inicio su versión, fecha y lo que falta decidir.

**Fuentes que todos leen:** `docs/juego/IDEA-JUEGO.md` (pedido de Ronald y decisiones),
`BITACORA.md` §0 (lo construido), `CLAUDE.md` (reglas del sitio: tuteo, números sólo desde funciones
probadas, el dossier del docente es la fuente) y lo que ya existe en `src/lib/juego/` y
`src/app/juego-proyectos/`.
