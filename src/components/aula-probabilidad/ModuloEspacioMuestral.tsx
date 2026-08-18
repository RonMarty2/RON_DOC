"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ESTUDIANTES } from "@content/aula-probabilidad/dataset";
import { entero } from "./aleatorio";
import { RecuadroClasico, RecuadroCaso, MiniHistoria } from "./narrativa";
import { BarraSim } from "./BarraSim";

const CARAS_DADO = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

/**
 * 2.1 — Espacio muestral, universo, suceso.
 *
 * Todo el módulo se construye tirada-por-tirada / estudiante-por-estudiante:
 * el resultado se anota en una tabla que crece en vivo y la probabilidad se
 * recalcula delante de la clase, nunca se muestra ya resuelta.
 */
export function ModuloEspacioMuestral() {
  return (
    <div className="flex flex-col gap-8">
      <RecuadroClasico titulo="Un dado: el espacio muestral más simple">
        <p>
          Un <strong>experimento aleatorio</strong> es cualquier procedimiento
          cuyo resultado no se puede predecir con certeza, aunque conozcamos
          de antemano todos los resultados posibles. El <strong>espacio
          muestral (S)</strong> es exactamente ese conjunto de resultados
          posibles: para un dado, S = {"{1, 2, 3, 4, 5, 6}"}. Vamos a
          construirlo tirando de verdad, no a mirarlo ya hecho.
        </p>
      </RecuadroClasico>

      <UnDadoInteractivo />

      <MiniHistoria titulo="Universo ≠ espacio muestral">
        El <strong>universo</strong> son las personas u objetos (ej. los
        2,400 estudiantes de una universidad). El{" "}
        <strong>espacio muestral</strong> son los resultados posibles de un
        experimento hecho sobre ellos (ej. los 28 puntajes que puede dar un
        test). Confundir el conjunto de personas con el conjunto de
        resultados es el primer error del capítulo.
      </MiniHistoria>

      <DosDadosInteractivo />

      <RecuadroCaso titulo="El espacio muestral del PHQ-9: 28 puntajes posibles">
        <p>
          El PHQ-9 tiene 9 preguntas, cada una respondida de 0 a 3. El
          experimento aleatorio es &quot;aplicar el PHQ-9 a un estudiante
          elegido al azar&quot;: el espacio muestral es{" "}
          <strong>S = {"{0, 1, 2, ..., 27}"}</strong>, 28 valores posibles.
          Ahora tamizamos de verdad, uno por uno, con los 200 estudiantes
          reales del servicio — igual que hicimos con el dado.
        </p>
      </RecuadroCaso>

      <TamizajeInteractivo />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Un dado: tirada por tirada, con tabla de frecuencias en vivo        */
/* ------------------------------------------------------------------ */

function UnDadoInteractivo() {
  const [historial, setHistorial] = useState<number[]>([]);
  const [caraVisible, setCaraVisible] = useState<number | null>(null);
  const [rodando, setRodando] = useState(false);
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
  }

  const total = historial.length;
  const conteos = useMemo(() => {
    const c = [0, 0, 0, 0, 0, 0];
    for (const v of historial) c[v - 1]++;
    return c;
  }, [historial]);

  const caraTop = total > 0 ? conteos.indexOf(Math.max(...conteos)) + 1 : null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h4 className="font-serif text-lg font-semibold text-slate-900 dark:text-slate-100">
          Tirá el dado y mirá cómo se llena la tabla
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
                {/* marca del valor teórico 16.7% */}
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

      {/* Cálculo explícito, en vivo */}
      <div className="mt-5 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
        {total === 0 ? (
          <p>Todavía no tiraste. Tirá el dado y la tabla se va a llenar sola.</p>
        ) : (
          <p>
            Van <strong className="tabular-nums">{total}</strong> tiradas. La
            cara <strong className="tabular-nums">{caraTop}</strong> salió más
            veces (
            <strong className="tabular-nums">
              {conteos[(caraTop ?? 1) - 1]}
            </strong>{" "}
            de {total} = {((conteos[(caraTop ?? 1) - 1] / total) * 100).toFixed(1)}%). La
            línea gris marca el valor teórico de cada cara:{" "}
            <strong>1/6 ≈ 16.7%</strong>. Cuantas más tiradas, más se acercan
            todas las barras a esa línea.
          </p>
        )}
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
          Ahora dos dados a la vez
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

      {/* Los dos dados, uno junto al otro, igual que el dado solo */}
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

      <p className="mt-4 text-center text-sm text-slate-600 dark:text-slate-400">
        {ultimo ? (
          <>
            Este resultado es el par{" "}
            <strong className="tabular-nums">
              ({ultimo[0]}, {ultimo[1]})
            </strong>
            : Dado A = {ultimo[0]}, Dado B = {ultimo[1]}. Buscalo en la tabla:
            fila {ultimo[0]}, columna {ultimo[1]}.
          </>
        ) : (
          "Cada tirada da dos números: uno del dado A, otro del dado B. Juntos forman un punto de la tabla de abajo."
        )}
      </p>

      {/* Tabla de doble entrada, CON ejes rotulados */}
      <div className="mt-5 overflow-x-auto">
        <table className="mx-auto border-collapse text-center">
          <caption className="mb-2 text-xs text-slate-500 dark:text-slate-400">
            Filas = resultado del Dado A · Columnas = resultado del Dado B
          </caption>
          <thead>
            <tr>
              <th className="p-1" />
              {[1, 2, 3, 4, 5, 6].map((b) => (
                <th
                  key={b}
                  className="p-1 text-lg text-amber-600 dark:text-amber-400"
                >
                  {CARAS_DADO[b - 1]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5, 6].map((a) => (
              <tr key={a}>
                <th className="p-1 text-lg text-blue-600 dark:text-blue-400">
                  {CARAS_DADO[a - 1]}
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
          ? "36 casillas posibles (6 filas × 6 columnas). Todavía vacías."
          : `Van ${total} tiradas anotadas. Cada casilla es cuántas veces salió exactamente esa combinación.`}
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

      <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
        {ultimo ? (
          <>
            Último tamizado: estudiante #{ultimo.id}, PHQ-9 ={" "}
            <strong className="tabular-nums">{ultimo.phq9}</strong>
            {ultimo.phq9 >= 10 ? " (positivo)" : " (negativo)"}. Llevamos{" "}
            <strong className="tabular-nums">{indice}</strong> de 200.
          </>
        ) : (
          "Todavía no tamizaste a nadie. Cada estudiante real se agrega a la tabla de abajo."
        )}
      </p>

      {/* Histograma en vivo del espacio muestral 0-27 */}
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
        Cada casilla es un puntaje posible (0 a 27). El número que aparece
        adentro es cuántos estudiantes reales dieron exactamente ese
        puntaje — naranja = zona de tamizaje positivo (≥10).
      </p>

      {/* Cálculo de probabilidad EN VIVO */}
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
            De los <strong className="tabular-nums">{indice}</strong>{" "}
            estudiantes tamizados,{" "}
            <strong className="tabular-nums">{positivos}</strong> dieron
            positivo ={" "}
            <strong className="tabular-nums">
              {positivos}/{indice} = {pctPositivo.toFixed(1)}%
            </strong>
            . El valor real en las 200 fichas completas es{" "}
            <strong>21.5%</strong> — mirá cómo tu número se acerca a medida
            que tamizás más estudiantes.
          </p>
        )}
      </div>
    </div>
  );
}
