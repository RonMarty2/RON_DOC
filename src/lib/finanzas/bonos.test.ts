import { describe, expect, it } from "vitest";
import { duracionMacaulay, duracionModificada, flujosBono, precioBono, rendimientoAlVencimiento } from "./bonos";

describe("precio", () => {
  it("a la par cuando el mercado paga lo mismo que el cupón", () => {
    expect(precioBono(1000, 0.08, 0.08, 5)).toBeCloseTo(1000, 6);
  });

  it("bajo la par si el mercado paga más, sobre la par si paga menos", () => {
    expect(precioBono(1000, 0.08, 0.1, 5)).toBeCloseTo(924.184, 3);
    expect(precioBono(1000, 0.08, 0.06, 5)).toBeCloseTo(1084.247, 3);
  });

  it("es la suma de cada flujo traído a hoy", () => {
    const suma = flujosBono(1000, 0.08, 5).reduce((s, f, k) => s + f / 1.1 ** (k + 1), 0);
    expect(precioBono(1000, 0.08, 0.1, 5)).toBeCloseTo(suma, 6);
  });
});

describe("rendimiento al vencimiento", () => {
  it("recupera la tasa que dio el precio", () => {
    expect(rendimientoAlVencimiento(precioBono(1000, 0.08, 0.1, 5), 1000, 0.08, 5)).toBeCloseTo(0.1, 8);
    expect(rendimientoAlVencimiento(1000, 1000, 0.08, 5)).toBeCloseTo(0.08, 8);
  });
});

describe("duración", () => {
  it("un bono sin cupones dura exactamente su plazo", () => {
    expect(duracionMacaulay(1000, 0, 0.1, 5)).toBeCloseTo(5, 8);
  });

  it("con cupones dura menos que el plazo", () => {
    const d = duracionMacaulay(1000, 0.08, 0.1, 5);
    expect(d).toBeLessThan(5);
    expect(d).toBeCloseTo(4.2814, 3);
  });

  it("la modificada aproxima el cambio de precio ante una subida chica de tasa", () => {
    const p0 = precioBono(1000, 0.08, 0.1, 5);
    const p1 = precioBono(1000, 0.08, 0.1001, 5);
    expect((p1 - p0) / p0).toBeCloseTo(-duracionModificada(1000, 0.08, 0.1, 5) * 0.0001, 6);
  });
});
