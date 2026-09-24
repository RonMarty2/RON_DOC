import type { EstadoJuego, ResultadoQuiz, EstadoMateria } from './types';

export const STORAGE_KEY = 'ron-doc-game';
export const CURRENT_VERSION = 1;

export function crearEstadoInicial(): EstadoJuego {
  return {
    version: CURRENT_VERSION,
    perfil: {
      nombre: 'Estudiante',
      avatar: '🧑‍🎓',
      xpTotal: 0,
      nivel: 1,
      rachaActual: 0,
      rachaMaxima: 0,
      ultimaActividad: new Date().toISOString(),
      fechaCreacion: new Date().toISOString()
    },
    materias: {},
    logrosDesbloqueados: [],
    historial: []
  };
}

export function cargarEstado(): EstadoJuego {
  if (typeof window === 'undefined') return crearEstadoInicial();
  
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return crearEstadoInicial();
    
    const estado = JSON.parse(data) as EstadoJuego;
    
    // Migraciones simples si la versión cambia en el futuro
    if (!estado.version || estado.version < CURRENT_VERSION) {
      estado.version = CURRENT_VERSION;
      // aplicar parches según sea necesario
    }
    
    return estado;
  } catch (error) {
    console.error('Error al cargar estado del juego:', error);
    return crearEstadoInicial();
  }
}

export function guardarEstado(estado: EstadoJuego): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(estado));
  } catch (error) {
    console.error('Error al guardar estado del juego:', error);
  }
}

export function resetearEstado(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

export function obtenerEstadoMateria(estado: EstadoJuego, slugMateria: string): EstadoMateria {
  if (!estado.materias[slugMateria]) {
    estado.materias[slugMateria] = {
      slug: slugMateria,
      temasLeidos: [],
      quizzes: {},
      questsCompletadas: [],
      xpMateria: 0
    };
  }
  return estado.materias[slugMateria];
}

export function marcarTemaLeido(slugMateria: string, slugTema: string): { estado: EstadoJuego; xpGanada: number } {
  const estado = cargarEstado();
  const mat = obtenerEstadoMateria(estado, slugMateria);
  
  if (mat.temasLeidos.includes(slugTema)) {
    return { estado, xpGanada: 0 };
  }
  
  mat.temasLeidos.push(slugTema);
  const xpGanada = 50; // XP por lectura
  
  mat.xpMateria += xpGanada;
  estado.perfil.xpTotal += xpGanada;
  estado.perfil.ultimaActividad = new Date().toISOString();
  
  estado.historial.unshift({
    fecha: new Date().toISOString(),
    tipo: 'lectura',
    detalle: `Leíste el tema: ${slugTema}`,
    xp: xpGanada
  });
  
  const estadoActualizado = actualizarRacha(estado);
  guardarEstado(estadoActualizado);
  
  return { estado: estadoActualizado, xpGanada };
}

export function registrarResultadoQuiz(slugMateria: string, resultado: ResultadoQuiz): { estado: EstadoJuego; xpGanada: number; logrosNuevos: string[] } {
  const estado = cargarEstado();
  const mat = obtenerEstadoMateria(estado, slugMateria);
  
  const xpGanada = resultado.mejorPuntaje; // Depende de la lógica real en xpSystem
  
  if (!mat.quizzes[resultado.quizId]) {
    mat.quizzes[resultado.quizId] = resultado;
  } else {
    const existente = mat.quizzes[resultado.quizId];
    existente.intentos += resultado.intentos;
    if (resultado.mejorPuntaje > existente.mejorPuntaje) {
      existente.mejorPuntaje = resultado.mejorPuntaje;
    }
    existente.ultimoIntento = resultado.ultimoIntento;
    existente.preguntasRespondidas = resultado.preguntasRespondidas;
    existente.preguntasCorrectas = resultado.preguntasCorrectas;
    existente.tiempoSegundos = resultado.tiempoSegundos;
  }
  
  mat.xpMateria += xpGanada;
  estado.perfil.xpTotal += xpGanada;
  estado.perfil.ultimaActividad = new Date().toISOString();
  
  estado.historial.unshift({
    fecha: new Date().toISOString(),
    tipo: 'quiz',
    detalle: `Completaste el quiz ${resultado.quizId} con ${resultado.mejorPuntaje} puntos`,
    xp: xpGanada
  });
  
  const estadoRacha = actualizarRacha(estado);
  guardarEstado(estadoRacha);
  
  return { estado: estadoRacha, xpGanada, logrosNuevos: [] };
}

export function actualizarRacha(estado: EstadoJuego): EstadoJuego {
  const hoy = new Date();
  const ultima = new Date(estado.perfil.ultimaActividad);
  
  hoy.setHours(0, 0, 0, 0);
  ultima.setHours(0, 0, 0, 0);
  
  const diffTime = Math.abs(hoy.getTime() - ultima.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  
  if (diffDays === 1) {
    estado.perfil.rachaActual += 1;
    if (estado.perfil.rachaActual > estado.perfil.rachaMaxima) {
      estado.perfil.rachaMaxima = estado.perfil.rachaActual;
    }
  } else if (diffDays > 1) {
    estado.perfil.rachaActual = 1;
  }
  
  estado.perfil.ultimaActividad = new Date().toISOString();
  return estado;
}
