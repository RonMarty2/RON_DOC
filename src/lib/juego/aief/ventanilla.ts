/**
 * Motor de «La ventanilla», el juego de AIEF (marco A): el alumno es oficial de créditos y decide cuánto
 * prestar. Todo número que ve o escribe sale de acá, con pruebas en ventanilla.test.ts. Diseño en
 * docs/juego/gdd/00-adaptacion-aief.md, Ronda 3 (R3.1 y R3.3).
 *
 * Cada carpeta trae tres cifras: lo que pide el cliente, lo mínimo que le sirve y lo que puede pagar
 * (el tope, que el alumno calcula con la regla de la agencia). El monto correcto sale de compararlas:
 * sí completo, contraoferta o cero. Así el monto no es un sí o no disfrazado.
 *
 * Las carpetas se generan por versión (la 0 es el ejemplo de la ficha; las demás, con semilla) y cada
 * versión cumple reglas que conservan la lección: cada error típico da otro monto, y ninguna estrategia
 * perezosa gana una jornada entera.
 */

import { azarConSemilla, type Azar } from "../../finanzas/ejercicios";
import { cascada, patrimonioFinal, reexpresar, TASA_IUE } from "../../finanzas/estados";

export const VERSION_MAXIMA = 999;

// ── Reglas comunes de la jornada ─────────────────────────────────────────────

export interface TresCifras {
  pide: number;
  minimo: number;
  /** Lo que puede pagar según la regla del día (sin redondear). */
  tope: number;
}

/** La agencia presta en múltiplos de Bs 100, redondeando hacia abajo. Primero a centavos: 0,6 × 90.000 × 1,15
 *  da 62.099,999… en la computadora y tiene que ser 62.100. */
export const redondearAbajo100 = (x: number) => Math.floor(Math.round(x * 100) / 10_000) * 100;

/** Sí completo si el tope cubre lo que pide; contraoferta por el tope si llega al mínimo; si no, cero. */
export function montoCorrecto({ pide, minimo, tope }: TresCifras): number {
  const t = redondearAbajo100(tope);
  if (t >= pide) return pide;
  if (t >= minimo) return t;
  return 0;
}

export type Color = "verde" | "bien-rechazado" | "rojo" | "gris" | "no-le-servia";

/** El color con que se da vuelta la carpeta al cierre de la jornada. */
export function colorDelCierre(c: TresCifras, escrito: number): Color {
  const ok = montoCorrecto(c);
  if (escrito === ok) return ok === 0 ? "bien-rechazado" : "verde";
  if (escrito > 0 && escrito < c.minimo) return "no-le-servia";
  if (escrito > ok) return "rojo";
  return "gris";
}

/** Barra de la meta: 80 % de lo que suman los montos correctos del día, redondeado a mil hacia abajo. No cuenta para pasar. */
export function metaDelDia(correctos: number[]): number {
  return Math.floor((0.8 * correctos.reduce((a, b) => a + b, 0)) / 1000) * 1000;
}

// ── Reglas de la agencia (inventadas por el juego y marcadas así en el manual) ─

export type Regla = "cero" | "tema1" | "tema2";

export const REGLAS: Record<Regla, string> = {
  cero: "Prestamos hasta el 60 % del valor de la garantía, tal como figura en sus libros.",
  tema1: "La garantía vale lo que valdría hoy: reexprésala por inflación y presta hasta el 60 % de ese valor.",
  tema2: "La garantía no paga cuotas: presta hasta la mitad de la utilidad neta del año, después del IUE, y nunca más que la caja que el cliente tiene hoy.",
};

export const PORCENTAJE_GARANTIA = 0.6;

// ── Las carpetas ─────────────────────────────────────────────────────────────

/** Tema 1.3 · La máquina que "creció": garantía en libros que hay que reexpresar. */
export interface CarpetaT13 {
  tipo: "t13";
  version: number;
  cliente: string;
  enLibros: number;
  indiceCompra: number;
  indiceHoy: number;
  /** Lo que el cliente dice que vale su garantía. */
  valorDelCliente: number;
  pide: number;
  minimo: number;
}

