import { describe, expect, it } from "vitest";
import { VERSION_MAXIMA } from "../planta";
import { CODIGOS } from "./efectos-t1";
import { paqueteT1, type PaqueteT1 } from "./cifras";
import {
  habitosCumplidos,
  PRIORIDAD_SOBRE,
  reglaDelTurno2,
  resolverCaso2,
  resolverCaso3,
  resolverCaso4,
  resolverCaso5,
  resolverCaso5Turno1,
  resolverCaso5Turno2,
  resolverCaso6,
  resolverCaso7,
  resolverCaso8,
  resolverPaso1,
  sobreDe,
} from "./respuestas";

const todos: PaqueteT1[] = Array.from({ length: VERSION_MAXIMA }, (_, i) => paqueteT1(i + 1));
const buscar = (pred: (p: PaqueteT1) => boolean, desde = 0): PaqueteT1 => {
  const p = todos.slice(desde).find(pred);
  if (!p) throw new Error("No hay versión con esa condición");
  return p;
};
const ef = (c: number, voz: number) => ({ c, voz });
const r1 = (x: number) => Math.round(x * 10) / 10;

describe("paso 1", () => {
  it("S-P1 si no abrió ninguno de los 2 papeles con sueño; si abrió uno, sin sobre", () => {
    const p = todos[0];
    const c1 = p.carpetas.porCaso[1];
    const sin = c1.papeles.filter((q) => !c1.claves.includes(q.id)).map((q) => q.id);
    expect(resolverPaso1(p, { abiertos: sin.slice(0, 3) })).toEqual({ abrioSueno: false, sobre: "S-P1" });
    expect(resolverPaso1(p, { abiertos: [...sin.slice(0, 2), c1.claves[1]] })).toEqual({ abrioSueno: true, sobre: null });
    expect(() => resolverPaso1(p, { abiertos: ["C9-9"] })).toThrow();
  });
});

describe("caso 2", () => {
  const P = buscar((p) => p.version.tipos[2] === "P");
  const B = buscar((p) => p.version.tipos[2] === "B");

  it("tipo P: tal cual −20/+10 con E2a; frenar +3/−8 (E2b si el clave estaba cerrado); frase sin pieza −8/+4 con E2c; frase con pieza +8/+4", () => {
    const clave = P.carpetas.porCaso[2].claves[0];
    const tal = resolverCaso2(P, { abiertos: [], decision: "tal" });
    expect(tal.efecto).toEqual(ef(-20, 10));
    expect(tal.codigos).toEqual(["E2a"]);
    expect(tal.sobre).toBe("S-E2a");
    expect(tal.habitos.sort()).toEqual(["H1", "H2"]);
    const frenarCerrado = resolverCaso2(P, { abiertos: [], decision: "frenar" });
    expect(frenarCerrado.efecto).toEqual(ef(3, -8));
    expect(frenarCerrado.codigos).toEqual(["E2b"]);
    const frenarAbierto = resolverCaso2(P, { abiertos: [clave], decision: "frenar" });
    expect(frenarAbierto.efecto).toEqual(ef(3, -8));
    expect(frenarAbierto.codigos).toEqual([]); // hueco declarado: sin código
    const sinPieza = resolverCaso2(P, { abiertos: [clave], decision: "frase", piezaClave: false });
    expect(sinPieza.efecto).toEqual(ef(-8, 4));
    expect(sinPieza.codigos).toEqual(["E2c"]);
    const conPieza = resolverCaso2(P, { abiertos: [clave], decision: "frase", piezaClave: true });
    expect(conPieza.efecto).toEqual(ef(8, 4));
    expect(conPieza.codigos).toEqual([]);
    expect(conPieza.sobre).toBeNull();
  });

  it("tipo B: tal cual con el clave +10/+10, sin abrirlo +5/+5 (sin evidencia); frenar 0/−15 con E2d; frase con pieza +10/+10", () => {
    const clave = B.carpetas.porCaso[2].claves[0];
    expect(resolverCaso2(B, { abiertos: [clave], decision: "tal" }).efecto).toEqual(ef(10, 10));
    const sin = resolverCaso2(B, { abiertos: [], decision: "tal" });
    expect(sin.efecto).toEqual(ef(5, 5));
    expect(sin.sinEvidencia).toBe(true);
    const fr = resolverCaso2(B, { abiertos: [], decision: "frenar" });
    expect(fr.efecto).toEqual(ef(0, -15));
    expect(fr.codigos).toEqual(["E2d"]);
    expect(resolverCaso2(B, { abiertos: [clave], decision: "frase", piezaClave: true }).efecto).toEqual(ef(10, 10));
    expect(resolverCaso2(B, { abiertos: [clave], decision: "frase" }).efecto).toEqual(ef(0, 4));
  });

  it("el refuerzo sube la frase a +10/+4 en P, solo si entró a la carpeta y lo abrió", () => {
    const conRef = buscar((p) => p.version.tipos[2] === "P" && p.carpetas.porCaso[2].refuerzo !== null);
    const clave = conRef.carpetas.porCaso[2].claves[0];
    const r = resolverCaso2(conRef, { abiertos: [clave, "C2-4"], decision: "frase", piezaClave: true, piezaRefuerzo: true });
    expect(r.efecto).toEqual(ef(10, 4));
    expect(resolverCaso2(conRef, { abiertos: [clave, "C2-4"], decision: "frase", piezaClave: true }).efecto).toEqual(ef(8, 4));
    expect(() => resolverCaso2(conRef, { abiertos: [clave], decision: "frase", piezaClave: true, piezaRefuerzo: true })).toThrow();
  });

  it("una pieza sin su papel abierto es un error de programación", () => {
    expect(() => resolverCaso2(P, { abiertos: [], decision: "frase", piezaClave: true })).toThrow();
  });
});

