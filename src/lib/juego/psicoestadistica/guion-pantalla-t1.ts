/**
 * Los textos de la pantalla del Paso 1 y del Caso 2 del Tema 1 (lo que dicen la jefa, Dani, la madre y los botones).
 *
 * Fuente: `docs/juego/gdd/05-mundo-y-narrativa.md`, NT1.5 y NT1.6 (caso 2). Cada cadena de este archivo tiene que aparecer
 * ahí tal cual (salvo los huecos `{...}`, que se llenan aquí con las cifras de la versión): lo comprueba
 * `guion-pantalla-t1.test.ts`. Si la narrativa cambia, el test avisa y se corrige este archivo.
 *
 * Los papeles, las piezas de la frase, los sobres y las cartas del final NO están aquí: salen de `papeles-t1`, `ayuda` y
 * `revelacion-t1`.
 */

import type { PaqueteT1 } from "./cifras";
import { numero } from "./papeles-t1";
import type { ResultadoCaso } from "./respuestas";

export const TITULO = { principal: "ORIENTACIÓN · Mesa de verificación", pequeno: "Víspera del consejo" } as const;

export const BIENVENIDA = [
  "Este es el Departamento de Orientación del colegio. Aquí llegan, cada noche, afirmaciones dichas con tono de certeza.",
  "La semana pasada el colegio retiró un informe en pleno consejo. Desde entonces nada llega al consejo sin pasar por esta mesa.",
  "El escritorio estaba vacío. Hoy lo ocupas tú.",
] as const;

export const JEFA_LLEGADA = ["Llegaste al escritorio. Sin papeles no hay informe.", "Primer encargo de la noche. Un dato corto, sin apuro."] as const;

export const ENCARGO = [
  'El director dijo en el pasillo: "los estudiantes duermen poco".',
  "¿El colegio tiene algún dato sobre cuánto duermen los de 4.º? Lo necesito para el consejo de mañana.",
] as const;

export const HOJA = {
  titulo: "Para empezar",
  jefa: "Es la hoja que llena cada estudiante al ingresar. Hoy la llenas tú.",
  preguntas: ["¿Cuántas horas dormiste anoche?", "¿Cuántos minutos de celular usaste antes de dormir?", "¿Cómo te fue ayer, de 0 a 100?"],
  botonDani: "Responde Dani",
  botonPropias: "Poner las mías",
} as const;

export const daniResponde = (p: PaqueteT1): string[] => {
  const d = p.cifras.paso1.dani;
  return [`Yo respondo, si quieres. Anoche fueron ${numero(d.horas)} horas de sueño. Celular, ${numero(d.minutos)} minutos antes. Ayer me fue... ${numero(d.animo)}.`, "...perdón. ¿Dónde estaba?"];
};

export const ARCHIVO = {
  jefa: "El colegio archiva todo y nadie lo mira. A ver qué encuentras.",
  jefaSeguro: "¿Seguro que ahí no había nada?",
  daniAbre: "Mira este...",
} as const;

export const ASOMBRO = {
  filaHoy: "Tú, hoy",
  filaDani: (p: PaqueteT1) => p.version.textos.dani,
  filaArchivo: (fecha: string) => `Archivo, ${fecha}`,
  jefa: "Esa pregunta ya se hizo. Hace un año. Nadie la leyó.",
} as const;

export const CIERRE_PASO1 = {
  jefa: ["A partir de hoy firma el departamento, y firmas tú.", "Dos medidores. Si firmas sin mirar, baja uno. Si frenas todo, baja el otro.", "Si no contestamos a tiempo, el colegio llama a Horizonte."],
  beto: "Buenas noches, doc. A ojo se ve que hoy trabajas hasta tarde.",
} as const;

// ── Caso 2 ───────────────────────────────────────────────────────────────────

export const CASO2 = {
  titulo: "El colegio sin denuncias",
  informe: (p: PaqueteT1) => `CERO DENUNCIAS: EL COLEGIO ${p.cifras.colegios[2].toUpperCase()} ES SEGURO`,
  firmaInforme: "Dirección, para el consejo",
  jefa: "El director lo quiere en el informe de mañana. Cero. Es un número redondo. Tienes la carpeta.",
} as const;

export const BOTONES_SELLO = { tal: "Firmar tal cual", frase: "Redactar la frase", frenar: "Frenar", confirmaTitulo: "¿Firmar? Después no hay vuelta.", si: "Sí, al consejo", no: "Todavía no" } as const;

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

/** La reacción a lo que se selló, según la fila de pago que aplicó (tabla de reacciones de NT1.6, caso 2). */
export function reaccionCaso2(p: PaqueteT1, r: ResultadoCaso): ReaccionCaso2 {
  const tipo = p.version.tipos[2];
  const fila = r.filas[0];
  const colegio = p.cifras.colegios[2];
  const mes = p.cifras.caso2.mes;
  const jefa = (texto: string): Reaccion => ({ quien: "jefa", texto });
  if (tipo === "B") {
    if (fila === "R2.1") return { lineas: [jefa("Va al informe. El cero se sostenía.")], pose: "pulgar", tarjetaDeAcuerdo: false };
    if (fila === "R2.1.sin") return { lineas: [jefa("Salió bien. ¿En qué papel te apoyabas?")], pose: "brazos", tarjetaDeAcuerdo: false };
    if (fila === "R2.2")
      return {
        lineas: [
          { quien: "narracion", texto: "El director presenta el cero al distrito sin tu firma, y era cierto." },
          jefa("Dudaste de un cero que se sostenía. Hoy no te consultan."),
        ],
        pose: "brazos",
        tarjetaDeAcuerdo: false,
      };
    if (fila === "R2.3") return { lineas: [jefa("Va al informe. Dices lo que se sabe: el registro no cambió.")], pose: "pulgar", tarjetaDeAcuerdo: true };
    return { lineas: [jefa("Prudente. Y el cero se sostenía.")], pose: "brazos", tarjetaDeAcuerdo: false };
  }
  if (fila === "R2.1")
    return {
      lineas: [
        { quien: "madre", texto: `Soy la mamá de un estudiante de ${colegio}. A mi hijo lo empujaron y no se podía denunciar.` },
        { quien: "madre", texto: "Dicen que el colegio es seguro." },
        { quien: "madre", texto: `¿Y antes de ${mes}, cuántas denuncias había?` },
      ],
      pose: "cabeza",
      tarjetaDeAcuerdo: false,
    };
  if (fila === "R2.2")
    return {
      lineas: [
        { quien: "narracion", texto: "El director presenta «Colegio seguro» al distrito sin tu informe; una semana después tiene que corregirlo." },
        jefa("No firmamos. Se nota que esperaste. Hoy no te consultan."),
      ],
      pose: "brazos",
      tarjetaDeAcuerdo: false,
    };
  if (fila === "R2.3") return { lineas: [jefa("Va al informe.")], pose: "pulgar", tarjetaDeAcuerdo: true };
  return {
    lineas: [{ quien: "director", texto: "Nuestras cifras son correctas." }, jefa("Sonaba prudente. No tocaba nada.")],
    pose: "brazos",
    tarjetaDeAcuerdo: false,
  };
}

/** Lo que se dice al cerrar la prueba (no viene de la narrativa: es el aviso de que el resto del juego aún no está). */
export const FIN_DE_LA_PRUEBA = {
  titulo: "Aquí termina esta prueba",
  texto: "Jugaste el primer encargo y el primer caso. Los otros seis casos y las cartas del final todavía no están en esta versión.",
} as const;
