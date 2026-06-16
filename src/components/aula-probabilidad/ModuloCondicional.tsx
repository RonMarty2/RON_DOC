"use client";

import { useState } from "react";
import { ESTUDIANTES } from "@content/aula-probabilidad/dataset";
import { contar, proporcion, condicional } from "./calculos";
import { AvatarMini } from "./AvatarMini";
import { RecuadroCaso, MiniHistoria } from "./narrativa";

/**
 * Peldaño 2-3 — Probabilidad condicional con el grupo real.
 * Filtra el aula por "duerme mal" y muestra cómo P(ánimo bajo) sube de
 * 13.3% (general) a 25% (entre los que duermen mal). La información cambia
 * la probabilidad.
 */
export function ModuloCondicional() {
  const [filtrando, setFiltrando] = useState(false);

  const total = ESTUDIANTES.length;
  const animoGeneral = contar((e) => e.animoBajo);
  const pGeneral = proporcion((e) => e.animoBajo);

  const duermenMal = contar((e) => e.duermeMal);
  const cond = condicional((e) => e.animoBajo, (e) => e.duermeMal);

  // P(duerme mal Y ánimo bajo) para la nota de eventos compuestos.
  const ambos = contar((e) => e.duermeMal && e.animoBajo);

  return (
    <div className="flex flex-col gap-8">
      <RecuadroCaso titulo="Andrea nota algo: los que duermen mal">
        <p>
          Andrea observa que entre los que <strong>duermen mal</strong> parece
          haber más casos de ánimo bajo. ¿Es cierto, o es una impresión? Con el
          grupo real lo podemos medir: saber que alguien duerme mal,{" "}
          <strong>¿cambia</strong> la probabilidad de que tenga ánimo bajo?
        </p>
      </RecuadroCaso>

      {/* Nota breve de eventos compuestos (peldaño 2) */}
      <MiniHistoria titulo="Antes: eventos «y»">
        En el grupo, {ambos} estudiantes cumplen <strong>las dos cosas a la vez</strong>:
        duermen mal <em>y</em> tienen ánimo bajo ({ambos}/{total} ={" "}
        {((ambos / total) * 100).toFixed(1)}%). Pero la pregunta interesante no es
        esa, sino: <strong>dentro</strong> de los que duermen mal, ¿qué proporción
        tiene ánimo bajo? Eso es la probabilidad condicional.
      </MiniHistoria>

      {/* Control de filtro */}
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <button
          type="button"
          onClick={() => setFiltrando((f) => !f)}
          className={
            "rounded-full px-4 py-2 text-sm font-semibold shadow-sm transition " +
            (filtrando
              ? "bg-amber-500 text-white hover:bg-amber-600"
              : "bg-blue-600 text-white hover:bg-blue-700")
          }
        >
          {filtrando ? "↩ Ver todo el grupo" : "🔎 Mostrar solo los que duermen mal"}
        </button>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {filtrando
            ? `Mostrando los ${duermenMal} que duermen mal. Los demás se atenúan.`
            : `Grupo completo: ${total} estudiantes.`}
        </p>
      </div>

      {/* Comparación lado a lado */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Tarjeta
          titulo="En todo el grupo"
          formula="P(ánimo bajo)"
          num={animoGeneral}
          den={total}
          valor={pGeneral}
          tono="azul"
          activa={!filtrando}
        />
        <Tarjeta
          titulo="Solo entre los que duermen mal"
          formula="P(ánimo bajo | duerme mal)"
          num={cond.num}
          den={cond.den}
          valor={cond.p}
          tono="ambar"
          activa={filtrando}
        />
      </div>

      <div className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200">
        <strong>El salto:</strong> en el grupo entero el ánimo bajo es{" "}
        <span className="tabular-nums font-semibold">{(pGeneral * 100).toFixed(1)}%</span>, pero
        entre los que duermen mal sube a{" "}
        <span className="tabular-nums font-semibold">{(cond.p * 100).toFixed(0)}%</span>. Saber
        algo (que duerme mal) <strong>cambió</strong> la probabilidad. Eso es P(A | B) ≠ P(A).
      </div>

      {/* Grilla con filtro visual */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-900/40 sm:p-6">
        <p className="mb-3 text-sm text-slate-600 dark:text-slate-400">
          🟡 borde amarillo: duerme mal · 🔴 punto: ánimo bajo
        </p>
        <div className="grid grid-cols-5 gap-3 sm:grid-cols-8 md:grid-cols-10">
          {ESTUDIANTES.map((e) => {
            const atenuado = filtrando && !e.duermeMal;
            return (
              <div
                key={e.id}
                className={"transition-opacity " + (atenuado ? "opacity-20" : "opacity-100")}
              >
                <div
                  className={
                    "rounded-xl p-0.5 " +
                    (e.duermeMal
                      ? "bg-amber-200 dark:bg-amber-900/50"
                      : "bg-transparent")
                  }
                >
                  <AvatarMini
                    inicial={e.nombre[0]}
                    seed={e.id}
                    etiqueta={e.animoBajo ? "● ánimo" : undefined}
                    resaltado={e.animoBajo}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Tarjeta({
  titulo,
  formula,
  num,
  den,
  valor,
  tono,
  activa,
}: {
  titulo: string;
  formula: string;
  num: number;
  den: number;
  valor: number;
  tono: "azul" | "ambar";
  activa: boolean;
}) {
  const base =
    tono === "azul"
      ? "border-blue-200 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-950/20"
      : "border-amber-300 bg-amber-50/60 dark:border-amber-800 dark:bg-amber-950/20";
  const texto =
    tono === "azul" ? "text-blue-700 dark:text-blue-300" : "text-amber-700 dark:text-amber-300";
  return (
    <div
      className={
        "rounded-2xl border p-5 transition " +
        base +
        (activa ? " ring-2 ring-offset-2 ring-offset-white dark:ring-offset-slate-950 " + (tono === "azul" ? "ring-blue-400" : "ring-amber-400") : "")
      }
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {titulo}
      </p>
      <p className={"mt-1 font-mono text-sm font-semibold " + texto}>{formula}</p>
      <p className={"mt-3 font-serif text-5xl font-semibold tabular-nums " + texto}>
        {(valor * 100).toFixed(valor * 100 < 100 && !Number.isInteger(valor * 100) ? 1 : 0)}%
      </p>
      <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
        <span className="tabular-nums">{num}</span> de{" "}
        <span className="tabular-nums">{den}</span> estudiantes
      </p>
    </div>
  );
}
