"use client";

/**
 * Página de Perfil — /perfil
 *
 * Dashboard completo del estudiante: XP, nivel, rachas, logros, historial.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import type { EstadoJuego } from "@/lib/gamificacion/types";
import { cargarEstado, resetearEstado } from "@/lib/gamificacion/gameState";
import { calcularNivel } from "@/lib/gamificacion/xpSystem";
import { BarraXP } from "@/components/gamificacion/BarraXP";
import { LogroCard } from "@/components/gamificacion/LogroCard";
import { StreakCounter } from "@/components/gamificacion/StreakCounter";
import { LOGROS } from "@content/gamificacion/logros";

export default function PerfilPage() {
  const [estado, setEstado] = useState<EstadoJuego | null>(null);

  useEffect(() => {
    setEstado(cargarEstado());
  }, []);

  if (!estado) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  const infoNivel = calcularNivel(estado.perfil.xpTotal);

  // Estadísticas
  let totalPreguntas = 0;
  let totalCorrectas = 0;
  let totalQuizzes = 0;
  for (const materia of Object.values(estado.materias)) {
    for (const quiz of Object.values(materia.quizzes)) {
      totalPreguntas += quiz.preguntasRespondidas;
      totalCorrectas += quiz.preguntasCorrectas;
      totalQuizzes += 1;
    }
  }
  const precision =
    totalPreguntas > 0 ? Math.round((totalCorrectas / totalPreguntas) * 100) : 0;

  const handleReset = () => {
    if (
      window.confirm(
        "¿Estás seguro? Se borrará TODO tu progreso: XP, logros, quizzes, rachas. Esta acción no se puede deshacer."
      )
    ) {
      resetearEstado();
      setEstado(cargarEstado());
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="border-b border-blue-200 bg-gradient-to-br from-blue-50 via-violet-50 to-blue-50 dark:border-blue-900 dark:from-blue-950/40 dark:via-violet-950/30 dark:to-blue-950/40">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
          <Link
            href="/"
            className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
          >
            ← Inicio
          </Link>

          <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            {/* Avatar */}
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 text-4xl shadow-lg">
              {estado.perfil.avatar || "🎓"}
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h1 className="font-serif text-3xl font-bold text-slate-900 dark:text-slate-100">
                {estado.perfil.nombre || "Estudiante"}
              </h1>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                {infoNivel.definicion.icono} Nivel {infoNivel.nivel} —{" "}
                {infoNivel.definicion.nombre}
              </p>

              <div className="mt-4 max-w-md">
                <BarraXP
                  xpActual={estado.perfil.xpTotal}
                  xpEnNivel={infoNivel.xpEnNivel}
                  xpParaSiguiente={infoNivel.xpParaSiguiente}
                  nivel={infoNivel.nivel}
                  nombreNivel={infoNivel.definicion.nombre}
                  iconoNivel={infoNivel.definicion.icono}
                />
              </div>
            </div>

            {/* Racha */}
            <div className="flex-shrink-0">
              <StreakCounter
                rachaActual={estado.perfil.rachaActual}
                rachaMaxima={estado.perfil.rachaMaxima}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <h2 className="font-serif text-xl font-semibold text-slate-900 dark:text-slate-100">
          Estadísticas
        </h2>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "XP Total", value: estado.perfil.xpTotal.toLocaleString(), icon: "⭐" },
            { label: "Quizzes", value: totalQuizzes, icon: "📝" },
            { label: "Preguntas", value: totalPreguntas, icon: "❓" },
            { label: "Precisión", value: `${precision}%`, icon: "🎯" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-slate-200 bg-white p-4 text-center transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <span className="text-2xl">{s.icon}</span>
              <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">
                {s.value}
              </p>
              <p className="text-xs text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Logros */}
      <section className="mx-auto max-w-4xl px-4 pb-10 sm:px-6">
        <div className="flex items-baseline justify-between">
          <h2 className="font-serif text-xl font-semibold text-slate-900 dark:text-slate-100">
            Logros ({estado.logrosDesbloqueados.length}/{LOGROS.filter((l) => !l.oculto).length})
          </h2>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {LOGROS.map((logro) => (
            <LogroCard
              key={logro.id}
              logro={logro}
              desbloqueado={estado.logrosDesbloqueados.includes(logro.id)}
            />
          ))}
        </div>
      </section>

      {/* Historial */}
      {estado.historial.length > 0 && (
        <section className="mx-auto max-w-4xl px-4 pb-10 sm:px-6">
          <h2 className="font-serif text-xl font-semibold text-slate-900 dark:text-slate-100">
            Actividad reciente
          </h2>
          <div className="mt-4 space-y-2">
            {estado.historial.slice(0, 15).map((entry, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border border-slate-100 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">
                    {entry.tipo === "quiz"
                      ? "📝"
                      : entry.tipo === "logro"
                        ? "🏅"
                        : entry.tipo === "nivel"
                          ? "⬆️"
                          : "📖"}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      {entry.detalle}
                    </p>
                    <p className="text-xs text-slate-500">
                      {new Date(entry.fecha).toLocaleDateString("es-BO", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
                {entry.xp > 0 && (
                  <span className="font-mono text-sm font-bold text-green-600 dark:text-green-400">
                    +{entry.xp} XP
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Reset */}
      <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/30">
          <h3 className="text-sm font-semibold text-red-700 dark:text-red-400">
            Zona de peligro
          </h3>
          <p className="mt-1 text-xs text-red-600 dark:text-red-400">
            Borrar todo tu progreso. Esta acción no se puede deshacer.
          </p>
          <button
            onClick={handleReset}
            className="mt-3 rounded-lg border border-red-300 bg-white px-4 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50 dark:border-red-800 dark:bg-transparent dark:text-red-400 dark:hover:bg-red-950/50"
          >
            Resetear progreso
          </button>
        </div>
      </section>
    </>
  );
}
