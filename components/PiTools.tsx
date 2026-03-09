"use client";

import { useMemo, useState } from "react";

export default function PiTools() {
  const [radius, setRadius] = useState("");
  const [answers, setAnswers] = useState<string[]>(["", "", ""]);

  const numericRadius = Number(radius);

  const area = useMemo(() => {
    if (!radius || Number.isNaN(numericRadius)) return null;
    return Math.PI * numericRadius * numericRadius;
  }, [radius, numericRadius]);

  const perimeter = useMemo(() => {
    if (!radius || Number.isNaN(numericRadius)) return null;
    return 2 * Math.PI * numericRadius;
  }, [radius, numericRadius]);

  const questions = [
    {
      question: "¿Qué representa π en geometría básica?",
      options: [
        "La relación entre la circunferencia y su diámetro",
        "La longitud de un cuadrado",
        "La masa de un cilindro",
      ],
      correct: "La relación entre la circunferencia y su diámetro",
    },
    {
      question: "¿En qué tipo de elementos mecánicos aparece con frecuencia π?",
      options: [
        "Poleas, ejes y tuberías",
        "Solo piezas cúbicas",
        "Solo resortes rectos",
      ],
      correct: "Poleas, ejes y tuberías",
    },
    {
      question: "¿Qué fórmula usa π para el área de un círculo?",
      options: ["A = πr²", "A = 2πr", "A = r/π"],
      correct: "A = πr²",
    },
  ];

  const score = answers.reduce((acc, answer, index) => {
    return acc + (answer === questions[index].correct ? 1 : 0);
  }, 0);

  return (
    <section id="herramientas" className="section-shell px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-4xl">
          <span className="title-pill">Herramientas interactivas</span>
          <h3 className="mt-4 text-3xl font-black md:text-5xl">
            Calculadora y trivia de π
          </h3>
          <p className="mt-4 text-lg font-semibold leading-8 text-white/95">
            Para reforzar el aprendizaje, esta sección incluye una herramienta
            sencilla de cálculo y una trivia rápida sobre aplicaciones del
            número pi.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <article className="glass-card rounded-[2rem] p-8">
            <h4 className="text-2xl font-black">Calculadora de círculo</h4>
            <p className="mt-3 text-white/95">
              Ingresa el radio para obtener el área y el perímetro.
            </p>

            <div className="mt-6">
              <label className="mb-2 block text-sm font-extrabold uppercase tracking-[0.18em] text-white/90">
                Radio
              </label>
              <input
                type="number"
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
                placeholder="Ejemplo: 5"
                className="w-full rounded-2xl border border-white/20 bg-white/15 px-4 py-3 text-lg font-semibold text-white outline-none placeholder:text-white/60"
              />
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="soft-panel rounded-2xl p-5">
                <p className="text-sm font-extrabold uppercase tracking-[0.15em] text-white/80">
                  Área
                </p>
                <p className="mt-2 text-3xl font-black">
                  {area !== null ? area.toFixed(2) : "--"}
                </p>
                <p className="mt-1 text-white/85">A = πr²</p>
              </div>

              <div className="soft-panel rounded-2xl p-5">
                <p className="text-sm font-extrabold uppercase tracking-[0.15em] text-white/80">
                  Perímetro
                </p>
                <p className="mt-2 text-3xl font-black">
                  {perimeter !== null ? perimeter.toFixed(2) : "--"}
                </p>
                <p className="mt-1 text-white/85">P = 2πr</p>
              </div>
            </div>
          </article>

          <article className="glass-card rounded-[2rem] p-8">
            <h4 className="text-2xl font-black">Trivia rápida</h4>
            <p className="mt-3 text-white/95">
              Responde y revisa cuántas acertaste.
            </p>

            <div className="mt-6 space-y-6">
              {questions.map((q, qIndex) => (
                <div key={q.question} className="soft-panel rounded-2xl p-5">
                  <p className="font-extrabold text-white">{q.question}</p>

                  <div className="mt-4 space-y-3">
                    {q.options.map((option) => (
                      <label
                        key={option}
                        className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                      >
                        <input
                          type="radio"
                          name={`question-${qIndex}`}
                          checked={answers[qIndex] === option}
                          onChange={() => {
                            const next = [...answers];
                            next[qIndex] = option;
                            setAnswers(next);
                          }}
                        />
                        <span className="font-semibold text-white/95">
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl bg-white/15 p-4 text-center">
              <p className="text-sm font-extrabold uppercase tracking-[0.15em] text-white/80">
                Puntaje
              </p>
              <p className="mt-2 text-3xl font-black">
                {score} / {questions.length}
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}