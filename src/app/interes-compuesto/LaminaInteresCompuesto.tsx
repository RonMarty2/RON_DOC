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
import { montoCompuesto, montoSimple, poderDeCompra, tasaEfectivaAnual, tasaReal } from "@/lib/finanzas/interes";

// Todos los montos y tasas salen de src/lib/finanzas/interes.ts: acá no se escribe ningún resultado a mano.
const CAPITAL = 10000;
const TASA = 0.1;
const ANIOS = 3;
const INFLACION = 0.05;

function bs(x: number, decimales = Math.abs(x - Math.round(x)) < 0.005 ? 0 : 2): string {
  const [entero, dec] = x.toFixed(decimales).split(".");
  return entero.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + (dec ? `,${dec}` : "");
}
const pct = (x: number, decimales = 2) => `${(x * 100).toFixed(decimales).replace(".", ",")}%`;
// Dentro de $...$ la coma decimal va entre llaves; si no, KaTeX le agrega un espacio.
const tex = (s: string) => s.replace(",", "{,}").replace("%", "\\%");

const COMPUESTO_POR_ANIO = [1, 2, 3].map((n) => montoCompuesto(CAPITAL, TASA, n));
const SIMPLE = montoSimple(CAPITAL, TASA, ANIOS);
const COMPUESTO = montoCompuesto(CAPITAL, TASA, ANIOS);

const HORIZONTES = [1, 5, 10, 20, 30];

const CAPITALIZACIONES = [
  { m: 1, nombre: "Anual" },
  { m: 2, nombre: "Semestral" },
  { m: 4, nombre: "Trimestral" },
  { m: 12, nombre: "Mensual" },
];

const EFECTIVA_MENSUAL = tasaEfectivaAnual(TASA, 12);
const HOY = poderDeCompra(COMPUESTO, INFLACION, ANIOS);
const REAL = tasaReal(TASA, INFLACION);
const REAL_ALTA = tasaReal(0.3, 0.2);

function Barra({ etiqueta, valor, maximo, clase }: { etiqueta: string; valor: number; maximo: number; clase: string }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2 text-[0.83em]">
        <span className="text-tinta-media">{etiqueta}</span>
        <span className="font-semibold tabular-nums">Bs {bs(valor, 2)}</span>
      </div>
      <div className="mt-[0.15em] h-[0.7em] overflow-hidden rounded-full bg-papel-suave">
        <div className={`h-full rounded-full transition-[width] duration-150 ${clase}`} style={{ width: `${(valor / maximo) * 100}%` }} />
      </div>
    </div>
  );
}

function Leyenda() {
  return (
    <div className="flex flex-wrap gap-x-[1em] gap-y-[0.3em] text-[0.8em] text-tinta-tenue">
      <span className="inline-flex items-center gap-[0.35em]">
        <span className="inline-block size-[0.75em] rounded-sm bg-borde-fuerte" /> interés simple
      </span>
      <span className="inline-flex items-center gap-[0.35em]">
        <span className="inline-block size-[0.75em] rounded-sm bg-acento" /> interés compuesto
      </span>
    </div>
  );
}

