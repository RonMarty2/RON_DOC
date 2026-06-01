// Service worker básico para la PWA.
// Estrategia:
//  - Páginas (HTML): network-first → si hay red la usamos y refrescamos el caché;
//    si no hay red, servimos lo cacheado.
//  - Estáticos (JS/CSS/imagenes/PDFs/HTMLs de interactivos): cache-first.

const VERSION = "v1";
const CACHE_PAGINAS = `ron-doc-paginas-${VERSION}`;
const CACHE_ESTATICOS = `ron-doc-estaticos-${VERSION}`;

// Calcula el scope del SW (incluye el basePath en GitHub Pages).
const SCOPE = new URL(self.registration?.scope ?? "./", self.location.origin)
  .pathname.replace(/\/$/, "");

self.addEventListener("install", (event) => {
  // Precache mínimo: el shell del sitio.
  event.waitUntil(
    caches.open(CACHE_PAGINAS).then((cache) => cache.addAll([`${SCOPE}/`]))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  // Limpia versiones viejas.
  event.waitUntil(
    caches.keys().then((claves) =>
      Promise.all(
        claves
          .filter((k) => ![CACHE_PAGINAS, CACHE_ESTATICOS].includes(k))
          .map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

function esEstatico(url) {
  return (
    url.pathname.includes("/_next/static/") ||
    url.pathname.startsWith(`${SCOPE}/icons/`) ||
    url.pathname.startsWith(`${SCOPE}/interactivos/`) ||
    url.pathname.startsWith(`${SCOPE}/recursos/`) ||
    /\.(png|jpg|jpeg|svg|webp|ico|css|js|woff2?|pdf)$/i.test(url.pathname)
  );
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Navegación (HTML): network-first.
  if (req.mode === "navigate" || req.headers.get("accept")?.includes("text/html")) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copia = res.clone();
          caches.open(CACHE_PAGINAS).then((c) => c.put(req, copia));
          return res;
        })
        .catch(() => caches.match(req).then((r) => r ?? caches.match(`${SCOPE}/`)))
    );
    return;
  }

  // Estáticos: cache-first.
  if (esEstatico(url)) {
    event.respondWith(
      caches.match(req).then(
        (cacheado) =>
          cacheado ??
          fetch(req).then((res) => {
            const copia = res.clone();
            caches.open(CACHE_ESTATICOS).then((c) => c.put(req, copia));
            return res;
          })
      )
    );
  }
});
