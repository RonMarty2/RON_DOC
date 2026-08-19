"use client";

import { useMemo, useState } from "react";
import { DEMANDA_SEMANAL } from "@content/aula-probabilidad/dataset";
import {
  binomial,
  poisson,
  hipergeometrica,
  combinaciones,
  contar,
  phq9Positivo,
  expedientesIncompletosEnPositivos,
  tasaDemandaSemanal,
} from "./calculos";
import { Definicion, Formula, Frac, V, Trampa, Puente } from "./narrativa";

type Tipo = "binomial" | "poisson" | "hipergeometrica";

/**
 * 2.8 — Las tres distribuciones discretas.
 *
 * Lo que decide cuál usar no es cuántos valores toma la variable, sino cómo
 * se generaron los conteos. El selector de arriba hace esa pregunta explícita
 * antes de mostrar cualquier fórmula.
 */
export function ModuloDiscretas({ onContinuar }: { onContinuar: () => void }) {
  const [tipo, setTipo] = useState<Tipo>("binomial");

  const positivos = contar(phq9Positivo);
  const incompletos = expedientesIncompletosEnPositivos();
  const lambda = Math.round(tasaDemandaSemanal());

  return (
    <div className="flex flex-col gap-6">
      <p className="text-slate-700 dark:text-slate-300">
        El servicio tiene tres preguntas de planificación y las tres se
        responden contando — pero no con la misma herramienta. Tres preguntas,
        tres procesos generadores distintos, tres distribuciones distintas.
        Confundirlas produce números equivocados que parecen razonables.
      </p>

      <Definicion termino="Ensayo de Bernoulli">
        Un experimento con exactamente dos resultados, llamados éxito y
        fracaso. <strong>Éxito no significa nada bueno</strong>: es sólo la
        etiqueta del resultado que se está contando. Acá, el éxito es dar
        positivo.
      </Definicion>

      <Selector tipo={tipo} setTipo={setTipo} />

      {tipo === "binomial" && <Binomial />}
      {tipo === "poisson" && <Poisson lambda={lambda} />}
      {tipo === "hipergeometrica" && (
        <Hipergeometrica N={positivos} K={incompletos} />
      )}

      <Trampa
        error="usar binomial donde corresponde hipergeométrica"
        porQue="la binomial se enseña primero y su fórmula es más simple; además casi nunca se pregunta si hay reposición."
        correccion={`preguntar si hay reposición y comparar el tamaño de la muestra con el de la población. Auditar 6 expedientes de ${positivos} es una fracción apreciable: cada uno que sacás cambia lo que queda.`}
      />

      <Trampa
        error="buscar un «n» en un problema de Poisson"
        porQue="es el reflejo de identificar n y p en todo problema de conteo."
        correccion="si el enunciado da una tasa media por intervalo de tiempo o espacio, y no un número de ensayos, es Poisson. La señal es que no existe un n natural en el enunciado."
      />

      <Puente etiquetaBoton="Ir a 2.9 · Distribución normal" onContinuar={onContinuar}>
        <p>
          Las tres distribuciones anteriores describen <strong>conteos</strong>:
          número de positivos, de solicitudes, de expedientes. Todas discretas.
        </p>
        <p>
          Pero la decisión que atraviesa todo el capítulo —dónde poner el punto
          de corte— exige poder preguntar qué proporción de estudiantes queda
          por encima de un valor. Para eso hace falta la distribución continua
          más importante de la psicometría.
        </p>
      </Puente>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* El selector: la pregunta que elige la distribución                  */
/* ------------------------------------------------------------------ */

const OPCIONES: { id: Tipo; pregunta: string; señal: string; nombre: string }[] = [
  {
    id: "binomial",
    pregunta: "¿Hay un número FIJO de ensayos, cada uno éxito o fracaso, con p constante?",
    señal: "El enunciado dice cuántos intentos hay.",
    nombre: "Binomial",
  },
  {
    id: "poisson",
    pregunta: "¿Se cuentan eventos en un intervalo de tiempo o espacio, a una tasa media?",
    señal: "No existe un n natural: hay un ritmo, no intentos.",
    nombre: "Poisson",
  },
  {
    id: "hipergeometrica",
    pregunta: "¿Se extrae SIN reposición de una población finita conocida?",
    señal: "N y K están dados explícitamente.",
    nombre: "Hipergeométrica",
  },
];

function Selector({ tipo, setTipo }: { tipo: Tipo; setTipo: (t: Tipo) => void }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <h4 className="font-serif text-lg font-semibold text-slate-900 dark:text-slate-100">
        Antes de la fórmula: ¿cómo se generaron los conteos?
      </h4>
      <div className="mt-4 flex flex-col gap-2">
        {OPCIONES.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => setTipo(o.id)}
            aria-pressed={tipo === o.id}
            className={
              "rounded-xl border-2 px-4 py-3 text-left transition " +
              (tipo === o.id
                ? "border-blue-600 bg-blue-50 dark:bg-blue-950/40"
                : "border-slate-200 hover:border-blue-300 dark:border-slate-700")
            }
          >
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
              {o.pregunta}
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Señal: {o.señal} →{" "}
              <span className="font-semibold text-blue-700 dark:text-blue-300">
                {o.nombre}
              </span>
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Gráfico de barras genérico para una distribución discreta           */
/* ------------------------------------------------------------------ */

function Barras({
  valores,
  destacado,
  etiquetaX,
}: {
  valores: { k: number; prob: number }[];
  destacado: number;
  etiquetaX: string;
}) {
  const max = Math.max(...valores.map((v) => v.prob), 1e-9);
  return (
    <div>
      <div className="flex items-end justify-center gap-1" style={{ height: 150 }}>
        {valores.map((v) => (
          <div key={v.k} className="flex flex-1 flex-col items-center justify-end gap-1">
            <div
              className={
                "w-full rounded-t transition-all " +
                (v.k === destacado ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-700")
              }
              style={{ height: `${Math.max(2, (v.prob / max) * 110)}px` }}
              title={`P(X = ${v.k}) = ${v.prob.toFixed(4)}`}
            />
            <span
              className={
                "text-[10px] tabular-nums " +
                (v.k === destacado
                  ? "font-bold text-blue-700 dark:text-blue-300"
                  : "text-slate-400")
              }
            >
              {v.k}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-1 text-center text-xs text-slate-400">{etiquetaX}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Binomial                                                            */
/* ------------------------------------------------------------------ */

function Binomial() {
  const [n, setN] = useState(20);
  const [k, setK] = useState(5);
  const p = 0.215;

  const valores = useMemo(
    () => Array.from({ length: n + 1 }, (_, i) => ({ k: i, prob: binomial(n, i, p) })),
    [n]
  );
  const prob = binomial(n, k, p);
  const esperanza = n * p;
  const varianza = n * p * (1 - p);

  return (
    <div className="flex flex-col gap-4">
      <Definicion termino="Distribución binomial">
        Modela la cantidad de éxitos en <V>n</V> ensayos independientes, todos
        con la misma probabilidad <V>p</V>. Condiciones: número de ensayos
        fijo, resultados dicotómicos, <V>p</V> constante y ensayos
        independientes.
      </Definicion>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <p className="text-sm text-slate-700 dark:text-slate-300">
          <strong>El caso:</strong> se tamiza un curso de <V>n</V> estudiantes.
          La probabilidad de dar positivo es <V>p</V> = {p}. ¿Cuál es la
          probabilidad de que exactamente <V>k</V> den positivo?
        </p>
        <div className="mt-4 flex flex-col gap-3">
          <label className="flex items-center gap-3 text-sm">
            <span className="w-28 shrink-0 font-mono text-slate-600 dark:text-slate-400">
              n = {n}
            </span>
            <input type="range" min={1} max={40} value={n}
              onChange={(e) => { const v = Number(e.target.value); setN(v); if (k > v) setK(v); }}
              className="h-2 flex-1 cursor-pointer accent-blue-600" />
          </label>
          <label className="flex items-center gap-3 text-sm">
            <span className="w-28 shrink-0 font-mono text-slate-600 dark:text-slate-400">
              k = {k}
            </span>
            <input type="range" min={0} max={n} value={k}
              onChange={(e) => setK(Number(e.target.value))}
              className="h-2 flex-1 cursor-pointer accent-blue-600" />
          </label>
        </div>
        <div className="mt-5">
          <Barras valores={valores} destacado={k} etiquetaX="cantidad de positivos" />
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-3 text-sm">
          <div className="rounded-xl bg-blue-50 px-3 py-2 dark:bg-blue-950/30">
            <p className="text-[10px] uppercase tracking-wider text-blue-600 dark:text-blue-400">P(X = {k})</p>
            <p className="font-serif text-xl font-semibold tabular-nums text-slate-900 dark:text-slate-100">
              {(prob * 100).toFixed(2)}%
            </p>
          </div>
          <div className="rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-800/60">
            <p className="text-[10px] uppercase tracking-wider text-slate-500">E[X] = np</p>
            <p className="font-serif text-xl font-semibold tabular-nums text-slate-900 dark:text-slate-100">
              {esperanza.toFixed(2)}
            </p>
          </div>
          <div className="rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-800/60">
            <p className="text-[10px] uppercase tracking-wider text-slate-500">Var = np(1−p)</p>
            <p className="font-serif text-xl font-semibold tabular-nums text-slate-900 dark:text-slate-100">
              {varianza.toFixed(4)}
            </p>
          </div>
        </div>
      </div>

      <Formula
        titulo="Binomial"
        simbolos={
          <>
            <V>P</V>(<V>X</V> = <V>k</V>) = <V>C</V>(<V>n</V>,<V>k</V>) ·{" "}
            <V>p</V><sup><V>k</V></sup> · (1 − <V>p</V>)<sup><V>n</V>−<V>k</V></sup>
          </>
        }
        numeros={
          <>
            {combinaciones(n, k).toLocaleString("es")} × {p}
            <sup>{k}</sup> × {(1 - p).toFixed(3)}
            <sup>{n - k}</sup> = {prob.toFixed(4)}
          </>
        }
        resultado={
          <>
            Con n = 20 y k = 5 da <strong>18.87%</strong>. Y fijate: con n = 2
            las fórmulas rápidas dan E[X] = 0.43 y Var = 0.3376 — exactamente
            los valores que calculamos término por término en 2.7.
          </>
        }
        nota={<>C({n},{k}) es la combinación del apartado 2.4: cuenta de cuántas formas pueden ubicarse esos {k} éxitos entre los {n} ensayos.</>}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Poisson                                                             */
/* ------------------------------------------------------------------ */

function Poisson({ lambda }: { lambda: number }) {
  const [k, setK] = useState(8);
  const capacidad = 8;

  const valores = useMemo(
    () => Array.from({ length: 16 }, (_, i) => ({ k: i, prob: poisson(i, lambda) })),
    [lambda]
  );
  const prob = poisson(k, lambda);
  const pExceso = valores
    .filter((v) => v.k > capacidad)
    .reduce((s, v) => s + v.prob, 0);
  const total = DEMANDA_SEMANAL.reduce((s, x) => s + x, 0);

  return (
    <div className="flex flex-col gap-4">
      <Definicion termino="Distribución de Poisson">
        Modela la cantidad de eventos que ocurren en un intervalo fijo de
        tiempo o espacio, cuando aparecen de forma independiente a una tasa
        media constante <V>λ</V>. Su rasgo exclusivo: la esperanza y la
        varianza son <strong>iguales</strong>, ambas <V>λ</V>.
      </Definicion>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <p className="text-sm text-slate-700 dark:text-slate-300">
          <strong>El caso:</strong> el servicio registró las solicitudes de{" "}
          {DEMANDA_SEMANAL.length} semanas consecutivas. Suman {total}, o sea{" "}
          {total}/{DEMANDA_SEMANAL.length} ={" "}
          {(total / DEMANDA_SEMANAL.length).toFixed(2)} ≈ <V>λ</V> = {lambda}{" "}
          solicitudes por semana. Puede atender hasta {capacidad} sin generar
          lista de espera.
        </p>

        {/* Las semanas observadas */}
        <div className="mt-4 flex items-end justify-center gap-1" style={{ height: 70 }}>
          {DEMANDA_SEMANAL.map((v, i) => (
            <div
              key={i}
              className={"w-full flex-1 rounded-t " + (v > capacidad ? "bg-rose-500" : "bg-slate-300 dark:bg-slate-700")}
              style={{ height: `${(v / Math.max(...DEMANDA_SEMANAL)) * 60}px` }}
              title={`Semana ${i + 1}: ${v} solicitudes`}
            />
          ))}
        </div>
        <p className="mt-1 text-center text-xs text-slate-400">
          las {DEMANDA_SEMANAL.length} semanas observadas (rojo = superó la capacidad)
        </p>

        <label className="mt-5 flex items-center gap-3 text-sm">
          <span className="w-32 shrink-0 font-mono text-slate-600 dark:text-slate-400">
            k = {k} solicitudes
          </span>
          <input type="range" min={0} max={15} value={k}
            onChange={(e) => setK(Number(e.target.value))}
            className="h-2 flex-1 cursor-pointer accent-blue-600" />
        </label>

        <div className="mt-4">
          <Barras valores={valores} destacado={k} etiquetaX="solicitudes en una semana" />
        </div>

        <div className="mt-3 grid gap-2 sm:grid-cols-2 text-sm">
          <div className="rounded-xl bg-blue-50 px-3 py-2 dark:bg-blue-950/30">
            <p className="text-[10px] uppercase tracking-wider text-blue-600 dark:text-blue-400">P(X = {k})</p>
            <p className="font-serif text-xl font-semibold tabular-nums text-slate-900 dark:text-slate-100">
              {(prob * 100).toFixed(2)}%
            </p>
          </div>
          <div className="rounded-xl bg-amber-50 px-3 py-2 dark:bg-amber-950/30">
            <p className="text-[10px] uppercase tracking-wider text-amber-700 dark:text-amber-400">
              P(superar la capacidad de {capacidad})
            </p>
            <p className="font-serif text-xl font-semibold tabular-nums text-slate-900 dark:text-slate-100">
              {(pExceso * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      <Formula
        titulo="Poisson"
        simbolos={
          <>
            <V>P</V>(<V>X</V> = <V>k</V>) =
            <Frac
              arriba={<><V>e</V><sup>−λ</sup> λ<sup><V>k</V></sup></>}
              abajo={<><V>k</V>!</>}
            />
          </>
        }
        numeros={
          <>
            <Frac
              arriba={<>{Math.exp(-lambda).toFixed(8)} × {lambda}<sup>{k}</sup></>}
              abajo={<>{k}!</>}
            />
            = {prob.toFixed(4)}
          </>
        }
        resultado={
          <>
            Con λ = {lambda} y k = 8 da <strong>6.53%</strong>. Pero lo que
            realmente le importa al servicio no es esa probabilidad exacta,
            sino la de <em>superar</em> su capacidad:{" "}
            <strong className="tabular-nums">{(pExceso * 100).toFixed(1)}%</strong>{" "}
            de las semanas va a generar lista de espera. Como en Poisson la
            varianza es igual al promedio, dotar de personal según el promedio
            subestima sistemáticamente las semanas pico.
          </>
        }
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hipergeométrica                                                     */
/* ------------------------------------------------------------------ */

function Hipergeometrica({ N, K }: { N: number; K: number }) {
  const [n, setN] = useState(6);
  const [k, setK] = useState(2);

  const valores = useMemo(
    () =>
      Array.from({ length: Math.min(n, K) + 1 }, (_, i) => ({
        k: i,
        prob: hipergeometrica(N, K, n, i),
      })),
    [N, K, n]
  );
  const prob = hipergeometrica(N, K, n, k);
  const esperanza = (n * K) / N;
  const probBinomial = binomial(n, k, K / N);

  return (
    <div className="flex flex-col gap-4">
      <Definicion termino="Distribución hipergeométrica">
        Modela la cantidad de éxitos al extraer una muestra{" "}
        <strong>sin reposición</strong> de una población finita. Al no reponer,
        la probabilidad de éxito cambia en cada extracción.
      </Definicion>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <p className="text-sm text-slate-700 dark:text-slate-300">
          <strong>El caso:</strong> de los <V>N</V> = {N} estudiantes que
          dieron positivo, <V>K</V> = {K} tienen el expediente incompleto. Se
          auditan <V>n</V> expedientes al azar, sin devolverlos al montón.
          ¿Probabilidad de encontrar exactamente <V>k</V> incompletos?
        </p>

        <div className="mt-4 flex flex-col gap-3">
          <label className="flex items-center gap-3 text-sm">
            <span className="w-32 shrink-0 font-mono text-slate-600 dark:text-slate-400">
              n = {n} auditados
            </span>
            <input type="range" min={1} max={12} value={n}
              onChange={(e) => { const v = Number(e.target.value); setN(v); if (k > Math.min(v, K)) setK(Math.min(v, K)); }}
              className="h-2 flex-1 cursor-pointer accent-blue-600" />
          </label>
          <label className="flex items-center gap-3 text-sm">
            <span className="w-32 shrink-0 font-mono text-slate-600 dark:text-slate-400">
              k = {k} incompletos
            </span>
            <input type="range" min={0} max={Math.min(n, K)} value={k}
              onChange={(e) => setK(Number(e.target.value))}
              className="h-2 flex-1 cursor-pointer accent-blue-600" />
          </label>
        </div>

        <div className="mt-5">
          <Barras valores={valores} destacado={k} etiquetaX="expedientes incompletos encontrados" />
        </div>

        <div className="mt-3 grid gap-2 sm:grid-cols-3 text-sm">
          <div className="rounded-xl bg-blue-50 px-3 py-2 dark:bg-blue-950/30">
            <p className="text-[10px] uppercase tracking-wider text-blue-600 dark:text-blue-400">P(X = {k})</p>
            <p className="font-serif text-xl font-semibold tabular-nums text-slate-900 dark:text-slate-100">
              {(prob * 100).toFixed(2)}%
            </p>
          </div>
          <div className="rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-800/60">
            <p className="text-[10px] uppercase tracking-wider text-slate-500">E[X] = n·K/N</p>
            <p className="font-serif text-xl font-semibold tabular-nums text-slate-900 dark:text-slate-100">
              {esperanza.toFixed(2)}
            </p>
          </div>
          <div className="rounded-xl bg-rose-50 px-3 py-2 dark:bg-rose-950/30">
            <p className="text-[10px] uppercase tracking-wider text-rose-700 dark:text-rose-400">
              Si usaras binomial
            </p>
            <p className="font-serif text-xl font-semibold tabular-nums text-slate-900 dark:text-slate-100">
              {(probBinomial * 100).toFixed(2)}%
            </p>
          </div>
        </div>
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
          La última tarjeta muestra el error: usar binomial supone reposición.
          Con una población de sólo {N}, cada expediente que sacás cambia la
          composición de los {N - 1} restantes, y esa diferencia sí importa.
        </p>
      </div>

      <Formula
        titulo="Hipergeométrica"
        simbolos={
          <>
            <V>P</V>(<V>X</V> = <V>k</V>) =
            <Frac
              arriba={<><V>C</V>(<V>K</V>,<V>k</V>) · <V>C</V>(<V>N</V>−<V>K</V>, <V>n</V>−<V>k</V>)</>}
              abajo={<><V>C</V>(<V>N</V>,<V>n</V>)</>}
            />
          </>
        }
        numeros={
          <>
            <Frac
              arriba={<>{combinaciones(K, k).toLocaleString("es")} × {combinaciones(N - K, n - k).toLocaleString("es")}</>}
              abajo={<>{combinaciones(N, n).toLocaleString("es")}</>}
            />
            = {prob.toFixed(4)}
          </>
        }
        resultado={
          <>
            Auditando 6 expedientes se esperan {((6 * K) / N).toFixed(2)}{" "}
            incompletos, y hay un <strong>27.39%</strong> de probabilidad de
            encontrar exactamente 2.
          </>
        }
      />
    </div>
  );
}
