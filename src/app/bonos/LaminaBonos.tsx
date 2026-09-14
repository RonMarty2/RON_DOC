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
import { valorPresenteAnualidad } from "@/lib/finanzas/anualidades";
import {
  duracionMacaulay,
  duracionModificada,
  flujosBono,
  precioBono,
} from "@/lib/finanzas/bonos";

// Todos los montos salen de src/lib/finanzas/: acá no se escribe ningún resultado a mano.
const NOMINAL = 1000;
const CUPON = 0.08;
const MERCADO = 0.1;
const ANIOS = 5;

const CUPON_BS = NOMINAL * CUPON;
const VP_CUPONES = valorPresenteAnualidad(CUPON_BS, MERCADO, ANIOS);
const VP_NOMINAL = NOMINAL / Math.pow(1 + MERCADO, ANIOS);
const PRECIO = precioBono(NOMINAL, CUPON, MERCADO, ANIOS);
const DURACION = duracionMacaulay(NOMINAL, CUPON, MERCADO, ANIOS);
const DURACION_MOD = duracionModificada(NOMINAL, CUPON, MERCADO, ANIOS);
const PRECIO_11 = precioBono(NOMINAL, CUPON, MERCADO + 0.01, ANIOS);
const PESOS = flujosBono(NOMINAL, CUPON, ANIOS).map((f, k) => f / Math.pow(1 + MERCADO, k + 1) / PRECIO);
const TASAS_COMPARADAS = [0.06, 0.08, 0.1, 0.12];
const ESCALA_PRECIOS = Math.max(...TASAS_COMPARADAS.map((i) => precioBono(NOMINAL, CUPON, i, ANIOS))) * 1.06;

function bs(x: number, decimales = Math.abs(x - Math.round(x)) < 0.005 ? 0 : 2): string {
  const [entero, dec] = Math.abs(x).toFixed(decimales).split(".");
  return (x < 0 ? "−" : "") + entero.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + (dec ? `,${dec}` : "");
}
const pct = (x: number, decimales = 2) => `${bs(x * 100, decimales)}%`;
// Dentro de $...$ la coma decimal va entre llaves y el % con barra; si no, KaTeX los interpreta mal.
const tex = (s: string) => s.replace(",", "{,}").replace("%", "\\%").replace("−", "-");

function estadoPar(precio: number): { texto: string; clase: string } {
  if (Math.abs(precio - NOMINAL) < 0.005) return { texto: "a la par", clase: "text-tinta-media" };
  return precio > NOMINAL ? { texto: "sobre la par", clase: "text-ok" } : { texto: "bajo la par", clase: "text-aviso" };
}

function Laboratorio() {
  const [cuponPct, setCuponPct] = useState(8);
  const [mercadoPct, setMercadoPct] = useState(10);
  const [anios, setAnios] = useState(5);

  const precio = precioBono(NOMINAL, cuponPct / 100, mercadoPct / 100, anios);
  const d = duracionMacaulay(NOMINAL, cuponPct / 100, mercadoPct / 100, anios);
  const caida = (precioBono(NOMINAL, cuponPct / 100, mercadoPct / 100 + 0.01, anios) - precio) / precio;
  const estado = estadoPar(precio);
  const maximo = Math.max(precio, NOMINAL) * 1.05;

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
      <p className="text-[0.93em]">Un bono de Bs 1.000 nominales. Mueve el cupón, la tasa del mercado y el plazo.</p>
      <div className="grid gap-x-[1em] gap-y-[0.4em] sm:grid-cols-3">
        {deslizador("Cupón", pct(cuponPct / 100, Number.isInteger(cuponPct) ? 0 : 1), 0, 15, 0.5, cuponPct, setCuponPct)}
        {deslizador("Mercado", pct(mercadoPct / 100, Number.isInteger(mercadoPct) ? 0 : 1), 1, 20, 0.5, mercadoPct, setMercadoPct)}
        {deslizador("Años", String(anios), 1, 30, 1, anios, setAnios)}
      </div>
      <div>
        <div className="flex items-baseline justify-between gap-2 text-[0.85em]">
          <span className="text-tinta-media">Precio</span>
          <span className="tabular-nums">
            <strong>Bs {bs(precio, 2)}</strong> <span className={`font-semibold ${estado.clase}`}>· {estado.texto}</span>
          </span>
        </div>
        <div className="relative mt-[0.2em] h-[0.9em] overflow-hidden rounded-full bg-papel-suave">
          <div className="h-full rounded-full bg-acento transition-[width] duration-150" style={{ width: `${(precio / maximo) * 100}%` }} />
          <div className="absolute inset-y-0 w-[2px] bg-tinta" style={{ left: `${(NOMINAL / maximo) * 100}%` }} title="Nominal" />
        </div>
        <p className="mt-[0.15em] text-[0.72em] text-tinta-tenue">La raya negra marca el nominal (Bs 1.000).</p>
      </div>
      <div className="grid grid-cols-2 gap-[0.5em] text-center">
        <div className="rounded-[0.75em] bg-papel-suave px-[0.5em] py-[0.5em]">
          <p className="font-serif text-[1.4em] font-semibold tabular-nums">{bs(d, 2)}</p>
          <p className="text-[0.72em] text-tinta-tenue">años de duración</p>
        </div>
        <div className="rounded-[0.75em] bg-papel-suave px-[0.5em] py-[0.5em]">
          <p className="font-serif text-[1.4em] font-semibold tabular-nums text-aviso">{pct(caida)}</p>
          <p className="text-[0.72em] text-tinta-tenue">si la tasa sube 1 punto</p>
        </div>
      </div>
    </div>
  );
}

