"use client";

/**
 * QuizPageClient — Componente cliente para la página de quiz.
 */

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { QuizEngine } from "@/components/gamificacion/QuizEngine";
import type { PreguntaQuiz, QuizConfig, TipoQuest, BancoQuiz } from "@/lib/gamificacion/types";

interface QuizPageClientProps {
  slugMateria: string;
  temaNum: number;
  bancoData: BancoQuiz | null;
}

export default function QuizPageClient({
  slugMateria,
  temaNum,
  bancoData,
}: QuizPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tipo = (searchParams.get("tipo") ?? "quiz-rapido") as TipoQuest;
  const questId = searchParams.get("questId") ?? undefined;

  const handleVolver = () => {
    router.push(`/materias/${slugMateria}`);
  };

  if (!bancoData || bancoData.preguntas.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <span className="text-5xl">😕</span>
        <h1 className="mt-4 font-serif text-2xl font-bold text-slate-900 dark:text-slate-100">
          No hay preguntas disponibles para este tema
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          El banco de preguntas aún no se ha creado para este tema.
        </p>
        <button
          onClick={handleVolver}
          className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
        >
          ← Volver a la materia
        </button>
      </div>
    );
  }

  const config: QuizConfig = {
    materia: slugMateria,
    tema: temaNum,
    tipo,
    numPreguntas: tipo === "boss" ? 30 : tipo === "desafio" ? 20 : 10,
    tiempoLimite: tipo === "boss" ? 1200 : tipo === "desafio" ? 900 : 0,
    puntajeMinimo: tipo === "boss" ? 75 : tipo === "desafio" ? 70 : 60,
    questId,
  };

  return (
    <QuizEngine
      banco={bancoData.preguntas}
      config={config}
      onVolver={handleVolver}
    />
  );
}
