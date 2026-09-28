/**
 * Textos del Tema 1 de «La ventanilla», generación 2 (docs/juego/gdd/05 v2.1). Regla de escritura:
 * nadie en la agencia explica; Doña Teresa dice la regla, nunca el porqué, y una consecuencia es lo que
 * le pasó a alguien, en una línea. En tú, castellano neutro, sin guiones largos (guion-tema1.test.ts).
 * Los números salen siempre de las carpetas (tema1.ts, ventanilla.ts), nunca escritos a mano.
 */

import { bs } from "../../formato";
import type { AyudaDePaso } from "../escalera";
import { REGLAS, type Color } from "./ventanilla";
import {
  CARACTERISTICAS,
  CLIENTES_T13,
  DECISIONES,
  HOJAS,
  PRACTICA,
  correctoT13,
  dictamenCorrecto,
  mostradorT11,
  operacion,
  redaccionDe,
  revisarNC,
  revisarReexpresion,
  revisarT11,
  selloCorrecto,
  textoNota,
  textoPapel,
  topeT13,
  valorDeHoy,
  type CarpetaT12,
  type CarpetaT13,
  type CarpetaTema1,
  type Caracteristica,
  type DiagnosticoNC,
  type DiagnosticoReexpresion,
  type DiagnosticoT11,
  type Dictamen,
  type EventoTema1,
  type FinalP13,
  type FinalT12,
  type PersonaT11,
  type PracticaT12,
  type PracticaT13,
  type Rol,
  type SelloCalidad,
  type TipoCarpeta,
} from "./tema1";

export const JEFA = "DOÑA TERESA · jefa de agencia";
export const LUGAR = "Banco Kusi · agencia Cliza";

// ── Llegada ──────────────────────────────────────────────────────────────────

export const LLEGADA = [
  "Te damos la bienvenida a la agencia de Cliza del Banco Kusi. Aquí decides cuánto prestarle a cada cliente.",
  "Llevo cuarenta años detrás de este vidrio. Tú siéntate de aquel lado.",
  "¿Ves la cooperativa de enfrente? Si le prestas de menos a un buen cliente, se va allá. Y si le prestas a uno que no puede pagar, vuelve aquí a no pagar.",
  "Este es tu manual. Por ahora tiene una sola regla. Con ella atiendes a tu primera clienta.",
];

export const practica = () =>
  `${PRACTICA.cliente} pide Bs ${bs(PRACTICA.pide)}. Deja en garantía ${PRACTICA.garantia} que figura en sus libros por Bs ${bs(PRACTICA.enLibros)}. ¿Cuánto le prestas?`;

export function correccionPractica(escrito: number): string {
  const tope = 0.6 * PRACTICA.enLibros;
  if (escrito === tope) return `Bs ${bs(tope)} es lo máximo que la regla te deja, pero ella pide Bs ${bs(PRACTICA.pide)}: nunca prestas más de lo que piden.`;
  if (escrito === PRACTICA.enLibros) return `Esa es la garantía entera. La regla dice 60 %: Bs ${bs(tope)}, y ella pide Bs ${bs(PRACTICA.pide)}.`;
  return `El 60 % de Bs ${bs(PRACTICA.enLibros)} es Bs ${bs(tope)}. Alcanza para lo que pide, así que le prestas lo que pide.`;
}

export const PARED_PRIMERA = "Esta es la pared. Aquí adelantamos el tiempo: cada ficha te muestra cómo terminó el crédito. Doña Rosa pagó todas sus cuotas.";

// ── Manual ───────────────────────────────────────────────────────────────────

export const REGLA_CERO = REGLAS.cero;
export const REGLA_MONTO = "Nunca prestes más de lo que pide. Si tu tope no llega a su mínimo, no le prestas (0). La agencia presta en múltiplos de Bs 100, hacia abajo.";
export const REGLA_NUEVA = REGLAS.tema1;
export const REGLA_FORMULA = "Valor de hoy = valor en libros × índice de hoy ÷ índice al comprarlo.";
export const MANUAL_NORMA_Y_CALIDAD = "La norma, en la operación marcada. La hoja de observación, en el resto. Cada carpeta trae como mucho un defecto.";
export const PAGINA_CALIDAD = [
  "Fundamentales: relevancia y representación fiel.",
  "De mejora: comparabilidad, verificabilidad, oportunidad y comprensibilidad.",
  "En la hoja de observación, sella la que falla. Si no falla ninguna, sella «nada que observar».",
  "Si la norma está mal, devuelve.",
  "Si la norma está bien: falla una fundamental, devuelve; falla una de mejora, acepta con observación; no falla ninguna, acepta.",
];

