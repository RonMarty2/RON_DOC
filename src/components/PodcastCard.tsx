import type { Podcast } from "@/lib/types";

const ETIQUETAS: Record<Podcast["plataforma"], { label: string; clase: string }> = {
  ivoox: {
    label: "iVoox",
    clase:
      "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/30 dark:text-orange-300 dark:border-orange-800",
  },
  youtube: {
    label: "YouTube",
    clase:
      "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-300 dark:border-red-800",
  },
};

export function PodcastCard({ podcast }: { podcast: Podcast }) {
  const etiqueta = ETIQUETAS[podcast.plataforma];
  return (
    <a
      href={podcast.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
    >
      <div className="flex items-center justify-between">
        <span
          className={`rounded-full border px-2 py-0.5 text-xs font-medium ${etiqueta.clase}`}
        >
          {etiqueta.label}
        </span>
        {podcast.duracion && (
          <span className="text-xs text-slate-500 dark:text-slate-500">
            {podcast.duracion}
          </span>
        )}
      </div>
      <h3 className="mt-3 font-serif text-base font-semibold text-slate-900 dark:text-slate-100">
        {podcast.titulo}
      </h3>
      <p className="mt-2 flex-1 text-sm text-slate-600 dark:text-slate-400">
        {podcast.descripcion}
      </p>
      <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-500">
        {podcast.fecha && (
          <time dateTime={podcast.fecha}>
            {new Date(podcast.fecha).toLocaleDateString("es-BO", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        )}
        <span className="font-medium text-slate-700 transition group-hover:translate-x-0.5 dark:text-slate-300">
          Escuchar →
        </span>
      </div>
    </a>
  );
}
