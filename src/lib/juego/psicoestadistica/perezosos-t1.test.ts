/**
 * Las 999 versiones del Tema 1 contra el alumno perezoso (02-bucle-y-mecanicas.md secc. 11) y los supuestos Q1 a Q9
 * (04-aprendizaje.md T1.8, H-C2).
 *
 * Tres capas:
 *  1. Q1 a Q9: lo que los textos de la revelación afirman, garantizado por el generador en las 999 versiones.
 *  2. El motor real (cifras + carpeta + respuestas) se une al simulador del bloque 1: cada opción «sin abrir papeles» del
 *     simulador paga EXACTAMENTE lo que paga `respuestas.ts` en cada versión (las filas de pago son una sola).
 *  3. Con ese puente, las estrategias perezosas del simulador se juegan sobre las 999 versiones reales y sus tasas de la meta
 *     65/65 se comparan con las de su propio muestreador (20 000 versiones, salida_simular_t1_v2.txt). Y las mismas estrategias
 *     perezosas jugadas directamente contra `respuestas.ts` (firmar siempre, cero, frenar siempre, al azar, abrir 3 al azar).
 */

import { describe, expect, it } from "vitest";
import { azarConSemilla } from "../../finanzas/ejercicios";
import { VERSION_MAXIMA } from "../planta";
import { OPCIONES_CASO5, REQUERIDOS_CASO5 } from "./carpeta";
import { hechosA, paqueteT1, type PaqueteT1 } from "./cifras";
import { aplicarEfecto, medidoresIniciales, metaAlcanzada } from "./medidores";
import { META_CIERRE, type NumeroDeCaso } from "./reglas-t1";
import {
  resolverCaso2,
  resolverCaso3,
  resolverCaso4,
  resolverCaso5,
  resolverCaso6,
  resolverCaso7,
  resolverCaso8,
  type ResultadoCaso,
} from "./respuestas";
import {
  estrategiasConNombre,
  jugar,
  jugarPolitica,
  muestrearVersionSim,
  OPCIONES,
  pasa,
  tablaDeOpciones,
  type VersionSim,
} from "./simulador-t1";

const paquetes: PaqueteT1[] = Array.from({ length: VERSION_MAXIMA }, (_, i) => paqueteT1(i + 1));
const r1 = (x: number) => Math.round(x * 10) / 10;
const d = (x: number) => Math.round(x * 10);
const COD = { P: 0, B: 1, A: 2 } as const;
type Op = "a" | "b" | "c";

// ═══ 1 · Q1 a Q9 ═════════════════════════════════════════════════════════════

describe("Q1 a Q9 en las 999 versiones", () => {
  it("Q1 · los llamados subieron (cambio medio ≥ 1) en las tres opciones", () => {
    for (const p of paquetes) for (const op of OPCIONES_CASO5) expect(p.cifras.caso5.opciones[op].bruta).toBeGreaterThanOrEqual(1);
  });

  it("Q2 · en (a) y (b) la resta inflada queda por encima de ρ + 1", () => {
    for (const p of paquetes) for (const op of ["a", "b"] as const) expect(p.cifras.caso5.opciones[op].inflada! - p.cifras.caso5.opciones[op].rho).toBeGreaterThan(1);
  });

  it("Q3 · en (c) el grupo del sorteo que no fue al taller subió (≥ 1)", () => {
    for (const p of paquetes) {
      const g = p.cifras.caso5.opciones.c.grupo!;
      expect(d(g.despues) - d(g.antes)).toBeGreaterThanOrEqual(10);
    }
  });

  it("Q4 · en (a) el colegio vecino sin taller subió (≥ 4, I2)", () => {
    for (const p of paquetes) {
      const v = p.cifras.caso5.opciones.a.vecino!;
      expect(d(v.despues) - d(v.antes)).toBeGreaterThanOrEqual(40);
    }
  });

  it("Q5 · en (b) el informe dice «unos 2,5 puntos» y 2,5 es exactamente lo que separa a la inflada de ρ", () => {
    for (const p of paquetes) {
      const b = p.cifras.caso5.opciones.b;
      expect(d(b.inflada!) - d(b.rho)).toBe(25);
    }
  });

  it("Q6 · el cero del caso 2 es cierto: la gráfica termina en 0 en las 999 versiones, en P y en B, con cualquiera de los 3 claves", () => {
    const claves = new Set<string>();
    for (const p of paquetes) {
      expect(p.cifras.caso2.denuncias.at(-1)).toBe(0);
      claves.add(`${p.version.tipos[2]}:${p.carpetas.porCaso[2].claves[0]}`);
    }
    expect(claves.size).toBe(6);
  });

  it("Q7 · las tres medias de las tandas que se muestran son distintas", () => {
    for (const p of paquetes) expect(new Set(p.cifras.caso3.medias).size).toBe(3);
  });

  it("Q8 · la carpeta de 6 trae siempre lo que la opción elegida necesita", () => {
    for (const p of paquetes) for (const op of OPCIONES_CASO5) for (const id of REQUERIDOS_CASO5[op]) expect(p.carpetas.caso5[op].papeles.map((q) => q.id)).toContain(id);
  });

  it("Q9 · en el tipo A, {hechosA} nombra solo lo que dicen los papeles abiertos", () => {
    let vistos = 0;
    for (const p of paquetes) {
      if (p.version.tipos[6] !== "A") continue;
      vistos++;
      const todosLosIds = p.carpetas.porCaso[6].papeles.map((q) => q.id);
      expect(hechosA(p.carpetas, [])).toEqual([]);
      const claveAbierto = hechosA(p.carpetas, todosLosIds);
      expect(claveAbierto).toHaveLength(1); // un solo clave por versión: nunca nombra un hecho cuyo papel no se abrió
    }
    expect(vistos).toBeGreaterThan(100);
  });
});

