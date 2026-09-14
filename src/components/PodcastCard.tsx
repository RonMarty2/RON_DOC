import type { Podcast } from "@/lib/types";

const PLATAFORMA: Record<Podcast["plataforma"], string> = {
  ivoox: "iVoox",
  youtube: "YouTube",
};

export function PodcastCard({ podcast }: { podcast: Podcast }) {
  return (
    <a
      href={podcast.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col rounded-2xl border border-borde bg-tarjeta p-5 transition hover:-translate-y-0.5 hover:border-borde-fuerte"
    >
      <div className="flex items-center justify-between text-xs">
        <span className="rounded-full bg-acento/10 px-2.5 py-0.5 font-semibold text-acento">
          {PLATAFORMA[podcast.plataforma]}
        </span>
        {podcast.duracion && <span className="text-tinta-tenue">{podcast.duracion}</span>}
      </div>
      <h3 className="mt-3 font-serif text-lg font-semibold leading-snug">{podcast.titulo}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-tinta-media">{podcast.descripcion}</p>
      <div className="mt-4 flex items-center justify-between text-xs text-tinta-tenue">
        {podcast.fecha && (
          <time dateTime={podcast.fecha}>
            {new Date(podcast.fecha).toLocaleDateString("es-BO", { year: "numeric", month: "long", day: "numeric" })}
          </time>
        )}
        <span className="font-semibold text-acento transition group-hover:translate-x-0.5">Escuchar →</span>
      </div>
    </a>
  );
}
