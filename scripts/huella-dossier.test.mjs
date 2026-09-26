import { describe, expect, it } from "vitest";
import { comparar, filaDeTabla, huella, leerFilas, rutaRelativa } from "./huella-dossier.mjs";

describe("huella de los dossiers", () => {
  it("cambia si cambia una sola letra, y es igual para el mismo contenido", () => {
    expect(huella("Tema 6: razones de liquidez")).toBe(huella("Tema 6: razones de liquidez"));
    expect(huella("Tema 6: razones de liquidez")).not.toBe(huella("Tema 6: razones de liquidez."));
    expect(huella("x")).toMatch(/^[0-9a-f]{12}$/);
  });

  it("guarda la ruta relativa con barras normales, sin la carpeta personal", () => {
    const base = process.platform === "win32" ? "C:\\u\\materias" : "/u/materias";
    const archivo = process.platform === "win32" ? "C:\\u\\materias\\aief\\TEMA 6\\t6.tex" : "/u/materias/aief/TEMA 6/t6.tex";
    expect(rutaRelativa(base, archivo)).toBe("aief/TEMA 6/t6.tex");
  });

  it("lee de vuelta las filas que escribe, aunque el documento tenga otras tablas", () => {
    const fila = filaDeTabla({ ruta: "aief/TEMA 6/t6.tex", fecha: "2026-09-26", huella: "0123456789ab" });
    const doc = `# Adaptación\n\n| Tema | Idea |\n|---|---|\n| 6 | ratios |\n\n${fila}\n`;
    expect(leerFilas(doc)).toEqual([{ ruta: "aief/TEMA 6/t6.tex", fecha: "2026-09-26", huella: "0123456789ab" }]);
  });

  it("dice qué dossier cambió y cuál ya no está", () => {
    const anotadas = [
      { ruta: "a.tex", fecha: "2026-09-01", huella: "aaaaaaaaaaaa" },
      { ruta: "b.tex", fecha: "2026-09-01", huella: "bbbbbbbbbbbb" },
      { ruta: "c.tex", fecha: "2026-09-01", huella: "cccccccccccc" },
    ];
    const hoy = { "a.tex": { huella: "aaaaaaaaaaaa", fecha: "2026-09-01" }, "b.tex": { huella: "999999999999", fecha: "2026-09-20" } };
    expect(comparar(anotadas, (r) => hoy[r] ?? null).map((r) => r.estado)).toEqual(["igual", "cambió", "no está"]);
  });
});
