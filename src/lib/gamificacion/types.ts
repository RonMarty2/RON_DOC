/**
 * TIPOS DEL SISTEMA DE GAMIFICACIÓN
 *
 * Este archivo define TODOS los tipos compartidos entre el parser GIFT,
 * el motor de quizzes, el estado del juego y los componentes de UI.
 *
 * ⚠️  NO modificar las interfaces de datos parseados sin actualizar
 *     también el script parse-gift.ts y los JSON generados.
 */

// ─────────────────────────────────────────────────────────────
// Preguntas parseadas del formato GIFT
// ─────────────────────────────────────────────────────────────

export type TipoPregunta =
  | "opcion-multiple"
  | "verdadero-falso"
  | "emparejamiento"
  | "seleccion-multiple";

export interface OpcionQuiz {
  /** Texto de la opción. */
  texto: string;
  /** Si es la respuesta correcta (MC) o una de las correctas (SM). */
  esCorrecta: boolean;
  /** Peso porcentual para selección múltiple ponderada (ej. 25, -50). */
  peso?: number;
  /** Retroalimentación específica de esta opción (texto después de #). */
  feedback?: string;
}

export interface ParejaQuiz {
  /** Término o concepto (lado izquierdo). */
  izquierda: string;
  /** Definición o correspondencia (lado derecho). */
  derecha: string;
}

export interface PreguntaQuiz {
  /** Identificador único dentro del banco (ej. "INC-01", "ESP-03"). */
  id: string;
  /** Tipo de pregunta. */
  tipo: TipoPregunta;
  /** Texto del enunciado. */
  enunciado: string;
  /** Opciones (para MC y SM). */
  opciones?: OpcionQuiz[];
  /** Parejas (para emparejamiento). */
  parejas?: ParejaQuiz[];
  /** Respuesta correcta (para V/F). */
  respuestaVF?: boolean;
  /** Retroalimentación general de la pregunta. */
  feedbackGeneral?: string;
  /** Categoría GIFT ($CATEGORY). */
  categoria?: string;
  /** Nombre del archivo GIFT de origen. */
  fuente: string;
  /** Número de tema (1–6). */
  tema: number;
}

export interface BancoQuiz {
  /** Slug de la materia (ej. "psicoestadistica"). */
  materia: string;
  /** Número de tema. */
  tema: number;
  /** Conteo total de preguntas. */
  totalPreguntas: number;
  /** Array de preguntas parseadas. */
  preguntas: PreguntaQuiz[];
}

// ─────────────────────────────────────────────────────────────
// Estado del juego (persistido en localStorage)
// ─────────────────────────────────────────────────────────────

export interface PerfilJugador {
  nombre: string;
  /** Emoji o iniciales para el avatar. */
  avatar: string;
  xpTotal: number;
  nivel: number;
  rachaActual: number;
  rachaMaxima: number;
  /** Fecha ISO de la última actividad registrada. */
  ultimaActividad: string;
  /** Fecha ISO de creación del perfil. */
  fechaCreacion: string;
}

export interface ResultadoQuiz {
  /** ID del quiz (ej. "psicoestadistica-tema-1-rapido"). */
  quizId: string;
  /** Número total de intentos. */
  intentos: number;
  /** Mejor puntaje obtenido (0–100). */
  mejorPuntaje: number;
  /** Fecha ISO del último intento. */
  ultimoIntento: string;
  /** Total de preguntas respondidas en el último intento. */
  preguntasRespondidas: number;
  /** Preguntas correctas en el último intento. */
  preguntasCorrectas: number;
  /** Tiempo del último intento en segundos. */
  tiempoSegundos: number;
}

export interface EstadoMateria {
  slug: string;
  /** Slugs de los temas marcados como leídos. */
  temasLeidos: string[];
  /** Resultados de quizzes indexados por quizId. */
  quizzes: Record<string, ResultadoQuiz>;
  /** IDs de quests completadas. */
  questsCompletadas: string[];
  /** XP acumulada en esta materia. */
  xpMateria: number;
}

export interface EntradaHistorial {
  fecha: string;
  tipo: "quiz" | "lectura" | "logro" | "nivel";
  detalle: string;
  xp: number;
}

export interface EstadoJuego {
  /** Versión del esquema (para migraciones futuras). */
  version: number;
  perfil: PerfilJugador;
  /** Estado por materia, indexado por slug. */
  materias: Record<string, EstadoMateria>;
  /** IDs de logros desbloqueados. */
  logrosDesbloqueados: string[];
  /** Historial de actividades recientes. */
  historial: EntradaHistorial[];
}

// ─────────────────────────────────────────────────────────────
// Definiciones de contenido (estáticas, en content/gamificacion/)
// ─────────────────────────────────────────────────────────────

export interface DefinicionNivel {
  nivel: number;
  nombre: string;
  icono: string;
  /** XP necesaria para subir DESDE el nivel anterior. */
  xpRequerida: number;
  /** XP total acumulada al alcanzar este nivel. */
  xpAcumulada: number;
}

export interface DefinicionLogro {
  id: string;
  nombre: string;
  descripcion: string;
  icono: string;
  /** XP bonus al desbloquear. */
  xpBonus: number;
  /** Descripción legible de la condición (para UI). */
  condicion: string;
  /** Si es true, no se muestra hasta desbloquearlo. */
  oculto?: boolean;
  /** Categoría para agrupar en la UI. */
  categoria?: "general" | "materia" | "social" | "secreto";
}

export type TipoQuest =
  | "lectura"
  | "quiz-rapido"
  | "desafio"
  | "boss";

export interface DefinicionQuest {
  /** ID único (ej. "pde-t1-lectura"). */
  id: string;
  tipo: TipoQuest;
  nombre: string;
  descripcion: string;
  icono: string;
  /** XP otorgada al completar. */
  xpRecompensa: number;
  /** Slug de la materia. */
  materia: string;
  /** Número de tema (1–6). */
  tema?: number;
  /** Slug del tema para la quest de lectura. */
  slugTema?: string;
  /** Número de preguntas del quiz. */
  numPreguntas?: number;
  /** Tiempo límite en segundos (0 = sin límite). */
  tiempoLimiteSegundos?: number;
  /** Puntaje mínimo para aprobar (0–100). */
  puntajeMinimo?: number;
  /** ID de la quest prerequisito. */
  requiereQuest?: string;
}

// ─────────────────────────────────────────────────────────────
// Props de componentes de UI de gamificación
// ─────────────────────────────────────────────────────────────

export interface QuizConfig {
  /** Slug de la materia. */
  materia: string;
  /** Número de tema. */
  tema: number;
  /** Tipo de quiz (determina dificultad y tiempo). */
  tipo: TipoQuest;
  /** Número de preguntas a mostrar. */
  numPreguntas: number;
  /** Tiempo límite en segundos (0 = sin límite). */
  tiempoLimite: number;
  /** Puntaje mínimo para aprobar. */
  puntajeMinimo: number;
  /** ID de la quest asociada (si aplica). */
  questId?: string;
}

export interface ResultadoFinal {
  correctas: number;
  total: number;
  puntaje: number;
  tiempoSegundos: number;
  xpGanada: number;
  nuevoNivel?: DefinicionNivel;
  logrosNuevos: DefinicionLogro[];
  aprobado: boolean;
}
