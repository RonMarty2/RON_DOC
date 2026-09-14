export function Footer() {
  return (
    <footer className="border-t border-borde bg-papel-suave">
      <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-6 px-4 py-10 sm:px-6 lg:px-8">
        <div>
          <p className="font-serif text-lg font-semibold">Mgr. Ronald Martínez Jiménez</p>
          <p className="mt-1 text-sm text-tinta-tenue">Docente universitario · Cochabamba, Bolivia</p>
        </div>
        <p className="text-sm text-tinta-tenue">© {new Date().getFullYear()} Ronald Martínez Jiménez</p>
      </div>
    </footer>
  );
}
