"use client";

import { useState } from "react";
import { tablaConfusion } from "./calculos";
import {
  Definicion,
  Frac,
  V,
  Trampa,
  Puente,
  MiniHistoria,
  Desarrollo,
  Termino,
  Comprueba,
  PasoTitulo,
} from "./narrativa";

const INSIGNIA = "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300";
const ACENTO = "border-indigo-300 text-indigo-700 dark:border-indigo-700 dark:text-indigo-300";

type Celda = "VP" | "FP" | "FN" | "VN";

interface Pregunta {
  id: string;
  tipo: "conjunta" | "marginal" | "condicional";
  pregunta: string;
  /** Celdas que van en el numerador. */
  num: Celda[];
  /** Celdas que van en el denominador. */
  den: Celda[];
  nombre?: string;
  lectura: string;
}

const PREGUNTAS: Pregunta[] = [
  {
    id: "conjunta",
    tipo: "conjunta",
    pregunta: "Del total, ¿qué fracción dio positivo Y tenía el diagnóstico?",
    num: ["VP"],
    den: ["VP", "FP", "FN", "VN"],
    lectura:
      "Es una probabilidad conjunta: el denominador es el total general, porque preguntamos qué parte de TODOS cae en esa celda.",
  },
  {
    id: "marginal",
    tipo: "marginal",
    pregunta: "Del total, ¿qué fracción dio positivo?",
    num: ["VP", "FP"],
    den: ["VP", "FP", "FN", "VN"],
    lectura:
      "Es una probabilidad marginal: se lee en el margen de la tabla, ignorando por completo la otra variable.",
  },
  {
    id: "sensibilidad",
    tipo: "condicional",
    pregunta: "De los que SÍ tienen el diagnóstico, ¿a cuántos detectó el test?",
    num: ["VP"],
    den: ["VP", "FN"],
    nombre: "Sensibilidad",
    lectura:
      "Ya sabemos que la persona tiene el diagnóstico, así que el denominador es sólo esa columna. Mide qué tan bueno es el instrumento para no dejar escapar casos.",
  },
  {
    id: "especificidad",
    tipo: "condicional",
    pregunta: "De los que NO lo tienen, ¿a cuántos descartó correctamente?",
    num: ["VN"],
    den: ["FP", "VN"],
    nombre: "Especificidad",
    lectura:
      "Ya sabemos que la persona está sana, así que el denominador es la otra columna. Mide qué tan poco se equivoca dando falsas alarmas.",
  },
  {
    id: "vpp",
    tipo: "condicional",
    pregunta: "De los que dieron positivo, ¿cuántos tenían realmente el diagnóstico?",
    num: ["VP"],
    den: ["VP", "FP"],
    nombre: "Valor predictivo positivo (VPP)",
    lectura:
      "Ésta es la pregunta del estudiante, no la del instrumento. Lo único que sabemos es que dio positivo, así que el denominador es esa FILA. Mismo numerador que la sensibilidad, denominador distinto: por eso dan números distintos.",
  },
];

/**
 * 2.3 — Tablas de contingencia.
 *
 * El apartado donde por fin se definen sensibilidad, especificidad y VPP —
 * pero no como tres palabras parecidas, sino como tres preguntas con tres
 * denominadores que se iluminan en la tabla al elegirlas.
 */
