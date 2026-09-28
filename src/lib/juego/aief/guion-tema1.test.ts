import { describe, expect, it } from "vitest";
import { problemasDeTexto } from "../../revision";
import { ayudaVisible } from "../escalera";
import * as g from "./guion-tema1";
import {
  NORMAS,
  OPERACIONES,
  PAPELES,
  ROLES,
  SELLOS,
  carpetaT12Repaso,
  carpetaT13,
  carpetasT12,
  finalP13,
  mostradorT11,
  practicaT12,
  practicaT13,
  type CarpetaTema1,
  type FinalT12,
} from "./tema1";
import type { Color } from "./ventanilla";

const COLORES: Color[] = ["verde", "bien-rechazado", "rojo", "gris", "no-le-servia"];
const FINALES: FinalT12[] = ["bien", "se-fue", "norma-mal-aceptada", "fundamental-aceptado", "mejora-no-vista", "sano-observado", "sello-equivocado", "devolvio-uno-bueno"];

function textosFijos(): string[] {
  return [
    g.JEFA, g.LUGAR, ...g.LLEGADA, g.practica(), g.correccionPractica(12_000), g.correccionPractica(20_000), g.correccionPractica(5),
    g.PARED_PRIMERA, g.REGLA_CERO, g.REGLA_MONTO, g.REGLA_NUEVA, g.REGLA_FORMULA, g.MANUAL_NORMA_Y_CALIDAD, ...g.PAGINA_CALIDAD,
    g.ABRE_T11, ...ROLES.flatMap((r) => g.FRASES_T11[r]), ...g.NIEVES_EMPUJA, g.NIEVES_HOMBROS, g.PREGUNTA_SELLO, g.PREGUNTA_HOJA,
    ...SELLOS.map(g.decision), ...ROLES.map(g.hoja), ...Object.values(g.PISTA_T11), ...g.AYUDA_T11.concreta, ayudaVisible(3, g.AYUDA_T11).leer!,
    g.cierraT11(3), g.ABRE_JORNADA, g.ABRE_REPASO, ...g.FRASES_BEATRIZ, g.CIERRA_CAMPO_NC, g.PREGUNTA_DICTAMEN_PRACTICA,
    g.consecuenciaBeatriz("aceptar"), g.consecuenciaBeatriz("devolver"), g.JEFA_DESPUES_DEL_PAGARE,
    g.PREGUNTA_NC, g.ACIERTO, ...Object.values(g.PISTA_NC), ...g.AYUDA_NC.concreta, ayudaVisible(3, g.AYUDA_NC).leer!, g.SE_FUE,
    ...g.FRASES_CLIENTE, ...g.SELLOS_CALIDAD.map((s) => s.texto), g.PREGUNTA_SELLO_CALIDAD, g.PREGUNTA_DICTAMEN, ...Object.values(g.BOTON_DICTAMEN),
    g.ANTES_DEL_CARPINTERO, g.JEFA_DESPUES_DEL_CARPINTERO, g.RECUERDA_REGLA, g.PREGUNTA_HOY, g.PREGUNTA_MONTO, ...Object.values(g.PISTA_HOY),
    ...g.AYUDA_HOY.concreta, ayudaVisible(3, g.AYUDA_HOY).leer!, g.ABRE_CIERRE, g.CIERRE_BIEN, g.APROBADO, g.CIERRE_REPASO, g.FINAL, g.FINAL_PANTALLA,
    ...Object.values(g.AYUDA_REPASO).flatMap((a) => [...a.concreta, ayudaVisible(3, a).leer!]),
    ...[...FINALES, "valor-del-cliente", "presto-lo-que-pide", "presto-el-minimo", "rechazo", "otra", "desconocido"].map(g.pistaRepaso),
    ...NORMAS.map(([, t]) => t), ...OPERACIONES.flatMap((o) => o.redacciones), ...PAPELES.map((p) => p.texto),
  ];
}

