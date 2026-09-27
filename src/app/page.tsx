import Link from "next/link";
import { ISLAS } from "@content/islas";
import { MATERIAS } from "@content/materias";
import { PROYECTOS } from "@content/proyectos";
import { ProyectoCard } from "@/components/ProyectoCard";
import { juegoDeMateria, juegosDe } from "@/lib/juegos";
import { paraEstudiar, paraPracticar, temasPublicados } from "@/lib/publicado";
import type { Materia } from "@/lib/types";

const SECCIONES = [
  {
    titulo: "Estudiar",
    texto: "Aulas y láminas interactivas: cada concepto se define, se ve funcionar y se comprueba.",
  },
  {
    titulo: "Jugar",
    texto: "El juego de la materia, tema por tema. Cada estudiante recibe sus propios números y cuenta para la nota.",
  },
  {
    titulo: "Practicar",
    texto: "Hojas de ejercicios con versiones distintas, para practicar o imprimir.",
  },
];

type Estado = "listo" | "prueba" | "construccion";

function estados(m: Materia): Record<"Estudiar" | "Jugar" | "Practicar", Estado> {
  const juegos = juegoDeMateria(m, ISLAS) ? juegosDe(m) : [];
  return {
    Estudiar: paraEstudiar(m).length + temasPublicados(m).length > 0 ? "listo" : "construccion",
    Jugar: juegos.some((j) => !j.borrador) ? "listo" : juegos.length > 0 ? "prueba" : "construccion",
    Practicar: paraPracticar(m).length > 0 ? "listo" : "construccion",
  };
}

const ETIQUETA: Record<Estado, string> = { listo: "listo", prueba: "en prueba", construccion: "en construcción" };

export default function HomePage() {
  const materias = MATERIAS.map((m) => ({ m, e: estados(m) }));
  const avance = (e: Record<string, Estado>) => Object.values(e).filter((x) => x !== "construccion").length;
  materias.sort((a, b) => avance(b.e) - avance(a.e));

  return (
    <>
      <section className="border-b border-borde">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-acento">Docente universitario · Cochabamba, Bolivia</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Mgr. Ronald Martínez Jiménez
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-tinta-media">
            Aquí están las materias que dicto. En cada una encuentras tres cosas: material para estudiar, el juego de la
            materia, tema por tema, y práctica. Elige tu materia para empezar.
          </p>
          <div className="mt-7">
            <Link
              href="/#materias"
              className="rounded-full bg-acento px-5 py-2.5 text-sm font-semibold text-acento-texto transition hover:bg-acento-hover"
            >
              Elegir mi materia
            </Link>
          </div>
          <ol className="mt-10 grid gap-4 sm:grid-cols-3">
            {SECCIONES.map((s, i) => (
              <li key={s.titulo} className="rounded-2xl border border-borde bg-tarjeta p-5">
                <span className="flex size-8 items-center justify-center rounded-full bg-acento text-sm font-bold text-acento-texto">{i + 1}</span>
                <h2 className="mt-3 font-serif text-xl font-semibold">{s.titulo}</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-tinta-media">{s.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="materias" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 lg:px-8">
        <Encabezado kicker="Materias" titulo="Elige tu materia" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {materias.map(({ m, e }) => (
            <Link
              key={m.slug}
              href={`/materias/${m.slug}`}
              className="group flex flex-col gap-3 rounded-2xl border border-borde bg-tarjeta p-5 transition hover:-translate-y-0.5 hover:border-borde-fuerte"
            >
              <h3 className="font-serif text-xl font-semibold leading-snug group-hover:text-acento">{m.nombre}</h3>
              <p className="text-sm leading-relaxed text-tinta-media">{m.descripcion}</p>
              <ul className="mt-auto flex flex-wrap gap-2">
                {(Object.keys(e) as (keyof typeof e)[]).map((s) => (
                  <li
                    key={s}
                    className={
                      e[s] === "construccion"
                        ? "rounded-full border border-borde px-3 py-1 text-xs text-tinta-tenue"
                        : "rounded-full bg-acento/10 px-3 py-1 text-xs font-semibold text-acento"
                    }
                  >
                    {s} · {ETIQUETA[e[s]]}
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-borde bg-papel-suave">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <Encabezado kicker="Proyectos" titulo="Otras apps con las que enseño" />
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {PROYECTOS.map((p) => (
              <ProyectoCard key={p.slug} proyecto={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Encabezado({ kicker, titulo }: { kicker: string; titulo: string }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-acento">{kicker}</p>
      <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">{titulo}</h2>
    </div>
  );
}
