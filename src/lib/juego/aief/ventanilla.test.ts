import { describe, expect, it } from "vitest";
import { cascada } from "../../finanzas/estados";
import {
  CARPETA_T13_EJEMPLO,
  CARPETA_T22_EJEMPLO,
  CARPETA_T23_EJEMPLO,
  PORCENTAJE_GARANTIA,
  VERSION_MAXIMA,
  cifrasDe,
  colorDelCierre,
  correctoDe,
  diagnosticoMonto,
  jornadaMinima,
  metaDelDia,
  montoCorrecto,
  patrimonioFinalDe,
  versionValida,
  type Carpeta,
} from "./ventanilla";

describe("reglas de la jornada", () => {
  it("monto correcto: sí completo, contraoferta redondeada a Bs 100, o cero", () => {
    expect(montoCorrecto({ pide: 30_000, minimo: 15_000, tope: 40_000 })).toBe(30_000);
    expect(montoCorrecto({ pide: 70_000, minimo: 50_000, tope: 62_150 })).toBe(62_100);
    expect(montoCorrecto({ pide: 50_000, minimo: 25_000, tope: 9_000 })).toBe(0);
  });

  it("colores del cierre", () => {
    const c = { pide: 70_000, minimo: 50_000, tope: 62_100 };
    expect(colorDelCierre(c, 62_100)).toBe("verde");
    expect(colorDelCierre(c, 70_000)).toBe("rojo");
    expect(colorDelCierre(c, 54_000)).toBe("gris");
    expect(colorDelCierre(c, 0)).toBe("gris");
    expect(colorDelCierre(c, 20_000)).toBe("no-le-servia");
    const nada = { pide: 50_000, minimo: 25_000, tope: 9_000 };
    expect(colorDelCierre(nada, 0)).toBe("bien-rechazado");
    expect(colorDelCierre(nada, 50_000)).toBe("rojo");
    expect(colorDelCierre(nada, 9_000)).toBe("no-le-servia");
  });

  it("la meta es el 80 % redondeado a mil hacia abajo", () => {
    expect(metaDelDia([62_100, 22_500, 0])).toBe(67_000);
  });
});

describe("las carpetas de la ficha (versión 0)", () => {
  it("Tema 1.3: la sierra vale 103.500 hoy; contraoferta de 62.100", () => {
    expect(cifrasDe(CARPETA_T13_EJEMPLO).tope).toBeCloseTo(62_100, 6);
    expect(correctoDe(CARPETA_T13_EJEMPLO)).toBe(62_100);
    expect(diagnosticoMonto(CARPETA_T13_EJEMPLO, 54_000)).toBe("regla-de-ayer");
    expect(diagnosticoMonto(CARPETA_T13_EJEMPLO, 70_000)).toBe("valor-del-cliente");
  });

  it("Tema 2.2: utilidad neta 45.000; contraoferta de 22.500; la regla de ayer y el olvido del IUE dan rojo", () => {
    expect(cascada(CARPETA_T22_EJEMPLO).utilidadNeta).toBe(45_000);
    expect(correctoDe(CARPETA_T22_EJEMPLO)).toBe(22_500);
    expect(diagnosticoMonto(CARPETA_T22_EJEMPLO, 30_000)).toBe("regla-de-ayer");
    expect(colorDelCierre(cifrasDe(CARPETA_T22_EJEMPLO), 30_000)).toBe("rojo");
    expect(diagnosticoMonto(CARPETA_T22_EJEMPLO, 0)).toBe("iue-sobre-ventas");
  });

  it("Tema 2.3: patrimonio final 400.000, caja 9.000, el correcto es cero", () => {
    expect(patrimonioFinalDe(CARPETA_T23_EJEMPLO)).toBe(400_000);
    expect(correctoDe(CARPETA_T23_EJEMPLO)).toBe(0);
    expect(diagnosticoMonto(CARPETA_T23_EJEMPLO, 50_000)).toBe("solo-la-utilidad");
  });

  it("las tres cumplen las reglas que conservan la lección", () => {
    for (const c of [CARPETA_T13_EJEMPLO, CARPETA_T22_EJEMPLO, CARPETA_T23_EJEMPLO]) expect(versionValida(c), c.tipo).toBe(true);
  });
});

describe("versiones", () => {
  const jornadas = Array.from({ length: VERSION_MAXIMA + 1 }, (_, v) => jornadaMinima(v));

  it("todas las carpetas de las 1.000 versiones son válidas", () => {
    for (const j of jornadas) for (const c of j) expect(versionValida(c), `${c.tipo} v${c.version}`).toBe(true);
  });

  it("hay de los dos casos en los temas que los sortean", () => {
    const t13 = jornadas.map((j) => j[0]);
    const t23 = jornadas.map((j) => j[2]);
    expect(t13.some((c) => correctoDe(c) === c.pide) && t13.some((c) => correctoDe(c) < c.pide)).toBe(true);
    expect(t23.some((c) => correctoDe(c) === 0) && t23.some((c) => correctoDe(c) > 0)).toBe(true);
  });

  it("nadie gana una jornada sin entender, y quien calcula bien gana siempre", () => {
    type Estrategia = (c: Carpeta) => number;
    const reglaDeAyer: Estrategia = (c) => {
      if (c.tipo === "t13") return montoCorrecto({ pide: c.pide, minimo: c.minimo, tope: PORCENTAJE_GARANTIA * c.enLibros });
      if (c.tipo === "t22") return montoCorrecto({ pide: c.pide, minimo: c.minimo, tope: PORCENTAJE_GARANTIA * c.garantiaTasadaHoy });
      return montoCorrecto({ pide: c.pide, minimo: c.minimo, tope: c.utilidadNeta / 2 });
    };
    const perezosas: Record<string, Estrategia> = {
      "siempre lo que pide": (c) => c.pide,
      "siempre cero": () => 0,
      "siempre el mínimo": (c) => c.minimo,
      "la regla de ayer": reglaDeAyer,
    };
    const gana = (j: Carpeta[], e: Estrategia) => j.every((c) => e(c) === correctoDe(c));
    for (const j of jornadas.slice(0, 500)) {
      expect(gana(j, correctoDe)).toBe(true);
      for (const [nombre, e] of Object.entries(perezosas)) expect(gana(j, e), `${nombre} v${j[0].version}`).toBe(false);
    }
  });

  it("números legibles: utilidad neta del Tema 2.2 en miles, cifras de las carpetas en miles", () => {
    for (const j of jornadas) {
      const t22 = j[1] as Extract<Carpeta, { tipo: "t22" }>;
      expect(cascada(t22).utilidadNeta % 1_000, `v${t22.version}`).toBe(0);
      for (const c of j) for (const x of [c.pide, c.minimo]) expect(x % 1_000).toBe(0);
    }
  });

  it("la misma versión da siempre las mismas carpetas, y fuera de rango no hay", () => {
    expect(jornadaMinima(417)).toEqual(jornadaMinima(417));
    expect(() => jornadaMinima(-1)).toThrow();
    expect(() => jornadaMinima(VERSION_MAXIMA + 1)).toThrow();
  });
});
