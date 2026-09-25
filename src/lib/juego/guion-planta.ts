/**
 * Lo que dicen los personajes de la escena 1, armado con los números de cada versión.
 * Está aparte de la pantalla para que las pruebas revisen todos los textos (tuteo, sin guiones
 * largos) en muchas versiones, igual que se revisan las láminas.
 */

import { bs } from "../formato";
import {
  capacidadDiaria,
  consecuencia,
  ritmoFermentacion,
  type DatosPlanta,
  type Diagnostico,
  type DiagnosticoCompra,
  type DiagnosticoRecuperacion,
  type Opcion,
} from "./planta";

const plata = (x: number) => `Bs ${bs(x)}`;
const litros = (x: number) => bs(x, Number.isInteger(x) ? 0 : 1);
const unDecimal = (x: number) => bs(x, 1);

export const DON_MARIO = "DON MARIO · Lácteos Valle Alto";

/** "3,3 veces" dicho como lo diría Don Mario: "más de 3 veces". */
function vecesMasRapida(d: DatosPlanta) {
  const r = d.envasadoraNueva / d.envasadora;
  return Number.isInteger(r) ? `${r} veces` : `más de ${Math.floor(r)} veces`;
}

export function saludo(d: DatosPlanta) {
  return (
    `¡Llegaste, consultor! Tengo ${bs(d.pedidosPorDia)} pedidos de yogur por día y la planta no da abasto. ` +
    `Un vendedor me ofrece una envasadora automática: ${vecesMasRapida(d)} más rápida. ¿La compro?`
  );
}

export function fichaMaquinas(d: DatosPlanta) {
  return [
    { valor: `${litros(d.pasteurizador)} L/h`, etiqueta: "Pasteurizador" },
    { valor: `${d.tanques} × ${litros(d.litrosPorTanque)} L`, etiqueta: `Tanques de fermentación · ciclo de ${d.cicloHoras} h` },
    { valor: `${litros(d.envasadora)} L/h`, etiqueta: "Envasadora actual" },
  ];
}

export function condicionesPlanta(d: DatosPlanta) {
  return (
    `La planta trabaja ${d.horasPorDia} horas por día, con ${Math.round(d.eficiencia * 100)} % de eficiencia ` +
    `(limpiezas y paradas). Cada botella es de 1 litro.`
  );
}

export const MUESTRA_LA_PLANTA = "Estas son mis máquinas. Mi hijo dice que la envasadora es el problema… ¿tú qué calculas?";

export const PREGUNTA_CAPACIDAD = "Antes de aconsejar: ¿cuántas botellas por día puede sacar HOY la planta?";

export const PISTA_CAPACIDAD: Record<Exclude<Diagnostico, "correcta">, string> = {
  "sumo-maquinas": "«¿Sumaste las máquinas? El yogur pasa por todas, una tras otra: no se juntan.»",
  "sin-eficiencia": "«Casi… ¿y las limpiezas? No trabajamos todo el día sin parar.»",
  "tomo-envasadora": "«Eso envasaría la máquina… si le llegara el yogur. ¿Qué etapa es la más lenta?»",
  "tomo-pasteurizador": "«El pasteurizador va rápido, pero después el yogur tiene que esperar. ¿Dónde se atasca?»",
  "un-solo-tanque": `«Ojo, tengo dos tanques, no uno. Mira cuántos litros fermentan a la vez.»`,
  otra: "«Ayer contamos las botellas y no salió eso. Mira qué máquina hace esperar a las otras.»",
};

/** La explicación que da el socio si el alumno la pide (queda en el registro). */
export function ayudaCapacidad(d: DatosPlanta) {
  const ferm = ritmoFermentacion(d);
  return [
    `Cada etapa deja pasar cierta cantidad de litros por hora. El pasteurizador, ${litros(d.pasteurizador)}; la envasadora, ${litros(d.envasadora)}.`,
    `La fermentación: ${d.tanques} tanques de ${litros(d.litrosPorTanque)} L tardan ${d.cicloHoras} h, o sea ${litros(Math.round(ferm * 10) / 10)} L por hora.`,
    `El yogur pasa por las tres, una tras otra: sale al ritmo de la más lenta. Multiplica ese ritmo por las horas y por la eficiencia.`,
  ];
}

export function aciertoCapacidad(d: DatosPlanta) {
  return `¡${bs(capacidadDiaria(d))} botellas, exacto! Eso contamos ayer. Entonces… ¿qué hago con la plata?`;
}

