/**
 * Textos del Tema 1 de «La ventanilla». En tú, sin guiones largos (se revisa en guion-tema1.test.ts).
 * Los números salen siempre de las carpetas (tema1.ts, ventanilla.ts), nunca escritos a mano.
 */

import { bs } from "../../formato";
import type { AyudaDePaso } from "../escalera";
import { REGLAS, type CarpetaT13, type Color } from "./ventanilla";
import {
  DECISIONES,
  PRACTICA,
  correctoDe,
  dictamenCorrecto,
  revisarNC,
  revisarReexpresion,
  type EventoTema1,
  indicesDe,
  ncDe,
  operacionDe,
  textoNota,
  valorDeHoy,
  type CarpetaT12,
  type CarpetaTema1,
  type DiagnosticoNC,
  type DiagnosticoReexpresion,
  type Persona,
  type TipoCarpeta,
} from "./tema1";

export const JEFA = "DOÑA TERESA · jefa de agencia";
export const LUGAR = "Banco Kusi · agencia Cliza";

// ── Llegada ──────────────────────────────────────────────────────────────────

export const LLEGADA = [
  "Bienvenido a la agencia de Cliza del Banco Kusi. Aquí decides cuánto prestarle a cada cliente.",
  "La agencia vive de prestar. Si no prestas, cierra; si prestas mal, también.",
  "Este es tu manual. Por ahora tiene una sola regla. Léela: con ella atiendes a tu primera clienta.",
];

export const practica = () =>
  `${PRACTICA.cliente} pide Bs ${bs(PRACTICA.pide)}. Deja en garantía ${PRACTICA.garantia} que figura en sus libros por Bs ${bs(PRACTICA.enLibros)}. ¿Cuánto le prestas?`;

export function correccionPractica(escrito: number): string {
  const tope = 0.6 * PRACTICA.enLibros;
  if (escrito === tope) return `Bs ${bs(tope)} es lo máximo que la regla te deja, pero ella pide Bs ${bs(PRACTICA.pide)}: nunca prestas más de lo que piden.`;
  if (escrito === PRACTICA.enLibros) return `Esa es la garantía entera. La regla dice 60 %: Bs ${bs(tope)}, y ella pide Bs ${bs(PRACTICA.pide)}.`;
  return `El 60 % de Bs ${bs(PRACTICA.enLibros)} es Bs ${bs(tope)}. Alcanza para lo que pide, así que le prestas lo que pide.`;
}

export const PARED_PRIMERA = "Esa noche se da vuelta la pared: tu primera ficha, en verde. Doña Rosa pagó sus cuotas.";

// ── 1.1 ──────────────────────────────────────────────────────────────────────

export const EMPRESA_T11 = "la Ferretería San Isidro";

export const ABRE_T11 = `A la mañana siguiente, antes de abrir la ventanilla, llegan tres personas pidiendo el mismo balance de ${EMPRESA_T11}. Cada una lo quiere para algo distinto. ¿Qué decisión va a tomar cada una con ese balance?`;

export const PERSONA: Record<Persona, { nombre: string; dice: string; otraVez: string }> = {
  proveedor: {
    nombre: "Doña Elena, le vende clavos y tornillos a la ferretería",
    dice: "Les vendo mercadería todos los meses. Quiero ver su balance antes del próximo pedido.",
    otraVez: "Lo que me preocupa es si me pagan a tiempo lo que les entrego hoy.",
  },
  inversionista: {
    nombre: "Don Hugo, socio de la ferretería",
    dice: "Tengo una parte de esta empresa. Quiero ver cómo le va.",
    otraVez: "Estoy pensando si pongo más plata o si saco la mía.",
  },
  sin: {
    nombre: "La inspectora del SIN",
    dice: "Vengo a revisar el balance de la ferretería.",
    otraVez: "Quiero ver si la utilidad que declararon para el impuesto es la real.",
  },
};

export const decision = (p: Persona) => DECISIONES[p];

export const AYUDA_T11: AyudaDePaso = {
  concreta: [
    "Pregúntate qué va a hacer cada uno con el balance, no quién es.",
    "El que vende quiere saber si le pagan; el socio, si le conviene su parte; el fisco, cuánto impuesto corresponde.",
  ],
  leer: { donde: "Tema 1, Cuadro 1 (pág. 4)", que: "qué decisión toma cada usuario con el mismo balance" },
};

