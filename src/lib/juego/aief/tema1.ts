/**
 * Tema 1 de «La ventanilla» (AIEF): la llegada, los usuarios de un estado financiero (1.1), la NC antes
 * que la NIIF (1.2) y la reexpresión por inflación (1.3, el giro del día). Diseño en
 * docs/juego/gdd/00-adaptacion-aief.md, R3.2 y R3.2-bis (lo verificado en el dossier).
 *
 * Todo sale de funciones puras: las carpetas por versión, la revisión de cada número que escribe el
 * alumno y el avance de la partida, que se reconstruye leyendo sus eventos (así se retoma donde quedó
 * y el docente puede recalcular todo desde el registro).
 */

import { azarConSemilla, type Azar } from "../../finanzas/ejercicios";
import { reexpresar } from "../../finanzas/estados";
import type { ConHora, Escena } from "../partida";
import {
  PORCENTAJE_GARANTIA,
  VERSION_MAXIMA,
  carpetaT13,
  colorDelCierre,
  correctoDe,
  cifrasDe,
  diagnosticoMonto,
  type CarpetaT13,
  type Color,
} from "./ventanilla";

export const ESCENA_TEMA1: Escena<"aief", "tema1"> = {
  isla: "aief",
  escena: "tema1",
  versionValida: (v) => Number.isInteger(v) && v >= 0 && v <= VERSION_MAXIMA,
};

// ── Llegada: la carpeta de práctica (fija, sin nota) ─────────────────────────

export const PRACTICA = { cliente: "Doña Rosa", pide: 10_000, garantia: "una moto", enLibros: 20_000 } as const;
export const PRACTICA_CORRECTO = PRACTICA.pide; // 60 % de 20.000 = 12.000 alcanza para lo que pide

// ── 1.1 · Quién lee un estado financiero (Cuadro 1 del dossier, pág. 4) ──────

export type Persona = "proveedor" | "inversionista" | "sin";

/** Las decisiones, con las palabras del Cuadro 1. */
export const DECISIONES: Record<Persona, string> = {
  proveedor: "Vender al contado o a 30 días",
  inversionista: "Aportar o retirar capital",
  sin: "Verificar la base imponible declarada",
};

export const PERSONAS: Persona[] = ["proveedor", "inversionista", "sin"];

// ── 1.2 · Primero la NC (Cuadro 2 del dossier, págs. 8 y 9) ──────────────────

export const NORMAS: [number, string][] = [
  [1, "Principios y normas técnico-contables generalmente aceptados para la preparación de EE.FF."],
  [2, "Tratamiento contable de hechos posteriores al cierre del ejercicio"],
  [3, "Estados financieros a moneda constante (ajuste por inflación)"],
  [4, "Revalorización técnica de activos fijos"],
  [5, "Principios de contabilidad para la industria minera"],
  [6, "Tratamiento contable de las diferencias de cambio"],
  [7, "Valuación de inversiones permanentes"],
  [8, "Consolidación de estados financieros"],
  [9, "Normas de contabilidad para la industria petrolera"],
  [10, "Tratamiento contable de los arrendamientos"],
  [11, "Información esencial requerida para una adecuada exposición de los EE.FF."],
  [12, "Operaciones en moneda extranjera cuando coexiste más de un tipo de cambio"],
  [13, "Cambios contables y su exposición"],
  [14, "Políticas contables, su exposición y revelación"],
];

export type IdOperacion =
  | "arrendamiento"
  | "consolidacion"
  | "diferencia-cambio"
  | "inversion-permanente"
  | "hecho-posterior"
  | "revalorizacion"
  | "moneda-constante"
  | "cambio-contable"
  | "flujo-efectivo";

export interface Operacion {
  id: IdOperacion;
  /** Lo que se marca en la carpeta, con palabras de todos los días. */
  texto: string;
  /** La NC que la rige; 0 si ninguna (el único vacío que nombra el dossier es el flujo de efectivo). */
  nc: number;
  /** La norma internacional de esa operación (del juego, no del dossier: R3.2-bis). */
  niif: string;
}

