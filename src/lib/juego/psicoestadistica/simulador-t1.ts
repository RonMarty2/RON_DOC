/**
 * Simulación de «alumnos perezosos» del Tema 1: puerto a TypeScript de scripts-t1/simular_t1_v2.py.
 * Sirve para la prueba «ninguna estrategia gana sin entender» (bucle secc. 11 y 13 punto 11).
 *
 * Una `VersionSim` es lo que el simulador necesita saber de una versión (los tipos, las cifras sorteadas y
 * `u`, ocho números al azar para las decisiones de las estrategias). La paridad con Python se prueba pasando
 * al TS las MISMAS versiones que numpy sorteó (fixtures/paridad-t1.json); `muestrearVersionSim` es el
 * muestreador propio del TS, con las mismas distribuciones, para correr miles sin depender de numpy.
 *
 * Los supuestos (p = acierto del que entiende, rho normal, etc.) son ESTIMACIONES del diseño, no datos de alumnos.
 */

import type { Azar } from "../../finanzas/ejercicios";
import { TIRADAS } from "./efectos-t1";
import { MEDIDOR_INICIO, META_CIERRE } from "./reglas-t1";
import { topar } from "./medidores";

export interface VersionSim {
  /** Caso 2 es B. */
  b2: boolean;
  /** El refuerzo del caso 2 entra a la carpeta (no mueve ninguna tabla; se guarda por paridad). */
  ref: boolean;
  /** Tipo de los casos 3, 6 y 7: 0 = P, 1 = B, 2 = A. */
  t3: number;
  t6: number;
  t7: number;
  /** Índices 0..6 (caso 2 = 0 … caso 8 = 6) en el orden de juego. */
  order: number[];
  mu: number;
  tandas: number[];
  cifra: number;
  buenoA: boolean;
  delta: number;
  rho: number;
  real8: number;
  beto: number;
  u: number[];
}

type Par = readonly [number, number];
type Efectos = { dc: number[]; dv: number[] };

const COD: Record<string, number> = { P: 0, B: 1, A: 2 };

// ── Opciones de cada caso, SIN abrir papeles (tablas v2) ────────────────────────────────────────────

const c2Opt = (v: VersionSim, o: string): Par => {
  const B = v.b2;
  if (o === "tal") return B ? [5, 5] : [-20, 10];
  if (o === "frenar") return B ? [0, -15] : [3, -8];
  if (o === "frase") return B ? [0, 4] : [-8, 4];
  throw new Error(o);
};

function rangoSinPieza(v: VersionSim, a: number, b: number): Par {
  const cubre = a - 0.25 <= v.mu && v.mu <= b + 0.25;
  const ancho = b - a > 2.0;
  const t = v.t3;
  const okC = t === 0 ? 3 : t === 1 ? 0 : -8;
  const okV = t === 0 ? 0 : t === 1 ? 2 : 4;
  return [!cubre ? -10 : ancho ? 0 : okC, !cubre ? 4 : ancho ? -2 : okV];
}

const media2 = (v: VersionSim) => (v.tandas[0] + v.tandas[1]) / 2;

function c3Opt(v: VersionSim, o: string): Par {
  const t = v.t3;
  if (o === "tal") return t === 1 ? [5, 5] : [-20, 10];
  if (o === "frenar") return [t === 0 ? 6 : 0, t === 0 ? -8 : t === 1 ? -15 : -10];
  const m2 = media2(v);
  if (o === "r2") return rangoSinPieza(v, m2 - 0.6, m2 + 0.6);
  if (o === "ancho") return rangoSinPieza(v, m2 - 1.3, m2 + 1.3);
  if (o === "adapta") return Math.abs(v.cifra - m2) < 0.7 ? c3Opt(v, "tal") : c3Opt(v, "r2");
  throw new Error(o);
}

const c4Opt = (v: VersionSim, o: string): Par => {
  const A = v.buenoA;
  if (o === "A") return A ? [5, 5] : [-20, 10];
  if (o === "B") return A ? [-20, 4] : [4, 2];
  if (o === "ninguna") return [0, -10];
  throw new Error(o);
};

const c5Turno1 = (t: string): Par => [0, t === "c" ? -3 : 0];

