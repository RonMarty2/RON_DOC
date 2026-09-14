"use client";

import { useEffect, useRef, useState } from "react";
import { ESTUDIANTES } from "@content/aula-probabilidad/dataset";
import { contar, phq9Positivo } from "./calculos";
import { entero } from "./aleatorio";
import {
  Definicion,
  Ejemplos,
  Ejemplo,
  Frac,
  V,
  Trampa,
  Puente,
  Hilo,
  Cierre,
  IndiceApartado,
  MiniHistoria,
  Desarrollo,
  Termino,
  Comprueba,
  PasoTitulo,
} from "./narrativa";

const INSIGNIA = "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300";
const ACENTO = "border-blue-300 text-blue-700 dark:border-blue-700 dark:text-blue-300";
import { BarraSim } from "./BarraSim";

/**
 * 2.2 — Definición e importancia de la probabilidad.
 *
 * Las tres formas legítimas de asignar una probabilidad, los tres axiomas de
 * Kolmogórov que les dan un piso común, y la regla del complemento.
 */
export function ModuloTiposProbabilidad({
  onContinuar,
}: {
  onContinuar: () => void;
}) {
  const total = ESTUDIANTES.length;
  const positivos = contar(phq9Positivo);
  const p = positivos / total;

  return (
    <div className="flex flex-col gap-6">
      <p className="text-slate-700 dark:text-slate-300">
        Ya sabemos qué es un espacio muestral y qué es un evento. Falta lo
        principal: <strong>de dónde sale el número</strong> que llamamos
        probabilidad. Hay tres formas legítimas de conseguirlo, y no compiten
        entre sí — cada una resuelve el problema cuando las otras no pueden.
      </p>

      <IndiceApartado
        insignia={INSIGNIA}
        pasos={[
          "Las tres formas de conseguir el número",
          "Aplicado: la probabilidad de dar positivo",
          "Las reglas que las tres deben respetar",
        ]}
      />

      <PasoTitulo numero={1} insignia={INSIGNIA}>
        Las tres formas de conseguir el número
      </PasoTitulo>

      <Definicion termino="Probabilidad clásica (a priori)">
        Cuando todos los resultados posibles son{" "}
        <Termino significa="Que todos tienen exactamente la misma chance de ocurrir. Un dado no cargado, una moneda equilibrada. Con personas y diagnósticos casi nunca se cumple.">
          equiprobables
        </Termino>
        , la probabilidad se calcula antes de observar nada: casos favorables
        sobre casos posibles. Es la del dado y la de la moneda.
      </Definicion>

      <Definicion termino="Probabilidad frecuentista (empírica)">
        Cuando no hay razón para suponer que todos los resultados son iguales,
        se observa muchas veces y se toma la frecuencia relativa. Es la que
        usamos con las 200 fichas.
        <Ejemplos titulo="Ver las tres, sobre la misma pregunta">
          <Ejemplo caso="CLÁSICA — «sorteamos una de las 200 fichas: cada una tiene la misma chance»">
            Acá sí vale, porque el sorteo garantiza la equiprobabilidad por
            diseño: 1/200 para cada ficha. Pero no sirve para saber si esa
            persona tiene depresión — nada garantiza que tenerla y no tenerla
            sean igual de probables.
          </Ejemplo>
          <Ejemplo caso="FRECUENTISTA — «de 200 fichas, 25 tienen diagnóstico: 12,5%»">
            Salió de contar casos observados. Es la que usamos en todo el
            capítulo.
          </Ejemplo>
          <Ejemplo caso="SUBJETIVA — «el equipo clínico estima que ronda el 12%»">
            Sin lista completa ni registros suficientes, un experto asigna un
            número a partir de su criterio y de la literatura publicada.
          </Ejemplo>
        </Ejemplos>
      </Definicion>

      <Definicion termino="Probabilidad subjetiva">
        Cuando no hay simetría ni datos suficientes, un experto asigna un
        número a partir de su criterio y de la literatura. Es la sospecha
        clínica antes de aplicar cualquier test.
      </Definicion>

      <Hilo>
        Las dos primeras no son rivales: cuando el experimento es simétrico
        terminan coincidiendo. Tirá la moneda y comprobalo.
      </Hilo>

      <MonedaConvergente />

      <Hilo>
        La moneda deja la impresión de que la probabilidad clásica es cosa de
        casinos. En investigación aparece todo el tiempo, y con la misma
        propiedad: se conoce antes de observar nada.
      </Hilo>

      <AsignacionAleatoria />

      <Cierre>
        <p>
          La línea del 50% nunca se movió: esa es la probabilidad clásica, y se
          conoce sin tirar la moneda ni una sola vez, porque hay dos resultados
          y ninguna razón para preferir uno. La barra, en cambio, sólo existe
          porque observamos, y al principio salta muchísimo.
        </p>
        <p>
          Lo importante es qué pasa al aumentar las tiradas:{" "}
          <strong>la barra va hacia la línea sola</strong>. Nadie la empuja. Con
          experimentos simétricos las dos formas de calcular la probabilidad
          convergen al mismo número, y por eso da lo mismo cuál usar.
        </p>
        <p>
          El problema aparece cuando <strong>no hay simetría</strong>. Con el
          cuestionario no existe ninguna razón para suponer que dar positivo y
          dar negativo sean igual de probables, así que la primera forma no
          sirve: no hay «caras» que contar. Sólo queda observar y contar
          personas, que es lo que hacemos a continuación.
        </p>
      </Cierre>

      <MiniHistoria titulo="Las dos primeras terminan coincidiendo">
        Si el experimento es simétrico, la frecuencia observada se acerca a la
        probabilidad clásica a medida que aumentan las repeticiones. Eso es lo
        que acabás de ver con la moneda: la línea teórica no se movió nunca, y
        la barra fue hacia ella sola.
      </MiniHistoria>

      <PasoTitulo numero={2} insignia={INSIGNIA}>
        Aplicado: la probabilidad de dar positivo
      </PasoTitulo>
      <p className="text-sm text-slate-700 dark:text-slate-300">
        Acá no hay simetría: nada garantiza que dar positivo y dar negativo
        sean igual de probables. Así que la calculamos por frecuencia, contando
        el archivo.
      </p>

      <Desarrollo
        titulo="Cómo se obtiene ese número"
        insignia={INSIGNIA}
        acento={ACENTO}
        pasos={[
          {
            expresion: (
              <>
                <V>P</V>(<V>A</V>) =
                <Frac arriba={<>casos favorables</>} abajo={<>casos posibles</>} />
              </>
            ),
            explicacion:
              "Definimos el evento A = «dar positivo en el tamizaje». Como no hay simetría que justifique suponer nada, vamos a contar.",
          },
          {
            expresion: (
              <>
                <V>P</V>(positivo) =
                <Frac arriba={positivos} abajo={total} />
              </>
            ),
            explicacion: `Contamos las fichas con puntaje mayor o igual a 10: son ${positivos}. El denominador es el total de fichas del archivo, ${total}.`,
          },
          {
            expresion: <>= {p.toFixed(3)} = {(p * 100).toFixed(1)}%</>,
            explicacion:
              "Es una probabilidad frecuentista: salió de observar y contar, no de suponer que los resultados eran igual de probables.",
          },
        ]}
      />

      <PasoTitulo numero={3} insignia={INSIGNIA}>
        Las reglas que las tres deben respetar
      </PasoTitulo>

      <Axiomas p={p} />

      <ComplementoVisual p={p} />

      <Desarrollo
        titulo="De los axiomas sale la regla del complemento"
        insignia={INSIGNIA}
        acento={ACENTO}
        pasos={[
          {
            expresion: (
              <>
                <V>P</V>(<V>A</V>) + <V>P</V>(<V>A</V><sup>c</sup>) = <V>P</V>(<V>S</V>)
              </>
            ),
            explicacion:
              "Es la barra de arriba escrita con símbolos: el trozo naranja más el azul dan la barra entera. Son excluyentes (ninguna ficha está en los dos) y entre los dos la cubren toda, así que por el Axioma 3 se suman.",
          },
          {
            expresion: (
              <>
                <V>P</V>(<V>A</V>) + <V>P</V>(<V>A</V><sup>c</sup>) = 1
              </>
            ),
            explicacion: "Y por el Axioma 2, la probabilidad del espacio muestral completo vale exactamente 1.",
          },
          {
            expresion: (
              <>
                <V>P</V>(<V>A</V><sup>c</sup>) = 1 − <V>P</V>(<V>A</V>)
              </>
            ),
            explicacion: "Despejando queda la regla del complemento. No es un principio nuevo: es una consecuencia de los dos axiomas anteriores.",
          },
          {
            expresion: <><V>P</V>(negativo) = 1 − {p.toFixed(3)} = {(1 - p).toFixed(3)}</>,
            explicacion: `Con nuestros datos: si el ${(p * 100).toFixed(1)}% da positivo, el ${((1 - p) * 100).toFixed(1)}% da negativo. Sirve cada vez que contar lo contrario resulta más fácil que contar lo directo.`,
          },
        ]}
      />

      <Comprueba
        pregunta="El equipo clínico estima, por su experiencia y por la literatura, que la depresión ronda el 12% en la población estudiantil. ¿Qué tipo de probabilidad es ésa?"
        opciones={[
          {
            texto: "Subjetiva",
            esCorrecta: true,
            porQue:
              "No salió de contar casos observados ni de suponer simetría entre resultados: salió del criterio informado de un experto. Eso no la hace menos válida — es la única disponible cuando no hay ni lista completa ni registros suficientes.",
          },
          {
            texto: "Frecuentista",
            porQue:
              "Sería frecuentista si hubieran contado cuántos casos aparecieron en registros reales, como hicimos con las 200 fichas. Acá no se contó: se estimó a partir de experiencia y literatura.",
          },
          {
            texto: "Clásica",
            porQue:
              "La clásica exige que todos los resultados sean equiprobables por diseño, como las caras de un dado. Nada garantiza que tener o no tener depresión sean igual de probables.",
          },
        ]}
      />


      <Trampa
        error="tratar la probabilidad clásica como si valiera siempre"
        porQue="es la primera que se enseña y su fórmula es la más simple, así que se aplica por reflejo — incluso cuando los resultados no son equiprobables."
        correccion="antes de dividir favorables sobre posibles, preguntarse si hay alguna razón para que todos los resultados tengan la misma chance. Con personas y diagnósticos, casi nunca la hay: ahí corresponde contar."
      />

      <Comprueba
        pregunta="Querés calcular la probabilidad de que un estudiante saque MENOS de 27 puntos. Contar todos esos casos es tedioso. ¿Qué conviene hacer?"
        pista="Pensá si es más fácil contar lo que pedís o lo contrario."
        opciones={[
          {
            texto: "Calcular la probabilidad de sacar exactamente 27 y restarla de 1",
            esCorrecta: true,
            porQue:
              "«Menos de 27» y «exactamente 27» son complementarios: cubren todo el espacio muestral y no se solapan. Contar un solo caso y restarlo de 1 es muchísimo más rápido que contar 27. Para eso sirve la regla del complemento.",
          },
          {
            texto: "Sumar las probabilidades de los 27 valores restantes",
            porQue:
              "Daría el resultado correcto, pero es exactamente el trabajo que la regla del complemento existe para evitar. Cuando el evento directo es más difícil de contar que su negación, conviene invertir.",
          },
          {
            texto: "Usar probabilidad clásica: 27 casos favorables sobre 28 posibles",
            porQue:
              "Eso supondría que los 28 puntajes son equiprobables, y no lo son: hay muchísimos más estudiantes con puntajes bajos que con 27. La equiprobabilidad hay que justificarla, no asumirla.",
          },
        ]}
      />

      <Puente
        etiquetaBoton="Ir a 2.3 · Tablas de contingencia"
        onContinuar={onContinuar}
      >
        <p>
          Ya podemos calcular la probabilidad de un evento suelto: dar
          positivo, dar negativo. Pero la promesa del inicio —un cuestionario
          que casi nunca falla y que aun así se equivoca en casi la mitad de
          sus alarmas— no se trata de un evento suelto, sino del cruce de dos:
          lo que dijo el cuestionario y lo que era verdad.
        </p>
        <p>
          Para ver los dos a la vez hace falta cruzarlos en una tabla. Y de esa
          tabla van a salir, por fin, los tres números que todo el mundo
          confunde.
        </p>
      </Puente>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Moneda: la frecuentista converge a la clásica                       */
/* ------------------------------------------------------------------ */

function MonedaConvergente() {
  const [caras, setCaras] = useState(0);
  const [tiradas, setTiradas] = useState(0);
  const [ultima, setUltima] = useState<"cara" | "sello" | null>(null);
  const [girando, setGirando] = useState(false);
  const girandoRef = useRef(false);
  const limpiarRef = useRef<(() => void) | null>(null);

  useEffect(() => () => limpiarRef.current?.(), []);

  function tirar(n: number) {
    if (girandoRef.current) return;

    // El resultado se calcula ya; la animación es sólo presentación.
    let c = 0;
    let ultimaTirada: "cara" | "sello" = "cara";
    for (let i = 0; i < n; i++) {
      const esCara = entero(0, 1) === 0;
      if (esCara) c++;
      ultimaTirada = esCara ? "cara" : "sello";
    }

    const aplicar = () => {
      setCaras((x) => x + c);
      setTiradas((x) => x + n);
      setUltima(ultimaTirada);
    };

    // Con una sola tirada se anima el giro; con lotes grandes no tendría
    // sentido hacer esperar.
    if (n > 1) {
      aplicar();
      return;
    }

    girandoRef.current = true;
    setGirando(true);
    let vueltas = 0;
    let terminado = false;

    const finalizar = () => {
      if (terminado) return;
      terminado = true;
      window.clearInterval(id);
      window.clearTimeout(seguro);
      limpiarRef.current = null;
      aplicar();
      girandoRef.current = false;
      setGirando(false);
    };

    const id = window.setInterval(() => {
      vueltas++;
      if (vueltas >= 6) finalizar();
      else setUltima(entero(0, 1) === 0 ? "cara" : "sello");
    }, 70);

    // Red de seguridad por si el navegador pausa los temporizadores.
    const seguro = window.setTimeout(finalizar, 1200);

    limpiarRef.current = () => {
      window.clearInterval(id);
      window.clearTimeout(seguro);
    };
  }

  function reset() {
    limpiarRef.current?.();
    limpiarRef.current = null;
    girandoRef.current = false;
    setGirando(false);
    setCaras(0);
    setTiradas(0);
    setUltima(null);
  }

  const pct = tiradas > 0 ? (caras / tiradas) * 100 : 0;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h4 className="font-serif text-lg font-semibold text-slate-900 dark:text-slate-100">
          Clásica contra frecuentista, en la misma moneda
        </h4>
        <div className="flex flex-wrap gap-2">
          {[1, 10, 100, 1000].map((n) => (
            <button
              key={n}
              type="button"
              disabled={girando}
              onClick={() => tirar(n)}
              className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300"
            >
              Tirar {n.toLocaleString("es")}
            </button>
          ))}
          <button
            type="button"
            onClick={reset}
            className="rounded-full border border-slate-200 px-3 py-1.5 text-sm text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Reiniciar
          </button>
        </div>
      </div>

      <div className="mt-5 flex justify-center">
        <div
          className={
            "grid h-16 w-16 place-items-center rounded-full border-2 border-amber-500 bg-amber-50 text-2xl font-semibold text-amber-700 transition-transform duration-100 dark:bg-amber-950/30 dark:text-amber-300 " +
            (girando ? "scale-90" : "scale-100")
          }
        >
          {ultima === null ? "?" : ultima === "cara" ? "C" : "S"}
        </div>
      </div>

      <div className="mt-5">
        <BarraSim
          etiqueta="Frecuencia observada de cara"
          porcentaje={pct}
          esperadoPct={50}
          color="azul"
        />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-slate-50 px-4 py-3 text-sm dark:bg-slate-800/60">
          <p className="font-semibold text-slate-800 dark:text-slate-200">
            Clásica: 50%
          </p>
          <p className="mt-1 text-slate-600 dark:text-slate-400">
            Dos resultados, ninguna razón para preferir uno. 1/2, sin tirar la
            moneda ni una vez.
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 px-4 py-3 text-sm dark:bg-slate-800/60">
          <p className="font-semibold text-slate-800 dark:text-slate-200">
            Frecuentista:{" "}
            <span className="tabular-nums">
              {tiradas > 0 ? `${pct.toFixed(1)}%` : "—"}
            </span>
          </p>
          <p className="mt-1 text-slate-600 dark:text-slate-400">
            {tiradas === 0
              ? "Todavía sin datos. Tirá la moneda para empezar a estimarla."
              : tiradas < 30
                ? `${caras} caras en ${tiradas} ${tiradas === 1 ? "tirada" : "tiradas"}. Con tan pocas, este número salta muchísimo y todavía no dice nada: tirá 100 o 1.000 y mirá cómo se pega al 50%.`
                : `${caras} caras en ${tiradas.toLocaleString("es")} tiradas. Sólo existe porque observamos — y cuantas más tiradas, más se acerca al valor clásico.`}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Los tres axiomas, verificados con nuestro propio número             */
/* ------------------------------------------------------------------ */

function Axiomas({ p }: { p: number }) {
  const [activo, setActivo] = useState<number | null>(null);
  const total = ESTUDIANTES.length;
  const positivos = contar(phq9Positivo);
  const negativos = total - positivos;
  const pctPos = p * 100;
  const pctNeg = 100 - pctPos;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <h4 className="font-serif text-lg font-semibold text-slate-900 dark:text-slate-100">
        Los tres axiomas de Kolmogórov (1933)
      </h4>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
        Las tres formas de arriba dan números distintos, pero todas tienen que
        respetar las mismas tres reglas. Acá están las {total} fichas puestas
        en una sola barra: <strong>la barra entera es el espacio muestral</strong>,
        y vale 1.
      </p>

      {/* La barra del espacio muestral */}
      <div className="mt-5">
        <div className="flex h-14 overflow-hidden rounded-xl border-2 border-slate-300 dark:border-slate-600">
          <div
            className={
              "flex items-center justify-center transition-all " +
              (activo === 3 || activo === null
                ? "bg-amber-500 text-white"
                : "bg-amber-500/40 text-amber-900 dark:text-amber-100")
            }
            style={{ width: `${pctPos}%` }}
          >
            <span className="text-xs font-bold tabular-nums">{positivos}</span>
          </div>
          <div
            className={
              "flex items-center justify-center transition-all " +
              (activo === 3 || activo === null
                ? "bg-blue-500 text-white"
                : "bg-blue-500/40 text-blue-900 dark:text-blue-100")
            }
            style={{ width: `${pctNeg}%` }}
          >
            <span className="text-xs font-bold tabular-nums">{negativos}</span>
          </div>
        </div>
        <div className="mt-1.5 flex justify-between text-xs">
          <span className="text-amber-700 dark:text-amber-400">
            positivos · {pctPos.toFixed(1)}%
          </span>
          <span className="text-blue-700 dark:text-blue-400">
            negativos · {pctNeg.toFixed(1)}%
          </span>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <AxiomaFila
          n={1}
          nombre="No negatividad"
          simbolo="P(A) ≥ 0"
          texto="Ninguna probabilidad puede ser negativa. No existe el «menos 10% de riesgo»."
          activo={activo === 1}
          onClick={() => setActivo(activo === 1 ? null : 1)}
        >
          <p className="text-sm text-slate-700 dark:text-slate-300">
            Mirá la barra: un trozo puede ser grandísimo o achicarse hasta
            desaparecer, pero <strong>no puede tener ancho negativo</strong>.
            No hay forma de dibujarlo. Ese es todo el axioma.
          </p>
          <div className="mt-2 flex items-center gap-3">
            <span className="text-xs text-slate-500">Válido:</span>
            <div className="h-4 w-24 rounded bg-amber-500" />
            <span className="text-xs tabular-nums text-slate-500">
              0 ≤ {p.toFixed(3)} ≤ 1
            </span>
          </div>
          <div className="mt-1.5 flex items-center gap-3 opacity-50">
            <span className="text-xs text-slate-500">Imposible:</span>
            <div className="h-4 w-0 rounded border border-dashed border-rose-400" />
            <span className="text-xs text-rose-500">no se puede dibujar</span>
          </div>
        </AxiomaFila>

        <AxiomaFila
          n={2}
          nombre="Normalización"
          simbolo="P(S) = 1"
          texto="El espacio muestral completo tiene probabilidad 1: algo tiene que ocurrir."
          activo={activo === 2}
          onClick={() => setActivo(activo === 2 ? null : 2)}
        >
          <p className="text-sm text-slate-700 dark:text-slate-300">
            Los dos trozos de la barra llenan exactamente el ancho total, sin
            dejar hueco ni desbordarse. Cada ficha del archivo está en uno de
            los dos: no hay ninguna que no sea ni positiva ni negativa.
          </p>
          <p className="mt-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm tabular-nums text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200">
            {positivos} + {negativos} = {total} fichas ·{" "}
            {p.toFixed(3)} + {(1 - p).toFixed(3)} = 1.000
          </p>
        </AxiomaFila>

        <AxiomaFila
          n={3}
          nombre="Aditividad"
          simbolo="P(A ∪ B) = P(A) + P(B)"
          texto="Si dos eventos no pueden ocurrir a la vez, sus probabilidades se suman sin más."
          activo={activo === 3}
          onClick={() => setActivo(activo === 3 ? null : 3)}
        >
          <p className="text-sm text-slate-700 dark:text-slate-300">
            Los dos trozos <strong>no se pisan</strong>: ninguna ficha es
            positiva y negativa a la vez. Por eso para saber cuántas hay entre
            las dos alcanza con sumar los anchos, sin restar nada.
          </p>
          <p className="mt-2 rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-300">
            Ojo: esto vale <strong>sólo</strong> cuando los eventos son
            excluyentes. Cuando se solapan hay que restar la parte compartida,
            y eso es exactamente lo que veremos en el apartado 2.5.
          </p>
        </AxiomaFila>
      </div>
    </div>
  );
}

/** Una fila de axioma: título, símbolo, y su demostración desplegable. */
function AxiomaFila({
  n,
  nombre,
  simbolo,
  texto,
  activo,
  onClick,
  children,
}: {
  n: number;
  nombre: string;
  simbolo: string;
  texto: string;
  activo: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className={
        "rounded-xl border-2 transition " +
        (activo
          ? "border-blue-500 bg-blue-50/40 dark:bg-blue-950/20"
          : "border-slate-200 dark:border-slate-700")
      }
    >
      <button
        type="button"
        onClick={onClick}
        aria-expanded={activo}
        className="w-full px-4 py-3 text-left"
      >
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Axioma {n} · {nombre}
          </span>
          <span className="font-mono text-sm text-blue-700 dark:text-blue-300">
            {simbolo}
          </span>
          <span className="ml-auto text-xs text-slate-400">
            {activo ? "▲" : "▼ ver en la barra"}
          </span>
        </div>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          {texto}
        </p>
      </button>
      {activo && (
        <div className="border-t border-blue-200 px-4 py-3 dark:border-blue-900">
          {children}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* El complemento, visto sobre las fichas                              */
/* ------------------------------------------------------------------ */

/**
 * La regla del complemento en abstracto no dice nada. Acá se ve sobre las
 * fichas reales: elegís un evento, y el complemento es literalmente todo lo
 * que queda de la barra.
 */
function ComplementoVisual({ p }: { p: number }) {
  const [verComplemento, setVerComplemento] = useState(false);
  const total = ESTUDIANTES.length;
  const positivos = contar(phq9Positivo);
  const negativos = total - positivos;

  const num = verComplemento ? negativos : positivos;
  const prob = num / total;
  const etiqueta = verComplemento ? "NO dar positivo" : "dar positivo";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h5 className="font-serif text-lg font-semibold text-slate-900 dark:text-slate-100">
          El complemento es «todo lo demás»
        </h5>
        <button
          type="button"
          onClick={() => setVerComplemento((v) => !v)}
          className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          {verComplemento ? "↩ Volver al evento A" : "Ver el complemento Aᶜ →"}
        </button>
      </div>

      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        Cada cuadradito es una ficha. Marcado = cumple el evento que estamos
        mirando.
      </p>

      <div className="mt-4 flex flex-wrap gap-[3px]">
        {ESTUDIANTES.map((e) => {
          const esPositivo = phq9Positivo(e);
          const marcado = verComplemento ? !esPositivo : esPositivo;
          return (
            <span
              key={e.id}
              className={
                "h-3 w-3 rounded-[2px] transition " +
                (marcado
                  ? verComplemento
                    ? "bg-blue-600"
                    : "bg-amber-500"
                  : "bg-slate-200 dark:bg-slate-700")
              }
            />
          );
        })}
      </div>

      <div className="mt-4 rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800/60">
        <p className="font-serif text-xl font-semibold tabular-nums text-slate-900 dark:text-slate-100">
          P({etiqueta}) = {num}/{total} = {prob.toFixed(3)}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {verComplemento ? (
            <>
              Se dieron vuelta exactamente los mismos cuadraditos: los que
              antes estaban marcados ahora no, y viceversa. Ningún cuadradito
              quedó marcado en las dos vistas, y ninguno quedó sin marcar en
              las dos. Por eso{" "}
              <strong className="tabular-nums">
                {p.toFixed(3)} + {prob.toFixed(3)} = 1.000
              </strong>{" "}
              — y por eso alcanza con calcular uno para conocer el otro.
            </>
          ) : (
            <>
              Éste es el evento A. Tocá el botón y mirá qué pasa con los
              cuadraditos: el complemento no es «otro evento parecido», es{" "}
              <strong>exactamente todo lo que A deja afuera</strong>.
            </>
          )}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* El gemelo psicológico de la moneda: la asignación aleatoria         */
/* ------------------------------------------------------------------ */

/**
 * Dónde vive la probabilidad clásica en psicología.
 *
 * La moneda enseña la convergencia con claridad, pero deja la impresión de
 * que la probabilidad clásica es cosa de casinos. No lo es: en investigación
 * aparece cada vez que se asigna participantes al azar, y aparece con una
 * propiedad que ningún dato observado tiene — se conoce ANTES de empezar,
 * porque la simetría no se descubrió, se fabricó con el procedimiento.
 *
 * El interactivo hace visible las dos cosas a la vez: la probabilidad teórica
 * fija en 0,5 y la proporción observada tambaleando alrededor. Una es clásica,
 * la otra frecuentista, y son el mismo experimento.
 */
function AsignacionAleatoria() {
  const [asignados, setAsignados] = useState<boolean[]>([]);
  const [corriendo, setCorriendo] = useState(false);
  const corriendoRef = useRef(false);
  const limpiarRef = useRef<(() => void) | null>(null);

  useEffect(() => () => limpiarRef.current?.(), []);

  function asignar(cuantos: number) {
    if (corriendoRef.current) return;

    const nuevos = Array.from({ length: cuantos }, () => entero(0, 1) === 1);

    // Con muchos participantes no tiene sentido animar de a uno: se agregan
    // de golpe y se sale. Esta rama va ANTES de declarar los temporizadores
    // porque no los usa — llamarlos desde acá entraba en la zona muerta de
    // `const` y rompía el componente con «Cannot access 'i' before
    // initialization».
    if (cuantos > 10) {
      setAsignados((a) => [...a, ...nuevos]);
      return;
    }

    corriendoRef.current = true;
    setCorriendo(true);

    let entregados = 0;
    let terminado = false;

    const finalizar = () => {
      if (terminado) return;
      terminado = true;
      window.clearInterval(id);
      window.clearTimeout(seguro);
      limpiarRef.current = null;
      // Lo que todavía no se entregó se agrega de una vez, para que el
      // resultado no dependa de que la animación haya llegado al final.
      if (entregados < cuantos) {
        setAsignados((a) => [...a, ...nuevos.slice(entregados)]);
        entregados = cuantos;
      }
      corriendoRef.current = false;
      setCorriendo(false);
    };

    const id = window.setInterval(() => {
      setAsignados((a) => [...a, nuevos[entregados]]);
      entregados++;
      if (entregados >= cuantos) finalizar();
    }, 260);
    // Red de seguridad: si el navegador pausa los temporizadores (pestaña en
    // segundo plano, app minimizada), el estado no queda trabado.
    const seguro = window.setTimeout(finalizar, 260 * cuantos + 900);
    limpiarRef.current = () => {
      window.clearInterval(id);
      window.clearTimeout(seguro);
    };
  }

  const n = asignados.length;
  const tratamiento = asignados.filter(Boolean).length;
  const proporcion = n > 0 ? tratamiento / n : 0;
  const desvio = Math.abs(proporcion - 0.5);

  return (
    <div className="rounded-2xl border-2 border-blue-300 bg-blue-50/40 p-5 dark:border-blue-800 dark:bg-blue-950/20 sm:p-6">
      <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-blue-700 dark:text-blue-300">
        Dónde vive la probabilidad clásica en tu carrera
      </p>
      <h4 className="mt-1 font-serif text-xl font-semibold text-slate-900 dark:text-slate-100">
        La asignación aleatoria es la moneda
      </h4>
      <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        Un estudio compara una terapia contra una lista de espera. Para que los
        dos grupos sean comparables, cada participante se asigna{" "}
        <strong>al azar</strong>. La probabilidad de caer en tratamiento es
        exactamente <strong>0,5</strong> — y lo sabés antes de reclutar a nadie,
        porque esa simetría la fabricaste vos al diseñar el procedimiento.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          disabled={corriendo}
          onClick={() => asignar(1)}
          className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-50"
        >
          Asignar 1 participante
        </button>
        <button
          type="button"
          disabled={corriendo}
          onClick={() => asignar(10)}
          className="rounded-full border border-blue-300 px-4 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100 disabled:opacity-50 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-950/40"
        >
          Asignar 10
        </button>
        <button
          type="button"
          disabled={corriendo}
          onClick={() => asignar(200)}
          className="rounded-full border border-blue-300 px-4 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100 disabled:opacity-50 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-950/40"
        >
          Asignar 200
        </button>
        {n > 0 && (
          <button
            type="button"
            disabled={corriendo}
            onClick={() => setAsignados([])}
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-500 disabled:opacity-50 dark:border-slate-600 dark:text-slate-400"
          >
            Empezar de nuevo
          </button>
        )}
      </div>

      {n === 0 ? (
        <p className="mt-4 rounded-xl bg-white px-4 py-3 text-sm text-slate-700 dark:bg-slate-900 dark:text-slate-300">
          Antes de asignar a nadie ya podés afirmar que la probabilidad es 0,5.
          Ninguna probabilidad frecuentista permite eso: para las que salen de
          contar, hay que contar primero.
        </p>
      ) : (
        <>
          {/* Las dos columnas del estudio */}
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[true, false].map((esTratamiento) => {
              const cuantos = asignados.filter((x) => x === esTratamiento).length;
              return (
                <div
                  key={String(esTratamiento)}
                  className={
                    "rounded-xl border p-3 " +
                    (esTratamiento
                      ? "border-blue-300 bg-white dark:border-blue-700 dark:bg-slate-900"
                      : "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900")
                  }
                >
                  <p
                    className={
                      "text-xs font-semibold uppercase tracking-wider " +
                      (esTratamiento
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-slate-400")
                    }
                  >
                    {esTratamiento ? "Tratamiento" : "Lista de espera"}
                  </p>
                  <p className="mt-1 font-mono text-3xl font-semibold tabular-nums text-slate-900 dark:text-slate-100">
                    {cuantos}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {((cuantos / n) * 100).toFixed(1)}% de {n}
                  </p>
                </div>
              );
            })}
          </div>

          {/* La barra: teórica fija, observada temblando */}
          <div className="mt-4 rounded-xl bg-white p-4 dark:bg-slate-900">
            <div className="flex items-baseline justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400">
                Proporción observada en tratamiento
              </span>
              <span className="font-mono font-semibold tabular-nums text-slate-900 dark:text-slate-100">
                {proporcion.toFixed(3)}
              </span>
            </div>
            <div className="relative mt-2 h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: `${proporcion * 100}%` }}
              />
              {/* La marca del valor teórico, que no se mueve nunca */}
              <div
                className="absolute inset-y-0 w-px bg-slate-900 dark:bg-slate-100"
                style={{ left: "50%" }}
                aria-hidden
              />
            </div>
            <p className="mt-1.5 text-right font-mono text-[10px] text-slate-400">
              la marca fija es 0,500 · la probabilidad clásica
            </p>
          </div>

          <p className="mt-3 rounded-xl bg-white px-4 py-3 text-sm text-slate-700 dark:bg-slate-900 dark:text-slate-300">
            {n < 10 ? (
              <>
                Con {n} {n === 1 ? "participante" : "participantes"} la
                proporción está lejos de 0,5 y no significa nada: el
                procedimiento sigue siendo perfectamente simétrico. Seguí
                asignando.
              </>
            ) : (
              <>
                Con {n} participantes la proporción observada es{" "}
                <strong className="tabular-nums">{proporcion.toFixed(3)}</strong>
                , a{" "}
                <strong className="tabular-nums">{desvio.toFixed(3)}</strong> de
                la marca.
                <span className="mt-2 block text-slate-600 dark:text-slate-400">
                  Estás viendo los <strong>dos tipos a la vez</strong>. El 0,5
                  de la marca es <strong>clásico</strong>: sale del diseño y no
                  se mueve. El número de arriba es{" "}
                  <strong>frecuentista</strong>: sale de contar y tiembla.
                  Cuantos más participantes, más se acerca — pero nunca
                  «aprende» el 0,5, porque el 0,5 ya estaba.
                </span>
              </>
            )}
          </p>
        </>
      )}
    </div>
  );
}
