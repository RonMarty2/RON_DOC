import type { Isla } from "@/lib/types";

/**
 * ISLAS DEL JUEGO
 *
 * Cada isla es el juego de una materia. Sumar una isla = una línea acá; sumar una escena = una
 * herramienta `tipo: "juego"` con `isla: "<slug>"` y `tema: <n>` en `content/materias.ts`. En la
 * página de la materia, la sección Jugar muestra sus temas en orden; los que todavía no tienen
 * juego dicen «En construcción».
 */
export const ISLAS: Isla[] = [
  {
    slug: "proyectos-ii",
    nombre: "Valle de los Proyectos",
    descripcion: "Asesoras emprendimientos del valle: calculas su capacidad y decides en qué conviene invertir.",
    materia: "proyectos-ii",
  },
  {
    slug: "aief",
    nombre: "La ventanilla",
    descripcion: "Eres oficial de créditos: lees los estados financieros de cada cliente y decides a quién prestarle.",
    materia: "analisis-estados-financieros",
    // Títulos de los dossiers de Ronald (carpeta 1_CONTENIDO de la materia).
    temas: [
      { numero: 1, titulo: "Normas internacionales financieras y marco de la información financiera" },
      { numero: 2, titulo: "Análisis e interpretación de los estados financieros básicos" },
      { numero: 3, titulo: "Patrimonio y movimientos patrimoniales" },
      { numero: 4, titulo: "Origen y aplicación de fondos y capital de trabajo" },
      { numero: 5, titulo: "Análisis vertical, horizontal y flujo de efectivo" },
      { numero: 6, titulo: "Razones o ratios financieros" },
      { numero: 7, titulo: "Diagnóstico avanzado" },
    ],
  },
];
