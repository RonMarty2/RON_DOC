import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { MATERIAS, obtenerMateria } from "@content/materias";
import { COLORES } from "@/lib/colores";
import { TemaCard } from "@/components/TemaCard";
import { construirMetadata } from "@/lib/seo";

interface Params {
  slug: string;
}

export function generateStaticParams(): Params[] {
  return MATERIAS.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const materia = obtenerMateria(slug);
  if (!materia) return construirMetadata("Materia no encontrada");
  return construirMetadata(materia.nombre, materia.descripcion);
}

export default async function MateriaPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const materia = obtenerMateria(slug);
  if (!materia) notFound();

  const c = COLORES[materia.color];

  return (
    <>
      <section
        className={`border-b ${c.borde} ${c.bgSuave}`}
      >
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
          >
            ← Inicio
          </Link>
          <div className="mt-3 flex items-center gap-4">
            <span className="text-4xl" aria-hidden>
              {materia.icono}
            </span>
            <div>
              <p className={`font-mono text-xs font-semibold uppercase tracking-widest ${c.texto}`}>
                Materia · {materia.temas.length} temas
              </p>
              <h1 className="mt-1 font-serif text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
                {materia.nombre}
              </h1>
            </div>
          </div>
          <p className="mt-4 max-w-2xl text-slate-700 dark:text-slate-300">
            {materia.descripcion}
          </p>
        </div>
      </section>

      {materia.herramientas && materia.herramientas.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pt-12 sm:px-6 lg:px-8">
          <h2 className="font-serif text-xl font-semibold text-slate-900 dark:text-slate-100">
            Herramientas interactivas
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Apps para usar en clase o como práctica autónoma.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {materia.herramientas.map((h) => (
              <Link
                key={h.href}
                href={h.href}
                className={`group relative flex items-start gap-4 overflow-hidden rounded-2xl border ${c.borde} ${c.bgSuave} p-5 transition hover:-translate-y-0.5 hover:shadow-md`}
              >
                <div
                  aria-hidden
                  className={`absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br ${c.desde} ${c.hasta} opacity-15 blur-2xl transition group-hover:opacity-30`}
                />
                <span className="relative text-3xl" aria-hidden>
                  {h.icono}
                </span>
                <div className="relative min-w-0">
                  <p
                    className={`font-mono text-xs font-semibold uppercase tracking-widest ${c.texto}`}
                  >
                    Herramienta
                  </p>
                  <h3 className="mt-0.5 font-serif text-base font-semibold text-slate-900 dark:text-slate-100">
                    {h.titulo}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    {h.descripcion}
                  </p>
                  <p
                    className={`mt-2 inline-flex items-center gap-1 text-sm font-medium ${c.texto}`}
                  >
                    Abrir herramienta
                    <span
                      aria-hidden
                      className="transition group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="font-serif text-xl font-semibold text-slate-900 dark:text-slate-100">
          Temas
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {materia.temas.map((tema, i) => (
            <TemaCard
              key={tema.slug}
              tema={tema}
              slugMateria={materia.slug}
              color={materia.color}
              numero={i + 1}
            />
          ))}
        </div>
      </section>
    </>
  );
}
