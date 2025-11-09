import { useEffect, useState, useRef } from "react";
import type { Bird, Pipe, GameState } from "../types/game";

const useGameLogic = () => {
  const [gameWidth, setGameWidth] = useState(window.innerWidth);
  const [gameHeight, setGameHeight] = useState(window.innerHeight);

  const [bird, setBird] = useState<Bird>({
    x: 80,
    y: window.innerHeight / 2,
    width: 40,
    height: 40,
    velocity: 0,
  });

  const [pipes, setPipes] = useState<Pipe[]>([]);
  const [gameState, setGameState] = useState<GameState>("idle");
  const [score, setScore] = useState(0);

  const pipeTimer = useRef<number | null>(null);

  const GRAVITY = 0.2;
  const JUMP = -2;
  const PIPE_WIDTH = 70;
  const PIPE_GAP = 130;
  const PIPE_SPEED = 7;
  const PIPE_INTERVAL = 1200;

  const handleJump = () => {
    if (gameState === "idle") setGameState("playing");
    if (gameState === "playing")
      setBird((prev) => ({ ...prev, velocity: JUMP }));
    if (gameState === "gameover") resetGame();
  };

  const resetGame = () => {
    setBird({ x: 80, y: gameHeight / 2, width: 40, height: 40, velocity: 0 });
    setPipes([]);
    setScore(0); // ✅ Reset score
    setGameState("idle");
  };

  // Main game loop (gravity + pipe movement + scoring)
  useEffect(() => {
    if (gameState !== "playing") return;

    const gameLoop = setInterval(() => {
      // Bird physics
      setBird((prev) => {
        const newY = prev.y + prev.velocity;
        const newVelocity = prev.velocity + GRAVITY;

        if (newY + prev.height >= gameHeight || newY <= 0) {
          setGameState("gameover");
          return prev;
        }

        return { ...prev, y: newY, velocity: newVelocity };
      });

      // Move pipes + remove off-screen pipes
      setPipes((prev) =>
        prev
          .map((pipe) => ({ ...pipe, x: pipe.x - PIPE_SPEED }))
          .filter((pipe) => pipe.x + PIPE_WIDTH > 0)
      );

      // ✅ Score increase when bird passes pipes
      pipes.forEach((pipe) => {
        if (!pipe.passed && bird.x > pipe.x + PIPE_WIDTH) {
          pipe.passed = true;
          setScore((prev) => prev + 1);
        }
      });

      // ✅ Collision detection
      pipes.forEach((pipe) => {
        const birdRight = bird.x + bird.width;
        const birdBottom = bird.y + bird.height;
        const inPipeX = birdRight > pipe.x && bird.x < pipe.x + PIPE_WIDTH;
        const hitTop = bird.y < pipe.topHeight;
        const hitBottom = birdBottom > gameHeight - pipe.bottomHeight;

        if (inPipeX && (hitTop || hitBottom)) {
          setGameState("gameover");
        }
      });
    }, 16);

    return () => clearInterval(gameLoop);
  }, [gameState, pipes, bird, gameHeight]);

  // Pipe generator
  useEffect(() => {
    if (gameState !== "playing") return;

    pipeTimer.current = window.setInterval(() => {
      const topHeight = Math.random() * (gameHeight - PIPE_GAP - 100) + 50;
      const bottomHeight = gameHeight - topHeight - PIPE_GAP;
      setPipes((prev) => [
        ...prev,
        { x: gameWidth, topHeight, bottomHeight, passed: false },
      ]);
    }, PIPE_INTERVAL);

    return () => pipeTimer.current && clearInterval(pipeTimer.current);
  }, [gameState, gameWidth, gameHeight]);

  return { bird, pipes, gameState, score, handleJump, gameHeight, gameWidth };
};

export default useGameLogic;
