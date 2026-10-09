/**
 * Qué pasa con cada decisión del alumno en el Tema 1: el efecto en los tubos, el código de error E.., su sobre y sus hábitos.
 * Fuente: 02-bucle-y-mecanicas.md secc. 5 y 8.1; 04-aprendizaje.md T1.5; puerto de `codigos()` y `pago*()` de
 * scripts-t1/ramas_t1.py (que recorre todos los estados). Las tablas de efecto y los códigos son los del bloque 1 (efectos-t1.ts).
 *
 * El motor NO le dice al alumno si acertó: devuelve datos (efecto, filas, códigos) y la pantalla decide qué muestra. Todas las
 * funciones son puras; una decisión inválida (papel que no está en la carpeta, pieza sin haber abierto su papel, rango con
 * menos de 2 tandas…) es un error de programación de la pantalla y lanza.
 *
 * ── Decisiones por ambigüedad ──────────────────────────────────────────────────────────────────────────────
 *  1. «Clave abierto» se lee de los ids de los papeles abiertos contra la carpeta de la versión (no se pide al llamador).
 *  2. Las piezas de las frases (casos 2, 3 y 6) las decide el armador (que todavía no existe): aquí entran como booleanos
 *     (`piezaClave`, `piezaRefuerzo`, extensión `grupo`) y se exige que su papel esté abierto.
 *  3. Varios códigos en un caso: todos quedan en `codigos`; el SOBRE es el primero de PRIORIDAD_SOBRE que haya ocurrido (el que más
 *     baja Credibilidad: E6a −10 sobre E6c; E7a antes que E7b; E8c, E8b, E8a). E5e y E8d no tienen sobre.
 *  4. Hábito: una clase de error repetida en dos casos distintos; en el caso 5 también cuentan sus dos turnos (E5e + E5a/E5b).
 *     E3f cuenta para H1 solo si el clave estaba cerrado (02 8.1).
 *  5. El número del caso 5 se compara en décimas de punto contra las medias que se muestran; |x − ρ| ≤ 1,0 es la banda de todo.
 *  6. Caso 7: `x` es correcto si |x − |A−B|| ≤ 0,1.
 */

import { CODIGOS, SIN_SOBRE, efectoDe, type Habito } from "./efectos-t1";
import { sumarEfectos } from "./medidores";
import { REQUERIDOS_CASO5, type Carpeta, type OpcionCaso5 } from "./carpeta";
import { nivelDeRango, type NivelDeRango } from "./tandas";
import type { PaqueteT1 } from "./cifras";
import type { Efecto, NumeroDeCaso, TipoDeCaso } from "./reglas-t1";

export type DatoDeDetalle = string | number | boolean | null;

export interface ResultadoCaso {
  caso: NumeroDeCaso;
  /** Las filas de pago que se aplicaron, p. ej. ["R6.4", "R6.6"]. */
  filas: string[];
  /** Lo que se suma a los tubos al cerrar el caso (sin topar: el tope lo pone `cerrarCaso`). */
  efecto: Efecto;
  /** Todos los códigos E.. que ocurrieron. */
  codigos: string[];
  /** El código cuyo sobre se muestra (null si no hubo error con sobre). */
  codigoSobre: string | null;
  /** Id del sobre de la jefa, p. ej. "S-E2a". */
  sobre: string | null;
  /** Los hábitos que alimenta este caso (sin repetir). */
  habitos: Habito[];
  /** Cuántas veces alimenta cada hábito: 1 por caso, salvo el caso 5 (dos turnos). */
  ocurrencias: Partial<Record<Habito, number>>;
  /** Acertó sin haber abierto lo que lo justificaba (G5): el registro lo marca, el efecto es el de la fila «sin». */
  sinEvidencia: boolean;
  detalle: Record<string, DatoDeDetalle>;
}

/** Orden en que se elige el sobre cuando un caso tiene varios códigos (decisión 3). */
export const PRIORIDAD_SOBRE: Readonly<Record<number, readonly string[]>> = {
  2: ["E2a", "E2b", "E2d", "E2c"],
  3: ["E3b", "E3a", "E3e", "E3d", "E3c", "E3f"],
  4: ["E4a", "E4b", "E4c"],
  5: ["E5a", "E5b", "E5d", "E5c"],
  6: ["E6a", "E6b", "E6c", "E6d"],
  7: ["E7a", "E7b", "E7c"],
  8: ["E8c", "E8b", "E8a"],
};

