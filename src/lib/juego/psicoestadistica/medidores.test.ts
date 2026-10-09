import { describe, expect, it } from "vitest";
import {
  abrirCaso,
  aplicarEfecto,
  aplicarEfectos,
  anotarEfecto,
  cerrarCaso,
  enMarcaBaja,
  fichasDelCaso,
  medidoresIniciales,
  medidoresVisibles,
  metaAlcanzada,
  sumarEfectos,
  topar,
} from "./medidores";

describe("medidores · tope", () => {
  it("arrancan en 50 y no bajan de 0 ni suben de 100", () => {
    expect(medidoresIniciales()).toEqual({ c: 50, voz: 50 });
    expect(topar(-5)).toBe(0);
    expect(topar(130)).toBe(100);
    expect(aplicarEfecto({ c: 10, voz: 95 }, { c: -20, voz: 10 })).toEqual({ c: 0, voz: 100 });
  });

  it("no acepta efectos con decimales", () => {
    expect(() => aplicarEfecto(medidoresIniciales(), { c: 0.5, voz: 0 })).toThrow();
  });

  it("los efectos de un mismo caso se suman y se topa UNA vez al final (R6.6, dos turnos del caso 5)", () => {
    // Si se topara después de cada efecto: 95 +10 → 100, −10 → 90. Sumados primero: 95 + 0 = 95.
    const m = { c: 95, voz: 50 };
    expect(aplicarEfectos(m, [{ c: 10, voz: 0 }, { c: -10, voz: 0 }])).toEqual({ c: 95, voz: 50 });
    expect(sumarEfectos([{ c: 8, voz: 4 }, { c: -10, voz: 0 }])).toEqual({ c: -2, voz: 4 });
  });
});

describe("medidores · fichas del caso (G2)", () => {
  it("3 fichas, o 2 si algún tubo está en 25 o menos al abrir el caso", () => {
    expect(fichasDelCaso({ c: 50, voz: 50 })).toBe(3);
    expect(fichasDelCaso({ c: 26, voz: 26 })).toBe(3);
    expect(fichasDelCaso({ c: 25, voz: 80 })).toBe(2);
    expect(fichasDelCaso({ c: 80, voz: 25 })).toBe(2);
    expect(fichasDelCaso({ c: 0, voz: 0 })).toBe(2);
    expect(enMarcaBaja(25)).toBe(true);
    expect(enMarcaBaja(26)).toBe(false);
  });
});

describe("medidores · meta del cierre (G6)", () => {
  it("plaza fija con 65 y 65, no con 64 en alguno", () => {
    expect(metaAlcanzada({ c: 65, voz: 65 })).toBe(true);
    expect(metaAlcanzada({ c: 100, voz: 65 })).toBe(true);
    expect(metaAlcanzada({ c: 64, voz: 100 })).toBe(false);
    expect(metaAlcanzada({ c: 100, voz: 64 })).toBe(false);
  });
});

describe("medidores · no se mueven mientras abres papeles", () => {
  it("los tubos muestran el inicio del caso hasta el cierre; los efectos se aplican al cerrar", () => {
    let caso = abrirCaso({ c: 50, voz: 50 });
    expect(caso.fichas).toBe(3);
    caso = anotarEfecto(caso, { c: 0, voz: -3 }); // turno 1 del caso 5 (sorteo)
    expect(medidoresVisibles(caso)).toEqual({ c: 50, voz: 50 });
    caso = anotarEfecto(caso, { c: 12, voz: 6 }); // turno 2
    expect(medidoresVisibles(caso)).toEqual({ c: 50, voz: 50 });
    const cierre = cerrarCaso(caso);
    expect(cierre.medidores).toEqual({ c: 62, voz: 53 });
    expect(cierre.caso.cerrado).toBe(true);
  });

  it("las fichas se fijan al entrar: bajar un medidor a mitad del caso 5 no las cambia", () => {
    const caso = abrirCaso({ c: 40, voz: 40 });
    const despues = anotarEfecto(caso, { c: -30, voz: -30 });
    expect(despues.fichas).toBe(3);
    expect(cerrarCaso(despues).medidores).toEqual({ c: 10, voz: 10 });
    expect(abrirCaso(cerrarCaso(despues).medidores).fichas).toBe(2);
  });

  it("un caso cerrado no se rehace (G4) y abrirCaso no comparte memoria con los medidores", () => {
    const m = { c: 50, voz: 50 };
    const caso = abrirCaso(m);
    m.c = 99;
    expect(medidoresVisibles(caso).c).toBe(50);
    const { caso: cerrado } = cerrarCaso(anotarEfecto(caso, { c: 1, voz: 1 }));
    expect(() => anotarEfecto(cerrado, { c: 1, voz: 1 })).toThrow();
    expect(() => cerrarCaso(cerrado)).toThrow();
  });
});
