"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Tema = "claro" | "oscuro";

interface TemaContextValue {
  tema: Tema;
  alternar: () => void;
}

const TemaContext = createContext<TemaContextValue | null>(null);

/**
 * Provee el tema claro/oscuro y persiste la preferencia en localStorage.
 * Aplica la clase `.dark` en <html> para que Tailwind y los estilos respondan.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [tema, setTema] = useState<Tema>("claro");

  useEffect(() => {
    const guardado = localStorage.getItem("ron-doc-tema") as Tema | null;
    const prefiereOscuro = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const inicial: Tema = guardado ?? (prefiereOscuro ? "oscuro" : "claro");
    setTema(inicial);
    document.documentElement.classList.toggle("dark", inicial === "oscuro");
  }, []);

  function alternar() {
    setTema((actual) => {
      const nuevo = actual === "claro" ? "oscuro" : "claro";
      document.documentElement.classList.toggle("dark", nuevo === "oscuro");
      localStorage.setItem("ron-doc-tema", nuevo);
      return nuevo;
    });
  }

  return (
    <TemaContext.Provider value={{ tema, alternar }}>
      {children}
    </TemaContext.Provider>
  );
}

export function useTema() {
  const ctx = useContext(TemaContext);
  if (!ctx) throw new Error("useTema debe usarse dentro de <ThemeProvider>");
  return ctx;
}