export const CIERRA_T11 = "El mismo papel, tres preguntas. La nuestra es otra: otorgar o negar un crédito, y a qué tasa. Abramos la ventanilla.";

// ── La jornada ───────────────────────────────────────────────────────────────

export const ABRE_JORNADA =
  "Hoy los clientes traen el balance que preparó su contador, para respaldar lo que piden. Antes de prestar, revisa que esté hecho con la norma que corresponde: en Bolivia, primero la NC; la NIIF sólo si ninguna NC lo regula.";

export const ABRE_REPASO = "Jornada de repaso: te traigo clientes del mismo tipo que los que fallaste, con otros números.";

// ── 1.2 ──────────────────────────────────────────────────────────────────────

export function diceClienteT12(c: CarpetaT12): string {
  if (c.nota === "niif-habiendo-nc") return "Mi contador dice que Bolivia ya adoptó las NIIF, así que está todo en regla.";
  return "Aquí tienes el balance que preparó mi contador.";
}

export const operacionMarcada = (c: CarpetaT12) => operacionDe(c).texto;
export const notaDelContador = (c: CarpetaT12) => `Nota del contador: «${textoNota(c)}»`;

export const PREGUNTA_NC = "¿Qué NC rige la operación marcada? Escribe su número, o 0 si ninguna la regula.";

export const PISTA_NC: Record<Exclude<DiagnosticoNC, "correcta">, string> = {
  "supuso-el-vacio": "Supusiste el vacío. Hay una NC que regula esta operación: búscala por el título en el manual.",
  "otra-nc": "Esa NC regula otra cosa. Lee su título en el manual.",
  "copio-la-niif": "Ese es el número de la norma internacional que citó el contador. Buscamos la NC boliviana, de la 1 a la 14.",
  "fuera-de-lista": "Las NC van de la 1 a la 14. Escribe 0 si ninguna regula la operación.",
  "hay-vacio": "Revisa los títulos otra vez: ¿alguna NC habla de esta operación? Si ninguna, escribe 0.",
};

export const AYUDA_NC: AyudaDePaso = {
  concreta: [
    "Lee la operación marcada en la carpeta.",
    "Recorre los 14 títulos del manual, de la NC 1 a la NC 14.",
    "Sólo si ningún título la cubre, escribe 0: recién ahí entra la NIIF.",
  ],
  leer: { donde: "Tema 1, Cuadro 2 (págs. 8 y 9)", que: "las 14 NC y qué regula cada una" },
};

export const aciertoNC = (c: CarpetaT12) =>
  ncDe(c) === 0 ? "Bien: ninguna NC regula esta operación, así que la NIIF entra como supletoria." : `Bien: la rige la NC ${ncDe(c)}.`;

export const PREGUNTA_DICTAMEN = "Compara la nota del contador con lo que encontraste. ¿Aceptas este balance como respaldo o lo devuelves para que lo rehagan?";

// ── 1.3 ──────────────────────────────────────────────────────────────────────

export const HOJA_NUEVA = "Última carpeta del día. Antes, una hoja nueva del manual: reemplaza a la regla de ayer.";
export const REGLA_NUEVA = REGLAS.tema1;
export const REGLA_CERO = REGLAS.cero;

export const diceClienteT13 = (c: CarpetaT13) =>
  `Compré mi sierra en Bs ${bs(c.enLibros)} y ahora vale Bs ${bs(c.valorDelCliente)}. ¡Gané Bs ${bs(c.valorDelCliente - c.enLibros)} sin moverme!`;

export function fichaT13(c: CarpetaT13) {
  const i = indicesDe(c);
  return [
    { etiqueta: "Pide", valor: `Bs ${bs(c.pide)}` },
    { etiqueta: "Cotización de la madera (su mínimo)", valor: `Bs ${bs(c.minimo)}` },
    { etiqueta: "Sierra en sus libros", valor: `Bs ${bs(c.enLibros)}` },
    { etiqueta: "Índice de precios al comprarla", valor: String(i.compra) },
    { etiqueta: "Índice de precios hoy", valor: String(i.hoy) },
  ];
}

export const PREGUNTA_HOY = "¿Cuánto vale hoy la sierra, en bolivianos de hoy?";