// ── 1.1 · El mostrador ───────────────────────────────────────────────────────

export const ABRE_T11 =
  "Antes de abrir entra Doña Nieves, de la Ferretería San Isidro, con su balance recién hecho. Detrás de ella, gente que se lo pidió. «Yo sé vender clavos, no leer balances. ¿Me ayudas?»";

/** Tres frases por rol (05 N2.3): cada una trae una pista de su decisión y de su hoja; ninguna dice quién es. */
export const FRASES_T11: Record<Rol, [string, string, string]> = {
  inversionista: [
    "Hace cinco años puse mis ahorros en esta ferretería. Mi hermano dice que saque lo mío y me compre un minibús. Antes quiero saber cuánto me rinde lo que puse y cuánto vale hoy mi parte.",
    "Tengo una parte de la ferretería y me piden que ponga más dinero. Antes quiero ver si lo que ya puse me está rindiendo, y cuánto vale hoy.",
    "Fundé esta ferretería con Doña Nieves y la mitad es mía. ¿Sigo poniendo dinero o saco lo que me toca? Depende de cuánto me rinde y de cuánto vale hoy mi mitad.",
  ],
  proveedor: [
    "Cada mes les traigo cemento de la fábrica. Ahora me piden que les deje la carga y se la cobre el mes que viene. ¿Van a tener con qué pagarme?",
    "Les entrego clavos y tornillos desde hace años. El último pedido me lo pagaron tarde, y el que viene es el doble.",
    "Me encargaron veinte rollos de alambre para la siembra. Si se los dejo sin cobrar, ¿me van a poder pagar cuando vendan?",
  ],
  gerencia: [
    "Cada mañana abro la tienda. Vendemos mucha pintura, pero no sé si con ella ganamos algo o sólo movemos dinero.",
    "Para diciembre tengo que elegir qué traer más, cemento o herramientas. Quiero saber cuál de los dos nos deja más por cada venta.",
    "Nos ofrecen una mezcladora para alquilarla a los constructores. La compraría la ferretería. Antes quiero ver si lo que ya alquilamos nos deja más que lo que vendemos.",
  ],
  sin: [
    "Traigo el formulario que la ferretería presentó en abril. Quiero ver si lo que pusieron ahí coincide con lo que dice su balance.",
    "Mi oficina revisa este mes a los comercios de la provincia. Según lo que presentó, la ferretería casi no ganó nada. Quiero ver cuánto ganó antes de pagarle al Estado.",
    "Tengo una orden de fiscalización con el nombre de la ferretería.",
  ],
  empleado: [
    "Trabajo en el depósito hace ocho años. Me ofrecieron un puesto en una ferretería de Punata y tengo que responder el lunes. Antes quiero saber cómo le fue a esta tienda este año.",
    "Somos seis en la tienda y este año no hubo aumento. Doña Nieves dice que las ventas bajaron; quiero verlo con mis propios ojos antes de hablar con ella.",
    "Me ofrecieron otro trabajo, con menos sueldo pero seguro. Quiero saber si esta ferretería va a seguir abierta el año que viene.",
  ],
};

export const frasePersona = (p: PersonaT11) => FRASES_T11[p.rol][p.frase];
export const NIEVES_EMPUJA = ["Dale esa, que salió linda.", "Muéstrale esa, que ahí quedamos bien parados.", "Esa, esa. Es la que mejor se ve."];
export const nievesEmpuja = (p: PersonaT11) => NIEVES_EMPUJA[(p.nombre.length + p.frase) % NIEVES_EMPUJA.length];
export const NIEVES_HOMBROS = "Pues a mí me parecía la más linda.";

const CONFORME = ["Con esto ya sé qué hacer. Gracias.", "Justo lo que necesitaba ver.", "Esto me contesta. Me voy tranquil"];
const SIN_RESPUESTA = ["Con esto no decido nada de lo mío.", "Esta hoja no me contesta lo que vine a preguntar.", "Me voy igual que llegué."];

