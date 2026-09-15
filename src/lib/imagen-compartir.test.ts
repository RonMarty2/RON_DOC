import { describe, expect, it } from "vitest";
import { imagenesParaCompartir, resumir } from "./imagen-compartir";

describe("imágenes para compartir", () => {
  it("una descripción larga se queda con la primera oración", () => {
    const aula =
      "Un cuestionario detecta el 88% de los casos reales y, aun así, la mitad de sus alarmas son falsas. El Aula recorre la Unidad 2 completa para que puedas calcular por qué.";
    expect(resumir(aula, 140)).toBe("Un cuestionario detecta el 88% de los casos reales y, aun así, la mitad de sus alarmas son falsas.");
    expect(resumir(aula)).toBe(aula);
  });

  it("una abreviatura no corta la oración", () => {
    const texto = "Material de las materias que dicta el Mgr. Ronald Martínez en Cochabamba. Cada concepto se define y se comprueba con datos reales del curso.";
    expect(resumir(texto, 100)).toBe("Material de las materias que dicta el Mgr. Ronald Martínez en Cochabamba.");
  });

  it("si ni la primera oración entra, corta en un espacio y nunca a mitad de palabra", () => {
    const texto = "palabra ".repeat(30).trim();
    const corto = resumir(texto, 50);
    expect(corto.endsWith("palabra…")).toBe(true);
    expect(corto.length).toBeLessThanOrEqual(50);
  });

  it("hay imagen para la portada, proyectos, cada materia y cada aula o lámina", () => {
    const claves = Object.keys(imagenesParaCompartir());
    for (const clave of ["portada", "proyectos", "aula-probabilidad", "bonos", "materia-matematica-financiera"]) {
      expect(claves).toContain(clave);
    }
    for (const c of claves) expect(c).toMatch(/^[a-z0-9-]+$/);
  });
});
