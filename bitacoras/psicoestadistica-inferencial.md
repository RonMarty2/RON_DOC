# Bitácora — Psicoestadística Inferencial

**Herramienta:** Aula Interactiva de Probabilidad (`/aula-probabilidad`)
**Unidad del dossier:** Unidad 2 — Probabilidad y distribución de probabilidad
**Fuente del material:** `TEMA 2 — DOSSIER.pdf` + `TEMA 2 — DIAPOSITIVAS.pdf` (subidos por el docente)
**Última actualización:** 2026-08-19 (Unidad 2 completa + revisión didáctica)

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
| 2026-08-19 | **Regenerar el dataset** para que además de la tabla de contingencia cumpla media 6.32 y desviación 4.64, incluya `expedienteCompleto` y datos de demanda semanal | 2.9 calcula z = (10 − 6.32)/4.64, y 2.8 necesita K = 9 expedientes incompletos y λ = 5 solicitudes/semana. El dataset anterior daba media 5.84 y sd 6.30: los apartados finales no habrían coincidido con el dossier |
| 2026-08-19 | **Mejora aplicada a todos los apartados: componente `Formula`** — notación simbólica y sustitución numérica lado a lado | Era un pedido anterior que nunca se había implementado. Ver los dos lados en paralelo evita que los símbolos queden de adorno |
| 2026-08-19 | **Mejora aplicada a todos los apartados: componente `Trampa`** — error común, por qué ocurre, cómo corregirlo | El dossier trae estas trampas en cada apartado y son de lo más valioso pedagógicamente; estaban ausentes |
| 2026-08-19 | **Mejora aplicada a todos los apartados: componente `Puente`** — qué queda abierto y hacia dónde sigue | Convierte una lista de temas sueltos en un hilo continuo. 2.9 cierra volviendo al misterio del inicio |
| 2026-08-19 | 2.3 usa un selector de preguntas que ilumina numerador y denominador en la tabla 2×2 | Es la forma de que sensibilidad, especificidad y VPP dejen de confundirse: se ve que comparten numerador y cambian de denominador |
| 2026-08-19 | 2.9 termina con un punto de corte movible que recalcula sensibilidad, especificidad, VPP, derivaciones, casos perdidos y falsas alarmas | Cierra el capítulo devolviendo la decisión al lector y reconectando todo lo construido desde 2.1 |
| 2026-08-19 | **Auditoría didáctica** tras revisión del docente: se veía genérico, poco didáctico, con términos usados sin explicar y fórmulas sin desarrollo | Diagnóstico verificado por conteo: µ y σ aparecían 11 veces sin definirse; «corrección de continuidad» aparecía sólo dentro de una trampa, advirtiendo sobre un procedimiento nunca enseñado; el ejemplo de aproximación normal a la binomial se había perdido entero |
| 2026-08-19 | Componente **`Desarrollo`**: la cuenta línea por línea, con explicación de cada movimiento, revelada de a un paso | Era el reclamo central: «fórmulas que se muestran pero no se ve el cálculo». Ej. en 2.4 faltaba justo el paso de expandir 43! sólo hasta 38! para cancelar |
| 2026-08-19 | Componente **`FormulaAnotada`**: cada parte de la fórmula etiquetada y explicada | En Bayes se ve cuál término es la prevalencia, cuál la sensibilidad y cuál el denominador que hay que construir |
| 2026-08-19 | Componente **`Termino`**: glosario en línea con subrayado punteado | Resuelve «hablas pero no explicas» sin interrumpir la lectura: µ, σ, Σ, e, equiprobable, criterio de referencia, etc. |
| 2026-08-19 | Componente **`Comprueba`**: 1–2 preguntas por apartado con corrección inmediata Y explicación de cada opción | Antes nadie producía nada: todo era «mirá cómo pasa». La recuperación activa es lo que fija el concepto, y sirve igual en clase que para quien estudia solo |
| 2026-08-19 | **Bloques temáticos con color** (Antes de empezar · Fundamentos · Herramientas de cálculo · El clímax · Distribuciones) + barra de progreso + pasos numerados | La navegación eran 11 píldoras sueltas sin jerarquía; no se veía el recorrido |
| 2026-08-19 | **Restaurada** la aproximación normal a la binomial en 2.9, con la corrección de continuidad explicada y comparada contra omitirla | Estaba en el dossier, se había perdido, y quedaba una trampa advirtiendo sobre un error de algo nunca enseñado |
| 2026-08-19 | Subir la práctica de 1 a **2–3 preguntas por apartado** (22 en total) | Una sola pregunta por apartado era poco para cubrir los distintos errores típicos. 2.3 y 2.6 llevan tres por ser el núcleo conceptual |
| 2026-08-19 | La tabla de esperanza y varianza de **2.7 pasa a ser interactiva**: los términos se calculan de a uno y la fila Σ se acumula a la vista | Era el único módulo con un cálculo mostrado ya resuelto. Ahora se ve que una Σ no es más que acumular un término por valor posible — y que mientras la suma de probabilidades no llegue a 1, falta un valor |

