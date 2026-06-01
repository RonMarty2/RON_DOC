import type { MetadataRoute } from "next";

// Necesario para que el manifest se genere como archivo estático en `next build`
// con `output: "export"`.
export const dynamic = "force-static";

/**
 * Manifest PWA generado por Next.js. El framework aplica el `basePath`
 * automáticamente a `start_url` y `scope`, así que el sitio se puede instalar
 * tanto en local como en GitHub Pages bajo /RON_DOC/.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ronald Martínez Jiménez · Sitio académico",
    short_name: "Ronald M.",
    description:
      "Material académico universitario: Psicoestadística, Administración Financiera, Econometría II y Matemática Financiera.",
    lang: "es-BO",
    start_url: ".",
    scope: ".",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0f172a",
    theme_color: "#0f172a",
    icons: [
      {
        src: "icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