export function ModuloTablasContingencia({
  onContinuar,
}: {
  onContinuar: () => void;
}) {
  const [activa, setActiva] = useState<string>("sensibilidad");
  const t = tablaConfusion();
  const p = PREGUNTAS.find((q) => q.id === activa)!;

  const valores: Record<Celda, number> = {
    VP: t.VP,
    FP: t.FP,
    FN: t.FN,
    VN: t.VN,
  };
  const numerador = p.num.reduce((s, c) => s + valores[c], 0);
  const denominador = p.den.reduce((s, c) => s + valores[c], 0);
  const resultado = denominador > 0 ? numerador / denominador : 0;

  return (
    <div className="flex flex-col gap-6">
      <p className="text-slate-700 dark:text-slate-300">
        Un tamizaje se puede equivocar de dos formas distintas, y no son igual
        de graves: puede marcar a alguien que está sano (<strong>falsa
        alarma</strong>) o dejar pasar a alguien que necesitaba ayuda (
        <strong>caso perdido</strong>). Para ver los dos errores a la vez hay
        que cruzar lo que dijo el test contra lo que era verdad.
      </p>

      <PasoTitulo numero={1} insignia={INSIGNIA}>
        Cruzar lo que dijo el test contra lo que era verdad
      </PasoTitulo>

      <Definicion termino="Tabla de contingencia">
        Una tabla que organiza el conteo conjunto de dos variables
        categóricas en filas y columnas. De ella se leen tres tipos de
        probabilidad, y se distinguen únicamente por el denominador.
      </Definicion>

      <TablaInteractiva
        t={t}
        pregunta={p}
        preguntas={PREGUNTAS}
        activa={activa}
        setActiva={setActiva}
        numerador={numerador}
        denominador={denominador}
        resultado={resultado}
      />

      <PasoTitulo numero={2} insignia={INSIGNIA}>
        Tres probabilidades, tres denominadores
      </PasoTitulo>

      <div className="grid gap-4 sm:grid-cols-3">
        <Definicion termino="Conjunta">
          <V>P</V>(<V>A</V> ∩ <V>B</V>): qué parte del <strong>total</strong>{" "}
          cae en las dos categorías a la vez. Denominador: el total general.
        </Definicion>
        <Definicion termino="Marginal">
          <V>P</V>(<V>A</V>): qué parte del <strong>total</strong> cae en una
          categoría, ignorando la otra. Denominador: el total general.
        </Definicion>
        <Definicion termino="Condicional">
          <V>P</V>(<V>A</V> | <V>B</V>): dentro de un{" "}
          <strong>subgrupo ya fijado</strong>, qué parte cae ahí. Denominador:
          el total de ese subgrupo.
        </Definicion>
      </div>

      <MiniHistoria titulo="La condicional comparte numerador con la conjunta">
        Fijate en la tabla: la conjunta y la sensibilidad usan la{" "}
        <strong>misma celda</strong> arriba ({t.VP} verdaderos positivos). Lo
        único que cambia es el denominador — {t.total} contra {t.dxSi}. Por eso
        calcular una creyendo que se calcula la otra es el error más común de
        todo el apartado.
      </MiniHistoria>

      <PasoTitulo numero={3} insignia={INSIGNIA}>
        Los tres números, calculados
      </PasoTitulo>

      <Desarrollo
        titulo="Sensibilidad — la pregunta del instrumento"
        insignia={INSIGNIA}
        acento={ACENTO}
        pasos={[
          {
            expresion: (
              <>
                <Termino significa="De todas las personas que SÍ tienen la condición, qué proporción detecta el test. Es una propiedad del instrumento, y es lo que reportan los manuales.">
                  Sensibilidad
                </Termino>{" "}
                = <V>P</V>(positivo | Dx sí)
              </>
            ),
            explicacion:
              "Ya sabemos que la persona tiene el diagnóstico. Esa condición conocida va al denominador: sólo miramos la columna «Dx: sí».",
          },
          {
            expresion: (
              <>
                =
                <Frac arriba={<>VP</>} abajo={<>VP + FN</>} />
                =
                <Frac arriba={t.VP} abajo={<>{t.VP} + {t.FN}</>} />
              </>
            ),
            explicacion: `Arriba, los que el test detectó (${t.VP}). Abajo, todos los que tenían el diagnóstico: los detectados más los que se escaparon (${t.VP} + ${t.FN}).`,
          },
          {
            expresion: (
              <>
                =
                <Frac arriba={t.VP} abajo={t.dxSi} /> = {t.sensibilidad.toFixed(3)} ={" "}
                {(t.sensibilidad * 100).toFixed(1)}%
              </>
            ),
            explicacion:
              "No es un número elegido para el ejercicio: es exactamente el 88% que reportaron Kroenke, Spitzer y Williams en el estudio de validación original de 2001.",
          },
        ]}
      />

      <Desarrollo
        titulo="Valor predictivo positivo — la pregunta del estudiante"
        insignia={INSIGNIA}
        acento={ACENTO}
        pasos={[
          {
            expresion: (
              <>
                <Termino significa="De todos los que dieron positivo, qué proporción realmente tiene la condición. Depende de la población, no sólo del test.">
                  VPP
                </Termino>{" "}
                = <V>P</V>(Dx sí | positivo)
              </>
            ),
            explicacion:
              "Ahora la condición conocida es otra: lo único que sabemos es que el test dio positivo. Así que el denominador cambia de columna a FILA.",
          },
          {
            expresion: (
              <>
                =
                <Frac arriba={<>VP</>} abajo={<>VP + FP</>} />
                =
                <Frac arriba={t.VP} abajo={<>{t.VP} + {t.FP}</>} />
              </>
            ),
            explicacion: `Arriba va el MISMO número que en la sensibilidad (${t.VP}). Lo único que cambió es el denominador: ahora son los ${t.positivos} que dieron positivo, no los ${t.dxSi} que tenían el diagnóstico.`,
          },
          {
            expresion: (
              <>
                =
                <Frac arriba={t.VP} abajo={t.positivos} /> = {t.vpp.toFixed(3)} ={" "}
                {(t.vpp * 100).toFixed(1)}%
              </>
            ),
            explicacion:
              "Mismo numerador, denominador distinto, resultado radicalmente distinto: 88% contra 51,2%. Éste es el número del misterio con el que abrimos el capítulo.",
          },
        ]}
      />

      <Comprueba
        pregunta={`De los ${t.total} estudiantes, ${t.VN} dieron negativo y estaban efectivamente sanos. Si querés calcular la especificidad, ¿cuál es el denominador correcto?`}
        pista="Preguntate qué condición se conoce de antemano en la definición de especificidad."
        opciones={[
          {
            texto: `${t.dxNo} — todos los que NO tienen el diagnóstico`,
            esCorrecta: true,
            porQue: `La especificidad pregunta «de los sanos, ¿a cuántos descarté?». La condición conocida es estar sano, así que el denominador es esa columna completa: ${t.VN} descartados bien más ${t.FP} falsas alarmas = ${t.dxNo}.`,
          },
          {
            texto: `${t.total} — el total de fichas`,
            porQue: `Ése sería el denominador de una probabilidad conjunta o marginal. Usar el total general en una condicional es el segundo error más común del apartado: el ${t.total} es el número más visible de la tabla y por eso se cuela.`,
          },
          {
            texto: `${t.negativos} — todos los que dieron negativo`,
            porQue: `Ése es el denominador del valor predictivo NEGATIVO, que responde otra pregunta: «de los que dieron negativo, ¿cuántos estaban realmente sanos?». Condiciona por el resultado del test, no por el estado real.`,
          },
        ]}
      />

      <Trampa
        error={<>confundir <V>P</V>(<V>A</V>|<V>B</V>) con <V>P</V>(<V>B</V>|<V>A</V>)</>}
        porQue="las dos comparten numerador y se describen coloquialmente igual («la precisión del test»). Sólo cambia el denominador, y ese cambio es invisible si uno no mira la tabla."
        correccion="decir en palabras cuál es la condición que YA se conoce — eso va siempre en el denominador. Si ya sabemos que dio positivo, el denominador son los que dieron positivo."
      />

      <Trampa
        error="usar el total general como denominador de una condicional"
        porQue="200 es el número más visible de la tabla, y aparece en las dos primeras preguntas."
        correccion="el denominador de una condicional es siempre el total marginal del evento ya conocido — la fila o la columna — nunca el total de la tabla."
      />

      <Puente
        etiquetaBoton="Ir a 2.4 · Teoría combinatoria"
        onContinuar={onContinuar}
      >
        <p>
          La tabla nos dejó un número incómodo: {t.positivos} estudiantes
          marcados como positivos, de los cuales sólo la mitad tiene realmente
          el trastorno. Y el servicio no tiene capacidad para entrevistar a
          todos esta semana.
        </p>
        <p>
          Si hay que elegir a 5 de esos {t.positivos}, ¿de cuántas formas
          distintas se puede armar ese grupo? Contar posibilidades cuando son
          muchas exige una técnica propia.
        </p>
      </Puente>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* La tabla 2×2, con numerador y denominador iluminados                */
/* ------------------------------------------------------------------ */

function TablaInteractiva({
  t,
  pregunta,
  preguntas,
  activa,
  setActiva,
  numerador,
  denominador,
  resultado,
}: {
  t: ReturnType<typeof tablaConfusion>;
  pregunta: Pregunta;
  preguntas: Pregunta[];
  activa: string;
  setActiva: (id: string) => void;
  numerador: number;
  denominador: number;
  resultado: number;
}) {
  function estilo(celda: Celda) {
    const enNum = pregunta.num.includes(celda);
    const enDen = pregunta.den.includes(celda);
    if (enNum)
      return "border-blue-600 bg-blue-600 text-white";
    if (enDen)
      return "border-amber-400 bg-amber-100 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200";
    return "border-slate-200 bg-white text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-600";
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
        Elegí una pregunta y mirá qué parte de la tabla se usa para
        responderla:
      </p>
      <div className="mt-3 flex flex-col gap-1.5">
        {preguntas.map((q) => (
          <button
            key={q.id}
            type="button"
            onClick={() => setActiva(q.id)}
            aria-pressed={activa === q.id}
            className={
              "rounded-lg border px-3 py-2 text-left text-sm transition " +
              (activa === q.id
                ? "border-blue-600 bg-blue-50 font-medium text-blue-900 dark:bg-blue-950/40 dark:text-blue-200"
                : "border-slate-200 text-slate-600 hover:border-blue-300 dark:border-slate-700 dark:text-slate-400")
            }
          >
            {q.pregunta}
            {q.nombre && (
              <span className="ml-2 font-mono text-xs uppercase tracking-wider text-slate-400">
                {q.nombre}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tabla 2x2 con márgenes */}
      <div className="mt-5 overflow-x-auto">
        <table className="mx-auto border-collapse text-center text-sm">
          <thead>
            <tr>
              <th />
              <th className="px-3 py-2 font-semibold text-slate-700 dark:text-slate-300">
                Dx: sí
              </th>
              <th className="px-3 py-2 font-semibold text-slate-700 dark:text-slate-300">
                Dx: no
              </th>
              <th className="px-3 py-2 text-xs font-medium text-slate-400">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="px-3 py-2 text-right font-semibold text-slate-700 dark:text-slate-300">
                Test +
              </th>
              <td className="p-1">
                <div className={"grid h-16 w-20 place-content-center rounded-lg border-2 transition " + estilo("VP")}>
                  <span className="font-serif text-2xl font-semibold tabular-nums">{t.VP}</span>
                  <span className="text-[10px] uppercase tracking-wider opacity-80">VP</span>
                </div>
              </td>
              <td className="p-1">
                <div className={"grid h-16 w-20 place-content-center rounded-lg border-2 transition " + estilo("FP")}>
                  <span className="font-serif text-2xl font-semibold tabular-nums">{t.FP}</span>
                  <span className="text-[10px] uppercase tracking-wider opacity-80">FP</span>
                </div>
              </td>
              <td className="px-3 tabular-nums text-slate-500 dark:text-slate-400">
                {t.positivos}
              </td>
            </tr>
            <tr>
              <th className="px-3 py-2 text-right font-semibold text-slate-700 dark:text-slate-300">
                Test −
              </th>
              <td className="p-1">
                <div className={"grid h-16 w-20 place-content-center rounded-lg border-2 transition " + estilo("FN")}>
                  <span className="font-serif text-2xl font-semibold tabular-nums">{t.FN}</span>
                  <span className="text-[10px] uppercase tracking-wider opacity-80">FN</span>
                </div>
              </td>
              <td className="p-1">
                <div className={"grid h-16 w-20 place-content-center rounded-lg border-2 transition " + estilo("VN")}>
                  <span className="font-serif text-2xl font-semibold tabular-nums">{t.VN}</span>
                  <span className="text-[10px] uppercase tracking-wider opacity-80">VN</span>
                </div>
              </td>
              <td className="px-3 tabular-nums text-slate-500 dark:text-slate-400">
                {t.negativos}
              </td>
            </tr>
            <tr>
              <th className="px-3 py-2 text-right text-xs font-medium text-slate-400">
                Total
              </th>
              <td className="tabular-nums text-slate-500 dark:text-slate-400">{t.dxSi}</td>
              <td className="tabular-nums text-slate-500 dark:text-slate-400">{t.dxNo}</td>
              <td className="tabular-nums font-semibold text-slate-700 dark:text-slate-300">
                {t.total}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs">
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-sm bg-blue-600" />
          <span className="text-slate-600 dark:text-slate-400">Numerador</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-sm bg-amber-300" />
          <span className="text-slate-600 dark:text-slate-400">
            Resto del denominador
          </span>
        </span>
      </div>

      <div className="mt-4 rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800/60">
        <p className="font-serif text-2xl font-semibold tabular-nums text-slate-900 dark:text-slate-100">
          {numerador} / {denominador} = {(resultado * 100).toFixed(1)}%
        </p>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          {pregunta.lectura}
        </p>
      </div>
    </div>
  );
}
