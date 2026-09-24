import type { DefinicionNivel } from "@/lib/gamificacion/types";

export const NIVELES: DefinicionNivel[] = [
  { nivel: 1, nombre: "Novato", icono: "🌱", xpRequerida: 0, xpAcumulada: 0 },
  { nivel: 2, nombre: "Curioso", icono: "📖", xpRequerida: 200, xpAcumulada: 200 },
  { nivel: 3, nombre: "Explorador", icono: "🔍", xpRequerida: 350, xpAcumulada: 550 },
  { nivel: 4, nombre: "Aprendiz", icono: "📊", xpRequerida: 500, xpAcumulada: 1050 },
  { nivel: 5, nombre: "Competente", icono: "🧮", xpRequerida: 700, xpAcumulada: 1750 },
  { nivel: 6, nombre: "Analista", icono: "🎯", xpRequerida: 900, xpAcumulada: 2650 },
  { nivel: 7, nombre: "Experto", icono: "🏅", xpRequerida: 1200, xpAcumulada: 3850 },
  { nivel: 8, nombre: "Maestro", icono: "🧠", xpRequerida: 1500, xpAcumulada: 5350 },
  { nivel: 9, nombre: "Leyenda", icono: "👑", xpRequerida: 2000, xpAcumulada: 7350 },
  { nivel: 10, nombre: "Iluminado", icono: "🌟", xpRequerida: 2650, xpAcumulada: 10000 },
];
