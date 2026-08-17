/**
 * Utilidades de cálculo sobre el dataset PTSMU (200 estudiantes).
 * TODOS los módulos calculan sus números desde aquí — fuente única de verdad.
 *
 * Las funciones son puras y derivan los valores del dataset, nunca los
 * hardcodean. `verificarVerdades()` corre asserts contra la tabla de verdades.
 */

import {
  ESTUDIANTES,
  VERDADES,
  CORTE_TAMIZAJE,
  type Estudiante,
} from "@content/aula-probabilidad/dataset";

/** ¿Dio positivo en PHQ-9 (depresión)? */
export function phq9Positivo(e: Estudiante): boolean {
  return e.phq9 >= CORTE_TAMIZAJE;
}

/** ¿Dio positivo en GAD-7 (ansiedad)? */
export function gad7Positivo(e: Estudiante): boolean {
  return e.gad7 >= CORTE_TAMIZAJE;
}

/** Cuenta cuántos estudiantes cumplen un predicado. */
export function contar(pred: (e: Estudiante) => boolean): number {
  return ESTUDIANTES.filter(pred).length;
}

/** Proporción simple: cuántos cumplen `pred` sobre el total. */
export function proporcion(pred: (e: Estudiante) => boolean): number {
  return contar(pred) / ESTUDIANTES.length;
}

/**
 * Probabilidad condicional P(objetivo | condicion) calculada por frecuencias:
 * de los que cumplen `condicion`, qué fracción cumple `objetivo`.
 */
export function condicional(
  objetivo: (e: Estudiante) => boolean,
  condicion: (e: Estudiante) => boolean
): { num: number; den: number; p: number } {
  const subgrupo = ESTUDIANTES.filter(condicion);
  const num = subgrupo.filter(objetivo).length;
  const den = subgrupo.length;
  return { num, den, p: den > 0 ? num / den : 0 };
}

/** Tabla de contingencia PHQ-9 (tamizaje) × diagnóstico confirmado. */
export interface TablaConfusion {
  VP: number; // Dx sí y tamizaje positivo
  FP: number; // Dx no y tamizaje positivo
  FN: number; // Dx sí y tamizaje negativo
  VN: number; // Dx no y tamizaje negativo
  positivos: number;
  sensibilidad: number; // P(positivo | Dx sí) = VP / (VP+FN)
  especificidad: number; // P(negativo | Dx no) = VN / (VN+FP)
  /** Valor predictivo positivo: P(Dx sí | positivo) = VP / (VP+FP). */
  vpp: number;
}

export function tablaConfusion(): TablaConfusion {
  const VP = contar((e) => phq9Positivo(e) && e.dxConfirmado);
  const FP = contar((e) => phq9Positivo(e) && !e.dxConfirmado);
  const FN = contar((e) => !phq9Positivo(e) && e.dxConfirmado);
  const VN = contar((e) => !phq9Positivo(e) && !e.dxConfirmado);
  const positivos = VP + FP;
  const dxSi = VP + FN;
  const dxNo = FP + VN;
  return {
    VP,
    FP,
    FN,
    VN,
    positivos,
    sensibilidad: dxSi > 0 ? VP / dxSi : 0,
    especificidad: dxNo > 0 ? VN / dxNo : 0,
    vpp: positivos > 0 ? VP / positivos : 0,
  };
}

/**
 * Modelo bayesiano teórico (idealizado) sobre una población de tamaño N.
 * Sirve para los deslizadores del módulo Bayes: a diferencia del dataset real
 * (que tiene fluctuación muestral), aquí los porcentajes son exactos.
 */
export function modeloBayes(
  prevalencia: number,
  sensibilidad: number,
  especificidad: number,
  N = 1000
) {
  const enfermos = Math.round(N * prevalencia);
  const sanos = N - enfermos;
  const VP = Math.round(enfermos * sensibilidad);
  const FN = enfermos - VP;
  const FP = Math.round(sanos * (1 - especificidad));
  const VN = sanos - FP;
  const positivos = VP + FP;
  return { N, enfermos, sanos, VP, FN, FP, VN, positivos, vpp: positivos > 0 ? VP / positivos : 0 };
}

