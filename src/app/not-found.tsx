import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-start gap-4 px-4 py-24 sm:px-6">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-acento">Error 404</p>
      <h1 className="font-serif text-4xl font-semibold">Página no encontrada</h1>
      <p className="leading-relaxed text-tinta-media">
        La ruta que buscas no existe o todavía no tiene contenido. Vuelve al inicio para seguir
        navegando.
      </p>
      <Link
        href="/"
        className="rounded-full bg-acento px-5 py-2.5 text-sm font-semibold text-acento-texto transition hover:bg-acento-hover"
      >
        ← Volver al inicio
      </Link>
    </section>
  );
}
