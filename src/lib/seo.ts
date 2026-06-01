import type { Metadata } from "next";

/** Metadatos base reutilizables para SEO + Open Graph. */
export const SITIO = {
  nombre: "Ronald Martínez Jiménez · Sitio académico",
  autor: "Mgr. Ronald Martínez Jiménez",
  descripcion:
    "Material académico universitario: Psicoestadística Descriptiva, Administración Financiera, Econometría II y Matemática Financiera.",
  url: "https://ronmarty2.github.io/RON_DOC", // se actualiza si cambia el repo
};

export function construirMetadata(
  titulo: string,
  descripcion?: string
): Metadata {
  const desc = descripcion ?? SITIO.descripcion;
  const tituloCompleto = `${titulo} · ${SITIO.nombre}`;
  return {
    title: tituloCompleto,
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