/** x = null: frenar; número: escribe x (R5.8 si |x − rho| ≤ 1, si no R5.9). */
function c5Turno2SinPapeles(v: VersionSim, x: number | null): Par {
  if (x === null) return [2, -6];
  return Math.abs(x - v.rho) <= 1.0 ? [4, 2] : [-10, 0];
}

function c5Opt(v: VersionSim, o: string): Par {
  const [t1, t2] = o.split("|");
  const [c1, v1] = c5Turno1(t1);
  const [c2, v2] = c5Turno2SinPapeles(v, t2 === "frenar" ? null : 0.0);
  return [c1 + c2, v1 + v2];
}

function c6Opt(v: VersionSim, o: string): Par {
  const t = v.t6;
  if (o === "tal") return t === 1 ? [5, 5] : [-20, 10];
  if (o === "frenar") return [t === 0 ? 6 : 0, t === 0 ? -8 : t === 1 ? -15 : -10];
  if (o === "base") return [t === 0 ? 2 : 0, t === 0 ? 1 : t === 1 ? 2 : 1];
  if (o === "podrian") return [t === 1 ? 0 : -8, 4];
  throw new Error(o);
}

function c7Opt(v: VersionSim, o: string): Par {
  const P = v.t7 === 0;
  if (o === "tal") return [P ? -10 : 10, 10];
  if (o === "redisenar") return [P ? 8 : 0, P ? 4 : -4];
  if (o === "frenar") return [P ? 6 : 0, P ? -8 : -15];
  if (o === "adapta") return P ? c7Opt(v, "redisenar") : c7Opt(v, "tal");
  throw new Error(o);
}

/** dec: 0 financiar, 1 no financiar, 2 esperar. e: papeles clave puestos sobre la mesa (0, 1 o 2). */
export function c8Valor(real: number, dec: number, e: number): Par {
  const ok = dec === real;
  let c = ok ? (e === 2 ? 12 : e === 1 ? 6 : 0) : 0;
  let vo = ok ? (e === 2 ? 8 : e === 1 ? 4 : 0) : 0;
  if (!ok) {
    if (dec === 0 && real === 1) [c, vo] = [-20, 6];
    else if (dec === 0 && real === 2) [c, vo] = [-15, 6];
    else if (dec === 1 && real === 0) [c, vo] = [-15, -8];
    else if (dec === 1 && real === 2) [c, vo] = [-10, -6];
    else if (dec === 2) [c, vo] = [0, -8];
  }
  return [c, vo];
}

function c8Opt(v: VersionSim, o: string): Par {
  if (o === "fin") return c8Valor(v.real8, 0, 0);
  if (o === "nofin") return c8Valor(v.real8, 1, 0);
  if (o === "esperar") return c8Valor(v.real8, 2, 0);
  if (o === "beto") return c8Valor(v.real8, v.beto, 0);
  if (o === "contra") return c8Valor(v.real8, (v.beto + 1 + (v.u[7] < 0.5 ? 1 : 0)) % 3, 0);
  throw new Error(o);
}

/** Las opciones de cada caso, en el orden del simulador Python (importa para la búsqueda de políticas). */
export const OPCIONES: ReadonlyArray<{ caso: string; opciones: readonly string[]; f: (v: VersionSim, o: string) => Par }> = [
  { caso: "c2", opciones: ["tal", "frenar", "frase"], f: c2Opt },
  { caso: "c3", opciones: ["tal", "frenar", "r2", "adapta", "ancho"], f: c3Opt },
  { caso: "c4", opciones: ["A", "B", "ninguna"], f: c4Opt },
  { caso: "c5", opciones: ["a|frenar", "a|cero", "b|frenar", "b|cero", "c|frenar", "c|cero"], f: c5Opt },
  { caso: "c6", opciones: ["tal", "frenar", "base", "podrian"], f: c6Opt },
  { caso: "c7", opciones: ["tal", "redisenar", "frenar", "adapta"], f: c7Opt },
  { caso: "c8", opciones: ["fin", "nofin", "esperar", "beto", "contra"], f: c8Opt },
];

/** Efecto de cada opción de cada caso para una versión: tabla[caso][opción] = [C, Voz]. */
export function tablaDeOpciones(v: VersionSim): Par[][] {
  return OPCIONES.map((o) => o.opciones.map((nombre) => o.f(v, nombre)));
}

