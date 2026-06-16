/**
 * Utilidades de cálculo sobre el dataset "La duda de Andrea".
 * TODOS los módulos calculan sus números desde aquí — fuente única de verdad.
 *
 * Las funciones son puras y derivan los valores del dataset, nunca los
 * hardcodean. `verificarVerdades()` corre asserts contra la tabla de verdades.
 */

import { ESTUDIANTES, VERDADES, type Estudiante } from "@content/aula-probabilidad/dataset";

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

/** Tabla de confusión del test rápido contra el estado real (ánimo bajo). */
export interface TablaConfusion {
  VP: number; // ánimo bajo y test positivo
  FP: number; // sano y test positivo
  FN: number; // ánimo bajo y test negativo
  VN: number; // sano y test negativo
  positivos: number;
  /** Valor predictivo positivo: P(ánimo bajo | test positivo) = VP / (VP+FP). */
  vpp: number;
}

export function tablaConfusion(): TablaConfusion {
  const VP = contar((e) => e.animoBajo && e.testPositivo);
  const FP = contar((e) => !e.animoBajo && e.testPositivo);
  const FN = contar((e) => e.animoBajo && !e.testPositivo);
  const VN = contar((e) => !e.animoBajo && !e.testPositivo);
  const positivos = VP + FP;
  return { VP, FP, FN, VN, positivos, vpp: positivos > 0 ? VP / positivos : 0 };
}

/** Las 5 fechas de cumpleaños compartidas en el grupo real (>=2 personas). */
export function coincidenciasCumple(): { clave: string; ids: number[]; nombres: string[] }[] {
  const grupos = new Map<string, Estudiante[]>();
  for (const e of ESTUDIANTES) {
    const k = `${e.mes}-${e.dia}`;
    grupos.set(k, [...(grupos.get(k) ?? []), e]);
  }
  return [...grupos.entries()]
    .filter(([, lista]) => lista.length >= 2)
    .map(([clave, lista]) => ({
      clave,
      ids: lista.map((e) => e.id),
      nombres: lista.map((e) => e.nombre),
    }));
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

/**
 * Asserts contra la tabla de verdades. Devuelve los problemas encontrados
 * (vacío = todo correcto). Se ejecuta en desarrollo desde la herramienta.
 */
export function verificarVerdades(): string[] {
  const fallos: string[] = [];
  const tol = 0.001;

  const total = ESTUDIANTES.length;
  if (total !== VERDADES.total) fallos.push(`total ${total} ≠ ${VERDADES.total}`);

  const animo = contar((e) => e.animoBajo);
  if (animo !== VERDADES.animoBajoReal) fallos.push(`ánimo bajo ${animo} ≠ ${VERDADES.animoBajoReal}`);

  const duermen = contar((e) => e.duermeMal);
  if (duermen !== VERDADES.duermenMal) fallos.push(`duermen mal ${duermen} ≠ ${VERDADES.duermenMal}`);

  const cond = condicional((e) => e.animoBajo, (e) => e.duermeMal);
  if (Math.abs(cond.p - VERDADES.pAnimoDadoDuermeMal) > tol)
    fallos.push(`P(ánimo|duerme) ${cond.num}/${cond.den} ≠ 4/16`);

  const t = tablaConfusion();
  if (t.VP !== VERDADES.VP) fallos.push(`VP ${t.VP} ≠ ${VERDADES.VP}`);
  if (t.FP !== VERDADES.FP) fallos.push(`FP ${t.FP} ≠ ${VERDADES.FP}`);
  if (t.FN !== VERDADES.FN) fallos.push(`FN ${t.FN} ≠ ${VERDADES.FN}`);
  if (t.VN !== VERDADES.VN) fallos.push(`VN ${t.VN} ≠ ${VERDADES.VN}`);
  if (t.positivos !== VERDADES.totalPositivos) fallos.push(`positivos ${t.positivos} ≠ ${VERDADES.totalPositivos}`);
  if (Math.abs(t.vpp - VERDADES.pAnimoDadoPositivo) > tol)
    fallos.push(`P(ánimo|positivo) ${t.VP}/${t.positivos} ≠ 8/21`);

  const coincidencias = coincidenciasCumple();
  if (coincidencias.length !== 5) fallos.push(`fechas compartidas ${coincidencias.length} ≠ 5`);

  return fallos;
}

/** Atajo: el estudiante Daniela (protagonista, falso positivo). */
export function obtenerDaniela(): Estudiante {
  return ESTUDIANTES.find((e) => e.esDaniela) ?? ESTUDIANTES[0];
}