describe("caso 3", () => {
  const con = (tipo: "P" | "B" | "A") => buscar((p) => p.version.tipos[3] === tipo);
  const rango = (p: PaqueteT1, ancho: number, desplazo = 0) => {
    const a = r1(p.cifras.caso3.mu - ancho / 2 + desplazo);
    return { a, b: r1(a + ancho) };
  };

  it("tal cual: P −20/+10 (E3a con ≤ 1 tanda), B +5/+5 sin la ficha y +10/+10 con ella, A −20/+10", () => {
    const P = con("P");
    expect(resolverCaso3(P, { abiertos: [], tandas: 1, decision: "tal" }).codigos).toEqual(["E3a"]);
    expect(resolverCaso3(P, { abiertos: [], tandas: 2, decision: "tal" }).codigos).toEqual([]); // hueco declarado
    expect(resolverCaso3(P, { abiertos: [], tandas: 2, decision: "tal" }).efecto).toEqual(ef(-20, 10));
    const B = con("B");
    const sin = resolverCaso3(B, { abiertos: [], tandas: 0, decision: "tal" });
    expect(sin.efecto).toEqual(ef(5, 5));
    expect(sin.sinEvidencia).toBe(true);
    expect(sin.codigos).toEqual([]);
    expect(resolverCaso3(B, { abiertos: [B.carpetas.porCaso[3].claves[0]], tandas: 0, decision: "tal" }).efecto).toEqual(ef(10, 10));
    expect(resolverCaso3(con("A"), { abiertos: [], tandas: 1, decision: "tal" }).efecto).toEqual(ef(-20, 10));
  });

  it("frenar: P +6/−8, B 0/−15 (E3d), A 0/−10", () => {
    expect(resolverCaso3(con("P"), { abiertos: [], tandas: 0, decision: "frenar" }).efecto).toEqual(ef(6, -8));
    const b = resolverCaso3(con("B"), { abiertos: [], tandas: 0, decision: "frenar" });
    expect(b.efecto).toEqual(ef(0, -15));
    expect(b.codigos).toEqual(["E3d"]);
    expect(resolverCaso3(con("A"), { abiertos: [], tandas: 0, decision: "frenar" }).efecto).toEqual(ef(0, -10));
  });

  it("rango ok con la pieza paga entero (P +8/+4, B 0/+4, A +8/+4); sin la pieza rinde como flojo y deja E3f (P, B) o E3e (A)", () => {
    const P = con("P");
    const claveP = P.carpetas.porCaso[3].claves[0];
    const { a, b } = rango(P, 1.0);
    const bien = resolverCaso3(P, { abiertos: [claveP], tandas: 2, decision: "rango", a, b, piezaClave: true });
    expect(bien.efecto).toEqual(ef(8, 4));
    expect(bien.codigos).toEqual([]);
    expect(bien.detalle.nivel).toBe("ok");
    const sinPieza = resolverCaso3(P, { abiertos: [claveP], tandas: 2, decision: "rango", a, b });
    expect(sinPieza.efecto).toEqual(ef(3, 0));
    expect(sinPieza.codigos).toEqual(["E3f"]);
    expect(sinPieza.habitos).toEqual([]); // E3f no cuenta para H1 con el clave abierto
    const cerrado = resolverCaso3(P, { abiertos: [], tandas: 2, decision: "rango", a, b });
    expect(cerrado.habitos).toEqual(["H1"]);
    expect(cerrado.sinEvidencia).toBe(true);

    const B = con("B");
    const rb = rango(B, 1.0);
    expect(resolverCaso3(B, { abiertos: [B.carpetas.porCaso[3].claves[0]], tandas: 2, decision: "rango", ...rb, piezaClave: true }).efecto).toEqual(ef(0, 4));
    expect(resolverCaso3(B, { abiertos: [], tandas: 2, decision: "rango", ...rb }).efecto).toEqual(ef(0, 2));

    const A = con("A");
    const ra = rango(A, 1.0);
    const sinA = resolverCaso3(A, { abiertos: [], tandas: 2, decision: "rango", ...ra });
    expect(sinA.efecto).toEqual(ef(-8, 4));
    expect(sinA.codigos).toEqual(["E3e"]);
    expect(resolverCaso3(A, { abiertos: [A.carpetas.porCaso[3].claves[0]], tandas: 2, decision: "rango", ...ra, piezaClave: true }).efecto).toEqual(ef(8, 4));
  });

  it("rango flojo (1,2 a 2,0 h) con pieza en A: +3/0; ancho (> 2,0 h): 0/−2 con E3c; no cubre: −10/+4 con E3b", () => {
    const A = con("A");
    const clave = A.carpetas.porCaso[3].claves[0];
    const flojo = rango(A, 1.6);
    expect(resolverCaso3(A, { abiertos: [clave], tandas: 2, decision: "rango", ...flojo, piezaClave: true }).efecto).toEqual(ef(3, 0));
    const ancho = rango(A, 2.4);
    const rA = resolverCaso3(A, { abiertos: [], tandas: 2, decision: "rango", ...ancho });
    expect(rA.efecto).toEqual(ef(0, -2));
    expect(rA.codigos).toEqual(["E3c"]);
    const lejos = { a: r1(A.cifras.caso3.mu + 3), b: r1(A.cifras.caso3.mu + 4) };
    const nc = resolverCaso3(A, { abiertos: [], tandas: 2, decision: "rango", ...lejos });
    expect(nc.efecto).toEqual(ef(-10, 4));
    expect(nc.codigos).toEqual(["E3b"]);
  });

  it("razonoBienNoCubrio: el mínimo-máximo de las 3 tandas que no cubre", () => {
    const p = buscar((q) => {
      const m = q.cifras.caso3.medias;
      return Math.min(...m) - 0.25 > q.cifras.caso3.mu || Math.max(...m) + 0.25 < q.cifras.caso3.mu;
    });
    const m = p.cifras.caso3.medias;
    const r = resolverCaso3(p, { abiertos: [], tandas: 3, decision: "rango", a: Math.min(...m), b: Math.max(...m) });
    expect(r.codigos).toContain("E3b");
    expect(r.detalle.razonoBienNoCubrio).toBe(true);
    const otro = resolverCaso3(p, { abiertos: [], tandas: 3, decision: "rango", a: Math.min(...m) - 0.1, b: Math.max(...m) });
    expect(otro.detalle.razonoBienNoCubrio).toBe(false);
  });

  it("la puerta del rango: con menos de 2 tandas no se redacta; a ≤ b; la pieza pide el clave abierto", () => {
    const p = con("P");
    expect(() => resolverCaso3(p, { abiertos: [], tandas: 1, decision: "rango", a: 5, b: 6 })).toThrow();
    expect(() => resolverCaso3(p, { abiertos: [], tandas: 2, decision: "rango", a: 7, b: 6 })).toThrow();
    expect(() => resolverCaso3(p, { abiertos: [], tandas: 2, decision: "rango", a: 5, b: 6, piezaClave: true })).toThrow();
    expect(() => resolverCaso3(p, { abiertos: [], tandas: 4, decision: "tal" })).toThrow();
  });
});