export const OPERACIONES: Operacion[] = [
  { id: "arrendamiento", texto: "El local de la tienda es alquilado, con contrato a cinco años.", nc: 10, niif: "NIIF 16" },
  { id: "consolidacion", texto: "La empresa es dueña de otra y presenta un solo balance de las dos juntas.", nc: 8, niif: "NIIF 10" },
  { id: "diferencia-cambio", texto: "Tiene una deuda en dólares y registró lo que subió al moverse el tipo de cambio.", nc: 6, niif: "NIC 21" },
  { id: "inversion-permanente", texto: "Compró acciones de otra empresa para conservarlas muchos años.", nc: 7, niif: "NIC 28" },
  { id: "hecho-posterior", texto: "Se quemó un depósito después del cierre del año, antes de entregar el balance.", nc: 2, niif: "NIC 10" },
  { id: "revalorizacion", texto: "Un perito revalorizó la maquinaria de la empresa.", nc: 4, niif: "NIC 16" },
  { id: "moneda-constante", texto: "Ajustó todo el balance por inflación.", nc: 3, niif: "NIC 29" },
  { id: "cambio-contable", texto: "Cambió el método de depreciación respecto del año pasado.", nc: 13, niif: "NIC 8" },
  { id: "flujo-efectivo", texto: "Presenta el estado de flujo de efectivo.", nc: 0, niif: "NIC 7" },
];

const operacion = (id: IdOperacion) => OPERACIONES.find((o) => o.id === id)!;

/** Qué escribió el contador en su nota: dos formas bien hechas y dos que el oficial tiene que devolver. */
export type Nota = "nc-correcta" | "niif-supletoria" | "niif-habiendo-nc" | "nc-equivocada";

export interface CarpetaT12 {
  tipo: "t12";
  version: number;
  cliente: string;
  operacion: IdOperacion;
  nota: Nota;
  /** Sólo en "nc-equivocada": la NC que citó el contador por error. */
  ncCitada?: number;
}

export const notaBienHecha = (n: Nota) => n === "nc-correcta" || n === "niif-supletoria";

export type Dictamen = "aceptar" | "devolver";
export const dictamenCorrecto = (c: CarpetaT12): Dictamen => (notaBienHecha(c.nota) ? "aceptar" : "devolver");

/** Aceptar uno mal hecho: el auditor del banco lo observa. Devolver uno bien hecho: el cliente se va. */
export function colorDictamen(c: CarpetaT12, d: Dictamen): Color {
  const ok = dictamenCorrecto(c);
  if (d === ok) return ok === "aceptar" ? "verde" : "bien-rechazado";
  return d === "aceptar" ? "rojo" : "gris";
}

export const ncDe = (c: CarpetaT12) => operacion(c.operacion).nc;
export const operacionDe = (c: CarpetaT12) => operacion(c.operacion);

/** Lo que dice la nota del contador, tal como se lee en la carpeta. */
export function textoNota(c: CarpetaT12): string {
  const op = operacion(c.operacion);
  switch (c.nota) {
    case "nc-correcta":
      return `Registrado según la NC ${op.nc} boliviana.`;
    case "niif-supletoria":
      return `Preparado según la ${op.niif}, porque ninguna NC boliviana lo regula.`;
    case "niif-habiendo-nc":
      return `Como Bolivia ya adoptó las NIIF, lo registramos según la ${op.niif}.`;
    case "nc-equivocada":
      return `Registrado según la NC ${c.ncCitada} boliviana.`;
  }
}

/** La NC que un contador distraído confunde con la de cada operación (títulos o números parecidos). */
const NC_CONFUSA: Record<IdOperacion, number> = {
  arrendamiento: 7,
  consolidacion: 7,
  "diferencia-cambio": 12,
  "inversion-permanente": 8,
  "hecho-posterior": 10, // la NIC 10 es la de hechos posteriores: la trampa del número
  revalorizacion: 3,
  "moneda-constante": 4,
  "cambio-contable": 14,
  "flujo-efectivo": 0,
};

const CLIENTES_T12 = ["Don Ramiro, ferretería", "Doña Carmen, farmacia", "Don Efraín, transporte", "Doña Silvia, panadería", "Don Marcelo, imprenta"];

export const CARPETAS_T12_EJEMPLO: [CarpetaT12, CarpetaT12] = [
  { tipo: "t12", version: 0, cliente: "Don Ramiro, ferretería", operacion: "arrendamiento", nota: "niif-habiendo-nc" },
  { tipo: "t12", version: 0, cliente: "Doña Carmen, farmacia", operacion: "flujo-efectivo", nota: "niif-supletoria" },
];

