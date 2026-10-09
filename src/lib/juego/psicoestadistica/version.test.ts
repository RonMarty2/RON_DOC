import { describe, expect, it } from "vitest";
import { VERSION_MAXIMA } from "../planta";
import { versionDeAlumno } from "../version-alumno";
import { problemasDeTexto } from "../../revision";
import {
  barajar,
  POOL_COLEGIOS,
  POOL_DANI,
  POOL_FUENTES,
  POOL_TALLERES,
  POOL_VECINOS,
  semillaDeAlumno,
  versionT1,
  versionT1DeAlumno,
} from "./version";

const semillas = Array.from({ length: VERSION_MAXIMA }, (_, i) => i + 1);
const versiones = semillas.map((s) => versionT1(s));

describe("versionT1 · determinismo", () => {
  it("la misma semilla da exactamente la misma versión", () => {
    for (const s of [1, 2, 50, 999]) expect(versionT1(s)).toEqual(versionT1(s));
  });

  it("la semilla del alumno usa su propia escena y no la de Proyectos II", () => {
    const id = "3f2504e0-4f89-11d3-9a0c-0305e82c3301";
    expect(semillaDeAlumno(id)).toBe(versionDeAlumno(id, "psicoestadistica:1"));
    expect(semillaDeAlumno(id)).toBe(semillaDeAlumno(id.toUpperCase()));
    expect(versionT1DeAlumno(id)).toEqual(versionT1(semillaDeAlumno(id)));
  });

  it("rechaza semillas que no son enteros no negativos", () => {
    expect(() => versionT1(-1)).toThrow();
    expect(() => versionT1(1.5)).toThrow();
    expect(() => versionT1(Number.NaN)).toThrow();
  });
});

describe("versionT1 · tipos (G7)", () => {
  it("cumple las reglas de las 10 tiradas: al menos un B, al menos un P, a lo más un A, caso 7 nunca A", () => {
    for (const v of versiones) {
      const t = [v.tipos[3], v.tipos[6], v.tipos[7]];
      expect(t).toContain("B");
      expect(t).toContain("P");
      expect(t.filter((x) => x === "A").length).toBeLessThanOrEqual(1);
      expect(v.tipos[7]).not.toBe("A");
      expect(["P", "B"]).toContain(v.tipos[2]);
    }
  });

  it("reparte los tipos como pide el bucle (caso 3 P 4, B 4, A 2 de 10; caso 7 P 5, B 5; caso 2 B en 1 de 3)", () => {
    const n = versiones.length;
    const frac = (f: (v: (typeof versiones)[number]) => boolean) => versiones.filter(f).length / n;
    expect(frac((v) => v.tipos[2] === "B")).toBeGreaterThan(0.28);
    expect(frac((v) => v.tipos[2] === "B")).toBeLessThan(0.38);
    expect(frac((v) => v.tipos[3] === "P")).toBeGreaterThan(0.34);
    expect(frac((v) => v.tipos[3] === "P")).toBeLessThan(0.46);
    expect(frac((v) => v.tipos[3] === "A")).toBeGreaterThan(0.14);
    expect(frac((v) => v.tipos[3] === "A")).toBeLessThan(0.26);
    expect(frac((v) => v.tipos[7] === "P")).toBeGreaterThan(0.44);
    expect(frac((v) => v.tipos[7] === "P")).toBeLessThan(0.56);
    expect(frac((v) => v.buenoEsA)).toBeGreaterThan(0.44);
    expect(frac((v) => v.buenoEsA)).toBeLessThan(0.56);
    expect(frac((v) => v.efectoReal === 3)).toBeGreaterThan(0.44);
    expect(frac((v) => v.efectoReal === 3)).toBeLessThan(0.56);
    for (const d of [0, 1, 2]) {
      expect(frac((v) => v.decisionReal === d)).toBeGreaterThan(0.28);
      expect(frac((v) => v.decisionReal === d)).toBeLessThan(0.39);
    }
  });

  it("Beto acierta en 1 de cada 3 versiones", () => {
    const acierta = versiones.filter((v) => v.propuestaDeBeto === v.decisionReal).length / versiones.length;
    expect(acierta).toBeGreaterThan(0.28);
    expect(acierta).toBeLessThan(0.39);
  });

  it("hay variedad: las 10 tiradas y los dos tipos del caso 2 aparecen", () => {
    const tiradas = new Set(versiones.map((v) => `${v.tipos[3]}${v.tipos[6]}${v.tipos[7]}`));
    expect(tiradas.size).toBe(10);
  });
});

