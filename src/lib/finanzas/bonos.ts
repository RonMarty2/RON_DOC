// Bonos con cupón anual: N nominal, c tasa de cupón, i rendimiento de mercado, n años.
import { valorPresenteAnualidad } from "./anualidades";

/** Lo que paga el bono cada año: el cupón, y el último año además el nominal. */
export function flujosBono(nominal: number, tasaCupon: number, periodos: number): number[] {
  return Array.from({ length: periodos }, (_, k) => nominal * tasaCupon + (k === periodos - 1 ? nominal : 0));
}

/** Precio: P = R·[1 − (1+i)^−n]/i + N·(1+i)^−n, con R = N·c. */
export function precioBono(nominal: number, tasaCupon: number, rendimiento: number, periodos: number): number {
  return valorPresenteAnualidad(nominal * tasaCupon, rendimiento, periodos) + nominal / Math.pow(1 + rendimiento, periodos);
}

/** Tasa que iguala el valor presente de los flujos con el precio. No tiene fórmula cerrada: se busca por bisección. */
export function rendimientoAlVencimiento(precio: number, nominal: number, tasaCupon: number, periodos: number): number {
  let bajo = -0.99;
  let alto = 10;
  for (let k = 0; k < 200; k++) {
    const medio = (bajo + alto) / 2;
    if (precioBono(nominal, tasaCupon, medio, periodos) > precio) bajo = medio;
    else alto = medio;
  }
  return (bajo + alto) / 2;
}

/** Duración de Macaulay: el promedio de los años de cada pago, pesado por cuánto vale hoy ese pago. */
export function duracionMacaulay(nominal: number, tasaCupon: number, rendimiento: number, periodos: number): number {
  const precio = precioBono(nominal, tasaCupon, rendimiento, periodos);
  return flujosBono(nominal, tasaCupon, periodos).reduce(
    (suma, flujo, k) => suma + ((k + 1) * flujo) / Math.pow(1 + rendimiento, k + 1),
    0
  ) / precio;
}

/** Duración modificada: D/(1+i). Cambio aproximado del precio ante un cambio de tasa: ΔP/P ≈ −D_mod·Δi. */
export function duracionModificada(nominal: number, tasaCupon: number, rendimiento: number, periodos: number): number {
  return duracionMacaulay(nominal, tasaCupon, rendimiento, periodos) / (1 + rendimiento);
}
