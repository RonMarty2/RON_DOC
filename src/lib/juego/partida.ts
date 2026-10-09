/**
 * Partidas de cualquier isla y escena (regla 2 de «Estructura»: lo común recibe la materia como dato).
 * Una partida es el registro de lo que hizo el alumno en una escena: cada evento con su hora. Qué
 * eventos existen lo define cada escena (la de la planta, en registro.ts); aquí sólo se guardan y se
 * leen, en el navegador y con la misma forma que usa la tabla `juego_partidas` de Supabase.
 *
 * Nombres estables (regla 3): la clave del navegador es `ron-doc-juego:<isla>:<escena>:<versión>`,
 * la misma que ya usaba la planta, así que lo guardado antes se sigue leyendo.
 */

export type ConHora<E> = E & { hora: string };

export interface PartidaDe<E, I extends string = string, S extends string = string> {
  isla: I;
  escena: S;
  version: number;
  eventos: ConHora<E>[];
  terminada: boolean;
}

/** Qué escena es y qué versiones admite: lo que distingue una partida de otra. */
export interface Escena<I extends string = string, S extends string = string> {
  isla: I;
  escena: S;
  /** true si esa versión existe para la escena (por ejemplo, de 0 a 999). */
  versionValida: (version: number) => boolean;
}

export function partidaNuevaDe<E, I extends string, S extends string>(e: Escena<I, S>, version: number): PartidaDe<E, I, S> {
  return { isla: e.isla, escena: e.escena, version, eventos: [], terminada: false };
}

export function anotarEn<E, I extends string, S extends string>(p: PartidaDe<E, I, S>, evento: E, hora = new Date()): PartidaDe<E, I, S> {
  return { ...p, eventos: [...p.eventos, { ...evento, hora: hora.toISOString() }] };
}

/** Lo que venga (del navegador o de la base) convertido en partida de esa escena y versión, o null. */
export function comoPartida<E, I extends string, S extends string>(
  e: Escena<I, S>,
  version: number,
  crudo: { isla?: unknown; escena?: unknown; version?: unknown; eventos?: unknown; terminada?: unknown } | null | undefined,
): PartidaDe<E, I, S> | null {
  if (!crudo || crudo.isla !== e.isla || crudo.escena !== e.escena || crudo.version !== version) return null;
  if (!Array.isArray(crudo.eventos) || !e.versionValida(version)) return null;
  return { isla: e.isla, escena: e.escena, version, eventos: crudo.eventos as ConHora<E>[], terminada: Boolean(crudo.terminada) };
}

/**
 * Qué partida queda al llegar la de la nube: la entregada manda; si no, la que tiene más eventos
 * (lo jugado sin conexión o mientras la nube respondía no se pisa). `subir` dice que la elegida
 * está más adelantada que la de la nube y hay que mandársela.
 */
export function elegirPartida<P extends { eventos: readonly unknown[]; terminada: boolean }>(
  actual: P | null,
  enNube: P | null,
): { partida: P | null; subir: boolean } {
  if (!enNube) return { partida: actual, subir: Boolean(actual && actual.eventos.length > 0) };
  if (!enNube.terminada && actual && actual.eventos.length > enNube.eventos.length) return { partida: actual, subir: true };
  return { partida: enNube, subir: false };
}

// ── Guardado en el navegador ─────────────────────────────────────────────────

export type Almacen = Pick<Storage, "getItem" | "setItem" | "removeItem">;

export const claveDePartida = (isla: string, escena: string, version: number) => `ron-doc-juego:${isla}:${escena}:${version}`;

function almacenDelNavegador(): Almacen | null {
  try {
    return typeof window === "undefined" ? null : window.localStorage;
  } catch {
    return null;
  }
}

/** La partida guardada en este navegador, o null si no hay, está rota o no se puede leer. */
export function leerPartidaDe<E, I extends string, S extends string>(
  e: Escena<I, S>,
  version: number,
  a: Almacen | null = almacenDelNavegador(),
): PartidaDe<E, I, S> | null {
  try {
    const crudo = a?.getItem(claveDePartida(e.isla, e.escena, version));
    return crudo ? comoPartida<E, I, S>(e, version, JSON.parse(crudo)) : null;
  } catch {
    return null;
  }
}

export function guardarPartidaDe<E>(p: PartidaDe<E>, a: Almacen | null = almacenDelNavegador()) {
  try {
    a?.setItem(claveDePartida(p.isla, p.escena, p.version), JSON.stringify(p));
  } catch {
    // sin lugar o bloqueado: el juego sigue, sólo que no se recuerda
  }
}

export function borrarPartidaDe(isla: string, escena: string, version: number, a: Almacen | null = almacenDelNavegador()) {
  try {
    a?.removeItem(claveDePartida(isla, escena, version));
  } catch {
    // ídem
  }
}
