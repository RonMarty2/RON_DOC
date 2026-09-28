import type { Isla } from "@/lib/types";

/**
 * ISLAS DEL JUEGO
 *
 * Cada isla es el juego de una materia. Sumar una isla = una línea acá; sumar una escena = una
 * herramienta `tipo: "juego"` con `isla: "<slug>"` y `tema: <n>` en `content/materias.ts`. En la
 * página de la materia, la sección Jugar muestra sus temas en orden; los que todavía no tienen
 * juego dicen «En construcción».
 *
 * CANDADO DE LAS ETAPAS (Ronald, 27-09: «no quiero estarte recordando qué agentes usar»): un tema sólo
 * puede tener juego si su `plan` dice «aprobado AAAA-MM-DD». Se escribe recién cuando el plan del tema
 * pasó por los agentes (tabla de `.claude/agents/LEEME.md`) y Ronald lo aprobó. Sin eso, `npm test`
 * falla y no se puede subir.
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
    // Ronald eligió el boceto A (el escritorio, tipo Papers, Please) con caras que reaccionan (28-09).
    aspecto: "aprobado 2026-09-28",
    // Títulos de los dossiers de Ronald (carpeta 1_CONTENIDO de la materia).
    temas: [
      // Plan aprobado por Ronald el 27-09 («me gusta la idea») después de pasar por todos los agentes.
      { numero: 1, titulo: "Normas internacionales financieras y marco de la información financiera", plan: "aprobado 2026-09-27" },
      { numero: 2, titulo: "Análisis e interpretación de los estados financieros básicos" },
      { numero: 3, titulo: "Patrimonio y movimientos patrimoniales" },
      { numero: 4, titulo: "Origen y aplicación de fondos y capital de trabajo" },
      { numero: 5, titulo: "Análisis vertical, horizontal y flujo de efectivo" },
      { numero: 6, titulo: "Razones o ratios financieros" },
      { numero: 7, titulo: "Diagnóstico avanzado" },
    ],
  },
];
