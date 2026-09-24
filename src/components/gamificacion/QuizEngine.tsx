"use client";

/**
 * QuizEngine — Motor principal de quizzes interactivos.
 *
 * Muestra preguntas una a una, maneja el timer, el feedback
 * inmediato, y calcula el resultado final con XP.
 */

import { useState, useEffect, useCallback, useRef } from "react";
import type {
  PreguntaQuiz,
  QuizConfig,
  ResultadoFinal,
  DefinicionLogro,
  DefinicionNivel,
} from "@/lib/gamificacion/types";
import { QuizCard } from "./QuizCard";
import { QuizResults } from "./QuizResults";
import { calcularNivel } from "@/lib/gamificacion/xpSystem";
import { cargarEstado, guardarEstado } from "@/lib/gamificacion/gameState";
import { verificarLogros, obtenerLogro } from "@/lib/gamificacion/achievementSystem";

// ─── Utilidades ─────────────────────────────────────────────────

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function seleccionarPreguntas(
  banco: PreguntaQuiz[],
  cantidad: number
): PreguntaQuiz[] {
  const shuffled = shuffleArray(banco);
  return shuffled.slice(0, Math.min(cantidad, shuffled.length));
}

// ─── Componente ─────────────────────────────────────────────────

interface QuizEngineProps {
  /** Banco completo de preguntas del tema. */
  banco: PreguntaQuiz[];
  config: QuizConfig;
  onVolver: () => void;
}

type Fase = "inicio" | "quiz" | "resultados";

