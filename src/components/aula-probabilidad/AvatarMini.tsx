import { colorAvatar } from "./aleatorio";

/**
 * Avatar mini: silueta sobria con inicial sobre un círculo de color.
 * Pensado para grillas grandes. NO emoji, NO caricatura — limpio y serio.
 * Si `resaltado` es true, se enmarca con un anillo amber + destello.
 */
export function AvatarMini({
  inicial,
  seed,
  etiqueta,
  resaltado = false,
  parpadea = false,
}: {
  inicial: string;
  seed: number;
  etiqueta?: string;
  resaltado?: boolean;
  parpadea?: boolean;
}) {
  return (
    <div
      className={
        "flex flex-col items-center gap-1 transition-transform " +
        (resaltado ? "scale-105" : "")
      }
    >
      <div
        className={
          "relative grid h-10 w-10 place-items-center rounded-full font-serif text-base font-semibold text-white shadow-sm sm:h-12 sm:w-12 " +
          colorAvatar(seed) +
          " " +
          (resaltado
            ? "ring-4 ring-amber-400 ring-offset-2 ring-offset-white dark:ring-offset-slate-950"
            : "ring-1 ring-black/5") +
          " " +
          (parpadea ? "aula-parpadea" : "")
        }
      >
        {inicial}
        {resaltado && (
          <span
            aria-hidden
            className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-amber-400 text-[10px] font-bold text-amber-900 shadow"
          >
            ★
          </span>
        )}
      </div>
      {etiqueta && (
        <span
          className={
            "text-[10px] tabular-nums sm:text-xs " +
            (resaltado
              ? "font-semibold text-amber-700 dark:text-amber-300"
              : "text-slate-500 dark:text-slate-400")
          }
        >
          {etiqueta}
        </span>
      )}
    </div>
  );
}
