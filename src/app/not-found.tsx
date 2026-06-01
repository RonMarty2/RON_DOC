import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-start gap-4 px-4 py-24 sm:px-6">
      <p className="font-mono text-xs font-semibold uppercase tracking-widest text-slate-500">
        Error 404
      </p>
      <h1 className="font-serif text-3xl font-semibold text-slate-900 dark:text-slate-100">
        Página no encontrada
      </h1>
      <p className="text-slate-600 dark:text-slate-400">
        La ruta que buscás no existe o fue removida. Volvé al inicio para seguir
        navegando.
      </p>
      <Link
        href="/"
        className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
      >
        ← Volver al inicio
      </Link>
    </section>
  );
}
