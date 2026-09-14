# Punto de entrada para asistentes IA

## Antes de hacer cualquier cosa

**Revisar las fuentes.** RON_DOC toma piezas de `axiom-simulador` (lo visual y la matemática) y de `simuladorPRO` (lo financiero), y esos dos repos siguen mejorando por su cuenta. Al empezar la sesión, seguir el protocolo de [FUENTES.md](./FUENTES.md): traer lo nuevo con `git fetch`, ver qué cambió desde el último commit revisado, contarle a Ronald en pocas líneas qué vale la pena traer, y anotar la revisión.

No saltearlo aunque el pedido de la sesión parezca no tener relación: un arreglo de celular en Axiom o una corrección del motor en SimuladorPRO puede ser justo lo que falta acá.

## Qué es RON_DOC (decidido el 2026-09-14)

**El aula de las materias que dicta Ronald: un libro interactivo por materia**, con el mismo espíritu que el Aula de Probabilidad (`/aula-probabilidad`), el aspecto visual de Axiom y el motor financiero de SimuladorPRO adentro.

- Lo personal es secundario: podcasts y tesis aparecen solos cuando `content/podcasts.ts` o `content/tesis.ts` tienen datos reales. "Sobre mí" se eliminó el 14-sep porque era todo relleno; si Ronald quiere una bio, se escribe con él.
- **No se publica nada con `[CONTENIDO PENDIENTE]`.** Lo decide `src/lib/publicado.ts`: un tema se publica cuando su MDX deja de tener esa marca, una materia cuando tiene herramienta o temas publicados; el resto da 404 y en la portada sólo se nombra como "en preparación".
- Axiom y SimuladorPRO aparecen como proyectos, con sus enlaces reales.

## Idioma: tuteo, nunca voseo (decidido el 2026-09-14)

Todo lo que lee un alumno va en tuteo: la web, las láminas y los cuadernillos de `ejercicios/` ("puedes", "mira", "fíjate", "tú"). El 14-sep se pasaron 384 formas en 56 archivos y se recompilaron los PDF. Los comentarios del código y los documentos para Ronald no se tocan.

Si hay que volver a barrer, ojo con dos cosas: los verbos que cambian de raíz no salen por regla ("contá" → "cuenta", "volvé" → "vuelve", "pedí" → "pide"), y los imperativos con pronombre pegado no llevan tilde en voseo ("respondelas" → "respóndelas"), así que un buscador de tildes no los ve.

## Formato

- **Tarjetas**: `src/components/lamina/LaminaShell.tsx`, con las piezas visuales de `src/components/lamina/dispositivos.tsx`. La muestra de referencia es `src/app/muestra/LaminaBayes.tsx` (ruta `/muestra`, sin enlaces desde el sitio).
- **Colores sólo con los tokens** (`bg-papel`, `text-tinta`, `text-acento`, `bg-ok/10`…, definidos en `globals.css`). Así el modo oscuro sale solo.
- **Fórmulas con KaTeX** (`src/components/MathText.tsx`), nunca armadas a mano.
- **Números financieros sólo desde el motor copiado de SimuladorPRO** (`src/lib/simpro/`, no se edita). Si una fórmula está mal, se arregla allá y se vuelve a copiar (ver "Regla de propiedad" en FUENTES.md). Las pruebas del motor corren con `npm test`.
- Ejemplo de lámina financiera: `src/app/amortizacion/LaminaAmortizacion.tsx`. Ningún monto está escrito a mano: todos salen de `calcularAmortizacionGenerica`.

## Reglas para escribir una lámina (vienen de Axiom, aprobadas por Ronald)

1. **Puente al inicio**: nunca arrancar con notación nueva; conectar con algo que ya se sabe y mantener esa comparación a la vista.
2. **Un salto lógico por tarjeta.** Lo que no es necesario para llegar a la conclusión va aparte, al final.
3. **Nombrar el paso "obvio"** que en realidad no lo es.
4. **Prosa corrida dentro de la tarjeta**, con acentos puntuales; nada de grillas de cajitas de colores.
5. **Orden**: Gancho → Puente → Por qué funciona (un paso por tarjeta) → Aplicándolo → Ojo (error típico) → Generalización → Practícalo tú.
6. **La fuente es el dossier del docente.** Los números de un caso no se inventan ni se cambian sin revisarlo.
7. **Figuras con coordenadas calculadas**, nunca a ojo.
8. **Usar las piezas compartidas** antes que escribir estilos sueltos en cada lámina.
9. **Cada lámina lleva al menos un ejemplo numérico completo**, paso a paso.
10. **Cada tarjeta necesita un dispositivo visual propio** que haga ver la idea, no sólo texto con formato.
11. **Nada de guiones largos (—) en el texto de la lámina**: se confunden con el signo menos.
12. **Toda expresión matemática pasa por MathText**, incluso "x = 1". Dentro de `$...$` el decimal va como `0{,}88`, si no KaTeX pone un espacio después de la coma.

## Decisiones pendientes (preguntar a Ronald, no asumir)

- Modo proyector: la tarjeta ya crece con la pantalla (en 1920×1080 mide unos 900 px de ancho, con letra de 21 px; en 1280×720 y 1366×768 entra sin desbordar) y se maneja con las flechas o un control de presentación. Falta que Ronald lo pruebe proyectado en clase.
- Lámina `/amortizacion` (Matemática Financiera): está sin enlazar y fuera de buscadores hasta que Ronald la revise contra su dossier (notación, ejemplo, orden americano → alemán → francés). Para publicarla: agregarla como herramienta de `matematica-financiera` en `content/materias.ts` y quitarle el `robots` de `page.tsx`.
- Si el Aula de Probabilidad se migra a tarjetas, y cuándo. Hoy es un libro con scroll de unas 11.000 líneas.
- Con qué materia se arranca. Cada una necesita el dossier del docente.

## Material que ya existe

- Aula de Probabilidad: `LEEME-AULA.md` y `bitacoras/psicoestadistica-inferencial.md`.
- Android: `LEEME-ANDROID.md`.
- Cómo se alimenta el contenido y cómo se publica: `README.md`.
