"use client";

/**
 * SeccionQuests — Panel de misiones gamificadas para la página de materia.
 * Se monta como client component dentro de la server page.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import type { DefinicionQuest, EstadoJuego } from "@/lib/gamificacion/types";
import { cargarEstado } from "@/lib/gamificacion/gameState";
import { calcularNivel } from "@/lib/gamificacion/xpSystem";
import { obtenerQuestsMateria, estadoVisualQuest } from "@/lib/gamificacion/questSystem";
import { QuestCard } from "./QuestCard";
import { BarraXP } from "./BarraXP";
import { StreakCounter } from "./StreakCounter";

interface SeccionQuestsProps {
  slugMateria: string;
  color: string;
}

export function SeccionQuests({ slugMateria }: SeccionQuestsProps) {
  const [estado, setEstado] = useState<EstadoJuego | null>(null);
  const [quests, setQuests] = useState<DefinicionQuest[]>([]);

  useEffect(() => {
    const e = cargarEstado();
    setEstado(e);
    setQuests(obtenerQuestsMateria(slugMateria));
  }, [slugMateria]);

  if (!estado || quests.length === 0) return null;

  const infoNivel = calcularNivel(estado.perfil.xpTotal);
  const materiaEstado = estado.materias[slugMateria];
  const questsCompletadas = materiaEstado?.questsCompletadas.length ?? 0;
  const progresoMateria =
    quests.length > 0 ? Math.round((questsCompletadas / quests.length) * 100) : 0;

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Banner de progreso */}
      <div className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50 p-5 dark:border-slate-800 dark:from-slate-900 dark:to-blue-950/30">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/perfil"
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 text-2xl shadow-md transition hover:scale-105"
            >
              {estado.perfil.avatar || "🎓"}
            </Link>
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                {estado.perfil.nombre || "Estudiante"}
              </p>
              <div className="mt-1 w-48">
                <BarraXP
                  xpActual={estado.perfil.xpTotal}
                  xpEnNivel={infoNivel.xpEnNivel}
                  xpParaSiguiente={infoNivel.xpParaSiguiente}
                  nivel={infoNivel.nivel}
                  nombreNivel={infoNivel.definicion.nombre}
                  iconoNivel={infoNivel.definicion.icono}
                  compacto
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {progresoMateria}%
              </p>
              <p className="text-xs text-slate-500">Progreso</p>
            </div>
            <StreakCounter
              rachaActual={estado.perfil.rachaActual}
              rachaMaxima={estado.perfil.rachaMaxima}
            />
          </div>
        </div>
      </div>

      {/* Título */}
      <div className="mb-6 flex items-baseline justify-between">
        <h2 className="font-serif text-xl font-semibold text-slate-900 dark:text-slate-100">
          🎮 Misiones
        </h2>
        <Link
          href="/perfil"
          className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          Ver perfil →
        </Link>
      </div>

      {/* Grid de quests agrupadas por tema */}
      <div className="space-y-6">
        {/* Agrupar quests por tema */}
        {Array.from(new Set(quests.map((q) => q.tema))).map((temaNum) => {
          const questsTema = quests.filter((q) => q.tema === temaNum);
          return (
            <div key={temaNum}>
              <h3 className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-slate-500">
                Tema {temaNum}
              </h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {questsTema.map((quest) => {
                  const estadoVisual = estadoVisualQuest(quest, estado);
                  const quizResultado =
                    materiaEstado?.quizzes[
                      `${slugMateria}-tema-${quest.tema}-${quest.tipo}`
                    ];

                  return (
                    <QuestCard
                      key={quest.id}
                      quest={quest}
                      estado={estadoVisual}
                      mejorPuntaje={quizResultado?.mejorPuntaje}
                      onClick={
                        estadoVisual === "disponible"
                          ? () => {
                              if (quest.tipo === "lectura") {
                                window.location.href = `/materias/${slugMateria}/${quest.slugTema}`;
                              } else {
                                window.location.href = `/materias/${slugMateria}/quiz/${quest.tema}?tipo=${quest.tipo}&questId=${quest.id}`;
                              }
                            }
                          : undefined
                      }
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
