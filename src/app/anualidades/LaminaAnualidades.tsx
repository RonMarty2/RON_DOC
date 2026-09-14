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
  cuotaDesdeValorFuturo,
  cuotaDesdeValorPresente,
  valorFuturoAnualidad,
  valorPresenteAnualidad,
} from "@/lib/finanzas/anualidades";
import { montoCompuesto } from "@/lib/finanzas/interes";

// Todos los montos salen de src/lib/finanzas/: acá no se escribe ningún resultado a mano.
const CUOTA = 1000;
const TASA = 0.1;
const ANIOS = 5;

const VF = valorFuturoAnualidad(CUOTA, TASA, ANIOS);
const VP = valorPresenteAnualidad(CUOTA, TASA, ANIOS);
const VF_ANTICIPADA = valorFuturoAnualidad(CUOTA, TASA, ANIOS, true);
const VP_ANTICIPADA = valorPresenteAnualidad(CUOTA, TASA, ANIOS, true);
const PRESTAMO = 10000;
const CUOTA_PRESTAMO = cuotaDesdeValorPresente(PRESTAMO, TASA, ANIOS);
const FACTOR_VP = valorPresenteAnualidad(1, TASA, ANIOS);

function bs(x: number, decimales = Math.abs(x - Math.round(x)) < 0.005 ? 0 : 2): string {
  const [entero, dec] = x.toFixed(decimales).split(".");
  return entero.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + (dec ? `,${dec}` : "");
}
// Dentro de $...$ la coma decimal va entre llaves; si no, KaTeX le agrega un espacio.
const tex = (x: number, decimales?: number) => bs(x, decimales).replace(",", "{,}");

function Barras({
  datos,
  maximo,
  clase,
}: {
  datos: { etiqueta: string; valor: number; nota: string; base?: number }[];
  maximo: number;
  clase: string;
}) {
  return (
    <div role="img" aria-label={datos.map((d) => `${d.etiqueta}: ${bs(d.valor, 2)}`).join("; ")} className="flex h-[8em] items-stretch gap-[0.45em]">
      {datos.map((d) => (
        <div key={d.etiqueta} className="flex min-w-0 flex-1 flex-col items-center">
          <div className="flex min-h-0 w-full flex-1 flex-col justify-end">
            <span className="mb-[0.2em] block text-center text-[0.64em] font-semibold tabular-nums text-tinta-media">{bs(d.valor, 2)}</span>
            <div className="flex w-full flex-col overflow-hidden rounded-t-[0.3em]" style={{ height: `${(d.valor / maximo) * 78}%` }}>
              <div className={`flex-1 ${clase}`} />
              {d.base !== undefined && <div className="bg-borde-fuerte" style={{ height: `${(d.base / d.valor) * 100}%` }} />}
            </div>
          </div>
          <span className="mt-[0.2em] text-[0.64em] text-tinta-tenue">{d.etiqueta}</span>
          <span className="text-[0.58em] text-tinta-tenue">{d.nota}</span>
        </div>
      ))}
    </div>
  );
}

