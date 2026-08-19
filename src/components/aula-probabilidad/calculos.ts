/**
 * Utilidades de cálculo sobre el dataset PTSMU (200 estudiantes).
 * TODOS los módulos calculan sus números desde aquí — fuente única de verdad.
 *
 * Las funciones son puras y derivan los valores del dataset, nunca los
 * hardcodean. `verificarVerdades()` corre asserts contra la tabla de verdades
 * del dossier (apartados 2.1 a 2.9).
 */

import {
  ESTUDIANTES,
  DEMANDA_SEMANAL,
  VERDADES,
  CORTE_TAMIZAJE,
  type Estudiante,
} from "@content/aula-probabilidad/dataset";

/* ------------------------------------------------------------------ */
/* Predicados y conteos básicos                                        */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/* 2.3 — Tabla de contingencia                                         */
/* ------------------------------------------------------------------ */

export interface TablaConfusion {
  VP: number; // Dx sí y tamizaje positivo
  FP: number; // Dx no y tamizaje positivo
  FN: number; // Dx sí y tamizaje negativo
  VN: number; // Dx no y tamizaje negativo
  positivos: number;
  negativos: number;
  dxSi: number;
  dxNo: number;
  total: number;
  sensibilidad: number; // P(positivo | Dx sí)
  especificidad: number; // P(negativo | Dx no)
  vpp: number; // P(Dx sí | positivo)
  vpn: number; // P(Dx no | negativo)
  prevalencia: number;
}

/** Tabla de contingencia con un punto de corte configurable (2.3 y 2.9). */
export function tablaConfusion(corte: number = CORTE_TAMIZAJE): TablaConfusion {
  const pos = (e: Estudiante) => e.phq9 >= corte;
  const VP = contar((e) => pos(e) && e.dxConfirmado);
  const FP = contar((e) => pos(e) && !e.dxConfirmado);
  const FN = contar((e) => !pos(e) && e.dxConfirmado);
  const VN = contar((e) => !pos(e) && !e.dxConfirmado);
  const positivos = VP + FP;
  const negativos = FN + VN;
  const dxSi = VP + FN;
  const dxNo = FP + VN;
  const total = ESTUDIANTES.length;
  return {
    VP,
    FP,
    FN,
    VN,
    positivos,
    negativos,
    dxSi,
    dxNo,
    total,
    sensibilidad: dxSi > 0 ? VP / dxSi : 0,
    especificidad: dxNo > 0 ? VN / dxNo : 0,
    vpp: positivos > 0 ? VP / positivos : 0,
    vpn: negativos > 0 ? VN / negativos : 0,
    prevalencia: total > 0 ? dxSi / total : 0,
  };
}

/* ------------------------------------------------------------------ */
/* 2.4 — Combinatoria                                                  */
/* ------------------------------------------------------------------ */

