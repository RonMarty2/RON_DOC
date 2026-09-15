"use client";

// Dispositivos visuales para tarjetas: cada uno hace VER una idea en vez de describirla (reglas de lámina, FUENTES.md).

import { useState } from "react";
import { MathText } from "@/components/MathText";
import type { Azar, Ejercicio } from "@/lib/finanzas/ejercicios";
import { TONO_TEXTO, type Tono } from "./LaminaShell";

export function TarjetaPractica({
  pregunta,
  opciones,
  correcta,
  explicacion,
  onResponder,
}: {
  pregunta: string;
  opciones: string[];
  correcta: number;
  explicacion: string;
  onResponder?: (acierto: boolean) => void;
}) {
  const [elegida, setElegida] = useState<number | null>(null);
  const revelada = elegida !== null;

  return (
    <div>
      <p className="mb-[0.9em] font-semibold leading-normal">
        <MathText>{pregunta}</MathText>
      </p>
      <div className="flex flex-col gap-[0.5em]">
        {opciones.map((op, j) => {
          const esCorrecta = j === correcta;
          const esElegida = elegida === j;
          const estilo = !revelada
            ? "border-borde-fuerte hover:border-acento"
            : esCorrecta
              ? "border-ok bg-ok/10"
              : esElegida
                ? "border-error bg-error/10"
                : "border-borde";
          return (
            <button
              key={j}
              type="button"
              onClick={() => {
                setElegida(j);
                onResponder?.(j === correcta);
              }}
              disabled={revelada}
              className={`rounded-[0.65em] border-[1.5px] px-[0.9em] py-[0.6em] text-left text-[0.93em] font-semibold text-tinta transition ${estilo}`}
            >
              <MathText>{op}</MathText>
              {revelada && esCorrecta && <span className="text-ok"> ✓</span>}
              {revelada && esElegida && !esCorrecta && <span className="text-error"> ✗</span>}
            </button>
          );
        })}
      </div>
      {revelada && (
        <div className="mt-[0.8em] text-[0.87em] leading-normal text-tinta-media">
          <MathText>{explicacion}</MathText>
        </div>
      )}
    </div>
  );
}

/**
 * El primer ejercicio es el de la lámina, escrito a mano; los siguientes se generan con números nuevos.
 * Al azar sólo después de un clic: si se sorteara al cargar, el HTML del servidor y el del navegador no coincidirían.
 */
export function PracticaVariable({ generar, ...inicial }: Ejercicio & { generar: (azar: Azar) => Ejercicio }) {
  const [ronda, setRonda] = useState(0);
  const [ejercicio, setEjercicio] = useState<Ejercicio>(inicial);
  const [respondida, setRespondida] = useState(false);
  const [marcador, setMarcador] = useState({ bien: 0, hechos: 0 });

  return (
    <div className="flex flex-col gap-[0.8em]">
      <TarjetaPractica
        key={ronda}
        {...ejercicio}
        onResponder={(acierto) => {
          setRespondida(true);
          setMarcador((m) => ({ bien: m.bien + (acierto ? 1 : 0), hechos: m.hechos + 1 }));
        }}
      />
      {respondida && (
        <div className="flex flex-wrap items-center justify-between gap-[0.5em]">
          <span aria-live="polite" className="text-[0.8em] tabular-nums text-tinta-tenue">
            Aciertos: {marcador.bien} de {marcador.hechos}
          </span>
          <button
            type="button"
            onClick={() => {
              setEjercicio(generar(Math.random));
              setRonda((r) => r + 1);
              setRespondida(false);
            }}
            className="rounded-full bg-acento px-[1em] py-[0.45em] text-[0.85em] font-semibold text-acento-texto transition hover:bg-acento-hover"
          >
            Otro ejercicio →
          </button>
        </div>
      )}
    </div>
  );
}

