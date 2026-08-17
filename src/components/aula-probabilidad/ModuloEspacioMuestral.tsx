"use client";

import { useState } from "react";
import { ESTUDIANTES } from "@content/aula-probabilidad/dataset";
import { entero } from "./aleatorio";
import { RecuadroClasico, RecuadroCaso, MiniHistoria } from "./narrativa";

const CARAS_DADO = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

/**
 * 2.1 — Espacio muestral, universo, suceso.
 * Clásico: 1 dado → 2 dados (espacio compuesto). Aplicado: los 28 puntajes
 * posibles del PHQ-9, con un estudiante real elegido al azar dentro de ese
 * espacio.
 */
export function ModuloEspacioMuestral() {
  const [dado1, setDado1] = useState<number | null>(null);
  const [par, setPar] = useState<[number, number] | null>(null);
  const [estudianteId, setEstudianteId] = useState<number | null>(null);

  const estudiante =
    estudianteId != null ? ESTUDIANTES.find((e) => e.id === estudianteId) ?? null : null;

  return (
    <div className="flex flex-col gap-8">
      <RecuadroClasico titulo="Un dado: el espacio muestral más simple">
        <p>
          Un <strong>experimento aleatorio</strong> es cualquier procedimiento
          cuyo resultado no se puede predecir con certeza, aunque conozcamos
          de antemano todos los resultados posibles. Tirar un dado es el
          ejemplo de manual: no sabemos qué va a salir, pero sí sabemos el
          conjunto completo de lo que puede salir — el{" "}
          <strong>espacio muestral</strong>.
        </p>
      </RecuadroClasico>

      {/* 1 dado */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h4 className="font-serif text-lg font-semibold text-slate-900 dark:text-slate-100">
            S = {"{1, 2, 3, 4, 5, 6}"}
          </h4>
          <button
            type="button"
            onClick={() => setDado1(entero(1, 6))}
            className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            🎲 Tirar el dado
          </button>
        </div>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          {[1, 2, 3, 4, 5, 6].map((v) => (
            <div
              key={v}
              className={
                "grid h-14 w-14 place-items-center rounded-xl border-2 text-3xl transition sm:h-16 sm:w-16 " +
                (dado1 === v
                  ? "scale-110 border-blue-600 bg-blue-50 dark:bg-blue-950/40"
                  : "border-slate-200 dark:border-slate-700")
              }
            >
              {CARAS_DADO[v - 1]}
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-sm text-slate-600 dark:text-slate-400">
          {dado1 === null ? (
            "Tirá el dado para ver un punto muestral."
          ) : (
            <>
              Salió <strong className="tabular-nums">{dado1}</strong> — un{" "}
              <em>punto muestral</em> dentro de S. &quot;Salió {dado1}&quot;
              es un evento simple: contiene un único punto.
            </>
          )}
        </p>
      </div>

      <MiniHistoria titulo="Universo ≠ espacio muestral">
        El <strong>universo</strong> son las personas u objetos (ej. los
        2,400 estudiantes de una universidad). El{" "}
        <strong>espacio muestral</strong> son los resultados posibles de un
        experimento hecho sobre ellos (ej. los 28 puntajes que puede dar un
        test). No es lo mismo el conjunto de personas que el conjunto de
        resultados — confundirlos es el primer error del capítulo.
      </MiniHistoria>

      {/* 2 dados */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h4 className="font-serif text-lg font-semibold text-slate-900 dark:text-slate-100">
            Dos dados: espacio muestral compuesto
          </h4>
          <button
            type="button"
            onClick={() => setPar([entero(1, 6), entero(1, 6)])}
            className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            🎲🎲 Tirar los dos dados
          </button>
        </div>
        <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
          {par ? (
            <>
              Salió el par{" "}
              <strong className="tabular-nums">
                ({par[0]}, {par[1]})
              </strong>{" "}
              — un punto entre los 36 posibles.
            </>
          ) : (
            "Cada tirada produce un par ordenado (dado A, dado B)."
          )}
        </p>
        <div className="mx-auto mt-4 grid max-w-sm grid-cols-6 gap-1">
          {Array.from({ length: 6 }, (_, i) => i + 1).flatMap((a) =>
            Array.from({ length: 6 }, (_, j) => j + 1).map((b) => {
              const activo = par !== null && par[0] === a && par[1] === b;
              return (
                <div
                  key={`${a}-${b}`}
                  className={
                    "grid aspect-square place-items-center rounded-md border text-[10px] tabular-nums transition " +
                    (activo
                      ? "border-blue-600 bg-blue-600 font-semibold text-white"
                      : "border-slate-200 text-slate-400 dark:border-slate-800 dark:text-slate-600")
                  }
                >
                  {a},{b}
                </div>
              );
            })
          )}
        </div>
        <p className="mt-3 text-center text-xs text-slate-500 dark:text-slate-500">
          36 resultados posibles = 6 × 6. Cada casilla es un punto muestral
          distinto — el espacio muestral crece cuando el experimento se
          repite.
        </p>
      </div>

      {/* Aplicado */}
      <RecuadroCaso titulo="El espacio muestral del PHQ-9: 28 puntajes posibles">
        <p>
          El PHQ-9 tiene 9 preguntas, cada una respondida de 0 a 3. El
          experimento aleatorio es &quot;aplicar el PHQ-9 a un estudiante
          elegido al azar&quot;: no sabemos qué puntaje va a dar, pero sabemos
          que el espacio muestral es exactamente{" "}
          <strong>S = {"{0, 1, 2, ..., 27}"}</strong>, 28 valores posibles
          (mínimo 9×0=0, máximo 9×3=27).
        </p>
      </RecuadroCaso>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h4 className="font-serif text-lg font-semibold text-slate-900 dark:text-slate-100">
            Elegí un estudiante real al azar
          </h4>
          <button
            type="button"
            onClick={() =>
              setEstudianteId(ESTUDIANTES[entero(0, ESTUDIANTES.length - 1)].id)
            }
            className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            🧑‍🎓 Elegir estudiante
          </button>
        </div>
        <div className="mt-5 flex flex-wrap justify-center gap-1">
          {Array.from({ length: 28 }, (_, v) => v).map((v) => {
            const activo = estudiante?.phq9 === v;
            const zonaPositiva = v >= 10;
            return (
              <div
                key={v}
                className={
                  "grid h-9 w-9 place-items-center rounded-md border text-xs tabular-nums transition sm:h-10 sm:w-10 " +
                  (activo
                    ? "scale-110 border-blue-600 bg-blue-600 font-bold text-white"
                    : zonaPositiva
                      ? "border-slate-300 bg-slate-100 text-slate-500 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-400"
                      : "border-slate-200 text-slate-400 dark:border-slate-800 dark:text-slate-600")
                }
              >
                {v}
              </div>
            );
          })}
        </div>
        <p className="mt-4 text-center text-sm text-slate-600 dark:text-slate-400">
          {estudiante ? (
            <>
              Estudiante #{estudiante.id}: puntaje PHQ-9 ={" "}
              <strong className="tabular-nums">{estudiante.phq9}</strong>
              {estudiante.phq9 >= 10
                ? " — por encima del corte de tamizaje (10)."
                : " — por debajo del corte de tamizaje (10)."}
            </>
          ) : (
            "Elegí un estudiante para ver su puntaje real dentro del espacio muestral."
          )}
        </p>
        <p className="mt-1 text-center text-xs text-slate-400 dark:text-slate-500">
          Fondo gris = zona de tamizaje positivo (≥10). Ese corte lo vamos a
          usar en todos los módulos siguientes.
        </p>
      </div>
    </div>
  );
}
