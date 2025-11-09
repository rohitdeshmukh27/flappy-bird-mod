import React, { useEffect } from "react";
import Bird from "./components/Bird";
import Pipes from "./components/Pipes";
import "./styles/Game.css";
import birdImg from "./assets/bird.png";
import useGameLogic from "./hooks/useGameLogic";
import Score from "./components/Score"; 

const App = () => {
  const { bird, pipes, gameState, score, handleJump, gameHeight, gameWidth } = useGameLogic();

  // Spacebar key press
  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        handleJump();
      }
    };
    window.addEventListener("keyup", handleKeyUp);
    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [handleJump]);

  return (
    <div
      className="game-container"
      onMouseDown={handleJump}
      onTouchStart={handleJump}
    >
      <Bird x={bird.x} y={bird.y} size={bird.width} image={birdImg} />
      <Pipes pipes={pipes} width={60} gameHeight={gameHeight} />
      <Score score={score} />
      {gameState === "gameover" && <div className="game-over">Game Over</div>}
    </div>
  );
};

export default App;