export const sobreDe = (codigo: string): string | null => (SIN_SOBRE.includes(codigo as (typeof SIN_SOBRE)[number]) ? null : `S-${codigo}`);

function armar(
  caso: NumeroDeCaso,
  filas: ReadonlyArray<readonly [string, string?]>,
  codigos: readonly string[],
  sinEvidencia: boolean,
  detalle: Record<string, DatoDeDetalle>,
  opciones: { claveCerrada?: boolean } = {},
): ResultadoCaso {
  for (const c of codigos) if (!CODIGOS[c]) throw new Error(`Código desconocido ${c}`);
  const efecto = sumarEfectos(filas.map(([fila, clave]) => efectoDe(fila, clave ?? "*")));
  const ocurrencias: Partial<Record<Habito, number>> = {};
  for (const c of codigos) {
    // 02 8.1: E3f cuenta para H1 solo cuando el clave estaba cerrado.
    const habitos = c === "E3f" && !opciones.claveCerrada ? [] : CODIGOS[c].habitos;
    for (const h of habitos) ocurrencias[h] = (ocurrencias[h] ?? 0) + 1;
  }
  if (caso !== 5) for (const h of Object.keys(ocurrencias) as Habito[]) ocurrencias[h] = 1;
  const prioridad = PRIORIDAD_SOBRE[caso] ?? [];
  const codigoSobre = prioridad.find((c) => codigos.includes(c)) ?? null;
  return {
    caso,
    filas: filas.map(([f]) => f),
    efecto,
    codigos: [...codigos],
    codigoSobre,
    sobre: codigoSobre ? sobreDe(codigoSobre) : null,
    habitos: Object.keys(ocurrencias) as Habito[],
    ocurrencias,
    sinEvidencia,
    detalle,
  };
}

function validarAbiertos(carpeta: Carpeta, abiertos: readonly string[]): void {
  const en = new Set(carpeta.papeles.map((p) => p.id));
  if (new Set(abiertos).size !== abiertos.length) throw new Error("Papel repetido en `abiertos`");
  for (const id of abiertos) if (!en.has(id)) throw new Error(`El papel ${id} no está en la carpeta del caso ${carpeta.caso}`);
}

const hayAlguno = (ids: readonly string[], abiertos: readonly string[]): boolean => ids.some((id) => abiertos.includes(id));
const tenths = (x: number): number => {
  if (!Number.isFinite(x)) throw new Error(`Número inválido: ${x}`);
  return Math.round(x * 10);
};

// ── Paso 1 ───────────────────────────────────────────────────────────────────

export interface EntradaPaso1 {
  abiertos: readonly string[];
}

/** Paso 1: sin tubos. Solo dice si abrió alguno de los 2 papeles con sueño (si no, sobre S-P1). */
export function resolverPaso1(p: PaqueteT1, e: EntradaPaso1): { abrioSueno: boolean; sobre: "S-P1" | null } {
  const carpeta = p.carpetas.porCaso[1];
  validarAbiertos(carpeta, e.abiertos);
  const abrioSueno = hayAlguno(carpeta.claves, e.abiertos);
  return { abrioSueno, sobre: abrioSueno ? null : "S-P1" };
}

// ── Caso 2 ───────────────────────────────────────────────────────────────────

export interface EntradaCaso2 {
  abiertos: readonly string[];
  decision: "tal" | "frenar" | "frase";
  /** La frase lleva la pieza del papel clave (solo existe con ese papel abierto). */
  piezaClave?: boolean;
  /** La frase lleva la pieza del refuerzo (solo existe con ese papel abierto). */
  piezaRefuerzo?: boolean;
}

