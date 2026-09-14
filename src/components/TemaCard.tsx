import Link from "next/link";
import type { Tema } from "@/lib/types";

export function TemaCard({ tema, slugMateria, numero }: { tema: Tema; slugMateria: string; numero: number }) {
  return (
    <Link
      href={`/materias/${slugMateria}/${tema.slug}`}
      className="group flex flex-col rounded-2xl border border-borde bg-tarjeta p-5 transition hover:-translate-y-0.5 hover:border-borde-fuerte"
    >
      <div className="flex items-baseline gap-3">
        <span className="text-xs font-bold tabular-nums text-acento">{String(numero).padStart(2, "0")}</span>
        <h3 className="font-serif text-lg font-semibold leading-snug">{tema.titulo}</h3>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-tinta-media">{tema.resumen}</p>
      <div className="mt-4 flex items-center gap-2 text-xs text-tinta-tenue">
        {tema.interactivos && tema.interactivos.length > 0 && (
          <span className="rounded-full bg-acento/10 px-2.5 py-0.5 font-semibold text-acento">
            {tema.interactivos.length} interactivo{tema.interactivos.length > 1 ? "s" : ""}
          </span>
        )}
        {tema.recursos && tema.recursos.length > 0 && (
          <span className="rounded-full bg-papel-suave px-2.5 py-0.5">
            {tema.recursos.length} recurso{tema.recursos.length > 1 ? "s" : ""}
          </span>
        )}
        <span aria-hidden className="ml-auto transition group-hover:translate-x-0.5">→</span>
      </div>
    </Link>
  );
}
