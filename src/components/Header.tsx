import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

const LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/tesis", label: "Tesis" },
  { href: "/podcasts", label: "Podcasts" },
  { href: "/sobre-mi", label: "Sobre mí" },
];

/**
 * Encabezado del sitio.
 *
 * Las cinco secciones más el nombre no entran en un teléfono (piden unos
 * 570px y una pantalla Android típica tiene 360). Antes se desbordaban y
 * empujaban la página entera hacia la derecha: TODO el sitio quedaba con
 * desplazamiento horizontal, y con zoom el efecto era peor. Ahora los enlaces
 * viven en una tira que se desplaza sola, sin barra visible; el nombre y el
 * botón de tema quedan fijos a los costados, y un degradado en los bordes
 * avisa que hay más para deslizar (si no, el último enlace se veía cortado a
 * la mitad y parecía un error).
 *
 * `pt-segura` reserva la altura de la barra de estado: dentro de la app
 * nativa el reloj del sistema se superponía con el nombre.
 */
export function Header() {
  return (
    <header className="pt-segura px-seguro sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="shrink-0 font-serif text-base font-semibold tracking-tight text-slate-900 sm:text-lg dark:text-slate-100"
        >
          Ronald Martínez J.
          <span className="ml-1 hidden text-sm font-normal text-slate-500 dark:text-slate-400 lg:inline">
            · Sitio académico
          </span>
        </Link>

        {/* Tira desplazable: si los enlaces no entran, se corren; nunca
            desbordan el documento. `w-max` + `ml-auto` los pega a la derecha
            cuando sí entran, y los deja alcanzables cuando no. */}
        <nav
          aria-label="Secciones"
          className="min-w-0 flex-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [mask-image:linear-gradient(to_right,transparent_0,black_1.25rem,black_calc(100%-1.25rem),transparent_100%)] [&::-webkit-scrollbar]:hidden"
        >
          <div className="ml-auto flex w-max items-center gap-0.5 sm:gap-2">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="shrink-0 whitespace-nowrap rounded-full px-2.5 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 sm:px-3 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </nav>

        <div className="shrink-0">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