export function resolverCaso2(p: PaqueteT1, e: EntradaCaso2): ResultadoCaso {
  const carpeta = p.carpetas.porCaso[2];
  validarAbiertos(carpeta, e.abiertos);
  const tipo = p.version.tipos[2];
  const claveAbierta = hayAlguno(carpeta.claves, e.abiertos);
  const refuerzoAbierto = carpeta.refuerzo !== null && e.abiertos.includes(carpeta.refuerzo);
  if (e.piezaClave && !claveAbierta) throw new Error("La pieza del clave solo existe con el clave abierto");
  if (e.piezaRefuerzo && !(carpeta.papeles.some((q) => q.id === "C2-4") && e.abiertos.includes("C2-4"))) {
    throw new Error("La pieza del refuerzo solo existe con el refuerzo abierto");
  }
  const codigos: string[] = [];
  let fila: [string, string];
  let sinEvidencia = false;
  if (e.decision === "tal") {
    if (tipo === "P") {
      fila = ["R2.1", "P"];
      codigos.push("E2a");
    } else {
      fila = claveAbierta ? ["R2.1", "B"] : ["R2.1.sin", "B"];
      sinEvidencia = !claveAbierta;
    }
  } else if (e.decision === "frenar") {
    fila = ["R2.2", tipo];
    if (tipo === "P" && !claveAbierta) codigos.push("E2b");
    if (tipo === "B") codigos.push("E2d");
  } else if (e.piezaClave) {
    fila = ["R2.3", tipo === "P" && e.piezaRefuerzo && refuerzoAbierto ? "P con refuerzo" : tipo];
  } else {
    fila = ["R2.4", tipo];
    codigos.push("E2c");
  }
  return armar(2, [fila], codigos, sinEvidencia, { tipo, claveAbierta });
}

// ── Caso 3 ───────────────────────────────────────────────────────────────────

export interface EntradaCaso3 {
  abiertos: readonly string[];
  /** Cuántas tandas sacó (1 ficha cada una). */
  tandas: number;
  decision: "tal" | "frenar" | "rango";
  /** El rango «entre a y b», en horas con 1 decimal (solo con decision = "rango" y 2 o más tandas). */
  a?: number;
  b?: number;
  /** El rango lleva la pieza del papel clave (solo existe con el clave abierto). */
  piezaClave?: boolean;
}

export function resolverCaso3(p: PaqueteT1, e: EntradaCaso3): ResultadoCaso {
  const carpeta = p.carpetas.porCaso[3];
  validarAbiertos(carpeta, e.abiertos);
  const tipo: TipoDeCaso = p.version.tipos[3];
  const { mu, medias } = p.cifras.caso3;
  if (!Number.isInteger(e.tandas) || e.tandas < 0 || e.tandas > medias.length) throw new Error(`Tandas inválidas: ${e.tandas}`);
  const claveAbierta = hayAlguno(carpeta.claves, e.abiertos);
  if (e.piezaClave && !claveAbierta) throw new Error("La pieza del clave solo existe con el clave abierto");
  const codigos: string[] = [];
  const detalle: Record<string, DatoDeDetalle> = { tipo, tandas: e.tandas, claveAbierta };
  let fila: [string, string];
  let sinEvidencia = false;

  if (e.decision === "tal") {
    fila = tipo === "B" ? (claveAbierta ? ["R3.B", "tal cual"] : ["R3.B.sin", "tal cual"]) : [tipo === "P" ? "R3.P" : "R3.A.sin", "tal cual"];
    sinEvidencia = tipo === "B" && !claveAbierta;
    if (e.tandas <= 1 && tipo !== "B") codigos.push("E3a");
  } else if (e.decision === "frenar") {
    fila = [{ P: "R3.P", B: "R3.B", A: "R3.A.sin" }[tipo], "frenar"];
    if (tipo === "B") codigos.push("E3d");
  } else {
    if (e.tandas < 2) throw new Error("Para redactar un rango hacen falta 2 tandas");
    if (e.a === undefined || e.b === undefined || tenths(e.a) > tenths(e.b)) throw new Error("Rango inválido");
    const nivel: NivelDeRango = nivelDeRango(e.a, e.b, mu);
    const pieza = !!e.piezaClave;
    detalle.nivel = nivel;
    detalle.pieza = pieza;
    if (nivel === "noCubre" || nivel === "ancho") {
      fila = [tipo === "P" ? "R3.P" : tipo === "B" ? "R3.B" : pieza ? "R3.A.con" : "R3.A.sin", nivel];
      codigos.push(nivel === "noCubre" ? "E3b" : "E3c");
      // «razonó bien y no cubrió»: el rango es el mínimo-máximo de las 3 tandas vistas (pasa 2,5 % del tiempo).
      detalle.razonoBienNoCubrio = nivel === "noCubre" && e.tandas === 3 && tenths(e.a) === tenths(Math.min(...medias)) && tenths(e.b) === tenths(Math.max(...medias));
    } else if (tipo === "A") {
      if (pieza) fila = ["R3.A.con", nivel === "ok" ? "ok con pieza" : "flojo con pieza"];
      else {
        fila = ["R3.A.sin", "rango sin pieza"];
        codigos.push("E3e");
      }
    } else {
      fila = [tipo === "P" ? "R3.P" : "R3.B", nivel === "ok" && pieza ? "ok con pieza" : "ok sin pieza o flojo"];
      if (nivel === "ok" && !pieza) {
        codigos.push("E3f");
        sinEvidencia = !claveAbierta; // el rango sirve, pero no sabe por qué
      }
    }
  }
  return armar(3, [fila], codigos, sinEvidencia, detalle, { claveCerrada: !claveAbierta });
}

