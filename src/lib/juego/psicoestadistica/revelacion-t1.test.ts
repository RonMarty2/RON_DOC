import { describe, expect, it } from "vitest";
import { azarConSemilla, type Azar } from "../../finanzas/ejercicios";
import { problemasDeTexto } from "../../revision";
import { VERSION_MAXIMA } from "../planta";
import { entero, tomar } from "./aleatorio-t1";
import { ayudaAlCierre, ayudaEnPractica, expedienteDe, EXPEDIENTES_EN_OFICIAL, sobre } from "./ayuda";
import { OPCIONES_CASO5, type Carpeta } from "./carpeta";
import { paqueteT1, type PaqueteT1 } from "./cifras";
import { CODIGOS, SIN_SOBRE, type Habito } from "./efectos-t1";
import { RAMAS } from "./ramas-t1";
import { resumenT1, type JugadaT1 } from "./registro-t1";
import { habitosCumplidos, sobreDe } from "./respuestas";
import { BETO_FINAL, CAMINO, caminoVisible, cartasDe, GUION_T1, unDecimal } from "./revelacion-t1";

const todos: PaqueteT1[] = Array.from({ length: VERSION_MAXIMA }, (_, i) => paqueteT1(i + 1));
const palabras = (t: string) => t.trim().split(/\s+/).length;

const abrir = (azar: Azar, c: Carpeta, max: number): string[] => tomar(azar, c.papeles.map((q) => q.id), entero(azar, max + 1));
const hay = (c: Carpeta, abiertos: string[]) => c.claves.some((id) => abiertos.includes(id));
const de = <T,>(azar: Azar, lista: readonly T[]): T => lista[entero(azar, lista.length)];

/** Un alumno que juega al azar con jugadas legales (el mismo de registro-t1.test.ts). */
function jugadaAlAzar(p: PaqueteT1, azar: Azar): JugadaT1 {
  const c = p.carpetas.porCaso;
  const j: JugadaT1 = {};
  j[1] = { abiertos: abrir(azar, c[1], 3) };
  const a2 = abrir(azar, c[2], 3);
  const d2 = de(azar, ["tal", "frenar", "frase"] as const);
  j[2] = { abiertos: a2, decision: d2, piezaClave: d2 === "frase" && hay(c[2], a2) && azar() < 0.6 };
  const tandas = entero(azar, 4);
  const a3 = abrir(azar, c[3], 3 - tandas);
  const { mu, medias } = p.cifras.caso3;
  if (tandas >= 2 && azar() < 0.7) {
    const rangos: Array<[number, number]> = [
      [mu - 0.4, mu + 0.4],
      [mu + 0.6, mu + 1.4],
      [mu - 1.5, mu + 1.5],
      [mu - 0.3, mu + 0.3],
    ];
    if (tandas === 3) rangos.push([Math.min(...medias), Math.max(...medias)]);
    const [a, b] = de(azar, rangos).map((x) => Math.round(x * 10) / 10);
    j[3] = { abiertos: a3, tandas, decision: "rango", a, b, piezaClave: hay(c[3], a3) && azar() < 0.6 };
  } else j[3] = { abiertos: a3, tandas, decision: de(azar, ["tal", "frenar"] as const) };
  j[4] = { abiertos: abrir(azar, c[4], 3), eleccion: de(azar, ["A", "B", "ninguna"] as const) };
  const op = de(azar, OPCIONES_CASO5);
  const o = p.cifras.caso5.opciones[op];
  const xs: Array<number | null> = [null, o.rho, o.bruta, 0, o.rho + 5];
  if (o.inflada !== null) xs.push(o.inflada);
  j[5] = { opcion: op, abiertos: abrir(azar, p.carpetas.caso5[op], 3), x: de(azar, xs) };
  const a6 = abrir(azar, c[6], 3);
  const d6 = de(azar, ["tal", "frenar", "redactar"] as const);
  j[6] =
    d6 === "redactar"
      ? { abiertos: a6, decision: d6, N: p.cifras.caso6.N + (azar() < 0.3 ? 2 : 0), extension: de(azar, hay(c[6], a6) ? (["ninguna", "podrian", "grupo"] as const) : (["ninguna", "podrian"] as const)) }
      : { abiertos: a6, decision: d6 };
  const d7 = de(azar, ["tal", "redisenar", "frenar"] as const);
  j[7] = d7 === "frenar" ? { decision: d7 } : { decision: d7, x: p.cifras.caso7.x + (azar() < 0.4 ? 1.5 : 0) };
  const a8 = abrir(azar, c[8], 3);
  j[8] = { abiertos: a8, enMesa: tomar(azar, a8, Math.min(a8.length, entero(azar, 3))), decision: de(azar, [0, 1, 2] as const) };
  return j;
}

