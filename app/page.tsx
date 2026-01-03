'use client';

import { useGame } from '@/hooks/useGame';
import Maze from '@/components/Maze';
import PacMan from '@/components/PacMan';
import Ghost from '@/components/Ghost';
import MobileControls from '@/components/MobileControls';
import { CELL_SIZE, MAZE_WIDTH, MAZE_HEIGHT } from '@/utils/maze';
import { useState, useEffect } from 'react';

export default function Home() {
  const { gameState, pacman, ghosts, eatenPellets, eatenPowerPellets, resetGame, startNextLevel, handleDirection, handleStart, handlePause } = useGame();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const mazeWidth = MAZE_WIDTH * CELL_SIZE;
  const mazeHeight = MAZE_HEIGHT * CELL_SIZE;
  const availableWidth = typeof window !== 'undefined' ? window.innerWidth - 32 : 560;
  const scale = isMobile ? Math.min(availableWidth / mazeWidth, 1) : 1;
  const scaledCellSize = CELL_SIZE * scale;
  const scaledWidth = MAZE_WIDTH * scaledCellSize;
  const scaledHeight = MAZE_HEIGHT * scaledCellSize;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-2 md:p-4 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 pb-32 md:pb-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-4 md:mb-6">
          <h1 className="text-3xl md:text-6xl font-bold text-pacman-yellow mb-2 text-shadow glow">
            PAC-MAN
          </h1>
          <div className="flex justify-center items-center gap-2 md:gap-8 text-white text-sm md:text-xl font-bold flex-wrap">
            <div className="bg-black bg-opacity-50 px-2 md:px-4 py-1 md:py-2 rounded-lg">
              <span className="text-gray-300">SCORE: </span>
              <span className="text-pacman-yellow">{gameState.score.toString().padStart(6, '0')}</span>
            </div>
            <div className="bg-black bg-opacity-50 px-2 md:px-4 py-1 md:py-2 rounded-lg">
              <span className="text-gray-300">LIVES: </span>
              <span className="text-red-500">{gameState.lives}</span>
            </div>
            <div className="bg-black bg-opacity-50 px-2 md:px-4 py-1 md:py-2 rounded-lg">
              <span className="text-gray-300">LEVEL: </span>
              <span className="text-cyan-400">{gameState.level}</span>
            </div>
          </div>
        </div>

        {/* Game Container */}
        <div className="bg-black rounded-lg p-2 md:p-4 shadow-2xl border-2 md:border-4 border-yellow-500">
          <div
            className="relative mx-auto bg-black"
            style={{
              width: `${scaledWidth}px`,
              height: `${scaledHeight}px`,
            }}
          >
            {/* Game Overlay */}
            {gameState.gameStatus === 'start' && (
              <div className="absolute inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
                <div className="text-center px-4">
                  <h2 className="text-2xl md:text-4xl font-bold text-pacman-yellow mb-4 text-shadow animate-pulse">
                    READY!
                  </h2>
                  {!isMobile ? (
                    <>
                      <p className="text-white text-sm md:text-lg mb-2">Press any arrow key to start</p>
                      <p className="text-gray-400 text-xs md:text-sm">Use Arrow Keys or WASD to move</p>
                      <p className="text-gray-500 text-xs mt-2">Press Space or P to pause</p>
                    </>
                  ) : (
                    <>
                      <p className="text-white text-sm md:text-lg mb-2">Tap START button to begin</p>
                      <p className="text-gray-400 text-xs md:text-sm">Use the directional pad below to move</p>
                    </>
                  )}
                </div>
              </div>
            )}

            {gameState.gameStatus === 'paused' && (
              <div className="absolute inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
                <div className="text-center px-4">
                  <h2 className="text-2xl md:text-4xl font-bold text-yellow-400 mb-4 text-shadow">
                    PAUSED
                  </h2>
                  {!isMobile ? (
                    <p className="text-white text-sm md:text-lg mb-2">Press Space or P to resume</p>
                  ) : (
                    <p className="text-white text-sm md:text-lg mb-2">Tap RESUME button to continue</p>
                  )}
                  <p className="text-gray-400 text-xs md:text-sm">Score: {gameState.score.toString().padStart(6, '0')}</p>
                </div>
              </div>
            )}

            {gameState.gameStatus === 'levelComplete' && (
              <div className="absolute inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
                <div className="text-center">
                  <h2 className="text-5xl font-bold text-green-400 mb-4 text-shadow">
                    LEVEL COMPLETE!
                  </h2>
                  <p className="text-white text-2xl mb-4">
                    Score: {gameState.score.toString().padStart(6, '0')}
                  </p>
                  <p className="text-white text-lg mb-4">
                    Starting Level {gameState.level}...
                  </p>
                  <button
                    onClick={startNextLevel}
                    className="bg-pacman-yellow text-black font-bold py-3 px-8 rounded-lg hover:bg-yellow-400 transition-colors text-xl shadow-lg"
                  >
                    CONTINUE
                  </button>
                </div>
              </div>
            )}

            {gameState.gameStatus === 'gameOver' && (
              <div className="absolute inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
                <div className="text-center">
                  <h2 className="text-5xl font-bold text-red-500 mb-4 text-shadow">
                    GAME OVER
                  </h2>
                  <p className="text-white text-2xl mb-4">
                    Final Score: {gameState.score.toString().padStart(6, '0')}
                  </p>
                  <button
                    onClick={resetGame}
                    className="bg-pacman-yellow text-black font-bold py-3 px-8 rounded-lg hover:bg-yellow-400 transition-colors text-xl shadow-lg"
                  >
                    PLAY AGAIN
                  </button>
                </div>
              </div>
            )}

            {/* Power Mode Indicator */}
            {gameState.powerMode && (
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-40 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold animate-pulse">
                POWER MODE!
              </div>
            )}

            {/* Maze */}
            <Maze eatenPellets={eatenPellets} eatenPowerPellets={eatenPowerPellets} cellSize={scaledCellSize} />

            {/* Pac-Man */}
            {(gameState.gameStatus === 'playing' || gameState.gameStatus === 'paused') && (
              <PacMan pacman={pacman} cellSize={scaledCellSize} />
            )}

            {/* Ghosts */}
            {(gameState.gameStatus === 'playing' || gameState.gameStatus === 'paused') &&
              ghosts.map((ghost) => (
                <Ghost key={ghost.id} ghost={ghost} cellSize={scaledCellSize} />
              ))}
          </div>
        </div>

        {/* Instructions - Desktop Only */}
        {!isMobile && (
          <div className="mt-6 text-center text-white">
            <div className="bg-black bg-opacity-50 rounded-lg p-4 inline-block">
              <p className="text-sm mb-2">
                <span className="font-bold text-pacman-yellow">Controls:</span> Arrow Keys or WASD to move
              </p>
              <p className="text-xs text-gray-400 mb-1">
                Collect all pellets to win! Power pellets make ghosts vulnerable.
              </p>
              <p className="text-xs text-gray-500">
                Press <span className="font-bold">Space</span> or <span className="font-bold">P</span> to pause
              </p>
            </div>
          </div>
        )}

        {/* Mobile Controls */}
        {isMobile && (
          <MobileControls
            onDirection={handleDirection}
            onStart={handleStart}
            onPause={handlePause}
            gameStatus={gameState.gameStatus}
          />
        )}
      </div>
    </main>
  );
}

