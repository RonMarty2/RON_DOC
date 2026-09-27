import { describe, expect, it } from "vitest";
import { ISLAS } from "@content/islas";
import { MATERIAS } from "@content/materias";
import type { HerramientaMateria, Isla, Materia } from "@/lib/types";
import { juegoDeMateria, revisarJuegos } from "./juegos";

const isla: Isla = {
  slug: "x",
  nombre: "Isla X",
  descripcion: "",
  materia: "m",
  temas: [
    { numero: 1, titulo: "Uno" },
    { numero: 2, titulo: "Dos" },
  ],
};

const juego = (href: string, extra: Partial<HerramientaMateria> = {}): HerramientaMateria => ({
  href,
  titulo: href,
  descripcion: "",
  tipo: "juego",
  isla: "x",
  ...extra,
});

const materia = (herramientas: HerramientaMateria[], slug = "m"): Materia => ({ slug, nombre: "M", descripcion: "", temas: [], herramientas });

describe("juegoDeMateria", () => {
  it("un renglón por tema, en orden; el tema sin juego queda vacío y el juego sin tema va al final", () => {
    const r = juegoDeMateria(materia([juego("/t2", { tema: 2 }), juego("/suelto")]), [isla])!;
    expect(r.filas.map((f) => [f.tema?.numero ?? null, f.juego?.href ?? null])).toEqual([
      [1, null],
      [2, "/t2"],
      [null, "/suelto"],
    ]);
  });

  it("una materia sin isla no tiene sección de juego (se muestra «En construcción»)", () => {
    expect(juegoDeMateria(materia([], "otra"), [isla])).toBeNull();
  });
});

describe("revisarJuegos", () => {
  it("corta si el juego está en otra materia que su isla, o si su tema no existe", () => {
    expect(() => revisarJuegos([isla], [materia([juego("/a")], "otra"), materia([])])).toThrow(/otra/);
    expect(() => revisarJuegos([isla], [materia([juego("/a", { tema: 9 })])])).toThrow(/tema 9/);
    expect(() => revisarJuegos([isla], [materia([juego("/a", { isla: "zeta" })])])).toThrow(/zeta/);
  });

  it("todo el sitio calza: cada juego en la materia de su isla y con un tema que existe", () => {
    expect(() => revisarJuegos(ISLAS, MATERIAS)).not.toThrow();
  });

  it("La ventanilla aparece en el Tema 1 de AIEF y los otros 6 temas quedan en construcción", () => {
    const aief = MATERIAS.find((m) => m.slug === "analisis-estados-financieros")!;
    const r = juegoDeMateria(aief, ISLAS)!;
    expect(r.filas).toHaveLength(7);
    expect(r.filas[0].juego?.href).toBe("/juego-aief");
    expect(r.filas.slice(1).every((f) => f.juego === null)).toBe(true);
  });
});
