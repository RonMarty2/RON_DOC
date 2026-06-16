"use client";

import { useEffect, useState } from "react";
import {
  MODULOS,
  PARTES,
  modulosDeParte,
  type ModuloId,
  type Parte,
} from "./modulos";
import { verificarVerdades } from "./calculos";
import { ModuloMonty } from "./ModuloMonty";
import { ModuloCumpleanios } from "./ModuloCumpleanios";
import { ModuloMoneda } from "./ModuloMoneda";
import { ModuloUrna } from "./ModuloUrna";
import { ModuloCondicional } from "./ModuloCondicional";
import { ModuloBayes } from "./ModuloBayes";
import { GuiaClase } from "./GuiaClase";
import { PuenteSecciones } from "./narrativa";

/**
 * Contenedor principal de la herramienta "Aula Interactiva de Probabilidad".
 *
 * Navegación en dos partes (Preludio / Construcción), todas alimentadas por el
 * mismo dataset de 60 estudiantes. Estilos aislados bajo `.aula-probabilidad`.
 */
export function AulaProbabilidad() {
  const [activo, setActivo] = useState<ModuloId>("puertas");
  const meta = MODULOS.find((m) => m.id === activo) ?? MODULOS[0];

  // En desarrollo, verificamos que el dataset reproduzca la tabla de verdades.
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      const fallos = verificarVerdades();
      if (fallos.length > 0) {
        console.error("[Aula] el dataset NO reproduce las verdades:", fallos);
      } else {
        console.info("[Aula] dataset verificado: 13.3% / 25% / 38% ✓");
      }
    }
  }, []);

  return (
    <div className="aula-probabilidad">
      {/* Navegación en dos partes */}
      <nav
        aria-label="Módulos de la herramienta"
        className="sticky top-16 z-10 -mx-4 mb-8 border-b border-slate-200 bg-white/85 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 dark:border-slate-800 dark:bg-slate-950/85"
      >
        <div className="flex flex-col gap-2">
          {(Object.keys(PARTES) as Parte[]).map((parte) => (
            <div key={parte} className="flex flex-wrap items-center gap-2">
              <span className="mr-1 text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                {parte === "preludio" ? "1 · Preludio" : "2 · Construcción"}
              </span>
              {modulosDeParte(parte).map((m) => {
                const esActivo = m.id === activo;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setActivo(m.id)}
                    aria-pressed={esActivo}
                    className={
                      "group flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition " +
                      (esActivo
                        ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                        : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-700 dark:hover:bg-blue-950/30")
                    }
                  >
                    <span aria-hidden>{m.icono}</span>
                    <span className="whitespace-nowrap">{m.titulo}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </nav>

      {/* Guía rápida colapsable para usar en clase */}
      <GuiaClase />

      {/* Descripción de la parte actual */}
      <div className="mb-6 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:bg-slate-900/50 dark:text-slate-400">
        <span className="font-semibold text-slate-800 dark:text-slate-200">
          {PARTES[meta.parte].etiqueta}.
        </span>{" "}
        {PARTES[meta.parte].descripcion}
      </div>

      {/* Encabezado del módulo activo */}
      <header className="mb-6">
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-blue-700 dark:text-blue-300">
          {meta.icono} {meta.subtitulo}
        </p>
        <h2 className="mt-1 font-serif text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">
          {meta.titulo}
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
          {meta.resumen}
        </p>
      </header>

      {/* Cuerpo del módulo */}
      <section aria-labelledby={`modulo-${meta.id}`}>
        <h3 id={`modulo-${meta.id}`} className="sr-only">
          {meta.titulo}
        </h3>
        {activo === "puertas" && <ModuloMonty />}
        {activo === "cumpleanios" && <ModuloCumpleanios />}
        {activo === "moneda" && <ModuloMoneda />}
        {activo === "urna" && <ModuloUrna />}
        {activo === "condicional" && <ModuloCondicional />}
        {activo === "bayes" && <ModuloBayes />}
      </section>

      {/* Puente: al terminar el preludio (moneda), invita a la construcción */}
      {activo === "moneda" && (
        <div className="mt-10">
          <PuenteSecciones />
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setActivo("urna")}
              className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Empezar la construcción → Probabilidad simple
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
