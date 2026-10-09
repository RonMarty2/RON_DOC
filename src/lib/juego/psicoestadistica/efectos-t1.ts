/**
 * Tablas de efecto de los casos 2 a 8 del Tema 1, los códigos de error y los hábitos, como DATOS.
 * Fuente: scripts-t1/tablas_t1_v2.py (que a su vez cuenta contra 02-bucle-y-mecanicas.md). Si un número
 * cambia, se cambia en el .py, se vuelve a correr `exportar_fixtures_t1.py` y la prueba de paridad avisa
 * si esta copia quedó atrás.
 *
 * Un efecto es [Credibilidad, Voz]. La clave interna es el tipo (P, B, A), «*» si no depende del tipo, o
 * el nombre de la opción donde la fila depende de ella (caso 3 y la fila R2.3).
 */

import type { Efecto, Tirada } from "./reglas-t1";

export type FilaDeEfecto = Readonly<Record<string, readonly [number, number]>>;

/** G7: las 10 tiradas uniformes de los casos 3, 6 y 7. */
export const TIRADAS: readonly Tirada[] = [
  ["B", "B", "P"], ["B", "P", "P"], ["P", "B", "P"], ["B", "A", "P"], ["A", "B", "P"],
  ["P", "P", "B"], ["P", "B", "B"], ["B", "P", "B"], ["P", "A", "B"], ["A", "P", "B"],
];

export const FILAS: Readonly<Record<string, FilaDeEfecto>> = {
  // Caso 2
  "R2.1": { P: [-20, 10], B: [10, 10] },
  "R2.1.sin": { B: [5, 5] },
  "R2.2": { P: [3, -8], B: [0, -15] },
  "R2.3": { P: [8, 4], "P con refuerzo": [10, 4], B: [10, 10] },
  "R2.4": { P: [-8, 4], B: [0, 4] },
  // Caso 3
  "R3.P": { "tal cual": [-20, 10], frenar: [6, -8], "ok con pieza": [8, 4], "ok sin pieza o flojo": [3, 0], noCubre: [-10, 4], ancho: [0, -2] },
  "R3.B": { "tal cual": [10, 10], frenar: [0, -15], "ok con pieza": [0, 4], "ok sin pieza o flojo": [0, 2], noCubre: [-10, 4], ancho: [0, -2] },
  "R3.B.sin": { "tal cual": [5, 5] },
  "R3.A.sin": { "tal cual": [-20, 10], frenar: [0, -10], "rango sin pieza": [-8, 4], noCubre: [-10, 4], ancho: [0, -2] },
  "R3.A.con": { "ok con pieza": [8, 4], "flojo con pieza": [3, 0], noCubre: [-10, 4], ancho: [0, -2] },
  // Caso 4
  "R4.1": { "*": [10, 10] },
  "R4.1.sin": { "*": [5, 5] },
  "R4.2": { "*": [8, 4] },
  "R4.2.sin": { "*": [4, 2] },
  "R4.3": { "*": [-20, 10] },
  "R4.4": { "*": [-20, 4] },
  "R4.5": { "*": [0, -10] },
  // Caso 5 (turno 1: R5.1, R5.2; turno 2: R5.3 a R5.9)
  "R5.1": { "*": [0, 0] },
  "R5.2": { "*": [0, -3] },
  "R5.3": { "*": [2, -6] },
  "R5.4": { "*": [-20, 4] },
  "R5.5": { "*": [-20, 4] },
  "R5.6": { "*": [12, 6] },
  "R5.7": { "*": [6, 3] },
  "R5.8": { "*": [4, 2] },
  "R5.9": { "*": [-10, 0] },
  // Caso 6
  "R6.1": { P: [-20, 10], A: [-20, 10], B: [10, 10] },
  "R6.1.sin": { B: [5, 5] },
  "R6.2": { P: [6, -8], A: [0, -10], B: [0, -15] },
  "R6.3": { P: [2, 1], B: [0, 2], A: [0, 1] },
  "R6.4": { P: [-8, 4], A: [-8, 4], B: [0, 4] },
  "R6.5": { P: [8, 4], A: [8, 4], B: [10, 10] },
  "R6.6": { "*": [-10, 0] }, // N mal contado: se suma a lo anterior
  // Caso 7
  "R7.1": { P: [-10, 10], B: [10, 10] },
  "R7.2": { P: [-20, 10], B: [4, 10] },
  "R7.3": { P: [8, 4], B: [0, -4] },
  "R7.4": { P: [-8, 4], B: [-6, -4] },
  "R7.5": { P: [6, -8], B: [0, -15] },
  // Caso 8
  "R8.1": { "*": [12, 8] },
  "R8.2": { "*": [6, 4] },
  "R8.3": { "*": [0, 0] },
  "R8.4": { "*": [-20, 6] },
  "R8.5": { "*": [-15, 6] },
  "R8.6": { "*": [-15, -8] },
  "R8.7": { "*": [-10, -6] },
  "R8.8": { "*": [0, -8] },
};

