"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  ESTUDIANTES,
  CORTE_TAMIZAJE,
  DEMANDA_SEMANAL,
} from "@content/aula-probabilidad/dataset";
import { entero } from "./aleatorio";
import { MiniHistoria } from "./narrativa";

/** Los 9 ítems del PHQ-9 (formulación estándar en español). */
const ITEMS_PHQ9 = [
  "Poco interés o placer en hacer las cosas",
  "Sentirse decaído(a), deprimido(a) o sin esperanzas",
  "Dificultad para dormir, o dormir demasiado",
  "Sentirse cansado(a) o con poca energía",
  "Poco apetito, o comer en exceso",
  "Sentirse mal consigo mismo(a), o sentir que es un fracaso",
  "Dificultad para concentrarse en cosas como leer o mirar televisión",
  "Moverse o hablar tan lento que otros lo notan — o al revés, estar inquieto(a)",
  "Pensar que estaría mejor muerto(a), o en lastimarse de algún modo",
];

const RESPUESTAS = [
  { valor: 0, corta: "0", larga: "Ningún día" },
  { valor: 1, corta: "1", larga: "Varios días" },
  { valor: 2, corta: "2", larga: "Más de la mitad" },
  { valor: 3, corta: "3", larga: "Casi todos los días" },
];

/**
 * Piezas del caso — los objetos con los que se construye el capítulo.
 *
 * Antes vivían todas dentro de un único módulo «El caso» que las mostraba
 * de golpe, con los cinco datos del archivo presentados antes de que
 * existiera la definición de experimento aleatorio. Cuatro de los cinco
 * llegaban entre dos y siete apartados antes de hacer falta.
 *
 * Ahora son piezas sueltas, y cada apartado monta la que le toca:
 *
 *   - `AnalogiaDados`      una pregunta del cuestionario = un dado de 4 caras
 *   - `ArmarPuntaje`       nueve preguntas = el puntaje de 0 a 27
 *   - `LasFichas`          el explorador de fichas, que CRECE: se le pasa
 *                          qué campos ya fueron presentados
 *   - `DeDondeSalenLas200` 2.400 respuestas contra 200 fichas
 *   - `PuenteALaProbabilidad` de contar a preguntar
 *   - `ElOtroArchivo`      expediente y demanda semanal (van en 2.8)
 */

/* ------------------------------------------------------------------ */
/* Armar un puntaje: de dónde sale el rango 0 a 27                     */
/* ------------------------------------------------------------------ */

