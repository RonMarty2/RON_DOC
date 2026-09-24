/**
 * SISTEMA DE QUESTS — Gestión de misiones del estudiante.
 */

import type { DefinicionQuest, EstadoJuego, EstadoMateria } from "./types";
import { QUESTS_POR_MATERIA } from "@content/gamificacion/quests";

/** Devuelve todas las quests de una materia. */
export function obtenerQuestsMateria(slugMateria: string): DefinicionQuest[] {
  return QUESTS_POR_MATERIA[slugMateria] ?? [];
}

/** Comprueba si una quest está disponible (prerequisitos cumplidos). */
export function estaQuestDisponible(
  quest: DefinicionQuest,
  estado: EstadoJuego
): boolean {
  const em = estado.materias[quest.materia];
  if (!em) {
    // Si no hay estado de materia, solo disponible si no requiere quest previa
    return !quest.requiereQuest;
  }

  // Si ya está completada, no está "disponible" (está hecha)
  if (em.questsCompletadas.includes(quest.id)) return false;

  // Quest de lectura: siempre disponible (no tiene prerequisito de quest)
  if (!quest.requiereQuest) return true;

  // Verificar prerequisito
  return em.questsCompletadas.includes(quest.requiereQuest);
}

/** Comprueba si una quest ya fue completada. */
export function estaQuestCompletada(
  quest: DefinicionQuest,
  estado: EstadoJuego
): boolean {
  const em = estado.materias[quest.materia];
  if (!em) return false;
  return em.questsCompletadas.includes(quest.id);
}

/** Marca una quest como completada. Retorna el estado actualizado. */
export function completarQuest(
  questId: string,
  estado: EstadoJuego
): EstadoJuego {
  // Buscar la quest en todas las materias
  for (const [slug, quests] of Object.entries(QUESTS_POR_MATERIA)) {
    const quest = quests.find((q) => q.id === questId);
    if (!quest) continue;

    const em: EstadoMateria = estado.materias[slug] ?? {
      slug,
      temasLeidos: [],
      quizzes: {},
      questsCompletadas: [],
      xpMateria: 0,
    };

    if (!em.questsCompletadas.includes(questId)) {
      em.questsCompletadas = [...em.questsCompletadas, questId];
    }

    return {
      ...estado,
      materias: { ...estado.materias, [slug]: em },
    };
  }
  return estado;
}

/** Determina el estado visual de una quest. */
export function estadoVisualQuest(
  quest: DefinicionQuest,
  estado: EstadoJuego
): "bloqueada" | "disponible" | "completada" {
  if (estaQuestCompletada(quest, estado)) return "completada";
  if (estaQuestDisponible(quest, estado)) return "disponible";
  return "bloqueada";
}
