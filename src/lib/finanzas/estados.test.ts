import { describe, expect, it } from "vitest";
import { cascada, patrimonio, patrimonioFinal, reexpresar } from "./estados";

describe("estados financieros", () => {
  it("reexpresa por lo que subió el índice", () => {
    expect(reexpresar(90_000, 1, 1.15)).toBeCloseTo(103_500, 6);
    expect(reexpresar(120_000, 2, 2.24)).toBeCloseTo(134_400, 6);
    expect(() => reexpresar(1, 0, 1)).toThrow();
  });

  it("baja la cascada con el IUE sobre la utilidad antes de impuestos", () => {
    const c = cascada({ ventas: 600_000, costoDeVentas: 390_000, gastosDeOperacion: 130_000, gastosFinancieros: 20_000 });
    expect(c).toEqual({ utilidadBruta: 210_000, utilidadOperativa: 80_000, utilidadAntesDeImpuestos: 60_000, iue: 15_000, utilidadNeta: 45_000 });
  });

  it("sin utilidad antes de impuestos no hay IUE", () => {
    const c = cascada({ ventas: 100, costoDeVentas: 80, gastosDeOperacion: 30, gastosFinancieros: 0 });
    expect(c.iue).toBe(0);
    expect(c.utilidadNeta).toBe(-10);
  });

  it("ecuación contable y patrimonio final", () => {
    expect(patrimonio(80_000, 58_000)).toBe(22_000);
    expect(patrimonioFinal(300_000, 120_000, 20_000)).toBe(400_000);
  });
});
