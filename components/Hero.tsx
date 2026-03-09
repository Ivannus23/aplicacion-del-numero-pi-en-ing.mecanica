import Image from "next/image";

const logos = [
  "/logo-uan.png",
  "/logo-uacbi.png",
  "/LOGO-INGE-MECANICA.png",
  "/logo-proyecto.png",
  "/pi-logo.png",
];

export default function Hero() {
  return (
    <section className="section-shell px-6 py-14 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-center gap-4">
          {logos.map((src, index) => (
            <div
              key={index}
              className="glass-card flex h-20 w-20 items-center justify-center rounded-2xl p-3 md:h-24 md:w-24"
            >
              <Image
                src={src}
                alt={`Logo institucional ${index + 1}`}
                width={90}
                height={90}
                className="max-h-full w-auto object-contain"
              />
            </div>
          ))}
        </div>

        <div className="max-w-5xl">
          <span className="title-pill mb-5">
            Matemáticas aplicadas a la ingeniería
          </span>

          <div className="hero-band">
            <h2 className="text-4xl leading-tight md:text-6xl">
              Aplicaciones del <span>número π</span> y sólidos de revolución en
              Ingeniería Mecánica
            </h2>
          </div>

          <p className="mt-6 max-w-4xl text-lg font-semibold leading-8 text-white/95">
            Esta aplicación web reúne conceptos, ejemplos y actividades
            interactivas sobre el uso del número pi en la ingeniería mecánica,
            así como una introducción a los sólidos de revolución desarrollados
            dentro del proyecto integrador.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#aplicaciones" className="btn-primary">
              Explorar contenido
            </a>
            <a href="#juego" className="btn-secondary">
              Ir al juego de π
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}