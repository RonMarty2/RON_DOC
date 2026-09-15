"use client";

import { useEffect, useMemo, useState } from "react";
import { MathText } from "@/components/MathText";
import {
  armarHoja,
  escribirAjustes,
  leerAjustes,
  LETRAS,
  POR_TEMA_MAXIMO,
  TEMAS_HOJA,
  VERSION_MAXIMA,
  type IdTema,
} from "@/lib/finanzas/hoja";

/**
 * Arma e imprime una hoja de práctica. En pantalla muestra los ajustes y la
 * hoja como vista previa; al imprimir sale sólo la hoja, con la de respuestas
 * en página aparte. Los ajustes viajan en la dirección (#v=…&t=…&n=…), así
 * que un enlace guardado vuelve a dar exactamente la misma hoja.
 */
export function HojaPractica() {
  // Arranca con los valores por defecto para que el HTML del servidor coincida; la dirección se lee después.
  const [ajustes, setAjustes] = useState(() => leerAjustes(""));
  const [conRespuestas, setConRespuestas] = useState(true);
  const hoja = useMemo(() => armarHoja(ajustes.version, ajustes.temas, ajustes.porTema), [ajustes]);

  useEffect(() => {
    // También si se pega otro enlace con la página abierta (sólo cambia lo que va después de #).
    const leer = () => setAjustes(leerAjustes(window.location.hash));
    leer();
    window.addEventListener("hashchange", leer);
    return () => window.removeEventListener("hashchange", leer);
  }, []);
  useEffect(() => {
    window.history.replaceState(null, "", escribirAjustes(ajustes));
  }, [ajustes]);

  function alternarTema(id: IdTema) {
    setAjustes((a) => {
      const temas = a.temas.includes(id) ? a.temas.filter((t) => t !== id) : [...a.temas, id];
      return temas.length === 0 ? a : { ...a, temas };
    });
  }

  function otraVersion() {
    setAjustes((a) => {
      let v = a.version;
      while (v === a.version) v = 1 + Math.floor(Math.random() * VERSION_MAXIMA);
      return { ...a, version: v };
    });
  }

  let numero = 0;
  const numerados = hoja.map((e) => ({ ...e, numero: ++numero }));

  return (
    <div className="flex flex-col gap-8">
      <section aria-label="Ajustes de la hoja" className="rounded-[1.25rem] border border-borde bg-papel-suave p-5 print:hidden sm:p-6">
        <div className="flex flex-wrap items-end gap-x-8 gap-y-5">
          <div>
            <label htmlFor="version" className="block text-xs font-bold uppercase tracking-[0.1em] text-tinta-tenue">
              Versión
            </label>
            <div className="mt-1.5 flex items-center gap-2">
              <input
                id="version"
                type="number"
                inputMode="numeric"
                min={1}
                max={VERSION_MAXIMA}
                value={ajustes.version}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  if (Number.isInteger(v) && v >= 1 && v <= VERSION_MAXIMA) setAjustes((a) => ({ ...a, version: v }));
                }}
                className="w-24 rounded-lg border border-borde-fuerte bg-tarjeta px-3 py-2 text-lg tabular-nums"
              />
              <button
                type="button"
                onClick={otraVersion}
                className="rounded-full border border-borde-fuerte bg-tarjeta px-4 py-2 text-sm font-semibold hover:border-acento hover:text-acento"
              >
                Otra versión
              </button>
            </div>
          </div>

          <fieldset>
            <legend className="text-xs font-bold uppercase tracking-[0.1em] text-tinta-tenue">Ejercicios por tema</legend>
            <div className="mt-1.5 flex gap-1.5">
              {Array.from({ length: POR_TEMA_MAXIMO }, (_, k) => k + 1).map((n) => (
                <label
                  key={n}
                  className={`flex size-10 cursor-pointer items-center justify-center rounded-lg border text-base font-semibold tabular-nums has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-acento ${
                    ajustes.porTema === n ? "border-acento bg-acento text-acento-texto" : "border-borde-fuerte bg-tarjeta"
                  }`}
                >
                  <input
                    type="radio"
                    name="por-tema"
                    value={n}
                    checked={ajustes.porTema === n}
                    onChange={() => setAjustes((a) => ({ ...a, porTema: n }))}
                    className="sr-only"
                  />
                  {n}
                </label>
              ))}
            </div>
          </fieldset>

          <label className="flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              checked={conRespuestas}
              onChange={(e) => setConRespuestas(e.target.checked)}
              className="size-4 accent-[var(--acento)]"
            />
            Hoja de respuestas al final
          </label>

          <button
            type="button"
            onClick={() => window.print()}
            className="ml-auto rounded-full bg-acento px-6 py-2.5 text-sm font-semibold text-acento-texto hover:bg-acento-hover"
          >
            Imprimir
          </button>
        </div>

        <fieldset className="mt-5">
          <legend className="text-xs font-bold uppercase tracking-[0.1em] text-tinta-tenue">Temas</legend>
          <div className="mt-1.5 flex flex-wrap gap-2">
            {TEMAS_HOJA.map((t) => {
              const activo = ajustes.temas.includes(t.id);
              return (
                <label
                  key={t.id}
                  className={`flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-acento ${
                    activo ? "border-acento bg-tarjeta font-semibold text-acento" : "border-borde-fuerte text-tinta-media"
                  }`}
                >
                  <input type="checkbox" checked={activo} onChange={() => alternarTema(t.id)} className="sr-only" />
                  <span aria-hidden>{activo ? "✓" : "+"}</span>
                  {t.titulo}
                </label>
              );
            })}
          </div>
        </fieldset>

        <p className="mt-4 text-sm leading-relaxed text-tinta-tenue">
          Cada versión trae otros números. Para un curso, imprime varias versiones; para recuperar las respuestas de
          una, escribe su número arriba.
        </p>
      </section>

      <article className="rounded-[1.25rem] border border-borde bg-tarjeta px-5 py-7 shadow-[0_8px_30px_rgba(0,0,0,0.05)] print:rounded-none print:border-0 print:p-0 print:shadow-none sm:px-10 sm:py-10">
        <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-borde-fuerte pb-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-acento">Matemática Financiera</p>
            <h2 className="font-serif text-2xl font-semibold">Hoja de práctica</h2>
          </div>
          <p className="text-sm font-semibold tabular-nums text-tinta-media">Versión {ajustes.version}</p>
        </header>
        <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3 text-sm text-tinta-media">
          <span className="flex min-w-[16rem] flex-1 items-end gap-2">
            Nombre: <span aria-hidden className="flex-1 border-b border-tinta-tenue" />
          </span>
          <span className="flex w-40 items-end gap-2">
            Fecha: <span aria-hidden className="flex-1 border-b border-tinta-tenue" />
          </span>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-tinta-media">
          Marca la opción correcta y deja a la vista el cálculo que te llevó a ella.
        </p>

        {TEMAS_HOJA.filter((t) => ajustes.temas.includes(t.id)).map((t) => (
          <section key={t.id} className="mt-7">
            <h3 className="break-after-avoid font-sans text-xs font-extrabold uppercase tracking-[0.08em] text-acento">
              {t.titulo}
            </h3>
            <ol className="mt-3 flex flex-col gap-6">
              {numerados
                .filter((e) => e.tema === t.id)
                .map((e) => (
                  <li key={e.numero} className="flex break-inside-avoid gap-3">
                    <span className="w-6 shrink-0 font-semibold tabular-nums">{e.numero}.</span>
                    <div className="min-w-0 flex-1">
                      <MathText className="leading-relaxed">{e.pregunta}</MathText>
                      <ul className="mt-2 grid gap-x-6 gap-y-1.5 sm:grid-cols-2 print:grid-cols-2">
                        {e.opciones.map((o, k) => (
                          <li key={k} className="flex gap-2">
                            <span className="text-tinta-tenue">{LETRAS[k]})</span>
                            <MathText>{o}</MathText>
                          </li>
                        ))}
                      </ul>
                      <div aria-hidden className="hidden print:block print:h-[22mm]" />
                    </div>
                  </li>
                ))}
            </ol>
          </section>
        ))}

        {conRespuestas && (
          <section className="mt-10 border-t border-borde-fuerte pt-6 print:mt-0 print:break-before-page print:border-0 print:pt-0">
            <h2 className="font-serif text-xl font-semibold">Respuestas · versión {ajustes.version}</h2>
            <ol className="mt-4 flex flex-col gap-4 text-sm">
              {numerados.map((e) => (
                <li key={e.numero} className="flex break-inside-avoid gap-3">
                  <span className="w-6 shrink-0 font-semibold tabular-nums">{e.numero}.</span>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">
                      {LETRAS[e.correcta]}) <MathText>{e.opciones[e.correcta]}</MathText>
                    </p>
                    <MathText className="mt-1 block leading-relaxed text-tinta-media">{e.explicacion}</MathText>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}
      </article>
    </div>
  );
}
