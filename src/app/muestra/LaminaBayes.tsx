"use client";

import { useState } from "react";
import { MathText } from "@/components/MathText";
import { LaminaShell, type LaminaDiapositiva } from "@/components/lamina/LaminaShell";
import {
  ComparacionOjo,
  FilaRol,
  LineaEjemplo,
  PartePuente,
  Resultado,
  TarjetaPractica,
} from "@/components/lamina/dispositivos";

// Números del caso PTSMU del Aula (bitacoras/psicoestadistica-inferencial.md): no cambiarlos sin revisar el dossier.
const SENSIBILIDAD = 0.88;
const ESPECIFICIDAD = 0.88;

const DETECTADO = "bg-ok";
const ESCAPADO = "bg-ok/25";
const FALSA_ALARMA = "bg-error";
const SIN_ALARMA = "bg-borde-fuerte/70";
const CON_DX = "bg-acento";

function Fichas({ grupos }: { grupos: { cantidad: number; clase: string }[] }) {
  return (
    <div className="grid grid-cols-[repeat(25,minmax(0,1fr))] gap-[0.18em]" aria-hidden>
      {grupos.flatMap((g, gi) =>
        Array.from({ length: g.cantidad }, (_, k) => (
          <span key={`${gi}-${k}`} className={`aspect-square rounded-full ${g.clase}`} />
        ))
      )}
    </div>
  );
}

function Leyenda({ items }: { items: { clase: string; texto: string }[] }) {
  return (
    <div className="flex flex-wrap gap-x-[1em] gap-y-[0.3em] text-[0.8em] text-tinta-tenue">
      {items.map((it) => (
        <span key={it.texto} className="inline-flex items-center gap-[0.35em]">
          <span className={`inline-block size-[0.75em] rounded-full ${it.clase}`} />
          {it.texto}
        </span>
      ))}
    </div>
  );
}

const coma = (x: number, decimales: number) => x.toFixed(decimales).replace(".", ",");
const tex = (x: number) => String(Number(x.toFixed(3))).replace(".", "{,}");

function PrevalenciaMovible() {
  const [porcentaje, setPorcentaje] = useState(12.5);
  const p = porcentaje / 100;
  const reales = SENSIBILIDAD * p;
  const falsas = (1 - ESPECIFICIDAD) * (1 - p);
  const vpp = reales / (reales + falsas);

  return (
    <div className="flex flex-col gap-[0.8em]">
      <p>
        El cuestionario no cambia. Lo único que mueves es cuántos estudiantes del grupo tienen
        depresión.
      </p>
      <label className="flex flex-col gap-[0.3em]">
        <span className="text-[0.83em] text-tinta-tenue">
          Con depresión en el grupo: <strong className="text-tinta">{coma(porcentaje, 1)}%</strong>
        </span>
        <input
          type="range"
          min={1}
          max={50}
          step={0.5}
          value={porcentaje}
          onChange={(e) => setPorcentaje(Number(e.target.value))}
          className="w-full accent-acento"
        />
      </label>
      <div>
        <div className="flex h-[1.3em] overflow-hidden rounded-full" aria-hidden>
          <div className="bg-ok transition-[width] duration-150" style={{ width: `${vpp * 100}%` }} />
          <div className="flex-1 bg-error" />
        </div>
        <div className="mt-[0.4em]">
          <Leyenda
            items={[
              { clase: DETECTADO, texto: "positivos que sí tienen depresión" },
              { clase: FALSA_ALARMA, texto: "falsas alarmas" },
            ]}
          />
        </div>
      </div>
      <LineaEjemplo
        glosa="De todos los positivos, la parte que es real"
        eq={`$P(D \\mid +) = \\dfrac{0{,}88 \\times ${tex(p)}}{0{,}88 \\times ${tex(p)} + 0{,}12 \\times ${tex(1 - p)}}$`}
      />
      <Resultado>
        <MathText>{`$P(D \\mid +) \\approx ${coma(vpp * 100, 1).replace(",", "{,}")}\\%$`}</MathText>
      </Resultado>
    </div>
  );
}

