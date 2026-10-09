/**
 * Caso 3 · «La cifra del colegio»: el registro de 480 estudiantes, las tandas de 10 y la cifra del oficio
 * (mecánicas M5 y M6; 02-bucle-y-mecanicas.md 5.2; supuesto Q7 de 04-aprendizaje.md T1.8).
 *
 * Horas de sueño en décimas de hora (enteros) para que las medias sean exactas. El registro tiene media `mu` (la «media del
 * registro» que el rango debe cubrir) y desvío 1,1 h; una tanda son 10 estudiantes sacados SIN reposición, así que la media
 * de una tanda tiene desvío ≈ 0,35 h. Las tres tandas que el alumno puede sacar (3 fichas) salen de la misma permutación:
 * reabrir la partida da las mismas tandas.
 *
 * Decisiones por ambigüedad: el registro se genera con Normal(mu0, 1,1) recortada a [2,0; 11,0] h y redondeada a 0,1 h, y
 * `mu` es la media real del registro ya redondeada a centésimas (no mu0). La cifra del oficio se arma desde la media redondeada
 * a décimas de `mu`: tipo P a 1,1 a 1,5 h de distancia (ambas direcciones), tipo B a 0,1 h o menos y tipo A a 0,4 h o menos
 * (tras redondear, siempre dentro de lo que dice 02: P más de 1,0 h y hasta 1,6; B hasta 0,15; A hasta 0,5).
 */

import type { Azar } from "../../finanzas/ejercicios";
import { barajar } from "./version";
import { acotar, enteroEntre, normal } from "./aleatorio-t1";
import type { TipoDeCaso } from "./reglas-t1";

export const TAMANO_REGISTRO = 480;
export const TAMANO_TANDA = 10;
export const TANDAS_MAXIMAS = 3;
export const DESVIO_REGISTRO = 1.1;
/** Holgura del rango «cubre» (02 5.2). */
export const HOLGURA_CUBRE = 0.25;
/** Un rango mide a lo más esto para ser `ok`; más de `ANCHO_MAXIMO` es `ancho`. */
export const ANCHO_OK = 1.2;
export const ANCHO_MAXIMO = 2.0;

export interface Caso3Datos {
  /** Media real del registro, en horas con 2 decimales. */
  mu: number;
  /** Las tres tandas que se pueden sacar, en el orden en que se sacan (10 valores cada una, en horas con 1 decimal). */
  tandas: number[][];
  /** Media de cada tanda con 1 decimal (lo que ve el alumno). */
  medias: number[];
  /** La cifra del oficio, con 1 decimal. */
  cifra: number;
}

const decimas = (valores: readonly number[]): number => valores.reduce((s, x) => s + x, 0);

/** Genera el caso 3. Pura dado el `azar`. Lanza si no logra tres medias distintas (no ocurre en la práctica). */
export function generarCaso3(azar: Azar, tipo: TipoDeCaso): Caso3Datos {
  const mu0 = 5.5 + 2 * azar();
  const registro: number[] = Array.from({ length: TAMANO_REGISTRO }, () => Math.round(acotar(normal(azar, mu0, DESVIO_REGISTRO), 2, 11) * 10));
  const mu = Math.round(decimas(registro) / 48) / 100; // décimas de hora / 480, a centésimas de hora

  const indices = Array.from({ length: TAMANO_REGISTRO }, (_, i) => i);
  for (let intento = 0; intento < 100; intento++) {
    const perm = barajar(azar, indices);
    const tandasDecimas = [0, 1, 2].map((k) => perm.slice(k * TAMANO_TANDA, (k + 1) * TAMANO_TANDA).map((i) => registro[i]));
    const mediasDecimas = tandasDecimas.map((t) => Math.round(decimas(t) / TAMANO_TANDA));
    // Q7: «cada una dio algo distinto» solo es cierto si las medias que se MUESTRAN (1 decimal) son distintas.
    if (new Set(mediasDecimas).size < TANDAS_MAXIMAS) continue;

    const base = Math.round(mu * 10); // décimas
    let cifraDecimas: number;
    if (tipo === "P") {
      const lejos = enteroEntre(azar, 11, 15);
      cifraDecimas = base + (azar() < 0.5 ? -lejos : lejos);
    } else if (tipo === "B") {
      cifraDecimas = base + enteroEntre(azar, -1, 1);
    } else {
      cifraDecimas = base + enteroEntre(azar, -4, 4);
    }
    return {
      mu,
      tandas: tandasDecimas.map((t) => t.map((d) => d / 10)),
      medias: mediasDecimas.map((d) => d / 10),
      cifra: cifraDecimas / 10,
    };
  }
  throw new Error("No se lograron tres tandas con medias distintas");
}

// ── Niveles del rango (02 5.2) ───────────────────────────────────────────────

export type NivelDeRango = "noCubre" | "ancho" | "ok" | "flojo";

/** `cubre(a,b,μ) = a − 0,25 ≤ μ ≤ b + 0,25`. Cuentas en centésimas para no arrastrar error de coma flotante. */
export function cubre(a: number, b: number, mu: number): boolean {
  const A = Math.round(a * 100);
  const B = Math.round(b * 100);
  const M = Math.round(mu * 100);
  return A - Math.round(HOLGURA_CUBRE * 100) <= M && M <= B + Math.round(HOLGURA_CUBRE * 100);
}

/** El nivel, en este orden: no cubre → noCubre; ancho (> 2,0 h) → ancho; ≤ 1,2 h → ok; si no, flojo. */
export function nivelDeRango(a: number, b: number, mu: number): NivelDeRango {
  if (!cubre(a, b, mu)) return "noCubre";
  const ancho = Math.round(b * 10) - Math.round(a * 10); // décimas
  if (ancho > Math.round(ANCHO_MAXIMO * 10)) return "ancho";
  if (ancho <= Math.round(ANCHO_OK * 10)) return "ok";
  return "flojo";
}
