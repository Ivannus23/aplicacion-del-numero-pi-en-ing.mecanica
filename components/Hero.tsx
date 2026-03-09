export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.16),transparent_30%)]" />
      <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="max-w-3xl">
          <p className="mb-4 inline-block rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-sm text-cyan-200">
            Matemáticas aplicadas a la ingeniería
          </p>

          <h2 className="text-4xl font-black leading-tight text-white md:text-6xl">
            Aplicaciones del número π y sólidos de revolución en Ingeniería
            Mecánica
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
            Esta aplicación web presenta usos del número pi dentro de la
            ingeniería mecánica y explica el concepto de sólidos de revolución
            mediante ejemplos visuales, conceptos clave y una experiencia
            interactiva con un juego tipo culebrita.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#aplicaciones"
              className="rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Ver aplicaciones
            </a>
            <a
              href="#juego"
              className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Probar juego
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}