/**
 * Las cifras de cada caso del Tema 1 por versión (los «huecos» de 05-mundo-y-narrativa.md NT1.4) y la versión completa.
 * Resuelve los TODO 2 a 7 de `version.ts`.
 *
 * Rubros (G9): `azarConSemilla(semilla * 100 + k)`, cada k < 100 y distinto:
 *   k=1 tipos · k=2 orden · k=3 carpeta (carpeta.ts) · k=10 Dani (nombre en version.ts, respuestas aquí) · k=12 colegios (version.ts
 *   y el reparto por caso, aquí) · k=13 fuentes · k=15 vecino · k=17 talleres · k=18 Beto (todos de version.ts) ·
 *   k=21..28 cifras de los casos 1..8 (k = 20 + caso) · k=29 curso del caso 6.
 * 02 dice «k=10+caso» para las cifras, pero version.ts ya ocupó 12, 13, 15, 17 y 18 con pools: se movieron las cifras a 20+caso
 * para que el colegio no correlacione con el mes del caso 2, la fuente con las tandas, etc.
 *
 * ── Decisiones por ambigüedad (la más simple que respeta 02/04/05) ────────────────────────────────────────
 *  1. Colegio: uno distinto por caso dentro del pool de 4. Hay 8 casos (paso 1 incluido) y 4 colegios, así que es inevitable
 *     repetir: se baraja el pool (k=12) y el caso n usa el lugar (n−1) mod 4. Dos casos seguidos nunca comparten colegio, y
 *     cada colegio sale exactamente en 2 casos. `version.textos.colegio` queda como «colegio del tema» (no se tocó).
 *  2. Fuente del caso 4 («estudios del distrito», que 05 deja sin fuente): la cuarta del mismo barajado de los casos 3, 6 y 7
 *     (k=13), la única que sobra; así hay una distinta por caso.
 *  3. `{curso}` del caso 6: uno de 4.º B, 4.º C, 5.º B (nunca 4.º A, el de la profesora Camacho).
 *  4. Meses del caso 2: mayo a noviembre para `{mes}`; la gráfica muestra los 4 meses que terminan en `{mes}` (varias, varias,
 *     varias, cero). El papel clave y los dos señuelos de la ventana (C2-8, C2-9) caen en `{mesAnt}`; los otros 3 de la carpeta
 *     caen en meses distintos entre sí y distintos de `{mesAnt}` (el corcho).
 *  5. Caso 4: el estudio bueno da 22 a 38 % de mucho estrés y el malo 12 a 24 puntos más (el que se inscribió por voluntad
 *     propia exagera). 05 no da ninguna cifra; esta es la más simple que no delata al bueno por ser el chico o el grande.
 *  6. Caso 6: N entre 12 y 18 de 60 (un cuarto, más o menos) y entre 2 y 4 de 12. Las horas son de 0,5 en 0,5; «menos de 6» es
 *     estricto, así que algunas filas valen justo 6,0.
 *  7. Caso 7: tipo P, diferencia de 1,2 a 3,0 puntos y base del eje 2 a 7 puntos por debajo del menor (en múltiplos de 5);
 *     tipo B, diferencia de 4,0 a 12,0 y eje desde cero. 02 dice «por ejemplo A 64,8 y B 63,0».
 *  8. Caso 8: financiar y aún no comparten la misma diferencia atractiva (taller +5,0 a +8,0, grupo +0,0 a +1,5): solo C8-2
 *     (40 contra 40 o 9 contra 9) las distingue. No financiar: casi cero en ambos (diferencia de 0,5 o menos).
 *  9. Dani (paso 1): horas 5,0 a 8,5, minutos 15 a 180, ánimo 30 a 90.
 * 10. Práctica abierta: `semillaDePractica(semilla, caso, intento)` da una versión 1..999 en la que el TIPO de ese caso cambia
 *     (04 T1.2: «cambian el tipo, cuál papel es el clave, los 6 de 9 y todas las cifras»).
 */

import { azarDeRubro, barajar, POOL_COLEGIOS, POOL_FUENTES, versionT1 } from "./version";
import { acotar, enteroEntre, entero, r1, tomar } from "./aleatorio-t1";
import { generarCaso3, type Caso3Datos } from "./tandas";
import { generarCaso5, type Caso5Datos } from "./bienestar";
import { carpetasT1, type CarpetasT1 } from "./carpeta";
import type { NumeroDeCaso, TipoDeCaso, VersionT1 } from "./reglas-t1";

