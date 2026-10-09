/**
 * PARIDAD Python ↔ TypeScript de `respuestas.ts`.
 *
 * `docs/juego/gdd/scripts-t1/exportar_respuestas_t1.py` (correr con `python`, no `python -I`) recorre TODOS los estados
 * posibles de cada caso (los de `ramas_t1.py`: tipo × papeles abiertos × decisión × pieza × banda del número…) y guarda su
 * pago y sus códigos E.. en `fixtures/respuestas-t1.json`. Esta prueba lleva cada estado abstracto a una versión CONCRETA del
 * motor (buscando entre las 999 la que cumple lo que el estado pide) y exige que el efecto, la fila de pago y los códigos
 * coincidan uno por uno. Un estado que ninguna versión real puede producir (por ejemplo, un número dentro de la banda de ρ y de
 * la de la subida bruta a la vez, que el invariante I4 prohíbe) se cuenta como no realizable y se declara.
 */

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { VERSION_MAXIMA } from "../planta";
import { REQUERIDOS_CASO5 } from "./carpeta";
import { paqueteT1, type PaqueteT1 } from "./cifras";
import {
  resolverCaso2,
  resolverCaso3,
  resolverCaso4,
  resolverCaso5Turno1,
  resolverCaso5Turno2,
  resolverCaso6,
  resolverCaso7,
  resolverCaso8,
  type ResultadoCaso,
} from "./respuestas";
import { nivelDeRango } from "./tandas";

interface FilaFx {
  estado: Record<string, string | number | null>;
  fila: string;
  clave: string;
  ce: [number, number];
  codigos: string[];
}
const fx: Record<string, FilaFx[]> = JSON.parse(readFileSync("src/lib/juego/psicoestadistica/fixtures/respuestas-t1.json", "utf8"));
const todos: PaqueteT1[] = Array.from({ length: VERSION_MAXIMA }, (_, i) => paqueteT1(i + 1));
const r1 = (x: number) => Math.round(x * 10) / 10;

function buscar(pred: (p: PaqueteT1) => boolean): PaqueteT1 {
  const p = todos.find(pred);
  if (!p) throw new Error("Ninguna versión cumple la condición");
  return p;
}

function comparar(r: ResultadoCaso, f: FilaFx, codigos: readonly string[] = r.codigos) {
  const etiqueta = JSON.stringify(f.estado);
  expect({ estado: etiqueta, efecto: [r.efecto.c, r.efecto.voz] }).toEqual({ estado: etiqueta, efecto: f.ce });
  expect({ estado: etiqueta, fila: r.filas[0] }).toEqual({ estado: etiqueta, fila: f.fila });
  expect({ estado: etiqueta, codigos: [...codigos].sort() }).toEqual({ estado: etiqueta, codigos: f.codigos });
}

describe("paridad con Python · el fixture es lo que se espera", () => {
  it("cantidad de estados por caso (si cambia, se volvió a correr el exportador)", () => {
    expect(Object.fromEntries(Object.entries(fx).map(([k, v]) => [k, v.length]))).toEqual({ "2": 15, "3": 93, "4": 12, "5": 357, "6": 42, "7": 10, "8": 81 });
  });
});

describe("paridad con Python · caso 2", () => {
  it("los 15 estados", () => {
    for (const f of fx["2"]) {
      const s = f.estado as { tipo: "P" | "B"; clave: number; dec: string; ref: number };
      const p = buscar((q) => q.version.tipos[2] === s.tipo && (!s.ref || q.carpetas.porCaso[2].refuerzo !== null));
      const claveId = p.carpetas.porCaso[2].claves[0];
      const abiertos = s.clave ? [claveId, ...(s.ref ? ["C2-4"] : [])] : [];
      const decision = s.dec === "tal" ? "tal" : s.dec === "frenar" ? "frenar" : "frase";
      comparar(resolverCaso2(p, { abiertos, decision, piezaClave: s.dec === "frase_con", piezaRefuerzo: !!s.ref }), f);
    }
  });
});

