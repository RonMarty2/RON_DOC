import type { ColorAcento } from "./types";

/**
 * Mapeo de colores de acento a clases Tailwind concretas.
 *
 * IMPORTANTE: Tailwind purga clases no referenciadas como strings literales,
 * por eso aquí están escritas completas (no construidas dinámicamente).
 */
export const COLORES: Record<
  ColorAcento,
  {
    /** Fondo suave para tarjetas y badges. */
    bgSuave: string;
    /** Color de texto principal sobre fondo claro. */
    texto: string;
    /** Borde de acento. */
    borde: string;
    /** Fondo sólido (para botones, headers). */
    bgSolido: string;
    /** Hover sólido. */
    bgSolidoHover: string;
    /** Anillo (focus). */
    anillo: string;
    /** Gradient stop inicial para hero/cards. */
    desde: string;
    /** Gradient stop final. */
    hasta: string;
  }
> = {
  azul: {
    bgSuave: "bg-blue-50 dark:bg-blue-950/30",
    texto: "text-blue-700 dark:text-blue-300",
    borde: "border-blue-200 dark:border-blue-800",
    bgSolido: "bg-blue-600",
    bgSolidoHover: "hover:bg-blue-700",
    anillo: "ring-blue-500",
    desde: "from-blue-500",
    hasta: "to-blue-700",
  },
  verde: {
    bgSuave: "bg-emerald-50 dark:bg-emerald-950/30",
    texto: "text-emerald-700 dark:text-emerald-300",
    borde: "border-emerald-200 dark:border-emerald-800",
    bgSolido: "bg-emerald-600",
    bgSolidoHover: "hover:bg-emerald-700",
    anillo: "ring-emerald-500",
    desde: "from-emerald-500",
    hasta: "to-emerald-700",
  },
  morado: {
    bgSuave: "bg-violet-50 dark:bg-violet-950/30",
    texto: "text-violet-700 dark:text-violet-300",
    borde: "border-violet-200 dark:border-violet-800",
    bgSolido: "bg-violet-600",
    bgSolidoHover: "hover:bg-violet-700",
    anillo: "ring-violet-500",
    desde: "from-violet-500",
    hasta: "to-violet-700",
  },
  naranja: {
    bgSuave: "bg-orange-50 dark:bg-orange-950/30",
    texto: "text-orange-700 dark:text-orange-300",
    borde: "border-orange-200 dark:border-orange-800",
    bgSolido: "bg-orange-600",
    bgSolidoHover: "hover:bg-orange-700",
    anillo: "ring-orange-500",
    desde: "from-orange-500",
    hasta: "to-orange-700",
  },
};
