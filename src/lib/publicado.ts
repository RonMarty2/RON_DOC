import fs from "node:fs";
import path from "node:path";
import { MATERIAS } from "@content/materias";
import { PODCASTS } from "@content/podcasts";
import { TESIS_RESUMEN } from "@content/tesis";
import type { HerramientaMateria, Materia, Tema } from "@/lib/types";

// Un tema (MDX) se publica cuando deja de tener esta marca. Las materias se muestran todas desde el
// 27-09 (pedido de Ronald: la estructura se ve entera; lo que falta dice «En construcción»).
const MARCA_PENDIENTE = "[CONTENIDO PENDIENTE]";

export function temaPublicado(materia: Materia, tema: Tema): boolean {
  const ruta = path.join(process.cwd(), "content", "temas", materia.slug, `${tema.archivoMdx}.mdx`);
  return !fs.readFileSync(ruta, "utf8").includes(MARCA_PENDIENTE);
}

export function temasPublicados(materia: Materia): Tema[] {
  return materia.temas.filter((t) => temaPublicado(materia, t));
}

export function herramientasPublicadas(materia: Materia): HerramientaMateria[] {
  return materia.herramientas?.filter((h) => !h.borrador) ?? [];
}

/** Para el `robots` de cada página de herramienta: un borrador no se indexa. */
export function esBorrador(href: string): boolean {
  return MATERIAS.some((m) => m.herramientas?.some((h) => h.href === href && h.borrador));
}

/** Sección ESTUDIAR: aulas y láminas publicadas (los temas en MDX van aparte). */
export const paraEstudiar = (m: Materia) => herramientasPublicadas(m).filter((h) => h.tipo === undefined || h.tipo === "aula" || h.tipo === "lamina");

/** Sección PRACTICAR: hojas publicadas. */
export const paraPracticar = (m: Materia) => herramientasPublicadas(m).filter((h) => h.tipo === "hoja");

export function hayPodcasts(): boolean {
  return PODCASTS.length > 0;
}

export function hayTesis(): boolean {
  return TESIS_RESUMEN.tutorias + TESIS_RESUMEN.revisorias > 0;
}
