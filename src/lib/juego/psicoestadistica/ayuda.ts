/**
 * La escalera de ayuda del Tema 1, que NUNCA bloquea (bloque 3 del motor): el sobre de la jefa (escalón 2) y el expediente
 * cerrado de otro año (escalón 3). Fuente: 02-bucle-y-mecanicas.md secc. 8; 04-aprendizaje.md T1.2; 05 NT1.7 y NT1.8.
 * Es una pieza propia: no usa `../escalera.ts` (la de las otras islas cuenta fallos y manda a leer; aquí nadie queda atrapado
 * en un caso y ningún escalón manda a leer nada).
 *
 * El escalón 1 (la consecuencia: tubos y reacción) no es de este archivo; el 4 (otros números) es `semillaDePractica` de cifras.ts.
 *
 * ── Decisiones por ambigüedad ──────────────────────────────────────────────────────────────────────────────
 *  1. Expediente en la partida oficial (8.3): solo al cierre del caso en que un hábito se CUMPLE por primera vez. Si en un
 *     mismo cierre se cumplen dos, se muestra el del primero (H1 antes que H2…). Se apaga con `EXPEDIENTES_EN_OFICIAL`.
 *  2. Cuál de los dos expedientes del hábito: sorteo por alumno y caso. El bucle dice «k = 10 + caso», pero esos rubros ya
 *     son de los nombres de la versión (12 colegio, 13 fuentes, 15 vecino…): aquí se usa k = 40 + caso para no repetirlos.
 *  3. Expediente en la práctica abierta: después de cualquier error; el hábito es el primero del código del sobre (o del
 *     primer código, si ninguno tiene sobre).
 */

import { CODIGOS, type Habito } from "./efectos-t1";
import type { PaqueteT1 } from "./cifras";
import { resolverCaso, type JugadaT1 } from "./registro-t1";
import type { NumeroDeCaso } from "./reglas-t1";
import { habitosCumplidos, type ResultadoCaso } from "./respuestas";
import { GUION_T1 } from "./revelacion-t1";
import { azarDeRubro } from "./version";

/** 8.3: los expedientes aparecen también en la partida oficial. Ronald lo apaga cambiando este valor. */
export const EXPEDIENTES_EN_OFICIAL = true;
export const K_EXPEDIENTE = (caso: NumeroDeCaso): number => 40 + caso;

export interface Sobre {
  id: string;
  texto: string;
}
export interface Expediente {
  id: string;
  habito: Habito;
  titulo: string;
  texto: string;
}

/** El texto de un sobre de la jefa. Lanza si el id no tiene texto (E5e y E8d solo se registran). */
export function sobre(id: string): Sobre {
  const texto = GUION_T1.sobres[id];
  if (!texto) throw new Error(`Sobre sin texto: ${id}`);
  return { id, texto };
}

/** Uno de los dos expedientes del hábito, sorteado por alumno y caso (decisión 2). */
export function expedienteDe(semilla: number, caso: NumeroDeCaso, habito: Habito): Expediente {
  const id = `R-${habito}${azarDeRubro(semilla, K_EXPEDIENTE(caso))() < 0.5 ? "a" : "b"}`;
  const e = GUION_T1.expedientes[id];
  if (!e || e.habito !== habito) throw new Error(`Expediente desconocido: ${id}`);
  return { id, habito, titulo: e.titulo, texto: e.texto };
}

export interface AyudaAlCierre {
  /** Escalón 2: el sobre que cae sobre la mesa antes de «Siguiente caso» (null si no hay). */
  sobre: Sobre | null;
  /** Escalón 3: la pestaña del archivador (null si no aparece). */
  expediente: Expediente | null;
  /** 8.5: ningún escalón deshabilita «Siguiente caso». */
  puedeAvanzar: true;
}

const ORDEN_HABITOS: readonly Habito[] = ["H1", "H2", "H3", "H4"];

/** La ayuda que se ofrece al cerrar `caso` en la partida oficial. La jugada debe traer ese caso y los anteriores. */
export function ayudaAlCierre(p: PaqueteT1, jugada: JugadaT1, caso: NumeroDeCaso): AyudaAlCierre {
  const antes: ResultadoCaso[] = [];
  for (const c of p.version.orden) {
    const entrada = jugada[c];
    if (entrada === undefined) {
      if (c === caso) throw new Error(`El caso ${caso} todavía no se jugó`);
      continue;
    }
    const r = resolverCaso(p, c, entrada);
    if (c === caso) {
      const s = r.sobre ? sobre(r.sobre) : null;
      let expediente: Expediente | null = null;
      if (EXPEDIENTES_EN_OFICIAL && r.resultado) {
        const ya = habitosCumplidos(antes);
        const nuevo = ORDEN_HABITOS.find((h) => !ya.includes(h) && habitosCumplidos([...antes, r.resultado!]).includes(h));
        if (nuevo) expediente = expedienteDe(p.version.semilla, caso, nuevo);
      }
      return { sobre: s, expediente, puedeAvanzar: true };
    }
    if (r.resultado) antes.push(r.resultado);
  }
  throw new Error(`El caso ${caso} no está en el orden de la versión`);
}

/** La ayuda en la práctica abierta de un solo caso: el expediente aparece después de cualquier error (decisión 3). */
export function ayudaEnPractica(p: PaqueteT1, caso: NumeroDeCaso, resultado: ResultadoCaso | null, sobreId: string | null): AyudaAlCierre {
  const s = sobreId ? sobre(sobreId) : null;
  const codigo = resultado ? (resultado.codigoSobre ?? resultado.codigos[0] ?? null) : null;
  const habito = codigo ? CODIGOS[codigo].habitos[0] : null;
  return { sobre: s, expediente: habito ? expedienteDe(p.version.semilla, caso, habito) : null, puedeAvanzar: true };
}