/** Dos carpetas: una bien hecha y una para devolver, en orden sorteado, con operaciones distintas. */
export function carpetasT12(version: number): [CarpetaT12, CarpetaT12] {
  if (!ESCENA_TEMA1.versionValida(version)) throw new Error(`La versión va de 0 a ${VERSION_MAXIMA}`);
  if (version === 0) return CARPETAS_T12_EJEMPLO;
  const azar = azarConSemilla(Math.imul(version ^ 0x7e12, 2654435761) >>> 0);
  const conNc = OPERACIONES.filter((o) => o.nc > 0);
  const elegir = <T>(xs: T[]) => xs[Math.floor(azar() * xs.length)];

  const opMal = elegir(conNc);
  const mal: CarpetaT12 =
    azar() < 0.6
      ? { tipo: "t12", version, cliente: "", operacion: opMal.id, nota: "niif-habiendo-nc" }
      : { tipo: "t12", version, cliente: "", operacion: opMal.id, nota: "nc-equivocada", ncCitada: NC_CONFUSA[opMal.id] };

  const bien: CarpetaT12 =
    azar() < 0.4
      ? { tipo: "t12", version, cliente: "", operacion: "flujo-efectivo", nota: "niif-supletoria" }
      : { tipo: "t12", version, cliente: "", operacion: elegir(conNc.filter((o) => o.id !== opMal.id)).id, nota: "nc-correcta" };

  const i = Math.floor(azar() * CLIENTES_T12.length);
  const par: [CarpetaT12, CarpetaT12] = azar() < 0.5 ? [mal, bien] : [bien, mal];
  par[0].cliente = CLIENTES_T12[i];
  par[1].cliente = CLIENTES_T12[(i + 1 + Math.floor(azar() * (CLIENTES_T12.length - 1))) % CLIENTES_T12.length];
  return par;
}

export type DiagnosticoNC = "correcta" | "supuso-el-vacio" | "otra-nc" | "hay-vacio" | "copio-la-niif" | "fuera-de-lista";

/** El número de NC que escribió el alumno (0 = ninguna la regula). */
export function revisarNC(c: CarpetaT12, escrito: number): DiagnosticoNC {
  const nc = ncDe(c);
  if (escrito === nc) return "correcta";
  const niifNumero = Number(operacion(c.operacion).niif.replace(/\D/g, ""));
  if (nc === 0) return "hay-vacio";
  if (escrito === 0) return "supuso-el-vacio";
  if (escrito === niifNumero) return "copio-la-niif";
  if (escrito < 1 || escrito > 14) return "fuera-de-lista";
  return "otra-nc";
}

// ── 1.3 · La máquina que "creció" ────────────────────────────────────────────

/** Los índices como los muestra el dossier (base 100). */
export const indicesDe = (c: CarpetaT13) => ({ compra: Math.round(c.indiceCompra * 100), hoy: Math.round(c.indiceHoy * 100) });
export const valorDeHoy = (c: CarpetaT13) => Math.round(reexpresar(c.enLibros, c.indiceCompra, c.indiceHoy));

export type DiagnosticoReexpresion =
  | "correcta"
  | "en-libros"
  | "del-cliente"
  | "por-el-indice"
  | "al-reves"
  | "solo-el-ajuste"
  | "ya-el-sesenta"
  | "otra";

export function revisarReexpresion(c: CarpetaT13, escrito: number): DiagnosticoReexpresion {
  const hoy = valorDeHoy(c);
  const { hoy: iHoy } = indicesDe(c);
  const cerca = (x: number) => Math.abs(escrito - x) < 1;
  if (cerca(hoy)) return "correcta";
  if (cerca(c.enLibros)) return "en-libros";
  if (cerca(c.valorDelCliente)) return "del-cliente";
  if (cerca(c.enLibros * iHoy)) return "por-el-indice";
  if (cerca(c.enLibros / c.indiceHoy)) return "al-reves";
  if (cerca(hoy - c.enLibros)) return "solo-el-ajuste";
  if (cerca(PORCENTAJE_GARANTIA * hoy)) return "ya-el-sesenta";
  return "otra";
}

// ── La jornada y sus repasos ─────────────────────────────────────────────────

