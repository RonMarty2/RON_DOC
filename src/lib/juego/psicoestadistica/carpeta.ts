/**
 * La carpeta de papeles de cada caso del Tema 1 (mecánica M1, regla G10 y G3 de 02-bucle-y-mecanicas.md).
 *
 * Cada caso tiene un FONDO de 9 papeles (C<caso>-1 a C<caso>-9, ids de 05-mundo-y-narrativa.md NT1.6); la versión
 * recibe 6 con su papel clave dentro. Todo se sortea con el rubro k=3 (`azarDeRubro(semilla, 3)`), consumido
 * en un orden fijo: casos 1, 2, 3, 4, 5 (opciones a, b, c), 6, 7, 8. Cambiar el rubro de las cifras no mueve la carpeta.
 *
 * ── Decisiones por ambigüedad (la más simple que respeta 02/04/05) ────────────────────────────────────────
 *  1. UN solo papel clave por versión en los casos 2, 3, 6 y 7 (los demás candidatos a clave, si entran, llevan el texto
 *     «banal» y su rol es `senuelo`). Así abrir 3 de 6 da con el clave 3/6 = 0,50, que es lo que supone el simulador
 *     (q = 0,5) y los estados de ramas_t1.py (`clave` es 0 o 1). Caso 3: P elige entre C3-1 y C3-2; B es C3-1; A elige
 *     entre C3-1 y C3-3. Caso 6: P entre C6-1 y C6-2; B es C6-1; A entre C6-1 y C6-3. Caso 7: entre C7-1, C7-2, C7-3.
 *     Por eso «abrió los dos» de la pieza del tipo A del caso 6 (05 NT1.6) no ocurre en este motor.
 *  2. Caso 2: el clave y los dos señuelos de la ventana (C2-8, C2-9) entran siempre; los otros 3 lugares se sortean
 *     entre los 6 restantes (incluidos los 2 claves que no tocan y el refuerzo C2-4, que así entra en 3 de 6 versiones).
 *     El refuerzo solo tiene rol `refuerzo` en el tipo P; en B su texto es banal y es `senuelo` (02 5.1).
 *  3. Caso 4: entran 2 de los 4 papeles que destapan (C4-1 a C4-4) y 4 de los 5 banales (C4-5 a C4-9).
 *  4. Caso 5, turno 2: la carpeta depende de la opción que se aconsejó en el turno 1, así que hay una por opción
 *     (a: llamados + vecino; b: llamados + demás + informe; c: llamados + grupo) y el resto se sortea entre los papeles
 *     que SÍ tienen sentido con esa opción: C5-3 (el grupo del sorteo) no existe en a ni en b, y C5-4 (el colegio vecino,
 *     solo se mide en a) no entra en b ni en c.
 *  5. Caso 8: entran los 2 claves (C8-1, C8-2) y 4 de los 7 señuelos. Caso 1: 2 de los 3 papeles con sueño y 4 de los 6 señuelos.
 *  6. Los 6 papeles salen mezclados (el orden del abanico).
 */

import { azarDeRubro } from "./version";
import { entero, tomar } from "./aleatorio-t1";
import { FICHAS_NORMALES, type NumeroDeCaso, type VersionT1 } from "./reglas-t1";

/** k del rubro «papeles que entran a cada carpeta y su orden» (G9). */
export const K_CARPETA = 3;
export const PAPELES_POR_CARPETA = 6;
export const PAPELES_EN_EL_FONDO = 9;

export type RolDePapel = "clave" | "refuerzo" | "senuelo";
export type OpcionCaso5 = "a" | "b" | "c";
export const OPCIONES_CASO5: readonly OpcionCaso5[] = ["a", "b", "c"];

export interface Papel {
  id: string;
  rol: RolDePapel;
}

export interface Carpeta {
  caso: NumeroDeCaso;
  /** Los 6 papeles, en el orden del abanico. */
  papeles: readonly Papel[];
  /** Ids de los papeles clave que entraron. */
  claves: readonly string[];
  /** Id del refuerzo del caso 2 si entró y es refuerzo (tipo P); si no, null. */
  refuerzo: string | null;
}

