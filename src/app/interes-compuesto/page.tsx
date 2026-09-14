import type { Metadata } from "next";
import { LaminaInteresCompuesto } from "./LaminaInteresCompuesto";

// Sin enlaces ni indexación hasta que Ronald la revise contra su dossier de Matemática Financiera.
export const metadata: Metadata = {
  title: "Interés compuesto e inflación",
  robots: { index: false, follow: false },
};

export default function InteresCompuestoPage() {
  return <LaminaInteresCompuesto />;
}
