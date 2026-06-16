"use client";

import { useState } from "react";
import { MiniHistoria } from "./narrativa";

type Cara = "cara" | "sello";

/**
 * Preludio 3 — La moneda con "racha".
 * Falacia del jugador: tras varias caras seguidas la gente cree que "toca"
 * sello. La herramienta muestra que cada tiro sigue siendo 50/50 y que la
 * frecuencia global se mantiene cerca de 50% por más larga que sea una racha.
 */
export function ModuloMoneda() {
  const [tiros, setTiros] = useState<Cara[]>([]);
  const [caras, setCaras] = useState(0);

  function tirar(n: number) {
    const nuevos: Cara[] = [];
    let c = 0;
    for (let i = 0; i < n; i++) {
      const cara = Math.random() < 0.5;
      nuevos.push(cara ? "cara" : "sello");
      if (cara) c++;
    }
    setTiros((prev) => [...prev, ...nuevos].slice(-200));
    setCaras((prev) => prev + c);
  }

  function reset() {
    setTiros([]);
    setCaras(0);
  }

  const total = tiros.length;
  // Racha actual al final de la secuencia
  let racha = 0;
  if (total > 0) {
    const ultima = tiros[total - 1];
    for (let i = total - 1; i >= 0 && tiros[i] === ultima; i--) racha++;
  }
  const ultimaCara = total > 0 ? tiros[total - 1] : null;
  const totalCaras = tiros.filter((t) => t === "cara").length;
  const pctCaras = total > 0 ? (totalCaras / total) * 100 : 0;

  return (
    <div className="flex flex-col gap-6">
      <MiniHistoria titulo="La falacia del jugador">
        Si una moneda sale <strong>cara 5 veces seguidas</strong>, casi todos
        sienten que «ya toca sello». Es mentira: la moneda no tiene memoria.
        Cada tiro es 50% independientemente de lo que pasó antes. Confundimos
        «a la larga se equilibra» con «la próxima se corrige».
      </MiniHistoria>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => tirar(1)}
            className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            🪙 Tirar 1
          </button>
          <button
            type="button"
            onClick={() => tirar(20)}
            className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300"
          >
            Tirar 20
          </button>
          <button
            type="button"
            onClick={reset}
            className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Limpiar
          </button>
          {racha >= 3 && ultimaCara && (
            <span className="ml-auto rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
              ¡Racha de {racha} {ultimaCara === "cara" ? "caras" : "sellos"}! ¿La próxima se «corrige»? No.
            </span>
          )}
        </div>

        {/* Secuencia de tiros */}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {tiros.length === 0 && (
            <p className="text-sm text-slate-500 dark:text-slate-500">
              Tirá la moneda para ver la secuencia.
            </p>
          )}
          {tiros.map((t, i) => (
            <span
              key={i}
              className={
                "grid h-7 w-7 place-items-center rounded-full text-xs font-bold " +
                (t === "cara"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-300 text-slate-700 dark:bg-slate-700 dark:text-slate-200")
              }
              title={t}
            >
              {t === "cara" ? "C" : "S"}
            </span>
          ))}
        </div>

        {/* Stats */}
        {total > 0 && (
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <Stat etiqueta="Tiros" valor={total.toString()} />
            <Stat etiqueta="Caras" valor={`${totalCaras}`} />
            <Stat
              etiqueta="% caras"
              valor={`${pctCaras.toFixed(1)}%`}
              destacado
            />
          </div>
        )}
        <p className="mt-4 text-xs text-slate-500 dark:text-slate-500">
          La próxima tirada es siempre 50% cara / 50% sello, sin importar la
          racha. Con muchos tiros, el «% caras» se queda cerca de 50%.
        </p>
      </div>
    </div>
  );
}

function Stat({
  etiqueta,
  valor,
  destacado = false,
}: {
  etiqueta: string;
  valor: string;
  destacado?: boolean;
}) {
  return (
    <div className="rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-800/60">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {etiqueta}
      </p>
      <p
        className={
          "font-serif text-2xl font-semibold tabular-nums " +
          (destacado
            ? "text-blue-700 dark:text-blue-300"
            : "text-slate-900 dark:text-slate-100")
        }
      >
        {valor}
      </p>
    </div>
  );
}
