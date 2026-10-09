/**
 * Piezas de azar que comparten los generadores del Tema 1 (carpeta, tandas, bienestar, cifras).
 * Todo sale de un `Azar` (azarDeRubro de version.ts): nada llama a Math.random.
 */

import type { Azar } from "../../finanzas/ejercicios";
import { barajar } from "./version";

/** Entero de 0 a n-1. */
export const entero = (azar: Azar, n: number): number => Math.floor(azar() * n);

/** Entero de `min` a `max` (ambos incluidos), de `paso` en `paso`. */
export const enteroEntre = (azar: Azar, min: number, max: number, paso = 1): number =>
  min + paso * Math.floor(azar() * (Math.floor((max - min) / paso) + 1));

/** Redondeo a un decimal (los números que ve el alumno). */
export const r1 = (x: number): number => Math.round(x * 10) / 10;

/** Normal(mu, sd) por Box-Muller. */
export function normal(azar: Azar, mu: number, sd: number): number {
  let u1 = azar();
  while (u1 <= 1e-12) u1 = azar();
  return mu + sd * Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * azar());
}

/** `n` elementos distintos al azar (el orden del resultado ya es al azar). */
export function tomar<T>(azar: Azar, lista: readonly T[], n: number): T[] {
  if (n > lista.length) throw new Error(`No se pueden tomar ${n} de ${lista.length}`);
  return barajar(azar, lista).slice(0, n);
}

export const acotar = (x: number, min: number, max: number): number => Math.min(max, Math.max(min, x));
