import { describe, expect, it } from "vitest";
import { azarConSemilla } from "../../finanzas/ejercicios";
import { TIRADAS } from "./efectos-t1";
import { META_CIERRE } from "./reglas-t1";
import {
  c8Valor,
  entiende,
  estrategiasConNombre,
  jugar,
  muestrearVersionSim,
  pasa,
  POLITICAS_FIJAS,
  type VersionSim,
} from "./simulador-t1";

const N = 3000;
const azar = azarConSemilla(20261008);
const muestra: VersionSim[] = Array.from({ length: N }, () => muestrearVersionSim(azar));
const tasa = (f: (v: VersionSim, i: number) => boolean) => muestra.filter(f).length / N;

describe("simulador · el muestreador respeta lo que dice el bucle", () => {
  it("orden: caso 2 primero, caso 8 último, 3 a 7 en medio; tipos de G7", () => {
    for (const v of muestra) {
      expect(v.order[0]).toBe(0);
      expect(v.order[6]).toBe(6);
      expect([...v.order.slice(1, 6)].sort()).toEqual([1, 2, 3, 4, 5]);
      expect(v.t7).not.toBe(2);
      expect(v.rho).toBeGreaterThanOrEqual(-4);
      expect(v.rho).toBeLessThanOrEqual(10);
    }
    expect(TIRADAS).toHaveLength(10);
  });
});

describe("simulador · ninguna estrategia perezosa gana (bucle secc. 11)", () => {
  it("E-S1 (firmar siempre), E-S2 (frenar siempre) y E-S3 (intermedia sin papeles) no pasan la meta ni una vez", () => {
    for (const nombre of ["E-S1", "E-S2", "E-S3", "E-S3b"]) {
      const pol = POLITICAS_FIJAS[nombre];
      expect(pol).toBeDefined();
      expect(tasa((v, i) => pasa(jugar(v, estrategiasConNombre(v, muestra[i])[nombre]))), nombre).toBe(0);
    }
  });

  it("copiar las decisiones de otra versión casi nunca pasa (menos de 3 %)", () => {
    expect(tasa((v, i) => pasa(jugar(v, estrategiasConNombre(v, muestra[(i + N - 1) % N])["E-S9"])))).toBeLessThan(0.03);
  });

  it("quien siempre da con el clave pasa más que quien lo da a veces: la meta premia entender", () => {
    const con = (p: number) => tasa((v) => pasa(jugar(v, entiende(v, p, "prudente"))));
    expect(con(1.0)).toBeGreaterThan(con(0.5));
    expect(con(0.5)).toBeGreaterThan(con(0.25));
  });

  it("la meta es un solo número: con META_CIERRE = 65 el máximo teórico de E-S1 es 64 y no la alcanza", () => {
    // Cota exacta del bucle (E-S1): 50 + 0 (mejor suma de los casos 3, 6 y 7) + 5 + 5 + 4 + 0 = 64.
    expect(50 + 0 + 5 + 5 + 4 + 0).toBeLessThan(META_CIERRE);
  });
});

describe("simulador · caso 8", () => {
  it("decisión correcta paga 12/8, 6/4 o 0/0 según los claves sobre la mesa; el resto, como R8.4 a R8.8", () => {
    expect(c8Valor(0, 0, 2)).toEqual([12, 8]);
    expect(c8Valor(1, 1, 1)).toEqual([6, 4]);
    expect(c8Valor(2, 2, 0)).toEqual([0, 0]);
    expect(c8Valor(1, 0, 2)).toEqual([-20, 6]); // R8.4
    expect(c8Valor(2, 0, 2)).toEqual([-15, 6]); // R8.5
    expect(c8Valor(0, 1, 2)).toEqual([-15, -8]); // R8.6
    expect(c8Valor(2, 1, 2)).toEqual([-10, -6]); // R8.7
    expect(c8Valor(0, 2, 2)).toEqual([0, -8]); // R8.8
    expect(c8Valor(1, 2, 0)).toEqual([0, -8]);
  });
});
