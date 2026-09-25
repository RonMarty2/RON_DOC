import { describe, expect, it } from "vitest";
import {
  CASO_DOSSIER,
  VERSION_MAXIMA,
  capacidadDiaria,
  consecuencia,
  cuelloDeBotella,
  datosDeVersion,
  revisarCapacidad,
  revisarRecuperacion,
  versionValida,
} from "./planta";

describe("el caso del dossier (versión 0)", () => {
  const d = CASO_DOSSIER;

  it("la fermentación es el cuello de botella: 2 × 200 L en 8 h = 50 L/h, 720 L por día", () => {
    expect(cuelloDeBotella(d)).toBe("fermentacion");
    expect(capacidadDiaria(d)).toBe(720);
  });

  it("la envasadora automática no agrega ni un litro", () => {
    const c = consecuencia(d, "envasadora");
    expect(c.capacidad).toBe(720);
    expect(c.gasto).toBe(38_000);
    expect(c.margenExtraPorMes).toBe(0);
    expect(c.mesesRecuperacion).toBeNull();
  });

  it("el tercer tanque da 1.080 L por día, cubre los 860 pedidos y se recupera en unos 3,1 meses", () => {
    const c = consecuencia(d, "tanque");
    expect(c.capacidad).toBe(1080);
    expect(c.pedidosPerdidosPorDia).toBe(0);
    expect(c.margenExtraPorMes).toBe(140 * 4 * 26);
    expect(c.mesesRecuperacion).toBeCloseTo(45_000 / 14_560, 10);
    expect(revisarRecuperacion(d, 3.1)).toBe(true);
    expect(revisarRecuperacion(d, 3.3)).toBe(false);
  });

  it("no comprar nada pierde 140 pedidos por día", () => {
    expect(consecuencia(d, "nada").pedidosPerdidosPorDia).toBe(140);
  });

  it("reconoce cada error típico por el número que da", () => {
    expect(revisarCapacidad(d, 720)).toBe("correcta");
    expect(revisarCapacidad(d, 721)).toBe("correcta");
    expect(revisarCapacidad(d, 6768)).toBe("sumo-maquinas"); // (300 + 50 + 120) × 16 × 0,9
    expect(revisarCapacidad(d, 800)).toBe("sin-eficiencia");
    expect(revisarCapacidad(d, 1728)).toBe("tomo-envasadora");
    expect(revisarCapacidad(d, 4320)).toBe("tomo-pasteurizador");
    expect(revisarCapacidad(d, 360)).toBe("un-solo-tanque");
    expect(revisarCapacidad(d, 500)).toBe("otra");
  });
});

describe("versiones", () => {
  const todas = Array.from({ length: VERSION_MAXIMA }, (_, i) => datosDeVersion(i + 1));

  it("todas cumplen las reglas que conservan la lección", () => {
    expect(versionValida(CASO_DOSSIER)).toBe(true);
    for (const d of todas) expect(versionValida(d), `versión ${d.version}`).toBe(true);
  });

  it("la misma versión da siempre los mismos datos", () => {
    expect(datosDeVersion(417)).toEqual(datosDeVersion(417));
  });

  it("hay variedad: muchas capacidades distintas entre versiones", () => {
    expect(new Set(todas.map((d) => capacidadDiaria(d))).size).toBeGreaterThan(40);
  });

  it("en cada versión, cada error típico se reconoce", () => {
    for (const d of todas) {
      const hoy = capacidadDiaria(d);
      expect(revisarCapacidad(d, hoy)).toBe("correcta");
      expect(revisarCapacidad(d, Math.round(hoy / (d.eficiencia)))).toBe("sin-eficiencia");
    }
  });

  it("rechaza versiones fuera de rango", () => {
    expect(() => datosDeVersion(-1)).toThrow();
    expect(() => datosDeVersion(VERSION_MAXIMA + 1)).toThrow();
    expect(() => datosDeVersion(2.5)).toThrow();
  });
});
