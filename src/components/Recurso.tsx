import { conBase } from "@/lib/rutas";
import type { Recurso as RecursoData } from "@/lib/types";

/**
 * Tarjeta de recurso descargable (PDF u otro archivo en /public/recursos/).
 * Muestra título, descripción opcional, tamaño y un botón de descarga.
 */
export function Recurso({ titulo, archivo, tamanio, descripcion }: RecursoData) {
  const url = conBase(archivo);
  const nombreArchivo = archivo.split("/").pop() ?? "recurso";

  return (
    <div className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700">
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
  );
}