describe("caso 4", () => {
  const A = buscar((p) => p.version.buenoEsA);
  const B = buscar((p) => !p.version.buenoEsA);

  it("A bueno: A +10/+10 (+5/+5 sin clave), B −20/+4 (E4b con clave abierto, E4a sin él), ninguna 0/−10 con E4c", () => {
    const clave = A.carpetas.porCaso[4].claves[0];
    expect(resolverCaso4(A, { abiertos: [clave], eleccion: "A" }).efecto).toEqual(ef(10, 10));
    const sin = resolverCaso4(A, { abiertos: [], eleccion: "A" });
    expect(sin.efecto).toEqual(ef(5, 5));
    expect(sin.sinEvidencia).toBe(true);
    const b1 = resolverCaso4(A, { abiertos: [clave], eleccion: "B" });
    expect(b1.efecto).toEqual(ef(-20, 4));
    expect(b1.codigos).toEqual(["E4b"]);
    expect(resolverCaso4(A, { abiertos: [], eleccion: "B" }).codigos).toEqual(["E4a"]);
    const n = resolverCaso4(A, { abiertos: [], eleccion: "ninguna" });
    expect(n.efecto).toEqual(ef(0, -10));
    expect(n.codigos).toEqual(["E4c"]);
  });

  it("B bueno: B +8/+4 (+4/+2 sin clave); A −20/+10 (E4a sin clave, sin código con el clave abierto)", () => {
    const clave = B.carpetas.porCaso[4].claves[0];
    expect(resolverCaso4(B, { abiertos: [clave], eleccion: "B" }).efecto).toEqual(ef(8, 4));
    expect(resolverCaso4(B, { abiertos: [], eleccion: "B" }).efecto).toEqual(ef(4, 2));
    const a = resolverCaso4(B, { abiertos: [clave], eleccion: "A" });
    expect(a.efecto).toEqual(ef(-20, 10));
    expect(a.codigos).toEqual([]); // hueco declarado
  });

  it("cualquiera de los 2 claves de la carpeta cuenta como «abrió un clave»", () => {
    for (const id of A.carpetas.porCaso[4].claves) expect(resolverCaso4(A, { abiertos: [id], eleccion: "A" }).efecto).toEqual(ef(10, 10));
  });
});

