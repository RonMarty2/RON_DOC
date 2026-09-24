'use client';

import React from 'react';
import Link from 'next/link';
import type { PerfilJugador, DefinicionNivel } from '@/lib/gamificacion/types';
import { BarraXP } from './BarraXP';

interface PerfilBannerProps {
  perfil: PerfilJugador;
  nivel: DefinicionNivel;
  xpEnNivel: number;
  xpParaSiguiente: number;
}

export function PerfilBanner({
  perfil,
  nivel,
  xpEnNivel,
  xpParaSiguiente,
}: PerfilBannerProps) {
  return (
    <Link
      href="/perfil"
      className="flex items-center gap-4 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm transition-all hover:bg-slate-50 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800/80"
    >
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-lg dark:bg-slate-800">
          {perfil.avatar || '👤'}
        </div>
        <div className="hidden sm:block">
          <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            {perfil.nombre}
          </div>
        </div>
      </div>
      
      <div className="hidden h-6 w-px bg-slate-200 dark:bg-slate-700 sm:block" />
      
      <div className="w-32 sm:w-40">
        <BarraXP
          xpActual={perfil.xpTotal}
          xpEnNivel={xpEnNivel}
          xpParaSiguiente={xpParaSiguiente}
          nivel={nivel.nivel}
          nombreNivel={nivel.nombre}
          iconoNivel={nivel.icono}
          compacto
        />
      </div>

      {perfil.rachaActual > 0 && (
        <>
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-700" />
          <div className="flex items-center gap-1 text-sm font-bold text-orange-600 dark:text-orange-400">
            <span className="animate-pulse">🔥</span> {perfil.rachaActual}
          </div>
        </>
      )}
    </Link>
  );
}
