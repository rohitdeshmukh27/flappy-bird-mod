import React from "react";
import Pipe from "./Pipe";
import type { Pipe as PipeType } from "../types/game";

interface PipesProps {
  pipes: PipeType[];
  width: number;
  gameHeight: number;
}

const Pipes: React.FC<PipesProps> = ({ pipes, width, gameHeight }) => (
  <>
    {pipes.map((pipe, index) => (
      <Pipe
        key={index}
        x={pipe.x}
        topHeight={pipe.topHeight}
        bottomHeight={pipe.bottomHeight}
        width={width}
        gameHeight={gameHeight}
      />
    ))}
  </>
);

export default Pipes;
