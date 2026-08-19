"use client";

import { useState } from "react";
import { tablaConfusion } from "./calculos";

const OPCIONES = [
  { id: "a", etiqueta: "Casi seguro: alrededor del 90%" },
  { id: "b", etiqueta: "Bastante probable: alrededor del 75%" },
  { id: "c", etiqueta: "Una moneda al aire: alrededor del 50%", esCorrecta: true },
  { id: "d", etiqueta: "Poco probable: alrededor del 25%" },
];

/**
 * Preámbulo — "La paradoja diagnóstica".
 *
 * No enseña nada todavía: instala la pregunta. El visitante arriesga una
 * respuesta ANTES de ver la verdadera, porque equivocarse uno mismo pega
 * más fuerte que leer el dato. Funciona igual en clase (proyectado) que
 * para quien estudia solo.
 */
export function ModuloMisterio({ onContinuar }: { onContinuar: () => void }) {
  const [eleccion, setEleccion] = useState<string | null>(null);
  const t = tablaConfusion();
  const acerto = eleccion === "c";

  return (
    <div className="flex flex-col gap-6">
      {/* El planteo */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-blue-700 dark:text-blue-300">
          Un caso real
        </p>
        <h3 className="mt-2 font-serif text-2xl font-semibold leading-snug text-slate-900 dark:text-slate-100 sm:text-3xl">
          Un test que casi nunca falla.
          <br />Y aun así, la mitad de sus alarmas son falsas.
        </h3>

        <div className="mt-6 space-y-3 text-slate-700 dark:text-slate-300">
          <p>
            Un servicio de salud mental universitario usa un cuestionario
            breve para detectar depresión entre sus estudiantes. Es un buen
            instrumento, y lo podemos comprobar:
          </p>
          <p className="rounded-xl bg-emerald-50 px-4 py-3 text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200">
            De cada <strong>100 estudiantes que sí tienen depresión</strong>,
            el cuestionario detecta a <strong>88</strong>. Se le escapan
            apenas 12.
          </p>
          <p>
            Con ese nivel de acierto, el servicio tamiza a 200 estudiantes y{" "}
            <strong className="tabular-nums">{t.positivos}</strong> dan
            positivo. Uno de ellos recibe su resultado y hace la única
            pregunta que le importa:
          </p>
        </div>

        <p className="mt-6 border-l-4 border-blue-600 pl-4 font-serif text-xl font-semibold italic text-slate-900 dark:text-slate-100 sm:text-2xl">
          &laquo;Di positivo. ¿Qué probabilidad tengo de estar realmente
          deprimido?&raquo;
        </p>
      </div>

      {/* La predicción */}
      <div className="rounded-2xl border-2 border-blue-300 bg-blue-50/40 p-6 dark:border-blue-800 dark:bg-blue-950/20 sm:p-8">
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-blue-700 dark:text-blue-300">
          Antes de seguir
        </p>
        <h4 className="mt-1 font-serif text-lg font-semibold text-slate-900 dark:text-slate-100">
          Arriesgá tu respuesta. ¿Cuál dirías que es?
        </h4>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {OPCIONES.map((op) => {
            const elegida = eleccion === op.id;
            const revelar = eleccion !== null;
            return (
              <button
                key={op.id}
                type="button"
                onClick={() => setEleccion(op.id)}
                aria-pressed={elegida}
                className={
                  "rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition " +
                  (revelar && op.esCorrecta
                    ? "border-emerald-600 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200"
                    : elegida
                      ? "border-rose-400 bg-rose-50 text-rose-900 dark:bg-rose-950/30 dark:text-rose-200"
                      : "border-slate-200 bg-white text-slate-700 hover:border-blue-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300")
                }
              >
                {revelar && op.esCorrecta && <span aria-hidden>✓ </span>}
                {elegida && !op.esCorrecta && <span aria-hidden>✗ </span>}
                {op.etiqueta}
              </button>
            );
          })}
        </div>

        {eleccion === null && (
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
            Elegí una. No hay truco: es la misma pregunta que se equivocan
            médicos y psicólogos con años de experiencia.
          </p>
        )}
      </div>

      {/* La revelación */}
      {eleccion !== null && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400">
            La respuesta
          </p>
          <p className="mt-2 font-serif text-4xl font-semibold tabular-nums text-slate-900 dark:text-slate-100 sm:text-5xl">
            {(t.vpp * 100).toFixed(1)}%
          </p>
          <p className="mt-2 text-slate-700 dark:text-slate-300">
            {acerto
              ? "Le acertaste — sos de los pocos. La mayoría responde 90%."
              : "Como la mayoría. El error más común es responder 90%."}
          </p>

          {/* Visual: los positivos, quiénes lo tenían de verdad */}
          <div className="mt-6">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              De los <strong className="tabular-nums">{t.positivos}</strong>{" "}
              estudiantes que dieron positivo, un profesional entrevistó a
              cada uno para confirmar. Esto encontró:
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {Array.from({ length: t.positivos }, (_, i) => {
                const esReal = i < t.VP;
                return (
                  <span
                    key={i}
                    title={esReal ? "Tenía depresión" : "Falsa alarma"}
                    className={
                      "grid h-8 w-8 place-items-center rounded-md text-base " +
                      (esReal
                        ? "bg-rose-500 text-white"
                        : "bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400")
                    }
                  >
                    {esReal ? "●" : "○"}
                  </span>
                );
              })}
            </div>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm">
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-sm bg-rose-500" />
                <span className="text-slate-700 dark:text-slate-300">
                  <strong className="tabular-nums">{t.VP}</strong> sí tenían
                  depresión
                </span>
              </span>
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-sm bg-slate-300 dark:bg-slate-700" />
                <span className="text-slate-700 dark:text-slate-300">
                  <strong className="tabular-nums">{t.FP}</strong> eran falsas
                  alarmas
                </span>
              </span>
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-amber-50 px-5 py-4 dark:bg-amber-950/30">
            <p className="text-amber-900 dark:text-amber-200">
              Casi la mitad de las alarmas del sistema vienen de estudiantes
              que están bien. Y no hay ningún error: el cuestionario funciona
              exactamente como debe, detectando al 88% de los casos reales.
            </p>
            <p className="mt-3 font-semibold text-amber-900 dark:text-amber-200">
              Los dos números —88% y {(t.vpp * 100).toFixed(1)}%— son
              correctos al mismo tiempo. Entender por qué es el objetivo de
              todo este capítulo.
            </p>
          </div>

          <button
            type="button"
            onClick={onContinuar}
            className="mt-6 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            Empecemos por el principio →
          </button>
        </div>
      )}
    </div>
  );
}
