import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { AREAS_TESIS, ENFOQUE_TUTORIA, TESIS_RESUMEN } from "@content/tesis";
import { hayTesis } from "@/lib/publicado";
import { construirMetadata } from "@/lib/seo";

export const metadata: Metadata = hayTesis()
  ? construirMetadata("Tesis dirigidas", "Resumen del acompañamiento de trabajos de grado por área temática.")
  : { title: "Página no encontrada", robots: { index: false } };

export default function TesisPage() {
  if (!hayTesis()) notFound();

  const anios = Math.max(0, new Date().getFullYear() - TESIS_RESUMEN.desde);

  return (
    <>
      <section className="border-b border-borde">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-acento">Trabajos de grado</p>
          <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
            Tesis dirigidas y revisadas
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-tinta-media">
            Acompaño trabajos de grado desde {TESIS_RESUMEN.desde}. Por respeto a la privacidad de
            estudiantes e instituciones, aquí sólo hay cifras agregadas y áreas temáticas.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          <Cifra valor={TESIS_RESUMEN.tutorias} etiqueta="Tutorías" />
          <Cifra valor={TESIS_RESUMEN.revisorias} etiqueta="Revisorías" />
          <Cifra valor={anios} etiqueta="Años acompañando trabajos" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl font-semibold">Áreas temáticas</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {AREAS_TESIS.filter((a) => a.cantidad > 0).map((a) => (
            <div key={a.nombre} className="rounded-2xl border border-borde bg-tarjeta p-5">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-serif text-lg font-semibold">{a.nombre}</h3>
                <span className="shrink-0 rounded-full bg-acento/10 px-2.5 py-0.5 text-xs font-semibold text-acento">
                  {a.cantidad} {a.cantidad === 1 ? "trabajo" : "trabajos"}
                </span>
              </div>
              {a.descripcion && <p className="mt-2 text-sm leading-relaxed text-tinta-media">{a.descripcion}</p>}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <h2 className="font-serif text-3xl font-semibold">Cómo trabajo</h2>
        <div className="mt-4 space-y-4 leading-relaxed text-tinta-media">
          {ENFOQUE_TUTORIA.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>
    </>
  );
}

function Cifra({ valor, etiqueta }: { valor: number; etiqueta: string }) {
  return (
    <div className="rounded-2xl border border-borde bg-tarjeta px-5 py-6 text-center">
      <p className="font-serif text-5xl font-semibold text-acento">{valor}</p>
      <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-tinta-tenue">{etiqueta}</p>
    </div>
  );
}