// ── Jugar una partida: aplica el efecto de cada caso en el orden de la versión, con tope por caso ───

export function jugar(v: VersionSim, e: Efectos): { c: number; voz: number } {
  let c = MEDIDOR_INICIO;
  let voz = MEDIDOR_INICIO;
  for (let k = 0; k < 7; k++) {
    const i = v.order[k];
    c = topar(c + e.dc[i]);
    voz = topar(voz + e.dv[i]);
  }
  return { c, voz };
}

export const pasa = (r: { c: number; voz: number }): boolean => r.c >= META_CIERRE && r.voz >= META_CIERRE;

function deNombres(v: VersionSim, nombres: readonly string[]): Efectos {
  const dc: number[] = [];
  const dv: number[] = [];
  OPCIONES.forEach((o, i) => {
    const [c, vo] = o.f(v, nombres[i]);
    dc.push(c);
    dv.push(vo);
  });
  return { dc, dv };
}

export const POLITICAS_FIJAS: Record<string, readonly string[]> = {
  "E-S1": ["tal", "tal", "A", "a|cero", "tal", "tal", "fin"],
  "E-S2": ["frenar", "frenar", "ninguna", "a|frenar", "frenar", "frenar", "esperar"],
  "E-S3": ["frase", "r2", "ninguna", "a|frenar", "base", "tal", "esperar"],
  "E-S3b": ["frase", "r2", "ninguna", "a|cero", "base", "tal", "esperar"],
  "E-S3c": ["frase", "r2", "ninguna", "a|frenar", "base", "adapta", "esperar"],
};

export type Respaldo = "prudente" | "firmar" | "intermedio";

function fallback(v: VersionSim, tipo: Respaldo): Efectos {
  const nombres =
    tipo === "prudente"
      ? ["frenar", "frenar", "ninguna", "c|frenar", "frenar", "frenar", "esperar"]
      : tipo === "firmar"
        ? ["tal", "tal", "A", "c|cero", "tal", "tal", "fin"]
        : ["frase", "r2", "ninguna", "c|frenar", "base", "adapta", "esperar"];
  return deNombres(v, nombres);
}

/** Efectos de la decisión correcta con evidencia, por caso (índices 0..5; el caso 8 se trata aparte). */
function efectosConClave(v: VersionSim): Par[] {
  return [
    v.b2 ? [10, 10] : [8, 4],
    v.t3 === 1 ? [10, 10] : [8, 4],
    v.buenoA ? [10, 10] : [8, 4],
    [12, 3], // caso 5 con (c): R5.6 +12/+6 y el sorteo cuesta −3 de Voz
    v.t6 === 1 ? [10, 10] : [8, 4],
    v.t7 === 0 ? [8, 4] : [10, 10],
  ];
}

/** Caso 8 cuando el alumno decide según los papeles que halló (e = 2, 1 o 0 claves sobre la mesa). */
function caso8ConPapeles(v: VersionSim, e: number, resp: Respaldo): Par {
  const real = v.real8;
  const acierta1 = v.u[5] < 2 / 3;
  const dec = e === 2 ? real : e === 1 ? (acierta1 ? real : (real + 1) % 3) : -1;
  const ok = dec === real;
  const cC = e === 2 ? 12 : 6;
  const cV = e === 2 ? 8 : 4;
  const [wc, wv] = c8Valor(real, dec < 0 ? 2 : dec, 0);
  const [rc, rv] = resp === "firmar" ? c8Opt(v, "fin") : c8Opt(v, "esperar");
  if (e === 0) return [rc, rv];
  return ok ? [cC, cV] : [wc, wv];
}

