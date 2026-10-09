import { describe, expect, it } from "vitest";
import { azarConSemilla } from "../../finanzas/ejercicios";
import { ANCHO_OK, cubre, generarCaso3, nivelDeRango, TAMANO_TANDA } from "./tandas";
import type { TipoDeCaso } from "./reglas-t1";

const media = (xs: readonly number[]) => xs.reduce((a, b) => a + b, 0) / xs.length;
const muestras = (tipo: TipoDeCaso, n = 600) => Array.from({ length: n }, (_, i) => generarCaso3(azarConSemilla(1000 + i), tipo));

describe("generarCaso3 · tandas (Q7) y registro", () => {
  it("determinista", () => {
    expect(generarCaso3(azarConSemilla(5), "P")).toEqual(generarCaso3(azarConSemilla(5), "P"));
  });

  it("3 tandas de 10 con medias de 1 decimal que coinciden con sus valores, y TODAS distintas (Q7)", () => {
    for (const tipo of ["P", "B", "A"] as const) {
      for (const d of muestras(tipo)) {
        expect(d.tandas).toHaveLength(3);
        for (let k = 0; k < 3; k++) {
          expect(d.tandas[k]).toHaveLength(TAMANO_TANDA);
          expect(Math.abs(media(d.tandas[k]) - d.medias[k])).toBeLessThanOrEqual(0.0500001);
          expect(d.medias[k]).toBe(Math.round(d.medias[k] * 10) / 10);
        }
        expect(new Set(d.medias).size).toBe(3);
      }
    }
  });

  it("la media del registro cae en 5,2 a 7,8 h y la de una tanda se mueve ~0,35 h alrededor de ella", () => {
    const m = muestras("B", 1500);
    for (const d of m) {
      expect(d.mu).toBeGreaterThan(5.2);
      expect(d.mu).toBeLessThan(7.8);
    }
    const dif = m.flatMap((d) => d.medias.map((x) => x - d.mu));
    const sd = Math.sqrt(dif.reduce((s, x) => s + x * x, 0) / dif.length);
    expect(sd).toBeGreaterThan(0.3);
    expect(sd).toBeLessThan(0.4);
  });

  it("la cifra del oficio: P a más de 1,0 y hasta 1,6 h de la media; B a 0,15 o menos; A a 0,5 o menos", () => {
    for (const d of muestras("P")) {
      const dist = Math.abs(d.cifra - d.mu);
      expect(dist).toBeGreaterThan(1.0);
      expect(dist).toBeLessThanOrEqual(1.6);
    }
    for (const d of muestras("B")) expect(Math.abs(d.cifra - d.mu)).toBeLessThanOrEqual(0.15 + 1e-9);
    for (const d of muestras("A")) expect(Math.abs(d.cifra - d.mu)).toBeLessThanOrEqual(0.5);
  });

  it("la cifra en P cae a los dos lados de la media", () => {
    const m = muestras("P");
    expect(m.some((d) => d.cifra > d.mu)).toBe(true);
    expect(m.some((d) => d.cifra < d.mu)).toBe(true);
  });
});

describe("cubre y nivelDeRango (02 5.2)", () => {
  it("cubre con holgura de 0,25 h", () => {
    expect(cubre(5.0, 6.0, 6.25)).toBe(true);
    expect(cubre(5.0, 6.0, 6.26)).toBe(false);
    expect(cubre(5.0, 6.0, 4.75)).toBe(true);
    expect(cubre(5.0, 6.0, 4.74)).toBe(false);
  });

  it("el nivel se decide en este orden: noCubre, ancho, ok, flojo", () => {
    expect(nivelDeRango(5, 6, 8)).toBe("noCubre");
    expect(nivelDeRango(5, 6.2, 5.5)).toBe("ok");
    expect(nivelDeRango(5, 6.3, 5.5)).toBe("flojo");
    expect(nivelDeRango(5, 7, 5.5)).toBe("flojo");
    expect(nivelDeRango(5, 7.1, 5.5)).toBe("ancho");
    expect(nivelDeRango(3, 9, 12)).toBe("noCubre"); // un rango ancho que no cubre es noCubre, no ancho
    expect(ANCHO_OK).toBe(1.2);
  });

  it("un rango centrado en la media de 2 tandas con ancho 1,2 cubre casi siempre (≈ 99,9 %, 02 5.2)", () => {
    const m = muestras("B", 3000);
    const cubren = m.filter((d) => cubre(Math.round((((d.medias[0] + d.medias[1]) / 2) - 0.6) * 10) / 10, Math.round((((d.medias[0] + d.medias[1]) / 2) + 0.6) * 10) / 10, d.mu)).length;
    expect(cubren / m.length).toBeGreaterThan(0.995);
  });

  it("el mínimo-máximo de 3 tandas no cubre ≈ 2,5 % de las veces (02 5.2)", () => {
    const m = muestras("B", 4000);
    const no = m.filter((d) => !cubre(Math.min(...d.medias), Math.max(...d.medias), d.mu)).length;
    expect(no / m.length).toBeGreaterThan(0.005);
    expect(no / m.length).toBeLessThan(0.06);
  });
});