export function opciones(d: DatosPlanta): { id: Opcion; letra: string; texto: string; precio: string }[] {
  return [
    { id: "envasadora", letra: "A", texto: `Comprar la envasadora automática (${litros(d.envasadoraNueva)} L/h)`, precio: plata(d.precioEnvasadoraNueva) },
    { id: "tanque", letra: "B", texto: `Comprar un tercer tanque de fermentación (${litros(d.litrosPorTanque)} L)`, precio: plata(d.precioTanque) },
    { id: "nada", letra: "C", texto: "No comprar nada y rechazar pedidos", precio: plata(0) },
  ];
}

export function antesDeFirmar(opcion: "envasadora" | "tanque") {
  return opcion === "tanque"
    ? "Un tercer tanque, entonces. Antes de pagarlo, hagamos la cuenta."
    : "La envasadora, entonces. Antes de pagarla, hagamos la cuenta.";
}

export const PREGUNTA_COMPRA = "Antes de firmar: con esa compra, ¿cuántas botellas por día va a sacar la planta?";

export const PISTA_COMPRA: Record<Exclude<DiagnosticoCompra, "correcta">, string> = {
  "creyo-que-sube": "«¿Tanto? La envasadora nueva sólo envasa lo que le llega. ¿Llega más yogur que antes?»",
  "sin-eficiencia": "«Acuérdate de las limpiezas: la eficiencia sigue siendo la misma.»",
  otra: "«Hazlo como antes: busca la etapa más lenta con la compra ya puesta.»",
};

export function despuesDeUnMes(d: DatosPlanta, opcion: Opcion) {
  const c = consecuencia(d, opcion);
  const hoy = capacidadDiaria(d);
  if (opcion === "envasadora") {
    return (
      `Pasó un mes… La envasadora nueva brilla, pero se queda esperando: siguen saliendo ${bs(hoy)} botellas. ` +
      `Faltan ${bs(c.pedidosPerdidosPorDia)} por día y gastamos ${plata(c.gasto)}. Mi hijo está furioso.`
    );
  }
  if (opcion === "tanque") {
    return (
      `¡Pasó un mes y la planta vuela! Con ${d.tanques + 1} tanques salen ${bs(c.capacidad)} botellas por día: ` +
      `atendemos los ${bs(d.pedidosPorDia)} pedidos y todavía sobra.`
    );
  }
  return (
    `Pasó un mes. No gastamos nada… pero rechazamos ${bs(c.pedidosPerdidosPorDia)} pedidos por día. ` +
    `Dos tiendas ya le compran a la competencia.`
  );
}

export function preguntaRecuperacion(d: DatosPlanta) {
  return (
    `Cada litro que vendo me deja ${plata(d.margenPorLitro)}, y trabajamos ${d.diasPorMes} días al mes. ` +
    `¿En cuántos meses recupero los ${plata(d.precioTanque)} del tanque? Escríbelo con un decimal.`
  );
}

export const PISTA_RECUPERACION: Record<Exclude<DiagnosticoRecuperacion, "correcta">, string> = {
  "conto-lo-que-no-se-vende": "«Puedo hacer más botellas, sí, pero sólo vendo las que me piden. ¿Cuántas más vendo por día?»",
  "dio-dias": "«Eso son días, no meses: el margen que usaste es el de un solo día.»",
  otra: "«Primero: cuántas botellas más vendo por día. Después, cuánto me deja eso en un mes.»",
};

export function aciertoRecuperacion(d: DatosPlanta) {
  const c = consecuencia(d, "tanque");
  return (
    `¡Eso! Vendo ${bs(d.pedidosPorDia - capacidadDiaria(d))} botellas más por día: ${plata(c.margenExtraPorMes)} al mes. ` +
    `En ${unDecimal(c.mesesRecuperacion!)} meses el tanque se paga solo.`
  );
}

export function preguntaDefensa(eligio: Opcion) {
  return eligio === "tanque"
    ? "El docente te va a preguntar: «¿Por qué no bastaba con una máquina más rápida?»"
    : "El docente te va a preguntar: «¿Qué le aconsejaste a Don Mario, y por qué?»";
}

export const PIDE_RECUPERACION = "Meses para recuperar el tanque:";

export const PIDE_ARGUMENTO = "Esto lo vas a defender en clase frente al docente. Escribe tu argumento (unas tres líneas):";

export const FINAL =
  "Tu decisión, tus cálculos y tu argumento quedaron en el registro. La nota sale de acá más tu defensa en clase. " +
  "Próxima escena: «La cámara de frío que se llenó» (Semana 2).";
