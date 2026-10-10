import { describe, expect, it } from "vitest";
import { paqueteT1 } from "./cifras";
import { nombreCorto } from "./guion-pantalla-t1";
import { papelDe } from "./papeles-t1";

describe("Nombres cortos de los papeles en la mesa", () => {
  it("todo papel de todo caso y versión tiene nombre corto: máx. 20 caracteres y ninguna palabra de más de 10", () => {
    for (let semilla = 1; semilla <= 60; semilla++) {
      const p = paqueteT1(semilla);
      for (const caso of [1, 2] as const) {
        for (const q of p.carpetas.porCaso[caso].papeles) {
          const completo = papelDe(p, caso, q.id, { hoy: new Date() }).nombre;
          const corto = nombreCorto(completo);
          expect(corto.length, `${completo} → ${corto}`).toBeLessThanOrEqual(20);
          for (const palabra of corto.split(" ")) expect(palabra.length, `${completo} → ${corto}`).toBeLessThanOrEqual(10);
        }
      }
    }
  });
});
