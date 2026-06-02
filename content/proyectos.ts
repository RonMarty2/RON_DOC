import type { Proyecto } from "@/lib/types";

/**
 * Lista de proyectos/apps personales enlazados desde este sitio.
 *
 * Cada entrada apunta a una URL externa; el sitio no aloja nada de la app.
 * Para agregar uno: sumá un objeto al array.
 */
export const PROYECTOS: Proyecto[] = [
  {
    slug: "simulador-examenes-ingreso",
    titulo: "Simulador de exámenes de ingreso",
    descripcion:
      "[CONTENIDO PENDIENTE] Plataforma para practicar exámenes de admisión universitaria con corrección automática y estadísticas de desempeño.",
    url: "https://ejemplo.com/simulador",
    estado: "en-linea",
    icono: "🎯",
    tags: ["evaluación", "admisión"],
    anio: 2025,
  },
  {
    slug: "generador-proyectos-grado",
    titulo: "Generador de proyectos de grado",
    descripcion:
      "[CONTENIDO PENDIENTE] Asistente que ayuda a estructurar la propuesta inicial de un trabajo de grado a partir de un tema y campo de estudio.",
    url: "https://ejemplo.com/generador",
    estado: "beta",
    icono: "📝",
    tags: ["metodología", "redacción"],
    anio: 2025,
  },
  {
    slug: "calculadora-financiera",
    titulo: "[CONTENIDO PENDIENTE] Otra app",
    descripcion:
      "Reemplazá esta entrada en content/proyectos.ts por otra app real que quieras enlazar.",
    url: "https://ejemplo.com/",
    estado: "en-desarrollo",
    icono: "💡",
    tags: ["placeholder"],
  },
];

/** Etiqueta legible y clases Tailwind por estado. */
export const ESTADOS_PROYECTO: Record<
  Proyecto["estado"],
  { label: string; clase: string }
> = {
  "en-linea": {
    label: "En línea",
    clase:
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800",
  },
  beta: {
    label: "Beta",
    clase:
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800",
  },
  "en-desarrollo": {
    label: "En desarrollo",
    clase:
      "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800",
  },
  archivado: {
    label: "Archivado",
    clase:
      "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700",
  },
};
