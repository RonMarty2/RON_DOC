import { describe, expect, it } from "vitest";
import { amanecer, horaTexto, posicionLuna, ventanitasEncendidas, type PerfilAmbiente } from "./ambiente-vivo";

// Un perfil de otra materia, para probar que las cuentas no dependen del Tema 1: de 20:00 a 22:00.
const OTRO: PerfilAmbiente = { inicio: 20 * 60, amanecer: 100, cierre: 120, ventanitas: { inicio: 8, antesDelAmanecer: 2, cierre: 4 }, luna: { desde: { x: 10, y: 0 }, hasta: { x: 20, y: 30 } } };

describe("ambiente vivo (común a todos los juegos)", () => {
  it("las cuentas salen del perfil que se les pasa", () => {
    expect(horaTexto(OTRO, 0)).toBe("20:00");
    expect(horaTexto(OTRO, 120)).toBe("22:00");
    expect(amanecer(OTRO, 100)).toBe(0);
    expect(amanecer(OTRO, 120)).toBe(1);
    expect(ventanitasEncendidas(OTRO, 0)).toBe(8);
    expect(ventanitasEncendidas(OTRO, 100)).toBe(2);
    expect(ventanitasEncendidas(OTRO, 120)).toBe(4);
    expect(posicionLuna(OTRO, 120)).toEqual({ x: 20, y: 30 });
  });
});
