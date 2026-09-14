// Depreciación de un activo de costo C, valor de salvamento S y vida útil n. El lineal usa el motor de SIMPRO.
import { calcularDepreciacionAnual } from "../simpro/calculo-financiero";
import { cuotaDesdeValorFuturo } from "./anualidades";

export type MetodoDepreciacion = "lineal" | "sumaDigitos" | "porcentajeFijo" | "fondo";

export interface FilaDepreciacion {
  anio: number;
  depreciacion: number;
  acumulada: number;
  valorLibros: number;
}

/** Tasa fija sobre el saldo que lleva el costo exactamente al salvamento: d = 1 − (S/C)^(1/n). */
export function tasaPorcentajeFijo(costo: number, salvamento: number, vida: number): number {
  return 1 - Math.pow(salvamento / costo, 1 / vida);
}

/** Depósito anual del fondo que junta la base depreciable al final: R = (C − S)·i/[(1+i)^n − 1]. */
export function depositoFondo(costo: number, salvamento: number, vida: number, tasa: number): number {
  return cuotaDesdeValorFuturo(costo - salvamento, tasa, vida);
}

/**
 * Tabla año por año. El porcentaje fijo necesita salvamento mayor que cero;
 * el fondo necesita la tasa que gana el dinero apartado.
 */
export function tablaDepreciacion(
  costo: number,
  salvamento: number,
  vida: number,
  metodo: MetodoDepreciacion,
  tasaFondo = 0
): FilaDepreciacion[] {
  const base = costo - salvamento;
  const sumaDigitos = (vida * (vida + 1)) / 2;
  const d = tasaPorcentajeFijo(costo, salvamento, vida);
  const deposito = depositoFondo(costo, salvamento, vida, tasaFondo);

  const filas: FilaDepreciacion[] = [];
  let acumulada = 0;
  for (let anio = 1; anio <= vida; anio++) {
    const valorPrevio = costo - acumulada;
    let depreciacion: number;
    if (metodo === "lineal") depreciacion = calcularDepreciacionAnual(base, vida);
    else if (metodo === "sumaDigitos") depreciacion = (base * (vida - anio + 1)) / sumaDigitos;
    else if (metodo === "porcentajeFijo") depreciacion = valorPrevio * d;
    else depreciacion = deposito + acumulada * tasaFondo;
    acumulada += depreciacion;
    filas.push({ anio, depreciacion, acumulada, valorLibros: costo - acumulada });
  }
  return filas;
}
