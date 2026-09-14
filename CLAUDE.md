# Punto de entrada para asistentes IA

## Antes de hacer cualquier cosa

**Revisar las fuentes.** RON_DOC toma piezas de `axiom-simulador` (lo visual y la matemática) y de `simuladorPRO` (lo financiero), y esos dos repos siguen mejorando por su cuenta. Al empezar la sesión, seguir el protocolo de [FUENTES.md](./FUENTES.md): traer lo nuevo con `git fetch`, ver qué cambió desde el último commit revisado, contarle a Ronald en pocas líneas qué vale la pena traer, y anotar la revisión.

No saltearlo aunque el pedido de la sesión parezca no tener relación: un arreglo de celular en Axiom o una corrección del motor en SimuladorPRO puede ser justo lo que falta acá.

## Qué es RON_DOC (decidido el 2026-09-14)

**El aula de las materias que dicta Ronald: un libro interactivo por materia**, con el mismo espíritu que el Aula de Probabilidad (`/aula-probabilidad`), el aspecto visual de Axiom y el motor financiero de SimuladorPRO adentro.

- Lo personal (podcasts, tesis, sobre mí) es secundario.
- **No se publica nada con `[CONTENIDO PENDIENTE]`.** Una materia sin material real no aparece, en vez de mostrar una plantilla vacía.
- Axiom y SimuladorPRO aparecen como proyectos, con sus enlaces reales.

## Formato

- **Tarjetas** (una idea por tarjeta, navegación con íconos y deslizando), tomando como base `LaminaShell` de Axiom.
- **Fórmulas con KaTeX**, nunca armadas a mano.
- **Números financieros sólo desde el motor copiado de SimuladorPRO.** Si una fórmula está mal, se arregla allá y se vuelve a copiar (ver "Regla de propiedad" en FUENTES.md).

## Decisiones pendientes (preguntar a Ronald, no asumir)

- Modo proyector: las tarjetas de Axiom miden como máximo 560 px de ancho, pensadas para celular; en clase se proyecta.
- Si el Aula de Probabilidad se migra a tarjetas, y cuándo. Hoy es un libro con scroll de unas 11.000 líneas.
- Tuteo o voseo en el texto que lee el alumno. El Aula hoy mezcla los dos; Axiom pasó todo a tuteo porque sus alumnos son de Cochabamba.
- Con qué materia se arranca. Cada una necesita el dossier del docente.

## Material que ya existe

- Aula de Probabilidad: `LEEME-AULA.md` y `bitacoras/psicoestadistica-inferencial.md`.
- Android: `LEEME-ANDROID.md`.
- Cómo se alimenta el contenido y cómo se publica: `README.md`.