// ═══ 2 · El puente: motor real ↔ simulador del bloque 1 ═══════════════════════

function simDe(p: PaqueteT1, op: Op, u: number[]): VersionSim {
  const { version: v, cifras: c, carpetas } = p;
  return {
    b2: v.tipos[2] === "B",
    ref: carpetas.porCaso[2].papeles.some((q) => q.id === "C2-4"),
    t3: COD[v.tipos[3]],
    t6: COD[v.tipos[6]],
    t7: COD[v.tipos[7]],
    order: v.orden.filter((n) => n >= 2).map((n) => n - 2),
    mu: c.caso3.mu,
    tandas: c.caso3.medias,
    cifra: c.caso3.cifra,
    buenoA: v.buenoEsA,
    delta: v.efectoReal,
    rho: c.caso5.opciones[op].rho,
    real8: v.decisionReal,
    beto: v.propuestaDeBeto,
    u,
  };
}

interface Reales {
  p: PaqueteT1;
  u: number[];
  sim: Record<Op, VersionSim>;
}
const reales: Reales[] = paquetes.map((p) => {
  const azar = azarConSemilla(p.version.semilla * 100 + 99); // k=99: solo para las pruebas, nunca para el juego
  const u = Array.from({ length: 8 }, () => azar());
  return { p, u, sim: { a: simDe(p, "a", u), b: simDe(p, "b", u), c: simDe(p, "c", u) } };
});

/** La tabla de opciones del simulador, con ρ de la opción que corresponde en el caso 5. */
function tablaMixta(r: Reales): [number, number][][] {
  const base = tablaDeOpciones(r.sim.a) as [number, number][][];
  const porOp = { a: base, b: tablaDeOpciones(r.sim.b) as [number, number][][], c: tablaDeOpciones(r.sim.c) as [number, number][][] };
  const c5 = OPCIONES[3].opciones.map((nombre, j) => porOp[nombre[0] as Op][3][j]);
  return base.map((fila, i) => (i === 3 ? c5 : fila));
}

