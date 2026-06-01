import type { NextConfig } from "next";

/**
 * Configuración de Next.js para export estático y publicación en GitHub Pages.
 *
 * - `output: "export"` genera un sitio 100% estático en /out al hacer `next build`.
 * - `images.unoptimized: true` desactiva el optimizador de imágenes (no hay servidor).
 * - `basePath` y `assetPrefix` se configuran vía variables de entorno para que el
 *   sitio funcione tanto en local (`/`) como bajo `https://usuario.github.io/RON_DOC/`.
 * - `trailingSlash: true` produce rutas tipo `/materias/psicoestadistica/index.html`
 *   que GitHub Pages sirve sin problemas.
 */

const isProd = process.env.NODE_ENV === "production";
// Permite override manual desde el workflow (NEXT_PUBLIC_BASE_PATH) o autodetectar
// el nombre del repo cuando se ejecuta dentro de GitHub Actions.
const repoBasePath =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (process.env.GITHUB_REPOSITORY
    ? `/${process.env.GITHUB_REPOSITORY.split("/")[1]}`
    : "");

const basePath = isProd && repoBasePath ? repoBasePath : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
