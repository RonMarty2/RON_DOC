/**
 * El registro del Tema 1 (sin puntaje): de lo que hizo el alumno en cada caso salen el estado, la rama de la revelación, la
 * clase de registro, los códigos, los hábitos, los tubos caso por caso y la plaza fija (bloque 3 del motor).
 * Fuente: 02-bucle-y-mecanicas.md secc. 6, 8 y 12; 04-aprendizaje.md T1.5.
 *
 * Se guarda SOLO lo que hizo el alumno (la «entrada» de cada caso, la misma que reciben las funciones de `respuestas.ts`);
 * todo lo demás se recalcula con la versión. Así, en la página del docente, un registro retocado a mano no puede decir que
 * algo estaba bien.
 *
 * ── Decisiones por ambigüedad ──────────────────────────────────────────────────────────────────────────────
 *  1. La partida guarda un evento `entrada` por caso sellado (se agrega a `EventoT1`, no reemplaza a ninguno). Si un caso
 *     tiene dos eventos `entrada`, vale el último (no debería pasar: «después no hay vuelta»).
 *  2. Paso 1: «descubrió solo» es haber abierto, con sus 3 fichas, uno de los 2 papeles con sueño. `ayudado` (ficha regalada
 *     o el papel que abre el personaje de reserva) no cambia eso: solo queda anotado.
 *  3. Los tubos se recorren en el ORDEN de la versión, con tope al cierre de cada caso; un caso que falta corta el recorrido
 *     (los casos posteriores quedan sin tubos, y no hay plaza fija hasta tener los 7).
 *  4. Lo que este archivo NO calcula todavía (necesita eventos que emite la pantalla, que aún no existe): el escalón en que
 *     acertó (práctica abierta), el cambio de opinión de un caso al siguiente y el lector del caso 7 antes y después.
 */

import type { Habito } from "./efectos-t1";
import { aplicarEfecto, fichasDelCaso, medidoresIniciales, metaAlcanzada } from "./medidores";
import type { PaqueteT1 } from "./cifras";
import { cierreDe, claseDe, ramaDe, type ClaseDeRegistro, type EstadoT1, type IdDeCierre } from "./ramas-t1";
import { FICHAS_CASTIGO, type EventoT1, type Medidores, type NumeroDeCaso } from "./reglas-t1";
import {
  habitosCumplidos,
  reglaDelTurno2,
  resolverCaso2,
  resolverCaso3,
  resolverCaso4,
  resolverCaso5,
  resolverCaso6,
  resolverCaso7,
  resolverCaso8,
  resolverPaso1,
  type EntradaCaso2,
  type EntradaCaso3,
  type EntradaCaso4,
  type EntradaCaso5,
  type EntradaCaso6,
  type EntradaCaso7,
  type EntradaCaso8,
  type ResultadoCaso,
} from "./respuestas";

// ── Lo que hizo el alumno ────────────────────────────────────────────────────

export interface EntradaPaso1Registro {
  /** Los papeles que abrió con sus 3 fichas. */
  abiertos: readonly string[];
  /** Recibió la ficha regalada o el papel se lo abrió el personaje de reserva. */
  ayudado?: boolean;
}

/** La entrada de cada caso: 1 = paso 1; 2 a 8 = lo que reciben las funciones de `respuestas.ts`. */
export interface JugadaT1 {
  1?: EntradaPaso1Registro;
  2?: EntradaCaso2;
  3?: EntradaCaso3;
  4?: EntradaCaso4;
  5?: EntradaCaso5;
  6?: EntradaCaso6;
  7?: EntradaCaso7;
  8?: EntradaCaso8;
}

/** El evento que guarda la partida al sellar un caso. */
export type EventoEntrada = { [K in NumeroDeCaso]: { tipo: "entrada"; caso: K; entrada: NonNullable<JugadaT1[K]> } }[NumeroDeCaso];

