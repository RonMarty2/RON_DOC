import Link from "next/link";
import type { Metadata } from "next";
import { MATERIAS } from "@content/materias";
import { construirMetadata } from "@/lib/seo";

export const metadata: Metadata = construirMetadata(
  "Sobre mí",
  "Bio del Mgr. Ronald Martínez Jiménez, docente universitario en Cochabamba, Bolivia."
);

export default function SobreMiPage() {
  return (
    <>
      <section className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Sobre mí
          </p>
          <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
            Mgr. Ronald Martínez Jiménez
          </h1>
          <p className="mt-3 text-slate-700 dark:text-slate-300">
            Docente universitario en Cochabamba, Bolivia.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="prose prose-slate max-w-none dark:prose-invert prose-headings:font-serif">
          <h2>Bio</h2>
          <p>
            [CONTENIDO PENDIENTE] Aquí va una bio corta: formación académica,
            experiencia docente, áreas de especialización y líneas de investigación.
            Reemplazá este texto en <code>src/app/sobre-mi/page.tsx</code>.
          </p>

          <h2>Materias que dicto</h2>
          <ul>
            {MATERIAS.map((m) => (
              <li key={m.slug}>
                <Link href={`/materias/${m.slug}`}>
                  {m.icono} {m.nombre}
                </Link>{" "}
                — {m.descripcion}
              </li>
            ))}
          </ul>

          <h2>Enlaces</h2>
          <ul>
            <li>
              <a href="https://www.ivoox.com/" target="_blank" rel="noopener noreferrer">
                Podcast en iVoox
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
                Canal en YouTube
              </a>
            </li>
            <li>
              [CONTENIDO PENDIENTE] LinkedIn, ResearchGate, ORCID, etc.
            </li>
          </ul>

          <h2>Contacto</h2>
          <p>
            [CONTENIDO PENDIENTE] Email institucional u horario de consultas.
          </p>
        </div>
      </section>
    </>
  );
}
