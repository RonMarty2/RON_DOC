/**
 * Componentes de presentación compartidos por todos los módulos.
 *
 * Patrón de libro, en este orden:
 *   Definicion  → qué es el término (corto, sin ejemplo)
 *   [interactivo] → el estudiante lo comprueba
 *   Formula     → la notación simbólica y la sustitución con datos, lado a lado
 *   Trampa      → el error común, por qué ocurre y cómo corregirlo
 *   Puente      → qué queda abierto y hacia dónde sigue
 */

/** Definición formal de un término — estilo libro, sin caja de color. */
export function Definicion({
  termino,
  children,
}: {
  termino: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-l-4 border-slate-800 pl-4 dark:border-slate-200">
      <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
        Definición
      </p>
      <p className="mt-0.5 font-serif text-lg font-semibold text-slate-900 dark:text-slate-100">
        {termino}
      </p>
      <div className="mt-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        {children}
      </div>
    </div>
  );
}

/** Nota conceptual corta (distinción entre dos términos que se confunden). */
export function MiniHistoria({
  titulo,
  children,
}: {
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <aside className="rounded-xl border-l-4 border-amber-400 bg-amber-50/70 px-4 py-3 text-sm dark:border-amber-500 dark:bg-amber-950/20">
      <p className="font-semibold text-amber-900 dark:text-amber-200">
        🧠 {titulo}
      </p>
      <div className="mt-1 leading-relaxed text-amber-900/80 dark:text-amber-200/80">
        {children}
      </div>
    </aside>
  );
}

/**
 * Fracción apilada, legible sin librerías de fórmulas.
 * Se usa dentro de <Formula> tanto en la columna de símbolos como en la de
 * números, para que ambas se lean igual.
 */
export function Frac({
  arriba,
  abajo,
}: {
  arriba: React.ReactNode;
  abajo: React.ReactNode;
}) {
  return (
    <span className="mx-1 inline-flex flex-col items-center align-middle">
      <span className="px-1.5 pb-0.5">{arriba}</span>
      <span className="h-px w-full bg-current" />
      <span className="px-1.5 pt-0.5">{abajo}</span>
    </span>
  );
}

/** Variable en cursiva serif, como en un libro de texto. */
export function V({ children }: { children: React.ReactNode }) {
  return <span className="font-serif italic">{children}</span>;
}

/**
 * La fórmula en dos columnas: a la izquierda la notación simbólica, a la
 * derecha la misma fórmula con los datos reales sustituidos. Ver los dos
 * lados en paralelo es lo que evita que los símbolos queden como adorno.
 */
export function Formula({
  titulo,
  simbolos,
  numeros,
  resultado,
  nota,
}: {
  titulo?: string;
  simbolos: React.ReactNode;
  numeros: React.ReactNode;
  /** Lectura del resultado, destacada abajo. */
  resultado?: React.ReactNode;
  /** Aclaración al pie (de dónde sale cada número). */
  nota?: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      {titulo && (
        <p className="border-b border-slate-100 px-5 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:border-slate-800 dark:text-slate-500">
          {titulo}
        </p>
      )}
      <div className="grid divide-y divide-slate-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0 dark:divide-slate-800">
        <div className="px-5 py-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            En símbolos
          </p>
          <div className="mt-2 overflow-x-auto text-lg leading-loose text-slate-900 dark:text-slate-100">
            {simbolos}
          </div>
        </div>
        <div className="bg-blue-50/40 px-5 py-4 dark:bg-blue-950/20">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Con nuestros datos
          </p>
          <div className="mt-2 overflow-x-auto text-lg leading-loose tabular-nums text-slate-900 dark:text-slate-100">
            {numeros}
          </div>
        </div>
      </div>
      {resultado && (
        <p className="border-t border-slate-100 bg-slate-50 px-5 py-3 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
          {resultado}
        </p>
      )}
      {nota && (
        <p className="border-t border-slate-100 px-5 py-2.5 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-500">
          {nota}
        </p>
      )}
    </div>
  );
}

/** El error común de este apartado: qué es, por qué ocurre y cómo corregirlo. */
export function Trampa({
  error,
  porQue,
  correccion,
}: {
  error: React.ReactNode;
  porQue: React.ReactNode;
  correccion: React.ReactNode;
}) {
  return (
    <aside className="rounded-xl border-l-4 border-rose-400 bg-rose-50/70 px-4 py-3 text-sm dark:border-rose-500 dark:bg-rose-950/20">
      <p className="font-semibold text-rose-900 dark:text-rose-200">
        ⚠️ Trampa común: {error}
      </p>
      <p className="mt-1.5 leading-relaxed text-rose-900/80 dark:text-rose-200/80">
        <span className="font-semibold">Por qué ocurre:</span> {porQue}
      </p>
      <p className="mt-1 leading-relaxed text-rose-900/80 dark:text-rose-200/80">
        <span className="font-semibold">Cómo corregirlo:</span> {correccion}
      </p>
    </aside>
  );
}

/**
 * Cierre del apartado: qué quedó abierto y hacia dónde sigue. Es lo que
 * convierte una lista de temas sueltos en un hilo continuo.
 */
export function Puente({
  children,
  etiquetaBoton,
  onContinuar,
}: {
  children: React.ReactNode;
  etiquetaBoton: string;
  onContinuar: () => void;
}) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-6 text-white sm:p-8">
      <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-blue-200">
        Lo que sigue
      </p>
      <div className="mt-2 space-y-2 leading-relaxed text-blue-50">{children}</div>
      <button
        type="button"
        onClick={onContinuar}
        className="mt-5 rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50"
      >
        {etiquetaBoton} →
      </button>
    </div>
  );
}
