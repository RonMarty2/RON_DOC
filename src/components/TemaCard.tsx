import Link from "next/link";
import type { Tema, ColorAcento } from "@/lib/types";
import { COLORES } from "@/lib/colores";

interface Props {
  tema: Tema;
  slugMateria: string;
  color: ColorAcento;
  numero: number;
}

export function TemaCard({ tema, slugMateria, color, numero }: Props) {
  const c = COLORES[color];
  return (
    <Link
      href={`/materias/${slugMateria}/${tema.slug}`}
      className="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
    >
      <div className="flex items-baseline gap-3">
        <span className={`font-mono text-xs font-semibold ${c.texto}`}>
          {String(numero).padStart(2, "0")}
        </span>
        <h3 className="font-serif text-base font-semibold text-slate-900 dark:text-slate-100">
          {tema.titulo}
        </h3>
      </div>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        {tema.resumen}
      </p>
      <div className="mt-4 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-500">
        {tema.interactivos && tema.interactivos.length > 0 && (
          <span className={`inline-flex items-center gap-1 rounded-full ${c.bgSuave} px-2 py-0.5 ${c.texto}`}>
            ⚡ {tema.interactivos.length} interactivo{tema.interactivos.length > 1 ? "s" : ""}
          </span>
        )}
        {tema.recursos && tema.recursos.length > 0 && (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 dark:bg-slate-800">
            📄 {tema.recursos.length} recurso{tema.recursos.length > 1 ? "s" : ""}
          </span>
        )}
        <span className="ml-auto text-slate-400 transition group-hover:translate-x-0.5 dark:text-slate-500">
          →
        </span>
      </div>
    </Link>
  );
}
