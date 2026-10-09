import { describe, expect, it } from "vitest";
import { VERSION_MAXIMA } from "../planta";
import {
  abrirCarpeta,
  abrirPapel,
  carpetaDe,
  carpetasT1,
  estaAbierto,
  fichasRestantes,
  hayClaveAbierto,
  OPCIONES_CASO5,
  puedeAbrir,
  REQUERIDOS_CASO5,
  sacarTanda,
  type Carpeta,
} from "./carpeta";
import { versionT1 } from "./version";

const semillas = Array.from({ length: VERSION_MAXIMA }, (_, i) => i + 1);
const datos = semillas.map((s) => ({ v: versionT1(s), c: carpetasT1(versionT1(s)) }));
const todasLasCarpetas = (c: ReturnType<typeof carpetasT1>): Carpeta[] => [...Object.values(c.porCaso), ...Object.values(c.caso5)];
const ids = (c: Carpeta) => c.papeles.map((p) => p.id);
const frac = (n: number) => n / datos.length;

describe("carpetasT1 · forma (G10)", () => {
  it("determinista: la misma versión da las mismas carpetas, en el mismo orden", () => {
    for (const s of [1, 77, 999]) expect(carpetasT1(versionT1(s))).toEqual(carpetasT1(versionT1(s)));
  });

  it("toda carpeta tiene 6 papeles distintos del fondo de 9 de su caso", () => {
    for (const { c } of datos) {
      for (const carpeta of todasLasCarpetas(c)) {
        expect(carpeta.papeles).toHaveLength(6);
        expect(new Set(ids(carpeta)).size).toBe(6);
        for (const id of ids(carpeta)) expect(id).toMatch(new RegExp(`^C${carpeta.caso}-[1-9]$`));
      }
    }
  });

  it("todo papel clave está dentro; los claves y el refuerzo declarados coinciden con los roles", () => {
    for (const { c } of datos) {
      for (const carpeta of todasLasCarpetas(c)) {
        expect(carpeta.claves.length).toBeGreaterThanOrEqual(1);
        expect(carpeta.claves).toEqual(carpeta.papeles.filter((p) => p.rol === "clave").map((p) => p.id));
      }
    }
  });

  it("el orden de los papeles cambia entre alumnos", () => {
    expect(new Set(datos.map(({ c }) => ids(c.porCaso[3]).join(","))).size).toBeGreaterThan(300);
  });
});

describe("carpetasT1 · caso 1 (paso 1)", () => {
  it("dos de C1-1..C1-3 traen sueño (los claves) y cuatro de los seis señuelos C1-4..C1-9", () => {
    for (const { c } of datos) {
      const c1 = c.porCaso[1];
      expect(c1.claves).toHaveLength(2);
      for (const id of c1.claves) expect(["C1-1", "C1-2", "C1-3"]).toContain(id);
      expect(ids(c1).filter((id) => /C1-[4-9]/.test(id))).toHaveLength(4);
    }
  });

  it("las tres parejas de papeles con sueño aparecen", () => {
    expect(new Set(datos.map(({ c }) => [...c.porCaso[1].claves].sort().join("+"))).size).toBe(3);
  });
});

describe("carpetasT1 · caso 2", () => {
  it("el clave (uno de C2-1..3) y los dos señuelos de la ventana (C2-8, C2-9) entran SIEMPRE", () => {
    for (const { c } of datos) {
      const c2 = c.porCaso[2];
      expect(c2.claves).toHaveLength(1);
      expect(["C2-1", "C2-2", "C2-3"]).toContain(c2.claves[0]);
      expect(ids(c2)).toContain("C2-8");
      expect(ids(c2)).toContain("C2-9");
    }
  });

  it("el refuerzo C2-4 entra en la mitad de las versiones y solo es «refuerzo» en el tipo P", () => {
    const entra = datos.filter(({ c }) => ids(c.porCaso[2]).includes("C2-4"));
    expect(frac(entra.length)).toBeGreaterThan(0.44);
    expect(frac(entra.length)).toBeLessThan(0.56);
    for (const { v, c } of entra) {
      const rol = c.porCaso[2].papeles.find((p) => p.id === "C2-4")!.rol;
      expect(rol).toBe(v.tipos[2] === "P" ? "refuerzo" : "senuelo");
      expect(c.porCaso[2].refuerzo).toBe(v.tipos[2] === "P" ? "C2-4" : null);
    }
    for (const { c } of datos.filter(({ c }) => !ids(c.porCaso[2]).includes("C2-4"))) expect(c.porCaso[2].refuerzo).toBeNull();
  });

  it("los tres claves posibles salen por igual", () => {
    for (const k of ["C2-1", "C2-2", "C2-3"]) {
      const f = frac(datos.filter(({ c }) => c.porCaso[2].claves[0] === k).length);
      expect(f).toBeGreaterThan(0.28);
      expect(f).toBeLessThan(0.39);
    }
  });
});

