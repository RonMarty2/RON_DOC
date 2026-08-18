"use client";

import { useEffect, useState } from "react";
import { MODULOS, type ModuloId } from "./modulos";
import { verificarVerdades } from "./calculos";
import { ModuloEspacioMuestral } from "./ModuloEspacioMuestral";
import { ModuloProximamente } from "./ModuloProximamente";

/**
 * Contenedor principal de la herramienta "Aula Interactiva de Probabilidad".
 *
 * Sigue el temario real de Psicoestadística Inferencial — Unidad 2 (2.1 a
 * 2.6 en esta fase). Todos los módulos se alimentan del mismo dataset PTSMU
 * de 200 estudiantes. Estilos aislados bajo `.aula-probabilidad`.
 */
export function AulaProbabilidad() {
  const [activo, setActivo] = useState<ModuloId>("espacio-muestral");
  const meta = MODULOS.find((m) => m.id === activo) ?? MODULOS[0];

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      const fallos = verificarVerdades();
      if (fallos.length > 0) {
        console.error("[Aula] el dataset NO reproduce las verdades:", fallos);
      } else {
        console.info("[Aula] dataset PTSMU verificado: sensibilidad 88% / especificidad 88% / VPP 51.2% ✓");
      }
    }
  }, []);

  return (
    <div className="aula-probabilidad">
      {/* Navegación por apartados del temario */}
      <nav
        aria-label="Módulos de la herramienta"
        className="sticky top-16 z-10 -mx-4 mb-8 border-b border-slate-200 bg-white/85 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 dark:border-slate-800 dark:bg-slate-950/85"
      >
        <div className="flex flex-wrap items-center gap-2">
          {MODULOS.map((m) => {
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
                <span className="whitespace-nowrap">
                  {m.apartado} {m.titulo}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Encabezado del módulo activo */}
      <header className="mb-6">
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-blue-700 dark:text-blue-300">
          {meta.icono} {meta.apartado} · {meta.subtitulo}
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
        {activo === "espacio-muestral" ? (
          <ModuloEspacioMuestral />
        ) : (
          <ModuloProximamente meta={meta} />
        )}
      </section>
    </div>
  );
}
