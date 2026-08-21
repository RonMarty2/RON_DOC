"use client";

import { useEffect, useState } from "react";
import { MODULOS, type ModuloId } from "./modulos";
import { BLOQUES, ORDEN_BLOQUES } from "./bloques";

/**
 * La navegación entre apartados, en dos formas según el ancho.
 *
 * Antes era una barra pegajosa de cuatro filas que seguía al lector durante
 * todo el desplazamiento: en una pantalla de portátil se comía cerca del 15%
 * del alto útil, de forma permanente. Ahora:
 *
 *  - En pantallas anchas (desde 1440px) es un riel vertical a la derecha, en
 *    el margen que el contenido no usa. No roba alto y siempre se ve dónde
 *    está uno.
 *  - Más angosto, no hay nada fijo: el menú se abre desde un botón flotante
 *    y se cierra al elegir.
 */

/** Lista de apartados agrupada por bloque. Se usa en el riel y en el panel. */
function ListaApartados({
  activo,
  irA,
  compacta,
}: {
  activo: ModuloId;
  irA: (id: ModuloId) => void;
  compacta?: boolean;
}) {
  return (
    <div className="flex flex-col gap-3">
      {ORDEN_BLOQUES.map((bloqueId) => {
        const b = BLOQUES[bloqueId];
        const delBloque = MODULOS.filter((m) => m.bloque === bloqueId);
        const bloqueActivo = delBloque.some((m) => m.id === activo);
        return (
          <div key={bloqueId}>
            <div className="mb-1 flex items-center gap-1.5">
              <span className={"h-1 w-3 rounded-full " + b.barra} />
              <span
                className={
                  "font-mono text-[9px] font-semibold uppercase tracking-widest transition " +
                  (bloqueActivo ? b.texto : "text-slate-400 dark:text-slate-600")
                }
              >
                {b.etiqueta}
              </span>
            </div>
            <div className={compacta ? "flex flex-wrap gap-1.5" : "flex flex-col gap-0.5"}>
              {delBloque.map((m) => {
                const esActivo = m.id === activo;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => irA(m.id)}
                    aria-current={esActivo ? "step" : undefined}
                    className={
                      compacta
                        ? "flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition " +
                          (esActivo ? b.activo : b.inactivo)
                        : "flex items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[13px] leading-tight transition " +
                          (esActivo
                            ? "bg-slate-100 font-semibold text-slate-900 dark:bg-slate-800 dark:text-slate-100"
                            : "text-slate-500 hover:bg-slate-50 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-200")
                    }
                  >
                    <span aria-hidden className="shrink-0">
                      {m.icono}
                    </span>
                    <span className={compacta ? "whitespace-nowrap" : ""}>
                      {m.apartado ? `${m.apartado} ${m.titulo}` : m.titulo}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Riel vertical fijo a la derecha. Sólo en pantallas con margen de sobra. */
export function RielApartados({
  activo,
  irA,
  indiceActivo,
}: {
  activo: ModuloId;
  irA: (id: ModuloId) => void;
  indiceActivo: number;
}) {
  return (
    <nav
      aria-label="Apartados"
      className="pointer-events-none fixed inset-y-0 right-0 z-20 hidden w-[15rem] items-center pr-5 min-[1440px]:flex"
    >
      <div className="pointer-events-auto max-h-[80vh] w-full overflow-y-auto rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/95">
        <div className="mb-2 flex items-baseline justify-between">
          <span className="font-mono text-[9px] font-semibold uppercase tracking-widest text-slate-400">
            Recorrido
          </span>
          <span className="font-mono text-[10px] tabular-nums text-slate-400">
            {indiceActivo + 1}/{MODULOS.length}
          </span>
        </div>
        <ListaApartados activo={activo} irA={irA} />
      </div>
    </nav>
  );
}

/** Botón flotante + panel, para cuando no hay margen para el riel. */
export function MenuApartados({
  activo,
  irA,
  indiceActivo,
}: {
  activo: ModuloId;
  irA: (id: ModuloId) => void;
  indiceActivo: number;
}) {
  const [abierto, setAbierto] = useState(false);
  const meta = MODULOS.find((m) => m.id === activo) ?? MODULOS[0];
  const acento = BLOQUES[meta.bloque];

  useEffect(() => {
    if (!abierto) return;
    const porTecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAbierto(false);
    };
    window.addEventListener("keydown", porTecla);
    return () => window.removeEventListener("keydown", porTecla);
  }, [abierto]);

  function elegir(id: ModuloId) {
    irA(id);
    setAbierto(false);
  }

  return (
    <div className="min-[1440px]:hidden">
      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        aria-expanded={abierto}
        className={
          "fixed bottom-4 left-4 z-40 flex max-w-[60vw] items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold shadow-lg transition " +
          acento.activo
        }
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          aria-hidden
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <span className="truncate">
          {meta.apartado ? `${meta.apartado} ${meta.titulo}` : meta.titulo}
        </span>
        <span className="shrink-0 font-mono text-[10px] tabular-nums opacity-70">
          {indiceActivo + 1}/{MODULOS.length}
        </span>
      </button>

      {abierto && (
        <>
          <div
            className="fixed inset-0 z-40 bg-slate-900/30"
            onClick={() => setAbierto(false)}
            aria-hidden
          />
          <nav
            aria-label="Apartados"
            className="fixed bottom-0 left-0 right-0 z-50 max-h-[75vh] overflow-y-auto rounded-t-2xl border-t border-slate-200 bg-white p-5 shadow-2xl sm:bottom-20 sm:left-4 sm:right-auto sm:w-72 sm:rounded-2xl sm:border dark:border-slate-700 dark:bg-slate-900"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                Recorrido
              </span>
              <button
                type="button"
                onClick={() => setAbierto(false)}
                className="text-sm text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                cerrar ✕
              </button>
            </div>
            <ListaApartados activo={activo} irA={elegir} />
          </nav>
        </>
      )}
    </div>
  );
}
