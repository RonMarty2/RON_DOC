"use client";

import { useMemo, useState } from "react";
import { binomial, proporcion, phq9Positivo } from "./calculos";
import {
  Definicion,
  Ejemplos,
  Ejemplo,
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
 * 2.7 — Variable aleatoria y distribución de probabilidad.
 *
 * El salto de eventos sueltos a variables completas. El interactivo arma la
 * distribución término por término y muestra que la esperanza casi nunca es
 * un valor observable.
 */
export function ModuloVariablesAleatorias({
  onContinuar,
}: {
  onContinuar: () => void;
}) {
  const p = proporcion(phq9Positivo);

  return (
    <div className="flex flex-col gap-6">
      <p className="text-slate-700 dark:text-slate-300">
        Hasta acá preguntamos por eventos: ¿da positivo o no? Dos opciones, una
        probabilidad para cada una. Pero el cuestionario no devuelve un sí o un
        no: devuelve un número entre 0 y 27, y cada uno de esos 28 valores tiene
        su propia probabilidad. Calcularlas una por una sería absurdo.
        Necesitamos describir el comportamiento completo de la variable{" "}
        <strong>de una sola vez</strong>.
      </p>

      <PasoTitulo numero={1} insignia={INSIGNIA}>
        De eventos sueltos a variables completas
      </PasoTitulo>

      <Definicion termino="Variable aleatoria">
        Una función que asigna un número a cada resultado de un experimento
        aleatorio. Se escribe con mayúscula (<V>X</V>) y sus valores posibles
        con minúscula (<V>x</V>).
      </Definicion>

      <div className="grid gap-4 sm:grid-cols-2">
        <Definicion termino="Discreta">
          Toma un número contable de valores, normalmente enteros. El puntaje
          del cuestionario (28 valores) o la cantidad de positivos en un grupo.
          <Ejemplos titulo="Ver discretas y continuas">
            <Ejemplo caso="DISCRETA — cantidad de positivos en un curso">
              0, 1, 2… no existe «2,5 estudiantes positivos».
            </Ejemplo>
            <Ejemplo caso="DISCRETA — puntaje del cuestionario">
              28 valores contables, del 0 al 27.
            </Ejemplo>
            <Ejemplo caso="CONTINUA — tiempo de reacción">
              Entre 340 y 341 ms hay infinitos valores posibles, aunque el
              aparato redondee.
            </Ejemplo>
            <Ejemplo caso="CONTINUA — peso, altura, temperatura">
              Siempre se puede meter un valor entre otros dos.
            </Ejemplo>
          </Ejemplos>
        </Definicion>
        <Definicion termino="Continua">
          Puede tomar cualquier valor dentro de un intervalo. Un tiempo de
          reacción en milisegundos, o la altura de una persona.
        </Definicion>
      </div>

      <MiniHistoria titulo="La distinción no es cuántos valores hay">
        Es si se pueden contar uno por uno. El cuestionario tiene 28 valores y
        es discreto; un intervalo de tiempo tiene infinitos y es continuo,
        aunque el instrumento lo redondee a milisegundos.
      </MiniHistoria>

      <PasoTitulo numero={2} insignia={INSIGNIA}>
        La distribución completa
      </PasoTitulo>

      <Definicion termino="Distribución de probabilidad">
        La función que asigna una probabilidad a cada valor posible de la
        variable. En variables discretas se llama <strong>función de masa</strong>{" "}
        y debe cumplir dos condiciones: ninguna probabilidad negativa, y que
        todas juntas sumen exactamente 1.
      </Definicion>

      <ConstructorDistribucion p={p} />

      <PasoTitulo numero={3} insignia={INSIGNIA}>
        Los dos números que resumen una distribución
      </PasoTitulo>

      <div className="grid gap-4 sm:grid-cols-2">
        <Definicion termino="Esperanza matemática E[X]">
          El promedio de los valores posibles, ponderado por sus
          probabilidades. Se escribe con la letra{" "}
          <Termino significa="Mu, la letra griega m. Se usa siempre para la media o el centro de una distribución teórica. Su equivalente en una muestra observada se escribe con x̄.">
            µ
          </Termino>{" "}
          y se calcula con una{" "}
          <Termino significa="Sigma mayúscula. Significa «sumá todo lo que viene a continuación, para cada valor posible». No es una operación nueva: es una forma corta de escribir una suma larga.">
            Σ
          </Termino>
          .
        </Definicion>
        <Definicion termino="Varianza Var(X)">
          Cuánto se dispersan los valores alrededor de la esperanza. Cada
          desvío al cuadrado, ponderado por su probabilidad. Se escribe{" "}
          <Termino significa="Sigma minúscula al cuadrado. La varianza está en unidades al cuadrado; su raíz, σ, es la desviación estándar, que vuelve a las unidades originales.">
            σ²
          </Termino>
          .
        </Definicion>
      </div>

      <TablaEsperanza p={p} />

      <Comprueba
        pregunta="Un cálculo da E[X] = 0,43 estudiantes positivos. Un colega dice que el resultado está mal porque no existe media persona. ¿Tiene razón?"
        opciones={[
          {
            texto: "No: la esperanza es un promedio de largo plazo, no una predicción de un caso",
            esCorrecta: true,
            porQue:
              "Significa que si repitieras el experimento muchísimas veces —elegir dos estudiantes al azar una y otra vez— el promedio de positivos por repetición tendería a 0,43. Es el mismo tipo de abstracción que «2,3 hijos por familia»: nadie tiene 2,3 hijos.",
          },
          {
            texto: "Sí: hay que redondear a 0 estudiantes",
            porQue:
              "Redondear destruye información. La esperanza se usa después en otros cálculos (como la varianza), y redondearla propagaría el error. El valor fraccionario es el correcto.",
          },
          {
            texto: "Sí: significa que el cálculo tiene un error aritmético",
            porQue:
              "El cálculo está bien: sumamos cada valor posible por su probabilidad y verificamos que las probabilidades den 1. Que el resultado no sea entero es esperable, no un síntoma de error.",
          },
        ]}
      />

      <Comprueba
        pregunta="Alguien te muestra una distribución donde las probabilidades de todos los valores posibles suman 0,87. ¿Qué se puede concluir?"
        opciones={[
          {
            texto: "Que falta algún valor posible: la lista está incompleta",
            esCorrecta: true,
            porQue:
              "Una distribución debe cubrir TODO el espacio muestral, y por el Axioma 2 esas probabilidades tienen que sumar exactamente 1. Si suman menos, hay resultados posibles que quedaron sin incluir. Verificar la suma es el control básico de cualquier distribución.",
          },
          {
            texto: "Que el 13% restante corresponde a resultados imposibles",
            porQue:
              "Los resultados imposibles tienen probabilidad 0 y no aportan nada a la suma. Un faltante de 0,13 significa que hay resultados POSIBLES sin listar, no imposibles.",
          },
          {
            texto: "Que es una distribución continua, no discreta",
            porQue:
              "En las continuas la condición también es que el área total bajo la curva valga 1. Ser continua no exime de sumar (o integrar) hasta 1.",
          },
        ]}
      />

      <Trampa
        error="esperar que la esperanza sea un valor observable"
        porQue="el nombre sugiere «lo que se espera ver», y rechazamos por imposible un resultado como 0.43 estudiantes."
        correccion="la esperanza es un promedio ponderado de largo plazo, no una predicción de un caso individual. Es el mismo tipo de abstracción que «2.3 hijos por familia»."
      />

      <Trampa
        error="leer P(X = x) = 0 en una variable continua como imposibilidad"
        porQue="en variables discretas, probabilidad cero sí significa que el evento no puede ocurrir."
        correccion="en variables continuas sólo los intervalos tienen probabilidad no nula; el valor exacto siempre da cero. Toda pregunta sobre una variable continua se formula sobre un rango."
      />

      <Puente etiquetaBoton="Ir a 2.8 · Distribuciones discretas" onContinuar={onContinuar}>
        <p>
          Calcular la función de masa a mano, valor por valor, funcionó con dos
          estudiantes. Con cien sería inviable.
        </p>
        <p>
          Por suerte no hace falta: ciertos procesos generan siempre el mismo
          tipo de distribución, y para cada uno existe una fórmula cerrada. El
          servicio necesita tres de ellas.
        </p>
      </Puente>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Construir la distribución y comprobar que suma 1                    */
/* ------------------------------------------------------------------ */

function ConstructorDistribucion({ p }: { p: number }) {
  const [n, setN] = useState(2);

  const valores = useMemo(
    () =>
      Array.from({ length: n + 1 }, (_, k) => ({
        k,
        prob: binomial(n, k, p),
      })),
    [n, p]
  );

  const suma = valores.reduce((s, v) => s + v.prob, 0);
  const esperanza = valores.reduce((s, v) => s + v.k * v.prob, 0);
  const maxProb = Math.max(...valores.map((v) => v.prob));

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <h4 className="font-serif text-lg font-semibold text-slate-900 dark:text-slate-100">
        La distribución completa, de una sola vez
      </h4>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
        Definimos <V>X</V> = cantidad de estudiantes que dan positivo al
        seleccionar <V>n</V> al azar. Cada barra es un valor posible con su
        probabilidad.
      </p>

      <label className="mt-4 flex flex-wrap items-center gap-3 text-sm">
        <span className="font-mono text-slate-600 dark:text-slate-400">
          n = {n} estudiantes
        </span>
        <input
          type="range"
          min={1}
          max={12}
          value={n}
          onChange={(e) => setN(Number(e.target.value))}
          className="h-2 flex-1 cursor-pointer accent-blue-600"
        />
      </label>

      <div className="mt-5 flex items-end justify-center gap-1.5" style={{ height: 160 }}>
        {valores.map((v) => (
          <div key={v.k} className="flex flex-1 flex-col items-center justify-end gap-1">
            <span className="text-[10px] tabular-nums text-slate-500 dark:text-slate-400">
              {(v.prob * 100).toFixed(1)}
            </span>
            <div
              className="w-full rounded-t bg-blue-500 transition-all"
              style={{ height: `${Math.max(2, (v.prob / maxProb) * 110)}px` }}
              title={`P(X = ${v.k}) = ${v.prob.toFixed(4)}`}
            />
            <span className="text-xs font-semibold tabular-nums text-slate-700 dark:text-slate-300">
              {v.k}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-1 text-center text-xs text-slate-400">
        valores posibles de X (cantidad de positivos)
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-emerald-50 px-4 py-3 text-sm dark:bg-emerald-950/30">
          <p className="font-semibold text-emerald-900 dark:text-emerald-200">
            Suma de todas = {suma.toFixed(4)}
          </p>
          <p className="mt-1 text-emerald-800/80 dark:text-emerald-200/80">
            Cumple la condición de la definición. Si no diera 1, faltaría algún
            valor del espacio muestral.
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 px-4 py-3 text-sm dark:bg-slate-800/60">
          <p className="font-semibold text-slate-800 dark:text-slate-200">
            E[X] = {esperanza.toFixed(4)}
          </p>
          <p className="mt-1 text-slate-600 dark:text-slate-400">
            {Number.isInteger(esperanza)
              ? "En este caso da un entero, pero eso es coincidencia."
              : "No es un valor que la variable pueda tomar: nunca vas a observar una fracción de estudiante."}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Esperanza y varianza, término por término                           */
/* ------------------------------------------------------------------ */

function TablaEsperanza({ p }: { p: number }) {
  const n = 2;
  const [revelados, setRevelados] = useState(0);

  const filas = useMemo(() => {
    const base = Array.from({ length: n + 1 }, (_, k) => {
      const prob = binomial(n, k, p);
      return { k, prob, aporteE: k * prob };
    });
    const esperanza = base.reduce((s, f) => s + f.aporteE, 0);
    return base.map((f) => ({
      ...f,
      desvio: (f.k - esperanza) ** 2,
      aporteVar: (f.k - esperanza) ** 2 * f.prob,
    }));
  }, [p]);

  const esperanza = filas.reduce((s, f) => s + f.aporteE, 0);
  const varianza = filas.reduce((s, f) => s + f.aporteVar, 0);

  // Sumas parciales: lo que llevamos acumulado hasta lo revelado
  const parcialProb = filas.slice(0, revelados).reduce((s, f) => s + f.prob, 0);
  const parcialE = filas.slice(0, revelados).reduce((s, f) => s + f.aporteE, 0);
  const parcialVar = filas.slice(0, revelados).reduce((s, f) => s + f.aporteVar, 0);
  const completo = revelados >= filas.length;

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h5 className="font-serif text-lg font-semibold text-slate-900 dark:text-slate-100">
            Armá la suma, término por término
          </h5>
          <div className="flex gap-2">
            {!completo && (
              <button
                type="button"
                onClick={() => setRevelados((r) => r + 1)}
                className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
              >
                {revelados === 0
                  ? "Calcular el primer término"
                  : `Calcular x = ${revelados}`}
              </button>
            )}
            {revelados > 0 && (
              <button
                type="button"
                onClick={() => setRevelados(0)}
                className="rounded-full border border-slate-200 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Reiniciar
              </button>
            )}
          </div>
        </div>

        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          La Σ no es magia: es sumar un término por cada valor posible de{" "}
          <V>X</V>. Con <V>n</V> = 2 hay tres términos. Calculalos uno por uno y
          mirá cómo se acumula el total.
        </p>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left dark:border-slate-700">
                <th className="py-2 pr-4 font-semibold text-slate-700 dark:text-slate-300">x</th>
                <th className="py-2 pr-4 font-semibold text-slate-700 dark:text-slate-300">
                  P(X = x)
                </th>
                <th className="py-2 pr-4 font-semibold text-slate-700 dark:text-slate-300">
                  x · P(X = x)
                </th>
                <th className="py-2 font-semibold text-slate-700 dark:text-slate-300">
                  (x − µ)² · P(X = x)
                </th>
              </tr>
            </thead>
            <tbody className="tabular-nums text-slate-600 dark:text-slate-400">
              {filas.map((f, i) => {
                const visible = i < revelados;
                const recienSalido = i === revelados - 1;
                return (
                  <tr
                    key={f.k}
                    className={
                      "border-b border-slate-100 transition dark:border-slate-800 " +
                      (recienSalido ? "bg-emerald-50 dark:bg-emerald-950/30" : "")
                    }
                  >
                    <td className="py-2 pr-4 font-semibold text-slate-800 dark:text-slate-200">
                      {f.k}
                    </td>
                    <td className="py-2 pr-4">
                      {visible ? f.prob.toFixed(4) : "—"}
                    </td>
                    <td className="py-2 pr-4">
                      {visible ? (
                        <>
                          <span className="text-slate-400">
                            {f.k} × {f.prob.toFixed(4)} =
                          </span>{" "}
                          <strong className="text-slate-800 dark:text-slate-200">
                            {f.aporteE.toFixed(4)}
                          </strong>
                        </>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="py-2">
                      {visible ? (
                        <>
                          <span className="text-slate-400">
                            {f.desvio.toFixed(4)} × {f.prob.toFixed(4)} =
                          </span>{" "}
                          <strong className="text-slate-800 dark:text-slate-200">
                            {f.aporteVar.toFixed(4)}
                          </strong>
                        </>
                      ) : (
                        "—"
                      )}
                    </td>
                  </tr>
                );
              })}
              <tr className="font-semibold text-slate-900 dark:text-slate-100">
                <td className="py-2 pr-4">Σ</td>
                <td className="py-2 pr-4">{parcialProb.toFixed(4)}</td>
                <td className="py-2 pr-4">{parcialE.toFixed(4)}</td>
                <td className="py-2">{parcialVar.toFixed(4)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
          {revelados === 0 ? (
            <p>
              Todavía no calculaste ningún término. La fila Σ está en cero
              porque no hay nada sumado.
            </p>
          ) : !completo ? (
            <p>
              Llevás <strong>{revelados}</strong> de {filas.length} términos.
              Las probabilidades suman{" "}
              <strong className="tabular-nums">{parcialProb.toFixed(4)}</strong>{" "}
              — todavía no llegan a 1, así que falta al menos un valor posible.
            </p>
          ) : (
            <p>
              Las probabilidades suman{" "}
              <strong className="tabular-nums">{parcialProb.toFixed(4)}</strong>
              : cumple la condición de la definición. Y la columna del medio dio{" "}
              <strong className="tabular-nums">{esperanza.toFixed(4)}</strong>,
              que es la esperanza; la última dio{" "}
              <strong className="tabular-nums">{varianza.toFixed(4)}</strong>,
              la varianza. Eso es todo lo que hace una Σ: acumular un término
              por valor.
            </p>
          )}
        </div>
      </div>

      <Desarrollo
        titulo="Esperanza matemática, término por término"
        insignia={INSIGNIA}
        acento={ACENTO}
        pasos={[
          {
            expresion: (
              <>
                <V>E</V>[<V>X</V>] = µ = Σ <V>x</V> · <V>P</V>(<V>X</V> = <V>x</V>)
              </>
            ),
            explicacion:
              "Se recorre cada valor posible, se lo multiplica por su probabilidad, y se suman todos esos productos. No es un promedio común: cada valor pesa según qué tan probable es.",
          },
          {
            expresion: (
              <>
                = (0)({filas[0].prob.toFixed(4)}) + (1)({filas[1].prob.toFixed(4)}) + (2)({filas[2].prob.toFixed(4)})
              </>
            ),
            explicacion:
              "Sustituimos los tres valores posibles de X con sus probabilidades. Fijate que el término de x = 0 aporta cero: multiplicar por cero anula ese sumando, por más probable que sea.",
          },
          {
            expresion: (
              <>
                = 0 + {filas[1].aporteE.toFixed(4)} + {filas[2].aporteE.toFixed(4)} = {esperanza.toFixed(4)}
              </>
            ),
            explicacion:
              "Al evaluar dos estudiantes al azar se esperan, en promedio, 0,43 positivos. Nunca vas a observar 0,43 personas: es un promedio de largo plazo. Guardá el número — en 2.8 vamos a comprobar que coincide con n·p.",
          },
        ]}
      />

      <Desarrollo
        titulo="Varianza, término por término"
        insignia={INSIGNIA}
        acento={ACENTO}
        pasos={[
          {
            expresion: (
              <>
                Var(<V>X</V>) = σ² = Σ (<V>x</V> − µ)² · <V>P</V>(<V>X</V> = <V>x</V>)
              </>
            ),
            explicacion:
              "Para cada valor: qué tan lejos está de la media, elevado al cuadrado (para que los desvíos negativos no se cancelen con los positivos), y ponderado por su probabilidad.",
          },
          {
            expresion: (
              <>
                = ({filas.map((f) => `(${f.k} − ${esperanza.toFixed(2)})²`).join(" + ")})…
              </>
            ),
            explicacion: `Primero calculamos cada desvío al cuadrado: ${filas.map((f) => f.desvio.toFixed(4)).join(", ")}. Ninguno puede ser negativo, justamente por el cuadrado.`,
          },
          {
            expresion: (
              <>= {filas.map((f) => f.aporteVar.toFixed(4)).join(" + ")} = {varianza.toFixed(4)}</>
            ),
            explicacion:
              "Cada desvío al cuadrado multiplicado por su probabilidad, y todo sumado. En 2.8 vamos a ver que la fórmula rápida n·p·(1−p) da exactamente este mismo número, sin recorrer valor por valor.",
          },
        ]}
      />
    </div>
  );
}