/** n! */
export function factorial(n: number): number {
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

/** Combinaciones C(n, r): el orden NO importa. */
export function combinaciones(n: number, r: number): number {
  if (r < 0 || r > n) return 0;
  let num = 1;
  for (let i = 0; i < r; i++) num *= n - i;
  return num / factorial(r);
}

/** Permutaciones P(n, r): el orden SÍ importa. */
export function permutaciones(n: number, r: number): number {
  if (r < 0 || r > n) return 0;
  let num = 1;
  for (let i = 0; i < r; i++) num *= n - i;
  return num;
}

/* ------------------------------------------------------------------ */
/* 2.6 — Bayes (modelo teórico con parámetros ajustables)              */
/* ------------------------------------------------------------------ */

/**
 * Modelo bayesiano idealizado sobre una población de tamaño N. A diferencia
 * del dataset real (que tiene fluctuación muestral), acá los porcentajes son
 * exactos: sirve para los deslizadores del módulo Bayes.
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
  return {
    N,
    enfermos,
    sanos,
    VP,
    FN,
    FP,
    VN,
    positivos,
    vpp: positivos > 0 ? VP / positivos : 0,
  };
}

/* ------------------------------------------------------------------ */
/* 2.7-2.8 — Distribuciones discretas                                  */
/* ------------------------------------------------------------------ */

/** Binomial: k éxitos en n ensayos con probabilidad p. */
export function binomial(n: number, k: number, p: number): number {
  if (k < 0 || k > n) return 0;
  return combinaciones(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
}

/** Poisson: k eventos cuando la tasa media del intervalo es lambda. */
export function poisson(k: number, lambda: number): number {
  if (k < 0) return 0;
  return (Math.exp(-lambda) * Math.pow(lambda, k)) / factorial(k);
}

/**
 * Hipergeométrica: k éxitos al extraer n elementos SIN reposición de una
 * población de tamaño N que contiene K éxitos.
 */
export function hipergeometrica(
  N: number,
  K: number,
  n: number,
  k: number
): number {
  const den = combinaciones(N, n);
  if (den === 0) return 0;
  return (combinaciones(K, k) * combinaciones(N - K, n - k)) / den;
}

/* ------------------------------------------------------------------ */
/* 2.9 — Distribución normal                                           */
/* ------------------------------------------------------------------ */

/** Media y desviación estándar (poblacional) de los puntajes PHQ-9. */
export function resumenPhq9(): { media: number; desviacion: number } {
  const xs = ESTUDIANTES.map((e) => e.phq9);
  const media = xs.reduce((s, x) => s + x, 0) / xs.length;
  const varianza =
    xs.reduce((s, x) => s + (x - media) * (x - media), 0) / xs.length;
  return { media, desviacion: Math.sqrt(varianza) };
}

/** Puntuación z: a cuántas desviaciones estándar de la media está x. */
export function puntuacionZ(x: number, media: number, desviacion: number): number {
  return desviacion === 0 ? 0 : (x - media) / desviacion;
}

/**
 * Área acumulada de la normal estándar, P(Z < z).
 * Aproximación de Abramowitz–Stegun 26.2.17 (error < 7.5e-8), suficiente
 * para reproducir cualquier tabla de Z impresa.
 */
export function normalAcumulada(z: number): number {
  const signo = z < 0 ? -1 : 1;
  const az = Math.abs(z) / Math.SQRT2;
  const t = 1 / (1 + 0.3275911 * az);
  const y =
    1 -
    ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) *
      t +
      0.254829592) *
      t *
      Math.exp(-az * az);
  return 0.5 * (1 + signo * y);
}

/** Densidad de la normal estándar (para dibujar la campana). */
export function normalDensidad(z: number): number {
  return Math.exp(-(z * z) / 2) / Math.sqrt(2 * Math.PI);
}

/* ------------------------------------------------------------------ */
/* Datos auxiliares                                                    */
/* ------------------------------------------------------------------ */

/** Tasa media semanal de solicitudes (lambda de Poisson, apartado 2.8). */
export function tasaDemandaSemanal(): number {
  return DEMANDA_SEMANAL.reduce((s, x) => s + x, 0) / DEMANDA_SEMANAL.length;
}

/** Expedientes incompletos entre los estudiantes que dieron positivo. */
export function expedientesIncompletosEnPositivos(): number {
  return contar((e) => phq9Positivo(e) && !e.expedienteCompleto);
}

/* ------------------------------------------------------------------ */
/* Verificación contra el dossier                                      */
/* ------------------------------------------------------------------ */

/**
 * Asserts contra la tabla de verdades. Devuelve los problemas encontrados
 * (vacío = todo correcto). Se ejecuta en desarrollo desde la herramienta.
 */
