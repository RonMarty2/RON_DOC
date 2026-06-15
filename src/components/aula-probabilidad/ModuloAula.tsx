"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AvatarMini } from "./AvatarMini";
import { BarraSim } from "./BarraSim";
import { VotacionSimulada } from "./VotacionSimulada";
import {
  cumpleAleatorio,
  diaDelAnioATexto,
  inicialAleatoria,
  simularEnLotes,
  tieneCoincidencia,
} from "./aleatorio";

interface Estudiante {
  id: number;
  inicial: string;
  cumple: number;
}

/** Probabilidad teórica de coincidencia en aula de n personas. */
function probabilidadTeoricaCumple(n: number): number {
  if (n < 2) return 0;
  let pSinCoincidencia = 1;
  for (let i = 0; i < n; i++) {
    pSinCoincidencia *= (365 - i) / 365;
  }
  return 1 - pSinCoincidencia;
}

function generarAula(tam: number): Estudiante[] {
  return Array.from({ length: tam }, (_, i) => ({
    id: i,
    inicial: inicialAleatoria(),
    cumple: cumpleAleatorio(),
  }));
}

export function ModuloAula() {
  const [tam, setTam] = useState(23);
  const [aula, setAula] = useState<Estudiante[]>(() => generarAula(23));

  // Map: cumple -> ids que lo comparten (sólo los con >=2)
  const coincidencias = useMemo(() => {
    const grupos = new Map<number, number[]>();
    for (const e of aula) {
      const lista = grupos.get(e.cumple) ?? [];
      lista.push(e.id);
      grupos.set(e.cumple, lista);
    }
    const resaltados = new Set<number>();
    let totalGrupos = 0;
    for (const lista of grupos.values()) {
      if (lista.length >= 2) {
        totalGrupos++;
        lista.forEach((id) => resaltados.add(id));
      }
    }
    return { resaltados, totalGrupos };
  }, [aula]);

  function regenerar(nuevoTam: number = tam) {
    setTam(nuevoTam);
    setAula(generarAula(nuevoTam));
  }

  /* ---------- simulación acumulada de N aulas ---------- */
  const [simTotal, setSimTotal] = useState(0);
  const [simConCoincidencia, setSimConCoincidencia] = useState(0);
  const [simEnCurso, setSimEnCurso] = useState(false);
  const cancelarRef = useRef<(() => void) | null>(null);

  useEffect(() => () => cancelarRef.current?.(), []);

  function simularMuchas(N: number) {
    cancelarRef.current?.();
    setSimEnCurso(true);
    setSimTotal(0);
    setSimConCoincidencia(0);

    let conCoincidencia = 0;
    const tamFijo = tam;
    cancelarRef.current = simularEnLotes<boolean>({
      total: N,
      tamLote: 80,
      unaIteracion: () => {
        const cumples = Array.from({ length: tamFijo }, () => cumpleAleatorio());
        return tieneCoincidencia(cumples);
      },
      acumular: (acc, nueva) => {
        if (nueva) conCoincidencia++;
        return acc; // no acumulamos array; mantenemos contadores externos
      },
      acumuladoInicial: [],
      enProgreso: (hechas) => {
        setSimTotal(hechas);
        setSimConCoincidencia(conCoincidencia);
      },
      alTerminar: () => setSimEnCurso(false),
    });
  }

  const pctSim = simTotal > 0 ? (simConCoincidencia / simTotal) * 100 : 0;
  const pctTeorico = probabilidadTeoricaCumple(tam) * 100;
  const progresoSim = simTotal === 0 ? 1 : simTotal / Math.max(simTotal, 1000);

  return (
    <div className="flex flex-col gap-8">
      {/* Controles */}
      <div className="flex flex-wrap items-end gap-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <label className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Tamaño del aula
          </span>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={5}
              max={60}
              step={1}
              value={tam}
              onChange={(e) => regenerar(Number(e.target.value))}
              className="w-48 accent-blue-600"
            />
            <span className="w-10 text-right font-serif text-xl font-semibold tabular-nums text-slate-900 dark:text-slate-100">
              {tam}
            </span>
          </div>
        </label>
        <button
          type="button"
          onClick={() => regenerar()}
          className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          🎲 Generar otra aula
        </button>
        <div className="ml-auto rounded-lg bg-amber-50 px-3 py-2 text-sm dark:bg-amber-950/30">
          <span className="text-amber-800 dark:text-amber-200">
            {coincidencias.totalGrupos > 0
              ? `${coincidencias.totalGrupos} grupo${coincidencias.totalGrupos > 1 ? "s" : ""} con cumpleaños compartido`
              : "Esta aula no tiene coincidencias"}
          </span>
        </div>
      </div>

      {/* Grilla de avatares */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-900/40 sm:p-6">
        <div className="grid grid-cols-5 gap-3 sm:grid-cols-8 md:grid-cols-10">
          {aula.map((e) => (
            <AvatarMini
              key={e.id}
              inicial={e.inicial}
              seed={e.id}
              etiqueta={diaDelAnioATexto(e.cumple)}
              resaltado={coincidencias.resaltados.has(e.id)}
            />
          ))}
        </div>
      </div>

      {/* Votación de clase (antes de revelar la simulación) */}
      <VotacionSimulada
        pregunta={`¿Creés que en un aula de ${tam} estudiantes habrá al menos dos con el mismo cumpleaños?`}
        opciones={[
          { id: "si", texto: "Sí, seguro", esCorrecta: tam >= 23 },
          { id: "tal-vez", texto: "Tal vez, no estoy seguro/a" },
          { id: "no", texto: "No, son demasiados días posibles" },
          { id: "imposible", texto: "Imposible, son solo 30 personas" },
        ]}
        // La intuición típica subestima la probabilidad de coincidencia.
        pesos={[0.12, 0.22, 0.46, 0.20]}
        notaRevelacion={
          tam >= 23
            ? `La intuición es que es muy poco probable, pero con ${tam} estudiantes la probabilidad real ronda el ${(probabilidadTeoricaCumple(tam) * 100).toFixed(0)}%. Mirá el acumulador abajo.`
            : `Con sólo ${tam} estudiantes la probabilidad es de ~${(probabilidadTeoricaCumple(tam) * 100).toFixed(0)}%. Probá subir el tamaño y volver a votar.`
        }
      />

      {/* Acumulador */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <h4 className="font-serif text-lg font-semibold text-slate-900 dark:text-slate-100">
              Acumulador: simulá muchas aulas
            </h4>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Una sola aula puede o no tener coincidencia. Pero si simulamos
              cientos, la frecuencia se acerca al valor teórico.
            </p>
          </div>
          <div className="flex gap-2">
            {[100, 1000, 5000].map((n) => (
              <button
                key={n}
                type="button"
                disabled={simEnCurso}
                onClick={() => simularMuchas(n)}
                className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300 dark:hover:bg-blue-950/70"
              >
                Simular {n.toLocaleString("es")}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <BarraSim
            etiqueta={`% de aulas (de ${tam} estudiantes) con al menos una coincidencia`}
            porcentaje={pctSim}
            progreso={simEnCurso ? Math.min(1, progresoSim) : 1}
            esperadoPct={pctTeorico}
            color="azul"
          />
          <p className="mt-3 text-xs text-slate-500 dark:text-slate-500">
            Aulas simuladas: <span className="tabular-nums">{simTotal.toLocaleString("es")}</span>
            {" · "}
            Con coincidencia:{" "}
            <span className="tabular-nums">
              {simConCoincidencia.toLocaleString("es")}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
