import { describe, expect, it } from "vitest";
import { montoCompuesto, montoSimple, poderDeCompra, tasaEfectivaAnual, tasaReal } from "./interes";

describe("interés simple y compuesto", () => {
  it("simple suma siempre lo mismo", () => {
    expect(montoSimple(10000, 0.1, 3)).toBeCloseTo(13000, 6);
    expect(montoSimple(10000, 0.1, 0)).toBe(10000);
  });

  it("compuesto multiplica sobre lo acumulado", () => {
    expect(montoCompuesto(10000, 0.1, 1)).toBeCloseTo(11000, 6);
    expect(montoCompuesto(10000, 0.1, 2)).toBeCloseTo(12100, 6);
    expect(montoCompuesto(10000, 0.1, 3)).toBeCloseTo(13310, 6);
  });

  it("con un solo período, simple y compuesto coinciden", () => {
    expect(montoCompuesto(5000, 0.08, 1)).toBeCloseTo(montoSimple(5000, 0.08, 1), 6);
  });

  it("capitalizar más seguido da un poco más", () => {
    expect(montoCompuesto(5000, 0.08, 2, 2)).toBeCloseTo(5000 * 1.04 ** 4, 6);
    expect(montoCompuesto(10000, 0.1, 3, 12)).toBeGreaterThan(montoCompuesto(10000, 0.1, 3, 1));
  });
});

describe("tasas", () => {
  it("efectiva de una nominal mensual", () => {
    expect(tasaEfectivaAnual(0.12, 12)).toBeCloseTo(0.12682503, 7);
    expect(tasaEfectivaAnual(0.1, 1)).toBeCloseTo(0.1, 10);
  });

  it("real con la ecuación de Fisher, no restando", () => {
    expect(tasaReal(0.1, 0.05)).toBeCloseTo(0.047619, 6);
    expect(tasaReal(0.05, 0.05)).toBeCloseTo(0, 10);
    expect(tasaReal(0.03, 0.05)).toBeLessThan(0);
  });

  it("el poder de compra coincide con crecer a la tasa real", () => {
    const nominal = montoCompuesto(10000, 0.1, 3);
    expect(poderDeCompra(nominal, 0.05, 3)).toBeCloseTo(montoCompuesto(10000, tasaReal(0.1, 0.05), 3), 6);
  });
});
