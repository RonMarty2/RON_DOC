"use client";

import { useMemo, useState } from "react";
import {
  ESTUDIANTES,
  CORTE_TAMIZAJE,
  DEMANDA_SEMANAL,
} from "@content/aula-probabilidad/dataset";
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

function LasFichas() {
  const total = ESTUDIANTES.length;
  const [indice, setIndice] = useState(0);
  const f = ESTUDIANTES[indice];

  const dioPositivoDep = f.phq9 >= CORTE_TAMIZAJE;
  const dioPositivoAns = f.gad7 >= CORTE_TAMIZAJE;

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

  return (
    <div className="flex flex-col gap-4">
      <DeDondeSalenLas200 />

      <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h4 className="font-serif text-lg font-semibold text-slate-900 dark:text-slate-100">
            Mirá una ficha por dentro
          </h4>
          <button
            type="button"
            onClick={otraFicha}
            className="rounded-full bg-slate-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 dark:bg-slate-600 dark:hover:bg-slate-500"
          >
            Ver otra ficha →
          </button>
        </div>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Cada uno de los {total} estudiantes tiene una ficha con cuatro
          datos. Así se lee la del estudiante #{f.id}:
        </p>

        {/* Los cuatro datos, explicados en palabras */}
        <div className="mt-4 flex flex-col gap-3">
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
          <FilaFicha
            titulo="Expediente"
            valor={f.expedienteCompleto ? "OK" : "!"}
            rango="completo o incompleto"
            lectura={
              f.expedienteCompleto
                ? "El legajo administrativo de este estudiante está completo: no le falta ningún dato ni firma."
                : "A este legajo le falta algún dato. No afecta al cuestionario, pero sí complica el seguimiento — y en el apartado 2.8 vamos a auditar justamente cuántos expedientes incompletos hay."
            }
            positivo={!f.expedienteCompleto}
          />
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
        </div>

        {/* Veredicto de esta ficha */}
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

        {/* Atajos a los cuatro casos posibles */}
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
      </div>

      <MiniHistoria titulo="Por qué hay dos cuestionarios y no uno">
        Tener depresión y ansiedad medidas en las mismas personas permite
        hacerse una pregunta que la probabilidad sí puede responder: si alguien
        da positivo en uno, ¿cambia eso la chance de que dé positivo en el
        otro? Esa pregunta se llama <strong>independencia</strong>, y la vamos a
        resolver en el apartado 2.5.
      </MiniHistoria>

      <ElOtroArchivo />

      <PuenteALaProbabilidad />
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
    id: "diagnostico",
    pregunta: "¿Y de que realmente tenga el trastorno?",
    universo: () => true,
    cumple: (e) => e.dxConfirmado,
    cierre:
      "Mismo procedimiento, otra pregunta. Este número tiene nombre propio: se llama prevalencia, y va a ser decisivo en el apartado 2.6.",
  },
  {
    id: "vpp",
    pregunta:
      "De los que dieron positivo, ¿cuántos lo tenían de verdad?",
    universo: (e) => e.phq9 >= CORTE_TAMIZAJE,
    cumple: (e) => e.phq9 >= CORTE_TAMIZAJE && e.dxConfirmado,
    cierre:
      "Acá cambió el denominador: ya no son las 200 fichas, son sólo las que dieron positivo. Y fijate el resultado — es exactamente el número del misterio con el que abrimos.",
  },
];

function PuenteALaProbabilidad() {
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
function DeDondeSalenLas200() {
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
function ElOtroArchivo() {
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