export function PasoCard({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-[0.75em]">
      <span className="flex size-[1.75em] shrink-0 items-center justify-center rounded-full bg-acento text-[0.8em] font-bold text-acento-texto">
        {n}
      </span>
      {/* min-w-0: sin esto una fórmula ancha impide que el texto de al lado haga salto de línea. */}
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

export function FlechaMini({ abajo }: { abajo?: boolean }) {
  return (
    <svg
      width="18"
      height="14"
      viewBox="0 0 24 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={`shrink-0 text-borde-fuerte ${abajo ? "mx-auto my-0.5 block rotate-90" : ""}`}
    >
      <path d="M2 8h18M14 2l6 6-6 6" />
    </svg>
  );
}

/** Traducción por rol: muestra qué papel cumple cada cosa en vez de declarar que son equivalentes. */
export function FilaRol({
  rol,
  conocido,
  nuevo,
  ultimo,
}: {
  rol: string;
  conocido: string;
  nuevo: string;
  ultimo?: boolean;
}) {
  return (
    <div className={`flex flex-wrap items-center gap-x-[0.6em] gap-y-[0.2em] border-t border-borde py-[0.55em] ${ultimo ? "border-b" : ""}`}>
      <div className="basis-full text-[0.83em] text-tinta-tenue sm:basis-auto sm:flex-1">
        <MathText>{rol}</MathText>
      </div>
      <div className="min-w-[2.75em] text-center font-serif text-[1.07em]">
        <MathText>{conocido}</MathText>
      </div>
      <FlechaMini />
      <div className="min-w-[3.5em] text-center font-serif text-[1.07em] font-bold text-acento">
        <MathText>{nuevo}</MathText>
      </div>
    </div>
  );
}

export function PartePuente({ valor, etiqueta, tono }: { valor: string; etiqueta: string; tono?: Tono }) {
  return (
    <span className={`text-center font-serif text-[1.4em] ${tono ? TONO_TEXTO[tono] : "text-tinta"}`}>
      <MathText>{valor}</MathText>
      <span className="mt-[0.2em] block font-sans text-[0.45em] uppercase tracking-[0.04em] text-tinta-tenue">
        {etiqueta}
      </span>
    </span>
  );
}

/** Una línea de una cadena de sustitución: glosa arriba, ecuación abajo con todo el ancho. */
export function LineaEjemplo({ glosa, eq }: { glosa: string; eq: string }) {
  // Sin overflow propio: MathText ya desplaza la fórmula ancha, y un segundo contenedor con overflow le ponía barra vertical a cada fracción.
  return (
    <div className="mb-[0.5em]">
      {glosa && (
        <div className="mb-[0.1em] text-[0.83em] text-tinta-tenue">
          <MathText>{glosa}</MathText>
        </div>
      )}
      <MathText>{eq}</MathText>
    </div>
  );
}

/** Comparación lado a lado: verde lo correcto, rojo la trampa común. */
export function ComparacionOjo({
  correcto,
  incorrecto,
}: {
  correcto: { arriba: string; abajo: string };
  incorrecto: { arriba: string; abajo: string };
}) {
  return (
    <div className="flex flex-wrap justify-center gap-[0.6em]">
      <div className="flex-[1_1_9em] rounded-[0.75em] border-[1.5px] border-ok/50 bg-ok/10 px-[0.9em] py-[0.75em] text-center">
        <div className="text-[1.07em]">
          <MathText>{correcto.arriba}</MathText>
        </div>
        <FlechaMini abajo />
        <div className="font-bold text-ok">
          <MathText>{correcto.abajo}</MathText>
        </div>
      </div>
      <div className="flex-[1_1_9em] rounded-[0.75em] border-[1.5px] border-error/50 bg-error/10 px-[0.9em] py-[0.75em] text-center">
        <div className="text-[1.07em]">
          <MathText>{incorrecto.arriba}</MathText>
        </div>
        <FlechaMini abajo />
        <div className="font-bold text-error">
          <MathText>{incorrecto.abajo}</MathText>
        </div>
      </div>
    </div>
  );
}

/** Chips de verificación: concretan un "vale en varios casos" en vez de sólo enunciarlo. */
export function ChipsVerificacion({ valores }: { valores: string[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-[0.5em]">
      {valores.map((v) => (
        <span
          key={v}
          className="inline-flex items-center gap-[0.3em] rounded-full border border-ok/50 bg-ok/10 px-[0.65em] py-[0.35em] text-[0.83em]"
        >
          <MathText>{v}</MathText>
          <span className="font-bold text-ok">✓</span>
        </span>
      ))}
    </div>
  );
}

/** El resultado final de un ejemplo trabajado. */
export function Resultado({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[0.75em] border-[1.5px] border-ok bg-ok/10 px-[1em] py-[0.55em] text-center text-[1.07em] font-bold text-ok">
      {children}
    </div>
  );
}
