import { describe, expect, it } from "vitest";
import { azarConSemilla } from "../../finanzas/ejercicios";
import { CUPOS, ESTUDIANTES, generarCaso5, invariantesQueFallan, SESGO_ANOTADOS, type Caso5Datos } from "./bienestar";

const N = 500;
const hojas: Caso5Datos[] = Array.from({ length: N }, (_, i) => generarCaso5(azarConSemilla(7000 + i), i % 2 === 0 ? 0 : 3));
const d = (x: number) => Math.round(x * 10);

describe("generarCaso5 · la hoja", () => {
  it("determinista", () => {
    expect(generarCaso5(azarConSemilla(3), 0)).toEqual(generarCaso5(azarConSemilla(3), 0));
    expect(generarCaso5(azarConSemilla(3), 0)).not.toEqual(generarCaso5(azarConSemilla(4), 0));
  });

  it("60 puntajes enteros de 0 a 100; el orden de anotación es una permutación de los 60", () => {
    for (const h of hojas) {
      expect(h.puntajes).toHaveLength(ESTUDIANTES);
      for (const p of h.puntajes) {
        expect(Number.isInteger(p)).toBe(true);
        expect(p).toBeGreaterThanOrEqual(0);
        expect(p).toBeLessThanOrEqual(100);
      }
      expect([...h.ordenAnotacion].sort((a, b) => a - b)).toEqual(Array.from({ length: ESTUDIANTES }, (_, i) => i));
    }
  });

  it("los llamados son 13 en las tres opciones: (a) los de peor puntaje, (b) los 13 primeros en anotarse, (c) 13 de los 26 peores", () => {
    for (const h of hojas) {
      const { a, b, c } = h.opciones;
      const ordenados = h.puntajes.map((p, i) => [p, i] as const).sort((x, y) => x[0] - y[0] || x[1] - y[1]).map(([, i]) => i);
      expect(a.llamados).toHaveLength(CUPOS);
      expect([...a.llamados].sort((x, y) => x - y)).toEqual(ordenados.slice(0, CUPOS).sort((x, y) => x - y));
      expect(b.llamados).toEqual(h.ordenAnotacion.slice(0, CUPOS));
      expect(c.llamados).toHaveLength(CUPOS);
      expect(c.indicesGrupo).toHaveLength(CUPOS);
      const peores26 = new Set(ordenados.slice(0, 2 * CUPOS));
      for (const i of [...c.llamados, ...c.indicesGrupo!]) expect(peores26.has(i)).toBe(true);
      expect(new Set([...c.llamados, ...c.indicesGrupo!]).size).toBe(2 * CUPOS);
    }
  });
});

