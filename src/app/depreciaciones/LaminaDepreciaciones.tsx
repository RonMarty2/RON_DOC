"use client";

import { useState } from "react";
import { MathText } from "@/components/MathText";
import { LaminaShell, type LaminaDiapositiva } from "@/components/lamina/LaminaShell";
import {
  ComparacionOjo,
  FilaRol,
  LineaEjemplo,
  Resultado,
  PracticaVariable,
} from "@/components/lamina/dispositivos";
import {
  depositoFondo,
  tablaDepreciacion,
  tasaPorcentajeFijo,
  type FilaDepreciacion,
  type MetodoDepreciacion,
} from "@/lib/finanzas/depreciacion";
import { ejercicioDepreciaciones } from "@/lib/finanzas/ejercicios";

// Todos los montos salen de src/lib/finanzas/depreciacion.ts (el lineal, del motor de SIMPRO): acá no se escribe ningún resultado a mano.
const COSTO = 50000;
const SALVAMENTO = 5000;
const VIDA = 5;
const TASA_FONDO = 0.08;

const tabla = (metodo: MetodoDepreciacion) => tablaDepreciacion(COSTO, SALVAMENTO, VIDA, metodo, TASA_FONDO);
const LINEAL = tabla("lineal");
const DIGITOS = tabla("sumaDigitos");
const FIJO = tabla("porcentajeFijo");
const FONDO = tabla("fondo");
const D = tasaPorcentajeFijo(COSTO, SALVAMENTO, VIDA);
const DEPOSITO = depositoFondo(COSTO, SALVAMENTO, VIDA, TASA_FONDO);

function bs(x: number, decimales = Math.abs(x - Math.round(x)) < 0.005 ? 0 : 2): string {
  const [entero, dec] = x.toFixed(decimales).split(".");
  return entero.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + (dec ? `,${dec}` : "");
}
const pct = (x: number, decimales = 2) => `${bs(x * 100, decimales)}%`;
// Dentro de $...$ la coma decimal va entre llaves y el % con barra; si no, KaTeX los interpreta mal.
const tex = (s: string) => s.replace(",", "{,}").replace("%", "\\%");

const NOMBRES: Record<MetodoDepreciacion, string> = {
  lineal: "Lineal",
  sumaDigitos: "Suma de dígitos",
  porcentajeFijo: "Porcentaje fijo",
  fondo: "Fondo de amortización",
};

function Barras({
  filas,
  campo,
  maximo,
  clase,
  alto = "h-[7.5em]",
}: {
  filas: FilaDepreciacion[];
  campo: "depreciacion" | "valorLibros";
  maximo: number;
  clase: string;
  alto?: string;
}) {
  const conEtiquetas = filas.length <= 6;
  return (
    <div
      role="img"
      aria-label={filas.map((f) => `Año ${f.anio}: ${bs(f[campo], 2)}`).join("; ")}
      className={`flex ${alto} items-stretch gap-[0.3em]`}
    >
      {filas.map((f) => (
        <div key={f.anio} className="flex min-w-0 flex-1 flex-col items-center">
          <div className="flex min-h-0 w-full flex-1 flex-col justify-end">
            {conEtiquetas && (
              <span className="mb-[0.2em] block truncate text-center text-[0.6em] font-semibold tabular-nums text-tinta-media">{bs(f[campo])}</span>
            )}
            <div className={`w-full rounded-t-[0.25em] transition-[height] duration-150 ${clase}`} style={{ height: `${(f[campo] / maximo) * (conEtiquetas ? 78 : 95)}%` }} />
          </div>
          <span className="mt-[0.2em] text-[0.6em] text-tinta-tenue">{conEtiquetas ? `Año ${f.anio}` : f.anio}</span>
        </div>
      ))}
    </div>
  );
}

