import type { Metadata } from "next";
import { ISLAS } from "@content/islas";
import { MATERIAS } from "@content/materias";
import { HerramientaCard } from "@/components/HerramientaCard";
import { islasConJuegos } from "@/lib/juegos";
import { hayJuegos } from "@/lib/publicado";
import { construirMetadata } from "@/lib/seo";

const DESCRIPCION =
  "Cada materia es una isla con casos que se resuelven calculando: si el número está mal, la empresa lo paga.";

// Mientras ningún juego esté publicado, la página existe sólo como vista previa del docente:
// no se enlaza, no se indexa y muestra también los juegos en borrador.
export const metadata: Metadata = hayJuegos()
  ? construirMetadata("Juegos", DESCRIPCION)
  : { title: "Juegos (vista previa)", robots: { index: false, follow: false } };

export default function JuegosPage() {
  const vistaPrevia = !hayJuegos();
  const islas = islasConJuegos(ISLAS, MATERIAS, { incluirBorradores: vistaPrevia });

  return (
    <>
      <section className="border-b border-borde">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-acento">Juegos</p>
          <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">Las islas</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-tinta-media">{DESCRIPCION}</p>
          {vistaPrevia && (
            <p className="mt-6 max-w-2xl rounded-xl border border-aviso/40 bg-aviso/10 px-4 py-3 text-sm leading-relaxed">
              <strong>Vista previa del docente.</strong> Los estudiantes todavía no ven esta página: aparece
              en el menú y en la portada cuando se publique el primer juego.
            </p>
          )}
        </div>
      </section>

      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-12 sm:px-6 lg:px-8">
        {islas.map(({ isla, juegos }) => (
          <section key={isla.slug} aria-labelledby={`isla-${isla.slug}`}>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-tinta-tenue">Isla</p>
            <h2 id={`isla-${isla.slug}`} className="mt-1 font-serif text-3xl font-semibold tracking-tight">
              {isla.nombre}
            </h2>
            <p className="mt-2 max-w-2xl leading-relaxed text-tinta-media">{isla.descripcion}</p>
            {juegos.length > 0 ? (
              <div className="mt-6 flex flex-col gap-5">
                {juegos.map((j) => (
                  <div key={j.href}>
                    {j.borrador && (
                      <p className="mb-2 text-xs font-bold uppercase tracking-[0.08em] text-aviso">
                        Borrador: sólo con la dirección directa
                      </p>
                    )}
                    <HerramientaCard herramienta={j} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-5 w-fit rounded-full border border-borde px-4 py-1.5 text-sm font-semibold text-tinta-tenue">
                En construcción
              </p>
            )}
          </section>
        ))}
      </div>
    </>
  );
}
