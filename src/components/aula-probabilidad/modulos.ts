/**
 * Navegación de la herramienta "Aula Interactiva de Probabilidad".
 *
 * Estructura:
 *  - Preámbulo ("El misterio"): engancha sin enseñar todavía.
 *  - Contexto ("El caso"): qué es un tamizaje y de dónde salen los datos.
 *  - Temario real de Psicoestadística Inferencial — Unidad 2, apartados 2.1
 *    a 2.6 (fundamentos + Teorema de Bayes). Fase 2 (2.7-2.9,
 *    distribuciones) se suma más adelante.
 *
 * Cada módulo del temario sigue el patrón de libro: se define el término
 * (corto, sin ejemplo) y recién después aparece el interactivo que lo
 * ejemplifica — primero con objetos clásicos (dados, cartas, urnas),
 * después con el dataset real de 200 estudiantes.
 *
 * Estilos aislados bajo la clase raíz `.aula-probabilidad`.
 */

import type { BloqueId } from "./bloques";

export type ModuloId =
  | "misterio"
  | "el-caso"
  | "espacio-muestral"
  | "tipos-probabilidad"
  | "tablas-contingencia"
  | "combinatoria"
  | "reglas-basicas"
  | "bayes"
  | "variables-aleatorias"
  | "discretas"
  | "normal";

export interface ModuloMeta {
  id: ModuloId;
  /** Bloque temático al que pertenece; define su color de acento. */
  bloque: BloqueId;
  /** Número del apartado en el dossier. Vacío en preámbulo y contexto. */
  apartado?: string;
  icono: string;
  titulo: string;
  subtitulo: string;
  resumen: string;
}

export const MODULOS: ModuloMeta[] = [
  {
    id: "misterio",
    bloque: "preambulo",
    icono: "🔍",
    titulo: "El misterio",
    subtitulo: "Antes de empezar",
    resumen:
      "Un test que casi nunca falla, y sin embargo la mitad de sus alarmas son falsas. ¿Cómo puede ser?",
  },
  {
    id: "el-caso",
    bloque: "preambulo",
    icono: "📋",
    titulo: "El caso",
    subtitulo: "De dónde salen los datos",
    resumen:
      "Qué es un tamizaje, cómo se arma un puntaje y qué contienen las 200 fichas con las que vamos a trabajar todo el capítulo.",
  },
  {
    id: "espacio-muestral",
    bloque: "fundamentos",
    apartado: "2.1",
    icono: "🎲",
    titulo: "Espacio muestral",
    subtitulo: "Experimento aleatorio, universo, suceso",
    resumen:
      "Del espacio muestral simple de un dado al compuesto de 36 pares. Después: los 28 puntajes posibles del cuestionario.",
  },
  {
    id: "tipos-probabilidad",
    bloque: "fundamentos",
    apartado: "2.2",
    icono: "🔮",
    titulo: "Tipos de probabilidad",
    subtitulo: "Clásica, frecuentista, subjetiva",
    resumen:
      "Un dado (clásica) vs. mil tiradas de moneda (frecuentista). Después: elegir un estudiante al azar vs. la proporción real observada en 200 casos.",
  },
  {
    id: "tablas-contingencia",
    bloque: "calculo",
    apartado: "2.3",
    icono: "🔲",
    titulo: "Tablas de contingencia",
    subtitulo: "Conjunta, marginal, condicional",
    resumen:
      "Un dado cruzado por color. Después: la tabla de 4 celdas que hace visible por qué sensibilidad y valor predictivo NO son lo mismo.",
  },
  {
    id: "combinatoria",
    bloque: "calculo",
    apartado: "2.4",
    icono: "🃏",
    titulo: "Teoría combinatoria",
    subtitulo: "Factorial, permutación, combinación",
    resumen:
      "Manos de cartas: ¿importa el orden? Después: de 43 estudiantes positivos, ¿de cuántas formas se eligen 5 para entrevistar? 962,598.",
  },
  {
    id: "reglas-basicas",
    bloque: "calculo",
    apartado: "2.5",
    icono: "➕",
    titulo: "Reglas básicas",
    subtitulo: "Suma, producto, independencia",
    resumen:
      "Dados y monedas independientes. Después: por qué depresión y ansiedad NO son independientes, y qué error produce suponer que sí.",
  },
  {
    id: "bayes",
    bloque: "bayes",
    apartado: "2.6",
    icono: "🧪",
    titulo: "Teorema de Bayes",
    subtitulo: "La respuesta al misterio",
    resumen:
      "Urnas con bolitas. Después: de dónde sale exactamente ese 51.2% que abrió el capítulo, y por qué la prevalencia es la mitad del cálculo.",
  },
  {
    id: "variables-aleatorias",
    bloque: "distribuciones",
    apartado: "2.7",
    icono: "📈",
    titulo: "Variables aleatorias",
    subtitulo: "Distribuciones, esperanza y varianza",
    resumen:
      "Hasta acá preguntamos por eventos sueltos. Ahora describimos el comportamiento completo de una variable de una sola vez, y lo resumimos en dos números.",
  },
  {
    id: "discretas",
    bloque: "distribuciones",
    apartado: "2.8",
    icono: "🎯",
    titulo: "Distribuciones discretas",
    subtitulo: "Binomial, Poisson e hipergeométrica",
    resumen:
      "Tres preguntas de planificación, tres procesos distintos, tres fórmulas distintas. Confundirlas produce números equivocados que parecen razonables.",
  },
  {
    id: "normal",
    bloque: "distribuciones",
    apartado: "2.9",
    icono: "🔔",
    titulo: "Distribución normal",
    subtitulo: "La campana y la puntuación z",
    resumen:
      "La curva que permite evaluar cualquier punto de corte sin volver a contar el archivo. Cierra el capítulo respondiendo dónde conviene poner el corte.",
  },
];

export function moduloPorId(id: ModuloId): ModuloMeta {
  return MODULOS.find((m) => m.id === id) ?? MODULOS[0];
}
