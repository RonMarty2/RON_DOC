/**
 * La RAMA de la revelación y la CLASE de registro de cada caso del Tema 1 (bloque 3 del motor).
 * Fuente: 02-bucle-y-mecanicas.md secc. 6 (V3) y 12; 04-aprendizaje.md T1.5a y T1.7a; 05-mundo-y-narrativa.md NT1.9.
 * Es el puerto de `RAMAS`, `clase()` y `cierre_de()` de scripts-t1/ramas_t1.py: `ramas-t1.test.ts` exige paridad estado por
 * estado contra `fixtures/ramas-t1.json` (lo escribe `scripts-t1/exportar_ramas_t1.py`).
 *
 * Aquí el estado de un caso es ABSTRACTO (tipo, si el clave estaba abierto, qué decidió…): no sabe de papeles ni de cifras.
 * Quien lo arma desde lo que hizo el alumno es `registro-t1.ts`. Son 72 ramas; cada estado cae en exactamente una.
 */

import type { OpcionCaso5 } from "./carpeta";
import type { DecisionCaso8, TipoDeCaso } from "./reglas-t1";
import type { NivelDeRango } from "./tandas";

// ── Estados ──────────────────────────────────────────────────────────────────

export interface Estado1 {
  ficha: 1;
  /** Abrió con sus fichas un papel con horas de sueño (sin ficha regalada ni ayuda). */
  abrePropio: boolean;
}
export interface Estado2 {
  ficha: 2;
  tipo: "P" | "B";
  clave: boolean;
  dec: "tal" | "frenar" | "frase_con" | "frase_sin";
}
export interface Estado3 {
  ficha: 3;
  tipo: TipoDeCaso;
  clave: boolean;
  dec: "tal" | "frenar" | "rango";
  /** Solo con dec = "rango". */
  nivel: NivelDeRango | null;
  pieza: boolean;
  /** El rango no cubrió y era el mínimo-máximo de las 3 tandas vistas («razonó bien y no cubrió»). */
  mm3: boolean;
}
export interface Estado4 {
  ficha: 4;
  bueno: "A" | "B";
  elige: "A" | "B" | "ninguna";
  clave: boolean;
}
export interface Estado5 {
  ficha: 5;
  op: OpcionCaso5;
  /** La regla de pago del turno 2: R5.3 (frenó) a R5.9. */
  regla: string;
  /** Tenía abiertos todos los papeles que su opción necesita. */
  req: boolean;
  /** Escribió 0. */
  cero: boolean;
  /** Escribió 0 y ρ de la versión es mayor que 1 (la cuenta bien hecha no daba 0). Sin el 0 es siempre false. */
  rhoPos: boolean;
}
export interface Estado6 {
  ficha: 6;
  tipo: TipoDeCaso;
  clave: boolean;
  dec: "tal" | "frenar" | "redactar";
  /** Solo con dec = "redactar". */
  ext: "ninguna" | "podrian" | "grupo" | null;
  ncorr: boolean;
}
export interface Estado7 {
  ficha: 7;
  tipo: "P" | "B";
  dec: "tal" | "redis" | "frenar";
  xok: boolean;
}
export interface Estado8 {
  ficha: 8;
  real: DecisionCaso8;
  dec: DecisionCaso8;
  /** Cuántos papeles clave puso sobre la mesa: 0, 1 o 2. */
  e: 0 | 1 | 2;
  beto: DecisionCaso8;
}
export type EstadoT1 = Estado1 | Estado2 | Estado3 | Estado4 | Estado5 | Estado6 | Estado7 | Estado8;

// ── Ramas ────────────────────────────────────────────────────────────────────

const letras = (ficha: number, hasta: string): string[] =>
  Array.from({ length: hasta.charCodeAt(0) - 96 }, (_, i) => `F${ficha}${String.fromCharCode(97 + i)}`);

/** Las 72 ramas, en el orden de 05 NT1.9. */
export const RAMAS: readonly string[] = [
  ...letras(1, "b"),
  ...letras(2, "j"),
  ...letras(3, "p"),
  ...letras(4, "g"),
  ...letras(5, "j"),
  ...letras(6, "k"),
  ...letras(7, "i"),
  ...letras(8, "g"),
];
export const CANTIDAD_DE_RAMAS = 72;

