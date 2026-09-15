import katex from "katex";
import { describe, expect, it } from "vitest";
import { parsearMath } from "../../components/math-parse";
import {
  azarConSemilla,
  ejercicioAmortizacion,
  ejercicioAnualidades,
  ejercicioBonos,
  ejercicioDepreciaciones,
  ejercicioInteresCompuesto,
  type Azar,
  type Ejercicio,
} from "./ejercicios";

const GENERADORES: [string, (azar: Azar) => Ejercicio][] = [
  ["interés compuesto", ejercicioInteresCompuesto],
  ["anualidades", ejercicioAnualidades],
  ["amortización", ejercicioAmortizacion],
  ["bonos", ejercicioBonos],
  ["depreciaciones", ejercicioDepreciaciones],
];

const SEMILLAS = 400;

function formulas(texto: string): string[] {
  return parsearMath(texto).filter((s) => s.tipo === "inline" || s.tipo === "display").map((s) => s.contenido);
}

describe.each(GENERADORES)("%s", (_, generar) => {
  const ejercicios = Array.from({ length: SEMILLAS }, (_, k) => generar(azarConSemilla(k + 1)));

  it("siempre trae 4 opciones distintas y una sola correcta", () => {
    for (const e of ejercicios) {
      expect(e.opciones).toHaveLength(4);
      expect(new Set(e.opciones).size).toBe(4);
      expect(e.correcta).toBeGreaterThanOrEqual(0);
      expect(e.correcta).toBeLessThan(4);
    }
  });

  it("nunca muestra NaN, Infinity ni decimales sueltos de coma flotante", () => {
    for (const e of ejercicios) {
      const todo = [e.pregunta, e.explicacion, ...e.opciones].join(" ");
      expect(todo).not.toMatch(/NaN|Infinity|undefined|\d{6,}/);
    }
  });

  it("la explicación nombra el resultado de la opción correcta", () => {
    for (const e of ejercicios) {
      const numero = e.opciones[e.correcta].replace(/^Bs /, "");
      if (!/\d/.test(numero)) continue;
      const enTex = numero.replace(/,/g, "{,}").replace(/%/g, "\\%");
      expect(e.explicacion.includes(numero) || e.explicacion.includes(enTex)).toBe(true);
    }
  });

  it("todas las fórmulas se dibujan sin error de KaTeX", () => {
    for (const e of ejercicios) {
      for (const f of [e.pregunta, e.explicacion, ...e.opciones].flatMap(formulas)) {
        expect(() => katex.renderToString(f, { throwOnError: true, strict: "ignore" })).not.toThrow();
      }
    }
  });

  it("la correcta no queda siempre en el mismo lugar", () => {
    expect(new Set(ejercicios.map((e) => e.correcta)).size).toBe(4);
  });

  it("con la misma semilla sale el mismo ejercicio", () => {
    expect(generar(azarConSemilla(7))).toEqual(generar(azarConSemilla(7)));
  });
});
