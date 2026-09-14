import type { Metadata } from "next";
import { esBorrador } from "@/lib/publicado";
import { LaminaAnualidades } from "./LaminaAnualidades";

// Mientras sea borrador en content/materias.ts, no se indexa.
export const metadata: Metadata = {
  title: "Anualidades",
  ...(esBorrador("/anualidades") ? { robots: { index: false, follow: false } } : {}),
};

export default function AnualidadesPage() {
  return <LaminaAnualidades />;
}
