"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ESTUDIANTES } from "@content/aula-probabilidad/dataset";
import { entero } from "./aleatorio";
import {
  Definicion,
  Ejemplos,
  Ejemplo,
  MiniHistoria,
  Trampa,
  Puente,
  Hilo,
  IndiceApartado,
  Cierre,
  Termino,
  Comprueba,
  PasoTitulo,
} from "./narrativa";

const INSIGNIA = "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300";
import { BarraSim } from "./BarraSim";

const CARAS_DADO = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

/**
 * Propiedades con nombre sobre las caras del dado. Sirven para describir un
 * evento por lo que SIGNIFICA y no sólo por sus elementos: {2,4,6} no es «dos,
 * cuatro y seis», es «los números pares».
 */
const PROPIEDADES: { nombre: string; caras: number[] }[] = [
  { nombre: "par", caras: [2, 4, 6] },
  { nombre: "impar", caras: [1, 3, 5] },
  { nombre: "primo", caras: [2, 3, 5] },
  { nombre: "múltiplo de 3", caras: [3, 6] },
  { nombre: "mayor que 3", caras: [4, 5, 6] },
  { nombre: "menor que 3", caras: [1, 2] },
  { nombre: "mayor o igual que 5", caras: [5, 6] },
  { nombre: "menor o igual que 4", caras: [1, 2, 3, 4] },
  { nombre: "menor que 4", caras: [1, 2, 3] },
  { nombre: "cuadrado perfecto", caras: [1, 4] },
  { nombre: "divisor de 6", caras: [1, 2, 3, 6] },
  { nombre: "divisor de 4", caras: [1, 2, 4] },
  { nombre: "que no es primo", caras: [1, 4, 6] },
  { nombre: "extremo (1 o 6)", caras: [1, 6] },
];

/**
 * Busca la forma más corta de describir un evento con propiedades: primero
 * con una sola, después combinando dos, después tres. Devuelve null cuando el
 * conjunto no responde a ninguna propiedad simple — que también es un caso
 * que vale la pena mostrar.
 */
function describirEvento(evento: Set<number>): string | null {
  if (evento.size === 0) return null;
  // El conjunto completo no se describe con una propiedad: es todo S.
  if (evento.size === 6) return null;

  const iguales = (a: Set<number>, b: Set<number>) =>
    a.size === b.size && [...a].every((x) => b.has(x));

  // Sólo sirven las propiedades que contienen a todo el evento.
  const candidatas = PROPIEDADES.filter((p) =>
    [...evento].every((c) => p.caras.includes(c))
  );

  for (let k = 1; k <= 3; k++) {
    const combinar = (desde: number, elegidas: typeof candidatas): string | null => {
      if (elegidas.length === k) {
        const inter = new Set(
          [1, 2, 3, 4, 5, 6].filter((c) =>
            elegidas.every((p) => p.caras.includes(c))
          )
        );
        return iguales(inter, evento)
          ? elegidas.map((p) => p.nombre).join(" y ")
          : null;
      }
      for (let i = desde; i < candidatas.length; i++) {
        const r = combinar(i + 1, [...elegidas, candidatas[i]]);
        if (r) return r;
      }
      return null;
    };
    const r = combinar(0, []);
    if (r) return r;
  }
  return null;
}

/**
 * 2.1 — Espacio muestral, universo, suceso.
 *
 * Patrón de libro en todo el módulo: se define el término (corto, sin
 * ejemplo) y recién después aparece el interactivo que lo ejemplifica.
 */
