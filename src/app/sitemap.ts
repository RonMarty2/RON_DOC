import type { MetadataRoute } from "next";
import { hayPodcasts, hayTesis, materiasPublicadas, temasPublicados } from "@/lib/publicado";
import { SITIO } from "@/lib/seo";

// Necesario para que se genere como archivo estático con `output: "export"`.
export const dynamic = "force-static";

// Sólo lo publicado: los borradores (/muestra, /interes-compuesto, /amortizacion) quedan afuera a propósito.
export default function sitemap(): MetadataRoute.Sitemap {
  const rutas = [
    "/",
    "/proyectos/",
    "/aula-probabilidad/",
    ...materiasPublicadas().flatMap((m) => [
      `/materias/${m.slug}/`,
      ...temasPublicados(m).map((t) => `/materias/${m.slug}/${t.slug}/`),
    ]),
    ...(hayPodcasts() ? ["/podcasts/"] : []),
    ...(hayTesis() ? ["/tesis/"] : []),
  ];
  return rutas.map((ruta) => ({ url: `${SITIO.url}${ruta}` }));
}
