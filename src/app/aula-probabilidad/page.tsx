import Link from "next/link";
import type { Metadata } from "next";
import { AulaProbabilidad } from "@/components/aula-probabilidad/AulaProbabilidad";
import { construirMetadata } from "@/lib/seo";

export const metadata: Metadata = construirMetadata(
  "Aula Interactiva de Probabilidad",
  "Unidad 2 de Psicoestadística Inferencial: del espacio muestral a la distribución normal. Cada concepto se define y se comprueba sobre 200 fichas reales."
);

export default function AulaProbabilidadPage() {
  return (
    <>
      <section className="border-b border-borde">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <nav className="text-sm font-semibold text-acento">
            <Link href="/#aulas" className="hover:text-acento-hover">Aulas</Link>
            <span className="mx-1.5 text-tinta-tenue">/</span>
            <Link href="/materias/psicoestadistica-inferencial" className="hover:text-acento-hover">
              Psicoestadística Inferencial
            </Link>
          </nav>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-acento">Aula interactiva · Unidad 2</p>
          <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
            Aula Interactiva de Probabilidad
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-tinta-media">
            Cada concepto se define primero y se comprueba después: tiras los dados, tamizas las
            fichas y ves el cálculo armarse solo. Sirve tanto proyectada en clase como para estudiar
            por tu cuenta.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <AulaProbabilidad />
      </section>
    </>
  );
}
