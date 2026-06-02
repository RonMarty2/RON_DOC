import type { Metadata } from "next";
import { PROYECTOS } from "@content/proyectos";
import { ProyectoCard } from "@/components/ProyectoCard";
import { construirMetadata } from "@/lib/seo";

export const metadata: Metadata = construirMetadata(
  "Proyectos",
  "Apps, herramientas y sitios desarrollados por Ronald Martínez Jiménez."
);

export default function ProyectosPage() {
  return (
    <>
      <section className="border-b border-slate-200 bg-gradient-to-b from-amber-50/40 to-white dark:border-slate-800 dark:from-amber-950/10 dark:to-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-400">
            Proyectos
          </p>
          <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
            Apps y herramientas que mantengo
          </h1>
          <p className="mt-3 max-w-2xl text-slate-700 dark:text-slate-300">
            Una colección de proyectos personales: simuladores, generadores y
            utilitarios académicos. Cada tarjeta abre el proyecto en una
            pestaña nueva.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROYECTOS.map((p) => (
            <ProyectoCard key={p.slug} proyecto={p} />
          ))}
        </div>
      </section>
    </>
  );
}
