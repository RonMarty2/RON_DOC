"use client";

import { useEffect, useRef, useState } from "react";
import { ESTUDIANTES } from "@content/aula-probabilidad/dataset";
import { contar, phq9Positivo } from "./calculos";
import { entero } from "./aleatorio";
import { Definicion, Formula, Frac, V, Trampa, Puente, MiniHistoria } from "./narrativa";
import { BarraSim } from "./BarraSim";

/**
 * 2.2 — Definición e importancia de la probabilidad.
 *
 * Las tres formas legítimas de asignar una probabilidad, los tres axiomas de
 * Kolmogórov que les dan un piso común, y la regla del complemento.
 */
export function ModuloTiposProbabilidad({
  onContinuar,
}: {
  onContinuar: () => void;
}) {
  const total = ESTUDIANTES.length;
  const positivos = contar(phq9Positivo);
  const p = positivos / total;

  return (
    <div className="flex flex-col gap-6">
      <p className="text-slate-700 dark:text-slate-300">
        Ya sabemos qué es un espacio muestral y qué es un evento. Falta lo
        principal: <strong>de dónde sale el número</strong> que llamamos
        probabilidad. Hay tres formas legítimas de conseguirlo, y no compiten
        entre sí — cada una resuelve el problema cuando las otras no pueden.
      </p>

      <Definicion termino="Probabilidad clásica (a priori)">
        Cuando todos los resultados posibles son igualmente probables, la
        probabilidad se calcula antes de observar nada: casos favorables sobre
        casos posibles. Es la del dado y la de la moneda.
      </Definicion>

      <Definicion termino="Probabilidad frecuentista (empírica)">
        Cuando no hay razón para suponer que todos los resultados son iguales,
        se observa muchas veces y se toma la frecuencia relativa. Es la que
        usamos con las 200 fichas.
      </Definicion>

      <Definicion termino="Probabilidad subjetiva">
        Cuando no hay simetría ni datos suficientes, un experto asigna un
        número a partir de su criterio y de la literatura. Es la sospecha
        clínica antes de aplicar cualquier test.
      </Definicion>

      <MonedaConvergente />

      <MiniHistoria titulo="Las dos primeras terminan coincidiendo">
        Si el experimento es simétrico, la frecuencia observada se acerca a la
        probabilidad clásica a medida que aumentan las repeticiones. Eso es lo
        que acabás de ver con la moneda: la línea teórica no se movió nunca, y
        la barra fue hacia ella sola.
      </MiniHistoria>

      <h4 className="mt-2 font-serif text-xl font-semibold text-slate-900 dark:text-slate-100">
        Aplicado: la probabilidad de dar positivo
      </h4>
      <p className="text-sm text-slate-700 dark:text-slate-300">
        Acá no hay simetría: nada garantiza que dar positivo y dar negativo
        sean igual de probables. Así que la calculamos por frecuencia, contando
        el archivo.
      </p>

      <Formula
        titulo="Probabilidad de un evento por frecuencia relativa"
        simbolos={
          <>
            <V>P</V>(<V>A</V>) =
            <Frac
              arriba={<>casos favorables</>}
              abajo={<>casos posibles</>}
            />
          </>
        }
        numeros={
          <>
            <V>P</V>(positivo) =
            <Frac arriba={positivos} abajo={total} />= {p.toFixed(3)}
          </>
        }
        resultado={
          <>
            El <strong className="tabular-nums">{(p * 100).toFixed(1)}%</strong>{" "}
            de los estudiantes tamizados da positivo. Es una probabilidad
            frecuentista: salió de contar, no de suponer.
          </>
        }
        nota={
          <>
            {positivos} es la cantidad de fichas con puntaje ≥ 10; {total} es
            el total de fichas del archivo.
          </>
        }
      />

      <Axiomas p={p} />

      <Formula
        titulo="Regla del complemento"
        simbolos={
          <>
            <V>P</V>(<V>A</V>
            <sup>c</sup>) = 1 − <V>P</V>(<V>A</V>)
          </>
        }
        numeros={
          <>
            <V>P</V>(negativo) = 1 − {p.toFixed(3)} = {(1 - p).toFixed(3)}
          </>
        }
        resultado={
          <>
            Sale directo del Axioma 3: un evento y su complemento son
            mutuamente excluyentes y juntos cubren todo <V>S</V>, así que sus
            probabilidades deben sumar 1. Sirve cada vez que contar lo
            contrario es más fácil que contar lo directo.
          </>
        }
      />

      <Trampa
        error="tratar la probabilidad clásica como si valiera siempre"
        porQue="es la primera que se enseña y su fórmula es la más simple, así que se aplica por reflejo — incluso cuando los resultados no son equiprobables."
        correccion="antes de dividir favorables sobre posibles, preguntarse si hay alguna razón para que todos los resultados tengan la misma chance. Con personas y diagnósticos, casi nunca la hay: ahí corresponde contar."
      />

      <Puente
        etiquetaBoton="Ir a 2.3 · Tablas de contingencia"
        onContinuar={onContinuar}
      >
        <p>
          Ya podemos calcular la probabilidad de un evento suelto: dar
          positivo, dar negativo. Pero el misterio del inicio no se trataba de
          un evento, sino del cruce de dos: lo que dijo el test y lo que era
          verdad.
        </p>
        <p>
          Para ver los dos a la vez hace falta cruzarlos en una tabla. Y de esa
          tabla van a salir, por fin, los tres números que todo el mundo
          confunde.
        </p>
      </Puente>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Moneda: la frecuentista converge a la clásica                       */
/* ------------------------------------------------------------------ */

function MonedaConvergente() {
  const [caras, setCaras] = useState(0);
  const [tiradas, setTiradas] = useState(0);
  const [ultima, setUltima] = useState<"cara" | "sello" | null>(null);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (animRef.current !== null) cancelAnimationFrame(animRef.current);
    };
  }, []);

  function tirar(n: number) {
    let c = 0;
    let ultimaTirada: "cara" | "sello" = "cara";
    for (let i = 0; i < n; i++) {
      const esCara = entero(0, 1) === 0;
      if (esCara) c++;
      ultimaTirada = esCara ? "cara" : "sello";
    }
    setCaras((x) => x + c);
    setTiradas((x) => x + n);
    setUltima(ultimaTirada);
  }

  function reset() {
    setCaras(0);
    setTiradas(0);
    setUltima(null);
  }

  const pct = tiradas > 0 ? (caras / tiradas) * 100 : 0;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h4 className="font-serif text-lg font-semibold text-slate-900 dark:text-slate-100">
          Clásica contra frecuentista, en la misma moneda
        </h4>
        <div className="flex flex-wrap gap-2">
          {[1, 10, 100, 1000].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => tirar(n)}
              className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300"
            >
              Tirar {n.toLocaleString("es")}
            </button>
          ))}
          <button
            type="button"
            onClick={reset}
            className="rounded-full border border-slate-200 px-3 py-1.5 text-sm text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Reiniciar
          </button>
        </div>
      </div>

      <div className="mt-5 flex justify-center">
        <div className="grid h-16 w-16 place-items-center rounded-full border-2 border-amber-500 bg-amber-50 text-2xl font-semibold text-amber-700 dark:bg-amber-950/30 dark:text-amber-300">
          {ultima === null ? "?" : ultima === "cara" ? "C" : "S"}
        </div>
      </div>

      <div className="mt-5">
        <BarraSim
          etiqueta="Frecuencia observada de cara"
          porcentaje={pct}
          esperadoPct={50}
          color="azul"
        />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-slate-50 px-4 py-3 text-sm dark:bg-slate-800/60">
          <p className="font-semibold text-slate-800 dark:text-slate-200">
            Clásica: 50%
          </p>
          <p className="mt-1 text-slate-600 dark:text-slate-400">
            Dos resultados, ninguna razón para preferir uno. 1/2, sin tirar la
            moneda ni una vez.
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 px-4 py-3 text-sm dark:bg-slate-800/60">
          <p className="font-semibold text-slate-800 dark:text-slate-200">
            Frecuentista:{" "}
            <span className="tabular-nums">
              {tiradas > 0 ? `${pct.toFixed(1)}%` : "—"}
            </span>
          </p>
          <p className="mt-1 text-slate-600 dark:text-slate-400">
            {tiradas === 0
              ? "Todavía sin datos. Tirá la moneda para empezar a estimarla."
              : `${caras} caras en ${tiradas.toLocaleString("es")} tiradas. Sólo existe porque observamos.`}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Los tres axiomas, verificados con nuestro propio número             */