describe("generarCaso5 · invariantes I1 a I5 y Q1 a Q5 en TODAS las hojas", () => {
  it("invariantesQueFallan es vacío", () => {
    for (const h of hojas) expect(invariantesQueFallan(h.opciones)).toEqual([]);
  });

  it("I2/Q4: el vecino sube al menos 4 en (a); solo (a) trae vecino; solo (c) trae grupo", () => {
    for (const h of hojas) {
      const v = h.opciones.a.vecino!;
      expect(d(v.despues) - d(v.antes)).toBeGreaterThanOrEqual(40);
      expect(h.opciones.b.vecino).toBeNull();
      expect(h.opciones.c.vecino).toBeNull();
      expect(h.opciones.a.grupo).toBeNull();
      expect(h.opciones.b.grupo).toBeNull();
      expect(h.opciones.c.grupo).not.toBeNull();
    }
  });

  it("Q1: los llamados subieron (≥ 1) en las tres opciones", () => {
    for (const h of hojas) for (const op of ["a", "b", "c"] as const) expect(h.opciones[op].bruta).toBeGreaterThanOrEqual(1);
  });

  it("Q3: en (c) el grupo del sorteo subió (≥ 1)", () => {
    for (const h of hojas) {
      const g = h.opciones.c.grupo!;
      expect(d(g.despues) - d(g.antes)).toBeGreaterThanOrEqual(10);
    }
  });

  it("I5: ρ entre −4 y +10", () => {
    for (const h of hojas) for (const op of ["a", "b", "c"] as const) {
      expect(h.opciones[op].rho).toBeGreaterThanOrEqual(-4);
      expect(h.opciones[op].rho).toBeLessThanOrEqual(10);
    }
  });

  it("I4: las bandas ±1,0 de ρ, de la subida bruta y de la inflada no se tocan (distancia > 2,0)", () => {
    for (const h of hojas) for (const op of ["a", "b", "c"] as const) {
      const o = h.opciones[op];
      expect(Math.abs(d(o.bruta) - d(o.rho))).toBeGreaterThan(20);
      if (o.inflada !== null) expect(Math.abs(d(o.inflada) - d(o.rho))).toBeGreaterThan(20);
    }
  });

  it("Q2: en (a) y (b) la inflada queda por encima de ρ + 1 («tu número habría sido menor»); en (c) no hay inflada", () => {
    for (const h of hojas) {
      for (const op of ["a", "b"] as const) expect(h.opciones[op].inflada! - h.opciones[op].rho).toBeGreaterThan(1);
      expect(h.opciones.c.inflada).toBeNull();
    }
  });

  it("Q5: en (b) la cuenta bien hecha es Δ_taller − Δ_demás − 2,5, y el sesgo que dice el informe es 2,5", () => {
    expect(SESGO_ANOTADOS).toBe(2.5);
    for (const h of hojas) {
      const o = h.opciones.b;
      expect(d(o.rho)).toBe(d(o.bruta) - (d(o.demas.despues) - d(o.demas.antes)) - 25);
      expect(d(o.inflada!) - d(o.rho)).toBe(25);
    }
  });

  it("ρ se calcula con los números que se muestran: (a) contra el vecino, (c) contra el grupo", () => {
    for (const h of hojas) {
      const a = h.opciones.a;
      expect(d(a.rho)).toBe(d(a.medias.despues) - d(a.medias.antes) - (d(a.vecino!.despues) - d(a.vecino!.antes)));
      const c = h.opciones.c;
      expect(d(c.rho)).toBe(d(c.medias.despues) - d(c.medias.antes) - (d(c.grupo!.despues) - d(c.grupo!.antes)));
    }
  });
});

describe("generarCaso5 · cómo queda ρ", () => {
  const rhos = (delta: 0 | 3, op: "a" | "b" | "c") => hojas.filter((h) => h.delta === delta).map((h) => h.opciones[op].rho);
  const mediaDe = (xs: number[]) => xs.reduce((s, x) => s + x, 0) / xs.length;

  it("con taller (δ = 3) ρ queda en promedio más alto que sin taller (δ = 0), en las tres opciones", () => {
    for (const op of ["a", "b", "c"] as const) expect(mediaDe(rhos(3, op))).toBeGreaterThan(mediaDe(rhos(0, op)) + 1);
  });

  it("«escribir 0» vale solo en una parte de las versiones (la v2 cuenta ≈ 22 % con δ = 0 y ≈ 16 % con δ = 3)", () => {
    for (const delta of [0, 3] as const) for (const op of ["a", "b", "c"] as const) {
      const r = rhos(delta, op);
      const f = r.filter((x) => Math.abs(x) <= 1).length / r.length;
      expect(f).toBeGreaterThan(0.1);
      expect(f).toBeLessThan(0.4);
    }
  });

  it("hay variedad: ρ toma valores positivos, negativos y cerca de cero", () => {
    const r = rhos(0, "c").concat(rhos(3, "c"));
    expect(r.some((x) => x < -1)).toBe(true);
    expect(r.some((x) => x > 1)).toBe(true);
    expect(r.some((x) => Math.abs(x) <= 1)).toBe(true);
  });

  it("no hacen falta muchos intentos para armar una hoja", () => {
    expect(Math.max(...hojas.map((h) => h.intentos))).toBeLessThan(200);
    expect(hojas.reduce((s, h) => s + h.intentos, 0) / N).toBeLessThan(10);
  });
});
