import { describe, expect, it } from "vitest";
import { calcularDepreciacionAnual } from "../simpro/calculo-financiero";
import { depositoFondo, tablaDepreciacion, tasaPorcentajeFijo, type MetodoDepreciacion } from "./depreciacion";

const METODOS: MetodoDepreciacion[] = ["lineal", "sumaDigitos", "porcentajeFijo", "fondo"];

describe("todos los métodos", () => {
  it.each(METODOS)("%s termina en el valor de salvamento", (metodo) => {
    const tabla = tablaDepreciacion(50000, 5000, 5, metodo, 0.08);
    expect(tabla).toHaveLength(5);
    expect(tabla[4].valorLibros).toBeCloseTo(5000, 6);
    expect(tabla[4].acumulada).toBeCloseTo(45000, 6);
  });
});

describe("lineal", () => {
  it("es el cálculo del motor de SIMPRO sobre la base depreciable", () => {
    const tabla = tablaDepreciacion(50000, 5000, 5, "lineal");
    expect(tabla.every((f) => f.depreciacion === calcularDepreciacionAnual(45000, 5))).toBe(true);
    expect(tabla[0].depreciacion).toBe(9000);
  });
});

describe("suma de dígitos", () => {
  it("reparte 5/15, 4/15, … de la base", () => {
    expect(tablaDepreciacion(50000, 5000, 5, "sumaDigitos").map((f) => f.depreciacion)).toEqual([15000, 12000, 9000, 6000, 3000]);
    expect(tablaDepreciacion(80000, 8000, 4, "sumaDigitos")[1].depreciacion).toBeCloseTo(21600, 6);
  });
});

describe("porcentaje fijo", () => {
  it("la tasa lleva el costo al salvamento", () => {
    const d = tasaPorcentajeFijo(50000, 5000, 5);
    expect(d).toBeCloseTo(0.369043, 6);
    expect(50000 * (1 - d) ** 5).toBeCloseTo(5000, 6);
  });

  it("deprecia más el primer año que el lineal", () => {
    expect(tablaDepreciacion(50000, 5000, 5, "porcentajeFijo")[0].depreciacion).toBeGreaterThan(9000);
  });
});

describe("fondo de amortización", () => {
  it("el depósito con su interés junta la base al final", () => {
    expect(depositoFondo(50000, 5000, 5, 0.08)).toBeCloseTo(7670.54, 2);
  });

  it("la depreciación crece: depósito más el interés del fondo", () => {
    const t = tablaDepreciacion(50000, 5000, 5, "fondo", 0.08);
    expect(t[1].depreciacion).toBeCloseTo(t[0].depreciacion * 1.08, 6);
  });

  it("sin interés es el lineal", () => {
    expect(tablaDepreciacion(50000, 5000, 5, "fondo", 0)[0].depreciacion).toBeCloseTo(9000, 6);
  });
});