describe("caso 5 · los dos turnos", () => {
  it("turno 1: (a) y (b) valen 0/0 y dejan E5e (solo registro, sin sobre); (c) cuesta 3 de Voz", () => {
    for (const op of ["a", "b"] as const) {
      const r = resolverCaso5Turno1(op);
      expect(r.efecto).toEqual(ef(0, 0));
      expect(r.codigos).toEqual(["E5e"]);
      expect(r.sobre).toBeNull();
      expect(r.habitos).toEqual(["H4"]);
    }
    const c = resolverCaso5Turno1("c");
    expect(c.efecto).toEqual(ef(0, -3));
    expect(c.codigos).toEqual([]);
  });

  const pc = buscar((p) => true);
  const xCerca = (p: PaqueteT1, op: "a" | "b" | "c", delta = 0) => r1(p.cifras.caso5.opciones[op].rho + delta);
  const req = (p: PaqueteT1, op: "a" | "b" | "c") => [...p.carpetas.caso5[op].claves];

  it("con (c) y los papeles requeridos, un número a ±1,0 de ρ paga R5.6 +12/+6; el efecto total es +12 de C y +3 de Voz", () => {
    const e = { opcion: "c" as const, abiertos: req(pc, "c"), x: xCerca(pc, "c") };
    const t2 = resolverCaso5Turno2(pc, e);
    expect(t2.filas).toEqual(["R5.6"]);
    expect(t2.efecto).toEqual(ef(12, 6));
    expect(resolverCaso5(pc, e).efecto).toEqual(ef(12, 3));
    expect(resolverCaso5(pc, { ...e, x: xCerca(pc, "c", 1.0) }).filas).toEqual(["R5.2", "R5.6"]);
    expect(resolverCaso5Turno2(pc, { ...e, x: xCerca(pc, "c", 1.2) }).filas).toEqual(["R5.9"]);
  });

  it("(a) o (b) con los papeles requeridos: R5.7 +6/+3; sin ellos: R5.8 +4/+2 y E5c (acierto sin evidencia)", () => {
    for (const op of ["a", "b"] as const) {
      const buena = resolverCaso5(pc, { opcion: op, abiertos: req(pc, op), x: xCerca(pc, op) });
      expect(buena.filas).toEqual(["R5.1", "R5.7"]);
      expect(buena.efecto).toEqual(ef(6, 3));
      const suerte = resolverCaso5(pc, { opcion: op, abiertos: [], x: xCerca(pc, op) });
      expect(suerte.filas).toEqual(["R5.1", "R5.8"]);
      expect(suerte.efecto).toEqual(ef(4, 2));
      expect(suerte.sinEvidencia).toBe(true);
      expect(suerte.codigos.sort()).toEqual(["E5c", "E5e"]);
    }
  });

  it("subida bruta (R5.4, E5a): −20/+4 con los llamados abiertos; inflado (R5.5, E5b) en (a) y (b) con los demás abiertos", () => {
    const op = "a" as const;
    const o = pc.cifras.caso5.opciones[op];
    const bruta = resolverCaso5Turno2(pc, { opcion: op, abiertos: ["C5-1"], x: o.bruta });
    expect(bruta.filas).toEqual(["R5.4"]);
    expect(bruta.efecto).toEqual(ef(-20, 4));
    expect(bruta.codigos).toEqual(["E5a"]);
    // Sin abrir los llamados, la misma cifra no es «subida bruta» sino un número cualquiera.
    expect(resolverCaso5Turno2(pc, { opcion: op, abiertos: [], x: o.bruta }).filas).toEqual(["R5.9"]);
    const conDemas = buscar((p) => p.carpetas.caso5.a.papeles.some((q) => q.id === "C5-2") && Math.abs(p.cifras.caso5.opciones.a.inflada! - p.cifras.caso5.opciones.a.bruta) > 2.05);
    const infl = resolverCaso5Turno2(conDemas, { opcion: "a", abiertos: ["C5-1", "C5-2"], x: conDemas.cifras.caso5.opciones.a.inflada! });
    expect(infl.filas).toEqual(["R5.5"]);
    expect(infl.codigos).toEqual(["E5b"]);
    // En (c) no hay inflada.
    const enC = resolverCaso5Turno2(conDemas, { opcion: "c", abiertos: ["C5-1", "C5-3", "C5-2"].filter((id) => conDemas.carpetas.caso5.c.papeles.some((q) => q.id === id)), x: 8.8 });
    expect(enC.filas[0]).not.toBe("R5.5");
  });

  it("escribir 0 con la comparación abierta: E5d si ρ > 1, sin código si ρ < −1; vale si |ρ| ≤ 1", () => {
    const pos = buscar((p) => p.cifras.caso5.opciones.c.rho > 1.5);
    const r = resolverCaso5Turno2(pos, { opcion: "c", abiertos: req(pos, "c"), x: 0 });
    expect(r.filas).toEqual(["R5.9"]);
    expect(r.codigos).toEqual(["E5d"]);
    const neg = buscar((p) => p.cifras.caso5.opciones.c.rho < -1.5);
    expect(resolverCaso5Turno2(neg, { opcion: "c", abiertos: req(neg, "c"), x: 0 }).codigos).toEqual([]);
    const mid = buscar((p) => Math.abs(p.cifras.caso5.opciones.c.rho) <= 1);
    const m = resolverCaso5Turno2(mid, { opcion: "c", abiertos: req(mid, "c"), x: 0 });
    expect(m.filas).toEqual(["R5.6"]);
    expect(m.codigos).toEqual([]);
  });

  it("frenar paga R5.3 +2/−6; el hábito H4 se cumple DENTRO del caso 5 con E5e + E5a", () => {
    const f = resolverCaso5Turno2(pc, { opcion: "a", abiertos: [], x: null });
    expect(f.filas).toEqual(["R5.3"]);
    expect(f.efecto).toEqual(ef(2, -6));
    const mala = resolverCaso5(pc, { opcion: "a", abiertos: ["C5-1"], x: pc.cifras.caso5.opciones.a.bruta });
    expect(mala.codigos.sort()).toEqual(["E5a", "E5e"]);
    expect(mala.ocurrencias.H4).toBe(2);
    expect(habitosCumplidos([mala])).toEqual(["H4"]);
    expect(mala.sobre).toBe("S-E5a");
  });

  it("reglaDelTurno2 exige papeles de la carpeta de ESA opción", () => {
    expect(() => reglaDelTurno2(pc, { opcion: "a", abiertos: ["C5-3"], x: 1 })).toThrow();
  });
});

