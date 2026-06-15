"use client";

import { useEffect, useRef, useState } from "react";
import { simularEnLotes, entero } from "./aleatorio";

interface PuntoFrecuencia {
  n: number;
  freq: number;
}

/**
 * Módulo B — Urna con bolitas de colores.
 * El usuario configura cuántas bolitas hay de cada color. Al extraer N veces,
 * la frecuencia relativa de "azul" converge a la probabilidad teórica.
 * Visualización: gráfico de línea SVG simple, sin librerías externas.
 */
export function ModuloUrna() {
  const [azules, setAzules] = useState(3);
  const [rojas, setRojas] = useState(7);
  const total = azules + rojas;
  const pTeorica = total > 0 ? azules / total : 0;

  const [historial, setHistorial] = useState<PuntoFrecuencia[]>([]);
  const [enCurso, setEnCurso] = useState(false);
  const [extraidas, setExtraidas] = useState(0);
  const [aciertosAzul, setAciertosAzul] = useState(0);
  const cancelarRef = useRef<(() => void) | null>(null);

  useEffect(() => () => cancelarRef.current?.(), []);

  function reset() {
    cancelarRef.current?.();
    setHistorial([]);
    setExtraidas(0);
    setAciertosAzul(0);
    setEnCurso(false);
  }

  function extraer(N: number) {
    cancelarRef.current?.();
    setEnCurso(true);

    let n = extraidas;
    let azul = aciertosAzul;
    const puntos: PuntoFrecuencia[] = [...historial];
    const guardarCada = Math.max(1, Math.floor(N / 100));

    cancelarRef.current = simularEnLotes<boolean>({
      total: N,
      tamLote: 60,
      unaIteracion: () => {
        const bolita = entero(1, total);
        return bolita <= azules; // true si fue azul
      },
      acumular: (acc, esAzul) => {
        n++;
        if (esAzul) azul++;
        if (n % guardarCada === 0 || n === extraidas + N) {
          puntos.push({ n, freq: azul / n });
        }
        return acc;
      },
      acumuladoInicial: [],
      enProgreso: () => {
        setExtraidas(n);
        setAciertosAzul(azul);
        setHistorial([...puntos]);
      },
      alTerminar: () => setEnCurso(false),
    });
  }

  const freqActual = extraidas > 0 ? aciertosAzul / extraidas : 0;

  return (
    <div className="flex flex-col gap-8">
      {/* Configuración */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-4 sm:grid-cols-2">
          <Slider
            etiqueta="🔵 Bolitas azules"
            valor={azules}
            min={0}
            max={20}
            onChange={(v) => {
              setAzules(v);
              reset();
            }}
            color="azul"
          />
          <Slider
            etiqueta="🔴 Bolitas rojas"
            valor={rojas}
            min={0}
            max={20}
            onChange={(v) => {
              setRojas(v);
              reset();
            }}
            color="rojo"
          />
        </div>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
          Probabilidad teórica de sacar azul:{" "}
          <span className="font-serif text-lg font-semibold text-blue-700 tabular-nums dark:text-blue-300">
            {(pTeorica * 100).toFixed(1)}%
          </span>
          {" "}({azules} de {total})
        </p>
      </div>

      {/* Urna visual */}
      <div className="grid gap-4 sm:grid-cols-[1fr,2fr]">
        <UrnaVisual azules={azules} rojas={rojas} />
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-wrap items-baseline gap-3">
            <h4 className="font-serif text-lg font-semibold text-slate-900 dark:text-slate-100">
              Extraé bolitas (con reposición)
            </h4>
            <div className="ml-auto flex gap-2">
              {[1, 100, 1000].map((n) => (
                <button
                  key={n}
                  type="button"
                  disabled={enCurso || total === 0}
                  onClick={() => extraer(n)}
                  className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300 dark:hover:bg-blue-950/70"
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
            <Stat
              etiqueta="Frecuencia observada"
              valor={(freqActual * 100).toFixed(1) + "%"}
              tono="azul"
            />
            <Stat
              etiqueta="Total extraídas"
              valor={extraidas.toLocaleString("es")}
              tono="neutro"
            />
          </div>

          <GraficoConvergencia
            puntos={historial}
            pTeorica={pTeorica}
            className="mt-5"
          />
        </div>
      </div>
    </div>
  );
}

function UrnaVisual({ azules, rojas }: { azules: number; rojas: number }) {
  const bolitas = [
    ...Array.from({ length: azules }, () => "azul" as const),
    ...Array.from({ length: rojas }, () => "rojo" as const),
  ];
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 dark:border-slate-800 dark:bg-slate-900/40">
      <p className="mb-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        La urna
      </p>
      <div className="mx-auto flex h-44 w-32 flex-wrap items-end justify-center gap-1.5 rounded-b-[60px] rounded-t-md border-x-4 border-b-4 border-slate-300 bg-white p-3 dark:border-slate-700 dark:bg-slate-950">
        {bolitas.map((c, i) => (
          <span
            key={i}
            className={
              "h-4 w-4 rounded-full shadow-sm sm:h-5 sm:w-5 " +
              (c === "azul"
                ? "bg-blue-500"
                : "bg-rose-500")
            }
          />
        ))}
        {bolitas.length === 0 && (
          <p className="text-xs text-slate-400">Urna vacía</p>
        )}
      </div>
    </div>
  );
}

function Slider({
  etiqueta,
  valor,
  min,
  max,
  onChange,
  color,
}: {
  etiqueta: string;
  valor: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  color: "azul" | "rojo";
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {etiqueta}
      </span>
      <div className="flex items-center gap-3">
        <input
          type="range"
          min={min}
          max={max}
          value={valor}
          onChange={(e) => onChange(Number(e.target.value))}
          className={color === "azul" ? "w-full accent-blue-600" : "w-full accent-rose-600"}
        />
        <span className="w-8 text-right font-serif text-lg font-semibold tabular-nums text-slate-900 dark:text-slate-100">
          {valor}
        </span>
      </div>
    </label>
  );
}

function Stat({
  etiqueta,
  valor,
  tono,
}: {
  etiqueta: string;
  valor: string;
  tono: "azul" | "neutro";
}) {
  return (
    <div className="rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-800/60">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {etiqueta}
      </p>
      <p
        className={
          "font-serif text-xl font-semibold tabular-nums sm:text-2xl " +
          (tono === "azul"
            ? "text-blue-700 dark:text-blue-300"
            : "text-slate-900 dark:text-slate-100")
        }
      >
        {valor}
      </p>
    </div>
  );
}

/** Gráfico SVG simple de convergencia: frecuencia vs número de extracciones. */
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

  // X en escala log para que 1 y 1000 sean visibles juntos
  const maxN = puntos.length > 0 ? puntos[puntos.length - 1].n : 1;
  const minLog = Math.log10(1);
  const maxLog = Math.log10(Math.max(10, maxN));

  function x(n: number) {
    const lg = Math.log10(Math.max(1, n));
    return ((lg - minLog) / (maxLog - minLog || 1)) * W;
  }
  function y(p: number) {
    return H - margenY - p * (H - margenY * 2);
  }

  const yTeorica = y(pTeorica);
  const path =
    puntos.length === 0
      ? ""
      : "M " +
        puntos
          .map((pt) => `${x(pt.n).toFixed(1)} ${y(pt.freq).toFixed(1)}`)
          .join(" L ");

  return (
    <div className={className}>
      <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        Convergencia
      </p>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block w-full"
        role="img"
        aria-label="Gráfico de frecuencia relativa convergiendo a la probabilidad teórica"
      >
        {/* Eje horizontal */}
        <line
          x1={0}
          y1={H - margenY}
          x2={W}
          y2={H - margenY}
          className="stroke-slate-300 dark:stroke-slate-700"
          strokeWidth={1}
        />
        {/* Línea de probabilidad teórica */}
        <line
          x1={0}
          y1={yTeorica}
          x2={W}
          y2={yTeorica}
          className="stroke-amber-500"
          strokeDasharray="4 4"
          strokeWidth={1.5}
        />
        <text
          x={W - 4}
          y={yTeorica - 4}
          textAnchor="end"
          className="fill-amber-700 text-[11px] dark:fill-amber-300"
        >
          Teórica {(pTeorica * 100).toFixed(1)}%
        </text>
        {/* Curva observada */}
        {path && (
          <path
            d={path}
            fill="none"
            className="stroke-blue-600 dark:stroke-blue-400"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </div>
  );
}
