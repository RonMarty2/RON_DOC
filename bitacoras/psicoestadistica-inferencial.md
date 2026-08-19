# Bitácora — Psicoestadística Inferencial

**Herramienta:** Aula Interactiva de Probabilidad (`/aula-probabilidad`)
**Unidad del dossier:** Unidad 2 — Probabilidad y distribución de probabilidad
**Fuente del material:** `TEMA 2 — DOSSIER.pdf` + `TEMA 2 — DIAPOSITIVAS.pdf` (subidos por el docente)
**Última actualización:** 2026-08-19

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
| 2026-08-19 | Materia propia **Psicoestadística Inferencial** (`/materias/psicoestadistica-inferencial`); la herramienta deja de colgar de Descriptiva | La herramienta es de Inferencial; Descriptiva tendrá su propia herramienta más adelante |
| 2026-08-19 | Agregar preámbulo **"El misterio"** como primera pestaña, con predicción obligatoria antes de revelar | Faltaba enganche: se entraba directo a "2.1 Espacio muestral" sin saber por qué importa. Equivocarse uno mismo pega más que leer el dato |
| 2026-08-19 | Agregar sección **"El caso"** entre el preámbulo y 2.1 | La herramienta usaba PHQ-9/GAD-7 en todos lados sin explicar nunca qué son |
| 2026-08-19 | Explicar tamizaje con la **analogía del detector de metales**, y hacer que el visitante **arme un puntaje** tocando los 9 ítems | Las siglas en inglés y la palabra "tamizaje" confunden. La analogía instala de entrada que las falsas alarmas son normales, no un defecto |
| 2026-08-19 | **Sacar** sensibilidad, especificidad y prevalencia de la introducción → van a 2.3 | Son tres fracciones con denominadores distintos que suenan parecidas: definirlas juntas y en abstracto es la causa principal de que se mezclen. En 2.3 la tabla hace visible cada denominador |
| 2026-08-19 | Evento seguro / imposible se descubren desde el armador de eventos (0 caras y 6 caras) | Enseñar los dos extremos de la escala manipulándolos, en vez de enunciarlos |

## Estado actual (Fase 1: apartados 2.1–2.6)

- [x] Dataset PTSMU (200 estudiantes) — verificado exacto contra el dossier
- [x] **Preámbulo "El misterio"** — la paradoja diagnóstica con predicción previa
- [x] **"El caso"** — qué es un tamizaje, armador de puntaje de 9 ítems, las 200 fichas
- [x] **2.1 Espacio muestral** — experimento aleatorio, S, punto muestral, suceso (simple/compuesto/seguro/imposible con armador interactivo), espacio compuesto, aplicado al PHQ-9
- [ ] 2.2 Tipos de probabilidad (clásica, frecuentista, subjetiva)
- [ ] 2.3 Tablas de contingencia — **acá se definen** sensibilidad, especificidad, prevalencia y VPP, con la tabla de 4 celdas a la vista
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
