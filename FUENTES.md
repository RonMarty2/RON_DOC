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
| axiom-simulador | `fd17d4ceea61ff130a565bc9affe78e15bf7134a` | 2026-09-14 |
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
| Fórmulas con KaTeX | `src/app/components/MathText.tsx` | `src/components/MathText.tsx` | traída | `fd17d4c` | Export con nombre; mismo parser y mismos arreglos de celular. Dentro de láminas `.katex` va a 1.1em (en `globals.css`) |
| Contenedor de tarjetas | `src/app/laminas/_components/LaminaShell.tsx` | `src/components/lamina/LaminaShell.tsx` | adaptada | `fd17d4c` | Sin framer-motion (animación CSS). Todo en em: la tarjeta crece entera en proyector. Flechas del teclado y control de presentación. Puntos con área táctil de 20 px. Sin las zonas laterales tocables: leyendo el código, en celular tapan unos 20 px del borde de las opciones (no se probó en Axiom). No cambia de tarjeta si el gesto empieza sobre una fórmula ancha o un deslizador. Botón de tema |
| Dispositivos visuales de tarjeta | `src/app/laminas/_components/dispositivos.tsx` | `src/components/lamina/dispositivos.tsx` | adaptada | `fd17d4c` | Colores por variable CSS, tamaños en em. `FilaRol` y `PartePuente` pasan su contenido por MathText (regla 12). `LineaEjemplo` sin overflow propio: le ponía barra vertical a cada fracción. `TablaRuffini` no se trajo. Agregado `Resultado` |
| Kit didáctico | `src/app/aprende/_components/pedagogia.tsx` | — | pendiente | — | |
| Solución paso a paso | `src/app/components/SolucionPasos.tsx` | — | pendiente | — | |
| Motor de figuras | `src/lib/figuras/motor.ts`, `src/lib/figuras/svg-sanitizar.ts` | — | pendiente | — | |
| Reglas de lámina 1 a 12 | `BITACORA.md` §4 y §4.5 | `CLAUDE.md` | adaptada | `fd17d4c` | Resumidas. La regla 6 (banco de exámenes como mapa) pasa a ser "el dossier del docente es la fuente" |
| Láminas de referencia para Matemática Financiera | `src/app/laminas/porcentajes-mezclas-interes/interes-simple-y-compuesto/`, `src/app/laminas/progresiones/` | — | pendiente | — | Base para interés compuesto y anualidades; el nivel es preuniversitario |

### Desde simuladorPRO

| Pieza | Origen | Destino en RON_DOC | Estado | Commit origen | Notas |
|---|---|---|---|---|---|
| Motor financiero | `src/lib/calculo-financiero.ts` + `calculo-financiero.test.ts` + `calculo-financiero-v2.test.ts` | — | pendiente | — | Copia fiel |
| Flujo de caja del proyecto | `src/lib/flujo-proyecto.ts`, `src/lib/finanzas/proyecto-financiero.ts`, `src/lib/iva-proyecto.ts`, `src/types/proyecto.ts` | — | pendiente | — | Revisar dependencias al copiar |
| Sensibilidad y escenarios | `src/lib/finanzas/sensibilidad.ts`, `src/lib/escenarios.ts` | — | pendiente | — | |
| Laboratorio de viabilidad | `src/lib/laboratorio-viabilidad.ts` (la pantalla vive en `src/components/presentacion/VisorPitch.tsx`) | — | pendiente | — | |
| Casos bolivianos de ejemplo | `src/lib/plantillas.ts` | — | pendiente | — | Material para ejercicios |

**No cubierto por SimuladorPRO** (hay que construirlo en RON_DOC): anualidades, bonos, ratios financieros, análisis vertical/horizontal, DuPont.

### Lo que no se trae

Supabase, login, pagos y planes, paneles de docente, banco de exámenes UMSS, motor de eventos de simulación. RON_DOC es un sitio estático en GitHub Pages y no los necesita.

---

## Registro de revisiones

| Fecha | Rango revisado | Qué se trajo | Qué se descartó y por qué |
|---|---|---|---|
| 2026-09-14 | Línea base: axiom `fd17d4c`, simuladorPRO `8acdc6c` | Nada todavía; se armó el mapa de piezas | — |
| 2026-09-14 | Sin commits nuevos en ninguno de los dos | Base visual de Axiom: paleta, tipografías, MathText, LaminaShell, dispositivos, reglas de lámina. Muestra en `/muestra` | `TablaRuffini`: es de álgebra preuniversitaria, no la usa ninguna materia de RON_DOC |
