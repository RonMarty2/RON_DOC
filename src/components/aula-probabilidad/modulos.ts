/**
 * Tipos compartidos por la herramienta "Aula Interactiva de Probabilidad".
 * Vive en /aula-probabilidad. Sus estilos están aislados bajo el prefijo
 * de clase `aula-` para no contaminar el resto del sitio.
 */

export type ModuloId = "aula" | "urna" | "condicional" | "monty" | "bayes";

export interface ModuloMeta {
  id: ModuloId;
  numero: string;
  titulo: string;
  subtitulo: string;
  resumen: string;
}

/**
 * Metadatos visibles de cada módulo. La implementación de cada uno vive en
 * components/aula-probabilidad/Modulo<Id>.tsx
 */
export const MODULOS: ModuloMeta[] = [
  {
    id: "aula",
    numero: "A",
    titulo: "El Aula",
    subtitulo: "Paradoja del cumpleaños",
    resumen:
      "Avatares con fechas de cumpleaños. ¿Cuántas coincidencias? Acumulador que converge al ≈50% con 23 estudiantes.",
  },
  {
    id: "urna",
    numero: "B",
    titulo: "La Urna",
    subtitulo: "Probabilidad simple y frecuencia",
    resumen:
      "Bolitas de colores y extracciones repetidas. La frecuencia relativa se acerca a la probabilidad teórica.",
  },
  {
    id: "condicional",
    numero: "C",
    titulo: "Condicional",
    subtitulo: "P(A) vs P(A | B)",
    resumen:
      "Avatares con atributos (dormir mal, ansiedad, depresión). Filtrá el aula y mirá cómo cambia la proporción.",
  },
  {
    id: "monty",
    numero: "D",
    titulo: "Monty Hall",
    subtitulo: "La sala de juego",
    resumen:
      "Tres puertas. ¿Cambiás o te quedás? Simulación de 1000 partidas mostrando 33% vs 66%.",
  },
  {
    id: "bayes",
    numero: "E",
    titulo: "Bayes",
    subtitulo: "El positivo de Daniela",
    resumen:
      "Un test «90% preciso» que en realidad da un positivo verdadero de 30%. El clímax de la clase.",
  },
];
