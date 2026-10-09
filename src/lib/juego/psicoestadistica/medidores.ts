/**
 * Los dos medidores del Tema 1 (Credibilidad y Voz): topes, fichas del caso, meta del cierre y la regla
 * «los medidores no se mueven mientras abres papeles; se aplican al cierre del caso» (G1, G2, G4, G6).
 * Todo es puro e inmutable: cada función devuelve un valor nuevo.
 */

import {
  FICHAS_CASTIGO,
  FICHAS_NORMALES,
  MARCA_BAJA,
  MEDIDOR_INICIO,
  MEDIDOR_MAX,
  MEDIDOR_MIN,
  META_CIERRE,
  type Efecto,
  type Medidores,
} from "./reglas-t1";

/** Tope: un medidor no baja de 0 ni sube de 100. */
export const topar = (x: number): number => Math.min(MEDIDOR_MAX, Math.max(MEDIDOR_MIN, x));

/** G1: los dos arrancan en 50 al empezar el caso 2. */
export const medidoresIniciales = (): Medidores => ({ c: MEDIDOR_INICIO, voz: MEDIDOR_INICIO });

function exigirEntero(e: Efecto) {
  if (!Number.isInteger(e.c) || !Number.isInteger(e.voz)) throw new Error(`Efecto no entero: ${e.c}/${e.voz}`);
}

/** Suma efectos sin topar (sirve para juntar las partes de un mismo caso: R6.6 y los dos turnos del caso 5). */
export function sumarEfectos(efectos: readonly Efecto[]): Efecto {
  let c = 0;
  let voz = 0;
  for (const e of efectos) {
    exigirEntero(e);
    c += e.c;
    voz += e.voz;
  }
  return { c, voz };
}

/** Aplica UN efecto con tope. */
export function aplicarEfecto(m: Medidores, e: Efecto): Medidores {
  exigirEntero(e);
  return { c: topar(m.c + e.c), voz: topar(m.voz + e.voz) };
}

/**
 * Aplica todos los efectos de un caso: se SUMAN primero y se topa UNA vez al final (así lo hace el simulador
 * y así lo dice G1: el tope se aplica después de cada caso, no de cada fila).
 */
export function aplicarEfectos(m: Medidores, efectos: readonly Efecto[]): Medidores {
  return aplicarEfecto(m, sumarEfectos(efectos));
}

/** G6: plaza fija = ambos medidores en la meta o por encima. Un solo número, `META_CIERRE`. */
export const metaAlcanzada = (m: Medidores): boolean => m.c >= META_CIERRE && m.voz >= META_CIERRE;

/** Un medidor «en la marca baja»: 25 o menos (el tubo titila y la lámpara baja). A 26 o más no hay aviso. */
export const enMarcaBaja = (valor: number): boolean => valor <= MARCA_BAJA;

/** G2: fichas del caso que va a empezar, con los medidores de ESE momento: 2 si alguno está en 25 o menos, si no 3. */
export const fichasDelCaso = (m: Medidores): number => (enMarcaBaja(m.c) || enMarcaBaja(m.voz) ? FICHAS_CASTIGO : FICHAS_NORMALES);

// ── Un caso en curso: los medidores quietos hasta el cierre ──────────────────

export interface CasoEnCurso {
  /** Medidores al entrar al caso: lo único que se ve mientras se abren papeles. */
  inicio: Medidores;
  /** Fichas del caso, fijadas al entrar (G2). En el caso 5 valen para los dos turnos. */
  fichas: number;
  /** Efectos ya decididos pero todavía sin aplicar (el turno 1 del caso 5 queda aquí hasta el cierre). */
  pendientes: readonly Efecto[];
  cerrado: boolean;
}

export function abrirCaso(m: Medidores): CasoEnCurso {
  return { inicio: { ...m }, fichas: fichasDelCaso(m), pendientes: [], cerrado: false };
}

/** Lo que dibujan los tubos: SIEMPRE los del inicio del caso, aunque haya efectos pendientes. */
export const medidoresVisibles = (caso: CasoEnCurso): Medidores => ({ ...caso.inicio });

/** Guarda un efecto para el cierre. No toca los medidores. Un caso cerrado no admite más (G4: no se rehace). */
export function anotarEfecto(caso: CasoEnCurso, e: Efecto): CasoEnCurso {
  if (caso.cerrado) throw new Error("El caso ya está cerrado: la decisión sellada no se rehace (G4)");
  exigirEntero(e);
  return { ...caso, pendientes: [...caso.pendientes, { ...e }] };
}

/** Cierra el caso: aplica los efectos pendientes (sumados, con tope una vez) y devuelve los medidores nuevos. */
export function cerrarCaso(caso: CasoEnCurso): { caso: CasoEnCurso; medidores: Medidores } {
  if (caso.cerrado) throw new Error("El caso ya está cerrado (G4)");
  const medidores = aplicarEfectos(caso.inicio, caso.pendientes);
  return { caso: { ...caso, cerrado: true }, medidores };
}
