/**
 * Los textos de la pantalla del Paso 1 y del Caso 2 del Tema 1 (lo que dicen la jefa, Dani, la madre y los botones).
 *
 * Fuente: `docs/juego/gdd/05-mundo-y-narrativa.md`, NT1.5 y NT1.6 (el cuerpo de la historia) y NT1.12 (la orientación en
 * pantalla, v16). Los textos de NT1.12 salen de `orientacion-t1.json`, que genera `scripts-t1/exportar_orientacion_t1.py`:
 * no se escriben a mano. Cada cadena de este archivo tiene que aparecer en la narrativa tal cual (salvo los huecos `{...}`,
 * que se llenan aquí con las cifras de la versión): lo comprueba `guion-pantalla-t1.test.ts`.
 *
 * Los papeles, las piezas de la frase, los sobres y las cartas del final NO están aquí: salen de `papeles-t1`, `ayuda` y
 * `revelacion-t1`.
 */

import orientacionJson from "./orientacion-t1.json";
import type { PaqueteT1 } from "./cifras";
import { numero } from "./papeles-t1";
import type { ResultadoCaso } from "./respuestas";

const TEXTOS = (orientacionJson as unknown as { textos: Record<string, string> }).textos;

/** Un texto de NT1.12 con sus huecos llenos. Lanza si el id no existe o si queda un hueco sin llenar (nunca se muestra un «{algo}»). */
export function T(id: string, huecos: Record<string, string | number> = {}): string {
  const base = TEXTOS[id];
  if (base === undefined) throw new Error(`Texto de orientación inexistente: ${id}`);
  const lleno = base.replace(/\{(\w+)\}/g, (_, k: string) => {
    if (!(k in huecos)) throw new Error(`${id}: falta el hueco {${k}}`);
    return String(huecos[k]);
  });
  return lleno;
}

export const TITULO = { principal: "ORIENTACIÓN · Mesa de verificación", pequeno: "Víspera del consejo", prueba: T("B-titulo-1") } as const;

export const BIENVENIDA = [T("A1"), T("A2"), T("B-bienv-1")] as const;

export const JEFA_LLEGADA = [T("A3")] as const;

export const ENCARGO = [
  'El director dijo en el pasillo: "los estudiantes duermen poco".',
  "¿El colegio tiene algún dato sobre cuánto duermen los de 4.º? Lo necesito para el consejo de mañana.",
] as const;

export const HOJA = {
  titulo: "Para empezar",
  jefa: T("A4"),
  preguntas: ["¿Cuántas horas dormiste anoche?", "¿Cuántos minutos de celular usaste antes de dormir?", "¿Cómo te fue ayer, de 0 a 100?"],
  botonDani: (p: PaqueteT1) => T("A5", { dani: p.version.textos.dani }),
  presentaDani: (p: PaqueteT1) => T("B-hoja-1", { dani: p.version.textos.dani }),
  botonPropias: "Poner las mías",
} as const;

export const daniResponde = (p: PaqueteT1): string[] => {
  const d = p.cifras.paso1.dani;
  return [`Yo respondo, si quieres. Anoche fueron ${numero(d.horas)} horas de sueño. Celular, ${numero(d.minutos)} minutos antes. Ayer me fue... ${numero(d.animo)}.`, "...perdón. ¿Dónde estaba?"];
};

export const ARCHIVO = {
  jefa: T("A6"),
  consigna: T("B-arch1-1"),
  rotuloFichas: T("A7"),
  jefaSeguro: "¿Seguro que ahí no había nada?",
  daniAbre: "Mira este...",
} as const;

export const ASOMBRO = {
  titulo: T("A8"),
  filaHoy: "Tú, hoy",
  filaDani: (p: PaqueteT1) => p.version.textos.dani,
  filaArchivo: (fecha: string) => `Archivo, ${fecha}`,
  /** La jefa, en este orden: la línea original (con la pose de pulgar arriba) y las dos de orientación. */
  jefa: ["Esa pregunta ya se hizo. Hace un año. Nadie la leyó.", T("B-asom-1"), T("B-asom-2")],
} as const;

