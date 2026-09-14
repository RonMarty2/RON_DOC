import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { obtenerMateria } from "@content/materias";
import { HerramientaCard } from "@/components/HerramientaCard";
import { ListaLaminas } from "@/components/ListaLaminas";
import { TemaCard } from "@/components/TemaCard";
import { herramientasPublicadas, materiaPublicada, materiasPublicadas, temasPublicados } from "@/lib/publicado";
import { construirMetadata } from "@/lib/seo";

interface Params {
  slug: string;
}

// Sólo se generan las materias publicadas: las demás no existen en el sitio y GitHub Pages responde 404.
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return materiasPublicadas().map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const materia = obtenerMateria(slug);
  if (!materia || !materiaPublicada(materia)) return { title: "Página no encontrada", robots: { index: false } };
  return construirMetadata(materia.nombre, materia.descripcion);
}

export default async function MateriaPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const materia = obtenerMateria(slug);
  if (!materia || !materiaPublicada(materia)) notFound();

  const temas = temasPublicados(materia);
  const herramientas = herramientasPublicadas(materia);
  const aulas = herramientas.filter((h) => h.tipo !== "lamina");
  const laminas = herramientas.filter((h) => h.tipo === "lamina");

  return (
    <>
      <section className="border-b border-borde">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <Link href="/#aulas" className="text-sm font-semibold text-acento hover:text-acento-hover">
            ← Aulas
          </Link>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-acento">Materia</p>
          <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">{materia.nombre}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-tinta-media">{materia.descripcion}</p>
        </div>
      </section>

      {aulas.length > 0 && (
        <section className="mx-auto flex max-w-6xl flex-col gap-5 px-4 pt-12 sm:px-6 lg:px-8">
          {aulas.map((h) => (
            <HerramientaCard key={h.href} herramienta={h} />
          ))}
        </section>
      )}

      {laminas.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pt-12 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-semibold">Láminas, en orden</h2>
          <p className="mt-1 text-sm text-tinta-tenue">Cada una se apoya en la anterior.</p>
          <div className="mt-5">
            <ListaLaminas laminas={laminas} />
          </div>
        </section>
      )}

      {temas.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pt-12 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-semibold">Temas</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {temas.map((tema, i) => (
              <TemaCard key={tema.slug} tema={tema} slugMateria={materia.slug} numero={i + 1} />
            ))}
          </div>
        </section>
      )}

      <div className="h-16" />
    </>
  );
}
