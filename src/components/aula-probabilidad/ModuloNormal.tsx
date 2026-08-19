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
import {
  Definicion,
  Ejemplos,
  Ejemplo,
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

const INSIGNIA = "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300";
const ACENTO = "border-emerald-300 text-emerald-700 dark:border-emerald-700 dark:text-emerald-400";

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

      <PasoTitulo numero={1} insignia={INSIGNIA}>
        La campana
      </PasoTitulo>

      <Definicion termino="Distribución normal">
        Una variable continua con forma de campana simétrica centrada en su
        media. Media, mediana y moda coinciden; el área total bajo la curva
        vale 1; y aproximadamente el 68% de los casos cae a menos de una
        desviación estándar de la media, el 95% a menos de dos y el 99.7% a
        menos de tres.
        <Ejemplos titulo="Ver variables que se comportan así">
          <Ejemplo caso="Puntajes de CI:  µ = 100, σ = 15">
            Construidos a propósito con esos parámetros, para que un valor se
            lea de inmediato como distancia al promedio.
          </Ejemplo>
          <Ejemplo caso="Altura de adultos de un mismo sexo">
            La mayoría cerca del promedio, pocos en los extremos.
          </Ejemplo>
          <Ejemplo caso="Errores de medición de un instrumento">
            El caso que estudiaba Gauss cuando la formalizó, midiendo astros.
          </Ejemplo>
          <Ejemplo caso="Nuestro cuestionario:  µ = 6,32, σ = 4,64">
            No es perfectamente normal, pero la aproximación reproduce el
            conteo real con una diferencia de una milésima.
          </Ejemplo>
        </Ejemplos>
      </Definicion>

      <Campana media={media} desviacion={desviacion} />

      <PasoTitulo numero={2} insignia={INSIGNIA}>
        Estandarizar: hablar en desviaciones
      </PasoTitulo>

      <Definicion termino="Estandarización y puntuación z">
        Cualquier variable normal se convierte en una{" "}
        <strong>normal estándar</strong> restándole la{" "}
        <Termino significa="Mu: el centro de la distribución, el promedio de todos los valores.">
          media (µ)
        </Termino>{" "}
        y dividiendo por la{" "}
        <Termino significa="Sigma: cuánto se alejan típicamente los valores del centro. Es la raíz de la varianza, así que vuelve a estar en las unidades originales del puntaje.">
          desviación estándar (σ)
        </Termino>
        . El resultado, <V>z</V>, dice a cuántas desviaciones está el valor,
        con signo: negativo si está por debajo del promedio.
      </Definicion>

      <MiniHistoria titulo="Por qué existe una sola tabla de Z">
        La estandarización es lo que permite que haya una única tabla de
        probabilidades normales en lugar de una distinta para cada combinación
        de media y desviación. Es el mismo mecanismo del CI: los puntajes están
        construidos para tener media 100 y desviación 15, precisamente para que
        un valor se lea de inmediato como distancia respecto del promedio.
      </MiniHistoria>

      <Desarrollo
        titulo="Del puntaje al área bajo la curva"
        insignia={INSIGNIA}
        acento={ACENTO}
        pasos={[
          {
            expresion: (
              <>
                <V>Z</V> =
                <Frac arriba={<><V>X</V> − µ</>} abajo="σ" />
              </>
            ),
            explicacion: `Primero convertimos el puntaje que nos interesa a desviaciones estándar. Del archivo salen µ = ${media.toFixed(2)} y σ = ${desviacion.toFixed(2)}.`,
          },
          {
            expresion: (
              <>
                <V>Z</V> =
                <Frac arriba={<>10 − {media.toFixed(2)}</>} abajo={desviacion.toFixed(2)} />
                =
                <Frac arriba={(10 - media).toFixed(2)} abajo={desviacion.toFixed(2)} />
                = {puntuacionZ(10, media, desviacion).toFixed(2)}
              </>
            ),
            explicacion: `El corte de 10 está a ${puntuacionZ(10, media, desviacion).toFixed(2)} desviaciones por encima del promedio del grupo. Ese único número ya no depende de la escala del cuestionario: por eso existe una sola tabla de Z.`,
          },
          {
            expresion: (
              <>
                <V>P</V>(<V>Z</V> &lt; {puntuacionZ(10, media, desviacion).toFixed(2)}) = {normalAcumulada(puntuacionZ(10, media, desviacion)).toFixed(3)}
              </>
            ),
            explicacion:
              "La tabla de Z devuelve siempre el área a la IZQUIERDA: qué proporción queda por debajo. Pero nosotros queremos los que superan el corte, o sea la derecha.",
          },
          {
            expresion: (
              <>
                <V>P</V>(<V>X</V> ≥ 10) = 1 − {normalAcumulada(puntuacionZ(10, media, desviacion)).toFixed(3)} = {(1 - normalAcumulada(puntuacionZ(10, media, desviacion))).toFixed(3)}
              </>
            ),
            explicacion:
              "Usamos la regla del complemento de 2.2: el área total vale 1, así que la derecha es 1 menos la izquierda.",
          },
          {
            expresion: (
              <>
                Modelo: {((1 - normalAcumulada(puntuacionZ(10, media, desviacion))) * 100).toFixed(1)}%   ·   Contando: {contar((e) => e.phq9 >= 10)}/{ESTUDIANTES.length} = {((contar((e) => e.phq9 >= 10) / ESTUDIANTES.length) * 100).toFixed(1)}%
              </>
            ),
            explicacion:
              "Una diferencia de una milésima entre el modelo teórico y el conteo real. Eso es lo que autoriza a usar la curva para evaluar cortes que todavía no probamos, sin volver a contar el archivo cada vez.",
          },
        ]}
      />

      <PasoTitulo numero={3} insignia={INSIGNIA}>
        El puente con las distribuciones discretas
      </PasoTitulo>

      <AproximacionNormal />

      <Comprueba
        pregunta={`Un puntaje de 15 en el cuestionario, en una distribución con µ = ${media.toFixed(2)} y σ = ${desviacion.toFixed(2)}. ¿Qué significa su z ≈ 1,87?`}
        opciones={[
          {
            texto: "Que está casi dos desviaciones estándar por encima del promedio del grupo",
            esCorrecta: true,
            porQue:
              "Eso es exactamente lo que mide z: distancia al promedio, medida en desviaciones estándar. Por la regla 68-95-99,7, estar a casi 2σ lo ubica entre el 5% más extremo del grupo.",
          },
          {
            texto: "Que tiene 1,87 veces más síntomas que el promedio",
            porQue:
              "z no es una razón ni un múltiplo: es una distancia en unidades de desviación estándar. El puntaje 15 no es «1,87 veces» el promedio de 6,32 — de hecho sería 2,37 veces, un número distinto y sin interés estadístico.",
          },
          {
            texto: "Que el 1,87% de los estudiantes tiene ese puntaje",
            porQue:
              "z no es un porcentaje. Para obtener una proporción hay que buscar el área bajo la curva correspondiente a ese z, que es el paso siguiente del cálculo.",
          },
        ]}
      />

      <PasoTitulo numero={4} insignia={INSIGNIA}>
        La decisión, en tus manos
      </PasoTitulo>


      <p className="text-sm text-slate-700 dark:text-slate-300">
        Mové el punto de corte y mirá qué le pasa a todo lo que construimos
        desde el primer apartado. No hay una respuesta correcta: hay un
        intercambio.
      </p>

      <SelectorDeCorte media={media} desviacion={desviacion} />

      <Comprueba
        pregunta="El comité propone bajar el punto de corte de 10 a 5 para «no dejar pasar a nadie». ¿Qué se gana y qué se pierde?"
        pista="Mové el deslizador de arriba hasta 5 y comparalo con 10 antes de responder."
        opciones={[
          {
            texto: "Se pierden menos casos reales, pero se disparan las falsas alarmas y cae el valor predictivo",
            esCorrecta: true,
            porQue:
              "Bajar el corte convierte casos perdidos en detectados —eso es lo que se gana— pero al mismo tiempo convierte descartados correctos en falsas alarmas. El servicio termina con muchas más derivaciones, y cada positivo significa menos. Es un intercambio, no una mejora.",
          },
          {
            texto: "Se gana en todo: el test se vuelve más preciso",
            porQue:
              "Ningún movimiento del corte mejora las dos direcciones a la vez. Los dos tipos de error están en celdas distintas de la tabla, y reducir uno siempre aumenta el otro. Por eso la decisión no la resuelve la estadística.",
          },
          {
            texto: "No cambia nada, porque la sensibilidad es una propiedad fija del cuestionario",
            porQue:
              "La sensibilidad y la especificidad NO son fijas: dependen de dónde se ponga el corte. El 88% de ambas corresponde específicamente al corte en 10, y se mueve apenas lo desplazás.",
          },
        ]}
      />

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
/* Aproximación de la binomial por la normal (ejemplo del dossier)     */
/* ------------------------------------------------------------------ */

function AproximacionNormal() {
  const n = 200;
  const p = 0.215;
  const capacidad = 49;
  const mu = n * p;
  const sigma = Math.sqrt(n * p * (1 - p));
  const zCorr = (capacidad + 0.5 - mu) / sigma;
  const zSinCorr = (capacidad - mu) / sigma;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-slate-700 dark:text-slate-300">
        Las distribuciones de 2.8 y la normal no son mundos separados. Cuando
        el número de ensayos de una binomial es grande, su forma se parece
        tanto a una campana que puede calcularse con ella. De Moivre lo
        demostró en 1733, medio siglo antes de que Gauss formalizara la normal.
      </p>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <p className="text-sm text-slate-700 dark:text-slate-300">
          <strong>El caso:</strong> el servicio tamiza a {n} estudiantes. ¿Qué
          probabilidad hay de recibir {capacidad} derivaciones o menos, que es
          el máximo que puede procesar en el mes? Calcularlo con la binomial
          exacta exigiría sumar cincuenta términos, cada uno con su propio
          coeficiente combinatorio.
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-3 text-sm">
          <div className="rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-800/60">
            <p className="text-[10px] uppercase tracking-wider text-slate-500">µ = np</p>
            <p className="font-serif text-xl font-semibold tabular-nums text-slate-900 dark:text-slate-100">
              {mu.toFixed(1)}
            </p>
          </div>
          <div className="rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-800/60">
            <p className="text-[10px] uppercase tracking-wider text-slate-500">σ = √(np(1−p))</p>
            <p className="font-serif text-xl font-semibold tabular-nums text-slate-900 dark:text-slate-100">
              {sigma.toFixed(2)}
            </p>
          </div>
          <div className="rounded-xl bg-emerald-50 px-3 py-2 dark:bg-emerald-950/30">
            <p className="text-[10px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              ¿np ≥ 5 y n(1−p) ≥ 5?
            </p>
            <p className="font-serif text-sm font-semibold tabular-nums text-slate-900 dark:text-slate-100">
              {mu.toFixed(0)} y {(n * (1 - p)).toFixed(0)} · se cumple
            </p>
          </div>
        </div>
      </div>

      <Desarrollo
        titulo="Aproximar la binomial con la normal"
        insignia={INSIGNIA}
        acento={ACENTO}
        pasos={[
          {
            expresion: <>µ = {n} × {p} = {mu.toFixed(1)}   ·   σ = √({n} × {p} × {(1 - p).toFixed(3)}) = {sigma.toFixed(2)}</>,
            explicacion:
              "Primero convertimos los parámetros de la binomial en los de una normal, con las fórmulas rápidas que ya usamos en 2.8.",
          },
          {
            expresion: <>Verificar: <V>np</V> = {mu.toFixed(0)} ≥ 5  y  <V>n</V>(1−<V>p</V>) = {(n * (1 - p)).toFixed(0)} ≥ 5</>,
            explicacion:
              "La aproximación se degrada cuando la binomial es muy asimétrica. Estas dos condiciones garantizan que tenga forma suficientemente acampanada. Acá se cumplen holgadamente.",
          },
          {
            expresion: (
              <>
                <V>Z</V> =
                <Frac arriba={<>{capacidad} + 0,5 − {mu.toFixed(1)}</>} abajo={sigma.toFixed(2)} />
                = {zCorr.toFixed(2)}
              </>
            ),
            explicacion:
              "Acá aparece la corrección de continuidad: sumamos 0,5 porque estamos aproximando una variable de conteo (que salta de 49 a 50) con una continua (que pasa por todos los valores intermedios). Como queremos incluir el 49, tomamos hasta 49,5.",
          },
          {
            expresion: <><V>P</V>(<V>X</V> ≤ {capacidad}) = <V>P</V>(<V>Z</V> ≤ {zCorr.toFixed(2)}) = {normalAcumulada(zCorr).toFixed(3)}</>,
            explicacion: `Hay un ${(normalAcumulada(zCorr) * 100).toFixed(1)}% de probabilidad de que las derivaciones queden dentro de la capacidad del servicio. Dicho al revés: aproximadamente una de cada siete veces el sistema se desborda. Un solo cálculo de z reemplazó cincuenta términos binomiales.`,
          },
          {
            expresion: <>Sin la corrección daría <V>Z</V> = {zSinCorr.toFixed(2)} → {(normalAcumulada(zSinCorr) * 100).toFixed(1)}%</>,
            explicacion: `Olvidar el 0,5 desplaza el resultado en ${Math.abs((normalAcumulada(zCorr) - normalAcumulada(zSinCorr)) * 100).toFixed(1)} puntos porcentuales. Con números chicos ese error se vuelve mucho mayor.`,
          },
        ]}
      />
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
