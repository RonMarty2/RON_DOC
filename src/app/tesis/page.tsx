import type { Metadata } from "next";
import { AREAS_TESIS, ENFOQUE_TUTORIA, TESIS_RESUMEN } from "@content/tesis";
import { construirMetadata } from "@/lib/seo";

export const metadata: Metadata = construirMetadata(
  "Tesis dirigidas",
  "Resumen del acompañamiento de trabajos de grado por área temática."
);

export default function TesisPage() {
  const total = TESIS_RESUMEN.tutorias + TESIS_RESUMEN.revisorias;
  const anios = Math.max(0, new Date().getFullYear() - TESIS_RESUMEN.desde);

  return (
    <>
      <section className="border-b border-slate-200 bg-gradient-to-b from-amber-50/40 to-white dark:border-slate-800 dark:from-amber-950/10 dark:to-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-400">
            Trabajos de grado
          </p>
          <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
            Tesis dirigidas y revisadas
          </h1>
          <p className="mt-3 max-w-2xl text-slate-700 dark:text-slate-300">
            Acompaño trabajos de grado desde {TESIS_RESUMEN.desde}. Por
            respeto a la privacidad de los estudiantes y las instituciones,
            esta página presenta sólo cifras agregadas y áreas temáticas, no
            datos individuales.
          </p>
        </div>
      </section>

      {/* Stats agregadas */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          <Stat valor={TESIS_RESUMEN.tutorias} etiqueta="Tutorías" />
          <Stat valor={TESIS_RESUMEN.revisorias} etiqueta="Revisorías" />
          <Stat valor={anios} etiqueta="Años acompañando trabajos" />
        </div>
        {total === 0 && (
          <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-500">
            (Actualizá <code>content/tesis.ts</code> con tus cifras reales.)
          </p>
        )}
      </section>

      {/* Áreas */}
      <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <h2 className="font-serif text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Áreas temáticas
        </h2>
        <p className="mt-1 text-slate-600 dark:text-slate-400">
          Líneas de trabajo en las que más he acompañado a estudiantes.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {AREAS_TESIS.map((a) => (
            <div
              key={a.nombre}
              className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-serif text-base font-semibold text-slate-900 dark:text-slate-100">
                  {a.nombre}
                </h3>
                <span className="shrink-0 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700 dark:bg-amber-950/30 dark:text-amber-300">
                  {a.cantidad} {a.cantidad === 1 ? "trabajo" : "trabajos"}
                </span>
              </div>
              {a.descripcion && (
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  {a.descripcion}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Enfoque */}
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <h2 className="font-serif text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Cómo trabajo
        </h2>
        <div className="prose prose-slate mt-4 max-w-none dark:prose-invert prose-headings:font-serif">
          {ENFOQUE_TUTORIA.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>
    </>
  );
}

function Stat({ valor, etiqueta }: { valor: number; etiqueta: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-5 py-6 text-center dark:border-slate-800 dark:bg-slate-900">
      <p className="font-serif text-4xl font-semibold text-amber-700 dark:text-amber-400">
        {valor}
        <span className="text-amber-500/60">+</span>
      </p>
      <p className="mt-1 text-sm font-medium uppercase tracking-wider text-slate-600 dark:text-slate-400">
        {etiqueta}
      </p>
    </div>
  );
}
