"use client";

import { useState } from "react";
import { conBase } from "@/lib/rutas";
import type { Recurso as RecursoData } from "@/lib/types";

/**
 * Tarjeta de recurso descargable (PDF u otro archivo en /public/recursos/).
 * Muestra título, descripción opcional, tamaño y botones Ver / Descargar.
 *
 * Si `embebido` es true, agrega un toggle que muestra el archivo en un visor
 * embebido (iframe). Útil para PDFs.
 */
export function Recurso({
  titulo,
  archivo,
  tamanio,
  descripcion,
  embebido = false,
}: RecursoData) {
  const url = conBase(archivo);
  const nombreArchivo = archivo.split("/").pop() ?? "recurso";
  const [visible, setVisible] = useState(false);

  return (
    <div className="rounded-lg border border-slate-200 bg-white transition hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700">
      <div className="flex items-center gap-4 p-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-slate-100 text-lg dark:bg-slate-800">
          📄
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium text-slate-900 dark:text-slate-100">
            {titulo}
          </p>
          {descripcion && (
            <p className="mt-0.5 truncate text-sm text-slate-600 dark:text-slate-400">
              {descripcion}
            </p>
          )}
          <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-500">
            {nombreArchivo}
            {tamanio ? ` · ${tamanio}` : ""}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {embebido && (
            <button
              type="button"
              onClick={() => setVisible((v) => !v)}
              aria-expanded={visible}
              className="hidden rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-700 transition hover:bg-slate-50 sm:inline-block dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {visible ? "Ocultar" : "Previsualizar"}
            </button>
          )}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Ver
          </a>
          <a
            href={url}
            download={nombreArchivo}
            className="rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
          >
            Descargar
          </a>
        </div>
      </div>

      {embebido && visible && (
        <div className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
          <iframe
            src={url}
            title={titulo}
            loading="lazy"
            className="block w-full"
            style={{ height: "clamp(420px, 75vh, 800px)", border: 0 }}
          />
        </div>
      )}
    </div>
  );
}
