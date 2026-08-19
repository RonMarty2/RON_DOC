"use client";

import { useState } from "react";
import { tablaConfusion, modeloBayes } from "./calculos";
import { Definicion, Formula, Frac, V, Trampa, Puente, MiniHistoria } from "./narrativa";

/**
 * 2.6 — Teorema de Bayes.
 *
 * Cierra el arco que abrió el preámbulo. La herramienta central es el
 * deslizador de prevalencia: con el MISMO instrumento, el valor predictivo
 * cambia radicalmente según a quién se tamice.
 */
export function ModuloBayes({ onContinuar }: { onContinuar: () => void }) {
  const t = tablaConfusion();
  const sens = t.sensibilidad;
  const esp = t.especificidad;
  const prev = t.prevalencia;

  const pPos = sens * prev + (1 - esp) * (1 - prev);
  const vpp = (sens * prev) / pPos;

  return (
    <div className="flex flex-col gap-6">
      <p className="text-slate-700 dark:text-slate-300">
        En los años setenta, Kahneman y Tversky le plantearon este problema a
        médicos, psicólogos y estadísticos entrenados: una enfermedad afecta al
        1% de la población, un test la detecta con 95% de acierto, una persona
        da positivo. ¿Qué probabilidad tiene de estar enferma? La respuesta
        mayoritaria fue <strong>95%</strong>. La correcta rondaba el{" "}
        <strong>16%</strong>. El error no era de aritmética: al ver el
        resultado del test, las personas se olvidaban de un dato que tenían
        delante — que la enfermedad es rara.
      </p>

      <Definicion termino="Teorema de Bayes">
        La herramienta que <strong>invierte</strong> una probabilidad
        condicional: pasa de <V>P</V>(evidencia | hipótesis), que es lo que
        reporta el instrumento, a <V>P</V>(hipótesis | evidencia), que es lo
        que le importa a la persona evaluada.
      </Definicion>

      <div className="grid gap-4 sm:grid-cols-2">
        <Definicion termino="Probabilidad previa">
          Lo que creíamos <em>antes</em> de ver la evidencia. En diagnóstico es
          la prevalencia: qué tan frecuente es la condición en la población que
          se tamiza.
        </Definicion>
        <Definicion termino="Probabilidad posterior">
          La creencia ya <em>actualizada</em> con la evidencia. En diagnóstico
          es el valor predictivo positivo.
        </Definicion>
      </div>

      <Definicion termino="Probabilidad total">
        El denominador de Bayes casi nunca viene dado: hay que construirlo. La
        evidencia puede aparecer por <strong>dos caminos</strong> — porque la
        hipótesis es cierta, o porque no lo es — y hay que sumar ambos,
        ponderados por sus probabilidades previas.
      </Definicion>

      <ArbolFrecuencias sens={sens} esp={esp} prev={prev} />

      <Formula
        titulo="Paso 1 — Probabilidad total de dar positivo"
        simbolos={
          <>
            <V>P</V>(+) = <V>P</V>(+|<V>D</V>)·<V>P</V>(<V>D</V>) + <V>P</V>(+|
            <V>D</V>
            <sup>c</sup>)·<V>P</V>(<V>D</V>
            <sup>c</sup>)
          </>
        }
        numeros={
          <>
            ({sens.toFixed(3)})({prev.toFixed(3)}) + ({(1 - esp).toFixed(3)})(
            {(1 - prev).toFixed(3)})
            <br />= {(sens * prev).toFixed(3)} +{" "}
            {((1 - esp) * (1 - prev)).toFixed(3)} = {pPos.toFixed(3)}
          </>
        }
        resultado={
          <>
            Mirá de dónde salen los dos sumandos:{" "}
            <strong className="tabular-nums">{(sens * prev).toFixed(3)}</strong>{" "}
            viene de los verdaderos positivos y{" "}
            <strong className="tabular-nums">
              {((1 - esp) * (1 - prev)).toFixed(3)}
            </strong>{" "}
            de los falsos positivos. Son <strong>casi idénticos</strong>. Ahí
            está todo el misterio.
          </>
        }
      />

      <Formula
        titulo="Paso 2 — Teorema de Bayes"
        simbolos={
          <>
            <V>P</V>(<V>D</V>|+) =
            <Frac
              arriba={
                <>
                  <V>P</V>(+|<V>D</V>) · <V>P</V>(<V>D</V>)
                </>
              }
              abajo={
                <>
                  <V>P</V>(+)
                </>
              }
            />
          </>
        }
        numeros={
          <>
            <Frac arriba={(sens * prev).toFixed(3)} abajo={pPos.toFixed(3)} /> ={" "}
            {vpp.toFixed(3)}
          </>
        }
        resultado={
          <>
            <strong className="tabular-nums">{(vpp * 100).toFixed(1)}%</strong>.
            Comprobación contra el archivo: de los {t.positivos} que dieron
            positivo, {t.VP} tenían diagnóstico confirmado — {t.VP}/
            {t.positivos} = {t.vpp.toFixed(3)}. El teorema reproduce
            exactamente el conteo directo.
          </>
        }
      />

      <MiniHistoria titulo="Por qué la mitad de las alarmas son falsas">
        Hay siete veces más gente sana que enferma. Aunque cada persona sana
        tenga apenas un {((1 - esp) * 100).toFixed(0)}% de chance de dar falso
        positivo, en total generan casi tantos positivos como los enfermos
        detectados. La prevalencia no es un dato de contexto:{" "}
        <strong>es la mitad del cálculo</strong>.
      </MiniHistoria>

      <h4 className="mt-2 font-serif text-xl font-semibold text-slate-900 dark:text-slate-100">
        El mismo test, distintas poblaciones
      </h4>
      <p className="text-sm text-slate-700 dark:text-slate-300">
        Mové la prevalencia sin tocar el instrumento — sensibilidad y
        especificidad quedan fijas en 88%. El valor predictivo cambia
        radicalmente.
      </p>

      <DeslizadorPrevalencia sens={sens} esp={esp} />

      <div className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200">
        <strong>La consecuencia práctica:</strong> si el servicio tamiza a toda
        la universidad, trabaja con la prevalencia general y su valor
        predictivo ronda el 51%. Si en cambio tamiza sólo a estudiantes que ya
        consultaron por malestar —una población con prevalencia mucho más
        alta— el mismo cuestionario, sin cambiar una sola pregunta, pasa a
        tener un valor predictivo mucho mayor.{" "}
        <strong>El instrumento no mejora ni empeora: cambia la población.</strong>
      </div>

      <Trampa
        error="la falacia de la tasa base — igualar P(D|+) con P(+|D)"
        porQue="ambas se describen coloquialmente como «la precisión del test», pero condicionan en direcciones opuestas. Y la prevalencia no figura en el manual del instrumento, así que se olvida."
        correccion="calcular siempre el valor predictivo explícitamente, y desconfiar de cualquier interpretación de un resultado positivo que no mencione la prevalencia de la población donde se aplicó."
      />

      <Trampa
        error="omitir la prevalencia porque no viene en el manual"
        porQue="los manuales técnicos reportan sensibilidad y especificidad, que son propiedades del test. La prevalencia es una propiedad de la población y hay que buscarla aparte."
        correccion="sin un valor de prevalencia de la población donde se va a aplicar, el valor predictivo simplemente no se puede calcular — y sin él, un resultado positivo no se puede interpretar."
      />

      <Puente etiquetaBoton="Ir a 2.7 · Variables aleatorias" onContinuar={onContinuar}>
        <p>
          Con esto cerramos el bloque de probabilidad: sabemos definirla,
          calcularla con tablas y conteo, combinarla y actualizarla con
          evidencia. El misterio del inicio quedó resuelto.
        </p>
        <p>
          Pero todo lo que hicimos trabajó con <strong>eventos sueltos</strong>:
          da positivo o no, tiene el diagnóstico o no. El cuestionario, en
          cambio, no devuelve un sí o un no: devuelve un número entre 0 y 27, y
          cada valor tiene su propia probabilidad. Describir eso de una sola vez
          exige una herramienta distinta.
        </p>
      </Puente>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Árbol de frecuencias naturales sobre 1000 personas                  */
/* ------------------------------------------------------------------ */

function ArbolFrecuencias({
  sens,
  esp,
  prev,
}: {
  sens: number;
  esp: number;
  prev: number;
}) {
  const m = modeloBayes(prev, sens, esp, 1000);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <h4 className="font-serif text-lg font-semibold text-slate-900 dark:text-slate-100">
        Los dos caminos hacia un positivo
      </h4>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
        Con 1,000 estudiantes es más fácil de ver que con porcentajes: se
        cuentan personas, no fracciones.
      </p>

      <div className="mt-5 flex flex-col items-center gap-3">
        <div className="rounded-xl border-2 border-slate-300 px-6 py-2.5 text-center dark:border-slate-600">
          <p className="font-serif text-2xl font-semibold tabular-nums text-slate-900 dark:text-slate-100">
            {m.N.toLocaleString("es")}
          </p>
          <p className="text-xs text-slate-500">estudiantes tamizados</p>
        </div>

        <div className="grid w-full gap-3 sm:grid-cols-2">
          <div className="rounded-xl border-2 border-rose-300 bg-rose-50/50 p-4 dark:border-rose-800 dark:bg-rose-950/20">
            <p className="text-xs font-semibold uppercase tracking-wider text-rose-700 dark:text-rose-300">
              Sí tienen el trastorno
            </p>
            <p className="font-serif text-2xl font-semibold tabular-nums text-slate-900 dark:text-slate-100">
              {m.enfermos}
            </p>
            <div className="mt-3 space-y-1.5 text-sm">
              <p className="rounded-lg bg-rose-500 px-3 py-1.5 font-semibold text-white">
                {m.VP} dan positivo <span className="opacity-75">(detectados)</span>
              </p>
              <p className="rounded-lg bg-white px-3 py-1.5 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                {m.FN} dan negativo <span className="opacity-75">(se escapan)</span>
              </p>
            </div>
          </div>

          <div className="rounded-xl border-2 border-slate-300 bg-slate-50/50 p-4 dark:border-slate-700 dark:bg-slate-800/30">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              No lo tienen
            </p>
            <p className="font-serif text-2xl font-semibold tabular-nums text-slate-900 dark:text-slate-100">
              {m.sanos}
            </p>
            <div className="mt-3 space-y-1.5 text-sm">
              <p className="rounded-lg bg-amber-400 px-3 py-1.5 font-semibold text-amber-950">
                {m.FP} dan positivo <span className="opacity-75">(falsas alarmas)</span>
              </p>
              <p className="rounded-lg bg-white px-3 py-1.5 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                {m.VN} dan negativo <span className="opacity-75">(descartados)</span>
              </p>
            </div>
          </div>
        </div>

        <div className="w-full rounded-xl bg-blue-50 px-4 py-3 text-sm text-blue-900 dark:bg-blue-950/30 dark:text-blue-200">
          En total dan positivo{" "}
          <strong className="tabular-nums">{m.positivos}</strong> personas:{" "}
          {m.VP} enfermas y {m.FP} sanas. De ahí sale el valor predictivo:{" "}
          <strong className="tabular-nums">
            {m.VP}/{m.positivos} = {(m.vpp * 100).toFixed(1)}%
          </strong>
          .
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Deslizador de prevalencia                                           */
/* ------------------------------------------------------------------ */

const REFERENCIAS = [
  { prev: 2, texto: "casi seguramente una falsa alarma" },
  { prev: 5, texto: "probablemente una falsa alarma" },
  { prev: 12.5, texto: "una moneda al aire" },
  { prev: 30, texto: "probablemente un caso real" },
  { prev: 50, texto: "casi seguramente un caso real" },
];

function DeslizadorPrevalencia({ sens, esp }: { sens: number; esp: number }) {
  const [prevPct, setPrevPct] = useState(12.5);
  const prev = prevPct / 100;
  const vpp = (sens * prev) / (sens * prev + (1 - esp) * (1 - prev));

  const ref =
    [...REFERENCIAS].sort(
      (a, b) => Math.abs(a.prev - prevPct) - Math.abs(b.prev - prevPct)
    )[0];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <label className="flex flex-wrap items-center gap-4">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Prevalencia en la población tamizada
        </span>
        <span className="font-serif text-xl font-semibold tabular-nums text-blue-700 dark:text-blue-300">
          {prevPct.toFixed(1)}%
        </span>
        <input
          type="range"
          min={1}
          max={60}
          step={0.5}
          value={prevPct}
          onChange={(e) => setPrevPct(Number(e.target.value))}
          className="h-2 w-full cursor-pointer accent-blue-600"
        />
      </label>

      <div className="mt-5 flex flex-wrap items-end gap-6">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Valor predictivo positivo
          </p>
          <p className="font-serif text-4xl font-semibold tabular-nums text-slate-900 dark:text-slate-100 sm:text-5xl">
            {(vpp * 100).toFixed(1)}%
          </p>
        </div>
        <p className="flex-1 text-sm text-slate-600 dark:text-slate-400">
          Un resultado positivo significa:{" "}
          <strong className="text-slate-800 dark:text-slate-200">
            {ref.texto}
          </strong>
          .
        </p>
      </div>

      <div className="mt-4 h-4 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-400 to-emerald-500 transition-[width] duration-200"
          style={{ width: `${vpp * 100}%` }}
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {REFERENCIAS.map((r) => (
          <button
            key={r.prev}
            type="button"
            onClick={() => setPrevPct(r.prev)}
            className={
              "rounded-full border px-3 py-1.5 text-xs font-medium transition " +
              (Math.abs(prevPct - r.prev) < 0.3
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-slate-200 text-slate-600 hover:border-blue-300 dark:border-slate-700 dark:text-slate-400")
            }
          >
            {r.prev}%
          </button>
        ))}
      </div>
      <p className="mt-3 text-xs text-slate-500 dark:text-slate-500">
        Sensibilidad y especificidad quedan fijas en{" "}
        {(sens * 100).toFixed(0)}% — el instrumento es exactamente el mismo en
        todos los casos.
      </p>
    </div>
  );
}
