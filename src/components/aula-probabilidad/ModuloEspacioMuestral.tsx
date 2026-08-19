"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ESTUDIANTES } from "@content/aula-probabilidad/dataset";
import { entero } from "./aleatorio";
import {
  Definicion,
  MiniHistoria,
  Trampa,
  Puente,
  Termino,
  Comprueba,
  PasoTitulo,
} from "./narrativa";

const INSIGNIA = "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300";
import { BarraSim } from "./BarraSim";

const CARAS_DADO = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

/**
 * 2.1 — Espacio muestral, universo, suceso.
 *
 * Patrón de libro en todo el módulo: se define el término (corto, sin
 * ejemplo) y recién después aparece el interactivo que lo ejemplifica.
 */
export function ModuloEspacioMuestral({
  onContinuar,
}: {
  onContinuar: () => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      <PasoTitulo numero={1} insignia={INSIGNIA}>
        El vocabulario base
      </PasoTitulo>

      <Definicion termino="Experimento aleatorio">
        Un procedimiento cuyo resultado no se puede predecir con certeza,
        aunque se conozcan de antemano todos los resultados posibles.
      </Definicion>

      <Definicion termino="Espacio muestral (S)">
        El conjunto de todos los resultados posibles de un experimento
        aleatorio. Para un dado: S = {"{1, 2, 3, 4, 5, 6}"}.
      </Definicion>

      <UnDadoInteractivo />

      <MiniHistoria titulo="Universo ≠ espacio muestral">
        El universo son las personas u objetos (ej. 2,400 estudiantes). El
        espacio muestral son los resultados posibles de un experimento hecho
        sobre ellos (ej. los 28 puntajes de un test). No es lo mismo.
      </MiniHistoria>

      <PasoTitulo numero={2} insignia={INSIGNIA}>
        Cuando el experimento tiene varias partes
      </PasoTitulo>

      <Definicion termino="Espacio muestral compuesto">
        Cuando el experimento tiene varias partes (ej. dos dados), S es el
        conjunto de todos los resultados combinados. Con dos dados: 36 pares
        posibles.
      </Definicion>

      <DosDadosInteractivo />

      <PasoTitulo numero={3} insignia={INSIGNIA}>
        Aplicado al cuestionario
      </PasoTitulo>

      <Definicion termino="Aplicado: el espacio muestral del PHQ-9">
        El PHQ-9 tiene 9 preguntas de 0 a 3 puntos. Su espacio muestral es S ={" "}
        {"{0, 1, ..., 27}"}, 28 valores posibles.
      </Definicion>

      <TamizajeInteractivo />

      <Comprueba
        pregunta="El servicio va a tamizar a los 2.400 estudiantes de la universidad con el cuestionario. ¿Cuál es el espacio muestral de ese experimento?"
        pista="Preguntate qué se está listando: ¿personas, o resultados?"
        opciones={[
          {
            texto: "Los 28 puntajes posibles, de 0 a 27",
            esCorrecta: true,
            porQue:
              "El experimento es «aplicar el cuestionario a alguien», y sus resultados posibles son los puntajes. El espacio muestral siempre lista RESULTADOS, no personas.",
          },
          {
            texto: "Los 2.400 estudiantes",
            porQue:
              "Ése es el universo o población: el conjunto de personas sobre las que queremos concluir. No es lo mismo que el conjunto de resultados posibles del experimento — confundirlos es el primer error del capítulo.",
          },
          {
            texto: "Dar positivo o dar negativo",
            porQue:
              "Ésos son dos eventos (subconjuntos del espacio muestral), no el espacio muestral completo. «Dar positivo» agrupa 18 puntajes distintos, del 10 al 27.",
          },
        ]}
      />

      <Comprueba
        pregunta="En el dado, el evento «sacar un número par» es {2, 4, 6}. ¿Qué tipo de evento es?"
        opciones={[
          {
            texto: "Compuesto: agrupa varios puntos muestrales",
            esCorrecta: true,
            porQue:
              "Contiene tres resultados distintos, y cualquiera de los tres lo hace ocurrir. Un evento es simple sólo cuando contiene un único punto muestral, como «sacar exactamente 4».",
          },
          {
            texto: "Simple, porque describe una sola condición",
            porQue:
              "Lo que define simple o compuesto no es cómo se enuncia el evento, sino cuántos resultados contiene. «Ser par» suena a una sola cosa, pero abarca tres resultados del espacio muestral.",
          },
          {
            texto: "Seguro, porque siempre puede salir un par",
            porQue:
              "El evento seguro es el que ocurre SIEMPRE, o sea el que contiene las seis caras. Con {2, 4, 6} puede perfectamente salir un impar y el evento no ocurre.",
          },
        ]}
      />

      <Trampa
        error="confundir el universo con el espacio muestral"
        porQue="las dos palabras suenan a «todo lo que hay», y en los ejemplos sencillos casi coinciden."
        correccion="preguntarse qué se está listando: si son personas u objetos, es el universo; si son resultados posibles del experimento, es el espacio muestral."
      />

      <Puente
        etiquetaBoton="Ir a 2.2 · Tipos de probabilidad"
        onContinuar={onContinuar}
      >
        <p>
          Ya tenemos el vocabulario: experimento, espacio muestral, punto
          muestral, evento. Sabemos delimitar de qué estamos hablando.
        </p>
        <p>
          Falta lo principal: de dónde sale el <strong>número</strong> que
          llamamos probabilidad. Y resulta que hay tres formas legítimas de
          conseguirlo, que no compiten entre sí.
        </p>
      </Puente>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Un dado: tirada por tirada + armador de sucesos                    */
/* ------------------------------------------------------------------ */

function UnDadoInteractivo() {
  const [historial, setHistorial] = useState<number[]>([]);
  const [caraVisible, setCaraVisible] = useState<number | null>(null);
  const [rodando, setRodando] = useState(false);
  const [evento, setEvento] = useState<Set<number>>(new Set());
  const intervaloRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (intervaloRef.current !== null) window.clearInterval(intervaloRef.current);
    };
  }, []);

  function tirarUnaVez() {
    if (rodando) return;
    setRodando(true);
    let vueltas = 0;
    const totalVueltas = 8;
    intervaloRef.current = window.setInterval(() => {
      setCaraVisible(entero(1, 6));
      vueltas++;
      if (vueltas >= totalVueltas) {
        if (intervaloRef.current !== null) window.clearInterval(intervaloRef.current);
        const resultadoFinal = entero(1, 6);
        setCaraVisible(resultadoFinal);
        setHistorial((h) => [...h, resultadoFinal]);
        setRodando(false);
      }
    }, 70);
  }

  function tirarLote(n: number) {
    if (rodando) return;
    const nuevos = Array.from({ length: n }, () => entero(1, 6));
    setHistorial((h) => [...h, ...nuevos]);
    setCaraVisible(nuevos[nuevos.length - 1]);
  }

  function reset() {
    if (intervaloRef.current !== null) window.clearInterval(intervaloRef.current);
    setHistorial([]);
    setCaraVisible(null);
    setRodando(false);
    setEvento(new Set());
  }

  function toggleCara(cara: number) {
    setEvento((prev) => {
      const next = new Set(prev);
      if (next.has(cara)) next.delete(cara);
      else next.add(cara);
      return next;
    });
  }

  const total = historial.length;
  const conteos = useMemo(() => {
    const c = [0, 0, 0, 0, 0, 0];
    for (const v of historial) c[v - 1]++;
    return c;
  }, [historial]);

  const caraTop = total > 0 ? conteos.indexOf(Math.max(...conteos)) + 1 : null;
  const vecesEvento = [...evento].reduce((s, cara) => s + conteos[cara - 1], 0);
  const pctEvento = total > 0 ? (vecesEvento / total) * 100 : 0;
  const nombreEvento =
    evento.size === 0
      ? "evento imposible"
      : evento.size === 6
        ? "evento seguro"
        : evento.size === 1
          ? "evento simple"
          : "evento compuesto";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h4 className="font-serif text-lg font-semibold text-slate-900 dark:text-slate-100">
          Tirá el dado
        </h4>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled={rodando}
            onClick={tirarUnaVez}
            className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            🎲 Tirar 1 vez
          </button>
          <button
            type="button"
            disabled={rodando}
            onClick={() => tirarLote(10)}
            className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300"
          >
            Tirar 10 más
          </button>
          <button
            type="button"
            disabled={rodando}
            onClick={() => tirarLote(100)}
            className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300"
          >
            Tirar 100 más
          </button>
          <button
            type="button"
            onClick={reset}
            className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Reiniciar
          </button>
        </div>
      </div>

      {/* El dado "rodando" */}
      <div className="mt-6 flex justify-center">
        <div
          className={
            "grid h-20 w-20 place-items-center rounded-2xl border-2 border-blue-600 bg-blue-50 text-5xl shadow-sm transition-transform dark:bg-blue-950/40 " +
            (rodando ? "scale-95" : "scale-100")
          }
        >
          {caraVisible === null ? "🎲" : CARAS_DADO[caraVisible - 1]}
        </div>
      </div>

      {/* Tabla de frecuencias EN VIVO */}
      <div className="mt-6 flex flex-col gap-2">
        {[1, 2, 3, 4, 5, 6].map((cara) => {
          const c = conteos[cara - 1];
          const pct = total > 0 ? (c / total) * 100 : 0;
          return (
            <div key={cara} className="flex items-center gap-3">
              <span className="w-8 shrink-0 text-center text-2xl" aria-hidden>
                {CARAS_DADO[cara - 1]}
              </span>
              <div className="relative h-4 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className="h-full rounded-full bg-blue-500 transition-[width] duration-200"
                  style={{ width: `${pct}%` }}
                />
                <div
                  aria-hidden
                  className="absolute top-0 h-full w-0.5 bg-slate-900/40 dark:bg-slate-100/40"
                  style={{ left: "16.666%" }}
                  title="Valor teórico: 16.7%"
                />
              </div>
              <span className="w-24 shrink-0 text-right text-xs tabular-nums text-slate-600 dark:text-slate-400">
                {c} · {pct.toFixed(1)}%
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-5 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
        {total === 0 ? (
          <p>Tirá el dado y la tabla se va a llenar sola.</p>
        ) : (
          <p>
            Van <strong className="tabular-nums">{total}</strong> tiradas. La
            cara <strong className="tabular-nums">{caraTop}</strong> salió más
            veces ({conteos[(caraTop ?? 1) - 1]} de {total} ={" "}
            {((conteos[(caraTop ?? 1) - 1] / total) * 100).toFixed(1)}%). La
            línea gris marca el valor teórico: <strong>1/6 ≈ 16.7%</strong>.
          </p>
        )}
      </div>

      {/* Definición + interactivo: punto muestral y suceso */}
      <div className="mt-6 border-t border-slate-100 pt-5 dark:border-slate-800">
        <Definicion termino="Punto muestral">
          Cada resultado individual dentro del espacio muestral. El{" "}
          {caraTop ?? "número"} que salió más seguido es un punto muestral de
          S.
        </Definicion>
      </div>

      <div className="mt-5 flex flex-col gap-5">
        <Definicion termino="Suceso o evento">
          Cualquier subconjunto de S. Un solo punto es un{" "}
          <strong>evento simple</strong>; varios puntos, un{" "}
          <strong>evento compuesto</strong>.
        </Definicion>

        <Definicion termino="Evento seguro y evento imposible">
          El <strong>evento seguro</strong> contiene todo el espacio muestral,
          así que ocurre siempre: su probabilidad es 1. El{" "}
          <strong>evento imposible</strong> no contiene ningún resultado y
          nunca ocurre: su probabilidad es 0. Son los dos extremos de la
          escala — ninguna probabilidad puede salirse de ahí.
        </Definicion>
      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Armá tu propio evento — tocá las caras que quieras incluir:
        </p>
        <div className="mt-3 flex justify-center gap-2">
          {[1, 2, 3, 4, 5, 6].map((cara) => (
            <button
              key={cara}
              type="button"
              onClick={() => toggleCara(cara)}
              className={
                "grid h-11 w-11 place-items-center rounded-lg border-2 text-2xl transition " +
                (evento.has(cara)
                  ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40"
                  : "border-slate-200 dark:border-slate-700")
              }
            >
              {CARAS_DADO[cara - 1]}
            </button>
          ))}
        </div>
        <p className="mt-2 text-center text-xs text-slate-400 dark:text-slate-500">
          Probá también los dos extremos: ninguna cara, y las seis.
        </p>
        <div className="mt-4 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
          <p>
            Tu evento es{" "}
            <strong>
              {"{"}
              {[...evento].sort((a, b) => a - b).join(", ")}
              {"}"}
            </strong>{" "}
            — <strong>{nombreEvento}</strong>.{" "}
            {total === 0 ? (
              <>Tirá el dado arriba para ver con qué frecuencia ocurre.</>
            ) : (
              <>
                Ocurrió en{" "}
                <strong className="tabular-nums">{vecesEvento}</strong> de{" "}
                <strong className="tabular-nums">{total}</strong> tiradas ={" "}
                <strong className="tabular-nums">
                  {pctEvento.toFixed(1)}%
                </strong>
                .
              </>
            )}
          </p>
          {evento.size === 0 && (
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Sin ninguna cara adentro, no hay resultado que lo haga ocurrir:
              es el evento imposible, y su probabilidad es 0 por más que tires.
            </p>
          )}
          {evento.size === 6 && (
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Con las seis caras adentro, cualquier resultado lo hace ocurrir:
              es el evento seguro, y su probabilidad es 1 (100%).
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Dos dados: espacio muestral compuesto, con tabla de doble entrada   */
/* ------------------------------------------------------------------ */

function DosDadosInteractivo() {
  const [historial, setHistorial] = useState<[number, number][]>([]);
  const [ultimo, setUltimo] = useState<[number, number] | null>(null);
  const [rodando, setRodando] = useState(false);
  const intervaloRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (intervaloRef.current !== null) window.clearInterval(intervaloRef.current);
    };
  }, []);

  function tirar() {
    if (rodando) return;
    setRodando(true);
    let vueltas = 0;
    const totalVueltas = 8;
    intervaloRef.current = window.setInterval(() => {
      setUltimo([entero(1, 6), entero(1, 6)]);
      vueltas++;
      if (vueltas >= totalVueltas) {
        if (intervaloRef.current !== null) window.clearInterval(intervaloRef.current);
        const par: [number, number] = [entero(1, 6), entero(1, 6)];
        setUltimo(par);
        setHistorial((h) => [...h, par]);
        setRodando(false);
      }
    }, 70);
  }

  function reset() {
    if (intervaloRef.current !== null) window.clearInterval(intervaloRef.current);
    setHistorial([]);
    setUltimo(null);
    setRodando(false);
  }

  const conteos = useMemo(() => {
    const m = new Map<string, number>();
    for (const [a, b] of historial) {
      const k = `${a}-${b}`;
      m.set(k, (m.get(k) ?? 0) + 1);
    }
    return m;
  }, [historial]);

  const total = historial.length;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h4 className="font-serif text-lg font-semibold text-slate-900 dark:text-slate-100">
          Tirá los dos dados
        </h4>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled={rodando}
            onClick={tirar}
            className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            🎲🎲 Tirar los dos
          </button>
          <button
            type="button"
            onClick={reset}
            className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Reiniciar
          </button>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <div className="flex flex-col items-center gap-1">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Dado A
          </span>
          <div className="grid h-16 w-16 place-items-center rounded-2xl border-2 border-blue-600 bg-blue-50 text-4xl shadow-sm dark:bg-blue-950/40">
            {ultimo === null ? "🎲" : CARAS_DADO[ultimo[0] - 1]}
          </div>
        </div>
        <span className="text-xl font-semibold text-slate-400">+</span>
        <div className="flex flex-col items-center gap-1">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Dado B
          </span>
          <div className="grid h-16 w-16 place-items-center rounded-2xl border-2 border-amber-500 bg-amber-50 text-4xl shadow-sm dark:bg-amber-950/30">
            {ultimo === null ? "🎲" : CARAS_DADO[ultimo[1] - 1]}
          </div>
        </div>
      </div>

      {ultimo && (
        <p className="mt-4 text-center text-sm text-slate-600 dark:text-slate-400">
          Par{" "}
          <strong className="tabular-nums">
            ({ultimo[0]}, {ultimo[1]})
          </strong>{" "}
          → fila {ultimo[0]}, columna {ultimo[1]} en la tabla.
        </p>
      )}

      <div className="mt-5 overflow-x-auto">
        <table className="mx-auto border-collapse text-center">
          <caption className="mb-2 text-xs text-slate-500 dark:text-slate-400">
            Filas = Dado A · Columnas = Dado B
          </caption>
          <thead>
            <tr>
              <th className="p-1" />
              {[1, 2, 3, 4, 5, 6].map((b) => (
                <th key={b} className="p-1">
                  <span className="grid h-7 w-7 place-items-center rounded-md bg-amber-100 text-base font-bold tabular-nums text-amber-700 dark:bg-amber-950/50 dark:text-amber-300">
                    {b}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5, 6].map((a) => (
              <tr key={a}>
                <th className="p-1">
                  <span className="grid h-7 w-7 place-items-center rounded-md bg-blue-100 text-base font-bold tabular-nums text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
                    {a}
                  </span>
                </th>
                {[1, 2, 3, 4, 5, 6].map((b) => {
                  const c = conteos.get(`${a}-${b}`) ?? 0;
                  const esUltimo = ultimo !== null && ultimo[0] === a && ultimo[1] === b;
                  return (
                    <td
                      key={b}
                      className={
                        "h-10 w-10 rounded-md border text-sm font-semibold tabular-nums transition sm:h-11 sm:w-11 " +
                        (esUltimo
                          ? "border-blue-600 bg-blue-600 text-white ring-2 ring-blue-400"
                          : c > 0
                            ? "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300"
                            : "border-slate-200 text-slate-300 dark:border-slate-800 dark:text-slate-700")
                      }
                    >
                      {c > 0 ? c : "·"}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-center text-xs text-slate-500 dark:text-slate-500">
        {total === 0
          ? "36 casillas posibles (6 × 6). Todavía vacías."
          : `${total} tiradas anotadas. Cada casilla es cuántas veces salió esa combinación exacta.`}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Aplicado: tamizaje estudiante por estudiante, con PHQ-9 en vivo     */
/* ------------------------------------------------------------------ */

function TamizajeInteractivo() {
  const [ordenTamizaje] = useState<number[]>(() => {
    const ids = ESTUDIANTES.map((e) => e.id);
    for (let i = ids.length - 1; i > 0; i--) {
      const j = entero(0, i);
      [ids[i], ids[j]] = [ids[j], ids[i]];
    }
    return ids;
  });
  const [indice, setIndice] = useState(0);

  const revelados = useMemo(
    () =>
      ordenTamizaje
        .slice(0, indice)
        .map((id) => ESTUDIANTES.find((e) => e.id === id)!),
    [ordenTamizaje, indice]
  );

  const conteosPorPuntaje = useMemo(() => {
    const c = Array(28).fill(0);
    for (const e of revelados) c[e.phq9]++;
    return c;
  }, [revelados]);

  const positivos = revelados.filter((e) => e.phq9 >= 10).length;
  const pctPositivo = indice > 0 ? (positivos / indice) * 100 : 0;
  const ultimo = indice > 0 ? revelados[revelados.length - 1] : null;
  const maxConteoPuntaje = Math.max(1, ...conteosPorPuntaje);

  function revelar(n: number) {
    setIndice((i) => Math.min(ESTUDIANTES.length, i + n));
  }

  function reset() {
    setIndice(0);
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h4 className="font-serif text-lg font-semibold text-slate-900 dark:text-slate-100">
          Tamizá estudiantes, uno por uno
        </h4>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled={indice >= ESTUDIANTES.length}
            onClick={() => revelar(1)}
            className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            🧑‍🎓 Tamizar 1 más
          </button>
          <button
            type="button"
            disabled={indice >= ESTUDIANTES.length}
            onClick={() => revelar(20)}
            className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300"
          >
            Tamizar 20 más
          </button>
          <button
            type="button"
            disabled={indice >= ESTUDIANTES.length}
            onClick={() => revelar(200)}
            className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300"
          >
            Tamizar todos (200)
          </button>
          <button
            type="button"
            onClick={reset}
            className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Reiniciar
          </button>
        </div>
      </div>

      {ultimo && (
        <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
          Estudiante #{ultimo.id}, PHQ-9 ={" "}
          <strong className="tabular-nums">{ultimo.phq9}</strong>
          {ultimo.phq9 >= 10 ? " (positivo)" : " (negativo)"}. Llevamos{" "}
          <strong className="tabular-nums">{indice}</strong> de 200.
        </p>
      )}

      <div className="mt-5 flex flex-wrap justify-center gap-1">
        {Array.from({ length: 28 }, (_, v) => v).map((v) => {
          const c = conteosPorPuntaje[v];
          const zonaPositiva = v >= 10;
          const esUltimo = ultimo?.phq9 === v;
          const intensidad = c > 0 ? 0.2 + 0.7 * (c / maxConteoPuntaje) : 0;
          return (
            <div
              key={v}
              title={`Puntaje ${v}: ${c} estudiante(s)`}
              className={
                "grid h-9 w-9 place-items-center rounded-md border text-[11px] font-semibold tabular-nums transition sm:h-10 sm:w-10 " +
                (esUltimo
                  ? "scale-110 border-blue-600 ring-2 ring-blue-400"
                  : zonaPositiva
                    ? "border-slate-300 dark:border-slate-700"
                    : "border-slate-200 dark:border-slate-800")
              }
              style={
                c > 0
                  ? {
                      backgroundColor: zonaPositiva
                        ? `rgba(217, 119, 6, ${intensidad})`
                        : `rgba(37, 99, 235, ${intensidad})`,
                      color: intensidad > 0.45 ? "white" : undefined,
                    }
                  : undefined
              }
            >
              {c > 0 ? c : v}
            </div>
          );
        })}
      </div>
      <p className="mt-1 text-center text-xs text-slate-400 dark:text-slate-500">
        Naranja = zona de tamizaje positivo (≥10). El número en cada casilla
        es cuántos estudiantes reales dieron ese puntaje exacto.
      </p>

      <div className="mt-5">
        <BarraSim
          etiqueta="Proporción que tamiza positivo (PHQ-9 ≥ 10)"
          porcentaje={pctPositivo}
          esperadoPct={21.5}
          color="ambar"
        />
      </div>
      <div className="mt-3 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
        {indice === 0 ? (
          <p>Tamizá al primer estudiante y el cálculo va a aparecer aquí.</p>
        ) : (
          <p>
            <strong className="tabular-nums">{positivos}</strong> de{" "}
            <strong className="tabular-nums">{indice}</strong> dieron positivo
            ={" "}
            <strong className="tabular-nums">
              {pctPositivo.toFixed(1)}%
            </strong>
            . El valor real en las 200 fichas es <strong>21.5%</strong>.
          </p>
        )}
      </div>
    </div>
  );
}
