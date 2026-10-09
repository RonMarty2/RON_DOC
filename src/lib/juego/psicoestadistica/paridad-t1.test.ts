/**
 * PARIDAD Python ↔ TypeScript del Tema 1.
 *
 * Los fixtures los escribe `docs/juego/gdd/scripts-t1/exportar_fixtures_t1.py` (con `python`, no `python -I`),
 * que importa tal cual `tablas_t1_v2.py` y `simular_t1_v2.py`. Si cambia una tabla o una regla en Python:
 * se corre el exportador y esta prueba dice dónde el TS quedó atrás.
 *
 * Qué se prueba:
 *  1. Las tablas de efecto, tiradas, códigos y metas son idénticas.
 *  2. Sobre 2000 versiones que numpy sorteó (el TS no puede reproducir el flujo de numpy, así que se pasan
 *     tal cual): cada opción de cada caso y el C y la Voz FINALES de cada estrategia coinciden UNO POR UNO.
 *  3. El barrido de las 21 600 políticas sin papeles da la misma mejor cuenta, los mismos conteos y la misma
 *     política ganadora.
 *  4. Con el muestreador propio del TS (20 000 versiones, semilla 20261008) las tasas de las mismas estrategias
 *     caen dentro del margen estadístico de las que midió Python con 20 000 versiones de numpy.
 */

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { azarConSemilla } from "../../finanzas/ejercicios";
import { CODIGOS, FILAS, FILAS_POR_CASO, G5_FILAS, G5_MITAD, HABITOS_ESPERADOS, SIN_SOBRE, TIRADAS } from "./efectos-t1";
import { MARCA_BAJA, MEDIDOR_INICIO, META_CIERRE } from "./reglas-t1";
import {
  estrategiasConNombre,
  jugar,
  jugarPolitica,
  muestrearVersionSim,
  OPCIONES,
  pasa,
  politicaPorNombres,
  tablaDeOpciones,
  type VersionSim,
} from "./simulador-t1";

interface Fixture {
  meta: { semillaParidad: number; nParidad: number; semillaGrande: number; nGrande: number };
  tablas: {
    META: number;
    MARCA_FICHAS: number;
    INICIO: number;
    TIRADAS: string[][];
    FILAS: Record<string, Record<string, number[]>>;
    FILAS_POR_CASO: Record<string, number>;
    G5_FILAS: string[];
    G5_MITAD: Record<string, string[]>;
    CODIGOS: Record<string, { texto: string; habitos: string[] }>;
    HABITOS_ESPERADOS: Record<string, number>;
    SIN_SOBRE: string[];
  };
  versiones: VersionSim[];
  opciones: Record<string, Record<string, { C: number[]; V: number[] }>>;
  estrategias: Record<string, { C: number[]; V: number[] }>;
  barrido: { total: number; mejorCuenta: number; mejorPolitica: string[]; n10: number; n5: number; top5: { cuenta: number; politica: string[] }[] };
  grande: Record<string, { pasa: number; C: number; V: number }>;
}

const sinTildes = (t: string) => t.normalize("NFD").replace(/\p{M}/gu, "");
const fx: Fixture = JSON.parse(readFileSync("src/lib/juego/psicoestadistica/fixtures/paridad-t1.json", "utf8"));
const vs = fx.versiones;

describe("paridad · tablas", () => {
  it("metas y marcas", () => {
    expect(META_CIERRE).toBe(fx.tablas.META);
    expect(MARCA_BAJA).toBe(fx.tablas.MARCA_FICHAS);
    expect(MEDIDOR_INICIO).toBe(fx.tablas.INICIO);
  });

  it("filas de efecto, idénticas fila por fila y clave por clave", () => {
    expect(Object.keys(FILAS).sort()).toEqual(Object.keys(fx.tablas.FILAS).sort());
    for (const [fila, claves] of Object.entries(fx.tablas.FILAS)) {
      expect(Object.keys(FILAS[fila]).sort(), fila).toEqual(Object.keys(claves).sort());
      for (const [clave, e] of Object.entries(claves)) expect([...FILAS[fila][clave]], `${fila} / ${clave}`).toEqual(e);
    }
    expect(FILAS_POR_CASO).toEqual(Object.fromEntries(Object.entries(fx.tablas.FILAS_POR_CASO).map(([k, n]) => [Number(k), n])));
  });

  it("tiradas, G5, códigos y hábitos", () => {
    expect(TIRADAS.map((t) => [...t])).toEqual(fx.tablas.TIRADAS);
    expect([...G5_FILAS]).toEqual(fx.tablas.G5_FILAS);
    expect(Object.fromEntries(Object.entries(G5_MITAD).map(([k, v]) => [k, [...v]]))).toEqual(fx.tablas.G5_MITAD);
    expect(Object.keys(CODIGOS)).toEqual(Object.keys(fx.tablas.CODIGOS));
    for (const [k, c] of Object.entries(fx.tablas.CODIGOS)) {
      expect(CODIGOS[k].habitos, k).toEqual(c.habitos);
      expect(sinTildes(CODIGOS[k].texto).length, k).toBeGreaterThan(0); // los textos del .py van sin tildes ("redisenio"): no se comparan letra por letra
    }
    expect(HABITOS_ESPERADOS).toEqual(fx.tablas.HABITOS_ESPERADOS);
    expect([...SIN_SOBRE]).toEqual(fx.tablas.SIN_SOBRE);
  });
});

