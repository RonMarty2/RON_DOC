export function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-950/40">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <p className="font-serif text-lg font-semibold text-slate-900 dark:text-slate-100">
              Mgr. Ronald Martínez Jiménez
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Docente universitario · Cochabamba, Bolivia
            </p>
            <p className="mt-3 max-w-md text-sm text-slate-600 dark:text-slate-400">
              Material académico, casos de estudio y componentes interactivos para
              las materias de Psicoestadística, Administración Financiera, Econometría
              y Matemática Financiera.
            </p>
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400 sm:text-right">
            <p>
              © {new Date().getFullYear()} Ronald Martínez Jiménez. Todos los derechos
              reservados.
            </p>
            <p className="mt-1">
              Construido con Next.js y publicado en GitHub Pages.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
