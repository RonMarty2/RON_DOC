/**
 * PARIDAD Python ↔ TypeScript de `ramas-t1.ts`: cada estado de `scripts-t1/ramas_t1.py` (exportado por
 * `exportar_ramas_t1.py` a `fixtures/ramas-t1.json`) debe dar la misma rama, la misma clase y el mismo cierre.
 */

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { CANTIDAD_DE_RAMAS, CLASES, RAMAS, cierreDe, claseDe, esAcierto, ramaDe, type EstadoT1 } from "./ramas-t1";

interface Fx {
  ramas: string[];
  cierres: Record<string, string>;
  estados: Array<{ estado: Record<string, string | number | boolean | null>; rama: string; clase: string }>;
}
const fx: Fx = JSON.parse(readFileSync("src/lib/juego/psicoestadistica/fixtures/ramas-t1.json", "utf8"));

/** Del estado de Python (0/1, nombres con guion bajo) al estado del motor. */
function aEstado(s: Fx["estados"][number]["estado"]): EstadoT1 {
  const b = (k: string) => !!s[k];
  switch (s.ficha) {
    case 1:
      return { ficha: 1, abrePropio: b("abre_propio") };
    case 2:
      return { ficha: 2, tipo: s.tipo as "P" | "B", clave: b("clave"), dec: s.dec as never };
    case 3:
      return { ficha: 3, tipo: s.tipo as never, clave: b("clave"), dec: s.dec as never, nivel: s.nivel as never, pieza: b("pieza"), mm3: b("mm3") };
    case 4:
      return { ficha: 4, bueno: s.bueno as never, elige: s.elige as never, clave: b("clave") };
    case 5:
      return { ficha: 5, op: s.op as never, regla: s.regla as string, req: b("req"), cero: b("cero"), rhoPos: b("rhoPos") };
    case 6:
      return { ficha: 6, tipo: s.tipo as never, clave: b("clave"), dec: s.dec as never, ext: s.ext as never, ncorr: b("ncorr") };
    case 7:
      return { ficha: 7, tipo: s.tipo as never, dec: s.dec as never, xok: b("xok") };
    case 8:
      return { ficha: 8, real: s.real as never, dec: s.dec as never, e: s.e as never, beto: s.beto as never };
    default:
      throw new Error(`ficha ${s.ficha}`);
  }
}

describe("ramas de la revelación del Tema 1", () => {
  it("son 72, las mismas y en el mismo orden que el modelo en Python", () => {
    expect(RAMAS).toHaveLength(CANTIDAD_DE_RAMAS);
    expect([...RAMAS]).toEqual(fx.ramas);
    expect(new Set(RAMAS).size).toBe(CANTIDAD_DE_RAMAS);
  });

  it("cada estado del modelo cae en la misma rama y la misma clase", () => {
    expect(fx.estados.length).toBeGreaterThan(400);
    const malas: string[] = [];
    for (const f of fx.estados) {
      const s = aEstado(f.estado);
      const rama = ramaDe(s);
      const clase = claseDe(s);
      if (rama !== f.rama || clase !== f.clase) malas.push(`${JSON.stringify(f.estado)} → ${rama}/${clase}, esperado ${f.rama}/${f.clase}`);
    }
    expect(malas).toEqual([]);
  });

  it("todas las ramas se alcanzan y cada una es de su ficha", () => {
    const vistas = new Set(fx.estados.map((f) => ramaDe(aEstado(f.estado))));
    expect([...vistas].sort()).toEqual([...RAMAS].sort());
    for (const f of fx.estados) expect(ramaDe(aEstado(f.estado))[1]).toBe(String(f.estado.ficha));
  });

  it("el cierre de cada rama es el del modelo", () => {
    for (const r of RAMAS) expect(cierreDe(r)).toBe(fx.cierres[r]);
    expect(() => cierreDe("F9a")).toThrow();
  });

  it("las clases son las cinco de 04 T1.5a y solo el paso 1 da «con pista»", () => {
    expect(CLASES).toHaveLength(5);
    for (const f of fx.estados) {
      const c = claseDe(aEstado(f.estado));
      expect(CLASES).toContain(c);
      if (c === "descubrió con pista") expect(f.estado.ficha).toBe(1);
    }
    expect(esAcierto("acierto sin evidencia")).toBe(true);
    expect(esAcierto("sobrecorrigió")).toBe(false);
    expect(esAcierto("se dejó engañar")).toBe(false);
  });

  it("un estado mal armado lanza en vez de inventar una rama", () => {
    expect(() => ramaDe({ ficha: 3, tipo: "P", clave: true, dec: "rango", nivel: null, pieza: false, mm3: false })).toThrow();
    expect(() => ramaDe({ ficha: 6, tipo: "P", clave: true, dec: "redactar", ext: null, ncorr: true })).toThrow();
    expect(() => ramaDe({ ficha: 5, op: "c", regla: "R5.7", req: true, cero: false, rhoPos: false })).toThrow();
    expect(() => ramaDe({ ficha: 5, op: "a", regla: "R5.1", req: true, cero: false, rhoPos: false })).toThrow();
  });
});
