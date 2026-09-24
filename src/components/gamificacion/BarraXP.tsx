'use client';

import React from 'react';

interface BarraXPProps {
  xpActual: number;
  xpEnNivel: number;
  xpParaSiguiente: number;
  nivel: number;
  nombreNivel: string;
  iconoNivel: string;
  compacto?: boolean;
}

export function BarraXP({
  xpActual,
  xpEnNivel,
  xpParaSiguiente,
  nivel,
  nombreNivel,
  iconoNivel,
  compacto = false,
}: BarraXPProps) {
  // xpParaSiguiente is the amount needed to reach the NEXT level from the start of the current level
  const progreso = Math.min(100, Math.max(0, (xpEnNivel / xpParaSiguiente) * 100));

  if (compacto) {
    return (
      <div className="flex items-center gap-2" title={`${nombreNivel} (Nivel ${nivel})`}>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm shadow-sm dark:bg-slate-800">
          {iconoNivel}
        </div>
        <div className="flex flex-col">
          <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
            <span>Nvl {nivel}</span>
            <span>{xpEnNivel}/{xpParaSiguiente}</span>
          </div>
          <div className="mt-1 h-2 w-24 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500 ease-out"
              style={{ width: `${progreso}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white p-5 shadow-sm border border-slate-200 dark:bg-slate-900 dark:border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-blue-100 text-2xl shadow-inner dark:from-indigo-900/40 dark:to-blue-900/40">
            {iconoNivel}
          </div>
          <div>
            <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Nivel {nivel}
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">
              {nombreNivel}
            </h3>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
            {xpActual} <span className="text-sm font-medium text-slate-500">XP Total</span>
          </div>
        </div>
      </div>
      
      <div className="relative">
        <div className="flex justify-between mb-1 text-xs font-medium text-slate-600 dark:text-slate-400">
          <span>{xpEnNivel} XP</span>
          <span>Faltan {xpParaSiguiente - xpEnNivel} XP</span>
        </div>
        <div className="h-4 w-full overflow-hidden rounded-full bg-slate-100 shadow-inner dark:bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-blue-500 to-emerald-400 transition-all duration-1000 ease-out relative"
            style={{ width: `${progreso}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
