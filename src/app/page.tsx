import Link from "next/link";
import { MATERIAS } from "@content/materias";
import { PODCASTS } from "@content/podcasts";
import { MateriaCard } from "@/components/MateriaCard";
import { PodcastCard } from "@/components/PodcastCard";

export default function HomePage() {
  // Mostramos solo los 3 podcasts más recientes en la home.
  const podcastsRecientes = [...PODCASTS]
    .sort((a, b) => (b.fecha ?? "").localeCompare(a.fecha ?? ""))
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white dark:border-slate-800 dark:from-slate-950 dark:to-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Sitio académico personal
          </p>
          <h1 className="mt-3 max-w-3xl font-serif text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-slate-100">
            Mgr. Ronald Martínez Jiménez
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            Docente universitario en Cochabamba, Bolivia. Aquí publico el material
            de mis materias: apuntes, casos de estudio, recursos descargables y
            componentes interactivos.
          </p>
        </div>
      </section>

      {/* Materias */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
              Materias
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Las cuatro materias que dicto este semestre.
            </p>
          </div>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {MATERIAS.map((m) => (
            <MateriaCard key={m.slug} materia={m} />
          ))}
        </div>
      </section>

      {/* Podcasts destacados */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
              Podcasts recientes
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Conversaciones y explicaciones cortas en iVoox y YouTube.
            </p>
          </div>
          <Link
            href="/podcasts"
            className="hidden text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white sm:inline-flex"
          >
            Ver todos →
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {podcastsRecientes.map((p) => (
            <PodcastCard key={p.url + p.titulo} podcast={p} />
          ))}
        </div>
        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/podcasts"
            className="text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Ver todos los episodios →
          </Link>
        </div>
      </section>
    </>
  );
}