/** Quien da con el clave de cada caso con probabilidad p. En el caso 8 cada uno de los dos claves sale con √p. */
export function entiende(v: VersionSim, p: number, resp: Respaldo): Efectos {
  const ev = efectosConClave(v);
  const fb = fallback(v, resp);
  const prob = [p, p, p, p, p, 1.0, p];
  const dc: number[] = [];
  const dv: number[] = [];
  for (let i = 0; i < 7; i++) {
    if (i === 5) {
      dc.push(ev[5][0]);
      dv.push(ev[5][1]);
    } else if (i === 6) {
      const s = Math.sqrt(prob[6]);
      const p2 = prob[6];
      const p1 = 2 * s * (1 - s);
      const r = v.u[6];
      const e = r < p2 ? 2 : r < p2 + p1 ? 1 : 0;
      const [c, vo] = caso8ConPapeles(v, e, resp);
      dc.push(c);
      dv.push(vo);
    } else {
      const hallo = v.u[i] < prob[i];
      if (i === 3) {
        const [c1, v1] = c5Turno1("c");
        const [c2, v2] = c5Turno2SinPapeles(v, resp === "firmar" ? 0.0 : null);
        dc.push(hallo ? ev[3][0] : c1 + c2);
        dv.push(hallo ? ev[3][1] : v1 + v2);
      } else {
        dc.push(hallo ? ev[i][0] : fb.dc[i]);
        dv.push(hallo ? ev[i][1] : fb.dv[i]);
      }
    }
  }
  return { dc, dv };
}

/** Abre 3 de 6 papeles al azar en cada caso; si halla el clave decide bien, si no firma («firmar») o frena. */
export function azarAbre3(v: VersionSim, resp: "firmar" | "prudente"): Efectos {
  const q = [0.5, 0.5, 0.8, 0.2, 0.5, 0.5, 0.2];
  const ev = efectosConClave(v);
  const fb = fallback(v, resp);
  const dc: number[] = [];
  const dv: number[] = [];
  for (let i = 0; i < 7; i++) {
    if (i === 6) {
      const r = v.u[6];
      const e = r < 0.2 ? 2 : r < 0.8 ? 1 : 0;
      const [c, vo] = caso8ConPapeles(v, e, resp);
      dc.push(c);
      dv.push(vo);
      continue;
    }
    const hallo = v.u[i] < q[i];
    if (i === 3) {
      const [c1, v1] = c5Turno1("a");
      const [c2, v2] = c5Turno2SinPapeles(v, resp === "firmar" ? 0.0 : null);
      dc.push(hallo ? 6 : c1 + c2);
      dv.push(hallo ? 3 : v1 + v2);
    } else {
      dc.push(hallo ? ev[i][0] : fb.dc[i]);
      dv.push(hallo ? ev[i][1] : fb.dv[i]);
    }
  }
  return { dc, dv };
}

/** Copia las decisiones de OTRA versión (la anterior en la lista del curso), sin abrir papeles. */
export function copia(v: VersionSim, otra: VersionSim): Efectos {
  const dc: number[] = [];
  const dv: number[] = [];
  const poner = ([c, vo]: Par) => {
    dc.push(c);
    dv.push(vo);
  };
  poner(c2Opt(v, "frase"));
  poner(otra.t3 === 1 ? c3Opt(v, "tal") : c3Opt(v, "r2"));
  poner(otra.buenoA ? c4Opt(v, "A") : c4Opt(v, "B"));
  poner(c5Opt(v, "c|cero"));
  poner(otra.t6 === 1 ? c6Opt(v, "tal") : c6Opt(v, "base"));
  poner(otra.t7 === 0 ? c7Opt(v, "redisenar") : c7Opt(v, "tal"));
  poner(c8Valor(v.real8, otra.real8, 0)); // la decisión correcta de la otra versión, juzgada contra la verdad de ESTA
  return { dc, dv };
}

/** Entiende, pero sobrecorrige un caso (7: rediseña siempre; 5: escribe 0 siempre; 8: espera siempre). */
export function sobrecorrige(v: VersionSim, p: number, caso: 5 | 7 | 8, resp: Respaldo): Efectos {
  const { dc, dv } = entiende(v, p, resp);
  if (caso === 7) {
    [dc[5], dv[5]] = c7Opt(v, "redisenar");
  } else if (caso === 5) {
    const hallo = v.u[3] < p;
    const ok = Math.abs(v.rho) <= 1.0;
    const [c1, v1] = c5Turno1("c");
    const cc = hallo ? (ok ? 12 : -10) : ok ? 4 : -10;
    const vv = hallo ? (ok ? 6 : 0) : ok ? 2 : 0;
    dc[3] = c1 + cc;
    dv[3] = v1 + vv;
  } else {
    const s = Math.sqrt(p);
    const r = v.u[6];
    const e = r < p ? 2 : r < p + 2 * s * (1 - s) ? 1 : 0;
    [dc[6], dv[6]] = c8Valor(v.real8, 2, e);
  }
  return { dc, dv };
}