export type TipoCarpeta = "t12" | "t13";
export type CarpetaTema1 = CarpetaT12 | CarpetaT13;

const CLIENTES_T13 = ["Don Víctor, carpintería", "Doña Lidia, carpintería", "Don Rubén, carpintería"];

/** La versión de las carpetas de un repaso: otros números, nunca la del dossier ni la de la jornada anterior. */
export function versionDeRepaso(version: number, ronda: number): number {
  if (ronda === 0) return version;
  return ((version + 211 * ronda - 1) % VERSION_MAXIMA) + 1;
}

/** Las carpetas de una ronda: la jornada (ronda 0) trae todo; cada repaso, sólo los tipos que fallaron. */
export function carpetasDeRonda(version: number, ronda: number, tipos: TipoCarpeta[]): CarpetaTema1[] {
  const v = versionDeRepaso(version, ronda);
  const r: CarpetaTema1[] = [];
  if (tipos.includes("t12")) r.push(...carpetasT12(v));
  if (tipos.includes("t13")) {
    const c = carpetaT13(v);
    // En el repaso llega otro carpintero: el mismo tipo de caso, con otros números y otro nombre.
    r.push(ronda === 0 ? c : { ...c, cliente: CLIENTES_T13[(ronda - 1) % CLIENTES_T13.length] });
  }
  return r;
}

export const colorDeMonto = (c: CarpetaT13, monto: number) => colorDelCierre(cifrasDe(c), monto);
export { correctoDe, diagnosticoMonto };

// ── Eventos: lo que hizo el alumno, nada más ─────────────────────────────────

export type EventoTema1 =
  | { tipo: "llegada"; monto: number }
  | { tipo: "usuario"; persona: Persona; eligio: Persona }
  | { tipo: "nc"; ronda: number; i: number; valor: number }
  | { tipo: "dictamen"; ronda: number; i: number; decision: Dictamen }
  | { tipo: "reexpresion"; ronda: number; i: number; valor: number }
  | { tipo: "monto"; ronda: number; i: number; valor: number }
  | { tipo: "linea"; ronda: number; texto: string }
  | { tipo: "ayuda"; paso: string; escalon: "concreta" | "leer" }
  | { tipo: "cierre"; ronda: number };

export interface Resultado {
  carpeta: CarpetaTema1;
  color: Color;
}

/** Dónde está el alumno, reconstruido desde sus eventos. */
export interface Avance {
  llegada: boolean;
  /** Personas de 1.1 que ya ubicó bien. */
  usuarios: Persona[];
  ronda: number;
  carpetas: CarpetaTema1[];
  /** Las carpetas de cada ronda jugada, de la 0 a la actual (para describir el registro). */
  rondas: CarpetaTema1[][];
  /** La carpeta que toca atender (índice en `carpetas`), o null si la ronda ya está decidida. */
  actual: number | null;
  /** En la carpeta actual: si el número del tema ya está bien (NC o valor de hoy). */
  numeroBien: boolean;
  /** En la 1.3 actual: si ya escribió el monto y falta la línea para el cliente. */
  faltaLinea: boolean;
  /** Los colores de la ronda, carpeta por carpeta, cuando ya se decidió todo. */
  resultados: Resultado[] | null;
  /** Tipos que hay que repasar después de esta ronda. */
  aRepasar: TipoCarpeta[];
  /** Cuántas veces falló cada tipo, contando rondas cerradas: sube la escalera del repaso. */
  fallosPorTipo: Record<TipoCarpeta, number>;
  /** Lo que falló la última vez en cada tipo, para la pista del repaso. */
  ultimoError: Partial<Record<TipoCarpeta, string>>;
  aprobado: boolean;
}

const bienColor = (c: Color) => c === "verde" || c === "bien-rechazado";

