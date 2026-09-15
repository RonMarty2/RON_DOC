import { describe, expect, it } from "vitest";
import { armarHoja, escribirAjustes, leerAjustes, TEMAS_HOJA, type IdTema } from "./hoja";

const TODOS = TEMAS_HOJA.map((t) => t.id) as IdTema[];

describe("hoja de práctica", () => {
  it("la misma versión da siempre los mismos ejercicios", () => {
    expect(armarHoja(4821, TODOS, 3)).toEqual(armarHoja(4821, TODOS, 3));
  });

  it("dos versiones distintas no son la misma hoja", () => {
    for (let v = 1; v < 50; v++) {
      const a = armarHoja(v, TODOS, 2).map((e) => e.pregunta);
      const b = armarHoja(v + 1, TODOS, 2).map((e) => e.pregunta);
      expect(a).not.toEqual(b);
    }
  });

  it("trae los ejercicios pedidos por tema, en el orden del programa y sin repetir", () => {
    for (let v = 1; v <= 200; v++) {
      const hoja = armarHoja(v, TODOS, 4);
      expect(hoja).toHaveLength(20);
      expect(hoja.map((e) => e.tema)).toEqual(TODOS.flatMap((t) => [t, t, t, t]));
      expect(new Set(hoja.map((e) => e.pregunta)).size).toBe(20);
    }
  });

  it("pedir más ejercicios agrega sin cambiar los que ya estaban, y los temas no se afectan entre sí", () => {
    const dos = armarHoja(77, TODOS, 2);
    const tres = armarHoja(77, TODOS, 3);
    for (const t of TODOS) {
      expect(tres.filter((e) => e.tema === t).slice(0, 2)).toEqual(dos.filter((e) => e.tema === t));
    }
    expect(armarHoja(77, ["bonos"], 2)).toEqual(dos.filter((e) => e.tema === "bonos"));
  });

  it("alterna los dos tipos de ejercicio de cada tema", () => {
    for (let v = 1; v <= 100; v++) {
      for (const t of TODOS) {
        const [a, b] = armarHoja(v, [t], 2).map((e) => e.pregunta.slice(0, 12));
        expect(a).not.toBe(b);
      }
    }
  });

  it("los ajustes viajan en la dirección y lo inválido vuelve al valor por defecto", () => {
    const a = { version: 4821, temas: ["anualidades", "bonos"] as IdTema[], porTema: 3 };
    expect(leerAjustes(escribirAjustes(a))).toEqual(a);
    expect(leerAjustes("")).toEqual({ version: 1, temas: TODOS, porTema: 2 });
    expect(leerAjustes("#v=-4&t=nada,bonos&n=99")).toEqual({ version: 1, temas: ["bonos"], porTema: 2 });
    expect(leerAjustes("#v=1.5&n=0")).toEqual({ version: 1, temas: TODOS, porTema: 2 });
  });
});
