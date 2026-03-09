"use client";

import { useEffect, useMemo, useState } from "react";

type Cell = {
  x: number;
  y: number;
};

const BOARD_SIZE = 12;
const PI_DIGITS = "3.1415926535897932384626433832795028841971";

function getRandomCell(exclude: Cell[]): Cell {
  while (true) {
    const cell = {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE),
    };

    const occupied = exclude.some(
      (segment) => segment.x === cell.x && segment.y === cell.y
    );

    if (!occupied) return cell;
  }
}

export default function PiSnakeGame() {
  const [snake, setSnake] = useState<Cell[]>([
    { x: 5, y: 5 },
    { x: 4, y: 5 },
  ]);
  const [food, setFood] = useState<Cell>({ x: 8, y: 5 });
  const [direction, setDirection] = useState<Cell>({ x: 1, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [digitsUnlocked, setDigitsUnlocked] = useState(1);

  const piProgress = useMemo(() => {
    return PI_DIGITS.slice(0, digitsUnlocked);
  }, [digitsUnlocked]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" && direction.y !== 1) {
        setDirection({ x: 0, y: -1 });
      } else if (e.key === "ArrowDown" && direction.y !== -1) {
        setDirection({ x: 0, y: 1 });
      } else if (e.key === "ArrowLeft" && direction.x !== 1) {
        setDirection({ x: -1, y: 0 });
      } else if (e.key === "ArrowRight" && direction.x !== -1) {
        setDirection({ x: 1, y: 0 });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction]);

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const newHead = {
          x: head.x + direction.x,
          y: head.y + direction.y,
        };

        const hitWall =
          newHead.x < 0 ||
          newHead.y < 0 ||
          newHead.x >= BOARD_SIZE ||
          newHead.y >= BOARD_SIZE;

        const hitSelf = prevSnake.some(
          (segment) => segment.x === newHead.x && segment.y === newHead.y
        );

        if (hitWall || hitSelf) {
          setGameOver(true);
          return prevSnake;
        }

        const ateFood = newHead.x === food.x && newHead.y === food.y;

        if (ateFood) {
          const newSnake = [newHead, ...prevSnake];
          setFood(getRandomCell(newSnake));
          setDigitsUnlocked((prev) =>
            Math.min(prev + 1, PI_DIGITS.length)
          );
          return newSnake;
        }

        return [newHead, ...prevSnake.slice(0, -1)];
      });
    }, 220);

    return () => clearInterval(interval);
  }, [direction, food, gameOver]);

  const resetGame = () => {
    setSnake([
      { x: 5, y: 5 },
      { x: 4, y: 5 },
    ]);
    setFood({ x: 8, y: 5 });
    setDirection({ x: 1, y: 0 });
    setGameOver(false);
    setDigitsUnlocked(1);
  };

  return (
    <section id="juego" className="mx-auto max-w-7xl px-6 py-20">
      <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">
            Sección interactiva
          </p>
          <h3 className="mt-3 text-3xl font-bold md:text-4xl">
            Juego de la culebrita de π
          </h3>
          <p className="mt-4 max-w-2xl text-slate-300">
            Cada vez que la serpiente come un símbolo π, se desbloquea un nuevo
            dígito del número pi. El reto consiste en avanzar lo más posible
            sin chocar.
          </p>

          <div className="mt-6 rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">
              Dígitos desbloqueados
            </p>
            <p className="mt-3 break-all font-mono text-2xl text-white md:text-3xl">
              {piProgress}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={resetGame}
              className="rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Reiniciar juego
            </button>
            <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-slate-300">
              Usa las flechas del teclado para moverte
            </div>
          </div>

          {gameOver && (
            <div className="mt-6 rounded-2xl border border-rose-400/20 bg-rose-400/10 p-4 text-rose-200">
              Fin del juego. Reinicia para volver a intentarlo.
            </div>
          )}
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-4 backdrop-blur">
          <div
            className="grid gap-1"
            style={{
              gridTemplateColumns: `repeat(${BOARD_SIZE}, minmax(0, 1fr))`,
            }}
          >
            {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, index) => {
              const x = index % BOARD_SIZE;
              const y = Math.floor(index / BOARD_SIZE);

              const isSnake = snake.some(
                (segment) => segment.x === x && segment.y === y
              );

              const isHead = snake[0].x === x && snake[0].y === y;
              const isFood = food.x === x && food.y === y;

              return (
                <div
                  key={`${x}-${y}`}
                  className={`aspect-square rounded-md border border-white/5 ${
                    isHead
                      ? "bg-cyan-300"
                      : isSnake
                      ? "bg-cyan-500/70"
                      : isFood
                      ? "bg-fuchsia-400"
                      : "bg-slate-900"
                  }`}
                >
                  {isFood && (
                    <div className="flex h-full items-center justify-center text-xs font-bold text-slate-950">
                      π
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}