# Aula Interactiva de Probabilidad — cómo iniciar y dónde está todo

## Para iniciar el sitio (doble click)

- **Mac o Linux:** doble click en `iniciar-mac-linux.command`
- **Windows:** doble click en `iniciar-windows.bat`

La primera vez instala lo necesario (tarda unos minutos). Las siguientes veces arranca directo. Se abre solo en el navegador, en la Aula de Probabilidad. Para detener: volvé a la ventana negra que se abrió y presioná `Ctrl+C`.

Si el navegador no se abre solo, entrá a mano a: `http://localhost:3000/aula-probabilidad`

## Dónde está el código de la Aula

| Qué es | Dónde está |
|---|---|
| **Los datos** (200 estudiantes, PHQ-9/GAD-7/diagnóstico) | `content/aula-probabilidad/dataset.ts` |
| **Los cálculos** (sensibilidad, VPP, combinatoria, etc.) | `src/components/aula-probabilidad/calculos.ts` |
| **La lista de módulos** (2.1 a 2.6) | `src/components/aula-probabilidad/modulos.ts` |
| **Cada módulo** (una pantalla del temario) | `src/components/aula-probabilidad/Modulo*.tsx` |
| **El contenedor** (arma la navegación) | `src/components/aula-probabilidad/AulaProbabilidad.tsx` |
| **La página pública** (`/aula-probabilidad`) | `src/app/aula-probabilidad/page.tsx` |

## Estado actual (Fase 1: apartados 2.1 a 2.6 del dossier)

- [x] Dataset PTSMU (200 estudiantes) — verificado contra el dossier
- [x] 2.1 Espacio muestral
- [ ] 2.2 Tipos de probabilidad
- [ ] 2.3 Tablas de contingencia
- [ ] 2.4 Teoría combinatoria
- [ ] 2.5 Reglas básicas
- [ ] 2.6 Teorema de Bayes
- [ ] Fase 2: distribuciones (2.7 a 2.9) — pendiente

Cada módulo se construye y se aprueba antes de pasar al siguiente.