function rama2(s: Estado2): string {
  if (s.tipo === "P") {
    if (s.dec === "frase_con") return "F2a";
    if (s.dec === "tal") return "F2b";
    if (s.dec === "frenar") return s.clave ? "F2d" : "F2c";
    return "F2e";
  }
  if (s.dec === "tal") return s.clave ? "F2f" : "F2g";
  if (s.dec === "frenar") return "F2h";
  return s.dec === "frase_con" ? "F2i" : "F2j";
}

function rama3(s: Estado3): string {
  if (s.dec === "tal") return s.tipo === "P" ? "F3c" : s.tipo === "A" ? "F3m" : s.clave ? "F3h" : "F3i";
  if (s.dec === "frenar") return s.tipo === "P" ? "F3g" : s.tipo === "A" ? "F3p" : "F3j";
  if (s.nivel === null) throw new Error("Un rango necesita su nivel");
  if (s.nivel === "ancho") return "F3d";
  if (s.nivel === "noCubre") return s.mm3 ? "F3e" : s.tipo === "B" ? "F3l" : "F3f";
  if (s.tipo === "B") return "F3k";
  if (s.tipo === "A") return s.pieza ? "F3n" : "F3o";
  return s.nivel === "ok" && s.pieza ? "F3a" : "F3b";
}

function rama4(s: Estado4): string {
  if (s.elige === "ninguna") return "F4g";
  if (s.elige === s.bueno) return s.clave ? "F4a" : "F4b";
  if (s.elige === "A") return s.clave ? "F4d" : "F4c";
  return s.clave ? "F4e" : "F4f";
}

function rama5(s: Estado5): string {
  switch (s.regla) {
    case "R5.3":
      return "F5j";
    case "R5.4":
      return "F5d";
    case "R5.5":
      return "F5e";
    case "R5.6":
      return "F5a";
    case "R5.7":
      if (s.op === "c") throw new Error("R5.7 no existe en la opción (c)");
      return s.op === "a" ? "F5b" : "F5c";
    case "R5.8":
      return "F5f";
    case "R5.9":
      if (!s.req) return "F5g";
      return s.cero && s.rhoPos ? "F5h" : "F5i";
    default:
      throw new Error(`Regla desconocida del caso 5: ${s.regla}`);
  }
}

function rama6(s: Estado6): string {
  const b = s.tipo === "B";
  if (s.dec === "tal") return b ? (s.clave ? "F6k" : "F6c") : "F6f";
  if (s.dec === "frenar") return b ? "F6d" : "F6i";
  if (s.ext === null) throw new Error("Redactar necesita su extensión");
  if (!s.ncorr) return "F6j";
  if (b) return s.ext === "grupo" ? "F6b" : "F6e";
  return s.ext === "grupo" ? "F6a" : s.ext === "podrian" ? "F6g" : "F6h";
}

function rama7(s: Estado7): string {
  if (s.tipo === "P") {
    if (s.dec === "redis") return s.xok ? "F7a" : "F7b";
    if (s.dec === "tal") return s.xok ? "F7c" : "F7d";
    return "F7e";
  }
  if (s.dec === "tal") return s.xok ? "F7f" : "F7g";
  return s.dec === "redis" ? "F7h" : "F7i";
}

function rama8(s: Estado8): string {
  if (s.dec === s.real) return s.e === 2 ? (s.beto !== s.real ? "F8a" : "F8b") : s.e === 1 ? "F8c" : "F8d";
  if (s.dec === 2) return "F8g";
  return s.e === 2 ? "F8e" : "F8f";
}

/** La rama de la revelación que le toca a un estado (una y solo una). */
export function ramaDe(s: EstadoT1): string {
  switch (s.ficha) {
    case 1:
      return s.abrePropio ? "F1a" : "F1b";
    case 2:
      return rama2(s);
    case 3:
      return rama3(s);
    case 4:
      return rama4(s);
    case 5:
      return rama5(s);
    case 6:
      return rama6(s);
    case 7:
      return rama7(s);
    case 8:
      return rama8(s);
  }
}

// ── Cierres ──────────────────────────────────────────────────────────────────

