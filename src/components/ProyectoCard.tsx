import type { Proyecto } from "@/lib/types";
import { ESTADOS_PROYECTO } from "@content/proyectos";

/**
 * Tarjeta de proyecto externo. Enlaza a la URL real del proyecto en
 * pestaña nueva. Muestra estado, descripción y tags.
 */
export function ProyectoCard({ proyecto }: { proyecto: Proyecto }) {
  const estado = ESTADOS_PROYECTO[proyecto.estado];

  return (
    <a
      href={proyecto.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-amber-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-amber-700"
    >
      {/* Acento ámbar decorativo */}
      <div
        aria-hidden
        className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-amber-400/15 blur-2xl transition group-hover:bg-amber-400/30"
      />

      <div className="relative flex items-start justify-between gap-3">
        <span className="text-3xl" aria-hidden>
          {proyecto.icono}
        </span>
        <span
          className={`shrink-0 rounded-full border px-2 py-0.5 text-xs font-medium ${estado.clase}`}
        >
          {estado.label}
        </span>
      </div>

      <h3 className="relative mt-4 font-serif text-lg font-semibold text-slate-900 dark:text-slate-100">
        {proyecto.titulo}
      </h3>
      <p className="relative mt-2 flex-1 text-sm text-slate-600 dark:text-slate-400">
        {proyecto.descripcion}
      </p>

      <div className="relative mt-4 flex items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap gap-1.5">
          {proyecto.tags?.map((t) => (
            <span
              key={t}
              className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
            >
              {t}
            </span>
          ))}
        </div>
        <span className="shrink-0 font-medium text-amber-700 transition group-hover:translate-x-0.5 dark:text-amber-400">
          Abrir ↗
        </span>
      </div>
    </a>
  );
}
