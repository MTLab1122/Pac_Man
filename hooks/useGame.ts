'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { GameState, PacMan, Ghost, Position } from '@/types/game';
import { canMoveTo, isPellet, isPowerPellet, MAZE_WIDTH, MAZE_HEIGHT, CELL_SIZE, getTotalPellets } from '@/utils/maze';

const INITIAL_PACMAN_POS: Position = { x: 14, y: 23 };
const GHOST_START_POS: Position = { x: 14, y: 11 };
const GHOST_COLORS: Array<'red' | 'pink' | 'cyan' | 'orange'> = ['red', 'pink', 'cyan', 'orange'];
const GHOST_OFFSETS: Position[] = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
];

const POWER_MODE_DURATION = 6000; // 6 seconds
const GAME_SPEED = 150; // milliseconds

export function useGame() {
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    lives: 3,
    level: 1,
    gameStatus: 'start',
    powerMode: false,
    powerModeTimer: 0,
  });

  const [pacman, setPacman] = useState<PacMan>({
    position: INITIAL_PACMAN_POS,
    direction: 'right',
    nextDirection: null,
    mouthOpen: true,
  });

  const [ghosts, setGhosts] = useState<Ghost[]>(() =>
    GHOST_COLORS.map((color, index) => ({
      id: `ghost-${color}`,
      position: {
        x: GHOST_START_POS.x + GHOST_OFFSETS[index].x,
        y: GHOST_START_POS.y + GHOST_OFFSETS[index].y,
      },
      direction: 'left',
      color,
      mode: 'home',
      homePosition: {
        x: GHOST_START_POS.x + GHOST_OFFSETS[index].x,
        y: GHOST_START_POS.y + GHOST_OFFSETS[index].y,
      },
    }))
  );

  const [eatenPellets, setEatenPellets] = useState<Set<string>>(new Set());
  const [eatenPowerPellets, setEatenPowerPellets] = useState<Set<string>>(new Set());
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const powerModeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const mouthAnimationRef = useRef<NodeJS.Timeout | null>(null);

  const getCellKey = (x: number, y: number) => `${x},${y}`;

  const handleKeyPress = useCallback((key: string) => {
    if (gameState.gameStatus === 'start') {
      setGameState((prev) => ({ ...prev, gameStatus: 'playing' }));
      return;
    }

    // Pause/Resume with Space or P
    if (key === ' ' || key === 'p' || key === 'P') {
      if (gameState.gameStatus === 'playing') {
        setGameState((prev) => ({ ...prev, gameStatus: 'paused' }));
      } else if (gameState.gameStatus === 'paused') {
        setGameState((prev) => ({ ...prev, gameStatus: 'playing' }));
      }
      return;
    }

    if (gameState.gameStatus !== 'playing') return;

    let direction: 'up' | 'down' | 'left' | 'right' | null = null;
    if (key === 'ArrowUp' || key === 'w' || key === 'W') direction = 'up';
    if (key === 'ArrowDown' || key === 's' || key === 'S') direction = 'down';
    if (key === 'ArrowLeft' || key === 'a' || key === 'A') direction = 'left';
    if (key === 'ArrowRight' || key === 'd' || key === 'D') direction = 'right';

    if (direction) {
      setPacman((prev) => ({ ...prev, nextDirection: direction }));
    }
  }, [gameState.gameStatus]);

  const movePacman = useCallback(() => {
    setPacman((prev) => {
      const { position, direction, nextDirection } = prev;
      let newDirection = direction;
      let newPosition = { ...position };

      // Try to change direction if requested
      if (nextDirection) {
        const testPos = getNextPosition(position, nextDirection);
        if (canMoveTo(testPos.x, testPos.y)) {
          newDirection = nextDirection;
          newPosition = testPos;
        } else {
          // Try current direction
          const testPos2 = getNextPosition(position, direction);
          if (canMoveTo(testPos2.x, testPos2.y)) {
            newPosition = testPos2;
          }
        }
      } else {
        const testPos = getNextPosition(position, direction);
        if (canMoveTo(testPos.x, testPos.y)) {
          newPosition = testPos;
        }
      }

      // Handle tunnel (wrap around)
      if (newPosition.x < 0) newPosition.x = MAZE_WIDTH - 1;
      if (newPosition.x >= MAZE_WIDTH) newPosition.x = 0;

      // Check for pellets
      const cellKey = getCellKey(newPosition.x, newPosition.y);
      if (isPellet(newPosition.x, newPosition.y) && !eatenPellets.has(cellKey)) {
        setEatenPellets((prev) => {
          const newSet = new Set(prev);
          newSet.add(cellKey);
          return newSet;
        });
        setGameState((prev) => ({ ...prev, score: prev.score + 10 }));
      }

      if (isPowerPellet(newPosition.x, newPosition.y) && !eatenPowerPellets.has(cellKey)) {
        setEatenPowerPellets((prev) => {
          const newSet = new Set(prev);
          newSet.add(cellKey);
          return newSet;
        });
        setGameState((prev) => ({ ...prev, score: prev.score + 50, powerMode: true, powerModeTimer: POWER_MODE_DURATION }));
        setGhosts((prev) => prev.map((g) => ({ ...g, mode: 'scared' })));
      }

      return {
        ...prev,
        position: newPosition,
        direction: newDirection,
        nextDirection: null,
        mouthOpen: !prev.mouthOpen,
      };
    });
  }, [eatenPellets, eatenPowerPellets]);

  const getNextPosition = (pos: Position, dir: 'up' | 'down' | 'left' | 'right'): Position => {
    switch (dir) {
      case 'up':
        return { x: pos.x, y: pos.y - 1 };
      case 'down':
        return { x: pos.x, y: pos.y + 1 };
      case 'left':
        return { x: pos.x - 1, y: pos.y };
      case 'right':
        return { x: pos.x + 1, y: pos.y };
    }
  };

  const getRandomDirection = (): 'up' | 'down' | 'left' | 'right' => {
    const directions: Array<'up' | 'down' | 'left' | 'right'> = ['up', 'down', 'left', 'right'];
    return directions[Math.floor(Math.random() * directions.length)];
  };

  const moveGhosts = useCallback(() => {
    setGhosts((prev) =>
      prev.map((ghost) => {
        if (ghost.mode === 'home') {
          // Ghosts start leaving home after a delay
          if (Math.random() > 0.7) {
            return { ...ghost, mode: 'chase' };
          }
          return ghost;
        }

        if (ghost.mode === 'eaten') {
          // Return to home
          if (ghost.position.x === ghost.homePosition.x && ghost.position.y === ghost.homePosition.y) {
            return { ...ghost, mode: 'home' };
          }
          // Move towards home
          const dx = ghost.homePosition.x - ghost.position.x;
          const dy = ghost.homePosition.y - ghost.position.y;
          let preferredDir: 'up' | 'down' | 'left' | 'right' = ghost.direction;
          
          if (Math.abs(dx) > Math.abs(dy)) {
            preferredDir = dx > 0 ? 'right' : 'left';
          } else {
            preferredDir = dy > 0 ? 'down' : 'up';
          }
          
          const testPos = getNextPosition(ghost.position, preferredDir);
          if (canMoveTo(testPos.x, testPos.y)) {
            return {
              ...ghost,
              position: testPos,
              direction: preferredDir,
            };
          }
        }

        const { position, direction } = ghost;
        let newDirection = direction;
        let newPosition = getNextPosition(position, direction);

        // If can't move in current direction, choose random valid direction
        if (!canMoveTo(newPosition.x, newPosition.y)) {
          const directions: Array<'up' | 'down' | 'left' | 'right'> = ['up', 'down', 'left', 'right'];
          const validDirections = directions.filter((dir) => {
            const testPos = getNextPosition(position, dir);
            return canMoveTo(testPos.x, testPos.y);
          });

          if (validDirections.length > 0) {
            newDirection = validDirections[Math.floor(Math.random() * validDirections.length)];
            newPosition = getNextPosition(position, newDirection);
          } else {
            return ghost;
          }
        }

        // Handle tunnel
        if (newPosition.x < 0) newPosition.x = MAZE_WIDTH - 1;
        if (newPosition.x >= MAZE_WIDTH) newPosition.x = 0;

        // AI: In scared mode, move away from Pac-Man. In chase mode, move towards Pac-Man
        if (ghost.mode === 'scared' || ghost.mode === 'chase') {
          const dx = pacman.position.x - position.x;
          const dy = pacman.position.y - position.y;
          
          if (ghost.mode === 'scared') {
            // Move away from Pac-Man
            const directions: Array<'up' | 'down' | 'left' | 'right'> = ['up', 'down', 'left', 'right'];
            const validDirections = directions.filter((dir) => {
              const testPos = getNextPosition(position, dir);
              return canMoveTo(testPos.x, testPos.y) && dir !== getOppositeDirection(direction);
            });

            if (validDirections.length > 0) {
              // Choose direction that maximizes distance from Pac-Man
              const bestDir = validDirections.reduce((best, dir) => {
                const testPos = getNextPosition(position, dir);
                const bestPos = getNextPosition(position, best);
                const testDist = Math.abs(testPos.x - pacman.position.x) + Math.abs(testPos.y - pacman.position.y);
                const bestDist = Math.abs(bestPos.x - pacman.position.x) + Math.abs(bestPos.y - pacman.position.y);
                return testDist > bestDist ? dir : best;
              });
              newDirection = bestDir;
              newPosition = getNextPosition(position, newDirection);
            }
          } else if (ghost.mode === 'chase' && Math.random() > 0.7) {
            // Sometimes move towards Pac-Man
            const directions: Array<'up' | 'down' | 'left' | 'right'> = ['up', 'down', 'left', 'right'];
            const validDirections = directions.filter((dir) => {
              const testPos = getNextPosition(position, dir);
              return canMoveTo(testPos.x, testPos.y) && dir !== getOppositeDirection(direction);
            });

            if (validDirections.length > 0) {
              // Choose direction that minimizes distance to Pac-Man
              const bestDir = validDirections.reduce((best, dir) => {
                const testPos = getNextPosition(position, dir);
                const bestPos = getNextPosition(position, best);
                const testDist = Math.abs(testPos.x - pacman.position.x) + Math.abs(testPos.y - pacman.position.y);
                const bestDist = Math.abs(bestPos.x - pacman.position.x) + Math.abs(bestPos.y - pacman.position.y);
                return testDist < bestDist ? dir : best;
              });
              newDirection = bestDir;
              newPosition = getNextPosition(position, newDirection);
            }
          }
        }

        // Simple AI: sometimes change direction randomly
        if (ghost.mode === 'chase' && Math.random() > 0.85) {
          const directions: Array<'up' | 'down' | 'left' | 'right'> = ['up', 'down', 'left', 'right'];
          const validDirections = directions.filter((dir) => {
            const testPos = getNextPosition(position, dir);
            return canMoveTo(testPos.x, testPos.y) && dir !== getOppositeDirection(direction);
          });

          if (validDirections.length > 0) {
            newDirection = validDirections[Math.floor(Math.random() * validDirections.length)];
            newPosition = getNextPosition(position, newDirection);
          }
        }

        return {
          ...ghost,
          position: newPosition,
          direction: newDirection,
        };
      })
    );
  }, [pacman]);

  const getOppositeDirection = (dir: 'up' | 'down' | 'left' | 'right'): 'up' | 'down' | 'left' | 'right' => {
    switch (dir) {
      case 'up':
        return 'down';
      case 'down':
        return 'up';
      case 'left':
        return 'right';
      case 'right':
        return 'left';
    }
  };

  const checkLevelComplete = useCallback((eatenPellets: Set<string>, eatenPowerPellets: Set<string>) => {
    const totalPellets = getTotalPellets();
    const collectedPellets = eatenPellets.size + eatenPowerPellets.size;
    return collectedPellets >= totalPellets;
  }, []);

  const checkCollisions = useCallback(() => {
    ghosts.forEach((ghost) => {
      if (
        ghost.position.x === pacman.position.x &&
        ghost.position.y === pacman.position.y &&
        ghost.mode !== 'eaten'
      ) {
        if (gameState.powerMode && ghost.mode === 'scared') {
          // Eat ghost
          setGhosts((prev) =>
            prev.map((g) =>
              g.id === ghost.id ? { ...g, mode: 'eaten', position: { x: 14, y: 11 } } : g
            )
          );
          setGameState((prev) => ({ ...prev, score: prev.score + 200 }));
        } else {
          // Pac-Man dies
          setGameState((prev) => {
            const newLives = prev.lives - 1;
            if (newLives <= 0) {
              return { ...prev, lives: 0, gameStatus: 'gameOver' };
            }
            return { ...prev, lives: newLives };
          });

          // Reset positions
          setPacman({
            position: INITIAL_PACMAN_POS,
            direction: 'right',
            nextDirection: null,
            mouthOpen: true,
          });
          setGhosts((prev) =>
            prev.map((g) => ({
              ...g,
              position: g.homePosition,
              mode: 'home',
            }))
          );
        }
      }
    });
  }, [ghosts, pacman, gameState.powerMode]);

  useEffect(() => {
    if (gameState.gameStatus !== 'playing') return;

    gameLoopRef.current = setInterval(() => {
      movePacman();
      moveGhosts();
      checkCollisions();
    }, GAME_SPEED);

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameState.gameStatus, movePacman, moveGhosts, checkCollisions]);

  // Check level completion
  useEffect(() => {
    if (gameState.gameStatus === 'playing' && checkLevelComplete(eatenPellets, eatenPowerPellets)) {
      setGameState((prev) => ({
        ...prev,
        level: prev.level + 1,
        gameStatus: 'levelComplete',
      }));
    }
  }, [gameState.gameStatus, eatenPellets, eatenPowerPellets, checkLevelComplete]);

  useEffect(() => {
    if (gameState.powerMode) {
      powerModeTimerRef.current = setInterval(() => {
        setGameState((prev) => {
          const newTimer = prev.powerModeTimer - 100;
          if (newTimer <= 0) {
            setGhosts((prev) => prev.map((g) => (g.mode === 'scared' ? { ...g, mode: 'chase' } : g)));
            return { ...prev, powerMode: false, powerModeTimer: 0 };
          }
          return { ...prev, powerModeTimer: newTimer };
        });
      }, 100);
    }

    return () => {
      if (powerModeTimerRef.current) {
        clearInterval(powerModeTimerRef.current);
      }
    };
  }, [gameState.powerMode]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      handleKeyPress(e.key);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyPress]);

  const startNextLevel = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      gameStatus: 'start',
      powerMode: false,
      powerModeTimer: 0,
    }));
    setPacman({
      position: INITIAL_PACMAN_POS,
      direction: 'right',
      nextDirection: null,
      mouthOpen: true,
    });
    setGhosts(
      GHOST_COLORS.map((color, index) => ({
        id: `ghost-${color}`,
        position: {
          x: GHOST_START_POS.x + GHOST_OFFSETS[index].x,
          y: GHOST_START_POS.y + GHOST_OFFSETS[index].y,
        },
        direction: 'left',
        color,
        mode: 'home',
        homePosition: {
          x: GHOST_START_POS.x + GHOST_OFFSETS[index].x,
          y: GHOST_START_POS.y + GHOST_OFFSETS[index].y,
        },
      }))
    );
    setEatenPellets(new Set());
    setEatenPowerPellets(new Set());
  }, []);

  const resetGame = useCallback(() => {
    setGameState({
      score: 0,
      lives: 3,
      level: 1,
      gameStatus: 'start',
      powerMode: false,
      powerModeTimer: 0,
    });
    setPacman({
      position: INITIAL_PACMAN_POS,
      direction: 'right',
      nextDirection: null,
      mouthOpen: true,
    });
    setGhosts(
      GHOST_COLORS.map((color, index) => ({
        id: `ghost-${color}`,
        position: {
          x: GHOST_START_POS.x + GHOST_OFFSETS[index].x,
          y: GHOST_START_POS.y + GHOST_OFFSETS[index].y,
        },
        direction: 'left',
        color,
        mode: 'home',
        homePosition: {
          x: GHOST_START_POS.x + GHOST_OFFSETS[index].x,
          y: GHOST_START_POS.y + GHOST_OFFSETS[index].y,
        },
      }))
    );
    setEatenPellets(new Set());
    setEatenPowerPellets(new Set());
  }, []);

  return {
    gameState,
    pacman,
    ghosts,
    eatenPellets,
    eatenPowerPellets,
    handleKeyPress,
    resetGame,
    startNextLevel,
  };
}

