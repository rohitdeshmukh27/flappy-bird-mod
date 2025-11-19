import { useEffect, useState, useRef } from "react";
import Bird from "./components/Bird";
import Pipes from "./components/Pipes";
import IntroPage from "./components/IntroPage";
import MilestonePopup from "./components/MilestonePopup";
import birdImg from "./assets/bird.png";
import useGameLogic from "./hooks/useGameLogic";
import Score from "./components/Score";
import {
  initGA,
  trackGameStart,
  trackGameEnd,
  trackMilestone,
  trackHighScore,
} from "./utils/analytics";

const App = () => {
  const {
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
  } = useGameLogic();

  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);
  const [trackedMilestones, setTrackedMilestones] = useState<Set<number>>(
    new Set()
  );
  const previousHighScore = useRef<number>(highestScore);

  // Initialize Google Analytics on mount
  useEffect(() => {
    initGA();
  }, []);

  // Track game session start
  useEffect(() => {
    if (gameState === "playing" && sessionStartTime === null) {
      const startTime = Date.now();
      setSessionStartTime(startTime);
      trackGameStart();
    }
  }, [gameState, sessionStartTime]);

  // Track game session end and duration
  useEffect(() => {
    if (gameState === "gameover" && sessionStartTime !== null) {
      const duration = (Date.now() - sessionStartTime) / 1000; // Convert to seconds
      trackGameEnd(score, duration);
      setSessionStartTime(null);
      setTrackedMilestones(new Set()); // Reset milestones for next game
    }
  }, [gameState, sessionStartTime, score]);

  // Track milestones
  useEffect(() => {
    if (currentMilestone && !trackedMilestones.has(currentMilestone)) {
      trackMilestone(currentMilestone);
      setTrackedMilestones((prev) => new Set(prev).add(currentMilestone));
    }
  }, [currentMilestone, trackedMilestones]);

  // Track new high score
  useEffect(() => {
    if (highestScore > previousHighScore.current) {
      trackHighScore(highestScore);
      previousHighScore.current = highestScore;
    }
  }, [highestScore]);

  // Spacebar key press
  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space" && gameState !== "intro") {
        e.preventDefault();
        handleJump();
      }
    };
    window.addEventListener("keyup", handleKeyUp);
    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [handleJump, gameState]);

  // Touch event handler with passive: false to allow preventDefault
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (gameState !== "intro") {
        e.preventDefault();
        handleJump();
      }
    };

    const gameArea = document.getElementById("game-area");
    if (gameArea) {
      gameArea.addEventListener("touchstart", handleTouchStart, {
        passive: false,
      });
      return () => gameArea.removeEventListener("touchstart", handleTouchStart);
    }
  }, [handleJump, gameState]);

  return (
    <>
      {gameState === "intro" && (
        <IntroPage
          onStart={startGame}
          lastScore={lastScore}
          highestScore={highestScore}
        />
      )}
      <div
        id="game-area"
        className="fixed inset-0 w-screen h-screen overflow-hidden bg-sky-400 z-0"
        style={{
          backgroundImage: "url('/images/background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        onMouseDown={gameState !== "intro" ? handleJump : undefined}
      >
        <Bird x={bird.x} y={bird.y} size={bird.width} image={birdImg} />
        <Pipes
          pipes={pipes}
          width={gameWidth < 640 ? 50 : 60}
          gameHeight={gameHeight}
        />
        <Score score={score} />
        <MilestonePopup milestone={currentMilestone} />
        {gameState === "gameover" && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center px-4">
            Try again 🧒🏿
          </div>
        )}

        {/* Disclaimer */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white/60 text-xs text-center px-4">
          For fun and entertainment purposes only
        </div>
      </div>
    </>
  );
};

export default App;