/** Tema 2.2 · Estado de resultados e IUE, con la garantía tasada que tienta a usar la regla de ayer. */
export interface CarpetaT22 {
  tipo: "t22";
  version: number;
  cliente: string;
  ventas: number;
  costoDeVentas: number;
  gastosDeOperacion: number;
  gastosFinancieros: number;
  caja: number;
  garantiaTasadaHoy: number;
  pide: number;
  minimo: number;
}

/** Tema 2.3 · La cooperativa que ganó y no puede pagar. */
export interface CarpetaT23 {
  tipo: "t23";
  version: number;
  cliente: string;
  patrimonioInicial: number;
  utilidadNeta: number;
  dividendos: number;
  cuentasPorCobrar: number;
  caja: number;
  pide: number;
  minimo: number;
}

export type Carpeta = CarpetaT13 | CarpetaT22 | CarpetaT23;

/** El número del tema que sostiene la decisión, y las tres cifras con el tope bien calculado. */
export function cifrasDe(c: Carpeta): TresCifras {
  switch (c.tipo) {
    case "t13":
      return { pide: c.pide, minimo: c.minimo, tope: PORCENTAJE_GARANTIA * reexpresar(c.enLibros, c.indiceCompra, c.indiceHoy) };
    case "t22": {
      const neta = cascada(c).utilidadNeta;
      return { pide: c.pide, minimo: c.minimo, tope: Math.min(neta / 2, c.caja) };
    }
    case "t23":
      return { pide: c.pide, minimo: c.minimo, tope: Math.min(c.utilidadNeta / 2, c.caja) };
  }
}

export const correctoDe = (c: Carpeta) => montoCorrecto(cifrasDe(c));

// ── Errores típicos del monto ────────────────────────────────────────────────

export type DiagnosticoMonto =
  | "correcto"
  | "regla-de-ayer"
  | "valor-del-cliente"
  | "sin-iue"
  | "iue-sobre-ventas"
  | "solo-la-utilidad"
  | "presto-lo-que-pide"
  | "presto-el-minimo"
  | "rechazo"
  | "otra";

/** El monto que da cada error típico de la carpeta (el primero que coincide gana, por eso el orden). */
export function erroresTipicosMonto(c: Carpeta): [Exclude<DiagnosticoMonto, "correcto" | "presto-lo-que-pide" | "presto-el-minimo" | "rechazo" | "otra">, number][] {
  const con = (tope: number) => montoCorrecto({ pide: c.pide, minimo: c.minimo, tope });
  switch (c.tipo) {
    case "t13":
      return [
        ["regla-de-ayer", con(PORCENTAJE_GARANTIA * c.enLibros)],
        ["valor-del-cliente", con(PORCENTAJE_GARANTIA * c.valorDelCliente)],
      ];
    case "t22": {
      const k = cascada(c);
      return [
        ["regla-de-ayer", con(PORCENTAJE_GARANTIA * c.garantiaTasadaHoy)],
        ["sin-iue", con(Math.min(k.utilidadAntesDeImpuestos / 2, c.caja))],
        ["iue-sobre-ventas", con(Math.min((k.utilidadAntesDeImpuestos - TASA_IUE * c.ventas) / 2, c.caja))],
      ];
    }
    case "t23":
      return [["solo-la-utilidad", con(c.utilidadNeta / 2)]];
  }
}

export function diagnosticoMonto(c: Carpeta, escrito: number): DiagnosticoMonto {
  const ok = correctoDe(c);
  if (escrito === ok) return "correcto";
  const tipico = erroresTipicosMonto(c).find(([, m]) => m === escrito && m !== ok);
  if (tipico) return tipico[0];
  if (escrito === c.pide) return "presto-lo-que-pide";
  if (escrito === c.minimo) return "presto-el-minimo";
  if (escrito === 0) return "rechazo";
  return "otra";
}

// ── Versiones ────────────────────────────────────────────────────────────────

const entre = (azar: Azar, min: number, max: number, paso: number) =>
  min + paso * Math.floor(azar() * (Math.floor(Math.round((max - min) / paso)) + 1));