/** Cuántas filas tiene cada caso (para contar). Suman 46. */
export const FILAS_POR_CASO: Readonly<Record<number, number>> = { 2: 5, 3: 5, 4: 7, 5: 9, 6: 7, 7: 5, 8: 8 };

/** G5: las 7 filas de «acierto sin evidencia». */
export const G5_FILAS = ["R2.1.sin", "R3.B.sin", "R4.1.sin", "R4.2.sin", "R6.1.sin", "R5.8", "R8.3"] as const;
/** Las cinco primeras valen la mitad (redondeo hacia cero) de su fila con evidencia: [fila, clave]. */
export const G5_MITAD: Readonly<Record<string, readonly [string, string]>> = {
  "R2.1.sin": ["R2.1", "B"],
  "R3.B.sin": ["R3.B", "tal cual"],
  "R4.1.sin": ["R4.1", "*"],
  "R4.2.sin": ["R4.2", "*"],
  "R6.1.sin": ["R6.1", "B"],
};

export type Habito = "H1" | "H2" | "H3" | "H4";

/** Códigos de error y hábitos: UNA SOLA TABLA (hallazgo I1 de v15). */
export const CODIGOS: Readonly<Record<string, { texto: string; habitos: readonly Habito[] }>> = {
  E2a: { texto: "firmó tal cual con problema", habitos: ["H1", "H2"] },
  E2b: { texto: "frenó con problema sin abrir el clave", habitos: ["H1"] },
  E2c: { texto: "frase sin la pieza del clave", habitos: ["H3"] },
  E2d: { texto: "frenó en B (el cero se sostenía)", habitos: ["H3"] },
  E3a: { texto: "firmó tal cual con 1 tanda o menos", habitos: ["H1", "H2"] },
  E3b: { texto: "rango que no cubre", habitos: ["H4"] },
  E3c: { texto: "rango ancho", habitos: ["H3"] },
  E3d: { texto: "frenó en B", habitos: ["H3"] },
  E3e: { texto: "rango en A sin la pieza", habitos: ["H4"] },
  E3f: { texto: "rango bueno en P o B sin la pieza", habitos: ["H1"] },
  E4a: { texto: "eligió sin abrir ninguno de los 4 papeles que destapan", habitos: ["H1", "H2"] },
  E4b: { texto: "eligió B siendo A el bueno habiendo visto que lo era", habitos: ["H3"] },
  E4c: { texto: "ninguna", habitos: ["H3"] },
  E5a: { texto: "subida bruta", habitos: ["H4"] },
  E5b: { texto: "inflado", habitos: ["H4"] },
  E5c: { texto: "sin comparar", habitos: ["H1"] },
  E5d: { texto: "escribió 0 con la comparación abierta y rho mayor que 1", habitos: ["H3"] },
  E5e: { texto: "aconsejó (a) o (b) en el turno 1", habitos: ["H4"] },
  E6a: { texto: "N mal contado", habitos: ["H4"] },
  E6b: { texto: "tal cual en P o A", habitos: ["H2"] },
  E6c: { texto: "podrían sin motivo", habitos: ["H3"] },
  E6d: { texto: "frenó en B", habitos: ["H3"] },
  E7a: { texto: "x incorrecto (escribió lo que se ve)", habitos: ["H4"] },
  E7b: { texto: "tal cual en P", habitos: ["H2"] },
  E7c: { texto: "rediseño o freno en B", habitos: ["H3"] },
  E8a: { texto: "decidió con menos de 2 claves sobre la mesa", habitos: ["H1"] },
  E8b: { texto: "esperó cuando se podía decidir", habitos: ["H3"] },
  E8c: { texto: "financió o no financió contra la evidencia", habitos: ["H4"] },
  E8d: { texto: "coincidió con el colega o lo contradijo contra la evidencia", habitos: ["H3", "H4"] },
};

export const CODIGOS_POR_CASO: Readonly<Record<number, number>> = { 2: 4, 3: 6, 4: 3, 5: 5, 6: 4, 7: 3, 8: 4 };
/** Cuántos códigos alimentan cada hábito (E8d cuenta en H3 y en H4). */
export const HABITOS_ESPERADOS: Readonly<Record<Habito, number>> = { H1: 7, H2: 5, H3: 12, H4: 9 };
/** Códigos sin sobre propio (solo registro). (Hay 29 códigos en la tabla; la cuenta de sobres de 05 es asunto de narrativa.) */
export const SIN_SOBRE = ["E5e", "E8d"] as const;

/** Efecto de una fila. Lanza si la fila o la clave no existen (un error de programación, no del alumno). */
export function efectoDe(fila: string, clave = "*"): Efecto {
  const e = FILAS[fila]?.[clave];
  if (!e) throw new Error(`Sin efecto para ${fila} / ${clave}`);
  return { c: e[0], voz: e[1] };
}
