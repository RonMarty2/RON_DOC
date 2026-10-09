import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { azarConSemilla, type Azar } from "../../finanzas/ejercicios";
import { VERSION_MAXIMA } from "../planta";
import { entero, tomar } from "./aleatorio-t1";
import { OPCIONES_CASO5, type Carpeta } from "./carpeta";
import { paqueteT1, type PaqueteT1 } from "./cifras";
import { claseDe, ramaDe, RAMAS, type EstadoT1 } from "./ramas-t1";
import { casosPendientes, jugadaDeEventos, lineaDelDocente, resolverCaso, resumenT1, type JugadaT1 } from "./registro-t1";
import { META_CIERRE, type EventoT1, type NumeroDeCaso } from "./reglas-t1";

const todos: PaqueteT1[] = Array.from({ length: VERSION_MAXIMA }, (_, i) => paqueteT1(i + 1));
const buscar = (pred: (p: PaqueteT1) => boolean): PaqueteT1 => {
  const p = todos.find(pred);
  if (!p) throw new Error("No hay versión con esa condición");
  return p;
};

/** Los estados del modelo en Python, ya con la forma del motor, para saber si un estado «existe». */
const fx: { estados: Array<{ estado: Record<string, string | number | boolean | null>; rama: string; clase: string }> } = JSON.parse(
  readFileSync("src/lib/juego/psicoestadistica/fixtures/ramas-t1.json", "utf8"),
);
const firma = (s: EstadoT1): string => {
  const o = s as unknown as Record<string, unknown>;
  return JSON.stringify(Object.keys(o).sort().map((k) => [k, typeof o[k] === "boolean" ? Number(o[k]) : o[k]]));
};
const RENOMBRES: Record<string, string> = { abre_propio: "abrePropio" };
const QUITAR = new Set(["tandas", "ref", "c1", "c2", "en_rho", "en_bruta", "en_infl", "rhosig", "dec5"]);
const delModelo = new Map<string, { rama: string; clase: string }>();
for (const f of fx.estados) {
  const o: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(f.estado)) {
    if (QUITAR.has(k)) continue;
    if (f.estado.ficha === 5 && k === "dec") continue;
    o[RENOMBRES[k] ?? k] = v;
  }
  delModelo.set(JSON.stringify(Object.keys(o).sort().map((k) => [k, typeof o[k] === "boolean" ? Number(o[k]) : o[k]])), { rama: f.rama, clase: f.clase });
}

// ── Un alumno que juega al azar, pero siempre con jugadas legales ────────────

const abrir = (azar: Azar, c: Carpeta, max: number): string[] => tomar(azar, c.papeles.map((q) => q.id), entero(azar, max + 1));
const hay = (c: Carpeta, abiertos: string[]) => c.claves.some((id) => abiertos.includes(id));
const de = <T,>(azar: Azar, lista: readonly T[]): T => lista[entero(azar, lista.length)];

