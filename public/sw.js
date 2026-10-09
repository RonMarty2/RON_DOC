// Service worker básico para la PWA.
// Estrategia:
//  - Páginas (HTML): network-first → si hay red la usamos y refrescamos el caché;
//    si no hay red, servimos lo cacheado.
//  - Estáticos (JS/CSS/imagenes/PDFs/HTMLs de interactivos): cache-first.

// VERSION, PRECARGA y PRECARGA_ESTATICOS los reescribe scripts/precarga-sw.mjs
// al compilar (npm run build): acá quedan sólo valores de muestra.
const VERSION = "dev";
const CACHE_PAGINAS = `ron-doc-paginas-${VERSION}`;
const CACHE_ESTATICOS = `ron-doc-estaticos-${VERSION}`;
// La música de los juegos pesa unos 8 MB y no cambia con cada publicación: su caché no lleva VERSION, así no se vuelve a bajar
// en cada deploy. Si una pista se reemplaza, se le cambia el nombre del archivo (manifiesto.json la apunta).
const CACHE_AUDIO = "ron-doc-audio-v1";

// Calcula el scope del SW (incluye el basePath en GitHub Pages).
const SCOPE = new URL(self.registration?.scope ?? "./", self.location.origin)
  .pathname.replace(/\/$/, "");

// Lo que se guarda al instalar, sin esperar a que alguien lo visite: todas las
// páginas publicadas (salen del sitemap) y el JavaScript, CSS y fuentes que
// usan. Las aulas y láminas se usan proyectadas en clase, donde la conexión
// puede no existir: tienen que funcionar sin internet desde la primera vez.
// Sólo el HTML no alcanza: la página se ve, pero no responde.
const PRECARGA = ["/", "/aula-probabilidad/"];
const PRECARGA_ESTATICOS = [];

// `addAll` falla entera si una sola ruta falla; se piden de a una para que un
// 404 en cualquiera no deje al service worker sin instalar.
function guardarTodo(nombreCache, rutas) {
  return caches
    .open(nombreCache)
    .then((cache) =>
      Promise.all(rutas.map((ruta) => cache.add(`${SCOPE}${ruta}`).catch(() => undefined)))
    );
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    Promise.all([
      guardarTodo(CACHE_PAGINAS, PRECARGA),
      guardarTodo(CACHE_ESTATICOS, PRECARGA_ESTATICOS),
    ])
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
            .filter((k) => ![CACHE_PAGINAS, CACHE_ESTATICOS, CACHE_AUDIO].includes(k))
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

  // Música (mp3): cache-first, en su caché aparte. El juego la pide con `Range`; se baja entera, sin `Range`, para poder guardarla
  // (la caché no guarda respuestas parciales).
  if (/\.mp3$/i.test(url.pathname)) {
    event.respondWith(
      caches.open(CACHE_AUDIO).then((cache) =>
        cache.match(url.href).then(
          (guardado) =>
            guardado ??
            fetch(url.href).then((res) => {
              if (res.status === 200) cache.put(url.href, res.clone());
              return res;
            })
        )
      )
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