export function avanceDe(version: number, eventos: EventoTema1[]): Avance {
  const llegada = eventos.some((e) => e.tipo === "llegada" && e.monto === PRACTICA_CORRECTO);
  const ultimoDe = new Map<Persona, Persona>();
  for (const e of eventos) if (e.tipo === "usuario") ultimoDe.set(e.persona, e.eligio);
  const usuarios = PERSONAS.filter((p) => ultimoDe.get(p) === p);

  let ronda = 0;
  let tipos: TipoCarpeta[] = ["t12", "t13"];
  const fallosPorTipo: Record<TipoCarpeta, number> = { t12: 0, t13: 0 };
  const ultimoError: Partial<Record<TipoCarpeta, string>> = {};
  const rondas: CarpetaTema1[][] = [];

  // Recorre las rondas cerradas; la que queda abierta es la actual.
  for (;;) {
    const carpetas = carpetasDeRonda(version, ronda, tipos);
    rondas.push(carpetas);
    const deRonda = eventos.filter((e) => "ronda" in e && e.ronda === ronda);
    const resultados = resultadosDe(carpetas, deRonda);
    const cerrada = eventos.some((e) => e.tipo === "cierre" && e.ronda === ronda);
    const fallaron = resultados ? tiposQueFallaron(resultados) : [];

    if (!cerrada || !resultados || fallaron.length === 0) {
      const actual = resultados ? null : carpetas.findIndex((_, i) => !decidida(carpetas[i], i, deRonda));
      const c = actual === null || actual < 0 ? null : carpetas[actual];
      return {
        llegada,
        usuarios,
        ronda,
        carpetas,
        rondas,
        actual: actual !== null && actual >= 0 ? actual : null,
        numeroBien: c ? numeroBien(c, actual!, deRonda) : false,
        faltaLinea: c?.tipo === "t13" ? deRonda.some((e) => e.tipo === "monto" && e.i === actual) : false,
        resultados,
        aRepasar: fallaron,
        fallosPorTipo,
        ultimoError,
        aprobado: Boolean(resultados) && fallaron.length === 0 && usuarios.length === PERSONAS.length && cerrada,
      };
    }
    for (const t of fallaron) {
      fallosPorTipo[t] += 1;
      ultimoError[t] = errorDeTipo(t, resultados, deRonda);
    }
    tipos = fallaron;
    ronda += 1;
  }
}

function numeroBien(c: CarpetaTema1, i: number, ev: EventoTema1[]): boolean {
  if (c.tipo === "t12") return ev.some((e) => e.tipo === "nc" && e.i === i && revisarNC(c, e.valor) === "correcta");
  return ev.some((e) => e.tipo === "reexpresion" && e.i === i && revisarReexpresion(c, e.valor) === "correcta");
}

function decidida(c: CarpetaTema1, i: number, ev: EventoTema1[]): boolean {
  if (c.tipo === "t12") return numeroBien(c, i, ev) && ev.some((e) => e.tipo === "dictamen" && e.i === i);
  return numeroBien(c, i, ev) && ev.some((e) => e.tipo === "monto" && e.i === i) && ev.some((e) => e.tipo === "linea");
}

/** Los colores de la ronda si todas sus carpetas están decididas (la primera decisión cuenta: no se rehace). */
function resultadosDe(carpetas: CarpetaTema1[], ev: EventoTema1[]): Resultado[] | null {
  if (!carpetas.every((c, i) => decidida(c, i, ev))) return null;
  return carpetas.map((c, i) => {
    if (c.tipo === "t12") {
      const d = ev.find((e) => e.tipo === "dictamen" && e.i === i) as Extract<EventoTema1, { tipo: "dictamen" }>;
      return { carpeta: c, color: colorDictamen(c, d.decision) };
    }
    const m = ev.find((e) => e.tipo === "monto" && e.i === i) as Extract<EventoTema1, { tipo: "monto" }>;
    return { carpeta: c, color: colorDeMonto(c, m.valor) };
  });
}

function tiposQueFallaron(rs: Resultado[]): TipoCarpeta[] {
  const t: TipoCarpeta[] = [];
  for (const tipo of ["t12", "t13"] as const) if (rs.some((r) => r.carpeta.tipo === tipo && !bienColor(r.color))) t.push(tipo);
  return t;
}

function errorDeTipo(t: TipoCarpeta, rs: Resultado[], ev: EventoTema1[]): string {
  const i = rs.findIndex((r) => r.carpeta.tipo === t && !bienColor(r.color));
  const c = rs[i].carpeta;
  if (c.tipo === "t12") return rs[i].color === "rojo" ? "acepto-mal-hecho" : "devolvio-bien-hecho";
  const m = ev.find((e) => e.tipo === "monto" && e.i === i) as Extract<EventoTema1, { tipo: "monto" }>;
  return diagnosticoMonto(c, m.valor);
}

export type EventoConHora = ConHora<EventoTema1>;