/** Juega una política (un nombre de opción por caso) sobre una tabla de opciones ya calculada. */
export function jugarPolitica(v: VersionSim, tabla: Par[][], pol: readonly number[]): { c: number; voz: number } {
  let c = MEDIDOR_INICIO;
  let voz = MEDIDOR_INICIO;
  for (let k = 0; k < 7; k++) {
    const i = v.order[k];
    const e = tabla[i][pol[i]];
    c = topar(c + e[0]);
    voz = topar(voz + e[1]);
  }
  return { c, voz };
}

export const politicaPorNombres = (nombres: readonly string[]): number[] =>
  OPCIONES.map((o, i) => {
    const j = o.opciones.indexOf(nombres[i]);
    if (j < 0) throw new Error(`Opción desconocida ${nombres[i]} en ${o.caso}`);
    return j;
  });

/** Nombre → efectos de cada estrategia con nombre, igual que `todas()` del exportador de Python. */
export function estrategiasConNombre(v: VersionSim, anterior: VersionSim): Record<string, Efectos> {
  const r: Record<string, Efectos> = {};
  for (const [nombre, pol] of Object.entries(POLITICAS_FIJAS)) r[nombre] = deNombres(v, pol);
  r["E-S4"] = azarAbre3(v, "firmar");
  r["E-S5"] = azarAbre3(v, "prudente");
  r["E-S9"] = copia(v, anterior);
  for (const resp of ["prudente", "firmar", "intermedio"] as const) {
    for (const p of [0.25, 0.5, 0.65, 0.8, 0.95, 1.0]) r[`E-S10|${resp}|${p.toFixed(2)}`] = entiende(v, p, resp);
  }
  for (const caso of [7, 5, 8] as const) {
    for (const p of [0.65, 0.8, 1.0]) r[`SOBRE|${caso}|${p.toFixed(2)}`] = sobrecorrige(v, p, caso, "prudente");
  }
  return r;
}

// ── Muestreador propio del TS (mismas distribuciones que `versiones()` de Python) ───────────────────

/** Normal(mu, sd) por Box-Muller. */
function normal(azar: Azar, mu: number, sd: number): number {
  let u1 = azar();
  while (u1 <= 1e-12) u1 = azar();
  return mu + sd * Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * azar());
}

/** Una versión con las distribuciones del simulador (supuestos de 06 v14; ninguno sale de alumnos reales). */
export function muestrearVersionSim(azar: Azar): VersionSim {
  const b2 = azar() < 1 / 3;
  const ref = azar() < 0.5;
  const [a3, a6, a7] = TIRADAS[Math.floor(azar() * 10)];
  const t3 = COD[a3];
  const t6 = COD[a6];
  const t7 = COD[a7];
  // Orden: caso 2 primero, 3 a 7 barajados, caso 8 último.
  const medio = [1, 2, 3, 4, 5];
  for (let i = medio.length - 1; i > 0; i--) {
    const j = Math.floor(azar() * (i + 1));
    [medio[i], medio[j]] = [medio[j], medio[i]];
  }
  const order = [0, ...medio, 6];
  const mu = 5.5 + 2 * azar();
  const tandas = [0, 1, 2].map(() => normal(azar, mu, 0.35));
  const signo = azar() < 0.5 ? -1 : 1;
  const off = t3 === 0 ? signo * (1.0 + 0.6 * azar()) : t3 === 1 ? -0.15 + 0.3 * azar() : -0.5 + 1.0 * azar();
  const buenoA = azar() < 0.5;
  const delta = azar() < 0.5 ? 0 : 3;
  let rho = normal(azar, delta, 4.4);
  while (rho < -4 || rho > 10) rho = normal(azar, delta, 4.4);
  const real8 = Math.floor(azar() * 3);
  const beto = azar() < 1 / 3 ? real8 : (real8 + 1 + Math.floor(azar() * 2)) % 3;
  const u = Array.from({ length: 8 }, () => azar());
  return { b2, ref, t3, t6, t7, order, mu, tandas, cifra: mu + off, buenoA, delta, rho, real8, beto, u };
}
