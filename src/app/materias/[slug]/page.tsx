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
