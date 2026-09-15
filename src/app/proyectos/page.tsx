import type { Metadata } from "next";
import { PROYECTOS } from "@content/proyectos";
import { ProyectoCard } from "@/components/ProyectoCard";
import { construirMetadata } from "@/lib/seo";

export const metadata: Metadata = construirMetadata(
  "Proyectos",
  "Apps educativas desarrolladas por Ronald Martínez Jiménez.",
  "proyectos"
);

export default function ProyectosPage() {
  return (
    <>
      <section className="border-b border-borde">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-acento">Proyectos</p>
          <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
            Otras apps con las que enseño
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-tinta-media">
            Viven en su propio sitio. Cada tarjeta abre la app en una pestaña nueva.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2">
          {PROYECTOS.map((p) => (
            <ProyectoCard key={p.slug} proyecto={p} />
          ))}
        </div>
      </section>
    </>
  );
}