/** La opción del simulador, jugada contra `respuestas.ts` sin abrir ningún papel. */
function motorDe(p: PaqueteT1, caso: string, opcion: string, u: number[]): ResultadoCaso {
  const c3 = p.cifras.caso3;
  const m2 = (c3.medias[0] + c3.medias[1]) / 2;
  const rango = (mitad: number) => ({ a: r1(m2 - mitad), b: r1(m2 + mitad) });
  const x = p.cifras.caso7.x;
  switch (caso) {
    case "c2":
      return resolverCaso2(p, { abiertos: [], decision: opcion === "tal" ? "tal" : opcion === "frenar" ? "frenar" : "frase" });
    case "c3": {
      if (opcion === "tal" || opcion === "frenar") return resolverCaso3(p, { abiertos: [], tandas: 2, decision: opcion });
      if (opcion === "adapta") return motorDe(p, caso, Math.abs(c3.cifra - m2) < 0.7 ? "tal" : "r2", u);
      return resolverCaso3(p, { abiertos: [], tandas: 2, decision: "rango", ...rango(opcion === "r2" ? 0.6 : 1.3) });
    }
    case "c4":
      return resolverCaso4(p, { abiertos: [], eleccion: opcion as "A" | "B" | "ninguna" });
    case "c5": {
      const [op, que] = opcion.split("|") as [Op, string];
      return resolverCaso5(p, { opcion: op, abiertos: [], x: que === "frenar" ? null : 0 });
    }
    case "c6": {
      const N = p.cifras.caso6.N;
      if (opcion === "tal" || opcion === "frenar") return resolverCaso6(p, { abiertos: [], decision: opcion });
      return resolverCaso6(p, { abiertos: [], decision: "redactar", N, extension: opcion === "base" ? "ninguna" : "podrian" });
    }
    case "c7": {
      if (opcion === "adapta") return motorDe(p, caso, p.version.tipos[7] === "P" ? "redisenar" : "tal", u);
      return opcion === "frenar" ? resolverCaso7(p, { decision: "frenar" }) : resolverCaso7(p, { decision: opcion as "tal" | "redisenar", x });
    }
    default: {
      const dec = { fin: 0, nofin: 1, esperar: 2, beto: p.version.propuestaDeBeto, contra: (p.version.propuestaDeBeto + 1 + (u[7] < 0.5 ? 1 : 0)) % 3 }[opcion] as 0 | 1 | 2;
      return resolverCaso8(p, { abiertos: [], enMesa: [], decision: dec });
    }
  }
}

describe("puente · cada opción sin papeles del simulador paga lo mismo que respuestas.ts, en las 999 versiones", () => {
  it("c2, c4, c5, c6, c7 y c8: coincidencia exacta", () => {
    for (const r of reales) {
      const tabla = tablaMixta(r);
      OPCIONES.forEach((o, i) => {
        if (o.caso === "c3") return;
        o.opciones.forEach((nombre, j) => {
          const e = motorDe(r.p, o.caso, nombre, r.u).efecto;
          expect({ v: r.p.version.semilla, caso: o.caso, nombre, e: [e.c, e.voz] }).toEqual({ v: r.p.version.semilla, caso: o.caso, nombre, e: tabla[i][j] });
        });
      });
    }
  });

  it("c3: coincidencia exacta salvo, a lo sumo, un puñado de rangos en el borde de «cubre» al redondear a décimas", () => {
    let comparados = 0;
    const distintos: string[] = [];
    for (const r of reales) {
      const tabla = tablaMixta(r);
      OPCIONES[1].opciones.forEach((nombre, j) => {
        const e = motorDe(r.p, "c3", nombre, r.u).efecto;
        comparados++;
        if (e.c !== tabla[1][j][0] || e.voz !== tabla[1][j][1]) distintos.push(`${r.p.version.semilla}:${nombre}`);
      });
    }
    expect(comparados).toBe(999 * 5);
    expect(distintos.length).toBeLessThanOrEqual(5);
  });
});

// ═══ 3 · Las estrategias perezosas del simulador, sobre las versiones reales ══

const N_MUESTRA = 6000;
const muestreador = azarConSemilla(20261008);
const muestra: VersionSim[] = Array.from({ length: N_MUESTRA }, () => muestrearVersionSim(muestreador));

/** Las estrategias que miran ρ de la opción (a) usan la versión con ρ_a; las demás, con ρ_c. */
const CON_RHO_A = (nombre: string) => nombre === "E-S1" || nombre === "E-S3b" || nombre === "E-S4" || nombre === "E-S5";

function tasasReales(): Record<string, number> {
  const cuenta: Record<string, number> = {};
  reales.forEach((r, i) => {
    const ant = reales[(i + reales.length - 1) % reales.length];
    const deA = estrategiasConNombre(r.sim.a, ant.sim.a);
    const deC = estrategiasConNombre(r.sim.c, ant.sim.c);
    for (const nombre of Object.keys(deC)) {
      const simUsada = CON_RHO_A(nombre) ? r.sim.a : r.sim.c;
      const ef = (CON_RHO_A(nombre) ? deA : deC)[nombre];
      if (pasa(jugar(simUsada, ef))) cuenta[nombre] = (cuenta[nombre] ?? 0) + 1;
      else cuenta[nombre] = cuenta[nombre] ?? 0;
    }
  });
  return Object.fromEntries(Object.entries(cuenta).map(([k, n]) => [k, n / reales.length]));
}
function tasasMuestreo(): Record<string, number> {
  const cuenta: Record<string, number> = {};
  muestra.forEach((v, i) => {
    const todas = estrategiasConNombre(v, muestra[(i + N_MUESTRA - 1) % N_MUESTRA]);
    for (const [nombre, ef] of Object.entries(todas)) cuenta[nombre] = (cuenta[nombre] ?? 0) + (pasa(jugar(v, ef)) ? 1 : 0);
  });
  return Object.fromEntries(Object.entries(cuenta).map(([k, n]) => [k, n / N_MUESTRA]));
}
const real = tasasReales();
const muest = tasasMuestreo();

