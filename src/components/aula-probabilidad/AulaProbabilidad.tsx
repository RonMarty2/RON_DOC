"use client";

import { useEffect, useState } from "react";
import { MODULOS, type ModuloId } from "./modulos";
import { BLOQUES, ORDEN_BLOQUES } from "./bloques";
import { verificarVerdades } from "./calculos";
import { ModuloMisterio } from "./ModuloMisterio";
import { ModuloElCaso } from "./ModuloElCaso";
import { ModuloEspacioMuestral } from "./ModuloEspacioMuestral";
import { ModuloTiposProbabilidad } from "./ModuloTiposProbabilidad";
import { ModuloTablasContingencia } from "./ModuloTablasContingencia";
import { ModuloCombinatoria } from "./ModuloCombinatoria";
import { ModuloReglasBasicas } from "./ModuloReglasBasicas";
import { ModuloBayes } from "./ModuloBayes";
import { ModuloVariablesAleatorias } from "./ModuloVariablesAleatorias";
import { ModuloDiscretas } from "./ModuloDiscretas";
import { ModuloNormal } from "./ModuloNormal";

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
      return <ModuloElCaso onContinuar={() => irA("espacio-muestral")} />;
    case "espacio-muestral":
      return <ModuloEspacioMuestral onContinuar={() => irA("tipos-probabilidad")} />;
    case "tipos-probabilidad":
      return <ModuloTiposProbabilidad onContinuar={() => irA("tablas-contingencia")} />;
    case "tablas-contingencia":
      return <ModuloTablasContingencia onContinuar={() => irA("combinatoria")} />;
    case "combinatoria":
      return <ModuloCombinatoria onContinuar={() => irA("reglas-basicas")} />;
    case "reglas-basicas":
      return <ModuloReglasBasicas onContinuar={() => irA("bayes")} />;
    case "bayes":
      return <ModuloBayes onContinuar={() => irA("variables-aleatorias")} />;
    case "variables-aleatorias":
      return <ModuloVariablesAleatorias onContinuar={() => irA("discretas")} />;
    case "discretas":
      return <ModuloDiscretas onContinuar={() => irA("normal")} />;
    case "normal":
      return <ModuloNormal onContinuar={() => irA("misterio")} />;
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
  const indiceActivo = MODULOS.findIndex((m) => m.id === activo);
  const acento = BLOQUES[meta.bloque];

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
      {/* Navegación agrupada por bloques temáticos */}
      <nav
        aria-label="Secciones de la herramienta"
        className="sticky top-16 z-10 -mx-4 mb-8 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 dark:border-slate-800 dark:bg-slate-950/90"
      >
        <div className="flex flex-wrap items-start gap-x-5 gap-y-3">
          {ORDEN_BLOQUES.map((bloqueId) => {
            const b = BLOQUES[bloqueId];
            const delBloque = MODULOS.filter((m) => m.bloque === bloqueId);
            const bloqueActivo = delBloque.some((m) => m.id === activo);
            return (
              <div key={bloqueId} className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5">
                  <span className={"h-1 w-4 rounded-full " + b.barra} />
                  <span
                    className={
                      "font-mono text-[9px] font-semibold uppercase tracking-widest transition " +
                      (bloqueActivo ? b.texto : "text-slate-400 dark:text-slate-600")
                    }
                  >
                    {b.etiqueta}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {delBloque.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => irA(m.id)}
                      aria-pressed={m.id === activo}
                      className={
                        "flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition sm:text-sm " +
                        (m.id === activo ? b.activo : b.inactivo)
                      }
                    >
                      <span aria-hidden>{m.icono}</span>
                      <span className="whitespace-nowrap">
                        {m.apartado ? `${m.apartado} ${m.titulo}` : m.titulo}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Progreso del recorrido */}
        <div className="mt-3 flex items-center gap-2">
          <div className="flex h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            {MODULOS.map((m, i) => (
              <span
                key={m.id}
                className={
                  "h-full flex-1 transition " +
                  (i <= indiceActivo ? BLOQUES[m.bloque].barra : "bg-transparent")
                }
              />
            ))}
          </div>
          <span className="font-mono text-[10px] tabular-nums text-slate-400">
            {indiceActivo + 1} / {MODULOS.length}
          </span>
        </div>
      </nav>

      {/* Encabezado del módulo activo */}
      <header className="mb-6">
        <p
          className={
            "font-mono text-xs font-semibold uppercase tracking-widest " +
            acento.texto
          }
        >
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
