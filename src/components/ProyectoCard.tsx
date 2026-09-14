import type { Proyecto } from "@/lib/types";
import { ESTADOS_PROYECTO } from "@content/proyectos";

/** Tarjeta de proyecto externo: abre la URL real en pestaña nueva. */
export function ProyectoCard({ proyecto }: { proyecto: Proyecto }) {
  const estado = ESTADOS_PROYECTO[proyecto.estado];

  return (
    <a
      href={proyecto.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col rounded-[1.25rem] border border-borde bg-tarjeta p-6 transition hover:-translate-y-0.5 hover:border-borde-fuerte"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-serif text-2xl font-semibold tracking-tight">{proyecto.titulo}</h3>
        <span className={`mt-1 shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${estado.clase}`}>
          {estado.label}
        </span>
      </div>
      <p className="mt-3 flex-1 leading-relaxed text-tinta-media">{proyecto.descripcion}</p>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap gap-1.5">
          {proyecto.tags?.map((t) => (
            <span key={t} className="rounded-full bg-papel-suave px-2.5 py-0.5 text-tinta-tenue">
              {t}
            </span>
          ))}
        </div>
        <span className="shrink-0 text-sm font-semibold text-acento transition group-hover:translate-x-0.5">
          Abrir ↗
        </span>
      </div>
    </a>
  );
}