export function verificarVerdades(): string[] {
  const fallos: string[] = [];
  const tol = 0.001;
  const cerca = (a: number, b: number, t = tol) => Math.abs(a - b) <= t;

  const total = ESTUDIANTES.length;
  if (total !== VERDADES.total) fallos.push(`total ${total} ≠ ${VERDADES.total}`);

  const phq = contar(phq9Positivo);
  if (phq !== VERDADES.phq9Positivos)
    fallos.push(`PHQ-9 positivos ${phq} ≠ ${VERDADES.phq9Positivos}`);

  const gad = contar(gad7Positivo);
  if (gad !== VERDADES.gad7Positivos)
    fallos.push(`GAD-7 positivos ${gad} ≠ ${VERDADES.gad7Positivos}`);

  const ambos = contar((e) => phq9Positivo(e) && gad7Positivo(e));
  if (ambos !== VERDADES.ambosPositivos)
    fallos.push(`ambos positivos ${ambos} ≠ ${VERDADES.ambosPositivos}`);

  const dx = contar((e) => e.dxConfirmado);
  if (dx !== VERDADES.dxConfirmados)
    fallos.push(`Dx confirmados ${dx} ≠ ${VERDADES.dxConfirmados}`);

  const t = tablaConfusion();
  if (t.VP !== VERDADES.VP) fallos.push(`VP ${t.VP} ≠ ${VERDADES.VP}`);
  if (t.FP !== VERDADES.FP) fallos.push(`FP ${t.FP} ≠ ${VERDADES.FP}`);
  if (t.FN !== VERDADES.FN) fallos.push(`FN ${t.FN} ≠ ${VERDADES.FN}`);
  if (t.VN !== VERDADES.VN) fallos.push(`VN ${t.VN} ≠ ${VERDADES.VN}`);
  if (!cerca(t.sensibilidad, VERDADES.sensibilidad))
    fallos.push(`sensibilidad ${t.sensibilidad} ≠ ${VERDADES.sensibilidad}`);
  if (!cerca(t.especificidad, VERDADES.especificidad))
    fallos.push(`especificidad ${t.especificidad} ≠ ${VERDADES.especificidad}`);
  if (!cerca(t.vpp, VERDADES.vpp)) fallos.push(`VPP ${t.vpp} ≠ ${VERDADES.vpp}`);

  const union = proporcion((e) => phq9Positivo(e) || gad7Positivo(e));
  if (!cerca(union, VERDADES.pUnion))
    fallos.push(`P(unión) ${union} ≠ ${VERDADES.pUnion}`);

  const condGad = condicional(gad7Positivo, phq9Positivo);
  if (!cerca(condGad.p, VERDADES.pGad7DadoPhq9))
    fallos.push(`P(GAD+|PHQ+) ${condGad.num}/${condGad.den} ≠ 17/43`);

  if (combinaciones(43, 5) !== 962598) fallos.push("C(43,5) ≠ 962598");
  if (permutaciones(43, 5) !== 115511760) fallos.push("P(43,5) ≠ 115511760");

  // 2.8 — distribuciones discretas
  if (!cerca(binomial(20, 5, 0.215), 0.1887, 0.0002))
    fallos.push(`binomial(20,5,.215) ${binomial(20, 5, 0.215)} ≠ 0.1887`);
  if (!cerca(poisson(8, 5), 0.0653, 0.0002))
    fallos.push(`poisson(8,5) ${poisson(8, 5)} ≠ 0.0653`);
  if (!cerca(hipergeometrica(43, 9, 6, 2), 0.2739, 0.0002))
    fallos.push(`hipergeom(43,9,6,2) ${hipergeometrica(43, 9, 6, 2)} ≠ 0.2739`);

  const inc = expedientesIncompletosEnPositivos();
  if (inc !== VERDADES.expedientesIncompletosEnPositivos)
    fallos.push(`expedientes incompletos ${inc} ≠ 9`);

  const demanda = DEMANDA_SEMANAL.reduce((s, x) => s + x, 0);
  if (demanda !== VERDADES.demandaTotal)
    fallos.push(`demanda total ${demanda} ≠ ${VERDADES.demandaTotal}`);

  // 2.9 — normal
  const r = resumenPhq9();
  if (!cerca(r.media, VERDADES.mediaPhq9, 0.005))
    fallos.push(`media PHQ-9 ${r.media} ≠ ${VERDADES.mediaPhq9}`);
  if (!cerca(r.desviacion, VERDADES.desviacionPhq9, 0.005))
    fallos.push(`sd PHQ-9 ${r.desviacion} ≠ ${VERDADES.desviacionPhq9}`);

  const z = puntuacionZ(CORTE_TAMIZAJE, r.media, r.desviacion);
  const areaDerecha = 1 - normalAcumulada(z);
  if (!cerca(areaDerecha, 0.214, 0.003))
    fallos.push(`P(X≥10) normal ${areaDerecha} ≠ 0.214`);

  return fallos;
}
