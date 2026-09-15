import type { Metadata } from "next";
import { metadataDeHerramienta } from "@/lib/seo";
import { LaminaDepreciaciones } from "./LaminaDepreciaciones";

// Título, descripción e imagen para compartir salen de content/materias.ts; mientras sea borrador, no se indexa.
export const metadata: Metadata = metadataDeHerramienta("/depreciaciones", "Depreciaciones");

export default function DepreciacionesPage() {
  return <LaminaDepreciaciones />;
}
