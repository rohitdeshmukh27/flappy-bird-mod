import React from "react";

interface BirdProps {
  x: number;
  y: number;
  size: number;
  image: string;
}

const Bird: React.FC<BirdProps> = ({ x, y, size, image }) => {
  return (
    <img
    
      src={image}
      alt="bird"
      style={{
        userSelect: "none",
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};

export default Bird;
