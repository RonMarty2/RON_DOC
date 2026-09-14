import type { Metadata } from "next";
import { esBorrador } from "@/lib/publicado";
import { LaminaBonos } from "./LaminaBonos";

// Mientras sea borrador en content/materias.ts, no se indexa.
export const metadata: Metadata = {
  title: "Bonos: precio, rendimiento y duración",
  ...(esBorrador("/bonos") ? { robots: { index: false, follow: false } } : {}),
};

export default function BonosPage() {
  return <LaminaBonos />;
}