describe("los textos del guion (copiados de la narrativa)", () => {
  it("hay texto para las 72 ramas, 11 cierres, 28 sobres, 8 expedientes y 9 pies", () => {
    expect(Object.keys(GUION_T1.ramas).sort()).toEqual([...RAMAS].sort());
    expect(Object.keys(GUION_T1.cierres)).toHaveLength(11);
    expect(Object.keys(GUION_T1.expedientes)).toHaveLength(8);
    expect(Object.values(GUION_T1.pies).flat()).toHaveLength(9);
    const conSobre = Object.keys(CODIGOS).filter((c) => !SIN_SOBRE.includes(c as never));
    expect(Object.keys(GUION_T1.sobres).sort()).toEqual(["S-P1", ...conSobre.map((c) => sobreDe(c)!)].sort());
    for (const c of SIN_SOBRE) expect(() => sobre(`S-${c}`)).toThrow();
    for (const h of ["H1", "H2", "H3", "H4"] as const) {
      expect(GUION_T1.expedientes[`R-${h}a`].habito).toBe(h);
      expect(GUION_T1.expedientes[`R-${h}b`].habito).toBe(h);
    }
  });

  it("ningún texto tiene voseo, guion largo, ni manda a leer; sobres y cierres caben en 25 palabras", () => {
    const sueltos: string[] = [...Object.values(GUION_T1.cierres), ...Object.values(GUION_T1.sobres), ...CAMINO, BETO_FINAL, ...Object.values(GUION_T1.pies).flat()];
    for (const e of Object.values(GUION_T1.expedientes)) sueltos.push(e.titulo, e.texto);
    for (const r of Object.values(GUION_T1.ramas)) for (const l of [r.hiciste, r.habria]) if (l) sueltos.push(...(typeof l === "string" ? [l] : Object.values(l)));
    for (const t of sueltos) {
      expect(problemasDeTexto("", t), t).toEqual([]);
      expect(/dossier|jamovi|eviews|spss|excel|software|según el/i.test(t), t).toBe(false);
    }
    for (const t of [...Object.values(GUION_T1.cierres), ...Object.values(GUION_T1.sobres), ...CAMINO, BETO_FINAL]) expect(palabras(t), t).toBeLessThanOrEqual(25);
    for (const t of Object.values(GUION_T1.pies).flat()) expect(palabras(t), t).toBeLessThan(20);
  });
});

