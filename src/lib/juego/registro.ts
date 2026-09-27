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
  anotarEn,
  borrarPartidaDe,
  guardarPartidaDe,
  leerPartidaDe,
  partidaNuevaDe,
  type Almacen,
  type ConHora,
  type Escena,
  type PartidaDe,
} from "./partida";
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
  // Sin `paso` ni `escalon` es el formato del 25-09 (el alumno pidió la ayuda del socio en la
  // capacidad): se sigue leyendo igual (regla 4 de «Estructura»).
  | { tipo: "ayuda"; paso?: "capacidad" | "compra" | "recuperacion"; escalon?: "concreta" | "leer" }
  | { tipo: "decision"; opcion: Opcion }
  | { tipo: "compra"; opcion: "envasadora" | "tanque"; valor: number }
  | { tipo: "reintento" }
  | { tipo: "recuperacion"; valor: number }
  | { tipo: "argumento"; texto: string };

export type Entrada = ConHora<Evento>;

/** La escena de la planta para la pieza común de partidas (partida.ts). */
export const ESCENA_PLANTA: Escena<"proyectos", "planta"> = {
  isla: "proyectos",
  escena: "planta",
  versionValida: (v) => {
    try {
      datosDeVersion(v);
      return true;
    } catch {
      return false;
    }
  },
};

export type Partida = PartidaDe<Evento, "proyectos", "planta">;

export function partidaNueva(version: number): Partida {
  return partidaNuevaDe<Evento, "proyectos", "planta">(ESCENA_PLANTA, version);
}

export function anotar(p: Partida, e: Evento, hora = new Date()): Partida {
  return anotarEn(p, e, hora);
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
    case "ayuda": {
      const paso = { capacidad: "la capacidad", compra: "las botellas con la compra", recuperacion: "la recuperación" }[e.paso ?? "capacidad"];
      if (!e.escalon) return { texto: "Pidió la explicación del socio" };
      return { texto: e.escalon === "leer" ? `Se lo mandó a leer el dossier (${paso})` : `Recibió la pista concreta del socio (${paso})` };
    }
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

// ── Guardado en el navegador (la pieza común, con la misma clave de siempre) ───

/** La partida guardada de esa versión, o null si no hay o no se puede leer. */
export function leerPartida(version: number, a?: Almacen | null): Partida | null {
  return a === undefined ? leerPartidaDe<Evento, "proyectos", "planta">(ESCENA_PLANTA, version) : leerPartidaDe<Evento, "proyectos", "planta">(ESCENA_PLANTA, version, a);
}

export function guardarPartida(p: Partida, a?: Almacen | null) {
  if (a === undefined) guardarPartidaDe(p);
  else guardarPartidaDe(p, a);
}

export function borrarPartida(version: number, a?: Almacen | null) {
  if (a === undefined) borrarPartidaDe("proyectos", "planta", version);
  else borrarPartidaDe("proyectos", "planta", version, a);
}
