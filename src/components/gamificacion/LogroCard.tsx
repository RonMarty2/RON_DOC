'use client';

import React from 'react';
import type { DefinicionLogro } from '@/lib/gamificacion/types';

interface LogroCardProps {
  logro: DefinicionLogro;
  desbloqueado: boolean;
}

export function LogroCard({ logro, desbloqueado }: LogroCardProps) {
  const isHidden = logro.oculto && !desbloqueado;

  if (isHidden) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-6 text-center transition-all hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:bg-slate-800/80 grayscale opacity-70">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 text-3xl dark:bg-slate-800">
          ❓
        </div>
        <h4 className="mt-4 font-serif text-lg font-semibold text-slate-500 dark:text-slate-400">
          Logro Oculto
        </h4>
        <p className="mt-2 text-sm text-slate-400 dark:text-slate-500">
          Sigue jugando para descubrirlo.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`group relative flex flex-col items-center overflow-hidden rounded-xl border p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
        desbloqueado
          ? 'border-yellow-200 bg-gradient-to-b from-white to-yellow-50/30 dark:border-yellow-900/50 dark:from-slate-900 dark:to-yellow-900/10'
          : 'border-slate-200 bg-white grayscale opacity-70 hover:grayscale-0 dark:border-slate-800 dark:bg-slate-900'
      }`}
    >
      {desbloqueado && (
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:animate-shimmer" />
      )}
      
      <div
        className={`flex h-16 w-16 items-center justify-center rounded-full text-3xl shadow-inner transition-transform duration-300 group-hover:scale-110 ${
          desbloqueado
            ? 'bg-yellow-100 dark:bg-yellow-900/50'
            : 'bg-slate-100 dark:bg-slate-800'
        }`}
      >
        {logro.icono}
      </div>
      
      <h4 className={`mt-4 font-serif text-lg font-semibold ${desbloqueado ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}>
        {logro.nombre}
      </h4>
      
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        {desbloqueado ? logro.descripcion : logro.condicion}
      </p>

      <div className={`mt-4 rounded-full px-3 py-1 text-xs font-bold ${
        desbloqueado
          ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-500'
          : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
      }`}>
        +{logro.xpBonus} XP
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}} />
    </div>
  );
}