describe("versionT1 · orden (G8)", () => {
  it("paso 1, caso 2 y caso 8 fijos; los casos 3 a 7 en una permutación", () => {
    for (const v of versiones) {
      expect(v.orden).toHaveLength(8);
      expect(v.orden.slice(0, 2)).toEqual([1, 2]);
      expect(v.orden[7]).toBe(8);
      expect([...v.orden.slice(2, 7)].sort()).toEqual([3, 4, 5, 6, 7]);
    }
  });

  it("el orden cambia entre alumnos (muchas de las 120 permutaciones aparecen)", () => {
    const distintos = new Set(versiones.map((v) => v.orden.join(",")));
    expect(distintos.size).toBeGreaterThanOrEqual(100);
  });
});

describe("versionT1 · pools de nombres (NT1.4)", () => {
  it("cada nombre sale de su pool; las fuentes de los casos 3, 6 y 7 son distintas; los dos talleres, también", () => {
    for (const v of versiones) {
      const t = v.textos;
      expect(POOL_COLEGIOS).toContain(t.colegio);
      expect(POOL_VECINOS).toContain(t.vecino);
      expect(POOL_DANI).toContain(t.dani);
      expect(new Set(Object.values(t.fuentes)).size).toBe(3);
      for (const f of Object.values(t.fuentes)) expect(POOL_FUENTES).toContain(f);
      expect(t.talleres[0]).not.toBe(t.talleres[1]);
      for (const x of t.talleres) expect(POOL_TALLERES).toContain(x);
    }
  });

  it("los cuatro nombres de cada pool aparecen; ninguna fuente queda ligada a un caso", () => {
    expect(new Set(versiones.map((v) => v.textos.colegio)).size).toBe(4);
    expect(new Set(versiones.map((v) => v.textos.dani)).size).toBe(4);
    for (const caso of [3, 6, 7] as const) expect(new Set(versiones.map((v) => v.textos.fuentes[caso])).size).toBe(4);
  });

  it("los nombres no traen voseo ni guiones largos", () => {
    const todo = [...POOL_COLEGIOS, ...POOL_VECINOS, ...POOL_FUENTES, ...POOL_DANI, ...POOL_TALLERES].join(" · ");
    expect(problemasDeTexto("pools", todo)).toEqual([]);
  });
});

describe("rubros independientes (G9)", () => {
  it("cambiar el orden de la lista barajada de un rubro no toca los tipos de otro", () => {
    // Los tipos salen del rubro k=1 y el orden del k=2: dos semillas con el mismo tipo pueden tener otro orden.
    const porTipos = new Map<string, Set<string>>();
    for (const v of versiones) {
      const clave = JSON.stringify(v.tipos) + v.buenoEsA + v.efectoReal + v.decisionReal;
      porTipos.set(clave, (porTipos.get(clave) ?? new Set()).add(v.orden.join(",")));
    }
    expect([...porTipos.values()].some((s) => s.size > 1)).toBe(true);
  });

  it("barajar no pierde ni repite elementos", () => {
    let i = 0;
    const azar = () => ((i = (i + 0.37) % 1), i);
    expect(barajar(azar, [1, 2, 3, 4, 5]).sort()).toEqual([1, 2, 3, 4, 5]);
  });
});
