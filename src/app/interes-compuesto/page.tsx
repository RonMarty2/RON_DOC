import type { Metadata } from "next";
import { metadataDeHerramienta } from "@/lib/seo";
import { LaminaInteresCompuesto } from "./LaminaInteresCompuesto";

// Título, descripción e imagen para compartir salen de content/materias.ts; mientras sea borrador, no se indexa.
export const metadata: Metadata = metadataDeHerramienta("/interes-compuesto");

export default function InteresCompuestoPage() {
  return <LaminaInteresCompuesto />;
}
