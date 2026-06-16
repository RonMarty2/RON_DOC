"use client";

import { useMemo, useState } from "react";
import { ESTUDIANTES, PARAMS_TEST } from "@content/aula-probabilidad/dataset";
import { tablaConfusion, modeloBayes, type TablaConfusion } from "./calculos";
import { VotacionSimulada } from "./VotacionSimulada";
import { RecuadroCaso, MiniHistoria } from "./narrativa";

type Categoria = "VP" | "FP" | "FN" | "VN";

const COLOR_CAT: Record<Categoria, string> = {
  VP: "bg-emerald-600",
  FP: "bg-rose-500",
  FN: "bg-amber-500",
  VN: "bg-slate-300 dark:bg-slate-700",
};
const NOMBRE_CAT: Record<Categoria, string> = {
  VP: "Verdadero positivo (ánimo bajo, test +)",
  FP: "Falso positivo (sano, test +)",
  FN: "Falso negativo (ánimo bajo, test −)",
  VN: "Verdadero negativo (sano, test −)",
};

function categoriaDe(animoBajo: boolean, positivo: boolean): Categoria {
  if (animoBajo && positivo) return "VP";
  if (!animoBajo && positivo) return "FP";
  if (animoBajo && !positivo) return "FN";
  return "VN";
}

