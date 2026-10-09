/**
 * Un efecto de sonido como DATOS: una lista de notas (onda, frecuencia, cuándo empieza, cuánto dura). El motor
 * (`motor.ts`) las toca con Web Audio; aquí no hay nada del navegador, así que se puede probar.
 *
 * Es común a todos los juegos (regla 2 de «Estructura»): cada materia escribe sus propias recetas.
 */

export type Onda = "square" | "triangle" | "sine" | "sawtooth" | "ruido";

export interface Nota {
  onda: Onda;
  /** Frecuencia al empezar, en Hz (ignorada por el ruido). */
  desde: number;
  /** Frecuencia al terminar; si falta, no se desliza. */
  hasta?: number;
  /** Segundos desde que arranca el efecto. */
  inicio: number;
  /** Duración en segundos. */
  dur: number;
  /** Volumen de la nota, de 0 a 1 (por defecto 0,5). */
  vol?: number;
}

export type Receta = readonly Nota[];

/** Cuánto dura el efecto entero. */
export const duracionDe = (r: Receta): number => r.reduce((m, n) => Math.max(m, n.inicio + n.dur), 0);

/** Problemas de una receta (vacío si está bien): para las pruebas y para no tocar nunca algo que suene mal. */
export function problemasDeReceta(r: Receta, maxSegundos = 3): string[] {
  const p: string[] = [];
  if (r.length === 0) p.push("sin notas");
  if (duracionDe(r) > maxSegundos) p.push(`dura ${duracionDe(r).toFixed(2)} s (máximo ${maxSegundos})`);
  r.forEach((n, i) => {
    if (!(n.dur > 0)) p.push(`nota ${i}: duración inválida`);
    if (n.inicio < 0) p.push(`nota ${i}: empieza antes de 0`);
    if (n.onda !== "ruido" && !(n.desde >= 20 && n.desde <= 12000)) p.push(`nota ${i}: frecuencia fuera de rango`);
    if (n.hasta !== undefined && !(n.hasta >= 20 && n.hasta <= 12000)) p.push(`nota ${i}: frecuencia final fuera de rango`);
    if (n.vol !== undefined && !(n.vol > 0 && n.vol <= 1)) p.push(`nota ${i}: volumen fuera de 0 a 1`);
  });
  return p;
}
