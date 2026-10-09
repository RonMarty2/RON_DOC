/**
 * Lo que dice cada papel de cada carpeta del Tema 1, ya con las cifras de la versión del alumno.
 * Fuente: 05-mundo-y-narrativa.md NT1.5 (paso 1) y NT1.6 (casos 2 a 8).
 *
 * Los TEXTOS no se escriben aquí: están en `papeles-t1.json`, que `scripts-t1/exportar_papeles_t1.py` copia de `05`. Este
 * archivo elige cuál de los textos de un papel toca (según el tipo del caso y si ese papel es el clave de la versión) y
 * llena los huecos.
 *
 * ── Decisiones por ambigüedad ──────────────────────────────────────────────────────────────────────────────
 *  1. Un papel que puede ser clave y ese día no lo es dice su texto «banal» (regla de NT1.4): C2-1 a C2-3, y C3-x, C6-x y
 *     C7-x cuando no son el clave de la versión. El refuerzo C2-4 dice su texto del tipo (en B es banal por diseño).
 *  2. `{col2}` es el NOMBRE de la segunda columna; `{col2Ant}` es su valor del archivo con una etiqueta corta («45 minutos
 *     de celular», «ánimo 60»), para que la fila de ejemplo se entienda también en el papel que no nombra las columnas.
 *  3. `{rA}` y `{rB}` (caso 4) se escriben como porcentaje («38 %»): son el porcentaje de «mucho estrés» de cada estudio.
 *  4. Números: enteros tal cual; con decimales, un decimal y coma.
 *  5. `{fechaAnio}` necesita la fecha de hoy: se pasa en `hoy` para que la función siga siendo pura.
 *  6. Un hueco sin valor LANZA: nunca se le muestra al alumno un «{algo}».
 */

import papelesJson from "./papeles-t1.json";
import type { Carpeta, OpcionCaso5, RolDePapel } from "./carpeta";
import { fechaAnio, type PaqueteT1 } from "./cifras";
import type { NumeroDeCaso } from "./reglas-t1";

interface PapelDelGuion {
  nombre: string;
  textos: Record<string, string>;
  piezas?: Record<string, string[]>;
}
export const PAPELES_T1 = (papelesJson as unknown as { papeles: Record<string, PapelDelGuion> }).papeles;

export interface PapelVisible {
  id: string;
  nombre: string;
  rol: RolDePapel;
  texto: string;
}

export interface ContextoDePapel {
  /** Caso 5: la opción aconsejada en el turno 1 (decide la carpeta y las cifras). */
  opcion?: OpcionCaso5;
  /** La fecha de hoy, para `{fechaAnio}` (paso 1). */
  hoy?: Date;
}

/** Un número como lo lee el alumno: entero tal cual; si no, un decimal con coma. */
export const numero = (x: number): string => (Number.isInteger(x) ? String(x) : `${x < 0 ? "−" : ""}${Math.abs(x).toFixed(1).replace(".", ",")}`);

const COL2 = { minutos: "minutos de celular antes de dormir", animo: "ánimo del día, de 0 a 100" } as const;

function carpetaDelCaso(p: PaqueteT1, caso: NumeroDeCaso, ctx: ContextoDePapel): Carpeta {
  if (caso !== 5) return p.carpetas.porCaso[caso];
  if (!ctx.opcion) throw new Error("El caso 5 necesita la opción aconsejada");
  return p.carpetas.caso5[ctx.opcion];
}

function huecos(p: PaqueteT1, caso: NumeroDeCaso, id: string, ctx: ContextoDePapel): Record<string, () => string | null> {
  const c = p.cifras;
  const sueno = () => c.paso1.papeles[id] ?? null;
  const o5 = () => (ctx.opcion ? c.caso5.opciones[ctx.opcion] : null);
  const media = (m: { antes: number; despues: number } | null | undefined, k: "antes" | "despues") => (m ? numero(m[k]) : null);
  return {
    colegio: () => c.colegios[caso],
    horasAnt: () => (sueno() ? numero(sueno()!.horasAnt) : null),
    col2: () => (sueno() ? COL2[sueno()!.col2] : null),
    col2Ant: () => (sueno() ? (sueno()!.col2 === "minutos" ? `${sueno()!.col2Ant} minutos de celular` : `ánimo ${sueno()!.col2Ant}`) : null),
    fechaAnio: () => (ctx.hoy ? fechaAnio(ctx.hoy) : null),
    mes: () => c.caso2.mes,
    mesAnt: () => c.caso2.mesAnt,
    d0: () => String(c.caso2.d0),
    d1: () => String(c.caso2.d1),
    b0: () => String(c.caso2.b0),
    b1: () => String(c.caso2.b1),
    fuente: () => (caso === 3 || caso === 6 || caso === 7 ? p.version.textos.fuentes[caso] : null),
    curso: () => c.caso6.curso,
    base: () => numero(c.caso7.base),
    tallerA: () => c.caso7.tallerA,
    tallerB: () => c.caso7.tallerB,
    rA: () => `${numero(c.caso4.rA)} %`,
    rB: () => `${numero(c.caso4.rB)} %`,
    llamados: () => media(o5()?.medias, "antes"),
    llamados2: () => media(o5()?.medias, "despues"),
    demas: () => media(o5()?.demas, "antes"),
    demas2: () => media(o5()?.demas, "despues"),
    grupo: () => media(o5()?.grupo, "antes"),
    grupo2: () => media(o5()?.grupo, "despues"),
    vecino: () => p.version.textos.vecino,
    v1: () => media(o5()?.vecino, "antes"),
    v2: () => media(o5()?.vecino, "despues"),
    m1: () => numero(c.caso8.m1),
    m2: () => numero(c.caso8.m2),
    g1: () => numero(c.caso8.g1),
    g2: () => numero(c.caso8.g2),
  };
}

