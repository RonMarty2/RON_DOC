import { describe, expect, it } from "vitest";
import { problemasDeTexto } from "../revision";
import * as guion from "./guion-planta";
import { CASO_DOSSIER, VERSION_MAXIMA, datosDeVersion, type Opcion } from "./planta";
import { anotar, describir, guardarPartida, leerPartida, partidaNueva } from "./registro";

const OPCIONES: Opcion[] = ["envasadora", "tanque", "nada"];

function todosLosTextos(d: ReturnType<typeof datosDeVersion>) {
  return [
    guion.DON_MARIO,
    guion.saludo(d),
    ...guion.fichaMaquinas(d).flatMap((f) => [f.valor, f.etiqueta]),
    guion.condicionesPlanta(d),
    guion.MUESTRA_LA_PLANTA,
    guion.PREGUNTA_CAPACIDAD,
    ...Object.values(guion.PISTA_CAPACIDAD),
    ...guion.ayudaCapacidad(d),
    guion.aciertoCapacidad(d),
    ...guion.opciones(d).flatMap((o) => [o.texto, o.precio]),
    guion.antesDeFirmar("tanque"),
    guion.antesDeFirmar("envasadora"),
    guion.PREGUNTA_COMPRA,
    ...Object.values(guion.PISTA_COMPRA),
    ...OPCIONES.map((o) => guion.despuesDeUnMes(d, o)),
    guion.preguntaRecuperacion(d),
    ...Object.values(guion.PISTA_RECUPERACION),
    guion.aciertoRecuperacion(d),
    ...OPCIONES.map(guion.preguntaDefensa),
    guion.PIDE_RECUPERACION,
    guion.PIDE_ARGUMENTO,
    guion.FINAL,
  ];
}

describe("textos de la escena 1", () => {
  it("con los números del dossier", () => {
    const d = CASO_DOSSIER;
    expect(guion.saludo(d)).toContain("860 pedidos");
    expect(guion.saludo(d)).toContain("más de 3 veces más rápida");
    expect(guion.aciertoCapacidad(d)).toContain("720 botellas");
    expect(guion.despuesDeUnMes(d, "tanque")).toContain("3 tanques salen 1.080 botellas");
    expect(guion.aciertoRecuperacion(d)).toContain("Bs 14.560 al mes");
    expect(guion.aciertoRecuperacion(d)).toContain("En 3,1 meses");
  });

  it("en tuteo, sin guiones largos, en la versión 0 y en 200 versiones más", () => {
    for (let v = 0; v <= VERSION_MAXIMA; v += 5) {
      const d = datosDeVersion(v);
      for (const t of todosLosTextos(d)) expect(problemasDeTexto(`versión ${v}`, t), t).toEqual([]);
    }
  });
});

describe("registro", () => {
  it("recalcula si cada número estaba bien, sin guardar el diagnóstico", () => {
    const d = CASO_DOSSIER;
    expect(describir(d, { tipo: "capacidad", valor: 800 }, { diagnostico: true })).toEqual({ texto: "Capacidad de hoy: escribió 800 botellas (sin-eficiencia)", bien: false });
    expect(describir(d, { tipo: "capacidad", valor: 800 }).texto).toBe("Capacidad de hoy: escribió 800 botellas");
    expect(describir(d, { tipo: "capacidad", valor: 720 }).bien).toBe(true);
    expect(describir(d, { tipo: "recuperacion", valor: 3.1 }).bien).toBe(true);
    expect(describir(d, { tipo: "decision", opcion: "envasadora" }).bien).toBe(false);
  });

  it("se guarda y se lee por versión; lo roto o ajeno no se lee", () => {
    const memoria = new Map<string, string>();
    const a = {
      getItem: (k: string) => memoria.get(k) ?? null,
      setItem: (k: string, v: string) => void memoria.set(k, v),
      removeItem: (k: string) => void memoria.delete(k),
    };
    const p = anotar(partidaNueva(7), { tipo: "capacidad", valor: 500 }, new Date("2026-09-25T10:00:00Z"));
    guardarPartida(p, a);
    expect(leerPartida(7, a)).toEqual(p);
    expect(leerPartida(8, a)).toBeNull();
    memoria.set("ron-doc-juego:proyectos:planta:9", "{no es json");
    expect(leerPartida(9, a)).toBeNull();
    expect(leerPartida(7, null)).toBeNull();
  });
});
