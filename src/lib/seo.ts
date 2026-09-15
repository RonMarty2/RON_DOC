import type { Metadata } from "next";
import { MATERIAS } from "@content/materias";

/** Metadatos base reutilizables para SEO + Open Graph. */
export const SITIO = {
  nombre: "Ronald Martínez Jiménez · Sitio académico",
  autor: "Mgr. Ronald Martínez Jiménez",
  descripcion:
    "Material interactivo de las materias que dicta el Mgr. Ronald Martínez Jiménez en Cochabamba: cada concepto se define, se ve funcionar y se comprueba con datos reales.",
  url: "https://ronmarty2.github.io/RON_DOC", // se actualiza si cambia el repo
};

/** Dirección absoluta de la imagen para compartir generada en `src/app/compartir/[imagen]/route.tsx`. */
export function urlImagenCompartir(clave: string): string {
  return `${SITIO.url}/compartir/${clave}.png`;
}

export function construirMetadata(
  titulo: string,
  descripcion?: string,
  /** Clave de la imagen para compartir (ver `imagenesParaCompartir`); por defecto, la de la portada. */
  imagen = "portada"
): Metadata {
  const desc = descripcion ?? SITIO.descripcion;
  const tituloCompleto = `${titulo} · ${SITIO.nombre}`;
  const imagenes = [{ url: urlImagenCompartir(imagen), width: 1200, height: 630, alt: titulo }];
  return {
    // Sólo el título: la plantilla de layout.tsx ya le agrega el nombre del sitio.
    title: titulo,
    description: desc,
    authors: [{ name: SITIO.autor }],
    openGraph: {
      title: tituloCompleto,
      description: desc,
      type: "website",
      locale: "es_BO",
      siteName: SITIO.nombre,
      images: imagenes,
    },
    twitter: {
      card: "summary_large_image",
      title: tituloCompleto,
      description: desc,
      images: imagenes,
    },
  };
}

/**
 * Metadatos de un aula o lámina a partir de `content/materias.ts`: al compartir
 * el enlace sale su propio título, descripción e imagen. Si es borrador, no se indexa.
 */
export function metadataDeHerramienta(href: string, tituloPestana?: string): Metadata {
  for (const materia of MATERIAS) {
    const h = materia.herramientas?.find((x) => x.href === href);
    if (!h) continue;
    const base = construirMetadata(h.titulo, h.descripcion, claveDeHerramienta(href));
    return {
      ...base,
      ...(tituloPestana ? { title: tituloPestana } : {}),
      ...(h.borrador ? { robots: { index: false, follow: false } } : {}),
    };
  }
  throw new Error(`No hay herramienta con href ${href} en content/materias.ts`);
}

export function claveDeHerramienta(href: string): string {
  return href.replace(/^\/+|\/+$/g, "");
}
