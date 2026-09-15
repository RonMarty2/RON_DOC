/**
 * Después de `next build`: le escribe al service worker (`out/sw.js`) la lista
 * de lo que tiene que guardar en el teléfono apenas se instala, para que el
 * sitio funcione sin internet desde la primera visita.
 *
 * - Páginas: las del sitemap, que ya trae sólo lo publicado (borradores afuera).
 *   Al publicar una lámina entra sola, sin tocar nada acá.
 * - Archivos: el JavaScript, el CSS y las fuentes que esas páginas cargan.
 *   Sin ellos la página se veía pero no respondía: el HTML solo no alcanza
 *   para pasar de tarjeta.
 * - VERSION: huella de todo lo anterior. Si algo cambia, el teléfono instala
 *   el service worker nuevo y borra el caché viejo.
 *
 * Si algo no cuadra (una página del sitemap sin su HTML, marcas que faltan en
 * sw.js), falla la compilación: mejor no publicar que publicar sin avisar un
 * sitio que no funciona sin internet.
 */

import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, posix, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

/** Rutas del sitio ("/", "/bonos/"…) a partir del sitemap; la primera entrada es la portada. */
export function rutasDelSitemap(xml) {
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  if (urls.length === 0 || !urls[0].endsWith("/")) {
    throw new Error("El sitemap no empieza por la portada: no sé de dónde cortar las rutas.");
  }
  const base = urls[0].slice(0, -1);
  return urls.map((u) => {
    if (!u.startsWith(base)) throw new Error(`Ruta del sitemap fuera del sitio: ${u}`);
    return u.slice(base.length);
  });
}

/**
 * Archivos de `/_next/static/` que nombra una página, sin el basePath. Se
 * buscan en las etiquetas y también en los datos de React incrustados, que
 * nombran los trozos de JavaScript como "static/chunks/…".
 */
export function archivosDeHtml(html) {
  const encontrados = new Set();
  for (const m of html.matchAll(/\/_next\/(static\/[^"'\s)\\]+)/g)) encontrados.add(`/_next/${m[1]}`);
  for (const m of html.matchAll(/["'](static\/(?:chunks|css)\/[^"'\s\\]+)/g)) encontrados.add(`/_next/${m[1]}`);
  return [...encontrados].map((a) => a.split(/[?#]/)[0]);
}

/** ¿El `unicode-range` de una fuente ("u+00??,u+0131,u+2000-206f") cubre este carácter? */
export function rangoCubre(rango, caracter) {
  const cp = caracter.codePointAt(0);
  return rango.split(",").some((trozo) => {
    const m = trozo.trim().match(/^u\+([0-9a-f?]+)(?:-([0-9a-f]+))?$/i);
    if (!m) return false;
    const desde = parseInt(m[1].replace(/\?/g, "0"), 16);
    const hasta = parseInt(m[2] ?? m[1].replace(/\?/g, "f"), 16);
    return cp >= desde && cp <= hasta;
  });
}

/**
 * Fuentes que pide una hoja de estilos, con dos filtros para no gastarle datos
 * al alumno en archivos que su navegador nunca va a pedir:
 *  - sólo woff2 (KaTeX trae también woff y ttf, que los navegadores actuales no usan);
 *  - sólo las variantes cuyo rango de caracteres incluye el español: next/font
 *    genera además las de vietnamita y latín extendido, que no se leen nunca.
 */
export function fuentesDeCss(css, rutaCss) {
  const carpeta = posix.dirname(rutaCss);
  const fuentes = [];
  for (const [bloque] of css.matchAll(/@font-face\s*\{[^}]*\}/g)) {
    const rango = bloque.match(/unicode-range\s*:\s*([^;}]+)/i)?.[1];
    if (rango && !rangoCubre(rango, "á")) continue;
    for (const m of bloque.matchAll(/url\(\s*["']?([^"')]+\.woff2)(?:[?#][^"')]*)?["']?\s*\)/g)) {
      fuentes.push(
        m[1].startsWith("/") ? m[1].replace(/^.*?(\/_next\/)/, "$1") : posix.normalize(posix.join(carpeta, m[1]))
      );
    }
  }
  return [...new Set(fuentes)];
}

/** Reemplaza una línea `const NOMBRE = …;` de sw.js; si no está, falla. */
export function reemplazarConstante(codigo, nombre, valor) {
  const patron = new RegExp(`^const ${nombre} = [^\\r\\n]*;`, "m");
  if (!patron.test(codigo)) throw new Error(`sw.js no tiene la línea "const ${nombre} = …;"`);
  return codigo.replace(patron, `const ${nombre} = ${JSON.stringify(valor)};`);
}

function main() {
  const raiz = resolve(dirname(fileURLToPath(import.meta.url)), "..");
  const out = join(raiz, "out");
  const leer = (ruta) => readFileSync(join(out, ruta), "utf8");

  const paginas = rutasDelSitemap(leer("sitemap.xml"));
  const huella = createHash("sha256");
  const archivos = new Set();

  for (const ruta of paginas) {
    const html = join(ruta, "index.html");
    if (!existsSync(join(out, html))) throw new Error(`El sitemap nombra ${ruta} pero no hay ${html} en out/`);
    const contenido = leer(html);
    huella.update(ruta).update(contenido);
    for (const a of archivosDeHtml(contenido)) archivos.add(a);
  }

  for (const css of [...archivos].filter((a) => a.endsWith(".css"))) {
    const disco = css.replace(/^\//, "");
    if (existsSync(join(out, disco))) for (const f of fuentesDeCss(leer(disco), css)) archivos.add(f);
  }

  // Sólo lo que existe de verdad: un nombre mal leído no debe romper la instalación.
  const estaticos = [...archivos].filter((a) => existsSync(join(out, a.replace(/^\//, "")))).sort();
  for (const a of estaticos) huella.update(a);

  const version = huella.digest("hex").slice(0, 12);
  let sw = leer("sw.js");
  sw = reemplazarConstante(sw, "VERSION", version);
  sw = reemplazarConstante(sw, "PRECARGA", paginas);
  sw = reemplazarConstante(sw, "PRECARGA_ESTATICOS", estaticos);
  writeFileSync(join(out, "sw.js"), sw);

  const bytes = estaticos.reduce((s, a) => s + readFileSync(join(out, a.replace(/^\//, ""))).length, 0);
  console.log(
    `[precarga-sw] versión ${version}: ${paginas.length} páginas y ${estaticos.length} archivos (${(bytes / 1024).toFixed(0)} kB sin comprimir).`
  );
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    main();
  } catch (e) {
    console.error(`[precarga-sw] ${e.message}`);
    process.exit(1);
  }
}
