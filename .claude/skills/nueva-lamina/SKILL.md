---
name: nueva-lamina
description: "Prepara una lámina nueva de RON_DOC con las reglas de CLAUDE.md: estructura, registro en laminas.test.tsx y medición móvil/escritorio."
disable-model-invocation: true
argument-hint: "<ruta-de-la-lámina>"
---

Antes de escribir, lee `src/app/muestra/LaminaBayes.tsx` (modelo) y la sección «Reglas para escribir una lámina» de `CLAUDE.md`. La fuente es el dossier del docente: no inventes ni cambies sus números.

1. Crea `src/app/$ARGUMENTS/Lamina<Nombre>.tsx` con `LaminaShell` y las piezas de `src/components/lamina/dispositivos.tsx`.
2. Orden: Gancho → Puente → Por qué funciona (un paso por tarjeta) → Aplicándolo → Ojo → Generalización → Practícalo tú. Un ejemplo numérico completo; un dispositivo visual por tarjeta.
3. Colores solo con tokens (`bg-papel`, `text-tinta`…). Toda expresión matemática por `MathText`, decimales como `0{,}88`. Sin guiones largos, tuteo. Montos financieros desde funciones probadas, nunca escritos a mano.
4. Suma la lámina a `LAMINAS` en `src/app/laminas.test.tsx`.
5. Márcala `borrador: true` en `content/materias.ts` hasta que Ronald la revise.
6. Corre `npm test` y `npx tsc --noEmit`; mide con `scripts/medir-tarjetas.js` en 375×812 y 1366×768 y abre la lámina en el navegador antes de mostrarla.
