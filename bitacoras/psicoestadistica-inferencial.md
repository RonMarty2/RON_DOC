# Bitácora — Psicoestadística Inferencial

**Herramienta:** Aula Interactiva de Probabilidad (`/aula-probabilidad`)
**Unidad del dossier:** Unidad 2 — Probabilidad y distribución de probabilidad
**Fuente del material:** `TEMA 2 — DOSSIER.pdf` + `TEMA 2 — DIAPOSITIVAS.pdf` (subidos por el docente)
**Última actualización:** 2026-08-18

---

## Decisiones tomadas

| Fecha | Decisión | Por qué |
|---|---|---|
| 2026-08-17 | Reemplazar el dataset narrativo "Andrea" (60 estudiantes ficticios) por el dataset real PTSMU (200 estudiantes, PHQ-9/GAD-7/Dx confirmado) | Los números deben coincidir exactamente con el dossier real (sensibilidad 88%, VPP 51.2%), no con una historia paralela |
| 2026-08-17 | Construir la Aula en fases: 2.1–2.6 primero (fundamentos + Bayes), 2.7–2.9 después (distribuciones) | Evitar abarcar demasiado de una vez; el docente se trababa justo en el salto de fundamentos a Bayes |
| 2026-08-17 | Patrón fijo por módulo: ejemplo clásico (dados/cartas/urnas) → aplicado a psicología (dataset real) | Pedido explícito: "siempre estén donde deban estar, pero después uno aplicado a psicología" |
| 2026-08-18 | Sacar la guía de clase colapsable del inicio | El docente quiere entrar directo al contenido, sin nada antes |
| 2026-08-18 | Estructura estilo libro: Definición (corta, sin caja de color) → interactivo que la ejemplifica, repetido por cada término | "Debería ser como un libro: definir, después ejemplificar de manera interactiva" — para que también sirva a estudiantes que lo usan de forma autónoma, sin el docente presente |
| 2026-08-18 | Publicar directo a `main` en cada iteración visible | El docente revisa el avance desde el celular en tiempo real |

## Estado actual (Fase 1: apartados 2.1–2.6)

- [x] Dataset PTSMU (200 estudiantes) — verificado exacto contra el dossier
- [x] **2.1 Espacio muestral** — experimento aleatorio, S, punto muestral, suceso (simple/compuesto con armador interactivo), espacio compuesto, aplicado al PHQ-9
- [ ] 2.2 Tipos de probabilidad (clásica, frecuentista, subjetiva)
- [ ] 2.3 Tablas de contingencia (sensibilidad, especificidad, VPP)
- [ ] 2.4 Teoría combinatoria (factorial, permutación, combinación — C(43,5))
- [ ] 2.5 Reglas básicas (suma, producto, independencia — comorbilidad)
- [ ] 2.6 Teorema de Bayes (falacia de la tasa base)
- [ ] Fase 2: distribuciones (2.7–2.9) — pendiente, sin planificar todavía

## Números de verdad (no deben cambiar sin revisar el dossier)

- PHQ-9 positivo (≥10): 43/200 = 21.5%
- GAD-7 positivo (≥10): 21/200 = 10.5%
- Ambos positivos: 17/200 = 8.5%
- Prevalencia (Dx confirmado): 25/200 = 12.5%
- Sensibilidad = especificidad = 88.0%
- VPP = 51.2%
- C(43,5) = 962,598

## Componentes reutilizables ya construidos

Estos NO son específicos de esta materia — sirven para cualquier herramienta futura (Estadística Descriptiva, Econometría, etc.):

- `aleatorio.ts` — helpers de números al azar y simulación por lotes
- `BarraSim.tsx` — barra de convergencia con marca de valor teórico
- `Definicion` / `MiniHistoria` (en `narrativa.tsx`) — el patrón libro→interactivo
- `AvatarMini.tsx` — avatar sobrio para grillas de personas
- `VotacionSimulada.tsx` — panel de votación de clase sin backend

## Pendiente / a decidir

- Personajes o nombres para futuros ejemplos aplicados (por ahora todo es "Estudiante #N", sin narrativa de personajes)
- Si Fase 2 (distribuciones) va en esta misma Aula o en una herramienta separada