export const K_CIFRAS = (caso: NumeroDeCaso): number => 20 + caso;
export const K_CURSO = 29;
export const K_DANI = 10;
export const K_COLEGIOS = 12;
export const K_FUENTES = 13;

export const POOL_CURSOS = ["4.º B", "4.º C", "5.º B"] as const;
export const MESES_ESCOLARES = ["febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre"] as const;
const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

// ── Tipos ────────────────────────────────────────────────────────────────────

export type Col2 = "minutos" | "animo";

export interface Paso1Datos {
  /** Las respuestas de reserva (k=10, después del sorteo del nombre). Horas de 0,5 en 0,5. */
  dani: { horas: number; minutos: number; animo: number };
  /** Para cada uno de los 2 papeles con sueño de la carpeta: segunda columna y valores del archivo (distintos de los de hoy). */
  papeles: Record<string, { col2: Col2; horasAnt: number; col2Ant: number }>;
}

export interface Caso2Datos {
  mes: string;
  mesAnt: string;
  /** Los 4 meses de la gráfica y las denuncias de cada uno (el último es 0). */
  mesesGrafica: string[];
  denuncias: number[];
  d0: number;
  d1: number;
  b0: number;
  b1: number;
  /** El hecho del clave (solo tipo P), para detrás de «Viste que». En B es null. */
  hechoClave: string | null;
  /** Mes de corcho de cada uno de los 6 papeles de la carpeta. */
  corcho: Record<string, string>;
}

export interface Caso4Datos {
  /** Porcentaje de «mucho estrés» que dice cada estudio. */
  rA: number;
  rB: number;
}

export interface Caso6Datos {
  /** Filas de la hoja: 60 (P y B) o 12 (A). */
  den: number;
  /** Cuántos duermen menos de 6 horas (estricto). */
  N: number;
  /** Las horas de cada fila, mezcladas. */
  horas: number[];
  curso: string;
}

export interface Caso7Datos {
  tallerA: string;
  tallerB: string;
  vA: number;
  vB: number;
  /** La diferencia real |A − B|, con 1 decimal. */
  x: number;
  /** Donde empieza el eje del gráfico del informe: 0 en el tipo B. */
  base: number;
}

export interface Caso8Datos {
  m1: number;
  m2: number;
  g1: number;
  g2: number;
}

export interface CifrasT1 {
  semilla: number;
  /** Colegio de cada caso 1..8 (decisión 1). */
  colegios: Record<NumeroDeCaso, string>;
  fuenteCaso4: string;
  paso1: Paso1Datos;
  caso2: Caso2Datos;
  caso3: Caso3Datos;
  caso4: Caso4Datos;
  caso5: Caso5Datos;
  caso6: Caso6Datos;
  caso7: Caso7Datos;
  caso8: Caso8Datos;
}

export interface PaqueteT1 {
  version: VersionT1;
  carpetas: CarpetasT1;
  cifras: CifrasT1;
}

// ── Generadores por caso ─────────────────────────────────────────────────────

function paso1(v: VersionT1, c: CarpetasT1): Paso1Datos {
  const azar = azarDeRubro(v.semilla, K_DANI);
  azar(); // el primer sorteo de k=10 es el nombre de Dani (version.ts)
  const dani = { horas: enteroEntre(azar, 10, 17) / 2, minutos: enteroEntre(azar, 15, 180, 5), animo: enteroEntre(azar, 30, 90, 5) };
  const a = azarDeRubro(v.semilla, K_CIFRAS(1));
  const papeles: Paso1Datos["papeles"] = {};
  for (const id of c.porCaso[1].claves) {
    const col2: Col2 = a() < 0.5 ? "minutos" : "animo";
    let horasAnt = enteroEntre(a, 10, 18) / 2;
    while (horasAnt === dani.horas) horasAnt = enteroEntre(a, 10, 18) / 2;
    const hoy = col2 === "minutos" ? dani.minutos : dani.animo;
    const sortea = () => (col2 === "minutos" ? enteroEntre(a, 15, 240, 5) : enteroEntre(a, 30, 95, 5));
    let col2Ant = sortea();
    while (col2Ant === hoy) col2Ant = sortea();
    papeles[id] = { col2, horasAnt, col2Ant };
  }
  return { dani, papeles };
}

