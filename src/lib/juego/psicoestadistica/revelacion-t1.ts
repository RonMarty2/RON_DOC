/**
 * La revelación del Tema 1: las 8 cartas con sus tres líneas (Hiciste, Habría pasado, Cierre), ya con los huecos llenos, y
 * el camino del final (bloque 3 del motor). Fuente: 02-bucle-y-mecanicas.md secc. 6 (V1 a V6); 05-mundo-y-narrativa.md NT1.9.
 *
 * Los TEXTOS no se escriben aquí: están en `guion-t1.json`, que `scripts-t1/exportar_guion_t1.py` copia de `05`. Este archivo
 * solo elige la variante (por tipo del caso u opción) y llena los huecos con las cifras de la versión del alumno.
 *
 * ── Decisiones por ambigüedad ──────────────────────────────────────────────────────────────────────────────
 *  1. `{papelSueno}`: el nombre del primer papel con sueño que abrió con sus fichas, con artículo («el cuaderno de la enfermería»).
 *  2. `{rho}`: un decimal con coma; si es negativo, con el signo menos «−» (nunca guion largo). Solo aparece en F5h (ρ > 1).
 *  3. `{llamaste}`: (a) los 13 de peor puntaje, (b) los 13 primeros en anotarse, (c) los 13 del sorteo.
 *  4. `{hechosA}`: lo que dijeron los papeles abiertos, unido con « y ».
 *  5. F6j «Habría pasado» con una extensión que no es `grupo`: la línea de F6e (tipo B), F6g (`podrían`) o F6h (`ninguna`).
 *  6. F8e y F8f «Habría pasado»: el pie de «tu año» según lo que decidió y lo que era cierto.
 *  7. Un hueco sin valor o una variante que falta LANZA: nunca se le muestra al alumno un «{algo}» ni una línea vacía.
 */

import guionJson from "./guion-t1.json";
import { hechosA, type PaqueteT1 } from "./cifras";
import type { OpcionCaso5 } from "./carpeta";
import type { IdDeCierre } from "./ramas-t1";
import { resumenT1, type FilaDeIdea, type JugadaT1 } from "./registro-t1";
import type { NumeroDeCaso } from "./reglas-t1";

type Linea = string | Record<string, string> | null;
interface Guion {
  ramas: Record<string, { hiciste: Linea; habria: Linea }>;
  cierres: Record<string, string>;
  /** pies[decisión][lo que era cierto]: 0 financiar, 1 no financiar, 2 esperar / aún no. */
  pies: Record<string, string[]>;
  camino: string[];
  beto: string;
  sobres: Record<string, string>;
  expedientes: Record<string, { habito: string; titulo: string; texto: string }>;
}
export const GUION_T1 = guionJson as unknown as Guion;

/** Los tres globos del camino (cierre general) y el último globo de Beto. */
export const CAMINO: readonly string[] = GUION_T1.camino;
export const BETO_FINAL: string = GUION_T1.beto;

export const PAPEL_SUENO: Readonly<Record<string, string>> = {
  "C1-1": "el cuaderno de la enfermería",
  "C1-2": "la encuesta anual de la secretaría",
  "C1-3": "el informe del orientador",
};

export const LLAMASTE: Readonly<Record<OpcionCaso5, string>> = {
  a: "los 13 de peor puntaje",
  b: "los 13 primeros en anotarse",
  c: "los 13 del sorteo",
};

/** Un número con un decimal y coma; negativo con «−». */
export const unDecimal = (x: number): string => `${x < 0 ? "−" : ""}${Math.abs(x).toFixed(1).replace(".", ",")}`;

export interface Carta {
  idea: NumeroDeCaso;
  rama: string;
  hiciste: string;
  habria: string;
  cierre: string;
  idCierre: IdDeCierre;
}

/** Los valores de los huecos, calculados solo si el texto los pide. */
function huecos(p: PaqueteT1, jugada: JugadaT1): Record<string, () => string | null> {
  return {
    papelSueno: () => {
      const id = (jugada[1]?.abiertos ?? []).find((x) => p.carpetas.porCaso[1].claves.includes(x));
      return id ? (PAPEL_SUENO[id] ?? null) : null;
    },
    hechoClave: () => p.cifras.caso2.hechoClave,
    fuente: () => p.version.textos.fuentes[3],
    vecino: () => p.version.textos.vecino,
    llamaste: () => (jugada[5] ? LLAMASTE[jugada[5].opcion] : null),
    rho: () => (jugada[5] ? unDecimal(p.cifras.caso5.opciones[jugada[5].opcion].rho) : null),
    curso: () => p.cifras.caso6.curso,
    N: () => String(p.cifras.caso6.N),
    den: () => String(p.cifras.caso6.den),
    hechosA: () => hechosA(p.carpetas, jugada[6]?.abiertos ?? []).join(" y ") || null,
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

/** La variante de una línea: por el tipo del caso (3 y 6) o por la opción (5). */
function variante(linea: Linea, fila: FilaDeIdea, donde: string): string {
  if (typeof linea === "string") return linea;
  if (linea === null) throw new Error(`${donde}: sin texto`);
  const e = fila.estado;
  const clave = e.ficha === 5 ? e.op : e.ficha === 3 || e.ficha === 6 ? e.tipo : null;
  const texto = clave === null ? undefined : linea[clave];
  if (texto === undefined) throw new Error(`${donde}: no hay variante «${clave}»`);
  return texto;
}

function habriaPasado(fila: FilaDeIdea): string {
  const e = fila.estado;
  const donde = `${fila.rama} habría`;
  if (e.ficha === 8 && (fila.rama === "F8e" || fila.rama === "F8f")) {
    const pie = GUION_T1.pies[String(e.dec)]?.[e.real];
    if (!pie) throw new Error(`${donde}: sin pie para ${e.dec}/${e.real}`);
    return pie;
  }
  if (e.ficha === 6 && fila.rama === "F6j") {
    if (e.ext === "grupo") return (GUION_T1.ramas.F6j.habria as Record<string, string>).grupo;
    const otra = e.tipo === "B" ? "F6e" : e.ext === "podrian" ? "F6g" : "F6h";
    return variante(GUION_T1.ramas[otra].habria, fila, donde);
  }
  return variante(GUION_T1.ramas[fila.rama].habria, fila, donde);
}

/** La carta de una idea ya jugada. */
export function cartaDe(p: PaqueteT1, fila: FilaDeIdea, jugada: JugadaT1): Carta {
  const textos = GUION_T1.ramas[fila.rama];
  if (!textos) throw new Error(`Rama sin texto: ${fila.rama}`);
  const valores = huecos(p, jugada);
  return {
    idea: fila.idea,
    rama: fila.rama,
    hiciste: llenar(variante(textos.hiciste, fila, `${fila.rama} hiciste`), valores, `${fila.rama} hiciste`),
    habria: llenar(habriaPasado(fila), valores, `${fila.rama} habría`),
    cierre: GUION_T1.cierres[fila.cierre],
    idCierre: fila.cierre,
  };
}

/** V1: las cartas de la partida, una por idea, en el orden en que el alumno jugó. */
export function cartasDe(p: PaqueteT1, jugada: JugadaT1): Carta[] {
  return resumenT1(p, jugada).ideas.map((fila) => cartaDe(p, fila, jugada));
}

/** V5: el camino aparece cuando las 8 cartas están boca arriba. `vistas` son las ideas de los eventos `carta`. */
export const caminoVisible = (vistas: readonly number[]): boolean => new Set(vistas.filter((i) => i >= 1 && i <= 8)).size === 8;