## Estado actual — Unidad 2 COMPLETA

- [x] Dataset PTSMU (200 fichas) — 21/21 verificaciones contra el dossier
- [x] **Preámbulo "El misterio"** — la paradoja diagnóstica con predicción previa
- [x] **"El caso"** — qué es un tamizaje, armador de puntaje de 9 ítems, las 200 fichas
- [x] **2.1 Espacio muestral** — experimento aleatorio, S, punto muestral, evento simple/compuesto/seguro/imposible
- [x] **2.2 Tipos de probabilidad** — clásica, frecuentista, subjetiva; axiomas de Kolmogórov; regla del complemento
- [x] **2.3 Tablas de contingencia** — conjunta, marginal, condicional; **acá se definen** sensibilidad, especificidad y VPP con el denominador iluminado en la tabla
- [x] **2.4 Teoría combinatoria** — factorial, permutación vs. combinación con enumerador real; C(43,5) = 962,598
- [x] **2.5 Reglas básicas** — suma con diagrama de Venn, multiplicación, independencia verificada (4.5 esperados vs. 17 observados)
- [x] **2.6 Teorema de Bayes** — árbol de frecuencias naturales y deslizador de prevalencia; responde el misterio del inicio
- [x] **2.7 Variables aleatorias** — función de masa, esperanza y varianza término por término
- [x] **2.8 Distribuciones discretas** — binomial, Poisson e hipergeométrica, con el selector que pregunta cómo se generaron los conteos
- [x] **2.9 Distribución normal** — regla 68-95-99.7, puntuación z, y punto de corte movible que cierra el capítulo

Pendiente: Unidades 1, 3 y siguientes — hace falta el dossier de cada una.

## Números de verdad (no deben cambiar sin revisar el dossier)

- PHQ-9 positivo (≥10): 43/200 = 21.5%
- GAD-7 positivo (≥10): 21/200 = 10.5%
- Ambos positivos: 17/200 = 8.5%
- Prevalencia (Dx confirmado): 25/200 = 12.5%
- Sensibilidad = especificidad = 88.0%
- VPP = 51.2%
- C(43,5) = 962,598 · P(43,5) = 115,511,760
- Media PHQ-9 = 6.32 · desviación = 4.64 → z del corte = 0.79 → P(X≥10) = 0.214
- binomial(20, 5, 0.215) = 0.1887 · poisson(8, λ=5) = 0.0653 · hipergeom(43, 9, 6, 2) = 0.2739
- Expedientes incompletos entre los 43 positivos = 9 · demanda: 24 semanas, 121 solicitudes

## Componentes reutilizables ya construidos

Estos NO son específicos de esta materia — sirven para cualquier herramienta futura (Estadística Descriptiva, Econometría, etc.):

- `aleatorio.ts` — helpers de números al azar y simulación por lotes
- `BarraSim.tsx` — barra de convergencia con marca de valor teórico
- `Definicion` / `MiniHistoria` / `Formula` / `Frac` / `Trampa` / `Puente` (en `narrativa.tsx`) — el patrón completo del libro interactivo
- `AvatarMini.tsx` — avatar sobrio para grillas de personas
- `VotacionSimulada.tsx` — panel de votación de clase sin backend

## Pendiente / a decidir

- Personajes o nombres para futuros ejemplos aplicados (por ahora todo es "Estudiante #N", sin narrativa de personajes)
- Si Fase 2 (distribuciones) va en esta misma Aula o en una herramienta separada
