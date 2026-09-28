import type { HerramientaMateria, Isla, Materia } from "@/lib/types";

export interface FilaDeJuego {
  /** El tema de la materia; null para un juego sin tema asignado. */
  tema: { numero: number; titulo: string } | null;
  /** La escena de ese tema, o null si todavía no hay («En construcción»). */
  juego: HerramientaMateria | null;
}

export interface JuegoDeMateria {
  isla: Isla;
  filas: FilaDeJuego[];
}

export const juegosDe = (m: Materia) => (m.herramientas ?? []).filter((h) => h.tipo === "juego");

/**
 * La sección Jugar de una materia: un renglón por tema (con su juego o vacío) y, al final, los juegos
 * sin tema. null si la materia todavía no tiene isla. Muestra también los borradores: la página de la
 * materia los marca «En prueba».
 */
export function juegoDeMateria(m: Materia, islas: Isla[]): JuegoDeMateria | null {
  const isla = islas.find((i) => i.materia === m.slug);
  if (!isla) return null;
  const juegos = juegosDe(m);
  const filas: FilaDeJuego[] = (isla.temas ?? []).map((t) => ({ tema: t, juego: juegos.find((j) => j.tema === t.numero) ?? null }));
  for (const j of juegos) if (!(isla.temas ?? []).some((t) => t.numero === j.tema)) filas.push({ tema: null, juego: j });
  return { isla, filas };
}

/**
 * El candado de las etapas (Ronald, 27-09): ningún tema tiene juego sin plan aprobado por Ronald, y
 * nada se publica (sin `borrador`) si es un prototipo o si su isla todavía no tiene temas planificados.
 */
function revisarCandado(isla: Isla, j: HerramientaMateria): void {
  const tema = isla.temas?.find((t) => t.numero === j.tema);
  const plan = tema?.plan ?? "";
  const aprobado = /^aprobado \d{4}-\d{2}-\d{2}/.test(plan);
  const etapas = "Pasa primero por los agentes (.claude/agents/LEEME.md) y que Ronald apruebe el plan.";
  if (!j.borrador && !/^aprobado \d{4}-\d{2}-\d{2}/.test(isla.aspecto ?? "")) {
    throw new Error(`El juego ${j.href} se publica sin el aspecto aprobado por Ronald en la isla ${isla.slug} (bocetos del director, 01-vision.md).`);
  }
  if (!isla.temas) {
    if (!j.borrador) throw new Error(`El juego ${j.href} se publica sin temas planificados en la isla ${isla.slug}. ${etapas}`);
    return;
  }
  if (!tema) throw new Error(`El juego ${j.href} no dice de qué tema es (isla ${isla.slug}).`);
  if (!aprobado && plan !== "prototipo") {
    throw new Error(`El Tema ${tema.numero} de ${isla.slug} tiene juego sin plan aprobado (plan: «${plan || "pendiente"}»). ${etapas}`);
  }
  if (plan === "prototipo" && !j.borrador) throw new Error(`El juego ${j.href} es un prototipo: no se publica hasta que Ronald apruebe su plan.`);
}

/** Corta el build si un juego no calza: isla inexistente, isla de otra materia o tema que la isla no tiene. */
export function revisarJuegos(islas: Isla[], materias: Materia[]): void {
  for (const m of materias) {
    for (const j of juegosDe(m)) {
      const isla = islas.find((i) => i.slug === j.isla);
      if (!isla) throw new Error(`El juego ${j.href} no tiene una isla de content/islas.ts (isla: ${j.isla ?? "sin definir"})`);
      if (isla.materia !== m.slug) throw new Error(`El juego ${j.href} está en ${m.slug} pero su isla ${isla.slug} es de ${isla.materia}`);
      if (j.tema !== undefined && isla.temas && !isla.temas.some((t) => t.numero === j.tema)) {
        throw new Error(`El juego ${j.href} dice tema ${j.tema}, que la isla ${isla.slug} no tiene`);
      }
      revisarCandado(isla, j);
    }
  }
  for (const i of islas) {
    if (!materias.some((m) => m.slug === i.materia)) throw new Error(`La isla ${i.slug} apunta a una materia que no existe: ${i.materia}`);
  }
}