/** n! */
export function factorial(n: number): number {
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

/** Combinaciones de n elementos tomados de r en r (orden no importa). */
export function combinaciones(n: number, r: number): number {
  if (r < 0 || r > n) return 0;
  let num = 1;
  for (let i = 0; i < r; i++) num *= n - i;
  return num / factorial(r);
}

/** Permutaciones de n elementos tomados de r en r (orden importa). */
export function permutaciones(n: number, r: number): number {
  if (r < 0 || r > n) return 0;
  let num = 1;
  for (let i = 0; i < r; i++) num *= n - i;
  return num;
}

/**
 * Asserts contra la tabla de verdades. Devuelve los problemas encontrados
 * (vacío = todo correcto). Se ejecuta en desarrollo desde la herramienta.
 */
export function verificarVerdades(): string[] {
  const fallos: string[] = [];
  const tol = 0.001;

  const total = ESTUDIANTES.length;
  if (total !== VERDADES.total) fallos.push(`total ${total} ≠ ${VERDADES.total}`);

  const phq = contar(phq9Positivo);
  if (phq !== VERDADES.phq9Positivos) fallos.push(`PHQ-9 positivos ${phq} ≠ ${VERDADES.phq9Positivos}`);

  const gad = contar(gad7Positivo);
  if (gad !== VERDADES.gad7Positivos) fallos.push(`GAD-7 positivos ${gad} ≠ ${VERDADES.gad7Positivos}`);

  const ambos = contar((e) => phq9Positivo(e) && gad7Positivo(e));
  if (ambos !== VERDADES.ambosPositivos) fallos.push(`ambos positivos ${ambos} ≠ ${VERDADES.ambosPositivos}`);

  const dx = contar((e) => e.dxConfirmado);
  if (dx !== VERDADES.dxConfirmados) fallos.push(`Dx confirmados ${dx} ≠ ${VERDADES.dxConfirmados}`);

  const t = tablaConfusion();
  if (t.VP !== VERDADES.VP) fallos.push(`VP ${t.VP} ≠ ${VERDADES.VP}`);
  if (t.FP !== VERDADES.FP) fallos.push(`FP ${t.FP} ≠ ${VERDADES.FP}`);
  if (t.FN !== VERDADES.FN) fallos.push(`FN ${t.FN} ≠ ${VERDADES.FN}`);
  if (t.VN !== VERDADES.VN) fallos.push(`VN ${t.VN} ≠ ${VERDADES.VN}`);
  if (Math.abs(t.sensibilidad - VERDADES.sensibilidad) > tol)
    fallos.push(`sensibilidad ${t.sensibilidad} ≠ ${VERDADES.sensibilidad}`);
  if (Math.abs(t.especificidad - VERDADES.especificidad) > tol)
    fallos.push(`especificidad ${t.especificidad} ≠ ${VERDADES.especificidad}`);
  if (Math.abs(t.vpp - VERDADES.vpp) > tol) fallos.push(`VPP ${t.vpp} ≠ ${VERDADES.vpp}`);

  const union = proporcion((e) => phq9Positivo(e) || gad7Positivo(e));
  if (Math.abs(union - VERDADES.pUnion) > tol) fallos.push(`P(unión) ${union} ≠ ${VERDADES.pUnion}`);

  const condGad = condicional(gad7Positivo, phq9Positivo);
  if (Math.abs(condGad.p - VERDADES.pGad7DadoPhq9) > tol)
    fallos.push(`P(GAD+|PHQ+) ${condGad.num}/${condGad.den} ≠ 17/43`);

  if (combinaciones(43, 5) !== 962598) fallos.push(`C(43,5) ≠ 962598`);

  return fallos;
}
