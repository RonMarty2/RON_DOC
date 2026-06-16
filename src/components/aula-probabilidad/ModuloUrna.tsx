"use client";

import { useEffect, useRef, useState } from "react";
import { ESTUDIANTES } from "@content/aula-probabilidad/dataset";
import { contar } from "./calculos";
import { simularEnLotes, entero } from "./aleatorio";
import { RecuadroCaso } from "./narrativa";

interface PuntoFrecuencia {
  n: number;
  freq: number;
}

/**
 * Peldaño 1 — Probabilidad simple, contextualizada con el grupo de Andrea.
 * La "urna" son los 60 estudiantes: 8 con ánimo bajo, 52 sin. Extraer al azar
 * (con reposición) muestra cómo la frecuencia converge a 8/60 = 13.3%.
 */
export function ModuloUrna() {
  const total = ESTUDIANTES.length; // 60
  const conAnimo = contar((e) => e.animoBajo); // 8
  const pTeorica = conAnimo / total; // 0.1333

  const [historial, setHistorial] = useState<PuntoFrecuencia[]>([]);
  const [enCurso, setEnCurso] = useState(false);
  const [extraidas, setExtraidas] = useState(0);
  const [aciertos, setAciertos] = useState(0);
  const cancelarRef = useRef<(() => void) | null>(null);
  useEffect(() => () => cancelarRef.current?.(), []);

  function reset() {
    cancelarRef.current?.();
    setHistorial([]);
    setExtraidas(0);
    setAciertos(0);
    setEnCurso(false);
  }

  function extraer(N: number) {
    cancelarRef.current?.();
    setEnCurso(true);
    let n = extraidas;
    let ac = aciertos;
    const puntos = [...historial];
    const guardarCada = Math.max(1, Math.floor(N / 100));

    cancelarRef.current = simularEnLotes<boolean>({
      total: N,
      tamLote: 60,
      unaIteracion: () => entero(1, total) <= conAnimo, // true si "salió" alguien con ánimo bajo
      acumular: (acc, hit) => {
        n++;
        if (hit) ac++;
        if (n % guardarCada === 0) puntos.push({ n, freq: ac / n });
        return acc;
      },
      acumuladoInicial: [],
      enProgreso: () => {
        setExtraidas(n);
        setAciertos(ac);
        setHistorial([...puntos]);
      },
      alTerminar: () => setEnCurso(false),
    });
  }

  const freqActual = extraidas > 0 ? aciertos / extraidas : 0;

  return (
    <div className="flex flex-col gap-8">
      <RecuadroCaso titulo="Lo primero que mira Andrea: ¿cuántos están mal?">
        <p>
          De los <strong>60 estudiantes</strong> que llegan al centro,{" "}
          <strong>{conAnimo} realmente tienen ánimo bajo</strong>. Si Andrea
          eligiera a uno al azar, la probabilidad de que esté pasando un bajón
          es{" "}
          <strong className="tabular-nums">
            {conAnimo}/{total} = {(pTeorica * 100).toFixed(1)}%
          </strong>
          . Eso es probabilidad simple: casos favorables sobre casos posibles.
        </p>
      </RecuadroCaso>

      <div className="grid gap-4 sm:grid-cols-[1fr,1.6fr]">
        {/* La "urna" de 60 estudiantes */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 dark:border-slate-800 dark:bg-slate-900/40">
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Los 60 estudiantes
          </p>
          <div className="mx-auto grid grid-cols-6 gap-1.5">
            {ESTUDIANTES.map((e) => (
              <span
                key={e.id}
                className={
                  "aspect-square rounded-full " +
                  (e.animoBajo
                    ? "bg-rose-500 ring-2 ring-rose-300 dark:ring-rose-700"
                    : "bg-slate-300 dark:bg-slate-700")
                }
                title={e.animoBajo ? `${e.nombre}: ánimo bajo` : e.nombre}
              />
            ))}
          </div>
          <div className="mt-3 flex justify-center gap-4 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-rose-500" />
              <span className="text-slate-600 dark:text-slate-400">
                Ánimo bajo ({conAnimo})
              </span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-slate-300 dark:bg-slate-700" />
              <span className="text-slate-600 dark:text-slate-400">
                Sin ánimo bajo ({total - conAnimo})
              </span>
            </span>
          </div>
        </div>

        {/* Extracciones */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-wrap items-baseline gap-3">
            <h4 className="font-serif text-lg font-semibold text-slate-900 dark:text-slate-100">
              Extraé al azar (con reposición)
            </h4>
            <div className="ml-auto flex gap-2">
              {[1, 100, 1000].map((n) => (
                <button
                  key={n}
                  type="button"
                  disabled={enCurso}
                  onClick={() => extraer(n)}
                  className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300"
                >
                  Sacar {n.toLocaleString("es")}
                </button>
              ))}
              <button
                type="button"
                onClick={reset}
                className="rounded-full border border-slate-200 px-3 py-1.5 text-sm text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Limpiar
              </button>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-800/60">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Frecuencia observada
              </p>
              <p className="font-serif text-2xl font-semibold tabular-nums text-blue-700 dark:text-blue-300">
                {(freqActual * 100).toFixed(1)}%
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-800/60">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Extracciones
              </p>
              <p className="font-serif text-2xl font-semibold tabular-nums text-slate-900 dark:text-slate-100">
                {extraidas.toLocaleString("es")}
              </p>
            </div>
          </div>

          <GraficoConvergencia puntos={historial} pTeorica={pTeorica} className="mt-5" />
        </div>
      </div>
    </div>
  );
}

/** Gráfico SVG de convergencia (frecuencia vs nº de extracciones, escala log). */
function GraficoConvergencia({
  puntos,
  pTeorica,
  className,
}: {
  puntos: PuntoFrecuencia[];
  pTeorica: number;
  className?: string;
}) {
  const W = 600;
  const H = 160;
  const margenY = 18;
  const maxN = puntos.length > 0 ? puntos[puntos.length - 1].n : 1;
  const maxLog = Math.log10(Math.max(10, maxN));

  const x = (n: number) => (Math.log10(Math.max(1, n)) / (maxLog || 1)) * W;
  const y = (p: number) => H - margenY - p * (H - margenY * 2);

  const yT = y(pTeorica);
  const path =
    puntos.length === 0
      ? ""
      : "M " + puntos.map((pt) => `${x(pt.n).toFixed(1)} ${y(pt.freq).toFixed(1)}`).join(" L ");

  return (
    <div className={className}>
      <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        Convergencia a 13.3%
      </p>
      <svg viewBox={`0 0 ${W} ${H}`} className="block w-full" role="img" aria-label="Convergencia de la frecuencia">
        <line x1={0} y1={H - margenY} x2={W} y2={H - margenY} className="stroke-slate-300 dark:stroke-slate-700" strokeWidth={1} />
        <line x1={0} y1={yT} x2={W} y2={yT} className="stroke-amber-500" strokeDasharray="4 4" strokeWidth={1.5} />
        <text x={W - 4} y={yT - 4} textAnchor="end" className="fill-amber-700 text-[11px] dark:fill-amber-300">
          Teórica {(pTeorica * 100).toFixed(1)}%
        </text>
        {path && (
          <path d={path} fill="none" className="stroke-blue-600 dark:stroke-blue-400" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </div>
  );
}
