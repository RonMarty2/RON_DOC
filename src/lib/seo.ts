import type { Metadata } from "next";

/** Metadatos base reutilizables para SEO + Open Graph. */
export const SITIO = {
  nombre: "Ronald Martínez Jiménez · Sitio académico",
  autor: "Mgr. Ronald Martínez Jiménez",
  descripcion:
    "Material interactivo de las materias que dicta el Mgr. Ronald Martínez Jiménez en Cochabamba: cada concepto se define, se ve funcionar y se comprueba con datos reales.",
  url: "https://ronmarty2.github.io/RON_DOC", // se actualiza si cambia el repo
};

export function construirMetadata(
  titulo: string,
  descripcion?: string
): Metadata {
  const desc = descripcion ?? SITIO.descripcion;
  const tituloCompleto = `${titulo} · ${SITIO.nombre}`;
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
    },
    twitter: {
      card: "summary",
      title: tituloCompleto,
      description: desc,
    },
  };
}
