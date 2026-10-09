/**
 * Caso 5 · «El taller de pausas»: la hoja de bienestar de 60 estudiantes y las cifras del turno 2 para las tres opciones
 * (mecánica M8; 02-bucle-y-mecanicas.md 5.4; invariantes I1 a I5 y supuestos Q1 a Q5 de 04-aprendizaje.md T1.8).
 *
 * La regresión sale de una regla y no está pegada: nivel real T ~ N(60, 10); medición = T + N(0, 8) (redondeada a entero y
 * acotada a 0..100); la segunda medición de cada estudiante es T + ruido nuevo N(0, 8) + δ si fue al taller. Con esa regla los
 * 13 de peor puntaje suben ~7 puntos sin taller y los otros 47 bajan ~2.
 *
 * Las tres opciones comparten los mismos 60 estudiantes (las mismas T y los mismos ruidos); cambia quién va al taller:
 *   (a) los 13 de peor puntaje · (b) los 13 que se anotaron primero (traen +2,5 por su cuenta, aun sin taller) ·
 *   (c) sorteo entre los 26 de peor puntaje: 13 al taller y 13 de comparación.
 * El colegio vecino (solo se usa en (a)) es otra cohorte de 60 sin taller: sus 13 de peor puntaje.
 *
 * La «cuenta bien hecha» ρ sale de los NÚMEROS QUE SE MUESTRAN (medias con 1 decimal), no de los enteros por estudiante:
 *   ρ_a = Δ_taller − Δ_vecino · ρ_b = Δ_taller − Δ_demás − 2,5 · ρ_c = Δ_taller − Δ_grupo.
 * Todas las cuentas van en décimas de punto (enteros): sin error de coma flotante en las bandas |x − ρ| ≤ 1,0.
 *
 * Invariantes que el generador EXIGE (si no se cumplen, se vuelve a sortear la hoja entera, con un tope de intentos):
 *   I2/Q4  Δ_vecino ≥ 4 en (a).
 *   I4     para cada opción, las bandas ρ ± 1,0 y Δ_taller ± 1,0 no se tocan (|ρ − Δ_taller| > 2,0); en (a) y (b), lo mismo
 *          con la inflada Δ_taller − Δ_demás, que además queda por encima de ρ (Q2: infl − ρ > 2,0).
 *   I5     ρ entre −4 y +10 en las tres opciones.
 *   Q1     los llamados subieron (Δ_taller ≥ 1,0) en las tres opciones.
 *   Q3     en (c), el grupo de comparación subió (Δ_grupo ≥ 1,0).
 *   Q5     en (b), el informe de la tallerista dice «unos 2,5 puntos» como número: es la constante SESGO_ANOTADOS.
 * Decisión por ambigüedad: las exigencias se aplican a las tres opciones a la vez, porque el alumno elige una sola pero el
 * generador no sabe cuál; así la misma hoja vale para cualquiera.
 */

import type { Azar } from "../../finanzas/ejercicios";
import { acotar, normal, tomar } from "./aleatorio-t1";

export type OpcionDelCaso5 = "a" | "b" | "c";

export const ESTUDIANTES = 60;
export const CUPOS = 13;
/** Sesgo de los que se anotaron primero, dicho como número en el informe de la tallerista (I3, Q5). */
export const SESGO_ANOTADOS = 2.5;
export const DESVIO_NIVEL = 10;
export const DESVIO_MEDICION = 8;
/** Banda de la cuenta buena, de la subida bruta y de la inflada (± puntos). */
export const BANDA = 1.0;
const TOPE_DE_INTENTOS = 800;

export interface Medias {
  antes: number;
  despues: number;
}

export interface OpcionDatos {
  /** Índices (0..59) de los 13 llamados al taller. */
  llamados: number[];
  /** Medias de los llamados. */
  medias: Medias;
  /** Medias de los 47 que no fueron llamados. */
  demas: Medias;
  /** Solo (c): medias de los 13 del sorteo que no fueron al taller, e índices. */
  grupo: Medias | null;
  indicesGrupo: number[] | null;
  /** Solo (a): medias de los 13 de peor puntaje del colegio vecino, que no tiene taller. */
  vecino: Medias | null;
  /** Cambio medio de los llamados (subida bruta), con 1 decimal. */
  bruta: number;
  /** Solo (a) y (b): la subida inflada (Δ_taller − Δ_demás), con 1 decimal. */
  inflada: number | null;
  /** La cuenta bien hecha, con 1 decimal y su signo. */
  rho: number;
}

export interface Caso5Datos {
  delta: 0 | 3;
  /** Primera medición de los 60 (la hoja que se ve sin gastar fichas). */
  puntajes: number[];
  /** Orden en que se anotaron al taller (índices de estudiante); los 13 primeros son los de (b). */
  ordenAnotacion: number[];
  opciones: Record<OpcionDelCaso5, OpcionDatos>;
  /** Cuántas hojas hubo que sortear hasta cumplir los invariantes (para medir el costo, no se muestra). */
  intentos: number;
}

const OPCIONES: readonly OpcionDelCaso5[] = ["a", "b", "c"];

/** Media de los `valores[i]` en décimas de punto, redondeada a entero. */
const mediaDecimas = (valores: readonly number[], indices: readonly number[]): number => {
  let s = 0;
  for (const i of indices) s += valores[i];
  return Math.round((s * 10) / indices.length);
};

const peores = (puntajes: readonly number[], n: number): number[] =>
  puntajes
    .map((p, i) => [p, i] as const)
    .sort((x, y) => x[0] - y[0] || x[1] - y[1])
    .slice(0, n)
    .map(([, i]) => i);

interface Cohorte {
  nivel: number[];
  m1: number[];
  ruido2: number[];
}