function Laboratorio() {
  const [tasaPct, setTasaPct] = useState(10);
  const [anios, setAnios] = useState(10);
  const [inflacionPct, setInflacionPct] = useState(5);
  const [m, setM] = useState(1);

  const tasa = tasaPct / 100;
  const inflacion = inflacionPct / 100;
  const simple = montoSimple(CAPITAL, tasa, anios);
  const compuesto = montoCompuesto(CAPITAL, tasa, anios, m);
  const hoy = poderDeCompra(compuesto, inflacion, anios);
  const maximo = Math.max(simple, compuesto, hoy);

  const deslizador = (etiqueta: string, valor: string, props: { min: number; max: number; step: number; value: number; onChange: (v: number) => void }) => (
    <label className="flex flex-col gap-[0.15em]">
      <span className="text-[0.8em] text-tinta-tenue">
        {etiqueta}: <strong className="text-tinta">{valor}</strong>
      </span>
      <input
        type="range"
        min={props.min}
        max={props.max}
        step={props.step}
        value={props.value}
        onChange={(e) => props.onChange(Number(e.target.value))}
        className="w-full accent-acento"
      />
    </label>
  );

  return (
    <div className="flex flex-col gap-[0.7em]">
      <p className="text-[0.93em]">Depositas Bs 10.000. Mueve la tasa, los años y la inflación.</p>
      <div className="grid gap-x-[1em] gap-y-[0.4em] sm:grid-cols-3">
        {deslizador("Tasa anual", pct(tasa, Number.isInteger(tasaPct) ? 0 : 1), { min: 1, max: 30, step: 0.5, value: tasaPct, onChange: setTasaPct })}
        {deslizador("Años", String(anios), { min: 1, max: 40, step: 1, value: anios, onChange: setAnios })}
        {deslizador("Inflación", pct(inflacion, Number.isInteger(inflacionPct) ? 0 : 1), { min: 0, max: 20, step: 0.5, value: inflacionPct, onChange: setInflacionPct })}
      </div>
      <div className="flex flex-wrap gap-[0.35em]" role="group" aria-label="Capitalización">
        {CAPITALIZACIONES.map((c) => (
          <button
            key={c.m}
            type="button"
            onClick={() => setM(c.m)}
            aria-pressed={m === c.m}
            className={`rounded-full border px-[0.8em] py-[0.25em] text-[0.8em] font-semibold transition ${
              m === c.m ? "border-acento bg-acento text-acento-texto" : "border-borde-fuerte text-tinta-media"
            }`}
          >
            {c.nombre}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-[0.5em]">
        <Barra etiqueta="Con interés simple" valor={simple} maximo={maximo} clase="bg-borde-fuerte" />
        <Barra etiqueta="Con interés compuesto" valor={compuesto} maximo={maximo} clase="bg-acento" />
        <Barra etiqueta="Ese compuesto, en precios de hoy" valor={hoy} maximo={maximo} clase="bg-ok" />
      </div>
      <p className="text-[0.8em] tabular-nums text-tinta-tenue">
        Tasa efectiva anual {pct(tasaEfectivaAnual(tasa, m))} · tasa real {pct(tasaReal(tasaEfectivaAnual(tasa, m), inflacion))}
      </p>
    </div>
  );
}

const PRACTICA_SEMESTRAL = montoCompuesto(5000, 0.08, 2, 2);
const PRACTICA_ANUAL = montoCompuesto(5000, 0.08, 2);
const PRACTICA_SIMPLE = montoSimple(5000, 0.08, 2);

const diapositivas: LaminaDiapositiva[] = [
  {
    etiqueta: "Piensa esto",
    tono: "aviso",
    contenido: (
      <div className="flex flex-col gap-[1em]">
        <p className="font-serif text-[1.25em] italic leading-snug">
          Depositas Bs 10.000 al 10% anual y no tocas nada durante 3 años. ¿Tienes Bs 13.000 al
          final?
        </p>
        <div className="flex flex-col gap-[0.5em]">
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-[0.75em] bg-papel-suave px-[0.9em] py-[0.6em]">
            <span className="text-[0.85em] text-tinta-tenue">Lo que parece</span>
            <MathText>{`$10.000 + 3 \\times 1.000 = ${bs(SIMPLE)}$`}</MathText>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-[0.75em] border-[1.5px] border-acento/40 bg-acento/10 px-[0.9em] py-[0.6em]">
            <span className="text-[0.85em] text-tinta-tenue">Lo que te da un banco</span>
            <span className="font-serif text-[1.1em] text-acento">Bs ?</span>
          </div>
        </div>
        <p className="text-tinta-media">Todo depende de sobre qué monto se calcula ese 10% cada año.</p>
      </div>
    ),
  },
  {
    etiqueta: "Arrancamos de algo que ya sabes: interés simple",
    tono: "tenue",
    contenido: (
      <div className="flex flex-col gap-[0.9em]">
        <p>Si el 10% se calcula siempre sobre los Bs 10.000 del principio, cada año ganas lo mismo.</p>
        <div className="rounded-[0.75em] bg-papel-suave px-[0.9em] py-[0.7em]">
          <LineaEjemplo glosa="Lo que ganas cada año" eq="$10.000 \times 0{,}10 = 1.000$" />
          <LineaEjemplo glosa="Después de 3 años" eq={`$10.000 + 3 \\times 1.000 = ${bs(SIMPLE)}$`} />
        </div>
        <MathText block>{"$$M = C\\,(1 + i\\,n)$$"}</MathText>
        <p className="text-tinta-media">
          Es el interés simple: el capital gana, pero lo que ya ganó se queda quieto.
        </p>
      </div>
    ),
  },
  {
    etiqueta: "Paso 1 · El interés también gana interés",
    contenido: (
      <div className="flex flex-col gap-[0.9em]">
        <p>
          En un depósito, lo ganado se suma al saldo. Entonces el segundo año el 10% se calcula sobre
          Bs 11.000, no sobre 10.000.
        </p>
        <div className="rounded-[0.75em] bg-papel-suave px-[0.9em] py-[0.7em]">
          <LineaEjemplo glosa="Año 1" eq={`$10.000 \\times 1{,}1 = ${bs(COMPUESTO_POR_ANIO[0])}$`} />
          <LineaEjemplo glosa="Año 2" eq={`$${bs(COMPUESTO_POR_ANIO[0])} \\times 1{,}1 = ${bs(COMPUESTO_POR_ANIO[1])}$`} />
          <LineaEjemplo glosa="Año 3" eq={`$${bs(COMPUESTO_POR_ANIO[1])} \\times 1{,}1 = ${tex(bs(COMPUESTO_POR_ANIO[2]))}$`} />
        </div>
        <Resultado>Bs {bs(COMPUESTO)}, no Bs {bs(SIMPLE)}</Resultado>
        <p className="text-tinta-media">
          Multiplicar por <MathText>{"$1{,}1$"}</MathText> es sumar el 10%: quedarte con lo que tenías y
          un 10% más.
        </p>
      </div>
    ),
  },
  {
    etiqueta: "Paso 2 · Multiplicar tres veces es elevar al cubo",
    contenido: (
      <div className="flex flex-col gap-[0.7em]">
        <div className="rounded-[0.75em] bg-papel-suave px-[0.9em] py-[0.7em]">
          <LineaEjemplo glosa="Las tres cuentas del paso anterior, de una sola vez" eq="$10.000 \times 1{,}1 \times 1{,}1 \times 1{,}1$" />
          <LineaEjemplo glosa="" eq="$= 10.000 \times 1{,}1^{3}$" />
        </div>
        <MathText block>{"$$M = C\\,(1 + i)^{n}$$"}</MathText>
        <div>
          <FilaRol rol="Lo que depositas" conocido="$C$" nuevo="$10.000$" />
          <FilaRol rol="La tasa de cada período" conocido="$i$" nuevo="$0{,}10$" />
          <FilaRol rol="Cuántos períodos" conocido="$n$" nuevo={`$${ANIOS}$`} ultimo />
        </div>
        <LineaEjemplo glosa="" eq={`$M = 10.000 \\cdot 1{,}1^{3} = ${bs(COMPUESTO)}$`} />
      </div>
    ),
  },
  {
    etiqueta: "La diferencia crece con los años",
    contenido: (
      <div className="flex flex-col gap-[0.8em]">
        <p>En 3 años la diferencia es chica. Con más tiempo, el compuesto se despega.</p>
        <Leyenda />
        <div className="flex flex-col gap-[0.55em]">
          {HORIZONTES.map((n) => {
            const maximo = montoCompuesto(CAPITAL, TASA, HORIZONTES[HORIZONTES.length - 1]);
            const s = montoSimple(CAPITAL, TASA, n);
            const c = montoCompuesto(CAPITAL, TASA, n);
            return (
              <div key={n} className="grid grid-cols-[3.6em_1fr] items-center gap-[0.5em]">
                <span className="text-[0.8em] text-tinta-tenue">{n} {n === 1 ? "año" : "años"}</span>
                <div className="flex flex-col gap-[0.15em]">
                  <div className="flex items-center gap-[0.4em]">
                    <div className="h-[0.55em] rounded-full bg-borde-fuerte" style={{ width: `${(s / maximo) * 75}%` }} />
                    <span className="text-[0.68em] tabular-nums text-tinta-tenue">{bs(s, 0)}</span>
                  </div>
                  <div className="flex items-center gap-[0.4em]">
                    <div className="h-[0.55em] rounded-full bg-acento" style={{ width: `${(c / maximo) * 75}%` }} />
                    <span className="text-[0.68em] font-semibold tabular-nums text-acento">{bs(c, 0)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    ),
  },
  {
    etiqueta: "Si el banco capitaliza más seguido",
    contenido: (
      <div className="flex flex-col gap-[0.7em]">
        <p>&quot;Capitalizable mensualmente&quot;: cada mes se suma a tu saldo la doceava parte del 10%.</p>
        <MathText block>{"$$M = C\\left(1 + \\frac{j}{m}\\right)^{m\\,n}$$"}</MathText>
        <div>
          <FilaRol rol="Tasa que anuncia el banco (nominal)" conocido="$j$" nuevo="$0{,}10$" />
          <FilaRol rol="Veces por año que suma el interés" conocido="$m$" nuevo="$12$" ultimo />
        </div>
        <table className="w-full border-collapse text-[0.83em]">
          <tbody>
            {CAPITALIZACIONES.map((c) => (
              <tr key={c.m} className="border-b border-borde">
                <td className="py-[0.3em] text-tinta-media">{c.nombre}</td>
                <td className="py-[0.3em] text-center text-tinta-tenue">
                  <MathText>{`$m = ${c.m}$`}</MathText>
                </td>
                <td className="py-[0.3em] text-right font-semibold tabular-nums">Bs {bs(montoCompuesto(CAPITAL, TASA, ANIOS, c.m), 2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-[0.87em] text-tinta-media">Capitalizar cada mes da Bs {bs(montoCompuesto(CAPITAL, TASA, ANIOS, 12) - COMPUESTO, 2)} más que una vez al año.</p>
      </div>
    ),
  },
  {
    etiqueta: "Tasa nominal y tasa efectiva",
    contenido: (
      <div className="flex flex-col gap-[0.8em]">
        <p>
          Para comparar ofertas se usa la tasa efectiva: lo que el dinero crece de verdad en un año,
          con todas las capitalizaciones adentro.
        </p>
        <MathText block>{"$$i = \\left(1 + \\frac{j}{m}\\right)^{m} - 1$$"}</MathText>
        <div className="rounded-[0.75em] bg-papel-suave px-[0.9em] py-[0.7em]">
          <LineaEjemplo glosa="10% capitalizable mensualmente" eq={`$i = \\left(1 + \\dfrac{0{,}10}{12}\\right)^{12} - 1 \\approx ${tex(pct(EFECTIVA_MENSUAL))}$`} />
        </div>
        <Resultado>Anuncia {pct(TASA, 0)}, rinde {pct(EFECTIVA_MENSUAL)} al año</Resultado>
        <p className="text-tinta-media">
          Si otro banco ofrece 10,4% capitalizable una vez al año, el primero conviene más, aunque
          anuncie menos.
        </p>
      </div>
    ),
  },
  {
    etiqueta: "Pero los precios también suben",
    contenido: (
      <div className="flex flex-col gap-[0.8em]">
        <p>
          Si la inflación es {pct(INFLACION, 0)} al año, tus Bs {bs(COMPUESTO)} compran menos de lo que
          parece.
        </p>
        <div className="flex flex-col gap-[0.5em]">
          <Barra etiqueta="Depositaste" valor={CAPITAL} maximo={COMPUESTO} clase="bg-borde-fuerte" />
          <Barra etiqueta="Tienes a los 3 años" valor={COMPUESTO} maximo={COMPUESTO} clase="bg-acento" />
          <Barra etiqueta="Eso, en precios de hoy" valor={HOY} maximo={COMPUESTO} clase="bg-ok" />
        </div>
        <div className="rounded-[0.75em] bg-papel-suave px-[0.9em] py-[0.7em]">
          <LineaEjemplo glosa="Descontando la inflación de cada año" eq={`$\\dfrac{${bs(COMPUESTO)}}{1{,}05^{3}} \\approx ${tex(bs(HOY, 2))}$`} />
        </div>
        <p className="text-tinta-media">
          Ganaste Bs {bs(HOY - CAPITAL, 2)} de poder de compra, no Bs {bs(COMPUESTO - CAPITAL)}.
        </p>
      </div>
    ),
  },
  {
    etiqueta: "La tasa real",
    contenido: (
      <div className="flex flex-col gap-[0.7em]">
        <p>Es lo que crece tu poder de compra, ya descontada la inflación.</p>
        <MathText block>{"$$1 + i = (1 + r)(1 + \\pi)$$"}</MathText>
        <div>
          <FilaRol rol="Lo que rinde el depósito" conocido="$i$" nuevo="$0{,}10$" />
          <FilaRol rol="Lo que suben los precios" conocido="$\pi$" nuevo="$0{,}05$" />
          <FilaRol rol="Lo que crece tu poder de compra" conocido="$r$" nuevo="$?$" ultimo />
        </div>
        <div className="rounded-[0.75em] bg-papel-suave px-[0.9em] py-[0.7em]">
          <LineaEjemplo glosa="" eq={`$r = \\dfrac{1{,}10}{1{,}05} - 1 \\approx ${tex(pct(REAL))}$`} />
          <LineaEjemplo glosa="Comprobación: crecer a esa tasa da lo mismo" eq={`$10.000 \\cdot ${tex(bs(1 + REAL, 6))}^{3} \\approx ${tex(bs(HOY, 2))}$`} />
        </div>
      </div>
    ),
  },
  {
    etiqueta: "Ojo · error común",
    tono: "error",
    contenido: (
      <div className="flex flex-col gap-[0.9em]">
        <p>Restar las tasas: 10% menos 5% de inflación, 5% real. Se acerca, pero no es la tasa real.</p>
        <ComparacionOjo
          correcto={{ arriba: "$r = \\dfrac{1{,}10}{1{,}05} - 1$", abajo: `$\\approx ${tex(pct(REAL))}$` }}
          incorrecto={{ arriba: "$r = 10\\% - 5\\%$", abajo: "$= 5\\%$" }}
        />
        <p className="text-tinta-media">
          Con inflación alta el error ya no es chico: con 30% de interés y 20% de inflación, restar da
          10%, y la tasa real es {pct(REAL_ALTA)}.
        </p>
      </div>
    ),
  },
  {
    etiqueta: "Pruébalo con tus números",
    tono: "ok",
    contenido: <Laboratorio />,
  },
  {
    etiqueta: "Practícalo tú",
    contenido: (
      <TarjetaPractica
        pregunta="Depositas Bs 5.000 al 8% anual capitalizable semestralmente, durante 2 años. ¿Cuánto tienes al final?"
        opciones={[`Bs ${bs(PRACTICA_SIMPLE)}`, `Bs ${bs(PRACTICA_ANUAL)}`, `Bs ${bs(PRACTICA_SEMESTRAL, 2)}`, "Bs 6.000"]}
        correcta={2}
        explicacion={`Cada semestre suma $\\dfrac{0{,}08}{2} = 0{,}04$, y en 2 años hay $2 \\times 2 = 4$ semestres: $M = 5.000 \\cdot 1{,}04^{4} \\approx ${tex(bs(PRACTICA_SEMESTRAL, 2))}$. Bs ${bs(PRACTICA_ANUAL)} sería capitalizando una vez al año, y Bs ${bs(PRACTICA_SIMPLE)} con interés simple.`}
      />
    ),
  },
];

export function LaminaInteresCompuesto() {
  return (
    <LaminaShell
      contexto="Matemática Financiera · Interés compuesto"
      titulo="Interés compuesto e inflación"
      volver={{ href: "/", titulo: "Inicio" }}
      diapositivas={diapositivas}
      teAbrePuertaA={{ href: "/amortizacion", titulo: "Tres formas de devolver un préstamo" }}
    />
  );
}