/** La reacción de la persona al irse: no dice cuál era ni qué falló. */
export function reaccionT11(p: PersonaT11, dx: DiagnosticoT11): string {
  const k = (p.nombre.length + p.frase) % 3;
  if (dx === "bien") return k === 2 ? `${CONFORME[2]}${p.mujer ? "a" : "o"}.` : CONFORME[k];
  return SIN_RESPUESTA[k];
}

export const PREGUNTA_SELLO = "¿Qué va a decidir con el balance? Pon el sello.";
export const PREGUNTA_HOJA = "¿Qué hoja del balance le entregas?";
export const decision = (s: keyof typeof DECISIONES) => DECISIONES[s];
export const hoja = (r: Rol) => HOJAS[r];

export const PISTA_T11: Record<Exclude<DiagnosticoT11, "bien">, string> = {
  sello: "Esa persona no va a hacer eso con el balance. Escucha qué le pasa.",
  hoja: "La decisión era esa. Pero ¿qué parte del balance le contesta su pregunta?",
  "siguio-a-nieves": "Pasó lo mismo que con la primera persona.",
};

export const AYUDA_T11: AyudaDePaso = {
  concreta: [
    "Pregúntate qué va a hacer cada persona con el balance, no quién es.",
    "Piensa qué va a hacer esa persona mañana con lo que lea: ¿cobrar algo, poner o sacar dinero, quedarse en su trabajo, decidir algo de la tienda?",
  ],
  leer: { donde: "Tema 1, Cuadro 1 (pág. 4)", que: "qué decide cada usuario con el mismo balance y qué mira primero" },
};

export const cierraT11 = (personas: number) =>
  `El mismo papel, ${personas === 3 ? "tres" : personas === 4 ? "cuatro" : "cinco"} preguntas distintas. La nuestra es otra: si le prestamos, cuánto y a qué tasa. Abramos la ventanilla.`;

// ── 1.2 · Jornada, práctica del pagaré y carpetas con nota ────────────────────

export const ABRE_JORNADA = "Hoy los clientes traen el balance que preparó su contador. Revisa la operación marcada: primero la NC; la NIIF, sólo si ninguna NC la regula.";
export const ABRE_REPASO = "Jornada de repaso: te traigo clientes del mismo tipo que los que fallaste, con otros números.";

export const FRASES_BEATRIZ = ["Aquí tienes el balance que preparó mi contador.", "Te traigo el balance del año. Lo necesito para el préstamo.", "Mi contador me dijo que te lo entregue en mano."];
export const diceBeatriz = (p: PracticaT12) => `Necesito surtir la librería antes de que empiecen las clases. ${FRASES_BEATRIZ[p.frase]}`;
export const operacionBeatriz = (p: PracticaT12) => operacion(p.operacion).redacciones[p.redaccion];
export const notaBeatriz = (p: PracticaT12) => `Registrado según la NC ${operacion(p.operacion).nc}. Por ser la norma boliviana vigente.`;
export const pasivoBeatriz = (p: PracticaT12) => [`Proveedores · Bs ${bs(p.proveedores)}`, `Préstamo del Banco Kusi · Bs ${bs(p.prestamoKusi)}`];
export const pagareBeatriz = (p: PracticaT12) =>
  `PAGARÉ. Debo y pagaré a la orden de Fortunato Rojas la suma de Bs ${bs(p.pagare)}, el 15 de marzo. Cliza, 10 de noviembre. Firmado: Beatriz.`;
export const CIERRA_CAMPO_NC = "Déjala por hoy. Decide con lo que tienes.";
export const PREGUNTA_DICTAMEN_PRACTICA = "¿Qué haces con este balance?";
export const consecuenciaBeatriz = (d: "aceptar" | "devolver") =>
  d === "aceptar" ? "En marzo apareció esa deuda. No pagó." : "Enfrente le prestaron. En marzo apareció esa deuda y dejó de pagarles.";
export const JEFA_DESPUES_DEL_PAGARE = "Desde hoy, además de la norma, mira el resto de la carpeta.";

export const PREGUNTA_NC = "¿Qué NC rige la operación marcada? Escribe su número, o 0 si ninguna la regula.";
export const ACIERTO = "Bien.";

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
  leer: { donde: "Tema 1, Cuadro 2 (págs. 8 a 10)", que: "las 14 NC y qué regula cada una" },
};

export const SE_FUE = "«Vuelvo otro día.» El cliente se fue sin respuesta.";

