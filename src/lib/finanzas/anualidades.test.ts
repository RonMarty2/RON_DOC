import { describe, expect, it } from "vitest";
import { calcularAmortizacionGenerica } from "../simpro/calculo-financiero";
import {
  cuotaDesdeValorFuturo,
  cuotaDesdeValorPresente,
  valorFuturoAnualidad,
  valorPresenteAnualidad,
} from "./anualidades";
import { montoCompuesto } from "./interes";

describe("valor futuro", () => {
  it("es la suma de cada cuota con su propio interés compuesto", () => {
    const suma = [4, 3, 2, 1, 0].reduce((s, n) => s + montoCompuesto(1000, 0.1, n), 0);
    expect(valorFuturoAnualidad(1000, 0.1, 5)).toBeCloseTo(suma, 6);
    expect(valorFuturoAnualidad(1000, 0.1, 5)).toBeCloseTo(6105.1, 6);
  });

  it("anticipada gana un período más", () => {
    expect(valorFuturoAnualidad(1000, 0.1, 5, true)).toBeCloseTo(6715.61, 6);
  });

  it("sin interés es sumar las cuotas", () => {
    expect(valorFuturoAnualidad(1000, 0, 5)).toBe(5000);
  });
});

describe("valor presente", () => {
  it("es la suma de cada cuota traída a hoy", () => {
    const suma = [1, 2, 3, 4, 5].reduce((s, n) => s + 1000 / 1.1 ** n, 0);
    expect(valorPresenteAnualidad(1000, 0.1, 5)).toBeCloseTo(suma, 6);
    expect(valorPresenteAnualidad(1000, 0.1, 5)).toBeCloseTo(3790.786769, 5);
  });

  it("anticipada vale un período más", () => {
    expect(valorPresenteAnualidad(1000, 0.1, 5, true)).toBeCloseTo(4169.865446, 5);
  });

  it("VF es el VP llevado al final", () => {
    expect(valorPresenteAnualidad(1000, 0.1, 5) * 1.1 ** 5).toBeCloseTo(valorFuturoAnualidad(1000, 0.1, 5), 6);
  });
});

describe("cuotas", () => {
  it("la cuota desde el valor presente coincide con la cuota francesa de SIMPRO", () => {
    const simpro = calcularAmortizacionGenerica({ capital: 10000, tasaPeriodo: 0.1, numPeriodos: 5, metodo: "frances" });
    expect(cuotaDesdeValorPresente(10000, 0.1, 5)).toBeCloseTo(simpro.cuotas[0].cuota, 2);
  });

  it("la cuota para juntar un monto", () => {
    expect(cuotaDesdeValorFuturo(10000, 0.08, 4)).toBeCloseTo(2219.208, 3);
    expect(valorFuturoAnualidad(cuotaDesdeValorFuturo(10000, 0.08, 4), 0.08, 4)).toBeCloseTo(10000, 6);
  });

  it("sin interés reparte en partes iguales", () => {
    expect(cuotaDesdeValorPresente(9000, 0, 3)).toBe(3000);
    expect(cuotaDesdeValorFuturo(9000, 0, 3)).toBe(3000);
  });
});
