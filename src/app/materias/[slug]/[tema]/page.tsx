import fs from "node:fs/promises";
import path from "node:path";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { MATERIAS, obtenerTema } from "@content/materias";
import { COLORES } from "@/lib/colores";
import { Interactivo } from "@/components/Interactivo";
import { Recurso } from "@/components/Recurso";
import { construirMetadata } from "@/lib/seo";

interface Params {
  slug: string;
  tema: string;
}

export function generateStaticParams(): Params[] {
  return MATERIAS.flatMap((m) =>
    m.temas.map((t) => ({ slug: m.slug, tema: t.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug, tema } = await params;
  const r = obtenerTema(slug, tema);
  if (!r) return construirMetadata("Tema no encontrado");
  return construirMetadata(`${r.tema.titulo} — ${r.materia.nombre}`, r.tema.resumen);
}

async function leerMdx(slugMateria: string, archivoMdx: string): Promise<string> {
  const ruta = path.join(
    process.cwd(),
    "content",
    "temas",
    slugMateria,
    `${archivoMdx}.mdx`
  );
  return fs.readFile(ruta, "utf8");
}

export default async function TemaPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug, tema } = await params;
  const r = obtenerTema(slug, tema);
  if (!r) notFound();

  const { materia, tema: t } = r;
  const c = COLORES[materia.color];
  const fuente = await leerMdx(materia.slug, t.archivoMdx);

  return (
    <article>
      <section className={`border-b ${c.borde} ${c.bgSuave}`}>
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <nav className="text-sm text-slate-600 dark:text-slate-400">
            <Link href="/" className="hover:underline">Inicio</Link>
            <span className="mx-1.5">/</span>
            <Link href={`/materias/${materia.slug}`} className="hover:underline">
              {materia.nombre}
            </Link>
          </nav>
          <p className={`mt-4 font-mono text-xs font-semibold uppercase tracking-widest ${c.texto}`}>
            {materia.icono} {materia.nombre}
          </p>
          <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
            {t.titulo}
          </h1>
          <p className="mt-3 text-slate-700 dark:text-slate-300">{t.resumen}</p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        {/* Contenido MDX */}
        <div className="prose prose-slate max-w-none dark:prose-invert prose-headings:font-serif prose-a:text-blue-600 dark:prose-a:text-blue-400">
          <MDXRemote source={fuente} />
        </div>

        {/* Interactivos */}
        {t.interactivos && t.interactivos.length > 0 && (
          <section className="mt-12">
            <h2 className="font-serif text-xl font-semibold text-slate-900 dark:text-slate-100">
              Interactivos
            </h2>
            {t.interactivos.map((it) => (
              <Interactivo key={it.src} {...it} />
            ))}
          </section>
        )}

        {/* Recursos descargables */}
        {t.recursos && t.recursos.length > 0 && (
          <section className="mt-12">
            <h2 className="font-serif text-xl font-semibold text-slate-900 dark:text-slate-100">
              Recursos descargables
            </h2>
            <div className="mt-4 space-y-3">
              {t.recursos.map((rc) => (
                <Recurso key={rc.archivo} {...rc} />
              ))}
            </div>
          </section>
        )}

        {/* Navegación entre temas */}
        <NavTemas slugMateria={materia.slug} slugActual={t.slug} />
      </div>
    </article>
  );
}

function NavTemas({
  slugMateria,
  slugActual,
}: {
  slugMateria: string;
  slugActual: string;
}) {
  const materia = MATERIAS.find((m) => m.slug === slugMateria);
  if (!materia) return null;
  const i = materia.temas.findIndex((t) => t.slug === slugActual);
  const anterior = i > 0 ? materia.temas[i - 1] : null;
  const siguiente = i < materia.temas.length - 1 ? materia.temas[i + 1] : null;
  if (!anterior && !siguiente) return null;

  return (
    <nav className="mt-16 flex items-stretch justify-between gap-4 border-t border-slate-200 pt-6 dark:border-slate-800">
      {anterior ? (
        <Link
          href={`/materias/${slugMateria}/${anterior.slug}`}
          className="group flex-1 rounded-lg border border-slate-200 p-4 transition hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700"
        >
          <span className="text-xs text-slate-500 dark:text-slate-500">← Anterior</span>
          <p className="mt-1 font-serif text-sm font-semibold text-slate-900 dark:text-slate-100">
            {anterior.titulo}
          </p>
        </Link>
      ) : (
        <span className="flex-1" />
      )}
      {siguiente ? (
        <Link
          href={`/materias/${slugMateria}/${siguiente.slug}`}
          className="group flex-1 rounded-lg border border-slate-200 p-4 text-right transition hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700"
        >
          <span className="text-xs text-slate-500 dark:text-slate-500">Siguiente →</span>
          <p className="mt-1 font-serif text-sm font-semibold text-slate-900 dark:text-slate-100">
            {siguiente.titulo}
          </p>
        </Link>
      ) : (
        <span className="flex-1" />
      )}
    </nav>
  );
}