function llenar(texto: string, valores: Record<string, () => string | null>, donde: string): string {
  const lleno = texto.replace(/\{(\w+)\}/g, (_, nombre: string) => {
    const v = valores[nombre]?.();
    if (v === null || v === undefined || v === "") throw new Error(`${donde}: el hueco {${nombre}} no tiene valor`);
    return v;
  });
  if (/[{}]/.test(lleno)) throw new Error(`${donde}: quedó una llave sin llenar`);
  return lleno;
}

/** La clave del texto (o de las piezas) que le toca a un papel en esta versión. */
function claveDeTexto(p: PaqueteT1, caso: NumeroDeCaso, id: string, esClave: boolean): string {
  const n = Number(id.split("-")[1]);
  switch (caso) {
    case 2:
      if (n <= 3) return esClave ? p.version.tipos[2] : "banal";
      return n === 4 ? p.version.tipos[2] : "*";
    case 3:
    case 6:
    case 7:
      return esClave ? p.version.tipos[caso] : "banal";
    case 4:
      return n <= 4 ? (p.version.buenoEsA ? "A" : "B") : "*";
    case 8:
      return n === 2 ? String(p.version.decisionReal) : "*";
    default:
      return "*";
  }
}

/** Lo que dice un papel de la carpeta del caso. Lanza si el papel no está en esa carpeta. */
export function papelDe(p: PaqueteT1, caso: NumeroDeCaso, id: string, ctx: ContextoDePapel = {}): PapelVisible {
  const carpeta = carpetaDelCaso(p, caso, ctx);
  const enCarpeta = carpeta.papeles.find((q) => q.id === id);
  if (!enCarpeta) throw new Error(`El papel ${id} no está en la carpeta del caso ${caso}`);
  const guion = PAPELES_T1[id];
  if (!guion) throw new Error(`Papel sin texto: ${id}`);
  const clave = claveDeTexto(p, caso, id, carpeta.claves.includes(id));
  let texto = guion.textos[clave];
  if (texto === undefined) throw new Error(`${id}: no hay texto «${clave}»`);
  if (id === "C5-7" && ctx.opcion === "b") texto = `${texto} ${guion.textos.extra_b}`;
  return { id, nombre: guion.nombre, rol: enCarpeta.rol, texto: llenar(texto, huecos(p, caso, id, ctx), id) };
}

/** Los 6 papeles de la carpeta del caso, en el orden del abanico. */
export function papelesDe(p: PaqueteT1, caso: NumeroDeCaso, ctx: ContextoDePapel = {}): PapelVisible[] {
  return carpetaDelCaso(p, caso, ctx).papeles.map((q) => papelDe(p, caso, q.id, ctx));
}

/** Caso 2: las piezas de frase que un papel ABIERTO agrega al armador (la del clave solo existe si es el clave de la versión). */
export function piezasDePapel(p: PaqueteT1, id: string): string[] {
  const carpeta = p.carpetas.porCaso[2];
  if (!carpeta.papeles.some((q) => q.id === id)) throw new Error(`El papel ${id} no está en la carpeta del caso 2`);
  const piezas = PAPELES_T1[id].piezas;
  if (!piezas) return [];
  const n = Number(id.split("-")[1]);
  if (n <= 3 && !carpeta.claves.includes(id)) return [];
  const lista = piezas[n <= 4 ? p.version.tipos[2] : "*"] ?? [];
  return lista.map((t) => llenar(t.replace(/\*/g, ""), huecos(p, 2, id, {}), `${id} pieza`));
}

/** Las tres piezas genéricas de la frase del caso 2, siempre disponibles (NT1.6). */
export const PIEZAS_GENERICAS_CASO2 = ["según fuentes del colegio", "datos preliminares", "el director informa"] as const;