// ── Caso 4 ───────────────────────────────────────────────────────────────────

export interface EntradaCaso4 {
  abiertos: readonly string[];
  eleccion: "A" | "B" | "ninguna";
}

export function resolverCaso4(p: PaqueteT1, e: EntradaCaso4): ResultadoCaso {
  const carpeta = p.carpetas.porCaso[4];
  validarAbiertos(carpeta, e.abiertos);
  const bueno = p.version.buenoEsA ? "A" : "B";
  const claveAbierta = hayAlguno(carpeta.claves, e.abiertos);
  const codigos: string[] = [];
  let fila: string;
  let sinEvidencia = false;
  if (e.eleccion === "ninguna") {
    fila = "R4.5";
    codigos.push("E4c");
  } else if (e.eleccion === bueno) {
    fila = (bueno === "A" ? "R4.1" : "R4.2") + (claveAbierta ? "" : ".sin");
    sinEvidencia = !claveAbierta;
  } else {
    fila = e.eleccion === "A" ? "R4.3" : "R4.4";
    if (!claveAbierta) codigos.push("E4a");
    else if (bueno === "A" && e.eleccion === "B") codigos.push("E4b");
  }
  return armar(4, [[fila]], codigos, sinEvidencia, { bueno, claveAbierta });
}

// ── Caso 5 ───────────────────────────────────────────────────────────────────

export interface EntradaCaso5Turno2 {
  opcion: OpcionCaso5;
  abiertos: readonly string[];
  /** Lo que escribió («cuántos puntos subió por el taller»), o null si frenó. */
  x: number | null;
}
export interface EntradaCaso5 extends EntradaCaso5Turno2 {}

/** Turno 1: aconsejar. (a) y (b) valen 0/0 y dejan E5e (solo registro); (c) cuesta 3 de Voz. */
export function resolverCaso5Turno1(opcion: OpcionCaso5): ResultadoCaso {
  return armar(5, [[opcion === "c" ? "R5.2" : "R5.1"]], opcion === "c" ? [] : ["E5e"], false, { opcion });
}

