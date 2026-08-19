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
import {
  Definicion,
  Ejemplos,
  Ejemplo,
  Frac,
  V,
  Trampa,
  Puente,
  Desarrollo,
  Termino,
  Comprueba,
  PasoTitulo,
} from "./narrativa";

const INSIGNIA = "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300";
const ACENTO = "border-emerald-300 text-emerald-700 dark:border-emerald-700 dark:text-emerald-400";

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

      <PasoTitulo numero={1} insignia={INSIGNIA}>
        El ladrillo común a las tres
      </PasoTitulo>

      <Definicion termino="Ensayo de Bernoulli">
        Un experimento con exactamente dos resultados, llamados éxito y
        fracaso. <strong>Éxito no significa nada bueno</strong>: es sólo la
        etiqueta del resultado que se está contando. Acá, el éxito es dar
        positivo.
        <Ejemplos titulo="Ver cuál distribución va en cada caso">
          <Ejemplo caso="BINOMIAL — «tamizamos 20 estudiantes, ¿cuántos dan positivo?»">
            Hay un número fijo de intentos (20) y cada uno sale positivo o no.
          </Ejemplo>
          <Ejemplo caso="BINOMIAL — «lanzo 10 monedas, ¿cuántas caras?»">
            Mismo patrón: n fijo, dos resultados, p constante.
          </Ejemplo>
          <Ejemplo caso="POISSON — «¿cuántas solicitudes llegan esta semana?»">
            No hay intentos: hay un intervalo de tiempo y una tasa media.
          </Ejemplo>
          <Ejemplo caso="POISSON — «¿cuántos errores tipográficos por página?»">
            Eventos que aparecen a cierto ritmo sobre un espacio.
          </Ejemplo>
          <Ejemplo caso="HIPERGEOMÉTRICA — «audito 6 de 43 fichas, sin reponer»">
            Población finita conocida, y cada extracción cambia lo que queda.
          </Ejemplo>
          <Ejemplo caso="HIPERGEOMÉTRICA — «saco 5 cartas de un mazo de 52»">
            El mazo se va achicando: no hay reposición.
          </Ejemplo>
        </Ejemplos>
      </Definicion>

      <PasoTitulo numero={2} insignia={INSIGNIA}>
        Elegir la distribución correcta
      </PasoTitulo>

      <Selector tipo={tipo} setTipo={setTipo} />

      {tipo === "binomial" && <Binomial />}
      {tipo === "poisson" && <Poisson lambda={lambda} />}
      {tipo === "hipergeometrica" && (
        <Hipergeometrica N={positivos} K={incompletos} />
      )}

      <Comprueba
        pregunta="El servicio quiere saber cuántas llamadas de consulta va a recibir el martes. Sabe que en promedio recibe 3 por día. ¿Qué distribución corresponde?"
        pista="Buscá si el enunciado da un número de intentos o una tasa por intervalo."
        opciones={[
          {
            texto: "Poisson",
            esCorrecta: true,
            porQue:
              "No hay un número fijo de intentos: nadie «intentó llamar» una cantidad determinada de veces. Hay un intervalo (un día) y una tasa media (3 por día). Ésa es exactamente la señal de Poisson: no existe un n natural en el enunciado.",
          },
          {
            texto: "Binomial",
            porQue:
              "La binomial necesita un n fijo: «tamizamos a 20 estudiantes», «revisamos 15 fichas». Acá no hay tal número — es el reflejo de buscar n y p en todo problema de conteo, y es el error más común de este apartado.",
          },
          {
            texto: "Hipergeométrica",
            porQue:
              "La hipergeométrica exige una población finita conocida de la que se extrae sin reponer, con N y K dados. Acá no hay ningún conjunto del que se esté sacando: hay eventos que llegan en el tiempo.",
          },
        ]}
      />

      <Comprueba
        pregunta="Se van a revisar 6 fichas de un archivo de 43, y las fichas NO se devuelven al montón. ¿Por qué no sirve la binomial acá?"
        opciones={[
          {
            texto: "Porque al no reponer, la probabilidad de éxito cambia en cada extracción",
            esCorrecta: true,
            porQue:
              "La binomial exige que p sea constante en todos los ensayos. Si sacás una ficha incompleta, quedan menos incompletas entre menos fichas: la probabilidad de la siguiente ya es otra. Con una población de sólo 43 y una muestra de 6, esa diferencia importa de verdad.",
          },
          {
            texto: "Porque 6 es un número muy chico de ensayos",
            porQue:
              "El tamaño de la muestra no es el problema: la binomial funciona igual con n = 6 que con n = 600. Lo que la descalifica es la ausencia de reposición.",
          },
          {
            texto: "Porque las fichas no son éxito o fracaso",
            porQue:
              "Sí lo son: cada ficha está completa o incompleta, que es exactamente un resultado dicotómico. El problema no es la variable, sino cómo se extrae la muestra.",
          },
        ]}
      />

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
  // Con muchos valores las barras quedarían de pocos píxeles en un celular:
  // se les da un ancho mínimo legible y el gráfico se desplaza en horizontal.
  const muchas = valores.length > 14;
  return (
    <div>
      <div className="-mx-1 overflow-x-auto px-1">
        <div
          className="flex items-end justify-center gap-1"
          style={{ height: 150, minWidth: muchas ? valores.length * 22 : undefined }}
        >
          {valores.map((v) => (
            <div
              key={v.k}
              className="flex min-w-[18px] flex-1 flex-col items-center justify-end gap-1"
            >
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
                  "text-[11px] tabular-nums " +
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
      </div>
      <p className="mt-1 text-center text-xs text-slate-400">
        {etiquetaX}
        {muchas && (
          <span className="ml-1 text-slate-300 dark:text-slate-600">
            · deslizá para ver todo
          </span>
        )}
      </p>
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
          <label className="flex flex-col gap-1 text-sm sm:flex-row sm:items-center sm:gap-3">
            <span className="font-mono sm:w-28 sm:shrink-0 text-slate-600 dark:text-slate-400">
              n = {n}
            </span>
            <input type="range" min={1} max={40} value={n}
              onChange={(e) => { const v = Number(e.target.value); setN(v); if (k > v) setK(v); }}
              className="h-2 flex-1 cursor-pointer accent-blue-600" />
          </label>
          <label className="flex flex-col gap-1 text-sm sm:flex-row sm:items-center sm:gap-3">
            <span className="font-mono sm:w-28 sm:shrink-0 text-slate-600 dark:text-slate-400">
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

      <Desarrollo
        titulo="El cálculo, con n = 20 y k = 5"
        insignia={INSIGNIA}
        acento={ACENTO}
        pasos={[
          {
            expresion: (
              <>
                <V>P</V>(<V>X</V> = 5) = <V>C</V>(20, 5) · (0,215)<sup>5</sup> · (0,785)<sup>15</sup>
              </>
            ),
            explicacion:
              "Tres piezas: de cuántas formas pueden ubicarse los 5 positivos entre los 20 estudiantes, por la probabilidad de que esos 5 den positivo, por la de que los otros 15 den negativo.",
          },
          {
            expresion: (
              <>
                <V>C</V>(20, 5) =
                <Frac arriba={<>20 × 19 × 18 × 17 × 16</>} abajo={<>5 × 4 × 3 × 2 × 1</>} />
                =
                <Frac arriba={<>1.860.480</>} abajo="120" /> = 15.504
              </>
            ),
            explicacion:
              "La combinación del apartado 2.4, con la misma cancelación de factoriales: expandimos 20! sólo hasta 15! y dividimos entre 5! = 120.",
          },
          {
            expresion: (
              <>
                (0,215)<sup>5</sup> = 0,00045940   ·   (0,785)<sup>15</sup> = 0,02648774
              </>
            ),
            explicacion:
              "Las dos potencias por separado. La primera es la probabilidad de que 5 personas den positivo; la segunda, de que 15 den negativo. Ambas son números muy chicos porque exigen que muchas cosas pasen a la vez.",
          },
          {
            expresion: (
              <>= 15.504 × 0,00045940 × 0,02648774 = 0,1887</>
            ),
            explicacion:
              "Multiplicamos las tres piezas. El resultado, 18,87%, es alto justamente porque hay 15.504 maneras distintas de que ocurra: cada una es improbable, pero hay muchísimas.",
          },
          {
            expresion: (
              <>
                <V>E</V>[<V>X</V>] = <V>np</V> = 20 × 0,215 = 4,30    ·    Var = <V>np</V>(1−<V>p</V>) = 3,3755
              </>
            ),
            explicacion:
              "Las fórmulas rápidas evitan recorrer valor por valor. Comprobación: con n = 2 dan E[X] = 0,43 y Var = 0,3376 — exactamente lo que calculamos a mano en 2.7.",
          },
        ]}
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
          <span className="font-mono sm:w-32 sm:shrink-0 text-slate-600 dark:text-slate-400">
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

      <Desarrollo
        titulo="El cálculo, con λ = 5 y k = 8"
        insignia={INSIGNIA}
        acento={ACENTO}
        pasos={[
          {
            expresion: (
              <>
                <V>P</V>(<V>X</V> = 8) =
                <Frac
                  arriba={<><Termino significa="La constante de Euler, aproximadamente 2,71828. Aparece en Poisson porque la distribución surge de un proceso continuo en el tiempo; no hay que memorizarla, la trae cualquier calculadora.">e</Termino><sup>−5</sup> × 5<sup>8</sup></>}
                  abajo={<>8!</>}
                />
              </>
            ),
            explicacion:
              "Sustituimos λ = 5 (la tasa media semanal) y k = 8 (el valor que nos interesa). No hay n ni p: sólo la tasa.",
          },
          {
            expresion: (
              <>
                e<sup>−5</sup> = 0,00673795   ·   5<sup>8</sup> = 390.625   ·   8! = 40.320
              </>
            ),
            explicacion:
              "Las tres piezas por separado. 8! = 40.320 es el mismo factorial del apartado 2.4, acá en el denominador.",
          },
          {
            expresion: (
              <>
                =
                <Frac arriba={<>0,00673795 × 390.625</>} abajo={<>40.320</>} />
                =
                <Frac arriba="2.632,01" abajo="40.320" />
              </>
            ),
            explicacion: "Resolvemos el numerador y dejamos la división indicada.",
          },
          {
            expresion: <>= 0,0653 = 6,53%</>,
            explicacion:
              "Hay un 6,53% de probabilidad de recibir exactamente 8 solicitudes en una semana dada. Pero lo que le importa al servicio no es ese valor exacto, sino la probabilidad de SUPERAR su capacidad — la suma de 9, 10, 11 y más.",
          },
        ]}
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
          <label className="flex flex-col gap-1 text-sm sm:flex-row sm:items-center sm:gap-3">
            <span className="font-mono sm:w-32 sm:shrink-0 text-slate-600 dark:text-slate-400">
              n = {n} auditados
            </span>
            <input type="range" min={1} max={12} value={n}
              onChange={(e) => { const v = Number(e.target.value); setN(v); if (k > Math.min(v, K)) setK(Math.min(v, K)); }}
              className="h-2 flex-1 cursor-pointer accent-blue-600" />
          </label>
          <label className="flex flex-col gap-1 text-sm sm:flex-row sm:items-center sm:gap-3">
            <span className="font-mono sm:w-32 sm:shrink-0 text-slate-600 dark:text-slate-400">
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

      <Desarrollo
        titulo="El cálculo, auditando 6 expedientes"
        insignia={INSIGNIA}
        acento={ACENTO}
        pasos={[
          {
            expresion: (
              <>
                <V>P</V>(<V>X</V> = 2) =
                <Frac
                  arriba={<><V>C</V>(9, 2) · <V>C</V>(34, 4)</>}
                  abajo={<><V>C</V>(43, 6)</>}
                />
              </>
            ),
            explicacion:
              "Arriba: de cuántas formas se pueden elegir 2 incompletos entre los 9 que hay, por de cuántas formas se eligen los 4 completos restantes entre los 34 disponibles. Abajo: todas las auditorías posibles de 6 entre 43.",
          },
          {
            expresion: (
              <>
                <V>C</V>(9, 2) =
                <Frac arriba={<>9 × 8</>} abajo="2" /> = 36
              </>
            ),
            explicacion: "Formas de elegir 2 expedientes incompletos entre los 9 que existen.",
          },
          {
            expresion: (
              <>
                <V>C</V>(34, 4) =
                <Frac arriba={<>34 × 33 × 32 × 31</>} abajo="24" /> = 46.376
              </>
            ),
            explicacion: "Formas de completar la muestra con 4 expedientes de los 34 que sí están completos (43 − 9 = 34).",
          },
          {
            expresion: (
              <>
                <V>C</V>(43, 6) = 6.096.454
              </>
            ),
            explicacion: "Total de auditorías posibles de 6 expedientes entre los 43. Es el denominador: todos los casos posibles.",
          },
          {
            expresion: (
              <>
                =
                <Frac arriba={<>36 × 46.376</>} abajo={<>6.096.454</>} />
                =
                <Frac arriba="1.669.536" abajo="6.096.454" /> = 0,2739
              </>
            ),
            explicacion:
              "27,39%. Acá no se puede usar la binomial: al no reponer, cada expediente extraído cambia la composición de los 42 restantes, y con una población de sólo 43 esa diferencia sí importa.",
          },
        ]}
      />
    </div>
  );
}
