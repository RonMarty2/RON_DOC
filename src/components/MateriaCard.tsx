import Link from "next/link";
import type { Materia } from "@/lib/types";
import { HerramientaCard } from "@/components/HerramientaCard";
import { ListaLaminas } from "@/components/ListaLaminas";
import { herramientasPublicadas } from "@/lib/publicado";

/** Una materia publicada en la portada: sus aulas como tarjeta grande y sus láminas como lista. */
export function MateriaCard({ materia, temasPublicados }: { materia: Materia; temasPublicados: number }) {
  const herramientas = herramientasPublicadas(materia);
  const aulas = herramientas.filter((h) => h.tipo !== "lamina");
  const laminas = herramientas.filter((h) => h.tipo === "lamina");

  return (
    <article className="flex flex-col gap-4">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <Link
          href={`/materias/${materia.slug}`}
          className="font-serif text-lg font-semibold hover:text-acento"
        >
          {materia.nombre}
        </Link>
        {temasPublicados > 0 && (
          <Link href={`/materias/${materia.slug}`} className="text-sm font-semibold text-acento hover:text-acento-hover">
            {temasPublicados} {temasPublicados === 1 ? "tema" : "temas"} →
          </Link>
        )}
      </div>
      {aulas.map((h) => (
        <HerramientaCard key={h.href} herramienta={h} />
      ))}
      {laminas.length > 0 && <ListaLaminas laminas={laminas} />}
    </article>
  );
}