describe("las 8 cartas de la revelación", () => {
  it("en las 999 versiones, cualquier jugada legal da 8 cartas completas: sin huecos, en tuteo y de 25 palabras o menos por línea", () => {
    const vistas = new Set<string>();
    const largas: string[] = [];
    for (const p of todos) {
      for (let k = 0; k < 3; k++) {
        const j = jugadaAlAzar(p, azarConSemilla(p.version.semilla * 17 + k));
        const cartas = cartasDe(p, j);
        if (cartas.length !== 8) throw new Error(`v${p.version.semilla}: ${cartas.length} cartas`);
        if (cartas.map((c) => c.idea).join() !== p.version.orden.join()) throw new Error(`v${p.version.semilla}: orden de cartas`);
        for (const c of cartas) {
          vistas.add(c.rama);
          for (const t of [c.hiciste, c.habria, c.cierre]) {
            if (!t || /[{}]|undefined|null|NaN/.test(t)) throw new Error(`${c.rama}: «${t}»`);
            if (palabras(t) > 25) largas.push(`${c.rama} (${palabras(t)}): ${t}`);
          }
        }
      }
    }
    expect([...new Set(largas)].slice(0, 5)).toEqual([]);
    expect(vistas.size).toBeGreaterThanOrEqual(RAMAS.length - 4);
  }, 60_000);

  it("los huecos salen de la versión del alumno y de lo que abrió", () => {
    const p = todos.find((q) => q.version.tipos[2] === "P")!;
    const c = p.carpetas.porCaso;
    const j: JugadaT1 = {
      1: { abiertos: [c[1].claves[0]] },
      2: { abiertos: [c[2].claves[0]], decision: "frase", piezaClave: true },
      3: { abiertos: [], tandas: 0, decision: "tal" },
      5: { opcion: "a", abiertos: ["C5-1"], x: p.cifras.caso5.opciones.a.bruta },
    };
    const cartas = cartasDe(p, j);
    expect(cartas.map((x) => x.idea)).toEqual(p.version.orden.filter((n) => j[n] !== undefined));
    const de = (idea: number) => cartas.find((x) => x.idea === idea)!;
    expect(de(1).rama).toBe("F1a");
    expect(de(1).hiciste).toMatch(/^Abriste (el cuaderno de la enfermería|la encuesta anual de la secretaría|el informe del orientador) y ahí estaba/);
    expect(de(2).hiciste).toBe(`Viste que ${p.cifras.caso2.hechoClave}. El cero no decía lo que parecía.`);
    expect(de(2).cierre).toContain("operacionalizar");
    if (p.version.tipos[3] === "P") expect(de(3).hiciste).toContain(p.version.textos.fuentes[3]);
    expect(de(5).rama).toBe("F5d");
    expect(de(5).hiciste).toBe("Llamaste a los 13 de peor puntaje, subieron, y escribiste esa subida como si fuera del taller.");
    expect(de(5).habria).toBe(`El colegio ${p.version.textos.vecino}, sin taller, también subió.`);
  });

  it("caso 8 contra la evidencia: «Habría pasado» es el pie de tu año; el número con signo usa coma y «−»", () => {
    const p = todos.find((q) => q.version.decisionReal === 1)!;
    const claves = [...p.carpetas.porCaso[8].claves].slice(0, 2);
    const carta = cartasDe(p, { 8: { abiertos: claves, enMesa: claves, decision: 0 } })[0];
    expect(carta.rama).toBe("F8e");
    expect(carta.habria).toBe("Se gastó el año en un taller que no cambió nada.");
    expect(unDecimal(2.44)).toBe("2,4");
    expect(unDecimal(-1.3)).toBe("−1,3");
    expect(unDecimal(3)).toBe("3,0");
  });

  it("el camino aparece solo con las ocho cartas boca arriba", () => {
    expect(CAMINO).toHaveLength(3);
    expect(caminoVisible([1, 2, 3, 4, 5, 6, 7])).toBe(false);
    expect(caminoVisible([1, 1, 2, 3, 4, 5, 6, 7])).toBe(false);
    expect(caminoVisible([8, 3, 1, 2, 7, 4, 6, 5])).toBe(true);
  });
});