export const CIERRE_PASO1 = {
  /** En este orden: la jefa cierra el paso, presenta los dos medidores (cuatro frases), presenta a Horizonte y a Beto. */
  jefa: [
    "A partir de hoy firma el departamento, y firmas tú.",
    T("B-cierre1-1"),
    T("B-cierre1-2"),
    T("B-cierre1-3"),
    T("B-cierre1-4"),
    T("A10"),
    T("B-cierre1-6"),
  ],
  beto: "Buenas noches, doc. A ojo se ve que hoy trabajas hasta tarde.",
} as const;

/** Lo que se lee bajo cada tubo (B-cierre1-5). */
export const ROTULOS_TUBOS = { c: "Que te crean", voz: "Que te consulten" } as const;

// ── Caso 2 ───────────────────────────────────────────────────────────────────

export const CASO2 = {
  titulo: "El colegio sin denuncias",
  informe: (p: PaqueteT1) => `CERO DENUNCIAS: EL COLEGIO ${p.cifras.colegios[2].toUpperCase()} ES SEGURO`,
  firmaInforme: "Dirección, para el consejo",
  /** La jefa abre el caso en dos globos: qué se pide y qué hay que comprobar. */
  jefa: [T("A11"), T("B-entr2-1")],
} as const;

export const ARCHIVO2 = {
  consigna: T("B-arch2-1"),
  corchoVacio: "Los papeles que abras se clavan aquí, por fecha.",
  corchoMirar: T("B-arch2-2"),
  graficaMirar: T("B-arch2-3"),
  explicaTal: T("B-arch2-4"),
  explicaFrase: T("B-arch2-5"),
  explicaFrenar: T("B-arch2-6"),
  sinPapeles: T("B-arch2-7"),
} as const;

export const FRASE = { instruccion: T("A12"), cadaPapel: T("B-frase-1"), boton: T("A13") } as const;

export const BOTONES_SELLO = { tal: "Firmar tal cual", frase: "Redactar la frase", frenar: "Frenar", confirmaTitulo: "¿Firmar? Después no hay vuelta.", si: "Sí, al consejo", no: "Todavía no" } as const;

/** Aviso en la confirmación cuando no se abrió ningún papel (no bloquea nada: la fila R2.1.sin existe). */
export const SIN_PAPELES_AL_FIRMAR = T("B-conf-1");

export type PoseJefa = "pulgar" | "brazos" | "cabeza";

export interface Reaccion {
  /** Quién habla: la jefa, la madre por teléfono, el director por nota, o nadie (una línea de narración). */
  quien: "jefa" | "madre" | "director" | "narracion";
  texto: string;
}
export interface ReaccionCaso2 {
  lineas: Reaccion[];
  pose: PoseJefa;
  /** Aparece la tarjeta con la frase en el panel de acuerdos (solo cuando la frase se aceptó). */
  tarjetaDeAcuerdo: boolean;
}

/** Qué hizo un medidor con la fila que pagó: «sube N», «baja N» o «no cambia» (B-reac-6). */
export const cambioDe = (n: number): string => (n > 0 ? `sube ${n}` : n < 0 ? `baja ${-n}` : "no cambia");

/** B-reac-6: lo que movió cada medidor con lo que sellaste. */
export const cambioDeMedidores = (r: ResultadoCaso): string => T("B-reac-6", { dC: cambioDe(r.efecto.c), dV: cambioDe(r.efecto.voz) });

/** Por qué se movieron los medidores: una línea de la jefa según la fila de pago (B-reac-1 a B-reac-5). */
function porQueSeMovieron(tipo: string, fila: string): string {
  if (fila === "R2.1") return tipo === "P" ? T("B-reac-1") : T("B-reac-2");
  if (fila === "R2.1.sin") return T("B-reac-2");
  if (fila === "R2.2") return T("B-reac-3");
  if (fila === "R2.3") return T("B-reac-4");
  return T("B-reac-5");
}

