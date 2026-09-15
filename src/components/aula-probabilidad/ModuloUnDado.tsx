"use client";

import { useEffect, useRef, useState } from "react";
import { CORTE_TAMIZAJE } from "@content/aula-probabilidad/dataset";
import { entero } from "./aleatorio";
import { AnalogiaDados, ArmarPuntaje } from "./piezasDelCaso";
import {
  Hilo,
  Cierre,
  IndiceApartado,
  Comprueba,
  PasoTitulo,
  Puente,
} from "./narrativa";

const INSIGNIA = "bg-borde text-tinta-media";

/**
 * Primer peldaño del capítulo: un dado, una pregunta, un puntaje.
 *
 * Antes el capítulo abría pidiendo estimar P(depresión | dio positivo) —o
 * sea, la conclusión del apartado 2.6— y seguía con un módulo que instalaba
 * de una sola vez el tamizaje, el criterio de referencia, los cuatro campos
 * de la ficha, las 200 fichas y un segundo archivo. El objeto más complejo
 * llegaba primero y el dado, tercero.
 *
 * Acá el objeto CRECE: un dado suelto → una pregunta del cuestionario, que
 * es un dado de cuatro caras → dos preguntas → las nueve → el puntaje. Nada
 * de psicología clínica todavía, ningún dato del archivo, ninguna fórmula.
 */
