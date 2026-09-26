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

**Regla permanente (Ronald, 26-09):** todo lo que se planifica o decide con Ronald se vuelve regla del
agente o los agentes que correspondan, en el mismo commit.

## Registro

| Agente | Para qué | Origen | Fecha | Notas |
|---|---|---|---|---|
| `adaptador-de-dossier` | Primer paso: dossier → 2 o 3 propuestas de juego para conversar con Ronald (`docs/juego/gdd/00-adaptacion-<materia>.md`) | Nube | 2026-09-26 | Pedido de Ronald: los demás corren después de que él elige |
| `director-de-juego` | Visión, género, pilares (`docs/juego/gdd/01-vision.md`) | Nube | 2026-09-26 | Equipo de diseño del juego; reglas comunes repetidas en cada uno |
| `disenador-de-bucle` | Bucle principal, mecánicas, minijuegos, economía (`02`) | Nube | 2026-09-26 | |
| `disenador-de-progresion` | Beat chart de cada materia (`03-progresion-<materia>`) | Nube | 2026-09-26 | Necesita el temario de Ronald |
| `disenador-de-aprendizaje` | Alineación objetivo-mecánica, errores típicos, rúbrica (`04`) | Nube | 2026-09-26 | |
| `disenador-narrativo` | Mundo, personajes, contexto de cada escena, diálogos (`05`) | Nube | 2026-09-26 | |
| `critico-de-jugabilidad` | Revisa propuestas como alumno y como Ronald (`06-revisiones`) | Nube | 2026-09-26 | |
| `revisar-publicacion` | Antes y después de publicar: pruebas, compilación, variables y Supabase despierto, corridas de GitHub, juego conectado, borradores ocultos (`scripts/revisar-publicacion.mjs`). Sólo lee | PC | 2026-09-25 | Nació del Supabase pausado y del deploy sin variables del 25-09. Creado como *skill* en la copia sincronizada; pasado acá el 26-09 sin cambios de lógica, sólo sin rutas personales |
