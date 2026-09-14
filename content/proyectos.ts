import type { Proyecto } from "@/lib/types";

/**
 * Lista de proyectos/apps personales enlazados desde este sitio.
 *
 * Cada entrada apunta a una URL externa; el sitio no aloja nada de la app.
 * Para agregar uno: suma un objeto al array.
 */
export const PROYECTOS: Proyecto[] = [
  {
    slug: "axiom",
    titulo: "AXIOM",
    descripcion:
      "Preparación para el examen de admisión de la UMSS: lecciones animadas, láminas de repaso y un simulador que replica el examen real.",
    url: "https://axiom-simulador.vercel.app",
    estado: "en-linea",
    tags: ["admisión", "UMSS", "matemática"],
  },
  {
    slug: "simpro",
    titulo: "SIMPRO",
    descripcion:
      "Simulador de proyectos de inversión: el estudiante arma su proyecto en 9 etapas y lo enfrenta durante 5 años a eventos económicos de Bolivia.",
    url: "https://simulador-pro-seven.vercel.app",
    estado: "en-linea",
    tags: ["evaluación de proyectos", "finanzas"],
  },
];

/** Etiqueta legible y clases Tailwind por estado. */
export const ESTADOS_PROYECTO: Record<
  Proyecto["estado"],
  { label: string; clase: string }
> = {
  "en-linea": { label: "En línea", clase: "border-ok/40 bg-ok/10 text-ok" },
  beta: { label: "Beta", clase: "border-aviso/40 bg-aviso/10 text-aviso" },
  "en-desarrollo": { label: "En desarrollo", clase: "border-acento/40 bg-acento/10 text-acento" },
  archivado: { label: "Archivado", clase: "border-borde bg-papel-suave text-tinta-tenue" },
};