const PRACTICA = precioBono(1000, 0.06, 0.08, 3);
const PRACTICA_SOLO_NOMINAL = 1000 / Math.pow(1.08, 3);

const diapositivas: LaminaDiapositiva[] = [
  {
    etiqueta: "Piensa esto",
    tono: "aviso",
    contenido: (
      <div className="flex flex-col gap-[1em]">
        <p className="font-serif text-[1.25em] italic leading-snug">
          Un bono promete Bs 80 al año durante 5 años y devolverte Bs 1.000 al final. Si hoy el
          mercado paga 10%, ¿pagarías Bs 1.000 por él?
        </p>
        <div className="flex flex-col gap-[0.5em]">
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-[0.75em] bg-papel-suave px-[0.9em] py-[0.6em]">
            <span className="text-[0.85em] text-tinta-tenue">Lo que promete en total</span>
            <MathText>{"$5 \\times 80 + 1.000 = 1.400$"}</MathText>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-[0.75em] border-[1.5px] border-acento/40 bg-acento/10 px-[0.9em] py-[0.6em]">
            <span className="text-[0.85em] text-tinta-tenue">Lo que vale hoy</span>
            <span className="font-serif text-[1.1em] text-acento">Bs ?</span>
          </div>
        </div>
        <p className="text-tinta-media">Un bono es una promesa de pagos futuros. Su precio es cuánto vale hoy esa promesa.</p>
      </div>
    ),
  },
  {
    etiqueta: "Arrancamos de algo que ya sabes",
    tono: "tenue",
    contenido: (
      <div className="flex flex-col gap-[0.9em]">
        <p>Un bono son dos cosas que ya sabes traer a hoy.</p>
        <div>
          <FilaRol rol="Los cupones: lo mismo cada año" conocido="$R = 80$" nuevo="anualidad" />
          <FilaRol rol="El nominal: un solo pago al final" conocido="$N = 1.000$" nuevo="un monto" ultimo />
        </div>
        <p className="text-tinta-media">
          El cupón es un porcentaje del nominal: <MathText>{`$R = N \\cdot c = 1.000 \\times 0{,}08 = ${CUPON_BS}$`}</MathText>.
        </p>
        <p className="text-tinta-media">
          Y la tasa para traer todo a hoy no es la del cupón: es la que <strong>paga el mercado</strong>, 10%.
        </p>
      </div>
    ),
  },
  {
    etiqueta: "Paso 1 · Los cupones, a hoy",
    contenido: (
      <div className="flex flex-col gap-[0.9em]">
        <p>Cinco cupones de Bs 80 son una anualidad: su valor presente sale con la fórmula que ya conoces.</p>
        <div className="rounded-[0.75em] bg-papel-suave px-[0.9em] py-[0.7em]">
          <LineaEjemplo glosa="Valor presente de los cupones" eq={`$80 \\cdot \\dfrac{1 - 1{,}1^{-5}}{0{,}10} \\approx ${tex(bs(VP_CUPONES, 2))}$`} />
        </div>
        <Resultado>Los cupones valen hoy Bs {bs(VP_CUPONES, 2)}</Resultado>
        <p className="text-tinta-media">Prometen Bs 400 en total, pero repartidos en 5 años valen menos hoy.</p>
      </div>
    ),
  },
  {
    etiqueta: "Paso 2 · El nominal, a hoy",
    contenido: (
      <div className="flex flex-col gap-[0.9em]">
        <p>Los Bs 1.000 llegan recién en el año 5: se traen a hoy dividiendo entre <MathText>{"$1{,}1$"}</MathText> cinco veces.</p>
        <div className="rounded-[0.75em] bg-papel-suave px-[0.9em] py-[0.7em]">
          <LineaEjemplo glosa="Valor presente del nominal" eq={`$\\dfrac{1.000}{1{,}1^{5}} \\approx ${tex(bs(VP_NOMINAL, 2))}$`} />
        </div>
        <Resultado>El nominal vale hoy Bs {bs(VP_NOMINAL, 2)}</Resultado>
      </div>
    ),
  },
  {
    etiqueta: "Paso 3 · El precio es la suma",
    contenido: (
      <div className="flex flex-col gap-[0.45em]">
        <MathText block>{"$$P = R \\cdot \\frac{1 - (1+i)^{-n}}{i} + \\frac{N}{(1+i)^{n}}$$"}</MathText>
        <div>
          <FilaRol rol="Cupón de cada año" conocido="$R$" nuevo={`$${CUPON_BS}$`} />
          <FilaRol rol="Nominal" conocido="$N$" nuevo="$1.000$" />
          <FilaRol rol="Tasa del mercado" conocido="$i$" nuevo="$0{,}10$" />
          <FilaRol rol="Años" conocido="$n$" nuevo={`$${ANIOS}$`} ultimo />
        </div>
        <div className="rounded-[0.75em] bg-papel-suave px-[0.9em] py-[0.7em]">
          <LineaEjemplo glosa="" eq={`$P \\approx ${tex(bs(VP_CUPONES, 2))} + ${tex(bs(VP_NOMINAL, 2))} = ${tex(bs(PRECIO, 2))}$`} />
        </div>
        <Resultado>Bs {bs(PRECIO, 2)}: se vende bajo la par</Resultado>
      </div>
    ),
  },
  {
    etiqueta: "Si sube la tasa, baja el precio",
    contenido: (
      <div className="flex flex-col gap-[0.8em]">
        <p>El mismo bono, con distintas tasas de mercado. Si el mercado paga más que el cupón, nadie paga el nominal completo.</p>
        <div className="flex flex-col gap-[0.5em]">
          {TASAS_COMPARADAS.map((i) => {
            const p = precioBono(NOMINAL, CUPON, i, ANIOS);
            const e = estadoPar(p);
            return (
              <div key={i}>
                <div className="flex items-baseline justify-between gap-2 text-[0.83em]">
                  <span className="text-tinta-media">Mercado {pct(i, 0)}</span>
                  <span className="tabular-nums">
                    <strong>Bs {bs(p, 2)}</strong> <span className={`font-semibold ${e.clase}`}>· {e.texto}</span>
                  </span>
                </div>
                <div className="relative mt-[0.15em] h-[0.65em] overflow-hidden rounded-full bg-papel-suave">
                  <div className="h-full rounded-full bg-acento" style={{ width: `${(p / ESCALA_PRECIOS) * 100}%` }} />
                  <div className="absolute inset-y-0 w-[2px] bg-tinta" style={{ left: `${(NOMINAL / ESCALA_PRECIOS) * 100}%` }} />
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-[0.8em] text-tinta-tenue">La raya negra marca el nominal. Con el mercado al 8%, igual al cupón, el precio es exactamente Bs 1.000.</p>
      </div>
    ),
  },
  {
    etiqueta: "Al revés: el rendimiento al vencimiento",
    contenido: (
      <div className="flex flex-col gap-[0.8em]">
        <p>
          Si compras el bono a Bs {bs(PRECIO, 2)} y lo guardas hasta el final, ¿qué tasa ganas? No hay
          fórmula para despejar <MathText>{"$i$"}</MathText>: se prueba hasta que el precio coincide.
        </p>
        <div className="flex flex-col gap-[0.4em]">
          {[0.08, 0.09, 0.1].map((i) => {
            const p = precioBono(NOMINAL, CUPON, i, ANIOS);
            const coincide = Math.abs(p - PRECIO) < 0.005;
            return (
              <div key={i} className={`flex items-center justify-between rounded-[0.6em] px-[0.8em] py-[0.45em] ${coincide ? "border-[1.5px] border-ok bg-ok/10" : "bg-papel-suave"}`}>
                <span className="text-[0.87em]">Probando {pct(i, 0)}</span>
                <span className="tabular-nums text-[0.87em]">
                  Bs {bs(p, 2)} {coincide ? <strong className="text-ok">✓</strong> : <span className="text-tinta-tenue">precio más alto</span>}
                </span>
              </div>
            );
          })}
        </div>
        <Resultado>Rinde {pct(MERCADO, 0)}, aunque el cupón diga {pct(CUPON, 0)}</Resultado>
      </div>
    ),
  },
  {
    etiqueta: "La duración: cuánto esperas tu dinero",
    contenido: (
      <div className="flex flex-col gap-[0.7em]">
        <p>Cada pago pesa según cuánto vale hoy dentro del precio. El nominal del año 5 pesa casi todo.</p>
        <div className="flex flex-col gap-[0.35em]">
          {PESOS.map((peso, k) => (
            <div key={k} className="grid grid-cols-[3.2em_1fr_3.2em] items-center gap-[0.5em] text-[0.8em]">
              <span className="text-tinta-tenue">Año {k + 1}</span>
              <div className="h-[0.6em] overflow-hidden rounded-full bg-papel-suave">
                <div className="h-full rounded-full bg-acento" style={{ width: `${peso * 100}%` }} />
              </div>
              <span className="text-right tabular-nums">{pct(peso, 1)}</span>
            </div>
          ))}
        </div>
        <MathText block>{"$$D = \\sum_{t=1}^{n} t \\cdot \\frac{\\text{VP}_t}{P}$$"}</MathText>
        <Resultado>{bs(DURACION, 2)} años, menos que los 5 del plazo</Resultado>
      </div>
    ),
  },
  {
    etiqueta: "Para qué sirve la duración",
    contenido: (
      <div className="flex flex-col gap-[0.8em]">
        <p>Dice cuánto cae el precio si la tasa del mercado sube un poco. Cuanto más dura el bono, más sufre.</p>
        <MathText block>{"$$\\frac{\\Delta P}{P} \\approx -\\frac{D}{1+i}\\,\\Delta i$$"}</MathText>
        <div className="rounded-[0.75em] bg-papel-suave px-[0.9em] py-[0.7em]">
          <LineaEjemplo glosa="Si la tasa sube de 10% a 11%" eq={`$-\\dfrac{${tex(bs(DURACION, 2))}}{1{,}10} \\times 0{,}01 \\approx ${tex(pct(-DURACION_MOD * 0.01))}$`} />
          <LineaEjemplo glosa="Recalculando el precio al 11%" eq={`$\\dfrac{${tex(bs(PRECIO_11, 2))} - ${tex(bs(PRECIO, 2))}}{${tex(bs(PRECIO, 2))}} \\approx ${tex(pct((PRECIO_11 - PRECIO) / PRECIO))}$`} />
        </div>
        <p className="text-tinta-media">La aproximación anda bien para cambios chicos de tasa.</p>
      </div>
    ),
  },
  {
    etiqueta: "Ojo · error común",
    tono: "error",
    contenido: (
      <div className="flex flex-col gap-[0.9em]">
        <p>Creer que el bono rinde lo que dice el cupón. Eso sólo pasa si lo compras exactamente a Bs 1.000.</p>
        <ComparacionOjo
          correcto={{ arriba: `Pagando $${tex(bs(PRECIO, 2))}$`, abajo: `rinde $${tex(pct(MERCADO, 0))}$` }}
          incorrecto={{ arriba: `Cupón de $${tex(pct(CUPON, 0))}$`, abajo: `rinde $${tex(pct(CUPON, 0))}$` }}
        />
        <p className="text-tinta-media">El cupón fija cuánto te pagan. El precio que pagas decide cuánto ganas.</p>
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
        pregunta="Un bono de Bs 1.000 nominales paga un cupón de 6% anual y vence en 3 años. Si el mercado paga 8%, ¿cuánto vale hoy?"
        opciones={["Bs 1.000", `Bs ${bs(PRACTICA, 2)}`, `Bs ${bs(PRACTICA_SOLO_NOMINAL, 2)}`, "Bs 1.180"]}
        correcta={1}
        explicacion={`Cupones: $60 \\cdot \\dfrac{1 - 1{,}08^{-3}}{0{,}08} \\approx ${tex(bs(valorPresenteAnualidad(60, 0.08, 3), 2))}$. Nominal: $\\dfrac{1.000}{1{,}08^{3}} \\approx ${tex(bs(PRACTICA_SOLO_NOMINAL, 2))}$. Precio: $${tex(bs(PRACTICA, 2))}$, bajo la par porque el mercado paga más que el cupón. Bs ${bs(PRACTICA_SOLO_NOMINAL, 2)} olvida los cupones y Bs 1.180 los suma sin traerlos a hoy.`}
      />
    ),
  },
];

export function LaminaBonos() {
  return (
    <LaminaShell
      contexto="Matemática Financiera · Bonos"
      titulo="Bonos: precio, rendimiento y duración"
      volver={{ href: "/", titulo: "Inicio" }}
      diapositivas={diapositivas}
      necesitasAntes={{ href: "/anualidades", titulo: "Cuotas iguales: cuánto valen hoy y al final" }}
    />
  );
}
