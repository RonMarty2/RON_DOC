/**
 * Dataset "La duda de Andrea" — 60 estudiantes de primer año.
 *
 * FUENTE ÚNICA DE VERDAD de toda la herramienta Aula Interactiva de
 * Probabilidad. Generado con semilla fija. NO modificar: los números
 * pedagógicos dependen de estos datos exactos.
 *
 * Verificado:
 *  - ánimo bajo real: 8/60 (13.3%)
 *  - duermen mal: 16
 *  - P(ánimo | duerme mal): 4/16 = 25%
 *  - test: VP=8, FP=13, FN=0, VN=39, total positivos=21
 *  - P(ánimo | test positivo): 8/21 = 38%
 */

export interface Estudiante {
  id: number;
  nombre: string;
  /** Cumpleaños legible (ej. "14 feb"). */
  cumple: string;
  mes: number;
  dia: number;
  /** Atributo observable: duerme mal. */
  duermeMal: boolean;
  /** Estado real (oculto): tiene ánimo bajo. */
  animoBajo: boolean;
  /** Resultado del test rápido. */
  testPositivo: boolean;
  /** Daniela: sana pero con test positivo (falso positivo). El corazón del caso. */
  esDaniela: boolean;
}

export const ESTUDIANTES: Estudiante[] = [
  { id: 1, nombre: "Ana", cumple: "14 feb", mes: 2, dia: 14, duermeMal: false, animoBajo: false, testPositivo: false, esDaniela: false },
  { id: 2, nombre: "Bruno", cumple: "29 oct", mes: 10, dia: 29, duermeMal: true, animoBajo: true, testPositivo: true, esDaniela: false },
  { id: 3, nombre: "Camila", cumple: "09 sep", mes: 9, dia: 9, duermeMal: false, animoBajo: false, testPositivo: false, esDaniela: false },
  { id: 4, nombre: "Diego", cumple: "30 oct", mes: 10, dia: 30, duermeMal: false, animoBajo: true, testPositivo: true, esDaniela: false },
  { id: 5, nombre: "Elena", cumple: "17 sep", mes: 9, dia: 17, duermeMal: false, animoBajo: false, testPositivo: false, esDaniela: false },
  { id: 6, nombre: "Fabio", cumple: "08 oct", mes: 10, dia: 8, duermeMal: false, animoBajo: false, testPositivo: false, esDaniela: false },
  { id: 7, nombre: "Daniela", cumple: "31 ene", mes: 1, dia: 31, duermeMal: false, animoBajo: false, testPositivo: true, esDaniela: true },
  { id: 8, nombre: "Hugo", cumple: "04 nov", mes: 11, dia: 4, duermeMal: false, animoBajo: false, testPositivo: false, esDaniela: false },
  { id: 9, nombre: "Isabel", cumple: "16 jul", mes: 7, dia: 16, duermeMal: true, animoBajo: false, testPositivo: true, esDaniela: false },
  { id: 10, nombre: "Joaquín", cumple: "28 abr", mes: 4, dia: 28, duermeMal: false, animoBajo: false, testPositivo: false, esDaniela: false },
  { id: 11, nombre: "Karen", cumple: "23 nov", mes: 11, dia: 23, duermeMal: false, animoBajo: false, testPositivo: true, esDaniela: false },
  { id: 12, nombre: "Luis", cumple: "23 ago", mes: 8, dia: 23, duermeMal: false, animoBajo: false, testPositivo: true, esDaniela: false },
  { id: 13, nombre: "Mariana", cumple: "09 sep", mes: 9, dia: 9, duermeMal: false, animoBajo: false, testPositivo: false, esDaniela: false },
  { id: 14, nombre: "Néstor", cumple: "10 nov", mes: 11, dia: 10, duermeMal: false, animoBajo: false, testPositivo: false, esDaniela: false },
  { id: 15, nombre: "Olivia", cumple: "17 nov", mes: 11, dia: 17, duermeMal: false, animoBajo: false, testPositivo: true, esDaniela: false },
  { id: 16, nombre: "Pedro", cumple: "14 jul", mes: 7, dia: 14, duermeMal: true, animoBajo: false, testPositivo: false, esDaniela: false },
  { id: 17, nombre: "Quena", cumple: "01 may", mes: 5, dia: 1, duermeMal: true, animoBajo: false, testPositivo: false, esDaniela: false },
  { id: 18, nombre: "Rosa", cumple: "29 nov", mes: 11, dia: 29, duermeMal: false, animoBajo: false, testPositivo: false, esDaniela: false },
  { id: 19, nombre: "Sergio", cumple: "26 ago", mes: 8, dia: 26, duermeMal: false, animoBajo: false, testPositivo: false, esDaniela: false },
  { id: 20, nombre: "Tania", cumple: "12 ago", mes: 8, dia: 12, duermeMal: false, animoBajo: false, testPositivo: false, esDaniela: false },
  { id: 21, nombre: "Ulises", cumple: "23 may", mes: 5, dia: 23, duermeMal: false, animoBajo: false, testPositivo: false, esDaniela: false },
  { id: 22, nombre: "Valeria", cumple: "25 sep", mes: 9, dia: 25, duermeMal: false, animoBajo: false, testPositivo: true, esDaniela: false },
  { id: 23, nombre: "Wilson", cumple: "18 jul", mes: 7, dia: 18, duermeMal: false, animoBajo: false, testPositivo: false, esDaniela: false },
  { id: 24, nombre: "Ximena", cumple: "27 ene", mes: 1, dia: 27, duermeMal: true, animoBajo: false, testPositivo: false, esDaniela: false },
  { id: 25, nombre: "Yamil", cumple: "30 ago", mes: 8, dia: 30, duermeMal: false, animoBajo: false, testPositivo: true, esDaniela: false },
  { id: 26, nombre: "Zoe", cumple: "23 ago", mes: 8, dia: 23, duermeMal: false, animoBajo: false, testPositivo: true, esDaniela: false },
  { id: 27, nombre: "Andrés", cumple: "09 sep", mes: 9, dia: 9, duermeMal: false, animoBajo: false, testPositivo: false, esDaniela: false },
  { id: 28, nombre: "Belén", cumple: "31 mar", mes: 3, dia: 31, duermeMal: false, animoBajo: false, testPositivo: false, esDaniela: false },
  { id: 29, nombre: "Carlos", cumple: "16 dic", mes: 12, dia: 16, duermeMal: false, animoBajo: false, testPositivo: true, esDaniela: false },
  { id: 30, nombre: "Daniela R.", cumple: "09 nov", mes: 11, dia: 9, duermeMal: false, animoBajo: true, testPositivo: true, esDaniela: false },
  { id: 31, nombre: "Erika", cumple: "04 jun", mes: 6, dia: 4, duermeMal: true, animoBajo: false, testPositivo: false, esDaniela: false },
  { id: 32, nombre: "Franco", cumple: "05 jul", mes: 7, dia: 5, duermeMal: false, animoBajo: false, testPositivo: false, esDaniela: false },
  { id: 33, nombre: "Gloria", cumple: "03 ene", mes: 1, dia: 3, duermeMal: true, animoBajo: false, testPositivo: false, esDaniela: false },
  { id: 34, nombre: "Hernán", cumple: "18 oct", mes: 10, dia: 18, duermeMal: false, animoBajo: true, testPositivo: true, esDaniela: false },
  { id: 35, nombre: "Inés", cumple: "20 feb", mes: 2, dia: 20, duermeMal: false, animoBajo: false, testPositivo: true, esDaniela: false },
  { id: 36, nombre: "Julio", cumple: "04 abr", mes: 4, dia: 4, duermeMal: false, animoBajo: false, testPositivo: false, esDaniela: false },
  { id: 37, nombre: "Karla", cumple: "09 sep", mes: 9, dia: 9, duermeMal: false, animoBajo: false, testPositivo: false, esDaniela: false },
  { id: 38, nombre: "Leo", cumple: "12 nov", mes: 11, dia: 12, duermeMal: true, animoBajo: false, testPositivo: false, esDaniela: false },
  { id: 39, nombre: "Mónica", cumple: "22 jun", mes: 6, dia: 22, duermeMal: false, animoBajo: false, testPositivo: false, esDaniela: false },
  { id: 40, nombre: "Nahuel", cumple: "23 ago", mes: 8, dia: 23, duermeMal: false, animoBajo: false, testPositivo: false, esDaniela: false },
  { id: 41, nombre: "Oscar", cumple: "18 mar", mes: 3, dia: 18, duermeMal: true, animoBajo: true, testPositivo: true, esDaniela: false },
  { id: 42, nombre: "Paola", cumple: "05 oct", mes: 10, dia: 5, duermeMal: false, animoBajo: false, testPositivo: false, esDaniela: false },
  { id: 43, nombre: "Quintín", cumple: "17 dic", mes: 12, dia: 17, duermeMal: true, animoBajo: false, testPositivo: false, esDaniela: false },
  { id: 44, nombre: "Raúl", cumple: "22 jul", mes: 7, dia: 22, duermeMal: true, animoBajo: false, testPositivo: false, esDaniela: false },
  { id: 45, nombre: "Sofía", cumple: "26 mar", mes: 3, dia: 26, duermeMal: false, animoBajo: false, testPositivo: false, esDaniela: false },
  { id: 46, nombre: "Tomás", cumple: "10 oct", mes: 10, dia: 10, duermeMal: false, animoBajo: false, testPositivo: false, esDaniela: false },
  { id: 47, nombre: "Úrsula", cumple: "26 jul", mes: 7, dia: 26, duermeMal: true, animoBajo: false, testPositivo: false, esDaniela: false },
  { id: 48, nombre: "Víctor", cumple: "13 abr", mes: 4, dia: 13, duermeMal: true, animoBajo: false, testPositivo: false, esDaniela: false },
  { id: 49, nombre: "Wendy", cumple: "13 feb", mes: 2, dia: 13, duermeMal: false, animoBajo: true, testPositivo: true, esDaniela: false },
  { id: 50, nombre: "Xavier", cumple: "27 ene", mes: 1, dia: 27, duermeMal: true, animoBajo: true, testPositivo: true, esDaniela: false },
  { id: 51, nombre: "Yolanda", cumple: "30 jun", mes: 6, dia: 30, duermeMal: false, animoBajo: false, testPositivo: false, esDaniela: false },
  { id: 52, nombre: "Zacarías", cumple: "01 ene", mes: 1, dia: 1, duermeMal: false, animoBajo: false, testPositivo: true, esDaniela: false },
  { id: 53, nombre: "Abril", cumple: "22 jun", mes: 6, dia: 22, duermeMal: false, animoBajo: false, testPositivo: false, esDaniela: false },
  { id: 54, nombre: "Benjamín", cumple: "30 jun", mes: 6, dia: 30, duermeMal: true, animoBajo: true, testPositivo: true, esDaniela: false },
  { id: 55, nombre: "Carmen", cumple: "19 ago", mes: 8, dia: 19, duermeMal: false, animoBajo: false, testPositivo: true, esDaniela: false },
  { id: 56, nombre: "David", cumple: "05 mar", mes: 3, dia: 5, duermeMal: false, animoBajo: false, testPositivo: false, esDaniela: false },
  { id: 57, nombre: "Estela", cumple: "14 abr", mes: 4, dia: 14, duermeMal: false, animoBajo: false, testPositivo: true, esDaniela: false },
  { id: 58, nombre: "Felipe", cumple: "20 ago", mes: 8, dia: 20, duermeMal: true, animoBajo: false, testPositivo: false, esDaniela: false },
  { id: 59, nombre: "Gabriel", cumple: "03 dic", mes: 12, dia: 3, duermeMal: false, animoBajo: false, testPositivo: false, esDaniela: false },
  { id: 60, nombre: "Helena", cumple: "07 ene", mes: 1, dia: 7, duermeMal: false, animoBajo: false, testPositivo: false, esDaniela: false },
];

/** Parámetros nominales del test rápido (los que dice el fabricante). */
export const PARAMS_TEST = { sensibilidad: 0.9, especificidad: 0.8 };

/**
 * Verdades pedagógicas que la herramienta DEBE reproducir exactamente.
 * Se usan en los asserts de `calculos.ts`.
 */
export const VERDADES = {
  total: 60,
  animoBajoReal: 8,
  duermenMal: 16,
  pAnimoGeneral: 8 / 60,
  pAnimoDadoDuermeMal: 4 / 16,
  VP: 8,
  FP: 13,
  FN: 0,
  VN: 39,
  totalPositivos: 21,
  pAnimoDadoPositivo: 8 / 21, // ≈ 0.381 → el golpe de Bayes
};