/** La regla de pago del turno 2 y las banderas que la disparan (puerto de `regla5` de ramas_t1.py). */
export function reglaDelTurno2(p: PaqueteT1, e: EntradaCaso5Turno2) {
  const carpeta = p.carpetas.caso5[e.opcion];
  validarAbiertos(carpeta, e.abiertos);
  const o = p.cifras.caso5.opciones[e.opcion];
  const rho = tenths(o.rho);
  const req = REQUERIDOS_CASO5[e.opcion].every((id) => e.abiertos.includes(id));
  const c1 = e.abiertos.includes("C5-1");
  const c2 = e.abiertos.includes("C5-2");
  if (e.x === null) return { regla: "R5.3", req, rho, enRho: false, cero: false };
  const X = tenths(e.x);
  const enRho = Math.abs(X - rho) <= 10;
  const enBruta = Math.abs(X - tenths(o.bruta)) <= 10;
  const enInfl = o.inflada !== null && Math.abs(X - tenths(o.inflada)) <= 10;
  let regla: string;
  if (c1 && enBruta && !enRho) regla = "R5.4";
  else if (e.opcion !== "c" && c2 && enInfl && !enRho) regla = "R5.5";
  else if (enRho) regla = req ? (e.opcion === "c" ? "R5.6" : "R5.7") : "R5.8";
  else regla = "R5.9";
  return { regla, req, rho, enRho, cero: X === 0 };
}

export function resolverCaso5Turno2(p: PaqueteT1, e: EntradaCaso5Turno2): ResultadoCaso {
  const r = reglaDelTurno2(p, e);
  const codigos: string[] = [];
  if (r.regla === "R5.4") codigos.push("E5a");
  if (r.regla === "R5.5") codigos.push("E5b");
  if ((r.regla === "R5.8" || r.regla === "R5.9") && !r.req) codigos.push("E5c");
  if (e.x !== null && r.cero && r.req && r.rho > 10) codigos.push("E5d");
  return armar(5, [[r.regla]], codigos, r.regla === "R5.8", { opcion: e.opcion, regla: r.regla, rho: r.rho / 10, requeridosAbiertos: r.req });
}

/** El caso 5 entero: los dos turnos juntos (sus efectos se suman y el tope se pone una sola vez, al cerrar). */
export function resolverCaso5(p: PaqueteT1, e: EntradaCaso5): ResultadoCaso {
  const t1 = resolverCaso5Turno1(e.opcion);
  const t2 = resolverCaso5Turno2(p, e);
  const codigos = [...t1.codigos, ...t2.codigos];
  return armar(5, [[e.opcion === "c" ? "R5.2" : "R5.1"], [t2.filas[0]]], codigos, t2.sinEvidencia, t2.detalle);
}

// ── Caso 6 ───────────────────────────────────────────────────────────────────

export interface EntradaCaso6 {
  abiertos: readonly string[];
  decision: "tal" | "frenar" | "redactar";
  /** El conteo que escribió (obligatorio al redactar). */
  N?: number;
  extension?: "ninguna" | "podrian" | "grupo";
}

export function resolverCaso6(p: PaqueteT1, e: EntradaCaso6): ResultadoCaso {
  const carpeta = p.carpetas.porCaso[6];
  validarAbiertos(carpeta, e.abiertos);
  const tipo = p.version.tipos[6];
  const claveAbierta = hayAlguno(carpeta.claves, e.abiertos);
  const codigos: string[] = [];
  const filas: Array<[string, string]> = [];
  let sinEvidencia = false;
  const detalle: Record<string, DatoDeDetalle> = { tipo, claveAbierta };
  if (e.decision === "tal") {
    if (tipo === "B" && !claveAbierta) {
      filas.push(["R6.1.sin", "B"]);
      sinEvidencia = true;
    } else filas.push(["R6.1", tipo]);
    if (tipo !== "B") codigos.push("E6b");
  } else if (e.decision === "frenar") {
    filas.push(["R6.2", tipo]);
    if (tipo === "B") codigos.push("E6d");
  } else {
    if (e.N === undefined || !Number.isInteger(e.N)) throw new Error("Falta el conteo N");
    if (!e.extension) throw new Error("Falta la extensión de la conclusión");
    if (e.extension === "grupo" && !claveAbierta) throw new Error("La pieza `grupo` solo existe con el clave abierto");
    filas.push([{ ninguna: "R6.3", podrian: "R6.4", grupo: "R6.5" }[e.extension], tipo]);
    if (e.extension === "podrian" && tipo !== "B") codigos.push("E6c");
    const ncorr = e.N === p.cifras.caso6.N;
    detalle.nCorrecto = ncorr;
    if (!ncorr) {
      filas.push(["R6.6", "*"]);
      codigos.push("E6a");
    }
  }
  return armar(6, filas, codigos, sinEvidencia, detalle);
}

