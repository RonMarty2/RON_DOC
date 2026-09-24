import type { DefinicionQuest } from "@/lib/gamificacion/types";

/**
 * DEFINICIÓN DE QUESTS — Psicoestadística Descriptiva
 *
 * Cada tema con preguntas GIFT tiene 4 misiones secuenciales:
 *   📖 Lectura → ⚡ Quiz Rápido → 🔥 Desafío → 🐉 Boss Battle
 *
 * Temas sin GIFT (5) solo tienen misión de lectura.
 */

function questsDeTema(
  tema: number,
  slugTema: string,
  nombreTema: string,
  tieneQuiz: boolean
): DefinicionQuest[] {
  const prefijo = `pde-t${tema}`;
  const quests: DefinicionQuest[] = [];

  // 1. Lectura
  quests.push({
    id: `${prefijo}-lectura`,
    tipo: "lectura",
    nombre: `Leer: ${nombreTema}`,
    descripcion: `Lee el dossier del Tema ${tema} y marca como completado.`,
    icono: "📖",
    xpRecompensa: 50,
    materia: "psicoestadistica",
    tema,
    slugTema,
  });

  if (!tieneQuiz) return quests;

  // 2. Quiz Rápido
  quests.push({
    id: `${prefijo}-rapido`,
    tipo: "quiz-rapido",
    nombre: `Quiz Rápido: ${nombreTema}`,
    descripcion: `10 preguntas sin tiempo. ¡Solo necesitas 60% para aprobar!`,
    icono: "⚡",
    xpRecompensa: 100,
    materia: "psicoestadistica",
    tema,
    slugTema,
    numPreguntas: 10,
    tiempoLimiteSegundos: 0,
    puntajeMinimo: 60,
    requiereQuest: `${prefijo}-lectura`,
  });

  // 3. Desafío
  quests.push({
    id: `${prefijo}-desafio`,
    tipo: "desafio",
    nombre: `Desafío: ${nombreTema}`,
    descripcion: `20 preguntas en 15 minutos. ¿Estás listo?`,
    icono: "🔥",
    xpRecompensa: 150,
    materia: "psicoestadistica",
    tema,
    slugTema,
    numPreguntas: 20,
    tiempoLimiteSegundos: 900, // 15 min
    puntajeMinimo: 70,
    requiereQuest: `${prefijo}-rapido`,
  });

  // 4. Boss Battle
  quests.push({
    id: `${prefijo}-boss`,
    tipo: "boss",
    nombre: `🐉 Boss: ${nombreTema}`,
    descripcion: `30 preguntas en 20 minutos. ¡La prueba definitiva del tema!`,
    icono: "🐉",
    xpRecompensa: 300,
    materia: "psicoestadistica",
    tema,
    slugTema,
    numPreguntas: 30,
    tiempoLimiteSegundos: 1200, // 20 min
    puntajeMinimo: 75,
    requiereQuest: `${prefijo}-desafio`,
  });

  return quests;
}

export const QUESTS_PSICOESTADISTICA: DefinicionQuest[] = [
  ...questsDeTema(1, "tipos-de-variables", "Tipos de variables y escalas de medición", true),
  ...questsDeTema(2, "tablas-de-frecuencias", "Tablas de frecuencias e histogramas", true),
  ...questsDeTema(3, "medidas-tendencia-central", "Medidas de tendencia central", true),
  ...questsDeTema(4, "correlacion-pearson", "Estadística bidimensional y correlación", true),
  ...questsDeTema(5, "regresion-lineal-simple", "Regresión lineal simple", false),
];

/** Índice de quests por materia para acceso rápido. */
export const QUESTS_POR_MATERIA: Record<string, DefinicionQuest[]> = {
  psicoestadistica: QUESTS_PSICOESTADISTICA,
};
