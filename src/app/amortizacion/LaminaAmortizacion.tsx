"use client";

import { useState } from "react";
import { MathText } from "@/components/MathText";
import { LaminaShell, type LaminaDiapositiva } from "@/components/lamina/LaminaShell";
import {
  ComparacionOjo,
  FilaRol,
  LineaEjemplo,
  Resultado,
  TarjetaPractica,
} from "@/components/lamina/dispositivos";
import {
  calcularAmortizacionGenerica,
  type MetodoAmortizacion,
  type ResultadoAmortizacionGenerica,
} from "@/lib/simpro/calculo-financiero";

// Todos los montos salen del motor de SIMPRO: acá no se escribe ningún resultado a mano.
const PRESTAMO = 10000;
const TASA = 0.1;
const ANIOS = 5;

const tabla = (metodo: MetodoAmortizacion, capital = PRESTAMO, tasa = TASA, periodos = ANIOS) =>
  calcularAmortizacionGenerica({ capital, tasaPeriodo: tasa, numPeriodos: periodos, metodo });

const AMERICANO = tabla("americano");
const ALEMAN = tabla("aleman");
const FRANCES = tabla("frances");

function bs(x: number, decimales = Number.isInteger(x) ? 0 : 2): string {
  const [entero, dec] = x.toFixed(decimales).split(".");
  return entero.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + (dec ? `,${dec}` : "");
}

// Dentro de $...$ la coma decimal va entre llaves; si no, KaTeX le agrega un espacio.
const tex = (x: number, decimales?: number) => bs(x, decimales).replace(",", "{,}");

const INTERES = "bg-aviso";
const CAPITAL = "bg-ok";

function Leyenda() {
  return (
    <div className="flex flex-wrap gap-x-[1em] gap-y-[0.3em] text-[0.8em] text-tinta-tenue">
      <span className="inline-flex items-center gap-[0.35em]">
        <span className={`inline-block size-[0.75em] rounded-sm ${INTERES}`} /> interés
      </span>
      <span className="inline-flex items-center gap-[0.35em]">
        <span className={`inline-block size-[0.75em] rounded-sm ${CAPITAL}`} /> capital que devuelves
      </span>
    </div>
  );
}

function BarrasCuotas({ resultado }: { resultado: ResultadoAmortizacionGenerica }) {
  const maximo = Math.max(...resultado.cuotas.map((c) => c.cuota));
  return (
    <div
      role="img"
      aria-label={resultado.cuotas.map((c) => `Año ${c.periodo}: cuota ${bs(c.cuota)}, interés ${bs(c.interes)}`).join("; ")}
      className="flex h-[9em] items-stretch gap-[0.45em]"
    >
      {resultado.cuotas.map((c) => (
        <div key={c.periodo} className="flex min-w-0 flex-1 flex-col items-center">
          <div className="flex min-h-0 w-full flex-1 flex-col justify-end">
            <span className="mb-[0.2em] block text-center text-[0.66em] font-semibold tabular-nums text-tinta-media">
              {bs(c.cuota)}
            </span>
            <div className="flex w-full flex-col overflow-hidden rounded-t-[0.3em]" style={{ height: `${(c.cuota / maximo) * 78}%` }}>
              <div className={INTERES} style={{ height: `${(c.interes / c.cuota) * 100}%` }} />
              <div className={`flex-1 ${CAPITAL}`} />
            </div>
          </div>
          <span className="mt-[0.25em] text-[0.66em] text-tinta-tenue">Año {c.periodo}</span>
        </div>
      ))}
    </div>
  );
}

