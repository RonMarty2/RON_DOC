/**
 * Sirve la carpeta `out/` bajo /RON_DOC/, igual que GitHub Pages, para probar
 * lo que en `npm run dev` no existe: el service worker y el sitio sin internet.
 *
 * Uso:
 *   NEXT_PUBLIC_BASE_PATH=/RON_DOC npm run build     (en Git Bash: MSYS_NO_PATHCONV=1 delante)
 *   node scripts/servir-compilado.mjs                 → http://localhost:3017/RON_DOC/
 *
 * Para probar sin internet: abrir la portada, esperar a que el service worker
 * termine de guardar (caches.keys() en la consola), cortar este servidor y
 * abrir cualquier página publicada.
 */

import { createReadStream, existsSync, readFileSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const out = resolve(dirname(fileURLToPath(import.meta.url)), "..", "out");
const base = "/RON_DOC";
const puerto = Number(process.env.PORT) || 3017;
const tipos = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".webmanifest": "application/manifest+json",
  ".woff2": "font/woff2",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".pdf": "application/pdf",
};

if (!existsSync(out)) {
  console.error("No hay out/: primero compila con NEXT_PUBLIC_BASE_PATH=/RON_DOC npm run build");
  process.exit(1);
}

createServer((req, res) => {
  const ruta = decodeURIComponent((req.url ?? "/").split("?")[0]);
  if (!ruta.startsWith(`${base}/`)) {
    res.writeHead(302, { Location: `${base}/` });
    return res.end();
  }
  let archivo = join(out, ruta.slice(base.length));
  if (!archivo.startsWith(out)) {
    res.writeHead(403);
    return res.end();
  }
  if (existsSync(archivo) && statSync(archivo).isDirectory()) archivo = join(archivo, "index.html");
  if (!existsSync(archivo)) {
    res.writeHead(404, { "Content-Type": tipos[".html"] });
    return res.end(readFileSync(join(out, "404.html")));
  }
  res.writeHead(200, { "Content-Type": tipos[extname(archivo)] ?? "application/octet-stream" });
  createReadStream(archivo).pipe(res);
}).listen(puerto, () => console.log(`Sitio compilado en http://localhost:${puerto}${base}/`));
