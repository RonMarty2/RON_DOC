"use client";

import { useMemo, useState } from "react";
import { binomial, proporcion, phq9Positivo } from "./calculos";
import { Definicion, Formula, V, Trampa, Puente, MiniHistoria } from "./narrativa";

/**
 * 2.7 — Variable aleatoria y distribución de probabilidad.
 *
 * El salto de eventos sueltos a variables completas. El interactivo arma la
 * distribución término por término y muestra que la esperanza casi nunca es
 * un valor observable.
 */
export function ModuloVariablesAleatorias({
  onContinuar,
}: {
  onContinuar: () => void;
}) {
  const p = proporcion(phq9Positivo);

  return (
    <div className="flex flex-col gap-6">
      <p className="text-slate-700 dark:text-slate-300">
        Hasta acá preguntamos por eventos: ¿da positivo o no? Dos opciones, una
        probabilidad para cada una. Pero el cuestionario no devuelve un sí o un
        no: devuelve un número entre 0 y 27, y cada uno de esos 28 valores tiene
        su propia probabilidad. Calcularlas una por una sería absurdo.
        Necesitamos describir el comportamiento completo de la variable{" "}
        <strong>de una sola vez</strong>.
      </p>

      <Definicion termino="Variable aleatoria">
        Una función que asigna un número a cada resultado de un experimento
        aleatorio. Se escribe con mayúscula (<V>X</V>) y sus valores posibles
        con minúscula (<V>x</V>).
      </Definicion>

      <div className="grid gap-4 sm:grid-cols-2">
        <Definicion termino="Discreta">
          Toma un número contable de valores, normalmente enteros. El puntaje
          del cuestionario (28 valores) o la cantidad de positivos en un grupo.
        </Definicion>
        <Definicion termino="Continua">
          Puede tomar cualquier valor dentro de un intervalo. Un tiempo de
          reacción en milisegundos, o la altura de una persona.
        </Definicion>
      </div>

      <MiniHistoria titulo="La distinción no es cuántos valores hay">
        Es si se pueden contar uno por uno. El cuestionario tiene 28 valores y
        es discreto; un intervalo de tiempo tiene infinitos y es continuo,
        aunque el instrumento lo redondee a milisegundos.
      </MiniHistoria>

      <Definicion termino="Distribución de probabilidad">
        La función que asigna una probabilidad a cada valor posible de la
        variable. En variables discretas se llama <strong>función de masa</strong>{" "}
        y debe cumplir dos condiciones: ninguna probabilidad negativa, y que
        todas juntas sumen exactamente 1.
      </Definicion>

      <ConstructorDistribucion p={p} />

      <div className="grid gap-4 sm:grid-cols-2">
        <Definicion termino="Esperanza matemática E[X]">
          El promedio de los valores posibles, ponderado por sus
          probabilidades. Es el centro de la distribución.
        </Definicion>
        <Definicion termino="Varianza Var(X)">
          Cuánto se dispersan los valores alrededor de la esperanza. Cada
          desvío al cuadrado, ponderado por su probabilidad.
        </Definicion>
      </div>

      <TablaEsperanza p={p} />

      <Trampa
        error="esperar que la esperanza sea un valor observable"
        porQue="el nombre sugiere «lo que se espera ver», y rechazamos por imposible un resultado como 0.43 estudiantes."
        correccion="la esperanza es un promedio ponderado de largo plazo, no una predicción de un caso individual. Es el mismo tipo de abstracción que «2.3 hijos por familia»."
      />

      <Trampa
        error="leer P(X = x) = 0 en una variable continua como imposibilidad"
        porQue="en variables discretas, probabilidad cero sí significa que el evento no puede ocurrir."
        correccion="en variables continuas sólo los intervalos tienen probabilidad no nula; el valor exacto siempre da cero. Toda pregunta sobre una variable continua se formula sobre un rango."
      />

      <Puente etiquetaBoton="Ir a 2.8 · Distribuciones discretas" onContinuar={onContinuar}>
        <p>
          Calcular la función de masa a mano, valor por valor, funcionó con dos
          estudiantes. Con cien sería inviable.
        </p>
        <p>
          Por suerte no hace falta: ciertos procesos generan siempre el mismo
          tipo de distribución, y para cada uno existe una fórmula cerrada. El
          servicio necesita tres de ellas.
        </p>
      </Puente>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Construir la distribución y comprobar que suma 1                    */
/* ------------------------------------------------------------------ */

function ConstructorDistribucion({ p }: { p: number }) {
  const [n, setN] = useState(2);

  const valores = useMemo(
    () =>
      Array.from({ length: n + 1 }, (_, k) => ({
        k,
        prob: binomial(n, k, p),
      })),
    [n, p]
  );

  const suma = valores.reduce((s, v) => s + v.prob, 0);
  const esperanza = valores.reduce((s, v) => s + v.k * v.prob, 0);
  const maxProb = Math.max(...valores.map((v) => v.prob));

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <h4 className="font-serif text-lg font-semibold text-slate-900 dark:text-slate-100">
        La distribución completa, de una sola vez
      </h4>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
        Definimos <V>X</V> = cantidad de estudiantes que dan positivo al
        seleccionar <V>n</V> al azar. Cada barra es un valor posible con su
        probabilidad.
      </p>

      <label className="mt-4 flex flex-wrap items-center gap-3 text-sm">
        <span className="font-mono text-slate-600 dark:text-slate-400">
          n = {n} estudiantes
        </span>
        <input
          type="range"
          min={1}
          max={12}
          value={n}
          onChange={(e) => setN(Number(e.target.value))}
          className="h-2 flex-1 cursor-pointer accent-blue-600"
        />
      </label>

      <div className="mt-5 flex items-end justify-center gap-1.5" style={{ height: 160 }}>
        {valores.map((v) => (
          <div key={v.k} className="flex flex-1 flex-col items-center justify-end gap-1">
            <span className="text-[10px] tabular-nums text-slate-500 dark:text-slate-400">
              {(v.prob * 100).toFixed(1)}
            </span>
            <div
              className="w-full rounded-t bg-blue-500 transition-all"
              style={{ height: `${Math.max(2, (v.prob / maxProb) * 110)}px` }}
              title={`P(X = ${v.k}) = ${v.prob.toFixed(4)}`}
            />
            <span className="text-xs font-semibold tabular-nums text-slate-700 dark:text-slate-300">
              {v.k}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-1 text-center text-xs text-slate-400">
        valores posibles de X (cantidad de positivos)
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-emerald-50 px-4 py-3 text-sm dark:bg-emerald-950/30">
          <p className="font-semibold text-emerald-900 dark:text-emerald-200">
            Suma de todas = {suma.toFixed(4)}
          </p>
          <p className="mt-1 text-emerald-800/80 dark:text-emerald-200/80">
            Cumple la condición de la definición. Si no diera 1, faltaría algún
            valor del espacio muestral.
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 px-4 py-3 text-sm dark:bg-slate-800/60">
          <p className="font-semibold text-slate-800 dark:text-slate-200">
            E[X] = {esperanza.toFixed(4)}
          </p>
          <p className="mt-1 text-slate-600 dark:text-slate-400">
            {Number.isInteger(esperanza)
              ? "En este caso da un entero, pero eso es coincidencia."
              : "No es un valor que la variable pueda tomar: nunca vas a observar una fracción de estudiante."}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Esperanza y varianza, término por término                           */
/* ------------------------------------------------------------------ */

function TablaEsperanza({ p }: { p: number }) {
  const n = 2;
  const filas = Array.from({ length: n + 1 }, (_, k) => {
    const prob = binomial(n, k, p);
    return { k, prob, aporteE: k * prob };
  });
  const esperanza = filas.reduce((s, f) => s + f.aporteE, 0);
  const filasVar = filas.map((f) => ({
    ...f,
    desvio: (f.k - esperanza) ** 2,
    aporteVar: (f.k - esperanza) ** 2 * f.prob,
  }));
  const varianza = filasVar.reduce((s, f) => s + f.aporteVar, 0);

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <h4 className="font-serif text-lg font-semibold text-slate-900 dark:text-slate-100">
          Término por término, con n = 2
        </h4>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left dark:border-slate-700">
                <th className="py-2 pr-4 font-semibold text-slate-700 dark:text-slate-300">x</th>
                <th className="py-2 pr-4 font-semibold text-slate-700 dark:text-slate-300">P(X = x)</th>
                <th className="py-2 pr-4 font-semibold text-slate-700 dark:text-slate-300">x · P(X = x)</th>
                <th className="py-2 font-semibold text-slate-700 dark:text-slate-300">(x − µ)² · P(X = x)</th>
              </tr>
            </thead>
            <tbody className="tabular-nums text-slate-600 dark:text-slate-400">
              {filasVar.map((f) => (
                <tr key={f.k} className="border-b border-slate-100 dark:border-slate-800">
                  <td className="py-2 pr-4 font-semibold text-slate-800 dark:text-slate-200">{f.k}</td>
                  <td className="py-2 pr-4">{f.prob.toFixed(4)}</td>
                  <td className="py-2 pr-4">{f.aporteE.toFixed(4)}</td>
                  <td className="py-2">{f.aporteVar.toFixed(4)}</td>
                </tr>
              ))}
              <tr className="font-semibold text-slate-900 dark:text-slate-100">
                <td className="py-2 pr-4">Σ</td>
                <td className="py-2 pr-4">{filas.reduce((s, f) => s + f.prob, 0).toFixed(4)}</td>
                <td className="py-2 pr-4">{esperanza.toFixed(4)}</td>
                <td className="py-2">{varianza.toFixed(4)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <Formula
        titulo="Esperanza matemática"
        simbolos={
          <>
            <V>E</V>[<V>X</V>] = µ = Σ <V>x</V> · <V>P</V>(<V>X</V> = <V>x</V>)
          </>
        }
        numeros={
          <>
            (0)({filas[0].prob.toFixed(4)}) + (1)({filas[1].prob.toFixed(4)}) +
            (2)({filas[2].prob.toFixed(4)}) = {esperanza.toFixed(4)}
          </>
        }
        resultado={
          <>
            Al evaluar dos estudiantes al azar se esperan, en promedio,{" "}
            <strong className="tabular-nums">{esperanza.toFixed(2)}</strong>{" "}
            positivos. Guardá este número: en el apartado siguiente vamos a
            comprobar que coincide exactamente con <V>n</V>·<V>p</V>, la fórmula
            rápida de la binomial.
          </>
        }
      />

      <Formula
        titulo="Varianza"
        simbolos={
          <>
            Var(<V>X</V>) = σ² = Σ (<V>x</V> − µ)² · <V>P</V>(<V>X</V> = <V>x</V>)
          </>
        }
        numeros={<>{filasVar.map((f) => f.aporteVar.toFixed(4)).join(" + ")} = {varianza.toFixed(4)}</>}
        resultado={
          <>
            Y este también va a coincidir con la fórmula rápida{" "}
            <V>n</V>·<V>p</V>·(1 − <V>p</V>) del apartado siguiente.
          </>
        }
      />
    </div>
  );
}
