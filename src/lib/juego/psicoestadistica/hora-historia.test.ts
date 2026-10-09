import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { HUECOS_CIUDAD, ORDEN_VENTANITAS, MIN_CIERRE, amanecer, angulosReloj, horaTexto, minutosDeFase, posicionLuna, ventanitasEncendidas } from "./hora-historia";

describe("hora de la historia", () => {
  it("la noche empieza a las 23:00, el Caso 2 es a las 23:50 y el final de la prueba es el cierre", () => {
    expect(horaTexto(minutosDeFase("titulo"))).toBe("23:00");
    expect(horaTexto(minutosDeFase("archivo1"))).toBe("23:00");
    expect(horaTexto(minutosDeFase("archivo2"))).toBe("23:50");
    expect(horaTexto(minutosDeFase("reaccion"))).toBe("23:50");
    expect(horaTexto(minutosDeFase("fin"))).toBe("05:30");
  });
  it("el amanecer entra solo al final: a las 04:50 todavía es de noche", () => {
    expect(amanecer(0)).toBe(0);
    expect(amanecer(350)).toBe(0);
    expect(amanecer(370)).toBeCloseTo(0.5);
    expect(amanecer(MIN_CIERRE)).toBe(1);
  });
  it("las manecillas marcan la hora exacta", () => {
    const arriba = -Math.PI / 2;
    expect(angulosReloj(0).minuto).toBeCloseTo(arriba); // 23:00 → minutero arriba
    expect(angulosReloj(0).hora).toBeCloseTo(arriba + (11 / 12) * 2 * Math.PI); // horario en el 11
    expect(angulosReloj(30).minuto).toBeCloseTo(arriba + Math.PI); // 23:30 → minutero abajo
  });
  it("ventanitas: 13 al empezar, 3 a las 04:50 y 5 con la primera luz; todas existen", () => {
    expect(ventanitasEncendidas(0)).toBe(13);
    expect(ventanitasEncendidas(350)).toBe(3);
    expect(ventanitasEncendidas(MIN_CIERRE)).toBe(5);
    expect([...ORDEN_VENTANITAS].sort((a, b) => a - b)).toEqual(Array.from({ length: 16 }, (_, i) => i));
  });
  it("la luna baja con la noche y se queda dentro del hueco de 68×52", () => {
    expect(posicionLuna(0).y).toBeLessThan(posicionLuna(MIN_CIERRE).y);
    for (const p of [0, 200, MIN_CIERRE]) {
      const { x, y } = posicionLuna(p);
      expect(x + 9).toBeLessThanOrEqual(68);
      expect(y + 9).toBeLessThanOrEqual(52);
    }
  });
  it("los huecos de la ciudad son los del archivo del artista", () => {
    const j = JSON.parse(readFileSync("docs/juego/arte/psicoestadistica/ciudad_luces.json", "utf8")) as { huecos: { x: number; y: number }[] };
    expect(HUECOS_CIUDAD).toEqual(j.huecos.map((h) => [h.x, h.y]));
  });
});
