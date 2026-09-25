/**
 * Registro de una partida: cada número que escribió el alumno, cada ayuda que pidió, cada
 * decisión y su argumento, en orden. Es lo que ve el docente. Guarda sólo lo que hizo el alumno;
 * el diagnóstico y los textos se recalculan con la versión (así, en la página del docente, un
 * registro retocado a mano no puede mentir sobre si el número estaba bien).
 *
 * Mientras no haya sesión con Supabase, se guarda en el navegador (como el progreso de las láminas).
 */

import { bs } from "../formato";
import {
  datosDeVersion,
  revisarCapacidad,
  revisarCapacidadConCompra,
  revisarRecuperacion,
  type DatosPlanta,
  type Opcion,
} from "./planta";

export type Evento =
  | { tipo: "capacidad"; valor: number }
  | { tipo: "ayuda" }
  | { tipo: "decision"; opcion: Opcion }
  | { tipo: "compra"; opcion: "envasadora" | "tanque"; valor: number }
  | { tipo: "reintento" }
  | { tipo: "recuperacion"; valor: number }
  | { tipo: "argumento"; texto: string };

export type Entrada = Evento & { hora: string };

export interface Partida {
  isla: "proyectos";
  escena: "planta";
  version: number;
  eventos: Entrada[];
  terminada: boolean;
}

export function partidaNueva(version: number): Partida {
  return { isla: "proyectos", escena: "planta", version, eventos: [], terminada: false };
}

export function anotar(p: Partida, e: Evento, hora = new Date()): Partida {
  return { ...p, eventos: [...p.eventos, { ...e, hora: hora.toISOString() }] };
}

const NOMBRE_OPCION: Record<Opcion, string> = {
  envasadora: "A · envasadora automática",
  tanque: "B · tercer tanque",
  nada: "C · no invertir",
};

/**
 * Una línea legible por evento. Si el número estaba bien se recalcula siempre; el nombre del
 * error típico (para el docente) sólo se agrega con `diagnostico`.
 */
export function describir(d: DatosPlanta, e: Evento, { diagnostico = false } = {}): { texto: string; bien?: boolean } {
  const cual = (dx: string) => (dx === "correcta" || !diagnostico ? "" : ` (${dx})`);
  switch (e.tipo) {
    case "capacidad": {
      const dx = revisarCapacidad(d, e.valor);
      return { texto: `Capacidad de hoy: escribió ${bs(e.valor)} botellas${cual(dx)}`, bien: dx === "correcta" };
    }
    case "ayuda":
      return { texto: "Pidió la explicación del socio" };
    case "decision":
      return { texto: `Decidió: ${NOMBRE_OPCION[e.opcion]}`, bien: e.opcion === "tanque" };
    case "compra": {
      const dx = revisarCapacidadConCompra(d, e.opcion, e.valor);
      return { texto: `Botellas con la compra: escribió ${bs(e.valor)}${cual(dx)}`, bien: dx === "correcta" };
    }
    case "reintento":
      return { texto: "Volvió a decidir" };
    case "recuperacion": {
      const dx = revisarRecuperacion(d, e.valor);
      return { texto: `Recuperación del tanque: escribió ${bs(e.valor, 1)} meses${cual(dx)}`, bien: dx === "correcta" };
    }
    case "argumento":
      return { texto: `Argumento para la defensa: «${e.texto}»` };
  }
}

// ── Guardado en el navegador ─────────────────────────────────────────────────

type Almacen = Pick<Storage, "getItem" | "setItem" | "removeItem">;

const clave = (version: number) => `ron-doc-juego:proyectos:planta:${version}`;

function almacen(): Almacen | null {
  try {
    return typeof window === "undefined" ? null : window.localStorage;
  } catch {
    return null;
  }
}

/** La partida guardada de esa versión, o null si no hay o no se puede leer. */
export function leerPartida(version: number, a: Almacen | null = almacen()): Partida | null {
  try {
    const crudo = a?.getItem(clave(version));
    if (!crudo) return null;
    const p = JSON.parse(crudo) as Partida;
    if (p?.isla !== "proyectos" || p.escena !== "planta" || p.version !== version || !Array.isArray(p.eventos)) return null;
    datosDeVersion(p.version);
    return p;
  } catch {
    return null;
  }
}

export function guardarPartida(p: Partida, a: Almacen | null = almacen()) {
  try {
    a?.setItem(clave(p.version), JSON.stringify(p));
  } catch {
    // sin lugar o bloqueado: el juego sigue, sólo que no se recuerda
  }
}

export function borrarPartida(version: number, a: Almacen | null = almacen()) {
  try {
    a?.removeItem(clave(version));
  } catch {
    // ídem
  }
}