/** La reacción a lo que se firmó, según la fila de pago que aplicó (tabla de reacciones de NT1.6, caso 2, y B-reac-1 a B-reac-5). */
export function reaccionCaso2(p: PaqueteT1, r: ResultadoCaso): ReaccionCaso2 {
  const tipo = p.version.tipos[2];
  const fila = r.filas[0];
  const colegio = p.cifras.colegios[2];
  const mes = p.cifras.caso2.mes;
  const jefa = (texto: string): Reaccion => ({ quien: "jefa", texto });
  const porQue = jefa(porQueSeMovieron(tipo, fila));
  if (tipo === "B") {
    if (fila === "R2.1") return { lineas: [jefa("Va al informe. El cero se sostenía."), porQue], pose: "pulgar", tarjetaDeAcuerdo: false };
    if (fila === "R2.1.sin") return { lineas: [jefa("Salió bien. ¿En qué papel te apoyabas?"), porQue], pose: "brazos", tarjetaDeAcuerdo: false };
    if (fila === "R2.2")
      return {
        lineas: [
          { quien: "narracion", texto: "El director presenta el cero al distrito sin tu firma, y era cierto." },
          jefa("Dudaste de un cero que se sostenía. Hoy no te consultan."),
          porQue,
        ],
        pose: "brazos",
        tarjetaDeAcuerdo: false,
      };
    if (fila === "R2.3") return { lineas: [jefa("Va al informe. Dices lo que se sabe: el registro no cambió."), porQue], pose: "pulgar", tarjetaDeAcuerdo: true };
    return { lineas: [jefa("Prudente. Y el cero se sostenía."), porQue], pose: "brazos", tarjetaDeAcuerdo: false };
  }
  if (fila === "R2.1")
    return {
      lineas: [
        { quien: "madre", texto: `Soy la mamá de un estudiante de ${colegio}. A mi hijo lo empujaron y no se podía denunciar.` },
        { quien: "madre", texto: "Dicen que el colegio es seguro." },
        { quien: "madre", texto: `¿Y antes de ${mes}, cuántas denuncias había?` },
        porQue,
      ],
      pose: "cabeza",
      tarjetaDeAcuerdo: false,
    };
  if (fila === "R2.2")
    return {
      lineas: [
        { quien: "narracion", texto: "El director presenta «Colegio seguro» al distrito sin tu informe; una semana después tiene que corregirlo." },
        jefa("No firmamos. Se nota que esperaste. Hoy no te consultan."),
        porQue,
      ],
      pose: "brazos",
      tarjetaDeAcuerdo: false,
    };
  if (fila === "R2.3") return { lineas: [jefa("Va al informe."), porQue], pose: "pulgar", tarjetaDeAcuerdo: true };
  return {
    lineas: [{ quien: "director", texto: "Nuestras cifras son correctas." }, jefa("Sonaba prudente. No tocaba nada."), porQue],
    pose: "brazos",
    tarjetaDeAcuerdo: false,
  };
}

/** El cierre de la prueba: los valores finales y qué papel decidía el informe (B-fin-1 a B-fin-3). */
export function cierreDeLaPrueba(c: number, voz: number, papelClave: string, abrioClave: boolean): string[] {
  return [T("B-fin-1", { c, voz }), abrioClave ? T("B-fin-2", { papelClave }) : T("B-fin-3", { papelClave })];
}

/** Lo que se dice al cerrar la prueba (no viene de la narrativa: es el aviso de que el resto del juego aún no está). */
export const FIN_DE_LA_PRUEBA = {
  titulo: "Aquí termina esta prueba",
  texto: "Jugaste el primer encargo y el primer caso. Los otros seis casos y las cartas del final todavía no están en esta versión.",
} as const;
