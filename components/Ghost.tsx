'use client';

import { Ghost as GhostType } from '@/types/game';

interface GhostProps {
  ghost: GhostType;
  cellSize: number;
}

export default function Ghost({ ghost, cellSize }: GhostProps) {
  const colorMap = {
    red: '#FF0000',
    pink: '#FFB8FF',
    cyan: '#00FFFF',
    orange: '#FFB851',
  };

  const getColor = () => {
    if (ghost.mode === 'scared') {
      return '#2121DE';
    }
    if (ghost.mode === 'eaten') {
      return '#FFFFFF';
    }
    return colorMap[ghost.color];
  };

  const getEyeColor = () => {
    if (ghost.mode === 'scared') {
      return '#FFFFFF';
    }
    return '#FFFFFF';
  };

  return (
    <div
      className="absolute transition-all duration-150 ease-linear"
      style={{
        left: `${ghost.position.x * cellSize}px`,
        top: `${ghost.position.y * cellSize}px`,
        width: `${cellSize}px`,
        height: `${cellSize}px`,
        opacity: ghost.mode === 'eaten' ? 0.5 : 1,
      }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        style={{
          animation: ghost.mode === 'scared' ? 'ghost-scared 0.5s ease-in-out infinite' : 'none',
        }}
      >
        {/* Ghost body */}
        <path
          d="M 20 50 Q 20 20, 50 20 Q 80 20, 80 50 L 80 70 L 70 70 L 70 80 L 60 70 L 50 80 L 40 70 L 30 70 L 30 80 L 20 70 Z"
          fill={getColor()}
        />
        {/* Eyes */}
        {ghost.mode !== 'eaten' && (
          <>
            <circle cx="35" cy="40" r="8" fill={getEyeColor()} />
            <circle cx="65" cy="40" r="8" fill={getEyeColor()} />
            <circle cx="35" cy="40" r="4" fill="#000000" />
            <circle cx="65" cy="40" r="4" fill="#000000" />
          </>
        )}
        {ghost.mode === 'scared' && (
          <>
            <path d="M 30 50 L 35 55 L 30 60 Z" fill="#FFFFFF" />
            <path d="M 70 50 L 65 55 L 70 60 Z" fill="#FFFFFF" />
          </>
        )}
      </svg>
    </div>
  );
}

