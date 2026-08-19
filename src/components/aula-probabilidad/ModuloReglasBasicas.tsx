"use client";

import { useState } from "react";
import { ESTUDIANTES } from "@content/aula-probabilidad/dataset";
import { contar, proporcion, condicional, phq9Positivo, gad7Positivo } from "./calculos";
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

const INSIGNIA = "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300";
const ACENTO = "border-indigo-300 text-indigo-700 dark:border-indigo-700 dark:text-indigo-300";

/**
 * 2.5 — Reglas básicas: suma, multiplicación e independencia.
 *
 * El punto alto del apartado es comprobar que depresión y ansiedad NO son
 * independientes: la comorbilidad se ve como una diferencia entre lo esperado
 * bajo independencia (~4.5 casos) y lo observado (17).
 */
export function ModuloReglasBasicas({ onContinuar }: { onContinuar: () => void }) {
  const total = ESTUDIANTES.length;
  const soloA = contar((e) => phq9Positivo(e) && !gad7Positivo(e));
  const soloB = contar((e) => !phq9Positivo(e) && gad7Positivo(e));
  const ambos = contar((e) => phq9Positivo(e) && gad7Positivo(e));
  const ninguno = total - soloA - soloB - ambos;

  const pA = proporcion(phq9Positivo);
  const pB = proporcion(gad7Positivo);
  const pAB = ambos / total;
  const pUnion = (soloA + soloB + ambos) / total;

  const cond = condicional(gad7Positivo, phq9Positivo);
  const esperadoIndep = pA * pB * total;

  return (
    <div className="flex flex-col gap-6">
      <p className="text-slate-700 dark:text-slate-300">
        Dos círculos que se solapan sobre una hoja. Si sumás el área de cada
        uno por separado, la zona compartida queda contada dos veces y el total
        te da de más. Hay que restarla una vez. Ese dibujo es toda la lógica de
        la regla de la suma.
      </p>

      <PasoTitulo numero={1} insignia={INSIGNIA}>
        Cuándo se suman las probabilidades
      </PasoTitulo>

      <Definicion termino="Regla de la suma">
        Para dos eventos cualesquiera, la probabilidad de que ocurra{" "}
        <strong>alguno</strong> de los dos es la suma de sus probabilidades
        menos la de la intersección, que si no quedaría contada dos veces.
      </Definicion>

      <VennInteractivo
        soloA={soloA}
        soloB={soloB}
        ambos={ambos}
        ninguno={ninguno}
        total={total}
      />

      <Desarrollo
        titulo="Por qué hay que restar la intersección"
        insignia={INSIGNIA}
        acento={ACENTO}
        pasos={[
          {
            expresion: (
              <>
                <V>P</V>(<V>A</V>) + <V>P</V>(<V>B</V>) = {pA.toFixed(3)} + {pB.toFixed(3)} = {(pA + pB).toFixed(3)}
              </>
            ),
            explicacion: `Si sumamos sin más, obtenemos ${((pA + pB) * total).toFixed(0)} estudiantes. Pero contando el diagrama sólo hay ${soloA + soloB + ambos} con al menos un positivo. Sobran ${ambos}.`,
          },
          {
            expresion: <>Sobran exactamente los {ambos} de la zona compartida</>,
            explicacion: `Los ${ambos} que dan positivo en los dos aparecen una vez en el círculo de depresión y otra vez en el de ansiedad. Los contamos dos veces.`,
          },
          {
            expresion: (
              <>
                <V>P</V>(<V>A</V> ∪ <V>B</V>) = <V>P</V>(<V>A</V>) + <V>P</V>(<V>B</V>) − <V>P</V>(<V>A</V> ∩ <V>B</V>)
              </>
            ),
            explicacion: "Por eso la regla resta la intersección una vez: para dejar de contar dos veces a quienes están en ambos grupos.",
          },
          {
            expresion: (
              <>= {pA.toFixed(3)} + {pB.toFixed(3)} − {pAB.toFixed(3)} = {pUnion.toFixed(3)}</>
            ),
            explicacion: `Comprobación contando directo: ${soloA + soloB + ambos}/${total} = ${pUnion.toFixed(3)}. Coincide. Si los eventos fueran mutuamente excluyentes la intersección valdría 0 y la fórmula se reduciría al Axioma 3 de 2.2.`,
          },
        ]}
      />

      <PasoTitulo numero={2} insignia={INSIGNIA}>
        Cuándo se multiplican
      </PasoTitulo>

      <Definicion termino="Regla de la multiplicación">
        La probabilidad de que ocurran <strong>los dos</strong> es la
        probabilidad del primero por la del segundo{" "}
        <em>dado que el primero ya ocurrió</em>. Sale de despejar la definición
        de probabilidad condicional de 2.3; no es una regla nueva.
      </Definicion>

      <Definicion termino="Independencia">
        Dos eventos son independientes cuando conocer uno{" "}
        <strong>no modifica</strong> la probabilidad del otro. Sólo en ese caso
        la regla se simplifica a multiplicar las dos probabilidades sueltas.
        <Ejemplos titulo="Ver casos independientes y dependientes">
          <Ejemplo caso="INDEPENDIENTES — dos tiradas de un dado">
            Que la primera haya salido 6 no cambia en nada la segunda. El dado
            no tiene memoria.
          </Ejemplo>
          <Ejemplo caso="INDEPENDIENTES — moneda y dado tirados juntos">
            Saber que salió cara no dice nada sobre qué cara del dado salió.
          </Ejemplo>
          <Ejemplo caso="DEPENDIENTES — sacar dos cartas sin reponer">
            Si la primera fue un as, quedan 3 ases en 51 cartas: la segunda
            probabilidad cambió.
          </Ejemplo>
          <Ejemplo caso="DEPENDIENTES — depresión y ansiedad">
            Es el caso de abajo: saber que alguien dio positivo en una
            cuadruplica la probabilidad de la otra.
          </Ejemplo>
        </Ejemplos>
      </Definicion>

      <MiniHistoria titulo="Excluyentes ≠ independientes">
        <strong>Mutuamente excluyentes</strong> significa que no pueden ocurrir
        juntos. <strong>Independientes</strong> significa que uno no informa
        sobre el otro. Son cosas distintas: de hecho, dos eventos excluyentes
        con probabilidad no nula son necesariamente <em>dependientes</em>,
        porque saber que ocurrió uno garantiza que el otro no ocurrió.
      </MiniHistoria>

      <PasoTitulo numero={3} insignia={INSIGNIA}>
        ¿Son independientes la depresión y la ansiedad?
      </PasoTitulo>
      <p className="text-sm text-slate-700 dark:text-slate-300">
        La independencia se <strong>verifica</strong>, no se supone. Y la forma
        de verificarla es comparar lo que predice la fórmula simplificada
        contra lo que realmente hay en el archivo.
      </p>

      <ComparacionIndependencia
        esperado={esperadoIndep}
        observado={ambos}
        total={total}
      />

      <Desarrollo
        titulo="La condicional lo confirma"
        insignia={INSIGNIA}
        acento={ACENTO}
        pasos={[
          {
            expresion: (
              <>
                Si fueran independientes: <V>P</V>(<V>B</V> | <V>A</V>) = <V>P</V>(<V>B</V>)
              </>
            ),
            explicacion:
              "Ésa es la definición: dos eventos son independientes cuando saber que ocurrió uno NO cambia la probabilidad del otro. Así que basta comparar los dos lados.",
          },
          {
            expresion: (
              <>
                <V>P</V>(<V>B</V> | <V>A</V>) =
                <Frac
                  arriba={<><V>P</V>(<V>A</V> ∩ <V>B</V>)</>}
                  abajo={<><V>P</V>(<V>A</V>)</>}
                />
                =
                <Frac arriba={pAB.toFixed(3)} abajo={pA.toFixed(3)} />
              </>
            ),
            explicacion: `Usamos la definición de probabilidad condicional de 2.3: de los ${soloA + ambos} que dieron positivo en depresión, ${ambos} también dieron positivo en ansiedad.`,
          },
          {
            expresion: (
              <>= {cond.p.toFixed(3)} = {(cond.p * 100).toFixed(1)}%</>
            ),
            explicacion: `Ahora comparamos: en la población general el ${(pB * 100).toFixed(1)}% da positivo en ansiedad, pero entre los que ya dieron positivo en depresión sube al ${(cond.p * 100).toFixed(1)}%. Casi cuatro veces más.`,
          },
          {
            expresion: (
              <>
                {(cond.p * 100).toFixed(1)}% ≠ {(pB * 100).toFixed(1)}%  →  NO son independientes
              </>
            ),
            explicacion:
              "Saber un resultado cambia por completo lo que se espera del otro. Este fenómeno se llama comorbilidad y es uno de los hallazgos más replicados de la psicopatología: por eso los dos cuestionarios fueron desarrollados por el mismo equipo y suelen administrarse juntos.",
          },
        ]}
      />

      <Comprueba
        pregunta="Un coordinador quiere estimar cuántos estudiantes darán positivo en ambos cuestionarios el próximo semestre, y multiplica las dos probabilidades individuales. ¿Qué va a pasar?"
        opciones={[
          {
            texto: "Va a subestimar gravemente el número real",
            esCorrecta: true,
            porQue: `Multiplicar supone independencia, y acá no la hay. La cuenta predice ${esperadoIndep.toFixed(1)} casos dobles cuando en realidad hay ${ambos}: se queda corto por un factor de casi cuatro. Planificaría un circuito para la mitad de la gente que va a llegar.`,
          },
          {
            texto: "Va a sobreestimar el número real",
            porQue: `Al revés: multiplicar da ${esperadoIndep.toFixed(1)}, muy por debajo de los ${ambos} observados. La dependencia entre depresión y ansiedad hace que coincidan MÁS de lo que predice el azar, no menos.`,
          },
          {
            texto: "Va a estar bien: así se calcula la intersección",
            porQue: `La fórmula P(A ∩ B) = P(A) · P(B) sólo vale SI los eventos son independientes, y eso hay que verificarlo antes. Acá verificamos que no lo son: P(B|A) = ${(cond.p * 100).toFixed(1)}% contra P(B) = ${(pB * 100).toFixed(1)}%.`,
          },
        ]}
      />

      <div className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200">
        <strong>Por qué importa en la práctica:</strong> si el servicio tratara
        los dos tamizajes como problemas separados, estaría diseñando dos
        circuitos para una población que en buena parte es la misma —{" "}
        {ambos} de los {soloA + soloB + ambos} estudiantes marcados aparecen en
        ambas listas. Reconocer la dependencia permite citar una sola vez y
        evaluar las dos dimensiones juntas. Este fenómeno se llama{" "}
        <strong>comorbilidad</strong> y es uno de los hallazgos más replicados
        de la psicopatología.
      </div>

      <Comprueba
        pregunta="Dar positivo y dar negativo en el mismo cuestionario no pueden ocurrir juntos. ¿Son eventos independientes?"
        pista="Independiente significa que saber uno no cambia la probabilidad del otro. Probá aplicar esa definición."
        opciones={[
          {
            texto: "No: son mutuamente excluyentes, y eso los vuelve fuertemente dependientes",
            esCorrecta: true,
            porQue:
              "Si sé que diste positivo, la probabilidad de que hayas dado negativo pasa a ser 0. Saber uno cambió el otro por completo — todo lo contrario de la independencia. Dos eventos excluyentes con probabilidad no nula siempre son dependientes.",
          },
          {
            texto: "Sí: como no pueden ocurrir juntos, no se afectan entre sí",
            porQue:
              "Ésa es la confusión más común del apartado. «Excluyentes» se refiere a si pueden coexistir; «independientes», a si uno informa sobre el otro. Que no puedan coexistir es justamente la información más fuerte posible.",
          },
          {
            texto: "Depende de la prevalencia",
            porQue:
              "La prevalencia no interviene: la relación entre un evento y su complemento es lógica, no empírica. Saber que ocurrió uno garantiza que el otro no, sea cual sea la población.",
          },
        ]}
      />

      <Trampa
        error="multiplicar probabilidades sin verificar la independencia"
        porQue="la fórmula simplificada es más fácil de recordar y no exige datos adicionales."
        correccion={`comparar siempre P(B|A) con P(B) antes de simplificar. Acá habría predicho ${esperadoIndep.toFixed(1)} casos dobles donde hay ${ambos}: un error de casi cuatro veces. En psicología, dos variables clínicas rara vez son independientes.`}
      />

      <Puente etiquetaBoton="Ir a 2.6 · Teorema de Bayes" onContinuar={onContinuar}>
        <p>
          Con esto cerramos las herramientas de cálculo: sabemos combinar
          probabilidades en las dos direcciones y verificar independencia.
        </p>
        <p>
          Pero queda pendiente la pregunta que abrió el capítulo. Sabemos que
          el tamizaje tiene 88% de sensibilidad. Un estudiante da positivo y
          pregunta lo único que le importa: ¿qué probabilidad tengo? Esa
          pregunta <strong>invierte</strong> la dirección de la condicional.
        </p>
      </Puente>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Venn con los números reales                                         */
/* ------------------------------------------------------------------ */

function VennInteractivo({
  soloA,
  soloB,
  ambos,
  ninguno,
  total,
}: {
  soloA: number;
  soloB: number;
  ambos: number;
  ninguno: number;
  total: number;
}) {
  const [modo, setModo] = useState<"union" | "interseccion">("union");
  const enUnion = soloA + soloB + ambos;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h4 className="font-serif text-lg font-semibold text-slate-900 dark:text-slate-100">
          Los dos cuestionarios, en un diagrama
        </h4>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setModo("union")}
            className={
              "rounded-full px-3 py-1.5 text-sm font-semibold transition " +
              (modo === "union"
                ? "bg-blue-600 text-white"
                : "border border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-300")
            }
          >
            A ∪ B (alguno)
          </button>
          <button
            type="button"
            onClick={() => setModo("interseccion")}
            className={
              "rounded-full px-3 py-1.5 text-sm font-semibold transition " +
              (modo === "interseccion"
                ? "bg-blue-600 text-white"
                : "border border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-300")
            }
          >
            A ∩ B (ambos)
          </button>
        </div>
      </div>

      <svg viewBox="0 0 360 190" className="mx-auto mt-4 w-full max-w-md" role="img" aria-label="Diagrama de Venn">
        <rect x="1" y="1" width="358" height="188" rx="10" className="fill-slate-50 stroke-slate-200 dark:fill-slate-800/40 dark:stroke-slate-700" />
        <circle
          cx="140" cy="95" r="72"
          className={
            modo === "union"
              ? "fill-blue-500/40 stroke-blue-600"
              : "fill-blue-500/10 stroke-blue-400"
          }
          strokeWidth="2"
        />
        <circle
          cx="220" cy="95" r="72"
          className={
            modo === "union"
              ? "fill-amber-500/40 stroke-amber-600"
              : "fill-amber-500/10 stroke-amber-400"
          }
          strokeWidth="2"
        />
        {/* La intersección resaltada cuando corresponde */}
        {modo === "interseccion" && (
          <clipPath id="corte">
            <circle cx="140" cy="95" r="72" />
          </clipPath>
        )}
        {modo === "interseccion" && (
          <circle cx="220" cy="95" r="72" clipPath="url(#corte)" className="fill-emerald-500/60 stroke-emerald-700" strokeWidth="2" />
        )}
        <text x="105" y="100" textAnchor="middle" className="fill-slate-900 text-lg font-semibold dark:fill-slate-100">{soloA}</text>
        <text x="180" y="100" textAnchor="middle" className="fill-slate-900 text-lg font-semibold dark:fill-slate-100">{ambos}</text>
        <text x="255" y="100" textAnchor="middle" className="fill-slate-900 text-lg font-semibold dark:fill-slate-100">{soloB}</text>
        <text x="140" y="35" textAnchor="middle" className="fill-blue-700 text-xs font-semibold dark:fill-blue-300">Depresión +</text>
        <text x="220" y="35" textAnchor="middle" className="fill-amber-700 text-xs font-semibold dark:fill-amber-300">Ansiedad +</text>
        <text x="330" y="178" textAnchor="end" className="fill-slate-400 text-xs">{ninguno} sin ninguno</text>
      </svg>

      <div className="mt-3 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
        {modo === "union" ? (
          <p>
            <strong className="tabular-nums">{enUnion}</strong> de {total}{" "}
            estudiantes dan positivo en <strong>alguno</strong> de los dos. Si
            sumaras {soloA + ambos} + {soloB + ambos} obtendrías{" "}
            {soloA + soloB + 2 * ambos}, contando dos veces a los {ambos} del
            medio.
          </p>
        ) : (
          <p>
            <strong className="tabular-nums">{ambos}</strong> de {total}{" "}
            estudiantes dan positivo en <strong>los dos</strong>. Ésta es la
            zona que hay que restar en la regla de la suma — y la que vamos a
            usar para verificar si los eventos son independientes.
          </p>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Esperado bajo independencia vs. observado                           */
/* ------------------------------------------------------------------ */

function ComparacionIndependencia({
  esperado,
  observado,
  total,
}: {
  esperado: number;
  observado: number;
  total: number;
}) {
  const [revelado, setRevelado] = useState(false);
  const max = Math.max(esperado, observado);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <p className="text-sm text-slate-700 dark:text-slate-300">
        Si fueran independientes, la cantidad de estudiantes con{" "}
        <strong>los dos</strong> positivos debería ser el producto de las dos
        probabilidades por el total.
      </p>

      <div className="mt-4 flex flex-col gap-4">
        <div>
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Predicho suponiendo independencia
            </span>
            <span className="font-serif text-xl font-semibold tabular-nums text-slate-500">
              ≈ {esperado.toFixed(1)}
            </span>
          </div>
          <div className="mt-1 h-5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-slate-400"
              style={{ width: `${(esperado / max) * 100}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Observado en el archivo
            </span>
            <span className="font-serif text-xl font-semibold tabular-nums text-rose-600 dark:text-rose-400">
              {revelado ? observado : "?"}
            </span>
          </div>
          <div className="mt-1 h-5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-rose-500 transition-[width] duration-700"
              style={{ width: revelado ? `${(observado / max) * 100}%` : "0%" }}
            />
          </div>
        </div>
      </div>

      {!revelado ? (
        <button
          type="button"
          onClick={() => setRevelado(true)}
          className="mt-4 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          Contar en el archivo
        </button>
      ) : (
        <p className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
          Hay <strong className="tabular-nums">{observado}</strong> casos
          dobles, no {esperado.toFixed(1)}. Casi{" "}
          <strong>{(observado / esperado).toFixed(1)} veces más</strong> de lo
          que predice la independencia sobre {total} fichas. La suposición era
          falsa, y multiplicar sin verificar habría producido un número
          equivocado que parecía perfectamente razonable.
        </p>
      )}
    </div>
  );
}
