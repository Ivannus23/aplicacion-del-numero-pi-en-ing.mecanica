"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Cell = {
  x: number;
  y: number;
};

type Direction = {
  x: number;
  y: number;
};

const BOARD_SIZE = 12;
const PI_DIGITS = "3.1415926535897932384626433832795028841971";
const GAME_SPEED = 220;
const SWIPE_THRESHOLD = 24;
const GAMEPAD_COOLDOWN = 110;

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

function isOppositeDirection(current: Direction, next: Direction) {
  return current.x === -next.x && current.y === -next.y;
}

function getSegmentRadius(snake: Cell[], index: number): string {
  if (index === 0) return "999px";

  const current = snake[index];
  const prev = snake[index - 1];
  const next = snake[index + 1];

  if (!next) return "16px";

  const fromX = current.x - prev.x;
  const fromY = current.y - prev.y;
  const toX = next.x - current.x;
  const toY = next.y - current.y;

  const straightHorizontal = fromY === 0 && toY === 0;
  const straightVertical = fromX === 0 && toX === 0;

  if (straightHorizontal || straightVertical) return "12px";
  return "18px";
}

export default function PiSnakeGame() {
  const [snake, setSnake] = useState<Cell[]>([
    { x: 5, y: 5 },
    { x: 4, y: 5 },
  ]);
  const [food, setFood] = useState<Cell>({ x: 8, y: 5 });
  const [direction, setDirection] = useState<Direction>({ x: 1, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [digitsUnlocked, setDigitsUnlocked] = useState(1);
  const [isGamepadConnected, setIsGamepadConnected] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const directionRef = useRef<Direction>({ x: 1, y: 0 });
  const lastGamepadMoveRef = useRef<number>(0);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const eatAudioRef = useRef<HTMLAudioElement | null>(null);
  const gameOverAudioRef = useRef<HTMLAudioElement | null>(null);
  const startAudioRef = useRef<HTMLAudioElement | null>(null);

  const piProgress = useMemo(() => {
    return PI_DIGITS.slice(0, Math.min(digitsUnlocked, PI_DIGITS.length));
  }, [digitsUnlocked]);

  const playSound = (audioRef: React.MutableRefObject<HTMLAudioElement | null>) => {
    if (!soundEnabled || !audioRef.current) return;

    try {
      audioRef.current.currentTime = 0;
      void audioRef.current.play();
    } catch {
      // Ignorar errores de reproducción automática
    }
  };

  const updateDirection = (nextDirection: Direction) => {
    const current = directionRef.current;
    if (isOppositeDirection(current, nextDirection)) return;

    directionRef.current = nextDirection;
    setDirection(nextDirection);
  };

  const refreshGamepadState = () => {
    if (typeof navigator === "undefined" || !navigator.getGamepads) {
      setIsGamepadConnected(false);
      return [];
    }

    const pads = navigator.getGamepads();
    const connected = Array.from(pads || []).some(Boolean);
    setIsGamepadConnected(connected);
    return pads;
  };

  const resetGame = () => {
    const initialDirection = { x: 1, y: 0 };

    setSnake([
      { x: 5, y: 5 },
      { x: 4, y: 5 },
    ]);
    setFood({ x: 8, y: 5 });
    setDirection(initialDirection);
    directionRef.current = initialDirection;
    setGameOver(false);
    setDigitsUnlocked(1);
    refreshGamepadState();
    playSound(startAudioRef);
  };

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  useEffect(() => {
    eatAudioRef.current = new Audio("/sounds/eat.mp3");
    gameOverAudioRef.current = new Audio("/sounds/gameover.mp3");
    startAudioRef.current = new Audio("/sounds/start.mp3");

    if (eatAudioRef.current) eatAudioRef.current.volume = 0.45;
    if (gameOverAudioRef.current) gameOverAudioRef.current.volume = 0.55;
    if (startAudioRef.current) startAudioRef.current.volume = 0.45;

    return () => {
      eatAudioRef.current = null;
      gameOverAudioRef.current = null;
      startAudioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") updateDirection({ x: 0, y: -1 });
      else if (e.key === "ArrowDown") updateDirection({ x: 0, y: 1 });
      else if (e.key === "ArrowLeft") updateDirection({ x: -1, y: 0 });
      else if (e.key === "ArrowRight") updateDirection({ x: 1, y: 0 });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const onGamepadConnected = () => {
      refreshGamepadState();
    };

    const onGamepadDisconnected = () => {
      refreshGamepadState();
    };

    const onFocus = () => {
      refreshGamepadState();
    };

    window.addEventListener("gamepadconnected", onGamepadConnected);
    window.addEventListener("gamepaddisconnected", onGamepadDisconnected);
    window.addEventListener("focus", onFocus);

    refreshGamepadState();

    return () => {
      window.removeEventListener("gamepadconnected", onGamepadConnected);
      window.removeEventListener("gamepaddisconnected", onGamepadDisconnected);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      const pads = refreshGamepadState();
      const pad = Array.from(pads || []).find(Boolean);

      if (!pad) return;

      const now = Date.now();
      if (now - lastGamepadMoveRef.current < GAMEPAD_COOLDOWN) return;

      const buttons = pad.buttons || [];
      const axes = pad.axes || [];

      const upPressed = !!buttons[12]?.pressed || (axes[1] ?? 0) < -0.5;
      const downPressed = !!buttons[13]?.pressed || (axes[1] ?? 0) > 0.5;
      const leftPressed = !!buttons[14]?.pressed || (axes[0] ?? 0) < -0.5;
      const rightPressed = !!buttons[15]?.pressed || (axes[0] ?? 0) > 0.5;

      if (upPressed) {
        updateDirection({ x: 0, y: -1 });
        lastGamepadMoveRef.current = now;
      } else if (downPressed) {
        updateDirection({ x: 0, y: 1 });
        lastGamepadMoveRef.current = now;
      } else if (leftPressed) {
        updateDirection({ x: -1, y: 0 });
        lastGamepadMoveRef.current = now;
      } else if (rightPressed) {
        updateDirection({ x: 1, y: 0 });
        lastGamepadMoveRef.current = now;
      }
    }, 50);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (gameOver) return;

    const interval = window.setInterval(() => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const currentDirection = directionRef.current;

        const newHead = {
          x: head.x + currentDirection.x,
          y: head.y + currentDirection.y,
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
          playSound(gameOverAudioRef);
          return prevSnake;
        }

        const ateFood = newHead.x === food.x && newHead.y === food.y;

        if (ateFood) {
          const newSnake = [newHead, ...prevSnake];
          setFood(getRandomCell(newSnake));
          setDigitsUnlocked((prev) => Math.min(prev + 1, PI_DIGITS.length));
          playSound(eatAudioRef);
          return newSnake;
        }

        return [newHead, ...prevSnake.slice(0, -1)];
      });
    }, GAME_SPEED);

    return () => window.clearInterval(interval);
  }, [food, gameOver, soundEnabled]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const start = touchStartRef.current;
    if (!start) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;

    if (
      Math.abs(deltaX) < SWIPE_THRESHOLD &&
      Math.abs(deltaY) < SWIPE_THRESHOLD
    ) {
      touchStartRef.current = null;
      return;
    }

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) updateDirection({ x: 1, y: 0 });
      else updateDirection({ x: -1, y: 0 });
    } else {
      if (deltaY > 0) updateDirection({ x: 0, y: 1 });
      else updateDirection({ x: 0, y: -1 });
    }

    touchStartRef.current = null;
  };

  return (
    <section id="juego" className="section-shell px-4 py-16 md:px-6 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 max-w-3xl">
          <span className="title-pill">Juego interactivo</span>
          <h3 className="mt-4 text-3xl font-black md:text-5xl">
            La culebrita de π
          </h3>
          <p className="mt-4 text-base font-semibold leading-7 text-white/95 md:text-lg md:leading-8">
            Come símbolos π para hacer crecer la serpiente. Puedes jugar con
            teclado, control o deslizando la pantalla en celular.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:items-start">
          <div>
            <div className="mb-4 flex flex-wrap gap-3">
              <button onClick={resetGame} className="btn-primary">
                Reiniciar juego
              </button>

              <button
                onClick={() => setSoundEnabled((prev) => !prev)}
                className="btn-secondary"
              >
                {soundEnabled ? "Desactivar sonido" : "Activar sonido"}
              </button>
            </div>

            <div
              className="game-board-shell touch-none select-none p-3 md:p-4"
              style={{ touchAction: "none" }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onClick={() => refreshGamepadState()}
            >
              <div className="mb-3 flex items-center justify-between gap-3 rounded-2xl bg-white/10 px-4 py-3 text-sm font-bold text-white/90 sm:text-base">
                <span>Desliza para mover</span>
                <span className="font-mono">{piProgress}</span>
              </div>

              <div
                className="grid gap-1"
                style={{
                  gridTemplateColumns: `repeat(${BOARD_SIZE}, minmax(0, 1fr))`,
                }}
              >
                {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, index) => {
                  const x = index % BOARD_SIZE;
                  const y = Math.floor(index / BOARD_SIZE);

                  const snakeIndex = snake.findIndex(
                    (segment) => segment.x === x && segment.y === y
                  );

                  const isSnake = snakeIndex !== -1;
                  const isHead = snakeIndex === 0;
                  const isFood = food.x === x && food.y === y;

                  const tailDigit =
                    snakeIndex > 0 && snakeIndex - 1 < piProgress.length
                      ? piProgress[snakeIndex - 1]
                      : "";

                  return (
                    <div
                      key={`${x}-${y}`}
                      className="aspect-square rounded-lg bg-sky-950/55 p-[2px] transition-all duration-150"
                    >
                      <div
                        className={`flex h-full w-full items-center justify-center border border-white/5 text-[10px] font-black md:text-xs ${
                          isFood
                            ? "bg-fuchsia-400 text-slate-950"
                            : isHead
                            ? "bg-yellow-300 text-slate-950 shadow-[0_0_16px_rgba(253,224,71,0.45)]"
                            : isSnake
                            ? "bg-cyan-400 text-slate-950"
                            : "bg-sky-950/60 text-transparent"
                        }`}
                        style={{
                          borderRadius: isSnake
                            ? getSegmentRadius(snake, snakeIndex)
                            : "10px",
                          transform: isHead ? "scale(1.02)" : "scale(1)",
                          transition:
                            "border-radius 140ms ease, transform 140ms ease, background 140ms ease",
                        }}
                      >
                        {isFood ? "π" : isHead ? "●" : tailDigit}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <p className="mt-3 text-center text-sm font-semibold text-white/80 sm:hidden">
              Desliza sobre el tablero para cambiar de dirección
            </p>

            {gameOver && (
              <div className="mt-4 rounded-2xl border border-red-300/20 bg-red-400/15 p-4 font-bold text-white">
                Fin del juego. Presiona “Reiniciar juego” para volver a jugar.
              </div>
            )}
          </div>

          <aside className="space-y-4">
            <div className="glass-card rounded-[2rem] p-5">
              <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-white/85">
                Pi acumulado
              </p>
              <p className="mt-3 break-all font-mono text-2xl font-black text-white md:text-3xl">
                {piProgress}
              </p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
              <p className="text-sm font-extrabold uppercase tracking-[0.15em] text-white/80">
                Estado del control
              </p>
              <p className="mt-2 font-semibold text-white/95">
                {isGamepadConnected
                  ? "Control detectado y listo"
                  : "Sin control conectado"}
              </p>
              <p className="mt-2 text-sm text-white/75">
                Si no responde, presiona cualquier botón del control y da clic
                en el tablero.
              </p>
            </div>

            <div className="hidden rounded-2xl border border-white/15 bg-white/10 p-4 sm:block">
              <p className="text-sm font-extrabold uppercase tracking-[0.15em] text-white/80">
                Controles
              </p>
              <p className="mt-2 font-semibold text-white/95">
                Flechas del teclado
              </p>
              <p className="font-semibold text-white/95">
                D-pad o joystick del control
              </p>
              <p className="font-semibold text-white/95">
                Deslizar en pantalla táctil
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}