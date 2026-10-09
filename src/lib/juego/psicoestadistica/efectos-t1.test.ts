import { describe, expect, it } from "vitest";
import {
  CODIGOS,
  CODIGOS_POR_CASO,
  efectoDe,
  FILAS,
  FILAS_POR_CASO,
  G5_FILAS,
  G5_MITAD,
  HABITOS_ESPERADOS,
  SIN_SOBRE,
  TIRADAS,
  type Habito,
} from "./efectos-t1";

describe("efectos-t1 · conteos del bucle v2", () => {
  it("46 filas de efecto, repartidas por caso como dice FILAS_POR_CASO", () => {
    const claves = Object.keys(FILAS);
    expect(claves).toHaveLength(46);
    for (const [caso, n] of Object.entries(FILAS_POR_CASO)) {
      expect(claves.filter((k) => k.startsWith(`R${caso}.`))).toHaveLength(n);
    }
  });

  it("29 códigos, cada uno con al menos un hábito, repartidos por caso y por hábito", () => {
    const codigos = Object.entries(CODIGOS);
    expect(codigos).toHaveLength(29);
    for (const [, c] of codigos) expect(c.habitos.length).toBeGreaterThan(0);
    for (const [caso, n] of Object.entries(CODIGOS_POR_CASO)) {
      expect(codigos.filter(([k]) => k.startsWith(`E${caso}`))).toHaveLength(n);
    }
    for (const h of Object.keys(HABITOS_ESPERADOS) as Habito[]) {
      expect(codigos.filter(([, c]) => c.habitos.includes(h))).toHaveLength(HABITOS_ESPERADOS[h]);
    }
    for (const k of SIN_SOBRE) expect(CODIGOS[k]).toBeDefined();
  });

  it("G5: 7 filas de acierto sin evidencia; cinco valen la mitad (hacia cero) de su fila con evidencia", () => {
    expect(G5_FILAS).toHaveLength(7);
    for (const f of G5_FILAS) expect(FILAS[f]).toBeDefined();
    expect(Object.keys(G5_MITAD)).toHaveLength(5);
    for (const [sin, [fila, clave]] of Object.entries(G5_MITAD)) {
      const [c, v] = FILAS[fila][clave];
      const sinClave = Object.keys(FILAS[sin])[0];
      expect(FILAS[sin][sinClave]).toEqual([Math.trunc(c / 2), Math.trunc(v / 2)]);
    }
    expect(efectoDe("R5.8")).toEqual({ c: 4, voz: 2 });
    expect(efectoDe("R8.3")).toEqual({ c: 0, voz: 0 });
  });

  it("las 10 tiradas cumplen G7 y dan P 4, B 4, A 2 en los casos 3 y 6, y P 5, B 5 en el caso 7", () => {
    expect(TIRADAS).toHaveLength(10);
    for (const t of TIRADAS) {
      expect(t).toContain("B");
      expect(t).toContain("P");
      expect(t.filter((x) => x === "A").length).toBeLessThanOrEqual(1);
      expect(t[2]).not.toBe("A");
    }
    const cuenta = (i: number, tipo: string) => TIRADAS.filter((t) => t[i] === tipo).length;
    for (const i of [0, 1]) expect([cuenta(i, "P"), cuenta(i, "B"), cuenta(i, "A")]).toEqual([4, 4, 2]);
    expect([cuenta(2, "P"), cuenta(2, "B")]).toEqual([5, 5]);
  });

  it("efectoDe falla con una fila o clave que no existe", () => {
    expect(() => efectoDe("R9.9")).toThrow();
    expect(() => efectoDe("R4.1", "P")).toThrow();
    expect(efectoDe("R2.1", "P")).toEqual({ c: -20, voz: 10 });
  });
});
