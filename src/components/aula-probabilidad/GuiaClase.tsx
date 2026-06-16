"use client";

import { useState } from "react";

const PASOS = [
  {
    titulo: "1 · Abrí la herramienta en el proyector",
    detalle:
      "Conectá tu notebook al proyector. Pantalla completa del navegador (F11). Modo claro u oscuro según el aula.",
  },
  {
    titulo: "2 · Empezá por el Módulo A (El Aula)",
    detalle:
      "Poné 23 estudiantes. Tocá «Lanzar pregunta». Mientras los votos virtuales caen, preguntá a tu clase lo mismo a mano alzada — vas a ver que coinciden con la intuición simulada. Después «Cerrar y revelar» y dispará la simulación de 5000 aulas.",
  },
  {
    titulo: "3 · Encadená B → C",
    detalle:
      "Módulo B refuerza la ley de los grandes números (frecuencia → teórica). Módulo C muestra cómo cambia P al condicionar (filtro «duermen mal» vs depresión).",
  },
  {
    titulo: "4 · Monty Hall (Módulo D)",
    detalle:
      "Pedí a un/a estudiante que juegue una partida en vivo en el proyector. Después lanzá la votación («cambio» o «me quedo»). Cerrá, revelá, y corré la simulación de 10 000 partidas. El choque entre intuición y verdad es lo más fuerte acá.",
  },
  {
    titulo: "5 · Clímax: Bayes (Módulo E)",
    detalle:
      "Leé el caso de Daniela en voz alta. Lanzá la votación («¿qué probabilidad?»). La mayoría virtual elige 90% — pedí a la clase real su voto a mano alzada antes de revelar. Cerrá y mostrá que P(enfermo|positivo) ≈ 30%. Ese contraste es el momento estelar.",
  },
];

/**
 * Acordeón colapsable con una mini-guía para usar la herramienta en clase.
 * Aparece arriba del primer módulo. Por defecto va cerrado para no ocupar
 * espacio en el proyector durante el uso.
 */
export function GuiaClase() {
  const [abierto, setAbierto] = useState(false);
  return (
    <details
      className="mb-6 rounded-xl border border-slate-200 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-900/50"
      onToggle={(e) => setAbierto((e.target as HTMLDetailsElement).open)}
    >
      <summary className="flex cursor-pointer items-center gap-2 px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
        <span aria-hidden>{abierto ? "📖" : "📖"}</span>
        Guía rápida para usar en clase ({PASOS.length} pasos)
      </summary>
      <ol className="flex flex-col gap-3 border-t border-slate-200 px-4 py-4 dark:border-slate-800">
        {PASOS.map((p) => (
          <li key={p.titulo} className="text-sm">
            <p className="font-semibold text-slate-900 dark:text-slate-100">
              {p.titulo}
            </p>
            <p className="mt-1 text-slate-600 dark:text-slate-400">
              {p.detalle}
            </p>
          </li>
        ))}
      </ol>
    </details>
  );
}
