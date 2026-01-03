'use client';

import { PacMan as PacManType } from '@/types/game';

interface PacManProps {
  pacman: PacManType;
  cellSize: number;
}

export default function PacMan({ pacman, cellSize }: PacManProps) {
  const rotation = {
    up: 270,
    down: 90,
    left: 180,
    right: 0,
  }[pacman.direction];

  return (
    <div
      className="absolute transition-all duration-75 ease-linear"
      style={{
        left: `${pacman.position.x * cellSize}px`,
        top: `${pacman.position.y * cellSize}px`,
        width: `${cellSize}px`,
        height: `${cellSize}px`,
      }}
    >
      <div
        className="relative w-full h-full"
        style={{
          transform: `rotate(${rotation}deg)`,
        }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          style={{
            animation: pacman.mouthOpen ? 'pacman-mouth 0.3s ease-in-out infinite' : 'none',
          }}
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="#FFD700"
            className="glow"
          />
          {pacman.mouthOpen && (
            <path
              d="M 50 50 L 50 10 A 40 40 0 0 1 50 90 Z"
              fill="#1a1a2e"
            />
          )}
        </svg>
      </div>
    </div>
  );
}

