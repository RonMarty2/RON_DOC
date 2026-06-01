"use client";

import { useMemo, useState } from "react";
import { PODCASTS } from "@content/podcasts";
import { PodcastCard } from "@/components/PodcastCard";

type Filtro = "todos" | "ivoox" | "youtube";

const OPCIONES: { id: Filtro; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "ivoox", label: "iVoox" },
  { id: "youtube", label: "YouTube" },
];

export default function PodcastsPage() {
  const [filtro, setFiltro] = useState<Filtro>("todos");

  const listados = useMemo(() => {
    const arr = filtro === "todos"
      ? PODCASTS
      : PODCASTS.filter((p) => p.plataforma === filtro);
    return [...arr].sort((a, b) => (b.fecha ?? "").localeCompare(a.fecha ?? ""));
  }, [filtro]);

  return (
    <>
      <section className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Podcasts
          </p>
          <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
            Episodios
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
            Conversaciones y explicaciones cortas alojadas en iVoox y YouTube.
            Hacé clic en cualquier tarjeta para abrir el episodio en la plataforma.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2">
          {OPCIONES.map((op) => {
            const activo = filtro === op.id;
            return (
              <button
                key={op.id}
                type="button"
                onClick={() => setFiltro(op.id)}
                className={
                  "rounded-full border px-3 py-1.5 text-sm font-medium transition " +
                  (activo
                    ? "border-slate-900 bg-slate-900 text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-900"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800")
                }
                aria-pressed={activo}
              >
                {op.label}
              </button>
            );
          })}
          <p className="ml-auto text-sm text-slate-500 dark:text-slate-500">
            {listados.length} episodio{listados.length === 1 ? "" : "s"}
          </p>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {listados.map((p) => (
            <PodcastCard key={p.url + p.titulo} podcast={p} />
          ))}
        </div>
      </section>
    </>
  );
}