describe("carpetasT1 · caso 3", () => {
  it("un solo clave, el que sirve al tipo: P entre C3-1 y C3-2, B siempre C3-1, A entre C3-1 y C3-3", () => {
    const vistos = { P: new Set<string>(), B: new Set<string>(), A: new Set<string>() };
    for (const { v, c } of datos) {
      expect(c.porCaso[3].claves).toHaveLength(1);
      vistos[v.tipos[3]].add(c.porCaso[3].claves[0]);
    }
    expect([...vistos.P].sort()).toEqual(["C3-1", "C3-2"]);
    expect([...vistos.B]).toEqual(["C3-1"]);
    expect([...vistos.A].sort()).toEqual(["C3-1", "C3-3"]);
  });
});

describe("carpetasT1 · caso 4", () => {
  it("entran 2 de los 4 papeles que destapan (C4-1..4) y 4 de los 5 banales", () => {
    for (const { c } of datos) {
      const c4 = c.porCaso[4];
      expect(c4.claves).toHaveLength(2);
      for (const id of c4.claves) expect(["C4-1", "C4-2", "C4-3", "C4-4"]).toContain(id);
      expect(ids(c4).filter((id) => /C4-[5-9]/.test(id))).toHaveLength(4);
    }
    expect(new Set(datos.map(({ c }) => [...c.porCaso[4].claves].sort().join("+"))).size).toBe(6);
  });
});

describe("carpetasT1 · caso 5, turno 2 (Q8)", () => {
  it("la carpeta de cada opción trae SIEMPRE lo que esa opción necesita", () => {
    for (const { c } of datos) {
      for (const op of OPCIONES_CASO5) {
        for (const id of REQUERIDOS_CASO5[op]) expect(ids(c.caso5[op])).toContain(id);
        expect([...c.caso5[op].claves].sort()).toEqual([...REQUERIDOS_CASO5[op]].sort());
      }
    }
  });

  it("C5-3 (grupo del sorteo) solo en la opción c; C5-4 (colegio vecino) solo en la a; C5-7 se requiere en la b", () => {
    for (const { c } of datos) {
      expect(ids(c.caso5.a)).not.toContain("C5-3");
      expect(ids(c.caso5.b)).not.toContain("C5-3");
      expect(ids(c.caso5.b)).not.toContain("C5-4");
      expect(ids(c.caso5.c)).not.toContain("C5-4");
    }
  });

  it("carpetaDe exige la opción en el caso 5", () => {
    const { c } = datos[0];
    expect(() => carpetaDe(c, 5)).toThrow();
    expect(carpetaDe(c, 5, "b")).toBe(c.caso5.b);
    expect(carpetaDe(c, 8)).toBe(c.porCaso[8]);
  });
});

describe("carpetasT1 · casos 6, 7 y 8", () => {
  it("caso 6: un solo clave válido para el tipo (P: C6-1|C6-2, B: C6-1, A: C6-1|C6-3)", () => {
    for (const { v, c } of datos) {
      expect(c.porCaso[6].claves).toHaveLength(1);
      const ok = { P: ["C6-1", "C6-2"], B: ["C6-1"], A: ["C6-1", "C6-3"] }[v.tipos[6]];
      expect(ok).toContain(c.porCaso[6].claves[0]);
    }
  });

  it("caso 7: un solo clave entre C7-1, C7-2 y C7-3", () => {
    for (const { c } of datos) {
      expect(c.porCaso[7].claves).toHaveLength(1);
      expect(["C7-1", "C7-2", "C7-3"]).toContain(c.porCaso[7].claves[0]);
    }
  });

  it("caso 8: los dos claves (C8-1, C8-2) siempre y 4 de los 7 señuelos", () => {
    for (const { c } of datos) {
      expect([...c.porCaso[8].claves].sort()).toEqual(["C8-1", "C8-2"]);
      expect(ids(c.porCaso[8]).filter((id) => /C8-[3-9]/.test(id))).toHaveLength(4);
    }
  });
});

