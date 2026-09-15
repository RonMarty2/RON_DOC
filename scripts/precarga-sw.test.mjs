import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { archivosDeHtml, fuentesDeCss, rangoCubre, reemplazarConstante, rutasDelSitemap } from "./precarga-sw.mjs";

describe("precarga del service worker", () => {
  it("saca las rutas del sitemap sin el dominio ni el basePath", () => {
    const xml = `<?xml version="1.0"?><urlset>
      <url><loc>https://ronmarty2.github.io/RON_DOC/</loc></url>
      <url><loc>https://ronmarty2.github.io/RON_DOC/proyectos/</loc></url>
      <url><loc>https://ronmarty2.github.io/RON_DOC/bonos/</loc></url></urlset>`;
    expect(rutasDelSitemap(xml)).toEqual(["/", "/proyectos/", "/bonos/"]);
  });

  it("falla si el sitemap no empieza por la portada", () => {
    expect(() => rutasDelSitemap("<urlset></urlset>")).toThrow();
    expect(() => rutasDelSitemap("<loc>https://x.io/bonos</loc>")).toThrow();
  });

  it("encuentra JS y CSS en etiquetas y en los datos de React, sin basePath", () => {
    const html = `<link rel="stylesheet" href="/RON_DOC/_next/static/css/a1.css"/>
      <script src="/RON_DOC/_next/static/chunks/webpack-9.js" async></script>
      <script>self.__next_f.push([1,"3:I[\\"static/chunks/app/bonos/page-7.js\\"]"])</script>
      <link rel="preload" href="/_next/static/media/fuente.woff2?v=1" as="font"/>`;
    expect(archivosDeHtml(html).sort()).toEqual([
      "/_next/static/chunks/app/bonos/page-7.js",
      "/_next/static/chunks/webpack-9.js",
      "/_next/static/css/a1.css",
      "/_next/static/media/fuente.woff2",
    ]);
  });

  it("toma sólo las fuentes woff2 de una hoja de estilos", () => {
    const css = `@font-face{font-family:KaTeX_Main;src:url(../media/KaTeX_Main.woff2) format("woff2"),url(../media/KaTeX_Main.woff) format("woff"),url(../media/KaTeX_Main.ttf)}
      @font-face{font-family:Crimson;src:url("/RON_DOC/_next/static/media/crimson.woff2?x")}`;
    expect(fuentesDeCss(css, "/_next/static/css/a1.css")).toEqual([
      "/_next/static/media/KaTeX_Main.woff2",
      "/_next/static/media/crimson.woff2",
    ]);
  });

  it("descarta las variantes de la tipografía que no traen las letras del español", () => {
    const css = `@font-face{font-family:Crimson Pro;src:url(/RON_DOC/_next/static/media/vietnamita.woff2) format("woff2");unicode-range:u+0102-0103,u+0110-0111,u+1ea0-1ef9}
      @font-face{font-family:Crimson Pro;src:url(/RON_DOC/_next/static/media/latin-ext.woff2) format("woff2");unicode-range:u+0100-02ba,u+02bd-02c5}
      @font-face{font-family:Crimson Pro;src:url(/RON_DOC/_next/static/media/latin.woff2) format("woff2");unicode-range:u+00??,u+0131,u+2212}
      @font-face{font-family:Crimson Pro;src:url(/RON_DOC/_next/static/media/latin.woff2) format("woff2");unicode-range:u+00??,u+0131,u+2212}`;
    expect(fuentesDeCss(css, "/_next/static/css/b.css")).toEqual(["/_next/static/media/latin.woff2"]);
    expect(rangoCubre("u+00??", "ñ")).toBe(true);
    expect(rangoCubre("u+0000-00ff,u+2212", "−")).toBe(true);
    expect(rangoCubre("u+0100-02ba", "á")).toBe(false);
  });

  it("las tres marcas existen en public/sw.js y se reemplazan con o sin CRLF", () => {
    const sw = readFileSync(new URL("../public/sw.js", import.meta.url), "utf8");
    let nuevo = reemplazarConstante(sw, "VERSION", "abc123");
    nuevo = reemplazarConstante(nuevo, "PRECARGA", ["/", "/bonos/"]);
    nuevo = reemplazarConstante(nuevo, "PRECARGA_ESTATICOS", ["/_next/static/css/a1.css"]);
    expect(nuevo).toContain('const VERSION = "abc123";');
    expect(nuevo).toContain('const PRECARGA = ["/","/bonos/"];');
    expect(nuevo).toContain('const PRECARGA_ESTATICOS = ["/_next/static/css/a1.css"];');
    expect(reemplazarConstante("a\r\nconst VERSION = \"v1\";\r\nb", "VERSION", "v2")).toBe('a\r\nconst VERSION = "v2";\r\nb');
    expect(() => reemplazarConstante("nada", "VERSION", "x")).toThrow();
  });
});
