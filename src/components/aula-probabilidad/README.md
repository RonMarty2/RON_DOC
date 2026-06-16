# Aula Interactiva de Probabilidad — "La duda de Andrea"

Herramienta interactiva de la sección Psicoestadística. Una clase magistral en
vivo donde el aula vota con su intuición, se equivoca, y una simulación visual
le revela la verdad — todo cosido por **un caso** y **un dataset compartido de
60 estudiantes**.

## El caso

Andrea, psicóloga recién egresada, recibe a 60 estudiantes. Un test rápido
marca a **Daniela** (sana) como positiva. ¿Significa que tiene 90% de
probabilidad de estar mal? No: **38%**. La herramienta lo demuestra.

## Fuente única de verdad

Todos los módulos leen de **`content/aula-probabilidad/dataset.ts`** (60
estudiantes). Los cálculos viven en **`calculos.ts`** y se verifican con asserts
(`verificarVerdades()`, que corre en consola en desarrollo).

Números canónicos (verificados, no hardcodeados):

| Concepto | Valor |
|---|---|
| Ánimo bajo | 8/60 = **13.3%** |
| P(ánimo \| duerme mal) | 4/16 = **25%** |
| Test positivos | 21 (VP=8, FP=13) |
| **P(ánimo \| positivo)** | 8/21 = **38%** |

> Daniela (id 7) está sana pero dio positivo: es uno de los 13 falsos positivos.
> En el dataset había una segunda "Daniela" (id 30); se renombró a "Daniela R."
> para no confundir la narrativa. Ningún número cambió.

## Estructura

**Parte 1 — Preludio "Tu mente te engaña"** (sesgos, sin teoría):
- 🚪 `ModuloMonty` — Monty Hall (sesgo del statu quo), simula 33% vs 66%.
- 🎂 `ModuloCumpleanios` — usa los 60 cumpleaños reales (5 coincidencias, una de
  4 personas) + acumulador a prueba de fallas.
- 🪙 `ModuloMoneda` — falacia del jugador.

**Parte 2 — Construcción** (con los 60 reales):
- 🎱 `ModuloUrna` — probabilidad simple (13.3%) + convergencia.
- 🔎 `ModuloCondicional` — filtrado del aula, salto a 25%.
- 🧪 `ModuloBayes` — clímax: votación, 60 cuadritos, Daniela parpadea, 38%, y
  un explorador con sliders (modelo idealizado de 1000).

## Cómo agregar/cambiar contenido

- **Cambiar el grupo:** editá `dataset.ts` y actualizá `VERDADES`. Si los
  asserts fallan, la consola lo avisa en desarrollo.
- **Votación:** `VotacionSimulada.tsx` (modo local/simulado, sin backend). Si en
  el futuro se suma Supabase, se reemplaza por un componente equivalente que
  escuche votos reales — el resto no cambia.

## Notas técnicas

- 100% estático (GitHub Pages), sin backend, sin dependencias nuevas.
- Simulaciones por lotes con `requestAnimationFrame` (`aleatorio.ts`), no
  congelan la UI.
- Estilos aislados bajo `.aula-probabilidad`; animación `aulaParpadeo` namespaced.
