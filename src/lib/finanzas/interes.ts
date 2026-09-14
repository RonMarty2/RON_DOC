// Fórmulas que el motor de SIMPRO no trae (FUENTES.md). Funciones puras: las láminas no calculan nada por su cuenta.

/** Monto con interés simple: M = C(1 + i·n). */
export function montoSimple(capital: number, tasa: number, periodos: number): number {
  return capital * (1 + tasa * periodos);
}

/** Monto con interés compuesto: M = C(1 + j/m)^(m·n). Con m = 1, M = C(1 + i)^n. */
export function montoCompuesto(
  capital: number,
  tasaNominalAnual: number,
  anios: number,
  capitalizacionesPorAnio = 1
): number {
  return capital * Math.pow(1 + tasaNominalAnual / capitalizacionesPorAnio, capitalizacionesPorAnio * anios);
}

/** Tasa efectiva anual de una nominal capitalizable m veces: i = (1 + j/m)^m − 1. */
export function tasaEfectivaAnual(tasaNominalAnual: number, capitalizacionesPorAnio: number): number {
  return Math.pow(1 + tasaNominalAnual / capitalizacionesPorAnio, capitalizacionesPorAnio) - 1;
}

/** Tasa real descontando inflación (Fisher): 1 + i = (1 + r)(1 + π). */
export function tasaReal(tasa: number, inflacion: number): number {
  return (1 + tasa) / (1 + inflacion) - 1;
}

/** Cuánto vale hoy un monto futuro si los precios suben a la tasa de inflación dada. */
export function poderDeCompra(montoFuturo: number, inflacion: number, anios: number): number {
  return montoFuturo / Math.pow(1 + inflacion, anios);
}
