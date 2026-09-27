import { describe, expect, it } from "vitest";
import { anotarEn, claveDePartida, guardarPartidaDe, leerPartidaDe, partidaNuevaDe, type Escena } from "./partida";
import { leerPartida } from "./registro";

function memoria() {
  const m = new Map<string, string>();
  return {
    m,
    a: { getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => void m.set(k, v), removeItem: (k: string) => void m.delete(k) },
  };
}

// Una escena de otra isla, sólo como ejemplo de que la pieza no depende de la planta.
const VENTANILLA: Escena<"aief", "ventanilla"> = { isla: "aief", escena: "ventanilla", versionValida: (v) => v >= 0 && v <= 99 };
type EventoVentanilla = { tipo: "monto"; valor: number };

describe("partidas de cualquier isla y escena", () => {
  it("guarda y lee una partida de otra isla sin mezclarla con la planta", () => {
    const { a, m } = memoria();
    const p = anotarEn(partidaNuevaDe<EventoVentanilla, "aief", "ventanilla">(VENTANILLA, 7), { tipo: "monto", valor: 12000 }, new Date("2026-09-27T12:00:00Z"));
    guardarPartidaDe(p, a);
    expect([...m.keys()]).toEqual(["ron-doc-juego:aief:ventanilla:7"]);
    expect(leerPartidaDe<EventoVentanilla, "aief", "ventanilla">(VENTANILLA, 7, a)).toEqual(p);
    expect(leerPartida(7, a)).toBeNull(); // la planta no la toma como suya
  });

  it("rechaza versiones que la escena no admite, otra escena, y lo roto", () => {
    const { a, m } = memoria();
    guardarPartidaDe(partidaNuevaDe(VENTANILLA, 500), a);
    expect(leerPartidaDe(VENTANILLA, 500, a)).toBeNull();
    m.set(claveDePartida("aief", "ventanilla", 3), JSON.stringify({ isla: "aief", escena: "otra", version: 3, eventos: [] }));
    expect(leerPartidaDe(VENTANILLA, 3, a)).toBeNull();
    m.set(claveDePartida("aief", "ventanilla", 4), "{roto");
    expect(leerPartidaDe(VENTANILLA, 4, a)).toBeNull();
  });

  it("lo que la planta guardó con el formato del 25-09 se sigue leyendo (misma clave)", () => {
    const { a, m } = memoria();
    const vieja = { isla: "proyectos", escena: "planta", version: 12, eventos: [{ tipo: "ayuda", hora: "2026-09-25T10:00:00.000Z" }], terminada: true };
    m.set("ron-doc-juego:proyectos:planta:12", JSON.stringify(vieja));
    expect(leerPartida(12, a)).toEqual(vieja);
  });
});
