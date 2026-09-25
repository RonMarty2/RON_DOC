# Fuentes — qué trae RON_DOC de Axiom y de SimuladorPRO

RON_DOC toma piezas de dos repos que **siguen cambiando por su cuenta**:

| Repo | Qué aporta | Dónde se espera el clon |
|---|---|---|
| [axiom-simulador](https://github.com/RonMarty2/axiom-simulador) | Lo visual y cómo se ve la matemática: paleta LIENZO, fórmulas con KaTeX, tarjetas, figuras con coordenadas calculadas, reglas de lámina | `../axiom-simulador` |
| [simuladorPRO](https://github.com/RonMarty2/simuladorPRO) | Lo financiero: motor de VAN, TIR, WACC, amortización, depreciación, punto de equilibrio, sensibilidad, impuestos Bolivia | `../simuladorPRO` |

Este archivo es la memoria de esa relación: qué se trajo, desde qué commit, y hasta dónde se revisó. **Se revisa al empezar cada sesión de trabajo en RON_DOC** (ver protocolo abajo).

---

## Hasta dónde se revisó

| Repo | Último commit revisado | Fecha del commit |
|---|---|---|
| axiom-simulador | `53ab5dccd4cd08ad303245bfebf1ce228f9df6e0` | 2026-09-18 |
| simuladorPRO | `8acdc6c2c8f6f1655610da2be697c57eb77cb6ac` | 2026-08-02 |

Se actualiza al terminar cada revisión, aunque no se haya traído nada.

---

## Protocolo de revisión

1. **Traer lo nuevo sin tocar el trabajo local de esos repos.** Ronald los modifica en paralelo y puede haber cambios sin commitear: nunca hacer `pull`, `checkout` ni `reset` ahí desde una sesión de RON_DOC.

   ```bash
   git -C ../axiom-simulador fetch
   git -C ../simuladorPRO fetch
   ```

   Si una carpeta no existe, clonarla al lado de RON_DOC con la URL de la tabla de arriba.

2. **Ver qué cambió desde la última revisión.** Primero el panorama completo (puede haber piezas nuevas que no están en el mapa), después sólo las rutas vigiladas:

   ```bash
   git -C ../axiom-simulador log --oneline <último-revisado>..origin/main
   git -C ../simuladorPRO log --oneline <último-revisado>..origin/main
   ```

3. **Para cada pieza ya traída**, ver si su origen cambió desde el commit del que se copió:

   ```bash
   git -C ../simuladorPRO diff <commit-origen>..origin/main -- src/lib/calculo-financiero.ts
   ```

   Para leer la versión nueva de un archivo sin tocar el repo: `git -C ../simuladorPRO show origin/main:src/lib/calculo-financiero.ts`.

   Para saber si la copia del motor quedó atrás y volver a copiarlo (lee los archivos de `../simuladorPRO/src`, así que conviene mirar antes qué rama tiene ese repo; no hacer `pull` desde acá):

   ```bash
   node scripts/traer-motor-simpro.mjs --comprobar   # dice qué archivos cambiaron
   node scripts/traer-motor-simpro.mjs               # copia (idénticos salvo rutas de import)
   npm test
   ```

   La lista de archivos está en `ARCHIVOS` dentro del script; si un archivo nuevo importa algo que no está en la lista, el script falla y lo nombra.

4. **Decidir y avisar.** Resumir en pocas líneas qué hay de nuevo que valga para RON_DOC (arreglos de celular, componentes visuales, reglas nuevas en la bitácora, correcciones del motor financiero) y qué no aplica. Traer lo que corresponda, actualizando el `Commit origen` en el mapa.

5. **Anotar.** Actualizar "Hasta dónde se revisó" y agregar una fila al registro del final.

### Qué mirar con más atención

- **Axiom:** commits `fix(movil)`, cambios en `lienzo.tsx`, `MathText.tsx`, `LaminaShell.tsx`, `dispositivos.tsx`, `pedagogia.tsx`, `src/lib/figuras/`, y las secciones §4, §4.5 y §7 de su `BITACORA.md` (reglas de diseño y errores corregidos).
- **SimuladorPRO:** cualquier cambio en `src/lib/calculo-financiero.ts`, `src/lib/flujo-proyecto.ts`, `src/lib/finanzas/`, `src/lib/iva-proyecto.ts`, `src/lib/laboratorio-viabilidad.ts` y `docs/FINANZAS_CONSOLIDACION.md`.

---

## Regla de propiedad

- **Motor financiero: copia fiel.** SimuladorPRO es el cerebro financiero oficial (ver su `docs/FINANZAS_CONSOLIDACION.md`). En RON_DOC no se corrige una fórmula: si hay un error, se arregla en SimuladorPRO con su test y después se vuelve a copiar. Así los números nunca divergen entre los dos.
- **Piezas visuales: se pueden adaptar.** RON_DOC tiene necesidades propias (modo proyector, modo oscuro, sitio estático). Si una pieza se adapta, anotar en la columna `Notas` qué se cambió, para saber qué respetar cuando llegue una versión nueva del origen.

---

## Mapa de piezas

Estados: `pendiente` · `traída` · `adaptada` · `descartada`.

### Desde axiom-simulador

| Pieza | Origen | Destino en RON_DOC | Estado | Commit origen | Notas |
|---|---|---|---|---|---|
| Paleta y tipografías | `src/app/globals.css` (tokens de `:root`), `src/app/aprende/_components/lienzo.tsx` (`LIENZO`), `src/app/layout.tsx` (fuentes) | `src/app/globals.css`, `src/app/layout.tsx` | adaptada | `fd17d4c` | Variables CSS con versión oscura (Axiom sólo tiene claro). `--aviso` y `--error` más oscuros: los de Axiom no llegaban a 4.5:1 sobre el papel. Crimson Pro y Atkinson rigen en todo el sitio. Ojo: la bitácora de Axiom §4 todavía describe la paleta violeta vieja; manda el código (terracota) |
| Analizador de fórmulas y **negrita** | `src/app/components/math-parse.ts` + `math-parse.test.ts` | `src/components/math-parse.ts` (idéntico) + `math-parse.test.ts` | traída | `58051af` | La prueba sólo cambia `node:test` por vitest |
| Fórmulas con KaTeX | `src/app/components/MathText.tsx` | `src/components/MathText.tsx` | adaptada | `58051af` | Export con nombre; mismo parser y mismos arreglos de celular. Sin `"use client"` ni `useMemo`: desde una página del servidor la fórmula llega armada y KaTeX no viaja al navegador. Genera `htmlAndMathml` (Axiom sólo `html`) para que un lector de pantalla lea la fórmula. Dentro de láminas `.katex` va a 1.1em (en `globals.css`) |
| Contenedor de tarjetas | `src/app/laminas/_components/LaminaShell.tsx` | `src/components/lamina/LaminaShell.tsx` | adaptada | `fd17d4c` | Sin framer-motion (animación CSS). Todo en em: la tarjeta crece entera en proyector, y la letra también se frena por la altura (`2vh`), porque a 1366×768 crecer sólo con el ancho la desbordaba. Flechas del teclado y control de presentación. Puntos con área táctil de 20 px. Sin las zonas laterales tocables: leyendo el código, en celular tapan unos 20 px del borde de las opciones (no se probó en Axiom). No cambia de tarjeta si el gesto empieza sobre una fórmula ancha o un deslizador. Botón de tema. Los enlaces del pie van lado a lado y recortados (en dos renglones le quitaban alto a la tarjeta). Accesibilidad: la etiqueta de la tarjeta es un `h2` y una región `aria-live` anuncia sólo "Tarjeta n de N: etiqueta" |
| Dispositivos visuales de tarjeta | `src/app/laminas/_components/dispositivos.tsx` | `src/components/lamina/dispositivos.tsx` | adaptada | `fd17d4c` | Colores por variable CSS, tamaños en em. `FilaRol` y `PartePuente` pasan su contenido por MathText (regla 12). `LineaEjemplo` sin overflow propio: le ponía barra vertical a cada fracción. `TablaRuffini` no se trajo. Agregado `Resultado` |
| Kit didáctico | `src/app/aprende/_components/pedagogia.tsx` | — | pendiente | — | |
| Solución paso a paso | `src/app/components/SolucionPasos.tsx` | — | pendiente | — | |
| Motor de figuras | `src/lib/figuras/motor.ts`, `src/lib/figuras/svg-sanitizar.ts` | — | pendiente | — | |
| Reglas de lámina 1 a 12 | `BITACORA.md` §4 y §4.5 | `CLAUDE.md` | adaptada | `fd17d4c` | Resumidas. La regla 6 (banco de exámenes como mapa) pasa a ser "el dossier del docente es la fuente" |
| Láminas de referencia para Matemática Financiera | `src/app/laminas/porcentajes-mezclas-interes/interes-simple-y-compuesto/`, `src/app/laminas/progresiones/` | — | pendiente | — | Base para interés compuesto y anualidades; el nivel es preuniversitario |

### Desde simuladorPRO

| Pieza | Origen | Destino en RON_DOC | Estado | Commit origen | Notas |
|---|---|---|---|---|---|
| Motor financiero | `src/lib/calculo-financiero.ts` + `calculo-financiero.test.ts` + `calculo-financiero-v2.test.ts` | `src/lib/simpro/` (mismos nombres) | traída | `8acdc6c` | Copia idéntica byte a byte. Sus 87 pruebas corren en RON_DOC con `npm test`. Usos: `/amortizacion`, depreciación lineal, simulador de proyectos |
| Flujo de caja del proyecto | `src/lib/flujo-proyecto.ts`, `src/lib/finanzas/proyecto-financiero.ts`, `src/lib/finanzas/api-contract.ts`, `src/lib/iva-proyecto.ts`, `src/types/proyecto.ts` | `src/lib/simpro/` (`types/` adentro) | traída | `8acdc6c` | Con `scripts/traer-motor-simpro.mjs`: idénticos salvo rutas de import. Para `/simulador-proyectos` |
| Sensibilidad y escenarios | `src/lib/finanzas/sensibilidad.ts`, `src/lib/escenarios.ts` + prueba | `src/lib/simpro/` | traída | `8acdc6c` | Ídem |
| Laboratorio de viabilidad | `src/lib/laboratorio-viabilidad.ts` + prueba (la pantalla vive en `src/components/presentacion/VisorPitch.tsx`) | `src/lib/simpro/` | traída | `8acdc6c` | Ídem; la pantalla se escribe en RON_DOC |
| Casos bolivianos de ejemplo | `src/lib/plantillas.ts` + prueba, `src/lib/proyecto-factory.ts` | `src/lib/simpro/` | traída | `8acdc6c` | 27 proyectos completos; los elige el alumno en el simulador |
| Interfaz del simulador | `src/routes/construir-proyecto.tsx`, `simular-proyecto.tsx`, `components/constructor/`, `components/escenarios/` | `src/app/simulador-proyectos/` | adaptada (en curso) | `8acdc6c` | No se copia: React Router, Zustand y Supabase. Se reescribe con el aspecto del sitio y en tuteo |

**No cubierto por SimuladorPRO** (hay que construirlo en RON_DOC): anualidades, bonos, ratios financieros, análisis vertical/horizontal, DuPont.

### Lo que no se trae

Supabase, login, pagos y planes, paneles de docente, banco de exámenes UMSS, motor de eventos de simulación. RON_DOC es un sitio estático en GitHub Pages y no los necesita.

---

## Registro de revisiones

| Fecha | Rango revisado | Qué se trajo | Qué se descartó y por qué |
|---|---|---|---|
| 2026-09-14 | Línea base: axiom `fd17d4c`, simuladorPRO `8acdc6c` | Nada todavía; se armó el mapa de piezas | — |
| 2026-09-14 | Sin commits nuevos en ninguno de los dos | Base visual de Axiom: paleta, tipografías, MathText, LaminaShell, dispositivos, reglas de lámina. Muestra en `/muestra` | `TablaRuffini`: es de álgebra preuniversitaria, no la usa ninguna materia de RON_DOC |
| 2026-09-14 | Sin commits nuevos en ninguno de los dos | Motor financiero de SIMPRO (`8acdc6c`) con sus pruebas. Lámina `/amortizacion` sobre `calcularAmortizacionGenerica` | — |
| 2026-09-14 | Axiom `fd17d4c..a0ab04b` (6 commits); SIMPRO sin cambios | Nada | Los 6 son del banco de exámenes de Económicas, facultades e inventario de facsímiles: ninguna ruta vigilada, y el banco está en "lo que no se trae" |
| 2026-09-14 | Axiom `a0ab04b..7a5d8ed` (8 commits); SIMPRO sin cambios | `58051af`: `parsearMath` en archivo propio con 10 pruebas, y `**negrita**` en MathText | Los otros 7: exámenes de Económicas y títulos de parciales del banco |
| 2026-09-14 | Sin commits nuevos en ninguno de los dos (revisado al empezar y al terminar la tanda de progreso, sin internet, controles, imágenes para compartir y hoja imprimible) | Nada | — |
| 2026-09-14 | SIMPRO `8acdc6c`, sin cambios | El motor del simulador de proyectos: `types/proyecto.ts`, `flujo-proyecto.ts`, `iva-proyecto.ts`, `escenarios.ts`, `finanzas/` (proyecto-financiero, sensibilidad, api-contract), `laboratorio-viabilidad.ts`, `proyecto-factory.ts`, `plantillas.ts` y sus pruebas, con `scripts/traer-motor-simpro.mjs` | Toda la interfaz (otro stack), login, cursos, entregas, eventos en vivo, podio y exportar a Excel: dependen de Supabase o del rol docente |
| 2026-09-25 | Axiom `7a5d8ed..53ab5dc` (64 commits); SIMPRO `8acdc6c`, sin cambios | `06b691f`/`3c7ab7b`: detector de voseo generado desde infinitivos, con imperativos con pronombre pegado, en `src/lib/revision.ts` (lista de verbos propia, con los de finanzas; sin el imperativo suelto de -ir, que choca con el pretérito de yo) | Banco de exámenes, figuras de lecciones y `lienzo.tsx` (la rejilla de Ejes: RON_DOC no trajo el lienzo) |
