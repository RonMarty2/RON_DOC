"use client";

import { useEffect, useState } from "react";
import { MODULOS, type ModuloId } from "./modulos";
import { verificarVerdades } from "./calculos";
import { ModuloMisterio } from "./ModuloMisterio";
import { ModuloElCaso } from "./ModuloElCaso";
import { ModuloEspacioMuestral } from "./ModuloEspacioMuestral";
import { ModuloProximamente } from "./ModuloProximamente";

/** Módulos ya construidos; el resto muestra el placeholder. */
function CuerpoModulo({
  id,
  irA,
}: {
  id: ModuloId;
  irA: (destino: ModuloId) => void;
}) {
  switch (id) {
    case "misterio":
      return <ModuloMisterio onContinuar={() => irA("el-caso")} />;
    case "el-caso":
      return <ModuloElCaso />;
    case "espacio-muestral":
      return <ModuloEspacioMuestral />;
    default:
      return <ModuloProximamente meta={MODULOS.find((m) => m.id === id)!} />;
  }
}

/**
 * Contenedor principal de la herramienta "Aula Interactiva de Probabilidad".
 *
 * Abre en el preámbulo ("El misterio"), sigue por el contexto ("El caso") y
 * después recorre el temario de Psicoestadística Inferencial — Unidad 2
 * (2.1 a 2.6 en esta fase). Todos los módulos se alimentan del mismo
 * dataset de 200 fichas. Estilos aislados bajo `.aula-probabilidad`.
 */
export function AulaProbabilidad() {
  const [activo, setActivo] = useState<ModuloId>("misterio");
  const meta = MODULOS.find((m) => m.id === activo) ?? MODULOS[0];

  // Al cambiar de módulo, volver arriba (los módulos son largos).
  function irA(destino: ModuloId) {
    setActivo(destino);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      const fallos = verificarVerdades();
      if (fallos.length > 0) {
        console.error("[Aula] el dataset NO reproduce las verdades:", fallos);
      } else {
        console.info("[Aula] dataset verificado: sensibilidad 88% / especificidad 88% / VPP 51.2% ✓");
      }
    }
  }, []);

  return (
    <div className="aula-probabilidad">
      {/* Navegación: preámbulo y contexto primero, después el temario */}
      <nav
        aria-label="Secciones de la herramienta"
        className="sticky top-16 z-10 -mx-4 mb-8 border-b border-slate-200 bg-white/85 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 dark:border-slate-800 dark:bg-slate-950/85"
      >
        <div className="flex flex-wrap items-center gap-2">
          {MODULOS.map((m, i) => {
            const esActivo = m.id === activo;
            const primeroDelTemario = m.apartado === "2.1";
            return (
              <div key={m.id} className="flex items-center gap-2">
                {primeroDelTemario && i > 0 && (
                  <span
                    aria-hidden
                    className="mx-1 hidden h-5 w-px bg-slate-200 sm:block dark:bg-slate-700"
                  />
                )}
                <button
                  type="button"
                  onClick={() => irA(m.id)}
                  aria-pressed={esActivo}
                  className={
                    "flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition " +
                    (esActivo
                      ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                      : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-700 dark:hover:bg-blue-950/30")
                  }
                >
                  <span aria-hidden>{m.icono}</span>
                  <span className="whitespace-nowrap">
                    {m.apartado ? `${m.apartado} ${m.titulo}` : m.titulo}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </nav>

      {/* Encabezado del módulo activo */}
      <header className="mb-6">
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-blue-700 dark:text-blue-300">
          {meta.icono} {meta.apartado ? `${meta.apartado} · ` : ""}
          {meta.subtitulo}
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
        <CuerpoModulo id={activo} irA={irA} />
      </section>
    </div>
  );
}