function Laboratorio() {
  const [costo, setCosto] = useState(50000);
  const [salvamentoPct, setSalvamentoPct] = useState(10);
  const [vida, setVida] = useState(5);
  const [tasaPct, setTasaPct] = useState(8);
  const [metodo, setMetodo] = useState<MetodoDepreciacion>("lineal");

  const salvamento = (costo * salvamentoPct) / 100;
  const filas = tablaDepreciacion(costo, salvamento, vida, metodo, tasaPct / 100);

  const deslizador = (etiqueta: string, valor: string, min: number, max: number, step: number, actual: number, cambiar: (v: number) => void) => (
    <label className="flex flex-col gap-[0.1em]">
      <span className="text-[0.78em] text-tinta-tenue">
        {etiqueta}: <strong className="text-tinta">{valor}</strong>
      </span>
      <input type="range" min={min} max={max} step={step} value={actual} onChange={(e) => cambiar(Number(e.target.value))} className="w-full accent-acento" />
    </label>
  );

  return (
    <div className="flex flex-col gap-[0.6em]">
      <div className="grid grid-cols-2 gap-x-[1em] gap-y-[0.3em]">
        {deslizador("Costo", `Bs ${bs(costo)}`, 10000, 200000, 5000, costo, setCosto)}
        {deslizador("Salvamento", pct(salvamentoPct / 100, 0), 1, 50, 1, salvamentoPct, setSalvamentoPct)}
        {deslizador("Vida útil", `${vida} años`, 2, 15, 1, vida, setVida)}
        {metodo === "fondo" && deslizador("Tasa del fondo", pct(tasaPct / 100, 0), 1, 20, 1, tasaPct, setTasaPct)}
      </div>
      <div className="flex flex-wrap gap-[0.3em]" role="group" aria-label="Método">
        {(Object.keys(NOMBRES) as MetodoDepreciacion[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMetodo(m)}
            aria-pressed={metodo === m}
            className={`rounded-full border px-[0.7em] py-[0.2em] text-[0.76em] font-semibold transition ${
              metodo === m ? "border-acento bg-acento text-acento-texto" : "border-borde-fuerte text-tinta-media"
            }`}
          >
            {NOMBRES[m]}
          </button>
        ))}
      </div>
      <p className="text-[0.78em] text-tinta-tenue">Depreciación de cada año</p>
      <Barras filas={filas} campo="depreciacion" maximo={Math.max(...filas.map((f) => f.depreciacion))} clase="bg-aviso" />
      <p className="text-[0.8em] tabular-nums text-tinta-media">
        Año 1: Bs {bs(filas[0].depreciacion, 2)} · último año: Bs {bs(filas[filas.length - 1].depreciacion, 2)}
      </p>
      <Resultado>Siempre termina en Bs {bs(filas[filas.length - 1].valorLibros, 2)}, el salvamento</Resultado>
    </div>
  );
}

const PRACTICA = tablaDepreciacion(80000, 8000, 4, "sumaDigitos");
const PRACTICA_LINEAL = tablaDepreciacion(80000, 8000, 4, "lineal")[0].depreciacion;