describe("caso 6", () => {
  const con = (tipo: "P" | "B" | "A") => buscar((p) => p.version.tipos[6] === tipo);

  it("tal cual: P y A −20/+10 (E6b); B +5/+5 sin el clave y +10/+10 con él", () => {
    for (const t of ["P", "A"] as const) {
      const r = resolverCaso6(con(t), { abiertos: [], decision: "tal" });
      expect(r.efecto).toEqual(ef(-20, 10));
      expect(r.codigos).toEqual(["E6b"]);
    }
    const B = con("B");
    expect(resolverCaso6(B, { abiertos: [], decision: "tal" }).efecto).toEqual(ef(5, 5));
    expect(resolverCaso6(B, { abiertos: [B.carpetas.porCaso[6].claves[0]], decision: "tal" }).efecto).toEqual(ef(10, 10));
  });

  it("frenar: P +6/−8, A 0/−10, B 0/−15 (E6d)", () => {
    expect(resolverCaso6(con("P"), { abiertos: [], decision: "frenar" }).efecto).toEqual(ef(6, -8));
    expect(resolverCaso6(con("A"), { abiertos: [], decision: "frenar" }).efecto).toEqual(ef(0, -10));
    const b = resolverCaso6(con("B"), { abiertos: [], decision: "frenar" });
    expect(b.efecto).toEqual(ef(0, -15));
    expect(b.codigos).toEqual(["E6d"]);
  });

  it("redactar: ninguna, podrían (E6c en P y A) y grupo (solo con el clave); N mal contado suma −10 a C (E6a)", () => {
    const P = con("P");
    const N = P.cifras.caso6.N;
    expect(resolverCaso6(P, { abiertos: [], decision: "redactar", N, extension: "ninguna" }).efecto).toEqual(ef(2, 1));
    const pod = resolverCaso6(P, { abiertos: [], decision: "redactar", N, extension: "podrian" });
    expect(pod.efecto).toEqual(ef(-8, 4));
    expect(pod.codigos).toEqual(["E6c"]);
    const clave = P.carpetas.porCaso[6].claves[0];
    expect(resolverCaso6(P, { abiertos: [clave], decision: "redactar", N, extension: "grupo" }).efecto).toEqual(ef(8, 4));
    const mal = resolverCaso6(P, { abiertos: [clave], decision: "redactar", N: N + 1, extension: "grupo" });
    expect(mal.efecto).toEqual(ef(-2, 4));
    expect(mal.filas).toEqual(["R6.5", "R6.6"]);
    expect(mal.codigos).toEqual(["E6a"]);
    const B = con("B");
    expect(resolverCaso6(B, { abiertos: [], decision: "redactar", N: B.cifras.caso6.N, extension: "podrian" }).codigos).toEqual([]);
    expect(resolverCaso6(B, { abiertos: [B.carpetas.porCaso[6].claves[0]], decision: "redactar", N: B.cifras.caso6.N, extension: "grupo" }).efecto).toEqual(ef(10, 10));
  });

  it("el sobre de un caso con E6a y E6c es el del conteo (el que más baja C)", () => {
    const P = con("P");
    const r = resolverCaso6(P, { abiertos: [], decision: "redactar", N: P.cifras.caso6.N + 2, extension: "podrian" });
    expect(r.codigos.sort()).toEqual(["E6a", "E6c"]);
    expect(r.codigoSobre).toBe("E6a");
    expect(r.efecto).toEqual(ef(-18, 4));
  });

  it("grupo sin el clave, o sin extensión, o con N no entero, es un error de programación", () => {
    const P = con("P");
    expect(() => resolverCaso6(P, { abiertos: [], decision: "redactar", N: 3, extension: "grupo" })).toThrow();
    expect(() => resolverCaso6(P, { abiertos: [], decision: "redactar", N: 3 })).toThrow();
    expect(() => resolverCaso6(P, { abiertos: [], decision: "redactar", extension: "ninguna" })).toThrow();
    expect(() => resolverCaso6(P, { abiertos: [], decision: "redactar", N: 3.5, extension: "ninguna" })).toThrow();
  });
});

