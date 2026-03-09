const applications = [
  {
    title: "Manufactura y Diseño Industrial",
    text: "En manufactura y diseño industrial, el número π es fundamental al trabajar con elementos circulares y cilíndricos. Se utiliza en el diseño de componentes como engranajes, poleas, rodamientos, tubos y estructuras curvas. Determina medidas de superficies, perímetros, volúmenes y tolerancias dimensionales.",
    formulaTitle: "Fórmulas comunes",
    formulas: ["A = πr²", "C = 2πr"],
    color: "bg-blue-card",
  },
  {
    title: "Velocidad Angular y Movimiento Circular",
    text: "En sistemas mecánicos rotacionales, π se emplea para calcular velocidad angular y periodos de rotación. Estos conceptos se aplican en motores, turbinas, sistemas de transmisión y mecanismos giratorios en general.",
    formulaTitle: "Fórmula de velocidad angular",
    formulas: ["ω = 2π / T"],
    color: "bg-green-card",
  },
  {
    title: "Mecánica de Fluidos",
    text: "En el estudio del flujo de fluidos en sistemas circulares (como tuberías), π aparece en la ecuación de Hagen-Poiseuille, que permite calcular el caudal en flujos laminares.",
    formulaTitle: "Ecuación de flujo laminar",
    formulas: ["Q = πr⁴(P₁ - P₂) / 8μL"],
    color: "bg-yellow-card",
  },
  {
    title: "Corte y Mecanizado",
    text: "En procesos como el torneado y fresado, π permite calcular la velocidad de corte para piezas cilíndricas. Esta velocidad es clave para la eficiencia del proceso y la calidad del producto final.",
    formulaTitle: "Velocidad de corte",
    formulas: ["V = πDN"],
    color: "bg-cyan-card",
  },
  {
    title: "Transferencia de Calor",
    text: "En transferencia térmica a través de cuerpos cilíndricos (tuberías, intercambiadores), π se utiliza para calcular el flujo de calor a través del área lateral del cilindro.",
    formulaTitle: "Ecuación de conducción en cilindros",
    formulas: ["q = 2πkL(T₁ - T₂) / ln(r₂ / r₁)"],
    color: "bg-orange-card",
  },
  {
    title: "Resistencia de Materiales",
    text: "En análisis estructural, π es esencial para determinar esfuerzos en elementos como ejes, vigas o columnas bajo torsión. El módulo polar de un cilindro depende directamente del valor de π.",
    formulaTitle: "Fórmulas",
    formulas: ["τ = Tr / J", "J = πD⁴ / 32"],
    color: "bg-purple-card",
  },
];

export default function PiApplications() {
  return (
    <section id="aplicaciones" className="section-shell px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-4xl">
          <span className="title-pill">Sección 1</span>
          <h3 className="mt-4 text-3xl font-black md:text-5xl">
            Aplicaciones del número π en Ingeniería Mecánica
          </h3>
          <p className="mt-4 text-lg font-semibold leading-8 text-white/95">
            Explora los increíbles usos del número π en la ingeniería mecánica.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {applications.map((item) => (
            <article
              key={item.title}
              className={`card-pop ${item.color} min-h-[380px] p-7`}
            >
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-3xl font-black text-white">
                π
              </div>

              <h4 className="text-2xl font-black leading-tight text-white">
                {item.title}
              </h4>

              <p className="mt-4 text-base font-semibold leading-7 text-white/95">
                {item.text}
              </p>

              <div className="mt-6 rounded-2xl border border-white/15 bg-white/10 p-4">
                <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-white/85">
                  {item.formulaTitle}
                </p>

                <div className="mt-3 space-y-2">
                  {item.formulas.map((formula) => (
                    <p
                      key={formula}
                      className="font-mono text-lg font-black text-white"
                    >
                      {formula}
                    </p>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}