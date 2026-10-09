/**
 * Lo que la pantalla del Tema 1 necesita para jugar el Paso 1 y el Caso 2, sin dibujar nada: cuántas fichas quedan, cuándo
 * habla la jefa, cuándo abre Dani, qué piezas tiene la frase y qué le llega a `resolverCaso2`.
 *
 * Todo es puro e inmutable: la pantalla guarda el estado y llama a estas funciones. Las reglas vienen de `02-bucle-y-mecanicas.md`
 * (P1.3 a P1.6 y 5.1) y los pagos los pone `respuestas.ts`; aquí no se calcula ningún efecto.
 */

import { abrirCarpeta, abrirPapel, estaAbierto, fichasRestantes, type CarpetaAbierta } from "./carpeta";
import type { PaqueteT1 } from "./cifras";
import { piezasDePapel, PIEZAS_GENERICAS_CASO2 } from "./papeles-t1";
import { FICHAS_NORMALES } from "./reglas-t1";
import { resolverCaso2, resolverPaso1, type EntradaCaso2, type ResultadoCaso } from "./respuestas";

// ── Paso 1 ───────────────────────────────────────────────────────────────────

export interface Paso1Estado {
  carpeta: CarpetaAbierta;
  /** La jefa ya dijo «¿Seguro que ahí no había nada?» y regaló una ficha (P1.5: una sola vez). */
  regalo: boolean;
  /** Dani abrió por él el primer papel con sueño (P1.5). Ese papel no gasta ficha. */
  ayudado: string | null;
}

/** Qué pasó al abrir un papel: lo que la pantalla tiene que mostrar además del papel. */
export type AvisoPaso1 = "jefa-regala" | "dani-abre" | null;

export const paso1Nuevo = (p: PaqueteT1): Paso1Estado => ({ carpeta: abrirCarpeta(p.carpetas.porCaso[1], FICHAS_NORMALES), regalo: false, ayudado: null });

/** Todos los papeles que el alumno ya tiene a la vista (los que abrió y el que abrió Dani). */
export const papelesVistosPaso1 = (e: Paso1Estado): string[] => (e.ayudado ? [...e.carpeta.abiertos, e.ayudado] : [...e.carpeta.abiertos]);

export function abrioSuenoPaso1(p: PaqueteT1, e: Paso1Estado): boolean {
  const claves = p.carpetas.porCaso[1].claves;
  return papelesVistosPaso1(e).some((id) => claves.includes(id));
}

export const fichasPaso1 = (e: Paso1Estado): number => fichasRestantes(e.carpeta);

/** P1.3 y P1.5: abre un papel (cuesta 1 ficha) y dice si la jefa regala una ficha o Dani abre el papel con sueño. */
export function abrirEnPaso1(p: PaqueteT1, e: Paso1Estado, id: string): { estado: Paso1Estado; aviso: AvisoPaso1 } {
  if (estaAbierto(e.carpeta, id) || e.ayudado === id) return { estado: e, aviso: null };
  let estado: Paso1Estado = { ...e, carpeta: abrirPapel(e.carpeta, id) };
  if (abrioSuenoPaso1(p, estado) || fichasRestantes(estado.carpeta) > 0) return { estado, aviso: null };
  // Se le acabaron las fichas sin abrir uno con sueño.
  if (!estado.regalo) {
    estado = { ...estado, regalo: true, carpeta: { ...estado.carpeta, fichas: estado.carpeta.fichas + 1 } };
    return { estado, aviso: "jefa-regala" };
  }
  const primero = p.carpetas.porCaso[1].claves[0];
  return { estado: { ...estado, ayudado: primero }, aviso: "dani-abre" };
}

/** Lo que el registro anota del Paso 1: si abrió alguno con sueño y si le hizo falta ayuda. */
export function cierreDelPaso1(p: PaqueteT1, e: Paso1Estado) {
  const r = resolverPaso1(p, { abiertos: papelesVistosPaso1(e) });
  return { ...r, ayudado: e.ayudado !== null };
}

// ── Caso 2 ───────────────────────────────────────────────────────────────────

export interface PiezaDeFrase {
  /** Lo que dice la pieza (ya con las cifras de la versión). */
  texto: string;
  /** El papel que la agrega; null en las tres genéricas. */
  papel: string | null;
}

/** M3: las 3 genéricas, siempre; más lo que agrega cada papel ya abierto. */
export function piezasDisponibles2(p: PaqueteT1, abiertos: readonly string[]): PiezaDeFrase[] {
  const genericas = PIEZAS_GENERICAS_CASO2.map((texto) => ({ texto, papel: null }));
  const deLosPapeles = abiertos.flatMap((id) => piezasDePapel(p, id).map((texto) => ({ texto, papel: id })));
  return [...genericas, ...deLosPapeles];
}

export const PIEZAS_MIN = 2;
export const PIEZAS_MAX = 3;

/** La frase se puede sellar con 2 o 3 piezas. */
export const fraseValida = (piezas: readonly unknown[]): boolean => piezas.length >= PIEZAS_MIN && piezas.length <= PIEZAS_MAX;

/** Pasa la frase armada a lo que entiende `resolverCaso2`: si lleva una pieza del clave y si lleva la del refuerzo. */
export function entradaDeFrase2(p: PaqueteT1, abiertos: readonly string[], elegidas: readonly PiezaDeFrase[]): EntradaCaso2 {
  if (!fraseValida(elegidas)) throw new Error(`La frase lleva de ${PIEZAS_MIN} a ${PIEZAS_MAX} piezas`);
  const carpeta = p.carpetas.porCaso[2];
  const delClave = elegidas.some((x) => x.papel !== null && carpeta.claves.includes(x.papel));
  const delRefuerzo = carpeta.refuerzo !== null && elegidas.some((x) => x.papel === carpeta.refuerzo);
  return { abiertos, decision: "frase", piezaClave: delClave, piezaRefuerzo: delRefuerzo };
}

export function resolverDecision2(
  p: PaqueteT1,
  abiertos: readonly string[],
  decision: "tal" | "frenar" | { frase: readonly PiezaDeFrase[] },
): ResultadoCaso {
  if (decision === "tal" || decision === "frenar") return resolverCaso2(p, { abiertos, decision });
  return resolverCaso2(p, entradaDeFrase2(p, abiertos, decision.frase));
}
