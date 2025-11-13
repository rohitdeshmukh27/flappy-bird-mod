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
  const [gameState, setGameState] = useState<GameState>("intro");
  const [score, setScore] = useState(0);
  const [playedMilestones, setPlayedMilestones] = useState<Set<number>>(
    new Set()
  );
  const [currentMilestone, setCurrentMilestone] = useState<number | null>(null);

  const pipeTimer = useRef<number | null>(null);
  const gameOverSoundPlayed = useRef(false);

  // Milestone scores that trigger sound effects
  const MILESTONES = [10, 20, 50, 70, 90, 100, 150];

  const GRAVITY = 0.2;
  const JUMP = -3;
  const PIPE_WIDTH = 40;
  const PIPE_GAP = 250;
  const PIPE_SPEED = 7;
  const PIPE_INTERVAL = 1200;

  // Function to play milestone celebration sound from MP3 files
  const playMilestoneSound = (milestone: number) => {
    try {
      // Play the corresponding MP3 file based on milestone number
      // Files should be named: number10.mp3, number20.mp3, etc.
      const audio = new Audio(`/sounds/number${milestone}.mp3`);
      audio.volume = 0.5; // Adjust volume as needed (0.0 to 1.0)
      audio.play().catch((error) => {
        console.warn(`Could not play sound for milestone ${milestone}:`, error);
      });
    } catch (error) {
      console.warn(`Error loading sound for milestone ${milestone}:`, error);
    }
  };

  // Function to play random game over sound
  const playGameOverSound = () => {
    try {
      // Randomly select one of the three game over sounds (1, 2, or 3)
      const randomSound = Math.floor(Math.random() * 3) + 1;
      const audio = new Audio(`/sounds/gameover${randomSound}.mp3`);
      audio.volume = 0.6; // Adjust volume as needed
      audio.play().catch((error) => {
        console.warn(`Could not play game over sound ${randomSound}:`, error);
      });
    } catch (error) {
      console.warn("Error loading game over sound:", error);
    }
  };

  const handleJump = () => {
    if (gameState === "intro") {
      startGame(); // Start game from intro screen
      return;
    }
    if (gameState === "playing")
      setBird((prev) => ({ ...prev, velocity: JUMP }));
    if (gameState === "gameover") resetGame();
  };

  const startGame = () => {
    setBird({
      x: 80,
      y: gameHeight / 2,
      width: 40,
      height: 40,
      velocity: JUMP,
    }); // Start with a jump
    setPipes([]);
    setScore(0);
    gameOverSoundPlayed.current = false; // Reset game over sound flag
    setGameState("playing"); // Go directly to playing
  };

  const resetGame = () => {
    setBird({ x: 80, y: gameHeight / 2, width: 40, height: 40, velocity: 0 });
    setPipes([]);
    setScore(0); // ✅ Reset score
    setPlayedMilestones(new Set()); // Reset milestone tracking
    gameOverSoundPlayed.current = false; // Reset game over sound flag
    setGameState("intro");
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
          if (!gameOverSoundPlayed.current) {
            playGameOverSound(); // Play random game over sound only once
            gameOverSoundPlayed.current = true;
          }
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
          setScore((prev) => {
            const newScore = prev + 1;
            // Check if we hit a milestone
            if (
              MILESTONES.includes(newScore) &&
              !playedMilestones.has(newScore)
            ) {
              playMilestoneSound(newScore);
              setCurrentMilestone(newScore);
              // Hide milestone popup after 2 seconds
              setTimeout(() => setCurrentMilestone(null), 2000);
              setPlayedMilestones((prevMilestones) => {
                const updated = new Set(prevMilestones);
                updated.add(newScore);
                return updated;
              });
            }
            return newScore;
          });
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
          if (!gameOverSoundPlayed.current) {
            playGameOverSound(); // Play random game over sound only once
            gameOverSoundPlayed.current = true;
          }
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

    return () => {
      if (pipeTimer.current) clearInterval(pipeTimer.current);
    };
  }, [gameState, gameWidth, gameHeight]);

  return {
    bird,
    pipes,
    gameState,
    score,
    handleJump,
    startGame,
    gameHeight,
    gameWidth,
    currentMilestone,
  };
};

export default useGameLogic;
