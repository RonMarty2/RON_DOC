/**
 * El sonido del Tema 1 de Psicoestadística: las recetas de los 14 efectos (sintetizados, `07-sonido.md` S.2) y qué música suena
 * en cada fase de la pantalla (S.6.1). Es solo la tabla; el que toca es `src/lib/juego/sonido/motor.ts`.
 *
 * Reglas que se cumplen aquí: un efecto igual para toda situación equivalente; ningún efecto dice si la decisión fue buena o
 * mala (los tres botones de decidir suenan igual, solo cambia el tono neutro); la música sigue lo que ya se ve en pantalla.
 */

import type { Capa } from "../sonido/manifiesto";
import type { Receta } from "../sonido/receta";

export const ESCENA_AUDIO_T1 = "/juego/psicoestadistica/audio";

export type FaseT1 = "titulo" | "bienvenida" | "jefa" | "hoja" | "archivo1" | "asombro" | "cierre1" | "entrada2" | "archivo2" | "frase" | "confirma" | "reaccion" | "fin";
export const FASES_T1: readonly FaseT1[] = ["titulo", "bienvenida", "jefa", "hoja", "archivo1", "asombro", "cierre1", "entrada2", "archivo2", "frase", "confirma", "reaccion", "fin"];

// ── Efectos ──────────────────────────────────────────────────────────────────

/** E01 Abrir un papel: roce corto con un tono bajo suave. Idéntico para todo papel. */
export const E01: Receta = [
  { onda: "ruido", desde: 0, inicio: 0, dur: 0.08, vol: 0.35 },
  { onda: "triangle", desde: 180, hasta: 140, inicio: 0, dur: 0.09, vol: 0.25 },
];
/** E02 Gastar una ficha: tick doble, grave y seco. */
export const E02: Receta = [
  { onda: "square", desde: 220, inicio: 0, dur: 0.03, vol: 0.4 },
  { onda: "square", desde: 220, inicio: 0.07, dur: 0.03, vol: 0.4 },
];
/** E03 Escribir un número: siempre el mismo tono. */
export const E03: Receta = [{ onda: "square", desde: 660, inicio: 0, dur: 0.05, vol: 0.3 }];

/** E04, primera parte: el clic de apretar uno de los tres botones. Mismo timbre, un tono neutro distinto por botón. */
export type BotonDeDecidir = "tal" | "frase" | "frenar";
const TONO_DE_BOTON: Record<BotonDeDecidir, number> = { tal: 196, frase: 262, frenar: 392 };
export const E04_CLIC = (b: BotonDeDecidir): Receta => [{ onda: "square", desde: TONO_DE_BOTON[b], inicio: 0, dur: 0.05, vol: 0.4 }];
/** E04, segunda parte: la pluma y el timbre al firmar. Igual para los tres botones. */
export const E04_FIRMA: Receta = [
  { onda: "ruido", desde: 0, inicio: 0, dur: 0.16, vol: 0.2 },
  { onda: "triangle", desde: 880, inicio: 0.17, dur: 0.4, vol: 0.35 },
  { onda: "sine", desde: 1320, inicio: 0.17, dur: 0.3, vol: 0.15 },
];

/** E05 «¿Firmar? Después no hay vuelta»: una nota baja de ~1 s que se corta al responder. */
export const E05: Receta = [{ onda: "triangle", desde: 110, inicio: 0, dur: 1, vol: 0.45 }];
/** E06 Cae el sobre de la jefa: deslizar de papel y golpe suave. */
export const E06: Receta = [
  { onda: "ruido", desde: 0, inicio: 0, dur: 0.15, vol: 0.3 },
  { onda: "triangle", desde: 90, hasta: 60, inicio: 0.12, dur: 0.14, vol: 0.5 },
];
/** E07 Teléfono que suena: doble tono, tres timbrazos. */
export const E07: Receta = [0, 1, 2].flatMap((r) =>
  Array.from({ length: 6 }, (_, k) => ({ onda: "square" as const, desde: k % 2 ? 1000 : 800, inicio: r * 0.85 + k * 0.065, dur: 0.055, vol: 0.28 })),
);
/** E08 Pulgar arriba: dos notas cuadradas ascendentes, suaves. */
export const E08: Receta = [
  { onda: "square", desde: 523, inicio: 0, dur: 0.12, vol: 0.25 },
  { onda: "square", desde: 659, inicio: 0.12, dur: 0.16, vol: 0.25 },
];
/** E09 Cabeza entre las manos: dos notas triangulares descendentes, bajas. */
export const E09: Receta = [
  { onda: "triangle", desde: 330, inicio: 0, dur: 0.2, vol: 0.4 },
  { onda: "triangle", desde: 247, inicio: 0.2, dur: 0.32, vol: 0.4 },
];
/** E10 Medidor: blip hacia arriba o abajo; a 25 o menos, tres pitidos graves. */
export const E10 = (que: "sube" | "baja" | "alarma"): Receta =>
  que === "sube"
    ? [{ onda: "square", desde: 440, hasta: 660, inicio: 0, dur: 0.09, vol: 0.3 }]
    : que === "baja"
      ? [{ onda: "square", desde: 660, hasta: 440, inicio: 0, dur: 0.09, vol: 0.3 }]
      : [0, 1, 2].map((i) => ({ onda: "triangle" as const, desde: 120, inicio: i * 0.18, dur: 0.1, vol: 0.45 }));
