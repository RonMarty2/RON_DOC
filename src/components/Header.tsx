import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { hayPodcasts, hayTesis } from "@/lib/publicado";

/**
 * Encabezado del sitio.
 *
 * Los enlaces viven en una tira que se desplaza sola si no entran: antes se
 * desbordaban en celular y la página entera quedaba con desplazamiento
 * horizontal. `pt-segura` reserva la barra de estado dentro de la app nativa.
 */
export function Header() {
  const enlaces = [
    { href: "/#aulas", label: "Aulas" },
    { href: "/proyectos", label: "Proyectos" },
    ...(hayPodcasts() ? [{ href: "/podcasts", label: "Podcasts" }] : []),
    ...(hayTesis() ? [{ href: "/tesis", label: "Tesis" }] : []),
  ];

  return (
    <header className="pt-segura px-seguro sticky top-0 z-40 border-b border-borde bg-papel/85 backdrop-blur print:hidden">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0 font-serif text-lg font-semibold tracking-tight">
          Ronald Martínez J.
        </Link>
        <nav
          aria-label="Secciones"
          className="min-w-0 flex-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [mask-image:linear-gradient(to_right,transparent_0,black_1.25rem,black_calc(100%-1.25rem),transparent_100%)] [&::-webkit-scrollbar]:hidden"
        >
          <div className="ml-auto flex w-max items-center gap-0.5 sm:gap-2">
            {enlaces.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-semibold text-tinta-media transition hover:bg-papel-suave hover:text-tinta"
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
