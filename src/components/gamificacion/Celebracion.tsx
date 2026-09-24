'use client';

import React, { useEffect, useState } from 'react';

interface CelebracionProps {
  activa: boolean;
  tipo?: 'confetti' | 'estrellas' | 'nivel';
}

export function Celebracion({ activa, tipo = 'confetti' }: CelebracionProps) {
  const [render, setRender] = useState(false);

  useEffect(() => {
    if (activa) {
      setRender(true);
      const timer = setTimeout(() => setRender(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [activa]);

  if (!render) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {tipo === 'confetti' && (
        <div className="absolute inset-0 flex items-center justify-center">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-3 w-3 rounded-sm animate-confetti"
              style={{
                backgroundColor: ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'][
                  Math.floor(Math.random() * 5)
                ],
                left: `${50 + (Math.random() * 100 - 50)}%`,
                top: `${50 + (Math.random() * 100 - 50)}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${1 + Math.random()}s`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          ))}
        </div>
      )}
      
      {tipo === 'estrellas' && (
        <div className="absolute inset-0 flex items-center justify-center">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-ping text-yellow-400"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${0.5 + Math.random()}s`,
              }}
            >
              ⭐
            </div>
          ))}
        </div>
      )}

      {tipo === 'nivel' && (
        <div className="animate-bounce-in flex flex-col items-center justify-center rounded-2xl bg-white/90 p-8 shadow-2xl backdrop-blur-md dark:bg-slate-800/90">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="font-serif text-3xl font-bold text-slate-900 dark:text-white">
            ¡Sube de Nivel!
          </h2>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .animate-confetti {
          animation: confetti 2s ease-out forwards;
        }
        @keyframes bounce-in {
          0% { transform: scale(0.5); opacity: 0; }
          60% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-bounce-in {
          animation: bounce-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}} />
    </div>
  );
}