export function ModuloBayes() {
  const t: TablaConfusion = useMemo(() => tablaConfusion(), []);

  // Ordenamos los 60 por categoría para que el bloque de positivos quede junto.
  const ordenados = useMemo(() => {
    const orden: Categoria[] = ["VP", "FP", "FN", "VN"];
    return [...ESTUDIANTES].sort((a, b) => {
      const ca = categoriaDe(a.animoBajo, a.testPositivo);
      const cb = categoriaDe(b.animoBajo, b.testPositivo);
      return orden.indexOf(ca) - orden.indexOf(cb);
    });
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <RecuadroCaso titulo="El positivo de Daniela">
        <p>
          <strong>Daniela</strong> es una estudiante alegre, sin problemas
          aparentes. El test rápido le dio <strong>positivo</strong>. El jefe de
          Andrea dice: «el test acierta el 90% de las veces, derivala a
          tratamiento». Pero Andrea duda: «si el test es tan bueno, ¿por qué
          siento que algo no cuadra? ¿De verdad Daniela tiene 90% de
          probabilidad de estar mal?».
        </p>
        <p>
          La pregunta exacta:{" "}
          <em>de todos los que dieron positivo, ¿qué fracción está realmente mal?</em>
        </p>
      </RecuadroCaso>

      {/* La trampa (peldaño 4) */}
      <MiniHistoria titulo="La trampa de invertir la condicional">
        «El test acierta en el 90% de los que están mal» <strong>NO</strong> es lo
        mismo que «el 90% de los positivos están mal». Son dos condicionales
        invertidas: P(positivo | mal) ≠ P(mal | positivo). Confundirlas es el
        error que cometen hasta profesionales — y puede etiquetar a alguien sano.
      </MiniHistoria>

      {/* Votación: el momento estelar */}
      <VotacionSimulada
        pregunta="¿Qué probabilidad real tiene Daniela de tener ánimo bajo, dado que dio positivo?"
        opciones={[
          { id: "10", texto: "≈ 10%" },
          { id: "30", texto: "≈ 30-40%", esCorrecta: true },
          { id: "50", texto: "≈ 50%" },
          { id: "90", texto: "≈ 90%" },
        ]}
        pesos={[0.06, 0.12, 0.22, 0.6]}
        notaRevelacion="La mayoría vota 90% por la trampa de invertir la condicional. La verdad: de los 21 que dieron positivo, sólo 8 tienen ánimo bajo. 8/21 = 38%. Daniela probablemente está bien."
      />

      {/* Visual de los 60 reales */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:p-5">
        <p className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
          Los 60 estudiantes según el test y su estado real
        </p>
        <div className="grid grid-cols-10 gap-1.5">
          {ordenados.map((e) => {
            const cat = categoriaDe(e.animoBajo, e.testPositivo);
            return (
              <span
                key={e.id}
                className={
                  "aspect-square rounded-sm " +
                  COLOR_CAT[cat] +
                  (e.esDaniela
                    ? " aula-parpadea ring-2 ring-amber-500 ring-offset-1"
                    : "")
                }
                title={e.esDaniela ? `Daniela — ${NOMBRE_CAT[cat]}` : `${e.nombre} — ${NOMBRE_CAT[cat]}`}
              />
            );
          })}
        </div>

        {/* Leyenda */}
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
          {(["VP", "FP", "FN", "VN"] as Categoria[]).map((c) => (
            <div key={c} className="flex items-center gap-2">
              <span className={"h-3 w-3 shrink-0 rounded-sm " + COLOR_CAT[c]} />
              <span className="text-slate-600 dark:text-slate-400">
                <span className="font-semibold">{c}</span> · {t[c]}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-amber-700 dark:text-amber-300">
          🔆 El cuadrito que parpadea es <strong>Daniela</strong>: dio positivo
          pero está sana (uno de los {t.FP} falsos positivos).
        </p>
      </div>

      {/* El número clave */}
      <div className="rounded-2xl border-2 border-blue-500 bg-blue-50 p-6 text-center dark:border-blue-700 dark:bg-blue-950/30 sm:p-8">
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-blue-700 dark:text-blue-300">
          La respuesta de Bayes
        </p>
        <p className="mt-2 font-serif text-lg text-slate-900 dark:text-slate-100">
          P(ánimo bajo | positivo) = VP / (VP + FP) = {t.VP} / {t.positivos}
        </p>
        <p className="mt-2 font-serif text-6xl font-semibold tabular-nums text-blue-700 sm:text-7xl dark:text-blue-300">
          {(t.vpp * 100).toFixed(0)}%
        </p>
        <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">
          No 90%. Daniela tiene un <strong>38%</strong> de probabilidad de estar
          mal — más probable es que esté <strong>bien</strong>.
        </p>
      </div>

      {/* Exploración con sliders (modelo idealizado) */}
      <ExploradorModelo />

      {/* Cierre ético */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 p-6 text-center text-white sm:p-8">
        <p className="font-serif text-lg font-semibold sm:text-xl">
          Por eso Andrea dudó.
        </p>
        <p className="mx-auto mt-2 max-w-xl text-slate-300">
          Un psicólogo que entiende probabilidad no etiqueta a alguien sano por
          un solo test. Entender ese 38% evita derivar a Daniela a un
          tratamiento que no necesita — y el daño de creerse enferma sin estarlo.
        </p>
      </div>
    </div>
  );
}

/**
 * Deslizadores de prevalencia / sensibilidad / especificidad sobre un modelo
 * idealizado de 1000 personas. Arranca en los parámetros nominales del test
 * (sens 90%, espec 80%) y la prevalencia real del grupo (13.3%).
 */
function ExploradorModelo() {
  const [prevalencia, setPrevalencia] = useState(8 / 60);
  const [sensibilidad, setSensibilidad] = useState(PARAMS_TEST.sensibilidad);
  const [especificidad, setEspecificidad] = useState(PARAMS_TEST.especificidad);

  const m = useMemo(
    () => modeloBayes(prevalencia, sensibilidad, especificidad, 1000),
    [prevalencia, sensibilidad, especificidad]
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <h4 className="font-serif text-lg font-semibold text-slate-900 dark:text-slate-100">
        Explorá: ¿y si el test o el grupo fueran distintos?
      </h4>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
        Modelo idealizado sobre 1000 personas. Movés los controles y el
        resultado se recalcula en vivo. (El caso real de 60 dio 38%.)
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <SliderPct etiqueta="Prevalencia" ayuda="% que realmente está mal" valor={prevalencia} min={0.01} max={0.5} onChange={setPrevalencia} />
        <SliderPct etiqueta="Sensibilidad" ayuda="detecta a los que están mal" valor={sensibilidad} min={0.5} max={1} onChange={setSensibilidad} />
        <SliderPct etiqueta="Especificidad" ayuda="descarta bien a los sanos" valor={especificidad} min={0.5} max={1} onChange={setEspecificidad} />
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-slate-50 px-4 py-4 dark:bg-slate-800/60">
        <div className="text-sm text-slate-600 dark:text-slate-400">
          VP {m.VP} · FP {m.FP} · positivos {m.positivos}
        </div>
        <div className="text-right">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            P(mal | positivo)
          </p>
          <p className="font-serif text-4xl font-semibold tabular-nums text-blue-700 dark:text-blue-300">
            {(m.vpp * 100).toFixed(0)}%
          </p>
        </div>
      </div>
      <p className="mt-3 text-xs text-slate-500 dark:text-slate-500">
        Bajá la prevalencia y mirá cómo el positivo vale cada vez menos: en
        poblaciones mayormente sanas, la mayoría de los positivos son falsos.
      </p>
    </div>
  );
}

function SliderPct({
  etiqueta,
  ayuda,
  valor,
  min,
  max,
  onChange,
}: {
  etiqueta: string;
  ayuda: string;
  valor: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {etiqueta}
      </span>
      <span className="font-serif text-2xl font-semibold tabular-nums text-slate-900 dark:text-slate-100">
        {(valor * 100).toFixed(0)}%
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={0.01}
        value={valor}
        onChange={(e) => onChange(Number(e.target.value))}
        className="accent-blue-600"
      />
      <span className="text-xs text-slate-500 dark:text-slate-500">{ayuda}</span>
    </label>
  );
}
