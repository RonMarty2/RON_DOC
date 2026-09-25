/**
 * La versión de datos de cada alumno sale de su id de Supabase: siempre la misma para la misma
 * cuenta (aunque cambie de celular) y la página del docente la puede recalcular sin guardarla aparte.
 * Nunca da 0, que es el caso del dossier y lo tiene todo el curso a la vista.
 */

import { VERSION_MAXIMA } from "./planta";

/** FNV-1a de 32 bits: corto, estable y sin dependencias. */
function fnv1a(texto: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < texto.length; i++) {
    h ^= texto.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h;
}

/** Entre 1 y VERSION_MAXIMA. `semilla` distingue escenas, para que no se repita la misma versión en todas. */
export function versionDeAlumno(id: string, semilla = "proyectos:planta"): number {
  return (fnv1a(`${semilla}:${id.toLowerCase()}`) % VERSION_MAXIMA) + 1;
}
