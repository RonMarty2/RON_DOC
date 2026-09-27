/**
 * Cálculos de estados financieros (Análisis e Interpretación de EEFF, Temas 1 y 2). Los usan el juego
 * de AIEF y, cuando existan, sus láminas. Cada uno con su prueba en estados.test.ts.
 */

/** Tasa del Impuesto sobre las Utilidades de las Empresas en Bolivia, sobre la utilidad antes de impuestos (D2 §2.2). */
export const TASA_IUE = 0.25;

/**
 * Valor de hoy de algo registrado en otra fecha: el valor por cuánto subió el índice (NC 3).
 * `indiceCompra` e `indiceHoy` son el mismo índice (UFV u otro) en las dos fechas.
 */
export function reexpresar(valor: number, indiceCompra: number, indiceHoy: number): number {
  if (indiceCompra <= 0) throw new Error("El índice de compra tiene que ser positivo");
  return (valor * indiceHoy) / indiceCompra;
}

export interface Resultados {
  ventas: number;
  costoDeVentas: number;
  gastosDeOperacion: number;
  gastosFinancieros: number;
}

/**
 * La cascada del estado de resultados, escalón por escalón. El IUE es el 25 % de la utilidad antes de
 * impuestos; si esa utilidad es negativa no hay impuesto (se toma cero; queda por confirmar contra el
 * dossier, D2 §2.2).
 */
export function cascada(r: Resultados) {
  const utilidadBruta = r.ventas - r.costoDeVentas;
  const utilidadOperativa = utilidadBruta - r.gastosDeOperacion;
  const utilidadAntesDeImpuestos = utilidadOperativa - r.gastosFinancieros;
  const iue = Math.max(0, utilidadAntesDeImpuestos * TASA_IUE);
  return { utilidadBruta, utilidadOperativa, utilidadAntesDeImpuestos, iue, utilidadNeta: utilidadAntesDeImpuestos - iue };
}

/** Ecuación contable: Patrimonio = Activo − Pasivo. */
export function patrimonio(activo: number, pasivo: number): number {
  return activo - pasivo;
}

/** Une los dos estados: Patrimonio final = Patrimonio inicial + Utilidad neta − Dividendos (D2 §2.3). */
export function patrimonioFinal(inicial: number, utilidadNeta: number, dividendos: number): number {
  return inicial + utilidadNeta - dividendos;
}
