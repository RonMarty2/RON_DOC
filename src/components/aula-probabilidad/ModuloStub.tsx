import type { ModuloMeta } from "./modulos";

/**
 * Placeholder para un módulo todavía no implementado. Lo reemplazaremos en
 * la Fase 2 por la implementación real de cada simulación.
 */
export function ModuloStub({ meta }: { meta: ModuloMeta }) {
  return (
    <div className="aula-stub flex min-h-[420px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 p-10 text-center dark:border-slate-700 dark:bg-slate-900/50">
      <span
        aria-hidden
        className="grid h-14 w-14 place-items-center rounded-full bg-blue-600 font-serif text-2xl font-semibold text-white shadow-sm"
      >
        {meta.numero}
      </span>
      <h3 className="font-serif text-2xl font-semibold text-slate-900 dark:text-slate-100">
        {meta.titulo}
      </h3>
      <p className="max-w-xl text-slate-600 dark:text-slate-400">
        {meta.resumen}
      </p>
      <p className="mt-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
        Simulación en construcción — Fase 2
      </p>
    </div>
  );
}