describe("paridad con Python · caso 3", () => {
  const rangoDe = (p: PaqueteT1, nivel: string) => {
    const mu = p.cifras.caso3.mu;
    const [ancho, desde] = { ok: [1.0, -0.5], flojo: [1.5, -0.75], ancho: [2.4, -1.2], noCubre: [0.5, 3] }[nivel]!;
    const a = r1(mu + desde);
    return { a, b: r1(a + ancho) };
  };

  it("los 93 estados", () => {
    for (const f of fx["3"]) {
      const s = f.estado as { tipo: "P" | "B" | "A"; tandas: number; clave: number; dec: string; nivel: string | null; pieza: number };
      const p = buscar((q) => q.version.tipos[3] === s.tipo);
      const abiertos = s.clave ? [p.carpetas.porCaso[3].claves[0]] : [];
      if (s.dec === "rango") {
        const { a, b } = rangoDe(p, s.nivel!);
        expect(nivelDeRango(a, b, p.cifras.caso3.mu)).toBe(s.nivel);
        comparar(resolverCaso3(p, { abiertos, tandas: s.tandas, decision: "rango", a, b, piezaClave: !!s.pieza }), f);
      } else {
        comparar(resolverCaso3(p, { abiertos, tandas: s.tandas, decision: s.dec as "tal" | "frenar" }), f);
      }
    }
  });
});

describe("paridad con Python · caso 4", () => {
  it("los 12 estados", () => {
    for (const f of fx["4"]) {
      const s = f.estado as { bueno: "A" | "B"; elige: "A" | "B" | "ninguna"; clave: number };
      const p = buscar((q) => q.version.buenoEsA === (s.bueno === "A"));
      comparar(resolverCaso4(p, { abiertos: s.clave ? [p.carpetas.porCaso[4].claves[0]] : [], eleccion: s.elige }), f);
    }
  });
});

describe("paridad con Python · caso 5 (turno 1 + turno 2)", () => {
  type Op = "a" | "b" | "c";
  interface Est {
    op: Op;
    req: number;
    c1: number;
    c2: number;
    dec: string;
    en_rho: number;
    en_bruta: number;
    en_infl: number;
    cero: number;
    rhosig: string | null;
  }

  function realizar(s: Est): { p: PaqueteT1; abiertos: string[]; x: number | null } | null {
    for (const p of todos) {
      const folder = p.carpetas.caso5[s.op].papeles.map((q) => q.id);
      const req = REQUERIDOS_CASO5[s.op];
      let abiertos: string[];
      if (s.req) {
        abiertos = [...req];
        if (s.c2 && !abiertos.includes("C5-2")) {
          if (!folder.includes("C5-2")) continue;
          abiertos.push("C5-2");
        }
        if (!s.c2 && abiertos.includes("C5-2")) return null; // estado incoherente: no existe
      } else {
        abiertos = [];
        if (s.c1) abiertos.push("C5-1");
        if (s.c2) {
          if (!folder.includes("C5-2")) continue;
          abiertos.push("C5-2");
        }
      }
      if (s.dec === "frenar") return { p, abiertos, x: null };

      const o = p.cifras.caso5.opciones[s.op];
      const T = (z: number) => Math.round(z * 10);
      const rho = T(o.rho);
      const bruta = T(o.bruta);
      const infl = o.inflada === null ? null : T(o.inflada);
      if (s.en_infl && infl === null) return null; // en (c) no hay inflada
      const flags = (X: number) => ({
        en_rho: Math.abs(X - rho) <= 10 ? 1 : 0,
        en_bruta: Math.abs(X - bruta) <= 10 ? 1 : 0,
        en_infl: infl !== null && Math.abs(X - infl) <= 10 ? 1 : 0,
        cero: X === 0 ? 1 : 0,
      });
      const sigDe = rho > 10 ? "pos" : rho < -10 ? "neg" : "mid";
      const candidatos = new Set<number>([0, 400, -400, 500]);
      for (const c of [rho, bruta, ...(infl === null ? [] : [infl])]) for (let k = -13; k <= 13; k++) candidatos.add(c + k);
      for (const X of candidatos) {
        const f = flags(X);
        const sirve = f.en_rho === s.en_rho && f.en_bruta === s.en_bruta && (op3(s) || f.en_infl === s.en_infl) && f.cero === s.cero;
        if (!sirve) continue;
        if (s.cero && s.rhosig !== sigDe) continue;
        // El estado de Python no distingue la inflada en (c): para (c) vale cualquier bandera.
        return { p, abiertos, x: X / 10 };
      }
    }
    return null;
  }
  const op3 = (s: Est) => s.op === "c";

  it("los 357 estados: cada uno que alguna versión real puede producir da el mismo efecto, fila y códigos", () => {
    let realizados = 0;
    const filasVistas = new Set<string>();
    const codigosVistos = new Set<string>();
    const noRealizables: string[] = [];
    for (const f of fx["5"]) {
      const s = f.estado as unknown as Est;
      const r = realizar(s);
      if (!r) {
        noRealizables.push(JSON.stringify(f.estado));
        continue;
      }
      realizados++;
      const t1 = resolverCaso5Turno1(s.op);
      const t2 = resolverCaso5Turno2(r.p, { opcion: s.op, abiertos: r.abiertos, x: r.x });
      comparar(t2, f, [...t1.codigos, ...t2.codigos]);
      filasVistas.add(f.fila);
      for (const c of f.codigos) codigosVistos.add(c);
    }
    expect(realizados).toBeGreaterThan(150);
    // Todas las reglas de pago del turno 2 y todos los códigos del caso 5 se alcanzaron.
    expect([...filasVistas].sort()).toEqual(["R5.3", "R5.4", "R5.5", "R5.6", "R5.7", "R5.8", "R5.9"]);
    expect([...codigosVistos].sort()).toEqual(["E5a", "E5b", "E5c", "E5d", "E5e"]);
    // Declarado: lo que no se realiza es porque los invariantes lo impiden (bandas que no se tocan, sin inflada en (c), estados incoherentes).
    expect(realizados + noRealizables.length).toBe(fx["5"].length);
  });

  it("los estados no realizables son solo de cuatro clases: incoherentes, inflada en (c), bandas que I4 separa y «0 dentro de la banda bruta/inflada» (Q1 lo impide)", () => {
    for (const f of fx["5"]) {
      const s = f.estado as unknown as Est;
      if (realizar(s)) continue;
      const incoherente = s.req && s.op === "b" && !s.c2;
      const sinInflada = s.op === "c" && !!s.en_infl;
      const bandasQueSeTocan = s.en_rho && (s.en_bruta || s.en_infl);
      const ceroEnBandaAjena = !!s.cero && !!(s.en_bruta || s.en_infl);
      expect(Boolean(incoherente || sinInflada || bandasQueSeTocan || ceroEnBandaAjena)).toBe(true);
    }
  });
});