const diapositivas: LaminaDiapositiva[] = [
  {
    etiqueta: "Piensa esto",
    tono: "aviso",
    contenido: (
      <div className="flex flex-col gap-[1em]">
        <p className="font-serif text-[1.25em] italic leading-snug">
          Una empresa compra una máquina de Bs 50.000. Dura 5 años y al final la vende en Bs 5.000.
          ¿Cuánto le cuesta cada año?
        </p>
        <div className="flex flex-col gap-[0.5em]">
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-[0.75em] bg-papel-suave px-[0.9em] py-[0.6em]">
            <span className="text-[0.85em] text-tinta-tenue">Lo que pierde en total</span>
            <MathText>{"$50.000 - 5.000 = 45.000$"}</MathText>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-[0.75em] border-[1.5px] border-acento/40 bg-acento/10 px-[0.9em] py-[0.6em]">
            <span className="text-[0.85em] text-tinta-tenue">Lo que pierde cada año</span>
            <span className="font-serif text-[1.1em] text-acento">Bs ?</span>
          </div>
        </div>
        <p className="text-tinta-media">Hay varias formas razonables de repartir esa pérdida, y cada una cuenta una historia distinta.</p>
      </div>
    ),
  },
  {
    etiqueta: "Arrancamos de algo que ya sabes: repartir",
    tono: "tenue",
    contenido: (
      <div className="flex flex-col gap-[0.8em]">
        <p>Depreciar es repartir en los años de uso lo que el activo pierde de valor.</p>
        <div>
          <FilaRol rol="Lo que costó" conocido="$C$" nuevo="$50.000$" />
          <FilaRol rol="Lo que vale al final (salvamento)" conocido="$S$" nuevo="$5.000$" />
          <FilaRol rol="Años de vida útil" conocido="$n$" nuevo={`$${VIDA}$`} ultimo />
        </div>
        <Resultado>
          Base a repartir: <MathText>{`$C - S = ${bs(COSTO - SALVAMENTO)}$`}</MathText>
        </Resultado>
        <p className="text-tinta-media">
          Lo que queda sin depreciar cada año se llama <strong>valor en libros</strong>: arranca en Bs 50.000 y
          termina en Bs 5.000 con cualquier método.
        </p>
      </div>
    ),
  },
  {
    etiqueta: "Método 1 · Lineal: lo mismo cada año",
    contenido: (
      <div className="flex flex-col gap-[0.8em]">
        <p>La forma más simple: dividir la base en partes iguales.</p>
        <div className="rounded-[0.75em] bg-papel-suave px-[0.9em] py-[0.7em]">
          <LineaEjemplo glosa="Depreciación de cada año" eq={`$\\dfrac{C - S}{n} = \\dfrac{45.000}{5} = ${tex(bs(LINEAL[0].depreciacion))}$`} />
        </div>
        <p className="text-[0.8em] text-tinta-tenue">Valor en libros al final de cada año</p>
        <Barras filas={LINEAL} campo="valorLibros" maximo={COSTO} clase="bg-acento" />
        <p className="text-tinta-media">El valor en libros baja en línea recta, de ahí el nombre.</p>
      </div>
    ),
  },
  {
    etiqueta: "Método 2 · Suma de dígitos: más al principio",
    contenido: (
      <div className="flex flex-col gap-[0.8em]">
        <p>Se suman los años de vida y cada año se lleva una fracción: el primero la más grande.</p>
        <div className="rounded-[0.75em] bg-papel-suave px-[0.9em] py-[0.7em]">
          <LineaEjemplo glosa="Suma de los dígitos" eq="$1 + 2 + 3 + 4 + 5 = 15$" />
          <LineaEjemplo glosa="Año 1" eq={`$\\tfrac{5}{15} \\cdot 45.000 = ${tex(bs(DIGITOS[0].depreciacion))}$`} />
          <LineaEjemplo glosa="Año 2" eq={`$\\tfrac{4}{15} \\cdot 45.000 = ${tex(bs(DIGITOS[1].depreciacion))}$`} />
        </div>
        <p className="text-[0.8em] text-tinta-tenue">Depreciación de cada año</p>
        <Barras filas={DIGITOS} campo="depreciacion" maximo={DIGITOS[0].depreciacion} clase="bg-aviso" />
      </div>
    ),
  },
  {
    etiqueta: "Método 3 · Porcentaje fijo sobre lo que queda",
    contenido: (
      <div className="flex flex-col gap-[0.7em]">
        <p>Cada año, el mismo porcentaje de lo que todavía vale.</p>
        <MathText block>{"$$d = 1 - \\left(\\frac{S}{C}\\right)^{1/n}$$"}</MathText>
        <div className="rounded-[0.75em] bg-papel-suave px-[0.9em] py-[0.7em]">
          <LineaEjemplo glosa="Elegido para terminar justo en el salvamento" eq={`$d = 1 - \\left(\\tfrac{5.000}{50.000}\\right)^{1/5} \\approx ${tex(pct(D))}$`} />
          <LineaEjemplo glosa="Año 1" eq={`$50.000 \\times ${tex(bs(D, 4))} \\approx ${tex(bs(FIJO[0].depreciacion, 2))}$`} />
          <LineaEjemplo glosa="Año 2, sobre lo que quedó" eq={`$${tex(bs(FIJO[0].valorLibros, 2))} \\times ${tex(bs(D, 4))} \\approx ${tex(bs(FIJO[1].depreciacion, 2))}$`} />
        </div>
        <Barras filas={FIJO} campo="depreciacion" maximo={FIJO[0].depreciacion} clase="bg-aviso" alto="h-[4.75em]" />
      </div>
    ),
  },
  {
    etiqueta: "Por qué depreciar más al principio",
    contenido: (
      <div className="flex flex-col gap-[0.8em]">
        <p>
          Un vehículo o una computadora pierden más valor el primer año que el quinto. Los métodos
          acelerados lo reflejan: el valor en libros cae rápido al principio.
        </p>
        <table className="w-full border-collapse text-[0.8em] tabular-nums">
          <thead>
            <tr className="border-b border-borde-fuerte text-tinta-tenue">
              <th className="py-[0.3em] text-left font-semibold">Valor en libros</th>
              <th className="py-[0.3em] text-right font-semibold">Lineal</th>
              <th className="py-[0.3em] text-right font-semibold">Dígitos</th>
              <th className="py-[0.3em] text-right font-semibold">% fijo</th>
            </tr>
          </thead>
          <tbody>
            {LINEAL.map((f, k) => (
              <tr key={f.anio} className="border-b border-borde">
                <td className="py-[0.3em] text-tinta-media">Año {f.anio}</td>
                <td className="py-[0.3em] text-right">{bs(f.valorLibros, 0)}</td>
                <td className="py-[0.3em] text-right">{bs(DIGITOS[k].valorLibros, 0)}</td>
                <td className="py-[0.3em] text-right">{bs(FIJO[k].valorLibros, 0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-tinta-media">Al final los tres llegan a Bs 5.000. Cambia el camino, no el destino.</p>
      </div>
    ),
  },
  {
    etiqueta: "Método 4 · Fondo de amortización: el financiero",
    tono: "ok",
    contenido: (
      <div className="flex flex-col gap-[0.7em]">
        <p>
          Cada año se aparta un monto fijo que gana interés, para tener los Bs 45.000 al final y reponer
          la máquina. Es una anualidad con valor futuro conocido.
        </p>
        <MathText block>{"$$R = (C - S)\\,\\frac{i}{(1+i)^{n} - 1}$$"}</MathText>
        <div className="rounded-[0.75em] bg-papel-suave px-[0.9em] py-[0.7em]">
          <LineaEjemplo glosa="" eq={`$R = 45.000 \\cdot \\dfrac{0{,}08}{1{,}08^{5} - 1} \\approx ${tex(bs(DEPOSITO, 2))}$`} />
        </div>
        <p className="text-[0.87em] text-tinta-media">
          La depreciación de cada año es el depósito más el interés que ganó el fondo. Por eso crece:
        </p>
        <Barras filas={FONDO} campo="depreciacion" maximo={FONDO[VIDA - 1].depreciacion} clase="bg-ok" />
      </div>
    ),
  },
  {
    etiqueta: "Los cuatro, lado a lado",
    contenido: (
      <div className="flex flex-col gap-[0.8em]">
        <p>Depreciación de cada año con cada método. Todos suman lo mismo.</p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[0.74em] tabular-nums">
            <thead>
              <tr className="border-b border-borde-fuerte text-tinta-tenue">
                <th className="px-[0.2em] py-[0.3em] text-left font-semibold">Año</th>
                <th className="px-[0.2em] py-[0.3em] text-right font-semibold">Lineal</th>
                <th className="px-[0.2em] py-[0.3em] text-right font-semibold">Dígitos</th>
                <th className="px-[0.2em] py-[0.3em] text-right font-semibold">% fijo</th>
                <th className="px-[0.2em] py-[0.3em] text-right font-semibold">Fondo</th>
              </tr>
            </thead>
            <tbody>
              {LINEAL.map((f, k) => (
                <tr key={f.anio} className="border-b border-borde">
                  <td className="px-[0.2em] py-[0.3em]">{f.anio}</td>
                  <td className="px-[0.2em] py-[0.3em] text-right">{bs(f.depreciacion, 0)}</td>
                  <td className="px-[0.2em] py-[0.3em] text-right">{bs(DIGITOS[k].depreciacion, 0)}</td>
                  <td className="px-[0.2em] py-[0.3em] text-right">{bs(FIJO[k].depreciacion, 0)}</td>
                  <td className="px-[0.2em] py-[0.3em] text-right">{bs(FONDO[k].depreciacion, 0)}</td>
                </tr>
              ))}
              <tr className="font-bold">
                <td className="px-[0.2em] py-[0.3em]">Total</td>
                {[LINEAL, DIGITOS, FIJO, FONDO].map((t, k) => (
                  <td key={k} className="px-[0.2em] py-[0.3em] text-right">{bs(t[VIDA - 1].acumulada, 0)}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-[0.8em] text-tinta-tenue">Montos redondeados al boliviano.</p>
        <p className="text-tinta-media">Los acelerados cargan más al principio; el fondo, al revés, carga más al final.</p>
      </div>
    ),
  },
  {
    etiqueta: "Ojo · error común",
    tono: "error",
    contenido: (
      <div className="flex flex-col gap-[0.9em]">
        <p>Depreciar el costo completo y olvidar el valor de salvamento. La máquina no termina valiendo cero.</p>
        <ComparacionOjo
          correcto={{ arriba: "$\\dfrac{50.000 - 5.000}{5}$", abajo: `$= ${tex(bs(LINEAL[0].depreciacion))}$` }}
          incorrecto={{ arriba: "$\\dfrac{50.000}{5}$", abajo: "$= 10.000$" }}
        />
        <p className="text-tinta-media">Con 10.000 por año el valor en libros llega a 0 en vez de a Bs 5.000, y el gasto queda inflado.</p>
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
      <PracticaVariable
        generar={ejercicioDepreciaciones}
        pregunta="Un vehículo cuesta Bs 80.000, dura 4 años y su salvamento es Bs 8.000. Con suma de dígitos, ¿cuánto se deprecia el año 2?"
        opciones={[`Bs ${bs(PRACTICA_LINEAL)}`, `Bs ${bs(PRACTICA[1].depreciacion)}`, `Bs ${bs(PRACTICA[0].depreciacion)}`, `Bs ${bs((3 / 10) * 80000)}`]}
        correcta={1}
        explicacion={`Los dígitos suman $1 + 2 + 3 + 4 = 10$ y la base es $80.000 - 8.000 = 72.000$. El año 2 se lleva $\\tfrac{3}{10}$: $\\tfrac{3}{10} \\cdot 72.000 = ${tex(bs(PRACTICA[1].depreciacion))}$. Bs ${bs(PRACTICA[0].depreciacion)} es el año 1, Bs ${bs(PRACTICA_LINEAL)} el lineal, y Bs ${bs((3 / 10) * 80000)} olvida el salvamento.`}
      />
    ),
  },
];

export function LaminaDepreciaciones() {
  return (
    <LaminaShell
      contexto="Matemática Financiera · Depreciaciones"
      titulo="Depreciaciones: cuatro formas de repartir una pérdida"
      volver={{ href: "/", titulo: "Inicio" }}
      diapositivas={diapositivas}
      necesitasAntes={{ href: "/anualidades", titulo: "Cuotas iguales: cuánto valen hoy y al final" }}
    />
  );
}
