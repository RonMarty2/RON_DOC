import { describe, expect, it } from "vitest";
import { comoPartida } from "../partida";
import {
  CANTIDAD_DE_CASOS,
  ESCENA_T1,
  FICHAS_CASTIGO,
  FICHAS_NORMALES,
  MARCA_BAJA,
  MARCA_META,
  MEDIDOR_MAX,
  MEDIDOR_MIN,
  META_CIERRE,
  SEMILLA_T1,
} from "./reglas-t1";

describe("reglas-t1 · constantes", () => {
  it("meta 65/65 como UN número, marcas 25 y 65, fichas 3 y 2, tope 0 a 100, 8 casos", () => {
    expect(META_CIERRE).toBe(65);
    expect(MARCA_META).toBe(META_CIERRE);
    expect(MARCA_BAJA).toBe(25);
    expect(FICHAS_NORMALES).toBe(3);
    expect(FICHAS_CASTIGO).toBe(2);
    expect([MEDIDOR_MIN, MEDIDOR_MAX]).toEqual([0, 100]);
    expect(CANTIDAD_DE_CASOS).toBe(8);
    expect(SEMILLA_T1).toBe("psicoestadistica:1");
  });

  it("la escena admite versiones de 1 a 999 y nunca la 0", () => {
    expect(ESCENA_T1.versionValida(1)).toBe(true);
    expect(ESCENA_T1.versionValida(999)).toBe(true);
    expect(ESCENA_T1.versionValida(0)).toBe(false);
    expect(ESCENA_T1.versionValida(1000)).toBe(false);
    expect(ESCENA_T1.versionValida(2.5)).toBe(false);
    const p = comoPartida(ESCENA_T1, 7, { isla: "psicoestadistica", escena: "tema1", version: 7, eventos: [], terminada: false });
    expect(p?.version).toBe(7);
  });
});
