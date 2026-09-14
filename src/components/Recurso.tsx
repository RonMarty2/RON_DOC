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
    <div className="rounded-lg border border-borde bg-tarjeta transition hover:border-borde-fuerte">
      <div className="flex items-center gap-4 p-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-acento/10 text-[10px] font-bold text-acento">
          PDF
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium text-tinta">
            {titulo}
          </p>
          {descripcion && (
            <p className="mt-0.5 truncate text-sm text-tinta-media">
              {descripcion}
            </p>
          )}
          <p className="mt-0.5 truncate text-xs text-tinta-tenue dark:text-tinta-tenue">
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
              className="hidden rounded-md border border-borde px-3 py-1.5 text-sm text-tinta-media transition hover:bg-papel-suave sm:inline-block"
            >
              {visible ? "Ocultar" : "Previsualizar"}
            </button>
          )}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-borde px-3 py-1.5 text-sm text-tinta-media transition hover:bg-papel-suave"
          >
            Ver
          </a>
          <a
            href={url}
            download={nombreArchivo}
            className="rounded-md bg-acento px-3 py-1.5 text-sm font-semibold text-acento-texto transition hover:bg-acento-hover"
          >
            Descargar
          </a>
        </div>
      </div>

      {embebido && visible && (
        <div className="border-t border-borde bg-papel-suave">
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
