/**
 * Navegación de la herramienta "Aula Interactiva de Probabilidad".
 *
 * Sigue el temario real de Psicoestadística Inferencial — Unidad 2
 * (Probabilidad y distribución de probabilidad). Fase 1: apartados 2.1 a 2.6
 * (fundamentos + Teorema de Bayes). Fase 2 (2.7-2.9, distribuciones) se suma
 * más adelante.
 *
 * Cada módulo sigue el mismo patrón: ejemplo clásico (dados, cartas, urnas)
 * primero, para fijar el concepto sin ruido; después el mismo concepto
 * aplicado al dataset real de 200 estudiantes (PTSMU: PHQ-9 + GAD-7 + Dx).
 *
 * Estilos aislados bajo la clase raíz `.aula-probabilidad`.
 */

export type ModuloId =
  | "espacio-muestral"
  | "tipos-probabilidad"
  | "tablas-contingencia"
  | "combinatoria"
  | "reglas-basicas"
  | "bayes";

export interface ModuloMeta {
  id: ModuloId;
  apartado: string;
  icono: string;
  titulo: string;
  subtitulo: string;
  resumen: string;
}

export const MODULOS: ModuloMeta[] = [
  {
    id: "espacio-muestral",
    apartado: "2.1",
    icono: "🎲",
    titulo: "Espacio muestral",
    subtitulo: "Experimento aleatorio, universo, suceso",
    resumen:
      "Tirá un dado, después dos. Del espacio muestral simple {1..6} al compuesto de 36 pares. Después: los 28 puntajes posibles del PHQ-9.",
  },
  {
    id: "tipos-probabilidad",
    apartado: "2.2",
    icono: "🔮",
    titulo: "Tipos de probabilidad",
    subtitulo: "Clásica, frecuentista, subjetiva",
    resumen:
      "Un dado (clásica) vs. mil tiradas de moneda (frecuentista). Después: elegir un estudiante al azar vs. la prevalencia real observada en 200 casos.",
  },
  {
    id: "tablas-contingencia",
    apartado: "2.3",
    icono: "🔲",
    titulo: "Tablas de contingencia",
    subtitulo: "Conjunta, marginal, condicional",
    resumen:
      "Un dado cruzado por color. Después: PHQ-9 × diagnóstico confirmado — sensibilidad 88%, especificidad 88%, VPP apenas 51.2%.",
  },
  {
    id: "combinatoria",
    apartado: "2.4",
    icono: "🃏",
    titulo: "Teoría combinatoria",
    subtitulo: "Factorial, permutación, combinación",
    resumen:
      "Manos de cartas: ¿importa el orden? Después: de 43 estudiantes positivos, ¿de cuántas formas se eligen 5 para entrevistar? 962,598.",
  },
  {
    id: "reglas-basicas",
    apartado: "2.5",
    icono: "➕",
    titulo: "Reglas básicas",
    subtitulo: "Suma, producto, independencia",
    resumen:
      "Dados y monedas independientes. Después: P(depresión o ansiedad) = 23.5%, y por qué NO son independientes (comorbilidad).",
  },
  {
    id: "bayes",
    apartado: "2.6",
    icono: "🧪",
    titulo: "Teorema de Bayes",
    subtitulo: "El clímax: la falacia de la tasa base",
    resumen:
      "Urnas con bolitas. Después: un test con 88% de sensibilidad, ¿90% de certeza si da positivo? No: 51.2%. La prevalencia es la mitad del cálculo.",
  },
];

export function moduloPorId(id: ModuloId): ModuloMeta {
  return MODULOS.find((m) => m.id === id) ?? MODULOS[0];
}