export const PISTA_HOY: Record<Exclude<DiagnosticoReexpresion, "correcta">, string> = {
  "en-libros": "Ese es el valor de sus libros, de cuando la compró. La regla nueva pide su valor de hoy.",
  "del-cliente": "Ese es el valor que dice el cliente. Calcúlalo tú con los índices.",
  "por-el-indice": "Multiplicaste por el índice de hoy. Hay que multiplicar por cuánto subieron los precios: índice de hoy entre índice de compra.",
  "al-reves": "Dividiste al revés: es índice de hoy entre índice de compra, y el valor tiene que subir.",
  "solo-el-ajuste": "Eso es sólo el ajuste por inflación. El valor de hoy es el de libros más ese ajuste.",
  "ya-el-sesenta": "Eso ya es el 60 %. Primero escribe el valor de hoy de la garantía.",
  otra: "Revisa la cuenta: valor en libros por índice de hoy, dividido entre índice de compra.",
};

export const AYUDA_HOY: AyudaDePaso = {
  concreta: [
    "Anota el valor en libros y los dos índices.",
    "Divide el índice de hoy entre el índice de compra: te dice cuántas veces subieron los precios.",
    "Multiplica el valor en libros por ese número.",
  ],
  leer: { donde: "Tema 1, apartado 1.3, Cálculo paso a paso (pág. 14)", que: "cómo se reexpresa un valor con el índice de precios" },
};

export const aciertoHoy = (c: CarpetaT13) =>
  `Bien: la sierra vale hoy Bs ${bs(valorDeHoy(c))}. Es la misma sierra; sólo cambió la unidad de medida. Ahora aplica la regla del día y decide cuánto le prestas.`;

export const PREGUNTA_MONTO = "¿Cuánto le prestas? Escribe 0 si no le prestas nada. Una vez que firmas, la carpeta se archiva.";

export const pideLinea = (c: CarpetaT13) =>
  `Antes de que se vaya, escríbele en una línea por qué su sierra no le hizo ganar Bs ${bs(c.valorDelCliente - c.enLibros)}.`;

// ── Cierre ───────────────────────────────────────────────────────────────────

export const ABRE_CIERRE = "Cierre de la jornada. Se da vuelta la pared:";

export const ETIQUETA_COLOR: Record<Color, string> = {
  verde: "VERDE",
  "bien-rechazado": "BIEN RECHAZADO",
  rojo: "ROJO",
  gris: "GRIS",
  "no-le-servia": "GRIS",
};

export function queFuePaso(c: CarpetaTema1, color: Color): string {
  if (c.tipo === "t12") {
    switch (color) {
      case "verde":
        return "Aceptaste un balance bien hecho: el crédito siguió su curso.";
      case "bien-rechazado":
        return "Devolviste un balance mal hecho: el contador lo rehízo con la norma correcta.";
      case "rojo":
        return "Aceptaste un balance mal hecho: el auditor del banco lo observó.";
      default:
        return "Devolviste un balance bien hecho: el cliente se ofendió y se fue a la cooperativa de enfrente.";
    }
  }
  switch (color) {
    case "verde":
      return "Pagó todas sus cuotas.";
    case "bien-rechazado":
      return "No le prestaste, y no podía pagar: se fue a la cooperativa de enfrente y allá cayó en mora.";
    case "rojo":
      return "Le prestaste más de lo que podía pagar: entró en mora.";
    case "no-le-servia":
      return "Le ofreciste menos de lo mínimo que necesitaba: no le servía y se fue.";
    default:
      return "Le prestaste menos de lo que podía pagar: la cooperativa de enfrente le ofreció más y se fue.";
  }
}

export const nombreCarpeta = (c: CarpetaTema1) => c.cliente;

export const CIERRE_BIEN = "Buen día: todo lo que firmaste hoy se sostiene. Tema 1 aprobado.";
export const CIERRE_REPASO = "Mañana repasamos lo que falló, con clientes nuevos. Lo que ya salió bien no se repite.";

export const FINAL =
  "Terminaste el Tema 1. Ya sabes preguntar quién lee un balance, con qué norma se hizo y en qué unidad de medida está. El Tema 2 se abre cuando tu docente lo habilite.";

// ── Ayuda del repaso: la escalera aplicada a la decisión que falló ───────────

