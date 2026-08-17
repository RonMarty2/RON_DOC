import Link from "next/link";
import type { Metadata } from "next";
import { AulaProbabilidad } from "@/components/aula-probabilidad/AulaProbabilidad";
import { construirMetadata } from "@/lib/seo";

export const metadata: Metadata = construirMetadata(
  "Aula Interactiva de Probabilidad",
  "Una clase magistral en vivo: del espacio muestral al Teorema de Bayes, con dados clásicos y un dataset real de 200 estudiantes tamizados en salud mental."
);

export default function AulaProbabilidadPage() {
  return (
    <>
      {/* Hero con acento azul (color de Psicoestadística) */}
      <section className="border-b border-blue-200 bg-gradient-to-b from-blue-50/70 to-white dark:border-blue-900 dark:from-blue-950/30 dark:to-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <nav className="text-sm text-slate-600 dark:text-slate-400">
            <Link href="/" className="hover:underline">
              Inicio
            </Link>
            <span className="mx-1.5">/</span>
            <Link
              href="/materias/psicoestadistica"
              className="hover:underline"
            >
              Psicoestadística Descriptiva
            </Link>
          </nav>
          <div className="mt-4 flex items-start gap-4">
            <span className="text-4xl" aria-hidden>
              🎲
            </span>
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-blue-700 dark:text-blue-300">
                Herramienta interactiva
              </p>
              <h1 className="mt-1 font-serif text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
                Aula Interactiva de Probabilidad
              </h1>
              <p className="mt-3 max-w-2xl text-slate-700 dark:text-slate-300">
                Una clase magistral en vivo. Tus estudiantes votan con su
                intuición, se equivocan en grupo y descubren la verdad con
                simulaciones visuales — desde la probabilidad simple hasta el
                Teorema de Bayes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Herramienta */}
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <AulaProbabilidad />
      </section>
    </>
  );
}
