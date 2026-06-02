/**
 * Avatar con iniciales en serif sobre fondo grafito + acento ámbar.
 * Diseñado como "sello académico" minimalista. Reemplazable por una foto
 * cuando el autor quiera (basta sustituir el contenido).
 */
export function Avatar({
  iniciales = "RM",
  tamanio = 144,
}: {
  iniciales?: string;
  tamanio?: number;
}) {
  const fuente = Math.round(tamanio * 0.42);
  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-full ring-4 ring-amber-500/20 dark:ring-amber-400/20"
      style={{ width: tamanio, height: tamanio }}
      aria-hidden
    >
      {/* Fondo: gradiente grafito */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950" />
      {/* Acento ámbar abajo a la derecha */}
      <div className="absolute -bottom-6 -right-6 h-20 w-20 rounded-full bg-amber-500/60 blur-xl" />
      {/* Iniciales */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="font-serif font-semibold leading-none text-slate-50"
          style={{ fontSize: fuente, letterSpacing: "-0.04em" }}
        >
          {iniciales}
        </span>
      </div>
      {/* Punto ámbar accent */}
      <div
        className="absolute bg-amber-500"
        style={{
          width: tamanio * 0.1,
          height: tamanio * 0.1,
          borderRadius: "9999px",
          right: tamanio * 0.12,
          bottom: tamanio * 0.12,
        }}
      />
    </div>
  );
}
