import Link from "next/link";
import { PROYECTOS } from "@content/proyectos";
import { MathText } from "@/components/MathText";
import { MateriaCard } from "@/components/MateriaCard";
import { ProyectoCard } from "@/components/ProyectoCard";
import { materiasEnPreparacion, materiasPublicadas, temasPublicados } from "@/lib/publicado";

const PASOS = [
  {
    titulo: "Se define",
    texto: "Cada término aparece corto y una sola vez, justo antes de hacer falta.",
  },
  {
    titulo: "Se ve",
    texto: "Un interactivo lo muestra funcionando: tiras el dado, cuentas las fichas, mueves el punto de corte.",
  },
  {
    titulo: "Se comprueba",
    texto: "Preguntas con corrección inmediata, y el error típico explicado antes de que lo cometas.",
  },
];

export default function HomePage() {
  const publicadas = materiasPublicadas();
  const enPreparacion = new Intl.ListFormat("es", { type: "conjunction" }).format(
    materiasEnPreparacion().map((m) => m.nombre)
  );

  return (
    <>
      <section className="border-b border-borde">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-14 lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-acento">
              Docente universitario · Cochabamba, Bolivia
            </p>
            <h1 className="mt-3 font-serif text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Mgr. Ronald Martínez Jiménez
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-tinta-media">
              Material interactivo de las materias que dicto. Cada concepto se define, se ve
              funcionar y se comprueba con datos reales, para proyectarlo en clase o estudiar por
              tu cuenta.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/#aulas"
                className="rounded-full bg-acento px-5 py-2.5 text-sm font-semibold text-acento-texto transition hover:bg-acento-hover"
              >
                Ver las aulas
              </Link>
              <Link
                href="/proyectos"
                className="rounded-full border border-borde-fuerte px-5 py-2.5 text-sm font-semibold transition hover:bg-papel-suave"
              >
                Proyectos
              </Link>
            </div>
          </div>

          <Link
            href="/aula-probabilidad"
            className="group block rounded-[1.25rem] border border-borde bg-tarjeta p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition hover:-translate-y-0.5 sm:p-7"
          >
            <p className="text-[11px] font-extrabold uppercase tracking-[0.06em] text-aviso">Piensa esto</p>
            <p className="mt-3 font-serif text-xl italic leading-snug sm:text-2xl">
              Un cuestionario detecta a 88 de cada 100 estudiantes que tienen depresión. A uno le da
              positivo. ¿Qué tan probable es que la tenga?
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-papel-suave px-4 py-2.5">
                <span className="text-sm text-tinta-tenue">Lo que sabemos</span>
                <MathText>{"$P(+ \\mid D) = 0{,}88$"}</MathText>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border-[1.5px] border-acento/40 bg-acento/10 px-4 py-2.5">
                <span className="text-sm text-tinta-tenue">Lo que queremos saber</span>
                <MathText>{"$P(D \\mid +) = \\ ?$"}</MathText>
              </div>
            </div>
            <p className="mt-5 text-sm font-semibold text-acento">
              La respuesta está en el Aula de Probabilidad{" "}
              <span aria-hidden className="inline-block transition group-hover:translate-x-0.5">→</span>
            </p>
          </Link>
        </div>
      </section>

      <section id="aulas" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 lg:px-8">
        <Encabezado kicker="Aulas abiertas" titulo="Para usar en clase o estudiar por tu cuenta" />
        <div className="mt-8 flex flex-col gap-10">
          {publicadas.map((m) => (
            <MateriaCard key={m.slug} materia={m} temasPublicados={temasPublicados(m).length} />
          ))}
        </div>
        {enPreparacion && (
          <p className="mt-10 max-w-3xl border-l-2 border-borde-fuerte pl-4 leading-relaxed text-tinta-tenue">
            También dicto {enPreparacion}. Su material se publica aquí a medida que esté listo.
          </p>
        )}
      </section>

      <section className="border-y border-borde bg-papel-suave">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <Encabezado kicker="Cómo está hecho" titulo="Como un libro, pero que se puede tocar" />
          <ol className="mt-8 grid gap-4 sm:grid-cols-3">
            {PASOS.map((p, i) => (
              <li key={p.titulo} className="rounded-2xl border border-borde bg-tarjeta p-5">
                <span className="flex size-8 items-center justify-center rounded-full bg-acento text-sm font-bold text-acento-texto">
                  {i + 1}
                </span>
                <h3 className="mt-3 font-serif text-xl font-semibold">{p.titulo}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-tinta-media">{p.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <Encabezado kicker="Proyectos" titulo="Otras apps con las que enseño" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {PROYECTOS.map((p) => (
            <ProyectoCard key={p.slug} proyecto={p} />
          ))}
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
