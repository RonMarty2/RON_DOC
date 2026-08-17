import type { ModuloMeta } from "./modulos";

/** Placeholder para los módulos del temario aún no construidos. */
export function ModuloProximamente({ meta }: { meta: ModuloMeta }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 p-8 text-center dark:border-slate-700 dark:bg-slate-900/40">
      <p className="text-3xl" aria-hidden>
        {meta.icono}
      </p>
      <p className="mt-2 font-serif text-lg font-semibold text-slate-700 dark:text-slate-300">
        {meta.apartado} · {meta.titulo} — en construcción
      </p>
      <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
        {meta.resumen}
      </p>
    </div>
  );
}
