/**
 * Bloques temáticos del recorrido. Cada uno tiene su color de acento, para
 * que se vea en qué parte del camino está uno sin necesidad de leer.
 *
 * Las clases se escriben completas (no interpoladas) porque Tailwind sólo
 * conserva las que encuentra literales en el código.
 */

export type BloqueId =
  | "preambulo"
  | "fundamentos"
  | "calculo"
  | "bayes"
  | "distribuciones";

export interface BloqueEstilo {
  etiqueta: string;
  /** Píldora de navegación cuando el módulo está activo. */
  activo: string;
  /** Píldora de navegación en reposo. */
  inactivo: string;
  /** Texto de acento (encabezados, numeración de pasos). */
  texto: string;
  /** Fondo suave para insignias y numeración. */
  insignia: string;
  /** Barra fina que marca el bloque en la navegación. */
  barra: string;
}

export const BLOQUES: Record<BloqueId, BloqueEstilo> = {
  preambulo: {
    etiqueta: "Antes de empezar",
    activo: "border-slate-700 bg-slate-700 text-white",
    inactivo:
      "border-slate-200 bg-white text-slate-700 hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300",
    texto: "text-slate-700 dark:text-slate-300",
    insignia: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    barra: "bg-slate-400",
  },
  fundamentos: {
    etiqueta: "Fundamentos",
    activo: "border-blue-600 bg-blue-600 text-white",
    inactivo:
      "border-slate-200 bg-white text-slate-700 hover:border-blue-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300",
    texto: "text-blue-700 dark:text-blue-300",
    insignia: "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300",
    barra: "bg-blue-500",
  },
  calculo: {
    etiqueta: "Herramientas de cálculo",
    activo: "border-indigo-600 bg-indigo-600 text-white",
    inactivo:
      "border-slate-200 bg-white text-slate-700 hover:border-indigo-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300",
    texto: "text-indigo-700 dark:text-indigo-300",
    insignia:
      "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300",
    barra: "bg-indigo-500",
  },
  bayes: {
    etiqueta: "El clímax",
    activo: "border-amber-600 bg-amber-600 text-white",
    inactivo:
      "border-slate-200 bg-white text-slate-700 hover:border-amber-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300",
    texto: "text-amber-700 dark:text-amber-400",
    insignia:
      "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300",
    barra: "bg-amber-500",
  },
  distribuciones: {
    etiqueta: "Distribuciones",
    activo: "border-emerald-600 bg-emerald-600 text-white",
    inactivo:
      "border-slate-200 bg-white text-slate-700 hover:border-emerald-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300",
    texto: "text-emerald-700 dark:text-emerald-400",
    insignia:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300",
    barra: "bg-emerald-500",
  },
};

export const ORDEN_BLOQUES: BloqueId[] = [
  "preambulo",
  "fundamentos",
  "calculo",
  "bayes",
  "distribuciones",
];