// ── Caso 7 ───────────────────────────────────────────────────────────────────

export interface EntradaCaso7 {
  decision: "tal" | "redisenar" | "frenar";
  /** La diferencia que escribió, de 0,1 en 0,1 (obligatoria si firma o rediseña). */
  x?: number;
}

export function resolverCaso7(p: PaqueteT1, e: EntradaCaso7): ResultadoCaso {
  const tipo = p.version.tipos[7];
  if (tipo === "A") throw new Error("El caso 7 nunca es del tipo A");
  const codigos: string[] = [];
  let xok = true;
  if (e.decision !== "frenar") {
    if (e.x === undefined) throw new Error("Falta la diferencia x");
    xok = Math.abs(tenths(e.x) - tenths(p.cifras.caso7.x)) <= 1;
  }
  let fila: string;
  if (e.decision === "tal") fila = xok ? "R7.1" : "R7.2";
  else if (e.decision === "redisenar") fila = xok ? "R7.3" : "R7.4";
  else fila = "R7.5";
  if (e.decision !== "frenar" && !xok) codigos.push("E7a");
  if (tipo === "P" && e.decision === "tal") codigos.push("E7b");
  if (tipo === "B" && e.decision !== "tal") codigos.push("E7c");
  return armar(7, [[fila, tipo]], codigos, false, { tipo, xCorrecto: e.decision === "frenar" ? null : xok });
}

// ── Caso 8 ───────────────────────────────────────────────────────────────────

export interface EntradaCaso8 {
  abiertos: readonly string[];
  /** Los papeles que puso sobre la mesa (hasta 2, de los que abrió). */
  enMesa: readonly string[];
  /** 0 financiar, 1 no financiar, 2 esperar un trimestre. */
  decision: 0 | 1 | 2;
}

export function resolverCaso8(p: PaqueteT1, e: EntradaCaso8): ResultadoCaso {
  const carpeta = p.carpetas.porCaso[8];
  validarAbiertos(carpeta, e.abiertos);
  if (e.enMesa.length > 2 || new Set(e.enMesa).size !== e.enMesa.length) throw new Error("Hasta 2 papeles distintos sobre la mesa");
  for (const id of e.enMesa) if (!e.abiertos.includes(id)) throw new Error(`Solo se pone sobre la mesa lo que se abrió (${id})`);
  const real = p.version.decisionReal;
  const beto = p.version.propuestaDeBeto;
  const d = e.decision;
  const claves = e.enMesa.filter((id) => carpeta.claves.includes(id)).length; // e: 0, 1 o 2
  let fila: string;
  if (d === real) fila = claves === 2 ? "R8.1" : claves === 1 ? "R8.2" : "R8.3";
  else if (d === 0) fila = real === 1 ? "R8.4" : "R8.5";
  else if (d === 1) fila = real === 0 ? "R8.6" : "R8.7";
  else fila = "R8.8";
  const codigos: string[] = [];
  if (claves < 2) codigos.push("E8a");
  if (d === 2 && real !== 2) codigos.push("E8b");
  if (d !== 2 && d !== real) codigos.push("E8c");
  if ((d === beto && d !== real) || (d !== beto && beto === real)) codigos.push("E8d");
  return armar(8, [[fila]], codigos, d === real && claves < 2, { real, beto, clavesEnMesa: claves });
}

// ── Hábitos ──────────────────────────────────────────────────────────────────

/**
 * Un hábito es la misma clase de error en DOS casos distintos; el caso 5 vale por dos (sus turnos 1 y 2). Recibe los
 * resultados de los casos jugados (el caso 5 como UN resultado: `resolverCaso5`).
 */
export function habitosCumplidos(resultados: readonly ResultadoCaso[]): Habito[] {
  const total: Partial<Record<Habito, number>> = {};
  for (const r of resultados) for (const [h, n] of Object.entries(r.ocurrencias) as Array<[Habito, number]>) total[h] = (total[h] ?? 0) + n;
  return (["H1", "H2", "H3", "H4"] as const).filter((h) => (total[h] ?? 0) >= 2);
}