const abajo = (x: number, a: number) => Math.floor(x / a) * a;
const arriba = (x: number, a: number) => Math.ceil(x / a) * a;
const semilla = (version: number, tipo: string) => {
  let h = Math.imul(version ^ 0xa1ef, 2654435761) >>> 0;
  for (const ch of tipo) h = Math.imul(h ^ ch.charCodeAt(0), 16777619) >>> 0;
  return h;
};

/** Lo que conserva la lección en cualquier carpeta: el mínimo lejos del correcto y cada error típico en otro monto. */
function comunValida(c: Carpeta): boolean {
  const ok = correctoDe(c);
  const minimoLejos = ok === 0 || c.minimo <= 0.9 * ok;
  const erroresDistintos = erroresTipicosMonto(c).every(([d, m]) => m !== ok || (c.tipo === "t13" && d === "valor-del-cliente" && ok === c.pide));
  return c.minimo > 0 && c.minimo < c.pide && minimoLejos && erroresDistintos;
}

export function versionValida(c: Carpeta): boolean {
  if (!comunValida(c)) return false;
  const ok = correctoDe(c);
  switch (c.tipo) {
    case "t13": {
      // sí completo o contraoferta; el cliente siempre exagera
      const hoy = reexpresar(c.enLibros, c.indiceCompra, c.indiceHoy);
      return ok > 0 && c.valorDelCliente > hoy && c.indiceHoy > c.indiceCompra;
    }
    case "t22": {
      const k = cascada(c);
      // siempre contraoferta, para que el choque con la regla de ayer se vea; la regla de ayer da más
      return (
        ok > 0 && ok < c.pide && k.utilidadAntesDeImpuestos > 0 &&
        PORCENTAJE_GARANTIA * c.garantiaTasadaHoy > Math.min(k.utilidadNeta / 2, c.caja) &&
        c.caja > k.utilidadAntesDeImpuestos / 2
      );
    }
    case "t23":
      // la mitad de la utilidad cubre lo que pide; la caja no: cero o contraoferta limitada por la caja
      return c.utilidadNeta / 2 >= c.pide && c.caja < c.pide && ok < c.pide;
  }
}

export const CARPETA_T13_EJEMPLO: CarpetaT13 = {
  tipo: "t13", version: 0, cliente: "Don Julio, carpintería",
  enLibros: 90_000, indiceCompra: 1, indiceHoy: 1.15, valorDelCliente: 130_000, pide: 70_000, minimo: 50_000,
};

export const CARPETA_T22_EJEMPLO: CarpetaT22 = {
  tipo: "t22", version: 0, cliente: "Don Óscar, distribuidora de bebidas",
  ventas: 600_000, costoDeVentas: 390_000, gastosDeOperacion: 130_000, gastosFinancieros: 20_000,
  caja: 40_000, garantiaTasadaHoy: 100_000, pide: 30_000, minimo: 18_000,
};

export const CARPETA_T23_EJEMPLO: CarpetaT23 = {
  tipo: "t23", version: 0, cliente: "Doña Justina, cooperativa de quinua",
  patrimonioInicial: 300_000, utilidadNeta: 120_000, dividendos: 20_000, cuentasPorCobrar: 140_000,
  caja: 9_000, pide: 50_000, minimo: 25_000,
};

function revisarRango(version: number) {
  if (!Number.isInteger(version) || version < 0 || version > VERSION_MAXIMA) throw new Error(`La versión va de 0 a ${VERSION_MAXIMA}`);
}

function sortear<C extends Carpeta>(version: number, tipo: C["tipo"], armar: (azar: Azar) => C): C {
  const azar = azarConSemilla(semilla(version, tipo));
  for (let intento = 0; intento < 400; intento++) {
    const c = armar(azar);
    if (versionValida(c)) return c;
  }
  throw new Error(`No se pudo armar la carpeta ${tipo} de la versión ${version}`);
}

