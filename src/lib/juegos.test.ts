import { describe, expect, it } from "vitest";
import { ISLAS } from "@content/islas";
import { MATERIAS } from "@content/materias";
import type { HerramientaMateria, Isla, Materia } from "@/lib/types";
import { islasConJuegos, juegosPublicados } from "./juegos";

const islas: Isla[] = [
  { slug: "a", nombre: "Isla A", descripcion: "" },
  { slug: "b", nombre: "Isla B", descripcion: "" },
];

function materia(herramientas: HerramientaMateria[]): Materia {
  return { slug: "m", nombre: "M", descripcion: "", temas: [], herramientas };
}

const juego = (href: string, isla: string, borrador = false): HerramientaMateria => ({
  href,
  titulo: href,
  descripcion: "",
  tipo: "juego",
  isla,
  borrador,
});

describe("islasConJuegos", () => {
  const materias = [
    materia([juego("/b1", "b"), juego("/a1", "a", true), { href: "/aula", titulo: "", descripcion: "" }]),
  ];

  it("agrupa por isla en el orden del registro y deja fuera lo que no es juego", () => {
    const r = islasConJuegos(islas, materias, { incluirBorradores: true });
    expect(r.map((x) => [x.isla.slug, x.juegos.map((j) => j.href)])).toEqual([
      ["a", ["/a1"]],
      ["b", ["/b1"]],
    ]);
  });

  it("sin borradores, la isla queda vacía (en construcción)", () => {
    const r = islasConJuegos(islas, materias, { incluirBorradores: false });
    expect(r[0].juegos).toEqual([]);
    expect(juegosPublicados(materias).map((j) => j.href)).toEqual(["/b1"]);
  });

  it("un juego con una isla que no existe corta el build", () => {
    expect(() => islasConJuegos(islas, [materia([juego("/x", "zeta")])], { incluirBorradores: true })).toThrow(/x/);
  });

  it("todos los juegos del sitio tienen una isla registrada", () => {
    expect(() => islasConJuegos(ISLAS, MATERIAS, { incluirBorradores: true })).not.toThrow();
  });
});
