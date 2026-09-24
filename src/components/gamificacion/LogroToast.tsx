'use client';

import React, { useEffect, useState } from 'react';
import type { DefinicionLogro } from '@/lib/gamificacion/types';

interface LogroToastProps {
  logro: DefinicionLogro;
  visible: boolean;
  onClose: () => void;
}

export function LogroToast({ logro, visible, onClose }: LogroToastProps) {
  const [render, setRender] = useState(visible);

  useEffect(() => {
    if (visible) {
      setRender(true);
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setRender(false), 300); // Wait for exit animation
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!render) return null;

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex max-w-sm transform cursor-pointer items-start gap-4 rounded-xl border border-yellow-200 bg-gradient-to-br from-white to-yellow-50 p-4 shadow-xl transition-all duration-300 dark:border-yellow-900/50 dark:from-slate-900 dark:to-yellow-900/20 ${
        visible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
      }`}
      onClick={onClose}
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-yellow-100 text-2xl shadow-inner dark:bg-yellow-900/50">
        {logro.icono}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-yellow-600 dark:text-yellow-500">
            ¡Logro Desbloqueado!
          </span>
          <span className="text-xs font-bold text-yellow-600 dark:text-yellow-500">
            +{logro.xpBonus} XP
          </span>
        </div>
        <h4 className="mt-0.5 font-serif text-base font-bold text-slate-900 dark:text-white">
          {logro.nombre}
        </h4>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 leading-tight">
          {logro.descripcion}
        </p>
      </div>
    </div>
  );
}