const diapositivas: LaminaDiapositiva[] = [
  {
    etiqueta: "Piensa esto",
    tono: "aviso",
    contenido: (
      <div className="flex flex-col gap-[1em]">
        <p className="font-serif text-[1.25em] italic leading-snug">
          Un cuestionario detecta a 88 de cada 100 estudiantes que de verdad tienen depresión. A uno
          le da positivo. ¿Qué tan probable es que la tenga?
        </p>
        <div className="flex flex-col gap-[0.5em]">
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-[0.75em] bg-papel-suave px-[0.9em] py-[0.6em]">
            <span className="text-[0.83em] text-tinta-tenue">Lo que sabemos</span>
            <MathText>{"$P(+ \\mid D) = 0{,}88$"}</MathText>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-[0.75em] border-[1.5px] border-acento/40 bg-acento/10 px-[0.9em] py-[0.6em]">
            <span className="text-[0.83em] text-tinta-tenue">Lo que queremos saber</span>
            <MathText>{"$P(D \\mid +) = \\ ?$"}</MathText>
          </div>
        </div>
        <p className="text-tinta-media">
          Son las mismas dos letras, en orden inverso. Parece la misma pregunta y no lo es.
        </p>
      </div>
    ),
  },
  {
    etiqueta: "Arrancamos de algo que ya sabes: contar",
    tono: "tenue",
    contenido: (
      <div className="flex flex-col gap-[0.9em]">
        <p>
          Para responder no hace falta ninguna fórmula todavía. Alcanza con las 200 fichas del
          caso: cada punto es un estudiante.
        </p>
        <Fichas grupos={[{ cantidad: 25, clase: CON_DX }, { cantidad: 175, clase: SIN_ALARMA }]} />
        <div className="flex justify-around gap-2 pt-[0.3em]">
          <PartePuente valor="200" etiqueta="fichas" />
          <PartePuente valor="25" etiqueta="con depresión" tono="acento" />
          <PartePuente valor="175" etiqueta="sin depresión" />
        </div>
        <p className="text-tinta-media">
          Ya se ve lo que va a importar: el grupo sin depresión es siete veces más grande.
        </p>
      </div>
    ),
  },
  {
    etiqueta: "Paso 1 · Los 25 que sí tienen depresión",
    contenido: (
      <div className="flex flex-col gap-[0.9em]">
        <p>
          El cuestionario detecta al 88% de ellos. Ese porcentaje es su <strong>sensibilidad</strong>.
        </p>
        <Fichas grupos={[{ cantidad: 22, clase: DETECTADO }, { cantidad: 3, clase: ESCAPADO }]} />
        <Leyenda
          items={[
            { clase: DETECTADO, texto: "detectados" },
            { clase: ESCAPADO, texto: "se le escapan" },
          ]}
        />
        <div className="rounded-[0.75em] bg-papel-suave px-[0.9em] py-[0.7em]">
          <LineaEjemplo glosa="Detectados" eq="$25 \times 0{,}88 = 22$" />
          <LineaEjemplo glosa="Se le escapan" eq="$25 - 22 = 3$" />
        </div>
      </div>
    ),
  },
  {
    etiqueta: "Paso 2 · Los 175 que no tienen depresión",
    contenido: (
      <div className="flex flex-col gap-[0.9em]">
        <p>
          A casi todos los descarta bien: su <strong>especificidad</strong> también es 88%. Pero el
          12% restante da positivo sin tener depresión. Son las falsas alarmas.
        </p>
        <Fichas grupos={[{ cantidad: 21, clase: FALSA_ALARMA }, { cantidad: 154, clase: SIN_ALARMA }]} />
        <Leyenda
          items={[
            { clase: FALSA_ALARMA, texto: "falsas alarmas" },
            { clase: SIN_ALARMA, texto: "descartados bien" },
          ]}
        />
        <div className="rounded-[0.75em] bg-papel-suave px-[0.9em] py-[0.7em]">
          <LineaEjemplo glosa="Falsas alarmas" eq="$175 \times 0{,}12 = 21$" />
          <LineaEjemplo glosa="Descartados bien" eq="$175 - 21 = 154$" />
        </div>
      </div>
    ),
  },
  {
    etiqueta: "Paso 3 · Mira solo a los que dieron positivo",
    contenido: (
      <div className="flex flex-col gap-[0.9em]">
        <p>
          Quien recibe un positivo no sabe de qué grupo viene. Solo sabe que está entre estos 43.
        </p>
        <Fichas grupos={[{ cantidad: 22, clase: DETECTADO }, { cantidad: 21, clase: FALSA_ALARMA }]} />
        <Leyenda
          items={[
            { clase: DETECTADO, texto: "sí tienen depresión (22)" },
            { clase: FALSA_ALARMA, texto: "falsas alarmas (21)" },
          ]}
        />
        <div className="rounded-[0.75em] bg-papel-suave px-[0.9em] py-[0.7em]">
          <LineaEjemplo glosa="Todos los positivos" eq="$22 + 21 = 43$" />
          <LineaEjemplo glosa="La parte que es real" eq="$P(D \mid +) = \dfrac{22}{43} \approx 0{,}512$" />
        </div>
        <Resultado>51,2%</Resultado>
        <p className="text-tinta-media">
          Un cuestionario que detecta al 88% acierta en poco más de la mitad de sus alarmas.
        </p>
      </div>
    ),
  },
  {
    etiqueta: "La fórmula dice lo mismo",
    contenido: (
      <div className="flex flex-col gap-[0.7em]">
        <p>
          El Teorema de Bayes es la misma cuenta que acabas de hacer, con las fichas divididas entre
          200.
        </p>
        <MathText block>{"$$P(D \\mid +) = \\frac{P(+ \\mid D)\\,P(D)}{P(+)}$$"}</MathText>
        <p className="text-[0.9em] text-tinta-media">
          El denominador junta los dos caminos por los que alguien da positivo:
        </p>
        <MathText block>
          {"$$P(+) = P(+ \\mid D)\\,P(D) + P(+ \\mid \\bar{D})\\,P(\\bar{D})$$"}
        </MathText>
      </div>
    ),
  },
  {
    etiqueta: "Cada parte es una cuenta que ya hiciste",
    contenido: (
      <div className="flex flex-col gap-[0.7em]">
        <p>A la izquierda, las fichas que contaste. A la derecha, lo mismo como probabilidad.</p>
        <div>
          <FilaRol rol="Arriba: los que tienen depresión y dan positivo" conocido="$22$" nuevo="$0{,}88 \times 0{,}125$" />
          <FilaRol rol="Abajo, lo que se suma: las falsas alarmas" conocido="$21$" nuevo="$0{,}12 \times 0{,}875$" />
          <FilaRol rol="Abajo, completo: todos los positivos" conocido="$43$" nuevo="$0{,}215$" ultimo />
        </div>
        <LineaEjemplo glosa="Y el resultado no cambia" eq="$\dfrac{0{,}11}{0{,}215} = \dfrac{22}{43} \approx 0{,}512$" />
      </div>
    ),
  },
  {
    etiqueta: "Ojo · error común",
    tono: "error",
    contenido: (
      <div className="flex flex-col gap-[0.9em]">
        <p>
          Responder 88% es el error más común, y tiene nombre: <strong>falacia de la tasa base</strong>.
          El 88% parte de saber que la persona tiene depresión. Quien recibe un positivo todavía no
          sabe eso.
        </p>
        <ComparacionOjo
          correcto={{ arriba: "$P(D \\mid +) = 0{,}512$", abajo: "de los positivos, cuántos tienen depresión" }}
          incorrecto={{ arriba: "$P(+ \\mid D) = 0{,}88$", abajo: "de los que tienen depresión, cuántos dan positivo" }}
        />
      </div>
    ),
  },
  {
    etiqueta: "Si cambia cuántos casos hay",
    tono: "ok",
    contenido: <PrevalenciaMovible />,
  },
  {
    etiqueta: "Practícalo tú",
    contenido: (
      <TarjetaPractica
        pregunta="Otra universidad tamiza a 1000 estudiantes. El 5% tiene el diagnóstico confirmado, y el cuestionario tiene sensibilidad y especificidad de 90%. A una estudiante le da positivo. ¿Qué probabilidad hay de que tenga el diagnóstico?"
        opciones={["$90\\%$", "$45\\%$", "$32\\%$", "$5\\%$"]}
        correcta={2}
        explicacion="Con diagnóstico: $1000 \times 0{,}05 = 50$, y detecta $50 \times 0{,}9 = 45$. Sin diagnóstico: $950$, con $950 \times 0{,}1 = 95$ falsas alarmas. Positivos: $45 + 95 = 140$, así que $P(D \mid +) = \dfrac{45}{140} \approx 0{,}32$."
      />
    ),
  },
];

export function LaminaBayes() {
  return (
    <LaminaShell
      contexto="Psicoestadística Inferencial · Unidad 2 · Muestra del formato"
      titulo="Por qué la mitad de las alarmas son falsas"
      volver={{ href: "/materias/psicoestadistica-inferencial", titulo: "Psicoestadística Inferencial" }}
      diapositivas={diapositivas}
      necesitasAntes={{ href: "/aula-probabilidad", titulo: "Aula de Probabilidad" }}
    />
  );
}