export function ModuloUnDado({ onContinuar }: { onContinuar: () => void }) {
  return (
    <div className="flex flex-col gap-6">
      <LaPromesa />

      <IndiceApartado
        insignia={INSIGNIA}
        pasos={[
          "Tira un dado",
          "Una pregunta es un dado",
          "Nueve preguntas son un puntaje",
        ]}
      />

      <PasoTitulo numero={1} insignia={INSIGNIA}>
        Tira un dado
      </PasoTitulo>

      <p className="text-tinta-media">
        Empecemos por el objeto más simple que existe en todo este capítulo. Un
        dado. Tíralo unas cuantas veces y no pienses en nada más que en lo que
        vas viendo.
      </p>

      <UnDadoSuelto />

      <Hilo>
        Eso es todo lo que hace falta para empezar: algo que puede salir de
        varias maneras, y que no sabes de cuál va a salir esta vez. El resto
        del capítulo es aprender a hablar con precisión sobre situaciones así.
      </Hilo>

      <PasoTitulo numero={2} insignia={INSIGNIA}>
        Una pregunta es un dado
      </PasoTitulo>

      <p className="text-tinta-media">
        Ahora cambiemos el objeto, pero no la estructura. Un cuestionario de
        salud mental hace preguntas del tipo «¿con qué frecuencia te pasó
        esto en las últimas dos semanas?», y cada una se responde con una de
        cuatro opciones. Eso es un dado, sólo que de cuatro caras.
      </p>

      <AnalogiaDados />

      <Cierre>
        <p>
          Con una pregunta el resultado va de 0 a 3. Con dos, de 0 a 6, y ya
          aparecen totales que se pueden lograr de varias maneras distintas.
          Con nueve, de 0 a 27.
        </p>
        <p>
          Fíjate que nunca hizo falta memorizar ese 27: sale de multiplicar 9
          por 3. Ese va a ser el método de todo el capítulo — construir el
          número en vez de recordarlo.
        </p>
      </Cierre>

      <PasoTitulo numero={3} insignia={INSIGNIA}>
        Nueve preguntas son un puntaje
      </PasoTitulo>

      <p className="text-tinta-media">
        Hasta acá las preguntas salían al azar. Respóndelas tú, como las
        respondería una persona, y mira armarse el puntaje:
      </p>

      <ArmarPuntaje />

      <Hilo>
        Un puntaje solo no dice mucho. Para que sirva hace falta una regla que
        diga a partir de qué número conviene mirar el caso con más detalle. En
        este cuestionario esa regla es <strong>{CORTE_TAMIZAJE} o más</strong>.
        No es una verdad de la naturaleza: es una decisión, y en el apartado
        2.9 vamos a poder evaluar si es una buena decisión.
      </Hilo>

      <Comprueba
        pregunta="¿De dónde sale que el puntaje máximo del cuestionario sea 27?"
        opciones={[
          {
            texto: "De que son 9 preguntas y cada una vale hasta 3",
            esCorrecta: true,
            porQue:
              "9 × 3 = 27. Igual que el máximo de tirar dos dados comunes es 12 porque son 2 × 6. El número no se memoriza: se construye.",
          },
          {
            texto: "De una tabla estándar del instrumento",
            porQue:
              "Existen tablas de interpretación, pero el rango no viene de ahí: viene de la aritmética de las preguntas. Si el cuestionario tuviera 10 preguntas, el máximo sería 30 sin que nadie lo decidiera.",
          },
          {
            texto: "De que el corte está en 10 y se multiplica por 3",
            porQue:
              "El corte y el máximo son cosas distintas. El máximo sale de la estructura del cuestionario (9 × 3); el corte es una decisión que se toma después, sobre esa escala.",
          },
        ]}
      />

      <Puente
        etiquetaBoton="Seguir: de un puntaje a un archivo"
        onContinuar={onContinuar}
      >
        <p>
          Ya sabes qué es un dado, qué es una pregunta y de dónde sale un
          puntaje. Todo lo que viste hasta acá cabe en una persona.
        </p>
        <p>
          El paso siguiente es guardar ese puntaje en algún lado y juntar
          muchos. Ahí empieza a haber algo que contar.
        </p>
      </Puente>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* La promesa: el gancho del capítulo, sin un solo número              */
/* ------------------------------------------------------------------ */

/**
 * Antes acá había un módulo entero que pedía estimar el valor predictivo
 * positivo antes de haber definido «probabilidad». Ahora queda la promesa
 * sola: sirve igual para enganchar en clase, pero no le pide a nadie que
 * calcule algo que todavía no puede.
 */
function LaPromesa() {
  return (
    <div className="rounded-2xl border-2 border-amber-300 bg-amber-50/60 p-5 dark:border-amber-800 dark:bg-amber-950/20 sm:p-6">
      <p className="tabular-nums text-[10px] font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-400">
        A dónde vamos
      </p>
      <p className="mt-2 font-serif text-lg leading-snug text-tinta sm:text-xl">
        Hay un cuestionario que casi nunca falla y que, aun así, se equivoca
        en casi la mitad de las alarmas que da.
      </p>
      <p className="mt-3 text-sm leading-relaxed text-tinta-media">
        Las dos cosas son ciertas al mismo tiempo, y no es un juego de
        palabras. Cuando termines el capítulo vas a poder calcular
        exactamente por qué, con los datos de tu propio servicio.
      </p>
      <p className="mt-2 text-sm text-tinta-media">
        Por ahora no hace falta entenderlo. Empezamos por un dado.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Peldaño 1: un dado suelto, sin definiciones                         */
/* ------------------------------------------------------------------ */

const CARAS = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

/**
 * El objeto más simple del capítulo. A propósito no calcula NADA: no hay
 * frecuencias (eso es 2.2) ni espacio muestral (eso es 2.1). Sólo tirar y
 * anotar, para que exista la experiencia antes que el vocabulario.
 */
function UnDadoSuelto() {
  const [historial, setHistorial] = useState<number[]>([]);
  const [cara, setCara] = useState<number | null>(null);
  const [girando, setGirando] = useState(false);
  const girandoRef = useRef(false);
  const limpiarRef = useRef<(() => void) | null>(null);

  useEffect(() => () => limpiarRef.current?.(), []);

  function tirar() {
    if (girandoRef.current) return;
    girandoRef.current = true;
    setGirando(true);

    const final = entero(1, 6);
    let vueltas = 0;
    let terminado = false;

    const finalizar = () => {
      if (terminado) return;
      terminado = true;
      window.clearInterval(id);
      window.clearTimeout(seguro);
      limpiarRef.current = null;
      setCara(final);
      setHistorial((h) => [...h, final].slice(-24));
      girandoRef.current = false;
      setGirando(false);
    };

    const id = window.setInterval(() => {
      vueltas++;
      if (vueltas >= 8) finalizar();
      else setCara(entero(1, 6));
    }, 70);
    const seguro = window.setTimeout(finalizar, 1500);
    limpiarRef.current = () => {
      window.clearInterval(id);
      window.clearTimeout(seguro);
    };
  }

  return (
    <div className="rounded-2xl border border-borde bg-tarjeta p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="grid h-24 w-24 shrink-0 place-content-center rounded-2xl border-2 border-borde-fuerte bg-papel-suave">
          <span className="text-6xl leading-none" aria-hidden>
            {cara === null ? "🎲" : CARAS[cara - 1]}
          </span>
          <span className="sr-only">
            {cara === null ? "Todavía no tiraste" : `Salió ${cara}`}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <button
            type="button"
            disabled={girando}
            onClick={tirar}
            className="rounded-full bg-tinta px-5 py-2.5 text-sm font-semibold text-papel shadow-sm transition hover:bg-tinta disabled:opacity-50"
          >
            🎲 Tirar el dado
          </button>
          <p className="mt-3 text-sm text-tinta-media">
            {historial.length === 0
              ? "Todavía no tiraste. Antes de hacerlo: ¿puedes saber qué va a salir?"
              : cara !== null
                ? `Salió ${cara}.`
                : ""}
          </p>
        </div>
      </div>

      {historial.length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-tinta-tenue">
            Lo que fue saliendo
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {historial.map((v, i) => (
              <span
                key={i}
                className="grid h-8 w-8 place-content-center rounded-lg bg-papel-suave text-sm font-semibold tabular-nums text-tinta-media"
              >
                {v}
              </span>
            ))}
          </div>
        </div>
      )}

      <p className="mt-4 rounded-xl bg-papel-suave px-4 py-3 text-sm text-tinta-media">
        {historial.length === 0 ? (
          <>
            No puedes. Y sin embargo tampoco estás completamente a ciegas: sabes
            que va a salir uno de seis números, y que no va a salir un 7.
          </>
        ) : historial.length < 5 ? (
          <>
            No sabías cuál iba a salir, pero sabías cuáles <em>podían</em>{" "}
            salir. Tira unas cuantas veces más.
          </>
        ) : (
          <>
            Después de {historial.length} tiradas sigues sin poder predecir la
            próxima, y sin embargo ya sabes bastante: que hay seis resultados
            posibles, que no aparece ningún otro, y que ninguno parece tener
            preferencia. <strong>De eso trata el capítulo</strong> — de todo lo
            que sí se puede afirmar sobre algo que no se puede predecir.
          </>
        )}
      </p>
    </div>
  );
}