const PISTA_REPASO: Record<string, string> = {
  "acepto-mal-hecho": "Ayer aceptaste un balance que no usaba la norma que correspondía, y el auditor lo observó.",
  "devolvio-bien-hecho": "Ayer devolviste un balance bien hecho y el cliente se fue.",
  "regla-de-ayer": "Ayer usaste la regla de ayer: el valor en libros de la garantía.",
  "valor-del-cliente": "Ayer usaste el valor que dijo el cliente, no el que calculaste.",
  "presto-lo-que-pide": "Ayer le prestaste lo que pedía, sin mirar lo que podía pagar.",
  "presto-el-minimo": "Ayer le prestaste sólo su mínimo, y la regla daba más.",
  rechazo: "Ayer lo rechazaste, y sí podía pagar.",
  otra: "Ayer el monto no salió de la regla del día.",
};

export const AYUDA_REPASO: Record<TipoCarpeta, AyudaDePaso> = {
  t12: {
    concreta: [
      "Antes de decidir, compara la norma que citó el contador con la NC que encontraste tú.",
      "Si coinciden, o si no hay NC y usó la NIIF, está bien hecho: acéptalo. Si no, devuélvelo.",
    ],
    leer: { donde: "Tema 1, apartado 1.2 (págs. 7 a 12)", que: "por qué la NIIF entra sólo cuando ninguna NC regula la operación" },
  },
  t13: {
    concreta: [
      "El tope es el 60 % del valor de hoy de la garantía.",
      "Si el tope alcanza para lo que pide, le prestas lo que pide. Si no, le ofreces el tope redondeado a Bs 100 hacia abajo, siempre que llegue a su mínimo; si ni eso, 0.",
    ],
    leer: { donde: "tu manual, la regla del Tema 1, y el Tema 1, pág. 14", que: "cómo se calcula el valor de hoy y cuánto se presta con él" },
  },
};

export const pistaRepaso = (error: string | undefined) => (error ? (PISTA_REPASO[error] ?? PISTA_REPASO.otra) : "");

// ── Registro: lo que ve el docente, recalculado desde lo que escribió el alumno ─

export function describir(
  rondas: CarpetaTema1[][],
  e: EventoTema1,
): { texto: string; bien?: boolean } {
  const carpeta = "ronda" in e && "i" in e ? rondas[e.ronda]?.[e.i] : undefined;
  const donde = (r: number) => (r === 0 ? "Jornada" : `Repaso ${r}`);
  switch (e.tipo) {
    case "llegada":
      return { texto: `Llegada: le prestó Bs ${bs(e.monto)} a ${PRACTICA.cliente}`, bien: e.monto === PRACTICA.pide };
    case "usuario":
      return { texto: `1.1: a ${PERSONA[e.persona].nombre} le asignó «${DECISIONES[e.eligio]}»`, bien: e.persona === e.eligio };
    case "nc":
      return carpeta?.tipo === "t12"
        ? { texto: `${donde(e.ronda)} · ${carpeta.cliente}: escribió NC ${e.valor}`, bien: revisarNC(carpeta, e.valor) === "correcta" }
        : { texto: `NC ${e.valor}` };
    case "dictamen":
      return carpeta?.tipo === "t12"
        ? { texto: `${donde(e.ronda)} · ${carpeta.cliente}: ${e.decision === "aceptar" ? "aceptó" : "devolvió"} el balance`, bien: e.decision === dictamenCorrecto(carpeta) }
        : { texto: e.decision };
    case "reexpresion":
      return carpeta?.tipo === "t13"
        ? { texto: `${donde(e.ronda)} · ${carpeta.cliente}: valor de hoy Bs ${bs(e.valor)}`, bien: revisarReexpresion(carpeta, e.valor) === "correcta" }
        : { texto: `Valor de hoy Bs ${bs(e.valor)}` };
    case "monto":
      return carpeta?.tipo === "t13"
        ? { texto: `${donde(e.ronda)} · ${carpeta.cliente}: firmó Bs ${bs(e.valor)}`, bien: e.valor === correctoDe(carpeta) }
        : { texto: `Firmó Bs ${bs(e.valor)}` };
    case "linea":
      return { texto: `${donde(e.ronda)} · le escribió al cliente: «${e.texto}»` };
    case "ayuda":
      return { texto: `Pidió ayuda en ${e.paso}: ${e.escalon === "leer" ? "llegó a leer el dossier" : "pista concreta"}` };
    case "cierre":
      return { texto: `${donde(e.ronda)}: cerró la jornada` };
  }
}