function cohorte(azar: Azar): Cohorte {
  const nivel: number[] = [];
  const m1: number[] = [];
  const ruido2: number[] = [];
  for (let i = 0; i < ESTUDIANTES; i++) {
    const t = normal(azar, 60, DESVIO_NIVEL);
    nivel.push(t);
    m1.push(Math.round(acotar(t + normal(azar, 0, DESVIO_MEDICION), 0, 100)));
    ruido2.push(normal(azar, 0, DESVIO_MEDICION));
  }
  return { nivel, m1, ruido2 };
}

const segunda = (c: Cohorte, i: number, extra: number): number => Math.round(acotar(c.nivel[i] + c.ruido2[i] + extra, 0, 100));

/** Un intento de hoja. Devuelve las décimas por opción para poder revisar los invariantes antes de armar el resultado. */
function intento(azar: Azar, delta: 0 | 3) {
  const c = cohorte(azar);
  const vec = cohorte(azar);
  const todos = Array.from({ length: ESTUDIANTES }, (_, i) => i);
  const ordenAnotacion = tomar(azar, todos, ESTUDIANTES);
  const peores13 = peores(c.m1, CUPOS);
  const sorteo26 = tomar(azar, peores(c.m1, 2 * CUPOS), 2 * CUPOS);

  const conjuntos: Record<OpcionDelCaso5, { llamados: number[]; grupo: number[] | null; extra: (i: number) => number }> = {
    a: { llamados: peores13, grupo: null, extra: (i) => (peores13.includes(i) ? delta : 0) },
    b: {
      llamados: ordenAnotacion.slice(0, CUPOS),
      grupo: null,
      extra: (i) => (ordenAnotacion.slice(0, CUPOS).includes(i) ? delta + SESGO_ANOTADOS : 0),
    },
    c: {
      llamados: sorteo26.slice(0, CUPOS),
      grupo: sorteo26.slice(CUPOS),
      extra: (i) => (sorteo26.slice(0, CUPOS).includes(i) ? delta : 0),
    },
  };

  const vecinoPeores = peores(vec.m1, CUPOS);
  const vecAntes = mediaDecimas(vec.m1, vecinoPeores);
  const vecDespues = mediaDecimas(
    vec.nivel.map((_, i) => segunda(vec, i, 0)),
    vecinoPeores,
  );

  const datos = {} as Record<OpcionDelCaso5, OpcionDatos>;
  for (const op of OPCIONES) {
    const { llamados, grupo, extra } = conjuntos[op];
    const m2 = todos.map((i) => segunda(c, i, extra(i)));
    const resto = todos.filter((i) => !llamados.includes(i));
    const med = (indices: readonly number[]): Medias => ({ antes: mediaDecimas(c.m1, indices) / 10, despues: mediaDecimas(m2, indices) / 10 });
    const dec = (m: Medias) => Math.round((m.despues - m.antes) * 10); // décimas, exacto
    const medias = med(llamados);
    const demas = med(resto);
    const mGrupo = grupo ? med(grupo) : null;
    const mVecino = op === "a" ? ({ antes: vecAntes / 10, despues: vecDespues / 10 } as Medias) : null;
    const dT = dec(medias);
    const dDemas = dec(demas);
    let rho: number;
    if (op === "a") rho = dT - dec(mVecino!);
    else if (op === "b") rho = dT - dDemas - Math.round(SESGO_ANOTADOS * 10);
    else rho = dT - dec(mGrupo!);
    datos[op] = {
      llamados,
      medias,
      demas,
      grupo: mGrupo,
      indicesGrupo: grupo,
      vecino: mVecino,
      bruta: dT / 10,
      inflada: op === "c" ? null : (dT - dDemas) / 10,
      rho: rho / 10,
    };
  }
  return { c, ordenAnotacion, datos };
}

/** Los invariantes I2, I4, I5, Q1, Q2 y Q3, en décimas. Devuelve la lista de los que fallan (vacía = hoja válida). */
export function invariantesQueFallan(datos: Record<OpcionDelCaso5, OpcionDatos>): string[] {
  const d = (x: number) => Math.round(x * 10);
  const fallan: string[] = [];
  const dv = datos.a.vecino ? d(datos.a.vecino.despues) - d(datos.a.vecino.antes) : null;
  if (dv === null || dv < 40) fallan.push("I2/Q4: el vecino sube menos de 4");
  for (const op of OPCIONES) {
    const o = datos[op];
    if (d(o.bruta) < 10) fallan.push(`Q1(${op}): los llamados no subieron`);
    if (d(o.rho) < -40 || d(o.rho) > 100) fallan.push(`I5(${op}): ρ fuera de [−4, 10]`);
    if (Math.abs(d(o.bruta) - d(o.rho)) <= 20) fallan.push(`I4(${op}): la banda de ρ toca la de la subida bruta`);
    if (o.inflada !== null && d(o.inflada) - d(o.rho) <= 20) fallan.push(`I4/Q2(${op}): la inflada no queda por encima de ρ + 2`);
  }
  const g = datos.c.grupo;
  if (!g || d(g.despues) - d(g.antes) < 10) fallan.push("Q3(c): el grupo de comparación no subió");
  return fallan;
}

/** Genera el caso 5 completo. `delta` es el efecto real del taller de la versión (0 o 3). */
export function generarCaso5(azar: Azar, delta: 0 | 3): Caso5Datos {
  for (let n = 1; n <= TOPE_DE_INTENTOS; n++) {
    const { c, ordenAnotacion, datos } = intento(azar, delta);
    if (invariantesQueFallan(datos).length === 0) return { delta, puntajes: c.m1, ordenAnotacion, opciones: datos, intentos: n };
  }
  throw new Error(`No se logró una hoja de bienestar válida en ${TOPE_DE_INTENTOS} intentos`);
}
