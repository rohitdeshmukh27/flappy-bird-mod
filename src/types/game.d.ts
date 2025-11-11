export interface Bird {
  x: number;
  y: number;
  width: number;
  height: number;
  velocity: number;
}

export interface Pipe {
  x: number;
  topHeight: number;
  bottomHeight: number;
  passed?: boolean;
}

export type GameState = "intro" | "playing" | "gameover" | "idle";
