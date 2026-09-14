"use client";

import { useState } from "react";
import { PODCASTS } from "@content/podcasts";
import { PodcastCard } from "@/components/PodcastCard";

type Filtro = "todos" | "ivoox" | "youtube";

const OPCIONES: { id: Filtro; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "ivoox", label: "iVoox" },
  { id: "youtube", label: "YouTube" },
];

export function ListaPodcasts() {
  const [filtro, setFiltro] = useState<Filtro>("todos");
  const listados = (filtro === "todos" ? PODCASTS : PODCASTS.filter((p) => p.plataforma === filtro))
    .slice()
    .sort((a, b) => (b.fecha ?? "").localeCompare(a.fecha ?? ""));

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center gap-2">
        {OPCIONES.map((op) => {
          const activo = filtro === op.id;
          return (
            <button
              key={op.id}
              type="button"
              onClick={() => setFiltro(op.id)}
              aria-pressed={activo}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-semibold transition ${
                activo ? "border-acento bg-acento text-acento-texto" : "border-borde bg-tarjeta text-tinta-media hover:bg-papel-suave"
              }`}
            >
              {op.label}
            </button>
          );
        })}
        <p className="ml-auto text-sm text-tinta-tenue">
          {listados.length} episodio{listados.length === 1 ? "" : "s"}
        </p>
      </div>

      {listados.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-dashed border-borde-fuerte p-10 text-center text-tinta-tenue">
          Todavía no hay episodios en esta plataforma.
        </p>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {listados.map((p) => (
            <PodcastCard key={p.url + p.titulo} podcast={p} />
          ))}
        </div>
      )}
    </section>
  );
}
