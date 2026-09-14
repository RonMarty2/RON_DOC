import type { Metadata } from "next";
import { esBorrador } from "@/lib/publicado";
import { LaminaInteresCompuesto } from "./LaminaInteresCompuesto";

// Mientras sea borrador en content/materias.ts, no se indexa.
export const metadata: Metadata = {
  title: "Interés compuesto e inflación",
  ...(esBorrador("/interes-compuesto") ? { robots: { index: false, follow: false } } : {}),
};

export default function InteresCompuestoPage() {
  return <LaminaInteresCompuesto />;
}
