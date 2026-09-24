"use client";

/**
 * TemaCardProgreso — Indicador de progreso gamificado para un TemaCard.
 * Se monta como client island dentro del server-rendered TemaCard.
 */

import { useEffect, useState } from "react";
import { cargarEstado } from "@/lib/gamificacion/gameState";

interface TemaCardProgresoProps {
  slugMateria: string;
  slugTema: string;
}

export function TemaCardProgreso({ slugMateria, slugTema }: TemaCardProgresoProps) {
  const [leido, setLeido] = useState(false);
  const [quizzes, setQuizzes] = useState(0);

  useEffect(() => {
    const estado = cargarEstado();
    const materia = estado.materias[slugMateria];
    if (materia) {
      setLeido(materia.temasLeidos.includes(slugTema));
      // Contar quizzes de este tema
      const count = Object.keys(materia.quizzes).filter((k) =>
        k.includes(`-tema-`) && materia.quizzes[k].mejorPuntaje > 0
      ).length;
      setQuizzes(count);
    }
  }, [slugMateria, slugTema]);

  if (!leido && quizzes === 0) return null;

  return (
    <div className="flex items-center gap-1.5">
      {leido && (
        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/40 dark:text-green-400">
          ✅ Leído
        </span>
      )}
      {quizzes > 0 && (
        <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-400">
          📝 {quizzes}
        </span>
      )}
    </div>
  );
}