describe("carpeta · azar de abrir 3 de 6 (las probabilidades que supone el bucle)", () => {
  const subconjuntos = (n: number, k: number): number[][] => {
    const r: number[][] = [];
    const rec = (ini: number, acc: number[]) => {
      if (acc.length === k) return void r.push(acc);
      for (let i = ini; i < n; i++) rec(i + 1, [...acc, i]);
    };
    rec(0, []);
    return r;
  };
  const probabilidad = (carpeta: Carpeta, cond: (abiertos: string[]) => boolean) => {
    const todos = subconjuntos(6, 3).map((s) => s.map((i) => carpeta.papeles[i].id));
    return todos.filter(cond).length / todos.length;
  };
  const { c } = datos[0];

  it("un clave de 6: 0,50 con 3 fichas y 0,33 con 2", () => {
    expect(probabilidad(c.porCaso[3], (a) => a.includes(c.porCaso[3].claves[0]))).toBeCloseTo(0.5, 10);
    const dos = subconjuntos(6, 2).map((s) => s.map((i) => c.porCaso[3].papeles[i].id));
    expect(dos.filter((a) => a.includes(c.porCaso[3].claves[0])).length / dos.length).toBeCloseTo(1 / 3, 10);
  });

  it("caso 4 (basta uno de dos claves): 0,80 con 3 fichas", () => {
    expect(probabilidad(c.porCaso[4], (a) => c.porCaso[4].claves.some((k) => a.includes(k)))).toBeCloseTo(0.8, 10);
  });

  it("caso 8 (hacen falta los dos): 0,20 con 3 fichas", () => {
    expect(probabilidad(c.porCaso[8], (a) => c.porCaso[8].claves.every((k) => a.includes(k)))).toBeCloseTo(0.2, 10);
  });
});

describe("carpeta · gasto de fichas (G3)", () => {
  const carpeta = datos[0].c.porCaso[3];
  const [p1, p2, p3, p4] = ids(carpeta);

  it("abrir cuesta 1 ficha y reabrir no cuesta", () => {
    let e = abrirCarpeta(carpeta);
    expect(e.fichas).toBe(3);
    expect(fichasRestantes(e)).toBe(3);
    e = abrirPapel(e, p1);
    expect(fichasRestantes(e)).toBe(2);
    expect(abrirPapel(e, p1)).toBe(e);
    expect(fichasRestantes(abrirPapel(e, p1))).toBe(2);
    expect(estaAbierto(e, p1)).toBe(true);
    expect(estaAbierto(e, p2)).toBe(false);
  });

  it("sacar una tanda cuesta 1 ficha; sin fichas no se abre ni se saca nada, pero reabrir sí se puede", () => {
    let e = abrirCarpeta(carpeta);
    e = sacarTanda(abrirPapel(abrirPapel(e, p1), p2));
    expect(fichasRestantes(e)).toBe(0);
    expect(() => abrirPapel(e, p3)).toThrow();
    expect(() => sacarTanda(e)).toThrow();
    expect(puedeAbrir(e, p3)).toBe(false);
    expect(puedeAbrir(e, p1)).toBe(true);
    expect(abrirPapel(e, p2)).toBe(e);
  });

  it("con 2 fichas (castigo) solo se abren 2; un papel que no está en la carpeta no se abre", () => {
    let e = abrirCarpeta(carpeta, 2);
    e = abrirPapel(abrirPapel(e, p1), p2);
    expect(() => abrirPapel(e, p4)).toThrow();
    expect(() => abrirPapel(abrirCarpeta(carpeta), "C3-99")).toThrow();
  });

  it("hayClaveAbierto", () => {
    const e = abrirPapel(abrirCarpeta(carpeta), carpeta.claves[0]);
    expect(hayClaveAbierto(carpeta, abrirCarpeta(carpeta))).toBe(false);
    expect(hayClaveAbierto(carpeta, e)).toBe(true);
  });

  it("el estado es inmutable", () => {
    const e = abrirCarpeta(carpeta);
    abrirPapel(e, p1);
    expect(e.abiertos).toEqual([]);
  });
});
