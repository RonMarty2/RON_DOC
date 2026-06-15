"use client";

import { useEffect, useRef, useState } from "react";
import { BarraSim } from "./BarraSim";
import { entero, simularEnLotes } from "./aleatorio";

type Estado =
  | { fase: "elegir"; premio: number }
  | { fase: "decidir"; premio: number; eleccion: number; abierta: number }
  | {
      fase: "resultado";
      premio: number;
      eleccion: number;
      abierta: number;
      cambioElegido: boolean;
    };

function nuevaPartida(): Estado {
  return { fase: "elegir", premio: entero(0, 2) };
}

/**
 * Modo manual: el usuario juega una partida.
 * - elige una puerta;
 * - el sistema abre una vacía (que no es el premio ni la elegida);
 * - elige quedarse o cambiar.
 */
function MontyManual({
  onResultado,
}: {
  onResultado: (gano: boolean, estrategia: "quedarse" | "cambiar") => void;
}) {
  const [estado, setEstado] = useState<Estado>(() => nuevaPartida());

  function elegir(puerta: number) {
    if (estado.fase !== "elegir") return;
    // Host abre una puerta vacía distinta a la elegida
    const opciones = [0, 1, 2].filter((p) => p !== puerta && p !== estado.premio);
    const abierta = opciones[entero(0, opciones.length - 1)];
    setEstado({ fase: "decidir", premio: estado.premio, eleccion: puerta, abierta });
  }

  function decidir(cambiar: boolean) {
    if (estado.fase !== "decidir") return;
    const otraPuerta = [0, 1, 2].find(
      (p) => p !== estado.eleccion && p !== estado.abierta
    )!;
    const elegidaFinal = cambiar ? otraPuerta : estado.eleccion;
    const gano = elegidaFinal === estado.premio;
    setEstado({
      fase: "resultado",
      premio: estado.premio,
      eleccion: estado.eleccion,
      abierta: estado.abierta,
      cambioElegido: cambiar,
    });
    onResultado(gano, cambiar ? "cambiar" : "quedarse");
  }

  function reset() {
    setEstado(nuevaPartida());
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <h4 className="font-serif text-lg font-semibold text-slate-900 dark:text-slate-100">
        Modo manual: jugá vos
      </h4>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
        Detrás de una puerta hay una beca. Elegí una y después decidí si te
        quedás o cambiás.
      </p>

      <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-4">
        {[0, 1, 2].map((p) => (
          <Puerta
            key={p}
            numero={p + 1}
            estado={estado}
            mia={p}
            onElegir={() => elegir(p)}
          />
        ))}
      </div>

      <div className="mt-5">
        {estado.fase === "elegir" && (
          <p className="text-sm text-slate-600 dark:text-slate-400">
            👆 Tocá una puerta.
          </p>
        )}
        {estado.fase === "decidir" && (
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              La puerta {estado.abierta + 1} estaba vacía. ¿Qué hacés?
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => decidir(false)}
                className="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              >
                Me quedo
              </button>
              <button
                type="button"
                onClick={() => decidir(true)}
                className="rounded-full bg-amber-500 px-4 py-1.5 text-sm font-semibold text-white hover:bg-amber-600"
              >
                Cambio
              </button>
            </div>
          </div>
        )}
        {estado.fase === "resultado" && (
          <div className="flex flex-wrap items-center gap-3">
            {(() => {
              const finalElegida = estado.cambioElegido
                ? [0, 1, 2].find(
                    (p) => p !== estado.eleccion && p !== estado.abierta
                  )!
                : estado.eleccion;
              const gano = finalElegida === estado.premio;
              return (
                <p
                  className={
                    "text-sm font-semibold " +
                    (gano
                      ? "text-emerald-700 dark:text-emerald-300"
                      : "text-rose-700 dark:text-rose-300")
                  }
                >
                  {gano ? "🎉 Ganaste la beca" : "😬 No esta vez"} (estrategia:{" "}
                  {estado.cambioElegido ? "cambiar" : "quedarse"})
                </p>
              );
            })()}
            <button
              type="button"
              onClick={reset}
              className="rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-700 hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300"
            >
              Nueva partida
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Puerta({
  numero,
  estado,
  mia,
  onElegir,
}: {
  numero: number;
  estado: Estado;
  mia: number;
  onElegir: () => void;
}) {
  const elegida =
    estado.fase !== "elegir" && estado.eleccion === mia;
  const abierta =
    estado.fase !== "elegir" && estado.abierta === mia;
  const muestraResultado = estado.fase === "resultado";
  const esElPremio = muestraResultado && estado.premio === mia;

  return (
    <button
      type="button"
      onClick={onElegir}
      disabled={estado.fase !== "elegir"}
      className={
        "group relative flex aspect-[2/3] flex-col items-center justify-center rounded-xl border-4 p-2 transition " +
        (abierta
          ? "border-slate-300 bg-slate-100 dark:border-slate-700 dark:bg-slate-800"
          : elegida
            ? "border-blue-600 bg-blue-50 dark:border-blue-400 dark:bg-blue-950/30"
            : "border-amber-700 bg-amber-100 hover:border-amber-800 hover:bg-amber-200 dark:border-amber-900 dark:bg-amber-950/30 dark:hover:bg-amber-950/50") +
        (estado.fase === "elegir" ? " cursor-pointer" : " cursor-default")
      }
      aria-label={`Puerta ${numero}`}
    >
      <span className="font-serif text-3xl font-bold text-slate-900 sm:text-5xl dark:text-slate-100">
        {numero}
      </span>
      {abierta && (
        <span className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Vacía
        </span>
      )}
      {muestraResultado && esElPremio && (
        <span className="mt-1 text-xl">🏆</span>
      )}
      {elegida && (
        <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
          Tu elección
        </span>
      )}
    </button>
  );
}

/**
 * Acumulador: simula N partidas con las dos estrategias en paralelo.
 */
function MontySimulador() {
  const [enCurso, setEnCurso] = useState(false);
  const [hechas, setHechas] = useState(0);
  const [ganaQuedarse, setGanaQuedarse] = useState(0);
  const [ganaCambiar, setGanaCambiar] = useState(0);
  const cancelarRef = useRef<(() => void) | null>(null);

  useEffect(() => () => cancelarRef.current?.(), []);

  function simular(N: number) {
    cancelarRef.current?.();
    setEnCurso(true);
    setHechas(0);
    setGanaQuedarse(0);
    setGanaCambiar(0);

    let nQ = 0;
    let nC = 0;
    cancelarRef.current = simularEnLotes<boolean>({
      total: N,
      tamLote: 100,
      unaIteracion: () => {
        const premio = entero(0, 2);
        const eleccion = entero(0, 2);
        // Si me quedo, gano sii eleccion === premio.
        // Si cambio, gano sii eleccion !== premio (es complementario).
        if (eleccion === premio) nQ++;
        else nC++;
        return true;
      },
      acumular: (acc) => acc,
      acumuladoInicial: [],
      enProgreso: (h) => {
        setHechas(h);
        setGanaQuedarse(nQ);
        setGanaCambiar(nC);
      },
      alTerminar: () => setEnCurso(false),
    });
  }

  const pctQ = hechas > 0 ? (ganaQuedarse / hechas) * 100 : 0;
  const pctC = hechas > 0 ? (ganaCambiar / hechas) * 100 : 0;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <h4 className="font-serif text-lg font-semibold text-slate-900 dark:text-slate-100">
            Acumulador: simular muchas partidas
          </h4>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Cada estrategia juega N veces en paralelo. La verdad es contundente.
          </p>
        </div>
        <div className="flex gap-2">
          {[100, 1000, 10000].map((n) => (
            <button
              key={n}
              type="button"
              disabled={enCurso}
              onClick={() => simular(n)}
              className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300 dark:hover:bg-blue-950/70"
            >
              Simular {n.toLocaleString("es")}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-5">
        <BarraSim
          etiqueta="Estrategia: ME QUEDO"
          porcentaje={pctQ}
          esperadoPct={100 / 3}
          color="rojo"
          progreso={hechas === 0 ? 1 : Math.min(1, hechas / 1000)}
        />
        <BarraSim
          etiqueta="Estrategia: CAMBIO"
          porcentaje={pctC}
          esperadoPct={200 / 3}
          color="verde"
          progreso={hechas === 0 ? 1 : Math.min(1, hechas / 1000)}
        />
      </div>
      <p className="mt-4 text-xs text-slate-500 dark:text-slate-500">
        Partidas: <span className="tabular-nums">{hechas.toLocaleString("es")}</span>
      </p>
    </div>
  );
}

export function ModuloMonty() {
  const [contador, setContador] = useState({ quedarse: { jugadas: 0, ganadas: 0 }, cambiar: { jugadas: 0, ganadas: 0 } });

  function registrar(gano: boolean, estrategia: "quedarse" | "cambiar") {
    setContador((prev) => {
      const e = { ...prev[estrategia] };
      e.jugadas += 1;
      if (gano) e.ganadas += 1;
      return { ...prev, [estrategia]: e };
    });
  }

  return (
    <div className="flex flex-col gap-8">
      <MontyManual onResultado={registrar} />

      {(contador.quedarse.jugadas > 0 || contador.cambiar.jugadas > 0) && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-800 dark:bg-slate-900/50">
          <strong className="text-slate-700 dark:text-slate-300">Tu historial:</strong>{" "}
          Quedándote: {contador.quedarse.ganadas}/{contador.quedarse.jugadas} ·
          Cambiando: {contador.cambiar.ganadas}/{contador.cambiar.jugadas}
        </div>
      )}

      <MontySimulador />
    </div>
  );
}
