import Link from "next/link";
import { MATERIAS } from "@content/materias";
import { PODCASTS } from "@content/podcasts";
import { PROYECTOS } from "@content/proyectos";
import { TESIS_RESUMEN } from "@content/tesis";
import { MateriaCard } from "@/components/MateriaCard";
import { PodcastCard } from "@/components/PodcastCard";
import { ProyectoCard } from "@/components/ProyectoCard";
import { Avatar } from "@/components/Avatar";

export default function HomePage() {
  // Mostramos solo los 3 podcasts más recientes y los 3 primeros proyectos en la home.
  const podcastsRecientes = [...PODCASTS]
    .sort((a, b) => (b.fecha ?? "").localeCompare(a.fecha ?? ""))
    .slice(0, 3);
  const proyectosDestacados = PROYECTOS.slice(0, 3);

  const aniosTesis = Math.max(
    0,
    new Date().getFullYear() - TESIS_RESUMEN.desde
  );
  const totalTesis = TESIS_RESUMEN.tutorias + TESIS_RESUMEN.revisorias;

  return (
    <>
      {/* Hero editorial: avatar + nombre + tagline + CTAs */}
      <section className="relative overflow-hidden border-b border-slate-200 dark:border-slate-800">
        {/* Background sutil con acento ámbar */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-amber-50/50 via-white to-white dark:from-amber-950/10 dark:via-slate-950 dark:to-slate-950"
        />
        <div
          aria-hidden
          className="absolute -left-32 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-amber-400/15 blur-3xl dark:bg-amber-500/10"
        />

        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:gap-12">
            <Avatar iniciales="RM" tamanio={144} />
            <div className="flex-1">
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-400">
                Docente · Divulgador · Constructor
              </p>
              <h1 className="mt-3 max-w-3xl font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-slate-100">
                Mgr. Ronald Martínez Jiménez
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
                Material académico, herramientas educativas y conversaciones
                desde Cochabamba, Bolivia. Un único lugar donde encontrar todo
                lo que hago.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/proyectos"
                  className="rounded-full bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-700"
                >
                  Ver mis proyectos →
                </Link>
                <Link
                  href="/#materias"
                  className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                >
                  Materias
                </Link>
                <Link
                  href="/podcasts"
                  className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                >
                  Podcasts
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-b border-slate-200 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-900/40">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 py-8 sm:grid-cols-4 sm:px-6 lg:px-8">
          <Stat numero={MATERIAS.length} etiqueta="Materias" />
          <Stat numero={PROYECTOS.length} etiqueta="Apps activas" />
          <Stat numero={totalTesis} etiqueta="Tesis acompañadas" />
          <Stat numero={aniosTesis} etiqueta="Años de trayectoria" />
        </div>
      </section>

      {/* Proyectos destacados */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <Encabezado
          kicker="Proyectos"
          titulo="Apps y herramientas que mantengo"
          enlace={{ href: "/proyectos", texto: "Ver todos" }}
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {proyectosDestacados.map((p) => (
            <ProyectoCard key={p.slug} proyecto={p} />
          ))}
        </div>
      </section>

      {/* Materias */}
      <section
        id="materias"
        className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <Encabezado
          kicker="Cátedras"
          titulo="Materias que dicto"
          subtitulo="Material organizado por unidad, con casos, interactivos y descargables."
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {MATERIAS.map((m) => (
            <MateriaCard key={m.slug} materia={m} />
          ))}
        </div>
      </section>

      {/* Tesis (preview) */}
      <section className="border-y border-slate-200 bg-amber-50/30 dark:border-slate-800 dark:bg-amber-950/10">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <Encabezado
            kicker="Trabajos de grado"
            titulo="Acompañamiento académico"
            enlace={{ href: "/tesis", texto: "Ver áreas y enfoque" }}
          />
          <p className="mt-3 max-w-2xl text-slate-700 dark:text-slate-300">
            He acompañado trabajos de grado como tutor y revisor desde{" "}
            {TESIS_RESUMEN.desde}. Por respeto a estudiantes e instituciones,
            comparto sólo cifras agregadas y áreas de trabajo.
          </p>
        </div>
      </section>

      {/* Podcasts recientes */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <Encabezado
          kicker="Audio"
          titulo="Podcasts recientes"
          enlace={{ href: "/podcasts", texto: "Ver todos" }}
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {podcastsRecientes.map((p) => (
            <PodcastCard key={p.url + p.titulo} podcast={p} />
          ))}
        </div>
      </section>
    </>
  );
}

/* ---------- helpers locales de la home ---------- */

function Stat({ numero, etiqueta }: { numero: number; etiqueta: string }) {
  return (
    <div className="text-center">
      <p className="font-serif text-3xl font-semibold text-slate-900 sm:text-4xl dark:text-slate-100">
        {numero}
        <span className="text-amber-600">+</span>
      </p>
      <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {etiqueta}
      </p>
    </div>
  );
}

function Encabezado({
  kicker,
  titulo,
  subtitulo,
  enlace,
}: {
  kicker: string;
  titulo: string;
  subtitulo?: string;
  enlace?: { href: string; texto: string };
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-400">
          {kicker}
        </p>
        <h2 className="mt-2 font-serif text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">
          {titulo}
        </h2>
        {subtitulo && (
          <p className="mt-2 max-w-xl text-slate-600 dark:text-slate-400">
            {subtitulo}
          </p>
        )}
      </div>
      {enlace && (
        <Link
          href={enlace.href}
          className="text-sm font-semibold text-amber-700 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300"
        >
          {enlace.texto} →
        </Link>
      )}
    </div>
  );
}
