import type { Isla } from "@/lib/types";

/**
 * ISLAS DEL JUEGO
 *
 * Cada isla es una materia. Sumar una isla = una línea acá; sumar un juego = una herramienta
 * `tipo: "juego"` con `isla: "<slug>"` en `content/materias.ts`. El orden de esta lista es el de
 * la página /juegos. Una isla sin juegos publicados se nombra como "en construcción".
 */
export const ISLAS: Isla[] = [
  {
    slug: "proyectos-ii",
    nombre: "Proyectos II",
    descripcion: "Asesoras emprendimientos del valle: calculas su capacidad y decides en qué conviene invertir.",
  },
  {
    slug: "aief",
    nombre: "Análisis e Interpretación de Estados Financieros",
    descripcion: "Eres oficial de créditos: lees los estados financieros de cada cliente y decides a quién prestarle.",
  },
];