describe("escalera de ayuda sin bloquear", () => {
  it("al cierre de cualquier caso se puede avanzar; el sobre es el del código y el expediente sale solo cuando un hábito se cumple", () => {
    expect(EXPEDIENTES_EN_OFICIAL).toBe(true);
    let conExpediente = 0;
    let conSobre = 0;
    for (const p of todos.slice(0, 300)) {
      const j = jugadaAlAzar(p, azarConSemilla(p.version.semilla + 3));
      const filas = resumenT1(p, j).ideas;
      const yaMostrados = new Set<Habito>();
      for (const caso of p.version.orden) {
        const a = ayudaAlCierre(p, j, caso);
        expect(a.puedeAvanzar).toBe(true);
        const fila = filas.find((f) => f.idea === caso)!;
        expect(a.sobre?.id ?? null).toBe(fila.sobre);
        if (a.sobre) {
          conSobre++;
          expect(a.sobre.texto.length).toBeGreaterThan(10);
        }
        if (a.expediente) {
          conExpediente++;
          expect(caso).not.toBe(1);
          expect(yaMostrados.has(a.expediente.habito)).toBe(false); // un hábito se anuncia una sola vez
          yaMostrados.add(a.expediente.habito);
          expect(a.expediente.id).toMatch(new RegExp(`^R-${a.expediente.habito}[ab]$`));
        }
      }
      // Todo hábito anunciado es un hábito cumplido al final.
      const alFinal = resumenT1(p, j).habitos;
      for (const h of yaMostrados) expect(alFinal).toContain(h);
    }
    expect(conSobre).toBeGreaterThan(300);
    expect(conExpediente).toBeGreaterThan(100);
  });

  it("un hábito son dos casos distintos con la misma clase de error; el expediente llega en el segundo", () => {
    const p = todos.find((q) => q.version.tipos[2] === "P" && q.version.tipos[6] !== "B" && q.version.orden.indexOf(6) > 1)!;
    const j: JugadaT1 = { 1: { abiertos: [] }, 2: { abiertos: [], decision: "tal" }, 6: { abiertos: [], decision: "tal" } }; // E2a (H1, H2) y E6b (H2)
    expect(ayudaAlCierre(p, j, 2).expediente).toBeNull();
    const a6 = ayudaAlCierre(p, j, 6);
    expect(a6.expediente?.habito).toBe("H2");
    expect(a6.sobre?.id).toBe("S-E6b");
    expect(() => ayudaAlCierre(p, j, 4)).toThrow();
  });

  it("los dos expedientes de cada hábito salen a distintos alumnos, y siempre el mismo al mismo alumno", () => {
    for (const h of ["H1", "H2", "H3", "H4"] as const) {
      const ids = new Set(todos.map((p) => expedienteDe(p.version.semilla, 4, h).id));
      expect([...ids].sort()).toEqual([`R-${h}a`, `R-${h}b`]);
      expect(expedienteDe(77, 4, h)).toEqual(expedienteDe(77, 4, h));
    }
  });

  it("en la práctica abierta el expediente aparece tras cualquier error, y sin error no hay nada", () => {
    const p = todos.find((q) => q.version.tipos[2] === "P")!;
    const mal = resumenT1(p, { 2: { abiertos: [], decision: "tal" } });
    expect(mal.ideas[0].codigos).toEqual(["E2a"]);
    const r = { caso: 2 as const, filas: [], efecto: { c: 0, voz: 0 }, codigos: ["E2a"], codigoSobre: "E2a", sobre: "S-E2a", habitos: ["H1", "H2"] as Habito[], ocurrencias: {}, sinEvidencia: false, detalle: {} };
    const a = ayudaEnPractica(p, 2, r, "S-E2a");
    expect(a.expediente?.habito).toBe("H1");
    expect(a.sobre?.id).toBe("S-E2a");
    expect(a.puedeAvanzar).toBe(true);
    expect(ayudaEnPractica(p, 2, { ...r, codigos: [], codigoSobre: null, sobre: null }, null)).toEqual({ sobre: null, expediente: null, puedeAvanzar: true });
    expect(habitosCumplidos([r])).toEqual([]);
  });
});