describe("estrategias perezosas del simulador sobre las 999 versiones reales", () => {
  it("firmar siempre, frenar siempre y lo intermedio sin papeles NO pasan la meta ni una vez (E-S1, E-S2, E-S3, E-S3b, E-S3c)", () => {
    for (const n of ["E-S1", "E-S2", "E-S3", "E-S3b", "E-S3c"]) expect(real[n], n).toBe(0);
  });

  it("copiar las decisiones de otra versión casi nunca pasa (E-S9 < 3 %)", () => {
    expect(real["E-S9"]).toBeLessThan(0.03);
  });

  it("abrir 3 al azar y firmar (E-S4) o frenar (E-S5) quedan lejos de entender, y cerca de lo que mide el simulador", () => {
    expect(Math.abs(real["E-S4"] - muest["E-S4"])).toBeLessThan(0.07);
    expect(Math.abs(real["E-S5"] - muest["E-S5"])).toBeLessThan(0.07);
    expect(real["E-S4"]).toBeLessThan(real["E-S10|firmar|0.80"]);
    expect(real["E-S5"]).toBeLessThan(real["E-S10|prudente|0.80"]);
  });

  it("quien entiende pasa más que quien lo da a veces, con los tres respaldos", () => {
    for (const resp of ["prudente", "firmar", "intermedio"]) {
      const t = (p: string) => real[`E-S10|${resp}|${p}`];
      expect(t("1.00")).toBe(1);
      expect(t("0.95")).toBeGreaterThan(t("0.80"));
      expect(t("0.80")).toBeGreaterThan(t("0.50"));
      expect(t("0.50")).toBeGreaterThan(t("0.25"));
    }
  });

  it("las tasas de TODAS las estrategias del simulador, sobre las 999 versiones reales, caen cerca de las de su muestreador (20 000 versiones en Python: salida_simular_t1_v2.txt)", () => {
    const peor: Array<[string, number, number]> = [];
    for (const nombre of Object.keys(real)) {
      const dif = Math.abs(real[nombre] - muest[nombre]);
      if (dif > 0.05) peor.push([nombre, real[nombre], muest[nombre]]);
    }
    expect(peor).toEqual([]);
  });

  it("las sobrecorrecciones (rediseñar siempre el 7, escribir 0 siempre en el 5, esperar siempre en el 8) rinden menos que quien entiende con el mismo p", () => {
    for (const caso of ["7", "5", "8"]) for (const p of ["0.65", "0.80"]) expect(real[`SOBRE|${caso}|${p}`], `${caso} ${p}`).toBeLessThan(real[`E-S10|prudente|${p}`] + 0.02);
  });
});

describe("la mejor política fija que NUNCA abre un papel (21 600 políticas), buscada en la mitad de las versiones y re-medida en la otra", () => {
  it("queda muy por debajo del umbral declarado (15 %) y cerca del 5,0 % de la salida del simulador", () => {
    const mitad = Math.floor(reales.length / 2);
    const busqueda = reales.slice(0, mitad);
    const control = reales.slice(mitad);
    const tablasB = busqueda.map(tablaMixta);
    const tablasC = control.map(tablaMixta);
    const largos = OPCIONES.map((o) => o.opciones.length);
    const pol = [0, 0, 0, 0, 0, 0, 0];
    let mejor = { cuenta: -1, pol: [...pol] };
    let sobre10 = 0;
    const total = largos.reduce((a, b) => a * b, 1);
    expect(total).toBe(21600);
    for (let n = 0; n < total; n++) {
      let k = n;
      for (let i = 6; i >= 0; i--) {
        pol[i] = k % largos[i];
        k = Math.floor(k / largos[i]);
      }
      let pasaN = 0;
      for (let j = 0; j < busqueda.length; j++) if (pasa(jugarPolitica(busqueda[j].sim.c, tablasB[j], pol))) pasaN++;
      if (pasaN / busqueda.length >= 0.1) sobre10++;
      if (pasaN > mejor.cuenta) mejor = { cuenta: pasaN, pol: [...pol] };
    }
    const enBusqueda = mejor.cuenta / busqueda.length;
    const remedida = control.filter((r, j) => pasa(jugarPolitica(r.sim.c, tablasC[j], mejor.pol))).length / control.length;
    // La búsqueda favorece a la ganadora (se la elige por ser la mejor en ESA mitad): la cifra honesta es la re-medida.
    expect(enBusqueda).toBeLessThan(0.15);
    expect(remedida).toBeLessThan(0.12);
    expect(remedida).toBeGreaterThan(0.01);
    expect(sobre10).toBeLessThanOrEqual(3);
  }, 120_000);
});

