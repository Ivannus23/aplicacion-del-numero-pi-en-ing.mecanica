export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">
            Proyecto Integrador
          </p>
          <h1 className="text-lg font-bold text-white">
            π en Ingeniería Mecánica
          </h1>
        </div>

        <nav className="hidden gap-6 text-sm text-slate-300 md:flex">
          <a href="#aplicaciones" className="transition hover:text-cyan-300">
            Aplicaciones
          </a>
          <a href="#juego" className="transition hover:text-cyan-300">
            Juego
          </a>
          <a href="#solidos" className="transition hover:text-cyan-300">
            Sólidos
          </a>
        </nav>
      </div>
    </header>
  );
}