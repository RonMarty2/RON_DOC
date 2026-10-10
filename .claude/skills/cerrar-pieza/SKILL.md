---
name: cerrar-pieza
description: "Cierra una pieza de RON_DOC como exige CLAUDE.md: pruebas en verde, relevo escrito y todo subido a GitHub. Úsala cuando termines una pieza o Ronald diga que se va."
disable-model-invocation: true
---

Cierra la pieza actual, en este orden, sin que Ronald lo pida paso a paso:

1. `git pull --ff-only` y `git status`: di qué archivos hay sin subir y de quién son. No incluyas en el commit archivos que no sean de esta pieza.
2. `npm test` y `npx tsc --noEmit`. Mira el código de salida (no uses `| tail`, tapa el fallo). Si algo falla, para y dilo.
3. Actualiza el bloque «ESTADO REAL» de `docs/juego/RETOMAR.md` y `BITACORA.md` §0: qué se hizo, qué falta (en orden), el plan que se sigue y qué decisiones de Ronald faltan. Redáctalo para una sesión sin contexto. Usa la fecha y hora reales (`date`), nunca estimadas.
4. Si apareció un error que un agente debió evitar: anótalo en ese agente (`.claude/agents/`), suma una línea fechada en «Aprendido construyendo» de `.claude/agents/LEEME.md`, y una decisión nueva de Ronald va a `docs/juego/REGLAS-COMUNES-AGENTES.md`.
5. Commit y `git push origin HEAD:main` (el hook corre las pruebas otra vez). Verifica con `git status` que quede limpio y «up to date».
6. Cierra con una línea: qué se anotó y dónde.
