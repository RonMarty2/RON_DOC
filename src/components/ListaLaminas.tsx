import Link from "next/link";
import type { HerramientaMateria } from "@/lib/types";
import { AvanceLamina } from "./AvanceLamina";

/** Varias láminas de una materia, numeradas en el orden en que conviene estudiarlas. */
export function ListaLaminas({ laminas }: { laminas: HerramientaMateria[] }) {
  return (
    <ol className="overflow-hidden rounded-[1.25rem] border border-borde bg-tarjeta">
      {laminas.map((l, i) => (
        <li key={l.href} className="border-b border-borde last:border-b-0">
          <Link href={l.href} className="group flex items-start gap-4 px-5 py-4 transition hover:bg-papel-suave sm:px-6">
            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-acento text-sm font-bold text-acento-texto">
              {i + 1}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-serif text-lg font-semibold leading-snug group-hover:text-acento">{l.titulo}</span>
              <span className="mt-1 block text-sm leading-relaxed text-tinta-media">{l.descripcion}</span>
              <AvanceLamina href={l.href} />
            </span>
            <span aria-hidden className="mt-1 shrink-0 text-acento transition group-hover:translate-x-0.5">→</span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
