/**
 * Escalera de ayuda, común a todas las escenas de todas las materias (IDEA-JUEGO §11, "dominio antes
 * de avanzar"): el alumno no pasa hasta hacerlo bien y nunca recibe la respuesta. Cada error sube un
 * escalón:
 *
 *   1. pista según su error (la escena la elige por el diagnóstico);
 *   2. pista concreta: qué paso revisar, sin el resultado;
 *   3. leer la sección exacta del dossier (si el paso tiene una; si no, sigue la pista concreta).
 *
 * El cuarto escalón de la regla, "otros números", queda para cuando el registro guarde la versión de
 * cada paso (hoy toda la partida usa una sola versión).
 */

export type Escalon = "pista" | "concreta" | "leer";

export interface AyudaDePaso {
  /** Qué revisar, en pasos, sin el número final. */
  concreta: string[];
  /** Dónde leer en el dossier; sin esto el tercer escalón repite la pista concreta. */
  leer?: { donde: string; que: string };
}

/** El escalón que corresponde después de `fallos` errores seguidos en el mismo paso (0 = ninguno). */
export function escalonDe(fallos: number): Escalon | null {
  if (fallos <= 0) return null;
  if (fallos === 1) return "pista";
  if (fallos === 2) return "concreta";
  return "leer";
}

/** Lo que se muestra debajo de la pista, según el escalón. */
export function ayudaVisible(fallos: number, ayuda: AyudaDePaso): { concreta: string[]; leer: string | null } {
  const e = escalonDe(fallos);
  const concreta = e === "concreta" || e === "leer" ? ayuda.concreta : [];
  const leer = e === "leer" && ayuda.leer ? `Lee en tu dossier ${ayuda.leer.donde}: ${ayuda.leer.que}. Después vuelve a intentarlo.` : null;
  return { concreta, leer };
}