export type IdDeCierre = "C1" | "C2" | "C2b" | "C3" | "C3b" | "C4" | "C5" | "C6" | "C7p" | "C7b" | "C8";

/** El cierre (tercera línea de la carta) de una rama: en los tipos B no se nombra el concepto como un error. */
export function cierreDe(rama: string): IdDeCierre {
  const ficha = Number(rama[1]);
  const letra = rama[2];
  if (!RAMAS.includes(rama)) throw new Error(`Rama desconocida: ${rama}`);
  if (ficha === 2) return "abcde".includes(letra) ? "C2" : "C2b";
  if (ficha === 3) return "hijkl".includes(letra) ? "C3b" : "C3";
  if (ficha === 7) return "abcde".includes(letra) ? "C7p" : "C7b";
  return `C${ficha}` as IdDeCierre;
}

// ── Clase de registro (04 T1.5a) ─────────────────────────────────────────────

export const CLASES = ["descubrió solo", "descubrió con pista", "se dejó engañar", "acierto sin evidencia", "sobrecorrigió"] as const;
export type ClaseDeRegistro = (typeof CLASES)[number];

const SOLO: ClaseDeRegistro = "descubrió solo";
const PISTA: ClaseDeRegistro = "descubrió con pista";
const ENGANO: ClaseDeRegistro = "se dejó engañar";
const SIN_EV: ClaseDeRegistro = "acierto sin evidencia";
const SOBRE: ClaseDeRegistro = "sobrecorrigió";

/**
 * Firmar o creer de más = se dejó engañar; frenar, dudar o redactar de menos = sobrecorrigió; decidir bien sin el papel =
 * acierto sin evidencia; decidir bien con el papel = descubrió solo.
 */
export function claseDe(s: EstadoT1): ClaseDeRegistro {
  switch (s.ficha) {
    case 1:
      return s.abrePropio ? SOLO : PISTA;
    case 2:
      if (s.dec === "frase_con") return SOLO;
      if (s.dec === "tal") return s.tipo === "P" ? ENGANO : s.clave ? SOLO : SIN_EV;
      return SOBRE;
    case 3: {
      if (s.dec === "tal") return s.tipo === "B" ? (s.clave ? SOLO : SIN_EV) : ENGANO;
      if (s.dec === "frenar") return SOBRE;
      if (s.nivel === "noCubre") return ENGANO;
      if (s.nivel === "ancho" || s.tipo === "B") return SOBRE;
      if (s.tipo === "A") return !s.pieza ? ENGANO : s.nivel === "ok" ? SOLO : SOBRE;
      if (s.nivel === "ok") return s.pieza ? SOLO : s.clave ? SOBRE : SIN_EV; // E3f (02 8.1)
      return SOBRE; // flojo
    }
    case 4:
      if (s.elige === "ninguna") return SOBRE;
      if (s.elige === s.bueno) return s.clave ? SOLO : SIN_EV;
      return s.elige === "B" && s.clave ? SOBRE : ENGANO;
    case 5:
      if (s.regla === "R5.3") return SOBRE;
      if (s.regla === "R5.4" || s.regla === "R5.5") return ENGANO;
      if (s.regla === "R5.6" || s.regla === "R5.7") return SOLO;
      if (s.regla === "R5.8") return SIN_EV;
      return s.req && s.cero ? SOBRE : ENGANO;
    case 6:
      if (s.dec === "redactar" && !s.ncorr) return ENGANO;
      if (s.dec === "tal") return s.tipo === "B" ? (s.clave ? SOLO : SIN_EV) : ENGANO;
      if (s.dec === "frenar") return SOBRE;
      return s.ext === "grupo" ? SOLO : SOBRE;
    case 7:
      if (s.dec === "frenar") return SOBRE;
      if (s.tipo === "P") return s.dec === "redis" && s.xok ? SOLO : ENGANO;
      return s.dec === "tal" ? (s.xok ? SOLO : ENGANO) : SOBRE;
    case 8:
      if (s.dec === s.real) return s.e === 2 ? SOLO : SIN_EV;
      return s.dec === 2 ? SOBRE : ENGANO;
  }
}

/** Decidió bien (con o sin el papel, con o sin pista). */
export const esAcierto = (c: ClaseDeRegistro): boolean => c === SOLO || c === PISTA || c === SIN_EV;