/* ------------------------------------------------------------------ */

function Axiomas({ p }: { p: number }) {
  const [abierto, setAbierto] = useState<number | null>(null);

  const AXIOMAS = [
    {
      n: 1,
      nombre: "No negatividad",
      simbolo: "P(A) ≥ 0",
      texto: "Ninguna probabilidad puede ser negativa. No existe el «menos 10% de riesgo».",
      chequeo: `${p.toFixed(3)} ≥ 0 ✓`,
    },
    {
      n: 2,
      nombre: "Normalización",
      simbolo: "P(S) = 1",
      texto:
        "El espacio muestral completo tiene probabilidad 1: algo tiene que ocurrir. Es el evento seguro de 2.1.",
      chequeo: `${p.toFixed(3)} + ${(1 - p).toFixed(3)} = 1.000 ✓`,
    },
    {
      n: 3,
      nombre: "Aditividad",
      simbolo: "P(A ∪ B) = P(A) + P(B)",
      texto:
        "Si dos eventos no pueden ocurrir a la vez, sus probabilidades se suman sin más. Ojo: sólo si son mutuamente excluyentes.",
      chequeo: "dar positivo y dar negativo no pueden coexistir ✓",
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <h4 className="font-serif text-lg font-semibold text-slate-900 dark:text-slate-100">
        Los tres axiomas de Kolmogórov (1933)
      </h4>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
        Las tres formas de arriba dan números distintos, pero todas tienen que
        respetar las mismas tres reglas. Tocá cada una para verla comprobada
        con nuestro propio dato.
      </p>
      <div className="mt-4 flex flex-col gap-2">
        {AXIOMAS.map((a) => (
          <button
            key={a.n}
            type="button"
            onClick={() => setAbierto(abierto === a.n ? null : a.n)}
            className="rounded-xl border border-slate-200 px-4 py-3 text-left transition hover:border-blue-300 dark:border-slate-700 dark:hover:border-blue-700"
          >
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Axioma {a.n} · {a.nombre}
              </span>
              <span className="font-mono text-sm text-blue-700 dark:text-blue-300">
                {a.simbolo}
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {a.texto}
            </p>
            {abierto === a.n && (
              <p className="mt-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-900 tabular-nums dark:bg-emerald-950/30 dark:text-emerald-200">
                Con nuestros datos: {a.chequeo}
              </p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
