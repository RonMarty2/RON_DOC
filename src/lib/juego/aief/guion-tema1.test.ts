import { describe, expect, it } from "vitest";
import { problemasDeTexto } from "../../revision";
import { ayudaVisible } from "../escalera";
import * as g from "./guion-tema1";
import { NORMAS, PERSONAS, carpetasT12 } from "./tema1";
import { carpetaT13, type Color } from "./ventanilla";

const COLORES: Color[] = ["verde", "bien-rechazado", "rojo", "gris", "no-le-servia"];

function textosFijos(): string[] {
  return [
    g.JEFA, g.LUGAR, ...g.LLEGADA, g.practica(), g.correccionPractica(12_000), g.correccionPractica(20_000), g.correccionPractica(5),
    g.PARED_PRIMERA, g.ABRE_T11, ...PERSONAS.flatMap((p) => [g.PERSONA[p].nombre, g.PERSONA[p].dice, g.PERSONA[p].otraVez, g.decision(p)]),
    ...g.AYUDA_T11.concreta, ayudaVisible(3, g.AYUDA_T11).leer!, g.CIERRA_T11, g.ABRE_JORNADA, g.ABRE_REPASO,
    g.PREGUNTA_NC, ...Object.values(g.PISTA_NC), ...g.AYUDA_NC.concreta, ayudaVisible(3, g.AYUDA_NC).leer!, g.PREGUNTA_DICTAMEN,
    g.HOJA_NUEVA, g.RECUERDA_REGLA, g.REGLA_NUEVA, g.REGLA_CERO, g.PREGUNTA_HOY, ...Object.values(g.PISTA_HOY), ...g.AYUDA_HOY.concreta,
    ayudaVisible(3, g.AYUDA_HOY).leer!, g.PREGUNTA_MONTO, g.ABRE_CIERRE, g.CIERRE_BIEN, g.CIERRE_REPASO, g.FINAL,
    ...Object.values(g.AYUDA_REPASO).flatMap((a) => [...a.concreta, ayudaVisible(3, a).leer!]),
    ...["acepto-mal-hecho", "devolvio-bien-hecho", "regla-de-ayer", "valor-del-cliente", "presto-lo-que-pide", "presto-el-minimo", "rechazo", "otra", "desconocido"].map(g.pistaRepaso),
    ...NORMAS.map(([, t]) => t),
  ];
}

describe("textos del Tema 1", () => {
  it("fijos: tuteo y sin guiones largos", () => {
    for (const t of textosFijos()) expect(problemasDeTexto("tema 1", t), t).toEqual([]);
  });

  it("de cada carpeta, en 300 versiones", () => {
    for (let v = 0; v < 300; v++) {
      const c13 = carpetaT13(v);
      const textos = [
        ...carpetasT12(v).flatMap((c) => [g.diceClienteT12(c), g.operacionMarcada(c), g.notaDelContador(c), g.aciertoNC(c), ...COLORES.map((k) => g.queFuePaso(c, k))]),
        g.diceClienteT13(c13), ...g.fichaT13(c13).flatMap((f) => [f.etiqueta, f.valor]), g.aciertoHoy(c13), g.pideLinea(c13),
        ...COLORES.map((k) => g.queFuePaso(c13, k)),
      ];
      for (const t of textos) expect(problemasDeTexto(`versión ${v}`, t), t).toEqual([]);
    }
  });

  it("la ficha del ejemplo muestra los números del dossier del juego", () => {
    expect(g.fichaT13(carpetaT13(0)).map((f) => f.valor)).toEqual(["Bs 70.000", "Bs 50.000", "Bs 90.000", "100", "115"]);
    expect(g.diceClienteT13(carpetaT13(0))).toContain("Bs 40.000");
  });

  it("el registro recalcula si estaba bien", () => {
    const rondas = [[...carpetasT12(0), carpetaT13(0)]];
    expect(g.describir(rondas, { tipo: "nc", ronda: 0, i: 0, valor: 10 }).bien).toBe(true);
    expect(g.describir(rondas, { tipo: "dictamen", ronda: 0, i: 0, decision: "aceptar" }).bien).toBe(false);
    expect(g.describir(rondas, { tipo: "reexpresion", ronda: 0, i: 2, valor: 103_500 }).bien).toBe(true);
    expect(g.describir(rondas, { tipo: "monto", ronda: 0, i: 2, valor: 54_000 }).bien).toBe(false);
  });
});
