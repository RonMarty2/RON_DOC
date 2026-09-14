import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ListaPodcasts } from "@/components/ListaPodcasts";
import { hayPodcasts } from "@/lib/publicado";
import { construirMetadata } from "@/lib/seo";

export const metadata: Metadata = hayPodcasts()
  ? construirMetadata("Podcasts", "Conversaciones y explicaciones cortas en iVoox y YouTube.")
  : { title: "Página no encontrada", robots: { index: false } };

export default function PodcastsPage() {
  if (!hayPodcasts()) notFound();

  return (
    <>
      <section className="border-b border-borde">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-acento">Podcasts</p>
          <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">Episodios</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-tinta-media">
            Conversaciones y explicaciones cortas en iVoox y YouTube. Cada tarjeta abre el episodio
            en su plataforma.
          </p>
        </div>
      </section>
      <ListaPodcasts />
    </>
  );
}
