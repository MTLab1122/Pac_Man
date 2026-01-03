'use client';

import { useGame } from '@/hooks/useGame';
import Maze from '@/components/Maze';
import PacMan from '@/components/PacMan';
import Ghost from '@/components/Ghost';
import { CELL_SIZE, MAZE_WIDTH, MAZE_HEIGHT } from '@/utils/maze';

export default function Home() {
  const { gameState, pacman, ghosts, eatenPellets, eatenPowerPellets, resetGame, startNextLevel } = useGame();

  const mazeWidth = MAZE_WIDTH * CELL_SIZE;
  const mazeHeight = MAZE_HEIGHT * CELL_SIZE;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-6xl font-bold text-pacman-yellow mb-2 text-shadow glow">
            PAC-MAN
          </h1>
          <div className="flex justify-center items-center gap-8 text-white text-xl font-bold">
            <div className="bg-black bg-opacity-50 px-4 py-2 rounded-lg">
              <span className="text-gray-300">SCORE: </span>
              <span className="text-pacman-yellow">{gameState.score.toString().padStart(6, '0')}</span>
            </div>
            <div className="bg-black bg-opacity-50 px-4 py-2 rounded-lg">
              <span className="text-gray-300">LIVES: </span>
              <span className="text-red-500">{gameState.lives}</span>
            </div>
            <div className="bg-black bg-opacity-50 px-4 py-2 rounded-lg">
              <span className="text-gray-300">LEVEL: </span>
              <span className="text-cyan-400">{gameState.level}</span>
            </div>
          </div>
        </div>

        {/* Game Container */}
        <div className="bg-black rounded-lg p-4 shadow-2xl border-4 border-yellow-500">
          <div
            className="relative mx-auto bg-black"
            style={{
              width: `${mazeWidth}px`,
              height: `${mazeHeight}px`,
            }}
          >
            {/* Game Overlay */}
            {gameState.gameStatus === 'start' && (
              <div className="absolute inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
                <div className="text-center">
                  <h2 className="text-4xl font-bold text-pacman-yellow mb-4 text-shadow animate-pulse">
                    READY!
                  </h2>
                  <p className="text-white text-lg mb-2">Press any arrow key to start</p>
                  <p className="text-gray-400 text-sm">Use Arrow Keys or WASD to move</p>
                  <p className="text-gray-500 text-xs mt-2">Press Space or P to pause</p>
                </div>
              </div>
            )}

            {gameState.gameStatus === 'paused' && (
              <div className="absolute inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
                <div className="text-center">
                  <h2 className="text-4xl font-bold text-yellow-400 mb-4 text-shadow">
                    PAUSED
                  </h2>
                  <p className="text-white text-lg mb-2">Press Space or P to resume</p>
                  <p className="text-gray-400 text-sm">Score: {gameState.score.toString().padStart(6, '0')}</p>
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
            <Maze eatenPellets={eatenPellets} eatenPowerPellets={eatenPowerPellets} />

            {/* Pac-Man */}
            {(gameState.gameStatus === 'playing' || gameState.gameStatus === 'paused') && (
              <PacMan pacman={pacman} cellSize={CELL_SIZE} />
            )}

            {/* Ghosts */}
            {(gameState.gameStatus === 'playing' || gameState.gameStatus === 'paused') &&
              ghosts.map((ghost) => (
                <Ghost key={ghost.id} ghost={ghost} cellSize={CELL_SIZE} />
              ))}
          </div>
        </div>

        {/* Instructions */}
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
      </div>
    </main>
  );
}