export function carpetaT13(version: number): CarpetaT13 {
  revisarRango(version);
  if (version === 0) return CARPETA_T13_EJEMPLO;
  return sortear(version, "t13", (azar) => {
    const enLibros = entre(azar, 40_000, 150_000, 5_000);
    const indiceHoy = entre(azar, 110, 140, 5) / 100;
    const tope = PORCENTAJE_GARANTIA * enLibros * indiceHoy;
    const siCompleto = azar() < 0.5;
    const pide = siCompleto ? abajo(tope * entre(azar, 60, 95, 5) / 100, 1_000) : arriba(tope * entre(azar, 110, 150, 5) / 100, 1_000);
    const correcto = montoCorrecto({ pide, minimo: 0, tope });
    return {
      tipo: "t13", version, cliente: CARPETA_T13_EJEMPLO.cliente,
      enLibros, indiceCompra: 1, indiceHoy,
      valorDelCliente: arriba(enLibros * indiceHoy * entre(azar, 120, 150, 5) / 100, 1_000),
      pide, minimo: abajo(correcto * entre(azar, 50, 85, 5) / 100, 1_000),
    };
  });
}

export function carpetaT22(version: number): CarpetaT22 {
  revisarRango(version);
  if (version === 0) return CARPETA_T22_EJEMPLO;
  return sortear(version, "t22", (azar) => {
    const ventas = entre(azar, 300_000, 900_000, 50_000);
    const costoDeVentas = abajo(ventas * entre(azar, 55, 70, 1) / 100, 10_000);
    const gastosDeOperacion = abajo(ventas * entre(azar, 10, 20, 1) / 100, 5_000);
    const bruta = ventas - costoDeVentas - gastosDeOperacion;
    // gastos financieros que dejan la utilidad antes de impuestos en múltiplos de 4.000 (números limpios)
    const gastosFinancieros = entre(azar, 2, 7, 1) * 4_000 + (bruta % 4_000);
    const k = cascada({ ventas, costoDeVentas, gastosDeOperacion, gastosFinancieros });
    const mitad = k.utilidadNeta / 2;
    const pide = arriba(mitad * entre(azar, 120, 160, 5) / 100, 1_000);
    return {
      tipo: "t22", version, cliente: CARPETA_T22_EJEMPLO.cliente,
      ventas, costoDeVentas, gastosDeOperacion, gastosFinancieros,
      caja: arriba((k.utilidadAntesDeImpuestos / 2) * entre(azar, 110, 160, 5) / 100, 1_000),
      garantiaTasadaHoy: arriba((pide / PORCENTAJE_GARANTIA) * entre(azar, 110, 150, 5) / 100, 10_000),
      pide, minimo: abajo(mitad * entre(azar, 50, 85, 5) / 100, 1_000),
    };
  });
}

export function carpetaT23(version: number): CarpetaT23 {
  revisarRango(version);
  if (version === 0) return CARPETA_T23_EJEMPLO;
  return sortear(version, "t23", (azar) => {
    const utilidadNeta = entre(azar, 60_000, 200_000, 10_000);
    const pide = abajo((utilidadNeta / 2) * entre(azar, 50, 95, 5) / 100, 1_000);
    const minimo = abajo(pide * entre(azar, 40, 70, 5) / 100, 1_000);
    const cero = azar() < 0.5;
    const caja = cero
      ? abajo(minimo * entre(azar, 20, 80, 5) / 100, 1_000)
      : arriba(minimo / 0.9, 1_000) + abajo(Math.max(0, pide - 1_000 - arriba(minimo / 0.9, 1_000)) * azar(), 1_000);
    return {
      tipo: "t23", version, cliente: CARPETA_T23_EJEMPLO.cliente,
      patrimonioInicial: entre(azar, 100_000, 500_000, 50_000), utilidadNeta,
      dividendos: entre(azar, 0, Math.min(40_000, utilidadNeta / 2), 5_000),
      cuentasPorCobrar: arriba(utilidadNeta * entre(azar, 80, 130, 5) / 100, 1_000),
      caja, pide, minimo,
    };
  });
}

/** La jornada de la versión mínima (Tema 1.3 y Tema 2): una carpeta de cada tipo, en orden. */
export function jornadaMinima(version: number): Carpeta[] {
  return [carpetaT13(version), carpetaT22(version), carpetaT23(version)];
}

export const patrimonioFinalDe = (c: CarpetaT23) => patrimonioFinal(c.patrimonioInicial, c.utilidadNeta, c.dividendos);