export function QuizEngine({ banco, config, onVolver }: QuizEngineProps) {
  const [fase, setFase] = useState<Fase>("inicio");
  const [preguntas, setPreguntas] = useState<PreguntaQuiz[]>([]);
  const [indicePregunta, setIndicePregunta] = useState(0);
  const [respuestas, setRespuestas] = useState<boolean[]>([]);
  const [respondida, setRespondida] = useState(false);
  const [tiempoInicio, setTiempoInicio] = useState(0);
  const [tiempoRestante, setTiempoRestante] = useState(0);
  const [resultado, setResultado] = useState<ResultadoFinal | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Timer countdown
  useEffect(() => {
    if (fase !== "quiz" || config.tiempoLimite <= 0) return;

    timerRef.current = setInterval(() => {
      setTiempoRestante((prev) => {
        if (prev <= 1) {
          // Se acabó el tiempo → finalizar
          clearInterval(timerRef.current!);
          finalizarQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fase]);

  const iniciarQuiz = useCallback(() => {
    const seleccionadas = seleccionarPreguntas(banco, config.numPreguntas);
    setPreguntas(seleccionadas);
    setIndicePregunta(0);
    setRespuestas([]);
    setRespondida(false);
    setTiempoInicio(Date.now());
    setTiempoRestante(config.tiempoLimite);
    setResultado(null);
    setFase("quiz");
  }, [banco, config]);

  const finalizarQuiz = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    const correctas = respuestas.filter(Boolean).length;
    const total = preguntas.length;
    const puntaje = total > 0 ? Math.round((correctas / total) * 100) : 0;
    const tiempoSegundos = Math.round((Date.now() - tiempoInicio) / 1000);
    const aprobado = puntaje >= config.puntajeMinimo;

    // Calcular XP
    let xpGanada = 0;
    if (aprobado) {
      const baseXP: Record<string, number> = {
        "quiz-rapido": 100,
        desafio: 150,
        boss: 300,
        lectura: 50,
      };
      xpGanada = baseXP[config.tipo] ?? 100;

      // Bonus por puntaje perfecto
      if (puntaje === 100) xpGanada = Math.round(xpGanada * 1.5);
    } else {
      // XP parcial por intentar
      xpGanada = Math.round(puntaje * 0.3);
    }

    // Actualizar estado del juego
    const estado = cargarEstado();
    const nivelAnterior = estado.perfil.nivel;
    estado.perfil.xpTotal += xpGanada;

    // Registrar quiz
    const quizId = `${config.materia}-tema-${config.tema}-${config.tipo}`;
    const materiaEstado = estado.materias[config.materia] ?? {
      slug: config.materia,
      temasLeidos: [],
      quizzes: {},
      questsCompletadas: [],
      xpMateria: 0,
    };

    const quizAnterior = materiaEstado.quizzes[quizId];
    materiaEstado.quizzes[quizId] = {
      quizId,
      intentos: (quizAnterior?.intentos ?? 0) + 1,
      mejorPuntaje: Math.max(quizAnterior?.mejorPuntaje ?? 0, puntaje),
      ultimoIntento: new Date().toISOString(),
      preguntasRespondidas: total,
      preguntasCorrectas: correctas,
      tiempoSegundos,
    };
    materiaEstado.xpMateria += xpGanada;

    // Completar quest si aprobó
    if (aprobado && config.questId) {
      if (!materiaEstado.questsCompletadas.includes(config.questId)) {
        materiaEstado.questsCompletadas.push(config.questId);
      }
    }

    estado.materias[config.materia] = materiaEstado;

    // Calcular nuevo nivel
    const infoNivel = calcularNivel(estado.perfil.xpTotal);
    estado.perfil.nivel = infoNivel.nivel;

    // Actualizar racha
    const hoy = new Date().toISOString().split("T")[0];
    const ultimaAct = estado.perfil.ultimaActividad?.split("T")[0];
    if (ultimaAct !== hoy) {
      const ayer = new Date(Date.now() - 86400000).toISOString().split("T")[0];
      if (ultimaAct === ayer) {
        estado.perfil.rachaActual += 1;
      } else {
        estado.perfil.rachaActual = 1;
      }
      estado.perfil.rachaMaxima = Math.max(
        estado.perfil.rachaMaxima,
        estado.perfil.rachaActual
      );
    }
    estado.perfil.ultimaActividad = new Date().toISOString();

    // Historial
    estado.historial.unshift({
      fecha: new Date().toISOString(),
      tipo: "quiz",
      detalle: `Quiz ${config.tipo} — Tema ${config.tema}: ${puntaje}%`,
      xp: xpGanada,
    });
    if (estado.historial.length > 50) estado.historial.length = 50;

    // Verificar logros nuevos
    const logrosNuevosIds = verificarLogros(estado);
    const logrosNuevos: DefinicionLogro[] = [];
    for (const id of logrosNuevosIds) {
      estado.logrosDesbloqueados.push(id);
      const logro = obtenerLogro(id);
      if (logro) {
        logrosNuevos.push(logro);
        estado.perfil.xpTotal += logro.xpBonus;
        xpGanada += logro.xpBonus;
      }
    }

    // Recalcular nivel después de bonus de logros
    const nivelFinal = calcularNivel(estado.perfil.xpTotal);
    estado.perfil.nivel = nivelFinal.nivel;

    guardarEstado(estado);

    // Nivel nuevo?
    let nuevoNivel: DefinicionNivel | undefined;
    if (nivelFinal.nivel > nivelAnterior) {
      nuevoNivel = nivelFinal.definicion;
      estado.historial.unshift({
        fecha: new Date().toISOString(),
        tipo: "nivel",
        detalle: `¡Subiste al nivel ${nivelFinal.nivel}: ${nivelFinal.definicion.nombre}!`,
        xp: 0,
      });
      guardarEstado(estado);
    }

    setResultado({
      correctas,
      total,
      puntaje,
      tiempoSegundos,
      xpGanada,
      nuevoNivel,
      logrosNuevos,
      aprobado,
    });
    setFase("resultados");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [respuestas, preguntas, tiempoInicio, config]);

  const handleAnswer = useCallback(
    (esCorrecta: boolean) => {
      setRespuestas((prev) => [...prev, esCorrecta]);
      setRespondida(true);
    },
    []
  );

  const siguientePregunta = useCallback(() => {
    if (indicePregunta < preguntas.length - 1) {
      setIndicePregunta((prev) => prev + 1);
      setRespondida(false);
    } else {
      finalizarQuiz();
    }
  }, [indicePregunta, preguntas.length, finalizarQuiz]);

  // ─── Renderizado ─────────────────────────────────────────────

  if (fase === "inicio") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900">
          {/* Header */}
          <div className="bg-gradient-to-br from-blue-500 to-violet-600 px-6 py-8 text-center text-white">
            <span className="text-5xl">
              {config.tipo === "boss"
                ? "🐉"
                : config.tipo === "desafio"
                  ? "🔥"
                  : "⚡"}
            </span>
            <h2 className="mt-3 font-serif text-2xl font-bold">
              {config.tipo === "boss"
                ? "Boss Battle"
                : config.tipo === "desafio"
                  ? "Desafío"
                  : "Quiz Rápido"}
            </h2>
            <p className="mt-1 text-blue-100">Tema {config.tema}</p>
          </div>

          {/* Info */}
          <div className="space-y-4 px-6 py-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {config.numPreguntas}
                </p>
                <p className="text-xs text-slate-500">Preguntas</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {config.tiempoLimite > 0
                    ? `${Math.floor(config.tiempoLimite / 60)} min`
                    : "∞"}
                </p>
                <p className="text-xs text-slate-500">Tiempo</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {config.puntajeMinimo}%
                </p>
                <p className="text-xs text-slate-500">Para aprobar</p>
              </div>
            </div>

            <p className="text-center text-sm text-slate-600 dark:text-slate-400">
              Las preguntas se seleccionan aleatoriamente de un banco de{" "}
              <strong>{banco.length}</strong> preguntas.
            </p>

            <div className="flex gap-3">
              <button
                onClick={onVolver}
                className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                ← Volver
              </button>
              <button
                onClick={iniciarQuiz}
                className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-3 text-sm font-bold text-white shadow-lg transition hover:shadow-xl hover:brightness-110"
              >
                ¡Comenzar! 🚀
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (fase === "resultados" && resultado) {
    return (
      <QuizResults
        resultado={resultado}
        config={config}
        onRepetir={iniciarQuiz}
        onVolver={onVolver}
      />
    );
  }

  // ─── Fase: quiz ─────────────────────────────────────────────

  const preguntaActual = preguntas[indicePregunta];
  if (!preguntaActual) return null;

  const progreso = ((indicePregunta + 1) / preguntas.length) * 100;
  const minutos = Math.floor(tiempoRestante / 60);
  const segundos = tiempoRestante % 60;

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      {/* Barra de progreso y timer */}
      <div className="mb-6 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-slate-700 dark:text-slate-300">
            Pregunta {indicePregunta + 1} de {preguntas.length}
          </span>
          {config.tiempoLimite > 0 && (
            <span
              className={`font-mono font-bold ${
                tiempoRestante < 60
                  ? "text-red-500 animate-pulse"
                  : tiempoRestante < 180
                    ? "text-amber-500"
                    : "text-slate-600 dark:text-slate-400"
              }`}
            >
              ⏱ {minutos}:{segundos.toString().padStart(2, "0")}
            </span>
          )}
        </div>

        {/* Barra visual */}
        <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-500 ease-out"
            style={{ width: `${progreso}%` }}
          />
        </div>

        {/* Indicadores de respuestas */}
        <div className="flex gap-1">
          {preguntas.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i < respuestas.length
                  ? respuestas[i]
                    ? "bg-green-500"
                    : "bg-red-500"
                  : i === indicePregunta
                    ? "bg-blue-500"
                    : "bg-slate-200 dark:bg-slate-700"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Pregunta */}
      <QuizCard
        pregunta={preguntaActual}
        onAnswer={handleAnswer}
        mostrarFeedback={respondida}
        respondida={respondida}
      />

      {/* Botón siguiente */}
      {respondida && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={siguientePregunta}
            className="rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:shadow-xl hover:brightness-110"
          >
            {indicePregunta < preguntas.length - 1
              ? "Siguiente →"
              : "Ver Resultados 🏆"}
          </button>
        </div>
      )}
    </div>
  );
}
