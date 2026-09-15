import type { Metadata } from "next";
import { metadataDeHerramienta } from "@/lib/seo";
import { LaminaBonos } from "./LaminaBonos";

// Título, descripción e imagen para compartir salen de content/materias.ts; mientras sea borrador, no se indexa.
export const metadata: Metadata = metadataDeHerramienta("/bonos");

export default function BonosPage() {
  return <LaminaBonos />;
}
