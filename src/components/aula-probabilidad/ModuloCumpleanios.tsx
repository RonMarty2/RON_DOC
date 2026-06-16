"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ESTUDIANTES } from "@content/aula-probabilidad/dataset";
import { coincidenciasCumple } from "./calculos";
import { AvatarMini } from "./AvatarMini";
import { BarraSim } from "./BarraSim";
import { VotacionSimulada } from "./VotacionSimulada";
import { MiniHistoria } from "./narrativa";
import { cumpleAleatorio, simularEnLotes, tieneCoincidencia } from "./aleatorio";

/** Probabilidad teórica de coincidencia en aula de n personas. */
function probabilidadTeoricaCumple(n: number): number {
  if (n < 2) return 0;
  let pSin = 1;
  for (let i = 0; i < n; i++) pSin *= (365 - i) / 365;
  return 1 - pSin;
}

export function ModuloCumpleanios() {
  // Coincidencias REALES del grupo de 60.
  const coincidencias = useMemo(() => coincidenciasCumple(), []);
  const idsResaltados = useMemo(() => {
    const s = new Set<number>();
    coincidencias.forEach((c) => c.ids.forEach((id) => s.add(id)));
    return s;
  }, [coincidencias]);

  // Mapa id -> índice de grupo de coincidencia (para etiqueta).
  const grupoDeId = useMemo(() => {
    const m = new Map<number, number>();
    coincidencias.forEach((c, gi) => c.ids.forEach((id) => m.set(id, gi)));
    return m;
  }, [coincidencias]);

  /* ---------- acumulador de N aulas (a prueba de fallas) ---------- */
  const [tamSim, setTamSim] = useState(30);
  const [simTotal, setSimTotal] = useState(0);
  const [simCoincide, setSimCoincide] = useState(0);
  const [simEnCurso, setSimEnCurso] = useState(false);
  const cancelarRef = useRef<(() => void) | null>(null);
  useEffect(() => () => cancelarRef.current?.(), []);

  function simular(N: number) {
    cancelarRef.current?.();
    setSimEnCurso(true);
    setSimTotal(0);
    setSimCoincide(0);
    let coincide = 0;
    const tam = tamSim;
    cancelarRef.current = simularEnLotes<boolean>({
      total: N,
      tamLote: 80,
      unaIteracion: () => {
        const cumples = Array.from({ length: tam }, () => cumpleAleatorio());
        return tieneCoincidencia(cumples);
      },
      acumular: (acc, hay) => {
        if (hay) coincide++;
        return acc;
      },
      acumuladoInicial: [],
      enProgreso: (h) => {
        setSimTotal(h);
        setSimCoincide(coincide);
      },
      alTerminar: () => setSimEnCurso(false),
    });
  }

  const pctSim = simTotal > 0 ? (simCoincide / simTotal) * 100 : 0;
  const pctTeorico = probabilidadTeoricaCumple(tamSim) * 100;

  return (
    <div className="flex flex-col gap-8">
      <MiniHistoria titulo="Vemos premoniciones donde sólo hay azar">
        Cuando dos personas comparten cumpleaños sentimos que «el universo
        conspira». Pero con sólo 23 personas la probabilidad de coincidencia ya
        supera el 50%, y con 30 ronda el 70%. No es magia ni destino: es
        combinatoria. El cerebro busca patrones con significado donde sólo hay
        probabilidad.
      </MiniHistoria>

      {/* Grupo real con coincidencias resaltadas */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-900/40 sm:p-6">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h4 className="font-serif text-lg font-semibold text-slate-900 dark:text-slate-100">
            El grupo real de Andrea (60 estudiantes)
          </h4>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
            {coincidencias.length} fechas compartidas
          </span>
        </div>
        <div className="grid grid-cols-5 gap-3 sm:grid-cols-8 md:grid-cols-10">
          {ESTUDIANTES.map((e) => (
            <AvatarMini
              key={e.id}
              inicial={e.nombre[0]}
              seed={e.id}
              etiqueta={e.cumple}
              resaltado={idsResaltados.has(e.id)}
            />
          ))}
        </div>

        {/* Detalle de coincidencias */}
        <ul className="mt-4 flex flex-wrap gap-2">
          {coincidencias.map((c, gi) => (
            <li
              key={c.clave}
              className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs text-amber-900 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200"
            >
              <span className="font-semibold">
                {ESTUDIANTES.find((e) => e.id === c.ids[0])?.cumple}
              </span>
              {" · "}
              {c.nombres.join(", ")}
              {c.ids.length >= 4 && " 🎉 ¡4 personas!"}
            </li>
          ))}
        </ul>
      </div>

      {/* Votación */}
      <VotacionSimulada
        pregunta="En este grupo de 60, ¿cuántas parejas creés que comparten cumpleaños?"
        opciones={[
          { id: "0", texto: "Ninguna o casi" },
          { id: "1-2", texto: "Una o dos" },
          { id: "3-5", texto: "Entre tres y cinco", esCorrecta: true },
          { id: "muchas", texto: "Más de diez" },
        ]}
        pesos={[0.42, 0.34, 0.14, 0.1]}
        notaRevelacion="La intuición subestima las coincidencias. En este grupo real hay 5 fechas compartidas (una entre 4 personas). Con 60 personas la coincidencia es casi segura."
      />

      {/* Acumulador a prueba de fallas */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h4 className="font-serif text-lg font-semibold text-slate-900 dark:text-slate-100">
              Acumulador: simular muchas aulas
            </h4>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Una sola aula puede no coincidir. Pero al simular cientos, el % se
              clava en el valor teórico — nunca falla ante el público.
            </p>
          </div>
          <label className="flex items-center gap-2 text-xs">
            <span className="font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Tamaño
            </span>
            <input
              type="range"
              min={10}
              max={50}
              value={tamSim}
              onChange={(e) => setTamSim(Number(e.target.value))}
              className="w-32 accent-blue-600"
            />
            <span className="w-8 text-right font-serif text-lg font-semibold tabular-nums text-slate-900 dark:text-slate-100">
              {tamSim}
            </span>
          </label>
        </div>

        <div className="mt-4 flex gap-2">
          {[100, 1000, 5000].map((n) => (
            <button
              key={n}
              type="button"
              disabled={simEnCurso}
              onClick={() => simular(n)}
              className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300"
            >
              Simular {n.toLocaleString("es")}
            </button>
          ))}
        </div>

        <div className="mt-5">
          <BarraSim
            etiqueta={`% de aulas de ${tamSim} con al menos una coincidencia`}
            porcentaje={pctSim}
            progreso={simEnCurso ? Math.min(1, simTotal / 1000) : 1}
            esperadoPct={pctTeorico}
            color="azul"
          />
          <p className="mt-3 text-xs text-slate-500 dark:text-slate-500">
            Aulas simuladas: <span className="tabular-nums">{simTotal.toLocaleString("es")}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
