"use client";

import { useMemo, useState } from "react";

interface CategoriaDot {
  total: number;
  color: string;
  etiqueta: string;
  letra: string;
}

const FILAS = 25;
const COLUMNAS = 40; // 25*40 = 1000

/**
 * Módulo E — "El positivo de Daniela".
 * 1000 estudiantes como puntitos. Sliders de prevalencia, sensibilidad,
 * especificidad. Visualización del valor predictivo positivo VP / (VP + FP),
 * el número que contradice la intuición.
 */
export function ModuloBayes() {
  const [prevalencia, setPrevalencia] = useState(0.05); // 5%
  const [sensibilidad, setSensibilidad] = useState(0.9); // 90%
  const [especificidad, setEspecificidad] = useState(0.9); // 90%
  const [contestada, setContestada] = useState<null | number>(null);

  const stats = useMemo(() => {
    const enfermos = Math.round(1000 * prevalencia);
    const sanos = 1000 - enfermos;
    const vp = Math.round(enfermos * sensibilidad);
    const fn = enfermos - vp;
    const fp = Math.round(sanos * (1 - especificidad));
    const vn = sanos - fp;
    const vpp = vp + fp > 0 ? vp / (vp + fp) : 0;
    return { enfermos, sanos, vp, fn, fp, vn, vpp };
  }, [prevalencia, sensibilidad, especificidad]);

  // Asignar categoría a cada uno de los 1000 puntos.
  const categorias = useMemo<CategoriaDot[]>(
    () => [
      { total: stats.vp, color: "bg-emerald-600", etiqueta: "Verdaderos positivos (enfermos detectados)", letra: "VP" },
      { total: stats.fp, color: "bg-rose-500", etiqueta: "Falsos positivos (sanos marcados como enfermos)", letra: "FP" },
      { total: stats.fn, color: "bg-amber-500", etiqueta: "Falsos negativos (enfermos no detectados)", letra: "FN" },
      { total: stats.vn, color: "bg-slate-300 dark:bg-slate-700", etiqueta: "Verdaderos negativos (sanos correctamente descartados)", letra: "VN" },
    ],
    [stats]
  );

  // Daniela es un punto específico: el primer FP (la posición varía si cambian los números).
  const indiceDaniela = stats.vp; // primero de los FP

  const dots: { color: string; esDaniela: boolean }[] = [];
  let idx = 0;
  for (const cat of categorias) {
    for (let i = 0; i < cat.total && idx < 1000; i++, idx++) {
      dots.push({ color: cat.color, esDaniela: idx === indiceDaniela });
    }
  }
  while (dots.length < 1000) dots.push({ color: "bg-slate-300 dark:bg-slate-700", esDaniela: false });

  const opciones = [10, 30, 50, 90];

  return (
    <div className="flex flex-col gap-8">
      {/* Caso narrativo */}
      <article className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 dark:border-slate-800 dark:bg-slate-900/50 sm:p-6">
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-blue-700 dark:text-blue-300">
          Caso clínico
        </p>
        <h4 className="mt-1 font-serif text-xl font-semibold text-slate-900 dark:text-slate-100">
          El positivo de Daniela
        </h4>
        <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Un centro de salud mental universitario aplica un{" "}
          <strong>test de tamizaje de depresión</strong> a cientos de
          estudiantes de primer año. <strong>Daniela</strong>, una estudiante
          sin síntomas aparentes, da <strong>positivo</strong>. La{" "}
          <strong>Lic. Andrea Soto</strong> debe decidir si comunicarle que
          «probablemente tiene depresión» y derivarla. Su jefe insiste: «el
          test tiene 90% de precisión, actuá». Pero algo no cuadra.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          La pregunta clave: <em>¿cuál es la probabilidad real de que Daniela
          tenga depresión, dado que el test dio positivo?</em>
        </p>
      </article>

      {/* Quiz preliminar */}
      {contestada === null && (
        <div className="rounded-2xl border border-amber-300 bg-amber-50 p-5 dark:border-amber-800 dark:bg-amber-950/30">
          <p className="font-serif text-base font-semibold text-amber-900 dark:text-amber-200">
            🎯 Antes de revelar: ¿cuál es tu intuición?
          </p>
          <p className="mt-1 text-sm text-amber-900/80 dark:text-amber-200/80">
            Si el test es «90% preciso», ¿qué probabilidad tiene Daniela de
            realmente tener depresión?
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {opciones.map((op) => (
              <button
                key={op}
                type="button"
                onClick={() => setContestada(op)}
                className="rounded-lg border-2 border-amber-300 bg-white px-3 py-3 font-serif text-2xl font-semibold text-amber-900 transition hover:border-amber-500 hover:bg-amber-100 dark:border-amber-700 dark:bg-slate-900 dark:text-amber-200 dark:hover:bg-amber-950/60"
              >
                ≈ {op}%
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sliders */}
      <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:grid-cols-3 dark:border-slate-800 dark:bg-slate-900">
        <SliderPct
          etiqueta="Prevalencia"
          ayuda="% de estudiantes que realmente tienen depresión"
          valor={prevalencia}
          min={0.01}
          max={0.4}
          step={0.01}
          onChange={setPrevalencia}
        />
        <SliderPct
          etiqueta="Sensibilidad"
          ayuda="% de enfermos que el test detecta correctamente"
          valor={sensibilidad}
          min={0.5}
          max={1}
          step={0.01}
          onChange={setSensibilidad}
        />
        <SliderPct
          etiqueta="Especificidad"
          ayuda="% de sanos que el test descarta correctamente"
          valor={especificidad}
          min={0.5}
          max={1}
          step={0.01}
          onChange={setEspecificidad}
        />
      </div>

      {/* Población visualizada */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:p-5">
        <p className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
          1000 estudiantes (cada puntito = 1)
        </p>
        <div
          className="grid gap-[2px]"
          style={{ gridTemplateColumns: `repeat(${COLUMNAS}, minmax(0, 1fr))` }}
        >
          {dots.map((d, i) => (
            <span
              key={i}
              className={
                "aspect-square rounded-sm " +
                d.color +
                (d.esDaniela ? " aula-parpadea ring-2 ring-amber-500 ring-offset-1" : "")
              }
              aria-label={d.esDaniela ? "Daniela" : undefined}
            />
          ))}
        </div>

        {/* Leyenda */}
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
          {categorias.map((c) => (
            <div key={c.letra} className="flex items-center gap-2">
              <span className={"h-3 w-3 shrink-0 rounded-sm " + c.color} />
              <span className="text-slate-600 dark:text-slate-400">
                <span className="font-semibold">{c.letra}</span> · {c.total}
              </span>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 shrink-0 rounded-sm bg-amber-500 ring-2 ring-amber-500 ring-offset-1 aula-parpadea" />
            <span className="text-amber-700 dark:text-amber-300 font-semibold">
              Daniela (un FP)
            </span>
          </div>
        </div>
      </div>

      {/* El número clave */}
      <div className="rounded-2xl border-2 border-blue-500 bg-blue-50 p-6 text-center dark:border-blue-700 dark:bg-blue-950/30 sm:p-8">
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-blue-700 dark:text-blue-300">
          La pregunta de Bayes
        </p>
        <p className="mt-2 font-serif text-lg text-slate-900 dark:text-slate-100">
          P(enfermo | positivo) = VP / (VP + FP)
        </p>
        <p className="mt-2 font-serif text-6xl font-semibold tabular-nums text-blue-700 sm:text-7xl dark:text-blue-300">
          {(stats.vpp * 100).toFixed(0)}%
        </p>
        <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
          {stats.vp} verdaderos positivos sobre {stats.vp + stats.fp} positivos totales
        </p>

        {contestada !== null && (
          <div className="mt-5 rounded-xl bg-white px-4 py-3 text-sm dark:bg-slate-900">
            <p className="text-slate-700 dark:text-slate-300">
              Tu intuición: <span className="font-semibold tabular-nums">≈ {contestada}%</span>{" "}
              · La probabilidad real:{" "}
              <span className="font-semibold tabular-nums text-blue-700 dark:text-blue-300">
                {(stats.vpp * 100).toFixed(0)}%
              </span>
            </p>
            {contestada > stats.vpp * 100 + 10 && (
              <p className="mt-1 text-amber-800 dark:text-amber-300">
                Eso es la trampa: en un tamizaje sobre población mayormente
                sana, la mayoría de los positivos son <strong>falsos positivos</strong>.
                El test «90% preciso» no significa que un positivo signifique 90%.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function SliderPct({
  etiqueta,
  ayuda,
  valor,
  min,
  max,
  step,
  onChange,
}: {
  etiqueta: string;
  ayuda: string;
  valor: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {etiqueta}
      </span>
      <div className="flex items-baseline gap-2">
        <span className="font-serif text-2xl font-semibold tabular-nums text-slate-900 dark:text-slate-100">
          {(valor * 100).toFixed(0)}%
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={valor}
        onChange={(e) => onChange(Number(e.target.value))}
        className="accent-blue-600"
      />
      <span className="text-xs text-slate-500 dark:text-slate-500">{ayuda}</span>
    </label>
  );
}
