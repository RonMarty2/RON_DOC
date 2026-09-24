/**
 * SISTEMA DE LOGROS — Verifica condiciones y desbloquea logros.
 */

import type { EstadoJuego } from "./types";
import { LOGROS } from "@content/gamificacion/logros";

/** Cuenta total de preguntas respondidas en todo el juego. */
function totalPreguntasRespondidas(estado: EstadoJuego): number {
  let total = 0;
  for (const materia of Object.values(estado.materias)) {
    for (const quiz of Object.values(materia.quizzes)) {
      total += quiz.preguntasRespondidas;
    }
  }
  return total;
}

/** Cuenta total de quizzes completados. */
function totalQuizzesCompletados(estado: EstadoJuego): number {
  let total = 0;
  for (const materia of Object.values(estado.materias)) {
    total += Object.keys(materia.quizzes).length;
  }
  return total;
}

/** Cuenta boss battles aprobados (quests tipo boss completadas). */
function totalBossCompletados(estado: EstadoJuego): number {
  let total = 0;
  for (const materia of Object.values(estado.materias)) {
    total += materia.questsCompletadas.filter((q) => q.includes("-boss")).length;
  }
  return total;
}

/** Cuenta temas con quizzes realizados. */
function temasConQuizzes(estado: EstadoJuego): number {
  const temas = new Set<string>();
  for (const materia of Object.values(estado.materias)) {
    for (const quizId of Object.keys(materia.quizzes)) {
      // quizId tiene formato "materia-tema-X-tipo"
      const parts = quizId.split("-tema-");
      if (parts[1]) temas.add(parts[1].split("-")[0]);
    }
  }
  return temas.size;
}

/** Verifica si algún quiz tiene puntaje perfecto. */
function tieneQuizPerfecto(estado: EstadoJuego): boolean {
  for (const materia of Object.values(estado.materias)) {
    for (const quiz of Object.values(materia.quizzes)) {
      if (quiz.mejorPuntaje >= 100) return true;
    }
  }
  return false;
}

/** Verifica si algún boss tiene puntaje perfecto. */
function tieneBossPerfecto(estado: EstadoJuego): boolean {
  for (const materia of Object.values(estado.materias)) {
    for (const [id, quiz] of Object.entries(materia.quizzes)) {
      if (id.includes("boss") && quiz.mejorPuntaje >= 100) return true;
    }
  }
  return false;
}

/** Verifica si algún quiz se completó en menos de N segundos. */
function tieneQuizRapido(estado: EstadoJuego, maxSegundos: number): boolean {
  for (const materia of Object.values(estado.materias)) {
    for (const quiz of Object.values(materia.quizzes)) {
      if (quiz.tiempoSegundos > 0 && quiz.tiempoSegundos < maxSegundos) return true;
    }
  }
  return false;
}

/** Hora actual (para logros de horario). */
function horaActual(): number {
  return new Date().getHours();
}

type VerificadorLogro = (estado: EstadoJuego) => boolean;

/** Mapa de verificadores por ID de logro. */
const VERIFICADORES: Record<string, VerificadorLogro> = {
  // Primeros pasos
  "primer-paso": (e) => totalQuizzesCompletados(e) >= 1,
  "lector-novato": (e) =>
    Object.values(e.materias).some((m) => m.temasLeidos.length >= 1),
  "explorador-curioso": (e) => temasConQuizzes(e) >= 3,

  // Maestría
  "francotirador": (e) => tieneQuizPerfecto(e),
  "raton-biblioteca": (e) =>
    Object.values(e.materias).some((m) => m.temasLeidos.length >= 5),
  "sin-piedad": (e) => tieneBossPerfecto(e),

  // Rachas
  "racha-3": (e) => e.perfil.rachaMaxima >= 3,
  "racha-7": (e) => e.perfil.rachaMaxima >= 7,
  "racha-14": (e) => e.perfil.rachaMaxima >= 14,
  "racha-30": (e) => e.perfil.rachaMaxima >= 30,

  // Volumen
  "50-preguntas": (e) => totalPreguntasRespondidas(e) >= 50,
  "100-preguntas": (e) => totalPreguntasRespondidas(e) >= 100,
  "500-preguntas": (e) => totalPreguntasRespondidas(e) >= 500,
  "1000-preguntas": (e) => totalPreguntasRespondidas(e) >= 1000,
  "10-quizzes": (e) => totalQuizzesCompletados(e) >= 10,
  "25-quizzes": (e) => totalQuizzesCompletados(e) >= 25,
  "50-quizzes": (e) => totalQuizzesCompletados(e) >= 50,

  // Boss
  "matadragones": (e) => totalBossCompletados(e) >= 1,
  "cazador-jefes": (e) => totalBossCompletados(e) >= 4,

  // Velocidad
  "rayo": (e) => tieneQuizRapido(e, 120),
  "flash": (e) => tieneQuizRapido(e, 60),

  // Por materia PDE
  "pde-todas-lecturas": (e) =>
    (e.materias["psicoestadistica"]?.temasLeidos.length ?? 0) >= 5,
  "pde-todas-quests": (e) =>
    (e.materias["psicoestadistica"]?.questsCompletadas.length ?? 0) >= 17,
  "pde-t1-maestro": (e) =>
    (e.materias["psicoestadistica"]?.questsCompletadas ?? []).filter((q) =>
      q.startsWith("pde-t1-")
    ).length >= 4,
  "pde-t4-maestro": (e) =>
    (e.materias["psicoestadistica"]?.questsCompletadas ?? []).filter((q) =>
      q.startsWith("pde-t4-")
    ).length >= 4,

  // Niveles
  "nivel-5": (e) => e.perfil.nivel >= 5,
  "nivel-8": (e) => e.perfil.nivel >= 8,
  "nivel-10": (e) => e.perfil.nivel >= 10,

  // Secretos
  "noctambulo": (e) => {
    const h = horaActual();
    return totalQuizzesCompletados(e) >= 1 && h >= 0 && h < 5;
  },
  "madrugador": (e) => {
    const h = horaActual();
    return totalQuizzesCompletados(e) >= 1 && h >= 5 && h < 7;
  },
};

/**
 * Verifica todos los logros y retorna los IDs de los NUEVOS logros desbloqueados
 * (que no estaban ya en `estado.logrosDesbloqueados`).
 */
export function verificarLogros(estado: EstadoJuego): string[] {
  const nuevos: string[] = [];

  for (const logro of LOGROS) {
    // Ya desbloqueado → skip
    if (estado.logrosDesbloqueados.includes(logro.id)) continue;

    const verificador = VERIFICADORES[logro.id];
    if (!verificador) continue;

    if (verificador(estado)) {
      nuevos.push(logro.id);
    }
  }

  return nuevos;
}

/** Obtiene la definición de un logro por ID. */
export function obtenerLogro(id: string) {
  return LOGROS.find((l) => l.id === id);
}
