"use client";

/**
 * BotonLectura — Permite al estudiante marcar un tema como leído.
 * Otorga XP y completa la quest de lectura asociada.
 */

import { useState, useEffect } from "react";
import type { EstadoJuego } from "@/lib/gamificacion/types";
import { cargarEstado, marcarTemaLeido } from "@/lib/gamificacion/gameState";
import { completarQuest } from "@/lib/gamificacion/questSystem";
import { guardarEstado } from "@/lib/gamificacion/gameState";
import { verificarLogros, obtenerLogro } from "@/lib/gamificacion/achievementSystem";
import { LogroToast } from "./LogroToast";

interface BotonLecturaProps {
  slugMateria: string;
  slugTema: string;
  /** Número de tema (1-based) para encontrar la quest. */
  temaNumero: number;
}

export function BotonLectura({
  slugMateria,
  slugTema,
  temaNumero,
}: BotonLecturaProps) {
  const [leido, setLeido] = useState(false);
  const [xpMostrar, setXpMostrar] = useState(0);
  const [animando, setAnimando] = useState(false);
  const [logroVisible, setLogroVisible] = useState(false);
  const [logroActual, setLogroActual] = useState<any>(null);

  useEffect(() => {
    const estado = cargarEstado();
    const materiaEstado = estado.materias[slugMateria];
    if (materiaEstado?.temasLeidos.includes(slugTema)) {
      setLeido(true);
    }
  }, [slugMateria, slugTema]);

  const handleMarcarLeido = () => {
    if (leido) return;

    // Marcar como leído (da XP)
    const { estado, xpGanada } = marcarTemaLeido(slugMateria, slugTema);

    // Completar la quest de lectura correspondiente
    const questId = `pde-t${temaNumero}-lectura`;
    const estadoConQuest = completarQuest(questId, estado);

    // Verificar logros nuevos
    const logrosNuevos = verificarLogros(estadoConQuest);
    if (logrosNuevos.length > 0) {
      estadoConQuest.logrosDesbloqueados.push(...logrosNuevos);
      const primerLogro = obtenerLogro(logrosNuevos[0]);
      if (primerLogro) {
        setLogroActual(primerLogro);
        setLogroVisible(true);
      }
    }

    guardarEstado(estadoConQuest);

    // Animación
    setLeido(true);
    setXpMostrar(xpGanada);
    setAnimando(true);
    setTimeout(() => setAnimando(false), 2000);
  };

  if (leido) {
    return (
      <div className="relative">
        <div
          className={`flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 dark:border-green-900 dark:bg-green-950/30 ${
            animando ? "animate-pulse" : ""
          }`}
        >
          <span className="text-lg">✅</span>
          <span className="text-sm font-medium text-green-700 dark:text-green-400">
            Tema completado
          </span>
          {animando && xpMostrar > 0 && (
            <span className="ml-auto animate-bounce font-mono text-sm font-bold text-green-600 dark:text-green-400">
              +{xpMostrar} XP ⭐
            </span>
          )}
        </div>

        {logroActual && (
          <LogroToast
            logro={logroActual}
            visible={logroVisible}
            onClose={() => setLogroVisible(false)}
          />
        )}
      </div>
    );
  }

  return (
    <button
      onClick={handleMarcarLeido}
      className="group flex w-full items-center gap-3 rounded-xl border-2 border-dashed border-blue-300 bg-blue-50/50 px-4 py-3 transition hover:border-blue-400 hover:bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20 dark:hover:border-blue-700 dark:hover:bg-blue-950/40"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-lg transition group-hover:scale-110 dark:bg-blue-900">
        📖
      </span>
      <div className="text-left">
        <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">
          Marcar como leído
        </p>
        <p className="text-xs text-blue-500 dark:text-blue-400">
          +50 XP · Desbloquea el quiz de este tema
        </p>
      </div>
      <span className="ml-auto text-xl transition group-hover:scale-125">
        ⭐
      </span>
    </button>
  );
}
