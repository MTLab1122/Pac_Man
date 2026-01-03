export type CellType = 'wall' | 'empty' | 'pellet' | 'powerPellet' | 'ghostHouse';

export interface Position {
  x: number;
  y: number;
}

export interface GameState {
  score: number;
  lives: number;
  level: number;
  gameStatus: 'start' | 'playing' | 'paused' | 'gameOver' | 'levelComplete';
  powerMode: boolean;
  powerModeTimer: number;
}

export interface PacMan {
  position: Position;
  direction: 'up' | 'down' | 'left' | 'right';
  nextDirection: 'up' | 'down' | 'left' | 'right' | null;
  mouthOpen: boolean;
}

export interface Ghost {
  id: string;
  position: Position;
  direction: 'up' | 'down' | 'left' | 'right';
  color: 'red' | 'pink' | 'cyan' | 'orange';
  mode: 'chase' | 'scared' | 'eaten' | 'home';
  homePosition: Position;
}

export type Maze = CellType[][];

