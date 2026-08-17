"use client";

import { useState } from "react";

const PASOS = [
  {
    titulo: "1 · Proyectá y arrancá por 2.1",
    detalle:
      "Pantalla completa (F11). Empezá por «Espacio muestral». Tirá el dado en vivo, después los dos dados, y recién ahí mostrá el espacio muestral del PHQ-9 (28 puntajes).",
  },
  {
    titulo: "2 · Siempre clásico → aplicado",
    detalle:
      "Cada módulo tiene la misma estructura: primero un ejemplo con dados/cartas/urnas (sin ruido psicológico), después el mismo concepto con el dataset real de 200 estudiantes (PTSMU).",
  },
  {
    titulo: "3 · Elegí estudiantes reales en vivo",
    detalle:
      "Los botones \"elegir al azar\" sacan un estudiante de verdad del dataset — no está inventado en el momento. Los números que salen son los del dossier: sensibilidad 88%, VPP 51.2%.",
  },
  {
    titulo: "4 · El corte de tamizaje es el hilo conductor",
    detalle:
      "El corte ≥10 en PHQ-9 y GAD-7 aparece desde el Módulo 1 y se reutiliza en todos los siguientes — tablas de contingencia, combinatoria (elegir 5 de 43 positivos) y Bayes.",
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