describe("caso 7", () => {
  const P = buscar((p) => p.version.tipos[7] === "P");
  const B = buscar((p) => p.version.tipos[7] === "B");

  it("P: tal cual con x bien −10/+10 (E7b); con x mal −20/+10 (E7a y E7b, sobre del número); rediseñar +8/+4; frenar +6/−8", () => {
    const x = P.cifras.caso7.x;
    const ok = resolverCaso7(P, { decision: "tal", x });
    expect(ok.efecto).toEqual(ef(-10, 10));
    expect(ok.codigos).toEqual(["E7b"]);
    const mal = resolverCaso7(P, { decision: "tal", x: x + 0.5 });
    expect(mal.efecto).toEqual(ef(-20, 10));
    expect(mal.codigos.sort()).toEqual(["E7a", "E7b"]);
    expect(mal.codigoSobre).toBe("E7a");
    expect(resolverCaso7(P, { decision: "redisenar", x }).efecto).toEqual(ef(8, 4));
    expect(resolverCaso7(P, { decision: "redisenar", x }).codigos).toEqual([]);
    expect(resolverCaso7(P, { decision: "redisenar", x: x - 0.5 }).efecto).toEqual(ef(-8, 4));
    expect(resolverCaso7(P, { decision: "frenar" }).efecto).toEqual(ef(6, -8));
    expect(resolverCaso7(P, { decision: "frenar" }).codigos).toEqual([]); // hueco declarado
  });

  it("B: tal cual +10/+10 (x mal: +4/+10 con E7a); rediseñar 0/−4 (E7c); frenar 0/−15 (E7c)", () => {
    const x = B.cifras.caso7.x;
    expect(resolverCaso7(B, { decision: "tal", x }).efecto).toEqual(ef(10, 10));
    expect(resolverCaso7(B, { decision: "tal", x: x + 1 }).efecto).toEqual(ef(4, 10));
    expect(resolverCaso7(B, { decision: "tal", x: x + 1 }).codigos).toEqual(["E7a"]);
    const red = resolverCaso7(B, { decision: "redisenar", x });
    expect(red.efecto).toEqual(ef(0, -4));
    expect(red.codigos).toEqual(["E7c"]);
    expect(resolverCaso7(B, { decision: "redisenar", x: x + 1 }).efecto).toEqual(ef(-6, -4));
    expect(resolverCaso7(B, { decision: "frenar" }).efecto).toEqual(ef(0, -15));
  });

  it("la tolerancia del número es 0,1; sin x no se firma", () => {
    const x = P.cifras.caso7.x;
    expect(resolverCaso7(P, { decision: "tal", x: x + 0.1 }).filas).toEqual(["R7.1"]);
    expect(resolverCaso7(P, { decision: "tal", x: x - 0.1 }).filas).toEqual(["R7.1"]);
    expect(resolverCaso7(P, { decision: "tal", x: x + 0.2 }).filas).toEqual(["R7.2"]);
    expect(() => resolverCaso7(P, { decision: "tal" })).toThrow();
  });
});

