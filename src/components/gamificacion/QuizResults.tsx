'use client';

import React, { useEffect, useState } from 'react';
import type { ResultadoFinal, QuizConfig } from '@/lib/gamificacion/types';
import { Celebracion } from './Celebracion';
import { LogroCard } from './LogroCard';

interface QuizResultsProps {
  resultado: ResultadoFinal;
  config: QuizConfig;
  onRepetir: () => void;
  onVolver: () => void;
}

export function QuizResults({ resultado, config, onRepetir, onVolver }: QuizResultsProps) {
  const [scoreDisplay, setScoreDisplay] = useState(0);

  useEffect(() => {
    // Animate score from 0 to actual score
    const duration = 1500;
    const steps = 60;
    const stepTime = duration / steps;
    const increment = resultado.puntaje / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= resultado.puntaje) {
        setScoreDisplay(resultado.puntaje);
        clearInterval(timer);
      } else {
        setScoreDisplay(Math.floor(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [resultado.puntaje]);

  return (
    <div className="flex w-full flex-col items-center py-10 animate-in fade-in zoom-in duration-500">
      {resultado.aprobado && <Celebracion activa={true} tipo="confetti" />}
      {resultado.nuevoNivel && <Celebracion activa={true} tipo="nivel" />}

      <div className="text-center mb-8">
        <h2 className="font-serif text-4xl font-bold text-slate-900 dark:text-white">
          {resultado.aprobado ? '¡Felicitaciones!' : 'Sigue practicando'}
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Completaste el quiz de {config.materia}
        </p>
      </div>

      <div className="relative mb-12 flex h-48 w-48 flex-col items-center justify-center rounded-full border-[8px] bg-white shadow-xl dark:bg-slate-900 transition-colors duration-1000"
           style={{ borderColor: resultado.aprobado ? '#10b981' : '#f43f5e' }}>
        <span className="text-5xl font-black" style={{ color: resultado.aprobado ? '#10b981' : '#f43f5e' }}>
          {scoreDisplay}%
        </span>
        <span className="text-sm font-semibold uppercase tracking-wider text-slate-400">
          Puntaje
        </span>
        {resultado.aprobado && (
          <div className="absolute -bottom-4 rounded-full bg-emerald-500 px-4 py-1 text-sm font-bold text-white shadow-md">
            ¡Aprobado!
          </div>
        )}
      </div>

      <div className="grid w-full max-w-md grid-cols-2 gap-4 mb-8">
        <div className="flex flex-col items-center justify-center rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/50">
          <span className="text-3xl mb-1">🎯</span>
          <span className="text-2xl font-bold text-slate-900 dark:text-white">
            {resultado.correctas} <span className="text-lg font-medium text-slate-500">/ {resultado.total}</span>
          </span>
          <span className="text-xs text-slate-500 uppercase tracking-wider mt-1">Correctas</span>
        </div>
        
        <div className="flex flex-col items-center justify-center rounded-2xl bg-indigo-50 p-4 dark:bg-indigo-950/30">
          <span className="text-3xl mb-1">⚡</span>
          <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            +{resultado.xpGanada}
          </span>
          <span className="text-xs text-indigo-500/70 uppercase tracking-wider mt-1 font-bold">XP Ganada</span>
        </div>
        
        <div className="col-span-2 flex items-center justify-center gap-2 rounded-2xl bg-slate-50 p-3 text-sm text-slate-600 dark:bg-slate-800/50 dark:text-slate-400">
          ⏱️ Tiempo total: <span className="font-bold">{Math.floor(resultado.tiempoSegundos / 60)}m {resultado.tiempoSegundos % 60}s</span>
        </div>
      </div>

      {resultado.logrosNuevos.length > 0 && (
        <div className="mb-10 w-full max-w-2xl">
          <h3 className="mb-4 text-center font-serif text-xl font-bold text-slate-900 dark:text-white">
            Nuevos Logros Desbloqueados
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {resultado.logrosNuevos.map(logro => (
              <LogroCard key={logro.id} logro={logro} desbloqueado={true} />
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
        <button
          onClick={onRepetir}
          className="flex-1 rounded-xl border-2 border-slate-200 bg-white px-6 py-3 font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
        >
          Repetir Quiz
        </button>
        <button
          onClick={onVolver}
          className="flex-1 rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white transition hover:bg-indigo-700 shadow-md hover:shadow-lg"
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
