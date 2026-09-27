import type { MetadataRoute } from "next";
import { MATERIAS } from "@content/materias";
import { hayPodcasts, hayTesis, herramientasPublicadas, temasPublicados } from "@/lib/publicado";
import { SITIO } from "@/lib/seo";

// Necesario para que se genere como archivo estático con `output: "export"`.
export const dynamic = "force-static";

// Todas las materias (desde el 27-09 se muestran todas); de las herramientas, sólo las publicadas.
export default function sitemap(): MetadataRoute.Sitemap {
  const rutas = [
    "/",
    "/proyectos/",
    ...MATERIAS.flatMap((m) => [
      `/materias/${m.slug}/`,
      ...herramientasPublicadas(m).map((h) => `${h.href}/`),
      ...temasPublicados(m).map((t) => `/materias/${m.slug}/${t.slug}/`),
    ]),
    ...(hayPodcasts() ? ["/podcasts/"] : []),
    ...(hayTesis() ? ["/tesis/"] : []),
  ];
  return rutas.map((ruta) => ({ url: `${SITIO.url}${ruta}` }));
}
