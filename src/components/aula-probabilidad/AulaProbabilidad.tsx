"use client";

import { useState } from "react";
import { MODULOS, type ModuloId } from "./modulos";
import { ModuloAula } from "./ModuloAula";
import { ModuloUrna } from "./ModuloUrna";
import { ModuloCondicional } from "./ModuloCondicional";
import { ModuloMonty } from "./ModuloMonty";
import { ModuloBayes } from "./ModuloBayes";

/**
 * Contenedor principal de la herramienta "Aula Interactiva de Probabilidad".
 * Renderiza la navegación entre los 5 módulos (A-E) y el módulo activo.
 *
 * Aislamiento: todos los estilos específicos viven bajo la clase raíz
 * `aula-probabilidad` para evitar fugas al resto del sitio.
 */
export function AulaProbabilidad() {
  const [activo, setActivo] = useState<ModuloId>("aula");
  const meta = MODULOS.find((m) => m.id === activo) ?? MODULOS[0];

  return (
    <div className="aula-probabilidad">
      {/* Navegación de módulos */}
      <nav
        aria-label="Módulos de la herramienta"
        className="sticky top-16 z-10 -mx-4 mb-8 overflow-x-auto border-b border-slate-200 bg-white/85 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 dark:border-slate-800 dark:bg-slate-950/85"
      >
        <ul className="flex min-w-max gap-2">
          {MODULOS.map((m) => {
            const esActivo = m.id === activo;
            return (
              <li key={m.id}>
                <button
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
                  <span
                    className={
                      "grid h-5 w-5 place-items-center rounded-full font-mono text-xs font-semibold " +
                      (esActivo
                        ? "bg-white/20 text-white"
                        : "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300")
                    }
                  >
                    {m.numero}
                  </span>
                  <span className="whitespace-nowrap">{m.titulo}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Encabezado del módulo activo */}
      <header className="mb-6">
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-blue-700 dark:text-blue-300">
          Módulo {meta.numero} · {meta.subtitulo}
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
          Módulo {meta.titulo}
        </h3>
        {activo === "aula" && <ModuloAula />}
        {activo === "urna" && <ModuloUrna />}
        {activo === "condicional" && <ModuloCondicional />}
        {activo === "monty" && <ModuloMonty />}
        {activo === "bayes" && <ModuloBayes />}
      </section>
    </div>
  );
}