describe("paridad con Python · caso 6", () => {
  it("los 42 estados", () => {
    for (const f of fx["6"]) {
      const s = f.estado as { tipo: "P" | "B" | "A"; clave: number; dec: string; ext: string | null; ncorr: number };
      const p = buscar((q) => q.version.tipos[6] === s.tipo);
      const abiertos = s.clave ? [p.carpetas.porCaso[6].claves[0]] : [];
      if (s.dec === "redactar") {
        const N = p.cifras.caso6.N + (s.ncorr ? 0 : 1);
        comparar(resolverCaso6(p, { abiertos, decision: "redactar", N, extension: s.ext as "ninguna" | "podrian" | "grupo" }), f);
      } else comparar(resolverCaso6(p, { abiertos, decision: s.dec as "tal" | "frenar" }), f);
    }
  });
});

describe("paridad con Python · caso 7", () => {
  it("los 10 estados", () => {
    for (const f of fx["7"]) {
      const s = f.estado as { tipo: "P" | "B"; dec: string; xok: number };
      const p = buscar((q) => q.version.tipos[7] === s.tipo);
      const x = p.cifras.caso7.x + (s.xok ? 0 : 1);
      const decision = s.dec === "redis" ? "redisenar" : (s.dec as "tal" | "frenar");
      comparar(resolverCaso7(p, decision === "frenar" ? { decision } : { decision, x }), f);
    }
  });
});

describe("paridad con Python · caso 8", () => {
  it("los 81 estados (real × decisión × claves en la mesa × propuesta de Beto)", () => {
    for (const f of fx["8"]) {
      const s = f.estado as { real: 0 | 1 | 2; dec: 0 | 1 | 2; e: number; beto: 0 | 1 | 2 };
      const p = buscar((q) => q.version.decisionReal === s.real && q.version.propuestaDeBeto === s.beto);
      const mesa = p.carpetas.porCaso[8].claves.slice(0, s.e);
      comparar(resolverCaso8(p, { abiertos: mesa, enMesa: mesa, decision: s.dec }), f);
    }
  });
});
