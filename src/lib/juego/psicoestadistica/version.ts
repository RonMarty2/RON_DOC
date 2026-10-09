/**
 * La versión de cada alumno en el Tema 1: qué tipo tiene cada caso, en qué orden salen y qué nombres ve.
 * Fuente: 02-bucle-y-mecanicas.md G7 a G9 y 05-mundo-y-narrativa.md NT1.4 (pools de nombres).
 *
 * Regla G9: `semilla = versionDeAlumno(id, "psicoestadistica:1")` y UN generador por rubro,
 * `azarConSemilla(semilla * 100 + k)`; así cambiar un rubro no cambia los otros.
 *   k=1 tipos · k=2 orden · k=3 papeles de cada carpeta (carpeta.ts, todavía no) · k=10+caso cifras y textos.
 *
 * ── Los TODO de este archivo, RESUELTOS en el bloque 2 del motor (cada decisión está escrita al inicio del archivo que la toma) ──
 *  1. Papeles de la carpeta (G10): `carpeta.ts` (rubro k=3): cuáles 6 de los 9, la clave de cada caso, el refuerzo del caso 2 y el orden.
 *  2. Cifras de cada caso: `cifras.ts` (rubros k=21..28, 29), con `tandas.ts` (caso 3) y `bienestar.ts` (caso 5).
 *  3. `{mes}`, `{mesAnt}`, `{d0}`, `{d1}`, `{b0}`, `{b1}`, `{hechoClave}`, `{curso}`: `cifras.ts` (`caso2`, `caso6.curso`).
 *  4. `{colegio}`: aquí sigue UN colegio del tema (k=12, `textos.colegio`, sin tocar); el reparto de uno distinto por caso está en
 *     `cifras.colegios` (el caso n usa el lugar (n−1) mod 4 de un barajado del pool).
 *  5. Los k de cada pool siguen siendo los de este archivo (colegio 12, fuentes 13, vecino 15, talleres 17, Beto 18, Dani 10); las
 *     cifras usan k = 20 + caso para no chocar con ellos.
 *  6. Fuente del caso 4: la cuarta del barajado de fuentes (k=13), la que sobra tras los casos 3, 6 y 7: `cifras.fuenteCaso4`.
 *  7. Semilla de la práctica abierta: `semillaDePractica(semilla, caso, intento)` en `cifras.ts` (cambia el tipo de ese caso).
 */

import { azarConSemilla, type Azar } from "../../finanzas/ejercicios";
import { versionDeAlumno } from "../version-alumno";
import { SEMILLA_T1, type DecisionCaso8, type NumeroDeCaso, type VersionT1 } from "./reglas-t1";
import { TIRADAS } from "./efectos-t1";

// ── Pools (05 NT1.4). Nombres inventados; no se repiten en los de otros juegos ───────────────────────────
export const POOL_COLEGIOS = ["Santa Lucía", "Los Pinos", "San Martín de la Loma", "Villa Esperanza"] as const;
export const POOL_VECINOS = ["San Rafael", "Monte Verde", "Nuevo Amanecer", "Los Cedros"] as const;
export const POOL_FUENTES = ["Dirección Distrital Meridiano", "Red Escolar Corriente", "Observatorio Brújula", "Programa Cuadrante"] as const;
export const POOL_DANI = ["Dani", "Nico", "Sami", "Kris"] as const;
export const POOL_TALLERES = ["teatro", "ajedrez", "huerto", "radio escolar"] as const;

/** G9: el generador de un rubro. */
export const azarDeRubro = (semilla: number, k: number): Azar => azarConSemilla(semilla * 100 + k);

/** La semilla del alumno para este tema (1 a 999, nunca 0). */
export const semillaDeAlumno = (id: string): number => versionDeAlumno(id, SEMILLA_T1);

const entero = (azar: Azar, n: number) => Math.floor(azar() * n);

/** Fisher-Yates sobre una copia. */
export function barajar<T>(azar: Azar, lista: readonly T[]): T[] {
  const r = [...lista];
  for (let i = r.length - 1; i > 0; i--) {
    const j = entero(azar, i + 1);
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

/** Toda la versión del Tema 1 para esa semilla. Pura: la misma semilla da siempre lo mismo. */
export function versionT1(semilla: number): VersionT1 {
  if (!Number.isInteger(semilla) || semilla < 0) throw new Error(`Semilla inválida: ${semilla}`);

  // k=1 · tipos (G7). Orden fijo de sorteos dentro del rubro: caso 2, tirada, caso 4, caso 5, caso 8.
  const aTipos = azarDeRubro(semilla, 1);
  const tipo2 = aTipos() < 1 / 3 ? "B" : "P"; // bien en 1 de 3 versiones, con problema en 2 de 3 (D-T1-1)
  const [t3, t6, t7] = TIRADAS[entero(aTipos, TIRADAS.length)];
  const buenoEsA = aTipos() < 0.5;
  const efectoReal = aTipos() < 0.5 ? 0 : 3;
  const decisionReal = entero(aTipos, 3) as DecisionCaso8;

  // k=2 · orden (G8): paso 1, caso 2 y caso 8 fijos; 3 a 7 en una de las 120 permutaciones.
  const medio = barajar(azarDeRubro(semilla, 2), [3, 4, 5, 6, 7] as const);
  const orden: NumeroDeCaso[] = [1, 2, ...medio, 8];

  // k=18 · el colega Beto propone la decisión correcta con prob. 1/3 y, si no, una de las otras dos por igual.
  const aBeto = azarDeRubro(semilla, 18);
  const propuestaDeBeto = (aBeto() < 1 / 3 ? decisionReal : (decisionReal + 1 + entero(aBeto, 2)) % 3) as DecisionCaso8;

  // Textos (TODO 4 y 5 arriba).
  const fuentes = barajar(azarDeRubro(semilla, 13), POOL_FUENTES);
  const talleres = barajar(azarDeRubro(semilla, 17), POOL_TALLERES);

  return {
    semilla,
    tipos: { 2: tipo2, 3: t3, 6: t6, 7: t7 },
    buenoEsA,
    efectoReal,
    decisionReal,
    propuestaDeBeto,
    orden,
    textos: {
      colegio: POOL_COLEGIOS[entero(azarDeRubro(semilla, 12), POOL_COLEGIOS.length)],
      vecino: POOL_VECINOS[entero(azarDeRubro(semilla, 15), POOL_VECINOS.length)],
      fuentes: { 3: fuentes[0], 6: fuentes[1], 7: fuentes[2] },
      dani: POOL_DANI[entero(azarDeRubro(semilla, 10), POOL_DANI.length)],
      talleres: [talleres[0], talleres[1]],
    },
  };
}

/** Atajo: la versión de un alumno por su id de Supabase. */
export const versionT1DeAlumno = (id: string): VersionT1 => versionT1(semillaDeAlumno(id));
