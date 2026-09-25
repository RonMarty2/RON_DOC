import { describe, expect, it } from "vitest";
import { capacidadDiaria, consecuencia, datosDeVersion } from "./planta";
import type { Entrada, Evento } from "./registro";
import { lineaCorta, resumirPartida } from "./resumen";
import { versionDeAlumno } from "./version-alumno";

const ID = "3f6c1b2a-0000-4000-8000-00000000abcd";
const hora = "2026-09-25T10:00:00.000Z";
const con = (eventos: Evento[]): Entrada[] => eventos.map((e) => ({ ...e, hora }));

describe("resumen de una partida para el docente", () => {
  const v = versionDeAlumno(ID);
  const d = datosDeVersion(v);
  const hoy = capacidadDiaria(d);
  const tanque = consecuencia(d, "tanque");
  const meses = Math.round(tanque.mesesRecuperacion! * 10) / 10;

  it("recalcula con la versión del alumno: intentos, errores típicos, decisiones y argumento", () => {
    const r = resumirPartida({
      estudiante_id: ID,
      version: v,
      terminada: true,
      registro: con([
        { tipo: "capacidad", valor: Math.round(hoy / d.eficiencia) },
        { tipo: "capacidad", valor: hoy },
        { tipo: "decision", opcion: "envasadora" },
        { tipo: "compra", opcion: "envasadora", valor: hoy },
        { tipo: "reintento" },
        { tipo: "decision", opcion: "tanque" },
        { tipo: "compra", opcion: "tanque", valor: tanque.capacidad },
        { tipo: "recuperacion", valor: meses },
        { tipo: "argumento", texto: "La fermentación era el cuello de botella." },
      ]),
    });
    expect(r.versionEsperada).toBe(v);
    expect(r.capacidad).toEqual({ intentos: 2, bien: true, errores: ["olvidó la eficiencia"] });
    expect(r.decisiones).toEqual(["envasadora", "tanque"]);
    expect(r.compra.bien).toBe(true);
    expect(r.recuperacion).toEqual({ intentos: 1, bien: true, errores: [] });
    expect(r.argumento).toBe("La fermentación era el cuello de botella.");
    expect(r.lineas[0].texto).toContain(": olvidó la eficiencia");
    expect(lineaCorta(r)).toBe("capacidad al intento 2 · decidió A → B · recuperación al intento 1");
  });

  it("marca una versión que no corresponde a la cuenta", () => {
    const otra = v === 1 ? 2 : 1;
    const r = resumirPartida({ estudiante_id: ID, version: otra, terminada: false, registro: [] });
    expect(r.versionEsperada).not.toBe(r.version);
    expect(lineaCorta(r)).toBe("sin empezar");
  });

  it("lo escrito después de acertar no suma intentos", () => {
    const r = resumirPartida({
      estudiante_id: ID,
      version: v,
      terminada: false,
      registro: con([{ tipo: "capacidad", valor: hoy }, { tipo: "capacidad", valor: 1 }]),
    });
    expect(r.capacidad).toEqual({ intentos: 1, bien: true, errores: [] });
  });
});