describe("caso 8", () => {
  const con = (real: 0 | 1 | 2, beto: 0 | 1 | 2) => buscar((p) => p.version.decisionReal === real && p.version.propuestaDeBeto === beto);

  it("decisión correcta: +12/+8 con los dos claves en la mesa, +6/+4 con uno (E8a), 0/0 con ninguno (E8a)", () => {
    const p = con(0, 1);
    const [k1, k2] = p.carpetas.porCaso[8].claves;
    const dos = resolverCaso8(p, { abiertos: [k1, k2], enMesa: [k1, k2], decision: 0 });
    expect(dos.efecto).toEqual(ef(12, 8));
    expect(dos.codigos).toEqual([]); // Beto dijo 1 y la verdad era 0: llevarle la contraria acertando no es E8d
    const uno = resolverCaso8(p, { abiertos: [k1], enMesa: [k1], decision: 0 });
    expect(uno.efecto).toEqual(ef(6, 4));
    expect(uno.codigos).toEqual(["E8a"]);
    const cero = resolverCaso8(p, { abiertos: [], enMesa: [], decision: 0 });
    expect(cero.efecto).toEqual(ef(0, 0));
    expect(cero.codigos).toEqual(["E8a"]);
  });

  it("E8d: coincidió con Beto cuando se equivocaba, o lo contradijo cuando acertaba; no tiene sobre", () => {
    const p = con(0, 1);
    const [k1, k2] = p.carpetas.porCaso[8].claves;
    // real = 0, Beto = 1. Decidir 1 (con Beto, contra la evidencia) → E8c y E8d.
    const igual = resolverCaso8(p, { abiertos: [k1, k2], enMesa: [k1, k2], decision: 1 });
    expect(igual.codigos.sort()).toEqual(["E8c", "E8d"]);
    expect(igual.codigoSobre).toBe("E8c");
    // Decidir 2 (ni con Beto ni la verdad): E8b y E8c? esperar cuando era financiar → E8b; d != beto y beto != real → sin E8d.
    const espera = resolverCaso8(p, { abiertos: [k1, k2], enMesa: [k1, k2], decision: 2 });
    expect(espera.codigos).toEqual(["E8b"]);
    expect(espera.efecto).toEqual(ef(0, -8));
    // Beto acierta y el alumno lo contradice.
    const q = con(2, 2);
    const [a1, a2] = q.carpetas.porCaso[8].claves;
    const contra = resolverCaso8(q, { abiertos: [a1, a2], enMesa: [a1, a2], decision: 0 });
    expect(contra.codigos.sort()).toEqual(["E8c", "E8d"]);
    expect(contra.efecto).toEqual(ef(-15, 6));
    expect(sobreDe("E8d")).toBeNull();
  });

  it("e cuenta solo claves puestos sobre la mesa; un señuelo cuenta 0; no se pone lo que no se abrió", () => {
    const p = con(1, 0);
    const [k1, k2] = p.carpetas.porCaso[8].claves;
    const senuelo = p.carpetas.porCaso[8].papeles.find((q) => !p.carpetas.porCaso[8].claves.includes(q.id))!.id;
    const uno = resolverCaso8(p, { abiertos: [k1, senuelo], enMesa: [k1, senuelo], decision: 1 });
    expect(uno.efecto).toEqual(ef(6, 4));
    expect(uno.codigos).toContain("E8a");
    expect(uno.detalle.clavesEnMesa).toBe(1);
    const ninguno = resolverCaso8(p, { abiertos: [k1, k2, senuelo], enMesa: [senuelo], decision: 1 });
    expect(ninguno.efecto).toEqual(ef(0, 0));
    expect(ninguno.sinEvidencia).toBe(true);
    expect(() => resolverCaso8(p, { abiertos: [k1], enMesa: [k2], decision: 1 })).toThrow();
    expect(() => resolverCaso8(p, { abiertos: [k1, k2, senuelo], enMesa: [k1, k2, senuelo], decision: 1 })).toThrow();
  });

  it("errores de decisión: financiar contra «no» −20/+6; financiar contra «aún no» −15/+6; no financiar contra «sí» −15/−8 y contra «aún no» −10/−6", () => {
    const filaDe = (real: 0 | 1 | 2, dec: 0 | 1 | 2) => {
      const p = buscar((q) => q.version.decisionReal === real);
      const [k1, k2] = p.carpetas.porCaso[8].claves;
      return resolverCaso8(p, { abiertos: [k1, k2], enMesa: [k1, k2], decision: dec }).efecto;
    };
    expect(filaDe(1, 0)).toEqual(ef(-20, 6));
    expect(filaDe(2, 0)).toEqual(ef(-15, 6));
    expect(filaDe(0, 1)).toEqual(ef(-15, -8));
    expect(filaDe(2, 1)).toEqual(ef(-10, -6));
    expect(filaDe(0, 2)).toEqual(ef(0, -8));
    expect(filaDe(1, 2)).toEqual(ef(0, -8));
    expect(filaDe(2, 2)).toEqual(ef(12, 8));
  });
});

