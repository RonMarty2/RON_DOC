import type { Metadata } from "next";
import { LaminaAnualidades } from "./LaminaAnualidades";

// Sin enlaces ni indexación hasta que Ronald la revise contra su dossier de Matemática Financiera.
export const metadata: Metadata = {
  title: "Anualidades",
  robots: { index: false, follow: false },
};

export default function AnualidadesPage() {
  return <LaminaAnualidades />;
}
