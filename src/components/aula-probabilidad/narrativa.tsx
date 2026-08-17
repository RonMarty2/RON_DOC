/**
 * Componentes de presentación reutilizados por los módulos: el recuadro de
 * "caso aplicado" (contexto PTSMU) y la mini-historia (nota conceptual o
 * trampa común).
 */

/** Recuadro de caso aplicado a psicología (dataset PTSMU real). */
export function RecuadroCaso({
  titulo,
  children,
}: {
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-blue-200 bg-blue-50/50 p-5 dark:border-blue-900 dark:bg-blue-950/20 sm:p-6">
      <p className="font-mono text-xs font-semibold uppercase tracking-widest text-blue-700 dark:text-blue-300">
        Aplicado · Servicio de Tamizaje en Salud Mental (PTSMU)
      </p>
      <h4 className="mt-1 font-serif text-xl font-semibold text-slate-900 dark:text-slate-100">
        {titulo}
      </h4>
      <div className="mt-3 space-y-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        {children}
      </div>
    </article>
  );
}

/** Recuadro clásico (dados, cartas, urnas) — sin ruido psicológico, para fijar el concepto puro. */
export function RecuadroClasico({
  titulo,
  children,
}: {
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 dark:border-slate-800 dark:bg-slate-900/40 sm:p-6">
      <p className="font-mono text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
        Ejemplo clásico
      </p>
      <h4 className="mt-1 font-serif text-xl font-semibold text-slate-900 dark:text-slate-100">
        {titulo}
      </h4>
      <div className="mt-3 space-y-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        {children}
      </div>
    </article>
  );
}

/** Recuadro de nota conceptual o "¡cuidado! trampa común". */
export function MiniHistoria({
  titulo,
  children,
}: {
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <aside className="rounded-xl border-l-4 border-amber-400 bg-amber-50/70 px-4 py-3 text-sm dark:border-amber-500 dark:bg-amber-950/20">
      <p className="font-semibold text-amber-900 dark:text-amber-200">
        🧠 {titulo}
      </p>
      <div className="mt-1 leading-relaxed text-amber-900/80 dark:text-amber-200/80">
        {children}
      </div>
    </aside>
  );
}
