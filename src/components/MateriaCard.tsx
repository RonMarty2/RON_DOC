import Link from "next/link";
import type { Materia } from "@/lib/types";
import { COLORES } from "@/lib/colores";

/**
 * Tarjeta grande de materia, usada en la home y en la página de la propia materia.
 */
export function MateriaCard({ materia }: { materia: Materia }) {
  const c = COLORES[materia.color];
  return (
    <Link
      href={`/materias/${materia.slug}`}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border ${c.borde} ${c.bgSuave} p-6 transition hover:-translate-y-0.5 hover:shadow-lg`}
    >
      <div
        aria-hidden
        className={`absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${c.desde} ${c.hasta} opacity-20 blur-2xl transition group-hover:opacity-30`}
      />
      <div className="relative">
        <div className="flex items-center gap-3">
          <span className="text-3xl" aria-hidden>{materia.icono}</span>
          <span className={`text-xs font-semibold uppercase tracking-wider ${c.texto}`}>
            {materia.temas.length} temas
          </span>
        </div>
        <h3 className="mt-4 font-serif text-xl font-semibold text-slate-900 dark:text-slate-100">
          {materia.nombre}
        </h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          {materia.descripcion}
        </p>
        <p className={`mt-4 inline-flex items-center gap-1 text-sm font-medium ${c.texto}`}>
          Ver temas
          <span aria-hidden className="transition group-hover:translate-x-0.5">→</span>
        </p>
      </div>
    </Link>
  );
}
