import fs from "node:fs";
import path from "node:path";
import { MATERIAS } from "@content/materias";
import { PODCASTS } from "@content/podcasts";
import { TESIS_RESUMEN } from "@content/tesis";
import type { HerramientaMateria, Materia, Tema } from "@/lib/types";

// Se publica sólo lo que tiene contenido real: mejor ninguna página que una plantilla vacía.
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

export function materiaPublicada(materia: Materia): boolean {
  return herramientasPublicadas(materia).length > 0 || temasPublicados(materia).length > 0;
}

export function materiasPublicadas(): Materia[] {
  return MATERIAS.filter(materiaPublicada);
}

export function materiasEnPreparacion(): Materia[] {
  return MATERIAS.filter((m) => !materiaPublicada(m));
}

export function hayPodcasts(): boolean {
  return PODCASTS.length > 0;
}

export function hayTesis(): boolean {
  return TESIS_RESUMEN.tutorias + TESIS_RESUMEN.revisorias > 0;
}