export interface CarpetasT1 {
  /** Casos 1, 2, 3, 4, 6, 7 y 8. El caso 5 depende de la opción: ver `caso5`. */
  porCaso: Record<Exclude<NumeroDeCaso, 5>, Carpeta>;
  caso5: Record<OpcionCaso5, Carpeta>;
}

export const idPapel = (caso: number, n: number): string => `C${caso}-${n}`;
const fondoDe = (caso: number): string[] => Array.from({ length: PAPELES_EN_EL_FONDO }, (_, i) => idPapel(caso, i + 1));
const ids = (caso: number, ns: readonly number[]): string[] => ns.map((n) => idPapel(caso, n));

/** Papeles que cada opción del turno 2 del caso 5 necesita (Q8: la carpeta siempre los trae). */
export const REQUERIDOS_CASO5: Readonly<Record<OpcionCaso5, readonly string[]>> = {
  a: ["C5-1", "C5-4"],
  b: ["C5-1", "C5-2", "C5-7"],
  c: ["C5-1", "C5-3"],
};
const SIN_SENTIDO_CASO5: Readonly<Record<OpcionCaso5, readonly string[]>> = {
  a: ["C5-3"],
  b: ["C5-3", "C5-4"],
  c: ["C5-4"],
};

function armar(
  azar: () => number,
  caso: NumeroDeCaso,
  elegidos: readonly string[],
  rolDe: (id: string) => RolDePapel,
): Carpeta {
  if (elegidos.length !== PAPELES_POR_CARPETA || new Set(elegidos).size !== PAPELES_POR_CARPETA) {
    throw new Error(`Carpeta del caso ${caso} mal armada: ${elegidos.join(", ")}`);
  }
  const mezclados = tomar(azar, elegidos, PAPELES_POR_CARPETA);
  const papeles = mezclados.map((id) => ({ id, rol: rolDe(id) }));
  return {
    caso,
    papeles,
    claves: papeles.filter((p) => p.rol === "clave").map((p) => p.id),
    refuerzo: papeles.find((p) => p.rol === "refuerzo")?.id ?? null,
  };
}

/** Las seis carpetas de la versión. Pura: la misma versión da siempre las mismas. */
export function carpetasT1(v: VersionT1): CarpetasT1 {
  const azar = azarDeRubro(v.semilla, K_CARPETA);

  // Caso 1 · paso 1: dos de C1-1..C1-3 traen sueño (clave); 4 de los 6 señuelos.
  const sueno = tomar(azar, ids(1, [1, 2, 3]), 2);
  const c1 = armar(azar, 1, [...sueno, ...tomar(azar, ids(1, [4, 5, 6, 7, 8, 9]), 4)], (id) => (sueno.includes(id) ? "clave" : "senuelo"));

  // Caso 2: el clave y la ventana (C2-8, C2-9) entran siempre; 3 de los 6 restantes.
  const clave2 = ids(2, [1, 2, 3])[entero(azar, 3)];
  const resto2 = fondoDe(2).filter((id) => id !== clave2 && id !== "C2-8" && id !== "C2-9");
  const c2 = armar(azar, 2, [clave2, "C2-8", "C2-9", ...tomar(azar, resto2, 3)], (id) =>
    id === clave2 ? "clave" : id === "C2-4" && v.tipos[2] === "P" ? "refuerzo" : "senuelo",
  );

  // Caso 3: un solo clave que sirve para el tipo.
  const candidatos3 = v.tipos[3] === "P" ? ["C3-1", "C3-2"] : v.tipos[3] === "A" ? ["C3-1", "C3-3"] : ["C3-1"];
  const clave3 = candidatos3[entero(azar, candidatos3.length)];
  const c3 = armar(azar, 3, [clave3, ...tomar(azar, fondoDe(3).filter((id) => id !== clave3), 5)], (id) => (id === clave3 ? "clave" : "senuelo"));

  // Caso 4: 2 de los 4 que destapan; 4 de los 5 banales.
  const claves4 = tomar(azar, ids(4, [1, 2, 3, 4]), 2);
  const c4 = armar(azar, 4, [...claves4, ...tomar(azar, ids(4, [5, 6, 7, 8, 9]), 4)], (id) => (claves4.includes(id) ? "clave" : "senuelo"));

  // Caso 5 (turno 2): una carpeta por opción.
  const caso5 = {} as Record<OpcionCaso5, Carpeta>;
  for (const op of OPCIONES_CASO5) {
    const req = REQUERIDOS_CASO5[op];
    const otros = fondoDe(5).filter((id) => !req.includes(id) && !SIN_SENTIDO_CASO5[op].includes(id));
    caso5[op] = armar(azar, 5, [...req, ...tomar(azar, otros, PAPELES_POR_CARPETA - req.length)], (id) => (req.includes(id) ? "clave" : "senuelo"));
  }

  // Caso 6.
  const candidatos6 = v.tipos[6] === "P" ? ["C6-1", "C6-2"] : v.tipos[6] === "A" ? ["C6-1", "C6-3"] : ["C6-1"];
  const clave6 = candidatos6[entero(azar, candidatos6.length)];
  const c6 = armar(azar, 6, [clave6, ...tomar(azar, fondoDe(6).filter((id) => id !== clave6), 5)], (id) => (id === clave6 ? "clave" : "senuelo"));

  // Caso 7.
  const clave7 = ids(7, [1, 2, 3])[entero(azar, 3)];
  const c7 = armar(azar, 7, [clave7, ...tomar(azar, fondoDe(7).filter((id) => id !== clave7), 5)], (id) => (id === clave7 ? "clave" : "senuelo"));

  // Caso 8: los 2 claves y 4 de los 7 señuelos.
  const claves8 = ids(8, [1, 2]);
  const c8 = armar(azar, 8, [...claves8, ...tomar(azar, ids(8, [3, 4, 5, 6, 7, 8, 9]), 4)], (id) => (claves8.includes(id) ? "clave" : "senuelo"));

  return { porCaso: { 1: c1, 2: c2, 3: c3, 4: c4, 6: c6, 7: c7, 8: c8 }, caso5 };
}

