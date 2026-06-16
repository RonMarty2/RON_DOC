"use client";

import { useState } from "react";

const PASOS = [
  {
    titulo: "1 · Proyectá y arrancá por el Preludio",
    detalle:
      "Pantalla completa (F11). Empezá por «Las 3 puertas». La idea del preludio es que el aula se equivoque tres veces y acepte que su intuición falla — todavía sin fórmulas.",
  },
  {
    titulo: "2 · Puertas → Cumpleaños → Moneda",
    detalle:
      "En cada uno, lanzá la votación de clase ANTES de revelar. En Cumpleaños mostrá las 5 coincidencias reales del grupo de 60 y corré la simulación de 1000 aulas (nunca falla ante el público).",
  },
  {
    titulo: "3 · Cruzá el puente",
    detalle:
      "Al terminar la Moneda aparece el texto puente: «Tres veces les falló la intuición». Ahí pasás a la Construcción con el grupo real de Andrea.",
  },
  {
    titulo: "4 · Simple → Condicional",
    detalle:
      "Urna: 8 de 60 tienen ánimo bajo = 13.3%, y la frecuencia converge ahí. Condicional: tocá «mostrar solo los que duermen mal» y mostrá el salto a 25%. «Saber algo cambió la probabilidad».",
  },
  {
    titulo: "5 · Clímax: el positivo de Daniela (Bayes)",
    detalle:
      "Leé el caso en voz alta. Lanzá la votación «¿qué probabilidad real?» — la mayoría vota 90%. Revelá: de los 21 positivos, sólo 8 están mal = 38%. Daniela parpadea entre los falsos positivos. Cerrá con el mensaje ético.",
  },
];

/**
 * Acordeón colapsable con la guía para usar la herramienta en clase.
 * Cerrado por defecto para no ocupar espacio en el proyector.
 */
export function GuiaClase() {
  const [abierto, setAbierto] = useState(false);
  return (
    <details
      className="mb-6 rounded-xl border border-slate-200 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-900/50"
      onToggle={(e) => setAbierto((e.target as HTMLDetailsElement).open)}
    >
      <summary className="flex cursor-pointer items-center gap-2 px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
        <span aria-hidden>📖</span>
        Guía rápida para usar en clase ({PASOS.length} pasos)
        <span className="ml-auto text-xs text-slate-400">{abierto ? "▲" : "▼"}</span>
      </summary>
      <ol className="flex flex-col gap-3 border-t border-slate-200 px-4 py-4 dark:border-slate-800">
        {PASOS.map((p) => (
          <li key={p.titulo} className="text-sm">
            <p className="font-semibold text-slate-900 dark:text-slate-100">
              {p.titulo}
            </p>
            <p className="mt-1 text-slate-600 dark:text-slate-400">{p.detalle}</p>
          </li>
        ))}
      </ol>
    </details>
  );
}
