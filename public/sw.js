// Service worker básico para la PWA.
// Estrategia:
//  - Páginas (HTML): network-first → si hay red la usamos y refrescamos el caché;
//    si no hay red, servimos lo cacheado.
//  - Estáticos (JS/CSS/imagenes/PDFs/HTMLs de interactivos): cache-first.

const VERSION = "v5";
const CACHE_PAGINAS = `ron-doc-paginas-${VERSION}`;
const CACHE_ESTATICOS = `ron-doc-estaticos-${VERSION}`;

// Calcula el scope del SW (incluye el basePath en GitHub Pages).
const SCOPE = new URL(self.registration?.scope ?? "./", self.location.origin)
  .pathname.replace(/\/$/, "");

// Rutas que se guardan al instalar, sin esperar a que alguien las visite.
// La Aula está acá porque es la herramienta que se usa proyectada en clase,
// donde la conexión puede no existir: tiene que funcionar sin internet desde
// la primera vez, no sólo después de haberla abierto con señal.
const PRECARGA = ["/", "/aula-probabilidad/"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_PAGINAS).then((cache) =>
      // `addAll` falla entera si una sola ruta falla; se piden de a una para
      // que un 404 en cualquiera no deje al service worker sin instalar.
      Promise.all(
        PRECARGA.map((ruta) =>
          cache.add(`${SCOPE}${ruta}`).catch(() => undefined)
        )
      )
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  // Limpia versiones viejas y luego toma control de las pestañas abiertas.
  event.waitUntil(
    caches
      .keys()
      .then((claves) =>
        Promise.all(
          claves
            .filter((k) => ![CACHE_PAGINAS, CACHE_ESTATICOS].includes(k))
            .map((k) => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
  );
});

// Permite al cliente forzar activación inmediata cuando hay un SW esperando.
// El componente RegistroPWA envía este mensaje cuando detecta una versión nueva.
self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
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
