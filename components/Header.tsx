export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-white/10 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-cyan-100">
            Proyecto integrador
          </p>
          <h1 className="text-lg font-black text-white md:text-xl">
            Número π e Ingeniería Mecánica
          </h1>
        </div>

        <nav className="hidden items-center gap-6 text-sm font-semibold text-white/90 md:flex">
          <a href="#aplicaciones" className="transition hover:text-yellow-200">
            Aplicaciones
          </a>
          <a href="#herramientas" className="transition hover:text-yellow-200">
            Herramientas
          </a>
          <a href="#juego" className="transition hover:text-yellow-200">
            Juego
          </a>
          <a href="#solidos" className="transition hover:text-yellow-200">
            Sólidos
          </a>
        </nav>
      </div>
    </header>
  );
}