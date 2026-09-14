import fs from "node:fs/promises";
import path from "node:path";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { MATERIAS, obtenerTema } from "@content/materias";
import { Interactivo } from "@/components/Interactivo";
import { Recurso } from "@/components/Recurso";
import { temaPublicado, temasPublicados } from "@/lib/publicado";
import { construirMetadata } from "@/lib/seo";
import type { Materia } from "@/lib/types";

interface Params {
  slug: string;
  tema: string;
}

// Se generan todos: con `output: "export"` Next no acepta una lista vacía, y hoy ningún tema está publicado.
// Los que siguen siendo plantilla muestran el 404 y quedan fuera de los buscadores.
export function generateStaticParams(): Params[] {
  return MATERIAS.flatMap((m) => m.temas.map((t) => ({ slug: m.slug, tema: t.slug })));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug, tema } = await params;
  const r = obtenerTema(slug, tema);
  if (!r || !temaPublicado(r.materia, r.tema)) return { title: "Página no encontrada", robots: { index: false } };
  return construirMetadata(`${r.tema.titulo} · ${r.materia.nombre}`, r.tema.resumen);
}

async function leerMdx(slugMateria: string, archivoMdx: string): Promise<string> {
  return fs.readFile(path.join(process.cwd(), "content", "temas", slugMateria, `${archivoMdx}.mdx`), "utf8");
}

export default async function TemaPage({ params }: { params: Promise<Params> }) {
  const { slug, tema } = await params;
  const r = obtenerTema(slug, tema);
  if (!r || !temaPublicado(r.materia, r.tema)) notFound();

  const { materia, tema: t } = r;
  const fuente = await leerMdx(materia.slug, t.archivoMdx);

  return (
    <article>
      <section className="border-b border-borde">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <nav className="text-sm font-semibold text-acento">
            <Link href="/#aulas" className="hover:text-acento-hover">Aulas</Link>
            <span className="mx-1.5 text-tinta-tenue">/</span>
            <Link href={`/materias/${materia.slug}`} className="hover:text-acento-hover">
              {materia.nombre}
            </Link>
          </nav>
          <h1 className="mt-5 font-serif text-4xl font-semibold tracking-tight">{t.titulo}</h1>
          <p className="mt-3 text-lg leading-relaxed text-tinta-media">{t.resumen}</p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="prose max-w-none dark:prose-invert prose-headings:font-serif prose-a:text-acento">
          <MDXRemote source={fuente} />
        </div>

        {t.interactivos && t.interactivos.length > 0 && (
          <section className="mt-12">
            <h2 className="font-serif text-2xl font-semibold">Interactivos</h2>
            {t.interactivos.map((it) => (
              <Interactivo key={it.src} {...it} />
            ))}
          </section>
        )}

        {t.recursos && t.recursos.length > 0 && (
          <section className="mt-12">
            <h2 className="font-serif text-2xl font-semibold">Recursos descargables</h2>
            <div className="mt-4 space-y-3">
              {t.recursos.map((rc) => (
                <Recurso key={rc.archivo} {...rc} />
              ))}
            </div>
          </section>
        )}

        <NavTemas materia={materia} slugActual={t.slug} />
      </div>
    </article>
  );
}

function NavTemas({ materia, slugActual }: { materia: Materia; slugActual: string }) {
  const temas = temasPublicados(materia);
  const i = temas.findIndex((t) => t.slug === slugActual);
  const anterior = i > 0 ? temas[i - 1] : null;
  const siguiente = i < temas.length - 1 ? temas[i + 1] : null;
  if (!anterior && !siguiente) return null;

  const caja = "group flex-1 rounded-2xl border border-borde bg-tarjeta p-4 transition hover:border-borde-fuerte";
  return (
    <nav className="mt-16 flex items-stretch justify-between gap-4 border-t border-borde pt-6">
      {anterior ? (
        <Link href={`/materias/${materia.slug}/${anterior.slug}`} className={caja}>
          <span className="text-xs text-tinta-tenue">← Anterior</span>
          <p className="mt-1 font-serif font-semibold">{anterior.titulo}</p>
        </Link>
      ) : (
        <span className="flex-1" />
      )}
      {siguiente ? (
        <Link href={`/materias/${materia.slug}/${siguiente.slug}`} className={`${caja} text-right`}>
          <span className="text-xs text-tinta-tenue">Siguiente →</span>
          <p className="mt-1 font-serif font-semibold">{siguiente.titulo}</p>
        </Link>
      ) : (
        <span className="flex-1" />
      )}
    </nav>
  );
}