export function ArmarPuntaje() {
  const [respuestas, setRespuestas] = useState<number[]>(() => Array(9).fill(0));

  const total = respuestas.reduce((s, v) => s + v, 0);
  const positivo = total >= CORTE_TAMIZAJE;

  function responder(indice: number, valor: number) {
    setRespuestas((prev) => prev.map((v, i) => (i === indice ? valor : v)));
  }

  function preset(valor: number) {
    setRespuestas(Array(9).fill(valor));
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h4 className="font-serif text-lg font-semibold text-slate-900 dark:text-slate-100">
          Respondé el cuestionario y mirá cómo se arma el puntaje
        </h4>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => preset(0)}
            className="rounded-full border border-slate-200 px-3 py-1.5 text-xs text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Todo en 0
          </button>
          <button
            type="button"
            onClick={() => preset(3)}
            className="rounded-full border border-slate-200 px-3 py-1.5 text-xs text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Todo en 3
          </button>
        </div>
      </div>

      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        Nueve preguntas. Cada una se responde según con qué frecuencia
        molestó ese síntoma en las últimas dos semanas.
      </p>

      {/* Leyenda de las 4 respuestas */}
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
        {RESPUESTAS.map((r) => (
          <span key={r.valor}>
            <strong className="tabular-nums text-slate-700 dark:text-slate-300">
              {r.corta}
            </strong>{" "}
            = {r.larga}
          </span>
        ))}
      </div>

      {/* Los 9 ítems */}
      <ol className="mt-4 flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
        {ITEMS_PHQ9.map((texto, i) => (
          <li
            key={i}
            className="flex flex-wrap items-center justify-between gap-3 py-2.5"
          >
            <span className="flex-1 text-sm text-slate-700 dark:text-slate-300">
              <span className="mr-1.5 tabular-nums text-slate-400">
                {i + 1}.
              </span>
              {texto}
            </span>
            <div className="flex shrink-0 gap-1">
              {RESPUESTAS.map((r) => (
                <button
                  key={r.valor}
                  type="button"
                  onClick={() => responder(i, r.valor)}
                  aria-label={`${texto}: ${r.larga}`}
                  aria-pressed={respuestas[i] === r.valor}
                  className={
                    "grid h-8 w-8 place-items-center rounded-md border text-sm font-semibold tabular-nums transition " +
                    (respuestas[i] === r.valor
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-slate-200 text-slate-500 hover:border-blue-400 dark:border-slate-700 dark:text-slate-400")
                  }
                >
                  {r.corta}
                </button>
              ))}
            </div>
          </li>
        ))}
      </ol>

      {/* El total, en vivo */}
      <div className="mt-5 flex flex-wrap items-center gap-4 rounded-xl bg-slate-50 px-5 py-4 dark:bg-slate-800/60">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Puntaje total
          </p>
          <p
            className={
              "font-serif text-4xl font-semibold tabular-nums " +
              (positivo
                ? "text-amber-600 dark:text-amber-400"
                : "text-slate-900 dark:text-slate-100")
            }
          >
            {total}
          </p>
        </div>
        <div className="flex-1 text-sm text-slate-700 dark:text-slate-300">
          {positivo ? (
            <p>
              <strong className="text-amber-700 dark:text-amber-300">
                Suena la alarma.
              </strong>{" "}
              {total} ≥ {CORTE_TAMIZAJE}, así que el tamizaje marca a esta
              persona para una entrevista. No dice que tenga depresión: dice
              que vale la pena revisarla.
            </p>
          ) : (
            <p>
              Por debajo del corte de {CORTE_TAMIZAJE}: el tamizaje deja pasar
              a esta persona sin marcarla.
            </p>
          )}
        </div>
      </div>

      <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
        De ahí sale el rango: 9 preguntas × 0 puntos = <strong>0</strong> como
        mínimo, y 9 × 3 = <strong>27</strong> como máximo. El corte en{" "}
        <strong>{CORTE_TAMIZAJE}</strong> no es arbitrario: es el valor con el
        que el instrumento detecta al 88% de los casos reales.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Las 200 fichas del servicio                                         */
/* ------------------------------------------------------------------ */

/** Qué campos de la ficha ya fueron presentados y se pueden mostrar. */
export type CampoFicha = "phq9" | "dx" | "gad7" | "expediente";

/**
 * El explorador de fichas, que CRECE con el capítulo.
 *
 * Antes mostraba los cuatro campos a la vez, en el segundo módulo: se veía
 * el diagnóstico confirmado dos apartados antes de que hiciera falta, el
 * GAD-7 cuatro antes y el expediente siete antes. Ahora cada apartado le
 * pasa sólo los campos que ya presentó, así que la misma ficha se va
 * llenando a medida que el lector avanza — y eso mismo enseña que el dato
 * no estaba escondido: todavía no se necesitaba.
 */
export function LasFichas({
  campos,
  titulo = "Mirá una ficha por dentro",
  intro,
}: {
  campos: CampoFicha[];
  titulo?: string;
  intro?: ReactNode;
}) {
  const total = ESTUDIANTES.length;
  const [indice, setIndice] = useState(0);
  const f = ESTUDIANTES[indice];
  const muestra = (c: CampoFicha) => campos.includes(c);

  const dioPositivoDep = f.phq9 >= CORTE_TAMIZAJE;
  const dioPositivoAns = f.gad7 >= CORTE_TAMIZAJE;

  // El veredicto («acertó», «falsa alarma») compara el puntaje contra el
  // diagnóstico: no se puede mostrar antes de haber presentado ese campo.
  const hayVeredicto = muestra("phq9") && muestra("dx");

  function otraFicha() {
    setIndice((i) => (i + 1) % total);
  }

  // Fichas elegidas para que se vean los cuatro casos posibles.
  const interesantes = useMemo(() => {
    const buscar = (pred: (e: (typeof ESTUDIANTES)[number]) => boolean) =>
      ESTUDIANTES.findIndex(pred);
    return [
      {
        etiqueta: "Acertó: positivo y sí lo tenía",
        i: buscar((e) => e.phq9 >= CORTE_TAMIZAJE && e.dxConfirmado),
      },
      {
        etiqueta: "Falsa alarma: positivo pero sano",
        i: buscar((e) => e.phq9 >= CORTE_TAMIZAJE && !e.dxConfirmado),
      },
      {
        etiqueta: "Se escapó: negativo pero sí lo tenía",
        i: buscar((e) => e.phq9 < CORTE_TAMIZAJE && e.dxConfirmado),
      },
      {
        etiqueta: "Acertó: negativo y sano",
        i: buscar((e) => e.phq9 < CORTE_TAMIZAJE && !e.dxConfirmado),
      },
    ].filter((x) => x.i >= 0);
  }, []);

  const cuantos = campos.length;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h4 className="font-serif text-lg font-semibold text-slate-900 dark:text-slate-100">
          {titulo}
        </h4>
        <button
          type="button"
          onClick={otraFicha}
          className="rounded-full bg-slate-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 dark:bg-slate-600 dark:hover:bg-slate-500"
        >
          Ver otra ficha →
        </button>
      </div>

      <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        {intro ?? (
          <p>
            Así se lee la ficha del estudiante #{f.id}
            {cuantos === 1
              ? ", que por ahora tiene un solo dato."
              : `, que a esta altura del capítulo tiene ${cuantos} datos.`}
          </p>
        )}
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {muestra("phq9") && (
          <FilaFicha
            titulo="Puntaje de depresión"
            valor={f.phq9}
            rango="de 0 a 27"
            lectura={
              f.phq9 === 0
                ? "Cero significa que no reportó ningún síntoma, ningún día. Es el puntaje más bajo posible."
                : dioPositivoDep
                  ? `${f.phq9} está por encima del corte de ${CORTE_TAMIZAJE}: el filtro lo marca para entrevistar.`
                  : `${f.phq9} está por debajo del corte de ${CORTE_TAMIZAJE}: el filtro lo deja pasar sin marcarlo.`
            }
            positivo={dioPositivoDep}
          />
        )}

        {muestra("dx") && (
          <FilaFicha
            titulo="Diagnóstico confirmado"
            valor={f.dxConfirmado ? "Sí" : "No"}
            rango="lo dijo un profesional"
            lectura={
              f.dxConfirmado
                ? "Después de entrevistarlo, el profesional confirmó que sí tiene el trastorno. Ésta es la verdad contra la que juzgamos al cuestionario."
                : "Después de entrevistarlo, el profesional determinó que no tiene el trastorno."
            }
            positivo={f.dxConfirmado}
          />
        )}

        {muestra("gad7") && (
          <FilaFicha
            titulo="Puntaje de ansiedad"
            valor={f.gad7}
            rango="de 0 a 21"
            lectura={
              dioPositivoAns
                ? `${f.gad7} supera el corte de ${CORTE_TAMIZAJE}: también da positivo en ansiedad.`
                : `${f.gad7} no llega al corte de ${CORTE_TAMIZAJE}. Reportó algunos síntomas, pero no los suficientes para que el filtro lo marque.`
            }
            positivo={dioPositivoAns}
          />
        )}

        {muestra("expediente") && (
          <FilaFicha
            titulo="Expediente"
            valor={f.expedienteCompleto ? "OK" : "!"}
            rango="completo o incompleto"
            lectura={
              f.expedienteCompleto
                ? "El legajo administrativo de este estudiante está completo: no le falta ningún dato ni firma."
                : "A este legajo le falta algún dato. No afecta al cuestionario, pero sí complica el seguimiento del caso."
            }
            positivo={!f.expedienteCompleto}
          />
        )}
      </div>

      {hayVeredicto && (
        <>
          <div
            className={
              "mt-4 rounded-xl px-4 py-3 text-sm " +
              (dioPositivoDep === f.dxConfirmado
                ? "bg-emerald-50 text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200"
                : "bg-rose-50 text-rose-900 dark:bg-rose-950/30 dark:text-rose-200")
            }
          >
            <strong>
              {dioPositivoDep && f.dxConfirmado && "El cuestionario acertó. "}
              {dioPositivoDep && !f.dxConfirmado && "Falsa alarma. "}
              {!dioPositivoDep && f.dxConfirmado && "Se le escapó. "}
              {!dioPositivoDep && !f.dxConfirmado && "El cuestionario acertó. "}
            </strong>
            {dioPositivoDep && f.dxConfirmado &&
              "Lo marcó, y efectivamente tenía el trastorno."}
            {dioPositivoDep && !f.dxConfirmado &&
              "Lo marcó para entrevistar, pero el profesional determinó que estaba sano. Una entrevista que se podría haber evitado."}
            {!dioPositivoDep && f.dxConfirmado &&
              "No lo marcó, pero sí tenía el trastorno. Se fue con un resultado negativo cuando necesitaba ayuda."}
            {!dioPositivoDep && !f.dxConfirmado &&
              "No lo marcó, y efectivamente estaba sano."}
          </div>

          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Saltá directo a cada caso posible
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {interesantes.map((x) => (
              <button
                key={x.etiqueta}
                type="button"
                onClick={() => setIndice(x.i)}
                className={
                  "rounded-full border px-3 py-1.5 text-xs font-medium transition " +
                  (indice === x.i
                    ? "border-slate-700 bg-slate-700 text-white dark:border-slate-500 dark:bg-slate-600"
                    : "border-slate-200 text-slate-600 hover:border-slate-400 dark:border-slate-700 dark:text-slate-400")
                }
              >
                {x.etiqueta}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/** Una fila de la ficha: el dato, su valor, y qué significa ese valor. */
function FilaFicha({
  titulo,
  valor,
  rango,
  lectura,
  positivo,
}: {
  titulo: string;
  valor: number | string;
  rango: string;
  lectura: string;
  positivo: boolean;
}) {
  return (
    <div className="flex gap-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
      <div
        className={
          "grid h-14 w-14 shrink-0 place-content-center rounded-xl text-center " +
          (positivo
            ? "bg-amber-200 text-amber-900 dark:bg-amber-900/60 dark:text-amber-100"
            : "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200")
        }
      >
        <span className="font-serif text-2xl font-semibold tabular-nums">
          {valor}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          {titulo}{" "}
          <span className="font-normal text-slate-400">({rango})</span>
        </p>
        <p className="mt-0.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {lectura}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* El puente: qué tiene que ver todo esto con probabilidad             */
/* ------------------------------------------------------------------ */

interface PreguntaConteo {
  id: string;
  pregunta: string;
  /** Fichas que forman el universo de la pregunta (el denominador). */
  universo: (e: (typeof ESTUDIANTES)[number]) => boolean;
  /** Fichas que además cumplen lo que se pregunta (el numerador). */
  cumple: (e: (typeof ESTUDIANTES)[number]) => boolean;
  cierre: string;
}

/**
 * Las tres preguntas son del mismo tipo —contar y dividir— pero cambian el
 * universo, que es justamente lo que hay que ver. Antes las dos últimas
 * usaban el diagnóstico confirmado y una de ellas calculaba el valor
 * predictivo positivo: o sea, la respuesta del apartado 2.6, revelada en el
 * preámbulo. Ahora las tres se contestan con el único dato ya presentado.
 */
const PREGUNTAS_CONTEO: PreguntaConteo[] = [
  {
    id: "positivo",
    pregunta: "Si elijo un estudiante al azar, ¿qué chance hay de que dé positivo?",
    universo: () => true,
    cumple: (e) => e.phq9 >= CORTE_TAMIZAJE,
    cierre:
      "Contamos cuántas fichas superan el corte, sobre el total. Eso —y nada más que eso— es una probabilidad.",
  },
  {
    id: "bajo",
    pregunta: "¿Y de que saque menos de 5?",
    universo: () => true,
    cumple: (e) => e.phq9 < 5,
    cierre:
      "Mismo procedimiento, otra pregunta: cambió lo que contamos, pero el total sigue siendo las 200 fichas. Fijate que da bastante más que la anterior — la mayoría de los estudiantes puntúa bajo.",
  },
  {
    id: "graves",
    pregunta: "Entre los que dieron positivo, ¿cuántos llegan a 15 o más?",
    universo: (e) => e.phq9 >= CORTE_TAMIZAJE,
    cumple: (e) => e.phq9 >= 15,
    cierre:
      "Acá cambió el denominador: ya no son las 200 fichas, son sólo las que dieron positivo. Cambiar el universo de la pregunta cambia el resultado aunque el numerador se cuente igual — y esa distinción, que parece un detalle, es el corazón de los apartados 2.3 y 2.6.",
  },
];

export function PuenteALaProbabilidad() {
  const [activa, setActiva] = useState<string | null>(null);
  const p = PREGUNTAS_CONTEO.find((q) => q.id === activa) ?? null;

  const { den, num } = useMemo(() => {
    if (!p) return { den: ESTUDIANTES.length, num: 0 };
    const enUniverso = ESTUDIANTES.filter(p.universo);
    return {
      den: enUniverso.length,
      num: enUniverso.filter(p.cumple).length,
    };
  }, [p]);

  const pct = den > 0 ? (num / den) * 100 : 0;

  return (
    <div className="rounded-2xl border-2 border-blue-300 bg-blue-50/40 p-5 dark:border-blue-800 dark:bg-blue-950/20 sm:p-6">
      <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-blue-700 dark:text-blue-300">
        Lo importante
      </p>
      <h4 className="mt-1 font-serif text-xl font-semibold text-slate-900 dark:text-slate-100">
        ¿Y qué tiene que ver todo esto con probabilidad?
      </h4>
      <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        Todo. Estas {ESTUDIANTES.length} fichas son{" "}
        <strong>lo único que tenemos</strong>, y cada pregunta de probabilidad
        de este capítulo se responde <strong>contándolas</strong>. Elegir una
        ficha al azar es el experimento; contar cuántas cumplen algo es la
        probabilidad. Tocá una pregunta y mirá el conteo:
      </p>

      <div className="mt-4 flex flex-col gap-2">
        {PREGUNTAS_CONTEO.map((q) => (
          <button
            key={q.id}
            type="button"
            onClick={() => setActiva(activa === q.id ? null : q.id)}
            aria-pressed={activa === q.id}
            className={
              "rounded-xl border-2 px-4 py-3 text-left text-sm transition " +
              (activa === q.id
                ? "border-blue-600 bg-white font-medium text-slate-900 dark:bg-slate-900 dark:text-slate-100"
                : "border-transparent bg-white/70 text-slate-700 hover:border-blue-300 dark:bg-slate-900/60 dark:text-slate-300")
            }
          >
            {q.pregunta}
          </button>
        ))}
      </div>

      {/* Las 200 fichas, iluminadas según la pregunta */}
      <div className="mt-5 flex flex-wrap gap-[3px]">
        {ESTUDIANTES.map((e) => {
          const fuera = p ? !p.universo(e) : false;
          const marcada = p ? p.cumple(e) : false;
          return (
            <span
              key={e.id}
              title={`Ficha #${e.id}`}
              className={
                "h-3 w-3 rounded-[2px] transition " +
                (marcada
                  ? "bg-blue-600"
                  : fuera
                    ? "bg-slate-200 opacity-30 dark:bg-slate-700"
                    : "bg-slate-300 dark:bg-slate-600")
              }
            />
          );
        })}
      </div>

      <div className="mt-4 rounded-xl bg-white px-4 py-3 dark:bg-slate-900">
        {!p ? (
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Cada cuadradito es un estudiante. Elegí una pregunta arriba y se
            van a marcar los que cumplen.
          </p>
        ) : (
          <>
            <p className="font-serif text-2xl font-semibold tabular-nums text-slate-900 dark:text-slate-100 sm:text-3xl">
              {num} / {den} = {pct.toFixed(1)}%
            </p>
            <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              <strong className="text-slate-800 dark:text-slate-200">
                {num}
              </strong>{" "}
              fichas marcadas de{" "}
              <strong className="text-slate-800 dark:text-slate-200">
                {den}
              </strong>{" "}
              posibles. {p.cierre}
            </p>
          </>
        )}
      </div>

      <p className="mt-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        Eso es todo lo que hace la probabilidad:{" "}
        <strong>contar casos favorables entre casos posibles</strong>. Lo que
        viene en el resto del capítulo es aprender a hacer ese conteo cuando la
        pregunta se complica — cuando hay que cruzar dos variables, cuando hay
        demasiadas combinaciones para contarlas a mano, y cuando la pregunta se
        da vuelta y ya no se puede contar directo.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* De dónde salen las 200: universidad contra fichas                   */
/* ------------------------------------------------------------------ */

/**
 * Los dos números del caso —2.400 y 200— tienen que quedar claros de entrada.
 * Uno es la universidad entera; el otro, los que efectivamente respondieron el
 * cuestionario. Confundirlos arruina todo lo que viene, y la distinción es
 * justamente la de universo contra muestra.
 */
export function DeDondeSalenLas200() {
  const total = ESTUDIANTES.length;
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <h4 className="font-serif text-lg font-semibold text-slate-900 dark:text-slate-100">
        Dos números que no hay que mezclar
      </h4>

      <div className="mt-4 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
        <div className="flex-1 rounded-xl border-2 border-slate-300 p-4 text-center dark:border-slate-600">
          <p className="font-serif text-3xl font-semibold tabular-nums text-slate-900 dark:text-slate-100">
            2.400
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
            estudiantes tiene la universidad
          </p>
          <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
            Es la población completa sobre la que al servicio le gustaría
            concluir algo. No los conoce a todos.
          </p>
        </div>

        <div className="flex items-center justify-center px-2 text-slate-400">
          <span className="text-2xl">→</span>
        </div>

        <div className="flex-1 rounded-xl border-2 border-blue-500 bg-blue-50/50 p-4 text-center dark:bg-blue-950/30">
          <p className="font-serif text-3xl font-semibold tabular-nums text-blue-700 dark:text-blue-300">
            {total}
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
            respondieron el cuestionario
          </p>
          <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
            Y además fueron entrevistados por un profesional. Son{" "}
            <strong>las {total} fichas que tenemos</strong>, y de acá sale cada
            número del capítulo.
          </p>
        </div>
      </div>

      <p className="mt-4 rounded-xl bg-slate-50 px-4 py-3 text-sm leading-relaxed text-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
        Cada vez que en esta herramienta veas un porcentaje, sale de contar
        entre esas <strong>{total} fichas</strong> — nunca entre las 2.400. Los
        2.400 aparecen sólo cuando la pregunta es sobre la universidad entera, y
        en ese caso se dice explícitamente.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* El segundo archivo: cuánta gente pide atención cada semana          */
/* ------------------------------------------------------------------ */

/**
 * La demanda semanal es el segundo conjunto de datos del caso y se usa recién
 * en 2.8 (Poisson). Se presenta acá para que no aparezca de la nada.
 */
export function ElOtroArchivo() {
  const total = DEMANDA_SEMANAL.reduce((s, x) => s + x, 0);
  const semanas = DEMANDA_SEMANAL.length;
  const maximo = Math.max(...DEMANDA_SEMANAL);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <h4 className="font-serif text-lg font-semibold text-slate-900 dark:text-slate-100">
        Y hay un segundo archivo, mucho más chico
      </h4>
      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        Además de las fichas, el servicio anota cuántas personas piden atención
        cada semana. Son {semanas} semanas seguidas, {total} solicitudes en
        total. No dice nada de quién pidió: sólo cuántos.
      </p>

      <div className="mt-4 flex items-end gap-1" style={{ height: 70 }}>
        {DEMANDA_SEMANAL.map((v, i) => (
          <div
            key={i}
            title={`Semana ${i + 1}: ${v} solicitudes`}
            className="w-full flex-1 rounded-t bg-slate-300 dark:bg-slate-600"
            style={{ height: `${(v / maximo) * 60}px` }}
          />
        ))}
      </div>
      <p className="mt-1 text-center text-xs text-slate-400">
        las {semanas} semanas, una barra cada una
      </p>

      <p className="mt-3 rounded-xl bg-slate-50 px-4 py-3 text-sm leading-relaxed text-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
        Estos datos son de otra naturaleza: no hay un número fijo de intentos
        como en el cuestionario, hay un <strong>ritmo</strong> de solicitudes
        que llegan con el tiempo. Esa diferencia va a decidir qué herramienta
        corresponde usar, en el apartado 2.8.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* La analogía: cada pregunta es un dado de cuatro caras               */
/* ------------------------------------------------------------------ */

const OPCIONES_DADO = [
  { valor: 0, texto: "Ningún día" },
  { valor: 1, texto: "Varios días" },
  { valor: 2, texto: "Más de la mitad" },
  { valor: 3, texto: "Casi todos los días" },
];

/**
 * El puente entre los dados del apartado 2.1 y el cuestionario. Responder el
 * cuestionario ES tirar nueve dados de cuatro caras y sumar: la misma
 * maquinaria, otro contexto. Con esta analogía el rango 0–27 deja de ser un
 * dato que hay que memorizar.
 */
/**
 * La analogía dado ↔ pregunta, construida peldaño a peldaño.
 *
 * Antes saltaba de «una pregunta es un dado de cuatro caras» directo a
 * «tirá las nueve y sumá». Ese salto se comía el peldaño del medio, que es
 * donde se entiende de dónde sale un puntaje: con una pregunta el resultado
 * va de 0 a 3, con dos de 0 a 6, con nueve de 0 a 27. Ahora el lector elige
 * cuántas preguntas tirar y ve crecer el rango.
 */
export function AnalogiaDados() {
  const [cuantas, setCuantas] = useState(1);
  const [tirados, setTirados] = useState<number[] | null>(null);
  const [girando, setGirando] = useState(false);
  const girandoRef = useRef(false);
  const limpiarRef = useRef<(() => void) | null>(null);

  useEffect(() => () => limpiarRef.current?.(), []);

  function elegir(n: number) {
    if (girandoRef.current) return;
    setCuantas(n);
    setTirados(null);
  }

  function tirar() {
    if (girandoRef.current) return;
    girandoRef.current = true;
    setGirando(true);

    const n = cuantas;
    const final = Array.from({ length: n }, () => entero(0, 3));
    let vueltas = 0;
    let terminado = false;

    const finalizar = () => {
      if (terminado) return;
      terminado = true;
      window.clearInterval(id);
      window.clearTimeout(seguro);
      limpiarRef.current = null;
      setTirados(final);
      girandoRef.current = false;
      setGirando(false);
    };

    const id = window.setInterval(() => {
      vueltas++;
      if (vueltas >= 8) finalizar();
      else setTirados(Array.from({ length: n }, () => entero(0, 3)));
    }, 70);
    const seguro = window.setTimeout(finalizar, 1500);
    limpiarRef.current = () => {
      window.clearInterval(id);
      window.clearTimeout(seguro);
    };
  }

  const suma = tirados ? tirados.reduce((s, v) => s + v, 0) : null;
  const maximo = cuantas * 3;

  const PELDANOS = [
    { n: 1, etiqueta: "1 pregunta" },
    { n: 2, etiqueta: "2 preguntas" },
    { n: 9, etiqueta: "las 9 preguntas" },
  ];

  return (
    <div className="rounded-2xl border-2 border-slate-300 bg-slate-50/60 p-5 dark:border-slate-600 dark:bg-slate-900/60 sm:p-6">
      <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
        La analogía que conecta todo
      </p>
      <h4 className="mt-1 font-serif text-xl font-semibold text-slate-900 dark:text-slate-100">
        Cada pregunta es un dado. Cada opción, una cara.
      </h4>

      <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        Un dado común tiene <strong>seis caras</strong> y al tirarlo sale una.
        Cada pregunta del cuestionario tiene <strong>cuatro opciones</strong> y
        al responderla sale una. Es la misma estructura: un experimento con un
        conjunto conocido de resultados posibles.
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Un dado común
          </p>
          <p className="mt-2 text-2xl">⚀ ⚁ ⚂ ⚃ ⚄ ⚅</p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            6 caras · sale 1, 2, 3, 4, 5 o 6
          </p>
        </div>
        <div className="rounded-xl border border-blue-300 bg-blue-50/50 p-4 dark:border-blue-700 dark:bg-blue-950/30">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Una pregunta del cuestionario
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {OPCIONES_DADO.map((o) => (
              <span
                key={o.valor}
                className="rounded-md bg-white px-2 py-1 text-xs dark:bg-slate-800"
              >
                <strong className="tabular-nums">{o.valor}</strong>{" "}
                <span className="text-slate-500 dark:text-slate-400">
                  {o.texto}
                </span>
              </span>
            ))}
          </div>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            4 caras · sale 0, 1, 2 o 3
          </p>
        </div>
      </div>

      {/* La escalera: de una pregunta a nueve, un peldaño por vez */}
      <p className="mt-6 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        Empezá tirando <strong>una sola</strong> pregunta. Después sumá otra, y
        después las nueve. Fijate qué le pasa al resultado posible cada vez que
        agregás una:
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {PELDANOS.map((p) => (
          <button
            key={p.n}
            type="button"
            onClick={() => elegir(p.n)}
            aria-pressed={cuantas === p.n}
            className={
              "rounded-full border px-3.5 py-1.5 text-sm font-medium transition " +
              (cuantas === p.n
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-slate-300 text-slate-600 hover:border-blue-400 dark:border-slate-600 dark:text-slate-400")
            }
          >
            {p.etiqueta}
          </button>
        ))}
      </div>

      <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
        Con {cuantas === 1 ? "una pregunta" : `${cuantas} preguntas`} el total
        puede ir de <strong className="tabular-nums">0</strong> a{" "}
        <strong className="tabular-nums">{maximo}</strong> ({cuantas} × 3 ={" "}
        {maximo}).
      </p>

      <button
        type="button"
        disabled={girando}
        onClick={tirar}
        className="mt-3 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-50"
      >
        🎲 {cuantas === 1 ? "Tirar la pregunta" : `Tirar las ${cuantas}`}
      </button>

      <div className="mt-4 flex flex-wrap gap-2">
        {Array.from({ length: cuantas }, (_, i) => {
          const v = tirados?.[i];
          return (
            <div
              key={i}
              className={
                "grid h-11 w-11 place-content-center rounded-lg border-2 text-center transition " +
                (v === undefined
                  ? "border-dashed border-slate-300 dark:border-slate-600"
                  : "border-blue-500 bg-blue-50 dark:bg-blue-950/40")
              }
            >
              <span className="text-lg font-semibold tabular-nums text-slate-900 dark:text-slate-100">
                {v ?? "?"}
              </span>
              <span className="text-[9px] text-slate-400">P{i + 1}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 rounded-xl bg-white px-4 py-3 dark:bg-slate-900">
        {suma === null ? (
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Tirá y mirá cuánto sale. Todavía no hay nada que calcular: sólo
            estamos viendo qué resultados puede dar el instrumento.
          </p>
        ) : (
          <>
            <p className="font-mono text-base tabular-nums text-slate-900 dark:text-slate-100">
              {tirados!.join(" + ")} = {suma}
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {cuantas === 1 && (
                <>
                  Con una sola pregunta, el «puntaje» es el número que salió.
                  Puede ser 0, 1, 2 o 3 — nada más. Agregá una segunda y mirá
                  cómo se abre el abanico.
                </>
              )}
              {cuantas === 2 && (
                <>
                  Con dos preguntas ya hay sumas que se pueden lograr de varias
                  maneras: un total de 3 sale con 0+3, 1+2, 2+1 o 3+0, mientras
                  que un 6 sale de una sola forma. Ésa es la primera pista de
                  todo el capítulo.
                </>
              )}
              {cuantas === 9 && (
                <>
                  Ese {suma} es un puntaje posible del cuestionario completo,
                  igual que un 4 es un resultado posible de un dado. El rango 0
                  a 27 no hay que memorizarlo: sale de 9 × 3.
                </>
              )}
            </p>
          </>
        )}
      </div>

      <MiniHistoria titulo="Dónde se rompe la analogía">
        En un dado las seis caras son <strong>igual de probables</strong>. En
        el cuestionario no: mucha gente responde 0 y poca responde 3, así que
        las cuatro caras están cargadas de forma desigual. Por eso la
        probabilidad del cuestionario <strong>no se puede calcular contando
        caras</strong> — hay que contar personas, y eso es exactamente la
        diferencia entre las dos primeras formas de probabilidad del apartado
        2.2.
      </MiniHistoria>
    </div>
  );
}