export const FRASES_CLIENTE = [
  "Aquí tienes el balance que preparó mi contador.",
  "Te traigo el balance del año. Lo necesito para el préstamo.",
  "Mi contador me dijo que te lo entregue en mano.",
  "Mi contador dice que lo que aprueba el CTNAC es ley, y él lo cumple al pie de la letra.",
  "Mi contador ya lo prepara para las normas nuevas del 2027. Más al día, imposible.",
  "Está completito, no le falta ni una hoja.",
  "Cumple todas las normas. Con eso ya sirve, ¿no?",
  "Te lo entregué a tiempo, antes que nadie.",
  "Mi contador dice que Bolivia ya adoptó las NIIF, como Brasil y Argentina.",
  "Mi contador buscó y dice que para esto no hay norma boliviana.",
  "Mi contador trabaja sólo con normas bolivianas. Dice que se las sabe de memoria.",
];
export const diceClienteT12 = (c: CarpetaT12) => FRASES_CLIENTE[c.frase];
export const operacionMarcada = (c: CarpetaT12) => redaccionDe(c);
export const notaDelContador = (c: CarpetaT12) => textoNota(c);
export const papelDeLaCarpeta = (c: CarpetaT12) => textoPapel(c);

export const NOMBRE_CARACTERISTICA: Record<Caracteristica, string> = {
  relevancia: "Relevancia",
  "representacion-fiel": "Representación fiel",
  comparabilidad: "Comparabilidad",
  verificabilidad: "Verificabilidad",
  oportunidad: "Oportunidad",
  comprensibilidad: "Comprensibilidad",
};
export const SELLOS_CALIDAD: { sello: SelloCalidad; texto: string }[] = [...CARACTERISTICAS.map((c) => ({ sello: c, texto: NOMBRE_CARACTERISTICA[c] })), { sello: "nada", texto: "Nada que observar" }];
export const PREGUNTA_SELLO_CALIDAD = "Hoja de observación: ¿qué falla en el resto de la carpeta?";
export const PREGUNTA_DICTAMEN = "¿Qué haces con este balance?";
export const BOTON_DICTAMEN: Record<Dictamen, string> = { aceptar: "ACEPTAR", observar: "ACEPTAR CON OBSERVACIÓN", devolver: "DEVOLVER" };

// ── 1.3 · Práctica del carpintero y carpeta con nota ─────────────────────────

export const ANTES_DEL_CARPINTERO = "Última parte del día. Entra un carpintero con su sierra.";
const FRASES_CARPINTERO = ["Necesito Bs {P} para comprar madera. Te dejo mi sierra.", "Me salió un pedido grande de muebles. Con Bs {P} compro la madera, y la sierra queda de garantía."];
export const diceCarpintero = (p: PracticaT13) => FRASES_CARPINTERO[p.frase].replace("{P}", bs(p.pide));
export const fichaCarpintero = (p: PracticaT13) => [
  { etiqueta: "Pide", valor: `Bs ${bs(p.pide)}` },
  { etiqueta: "Cotización de la madera (su mínimo)", valor: `Bs ${bs(p.minimo)}` },
  { etiqueta: "Sierra en sus libros", valor: `Bs ${bs(p.enLibros)}` },
  { etiqueta: "Índice al comprarla", valor: String(p.indiceCompra) },
  { etiqueta: "Índice de hoy", valor: String(p.indiceHoy) },
];
export function consecuenciaCarpintero(final: FinalP13, color: Color, cooperativa: number): string {
  if (final === "regla-de-ayer") return `Se fue enfrente. La cooperativa le prestó Bs ${bs(cooperativa)} por la misma sierra.`;
  if (final === "lo-que-pide") return "No pudo pagar. Remataron la sierra y no alcanzó para la deuda.";
  if (final === "bien") return "Pagó todas sus cuotas.";
  return queFuePasoMonto(color);
}
export const JEFA_DESPUES_DEL_CARPINTERO = "Desde hoy, la garantía se mira en bolivianos de hoy.";

