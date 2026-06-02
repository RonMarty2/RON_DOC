import type { AreaTesis } from "@/lib/types";

/**
 * Resumen agregado de acompañamiento de trabajos de grado.
 *
 * Diseño consciente de privacidad: NO se publican nombres de estudiantes,
 * universidades ni títulos específicos. Solo áreas, conteos y el enfoque de tutoría.
 *
 * Reemplazá los números y nombres de área con tus cifras reales.
 */

export const TESIS_RESUMEN = {
  /** Total de tesis donde fuiste tutor. */
  tutorias: 0,
  /** Total de tesis donde fuiste revisor. */
  revisorias: 0,
  /** Año desde el cual venís acompañando trabajos. */
  desde: 2018,
};

export const AREAS_TESIS: AreaTesis[] = [
  {
    nombre: "Estadística aplicada a las ciencias sociales",
    cantidad: 0,
    descripcion:
      "[CONTENIDO PENDIENTE] Trabajos con análisis descriptivo y bivariado, escalas de medición y diseño muestral.",
  },
  {
    nombre: "Modelos econométricos y series de tiempo",
    cantidad: 0,
    descripcion:
      "[CONTENIDO PENDIENTE] Estudios con regresión múltiple, ARIMA y modelos de panel.",
  },
  {
    nombre: "Análisis financiero y evaluación de proyectos",
    cantidad: 0,
    descripcion:
      "[CONTENIDO PENDIENTE] Trabajos sobre ratios, flujos de fondos, valoración y análisis de inversiones.",
  },
  {
    nombre: "Matemática financiera aplicada",
    cantidad: 0,
    descripcion:
      "[CONTENIDO PENDIENTE] Estudios sobre estructuras de amortización, bonos y planificación financiera.",
  },
];

/**
 * Enfoque metodológico que mostrás en la página de tesis.
 * Editalo libremente: es el "cómo trabajo" tuyo, no datos de terceros.
 */
export const ENFOQUE_TUTORIA = [
  "[CONTENIDO PENDIENTE] Definí acá tu enfoque al acompañar trabajos de grado: cómo orientás la formulación del problema, qué prácticas exigís en el manejo de datos, qué bibliografía sugerís.",
  "[CONTENIDO PENDIENTE] Segundo párrafo: criterios de evaluación, cadencia de reuniones, herramientas que usás (R, Stata, Excel, Python, etc.).",
];