const HECHO_CLAVE_2: Record<string, (mes: string, d0: number, d1: number) => string> = {
  "C2-1": (mes) => `desde ${mes} solo se anotan las denuncias firmadas por un adulto`,
  "C2-2": (mes) => `desde ${mes} la denuncia formal exige firma de un adulto`,
  "C2-3": (_m, d0, d1) => `las derivaciones por conflicto pasaron de ${d0} a ${d1}`,
};

function caso2(v: VersionT1, c: CarpetasT1): Caso2Datos {
  const azar = azarDeRubro(v.semilla, K_CIFRAS(2));
  const iMes = enteroEntre(azar, 3, 9); // mayo a noviembre
  const mes = MESES_ESCOLARES[iMes];
  const mesAnt = MESES_ESCOLARES[iMes - 1];
  const mesesGrafica = MESES_ESCOLARES.slice(iMes - 3, iMes + 1) as unknown as string[];
  const denuncias = [enteroEntre(azar, 3, 9), enteroEntre(azar, 3, 9), enteroEntre(azar, 3, 9), 0];
  const P = v.tipos[2] === "P";
  const d0 = enteroEntre(azar, 3, 8);
  const d1 = P ? d0 + enteroEntre(azar, 3, 8) : d0 - enteroEntre(azar, 1, 3);
  const b0 = enteroEntre(azar, 4, 12);
  const b1 = P ? b0 + enteroEntre(azar, 3, 8) : b0 - enteroEntre(azar, 1, 3);
  const clave = c.porCaso[2].claves[0];
  const ventana = new Set([clave, "C2-8", "C2-9"]);
  const fuera = c.porCaso[2].papeles.map((p) => p.id).filter((id) => !ventana.has(id));
  const otrosMeses = tomar(azar, MESES_ESCOLARES.filter((m) => m !== mesAnt), fuera.length);
  const corcho: Record<string, string> = {};
  for (const p of c.porCaso[2].papeles) corcho[p.id] = ventana.has(p.id) ? mesAnt : otrosMeses[fuera.indexOf(p.id)];
  return { mes, mesAnt, mesesGrafica, denuncias, d0, d1, b0, b1, hechoClave: P ? HECHO_CLAVE_2[clave](mes, d0, d1) : null, corcho };
}

function caso4(v: VersionT1): Caso4Datos {
  const azar = azarDeRubro(v.semilla, K_CIFRAS(4));
  const bueno = enteroEntre(azar, 22, 38);
  const malo = bueno + enteroEntre(azar, 12, 24);
  return v.buenoEsA ? { rA: bueno, rB: malo } : { rA: malo, rB: bueno };
}

function caso6(v: VersionT1): Caso6Datos {
  const curso = POOL_CURSOS[entero(azarDeRubro(v.semilla, K_CURSO), POOL_CURSOS.length)];
  const azar = azarDeRubro(v.semilla, K_CIFRAS(6));
  const den = v.tipos[6] === "A" ? 12 : 60;
  const N = den === 60 ? enteroEntre(azar, 12, 18) : enteroEntre(azar, 2, 4);
  const pocas = Array.from({ length: N }, () => enteroEntre(azar, 8, 11) / 2); // 4,0 a 5,5
  const muchas = Array.from({ length: den - N }, () => enteroEntre(azar, 12, 18) / 2); // 6,0 a 9,0
  return { den, N, horas: barajar(azar, [...pocas, ...muchas]), curso };
}

function caso7(v: VersionT1): Caso7Datos {
  const azar = azarDeRubro(v.semilla, K_CIFRAS(7));
  const P = v.tipos[7] === "P";
  const vB = enteroEntre(azar, 580, 720) / 10;
  const dif = (P ? enteroEntre(azar, 12, 30) : enteroEntre(azar, 40, 120)) / 10;
  const vA = r1(azar() < 0.5 ? vB + dif : vB - dif);
  const base = P ? 5 * Math.floor((Math.min(vA, vB) - 2) / 5) : 0;
  return { tallerA: v.textos.talleres[0], tallerB: v.textos.talleres[1], vA, vB, x: r1(Math.abs(vA - vB)), base };
}

function caso8(v: VersionT1): Caso8Datos {
  const azar = azarDeRubro(v.semilla, K_CIFRAS(8));
  const m1 = enteroEntre(azar, 480, 600) / 10;
  const g1 = acotar(m1 + enteroEntre(azar, -30, 30) / 10, 0, 100);
  let dm: number;
  let dg: number;
  if (v.decisionReal === 1) {
    dm = enteroEntre(azar, 0, 20) / 10;
    dg = Math.max(0, r1(dm + enteroEntre(azar, -5, 5) / 10));
  } else {
    dm = enteroEntre(azar, 50, 80) / 10;
    dg = enteroEntre(azar, 0, 15) / 10;
  }
  return { m1, m2: r1(m1 + dm), g1: r1(g1), g2: r1(g1 + dg) };
}