export const RECUERDA_REGLA = "Recuerda la hoja nueva de tu manual:";
export const clienteT13 = (c: CarpetaT13) => CLIENTES_T13[c.cliente];
export function diceClienteT13(c: CarpetaT13): string {
  const g = clienteT13(c).garantia;
  const L = bs(c.enLibros);
  const C = bs(c.valorDelCliente);
  return [
    `Compré mi ${g} en Bs ${L} y ahora vale Bs ${C}. ¡Gané Bs ${bs(c.valorDelCliente - c.enLibros)} sin moverme!`,
    `Mi ${g} rindió más que un ahorro en el banco: de Bs ${L} a Bs ${C}.`,
    `Si hoy vendo mi ${g} me pagan Bs ${C}. Eso ya es ganancia, ¿no?`,
  ][c.frase];
}
export function fichaT13(c: CarpetaT13) {
  const cl = clienteT13(c);
  return [
    { etiqueta: "Pide", valor: `Bs ${bs(c.pide)}` },
    { etiqueta: `${cl.minimo} (su mínimo)`, valor: `Bs ${bs(c.minimo)}` },
    { etiqueta: `${cl.garantia[0].toUpperCase()}${cl.garantia.slice(1)} en sus libros`, valor: `Bs ${bs(c.enLibros)}` },
    { etiqueta: "Índice al comprarla", valor: String(c.indiceCompra) },
    { etiqueta: "Índice de hoy", valor: String(c.indiceHoy) },
  ];
}

export const PREGUNTA_HOY = "¿Cuánto vale hoy la garantía, en bolivianos de hoy?";
export const PREGUNTA_MONTO = "¿Cuánto le prestas? Escribe 0 si no le prestas nada. Una vez que firmas, la carpeta se archiva.";

export const PISTA_HOY: Record<Exclude<DiagnosticoReexpresion, "correcta">, string> = {
  "en-libros": "Ese es el valor de sus libros, de cuando la compró. La regla nueva pide su valor de hoy.",
  "del-cliente": "Ese es el valor que dice el cliente. Calcúlalo tú con los índices.",
  "por-el-indice": "Multiplicaste por el índice de hoy. Hay que multiplicar por cuánto subieron los precios: índice de hoy entre índice al comprarla.",
  "al-reves": "Dividiste al revés: es índice de hoy entre índice al comprarla, y el valor tiene que subir.",
  "solo-el-ajuste": "Eso es sólo el ajuste por inflación. El valor de hoy es el de libros más ese ajuste.",
  "ya-el-sesenta": "Eso ya es el 60 %. Primero escribe el valor de hoy de la garantía.",
  "resto-indices": "Los índices no son porcentajes: restarlos no da cuánto subió. Divide el de hoy entre el de compra.",
  "ignoro-compra": "Dividiste el índice de hoy entre 100. Aquí la garantía se compró con otro índice: divide entre ese.",
  otra: "Revisa la cuenta: valor en libros por índice de hoy, dividido entre índice al comprarla.",
};

export const AYUDA_HOY: AyudaDePaso = {
  concreta: [
    "Anota el valor en libros y los dos índices.",
    "Divide el índice de hoy entre el índice al comprarla: te dice cuántas veces subieron los precios.",
    "Multiplica el valor en libros por ese número.",
  ],
  leer: { donde: "Tema 1, apartado 1.3, Cálculo paso a paso (pág. 14)", que: "cómo se reexpresa un valor con el índice de precios" },
};

// ── Cierre ───────────────────────────────────────────────────────────────────

export const ABRE_CIERRE = "Cierre de la jornada. Se da vuelta la pared:";

export const ETIQUETA_COLOR: Record<Color, string> = {
  verde: "VERDE",
  "bien-rechazado": "BIEN RECHAZADO",
  rojo: "ROJO",
  gris: "GRIS",
  "no-le-servia": "GRIS",
};

function queFuePasoMonto(color: Color): string {
  switch (color) {
    case "verde":
      return "Pagó todas sus cuotas.";
    case "bien-rechazado":
      return "No le prestaste, y no podía pagar: se fue enfrente y allá cayó en mora.";
    case "rojo":
      return "Le prestaste más de lo que podía pagar: entró en mora.";
    case "no-le-servia":
      return "Le ofreciste menos de lo mínimo que necesitaba: no le servía y se fue.";
    default:
      return "Le prestaste menos de lo que podía pagar: la cooperativa de enfrente le ofreció más y se fue.";
  }
}

const AUDITOR_MEJORA: Partial<Record<Caracteristica, string>> = {
  oportunidad: "El auditor anotó que el balance llegó tarde.",
  verificabilidad: "El auditor anotó que no se sabe cómo se valuó.",
  comparabilidad: "El auditor anotó que los dos años no se pueden comparar.",
  comprensibilidad: "El auditor anotó que nadie supo qué decía el balance.",
};

