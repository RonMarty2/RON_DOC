"use client";

import { useEffect, useRef, useState } from "react";

export interface OpcionVotacion {
  id: string;
  texto: string;
  /** Marca cuál es la respuesta correcta al revelar. */
  esCorrecta?: boolean;
}

export interface VotacionConfig {
  pregunta: string;
  opciones: OpcionVotacion[];
  /**
   * Distribución de intuición esperada (la "trampa" pedagógica). Pesos
   * paralelos a opciones, suma libre — internamente se normaliza.
   * Si se omite, se asume distribución uniforme.
   */
  pesos?: number[];
  /** Texto que aparece al revelar la respuesta. */
  notaRevelacion?: string;
  /** Cantidad de estudiantes simulados por defecto. */
  nDefecto?: number;
}

type Fase = "idle" | "votando" | "completa" | "revelado";

/**
 * Panel de "Votación de clase (simulada)".
 *
 * Pensado para usar en la pantalla del proyector durante la clase: el docente
 * lanza la pregunta, el panel "recibe" votos de N estudiantes virtuales a lo
 * largo de unos segundos (con animación), después el docente cierra y revela
 * la respuesta correcta. Sirve para reproducir el momento «la mayoría se
 * equivoca, miren la simulación».
 *
 * No necesita backend. Si en el futuro se conecta Supabase, este componente
 * será reemplazado por uno equivalente que escuche votos reales.
 */
export function VotacionSimulada({
  pregunta,
  opciones,
  pesos,
  notaRevelacion,
  nDefecto = 30,
}: VotacionConfig) {
  const [n, setN] = useState(nDefecto);
  const [fase, setFase] = useState<Fase>("idle");
  const [votos, setVotos] = useState<number[]>(() => opciones.map(() => 0));
  const [emitidos, setEmitidos] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  function reset() {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    setFase("idle");
    setVotos(opciones.map(() => 0));
    setEmitidos(0);
  }

  function lanzar() {
    reset();
    setFase("votando");
    const total = n;
    const acc = opciones.map(() => 0);
    let emitidoLocal = 0;

    // Construir CDF a partir de los pesos.
    const pesosBrutos = pesos ?? opciones.map(() => 1);
    const suma = pesosBrutos.reduce((s, p) => s + p, 0) || 1;
    const cdf: number[] = [];
    let acumPeso = 0;
    for (const p of pesosBrutos) {
      acumPeso += p / suma;
      cdf.push(acumPeso);
    }

    function tick() {
      if (emitidoLocal >= total) {
        setFase("completa");
        return;
      }
      const r = Math.random();
      let idx = cdf.findIndex((c) => r <= c);
      if (idx === -1) idx = cdf.length - 1;
      acc[idx]++;
      emitidoLocal++;
      setVotos([...acc]);
      setEmitidos(emitidoLocal);
      // Ritmo: ~80ms por voto, con pequeño jitter (más realista que constante).
      const espera = 50 + Math.random() * 80;
      timerRef.current = window.setTimeout(tick, espera);
    }
    tick();
  }

  const total = votos.reduce((s, v) => s + v, 0);
  const maxVotos = Math.max(1, ...votos);

  return (
    <section
      aria-label="Panel de votación"
      className="rounded-2xl border-2 border-blue-300 bg-blue-50/40 p-5 dark:border-blue-800 dark:bg-blue-950/20 sm:p-6"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-blue-700 dark:text-blue-300">
            Votación de clase
          </p>
          <h4 className="mt-1 font-serif text-lg font-semibold text-slate-900 dark:text-slate-100">
            {pregunta}
          </h4>
        </div>
        <div className="flex items-center gap-3">
          {fase === "idle" && (
            <label className="flex items-center gap-2 text-xs">
              <span className="font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Estudiantes simulados
              </span>
              <input
                type="number"
                min={5}
                max={200}
                value={n}
                onChange={(e) => setN(Math.max(5, Math.min(200, Number(e.target.value) || 0)))}
                className="w-16 rounded-md border border-slate-200 bg-white px-2 py-1 text-sm tabular-nums dark:border-slate-700 dark:bg-slate-900"
              />
            </label>
          )}
        </div>
      </div>

      {/* Barras */}
      <ul className="mt-5 flex flex-col gap-3">
        {opciones.map((op, i) => {
          const v = votos[i] ?? 0;
          const pct = total > 0 ? (v / total) * 100 : 0;
          const ancho = (v / maxVotos) * 100;
          const revelaCorrecta = fase === "revelado" && op.esCorrecta;
          return (
            <li key={op.id}>
              <div className="flex items-baseline justify-between gap-3">
                <span
                  className={
                    "text-sm font-medium " +
                    (revelaCorrecta
                      ? "text-emerald-700 dark:text-emerald-300"
                      : "text-slate-700 dark:text-slate-300")
                  }
                >
                  {revelaCorrecta && <span aria-hidden>✓ </span>}
                  {op.texto}
                </span>
                <span className="text-xs tabular-nums text-slate-500 dark:text-slate-500">
                  {v} ({pct.toFixed(0)}%)
                </span>
              </div>
              <div className="mt-1 h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className={
                    "h-full rounded-full transition-[width] duration-150 " +
                    (revelaCorrecta
                      ? "bg-emerald-500"
                      : fase === "revelado"
                        ? "bg-rose-400"
                        : "bg-blue-500")
                  }
                  style={{ width: ancho + "%" }}
                />
              </div>
            </li>
          );
        })}
      </ul>

      {/* Controles */}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        {fase === "idle" && (
          <button
            type="button"
            onClick={lanzar}
            className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            🎯 Lanzar pregunta a la clase
          </button>
        )}
        {fase === "votando" && (
          <p className="text-sm text-slate-700 dark:text-slate-300">
            Recibiendo votos…{" "}
            <span className="tabular-nums">
              {emitidos}/{n}
            </span>
          </p>
        )}
        {fase === "completa" && (
          <>
            <button
              type="button"
              onClick={() => setFase("revelado")}
              className="rounded-full bg-amber-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-600"
            >
              🔍 Cerrar y revelar respuesta
            </button>
            <button
              type="button"
              onClick={reset}
              className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Repetir
            </button>
          </>
        )}
        {fase === "revelado" && (
          <button
            type="button"
            onClick={reset}
            className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Nueva votación
          </button>
        )}
      </div>

      {fase === "revelado" && notaRevelacion && (
        <div className="mt-4 rounded-xl bg-amber-100 px-4 py-3 text-sm text-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
          <strong>Insight:</strong> {notaRevelacion}
        </div>
      )}
    </section>
  );
}
