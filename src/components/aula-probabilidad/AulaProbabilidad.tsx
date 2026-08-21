"use client";

import { useEffect, useState } from "react";
import { MODULOS, type ModuloId } from "./modulos";
import { BLOQUES } from "./bloques";
import { RielApartados, MenuApartados } from "./NavegacionApartados";

/** Dónde se guarda el último apartado visitado, para retomarlo al volver. */
const CLAVE_PROGRESO = "aula-probabilidad:ultimo-apartado";
import { verificarVerdades } from "./calculos";
import { ModuloMisterio } from "./ModuloMisterio";
import { ModuloElCaso } from "./ModuloElCaso";
import { PanelDelCaso } from "./PanelDelCaso";
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
      {/* Navegación: riel a la derecha cuando hay margen, botón flotante si no.
          Antes era una barra pegajosa de cuatro filas que seguía al lector
          durante todo el desplazamiento. */}
      <RielApartados activo={activo} irA={irA} indiceActivo={indiceActivo} />
      <MenuApartados activo={activo} irA={irA} indiceActivo={indiceActivo} />

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

      {/* Los datos del caso, a un toque desde cualquier apartado */}
      <PanelDelCaso />
    </div>
  );
}
