/**
 * El manifiesto de música de un juego (`public/juego/<isla>/audio/manifiesto.json`): qué archivos hay y qué capa de cada escena
 * es cada uno. Para sumar una pista basta con agregarla ahí; la pantalla no cambia.
 *
 * Aquí solo está lo que NO depende del navegador: leer el manifiesto con cuidado (lo que venga mal se descarta, nunca se rompe)
 * y elegir la pista de una capa, con la regla «la capa que falte se reemplaza por la calma».
 */

export type Capa = "calma" | "duda" | "tension" | "remate";
export const CAPAS: readonly Capa[] = ["calma", "duda", "tension", "remate"];

export interface Pista {
  archivo: string;
  bucle: boolean;
  /** Ajuste fino de volumen (1 por defecto). */
  volumen: number;
  duracion: number | null;
}

export interface Manifiesto {
  volumen: { musica: number; efectos: number; avisos: number };
  pistas: Record<string, Pista>;
  escenas: Record<string, Partial<Record<Capa, string>>>;
}

export const VOLUMEN_POR_DEFECTO = { musica: 0.3, efectos: 0.55, avisos: 0.65 } as const;
export const MANIFIESTO_VACIO: Manifiesto = { volumen: { ...VOLUMEN_POR_DEFECTO }, pistas: {}, escenas: {} };

const unidad = (x: unknown, defecto: number): number => (typeof x === "number" && Number.isFinite(x) && x >= 0 && x <= 1 ? x : defecto);

/** Lee un manifiesto venga como venga. Las pistas o escenas mal formadas se descartan; nunca lanza. */
export function leerManifiesto(crudo: unknown): Manifiesto {
  const m: Manifiesto = { volumen: { ...VOLUMEN_POR_DEFECTO }, pistas: {}, escenas: {} };
  if (typeof crudo !== "object" || crudo === null) return m;
  const c = crudo as Record<string, unknown>;
  const v = (typeof c.volumen === "object" && c.volumen !== null ? c.volumen : {}) as Record<string, unknown>;
  m.volumen = { musica: unidad(v.musica, 0.3), efectos: unidad(v.efectos, 0.55), avisos: unidad(v.avisos, 0.65) };
  if (typeof c.pistas === "object" && c.pistas !== null) {
    for (const [id, p] of Object.entries(c.pistas as Record<string, unknown>)) {
      const q = p as Record<string, unknown> | null;
      if (!q || typeof q.archivo !== "string" || !/^[\w.-]+$/.test(q.archivo)) continue;
      m.pistas[id] = {
        archivo: q.archivo,
        bucle: q.bucle !== false,
        volumen: unidad(q.volumen, 1),
        duracion: typeof q.duracion === "number" && q.duracion > 0 ? q.duracion : null,
      };
    }
  }
  if (typeof c.escenas === "object" && c.escenas !== null) {
    for (const [escena, capas] of Object.entries(c.escenas as Record<string, unknown>)) {
      if (typeof capas !== "object" || capas === null) continue;
      const fila: Partial<Record<Capa, string>> = {};
      for (const capa of CAPAS) {
        const id = (capas as Record<string, unknown>)[capa];
        if (typeof id === "string" && m.pistas[id]) fila[capa] = id;
      }
      m.escenas[escena] = fila;
    }
  }
  return m;
}

/** La pista que suena para una escena y capa: la de esa capa; si falta, la de calma; si tampoco hay, ninguna. */
export function pistaDe(m: Manifiesto, escena: string, capa: Capa): { id: string; pista: Pista } | null {
  const fila = m.escenas[escena];
  if (!fila) return null;
  const id = fila[capa] ?? fila.calma;
  if (!id || !m.pistas[id]) return null;
  return { id, pista: m.pistas[id] };
}
