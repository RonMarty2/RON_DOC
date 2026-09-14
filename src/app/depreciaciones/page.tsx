import type { Metadata } from "next";
import { LaminaDepreciaciones } from "./LaminaDepreciaciones";

// Sin enlaces ni indexación hasta que Ronald la revise contra su dossier de Matemática Financiera.
export const metadata: Metadata = {
  title: "Depreciaciones",
  robots: { index: false, follow: false },
};

export default function DepreciacionesPage() {
  return <LaminaDepreciaciones />;
}
