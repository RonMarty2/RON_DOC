"use client";

import { useMemo, useState } from "react";
import { AvatarMini } from "./AvatarMini";
import { bernoulli, inicialAleatoria } from "./aleatorio";

interface EstudianteCond {
  id: number;
  inicial: string;
  duermeMal: boolean;
  ansiedad: boolean;
  depresion: boolean;
}

type Atributo = "duermeMal" | "ansiedad" | "depresion";

const NOMBRES: Record<Atributo, string> = {
  duermeMal: "duerme mal",
  ansiedad: "tiene ansiedad",
  depresion: "tiene síntomas depresivos",
};

function generar(tam: number, prevs: Record<Atributo, number>): EstudianteCond[] {
  return Array.from({ length: tam }, (_, i) => {
    const duermeMal = bernoulli(prevs.duermeMal);
    // Ansiedad y depresión están correlacionadas con dormir mal — más interesante didácticamente.
    const ansiedad = bernoulli(duermeMal ? prevs.ansiedad * 1.8 : prevs.ansiedad * 0.5);
    const depresion = bernoulli(duermeMal ? prevs.depresion * 2 : prevs.depresion * 0.4);
    return {
      id: i,
      inicial: inicialAleatoria(),
      duermeMal,
      ansiedad,
      depresion: Math.min(1, prevs.depresion) > 0 ? depresion : false,
    };
  });
}

/**
 * Módulo C — Probabilidad condicional.
 * El docente aplica un filtro (ej. "los que duermen mal") y se ve cómo la
 * proporción de otro atributo (ej. depresión) cambia respecto al total.
 */
export function ModuloCondicional() {
  const [tam, setTam] = useState(40);
  const [prevs] = useState<Record<Atributo, number>>({
    duermeMal: 0.4,
    ansiedad: 0.25,
    depresion: 0.18,
  });
  const [aula, setAula] = useState<EstudianteCond[]>(() => generar(40, prevs));
  const [filtro, setFiltro] = useState<Atributo | null>("duermeMal");
  const [observar, setObservar] = useState<Atributo>("depresion");

  function regenerar(nuevoTam: number = tam) {
    setTam(nuevoTam);
    setAula(generar(nuevoTam, prevs));
  }

  const stats = useMemo(() => {
    const total = aula.length;
    const conObs = aula.filter((e) => e[observar]).length;
    const conFiltro = filtro ? aula.filter((e) => e[filtro]) : aula;
    const subTotal = conFiltro.length;
    const subConObs = conFiltro.filter((e) => e[observar]).length;
    return {
      total,
      conObs,
      pTotal: total > 0 ? conObs / total : 0,
      subTotal,
      subConObs,
      pCond: subTotal > 0 ? subConObs / subTotal : 0,
    };
  }, [aula, filtro, observar]);

  const cambio = stats.pCond - stats.pTotal;

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
              min={10}
              max={60}
              value={tam}
              onChange={(e) => regenerar(Number(e.target.value))}
              className="w-44 accent-blue-600"
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

        <div className="ml-auto flex flex-wrap gap-2">
          <Selector
            etiqueta="Filtro (condición)"
            opciones={[
              { id: null, label: "Sin filtro (toda el aula)" },
              { id: "duermeMal", label: "Duermen mal" },
              { id: "ansiedad", label: "Ansiedad" },
            ]}
            valor={filtro}
            onChange={setFiltro}
          />
          <Selector
            etiqueta="Observar"
            opciones={[
              { id: "depresion", label: "Depresión" },
              { id: "ansiedad", label: "Ansiedad" },
              { id: "duermeMal", label: "Duerme mal" },
            ]}
            valor={observar}
            onChange={(v) => setObservar(v as Atributo)}
          />
        </div>
      </div>

      {/* Comparación lado a lado */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Tarjeta
          titulo="En toda el aula"
          formula={`P(${NOMBRES[observar]})`}
          valor={stats.pTotal}
          numerador={stats.conObs}
          denominador={stats.total}
          tono="azul"
        />
        <Tarjeta
          titulo={
            filtro
              ? `Sólo entre los que ${NOMBRES[filtro]}`
              : "Sólo entre los que cumplen el filtro"
          }
          formula={
            filtro
              ? `P(${NOMBRES[observar]} | ${NOMBRES[filtro]})`
              : `P(${NOMBRES[observar]})`
          }
          valor={stats.pCond}
          numerador={stats.subConObs}
          denominador={stats.subTotal}
          tono="ambar"
        />
      </div>

      {/* Mensaje pedagógico */}
      {filtro && Math.abs(cambio) > 0.04 && (
        <div className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200">
          <strong>Ajá:</strong> al saber que el estudiante {NOMBRES[filtro]},
          la probabilidad de que también {NOMBRES[observar]}{" "}
          {cambio > 0 ? "sube" : "baja"}{" "}
          <span className="tabular-nums font-semibold">
            {(stats.pTotal * 100).toFixed(0)}% → {(stats.pCond * 100).toFixed(0)}%
          </span>
          . Eso es probabilidad condicional: la información cambia la probabilidad.
        </div>
      )}

      {/* Grilla con resaltado */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-900/40 sm:p-6">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Amarillo: cumple el filtro · ★: además tiene el atributo observado
          </p>
        </div>
        <div className="grid grid-cols-5 gap-3 sm:grid-cols-8 md:grid-cols-10">
          {aula.map((e) => {
            const cumpleFiltro = filtro ? e[filtro] : true;
            const cumpleObs = e[observar];
            return (
              <AvatarMini
                key={e.id}
                inicial={e.inicial}
                seed={e.id}
                resaltado={cumpleFiltro && cumpleObs}
                etiqueta={cumpleFiltro ? (cumpleObs ? "★ ambos" : "filtro") : ""}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Selector<T extends string | null>({
  etiqueta,
  opciones,
  valor,
  onChange,
}: {
  etiqueta: string;
  opciones: { id: T; label: string }[];
  valor: T;
  onChange: (v: T) => void;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {etiqueta}
      </span>
      <select
        value={valor === null ? "__null__" : valor}
        onChange={(e) =>
          onChange((e.target.value === "__null__" ? null : (e.target.value as string)) as T)
        }
        className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
      >
        {opciones.map((op) => (
          <option key={op.id === null ? "__null__" : op.id} value={op.id === null ? "__null__" : op.id}>
            {op.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function Tarjeta({
  titulo,
  formula,
  valor,
  numerador,
  denominador,
  tono,
}: {
  titulo: string;
  formula: string;
  valor: number;
  numerador: number;
  denominador: number;
  tono: "azul" | "ambar";
}) {
  const clases =
    tono === "azul"
      ? "border-blue-200 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-950/20"
      : "border-amber-300 bg-amber-50/60 dark:border-amber-800 dark:bg-amber-950/20";
  const textoColor =
    tono === "azul"
      ? "text-blue-700 dark:text-blue-300"
      : "text-amber-700 dark:text-amber-300";
  return (
    <div className={"rounded-2xl border p-5 " + clases}>
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {titulo}
      </p>
      <p className={"mt-1 font-mono text-sm font-semibold " + textoColor}>
        {formula}
      </p>
      <p className={"mt-3 font-serif text-5xl font-semibold tabular-nums " + textoColor}>
        {(valor * 100).toFixed(0)}%
      </p>
      <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
        <span className="tabular-nums">{numerador}</span> de{" "}
        <span className="tabular-nums">{denominador}</span> estudiantes
      </p>
    </div>
  );
}
