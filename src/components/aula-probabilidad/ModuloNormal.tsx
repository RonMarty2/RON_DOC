"use client";

import { useMemo, useState } from "react";
import { ESTUDIANTES } from "@content/aula-probabilidad/dataset";
import {
  resumenPhq9,
  puntuacionZ,
  normalAcumulada,
  normalDensidad,
  tablaConfusion,
  contar,
} from "./calculos";
import { Definicion, Formula, Frac, V, Trampa, Puente, MiniHistoria } from "./narrativa";

/**
 * 2.9 — Distribución normal.
 *
 * Cierra el capítulo devolviendo la decisión al lector: el punto de corte se
 * puede mover, y al moverlo cambian sensibilidad, especificidad, valor
 * predictivo y carga de trabajo — todo lo que se construyó desde 2.1.
 */
export function ModuloNormal({ onContinuar }: { onContinuar: () => void }) {
  const { media, desviacion } = resumenPhq9();

  return (
    <div className="flex flex-col gap-6">
      <p className="text-slate-700 dark:text-slate-300">
        Volvamos a la decisión que abre y cierra este capítulo:{" "}
        <strong>¿dónde poner el punto de corte?</strong> Hasta ahora calculamos
        todo con el corte en 10 porque así lo fijó el estudio original. Pero el
        servicio podría elegir otro. Bajarlo a 5 detectaría a casi todos los
        casos, a costa de inundar el sistema. Subirlo a 15 reduciría las
        derivaciones a un puñado, a costa de dejar pasar a la mitad de quienes
        necesitan ayuda.
      </p>

      <Definicion termino="Distribución normal">
        Una variable continua con forma de campana simétrica centrada en su
        media. Media, mediana y moda coinciden; el área total bajo la curva
        vale 1; y aproximadamente el 68% de los casos cae a menos de una
        desviación estándar de la media, el 95% a menos de dos y el 99.7% a
        menos de tres.
      </Definicion>

      <Campana media={media} desviacion={desviacion} />

      <Definicion termino="Estandarización y puntuación z">
        Cualquier variable normal se convierte en una{" "}
        <strong>normal estándar</strong> restándole la media y dividiendo por
        la desviación. El resultado, <V>z</V>, dice a cuántas desviaciones
        estándar está el valor, con signo.
      </Definicion>

      <MiniHistoria titulo="Por qué existe una sola tabla de Z">
        La estandarización es lo que permite que haya una única tabla de
        probabilidades normales en lugar de una distinta para cada combinación
        de media y desviación. Es el mismo mecanismo del CI: los puntajes están
        construidos para tener media 100 y desviación 15, precisamente para que
        un valor se lea de inmediato como distancia respecto del promedio.
      </MiniHistoria>

      <Formula
        titulo="Puntuación z del punto de corte"
        simbolos={
          <>
            <V>Z</V> =
            <Frac
              arriba={<><V>X</V> − µ</>}
              abajo={<>σ</>}
            />
          </>
        }
        numeros={
          <>
            <Frac
              arriba={<>10 − {media.toFixed(2)}</>}
              abajo={desviacion.toFixed(2)}
            />
            = {puntuacionZ(10, media, desviacion).toFixed(2)}
          </>
        }
        resultado={
          <>
            El corte de 10 está a{" "}
            <strong className="tabular-nums">
              {puntuacionZ(10, media, desviacion).toFixed(2)}
            </strong>{" "}
            desviaciones estándar por encima del promedio del grupo.
          </>
        }
        nota={
          <>
            µ = {media.toFixed(2)} y σ = {desviacion.toFixed(2)} son la media y
            la desviación de los {ESTUDIANTES.length} puntajes del archivo.
          </>
        }
      />

      <Formula
        titulo="Del z al área — y de vuelta a los datos"
        simbolos={
          <>
            <V>P</V>(<V>X</V> ≥ 10) = 1 − <V>P</V>(<V>Z</V> &lt; {puntuacionZ(10, media, desviacion).toFixed(2)})
          </>
        }
        numeros={
          <>
            1 − {normalAcumulada(puntuacionZ(10, media, desviacion)).toFixed(3)} ={" "}
            {(1 - normalAcumulada(puntuacionZ(10, media, desviacion))).toFixed(3)}
          </>
        }
        resultado={
          <>
            El modelo teórico predice que el{" "}
            <strong className="tabular-nums">
              {((1 - normalAcumulada(puntuacionZ(10, media, desviacion))) * 100).toFixed(1)}%
            </strong>{" "}
            queda por encima del corte. Contando el archivo directamente:{" "}
            <strong className="tabular-nums">
              {contar((e) => e.phq9 >= 10)}/{ESTUDIANTES.length} ={" "}
              {(contar((e) => e.phq9 >= 10) / ESTUDIANTES.length).toFixed(3)}
            </strong>
            . Una diferencia de una milésima — por eso podemos usar la curva
            para evaluar cortes que todavía no probamos,{" "}
            <strong>sin volver a contar el archivo cada vez</strong>.
          </>
        }
      />

      <h4 className="mt-2 font-serif text-xl font-semibold text-slate-900 dark:text-slate-100">
        La decisión, en tus manos
      </h4>
      <p className="text-sm text-slate-700 dark:text-slate-300">
        Mové el punto de corte y mirá qué le pasa a todo lo que construimos
        desde el primer apartado. No hay una respuesta correcta: hay un
        intercambio.
      </p>

      <SelectorDeCorte media={media} desviacion={desviacion} />

      <Trampa
        error="omitir la corrección de continuidad al aproximar una binomial con la normal"
        porQue="se olvida que se está aproximando una variable de conteo (discreta) con una continua."
        correccion="sumar o restar 0.5 al valor discreto según si el límite se incluye o no. Para P(X ≤ 49) se usa 49.5, no 49."
      />

      <Trampa
        error="usar la aproximación normal con n pequeño o p extremo"
        porQue="la aproximación se degrada cuando la binomial es muy asimétrica."
        correccion="verificar que n·p y n·(1−p) superen ambos el valor 5 antes de usarla."
      />

      <Puente etiquetaBoton="Volver al misterio del inicio" onContinuar={onContinuar}>
        <p>
          Con esto cerramos la Unidad 2 completa: definimos la probabilidad y su
          vocabulario, la calculamos con tablas cruzadas y conteo combinatorio,
          la combinamos con las reglas de suma y multiplicación, la invertimos
          con Bayes, y modelamos variables completas con cuatro distribuciones.
        </p>
        <p>
          Pero fijate en algo que hicimos todo el tiempo sin señalarlo: usamos
          la prevalencia, la sensibilidad y la media del cuestionario{" "}
          <strong>como si fueran datos conocidos</strong>. En la investigación
          real no lo son: son parámetros que hay que estimar a partir de una
          muestra, y cada muestra da un número distinto. Ésa es la pregunta que
          abre la Unidad 3.
        </p>
      </Puente>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* La campana con las bandas 68–95–99.7                                */
/* ------------------------------------------------------------------ */

function Campana({ media, desviacion }: { media: number; desviacion: number }) {
  const [bandas, setBandas] = useState(1);
  const W = 520;
  const H = 180;
  const base = H - 26;

  const puntos = useMemo(() => {
    const ps: string[] = [];
    for (let i = 0; i <= 200; i++) {
      const z = -4 + (8 * i) / 200;
      const x = ((z + 4) / 8) * W;
      const y = base - normalDensidad(z) * (base - 12) * 2.6;
      ps.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return ps.join(" ");
  }, [base]);

  const xDeZ = (z: number) => ((z + 4) / 8) * W;
  const pct = [68.3, 95.4, 99.7][bandas - 1];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h4 className="font-serif text-lg font-semibold text-slate-900 dark:text-slate-100">
          La regla 68 – 95 – 99.7
        </h4>
        <div className="flex gap-2">
          {[1, 2, 3].map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setBandas(b)}
              className={
                "rounded-full px-3 py-1.5 text-sm font-semibold transition " +
                (bandas === b
                  ? "bg-blue-600 text-white"
                  : "border border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-300")
              }
            >
              ±{b}σ
            </button>
          ))}
        </div>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="mt-4 w-full" role="img" aria-label="Curva normal">
        <rect x={xDeZ(-bandas)} y={12} width={xDeZ(bandas) - xDeZ(-bandas)} height={base - 12}
          className="fill-blue-500/20" />
        <polyline points={puntos} fill="none" className="stroke-blue-600" strokeWidth={2.5} />
        <line x1={0} y1={base} x2={W} y2={base} className="stroke-slate-300 dark:stroke-slate-600" strokeWidth={1} />
        {[-3, -2, -1, 0, 1, 2, 3].map((z) => (
          <g key={z}>
            <line x1={xDeZ(z)} y1={base} x2={xDeZ(z)} y2={base + 5}
              className="stroke-slate-400" strokeWidth={1} />
            <text x={xDeZ(z)} y={base + 17} textAnchor="middle"
              className="fill-slate-500 text-[10px] dark:fill-slate-400">
              {(media + z * desviacion).toFixed(1)}
            </text>
          </g>
        ))}
      </svg>

      <p className="mt-1 text-center text-xs text-slate-400">
        puntaje del cuestionario · µ = {media.toFixed(2)}, σ = {desviacion.toFixed(2)}
      </p>
      <p className="mt-3 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
        El <strong className="tabular-nums">{pct}%</strong> de los estudiantes
        tiene un puntaje entre{" "}
        <strong className="tabular-nums">
          {Math.max(0, media - bandas * desviacion).toFixed(1)}
        </strong>{" "}
        y{" "}
        <strong className="tabular-nums">
          {(media + bandas * desviacion).toFixed(1)}
        </strong>
        . La probabilidad no es la altura de la curva: es el{" "}
        <strong>área</strong> sombreada.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* El punto de corte movible: el cierre del capítulo                   */
/* ------------------------------------------------------------------ */

function SelectorDeCorte({
  media,
  desviacion,
}: {
  media: number;
  desviacion: number;
}) {
  const [corte, setCorte] = useState(10);
  const t = tablaConfusion(corte);
  const z = puntuacionZ(corte, media, desviacion);
  const areaTeorica = 1 - normalAcumulada(z);

  return (
    <div className="rounded-2xl border-2 border-blue-300 bg-blue-50/30 p-5 dark:border-blue-800 dark:bg-blue-950/20 sm:p-6">
      <label className="flex flex-wrap items-center gap-4">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Punto de corte
        </span>
        <span className="font-serif text-2xl font-semibold tabular-nums text-blue-700 dark:text-blue-300">
          ≥ {corte}
        </span>
        <input
          type="range"
          min={3}
          max={20}
          value={corte}
          onChange={(e) => setCorte(Number(e.target.value))}
          className="h-2 w-full cursor-pointer accent-blue-600"
        />
      </label>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Metrica etiqueta="Sensibilidad" valor={t.sensibilidad} nota={`${t.VP} de ${t.dxSi} detectados`} tono="verde" />
        <Metrica etiqueta="Especificidad" valor={t.especificidad} nota={`${t.VN} de ${t.dxNo} descartados`} tono="verde" />
        <Metrica etiqueta="Valor predictivo" valor={t.vpp} nota={`${t.VP} de ${t.positivos} positivos`} tono="ambar" />
        <div className="rounded-xl bg-white px-4 py-3 dark:bg-slate-900">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Derivaciones
          </p>
          <p className="font-serif text-2xl font-semibold tabular-nums text-slate-900 dark:text-slate-100">
            {t.positivos}
          </p>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            entrevistas a agendar
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-white px-4 py-3 text-sm dark:bg-slate-900">
          <p className="font-semibold text-rose-700 dark:text-rose-400">
            {t.FN} casos perdidos
          </p>
          <p className="mt-1 text-slate-600 dark:text-slate-400">
            Personas que necesitaban ayuda y se fueron con un resultado
            negativo.
          </p>
        </div>
        <div className="rounded-xl bg-white px-4 py-3 text-sm dark:bg-slate-900">
          <p className="font-semibold text-amber-700 dark:text-amber-400">
            {t.FP} falsas alarmas
          </p>
          <p className="mt-1 text-slate-600 dark:text-slate-400">
            Entrevistas evitables, tiempo del servicio y un susto innecesario.
          </p>
        </div>
      </div>

      <p className="mt-4 rounded-xl bg-white px-4 py-3 text-sm text-slate-700 dark:bg-slate-900 dark:text-slate-300">
        Con el corte en {corte}, la normal predice que un{" "}
        <strong className="tabular-nums">{(areaTeorica * 100).toFixed(1)}%</strong>{" "}
        queda por encima (z = {z.toFixed(2)}); contando el archivo son{" "}
        <strong className="tabular-nums">
          {((t.positivos / t.total) * 100).toFixed(1)}%
        </strong>
        . <strong>Bajar el corte</strong> convierte casos perdidos en
        detectados, pero también convierte descartados en falsas alarmas. Es un{" "}
        <strong>intercambio, no una mejora</strong> — y esa decisión no la
        resuelve la estadística.
      </p>
    </div>
  );
}

function Metrica({
  etiqueta,
  valor,
  nota,
  tono,
}: {
  etiqueta: string;
  valor: number;
  nota: string;
  tono: "verde" | "ambar";
}) {
  return (
    <div className="rounded-xl bg-white px-4 py-3 dark:bg-slate-900">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {etiqueta}
      </p>
      <p
        className={
          "font-serif text-2xl font-semibold tabular-nums " +
          (tono === "verde"
            ? "text-emerald-700 dark:text-emerald-400"
            : "text-amber-700 dark:text-amber-400")
        }
      >
        {(valor * 100).toFixed(1)}%
      </p>
      <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{nota}</p>
    </div>
  );
}
