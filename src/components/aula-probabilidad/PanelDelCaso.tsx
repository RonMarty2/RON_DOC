"use client";

import { useEffect, useState } from "react";
import { CORTE_TAMIZAJE, ESTUDIANTES } from "@content/aula-probabilidad/dataset";
import { tablaConfusion, resumenPhq9, contar, gad7Positivo } from "./calculos";

/**
 * Los datos del caso, disponibles desde cualquier apartado.
 *
 * Existe porque dando clase había que volver atrás constantemente: Bayes usa
 * la sensibilidad y la prevalencia que se calcularon en 2.3, 2.9 remite a 2.1
 * y 2.8, y así. Con este panel los números están siempre a un toque, sin
 * perder el lugar en el que uno está.
 */
export function PanelDelCaso({ indiceActivo }: { indiceActivo: number }) {
  // Índices en MODULOS: 0-1 preámbulo, 2 = 2.1 … 4 = 2.3, 6 = 2.5, 9 = 2.8, 10 = 2.9.
  const veDiagnostico = indiceActivo >= 4;
  const veAnsiedad = indiceActivo >= 6;
  const veNormal = indiceActivo >= 10;
  const [abierto, setAbierto] = useState(false);
  const t = tablaConfusion();
  const { media, desviacion } = resumenPhq9();
  const gad = contar(gad7Positivo);
  const ambos = contar((e) => e.phq9 >= CORTE_TAMIZAJE && gad7Positivo(e));

  // Cerrar con Escape, para no dejarlo tapando la pantalla.
  useEffect(() => {
    if (!abierto) return;
    const porTecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAbierto(false);
    };
    window.addEventListener("keydown", porTecla);
    return () => window.removeEventListener("keydown", porTecla);
  }, [abierto]);

  return (
    <>
      {/* Botón flotante, siempre a mano */}
      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        aria-expanded={abierto}
        className="fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full bg-slate-800 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600"
      >
        <span aria-hidden>📌</span>
        <span className="hidden sm:inline">Datos del caso</span>
      </button>

      {abierto && (
        <>
          <div
            className="fixed inset-0 z-40 bg-slate-900/30"
            onClick={() => setAbierto(false)}
            aria-hidden
          />
          <aside
            className="fixed bottom-0 left-0 right-0 z-50 max-h-[80vh] overflow-y-auto rounded-t-2xl border-t border-slate-200 bg-white p-5 shadow-2xl sm:bottom-20 sm:left-auto sm:right-4 sm:max-h-[70vh] sm:w-96 sm:rounded-2xl sm:border dark:border-slate-700 dark:bg-slate-900"
            aria-label="Datos del caso"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-semibold text-slate-900 dark:text-slate-100">
                Datos del caso
              </h3>
              <button
                type="button"
                onClick={() => setAbierto(false)}
                className="rounded-full px-2 py-1 text-sm text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                cerrar ✕
              </button>
            </div>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Todo lo que hace falta recordar, sin salir de donde estás.
            </p>
            {!veDiagnostico && (
              <p className="mt-2 rounded-lg bg-slate-100 px-3 py-2 text-xs text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                Este panel crece con vos: por ahora muestra sólo los datos que
                ya se presentaron. La tabla de 2×2 y los indicadores aparecen
                en el apartado 2.3, cuando haya con qué calcularlos.
              </p>
            )}

            <Bloque titulo="El archivo">
              <Dato etiqueta="Fichas en total" valor={ESTUDIANTES.length} />
              <Dato etiqueta="Corte del tamizaje" valor={`≥ ${CORTE_TAMIZAJE}`} />
              <Dato etiqueta="Dan positivo en depresión" valor={t.positivos} />
              {veAnsiedad && (
                <>
                  <Dato etiqueta="Dan positivo en ansiedad" valor={gad} />
                  <Dato etiqueta="Positivos en ambos" valor={ambos} />
                </>
              )}
              {veDiagnostico && (
                <Dato etiqueta="Con diagnóstico confirmado" valor={t.dxSi} />
              )}
            </Bloque>

            {veDiagnostico && (
              <>
              <Bloque titulo="La tabla de 2×2 (apartado 2.3)">
                <table className="w-full border-collapse text-center text-xs">
                  <thead>
                    <tr className="text-slate-500 dark:text-slate-400">
                      <th className="py-1" />
                      <th className="py-1 font-medium">Dx sí</th>
                      <th className="py-1 font-medium">Dx no</th>
                    </tr>
                  </thead>
                  <tbody className="tabular-nums">
                    <tr>
                      <th className="py-1 text-right text-xs font-medium text-slate-500">
                        Test +
                      </th>
                      <td className="rounded bg-emerald-100 py-1.5 font-bold text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-200">
                        {t.VP}
                      </td>
                      <td className="rounded bg-amber-100 py-1.5 font-bold text-amber-900 dark:bg-amber-950/50 dark:text-amber-200">
                        {t.FP}
                      </td>
                    </tr>
                    <tr>
                      <th className="py-1 text-right text-xs font-medium text-slate-500">
                        Test −
                      </th>
                      <td className="rounded bg-rose-100 py-1.5 font-bold text-rose-900 dark:bg-rose-950/50 dark:text-rose-200">
                        {t.FN}
                      </td>
                      <td className="rounded bg-emerald-100 py-1.5 font-bold text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-200">
                        {t.VN}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Bloque>

              <Bloque titulo="Los tres indicadores (apartado 2.3)">
                <Dato
                  etiqueta="Sensibilidad"
                  sub={`${t.VP}/${t.dxSi} · de los enfermos, a cuántos detecta`}
                  valor={`${(t.sensibilidad * 100).toFixed(1)}%`}
                />
                <Dato
                  etiqueta="Especificidad"
                  sub={`${t.VN}/${t.dxNo} · de los sanos, a cuántos descarta`}
                  valor={`${(t.especificidad * 100).toFixed(1)}%`}
                />
                <Dato
                  etiqueta="Valor predictivo (VPP)"
                  sub={`${t.VP}/${t.positivos} · de los positivos, cuántos lo tienen`}
                  valor={`${(t.vpp * 100).toFixed(1)}%`}
                  destacado
                />
                <Dato
                  etiqueta="Prevalencia"
                  sub={`${t.dxSi}/${t.total} · cuán frecuente es en la población`}
                  valor={`${(t.prevalencia * 100).toFixed(1)}%`}
                />
              </Bloque>
              </>
            )}

            {veNormal && (
              <Bloque titulo="Para el apartado 2.9">
                <Dato etiqueta="Media del puntaje (µ)" valor={media.toFixed(2)} />
                <Dato
                  etiqueta="Desviación estándar (σ)"
                  valor={desviacion.toFixed(2)}
                />
              </Bloque>
            )}
          </aside>
        </>
      )}
    </>
  );
}

function Bloque({
  titulo,
  children,
}: {
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-4">
      <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
        {titulo}
      </p>
      <div className="mt-1.5 flex flex-col gap-1">{children}</div>
    </div>
  );
}

function Dato({
  etiqueta,
  valor,
  sub,
  destacado,
}: {
  etiqueta: string;
  valor: string | number;
  sub?: string;
  destacado?: boolean;
}) {
  return (
    <div
      className={
        "flex items-baseline justify-between gap-3 rounded-lg px-2 py-1 " +
        (destacado ? "bg-amber-50 dark:bg-amber-950/30" : "")
      }
    >
      <span className="min-w-0 flex-1">
        <span className="text-sm text-slate-700 dark:text-slate-300">
          {etiqueta}
        </span>
        {sub && (
          <span className="block text-[10px] leading-tight text-slate-400">
            {sub}
          </span>
        )}
      </span>
      <span
        className={
          "shrink-0 font-serif text-base font-semibold tabular-nums " +
          (destacado
            ? "text-amber-700 dark:text-amber-400"
            : "text-slate-900 dark:text-slate-100")
        }
      >
        {valor}
      </span>
    </div>
  );
}
