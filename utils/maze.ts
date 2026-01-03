import { Maze, CellType } from '@/types/game';

// Classic Pac-Man maze layout (28x31 grid)
export const MAZE_LAYOUT: Maze = [
  ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
  ['wall', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'wall', 'wall', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'wall'],
  ['wall', 'pellet', 'wall', 'wall', 'wall', 'wall', 'pellet', 'wall', 'wall', 'wall', 'wall', 'wall', 'pellet', 'wall', 'wall', 'pellet', 'wall', 'wall', 'wall', 'wall', 'wall', 'pellet', 'wall', 'wall', 'wall', 'wall', 'pellet', 'wall'],
  ['wall', 'powerPellet', 'wall', 'wall', 'wall', 'wall', 'pellet', 'wall', 'wall', 'wall', 'wall', 'wall', 'pellet', 'wall', 'wall', 'pellet', 'wall', 'wall', 'wall', 'wall', 'wall', 'pellet', 'wall', 'wall', 'wall', 'wall', 'powerPellet', 'wall'],
  ['wall', 'pellet', 'wall', 'wall', 'wall', 'wall', 'pellet', 'wall', 'wall', 'wall', 'wall', 'wall', 'pellet', 'wall', 'wall', 'pellet', 'wall', 'wall', 'wall', 'wall', 'wall', 'pellet', 'wall', 'wall', 'wall', 'wall', 'pellet', 'wall'],
  ['wall', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'wall'],
  ['wall', 'pellet', 'wall', 'wall', 'wall', 'wall', 'pellet', 'wall', 'wall', 'pellet', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'pellet', 'wall', 'wall', 'pellet', 'wall', 'wall', 'wall', 'wall', 'pellet', 'wall'],
  ['wall', 'pellet', 'wall', 'wall', 'wall', 'wall', 'pellet', 'wall', 'wall', 'pellet', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'pellet', 'wall', 'wall', 'pellet', 'wall', 'wall', 'wall', 'wall', 'pellet', 'wall'],
  ['wall', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'wall', 'wall', 'pellet', 'pellet', 'pellet', 'pellet', 'wall', 'wall', 'pellet', 'pellet', 'pellet', 'pellet', 'wall', 'wall', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'wall'],
  ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'pellet', 'wall', 'wall', 'wall', 'wall', 'wall', 'empty', 'wall', 'wall', 'empty', 'wall', 'wall', 'wall', 'wall', 'wall', 'pellet', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
  ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'pellet', 'wall', 'wall', 'wall', 'wall', 'wall', 'empty', 'wall', 'wall', 'empty', 'wall', 'wall', 'wall', 'wall', 'wall', 'pellet', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
  ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'pellet', 'wall', 'wall', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'wall', 'wall', 'pellet', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
  ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'pellet', 'wall', 'wall', 'empty', 'wall', 'wall', 'wall', 'ghostHouse', 'ghostHouse', 'wall', 'wall', 'wall', 'empty', 'wall', 'wall', 'pellet', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
  ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'pellet', 'wall', 'wall', 'empty', 'wall', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'wall', 'empty', 'wall', 'wall', 'pellet', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'pellet', 'empty', 'empty', 'empty', 'wall', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'wall', 'empty', 'empty', 'empty', 'pellet', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'pellet', 'wall', 'wall', 'empty', 'wall', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'wall', 'empty', 'wall', 'wall', 'pellet', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
  ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'pellet', 'wall', 'wall', 'empty', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'empty', 'wall', 'wall', 'pellet', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
  ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'pellet', 'wall', 'wall', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'wall', 'wall', 'pellet', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
  ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'pellet', 'wall', 'wall', 'empty', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'empty', 'wall', 'wall', 'pellet', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
  ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'pellet', 'wall', 'wall', 'empty', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'empty', 'wall', 'wall', 'pellet', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
  ['wall', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'wall', 'wall', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'wall'],
  ['wall', 'pellet', 'wall', 'wall', 'wall', 'wall', 'pellet', 'wall', 'wall', 'wall', 'wall', 'wall', 'pellet', 'wall', 'wall', 'pellet', 'wall', 'wall', 'wall', 'wall', 'wall', 'pellet', 'wall', 'wall', 'wall', 'wall', 'pellet', 'wall'],
  ['wall', 'pellet', 'wall', 'wall', 'wall', 'wall', 'pellet', 'wall', 'wall', 'wall', 'wall', 'wall', 'pellet', 'wall', 'wall', 'pellet', 'wall', 'wall', 'wall', 'wall', 'wall', 'pellet', 'wall', 'wall', 'wall', 'wall', 'pellet', 'wall'],
  ['wall', 'powerPellet', 'pellet', 'pellet', 'wall', 'wall', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'empty', 'empty', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'wall', 'wall', 'pellet', 'pellet', 'powerPellet', 'wall'],
  ['wall', 'wall', 'wall', 'pellet', 'wall', 'wall', 'pellet', 'wall', 'wall', 'pellet', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'pellet', 'wall', 'wall', 'pellet', 'wall', 'wall', 'pellet', 'wall', 'wall', 'wall'],
  ['wall', 'wall', 'wall', 'pellet', 'wall', 'wall', 'pellet', 'wall', 'wall', 'pellet', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'pellet', 'wall', 'wall', 'pellet', 'wall', 'wall', 'pellet', 'wall', 'wall', 'wall'],
  ['wall', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'wall', 'wall', 'pellet', 'pellet', 'pellet', 'pellet', 'wall', 'wall', 'pellet', 'pellet', 'pellet', 'pellet', 'wall', 'wall', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'wall'],
  ['wall', 'pellet', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'pellet', 'wall', 'wall', 'pellet', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'pellet', 'wall'],
  ['wall', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'pellet', 'wall'],
  ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
];

export const MAZE_WIDTH = MAZE_LAYOUT[0].length;
export const MAZE_HEIGHT = MAZE_LAYOUT.length;

export const CELL_SIZE = 20; // pixels

export function getCellType(x: number, y: number): CellType {
  if (x < 0 || x >= MAZE_WIDTH || y < 0 || y >= MAZE_HEIGHT) {
    return 'wall';
  }
  return MAZE_LAYOUT[y][x];
}

export function canMoveTo(x: number, y: number): boolean {
  const cell = getCellType(x, y);
  return cell !== 'wall' && cell !== 'ghostHouse';
}

export function isPellet(x: number, y: number): boolean {
  return getCellType(x, y) === 'pellet';
}

export function isPowerPellet(x: number, y: number): boolean {
  return getCellType(x, y) === 'powerPellet';
}

export function getTotalPellets(): number {
  let count = 0;
  for (let y = 0; y < MAZE_HEIGHT; y++) {
    for (let x = 0; x < MAZE_WIDTH; x++) {
      if (isPellet(x, y) || isPowerPellet(x, y)) {
        count++;
      }
    }
  }
  return count;
}

