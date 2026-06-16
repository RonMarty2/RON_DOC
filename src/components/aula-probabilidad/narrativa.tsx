/**
 * Hilo narrativo "La duda de Andrea" + mini-historias de psicología.
 * Componentes de presentación reutilizados por los módulos.
 */

/** Recuadro de caso narrativo (Andrea / Daniela), tono humano. */
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
        La duda de Andrea
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

/** Recuadro de "mini-historia de psicología" (los sesgos del preludio). */
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

/** Texto puente entre el Preludio y la Construcción. */
export function PuenteSecciones() {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-6 text-center text-white sm:p-8">
      <p className="font-serif text-lg font-semibold sm:text-xl">
        Tres veces les falló la intuición.
      </p>
      <p className="mt-2 text-blue-100">
        Ahora aprendamos a pensar la probabilidad bien, paso a paso — con un
        grupo real de 60 estudiantes.
      </p>
    </div>
  );
}