/** La carpeta de un caso. El caso 5 exige la opción aconsejada en el turno 1. */
export function carpetaDe(c: CarpetasT1, caso: NumeroDeCaso, opcion?: OpcionCaso5): Carpeta {
  if (caso === 5) {
    if (!opcion) throw new Error("La carpeta del caso 5 depende de la opción del turno 1");
    return c.caso5[opcion];
  }
  return c.porCaso[caso];
}

// ── Gasto de fichas (G3) ─────────────────────────────────────────────────────

/** El estado de la carpeta mientras se juega el caso: qué se abrió y cuánto queda. Inmutable. */
export interface CarpetaAbierta {
  papeles: readonly string[];
  fichas: number;
  abiertos: readonly string[];
  tandas: number;
}

export function abrirCarpeta(c: Carpeta, fichas: number = FICHAS_NORMALES): CarpetaAbierta {
  return { papeles: c.papeles.map((p) => p.id), fichas, abiertos: [], tandas: 0 };
}

export const fichasRestantes = (e: CarpetaAbierta): number => e.fichas - e.abiertos.length - e.tandas;
export const estaAbierto = (e: CarpetaAbierta, id: string): boolean => e.abiertos.includes(id);
export const puedeAbrir = (e: CarpetaAbierta, id: string): boolean => e.papeles.includes(id) && (estaAbierto(e, id) || fichasRestantes(e) > 0);

/** Abrir un papel cuesta 1 ficha; reabrir uno ya abierto no cuesta. Sin fichas no se abre nada. */
export function abrirPapel(e: CarpetaAbierta, id: string): CarpetaAbierta {
  if (!e.papeles.includes(id)) throw new Error(`El papel ${id} no está en la carpeta`);
  if (estaAbierto(e, id)) return e;
  if (fichasRestantes(e) <= 0) throw new Error("No quedan fichas");
  return { ...e, abiertos: [...e.abiertos, id] };
}

/** Caso 3: sacar una tanda cuesta 1 ficha. */
export function sacarTanda(e: CarpetaAbierta): CarpetaAbierta {
  if (fichasRestantes(e) <= 0) throw new Error("No quedan fichas");
  return { ...e, tandas: e.tandas + 1 };
}

export const hayClaveAbierto = (c: Carpeta, e: CarpetaAbierta): boolean => c.claves.some((id) => estaAbierto(e, id));
