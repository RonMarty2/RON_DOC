/**
 * Componentes de presentación reutilizados por los módulos.
 *
 * Patrón de libro: definir primero (Definicion, sin ejemplo todavía),
 * ejemplificar después (siempre con un componente interactivo aparte).
 */

/** Definición formal de un término — estilo libro, sin caja de color. */
export function Definicion({
  termino,
  children,
}: {
  termino: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-l-4 border-slate-800 pl-4 dark:border-slate-200">
      <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
        Definición
      </p>
      <p className="mt-0.5 font-serif text-lg font-semibold text-slate-900 dark:text-slate-100">
        {termino}
      </p>
      <p className="mt-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        {children}
      </p>
    </div>
  );
}

/** Nota conceptual corta (distinción entre dos términos que se confunden). */
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