describe("sobres, prioridad y hábitos", () => {
  it("E5e y E8d no tienen sobre; los demás, «S-» + el código", () => {
    expect(sobreDe("E5e")).toBeNull();
    expect(sobreDe("E8d")).toBeNull();
    expect(sobreDe("E2a")).toBe("S-E2a");
  });

  it("la prioridad de sobres solo lista códigos de su caso, sin E5e ni E8d, y cubre todos los demás", () => {
    const todosLosCodigos = Object.keys(CODIGOS).filter((c) => c !== "E5e" && c !== "E8d");
    const enLista = Object.entries(PRIORIDAD_SOBRE).flatMap(([caso, cs]) => {
      for (const c of cs) expect(c.startsWith(`E${caso}`)).toBe(true);
      return [...cs];
    });
    expect(enLista.sort()).toEqual(todosLosCodigos.sort());
  });

  it("un hábito es la misma clase en DOS casos distintos; dentro de un mismo caso (salvo el 5) no cuenta", () => {
    const P2 = buscar((p) => p.version.tipos[2] === "P");
    const r2 = resolverCaso2(P2, { abiertos: [], decision: "tal" }); // E2a: H1, H2
    expect(habitosCumplidos([r2])).toEqual([]);
    const P6 = buscar((p) => p.version.tipos[6] === "P");
    const r6 = resolverCaso6(P6, { abiertos: [], decision: "tal" }); // E6b: H2
    expect(habitosCumplidos([r2, r6])).toEqual(["H2"]);
    const P7 = buscar((p) => p.version.tipos[7] === "P");
    const r7 = resolverCaso7(P7, { decision: "tal", x: P7.cifras.caso7.x }); // E7b: H2
    expect(habitosCumplidos([r2, r6, r7])).toEqual(["H2"]);
    // E8c + E8d dentro del caso 8 son dos códigos de H4, pero un solo caso: no es hábito.
    const p8 = buscar((p) => p.version.decisionReal === 0 && p.version.propuestaDeBeto === 1);
    const [k1, k2] = p8.carpetas.porCaso[8].claves;
    const r8 = resolverCaso8(p8, { abiertos: [k1, k2], enMesa: [k1, k2], decision: 1 });
    expect(r8.ocurrencias.H4).toBe(1);
    expect(habitosCumplidos([r8])).toEqual([]);
  });

  it("los resultados no dicen si «acertó»: solo traen efecto, filas, códigos y hábitos", () => {
    const r = resolverCaso4(todos[0], { abiertos: [], eleccion: "A" });
    expect(Object.keys(r).sort()).toEqual(["caso", "codigoSobre", "codigos", "detalle", "efecto", "filas", "habitos", "ocurrencias", "sinEvidencia", "sobre"]);
  });
});
