import type { Metadata } from "next";
import { esBorrador } from "@/lib/publicado";
import { LaminaDepreciaciones } from "./LaminaDepreciaciones";

// Mientras sea borrador en content/materias.ts, no se indexa.
export const metadata: Metadata = {
  title: "Depreciaciones",
  ...(esBorrador("/depreciaciones") ? { robots: { index: false, follow: false } } : {}),
};

export default function DepreciacionesPage() {
  return <LaminaDepreciaciones />;
}
