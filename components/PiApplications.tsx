const applications = [
  {
    title: "Poleas y bandas",
    text: "π permite calcular perímetros, relaciones geométricas y trayectorias circulares en sistemas de transmisión por poleas.",
  },
  {
    title: "Engranes",
    text: "Se utiliza para obtener dimensiones circulares, diámetros primitivos y relaciones fundamentales en elementos rotativos.",
  },
  {
    title: "Ejes y flechas",
    text: "Aparece en cálculos de áreas circulares, momentos geométricos y resistencia de componentes cilíndricos.",
  },
  {
    title: "Tuberías",
    text: "Es esencial para estimar áreas de flujo, perímetros mojados y volúmenes en conducción de fluidos.",
  },
  {
    title: "Tanques y recipientes cilíndricos",
    text: "Ayuda a calcular capacidad, volumen y área superficial de depósitos utilizados en procesos mecánicos e industriales.",
  },
  {
    title: "Movimiento circular",
    text: "Interviene en velocidad angular, distancia recorrida sobre trayectorias circulares y análisis dinámico de rotación.",
  },
];

export default function PiApplications() {
  return (
    <section id="aplicaciones" className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12 max-w-3xl">
        <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">
          Sección 1
        </p>
        <h3 className="mt-3 text-3xl font-bold md:text-4xl">
          Aplicaciones del número π en Ingeniería Mecánica
        </h3>
        <p className="mt-4 text-slate-300">
          El número pi está presente en múltiples cálculos de la ingeniería
          mecánica, especialmente en sistemas donde intervienen geometrías
          circulares, rotación, volúmenes y transferencia de movimiento.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {applications.map((item) => (
          <article
            key={item.title}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/15 text-2xl text-cyan-300">
              π
            </div>
            <h4 className="text-xl font-semibold text-white">{item.title}</h4>
            <p className="mt-3 leading-7 text-slate-300">{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}