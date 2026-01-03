'use client';

import { MAZE_LAYOUT, CELL_SIZE } from '@/utils/maze';
import { CellType } from '@/types/game';

interface MazeProps {
  eatenPellets: Set<string>;
  eatenPowerPellets: Set<string>;
  cellSize?: number;
}

export default function Maze({ eatenPellets, eatenPowerPellets, cellSize = CELL_SIZE }: MazeProps) {
  const getCellKey = (x: number, y: number) => `${x},${y}`;

  return (
    <div className="relative">
      {MAZE_LAYOUT.map((row, y) =>
        row.map((cell, x) => {
          const cellKey = getCellKey(x, y);
          const isPelletEaten = eatenPellets.has(cellKey);
          const isPowerPelletEaten = eatenPowerPellets.has(cellKey);

          if (cell === 'wall') {
            return (
              <div
                key={cellKey}
                className="absolute bg-maze-blue border-2 border-blue-900"
                style={{
                  left: `${x * cellSize}px`,
                  top: `${y * cellSize}px`,
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                }}
              />
            );
          }

          if (cell === 'pellet' && !isPelletEaten) {
            return (
              <div
                key={cellKey}
                className="absolute flex items-center justify-center"
                style={{
                  left: `${x * cellSize}px`,
                  top: `${y * cellSize}px`,
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                }}
              >
                <div
                  className="bg-pacman-yellow rounded-full animate-pellet-blink"
                  style={{
                    width: '4px',
                    height: '4px',
                  }}
                />
              </div>
            );
          }

          if (cell === 'powerPellet' && !isPowerPelletEaten) {
            return (
              <div
                key={cellKey}
                className="absolute flex items-center justify-center"
                style={{
                  left: `${x * cellSize}px`,
                  top: `${y * cellSize}px`,
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                }}
              >
                <div
                  className="bg-pacman-yellow rounded-full animate-pulse glow"
                  style={{
                    width: '12px',
                    height: '12px',
                  }}
                />
              </div>
            );
          }

          return null;
        })
      )}
    </div>
  );
}

