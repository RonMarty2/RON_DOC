import type { DefinicionNivel, TipoQuest } from './types';
import { NIVELES } from '@content/gamificacion/niveles';

export function calcularNivel(xpTotal: number): { nivel: number; definicion: DefinicionNivel; xpEnNivel: number; xpParaSiguiente: number; progreso: number } {
  let nivelActual = NIVELES[0];
  let nivelSiguiente = NIVELES.length > 1 ? NIVELES[1] : null;

  for (let i = 0; i < NIVELES.length; i++) {
    if (xpTotal >= NIVELES[i].xpAcumulada) {
      nivelActual = NIVELES[i];
      nivelSiguiente = i + 1 < NIVELES.length ? NIVELES[i + 1] : null;
    } else {
      break;
    }
  }

  let xpEnNivel = xpTotal - nivelActual.xpAcumulada;
  let xpParaSiguiente = nivelSiguiente ? nivelSiguiente.xpRequerida : 0;
  let progreso = nivelSiguiente ? (xpEnNivel / xpParaSiguiente) * 100 : 100;

  return {
    nivel: nivelActual.nivel,
    definicion: nivelActual,
    xpEnNivel,
    xpParaSiguiente,
    progreso: Math.min(100, Math.max(0, progreso))
  };
}

export function xpPorQuiz(puntaje: number, tipo: TipoQuest): number {
  let multiplicador = 1;
  switch (tipo) {
    case 'quiz-rapido': multiplicador = 1; break;
    case 'desafio': multiplicador = 1.5; break;
    case 'boss': multiplicador = 2; break;
    default: multiplicador = 1;
  }
  
  // Asumiendo puntaje sobre 100
  return Math.floor(puntaje * multiplicador);
}

export function xpPorLectura(): number {
  return 50;
}

export function xpBonusRacha(racha: number): number {
  if (racha >= 30) return 500;
  if (racha >= 14) return 200;
  if (racha >= 7) return 100;
  if (racha >= 3) return 50;
  return 0;
}

export function xpBonusPrimerQuiz(): number {
  return 25;
}
