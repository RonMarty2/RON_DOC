import Link from "next/link";
import type { Metadata } from "next";
import { metadataDeHerramienta } from "@/lib/seo";
import { HojaPractica } from "./HojaPractica";

// Título, descripción e imagen para compartir salen de content/materias.ts; mientras sea borrador, no se indexa.
export const metadata: Metadata = metadataDeHerramienta("/practica-financiera");

export default function PracticaFinancieraPage() {
  return (
    <>
      <section className="border-b border-borde print:hidden">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <nav className="text-sm font-semibold text-acento">
            <Link href="/#aulas" className="hover:text-acento-hover">Aulas</Link>
            <span className="mx-1.5 text-tinta-tenue">/</span>
            <Link href="/materias/matematica-financiera" className="hover:text-acento-hover">
              Matemática Financiera
            </Link>
          </nav>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-acento">Hoja de práctica · Para imprimir</p>
          <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">Hoja de práctica</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-tinta-media">
            Los ejercicios de las cinco láminas, con otros números en cada versión y la hoja de respuestas explicada.
            Los cálculos salen de las mismas funciones probadas que usan las láminas.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-10 print:max-w-none print:p-0 sm:px-6 lg:px-8">
        <HojaPractica />
      </section>
    </>
  );
}