function TablaAmortizacion({ resultado }: { resultado: ResultadoAmortizacionGenerica }) {
  const celda = "px-[0.3em] py-[0.35em] text-right tabular-nums";
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-[0.74em]">
        <thead>
          <tr className="border-b border-borde-fuerte text-tinta-tenue">
            <th className={`${celda} text-left font-semibold`}>Año</th>
            <th className={`${celda} font-semibold`}>Debes</th>
            <th className={`${celda} font-semibold`}>Interés</th>
            <th className={`${celda} font-semibold`}>Capital</th>
            <th className={`${celda} font-semibold`}>Cuota</th>
          </tr>
        </thead>
        <tbody>
          {resultado.cuotas.map((c) => (
            <tr key={c.periodo} className="border-b border-borde">
              <td className={`${celda} text-left`}>{c.periodo}</td>
              <td className={celda}>{bs(c.saldoInicial, 2)}</td>
              <td className={`${celda} text-aviso`}>{bs(c.interes, 2)}</td>
              <td className={`${celda} text-ok`}>{bs(c.amortizacionCapital, 2)}</td>
              <td className={`${celda} font-semibold`}>{bs(c.cuota, 2)}</td>
            </tr>
          ))}
          <tr className="font-bold">
            <td className={`${celda} text-left`}>Total</td>
            <td className={celda} />
            <td className={`${celda} text-aviso`}>{bs(resultado.totalIntereses, 2)}</td>
            <td className={`${celda} text-ok`}>{bs(PRESTAMO, 2)}</td>
            <td className={celda}>{bs(resultado.totalPagado, 2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

const NOMBRES: Record<MetodoAmortizacion, string> = {
  americano: "Americano",
  aleman: "Alemán",
  frances: "Francés",
};

function Laboratorio() {
  const [tasaPct, setTasaPct] = useState(10);
  const [anios, setAnios] = useState(5);
  const resultados = (["americano", "aleman", "frances"] as const).map((m) => ({
    metodo: m,
    r: tabla(m, PRESTAMO, tasaPct / 100, anios),
  }));
  const maximo = Math.max(...resultados.map((x) => x.r.totalIntereses), 1);
  const intereses = resultados.map((x) => x.r.totalIntereses);
  const diferencia = Math.max(...intereses) - Math.min(...intereses);

  return (
    <div className="flex flex-col gap-[0.8em]">
      <p>
        El mismo préstamo de Bs 10.000. Mueve la tasa y el plazo, y mira cuánto interés paga cada
        forma.
      </p>
      <div className="grid gap-[0.6em] sm:grid-cols-2">
        <label className="flex flex-col gap-[0.2em]">
          <span className="text-[0.83em] text-tinta-tenue">
            Tasa anual: <strong className="text-tinta">{bs(tasaPct, Number.isInteger(tasaPct) ? 0 : 1)}%</strong>
          </span>
          <input type="range" min={1} max={30} step={0.5} value={tasaPct} onChange={(e) => setTasaPct(Number(e.target.value))} className="w-full accent-acento" />
        </label>
        <label className="flex flex-col gap-[0.2em]">
          <span className="text-[0.83em] text-tinta-tenue">
            Plazo: <strong className="text-tinta">{anios} {anios === 1 ? "año" : "años"}</strong>
          </span>
          <input type="range" min={1} max={30} step={1} value={anios} onChange={(e) => setAnios(Number(e.target.value))} className="w-full accent-acento" />
        </label>
      </div>
      <div className="flex flex-col gap-[0.6em]">
        {resultados.map(({ metodo, r }) => (
          <div key={metodo}>
            <div className="flex items-baseline justify-between gap-2 text-[0.85em]">
              <span className="font-semibold">{NOMBRES[metodo]}</span>
              <span className="tabular-nums text-tinta-media">
                interés <strong className="text-aviso">Bs {bs(r.totalIntereses, 2)}</strong>
              </span>
            </div>
            <div className="mt-[0.2em] h-[0.75em] overflow-hidden rounded-full bg-papel-suave">
              <div className="h-full rounded-full bg-aviso transition-[width] duration-150" style={{ width: `${(r.totalIntereses / maximo) * 100}%` }} />
            </div>
            <p className="mt-[0.15em] text-[0.75em] tabular-nums text-tinta-tenue">
              Primera cuota Bs {bs(r.cuotas[0]?.cuota ?? 0, 2)} · última Bs {bs(r.cuotas[r.cuotas.length - 1]?.cuota ?? 0, 2)}
            </p>
          </div>
        ))}
      </div>
      <Resultado>
        {diferencia < 0.005 ? "Con un solo año, las tres formas cobran lo mismo" : `Entre la que más y la que menos cobra: Bs ${bs(diferencia, 2)}`}
      </Resultado>
    </div>
  );
}

const PRACTICA_ALEMAN = tabla("aleman", 6000, TASA, 3);
const PRACTICA_FRANCES = tabla("frances", 6000, TASA, 3);
const [RESPUESTA_1, RESPUESTA_2, RESPUESTA_3] = PRACTICA_ALEMAN.cuotas.map((c) => c.cuota);

const diapositivas: LaminaDiapositiva[] = [
  {
    etiqueta: "Piensa esto",
    tono: "aviso",
    contenido: (
      <div className="flex flex-col gap-[1em]">
        <p className="font-serif text-[1.25em] italic leading-snug">
          Pides Bs 10.000 prestados al 10% anual y los devuelves en 5 años. El banco te ofrece tres
          formas de pagar. ¿Terminas pagando el mismo interés con cualquiera?
        </p>
        <div className="flex flex-col gap-[0.5em]">
          {[
            ["Americano", "todo el capital al final"],
            ["Alemán", "el mismo capital cada año"],
            ["Francés", "la misma cuota cada año"],
          ].map(([nombre, idea]) => (
            <div key={nombre} className="flex items-center justify-between gap-2 rounded-[0.75em] bg-papel-suave px-[0.9em] py-[0.6em]">
              <span>
                <strong>{nombre}</strong> <span className="text-[0.85em] text-tinta-tenue">· {idea}</span>
              </span>
              <span className="font-serif text-[1.1em] text-acento">Bs ?</span>
            </div>
          ))}
        </div>
        <p className="text-tinta-media">Mismo préstamo, misma tasa, mismo plazo. Parece que da igual, y no da igual.</p>
      </div>
    ),
  },
  {
    etiqueta: "Arrancamos de algo que ya sabes",
    tono: "tenue",
    contenido: (
      <div className="flex flex-col gap-[0.9em]">
        <p>
          Todavía no hace falta ninguna fórmula. Hay una sola regla, y las tres formas la cumplen:
          <strong> cada año pagas el 10% de lo que todavía debes.</strong>
        </p>
        <div className="rounded-[0.75em] bg-papel-suave px-[0.9em] py-[0.7em]">
          <LineaEjemplo glosa="Si todavía debes Bs 10.000" eq="$10.000 \times 0{,}10 = 1.000$" />
          <LineaEjemplo glosa="Si ya devolviste Bs 2.000 y debes 8.000" eq="$8.000 \times 0{,}10 = 800$" />
        </div>
        <p className="text-tinta-media">
          Lo único que cambia entre las tres formas es cuánto capital devuelves cada año. Y eso
          decide cuánto sigues debiendo.
        </p>
      </div>
    ),
  },
  {
    etiqueta: "Forma 1 · Americano: el capital, todo al final",
    contenido: (
      <div className="flex flex-col gap-[0.8em]">
        <p>Los primeros cuatro años pagas sólo el interés. El último devuelves los Bs 10.000 de golpe.</p>
        <BarrasCuotas resultado={AMERICANO} />
        <Leyenda />
        <div className="rounded-[0.75em] bg-papel-suave px-[0.9em] py-[0.7em]">
          <LineaEjemplo glosa="La deuda nunca baja, así que el interés es siempre el mismo" eq={`$${ANIOS} \\times ${tex(AMERICANO.cuotas[0].interes)} = ${tex(AMERICANO.totalIntereses)}$`} />
        </div>
        <Resultado>Interés total: Bs {bs(AMERICANO.totalIntereses)}</Resultado>
      </div>
    ),
  },
  {
    etiqueta: "Forma 2 · Alemán: el mismo capital cada año",
    contenido: (
      <div className="flex flex-col gap-[0.8em]">
        <p>Devuelves la deuda en 5 partes iguales. Como la deuda baja, el interés también.</p>
        <BarrasCuotas resultado={ALEMAN} />
        <Leyenda />
        <div className="rounded-[0.75em] bg-papel-suave px-[0.9em] py-[0.7em]">
          <LineaEjemplo glosa="Capital de cada año" eq={`$\\dfrac{10.000}{${ANIOS}} = ${tex(ALEMAN.cuotas[0].amortizacionCapital)}$`} />
          <LineaEjemplo glosa="Intereses, año por año" eq={`$${ALEMAN.cuotas.map((c) => tex(c.interes)).join(" + ")} = ${tex(ALEMAN.totalIntereses)}$`} />
        </div>
        <Resultado>Interés total: Bs {bs(ALEMAN.totalIntereses)}</Resultado>
      </div>
    ),
  },
  {
    etiqueta: "Forma 3 · Francés: la misma cuota cada año",
    contenido: (
      <div className="flex flex-col gap-[0.8em]">
        <p>
          Pagas lo mismo todos los años. Lo que cambia es qué hay adentro de la cuota: al principio
          casi todo es interés, al final casi todo es capital.
        </p>
        <BarrasCuotas resultado={FRANCES} />
        <Leyenda />
        <div className="rounded-[0.75em] bg-papel-suave px-[0.9em] py-[0.7em]">
          <LineaEjemplo
            glosa="Año 1: cuota = interés + capital"
            eq={`$${tex(FRANCES.cuotas[0].cuota)} = ${tex(FRANCES.cuotas[0].interes)} + ${tex(FRANCES.cuotas[0].amortizacionCapital)}$`}
          />
          <p className="text-[0.83em] text-tinta-tenue">
            En el año 5 el interés baja a Bs {bs(FRANCES.cuotas[ANIOS - 1].interes)}: casi toda la cuota ya es capital.
          </p>
        </div>
        <Resultado>Interés total: Bs {bs(FRANCES.totalIntereses)}</Resultado>
      </div>
    ),
  },
  {
    etiqueta: `¿De dónde sale Bs ${bs(FRANCES.cuotas[0].cuota)}?`,
    contenido: (
      <div className="flex flex-col gap-[0.6em]">
        <p>La cuota que, repetida 5 veces, devuelve el préstamo con sus intereses.</p>
        <MathText block>{"$$R = P \\cdot \\frac{i}{1 - (1+i)^{-n}}$$"}</MathText>
        <div>
          <FilaRol rol="Lo que te prestaron" conocido="$P$" nuevo="$10.000$" />
          <FilaRol rol="La tasa de cada período" conocido="$i$" nuevo="$0{,}10$" />
          <FilaRol rol="Cuántas cuotas" conocido="$n$" nuevo={`$${ANIOS}$`} ultimo />
        </div>
        <div className="rounded-[0.75em] bg-papel-suave px-[0.9em] py-[0.7em]">
          <LineaEjemplo
            glosa="Ojo: $i$ es la tasa por período (mensual: $0{,}10 \div 12$)"
            eq={`$R = 10.000 \\cdot \\dfrac{0{,}10}{1 - 1{,}1^{-${ANIOS}}}$`}
          />
          <LineaEjemplo
            glosa=""
            eq={`$R = \\dfrac{1.000}{${(1 - Math.pow(1 + TASA, -ANIOS)).toFixed(6).replace(".", "{,}")}} \\approx ${tex(FRANCES.cuotas[0].cuota)}$`}
          />
        </div>
      </div>
    ),
  },
  {
    etiqueta: "La tabla del francés, fila por fila",
    contenido: (
      <div className="flex flex-col gap-[0.8em]">
        <p>
          Cada fila usa la regla del principio: el interés es el 10% de lo que debes al empezar el
          año, y lo que sobra de la cuota baja la deuda. Con la quinta cuota ya no debes nada.
        </p>
        <TablaAmortizacion resultado={FRANCES} />
        <p className="text-[0.8em] text-tinta-tenue">
          Cada monto está redondeado al centavo, así que una suma puede no cerrar por uno.
        </p>
      </div>
    ),
  },
  {
    etiqueta: "Ojo · error común",
    tono: "error",
    contenido: (
      <div className="flex flex-col gap-[0.9em]">
        <p>
          Pensar que la cuota más baja es la más barata. El americano tiene la cuota más baja durante
          cuatro años y es el que más interés cobra.
        </p>
        <ComparacionOjo
          correcto={{ arriba: `Alemán: $${tex(ALEMAN.totalIntereses)}$`, abajo: "devuelve capital desde el primer año" }}
          incorrecto={{ arriba: `Americano: $${tex(AMERICANO.totalIntereses)}$`, abajo: "cuota baja, pero la deuda nunca baja" }}
        />
        <p className="text-tinta-media">
          El interés depende de cuánto tiempo sigues debiendo, no del tamaño de la cuota.
        </p>
      </div>
    ),
  },
  {
    etiqueta: "Compara las tres formas",
    tono: "ok",
    contenido: <Laboratorio />,
  },
  {
    etiqueta: "Practícalo tú",
    contenido: (
      <TarjetaPractica
        pregunta="Te prestan Bs 6.000 al 10% anual, a pagar en 3 años con el sistema alemán. ¿Cuánto pagas en la segunda cuota?"
        opciones={[`Bs ${bs(RESPUESTA_1)}`, `Bs ${bs(PRACTICA_FRANCES.cuotas[0].cuota)}`, `Bs ${bs(RESPUESTA_2)}`, `Bs ${bs(RESPUESTA_3)}`]}
        correcta={2}
        explicacion={`Cada año devuelves $\\dfrac{6.000}{3} = 2.000$ de capital. Al empezar el segundo año debes $6.000 - 2.000 = 4.000$, así que el interés es $4.000 \\times 0{,}10 = 400$ y la cuota es $2.000 + 400 = ${tex(RESPUESTA_2)}$. Bs ${bs(PRACTICA_FRANCES.cuotas[0].cuota)} sería la cuota del francés, y Bs ${bs(RESPUESTA_1)} la del primer año.`}
      />
    ),
  },
];

export function LaminaAmortizacion() {
  return (
    <LaminaShell
      contexto="Matemática Financiera · Amortización"
      titulo="Tres formas de devolver un préstamo"
      volver={{ href: "/", titulo: "Inicio" }}
      diapositivas={diapositivas}
      necesitasAntes={{ href: "/anualidades", titulo: "Cuotas iguales: cuánto valen hoy y al final" }}
      teAbrePuertaA={{ href: "/bonos", titulo: "Bonos: precio, rendimiento y duración" }}
    />
  );
}