/** Arma la jugada con los eventos `entrada` de una partida (decisión 1). */
export function jugadaDeEventos(eventos: readonly EventoT1[]): JugadaT1 {
  const j: Record<number, unknown> = {};
  for (const e of eventos) if (e.tipo === "entrada") j[e.caso] = e.entrada;
  return j as JugadaT1;
}

// ── Del caso jugado al estado ────────────────────────────────────────────────

export interface CasoResuelto {
  estado: EstadoT1;
  /** null en el paso 1 (no tiene tubos ni códigos). */
  resultado: ResultadoCaso | null;
  /** Sobre de la jefa que corresponde (null si no hay). */
  sobre: string | null;
}

/** Resuelve un caso con la entrada del alumno y arma su estado abstracto (el que usan `ramaDe` y `claseDe`). */
export function resolverCaso<K extends NumeroDeCaso>(p: PaqueteT1, caso: K, entrada: NonNullable<JugadaT1[K]>): CasoResuelto {
  switch (caso) {
    case 1: {
      const e = entrada as EntradaPaso1Registro;
      const r = resolverPaso1(p, { abiertos: e.abiertos });
      return { estado: { ficha: 1, abrePropio: r.abrioSueno }, resultado: null, sobre: r.sobre };
    }
    case 2: {
      const e = entrada as EntradaCaso2;
      const r = resolverCaso2(p, e);
      const dec = e.decision === "frase" ? (e.piezaClave ? "frase_con" : "frase_sin") : e.decision;
      return conResultado({ ficha: 2, tipo: r.detalle.tipo as "P" | "B", clave: !!r.detalle.claveAbierta, dec }, r);
    }
    case 3: {
      const e = entrada as EntradaCaso3;
      const r = resolverCaso3(p, e);
      return conResultado(
        {
          ficha: 3,
          tipo: p.version.tipos[3],
          clave: !!r.detalle.claveAbierta,
          dec: e.decision,
          nivel: e.decision === "rango" ? (r.detalle.nivel as "ok") : null,
          pieza: e.decision === "rango" && !!r.detalle.pieza,
          mm3: !!r.detalle.razonoBienNoCubrio,
        },
        r,
      );
    }
    case 4: {
      const e = entrada as EntradaCaso4;
      const r = resolverCaso4(p, e);
      return conResultado({ ficha: 4, bueno: r.detalle.bueno as "A" | "B", elige: e.eleccion, clave: !!r.detalle.claveAbierta }, r);
    }
    case 5: {
      const e = entrada as EntradaCaso5;
      const r = resolverCaso5(p, e);
      const t2 = reglaDelTurno2(p, e);
      return conResultado({ ficha: 5, op: e.opcion, regla: t2.regla, req: t2.req, cero: t2.cero, rhoPos: t2.cero && t2.rho > 10 }, r);
    }
    case 6: {
      const e = entrada as EntradaCaso6;
      const r = resolverCaso6(p, e);
      const redacta = e.decision === "redactar";
      return conResultado(
        {
          ficha: 6,
          tipo: p.version.tipos[6],
          clave: !!r.detalle.claveAbierta,
          dec: e.decision,
          ext: redacta ? (e.extension ?? null) : null,
          ncorr: redacta ? !!r.detalle.nCorrecto : true,
        },
        r,
      );
    }
    case 7: {
      const e = entrada as EntradaCaso7;
      const r = resolverCaso7(p, e);
      return conResultado(
        { ficha: 7, tipo: p.version.tipos[7] as "P" | "B", dec: e.decision === "redisenar" ? "redis" : e.decision, xok: r.detalle.xCorrecto !== false },
        r,
      );
    }
    case 8: {
      const e = entrada as EntradaCaso8;
      const r = resolverCaso8(p, e);
      return conResultado({ ficha: 8, real: p.version.decisionReal, dec: e.decision, e: r.detalle.clavesEnMesa as 0 | 1 | 2, beto: p.version.propuestaDeBeto }, r);
    }
    default:
      throw new Error(`Caso desconocido: ${caso}`);
  }
}

const conResultado = (estado: EstadoT1, resultado: ResultadoCaso): CasoResuelto => ({ estado, resultado, sobre: resultado.sobre });

