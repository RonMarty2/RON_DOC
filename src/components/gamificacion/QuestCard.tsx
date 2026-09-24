'use client';

import React from 'react';
import type { DefinicionQuest } from '@/lib/gamificacion/types';

interface QuestCardProps {
  quest: DefinicionQuest;
  estado: 'bloqueada' | 'disponible' | 'completada';
  mejorPuntaje?: number;
  onClick?: () => void;
}

export function QuestCard({ quest, estado, mejorPuntaje, onClick }: QuestCardProps) {
  const isBloqueada = estado === 'bloqueada';
  const isCompletada = estado === 'completada';

  const baseClasses = "relative flex flex-col rounded-2xl border p-5 transition-all duration-300";
  
  let stateClasses = "";
  if (isBloqueada) {
    stateClasses = "border-slate-200 bg-slate-50/50 text-slate-500 opacity-75 dark:border-slate-800 dark:bg-slate-900/30";
  } else if (isCompletada) {
    stateClasses = "border-emerald-200 bg-emerald-50/30 hover:border-emerald-300 dark:border-emerald-900/30 dark:bg-emerald-950/20";
  } else {
    stateClasses = "border-indigo-200 bg-white shadow-md hover:-translate-y-1 hover:shadow-lg hover:border-indigo-300 cursor-pointer dark:border-indigo-800 dark:bg-slate-900 dark:hover:border-indigo-600";
  }

  return (
    <div
      className={`${baseClasses} ${stateClasses}`}
      onClick={!isBloqueada ? onClick : undefined}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${
            isBloqueada ? 'bg-slate-200 dark:bg-slate-800' :
            isCompletada ? 'bg-emerald-100 dark:bg-emerald-900/50' :
            'bg-indigo-100 dark:bg-indigo-900/50'
          }`}>
            {isBloqueada ? '🔒' : quest.icono}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold uppercase tracking-wider ${
                isBloqueada ? 'text-slate-400' :
                isCompletada ? 'text-emerald-600 dark:text-emerald-500' :
                'text-indigo-600 dark:text-indigo-400'
              }`}>
                {quest.tipo.replace('-', ' ')}
              </span>
              {isCompletada && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] text-white">
                  ✓
                </span>
              )}
            </div>
            <h3 className={`font-serif text-lg font-bold ${
              isBloqueada ? 'text-slate-500' : 'text-slate-900 dark:text-white'
            }`}>
              {quest.nombre}
            </h3>
          </div>
        </div>
        
        <div className={`flex flex-col items-end rounded-lg px-2 py-1 text-sm font-bold ${
          isBloqueada ? 'bg-slate-100 text-slate-400 dark:bg-slate-800' :
          isCompletada ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-500' :
          'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400'
        }`}>
          +{quest.xpRecompensa} XP
        </div>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        {quest.descripcion}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {quest.numPreguntas && (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            📝 {quest.numPreguntas} preguntas
          </span>
        )}
        {quest.tiempoLimiteSegundos ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            ⏱️ {Math.floor(quest.tiempoLimiteSegundos / 60)}:{(quest.tiempoLimiteSegundos % 60).toString().padStart(2, '0')}
          </span>
        ) : null}
        {quest.puntajeMinimo ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            🎯 {quest.puntajeMinimo}% min
          </span>
        ) : null}
        {mejorPuntaje !== undefined && (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
            ⭐ Mejor: {mejorPuntaje}%
          </span>
        )}
      </div>
      
      {!isBloqueada && !isCompletada && (
        <div className="absolute inset-0 rounded-2xl border-2 border-indigo-400/50 opacity-0 transition-opacity duration-300 hover:opacity-100 dark:border-indigo-500/50 pointer-events-none" />
      )}
    </div>
  );
}
