import { describe, expect, it } from "vitest";
import { problemasDeTexto } from "../../revision";
import { VERSION_MAXIMA } from "../planta";
import { OPCIONES_CASO5 } from "./carpeta";
import { paqueteT1, type PaqueteT1 } from "./cifras";
import { numero, papelDe, PAPELES_T1, papelesDe, PIEZAS_GENERICAS_CASO2, piezasDePapel } from "./papeles-t1";
import type { NumeroDeCaso } from "./reglas-t1";

const todos: PaqueteT1[] = Array.from({ length: VERSION_MAXIMA }, (_, i) => paqueteT1(i + 1));
const HOY = new Date(2026, 9, 8);
const CASOS: NumeroDeCaso[] = [1, 2, 3, 4, 6, 7, 8];

describe("los papeles del Tema 1", () => {
  it("hay 72 en el guion, del C1-1 al C8-9, todos con nombre y texto, sin voseo ni guion largo", () => {
    const ids = Array.from({ length: 8 }, (_, c) => Array.from({ length: 9 }, (_, n) => `C${c + 1}-${n + 1}`)).flat();
    expect(Object.keys(PAPELES_T1)).toEqual(ids);
    for (const [id, p] of Object.entries(PAPELES_T1)) {
      expect(p.nombre.length, id).toBeGreaterThan(3);
      for (const t of [...Object.values(p.textos), ...Object.values(p.piezas ?? {}).flat()]) {
        expect(problemasDeTexto("", t), `${id}: ${t}`).toEqual([]);
        expect(/dossier|jamovi|eviews|spss|excel|software/i.test(t), `${id}: ${t}`).toBe(false);
      }
    }
  });

  it("en las 999 versiones, los 6 papeles de cada carpeta tienen texto completo, sin huecos sin llenar", () => {
    let total = 0;
    for (const p of todos) {
      const carpetas = [...CASOS.map((c) => papelesDe(p, c, { hoy: HOY })), ...OPCIONES_CASO5.map((op) => papelesDe(p, 5, { opcion: op }))];
      for (const papeles of carpetas) {
        if (papeles.length !== 6) throw new Error(`v${p.version.semilla}: carpeta de ${papeles.length}`);
        for (const q of papeles) {
          total++;
          if (!q.texto || /[{}]|undefined|null|NaN/.test(q.texto)) throw new Error(`v${p.version.semilla} ${q.id}: «${q.texto}»`);
        }
      }
    }
    expect(total).toBe(VERSION_MAXIMA * 10 * 6);
  });

  it("el papel clave dice lo del tipo de la versión; el que podía serlo y no lo es dice su texto banal", () => {
    for (const p of todos.slice(0, 300)) {
      for (const caso of [2, 3, 6, 7] as const) {
        const carpeta = p.carpetas.porCaso[caso];
        const tipo = p.version.tipos[caso];
        for (const q of carpeta.papeles) {
          const guion = PAPELES_T1[q.id];
          const visto = papelDe(p, caso, q.id).texto;
          const plantilla = (t: string) => new RegExp(`^${t.replace(/[.*+?^$()|[\]\\]/g, "\\$&").replace(/\{\w+\}/g, ".+")}$`);
          if (carpeta.claves.includes(q.id)) expect(visto, `${q.id} ${tipo}`).toMatch(plantilla(guion.textos[tipo]));
          else if (guion.textos.banal) expect(visto, q.id).toMatch(plantilla(guion.textos.banal));
        }
      }
    }
  });

  it("caso 2: los números del clave «c» y del buzón van en el sentido que dice su tipo", () => {
    for (const p of todos) {
      const { d0, d1, b0, b1 } = p.cifras.caso2;
      const carpeta = p.carpetas.porCaso[2];
      const tipo = p.version.tipos[2];
      if (carpeta.claves.includes("C2-3")) expect(tipo === "P" ? d1 > d0 : d1 <= d0, `v${p.version.semilla} derivaciones`).toBe(true);
      if (carpeta.papeles.some((q) => q.id === "C2-4")) expect(tipo === "P" ? b1 > b0 : b1 <= b0, `v${p.version.semilla} buzón`).toBe(true);
    }
  });

  it("caso 4: los cuatro papeles que destapan dicen quién respondió según cuál estudio es el bueno", () => {
    const a = todos.find((p) => p.version.buenoEsA && p.carpetas.porCaso[4].claves.includes("C4-1"))!;
    const b = todos.find((p) => !p.version.buenoEsA && p.carpetas.porCaso[4].claves.includes("C4-1"))!;
    expect(papelDe(a, 4, "C4-1").texto).toContain("obligatorio");
    expect(papelDe(b, 4, "C4-1").texto).toContain("voluntad propia");
    const conTabla = todos.find((p) => p.carpetas.porCaso[4].papeles.some((q) => q.id === "C4-6"))!;
    expect(papelDe(conTabla, 4, "C4-6").texto).toMatch(/^Resultado A: \d+(,\d)? %\. Resultado B: \d+(,\d)? %\.$/);
  });

  it("caso 5: cada opción trae sus papeles con sus medias, y el 2,5 del informe solo aparece en la opción (b)", () => {
    for (const p of todos.slice(0, 200)) {
      for (const op of OPCIONES_CASO5) {
        const papeles = papelesDe(p, 5, { opcion: op });
        const llamados = papeles.find((q) => q.id === "C5-1")!;
        const m = p.cifras.caso5.opciones[op].medias;
        expect(llamados.texto).toBe(`Los 13 llamados al taller: antes ${numero(m.antes)} puntos de media; un mes después, ${numero(m.despues)}.`);
        const informe = papeles.find((q) => q.id === "C5-7");
        if (informe) expect(informe.texto.includes("2,5")).toBe(op === "b");
        if (op === "b") expect(informe).toBeDefined();
        if (op === "a") expect(papeles.find((q) => q.id === "C5-4")!.texto).toContain(p.version.textos.vecino);
      }
    }
    expect(() => papelesDe(todos[0], 5)).toThrow();
  });

  it("caso 8: el papel de las listas dice 9 y tres semanas solo cuando la evidencia era «aún no»", () => {
    for (const p of todos.slice(0, 200)) {
      const t = papelDe(p, 8, "C8-2").texto;
      expect(t.includes("9 estudiantes")).toBe(p.version.decisionReal === 2);
      expect(papelDe(p, 8, "C8-1").texto).toBe(
        `Seguimiento. Taller: de ${numero(p.cifras.caso8.m1)} a ${numero(p.cifras.caso8.m2)}. Grupo sin taller: de ${numero(p.cifras.caso8.g1)} a ${numero(p.cifras.caso8.g2)}.`,
      );
    }
  });

  it("paso 1: los dos papeles con sueño traen la fila del archivo; sin fecha de hoy, lanza", () => {
    const p = todos[0];
    const clave = p.carpetas.porCaso[1].claves[0];
    const d = p.cifras.paso1.papeles[clave];
    const t = papelDe(p, 1, clave, { hoy: HOY }).texto;
    expect(t).toContain(numero(d.horasAnt));
    expect(t).toContain(String(d.col2Ant));
    expect(t).toContain("octubre de 2025");
    expect(() => papelDe(p, 1, clave)).toThrow();
    expect(() => papelDe(p, 1, "C2-1", { hoy: HOY })).toThrow();
  });

  it("caso 2: las piezas de la frase salen del papel abierto; la del clave solo si es el clave de la versión", () => {
    expect(PIEZAS_GENERICAS_CASO2).toHaveLength(3);
    for (const p of todos.slice(0, 300)) {
      const carpeta = p.carpetas.porCaso[2];
      const tipo = p.version.tipos[2];
      for (const q of carpeta.papeles) {
        const piezas = piezasDePapel(p, q.id);
        const n = Number(q.id.split("-")[1]);
        for (const t of piezas) expect(/[{}*]/.test(t), t).toBe(false);
        if (carpeta.claves.includes(q.id)) expect(piezas).toHaveLength(tipo === "P" ? 2 : 1);
        else if (n <= 3) expect(piezas).toEqual([]);
        else expect(piezas).toHaveLength(1);
      }
    }
  });
});
