import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ISLAS } from "@content/islas";
import { MATERIAS, obtenerMateria } from "@content/materias";
import { HerramientaCard } from "@/components/HerramientaCard";
import { ListaLaminas } from "@/components/ListaLaminas";
import { TemaCard } from "@/components/TemaCard";
import { juegoDeMateria, revisarJuegos } from "@/lib/juegos";
import { paraEstudiar, paraPracticar, temasPublicados } from "@/lib/publicado";
import { construirMetadata } from "@/lib/seo";

interface Params {
  slug: string;
}

export const dynamicParams = false;

// Todas las materias tienen su página (27-09): lo que todavía no existe dice «En construcción».
export function generateStaticParams(): Params[] {
  revisarJuegos(ISLAS, MATERIAS);
  return MATERIAS.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const materia = obtenerMateria(slug);
  if (!materia) return { title: "Página no encontrada", robots: { index: false } };
  return construirMetadata(materia.nombre, materia.descripcion, `materia-${materia.slug}`);
}

export default async function MateriaPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const materia = obtenerMateria(slug);
  if (!materia) notFound();

  const estudiar = paraEstudiar(materia);
  const aulas = estudiar.filter((h) => h.tipo !== "lamina");
  const laminas = estudiar.filter((h) => h.tipo === "lamina");
  const temas = temasPublicados(materia);
  const practicar = paraPracticar(materia);
  const juego = juegoDeMateria(materia, ISLAS);

  return (
    <>
      <section className="border-b border-borde">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <Link href="/#materias" className="text-sm font-semibold text-acento hover:text-acento-hover">
            ← Materias
          </Link>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-acento">Materia</p>
          <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">{materia.nombre}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-tinta-media">{materia.descripcion}</p>
          <nav aria-label="Secciones de la materia" className="mt-6 flex flex-wrap gap-2">
            {["Estudiar", "Jugar", "Practicar"].map((s) => (
              <a key={s} href={`#${s.toLowerCase()}`} className="rounded-full border border-borde-fuerte px-4 py-1.5 text-sm font-semibold hover:bg-papel-suave">
                {s}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <Seccion id="estudiar" numero={1} titulo="Estudiar">
        {aulas.length + laminas.length + temas.length === 0 ? (
          <EnConstruccion />
        ) : (
          <div className="flex flex-col gap-6">
            {aulas.map((h) => (
              <HerramientaCard key={h.href} herramienta={h} />
            ))}
            {laminas.length > 0 && <ListaLaminas laminas={laminas} />}
            {temas.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2">
                {temas.map((tema, i) => (
                  <TemaCard key={tema.slug} tema={tema} slugMateria={materia.slug} numero={i + 1} />
                ))}
              </div>
            )}
          </div>
        )}
      </Seccion>

      <Seccion id="jugar" numero={2} titulo="Jugar">
        {!juego ? (
          <EnConstruccion />
        ) : (
          <div className="flex flex-col gap-4">
            <p className="max-w-2xl leading-relaxed text-tinta-media">
              <strong className="text-tinta">{juego.isla.nombre}.</strong> {juego.isla.descripcion}
            </p>
            <ol className="flex flex-col gap-3">
              {juego.filas.map((f, i) => (
                <li
                  key={f.tema?.numero ?? `sin-tema-${i}`}
                  className="flex flex-col gap-2 rounded-2xl border border-borde bg-tarjeta p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    {f.tema && <p className="text-xs font-bold uppercase tracking-[0.08em] text-tinta-tenue">Tema {f.tema.numero}</p>}
                    <p className="font-serif text-lg font-semibold leading-snug">{f.tema?.titulo ?? f.juego?.titulo}</p>
                    {f.tema && f.juego && <p className="text-sm text-tinta-media">{f.juego.titulo}</p>}
                  </div>
                  {f.juego ? (
                    <Link
                      href={f.juego.href}
                      className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full bg-acento px-4 py-2 text-sm font-semibold text-acento-texto hover:bg-acento-hover"
                    >
                      {f.juego.borrador ? "Jugar (en prueba)" : "Jugar"} <span aria-hidden>→</span>
                    </Link>
                  ) : (
                    <span className="w-fit shrink-0 rounded-full border border-borde px-3 py-1 text-xs text-tinta-tenue">En construcción</span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        )}
      </Seccion>

      <Seccion id="practicar" numero={3} titulo="Practicar">
        {practicar.length === 0 ? (
          <EnConstruccion />
        ) : (
          <div className="flex flex-col gap-5">
            {practicar.map((h) => (
              <HerramientaCard key={h.href} herramienta={h} />
            ))}
          </div>
        )}
      </Seccion>

      <div className="h-16" />
    </>
  );
}

function Seccion({ id, numero, titulo, children }: { id: string; numero: number; titulo: string; children: ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-20 px-4 pt-12 sm:px-6 lg:px-8">
      <h2 className="flex items-center gap-3 font-serif text-2xl font-semibold">
        <span className="flex size-8 items-center justify-center rounded-full bg-acento text-sm font-bold text-acento-texto">{numero}</span>
        {titulo}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function EnConstruccion() {
  return (
    <p className="rounded-2xl border border-dashed border-borde-fuerte px-5 py-4 text-sm text-tinta-tenue">
      En construcción: esta parte de la materia se publica aquí cuando esté lista.
    </p>
  );
}