/** La línea de la ficha al cierre (05 N2.5): lo que pasó, sin teoría. */
export function queFuePaso(c: CarpetaTema1, color: Color, final: FinalT12 | string): string {
  if (final === "se-fue") return SE_FUE;
  if (c.tipo === "t13") return queFuePasoMonto(color);
  const falla = selloCorrecto(c);
  switch (final as FinalT12) {
    case "bien":
      return color === "bien-rechazado" ? "Lo devolviste, y había que devolverlo." : "Pagó todas sus cuotas.";
    case "norma-mal-aceptada":
      return operacion(c.operacion).nc === 0
        ? "El auditor del banco observó este balance: ninguna NC regula esa operación."
        : `El auditor del banco observó este balance: la operación la rige la NC ${operacion(c.operacion).nc}.`;
    case "fundamental-aceptado":
      return falla === "relevancia" ? "La garantía valía lo que costó hace años, no lo de hoy. No alcanzó." : "Eso no estaba en el balance, y era verdad. No pagó.";
    case "sano-observado":
    case "devolvio-uno-bueno":
      return "No había por qué devolverlo ni observarlo. Se molestó y se fue enfrente.";
    case "mejora-no-vista":
    case "sello-equivocado":
      return falla === "nada" ? "No había nada que observar." : (AUDITOR_MEJORA[falla as Caracteristica] ?? "Eso no estaba en el balance, y era verdad.");
    default:
      return "";
  }
}

export const nombreCarpeta = (c: CarpetaTema1) => (c.tipo === "t12" ? c.cliente : clienteT13(c).nombre);

export const CIERRE_BIEN = "Buen día: todo lo que firmaste hoy se sostiene.";
export const APROBADO = "TEMA 1 APROBADO";
export const CIERRE_REPASO = "Mañana repasamos lo que falló, con clientes nuevos. Lo que ya salió bien no se repite.";
export const FINAL = "Buen trabajo. Mañana te toca otra ventanilla.";
export const FINAL_PANTALLA = "El tema siguiente se abre cuando tu docente lo habilite.";

// ── Ayuda del repaso: la escalera aplicada a la decisión que falló ───────────

const PISTA_REPASO: Record<string, string> = {
  "regla-de-ayer": "Ayer usaste la regla de ayer, como con el carpintero: se fue enfrente.",
  "fundamental-aceptado": "Ayer aceptaste un balance que no decía todo. ¿Te acuerdas del pagaré?",
  "sano-observado": "Ayer observaste un balance que no tenía nada que observar, y el cliente se fue.",
  "devolvio-uno-bueno": "Ayer devolviste un balance que se podía aceptar, y el cliente se fue.",
  "sello-equivocado": "Ayer anotaste un problema que no era el de esa carpeta.",
  "mejora-no-vista": "Ayer aceptaste sin anotar lo que el auditor sí vio.",
  "norma-mal-aceptada": "Ayer aceptaste un balance hecho con otra norma, y el auditor lo observó.",
  "se-fue": "Ayer un cliente se fue sin respuesta.",
  "valor-del-cliente": "Ayer usaste el valor que dijo el cliente, no el que calculaste.",
  "presto-lo-que-pide": "Ayer le prestaste lo que pedía, sin mirar lo que podía pagar.",
  "presto-el-minimo": "Ayer le prestaste sólo su mínimo, y la regla daba más.",
  rechazo: "Ayer lo rechazaste, y sí podía pagar.",
  otra: "Ayer el monto no salió de la regla del día.",
};

export const AYUDA_REPASO: Record<TipoCarpeta, AyudaDePaso> = {
  t12: {
    concreta: [
      "Compara la norma que citó con la que encontraste.",
      "Después mira el papel que sobra: ¿cambia lo que decides?",
    ],
    leer: { donde: "Tema 1, apartados 1.2 y 1.3 (págs. 7 a 13), y la página «Calidad» de tu manual", que: "la norma primero; después, qué hace confiable un balance" },
  },
  t13: {
    concreta: [
      "El tope es el 60 % del valor de hoy de la garantía.",
      "Si el tope alcanza para lo que pide, le prestas lo que pide. Si no, le ofreces el tope redondeado a Bs 100 hacia abajo, siempre que llegue a su mínimo; si ni eso, 0.",
    ],
    leer: { donde: "tu manual (la hoja nueva) y el dossier del Tema 1, pág. 14", que: "cómo se calcula el valor de hoy y cuánto se presta con él" },
  },
};

