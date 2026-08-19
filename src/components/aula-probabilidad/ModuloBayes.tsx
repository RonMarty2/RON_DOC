"use client";

import { useState } from "react";
import { tablaConfusion, modeloBayes } from "./calculos";
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
  FormulaAnotada,
} from "./narrativa";

const INSIGNIA = "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300";
const ACENTO = "border-amber-300 text-amber-700 dark:border-amber-700 dark:text-amber-400";

/**
 * 2.6 — Teorema de Bayes.
 *
 * Cierra el arco que abrió el preámbulo. La herramienta central es el
 * deslizador de prevalencia: con el MISMO instrumento, el valor predictivo
 * cambia radicalmente según a quién se tamice.
 */
export function ModuloBayes({ onContinuar }: { onContinuar: () => void }) {
  const t = tablaConfusion();
  const sens = t.sensibilidad;
  const esp = t.especificidad;
  const prev = t.prevalencia;

  const pPos = sens * prev + (1 - esp) * (1 - prev);
  const vpp = (sens * prev) / pPos;

  return (
    <div className="flex flex-col gap-6">
      <p className="text-slate-700 dark:text-slate-300">
        En los años setenta, Kahneman y Tversky le plantearon este problema a
        médicos, psicólogos y estadísticos entrenados: una enfermedad afecta al
        1% de la población, un test la detecta con 95% de acierto, una persona
        da positivo. ¿Qué probabilidad tiene de estar enferma? La respuesta
        mayoritaria fue <strong>95%</strong>. La correcta rondaba el{" "}
        <strong>16%</strong>. El error no era de aritmética: al ver el
        resultado del test, las personas se olvidaban de un dato que tenían
        delante — que la enfermedad es rara.
      </p>

      <PasoTitulo numero={1} insignia={INSIGNIA}>
        Qué hace exactamente el teorema
      </PasoTitulo>

      <Definicion termino="Teorema de Bayes">
        La herramienta que <strong>invierte</strong> una probabilidad
        condicional: pasa de <V>P</V>(evidencia | hipótesis), que es lo que
        reporta el instrumento, a <V>P</V>(hipótesis | evidencia), que es lo
        que le importa a la persona evaluada. No es una regla nueva: se deduce
        en dos líneas de la regla de la multiplicación de 2.5.
      </Definicion>

      <div className="grid gap-4 sm:grid-cols-3">
        <Definicion termino="Previa (a priori)">
          Lo que creíamos <em>antes</em> de ver la evidencia. En diagnóstico es
          la{" "}
          <Termino significa="Proporción de personas de la población que realmente tienen la condición. Es una propiedad de la población, no del test — y por eso no figura en el manual del instrumento.">
            prevalencia
          </Termino>
          .
        </Definicion>
        <Definicion termino="Verosimilitud">
          Qué tan probable sería observar esta evidencia <em>si</em> la
          hipótesis fuera cierta. En diagnóstico es la{" "}
          <Termino significa="De todas las personas que sí tienen la condición, qué proporción detecta el test. Se calculó en 2.3 como VP / (VP + FN).">
            sensibilidad
          </Termino>
          .
        </Definicion>
        <Definicion termino="Posterior">
          La creencia ya <em>actualizada</em> con la evidencia. En diagnóstico
          es el valor predictivo positivo — el número que buscamos.
          <Ejemplos titulo="Ver el mismo esquema en otros contextos">
            <Ejemplo caso="Previa 1% · evidencia: test positivo · posterior 16%">
              El problema original de Kahneman y Tversky. Casi todos responden
              95%.
            </Ejemplo>
            <Ejemplo caso="Previa 12,5% · evidencia: cuestionario positivo · posterior 51,2%">
              Nuestro caso: el del misterio con el que abrió el capítulo.
            </Ejemplo>
            <Ejemplo caso="Previa 40% · evidencia: mismo cuestionario · posterior ≈85%">
              Idéntico instrumento, población distinta. Probalo con el
              deslizador de abajo.
            </Ejemplo>
            <Ejemplo caso="Fuera de la clínica: un antivirus marca un archivo">
              Si casi ningún archivo tiene virus, la mayoría de las alarmas
              serán falsas por más bueno que sea el antivirus. Es la misma
              matemática.
            </Ejemplo>
          </Ejemplos>
        </Definicion>
      </div>

      <FormulaAnotada
        titulo="Cada parte de la fórmula, con nombre"
        partes={[
          { expresion: <><V>P</V>(<V>D</V>|+)</>, etiqueta: "posterior", significa: "Lo que buscamos: probabilidad de tener el trastorno DADO que el test dio positivo.", color: "verde" },
          { expresion: "=" },
          { expresion: <><V>P</V>(+|<V>D</V>)</>, etiqueta: "verosimilitud", significa: "La sensibilidad del test: 88%. Es lo único que trae el manual del instrumento.", color: "azul" },
          { expresion: "×" },
          { expresion: <><V>P</V>(<V>D</V>)</>, etiqueta: "previa", significa: "La prevalencia: 12,5%. Éste es el dato que la intuición olvida, y el que decide el resultado.", color: "ambar" },
          { expresion: "÷" },
          { expresion: <><V>P</V>(+)</>, etiqueta: "evidencia total", significa: "Probabilidad de dar positivo por cualquier vía. Casi nunca viene dado: hay que construirlo sumando los dos caminos posibles.", color: "gris" },
        ]}
      />

      <Definicion termino="Probabilidad total">
        El denominador de Bayes casi nunca viene dado: hay que construirlo. La
        evidencia puede aparecer por <strong>dos caminos</strong> — porque la
        hipótesis es cierta, o porque no lo es — y hay que sumar ambos,
        ponderados por sus probabilidades previas.
      </Definicion>

      <PasoTitulo numero={2} insignia={INSIGNIA}>
        Los dos caminos, contando personas
      </PasoTitulo>

      <ArbolFrecuencias sens={sens} esp={esp} prev={prev} />

      <PasoTitulo numero={3} insignia={INSIGNIA}>
        El cálculo, línea por línea
      </PasoTitulo>

      <Desarrollo
        titulo="Paso A — construir el denominador"
        insignia={INSIGNIA}
        acento={ACENTO}
        pasos={[
          {
            expresion: (
              <>
                <V>P</V>(+) = <V>P</V>(+|<V>D</V>)·<V>P</V>(<V>D</V>) + <V>P</V>(+|<V>D</V><sup>c</sup>)·<V>P</V>(<V>D</V><sup>c</sup>)
              </>
            ),
            explicacion:
              "Dar positivo puede pasar por dos vías distintas: que la persona tenga el trastorno y el test acierte, o que esté sana y el test se equivoque. Sumamos las dos, cada una pesada por qué tan frecuente es esa población.",
          },
          {
            expresion: <>Camino 1: ({sens.toFixed(3)}) × ({prev.toFixed(3)}) = {(sens * prev).toFixed(3)}</>,
            explicacion:
              "Verdaderos positivos: la sensibilidad (88%) multiplicada por la prevalencia (12,5%). Es la fracción de TODA la población que tiene el trastorno y además da positivo.",
          },
          {
            expresion: (
              <>
                <V>P</V>(+|<V>D</V><sup>c</sup>) = 1 − {esp.toFixed(3)} = {(1 - esp).toFixed(3)}
              </>
            ),
            explicacion:
              "Antes del camino 2 falta un dato que no teníamos: qué probabilidad hay de dar positivo estando sano. Sale por la regla del complemento de 2.2, restándole la especificidad a 1.",
          },
          {
            expresion: <>Camino 2: ({(1 - esp).toFixed(3)}) × ({(1 - prev).toFixed(3)}) = {((1 - esp) * (1 - prev)).toFixed(3)}</>,
            explicacion:
              "Falsos positivos: la tasa de falsa alarma (12%) por la proporción de gente sana (87,5%). Acá está la clave — hay tanta gente sana que sus pocas falsas alarmas suman muchísimo.",
          },
          {
            expresion: <><V>P</V>(+) = {(sens * prev).toFixed(3)} + {((1 - esp) * (1 - prev)).toFixed(3)} = {pPos.toFixed(3)}</>,
            explicacion:
              "Los dos sumandos son casi idénticos: 0,110 contra 0,105. Casi la mitad de todos los positivos del sistema viene de personas sanas. Ése es el corazón del misterio.",
          },
        ]}
      />

      <Desarrollo
        titulo="Paso B — aplicar el teorema"
        insignia={INSIGNIA}
        acento={ACENTO}
        pasos={[
          {
            expresion: (
              <>
                <V>P</V>(<V>D</V>|+) =
                <Frac
                  arriba={<><V>P</V>(+|<V>D</V>) · <V>P</V>(<V>D</V>)</>}
                  abajo={<><V>P</V>(+)</>}
                />
              </>
            ),
            explicacion:
              "Arriba va el camino de los verdaderos positivos; abajo, todos los positivos juntos. Literalmente: de todo lo que dio positivo, ¿qué parte era real?",
          },
          {
            expresion: (
              <>
                =
                <Frac
                  arriba={<>({sens.toFixed(3)}) × ({prev.toFixed(3)})</>}
                  abajo={pPos.toFixed(3)}
                />
                =
                <Frac arriba={(sens * prev).toFixed(3)} abajo={pPos.toFixed(3)} />
              </>
            ),
            explicacion:
              "Sustituimos: el numerador ya lo habíamos calculado como camino 1, y el denominador es el total que acabamos de construir.",
          },
          {
            expresion: <>= {vpp.toFixed(3)} = {(vpp * 100).toFixed(1)}%</>,
            explicacion: `Comprobación contra el archivo: de los ${t.positivos} estudiantes que dieron positivo, ${t.VP} tenían diagnóstico confirmado. ${t.VP}/${t.positivos} = ${t.vpp.toFixed(3)}. El teorema reproduce exactamente el conteo directo.`,
          },
        ]}
      />

      <Comprueba
        pregunta="Un colega concluye: «el test acierta el 88% de las veces, así que si diste positivo tenés 88% de probabilidad de estar deprimido». ¿Dónde está el error?"
        pista="Fijate qué condiciona cada número: qué se sabe ya, y qué se está preguntando."
        opciones={[
          {
            texto: "Confunde P(positivo | trastorno) con P(trastorno | positivo)",
            esCorrecta: true,
            porQue:
              "El 88% responde «de los que TIENEN el trastorno, ¿a cuántos detecto?» — parte de saber que la persona está enferma. Pero al recibir un resultado no sabemos eso: sabemos que dio positivo. La pregunta correcta condiciona al revés, y su respuesta es 51,2%. Es la falacia de la tasa base.",
          },
          {
            texto: "El 88% está mal calculado",
            porQue:
              "El 88% es correcto: sale de 22/25 y coincide con el estudio original publicado. El problema no es el número, sino qué pregunta responde.",
          },
          {
            texto: "Falta considerar la especificidad",
            porQue:
              "La especificidad sí interviene (a través de la tasa de falsos positivos), pero aunque la incluyera seguiría faltando lo esencial: la prevalencia. Sin ella no se puede calcular el valor predictivo, por más completo que sea el manual del test.",
          },
        ]}
      />

      <MiniHistoria titulo="Por qué la mitad de las alarmas son falsas">
        Hay siete veces más gente sana que enferma. Aunque cada persona sana
        tenga apenas un {((1 - esp) * 100).toFixed(0)}% de chance de dar falso
        positivo, en total generan casi tantos positivos como los enfermos
        detectados. La prevalencia no es un dato de contexto:{" "}
        <strong>es la mitad del cálculo</strong>.
      </MiniHistoria>

      <PasoTitulo numero={4} insignia={INSIGNIA}>
        El mismo test, distintas poblaciones
      </PasoTitulo>
      <p className="text-sm text-slate-700 dark:text-slate-300">
        Mové la prevalencia sin tocar el instrumento — sensibilidad y
        especificidad quedan fijas en 88%. El valor predictivo cambia
        radicalmente.
      </p>

      <DeslizadorPrevalencia sens={sens} esp={esp} />

      <div className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200">
        <strong>La consecuencia práctica:</strong> si el servicio tamiza a toda
        la universidad, trabaja con la prevalencia general y su valor
        predictivo ronda el 51%. Si en cambio tamiza sólo a estudiantes que ya
        consultaron por malestar —una población con prevalencia mucho más
        alta— el mismo cuestionario, sin cambiar una sola pregunta, pasa a
        tener un valor predictivo mucho mayor.{" "}
        <strong>El instrumento no mejora ni empeora: cambia la población.</strong>
      </div>

      <Comprueba
        pregunta="El servicio decide tamizar sólo a estudiantes que ya pidieron ayuda por malestar, donde la prevalencia ronda el 40%. Usa el MISMO cuestionario. ¿Qué pasa con el valor predictivo positivo?"
        opciones={[
          {
            texto: "Sube mucho, aunque el instrumento no cambió en nada",
            esCorrecta: true,
            porQue:
              "El valor predictivo depende de la prevalencia tanto como del test. Al tamizar una población donde la condición es tres veces más frecuente, un positivo pasa a significar algo muy distinto: cerca del 85% en lugar del 51%. El cuestionario es idéntico; lo que cambió es a quién se aplica.",
          },
          {
            texto: "Se mantiene igual, porque el test es el mismo",
            porQue:
              "La sensibilidad y la especificidad sí se mantienen: son propiedades del instrumento. Pero el valor predictivo no es una propiedad del instrumento — mezcla el test con la población, y por eso se mueve.",
          },
          {
            texto: "Baja, porque hay más casos posibles de confundir",
            porQue:
              "Al revés: con más enfermos en la población, los verdaderos positivos crecen y los falsos positivos disminuyen (hay menos gente sana disponible para generar falsas alarmas). El numerador sube y el denominador baja.",
          },
        ]}
      />

      <Trampa
        error="la falacia de la tasa base — igualar P(D|+) con P(+|D)"
        porQue="ambas se describen coloquialmente como «la precisión del test», pero condicionan en direcciones opuestas. Y la prevalencia no figura en el manual del instrumento, así que se olvida."
        correccion="calcular siempre el valor predictivo explícitamente, y desconfiar de cualquier interpretación de un resultado positivo que no mencione la prevalencia de la población donde se aplicó."
      />

      <Trampa
        error="omitir la prevalencia porque no viene en el manual"
        porQue="los manuales técnicos reportan sensibilidad y especificidad, que son propiedades del test. La prevalencia es una propiedad de la población y hay que buscarla aparte."
        correccion="sin un valor de prevalencia de la población donde se va a aplicar, el valor predictivo simplemente no se puede calcular — y sin él, un resultado positivo no se puede interpretar."
      />

      <Comprueba
        pregunta="En el cálculo, los dos sumandos del denominador dieron 0,110 y 0,105. ¿Qué representa cada uno y por qué importa que sean parecidos?"
        opciones={[
          {
            texto: "Verdaderos y falsos positivos: como son casi iguales, la mitad de las alarmas viene de gente sana",
            esCorrecta: true,
            porQue:
              "0,110 son los enfermos detectados y 0,105 los sanos con falsa alarma. Que sean casi idénticos es todo el misterio: hay siete veces más gente sana que enferma, así que aunque cada sana tenga poca chance de falsa alarma, en conjunto generan casi tantas alarmas como los enfermos reales.",
          },
          {
            texto: "Sensibilidad y especificidad: son parecidos porque ambas valen 88%",
            porQue:
              "La sensibilidad y la especificidad son 0,880 cada una, no 0,110 y 0,105. Esos dos números son el producto de cada tasa por el tamaño de su población — ahí está la clave que la intuición se saltea.",
          },
          {
            texto: "Los positivos y los negativos del tamizaje",
            porQue:
              "Los negativos no entran en este denominador: P(+) suma únicamente las dos formas de LLEGAR a un positivo. Los negativos quedan afuera del cálculo del valor predictivo positivo.",
          },
        ]}
      />

      <Puente etiquetaBoton="Ir a 2.7 · Variables aleatorias" onContinuar={onContinuar}>
        <p>
          Con esto cerramos el bloque de probabilidad: sabemos definirla,
          calcularla con tablas y conteo, combinarla y actualizarla con
          evidencia. El misterio del inicio quedó resuelto.
        </p>
        <p>
          Pero todo lo que hicimos trabajó con <strong>eventos sueltos</strong>:
          da positivo o no, tiene el diagnóstico o no. El cuestionario, en
          cambio, no devuelve un sí o un no: devuelve un número entre 0 y 27, y
          cada valor tiene su propia probabilidad. Describir eso de una sola vez
          exige una herramienta distinta.
        </p>
      </Puente>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Árbol de frecuencias naturales sobre 1000 personas                  */
/* ------------------------------------------------------------------ */

function ArbolFrecuencias({
  sens,
  esp,
  prev,
}: {
  sens: number;
  esp: number;
  prev: number;
}) {
  const m = modeloBayes(prev, sens, esp, 1000);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <h4 className="font-serif text-lg font-semibold text-slate-900 dark:text-slate-100">
        Los dos caminos hacia un positivo
      </h4>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
        Con 1,000 estudiantes es más fácil de ver que con porcentajes: se
        cuentan personas, no fracciones.
      </p>

      <div className="mt-5 flex flex-col items-center gap-3">
        <div className="rounded-xl border-2 border-slate-300 px-6 py-2.5 text-center dark:border-slate-600">
          <p className="font-serif text-2xl font-semibold tabular-nums text-slate-900 dark:text-slate-100">
            {m.N.toLocaleString("es")}
          </p>
          <p className="text-xs text-slate-500">estudiantes tamizados</p>
        </div>

        <div className="grid w-full gap-3 sm:grid-cols-2">
          <div className="rounded-xl border-2 border-rose-300 bg-rose-50/50 p-4 dark:border-rose-800 dark:bg-rose-950/20">
            <p className="text-xs font-semibold uppercase tracking-wider text-rose-700 dark:text-rose-300">
              Sí tienen el trastorno
            </p>
            <p className="font-serif text-2xl font-semibold tabular-nums text-slate-900 dark:text-slate-100">
              {m.enfermos}
            </p>
            <div className="mt-3 space-y-1.5 text-sm">
              <p className="rounded-lg bg-rose-500 px-3 py-1.5 font-semibold text-white">
                {m.VP} dan positivo <span className="opacity-75">(detectados)</span>
              </p>
              <p className="rounded-lg bg-white px-3 py-1.5 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                {m.FN} dan negativo <span className="opacity-75">(se escapan)</span>
              </p>
            </div>
          </div>

          <div className="rounded-xl border-2 border-slate-300 bg-slate-50/50 p-4 dark:border-slate-700 dark:bg-slate-800/30">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              No lo tienen
            </p>
            <p className="font-serif text-2xl font-semibold tabular-nums text-slate-900 dark:text-slate-100">
              {m.sanos}
            </p>
            <div className="mt-3 space-y-1.5 text-sm">
              <p className="rounded-lg bg-amber-400 px-3 py-1.5 font-semibold text-amber-950">
                {m.FP} dan positivo <span className="opacity-75">(falsas alarmas)</span>
              </p>
              <p className="rounded-lg bg-white px-3 py-1.5 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                {m.VN} dan negativo <span className="opacity-75">(descartados)</span>
              </p>
            </div>
          </div>
        </div>

        <div className="w-full rounded-xl bg-blue-50 px-4 py-3 text-sm text-blue-900 dark:bg-blue-950/30 dark:text-blue-200">
          En total dan positivo{" "}
          <strong className="tabular-nums">{m.positivos}</strong> personas:{" "}
          {m.VP} enfermas y {m.FP} sanas. De ahí sale el valor predictivo:{" "}
          <strong className="tabular-nums">
            {m.VP}/{m.positivos} = {(m.vpp * 100).toFixed(1)}%
          </strong>
          .
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Deslizador de prevalencia                                           */
/* ------------------------------------------------------------------ */

const REFERENCIAS = [
  { prev: 2, texto: "casi seguramente una falsa alarma" },
  { prev: 5, texto: "probablemente una falsa alarma" },
  { prev: 12.5, texto: "una moneda al aire" },
  { prev: 30, texto: "probablemente un caso real" },
  { prev: 50, texto: "casi seguramente un caso real" },
];

function DeslizadorPrevalencia({ sens, esp }: { sens: number; esp: number }) {
  const [prevPct, setPrevPct] = useState(12.5);
  const prev = prevPct / 100;
  const vpp = (sens * prev) / (sens * prev + (1 - esp) * (1 - prev));

  const ref =
    [...REFERENCIAS].sort(
      (a, b) => Math.abs(a.prev - prevPct) - Math.abs(b.prev - prevPct)
    )[0];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <label className="flex flex-wrap items-center gap-4">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Prevalencia en la población tamizada
        </span>
        <span className="font-serif text-xl font-semibold tabular-nums text-blue-700 dark:text-blue-300">
          {prevPct.toFixed(1)}%
        </span>
        <input
          type="range"
          min={1}
          max={60}
          step={0.5}
          value={prevPct}
          onChange={(e) => setPrevPct(Number(e.target.value))}
          className="h-2 w-full cursor-pointer accent-blue-600"
        />
      </label>

      <div className="mt-5 flex flex-wrap items-end gap-6">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Valor predictivo positivo
          </p>
          <p className="font-serif text-4xl font-semibold tabular-nums text-slate-900 dark:text-slate-100 sm:text-5xl">
            {(vpp * 100).toFixed(1)}%
          </p>
        </div>
        <p className="flex-1 text-sm text-slate-600 dark:text-slate-400">
          Un resultado positivo significa:{" "}
          <strong className="text-slate-800 dark:text-slate-200">
            {ref.texto}
          </strong>
          .
        </p>
      </div>

      <div className="mt-4 h-4 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-400 to-emerald-500 transition-[width] duration-200"
          style={{ width: `${vpp * 100}%` }}
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {REFERENCIAS.map((r) => (
          <button
            key={r.prev}
            type="button"
            onClick={() => setPrevPct(r.prev)}
            className={
              "rounded-full border px-3 py-1.5 text-xs font-medium transition " +
              (Math.abs(prevPct - r.prev) < 0.3
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-slate-200 text-slate-600 hover:border-blue-300 dark:border-slate-700 dark:text-slate-400")
            }
          >
            {r.prev}%
          </button>
        ))}
      </div>
      <p className="mt-3 text-xs text-slate-500 dark:text-slate-500">
        Sensibilidad y especificidad quedan fijas en{" "}
        {(sens * 100).toFixed(0)}% — el instrumento es exactamente el mismo en
        todos los casos.
      </p>
    </div>
  );
}
