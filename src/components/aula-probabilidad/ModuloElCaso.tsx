"use client";

import { useState } from "react";
import { ESTUDIANTES, CORTE_TAMIZAJE } from "@content/aula-probabilidad/dataset";
import {
  Definicion,
  Ejemplos,
  Ejemplo,
  MiniHistoria,
  Trampa,
  Puente,
  Termino,
  Comprueba,
  PasoTitulo,
} from "./narrativa";

const INSIGNIA = "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200";

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
 * Contexto — "El caso".
 *
 * Dos ideas concretas en vez de cinco términos abstractos: qué es un
 * tamizaje (con la analogía del detector de metales) y cómo se arma un
 * puntaje (armándolo uno mismo). Sensibilidad, especificidad y prevalencia
 * NO se definen acá: van en 2.3, donde la tabla hace visible el
 * denominador de cada una.
 */
export function ModuloElCaso({ onContinuar }: { onContinuar: () => void }) {
  return (
    <div className="flex flex-col gap-6">
      <PasoTitulo numero={1} insignia={INSIGNIA}>
        Qué es un tamizaje
      </PasoTitulo>

      <Definicion termino="Tamizaje (o cribado)">
        Una prueba rápida y barata que separa a quienes conviene evaluar a
        fondo de quienes probablemente no lo necesitan. No diagnostica:
        filtra.
        <Ejemplos titulo="Ver otros tamizajes conocidos">
          <Ejemplo caso="El detector de metales del aeropuerto">
            Suena para llaves y monedas. No dice que lleves un arma: dice a
            quién revisar a mano.
          </Ejemplo>
          <Ejemplo caso="El test de embarazo casero">
            Filtra rápido y barato; la confirmación la hace un profesional.
          </Ejemplo>
          <Ejemplo caso="La mamografía de rutina">
            Marca imágenes sospechosas. El diagnóstico lo da la biopsia.
          </Ejemplo>
          <Ejemplo caso="Nuestro cuestionario de 9 preguntas">
            Marca a quién conviene entrevistar. La entrevista clínica
            diagnostica.
          </Ejemplo>
        </Ejemplos>
      </Definicion>

      <MiniHistoria titulo="Es el detector de metales del aeropuerto">
        El detector suena para muchísima gente: llaves, monedas, el cinturón.
        Después un guardia revisa a mano y decide. El detector nunca dijo que
        llevaras un arma — solo dijo <strong>a quién vale la pena revisar</strong>.
        Por eso está regulado para sonar de más: prefiere una molestia
        innecesaria antes que dejar pasar algo grave. Un tamizaje en salud
        mental funciona igual, y por eso <strong>las falsas alarmas son
        normales y esperables</strong>, no un defecto.
      </MiniHistoria>

      <PasoTitulo numero={2} insignia={INSIGNIA}>
        De dónde sale el puntaje
      </PasoTitulo>

      <ArmarPuntaje />

      <PasoTitulo numero={3} insignia={INSIGNIA}>
        Contra qué se compara
      </PasoTitulo>

      <Definicion termino="Diagnóstico confirmado">
        Lo que dictamina un profesional después de una entrevista clínica. Es
        lo que en investigación se llama{" "}
        <Termino significa="La mejor verdad disponible contra la cual se juzga si un instrumento acertó o se equivocó. No es una verdad perfecta, pero es lo mejor que hay.">
          criterio de referencia
        </Termino>
        .
      </Definicion>



      <LasFichas />

      <Comprueba
        pregunta="Un estudiante saca 14 puntos en el cuestionario. ¿Qué se puede afirmar con eso?"
        opciones={[
          {
            texto: "Que conviene evaluarlo con una entrevista",
            esCorrecta: true,
            porQue:
              "14 supera el corte de 10, así que el filtro lo marca. Eso es todo lo que dice: que vale la pena mirarlo con más detalle. Igual que el detector de metales, no decide nada por sí solo.",
          },
          {
            texto: "Que tiene depresión",
            porQue:
              "Un tamizaje no diagnostica. De hecho, en este archivo casi la mitad de los que superan el corte no tienen el diagnóstico confirmado — algo que vamos a cuantificar exactamente en el apartado 2.3.",
          },
          {
            texto: "Que tiene un 88% de probabilidad de tener depresión",
            porQue:
              "Ése es justamente el error que abre el capítulo. El 88% responde otra pregunta distinta, y confundirlas es el tema del apartado 2.6.",
          },
        ]}
      />

      <Comprueba
        pregunta="¿Por qué las fichas incluyen una columna con el diagnóstico confirmado por un profesional, si ya tienen el puntaje del cuestionario?"
        opciones={[
          {
            texto: "Porque es la única forma de saber si el tamizaje acertó o se equivocó",
            esCorrecta: true,
            porQue:
              "Sin una verdad contra la cual comparar, un instrumento no se puede evaluar. Esa columna es el criterio de referencia: permite contar cuántas veces el filtro dio la alarma correcta y cuántas se equivocó. Todo el capítulo se apoya en esa comparación.",
          },
          {
            texto: "Para tener un dato de respaldo por si el cuestionario falla",
            porQue:
              "No es un respaldo: es la referencia. El cuestionario no «falla» y se reemplaza por la entrevista — el cuestionario decide a quién entrevistar, y la entrevista dice la verdad.",
          },
          {
            texto: "Porque el cuestionario solo sirve para casos leves",
            porQue:
              "El cuestionario no distingue gravedad para decidir: aplica el mismo corte a todos. Su límite no es la gravedad del caso, sino que filtra en vez de diagnosticar.",
          },
        ]}
      />

      <Trampa
        error="leer un resultado positivo como si fuera un diagnóstico"
        porQue="la palabra «positivo» suena a veredicto, y el número que acompaña al instrumento (88% de acierto) refuerza esa lectura."
        correccion="un tamizaje decide a quién revisar, no quién está enfermo. El diagnóstico lo hace después un profesional en entrevista — y por eso el archivo tiene esa columna aparte."
      />

      <Puente
        etiquetaBoton="Ir a 2.1 · Espacio muestral"
        onContinuar={onContinuar}
      >
        <p>
          Ya sabemos qué mide el cuestionario, de dónde sale su puntaje y qué
          contiene cada ficha. Con eso alcanza para empezar.
        </p>
        <p>
          Pero antes de calcular una sola probabilidad hay que delimitar con
          precisión de qué estamos hablando: qué es un experimento aleatorio,
          cuáles son sus resultados posibles y qué es exactamente un evento.
        </p>
      </Puente>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Armar un puntaje: de dónde sale el rango 0 a 27                     */
/* ------------------------------------------------------------------ */

function ArmarPuntaje() {
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
        <div className="flex gap-2">
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

function LasFichas() {
  const total = ESTUDIANTES.length;
  const ejemplo = ESTUDIANTES[0];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <h4 className="font-serif text-lg font-semibold text-slate-900 dark:text-slate-100">
        Las {total} fichas con las que vamos a trabajar
      </h4>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        Todos los números de este capítulo salen de estas fichas: {total}{" "}
        estudiantes que respondieron dos cuestionarios y que además fueron
        entrevistados por un profesional. Cada ficha tiene tres datos:
      </p>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <th className="py-2 pr-4 font-semibold text-slate-700 dark:text-slate-300">
                Dato
              </th>
              <th className="py-2 pr-4 font-semibold text-slate-700 dark:text-slate-300">
                Qué contiene
              </th>
              <th className="py-2 font-semibold text-slate-700 dark:text-slate-300">
                Ficha #{ejemplo.id}
              </th>
            </tr>
          </thead>
          <tbody className="text-slate-600 dark:text-slate-400">
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <td className="py-2.5 pr-4 font-medium text-slate-800 dark:text-slate-200">
                Puntaje de depresión
              </td>
              <td className="py-2.5 pr-4">
                El cuestionario de 9 preguntas. De 0 a 27.
              </td>
              <td className="py-2.5 tabular-nums">{ejemplo.phq9}</td>
            </tr>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <td className="py-2.5 pr-4 font-medium text-slate-800 dark:text-slate-200">
                Puntaje de ansiedad
              </td>
              <td className="py-2.5 pr-4">
                Un cuestionario hermano, de 7 preguntas. De 0 a 21.
              </td>
              <td className="py-2.5 tabular-nums">{ejemplo.gad7}</td>
            </tr>
            <tr>
              <td className="py-2.5 pr-4 font-medium text-slate-800 dark:text-slate-200">
                Diagnóstico confirmado
              </td>
              <td className="py-2.5 pr-4">
                Lo que dictaminó el profesional en la entrevista.
              </td>
              <td className="py-2.5">{ejemplo.dxConfirmado ? "Sí" : "No"}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <MiniHistoria titulo="Por qué hay dos cuestionarios y no uno">
        Tener depresión y ansiedad medidas en las mismas personas permite
        hacerse una pregunta que la probabilidad sí puede responder: si
        alguien da positivo en uno, ¿cambia eso la chance de que dé positivo
        en el otro? Esa pregunta se llama <strong>independencia</strong>, y la
        vamos a resolver en el apartado 2.5.
      </MiniHistoria>
    </div>
  );
}