export const pistaRepaso = (error: string | undefined) => (error ? (PISTA_REPASO[error] ?? PISTA_REPASO.otra) : "");

// ── Registro: lo que ve el alumno y lo que guarda para el docente ────────────

/**
 * Una línea por evento. `bien` sólo en los números que se corrigen en el momento (NC, valor de hoy): las
 * decisiones (sellos, dictamen, monto, 1.1) no muestran ✔ antes del cierre (02 B2.10 punto 2).
 */
export function describir(version: number, rondas: CarpetaTema1[][], e: EventoTema1): { texto: string; bien?: boolean } {
  const carpeta = "ronda" in e && "i" in e ? rondas[e.ronda]?.[e.i] : undefined;
  const donde = (r: number) => (r === 0 ? "Jornada" : `Repaso ${r}`);
  const quien = carpeta ? nombreCarpeta(carpeta) : "";
  switch (e.tipo) {
    case "llegada":
      return { texto: `Llegada: le prestó Bs ${bs(e.monto)} a ${PRACTICA.cliente}` };
    case "visto":
      return { texto: e.que === "pared" ? "Vio la pared" : e.que === "t11" ? "Cerró el mostrador" : e.que === "p12" ? "Vio cómo terminó la práctica del pagaré" : "Vio cómo terminó la práctica del carpintero" };
    case "t11": {
      const p = mostradorT11(version).cola[e.i];
      return { texto: `1.1${e.i === 0 ? " (práctica)" : ""} · ${p?.nombre ?? ""}: sello «${DECISIONES[e.sello]}», hoja «${HOJAS[e.hoja]}»` };
    }
    case "p12-nc":
      return { texto: `Práctica del pagaré: escribió NC ${e.valor}` };
    case "p12-dictamen":
      return { texto: `Práctica del pagaré: ${e.decision === "aceptar" ? "aceptó" : "devolvió"} el balance` };
    case "p13-monto":
      return { texto: `Práctica del carpintero: firmó Bs ${bs(e.valor)}` };
    case "nc":
      return carpeta?.tipo === "t12" ? { texto: `${donde(e.ronda)} · ${quien}: escribió NC ${e.valor}`, bien: revisarNC(carpeta, e.valor) === "correcta" } : { texto: `NC ${e.valor}` };
    case "sello":
      return { texto: `${donde(e.ronda)} · ${quien}: selló «${e.sello === "nada" ? "Nada que observar" : NOMBRE_CARACTERISTICA[e.sello]}»` };
    case "dictamen":
      return { texto: `${donde(e.ronda)} · ${quien}: ${BOTON_DICTAMEN[e.decision].toLowerCase()}` };
    case "reexpresion":
      return carpeta?.tipo === "t13" ? { texto: `${donde(e.ronda)} · ${quien}: valor de hoy Bs ${bs(e.valor)}`, bien: revisarReexpresion(carpeta, e.valor) === "correcta" } : { texto: `Valor de hoy Bs ${bs(e.valor)}` };
    case "monto":
      return { texto: `${donde(e.ronda)} · ${quien}: firmó Bs ${bs(e.valor)}` };
    case "ayuda":
      return { texto: `Pidió ayuda en ${e.paso}: ${e.escalon === "leer" ? "llegó a leer el dossier" : "pista concreta"}` };
    case "cierre":
      return { texto: `${donde(e.ronda)}: cerró la jornada` };
  }
}

/** Para el docente: si cada decisión estaba bien, recalculado desde lo que escribió el alumno. */
export function decisionBien(version: number, rondas: CarpetaTema1[][], e: EventoTema1): boolean | undefined {
  const carpeta = "ronda" in e && "i" in e ? rondas[e.ronda]?.[e.i] : undefined;
  if (e.tipo === "t11") return revisarT11(mostradorT11(version).cola[e.i], e.sello, e.hoja) === "bien";
  if (e.tipo === "sello" && carpeta?.tipo === "t12") return e.sello === selloCorrecto(carpeta);
  if (e.tipo === "dictamen" && carpeta?.tipo === "t12") return e.decision === dictamenCorrecto(carpeta);
  if (e.tipo === "monto" && carpeta?.tipo === "t13") return e.valor === correctoT13(carpeta);
  return undefined;
}

export { topeT13, valorDeHoy };