/** Todas las cifras de la versión. Pura. */
export function cifrasT1(v: VersionT1, c: CarpetasT1 = carpetasT1(v)): CifrasT1 {
  const baraja = barajar(azarDeRubro(v.semilla, K_COLEGIOS), POOL_COLEGIOS);
  const colegios = {} as Record<NumeroDeCaso, string>;
  for (let n = 1; n <= 8; n++) colegios[n as NumeroDeCaso] = baraja[(n - 1) % baraja.length];
  return {
    semilla: v.semilla,
    colegios,
    fuenteCaso4: barajar(azarDeRubro(v.semilla, K_FUENTES), POOL_FUENTES)[3],
    paso1: paso1(v, c),
    caso2: caso2(v, c),
    caso3: generarCaso3(azarDeRubro(v.semilla, K_CIFRAS(3)), v.tipos[3]),
    caso4: caso4(v),
    caso5: generarCaso5(azarDeRubro(v.semilla, K_CIFRAS(5)), v.efectoReal),
    caso6: caso6(v),
    caso7: caso7(v),
    caso8: caso8(v),
  };
}

/** La versión, sus carpetas y sus cifras. */
export function paqueteT1(semilla: number): PaqueteT1 {
  const version = versionT1(semilla);
  const carpetas = carpetasT1(version);
  return { version, carpetas, cifras: cifrasT1(version, carpetas) };
}

// ── Piezas sueltas ───────────────────────────────────────────────────────────

/** `{hechosA}` del caso 6, tipo A (Q9): solo lo que dicen los papeles ABIERTOS. */
export function hechosA(c: CarpetasT1, abiertos: readonly string[]): string[] {
  const clave = c.porCaso[6].claves[0];
  if (!abiertos.includes(clave)) return [];
  return [clave === "C6-3" ? "la hoja se pasó en semana de exámenes" : "solo 12 de 60 respondieron"];
}

/** `{fechaAnio}` (paso 1): el mes de hoy, un año atrás. Recibe la fecha para que la función siga siendo pura. */
export const fechaAnio = (hoy: Date): string => `${MESES[hoy.getMonth()]} de ${hoy.getFullYear() - 1}`;

/** El «tipo» de un caso para comparar versiones (el caso 1 no tiene). */
export function tipoDeCaso(v: VersionT1, caso: NumeroDeCaso): string | null {
  switch (caso) {
    case 1:
      return null;
    case 2:
    case 3:
    case 6:
    case 7:
      return v.tipos[caso];
    case 4:
      return v.buenoEsA ? "A" : "B";
    case 5:
      return String(v.efectoReal);
    case 8:
      return String(v.decisionReal);
  }
}

const mezcla = (h: number): number => {
  h ^= h >>> 15;
  h = Math.imul(h, 0x2c1b3c6d);
  h ^= h >>> 12;
  h = Math.imul(h, 0x297a2d39);
  h ^= h >>> 15;
  return h >>> 0;
};

/**
 * Semilla (1..999) de la práctica abierta de UN caso: derivada de la semilla del alumno, del caso y del intento (04 T1.2,
 * 02 8.4). El tipo de ese caso cambia respecto de la partida oficial; el caso 1 no tiene tipo y solo cambia la semilla.
 */
export function semillaDePractica(semilla: number, caso: NumeroDeCaso, intento: number): number {
  if (!Number.isInteger(intento) || intento < 1) throw new Error(`Intento inválido: ${intento}`);
  const original = tipoDeCaso(versionT1(semilla), caso);
  for (let k = 0; k < 200; k++) {
    const h = mezcla(Math.imul(semilla, 0x9e3779b1) ^ Math.imul(caso + 1, 0x85ebca6b) ^ Math.imul(intento, 0xc2b2ae35) ^ Math.imul(k, 0x27d4eb2f));
    const s = (h % 999) + 1;
    if (s === semilla) continue;
    if (original === null || tipoDeCaso(versionT1(s), caso) !== original) return s;
  }
  throw new Error("No se encontró una semilla de práctica distinta");
}
