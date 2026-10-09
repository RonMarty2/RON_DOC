/**
 * Tema 1 de Psicoestadística Descriptiva · «La mesa de verificación» · reglas como DATOS.
 * Fuente: docs/juego/gdd/02-bucle-y-mecanicas.md (bucle v2, G1 a G12) y scripts-t1/tablas_t1_v2.py.
 *
 * Todo número que se ajuste tras probar con alumnos (la meta, las marcas, las fichas) vive AQUÍ y en ningún
 * otro lugar. Sin nota: lo que se guarda es registro.
 */

import type { Escena } from "../partida";
import { VERSION_MAXIMA } from "../planta";

// ── Constantes (una sola vez) ────────────────────────────────────────────────

/** Meta del cierre (G6): Credibilidad y Voz a este valor o más. UN solo número; subir a 70 es cambiar esta línea. */
export const META_CIERRE = 65;
/** Marca de la Credibilidad y la Voz en los tubos: a este valor o menos, el caso siguiente tiene menos fichas (G2). */
export const MARCA_BAJA = 25;
/** La otra marca dibujada en los tubos: coincide con la meta. */
export const MARCA_META = META_CIERRE;
export const MEDIDOR_MIN = 0;
export const MEDIDOR_MAX = 100;
/** Valor de los dos medidores al empezar el caso 2 (G1). */
export const MEDIDOR_INICIO = 50;
export const FICHAS_NORMALES = 3;
export const FICHAS_CASTIGO = 2;
/** Casos con medidores: del 2 al 8. El paso 1 («El primer encargo») no tiene tubos. El Tema 1 cuenta 8 casos con el paso 1. */
export const CANTIDAD_DE_CASOS = 8;
export const PRIMER_CASO_CON_MEDIDORES = 2;
export const ULTIMO_CASO = 8;
/** Casos 3 a 7: salen en orden barajado por alumno (G8). El 2 y el 8 son fijos. */
export const CASOS_BARAJADOS = [3, 4, 5, 6, 7] as const;

/** Isla y escena del tema. La escena cambia de nombre si cambia el sorteo (PIEZAS-COMUNES §2). */
export const ISLA_T1 = "psicoestadistica";
export const SEMILLA_T1 = "psicoestadistica:1";

// ── Tipos ────────────────────────────────────────────────────────────────────

/** Número de caso: 1 = paso 1 (sin medidores), 2 a 8 = casos con medidores. */
export type NumeroDeCaso = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type CasoConMedidores = Exclude<NumeroDeCaso, 1>;

/** P = con problema, B = bien, A = aún no se sabe (G7). */
export type TipoDeCaso = "P" | "B" | "A";

/** Credibilidad (c) y Voz, enteros entre 0 y 100. */
export interface Medidores {
  c: number;
  voz: number;
}

/** Efecto de una decisión: se suma a los medidores al cierre del caso. */
export interface Efecto {
  c: number;
  voz: number;
}

/** Un caso tal como lo ve la versión de un alumno. */
export interface Caso {
  numero: CasoConMedidores;
  tipo: TipoDeCaso;
}

/** Decisión del director en el caso 8 y verdad de la versión: 0 financiar, 1 no financiar, 2 aún no. */
export type DecisionCaso8 = 0 | 1 | 2;

/** Una tirada de G7: los tipos de los casos 3, 6 y 7. */
export type Tirada = readonly [TipoDeCaso, TipoDeCaso, TipoDeCaso];

/** Lo que cambia de un alumno a otro, ya sorteado (ver version.ts). */
export interface VersionT1 {
  /** Número de versión (1 a 999) del que sale todo. */
  semilla: number;
  /** Tipo de cada caso (G7). El caso 4 usa «A»/«B» como el estudio bueno, no como tipo; ver `buenoEsA`. */
  tipos: Record<2 | 3 | 6 | 7, TipoDeCaso>;
  /** Caso 4: el estudio bueno es A (formulario obligatorio) o B. */
  buenoEsA: boolean;
  /** Caso 5: efecto real del taller, 0 o 3 puntos. */
  efectoReal: 0 | 3;
  /** Caso 8: lo que decía la evidencia. */
  decisionReal: DecisionCaso8;
  /** Caso 8: lo que propone el colega Beto (1/3 acierta). */
  propuestaDeBeto: DecisionCaso8;
  /** Orden de los 8 casos con el paso 1 al principio: [1, 2, p1..p5, 8] con p una permutación de 3 a 7 (G8). */
  orden: NumeroDeCaso[];
  /** Pools de nombres (NT1.4 de 05-mundo-y-narrativa.md). */
  textos: {
    colegio: string;
    vecino: string;
    /** Una distinta por caso (casos 3, 6 y 7). */
    fuentes: Record<3 | 6 | 7, string>;
    dani: string;
    /** Los dos talleres del caso 7: distintos. */
    talleres: [string, string];
  };
}

// ── Eventos de la partida (secc. 12 del bucle; sin puntaje) ──────────────────

export type EventoT1 =
  | { tipo: "p1.respuestas"; propias: boolean; datos?: { horas: number; minutos: number; animo: number } }
  | { tipo: "p1.abrio"; papel: string; ficha: number }
  | { tipo: "p1.ayudado"; papel: string }
  | { tipo: "caso.entra"; caso: CasoConMedidores; casoTipo: TipoDeCaso | null; fichas: number; c: number; voz: number }
  | { tipo: "abrir"; caso: NumeroDeCaso; papel: string; rol: "clave" | "refuerzo" | "senuelo" }
  | { tipo: "tanda"; caso: 3; indice: number; media: number }
  | { tipo: "escribir"; caso: NumeroDeCaso; campo: string; valor: number | string; correcto: boolean | "banda" }
  | { tipo: "armar"; caso: NumeroDeCaso; piezas: string[] }
  | { tipo: "evidencia"; caso: 8; papeles: string[] }
  | { tipo: "lector"; caso: 7; momento: "antes" | "despues"; eleccion: string }
  | { tipo: "sella"; caso: CasoConMedidores; decision: string; efecto: Efecto; codigo: string | null }
  | { tipo: "sobre"; caso: NumeroDeCaso; escalon: number }
  | { tipo: "expediente"; id: string }
  | { tipo: "carta"; idea: number; orden: number }
  | { tipo: "cierre"; plazaFija: boolean; c: number; voz: number }
  | { tipo: "practica"; caso: NumeroDeCaso; intento: number }
  // Lo que hizo el alumno en un caso, tal como lo reciben las funciones de `respuestas.ts` (tipado en registro-t1.ts:
  // `EventoEntrada`). Con esto el docente recalcula rama, clase, códigos y tubos sin confiar en lo guardado.
  | { tipo: "entrada"; caso: NumeroDeCaso; entrada: unknown };

/** La escena del tema para `partida.ts`. Versiones de 1 a VERSION_MAXIMA (nunca 0). */
export const ESCENA_T1: Escena<typeof ISLA_T1, "tema1"> = {
  isla: ISLA_T1,
  escena: "tema1",
  versionValida: (v) => Number.isInteger(v) && v >= 1 && v <= VERSION_MAXIMA,
};
