import type { HerramientaMateria, Isla, Materia } from "@/lib/types";

export interface IslaConJuegos {
  isla: Isla;
  juegos: HerramientaMateria[];
}

export function juegosPublicados(materias: Materia[]): HerramientaMateria[] {
  return todosLosJuegos(materias).filter((j) => !j.borrador);
}

/** Agrupa los juegos por isla, en el orden de `islas`. Un juego sin isla conocida corta el build. */
export function islasConJuegos(
  islas: Isla[],
  materias: Materia[],
  { incluirBorradores }: { incluirBorradores: boolean }
): IslaConJuegos[] {
  const juegos = todosLosJuegos(materias);
  for (const j of juegos) {
    if (!islas.some((i) => i.slug === j.isla)) {
      throw new Error(`El juego ${j.href} no tiene una isla de content/islas.ts (isla: ${j.isla ?? "sin definir"})`);
    }
  }
  return islas.map((isla) => ({
    isla,
    juegos: juegos.filter((j) => j.isla === isla.slug && (incluirBorradores || !j.borrador)),
  }));
}

function todosLosJuegos(materias: Materia[]): HerramientaMateria[] {
  return materias.flatMap((m) => m.herramientas ?? []).filter((h) => h.tipo === "juego");
}
