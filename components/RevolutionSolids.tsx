const solids = [
  {
    title: "¿Qué son?",
    text: "Son cuerpos tridimensionales generados al girar una figura plana alrededor de un eje. Este proceso produce formas ampliamente utilizadas en diseño mecánico.",
  },
  {
    title: "Elementos",
    text: "Intervienen una región generatriz, un eje de giro, el radio de revolución y la superficie resultante del movimiento rotacional.",
  },
  {
    title: "Métodos",
    text: "Pueden estudiarse por giro geométrico, por integración de discos y arandelas, o mediante métodos de cascarones cilíndricos.",
  },
  {
    title: "Aplicaciones mecánicas",
    text: "Aparecen en flechas, poleas, rodillos, depósitos cilíndricos, conos, toberas y numerosas piezas fabricadas por torno.",
  },
  {
    title: "Importancia",
    text: "Permiten calcular áreas, volúmenes y perfiles de componentes mecánicos con gran precisión en manufactura y análisis.",
  },
  {
    title: "Proyecto integrador",
    text: "En esta sección pueden mostrarse los sólidos desarrollados por el equipo como evidencia visual del trabajo realizado.",
  },
];

export default function RevolutionSolids() {
  return (
    <section id="solidos" className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12 max-w-3xl">
        <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">
          Sección 2
        </p>
        <h3 className="mt-3 text-3xl font-bold md:text-4xl">
          Sólidos de revolución
        </h3>
        <p className="mt-4 text-slate-300">
          Los sólidos de revolución son fundamentales para comprender la
          geometría de muchas piezas mecánicas. Su estudio conecta las
          matemáticas con la manufactura, el diseño y el análisis de volumen.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {solids.map((item) => (
          <article
            key={item.title}
            className="rounded-3xl border border-white/10 bg-white/5 p-6"
          >
            <h4 className="text-xl font-semibold text-white">{item.title}</h4>
            <p className="mt-3 leading-7 text-slate-300">{item.text}</p>
          </article>
        ))}
      </div>

      <div className="mt-8 rounded-3xl border border-dashed border-cyan-400/30 bg-cyan-400/5 p-8 text-center">
        <h4 className="text-2xl font-semibold text-white">
          Espacio para imágenes del proyecto
        </h4>
        <p className="mx-auto mt-3 max-w-2xl text-slate-300">
          Aquí después podemos insertar renders, capturas o imágenes PNG de los
          sólidos de revolución que ya elaboraron en su proyecto integrador.
        </p>
      </div>
    </section>
  );
}