export function ModuloEspacioMuestral({
  onContinuar,
}: {
  onContinuar: () => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-[15px] leading-relaxed text-tinta-media">
        Antes de calcular una sola probabilidad hay que delimitar con precisión
        de qué estamos hablando. Suena a formalismo, pero no lo es: la mayoría
        de los errores de este capítulo no vienen de equivocarse en una cuenta,
        sino de haber definido mal qué se estaba contando. Este apartado fija
        seis términos que se van a usar hasta el final, y los fija con dados
        antes de llevarlos al cuestionario, porque con dados se ven de un
        vistazo.
      </p>

      <IndiceApartado
        insignia={INSIGNIA}
        pasos={[
          "El vocabulario base",
          "Varias partes a la vez",
          "Aplicado al cuestionario",
        ]}
      />

      <PasoTitulo numero={1} insignia={INSIGNIA}>
        El vocabulario base
      </PasoTitulo>

      <Definicion termino="Experimento aleatorio">
        Un procedimiento cuyo resultado no se puede predecir con certeza,
        aunque se conozcan de antemano todos los resultados posibles.
        <Ejemplos>
          <Ejemplo caso="Tirar un dado">
            No sabes qué cara va a salir, pero sabes que va a ser una de seis.
          </Ejemplo>
          <Ejemplo caso="Aplicar el cuestionario a un estudiante al azar">
            No sabes qué puntaje va a dar, pero sabes que estará entre 0 y 27.
          </Ejemplo>
          <Ejemplo caso="NO es aleatorio: medir el largo de una mesa">
            El resultado está determinado de antemano. Si repites la medición
            obtienes lo mismo, salvo error de instrumento.
          </Ejemplo>
        </Ejemplos>
      </Definicion>

      <Definicion termino="Espacio muestral (S)">
        El conjunto de todos los resultados posibles de un experimento
        aleatorio. Para un dado: S = {"{1, 2, 3, 4, 5, 6}"}.
        <Ejemplos titulo="Ver más espacios muestrales">
          <Ejemplo caso={'Moneda:  S = {cara, sello}'}>
            Dos resultados posibles.
          </Ejemplo>
          <Ejemplo caso={'Dado:  S = {1, 2, 3, 4, 5, 6}'}>
            Seis resultados.
          </Ejemplo>
          <Ejemplo caso={'Dos monedas:  S = {CC, CS, SC, SS}'}>
            Cuatro resultados. Ojo: CS y SC son distintos, porque importa cuál
            moneda dio cada cosa.
          </Ejemplo>
          <Ejemplo caso={'Cuestionario:  S = {0, 1, 2, …, 27}'}>
            Veintiocho resultados posibles.
          </Ejemplo>
          <Ejemplo caso={'Tamizaje:  S = {positivo, negativo}'}>
            El MISMO experimento puede tener espacios muestrales distintos
            según qué se registre. Si sólo anotas si superó el corte, hay dos
            resultados; si anotas el puntaje, veintiocho.
          </Ejemplo>
        </Ejemplos>
      </Definicion>

      <Hilo>
        Dicho así suena abstracto. Tira el dado unas cuantas veces y mira qué
        pasa: cada tirada te da un resultado de ese conjunto, y ninguna te
        deja adivinar la siguiente.
      </Hilo>

      <UnDadoInteractivo />

      <Hilo>
        Todo eso vale para un dado. La pregunta razonable es qué tiene que ver
        con psicología, y la respuesta es que el objeto cambia pero la
        estructura no.
      </Hilo>

      <DadoEItem />

      <Cierre>
          <p>
            Con pocas tiradas las seis barras están desparejas y da la impresión
            de que el dado favorece a alguna cara. No es así: lo único que pasa
            es que hay pocos datos. A medida que tiras más, las seis barras se
            van apretando contra la línea del 16,7%, que es 1 dividido 6.
          </p>
          <p>
            Eso es exactamente lo que promete la probabilidad, y conviene decirlo
            con todas las letras porque es la fuente de casi todos los
            malentendidos: <strong>no predice una tirada, predice el
            comportamiento a la larga</strong>. Saber que la probabilidad de un
            6 es 1/6 no te dice nada sobre la próxima tirada. Te dice que si
            tiras muchísimas veces, alrededor de una de cada seis va a ser un 6.
          </p>
          <p>
            Guarda esta idea: en el apartado 2.2 va a reaparecer con nombre
            propio, cuando distingamos la probabilidad que se calcula sin
            observar nada de la que sale de observar muchas veces.
          </p>
      </Cierre>

      <MiniHistoria titulo="Universo ≠ espacio muestral">
        El universo son las personas: los 2.400 estudiantes de la universidad
        del caso, o las 200 que respondieron el cuestionario. El espacio
        muestral son los <strong>resultados posibles</strong> del experimento
        que se les hace: los 28 puntajes que puede devolver el cuestionario.
        Personas de un lado, resultados del otro. No es lo mismo.
      </MiniHistoria>

      <Hilo>
        Hasta acá el experimento era uno solo: tirar un dado. Pero muchos
        experimentos tienen varias partes, y ahí el conjunto de resultados
        posibles crece rápido.
      </Hilo>

      <PasoTitulo numero={2} insignia={INSIGNIA}>
        Cuando el experimento tiene varias partes
      </PasoTitulo>

      <Definicion termino="Espacio muestral compuesto">
        Cuando el experimento tiene varias partes (ej. dos dados), S es el
        conjunto de todos los resultados combinados. Con dos dados: 36 pares
        posibles.
      </Definicion>

      <Hilo>
        Tira los dos y busca dónde cae cada resultado en la tabla. Fíjate que
        el par (2, 5) y el par (5, 2) son casillas distintas.
      </Hilo>

      <DosDadosInteractivo />

      <Hilo>
        Cambia los dos dados por los dos primeros ítems del cuestionario y la
        tabla es la misma, con menos casillas.
      </Hilo>

      <Puente2ItemsPuntaje />

      <Cierre>
          <p>
            Con un dado había 6 resultados posibles. Con dos hay 36, y no es
            casualidad: por cada uno de los 6 resultados del primero, el segundo
            puede dar cualquiera de sus 6. Seis por seis, treinta y seis. Ese
            razonamiento tiene nombre —<strong>principio multiplicativo</strong>—
            y es la base de todo el apartado 2.4.
          </p>
          <p>
            Hay algo más que conviene señalar, porque después va a importar: en
            esta tabla el par (2, 5) y el par (5, 2) son <strong>casillas
            distintas</strong>. Los dos dados suman 7 en ambos casos, pero como
            resultados del experimento no son el mismo. Que el orden importe o
            no importe es una decisión que cambia el conteo, y en 2.4 va a ser
            la pregunta central.
          </p>
          <p>
            Fíjate también que las 36 casillas siguen siendo un espacio muestral
            común y corriente: un conjunto de resultados posibles. Lo único que
            cambió es que cada resultado ahora tiene dos partes.
          </p>
      </Cierre>

      <Hilo>
        Todo esto valía para dados. Ahora lo mismo, pero con el cuestionario
        del caso: el experimento es mirar el puntaje de una ficha, y el
        conjunto de resultados posibles son los 28 puntajes.
      </Hilo>

      <PasoTitulo numero={3} insignia={INSIGNIA}>
        Aplicado al cuestionario
      </PasoTitulo>

      <Definicion termino="Aplicado: el espacio muestral del PHQ-9">
        El PHQ-9 tiene 9 preguntas de 0 a 3 puntos. Su espacio muestral es S ={" "}
        {"{0, 1, ..., 27}"}, 28 valores posibles.
      </Definicion>

      <Hilo>
        Tamiza fichas de a una y mira cómo se va llenando el histograma. Cada
        ficha aporta su puntaje a una de las 28 barras.
      </Hilo>

      <TamizajeInteractivo />

      <Comprueba
        pregunta="Tomamos una de las 200 fichas al azar y miramos su puntaje del cuestionario. ¿Cuál es el espacio muestral de ese experimento?"
        pista="Pregúntate qué se está listando: ¿personas, o resultados?"
        opciones={[
          {
            texto: "Los 28 puntajes posibles, de 0 a 27",
            esCorrecta: true,
            porQue:
              "El experimento es «mirar el puntaje de alguien», y sus resultados posibles son los puntajes. El espacio muestral siempre lista RESULTADOS, no personas. Ojo: son 28 valores posibles aunque las fichas sean 200 — varias fichas comparten el mismo puntaje.",
          },
          {
            texto: "Las 200 fichas",
            porQue:
              "Ése es el universo del que sacamos la ficha: el conjunto de personas. No es lo mismo que el conjunto de resultados posibles del experimento — confundirlos es el primer error del capítulo.",
          },
          {
            texto: "Dar positivo o dar negativo",
            porQue:
              "Ésos son dos eventos (subconjuntos del espacio muestral), no el espacio muestral completo. «Dar positivo» agrupa 18 puntajes distintos, del 10 al 27.",
          },
        ]}
      />


      <Trampa
        error="confundir el universo con el espacio muestral"
        porQue="las dos palabras suenan a «todo lo que hay», y en los ejemplos sencillos casi coinciden."
        correccion="preguntarse qué se está listando: si son personas u objetos, es el universo; si son resultados posibles del experimento, es el espacio muestral."
      />

      <Cierre>
          <p>
            El histograma se llena igual que la tabla del dado, pero con una
            diferencia que hay que subrayar: <strong>las 28 barras no crecen
            parejo</strong>. Las de puntajes bajos se disparan y las altas quedan
            casi vacías. Con el dado, en cambio, las seis barras tendían todas al
            mismo valor.
          </p>
          <p>
            Esa diferencia no es un detalle: significa que los 28 resultados
            posibles <strong>no son igualmente probables</strong>. Y si no son
            igualmente probables, la probabilidad de sacar un puntaje
            determinado no se puede calcular dividiendo 1 entre 28. Hay que
            contar cuántas personas lo sacaron.
          </p>
          <p>
            Ahí está la razón de fondo por la que trabajamos con 200 fichas
            reales en vez de razonar en abstracto. Y es también el motivo por el
            que el apartado siguiente empieza distinguiendo tres formas
            distintas de conseguir una probabilidad: cuál corresponde depende
            justamente de si los resultados son equiprobables o no.
          </p>
      </Cierre>

      <Comprueba
        pregunta="En el dado, el evento «sacar un número par» es {2, 4, 6}. ¿Qué tipo de evento es?"
        opciones={[
          {
            texto: "Compuesto: agrupa varios puntos muestrales",
            esCorrecta: true,
            porQue:
              "Contiene tres resultados distintos, y cualquiera de los tres lo hace ocurrir. Un evento es simple sólo cuando contiene un único punto muestral, como «sacar exactamente 4».",
          },
          {
            texto: "Simple, porque describe una sola condición",
            porQue:
              "Lo que define simple o compuesto no es cómo se enuncia el evento, sino cuántos resultados contiene. «Ser par» suena a una sola cosa, pero abarca tres resultados del espacio muestral.",
          },
          {
            texto: "Seguro, porque siempre puede salir un par",
            porQue:
              "El evento seguro es el que ocurre SIEMPRE, o sea el que contiene las seis caras. Con {2, 4, 6} puede perfectamente salir un impar y el evento no ocurre.",
          },
        ]}
      />

      <Puente
        etiquetaBoton="Ir a 2.2 · Tipos de probabilidad"
        onContinuar={onContinuar}
      >
        <p>
          Ya tenemos el vocabulario: experimento, espacio muestral, punto
          muestral, evento. Sabemos delimitar de qué estamos hablando.
        </p>
        <p>
          Falta lo principal: de dónde sale el <strong>número</strong> que
          llamamos probabilidad. Y resulta que hay tres formas legítimas de
          conseguirlo, que no compiten entre sí.
        </p>
      </Puente>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Un dado: tirada por tirada + armador de sucesos                    */
/* ------------------------------------------------------------------ */

function UnDadoInteractivo() {
  const [historial, setHistorial] = useState<number[]>([]);
  const [caraVisible, setCaraVisible] = useState<number | null>(null);
  const [rodando, setRodando] = useState(false);
  const [evento, setEvento] = useState<Set<number>>(new Set());
  // El guard va en un ref, no en el estado: setState es asíncrono y dos toques
  // seguidos pasarían los dos, arrancando dos animaciones a la vez.
  const rodandoRef = useRef(false);
  const limpiarRef = useRef<(() => void) | null>(null);

  useEffect(() => () => limpiarRef.current?.(), []);

  function tirarUnaVez() {
    if (rodandoRef.current) return;
    rodandoRef.current = true;
    setRodando(true);

    // El resultado se decide ya: si el navegador pausa la animación (pestaña
    // en segundo plano, o la app de Android minimizada), el valor no se pierde.
    const resultadoFinal = entero(1, 6);
    let vueltas = 0;
    let terminado = false;

    const finalizar = () => {
      if (terminado) return;
      terminado = true;
      window.clearInterval(id);
      window.clearTimeout(seguro);
      limpiarRef.current = null;
      setCaraVisible(resultadoFinal);
      setHistorial((h) => [...h, resultadoFinal]);
      rodandoRef.current = false;
      setRodando(false);
    };

    const id = window.setInterval(() => {
      vueltas++;
      if (vueltas >= 8) finalizar();
      else setCaraVisible(entero(1, 6));
    }, 70);

    // Red de seguridad: pase lo que pase con el intervalo, a los 1,5 s la
    // tirada se cierra y los botones vuelven a habilitarse.
    const seguro = window.setTimeout(finalizar, 1500);

    limpiarRef.current = () => {
      window.clearInterval(id);
      window.clearTimeout(seguro);
    };
  }

  function tirarLote(n: number) {
    if (rodandoRef.current) return;
    const nuevos = Array.from({ length: n }, () => entero(1, 6));
    setHistorial((h) => [...h, ...nuevos]);
    setCaraVisible(nuevos[nuevos.length - 1]);
  }

  function reset() {
    limpiarRef.current?.();
    limpiarRef.current = null;
    rodandoRef.current = false;
    setHistorial([]);
    setCaraVisible(null);
    setRodando(false);
    setEvento(new Set());
  }

  function toggleCara(cara: number) {
    setEvento((prev) => {
      const next = new Set(prev);
      if (next.has(cara)) next.delete(cara);
      else next.add(cara);
      return next;
    });
  }

  const total = historial.length;
  const conteos = useMemo(() => {
    const c = [0, 0, 0, 0, 0, 0];
    for (const v of historial) c[v - 1]++;
    return c;
  }, [historial]);

  const caraTop = total > 0 ? conteos.indexOf(Math.max(...conteos)) + 1 : null;
  const vecesEvento = [...evento].reduce((s, cara) => s + conteos[cara - 1], 0);
  const pctEvento = total > 0 ? (vecesEvento / total) * 100 : 0;
  const descripcion = describirEvento(evento);
  const nombreEvento =
    evento.size === 0
      ? "evento imposible"
      : evento.size === 6
        ? "evento seguro"
        : evento.size === 1
          ? "evento simple"
          : "evento compuesto";

  return (
    <div className="rounded-2xl border border-borde bg-tarjeta p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h4 className="font-serif text-lg font-semibold text-tinta">
          Tira el dado
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
            className="rounded-full border border-borde px-4 py-2 text-sm text-tinta-media transition hover:bg-papel-suave"
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
              <span className="w-6 shrink-0 text-center text-xl sm:w-8 sm:text-2xl" aria-hidden>
                {CARAS_DADO[cara - 1]}
              </span>
              <div className="relative h-4 flex-1 overflow-hidden rounded-full bg-papel-suave">
                <div
                  className="h-full rounded-full bg-blue-500 transition-[width] duration-200"
                  style={{ width: `${pct}%` }}
                />
                <div
                  aria-hidden
                  className="absolute top-0 h-full w-0.5 bg-tinta/40"
                  style={{ left: "16.666%" }}
                  title="Valor teórico: 16.7%"
                />
              </div>
              <span className="w-16 shrink-0 text-right text-xs tabular-nums text-tinta-media sm:w-24">
                {c} · {pct.toFixed(1)}%
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-5 rounded-xl bg-papel-suave px-4 py-3 text-sm text-tinta-media">
        {total === 0 ? (
          <p>
            Todavía no tiraste. La línea gris de cada barra marca dónde
            <em> debería</em> quedar cada cara si tiras muchas veces:{" "}
            <strong>1/6 ≈ 16.7%</strong>.
          </p>
        ) : total < 30 ? (
          <p>
            Van sólo <strong className="tabular-nums">{total}</strong>{" "}
            {total === 1 ? "tirada" : "tiradas"}: con tan pocas,{" "}
            <strong>los porcentajes no significan nada todavía</strong>. Con
            una sola tirada una cara marca 100% y las otras 0%; con dos,
            50%/50%. No es que el dado esté cargado — es que hay muy pocos
            datos. Fíjate cuánto se despegan las barras de la línea gris:{" "}
            {(() => {
              const pcts = conteos.map((c) => (c / total) * 100);
              const brecha = Math.max(...pcts) - Math.min(...pcts);
              return (
                <>
                  hoy hay{" "}
                  <strong className="tabular-nums">
                    {brecha.toFixed(0)} puntos
                  </strong>{" "}
                  entre la cara que más salió y la que menos.
                </>
              );
            })()}{" "}
            Tira 100 más y mira qué pasa con esa brecha.
          </p>
        ) : (
          <p>
            Van <strong className="tabular-nums">{total}</strong> tiradas.
            {(() => {
              const pcts = conteos.map((c) => (c / total) * 100);
              const brecha = Math.max(...pcts) - Math.min(...pcts);
              return (
                <>
                  {" "}
                  Ahora la brecha entre la cara que más salió y la que menos es
                  de{" "}
                  <strong className="tabular-nums">
                    {brecha.toFixed(1)} puntos
                  </strong>
                  , y las seis barras se apretaron contra la línea gris del{" "}
                  <strong>16.7%</strong>.
                </>
              );
            })()}{" "}
            Eso es lo único que la probabilidad promete: no predice una tirada,
            predice el comportamiento a la larga.
          </p>
        )}
      </div>

      {/* Definición + interactivo: punto muestral y suceso */}
      <div className="mt-6 border-t border-borde pt-5">
        <Definicion termino="Punto muestral">
          Cada resultado individual dentro del espacio muestral. Cada vez que
          tiras el dado obtienes exactamente un punto muestral.
          {caraTop !== null && (
            <> La última tirada te dio uno de los seis: {caraVisible}.</>
          )}
        </Definicion>
      </div>

      <div className="mt-5 flex flex-col gap-5">
        <Definicion termino="Suceso o evento">
          Cualquier subconjunto de S. Un solo punto es un{" "}
          <strong>evento simple</strong>; varios puntos, un{" "}
          <strong>evento compuesto</strong>.
          <Ejemplos titulo="Ver eventos del dado, con sus elementos">
            <Ejemplo caso={'"Sale 4"  =  {4}'}>
              Evento simple: un único punto muestral.
            </Ejemplo>
            <Ejemplo caso={'"Sale par"  =  {2, 4, 6}'}>
              Evento compuesto: tres puntos. Cualquiera de los tres lo hace
              ocurrir.
            </Ejemplo>
            <Ejemplo caso={'"Sale más de 4"  =  {5, 6}'}>
              Evento compuesto de dos puntos.
            </Ejemplo>
            <Ejemplo caso={'"Sale menos de 3"  =  {1, 2}'}>
              Otro compuesto. Fíjate que se solapa con "sale par" en el 2.
            </Ejemplo>
            <Ejemplo caso={'"Sale primo"  =  {2, 3, 5}'}>
              El enunciado suena a una sola condición, pero agrupa tres
              resultados: lo que decide simple o compuesto es cuántos puntos
              contiene, no cómo se lo enuncia.
            </Ejemplo>
          </Ejemplos>
        </Definicion>

        <Definicion termino="Evento seguro y evento imposible">
          El <strong>evento seguro</strong> contiene todo el espacio muestral,
          así que ocurre siempre: su probabilidad es 1. El{" "}
          <strong>evento imposible</strong> no contiene ningún resultado y
          nunca ocurre: su probabilidad es 0. Son los dos extremos de la
          escala — ninguna probabilidad puede salirse de ahí.
          <Ejemplos titulo="Ver ejemplos de los dos extremos">
            <Ejemplo caso={'SEGURO — "sale un número del 1 al 6"  =  {1,2,3,4,5,6}'}>
              Contiene todo S. Pase lo que pase, ocurre. P = 1.
            </Ejemplo>
            <Ejemplo caso={'SEGURO — "el puntaje está entre 0 y 27"'}>
              No puede fallar: son todos los valores que el cuestionario puede
              devolver.
            </Ejemplo>
            <Ejemplo caso={'IMPOSIBLE — "sale 7"  =  { }'}>
              El 7 no pertenece a S, así que el evento queda vacío. P = 0.
            </Ejemplo>
            <Ejemplo caso={'IMPOSIBLE — "el puntaje es 30"'}>
              Está fuera del espacio muestral: nueve preguntas de 0 a 3 no
              pueden pasar de 27.
            </Ejemplo>
            <Ejemplo caso={'IMPOSIBLE — "sale par Y sale impar a la vez"'}>
              Ningún resultado cumple las dos cosas, así que el conjunto es
              vacío. Pruébalo abajo dejando el evento sin ninguna cara marcada.
            </Ejemplo>
          </Ejemplos>
        </Definicion>
      </div>

      <div className="mt-4 rounded-2xl border border-borde bg-tarjeta p-5 sm:p-6">
        <p className="text-sm font-medium text-tinta-media">
          Arma tu propio evento — toca las caras que quieras incluir:
        </p>
        <div className="mt-3 flex justify-center gap-2">
          {[1, 2, 3, 4, 5, 6].map((cara) => (
            <button
              key={cara}
              type="button"
              onClick={() => toggleCara(cara)}
              className={
                "grid h-11 w-11 place-items-center rounded-lg border-2 text-2xl transition " +
                (evento.has(cara)
                  ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40"
                  : "border-borde")
              }
            >
              {CARAS_DADO[cara - 1]}
            </button>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-tinta-tenue">Prueba:</span>
          {[
            { etiqueta: "los pares", caras: [2, 4, 6] },
            { etiqueta: "los primos", caras: [2, 3, 5] },
            { etiqueta: "sólo el 6", caras: [6] },
            { etiqueta: "ninguna", caras: [] },
            { etiqueta: "las seis", caras: [1, 2, 3, 4, 5, 6] },
          ].map((s) => (
            <button
              key={s.etiqueta}
              type="button"
              onClick={() => setEvento(new Set(s.caras))}
              className="rounded-full border border-borde px-3 py-1 text-xs text-tinta-media transition hover:border-emerald-400 hover:text-emerald-700 dark:hover:border-emerald-600 dark:hover:text-emerald-300"
            >
              {s.etiqueta}
            </button>
          ))}
        </div>
        <div className="mt-4 rounded-xl bg-papel-suave px-4 py-3 text-sm text-tinta-media">
          <p>
            Tu evento es{" "}
            <strong>
              {"{"}
              {[...evento].sort((a, b) => a - b).join(", ")}
              {"}"}
            </strong>
            {evento.size === 6 ? (
              <>
                , o sea{" "}
                <strong className="text-emerald-700 dark:text-emerald-300">
                  «sale cualquier número»
                </strong>
              </>
            ) : (
              descripcion && (
                <>
                  , o sea{" "}
                  <strong className="text-emerald-700 dark:text-emerald-300">
                    «sale un número {descripcion}»
                  </strong>
                </>
              )
            )}{" "}
            — <strong>{nombreEvento}</strong>.{" "}
            {total === 0 ? (
              <>Tira el dado arriba para ver con qué frecuencia ocurre.</>
            ) : (
              <>
                Ocurrió en{" "}
                <strong className="tabular-nums">{vecesEvento}</strong> de{" "}
                <strong className="tabular-nums">{total}</strong> tiradas ={" "}
                <strong className="tabular-nums">
                  {pctEvento.toFixed(1)}%
                </strong>
                .
              </>
            )}
          </p>
          {evento.size === 0 && (
            <p className="mt-2 text-tinta-media">
              Sin ninguna cara adentro, no hay resultado que lo haga ocurrir:
              es el evento imposible, y su probabilidad es 0 por más que tires.
            </p>
          )}
          {evento.size === 6 && (
            <p className="mt-2 text-tinta-media">
              Con las seis caras adentro, cualquier resultado lo hace ocurrir:
              es el evento seguro, y su probabilidad es 1 (100%).
            </p>
          )}
          {evento.size > 0 && evento.size < 6 && !descripcion && (
            <p className="mt-2 text-tinta-media">
              Este conjunto no responde a ninguna propiedad simple: no son «los
              pares», ni «los primos», ni «los mayores que 3». Cuando eso pasa,
              la única forma de describir el evento es{" "}
              <strong>enumerar sus elementos</strong> — y por eso la definición
              dice que un evento es cualquier subconjunto, no sólo los que
              tienen nombre bonito.
            </p>
          )}
          {descripcion && evento.size < 6 && (
            <p className="mt-2 text-tinta-media">
              Fíjate que el mismo evento se puede escribir de dos formas: por{" "}
              <strong>enumeración</strong> (la lista de caras) o por{" "}
              <strong>comprensión</strong> (la propiedad que las une). Las dos
              nombran exactamente el mismo subconjunto de S.
            </p>
          )}
        </div>
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
  const rodandoRef = useRef(false);
  const limpiarRef = useRef<(() => void) | null>(null);

  useEffect(() => () => limpiarRef.current?.(), []);

  function tirar() {
    if (rodandoRef.current) return;
    rodandoRef.current = true;
    setRodando(true);

    const par: [number, number] = [entero(1, 6), entero(1, 6)];
    let vueltas = 0;
    let terminado = false;

    const finalizar = () => {
      if (terminado) return;
      terminado = true;
      window.clearInterval(id);
      window.clearTimeout(seguro);
      limpiarRef.current = null;
      setUltimo(par);
      setHistorial((h) => [...h, par]);
      rodandoRef.current = false;
      setRodando(false);
    };

    const id = window.setInterval(() => {
      vueltas++;
      if (vueltas >= 8) finalizar();
      else setUltimo([entero(1, 6), entero(1, 6)]);
    }, 70);

    const seguro = window.setTimeout(finalizar, 1500);

    limpiarRef.current = () => {
      window.clearInterval(id);
      window.clearTimeout(seguro);
    };
  }

  function reset() {
    limpiarRef.current?.();
    limpiarRef.current = null;
    rodandoRef.current = false;
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
    <div className="rounded-2xl border border-borde bg-tarjeta p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h4 className="font-serif text-lg font-semibold text-tinta">
          Tira los dos dados
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
            className="rounded-full border border-borde px-4 py-2 text-sm text-tinta-media transition hover:bg-papel-suave"
          >
            Reiniciar
          </button>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <div className="flex flex-col items-center gap-1">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-tinta-tenue">
            Dado A
          </span>
          <div className="grid h-16 w-16 place-items-center rounded-2xl border-2 border-blue-600 bg-blue-50 text-4xl shadow-sm dark:bg-blue-950/40">
            {ultimo === null ? "🎲" : CARAS_DADO[ultimo[0] - 1]}
          </div>
        </div>
        <span className="text-xl font-semibold text-tinta-tenue">+</span>
        <div className="flex flex-col items-center gap-1">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-tinta-tenue">
            Dado B
          </span>
          <div className="grid h-16 w-16 place-items-center rounded-2xl border-2 border-amber-500 bg-amber-50 text-4xl shadow-sm dark:bg-amber-950/30">
            {ultimo === null ? "🎲" : CARAS_DADO[ultimo[1] - 1]}
          </div>
        </div>
      </div>

      {ultimo && (
        <p className="mt-4 text-center text-sm text-tinta-media">
          Par{" "}
          <strong className="tabular-nums">
            ({ultimo[0]}, {ultimo[1]})
          </strong>{" "}
          → fila {ultimo[0]}, columna {ultimo[1]} en la tabla.
        </p>
      )}

      <div className="mt-5 overflow-x-auto">
        <table className="mx-auto border-collapse text-center">
          <caption className="mb-2 text-xs text-tinta-tenue">
            Filas = Dado A · Columnas = Dado B
          </caption>
          <thead>
            <tr>
              <th className="p-1" />
              {[1, 2, 3, 4, 5, 6].map((b) => (
                <th key={b} className="p-1">
                  <span className="grid h-7 w-7 place-items-center rounded-md bg-amber-100 text-base font-bold tabular-nums text-amber-700 dark:bg-amber-950/50 dark:text-amber-300">
                    {b}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5, 6].map((a) => (
              <tr key={a}>
                <th className="p-1">
                  <span className="grid h-7 w-7 place-items-center rounded-md bg-blue-100 text-base font-bold tabular-nums text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
                    {a}
                  </span>
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
                            : "border-borde text-borde-fuerte")
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
      <p className="mt-3 text-center text-xs text-tinta-tenue">
        {total === 0
          ? "36 casillas posibles (6 × 6). Todavía vacías."
          : `${total} tiradas anotadas. Cada casilla es cuántas veces salió esa combinación exacta.`}
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
    <div className="rounded-2xl border border-borde bg-tarjeta p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h4 className="font-serif text-lg font-semibold text-tinta">
          Tamiza estudiantes, uno por uno
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
            className="rounded-full border border-borde px-4 py-2 text-sm text-tinta-media transition hover:bg-papel-suave"
          >
            Reiniciar
          </button>
        </div>
      </div>

      {ultimo && (
        <p className="mt-2 text-center text-sm text-tinta-media">
          Estudiante #{ultimo.id}, PHQ-9 ={" "}
          <strong className="tabular-nums">{ultimo.phq9}</strong>
          {ultimo.phq9 >= 10 ? " (positivo)" : " (negativo)"}. Llevamos{" "}
          <strong className="tabular-nums">{indice}</strong> de 200.
        </p>
      )}

      {/* Histograma: una barra por puntaje posible, altura = cuántos lo sacaron */}
      <div className="mt-5 -mx-1 overflow-x-auto px-1">
        <div className="flex items-end gap-[3px]" style={{ minWidth: 28 * 24 }}>
          {Array.from({ length: 28 }, (_, v) => v).map((v) => {
            const c = conteosPorPuntaje[v];
            const zonaPositiva = v >= 10;
            const esUltimo = ultimo?.phq9 === v;
            const alto = maxConteoPuntaje > 0 ? (c / maxConteoPuntaje) * 110 : 0;
            return (
              <div
                key={v}
                title={`Puntaje ${v}: ${c} estudiante${c === 1 ? "" : "s"}`}
                className="flex flex-1 flex-col items-center gap-1"
              >
                {/* cuántos estudiantes sacaron este puntaje */}
                <span
                  className={
                    "text-[10px] tabular-nums " +
                    (c > 0
                      ? "font-bold text-tinta-media"
                      : "text-transparent")
                  }
                >
                  {c > 0 ? c : "0"}
                </span>
                {/* la barra */}
                <div className="flex h-[112px] w-full items-end">
                  <div
                    className={
                      "w-full rounded-t transition-all " +
                      (esUltimo
                        ? "ring-2 ring-blue-500 "
                        : "") +
                      (c === 0
                        ? "bg-papel-suave"
                        : zonaPositiva
                          ? "bg-amber-500"
                          : "bg-blue-500")
                    }
                    style={{ height: c === 0 ? 2 : Math.max(4, alto) }}
                  />
                </div>
                {/* el puntaje */}
                <span
                  className={
                    "text-[10px] tabular-nums " +
                    (esUltimo
                      ? "font-bold text-blue-700 dark:text-blue-300"
                      : zonaPositiva
                        ? "text-amber-600 dark:text-amber-500"
                        : "text-tinta-tenue")
                  }
                >
                  {v}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-tinta-tenue">
        <span>
          <strong className="text-tinta-media">Abajo</strong>{" "}
          = puntaje posible (0 a 27)
        </span>
        <span>
          <strong className="text-tinta-media">Arriba</strong>{" "}
          = cuántos estudiantes lo sacaron
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-amber-500" />
          zona positiva (≥ 10)
        </span>
      </div>

      <div className="mt-5">
        <BarraSim
          etiqueta="Proporción que tamiza positivo (PHQ-9 ≥ 10)"
          porcentaje={pctPositivo}
          esperadoPct={21.5}
          color="ambar"
        />
      </div>
      <div className="mt-3 rounded-xl bg-papel-suave px-4 py-3 text-sm text-tinta-media">
        {indice === 0 ? (
          <p>Tamiza al primer estudiante y el cálculo va a aparecer aquí.</p>
        ) : indice < 20 ? (
          <p>
            Van <strong className="tabular-nums">{indice}</strong> fichas y{" "}
            <strong className="tabular-nums">{positivos}</strong> positivos, o
            sea{" "}
            <strong className="tabular-nums">{pctPositivo.toFixed(1)}%</strong>.
            Pero con tan pocas fichas ese porcentaje salta con cada estudiante
            nuevo: no lo tomes como estimación todavía. Tamiza 20 más y vuelve a
            mirarlo.
          </p>
        ) : (
          <p>
            <strong className="tabular-nums">{positivos}</strong> de{" "}
            <strong className="tabular-nums">{indice}</strong> dieron positivo
            ={" "}
            <strong className="tabular-nums">
              {pctPositivo.toFixed(1)}%
            </strong>
            . El valor real en las 200 fichas es <strong>21.5%</strong>.
          </p>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* El gemelo psicológico del dado: un ítem de un cuestionario          */
/* ------------------------------------------------------------------ */

/** Las cuatro opciones de un ítem tipo Likert de frecuencia. */
const OPCIONES_ITEM = [
  { valor: 0, texto: "Ningún día" },
  { valor: 1, texto: "Varios días" },
  { valor: 2, texto: "Más de la mitad de los días" },
  { valor: 3, texto: "Casi todos los días" },
];

/**
 * El mismo experimento, dos objetos, lado a lado.
 *
 * La auditoría del capítulo mostró que 2.1 y 2.2 son los apartados con más
 * objetos clásicos del temario (43% y 36% del texto), y son justamente los
 * dos primeros: un estudiante de psicología abre la herramienta y lo primero
 * que ve son dados y monedas durante tres pantallas seguidas.
 *
 * Este componente no reemplaza al dado —el dado enseña bien porque no tiene
 * ruido clínico— sino que le pone al lado su equivalente real: un ítem de un
 * cuestionario. Se tiran los dos con el mismo botón, para que la estructura
 * compartida sea visible en vez de estar afirmada en un párrafo.
 */
function DadoEItem() {
  const [resultados, setResultados] = useState<{ dado: number; item: number }[]>([]);
  const [visible, setVisible] = useState<{ dado: number; item: number } | null>(null);
  const [girando, setGirando] = useState(false);
  const girandoRef = useRef(false);
  const limpiarRef = useRef<(() => void) | null>(null);

  useEffect(() => () => limpiarRef.current?.(), []);

  function tirar() {
    if (girandoRef.current) return;
    girandoRef.current = true;
    setGirando(true);

    const final = { dado: entero(1, 6), item: entero(0, 3) };
    let vueltas = 0;
    let terminado = false;

    const finalizar = () => {
      if (terminado) return;
      terminado = true;
      window.clearInterval(id);
      window.clearTimeout(seguro);
      limpiarRef.current = null;
      setVisible(final);
      setResultados((r) => [...r, final].slice(-20));
      girandoRef.current = false;
      setGirando(false);
    };

    const id = window.setInterval(() => {
      vueltas++;
      if (vueltas >= 8) finalizar();
      else setVisible({ dado: entero(1, 6), item: entero(0, 3) });
    }, 70);
    const seguro = window.setTimeout(finalizar, 1500);
    limpiarRef.current = () => {
      window.clearInterval(id);
      window.clearTimeout(seguro);
    };
  }

  const n = resultados.length;

  return (
    <div className="rounded-2xl border-2 border-blue-300 bg-blue-50/40 p-5 dark:border-blue-800 dark:bg-blue-950/20 sm:p-6">
      <p className="tabular-nums text-[10px] font-semibold uppercase tracking-widest text-blue-700 dark:text-blue-300">
        El mismo experimento, dos objetos
      </p>
      <h4 className="mt-1 font-serif text-xl font-semibold text-tinta">
        Un dado y un ítem de cuestionario son la misma cosa
      </h4>
      <p className="mt-2 text-sm leading-relaxed text-tinta-media">
        El dado no es el tema de la materia: es el objeto más limpio para ver
        la estructura. Acá está esa estructura al lado del objeto que vas a
        usar toda tu carrera. Tíralos juntos.
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {/* El dado */}
        <div className="rounded-xl border border-borde bg-tarjeta p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-tinta-tenue">
            Un dado
          </p>
          <div className="mt-3 grid h-20 place-content-center">
            <span className="text-5xl leading-none" aria-hidden>
              {visible === null ? "🎲" : CARAS_DADO[visible.dado - 1]}
            </span>
          </div>
          <p className="mt-2 text-center text-sm text-tinta-media">
            {visible === null ? "Sin tirar" : `Salió ${visible.dado}`}
          </p>
          <p className="mt-3 border-t border-borde pt-2 text-center tabular-nums text-xs text-tinta-tenue">
            S = {"{1, 2, 3, 4, 5, 6}"} · 6 resultados
          </p>
        </div>

        {/* El ítem */}
        <div className="rounded-xl border border-blue-300 bg-tarjeta p-4 dark:border-blue-700">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Un ítem del cuestionario
          </p>
          <p className="mt-1 text-xs italic leading-snug text-tinta-tenue">
            «¿Con qué frecuencia te sentiste decaído o sin esperanzas en las
            últimas dos semanas?»
          </p>
          <div className="mt-2 flex flex-col gap-1">
            {OPCIONES_ITEM.map((o) => {
              const elegida = visible?.item === o.valor;
              return (
                <div
                  key={o.valor}
                  className={
                    "flex items-center gap-2 rounded-md px-2 py-1 text-xs transition " +
                    (elegida
                      ? "bg-blue-600 font-semibold text-white"
                      : "text-tinta-media")
                  }
                >
                  <span className="tabular-nums tabular-nums">{o.valor}</span>
                  <span className="truncate">{o.texto}</span>
                </div>
              );
            })}
          </div>
          <p className="mt-3 border-t border-borde pt-2 text-center tabular-nums text-xs text-tinta-tenue">
            S = {"{0, 1, 2, 3}"} · 4 resultados
          </p>
        </div>
      </div>

      <button
        type="button"
        disabled={girando}
        onClick={tirar}
        className="mt-4 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-50"
      >
        🎲 Tirar los dos a la vez
      </button>

      {n > 0 && (
        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-tinta-tenue">
            Lo que fue saliendo ({n} {n === 1 ? "vez" : "veces"})
          </p>
          <div className="mt-2 -mx-1 overflow-x-auto px-1">
            <div className="flex min-w-max gap-1.5">
              {resultados.map((r, i) => (
                <div
                  key={i}
                  className="grid w-10 shrink-0 gap-0.5 rounded-lg bg-tarjeta px-1 py-1 text-center"
                >
                  <span className="tabular-nums text-sm font-semibold tabular-nums text-tinta-media">
                    {r.dado}
                  </span>
                  <span className="border-t border-borde pt-0.5 tabular-nums text-sm font-semibold tabular-nums text-blue-600 dark:text-blue-400">
                    {r.item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 rounded-xl bg-tarjeta px-4 py-3 text-sm text-tinta-media">
        {n === 0 ? (
          <>
            Fíjate antes de tirar: en los dos casos sabes{" "}
            <strong>qué puede salir</strong> y no sabes{" "}
            <strong>qué va a salir</strong>. Eso es todo lo que hace falta para
            que algo sea un experimento aleatorio.
          </>
        ) : (
          <>
            Los dos espacios muestrales tienen la misma naturaleza y distinto
            tamaño: 6 contra 4. Todo lo que vale para el dado vale para el
            ítem, cambiando el 6 por el 4.
            <span className="mt-2 block text-tinta-media">
              <strong>Con una diferencia que importa:</strong> las seis caras
              del dado son igual de probables y las cuatro opciones del ítem
              no. Mucha gente responde 0 y muy poca responde 3. Por eso la
              probabilidad del cuestionario no se puede calcular contando
              opciones — hay que contar personas, y eso es el apartado 2.2.
            </span>
          </>
        )}
      </div>
    </div>
  );
}


/* ------------------------------------------------------------------ */
/* El gemelo de los dos dados: dos ítems y el puntaje que suman        */
/* ------------------------------------------------------------------ */

/**
 * El interactivo de dos dados era el único del temario sin una sola mención
 * de psicología. No hacía falta reemplazarlo —la tabla de doble entrada se
 * entiende mejor con dados— sino mostrar que la misma tabla, con 4 opciones
 * en vez de 6 caras, es exactamente lo que ocurre cuando alguien responde dos
 * ítems y se suman sus respuestas.
 *
 * Es estático a propósito: acá lo que hay que ver es la tabla completa de un
 * vistazo, no simular. La simulación ya la hicieron con los dados.
 */
function Puente2ItemsPuntaje() {
  // Cuántas combinaciones de dos ítems dan cada puntaje total (0 a 6).
  const combinaciones: Record<number, string[]> = {};
  for (let a = 0; a <= 3; a++) {
    for (let b = 0; b <= 3; b++) {
      const suma = a + b;
      (combinaciones[suma] ??= []).push(`${a}+${b}`);
    }
  }
  const totales = Object.keys(combinaciones).map(Number).sort((x, y) => x - y);
  const maximo = Math.max(...totales.map((s) => combinaciones[s].length));

  return (
    <div className="rounded-2xl border-2 border-blue-300 bg-blue-50/40 p-5 dark:border-blue-800 dark:bg-blue-950/20 sm:p-6">
      <p className="tabular-nums text-[10px] font-semibold uppercase tracking-widest text-blue-700 dark:text-blue-300">
        La misma tabla, con el cuestionario
      </p>
      <h4 className="mt-1 font-serif text-xl font-semibold text-tinta">
        Dos ítems también arman una tabla, y también tienen un centro
      </h4>
      <p className="mt-2 text-sm leading-relaxed text-tinta-media">
        Dos ítems de 4 opciones dan <strong>4 × 4 = 16</strong> formas de
        responder, y su suma va de 0 a 6. Igual que con los dados, los totales
        del medio se pueden lograr de más maneras:
      </p>

      {/* La tabla de doble entrada, 4×4 */}
      <div className="mt-4 -mx-1 overflow-x-auto px-1">
        <table className="min-w-max border-collapse text-center text-sm">
          <thead>
            <tr>
              <th className="p-1 text-[10px] font-medium uppercase tracking-wider text-tinta-tenue">
                ítem 1 ╲ 2
              </th>
              {[0, 1, 2, 3].map((b) => (
                <th
                  key={b}
                  className="w-11 p-1 tabular-nums text-xs font-semibold text-blue-600 dark:text-blue-400"
                >
                  {b}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[0, 1, 2, 3].map((a) => (
              <tr key={a}>
                <th className="p-1 tabular-nums text-xs font-semibold text-blue-600 dark:text-blue-400">
                  {a}
                </th>
                {[0, 1, 2, 3].map((b) => (
                  <td
                    key={b}
                    className="border border-borde bg-tarjeta p-1.5 tabular-nums text-sm tabular-nums text-tinta-media"
                  >
                    {a + b}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cuántas maneras dan cada puntaje */}
      <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-tinta-tenue">
        De cuántas maneras sale cada puntaje
      </p>
      <div className="mt-2 -mx-1 overflow-x-auto px-1">
        <div className="flex min-w-max items-end gap-2">
          {totales.map((s) => {
            const cuantas = combinaciones[s].length;
            return (
              <div key={s} className="flex w-12 flex-col items-center gap-1">
                <span className="tabular-nums text-xs tabular-nums text-tinta-tenue">
                  {cuantas}
                </span>
                <div
                  className="w-full rounded-t bg-blue-500 transition-all"
                  style={{ height: `${(cuantas / maximo) * 70 + 6}px` }}
                />
                <span className="tabular-nums text-xs font-semibold tabular-nums text-tinta-media">
                  {s}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-tarjeta px-4 py-3 text-sm text-tinta-media">
        <p>
          El puntaje <strong>3</strong> sale de 4 maneras (0+3, 1+2, 2+1, 3+0)
          y el <strong>0</strong> de una sola. Es la misma forma de campana que
          con dos dados, por la misma razón.
        </p>
        <p className="mt-2 text-tinta-media">
          Con nueve ítems en vez de dos, esa campana se vuelve mucho más
          marcada — y eso es exactamente por qué los puntajes de un cuestionario
          se distribuyen como se distribuyen, que es el tema del apartado 2.9.
        </p>
      </div>
    </div>
  );
}