/** E11 Ayuda que baja: campanilla descendente de cuatro notas, neutra. */
export const E11: Receta = [1047, 880, 784, 659].map((f, i) => ({ onda: "sine" as const, desde: f, inicio: i * 0.11, dur: 0.18, vol: 0.3 }));
/** E12 Dar vuelta la ficha n (1 a 8): la n suena siempre igual. (Se usa cuando se construya la revelación.) */
export const E12 = (n: number): Receta => {
  const escala = [262, 294, 330, 349, 392, 440, 494, 523];
  return [{ onda: "square", desde: escala[Math.min(8, Math.max(1, n)) - 1], inicio: 0, dur: 0.18, vol: 0.3 }];
};
/** E13 Clic de interfaz: al silenciar o activar el sonido. */
export const E13: Receta = [{ onda: "square", desde: 500, inicio: 0, dur: 0.03, vol: 0.3 }];
/** E14 Clic de elección: elegir o quitar una pieza, volver atrás, botones de menú. */
export const E14: Receta = [{ onda: "square", desde: 600, inicio: 0, dur: 0.025, vol: 0.3 }];
/** Soplo de Dani cuando cabecea: aire suave, sin notas que bajen. */
export const SOPLO_DE_DANI: Receta = [{ onda: "ruido", desde: 0, inicio: 0, dur: 0.6, vol: 0.12 }];
/** Pluck de corcho al colgar un papel en el Caso 2. */
export const PLUCK_DE_CORCHO: Receta = [{ onda: "triangle", desde: 330, hasta: 220, inicio: 0, dur: 0.12, vol: 0.4 }];

/** Todas las recetas de lista, para las pruebas. Las que dependen de un dato salen con cada valor posible. */
export function todasLasRecetas(): Record<string, Receta> {
  const r: Record<string, Receta> = { E01, E02, E03, E04_FIRMA, E05, E06, E07, E08, E09, E11, E13, E14, SOPLO_DE_DANI, PLUCK_DE_CORCHO };
  for (const b of ["tal", "frase", "frenar"] as const) r[`E04_CLIC_${b}`] = E04_CLIC(b);
  for (const q of ["sube", "baja", "alarma"] as const) r[`E10_${q}`] = E10(q);
  for (let n = 1; n <= 8; n++) r[`E12_${n}`] = E12(n);
  return r;
}

// ── Música ───────────────────────────────────────────────────────────────────

export interface EstadoParaMusica {
  fase: FaseT1;
  /** Fichas que quedan en la carpeta que se ve (archivo1 y archivo2). */
  fichas: number;
  /** Ya apareció algún papel con el sueño (Paso 1), abierto por el alumno o por Dani. */
  hallado: boolean;
  /** Algún medidor está en 25 o menos. */
  medidorBajo: boolean;
  /** En la fase «jefa»: qué línea se está leyendo (0 es la primera). La capa de duda entra con la segunda. */
  lineaDeLaJefa: number;
  /** Hay un papel abierto para leer (opcional): la música baja para dejar leer. */
  leyendo?: boolean;
}

/** Volumen de la música mientras el alumno lee papeles (Ronald 09-10: «me saca de concentración»): de fondo, y más bajo con un papel abierto. */
export const RELATIVO_LEYENDO = 0.5;
export const RELATIVO_PAPEL_ABIERTO = 0.3;
const alLeer = (e: EstadoParaMusica) => (e.leyendo ? RELATIVO_PAPEL_ABIERTO : RELATIVO_LEYENDO);

export interface MusicaPedida {
  escena: "s0" | "s1" | "s2" | "s10" | null;
  capa: Capa;
  relativo: number;
}

/** Qué música tiene que sonar según lo que se ve (07-sonido.md S.6.1). La música sigue el momento, nunca lo adelanta. */
export function musicaDeFase(e: EstadoParaMusica): MusicaPedida {
  const duda = e.fichas === 1;
  switch (e.fase) {
    case "titulo":
      return { escena: null, capa: "calma", relativo: 1 };
    case "bienvenida":
      return { escena: "s0", capa: "calma", relativo: 1 };
    case "jefa":
      return { escena: "s0", capa: e.lineaDeLaJefa >= 1 ? "duda" : "calma", relativo: 1 };
    case "hoja":
      return { escena: "s0", capa: "duda", relativo: 1 };
    case "archivo1":
      return { escena: "s1", capa: e.fichas <= 0 && !e.hallado ? "tension" : duda ? "duda" : "calma", relativo: alLeer(e) };
    case "asombro":
      return { escena: "s1", capa: "remate", relativo: 1 };
    case "cierre1":
      return { escena: "s1", capa: "calma", relativo: 1 };
    case "entrada2":
      return { escena: "s2", capa: "calma", relativo: 1 };
    case "archivo2":
    case "frase":
      return { escena: "s2", capa: duda ? "duda" : "calma", relativo: alLeer(e) };
    case "confirma":
      return { escena: "s2", capa: "tension", relativo: 1 };
    case "reaccion":
      return { escena: "s2", capa: e.medidorBajo ? "tension" : "calma", relativo: 0.6 };
    case "fin":
      return { escena: "s10", capa: "calma", relativo: 1 };
  }
}
