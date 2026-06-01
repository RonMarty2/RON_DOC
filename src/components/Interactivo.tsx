"use client";

import { useRef, useState } from "react";
import { conBase } from "@/lib/rutas";
import type { Interactivo as InteractivoData } from "@/lib/types";

/**
 * Embebe un HTML standalone (alojado en /public/interactivos/) en un iframe
 * responsivo, con título, descripción opcional y botón de "pantalla completa".
 */
export function Interactivo({
  src,
  titulo,
  descripcion,
  alto = "600px",
}: InteractivoData) {
  const ref = useRef<HTMLIFrameElement>(null);
  const [enFullscreen, setEnFullscreen] = useState(false);

  function alternarFullscreen() {
    const el = ref.current;
    if (!el) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen();
      setEnFullscreen(false);
    } else {
      void el.requestFullscreen();
      setEnFullscreen(true);
    }
  }

  const url = conBase(src);

  return (
    <figure className="my-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
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
        ref={ref}
        src={url}
        title={titulo}
        loading="lazy"
        className="block w-full bg-white dark:bg-slate-950"
        style={{ height: alto, border: 0 }}
        // Sandbox conservador: permite scripts y formularios pero no ventana padre.
        sandbox="allow-scripts allow-forms allow-popups allow-same-origin"
      />
    </figure>
  );
}
