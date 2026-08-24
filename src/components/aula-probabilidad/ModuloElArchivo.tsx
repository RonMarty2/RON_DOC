"use client";

import { useMemo, useState } from "react";
import {
  ESTUDIANTES,
  CORTE_TAMIZAJE,
} from "@content/aula-probabilidad/dataset";
import {
  LasFichas,
  DeDondeSalenLas200,
  PuenteALaProbabilidad,
} from "./piezasDelCaso";
import {
  Hilo,
  Cierre,
  IndiceApartado,
  Comprueba,
  PasoTitulo,
  Puente,
  Trampa,
} from "./narrativa";

const INSIGNIA = "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200";

/**
 * Segundo peldaño: de un puntaje suelto a un archivo.
 *
 * La ficha entra con UN solo dato, el puntaje que el lector acaba de armar
 * con sus propias manos en el módulo anterior. El diagnóstico confirmado
 * aparece recién en 2.3, el GAD-7 en 2.5 y el expediente en 2.8 — cada uno
 * en el apartado que lo necesita. Antes los cuatro llegaban acá de golpe,
 * entre dos y siete apartados antes de hacer falta.
 */
export function ModuloElArchivo({ onContinuar }: { onContinuar: () => void }) {
  return (
    <div className="flex flex-col gap-6">
      <IndiceApartado
        insignia={INSIGNIA}
        pasos={["Una ficha", "Diez fichas", "Doscientas fichas"]}
      />

      <PasoTitulo numero={1} insignia={INSIGNIA}>
        Una ficha
      </PasoTitulo>

      <p className="text-slate-700 dark:text-slate-300">
        Cuando un estudiante responde el cuestionario, su puntaje se guarda.
        Eso es una ficha: un estudiante y su número. Por ahora nada más que
        eso.
      </p>

      <LasFichas
        campos={["phq9"]}
        titulo="Una ficha, un dato"
        intro={
          <p>
            Éstas son fichas reales del servicio. Todavía tienen un solo campo
            visible: el puntaje que acabás de aprender a armar. A medida que
            avancemos, esta misma ficha va a ir mostrando más datos — pero
            sólo cuando haya algo que hacer con ellos.
          </p>
        }
      />

      <Hilo>
        Con una ficha sola no hay nada que calcular. Un puntaje de 14 no es
        más ni menos probable que uno de 3: simplemente es el que le tocó a
        esa persona. La probabilidad aparece cuando hay muchas.
      </Hilo>

      <PasoTitulo numero={2} insignia={INSIGNIA}>
        Diez fichas
      </PasoTitulo>

      <p className="text-slate-700 dark:text-slate-300">
        Acá hay diez fichas del archivo. Con diez todavía se puede contar a
        mano, y eso es exactamente lo que vamos a hacer — antes de dejar que
        una máquina cuente doscientas por nosotros.
      </p>

      <DiezFichas />

      <Trampa
        error="pensar que el corte «10 o más» deja afuera al 9 por poco"
        porQue="9 y 10 se parecen mucho, y es natural leer el corte como una zona difusa."
        correccion="un corte es una regla binaria: 9 no se marca y 10 sí, aunque la diferencia sea de un punto. Esa arbitrariedad es real y no se disimula — en el apartado 2.9 vamos a moverla y medir exactamente qué se gana y qué se pierde con cada corte."
      />

      <PasoTitulo numero={3} insignia={INSIGNIA}>
        Doscientas fichas
      </PasoTitulo>

      <p className="text-slate-700 dark:text-slate-300">
        Contar diez a mano se puede. Doscientas, no — y ahí es donde deja de
        alcanzar el sentido común y empieza a hacer falta el método.
      </p>

      <DeDondeSalenLas200 />

      <Cierre>
        <p>
          El archivo completo es esto y nada más: doscientas personas, cada
          una con su puntaje. Todo el capítulo se va a apoyar en estas mismas
          doscientas fichas.
        </p>
        <p>
          Van a ir apareciendo más columnas, pero ninguna antes de que haga
          falta: una cuando tengamos que juzgar si el cuestionario acierta,
          otra cuando preguntemos si dos medidas van juntas, otra cuando haya
          que organizar el trabajo del servicio. Cada dato llega en el
          apartado que lo necesita.
        </p>
      </Cierre>

      <PuenteALaProbabilidad />

      <Comprueba
        pregunta="En las diez fichas que contaste, ¿qué significa exactamente la proporción que salió?"
        opciones={[
          {
            texto: "Cuántas de esas diez superan el corte, dividido diez",
            esCorrecta: true,
            porQue:
              "Nada más que eso: un conteo dividido por el total. Todavía no es una afirmación sobre ningún estudiante en particular, ni sobre los otros 190.",
          },
          {
            texto: "La probabilidad de que un estudiante cualquiera tenga depresión",
            porQue:
              "Dos saltos de una vez. Primero, superar el corte no es tener depresión: el cuestionario filtra, no diagnostica. Segundo, una proporción medida en diez casos no se extiende sin más a toda la población — de eso trata buena parte del apartado 2.2.",
          },
          {
            texto: "El porcentaje de aciertos del cuestionario",
            porQue:
              "Para hablar de aciertos haría falta saber quién tenía realmente el trastorno, y ese dato todavía no está en la ficha. Aparece en el apartado 2.3, y recién ahí se puede contar un acierto.",
          },
        ]}
      />

      <Puente
        etiquetaBoton="Ir a 2.1 · Espacio muestral"
        onContinuar={onContinuar}
      >
        <p>
          Ya tenés el objeto completo: un dado, una pregunta, un puntaje, una
          ficha y un archivo de doscientas. Todo lo que sigue se calcula sobre
          eso.
        </p>
        <p>
          Ahora empieza el temario. Y empieza por lo más básico que hay: poner
          por escrito qué puede pasar.
        </p>
      </Puente>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Peldaño 2: contar diez fichas a mano                                */
/* ------------------------------------------------------------------ */

/** Diez fichas repartidas a lo largo del archivo, no las diez primeras. */
const PASO_MUESTRA = 17;

/**
 * El peldaño que faltaba entre «una ficha» y «doscientas fichas».
 *
 * Se marca a mano, se cuenta a mano y recién después aparece la proporción.
 * La muestra está tomada cada 17 fichas justamente para que caigan adentro
 * un 9 y un 10: el punto donde el corte se vuelve visiblemente arbitrario.
 */
function DiezFichas() {
  const muestra = useMemo(() => {
    const fichas: (typeof ESTUDIANTES)[number][] = [];
    for (let i = 0; i < ESTUDIANTES.length && fichas.length < 10; i += PASO_MUESTRA) {
      fichas.push(ESTUDIANTES[i]);
    }
    return fichas;
  }, []);

  const [marcadas, setMarcadas] = useState<Set<number>>(new Set());
  const [revelado, setRevelado] = useState(false);

  const correctas = muestra.filter((f) => f.phq9 >= CORTE_TAMIZAJE);
  const aciertos = muestra.filter(
    (f) => (f.phq9 >= CORTE_TAMIZAJE) === marcadas.has(f.id)
  ).length;

  function alternar(id: number) {
    if (revelado) return;
    setMarcadas((m) => {
      const n = new Set(m);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <h4 className="font-serif text-lg font-semibold text-slate-900 dark:text-slate-100">
        Marcá las que el filtro debería marcar
      </h4>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        La regla es una sola: se marca a quien saca{" "}
        <strong>{CORTE_TAMIZAJE} o más</strong>. Tocá las fichas que
        correspondan.
      </p>

      <div className="mt-4 -mx-1 overflow-x-auto px-1">
        <div className="flex min-w-max gap-2">
          {muestra.map((f) => {
            const marcada = marcadas.has(f.id);
            const deberia = f.phq9 >= CORTE_TAMIZAJE;
            const bien = marcada === deberia;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => alternar(f.id)}
                aria-pressed={marcada}
                className={
                  "w-[74px] shrink-0 rounded-xl border-2 px-2 py-3 text-center transition " +
                  (revelado
                    ? bien
                      ? "border-emerald-500 bg-emerald-50 dark:border-emerald-600 dark:bg-emerald-950/30"
                      : "border-rose-500 bg-rose-50 dark:border-rose-600 dark:bg-rose-950/30"
                    : marcada
                      ? "border-amber-500 bg-amber-50 dark:border-amber-600 dark:bg-amber-950/30"
                      : "border-slate-200 hover:border-slate-400 dark:border-slate-700")
                }
              >
                <span className="block text-[10px] text-slate-400">
                  #{f.id}
                </span>
                <span className="block text-2xl font-semibold tabular-nums text-slate-900 dark:text-slate-100">
                  {f.phq9}
                </span>
                <span className="block text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                  {revelado
                    ? deberia
                      ? "marcar"
                      : "pasar"
                    : marcada
                      ? "marcada"
                      : "—"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setRevelado(true)}
          disabled={revelado}
          className="rounded-full bg-slate-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:opacity-50 dark:bg-slate-600 dark:hover:bg-slate-500"
        >
          Comprobar
        </button>
        {revelado && (
          <button
            type="button"
            onClick={() => {
              setMarcadas(new Set());
              setRevelado(false);
            }}
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-500 dark:border-slate-600 dark:text-slate-400"
          >
            Probar de nuevo
          </button>
        )}
      </div>

      {revelado && (
        <div className="mt-4 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
          <p>
            Acertaste <strong>{aciertos} de 10</strong>. De estas diez fichas,{" "}
            <strong>{correctas.length}</strong> superan el corte
            {correctas.length > 0 && (
              <> (las de {correctas.map((f) => f.phq9).join(" y ")})</>
            )}
            .
          </p>
          <p className="mt-2">
            Escrito como proporción:{" "}
            <strong className="tabular-nums">
              {correctas.length}/10 = {(correctas.length / 10).toFixed(2)}
            </strong>
            . Eso es un conteo dividido por un total, hecho a mano y sin
            ninguna fórmula. Es el cálculo más simple de todo el capítulo, y
            todo lo demás es una variación de esto.
          </p>
        </div>
      )}
    </div>
  );
}
