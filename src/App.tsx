import { useEffect } from "react";
import Bird from "./components/Bird";
import Pipes from "./components/Pipes";
import IntroPage from "./components/IntroPage";
import MilestonePopup from "./components/MilestonePopup";
import birdImg from "./assets/bird.png";
import useGameLogic from "./hooks/useGameLogic";
import Score from "./components/Score";

const App = () => {
  const {
    bird,
    pipes,
    gameState,
    score,
    handleJump,
    startGame,
    gameHeight,
    currentMilestone,
    lastScore,
    highestScore,
  } = useGameLogic();

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
        className="fixed inset-0 w-screen h-screen overflow-hidden bg-sky-400 z-0"
        style={{
          backgroundImage: "url('/images/background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        onMouseDown={gameState !== "intro" ? handleJump : undefined}
        onTouchStart={gameState !== "intro" ? handleJump : undefined}
      >
        <Bird x={bird.x} y={bird.y} size={bird.width} image={birdImg} />
        <Pipes pipes={pipes} width={60} gameHeight={gameHeight} />
        <Score score={score} />
        <MilestonePopup milestone={currentMilestone} />
        {gameState === "gameover" && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl font-bold text-white">
            Try again 🧒🏿
          </div>
        )}
      </div>
    </>
  );
};

export default App;
