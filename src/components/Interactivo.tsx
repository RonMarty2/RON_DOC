"use client";

import { useEffect, useRef, useState } from "react";
import { conBase } from "@/lib/rutas";
import type { Interactivo as InteractivoData } from "@/lib/types";

/**
 * Embebe un HTML standalone (alojado en /public/interactivos/) en un iframe
 * responsivo, con título, descripción opcional y botón de "pantalla completa".
 *
 * Detalles:
 * - El botón "Pantalla completa" pide fullscreen sobre el contenedor (no sólo el
 *   iframe), para que la barra con el título siga visible.
 * - Sincroniza el estado con `fullscreenchange` para reflejar ESC del usuario.
 * - El alto del iframe se adapta a móvil con `clamp()` para evitar áreas
 *   gigantescas en pantallas chicas.
 */
export function Interactivo({
  src,
  titulo,
  descripcion,
  alto = "600px",
}: InteractivoData) {
  const contenedorRef = useRef<HTMLElement>(null);
  const [enFullscreen, setEnFullscreen] = useState(false);

  // Sincroniza el estado con el evento global (cubre ESC y otros disparadores).
  useEffect(() => {
    function onCambio() {
      setEnFullscreen(Boolean(document.fullscreenElement));
    }
    document.addEventListener("fullscreenchange", onCambio);
    return () => document.removeEventListener("fullscreenchange", onCambio);
  }, []);

  function alternarFullscreen() {
    const el = contenedorRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void el.requestFullscreen();
    }
  }

  const url = conBase(src);
  // Altura responsiva: nunca menos de 360px, nunca más del valor configurado.
  const altoResponsivo = `clamp(360px, 70vh, ${alto})`;

  return (
    <figure
      ref={contenedorRef}
      className="my-8 flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 fullscreen:rounded-none fullscreen:border-0"
    >
      <figcaption className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 dark:border-slate-800">
        <div>
          <p className="font-serif text-sm font-semibold text-slate-900 dark:text-slate-100">
            ⚡ {titulo}
          </p>
          {descripcion && (
            <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
              {descripcion}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            title="Abrir en pestaña nueva"
          >
            ↗ Nueva pestaña
          </a>
          <button
            type="button"
            onClick={alternarFullscreen}
            className="rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            title="Pantalla completa"
          >
            {enFullscreen ? "⤡ Salir" : "⛶ Pantalla completa"}
          </button>
        </div>
      </figcaption>
      <iframe
        src={url}
        title={titulo}
        loading="lazy"
        className="block w-full flex-1 bg-white dark:bg-slate-950"
        style={{ height: enFullscreen ? "100%" : altoResponsivo, border: 0 }}
        // Sandbox conservador: permite scripts y formularios pero no ventana padre.
        sandbox="allow-scripts allow-forms allow-popups allow-same-origin"
      />
    </figure>
  );
}
