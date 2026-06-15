/**
 * Barra horizontal animada para visualizar la convergencia de una simulación.
 * Muestra una etiqueta, un porcentaje grande, el progreso de la simulación
 * y opcionalmente una marca de "valor teórico esperado".
 */
export function BarraSim({
  etiqueta,
  porcentaje,
  progreso = 1,
  esperadoPct,
  color = "azul",
}: {
  etiqueta: string;
  /** Valor 0-100 (lo mostramos como %). */
  porcentaje: number;
  /** 0-1, qué proporción de la simulación se completó (para fade del porcentaje). */
  progreso?: number;
  /** Marcador opcional 0-100 del valor teórico esperado. */
  esperadoPct?: number;
  color?: "azul" | "ambar" | "verde" | "rojo";
}) {
  const clases = {
    azul: "bg-blue-600",
    ambar: "bg-amber-500",
    verde: "bg-emerald-600",
    rojo: "bg-rose-600",
  }[color];

  const ancho = Math.max(0, Math.min(100, porcentaje));

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {etiqueta}
        </span>
        <span
          className={
            "font-serif text-2xl font-semibold tabular-nums sm:text-3xl " +
            (progreso < 1
              ? "text-slate-400 dark:text-slate-500"
              : "text-slate-900 dark:text-slate-100")
          }
        >
          {porcentaje.toFixed(1)}%
        </span>
      </div>
      <div className="relative h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div
          className={"h-full rounded-full transition-[width] duration-150 " + clases}
          style={{ width: ancho + "%" }}
        />
        {esperadoPct !== undefined && (
          <div
            aria-hidden
            className="absolute top-0 h-full w-0.5 bg-slate-900/50 dark:bg-slate-100/50"
            style={{ left: `calc(${esperadoPct}% - 1px)` }}
            title={`Valor teórico: ${esperadoPct.toFixed(1)}%`}
          />
        )}
      </div>
      {esperadoPct !== undefined && (
        <p className="text-xs text-slate-500 dark:text-slate-500">
          Valor teórico esperado:{" "}
          <span className="font-semibold tabular-nums">
            {esperadoPct.toFixed(1)}%
          </span>
        </p>
      )}
    </div>
  );
}
