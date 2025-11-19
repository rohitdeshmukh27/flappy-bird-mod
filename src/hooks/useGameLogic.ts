import { useEffect, useState, useRef } from "react";
import type { Bird, Pipe, GameState } from "../types/game";

const useGameLogic = () => {
  const [gameWidth] = useState(window.innerWidth);
  const [gameHeight] = useState(window.innerHeight);

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
  const [lastScore, setLastScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);
  const [lastPipeHeight, setLastPipeHeight] = useState<number | null>(null);

  const pipeTimer = useRef<number | null>(null);
  const gameOverSoundPlayed = useRef(false);
  const backgroundMusic = useRef<HTMLAudioElement | null>(null);
  const milestoneVideoRef = useRef<HTMLVideoElement | null>(null);
  const lastJumpTime = useRef<number>(0);

  // Milestone scores that trigger sound effects
  const MILESTONES = [10, 20, 50, 70, 90, 100, 150];

  const GRAVITY = 0.2;
  const JUMP = -3;
  const PIPE_WIDTH = gameWidth < 640 ? 50 : 60;
  const PIPE_GAP = gameWidth < 640 ? 200 : 250;
  const PIPE_SPEED = gameWidth < 640 ? 5 : 7;
  const PIPE_INTERVAL = 1200;

  // Function to play milestone celebration video/sound
  const playMilestoneSound = (milestone: number) => {
    try {
      // Remove any existing video
      if (milestoneVideoRef.current) {
        document.body.removeChild(milestoneVideoRef.current);
        milestoneVideoRef.current = null;
      }

      // Create and style the video element
      const video = document.createElement("video");
      video.src = `/sounds/number${milestone}.mp4`;
      video.volume = 0.5;
      video.autoplay = true;
      video.style.opacity = "0.5";
      // Style the video to appear centered on screen
      video.style.position = "fixed";
      video.style.top = "20%";
      video.style.left = "50%";
      video.style.transform = "translate(-50%, -50%)";
      video.style.width = "420px";
      video.style.maxWidth = "90vw";
      video.style.height = "auto";
      video.style.zIndex = "9999";
      video.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.5)";

      document.body.appendChild(video);
      milestoneVideoRef.current = video;

      video.play().catch((error) => {
        console.warn(`Could not play video for milestone ${milestone}:`, error);
      });

      // Remove video element after it finishes playing
      video.onended = () => {
        if (milestoneVideoRef.current) {
          document.body.removeChild(milestoneVideoRef.current);
          milestoneVideoRef.current = null;
        }
      };
    } catch (error) {
      console.warn(`Error loading video for milestone ${milestone}:`, error);
    }
  };

  // Function to play random game over sound
  const playGameOverSound = () => {
    try {
      // Randomly select one of the three game over sounds (1, 2, or 3)
      const randomSound = Math.floor(Math.random() * 3) + 1;
      const audio = new Audio(`/sounds/gameover${randomSound}.mp3`);
      audio.volume = 0.2; // Adjust volume as needed
      audio.play().catch((error) => {
        console.warn(`Could not play game over sound ${randomSound}:`, error);
      });
    } catch (error) {
      console.warn("Error loading game over sound:", error);
    }
  };

  // Function to play jump sound
  const playJumpSound = () => {
    try {
      const audio = new Audio("/sounds/jump.mp3");
      audio.volume = 0.4; // Adjust volume as needed
      audio.play().catch((error) => {
        console.warn("Could not play jump sound:", error);
      });
    } catch (error) {
      console.warn("Error loading jump sound:", error);
    }
  };

  const handleJump = () => {
    const now = Date.now();
    // Debounce: Prevent jumps within 150ms of each other
    if (now - lastJumpTime.current < 150) {
      return;
    }
    lastJumpTime.current = now;

    if (gameState === "intro") {
      startGame(); // Start game from intro screen
      return;
    }
    if (gameState === "playing") {
      playJumpSound(); // Play jump sound
      setBird((prev) => ({ ...prev, velocity: JUMP }));
    }
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
    setLastPipeHeight(null); // Reset pipe height tracking
    gameOverSoundPlayed.current = false; // Reset game over sound flag

    // Start background music
    if (backgroundMusic.current) {
      backgroundMusic.current.play().catch((error) => {
        console.warn("Could not play background music:", error);
      });
    }

    setGameState("playing"); // Go directly to playing
  };

  const resetGame = () => {
    // Save last score
    setLastScore(score);
    localStorage.setItem("flappyBirdLastScore", score.toString());

    // Update highest score if current score is higher
    if (score > highestScore) {
      setHighestScore(score);
      localStorage.setItem("flappyBirdHighestScore", score.toString());
    }

    setBird({ x: 80, y: gameHeight / 2, width: 40, height: 40, velocity: 0 });
    setPipes([]);
    setScore(0); // ✅ Reset score
    setLastPipeHeight(null); // Reset pipe height tracking
    setPlayedMilestones(new Set()); // Reset milestone tracking
    gameOverSoundPlayed.current = false; // Reset game over sound flag

    // Pause background music
    if (backgroundMusic.current) {
      backgroundMusic.current.pause();
      backgroundMusic.current.currentTime = 0;
    }

    setGameState("intro");
  };

  localStorage.setItem(
    "for the developers who came to see whats under application",
    "BKL"
  );

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
            // Stop background music immediately
            if (backgroundMusic.current) {
              backgroundMusic.current.pause();
            }
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
            // Stop background music immediately
            if (backgroundMusic.current) {
              backgroundMusic.current.pause();
            }
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
      let topHeight: number;

      if (gameWidth < 640) {
        // Mobile: smoother transitions between pipes
        if (lastPipeHeight === null) {
          // First pipe: center it nicely
          topHeight = gameHeight * 0.3 + Math.random() * gameHeight * 0.2;
        } else {
          // Subsequent pipes: limit height change to 30% of screen
          const maxChange = gameHeight * 0.3;
          const change = (Math.random() - 0.5) * maxChange;
          topHeight = Math.max(
            gameHeight * 0.15,
            Math.min(gameHeight * 0.65, lastPipeHeight + change)
          );
        }
      } else {
        // Desktop: original random generation
        topHeight = Math.random() * (gameHeight - PIPE_GAP - 100) + 50;
      }

      setLastPipeHeight(topHeight);
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

  // Initialize background music and load scores from localStorage on mount
  useEffect(() => {
    const audio = new Audio("/sounds/background-music.mp3");
    audio.loop = true; // Loop the music
    audio.volume = 0.3; // Set volume to 30%
    backgroundMusic.current = audio;

    // Load scores from localStorage
    const savedLastScore = localStorage.getItem("flappyBirdLastScore");
    const savedHighestScore = localStorage.getItem("flappyBirdHighestScore");

    if (savedLastScore) setLastScore(parseInt(savedLastScore, 10));
    if (savedHighestScore) setHighestScore(parseInt(savedHighestScore, 10));

    return () => {
      // Cleanup: stop music when component unmounts
      if (backgroundMusic.current) {
        backgroundMusic.current.pause();
        backgroundMusic.current = null;
      }
    };
  }, []);

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
    lastScore,
    highestScore,
  };
};

export default useGameLogic;
