const solids = [
  {
    title: "¿Qué son los sólidos de revolución?",
    text: "Son cuerpos tridimensionales obtenidos al girar una figura plana alrededor de un eje. Muchas piezas mecánicas nacen de esta idea geométrica.",
  },
  {
    title: "Elementos principales",
    text: "Intervienen una generatriz, un eje de giro, un radio y la superficie formada por el movimiento rotacional de la figura.",
  },
  {
    title: "Métodos de obtención",
    text: "Pueden analizarse mediante discos, arandelas y cascarones cilíndricos, herramientas muy utilizadas en cálculo integral.",
  },
  {
    title: "Aplicaciones en ingeniería mecánica",
    text: "Aparecen en ejes, conos, poleas, depósitos, rodillos, boquillas, toberas y piezas fabricadas en torno.",
  },
  {
    title: "Importancia del tema",
    text: "Permiten relacionar geometría, manufactura y cálculo de volúmenes en piezas reales utilizadas dentro del diseño mecánico.",
  },
  {
    title: "Proyecto integrador",
    text: "Esta sección puede mostrar evidencias visuales de los sólidos modelados por el equipo como parte del trabajo académico.",
  },
];

export default function RevolutionSolids() {
  return (
    <section id="solidos" className="section-shell px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-4xl">
          <span className="title-pill">Sección 2</span>
          <h3 className="mt-4 text-3xl font-black md:text-5xl">
            Sólidos de revolución
          </h3>
          <p className="mt-4 text-lg font-semibold leading-8 text-white/95">
            Los sólidos de revolución conectan el cálculo con la fabricación de
            piezas mecánicas. Su estudio ayuda a comprender formas, volúmenes y
            aplicaciones reales en manufactura.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {solids.map((item, index) => (
            <article
              key={item.title}
              className={`card-pop min-h-[280px] p-7 ${
                [
                  "bg-blue-card",
                  "bg-green-card",
                  "bg-yellow-card",
                  "bg-cyan-card",
                  "bg-orange-card",
                  "bg-purple-card",
                ][index % 6]
              }`}
            >
              <h4 className="text-2xl font-black leading-tight text-white">
                {item.title}
              </h4>
              <p className="mt-4 text-base font-semibold leading-7 text-white/95">
                {item.text}
              </p>
            </article>
          ))}
        </div>

        <div className="glass-card mt-8 rounded-[2rem] p-8 text-center">
          <h4 className="text-2xl font-black">Galería del proyecto</h4>
          <p className="mx-auto mt-3 max-w-3xl text-white/95">
            Aquí después podemos agregar imágenes PNG o renders de los sólidos
            de revolución que ya realizaron, sin cambiar la estructura principal
            del sitio.
          </p>
        </div>
      </div>
    </section>
  );
}