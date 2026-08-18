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

## Estado, decisiones y números de verdad

Todo eso vive en la bitácora de la materia, no acá (para no tener el
estado duplicado en dos archivos):

**`bitacoras/psicoestadistica-inferencial.md`**

Cada materia/herramienta que se agregue al sitio (Estadística Descriptiva,
Econometría, etc.) va a tener su propia bitácora en esa misma carpeta —
es el lugar único para ver qué se decidió y por qué, para cada una.