function Laboratorio() {
  const [cuota, setCuota] = useState(1000);
  const [tasaPct, setTasaPct] = useState(10);
  const [anios, setAnios] = useState(5);
  const [anticipada, setAnticipada] = useState(false);

  const tasa = tasaPct / 100;
  const depositado = cuota * anios;
  const vf = valorFuturoAnualidad(cuota, tasa, anios, anticipada);
  const vp = valorPresenteAnualidad(cuota, tasa, anios, anticipada);
  const maximo = Math.max(depositado, vf, vp);

  const filas = [
    { etiqueta: "Depositas en total", valor: depositado, clase: "bg-borde-fuerte" },
    { etiqueta: "Vale al final (VF)", valor: vf, clase: "bg-ok" },
    { etiqueta: "Vale hoy (VP)", valor: vp, clase: "bg-acento" },
  ];

  const deslizador = (etiqueta: string, valor: string, min: number, max: number, step: number, actual: number, cambiar: (v: number) => void) => (
    <label className="flex flex-col gap-[0.15em]">
      <span className="text-[0.8em] text-tinta-tenue">
        {etiqueta}: <strong className="text-tinta">{valor}</strong>
      </span>
      <input type="range" min={min} max={max} step={step} value={actual} onChange={(e) => cambiar(Number(e.target.value))} className="w-full accent-acento" />
    </label>
  );

  return (
    <div className="flex flex-col gap-[0.7em]">
      <div className="grid gap-x-[1em] gap-y-[0.4em] sm:grid-cols-3">
        {deslizador("Cuota", `Bs ${bs(cuota)}`, 100, 5000, 100, cuota, setCuota)}
        {deslizador("Tasa", `${bs(tasaPct, Number.isInteger(tasaPct) ? 0 : 1)}%`, 1, 30, 0.5, tasaPct, setTasaPct)}
        {deslizador("Períodos", String(anios), 1, 40, 1, anios, setAnios)}
      </div>
      <div className="flex gap-[0.35em]" role="group" aria-label="Cuándo se paga cada cuota">
        {[
          { valor: false, nombre: "Al final (vencida)" },
          { valor: true, nombre: "Al inicio (anticipada)" },
        ].map((op) => (
          <button
            key={op.nombre}
            type="button"
            onClick={() => setAnticipada(op.valor)}
            aria-pressed={anticipada === op.valor}
            className={`rounded-full border px-[0.8em] py-[0.25em] text-[0.8em] font-semibold transition ${
              anticipada === op.valor ? "border-acento bg-acento text-acento-texto" : "border-borde-fuerte text-tinta-media"
            }`}
          >
            {op.nombre}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-[0.5em]">
        {filas.map((f) => (
          <div key={f.etiqueta}>
            <div className="flex items-baseline justify-between gap-2 text-[0.83em]">
              <span className="text-tinta-media">{f.etiqueta}</span>
              <span className="font-semibold tabular-nums">Bs {bs(f.valor, 2)}</span>
            </div>
            <div className="mt-[0.15em] h-[0.7em] overflow-hidden rounded-full bg-papel-suave">
              <div className={`h-full rounded-full transition-[width] duration-150 ${f.clase}`} style={{ width: `${(f.valor / maximo) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
      <Resultado>El interés te suma Bs {bs(vf - depositado, 2)} al final</Resultado>
    </div>
  );
}

const PRACTICA_R = cuotaDesdeValorFuturo(10000, 0.08, 4);
const PRACTICA_VP = cuotaDesdeValorPresente(10000, 0.08, 4);

const diapositivas: LaminaDiapositiva[] = [
  {
    etiqueta: "Piensa esto",
    tono: "aviso",
    contenido: (
      <div className="flex flex-col gap-[1em]">
        <p className="font-serif text-[1.25em] italic leading-snug">
          Ahorras Bs 1.000 al final de cada año, durante 5 años, al 10% anual. ¿Tienes Bs 5.000 al
          final?
        </p>
        <div className="flex flex-col gap-[0.5em]">
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-[0.75em] bg-papel-suave px-[0.9em] py-[0.6em]">
            <span className="text-[0.85em] text-tinta-tenue">Lo que depositaste</span>
            <MathText>{"$5 \\times 1.000 = 5.000$"}</MathText>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-[0.75em] border-[1.5px] border-acento/40 bg-acento/10 px-[0.9em] py-[0.6em]">
            <span className="text-[0.85em] text-tinta-tenue">Lo que tienes</span>
            <span className="font-serif text-[1.1em] text-acento">Bs ?</span>
          </div>
        </div>
        <p className="text-tinta-media">Cada cuota entró en un año distinto, así que cada una ganó interés distinto tiempo.</p>
      </div>
    ),
  },
  {
    etiqueta: "Arrancamos de algo que ya sabes",
    tono: "tenue",
    contenido: (
      <div className="flex flex-col gap-[0.9em]">
        <p>Con un solo depósito ya sabes calcular cuánto crece: es interés compuesto.</p>
        <MathText block>{"$$M = C\\,(1 + i)^{n}$$"}</MathText>
        <div className="rounded-[0.75em] bg-papel-suave px-[0.9em] py-[0.7em]">
          <LineaEjemplo glosa="Bs 1.000 que se quedan 4 años" eq={`$1.000 \\cdot 1{,}1^{4} = ${tex(montoCompuesto(CUOTA, TASA, 4))}$`} />
        </div>
        <p className="text-tinta-media">
          Una <strong>anualidad</strong> es eso mismo, repetido: varias cuotas iguales, cada una con
          su propio <MathText>{"$n$"}</MathText>.
        </p>
      </div>
    ),
  },
  {
    etiqueta: "Paso 1 · Cada cuota crece un tiempo distinto",
    contenido: (
      <div className="flex flex-col gap-[0.8em]">
        <p>La cuota del año 1 gana interés 4 años; la del año 5 entra el último día y no gana nada.</p>
        <Barras
          datos={[4, 3, 2, 1, 0].map((n, k) => ({ etiqueta: `Cuota ${k + 1}`, valor: montoCompuesto(CUOTA, TASA, n), nota: `${n} ${n === 1 ? "año" : "años"}`, base: CUOTA }))}
          maximo={montoCompuesto(CUOTA, TASA, 4)}
          clase="bg-ok"
        />
        <div className="flex flex-wrap gap-x-[1em] text-[0.8em] text-tinta-tenue">
          <span className="inline-flex items-center gap-[0.35em]"><span className="inline-block size-[0.75em] rounded-sm bg-borde-fuerte" /> la cuota</span>
          <span className="inline-flex items-center gap-[0.35em]"><span className="inline-block size-[0.75em] rounded-sm bg-ok" /> interés que ganó</span>
        </div>
        <div className="rounded-[0.75em] bg-papel-suave px-[0.9em] py-[0.7em]">
          <LineaEjemplo
            glosa="Sumando lo que vale cada una al final"
            eq={`$${[4, 3, 2].map((n) => tex(montoCompuesto(CUOTA, TASA, n))).join(" + ")}$`}
          />
          <LineaEjemplo glosa="" eq={`$+ ${[1, 0].map((n) => tex(montoCompuesto(CUOTA, TASA, n))).join(" + ")} = ${tex(VF)}$`} />
        </div>
        <Resultado>Bs {bs(VF)}, no Bs 5.000</Resultado>
      </div>
    ),
  },
  {
    etiqueta: "Paso 2 · La suma tiene fórmula",
    contenido: (
      <div className="flex flex-col gap-[0.7em]">
        <p>No hace falta sumar cuota por cuota: esa suma siempre da lo mismo que esta fórmula.</p>
        <MathText block>{"$$\\text{VF} = R \\cdot \\frac{(1+i)^{n} - 1}{i}$$"}</MathText>
        <div>
          <FilaRol rol="La cuota de cada período" conocido="$R$" nuevo="$1.000$" />
          <FilaRol rol="La tasa de cada período" conocido="$i$" nuevo="$0{,}10$" />
          <FilaRol rol="Cuántas cuotas" conocido="$n$" nuevo={`$${ANIOS}$`} ultimo />
        </div>
        <div className="rounded-[0.75em] bg-papel-suave px-[0.9em] py-[0.7em]">
          <LineaEjemplo glosa="" eq={`$\\text{VF} = 1.000 \\cdot \\dfrac{1{,}1^{5} - 1}{0{,}10} = ${tex(VF)}$`} />
        </div>
      </div>
    ),
  },
  {
    etiqueta: "Ahora al revés: ¿cuánto vale hoy?",
    contenido: (
      <div className="flex flex-col gap-[0.8em]">
        <p>
          Si te prometen Bs 1.000 al final de cada año durante 5 años, esa promesa vale menos hoy:
          cada cuota se trae a hoy dividiendo entre <MathText>{"$1{,}1$"}</MathText> por cada año de espera.
        </p>
        <Barras
          datos={[1, 2, 3, 4, 5].map((n) => ({ etiqueta: `Año ${n}`, valor: CUOTA / Math.pow(1 + TASA, n), nota: `÷ 1,1^${n}` }))}
          maximo={CUOTA}
          clase="bg-acento"
        />
        <p className="text-[0.8em] text-tinta-tenue">Cada monto está redondeado al centavo, así que la suma puede no cerrar por uno.</p>
        <Resultado>Hoy vale Bs {bs(VP, 2)}</Resultado>
      </div>
    ),
  },
  {
    etiqueta: "La fórmula del valor presente",
    contenido: (
      <div className="flex flex-col gap-[0.8em]">
        <p>Es la misma idea que el valor futuro, mirando hacia atrás.</p>
        <MathText block>{"$$\\text{VP} = R \\cdot \\frac{1 - (1+i)^{-n}}{i}$$"}</MathText>
        <div className="rounded-[0.75em] bg-papel-suave px-[0.9em] py-[0.7em]">
          <LineaEjemplo glosa="" eq={`$\\text{VP} = 1.000 \\cdot \\dfrac{1 - 1{,}1^{-5}}{0{,}10} \\approx ${tex(VP, 2)}$`} />
          <LineaEjemplo glosa="Y los dos se conectan: el VP llevado 5 años adelante es el VF" eq={`$${tex(VP, 2)} \\cdot 1{,}1^{5} \\approx ${tex(VF)}$`} />
        </div>
      </div>
    ),
  },
  {
    etiqueta: "Esto ya lo viste: la cuota de un préstamo",
    tono: "ok",
    contenido: (
      <div className="flex flex-col gap-[0.8em]">
        <p>
          Un préstamo de Bs 10.000 es un valor presente. La cuota fija que lo paga sale de despejar{" "}
          <MathText>{"$R$"}</MathText> de la fórmula anterior.
        </p>
        <MathText block>{"$$R = \\text{VP} \\cdot \\frac{i}{1 - (1+i)^{-n}}$$"}</MathText>
        <div className="rounded-[0.75em] bg-papel-suave px-[0.9em] py-[0.7em]">
          <LineaEjemplo glosa="Bs 10.000 al 10% en 5 cuotas anuales" eq={`$R = \\dfrac{10.000}{${tex(FACTOR_VP, 6)}} \\approx ${tex(CUOTA_PRESTAMO, 2)}$`} />
        </div>
        <p className="text-tinta-media">Es exactamente la cuota del sistema francés.</p>
      </div>
    ),
  },
  {
    etiqueta: "Al final o al inicio de cada período",
    contenido: (
      <div className="flex flex-col gap-[0.8em]">
        <p>
          Si cada cuota se paga al <strong>inicio</strong> del año (anualidad anticipada), cada una
          gana un año más de interés. Todo se multiplica por <MathText>{"$(1+i)$"}</MathText>.
        </p>
        <table className="w-full border-collapse text-[0.85em]">
          <thead>
            <tr className="border-b border-borde-fuerte text-tinta-tenue">
              <th className="py-[0.35em] text-left font-semibold" />
              <th className="py-[0.35em] text-right font-semibold">Vencida</th>
              <th className="py-[0.35em] text-right font-semibold">Anticipada</th>
            </tr>
          </thead>
          <tbody className="tabular-nums">
            <tr className="border-b border-borde">
              <td className="py-[0.35em]">Vale al final</td>
              <td className="py-[0.35em] text-right">{bs(VF, 2)}</td>
              <td className="py-[0.35em] text-right font-semibold text-ok">{bs(VF_ANTICIPADA, 2)}</td>
            </tr>
            <tr className="border-b border-borde">
              <td className="py-[0.35em]">Vale hoy</td>
              <td className="py-[0.35em] text-right">{bs(VP, 2)}</td>
              <td className="py-[0.35em] text-right font-semibold text-ok">{bs(VP_ANTICIPADA, 2)}</td>
            </tr>
          </tbody>
        </table>
        <div className="rounded-[0.75em] bg-papel-suave px-[0.9em] py-[0.7em]">
          <LineaEjemplo glosa="Comprobación" eq={`$${tex(VF)} \\cdot 1{,}1 = ${tex(VF_ANTICIPADA, 2)}$`} />
        </div>
      </div>
    ),
  },
  {
    etiqueta: "Ojo · error común",
    tono: "error",
    contenido: (
      <div className="flex flex-col gap-[0.9em]">
        <p>Sumar las cuotas como si todas se pagaran el mismo día. Ese número no es ni lo que valen hoy ni lo que valen al final.</p>
        <ComparacionOjo
          correcto={{ arriba: `Hoy $${tex(VP, 2)}$`, abajo: `al final $${tex(VF)}$` }}
          incorrecto={{ arriba: "$5 \\times 1.000$", abajo: "$= 5.000$" }}
        />
        <p className="text-tinta-media">Antes de usar una fórmula, pregúntate: ¿me piden cuánto vale hoy o cuánto vale al final?</p>
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
        pregunta="Quieres juntar Bs 10.000 en 4 años, depositando lo mismo al final de cada año al 8% anual. ¿Cuánto depositas cada año?"
        opciones={["Bs 2.500", `Bs ${bs(PRACTICA_R, 2)}`, `Bs ${bs(PRACTICA_VP, 2)}`, `Bs ${bs(PRACTICA_R / 1.08, 2)}`]}
        correcta={1}
        explicacion={`Bs 10.000 es lo que quieres tener al final, así que es un valor futuro: $R = 10.000 \\cdot \\dfrac{0{,}08}{1{,}08^{4} - 1} \\approx ${tex(PRACTICA_R, 2)}$. Bs 2.500 ignora el interés; Bs ${bs(PRACTICA_VP, 2)} sería la cuota de un préstamo de Bs 10.000 (valor presente), y Bs ${bs(PRACTICA_R / 1.08, 2)} depositando al inicio de cada año.`}
      />
    ),
  },
];

export function LaminaAnualidades() {
  return (
    <LaminaShell
      contexto="Matemática Financiera · Anualidades"
      titulo="Cuotas iguales: cuánto valen hoy y al final"
      volver={{ href: "/", titulo: "Inicio" }}
      diapositivas={diapositivas}
      necesitasAntes={{ href: "/interes-compuesto", titulo: "Interés compuesto e inflación" }}
      teAbrePuertaA={{ href: "/amortizacion", titulo: "Tres formas de devolver un préstamo" }}
    />
  );
}
