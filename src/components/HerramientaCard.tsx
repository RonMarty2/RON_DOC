import Link from "next/link";
import type { HerramientaMateria } from "@/lib/types";

const TIPO = {
  aula: { etiqueta: "Aula interactiva", boton: "Abrir el aula" },
  lamina: { etiqueta: "Lámina interactiva", boton: "Abrir la lámina" },
  hoja: { etiqueta: "Hoja de práctica para imprimir", boton: "Armar la hoja" },
};

export function HerramientaCard({ herramienta }: { herramienta: HerramientaMateria }) {
  return (
    <Link
      href={herramienta.href}
      className="group flex flex-col gap-5 rounded-[1.25rem] border border-borde bg-tarjeta p-6 shadow-[0_8px_30px_rgba(0,0,0,0.05)] transition hover:-translate-y-0.5 hover:border-borde-fuerte sm:p-8"
    >
      <div>
        <p className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-acento">
          {TIPO[herramienta.tipo ?? "aula"].etiqueta}
        </p>
        <h3 className="mt-2 font-serif text-2xl font-semibold leading-tight sm:text-3xl">{herramienta.titulo}</h3>
        <p className="mt-3 max-w-2xl leading-relaxed text-tinta-media">{herramienta.descripcion}</p>
      </div>
      {herramienta.destacados && herramienta.destacados.length > 0 && (
        <ul className="grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
          {herramienta.destacados.map((d) => (
            <li key={d} className="flex gap-2.5 text-sm leading-snug text-tinta-media">
              <span aria-hidden className="mt-0.5 font-bold text-ok">✓</span>
              {d}
            </li>
          ))}
        </ul>
      )}
      <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-acento px-5 py-2.5 text-sm font-semibold text-acento-texto transition group-hover:bg-acento-hover">
        {TIPO[herramienta.tipo ?? "aula"].boton}
        <span aria-hidden className="transition group-hover:translate-x-0.5">→</span>
      </span>
    </Link>
  );
}
