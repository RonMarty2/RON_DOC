"use client";

import { useEffect, useState } from "react";
import { MODULOS, type ModuloId } from "./modulos";
import { BLOQUES, ORDEN_BLOQUES } from "./bloques";

/** Dónde se guarda el último apartado visitado, para retomarlo al volver. */
const CLAVE_PROGRESO = "aula-probabilidad:ultimo-apartado";
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
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [retomado, setRetomado] = useState<ModuloId | null>(null);

  // Al abrir, retomar donde se había quedado. Arranca siempre en "misterio"
  // para que el HTML del servidor y el del navegador coincidan, y recién
  // después salta al apartado guardado.
  useEffect(() => {
    try {
      const guardado = window.localStorage.getItem(CLAVE_PROGRESO);
      if (
        guardado &&
        guardado !== "misterio" &&
        MODULOS.some((m) => m.id === guardado)
      ) {
        setActivo(guardado as ModuloId);
        setRetomado(guardado as ModuloId);
      }
    } catch {
      // Si el navegador bloquea el almacenamiento, simplemente empieza al inicio.
    }
  }, []);
  const meta = MODULOS.find((m) => m.id === activo) ?? MODULOS[0];
  const indiceActivo = MODULOS.findIndex((m) => m.id === activo);
  const acento = BLOQUES[meta.bloque];

  // Al cambiar de módulo, volver arriba (los módulos son largos).
  /** Navega a un apartado, lo recuerda para la próxima vez y vuelve arriba. */
  function irA(destino: ModuloId) {
    setActivo(destino);
    setMenuAbierto(false);
    setRetomado(null);
    try {
      window.localStorage.setItem(CLAVE_PROGRESO, destino);
    } catch {
      // Sin almacenamiento disponible: se pierde el progreso, nada más.
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /** Vuelve al principio y olvida el punto guardado. */
  function empezarDeNuevo() {
    setRetomado(null);
    try {
      window.localStorage.removeItem(CLAVE_PROGRESO);
    } catch {
      /* nada que hacer */
    }
    setActivo("misterio");
    setMenuAbierto(false);
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
      {/* Navegación: compacta en móvil, desplegada en pantallas grandes */}
      <nav
        aria-label="Secciones de la herramienta"
        className="sticky top-16 z-20 -mx-4 mb-8 border-b border-slate-200 bg-white/95 px-4 py-2.5 backdrop-blur sm:-mx-6 sm:px-6 sm:py-3 dark:border-slate-800 dark:bg-slate-950/95"
      >
        {/* Barra compacta: sólo visible en móvil */}
        <div className="flex items-center gap-3 sm:hidden">
          <button
            type="button"
            onClick={() => setMenuAbierto((v) => !v)}
            aria-expanded={menuAbierto}
            className={
              "flex min-w-0 flex-1 items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium " +
              acento.activo
            }
          >
            <span aria-hidden>{meta.icono}</span>
            <span className="truncate">
              {meta.apartado ? `${meta.apartado} ${meta.titulo}` : meta.titulo}
            </span>
            <span aria-hidden className="ml-auto text-xs">
              {menuAbierto ? "▲" : "▼"}
            </span>
          </button>
          <span className="shrink-0 font-mono text-[10px] tabular-nums text-slate-400">
            {indiceActivo + 1}/{MODULOS.length}
          </span>
        </div>

        {/* Lista completa: siempre en pantallas grandes, desplegable en móvil */}
        <div className={(menuAbierto ? "mt-3 " : "hidden ") + "sm:mt-0 sm:block"}>
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
        </div>

        {/* Progreso del recorrido */}
        <div className="mt-2.5 hidden items-center gap-2 sm:flex">
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

      {/* Aviso de que se retomó donde se había quedado */}
      {retomado && (
        <div className="mb-6 flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-800/60">
          <span className="text-slate-700 dark:text-slate-300">
            Retomaste donde habías quedado:{" "}
            <strong>
              {meta.apartado ? `${meta.apartado} ${meta.titulo}` : meta.titulo}
            </strong>
            .
          </span>
          <button
            type="button"
            onClick={empezarDeNuevo}
            className="ml-auto shrink-0 rounded-full border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-blue-400 hover:text-blue-700 dark:border-slate-600 dark:text-slate-400 dark:hover:border-blue-600 dark:hover:text-blue-300"
          >
            Empezar desde el inicio
          </button>
        </div>
      )}

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
