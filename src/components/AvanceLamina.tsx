"use client";

import { useEffect, useState } from "react";
import { leerProgreso, type ProgresoLamina } from "@/lib/progreso";

/**
 * Cuánto lleva el alumno en una lámina, leído de su navegador. En el servidor
 * no hay nada que mostrar, así que aparece recién al abrir la página.
 */
export function AvanceLamina({ href }: { href: string }) {
  const [p, setP] = useState<ProgresoLamina | null>(null);
  useEffect(() => setP(leerProgreso(href)), [href]);

  if (!p || (p.vistas.length === 0 && p.hechos === 0)) return null;

  const completa = p.total > 0 && p.vistas.length === p.total;
  const partes = [
    completa ? "Vista entera" : `Viste ${p.vistas.length} de ${p.total} tarjetas`,
    p.hechos > 0 && `${p.bien} de ${p.hechos} ejercicios bien`,
  ].filter(Boolean);

  return (
    <span className={`mt-1.5 block text-xs font-semibold tabular-nums ${completa ? "text-ok" : "text-tinta-tenue"}`}>
      {completa && <span aria-hidden>✓ </span>}
      {partes.join(" · ")}
    </span>
  );
}
