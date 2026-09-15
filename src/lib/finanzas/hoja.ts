/**
 * Hoja de práctica imprimible de Matemática Financiera, armada con los mismos
 * generadores de las láminas (ejercicios.ts). Cada versión es un número: la
 * misma versión da siempre los mismos ejercicios, así el docente puede
 * imprimir varias versiones distintas para un curso y recuperar después la
 * hoja de respuestas de cada una.
 */

import {
  azarConSemilla,
  ejercicioAmortizacion,
  ejercicioAnualidades,
  ejercicioBonos,
  ejercicioDepreciaciones,
  ejercicioInteresCompuesto,
  type Azar,
  type Ejercicio,
} from "./ejercicios";

export const TEMAS_HOJA = [
  { id: "interes", titulo: "Interés compuesto e inflación", generar: ejercicioInteresCompuesto },
  { id: "anualidades", titulo: "Anualidades", generar: ejercicioAnualidades },
  { id: "amortizacion", titulo: "Amortización", generar: ejercicioAmortizacion },
  { id: "bonos", titulo: "Bonos", generar: ejercicioBonos },
  { id: "depreciaciones", titulo: "Depreciaciones", generar: ejercicioDepreciaciones },
] as const satisfies readonly { id: string; titulo: string; generar: (azar: Azar, tipo?: number) => Ejercicio }[];

export type IdTema = (typeof TEMAS_HOJA)[number]["id"];

export type EjercicioDeHoja = Ejercicio & { tema: IdTema; tituloTema: string };

export const VERSION_MAXIMA = 9999;
export const POR_TEMA_MAXIMO = 4;

/** Semilla propia de cada tema: cambiar cuántos ejercicios hay de un tema no cambia los de los otros. */
function semilla(version: number, tema: IdTema): number {
  let h = Math.imul(version, 2654435761) >>> 0;
  for (const c of tema) h = Math.imul(h ^ c.charCodeAt(0), 16777619) >>> 0;
  return h;
}

/**
 * Los ejercicios de una versión, en el orden del programa. Los primeros `n`
 * de cada tema son siempre los mismos: pedir uno más agrega, no reemplaza.
 */
export function armarHoja(version: number, temas: readonly IdTema[], porTema: number): EjercicioDeHoja[] {
  const hoja: EjercicioDeHoja[] = [];
  for (const t of TEMAS_HOJA) {
    if (!temas.includes(t.id)) continue;
    const azar = azarConSemilla(semilla(version, t.id));
    // Los dos tipos de ejercicio de cada tema se alternan; cuál va primero depende de la versión.
    const primerTipo = semilla(version, t.id) % 2;
    const vistas = new Set<string>();
    for (let intentos = 0; vistas.size < porTema && intentos < porTema * 10; intentos++) {
      const e = t.generar(azar, primerTipo + vistas.size);
      if (vistas.has(e.pregunta)) continue;
      vistas.add(e.pregunta);
      hoja.push({ ...e, tema: t.id, tituloTema: t.titulo });
    }
  }
  return hoja;
}

/** Lee `#v=1234&t=interes,bonos&n=3`; lo que no se entiende queda en el valor por defecto. */
export function leerAjustes(hash: string) {
  const p = new URLSearchParams(hash.replace(/^#/, ""));
  const v = Number(p.get("v"));
  const n = Number(p.get("n"));
  const ids = TEMAS_HOJA.map((t) => t.id) as IdTema[];
  const temas = (p.get("t") ?? "").split(",").filter((x): x is IdTema => ids.includes(x as IdTema));
  return {
    version: Number.isInteger(v) && v >= 1 && v <= VERSION_MAXIMA ? v : 1,
    temas: temas.length > 0 ? temas : ids,
    porTema: Number.isInteger(n) && n >= 1 && n <= POR_TEMA_MAXIMO ? n : 2,
  };
}

export function escribirAjustes(a: { version: number; temas: readonly IdTema[]; porTema: number }): string {
  return `#v=${a.version}&t=${a.temas.join(",")}&n=${a.porTema}`;
}

export const LETRAS = ["a", "b", "c", "d", "e", "f"];