function jugadaAlAzar(p: PaqueteT1, azar: Azar): JugadaT1 {
  const c = p.carpetas.porCaso;
  const j: JugadaT1 = {};
  j[1] = { abiertos: abrir(azar, c[1], 3), ayudado: azar() < 0.3 };

  const a2 = abrir(azar, c[2], 3);
  const d2 = de(azar, ["tal", "frenar", "frase"] as const);
  j[2] = { abiertos: a2, decision: d2, piezaClave: d2 === "frase" && hay(c[2], a2) && azar() < 0.6 };

  const tandas = entero(azar, 4);
  const a3 = abrir(azar, c[3], 3 - tandas);
  const { mu, medias } = p.cifras.caso3;
  if (tandas >= 2 && azar() < 0.7) {
    const rangos: Array<[number, number]> = [
      [mu - 0.4, mu + 0.4],
      [mu - 0.1, mu + 0.9],
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
  const xs: Array<number | null> = [null, o.rho, o.bruta, 0, o.rho + 5, -7.3];
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

describe("registro del Tema 1", () => {
  it("en las 999 versiones, una jugada legal cualquiera da 8 filas con un estado que el modelo conoce, su rama y su clase", () => {
    const vistas = new Set<string>();
    const fuera: string[] = [];
    for (const p of todos) {
      for (let k = 0; k < 4; k++) {
        const r = resumenT1(p, jugadaAlAzar(p, azarConSemilla(p.version.semilla * 31 + k)));
        expect(r.ideas).toHaveLength(8);
        expect(r.completo).toBe(true);
        expect(r.ideas.map((f) => f.idea)).toEqual(p.version.orden);
        for (const f of r.ideas) {
          const m = delModelo.get(firma(f.estado));
          if (!m) fuera.push(`v${p.version.semilla} ${firma(f.estado)}`);
          else {
            expect(f.rama).toBe(m.rama);
            expect(f.clase).toBe(m.clase);
          }
          expect(f.rama).toBe(ramaDe(f.estado));
          expect(f.clase).toBe(claseDe(f.estado));
          expect(f.rama[1]).toBe(String(f.idea));
          vistas.add(f.rama);
        }
      }
    }
    expect(fuera.slice(0, 5)).toEqual([]);
    // Jugando al azar se llega a casi todas las ramas (las que faltan son rarezas como «razonó bien y no cubrió»).
    expect(vistas.size).toBeGreaterThanOrEqual(RAMAS.length - 4);
  }, 60_000);

  it("los tubos se encadenan en el orden de la versión, con tope, y la plaza fija es 65/65 al final", () => {
    for (const p of todos.slice(0, 200)) {
      const r = resumenT1(p, jugadaAlAzar(p, azarConSemilla(p.version.semilla + 7)));
      let m = { c: 50, voz: 50 };
      for (const f of r.ideas) {
        if (f.idea === 1) {
          expect(f.antes).toBeNull();
          expect(f.fichas).toBeNull();
          continue;
        }
        expect(f.antes).toEqual(m);
        expect(f.fichas).toBe(m.c <= 25 || m.voz <= 25 ? 2 : 3);
        m = f.despues!;
        for (const x of [m.c, m.voz]) expect(x >= 0 && x <= 100).toBe(true);
      }
      expect(r.medidores).toEqual(m);
      expect(r.plazaFija).toBe(m.c >= META_CIERRE && m.voz >= META_CIERRE);
      expect(r.casosConCastigo).toBe(r.ideas.filter((f) => f.fichas === 2).length);
    }
  });

  it("quien hace todo bien llega a la plaza fija; quien firma todo tal cual, no", () => {
    for (const p of todos.slice(0, 120)) todoBienYTodoTalCual(p);
  });

  function todoBienYTodoTalCual(p: PaqueteT1) {
    const t = p.version.tipos;
    const c = p.carpetas.porCaso;
    const real = p.version.decisionReal;
    const { mu } = p.cifras.caso3;
    const op = "c" as const;
    const bien: JugadaT1 = {
      1: { abiertos: [c[1].claves[0]] },
      2: t[2] === "P" ? { abiertos: [c[2].claves[0]], decision: "frase", piezaClave: true } : { abiertos: [c[2].claves[0]], decision: "tal" },
      3:
        t[3] === "B"
          ? { abiertos: [c[3].claves[0]], tandas: 0, decision: "tal" }
          : { abiertos: [c[3].claves[0]], tandas: 2, decision: "rango", a: Math.round((mu - 0.4) * 10) / 10, b: Math.round((mu + 0.4) * 10) / 10, piezaClave: true },
      4: { abiertos: [c[4].claves[0]], eleccion: p.version.buenoEsA ? "A" : "B" },
      5: { opcion: op, abiertos: ["C5-1", "C5-3"], x: p.cifras.caso5.opciones[op].rho },
      6: { abiertos: [c[6].claves[0]], decision: "redactar", N: p.cifras.caso6.N, extension: "grupo" },
      7: { decision: t[7] === "P" ? "redisenar" : "tal", x: p.cifras.caso7.x },
      8: { abiertos: [...c[8].claves].slice(0, 2), enMesa: [...c[8].claves].slice(0, 2), decision: real },
    };
    const r = resumenT1(p, bien);
    expect(r.ideas.map((f) => f.clase)).toEqual(Array(8).fill("descubrió solo"));
    expect(r.ideas.flatMap((f) => f.codigos)).toEqual([]);
    expect(r.habitos).toEqual([]);
    expect(r.plazaFija).toBe(true);
    expect(lineaDelDocente(r)).toEqual({ casillas: Array(8).fill("descubrió solo"), habitos: [], plazaFija: true });

    const tal: JugadaT1 = {
      1: { abiertos: [] },
      2: { abiertos: [], decision: "tal" },
      3: { abiertos: [], tandas: 0, decision: "tal" },
      4: { abiertos: [], eleccion: "A" },
      5: { opcion: "a", abiertos: ["C5-1"], x: p.cifras.caso5.opciones.a.bruta },
      6: { abiertos: [], decision: "tal" },
      7: { decision: "tal", x: p.cifras.caso7.x + 3 },
      8: { abiertos: [], enMesa: [], decision: 0 },
    };
    const q = resumenT1(p, tal);
    expect(q.plazaFija).toBe(false);
    expect(q.ideas.find((f) => f.idea === 1)!.clase).toBe("descubrió con pista");
    expect(q.ideas.find((f) => f.idea === 1)!.sobre).toBe("S-P1");
    expect(q.ideas.find((f) => f.idea === 2)!.rama).toBe(t[2] === "P" ? "F2b" : "F2g");
    expect(q.ideas.find((f) => f.idea === 7)!.rama).toBe(t[7] === "P" ? "F7d" : "F7g");
    expect(q.ideas.filter((f) => f.clase === "descubrió solo")).toEqual([]);
  }

  it("una partida a medias: filas solo de lo jugado, sin plaza fija, y los tubos se cortan donde falta un caso", () => {
    const p = todos[4];
    const completa = jugadaAlAzar(p, azarConSemilla(99));
    const orden = p.version.orden;
    const falta = orden[3];
    const j: JugadaT1 = { ...completa };
    delete j[falta];
    const r = resumenT1(p, j);
    expect(r.ideas).toHaveLength(7);
    expect(r.completo).toBe(false);
    expect(r.plazaFija).toBeNull();
    expect(casosPendientes(p, j)).toEqual([falta]);
    for (const f of r.ideas) {
      if (f.idea === 1) continue;
      if (f.lugar < 4) expect(f.antes).not.toBeNull();
      else expect(f.antes).toBeNull();
    }
    expect(lineaDelDocente(r).casillas[falta - 1]).toBeNull();
    expect(resumenT1(p, {}).ideas).toEqual([]);
  });

  it("la jugada se rearma con los eventos `entrada` de la partida; si un caso se repite vale el último", () => {
    const p = todos[10];
    const j = jugadaAlAzar(p, azarConSemilla(5));
    const eventos: EventoT1[] = [{ tipo: "p1.respuestas", propias: true }];
    for (const caso of p.version.orden) {
      eventos.push({ tipo: "carta", idea: caso, orden: 1 });
      eventos.push({ tipo: "entrada", caso, entrada: j[caso] });
    }
    expect(jugadaDeEventos(eventos)).toEqual(j);
    expect(resumenT1(p, jugadaDeEventos(eventos))).toEqual(resumenT1(p, j));
    const otra = { abiertos: [], eleccion: "ninguna" as const };
    expect(jugadaDeEventos([...eventos, { tipo: "entrada", caso: 4, entrada: otra }])[4]).toEqual(otra);
  });

  it("el estado del paso 1 no depende de la ayuda: solo de lo que abrió con sus fichas", () => {
    const p = todos[0];
    const clave = p.carpetas.porCaso[1].claves[0];
    expect(resolverCaso(p, 1 as NumeroDeCaso, { abiertos: [clave], ayudado: true }).estado).toEqual({ ficha: 1, abrePropio: true });
    expect(resolverCaso(p, 1 as NumeroDeCaso, { abiertos: [], ayudado: true }).estado).toEqual({ ficha: 1, abrePropio: false });
  });
});