// ── El resumen de la partida ─────────────────────────────────────────────────

export interface FilaDeIdea {
  /** La idea 1 a 8 (la idea n se juega en el caso n). */
  idea: NumeroDeCaso;
  /** En qué lugar lo jugó (1 a 8), según el orden de su versión. */
  lugar: number;
  estado: EstadoT1;
  rama: string;
  cierre: IdDeCierre;
  clase: ClaseDeRegistro;
  codigos: string[];
  sobre: string | null;
  /** Los tubos al entrar y al cerrar el caso (null en el paso 1, o si falta un caso anterior). */
  antes: Medidores | null;
  despues: Medidores | null;
  /** Fichas de tiempo que tuvo en el caso (null si no se sabe). */
  fichas: number | null;
}

export interface ResumenT1 {
  /** Una fila por idea jugada, en el orden en que la jugó. */
  ideas: FilaDeIdea[];
  /** Los hábitos cumplidos (misma clase de error en dos casos, o dos veces en el caso 5). */
  habitos: Habito[];
  /** Los tubos tras el último caso con tubos resuelto en orden. */
  medidores: Medidores;
  /** Jugó los 8. */
  completo: boolean;
  /** Plaza fija (65/65): solo se sabe con los 8 jugados. */
  plazaFija: boolean | null;
  /** En cuántos casos jugó con 2 fichas por tener un tubo en 25 o menos. */
  casosConCastigo: number;
}

/** Todo lo que el docente lee de una partida, recalculado desde lo que hizo el alumno. */
export function resumenT1(p: PaqueteT1, jugada: JugadaT1): ResumenT1 {
  let m: Medidores | null = medidoresIniciales();
  let ultimo = medidoresIniciales();
  let casosConCastigo = 0;
  const ideas: FilaDeIdea[] = [];
  const resultados: ResultadoCaso[] = [];
  p.version.orden.forEach((caso, i) => {
    const entrada = jugada[caso];
    if (entrada === undefined) {
      if (caso !== 1) m = null; // decisión 3: sin este caso no se sabe con qué tubos entra el siguiente
      return;
    }
    const r = resolverCaso(p, caso, entrada);
    let antes: Medidores | null = null;
    let despues: Medidores | null = null;
    let fichas: number | null = null;
    if (r.resultado) {
      resultados.push(r.resultado);
      if (m) {
        antes = m;
        fichas = fichasDelCaso(m);
        if (fichas === FICHAS_CASTIGO) casosConCastigo++;
        despues = aplicarEfecto(m, r.resultado.efecto);
        m = despues;
        ultimo = despues;
      }
    }
    ideas.push({
      idea: caso,
      lugar: i + 1,
      estado: r.estado,
      rama: ramaDe(r.estado),
      cierre: cierreDe(ramaDe(r.estado)),
      clase: claseDe(r.estado),
      codigos: r.resultado?.codigos ?? [],
      sobre: r.sobre,
      antes,
      despues,
      fichas,
    });
  });
  const completo = ideas.length === p.version.orden.length;
  return { ideas, habitos: habitosCumplidos(resultados), medidores: ultimo, completo, plazaFija: completo ? metaAlcanzada(ultimo) : null, casosConCastigo };
}

/** La línea del docente: 8 casillas con la clase de cada idea (null = no la jugó), los hábitos y la plaza fija. */
export function lineaDelDocente(r: ResumenT1): { casillas: Array<ClaseDeRegistro | null>; habitos: Habito[]; plazaFija: boolean | null } {
  const casillas: Array<ClaseDeRegistro | null> = Array.from({ length: 8 }, () => null);
  for (const f of r.ideas) casillas[f.idea - 1] = f.clase;
  return { casillas, habitos: r.habitos, plazaFija: r.plazaFija };
}

/** Los casos con tubos que la jugada todavía no tiene, en el orden de la versión. */
export const casosPendientes = (p: PaqueteT1, jugada: JugadaT1): NumeroDeCaso[] => p.version.orden.filter((c) => jugada[c] === undefined);