describe("textos del Tema 1", () => {
  it("fijos: tuteo y sin guiones largos", () => {
    for (const t of textosFijos()) expect(problemasDeTexto("tema 1", t), t).toEqual([]);
  });

  it("de cada versión, en 300 versiones", () => {
    for (let v = 0; v < 300; v++) {
      const carpetas: CarpetaTema1[] = [...carpetasT12(v), carpetaT12Repaso(v), carpetaT13(v), carpetaT13(v, 1)];
      const p12 = practicaT12(v);
      const p13 = practicaT13(v);
      const textos = [
        ...mostradorT11(v).cola.flatMap((p) => [g.frasePersona(p), g.nievesEmpuja(p), g.reaccionT11(p, "bien"), g.reaccionT11(p, "hoja")]),
        g.diceBeatriz(p12), g.operacionBeatriz(p12), g.notaBeatriz(p12), ...g.pasivoBeatriz(p12), g.pagareBeatriz(p12),
        g.diceCarpintero(p13), ...g.fichaCarpintero(p13).flatMap((f) => [f.etiqueta, f.valor]),
        ...(["regla-de-ayer", "lo-que-pide", "bien", "otro"] as const).map((f) => g.consecuenciaCarpintero(f, "gris", finalP13(p13, 0).cooperativa)),
        ...carpetas.flatMap((c) => [
          g.nombreCarpeta(c),
          ...(c.tipo === "t12"
            ? [g.diceClienteT12(c), g.operacionMarcada(c), g.notaDelContador(c), g.papelDeLaCarpeta(c), ...FINALES.map((f) => g.queFuePaso(c, "gris", f))]
            : [g.diceClienteT13(c), ...g.fichaT13(c).flatMap((f) => [f.etiqueta, f.valor]), ...COLORES.map((k) => g.queFuePaso(c, k, "otra"))]),
        ]),
      ];
      for (const t of textos) expect(problemasDeTexto(`versión ${v}`, t), t).toEqual([]);
    }
  });

  it("1.1: ninguna frase dice quién es la persona ni nombra su decisión (05 N1.2)", () => {
    const prohibidas = [
      "inversionista", "socio", "accionista", "proveedor", "gerente", "gerencia", "impuestos", "fisco", "inspector", "empleado",
      "aportar", "retirar", "capital", "contado", "30 días", "invertir", "contratar", "fijar precios", "verificar", "base imponible", "declarada",
      "permanecer", "negociar",
    ];
    for (const r of ROLES) {
      for (const f of g.FRASES_T11[r]) {
        for (const p of prohibidas) expect(f.toLowerCase(), `${r}: ${p}`).not.toContain(p);
        expect(f, `${r}: la sigla SIN`).not.toMatch(/\bSIN\b/); // la sigla, no la preposición «sin»
      }
    }
  });

  it("nadie explica: los aciertos son «Bien.» y no queda la línea al cliente", () => {
    expect(g.ACIERTO).toBe("Bien.");
    expect("pideLinea" in g).toBe(false);
  });

  it("el registro del alumno no muestra ✔ en las decisiones, sólo en los números que se corrigen al momento", () => {
    const v = 0;
    const rondas = [[...carpetasT12(v), carpetaT13(v)]];
    expect(g.describir(v, rondas, { tipo: "dictamen", ronda: 0, i: 0, decision: "devolver" }).bien).toBeUndefined();
    expect(g.describir(v, rondas, { tipo: "monto", ronda: 0, i: 2, valor: 60_000 }).bien).toBeUndefined();
    expect(g.describir(v, rondas, { tipo: "nc", ronda: 0, i: 0, valor: 10 }).bien).toBe(true);
    expect(g.decisionBien(v, rondas, { tipo: "dictamen", ronda: 0, i: 0, decision: "devolver" })).toBe(true);
    expect(g.decisionBien(v, rondas, { tipo: "monto", ronda: 0, i: 2, valor: 60_000 })).toBe(true);
  });
});
