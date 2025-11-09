import React from "react";

interface PipeProps {
  x: number;
  topHeight: number;
  bottomHeight: number;
  width: number;
  gameHeight: number;
}

const Pipe: React.FC<PipeProps> = ({ x, topHeight, bottomHeight, width, gameHeight }) => {
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: `${x}px`,
          top: "0px",
          width: `${width}px`,
          height: `${topHeight}px`,
          backgroundColor: "green",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: `${x}px`,
          bottom: "0px",
          width: `${width}px`,
          height: `${bottomHeight}px`,
          backgroundColor: "green",
        }}
      />
    </>
  );
};

export default Pipe;
