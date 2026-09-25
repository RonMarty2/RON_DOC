import Link from "next/link";
import type { Metadata } from "next";
import { PanelDocente } from "./PanelDocente";

// Sólo para el docente: sin enlaces desde el sitio y fuera de los buscadores. Lo que muestra lo decide la base.
export const metadata: Metadata = {
  title: "Partidas del curso",
  robots: { index: false, follow: false },
};

export default function DocenteJuegoPage() {
  return (
    <>
      <section className="border-b border-borde">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <nav className="text-sm font-semibold text-acento">
            <Link href="/juego-proyectos" className="hover:text-acento-hover">
              Valle de los Proyectos
            </Link>
          </nav>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-acento">Para el docente</p>
          <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">Partidas del curso</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-tinta-media">
            Escena 1, «La máquina que no alcanzaba». Cada partida se recalcula con la versión del alumno: qué números escribió, qué
            error típico cometió, qué decidió y el argumento que va a defender.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <PanelDocente />
      </section>
    </>
  );
}