describe(`paridad · ${vs.length} versiones sorteadas por numpy`, () => {
  it("la tabla de cada opción de cada caso coincide en cada versión", () => {
    const tablas = vs.map(tablaDeOpciones);
    OPCIONES.forEach((o, i) => {
      expect(Object.keys(fx.opciones[o.caso]), o.caso).toEqual([...o.opciones]);
      o.opciones.forEach((nombre, j) => {
        const esperado = fx.opciones[o.caso][nombre];
        const C = tablas.map((t) => t[i][j][0]);
        const V = tablas.map((t) => t[i][j][1]);
        expect(C, `${o.caso}/${nombre} C`).toEqual(esperado.C);
        expect(V, `${o.caso}/${nombre} Voz`).toEqual(esperado.V);
      });
    });
  });

  it("el C y la Voz finales de cada estrategia con nombre coinciden uno por uno", () => {
    const n = vs.length;
    const nombres = Object.keys(fx.estrategias);
    expect(nombres.length).toBeGreaterThanOrEqual(35);
    const C: Record<string, number[]> = {};
    const V: Record<string, number[]> = {};
    for (let i = 0; i < n; i++) {
      // np.roll(x, 1): la versión i copia a la i − 1 (la 0 copia a la última).
      const r = estrategiasConNombre(vs[i], vs[(i - 1 + n) % n]);
      for (const nombre of nombres) {
        const fin = jugar(vs[i], r[nombre]);
        (C[nombre] ??= []).push(fin.c);
        (V[nombre] ??= []).push(fin.voz);
      }
    }
    for (const nombre of nombres) {
      expect(C[nombre], `${nombre} C`).toEqual(fx.estrategias[nombre].C);
      expect(V[nombre], `${nombre} Voz`).toEqual(fx.estrategias[nombre].V);
    }
  });

  it("el barrido de las 21 600 políticas sin abrir papeles da lo mismo que Python", () => {
    const tablas = vs.map(tablaDeOpciones);
    const largos = OPCIONES.map((o) => o.opciones.length);
    const total = largos.reduce((a, b) => a * b, 1);
    expect(total).toBe(fx.barrido.total);
    const cuentas = new Map<string, number>();
    const pol = [0, 0, 0, 0, 0, 0, 0];
    let mejor = -1;
    let mejorNombre: string[] = [];
    let n10 = 0;
    let n5 = 0;
    for (let k = 0; k < total; k++) {
      let r = k;
      for (let c = 6; c >= 0; c--) {
        pol[c] = r % largos[c];
        r = Math.floor(r / largos[c]);
      }
      let cuenta = 0;
      for (let i = 0; i < vs.length; i++) if (pasa(jugarPolitica(vs[i], tablas[i], pol))) cuenta++;
      if (cuenta / vs.length >= 0.1) n10++;
      if (cuenta / vs.length >= 0.05) n5++;
      if (cuenta > mejor) {
        mejor = cuenta;
        mejorNombre = pol.map((j, c) => OPCIONES[c].opciones[j]);
      }
      cuentas.set(pol.join(","), cuenta);
    }
    expect(mejor).toBe(fx.barrido.mejorCuenta);
    expect(n10).toBe(fx.barrido.n10);
    expect(n5).toBe(fx.barrido.n5);
    // El primer máximo en el orden del producto cartesiano es el que Python ordenó primero (desempate por política).
    expect(mejorNombre).toEqual(fx.barrido.mejorPolitica);
    // Las 5 mejores de Python tienen en TS la misma cuenta.
    for (const t of fx.barrido.top5) expect(cuentas.get(politicaPorNombres(t.politica).join(","))).toBe(t.cuenta);
  }, 120_000);
});

describe("paridad estadística · 20 000 versiones del muestreador propio del TS", () => {
  const N = fx.meta.nGrande;
  const azar = azarConSemilla(fx.meta.semillaGrande);
  const muestra = Array.from({ length: N }, () => muestrearVersionSim(azar));
  const sumas: Record<string, { pasa: number; C: number; V: number }> = {};
  for (let i = 0; i < N; i++) {
    const r = estrategiasConNombre(muestra[i], muestra[(i - 1 + N) % N]);
    for (const [nombre, e] of Object.entries(r)) {
      const fin = jugar(muestra[i], e);
      const s = (sumas[nombre] ??= { pasa: 0, C: 0, V: 0 });
      s.pasa += pasa(fin) ? 1 : 0;
      s.C += fin.c;
      s.V += fin.voz;
    }
  }

  it("cada estrategia pasa la meta con la misma tasa que en Python (±1,5 puntos, ~4 desvíos típicos del azar)", () => {
    const peores: string[] = [];
    for (const [nombre, s] of Object.entries(sumas)) {
      const py = fx.grande[nombre];
      expect(py, nombre).toBeDefined();
      const dif = Math.abs(s.pasa / N - py.pasa);
      if (dif > 0.015) peores.push(`${nombre}: TS ${(100 * s.pasa) / N} % contra Python ${100 * py.pasa} %`);
      expect(Math.abs(s.C / N - py.C), `${nombre} C media`).toBeLessThan(1.0);
      expect(Math.abs(s.V / N - py.V), `${nombre} Voz media`).toBeLessThan(1.0);
    }
    expect(peores).toEqual([]);
  }, 120_000);

  it("la mejor política sin papeles de Python rinde lo mismo en el muestreador del TS (y queda bajo 15 %)", () => {
    const pol = politicaPorNombres(fx.barrido.mejorPolitica);
    let ok = 0;
    for (const v of muestra) if (pasa(jugarPolitica(v, tablaDeOpciones(v), pol))) ok++;
    expect(Math.abs(ok / N - fx.grande.MEJOR_SIN_PAPELES.pasa)).toBeLessThan(0.015);
    expect(ok / N).toBeLessThan(0.15);
  }, 120_000);
});
