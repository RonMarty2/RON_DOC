import type { MetadataRoute } from "next";
import { hayPodcasts, hayTesis, herramientasPublicadas, materiasPublicadas, temasPublicados } from "@/lib/publicado";
import { SITIO } from "@/lib/seo";

// Necesario para que se genere como archivo estático con `output: "export"`.
export const dynamic = "force-static";

// Sólo lo publicado: los borradores y /muestra quedan afuera.
export default function sitemap(): MetadataRoute.Sitemap {
  const rutas = [
    "/",
    "/proyectos/",
    ...materiasPublicadas().flatMap((m) => [
      `/materias/${m.slug}/`,
      ...herramientasPublicadas(m).map((h) => `${h.href}/`),
      ...temasPublicados(m).map((t) => `/materias/${m.slug}/${t.slug}/`),
    ]),
    ...(hayPodcasts() ? ["/podcasts/"] : []),
    ...(hayTesis() ? ["/tesis/"] : []),
  ];
  return rutas.map((ruta) => ({ url: `${SITIO.url}${ruta}` }));
}
