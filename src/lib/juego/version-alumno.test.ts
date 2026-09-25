import { describe, expect, it } from "vitest";
import { VERSION_MAXIMA } from "./planta";
import { versionDeAlumno } from "./version-alumno";

// Ids con forma de UUID, como los de Supabase.
const ids = Array.from({ length: 2000 }, (_, i) => `${i.toString(16).padStart(8, "0")}-4b1d-4c2e-9f00-${(i * 7919).toString(16).padStart(12, "0")}`);

describe("versionDeAlumno", () => {
  it("siempre da la misma versión para la misma cuenta, sin importar mayúsculas", () => {
    const id = "3F2504E0-4F89-11D3-9A0C-0305E82C3301";
    expect(versionDeAlumno(id)).toBe(versionDeAlumno(id.toLowerCase()));
    expect(versionDeAlumno(id)).toBe(versionDeAlumno(id));
  });

  it("nunca da 0 (el caso del dossier) ni se pasa del máximo", () => {
    for (const id of ids) {
      const v = versionDeAlumno(id);
      expect(Number.isInteger(v)).toBe(true);
      expect(v).toBeGreaterThanOrEqual(1);
      expect(v).toBeLessThanOrEqual(VERSION_MAXIMA);
    }
  });

  it("reparte a un curso entre muchas versiones distintas", () => {
    const curso = ids.slice(0, 40).map((id) => versionDeAlumno(id));
    expect(new Set(curso).size).toBeGreaterThanOrEqual(38);
  });

  it("otra escena da otra versión a la misma cuenta", () => {
    const distintas = ids.slice(0, 50).filter((id) => versionDeAlumno(id) !== versionDeAlumno(id, "proyectos:camara")).length;
    expect(distintas).toBeGreaterThanOrEqual(45);
  });
});
