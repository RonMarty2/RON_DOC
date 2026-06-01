/**
 * Helpers para construir URLs respetando el `basePath` (necesario en GitHub Pages
 * cuando el sitio se sirve en una subruta como /RON_DOC/).
 *
 * Para enlaces internos con <Link>, Next.js ya agrega el basePath automáticamente,
 * así que pasamos la ruta SIN prefijo. Para `src` de iframes, hrefs de PDFs o
 * imágenes desde /public, usá `conBase("/ruta")`.
 */

export function conBase(ruta: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (!ruta.startsWith("/")) return ruta;
  return `${base}${ruta}`;
}