// ═══ 4 · El alumno perezoso contra respuestas.ts ═════════════════════════════

type Decisiones = Partial<Record<NumeroDeCaso, ResultadoCaso>>;

/** Juega el tema entero en el orden de la versión: el efecto de cada caso se aplica con tope una vez por caso. */
function pasaLaMeta(p: PaqueteT1, r: Decisiones): boolean {
  let m = medidoresIniciales();
  for (const caso of p.version.orden) {
    if (caso === 1) continue;
    m = aplicarEfecto(m, r[caso]!.efecto);
  }
  return metaAlcanzada(m);
}

const tasa = (f: (p: PaqueteT1, i: number) => boolean) => paquetes.filter((p, i) => f(p, i)).length / paquetes.length;

describe("el alumno perezoso contra respuestas.ts (sin pasar por el simulador)", () => {
  it("firmar siempre sin abrir nada (con 0 en el caso 5 y el x de la hoja en el 7): no pasa nunca, y su mejor suma es 64 < 65", () => {
    let mayorC = 0;
    const t = tasa((p) => {
      const r: Decisiones = {
        2: resolverCaso2(p, { abiertos: [], decision: "tal" }),
        3: resolverCaso3(p, { abiertos: [], tandas: 0, decision: "tal" }),
        4: resolverCaso4(p, { abiertos: [], eleccion: "A" }),
        5: resolverCaso5(p, { opcion: "a", abiertos: [], x: 0 }),
        6: resolverCaso6(p, { abiertos: [], decision: "tal" }),
        7: resolverCaso7(p, { decision: "tal", x: p.cifras.caso7.x }),
        8: resolverCaso8(p, { abiertos: [], enMesa: [], decision: 0 }),
      };
      let m = medidoresIniciales();
      for (const caso of p.version.orden) if (caso !== 1) m = aplicarEfecto(m, r[caso]!.efecto);
      mayorC = Math.max(mayorC, m.c);
      return pasaLaMeta(p, r);
    });
    expect(t).toBe(0);
    expect(mayorC).toBeLessThan(META_CIERRE);
  });

  it("frenar siempre: no pasa nunca (la Voz no llega)", () => {
    const t = tasa((p) =>
      pasaLaMeta(p, {
        2: resolverCaso2(p, { abiertos: [], decision: "frenar" }),
        3: resolverCaso3(p, { abiertos: [], tandas: 0, decision: "frenar" }),
        4: resolverCaso4(p, { abiertos: [], eleccion: "ninguna" }),
        5: resolverCaso5(p, { opcion: "a", abiertos: [], x: null }),
        6: resolverCaso6(p, { abiertos: [], decision: "frenar" }),
        7: resolverCaso7(p, { decision: "frenar" }),
        8: resolverCaso8(p, { abiertos: [], enMesa: [], decision: 2 }),
      }),
    );
    expect(t).toBe(0);
  });

  it("«cero» (el sorteo (c), x = 0 en el caso 5 y lo prudente en lo demás): no pasa nunca", () => {
    const t = tasa((p) =>
      pasaLaMeta(p, {
        2: resolverCaso2(p, { abiertos: [], decision: "frase" }),
        3: resolverCaso3(p, { abiertos: [], tandas: 2, decision: "rango", a: r1(p.cifras.caso3.medias[0] - 0.6), b: r1(p.cifras.caso3.medias[0] + 0.6) }),
        4: resolverCaso4(p, { abiertos: [], eleccion: "ninguna" }),
        5: resolverCaso5(p, { opcion: "c", abiertos: [], x: 0 }),
        6: resolverCaso6(p, { abiertos: [], decision: "redactar", N: p.cifras.caso6.N, extension: "ninguna" }),
        7: resolverCaso7(p, { decision: "tal", x: p.cifras.caso7.x }),
        8: resolverCaso8(p, { abiertos: [], enMesa: [], decision: 2 }),
      }),
    );
    expect(t).toBe(0);
  });

  it("al azar en cada caso, sin abrir nada: casi nunca pasa (menos de 2 %)", () => {
    const t = tasa((p) => {
      const a = azarConSemilla(p.version.semilla * 100 + 98);
      const elige = <T,>(xs: readonly T[]) => xs[Math.floor(a() * xs.length)];
      const c3 = p.cifras.caso3;
      const op = elige(["a", "b", "c"] as const);
      const dec8 = elige([0, 1, 2] as const);
      const r: Decisiones = {
        2: resolverCaso2(p, { abiertos: [], decision: elige(["tal", "frenar", "frase"] as const) }),
        3: (() => {
          const d3 = elige(["tal", "frenar", "rango"] as const);
          const centro = c3.medias[0];
          return d3 === "rango"
            ? resolverCaso3(p, { abiertos: [], tandas: 2, decision: d3, a: r1(centro - 0.6), b: r1(centro + 0.6) })
            : resolverCaso3(p, { abiertos: [], tandas: 2, decision: d3 });
        })(),
        4: resolverCaso4(p, { abiertos: [], eleccion: elige(["A", "B", "ninguna"] as const) }),
        5: resolverCaso5(p, { opcion: op, abiertos: [], x: elige([null, 0, 5, 10] as const) }),
        6: (() => {
          const d6 = elige(["tal", "frenar", "redactar"] as const);
          return d6 === "redactar"
            ? resolverCaso6(p, { abiertos: [], decision: d6, N: p.cifras.caso6.N, extension: elige(["ninguna", "podrian"] as const) })
            : resolverCaso6(p, { abiertos: [], decision: d6 });
        })(),
        7: (() => {
          const d7 = elige(["tal", "redisenar", "frenar"] as const);
          return d7 === "frenar" ? resolverCaso7(p, { decision: d7 }) : resolverCaso7(p, { decision: d7, x: p.cifras.caso7.x });
        })(),
        8: resolverCaso8(p, { abiertos: [], enMesa: [], decision: dec8 }),
      };
      return pasaLaMeta(p, r);
    });
    expect(t).toBeLessThan(0.02);
  });

  /** Abre 3 papeles al azar en cada caso; si halla el clave decide bien, si no firma o frena. */
  function abreTres(p: PaqueteT1, fallback: "firmar" | "prudente"): boolean {
    const a = azarConSemilla(p.version.semilla * 100 + 97);
    const tres = (ids: readonly string[]) => {
      const m = [...ids];
      for (let i = m.length - 1; i > 0; i--) {
        const j = Math.floor(a() * (i + 1));
        [m[i], m[j]] = [m[j], m[i]];
      }
      return m.slice(0, 3);
    };
    const firmar = fallback === "firmar";
    const ids = (c: ReturnType<typeof tresCarpeta>) => c.papeles.map((q) => q.id);
    function tresCarpeta(caso: 2 | 3 | 4 | 6 | 7 | 8) {
      return p.carpetas.porCaso[caso];
    }
    const hay = (abiertos: string[], claves: readonly string[]) => claves.some((k) => abiertos.includes(k));
    const r: Decisiones = {};

    const a2 = tres(ids(tresCarpeta(2)));
    const k2 = p.carpetas.porCaso[2].claves[0];
    r[2] = a2.includes(k2)
      ? resolverCaso2(p, { abiertos: a2, decision: "frase", piezaClave: true, piezaRefuerzo: a2.includes("C2-4") && p.carpetas.porCaso[2].refuerzo !== null })
      : resolverCaso2(p, { abiertos: a2, decision: firmar ? "tal" : "frenar" });

    // Caso 3: con 3 fichas gastadas en papeles no quedan tandas, así que ni siquiera el clave abierto permite un rango.
    const a3 = tres(ids(tresCarpeta(3)));
    r[3] = resolverCaso3(p, { abiertos: a3, tandas: 0, decision: firmar || (a3.includes(p.carpetas.porCaso[3].claves[0]) && p.version.tipos[3] === "B") ? "tal" : "frenar" });

    const a4 = tres(ids(tresCarpeta(4)));
    r[4] = resolverCaso4(p, { abiertos: a4, eleccion: hay(a4, p.carpetas.porCaso[4].claves) ? (p.version.buenoEsA ? "A" : "B") : firmar ? "A" : "ninguna" });

    const a5 = tres(p.carpetas.caso5.c.papeles.map((q) => q.id));
    const enc = REQUERIDOS_CASO5.c.every((id) => a5.includes(id));
    r[5] = resolverCaso5(p, { opcion: "c", abiertos: a5, x: enc ? p.cifras.caso5.opciones.c.rho : firmar ? 0 : null });

    const a6 = tres(ids(tresCarpeta(6)));
    const k6 = a6.includes(p.carpetas.porCaso[6].claves[0]);
    r[6] = k6
      ? resolverCaso6(p, { abiertos: a6, decision: "redactar", N: p.cifras.caso6.N, extension: "grupo" })
      : resolverCaso6(p, { abiertos: a6, decision: firmar ? "tal" : "frenar" });

    const a7 = tres(ids(tresCarpeta(7)));
    const x7 = p.cifras.caso7.x;
    r[7] = a7.includes(p.carpetas.porCaso[7].claves[0])
      ? resolverCaso7(p, { decision: p.version.tipos[7] === "P" ? "redisenar" : "tal", x: x7 })
      : firmar
        ? resolverCaso7(p, { decision: "tal", x: x7 })
        : resolverCaso7(p, { decision: "frenar" });

    const a8 = tres(ids(tresCarpeta(8)));
    const mesa = p.carpetas.porCaso[8].claves.filter((k) => a8.includes(k));
    const real = p.version.decisionReal;
    const decide = mesa.length === 2 ? real : mesa.length === 1 ? (a() < 2 / 3 ? real : (((real + 1) % 3) as 0 | 1 | 2)) : firmar ? 0 : 2;
    r[8] = resolverCaso8(p, { abiertos: a8, enMesa: mesa, decision: decide as 0 | 1 | 2 });
    return pasaLaMeta(p, r);
  }

  it("abrir 3 papeles al azar: si no halla el clave firma → menos de 45 %; si no, frena → menos de 25 % (el simulador mide 34,9 y 15,7)", () => {
    expect(tasa((p) => abreTres(p, "firmar"))).toBeLessThan(0.45);
    expect(tasa((p) => abreTres(p, "prudente"))).toBeLessThan(0.25);
  });

  it("entender de verdad (clave siempre hallado, decisión correcta, x bien escrito) sí pasa la meta en todas las versiones", () => {
    const t = tasa((p) => {
      const clave = (c: 2 | 3 | 4 | 6 | 7) => p.carpetas.porCaso[c].claves;
      const c3 = p.cifras.caso3;
      const m2 = (c3.medias[0] + c3.medias[1]) / 2;
      const real = p.version.decisionReal;
      const [k1, k2] = p.carpetas.porCaso[8].claves;
      const r: Decisiones = {
        2: resolverCaso2(p, { abiertos: clave(2), decision: "frase", piezaClave: true }),
        3:
          p.version.tipos[3] === "B"
            ? resolverCaso3(p, { abiertos: clave(3), tandas: 0, decision: "tal" })
            : resolverCaso3(p, { abiertos: clave(3), tandas: 2, decision: "rango", a: r1(m2 - 0.6), b: r1(m2 + 0.6), piezaClave: true }),
        4: resolverCaso4(p, { abiertos: [clave(4)[0]], eleccion: p.version.buenoEsA ? "A" : "B" }),
        5: resolverCaso5(p, { opcion: "c", abiertos: [...REQUERIDOS_CASO5.c], x: p.cifras.caso5.opciones.c.rho }),
        6: resolverCaso6(p, { abiertos: clave(6), decision: "redactar", N: p.cifras.caso6.N, extension: "grupo" }),
        7: resolverCaso7(p, { decision: p.version.tipos[7] === "P" ? "redisenar" : "tal", x: p.cifras.caso7.x }),
        8: resolverCaso8(p, { abiertos: [k1, k2], enMesa: [k1, k2], decision: real }),
      };
      return pasaLaMeta(p, r);
    });
    expect(t).toBe(1);
  });
});
