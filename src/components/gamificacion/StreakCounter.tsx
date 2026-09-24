'use client';

import React from 'react';

interface StreakCounterProps {
  rachaActual: number;
  rachaMaxima: number;
}

export function StreakCounter({ rachaActual, rachaMaxima }: StreakCounterProps) {
  const activo = rachaActual > 0;

  return (
    <div className={`flex flex-col items-center justify-center p-3 rounded-xl border ${activo ? 'border-orange-200 bg-orange-50 dark:border-orange-900/50 dark:bg-orange-950/20' : 'border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900'} transition-all`}>
      <div className="flex items-center gap-2">
        <span className={`text-2xl ${activo ? 'animate-bounce' : 'opacity-50 grayscale'}`}>
          🔥
        </span>
        <div className="flex flex-col">
          <span className={`text-xl font-black ${activo ? 'text-orange-600 dark:text-orange-400' : 'text-slate-500'}`}>
            {rachaActual} {rachaActual === 1 ? 'día' : 'días'}
          </span>
        </div>
      </div>
      <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
        Racha máxima: {rachaMaxima}
      </div>
    </div>
  );
}
