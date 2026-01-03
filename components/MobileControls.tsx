'use client';

interface MobileControlsProps {
  onDirection: (direction: 'up' | 'down' | 'left' | 'right') => void;
  onStart: () => void;
  onPause: () => void;
  gameStatus: 'start' | 'playing' | 'paused' | 'gameOver' | 'levelComplete';
}

export default function MobileControls({ onDirection, onStart, onPause, gameStatus }: MobileControlsProps) {
  const handleTouchStart = (e: React.TouchEvent, direction: 'up' | 'down' | 'left' | 'right') => {
    e.preventDefault();
    onDirection(direction);
  };

  return (
    <div className="md:hidden fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      {/* Directional Pad */}
      <div className="relative w-48 h-48">
        {/* Up */}
        <button
          onTouchStart={(e) => handleTouchStart(e, 'up')}
          onClick={() => onDirection('up')}
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-pacman-yellow bg-opacity-80 rounded-lg flex items-center justify-center text-2xl font-bold text-black shadow-lg active:bg-opacity-100 active:scale-95 transition-all"
          aria-label="Move Up"
        >
          ↑
        </button>
        
        {/* Down */}
        <button
          onTouchStart={(e) => handleTouchStart(e, 'down')}
          onClick={() => onDirection('down')}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-pacman-yellow bg-opacity-80 rounded-lg flex items-center justify-center text-2xl font-bold text-black shadow-lg active:bg-opacity-100 active:scale-95 transition-all"
          aria-label="Move Down"
        >
          ↓
        </button>
        
        {/* Left */}
        <button
          onTouchStart={(e) => handleTouchStart(e, 'left')}
          onClick={() => onDirection('left')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 w-16 h-16 bg-pacman-yellow bg-opacity-80 rounded-lg flex items-center justify-center text-2xl font-bold text-black shadow-lg active:bg-opacity-100 active:scale-95 transition-all"
          aria-label="Move Left"
        >
          ←
        </button>
        
        {/* Right */}
        <button
          onTouchStart={(e) => handleTouchStart(e, 'right')}
          onClick={() => onDirection('right')}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 w-16 h-16 bg-pacman-yellow bg-opacity-80 rounded-lg flex items-center justify-center text-2xl font-bold text-black shadow-lg active:bg-opacity-100 active:scale-95 transition-all"
          aria-label="Move Right"
        >
          →
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-4 justify-center">
        {gameStatus === 'start' && (
          <button
            onTouchStart={(e) => {
              e.preventDefault();
              onStart();
            }}
            onClick={onStart}
            className="bg-green-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg active:bg-green-600 active:scale-95 transition-all"
          >
            START
          </button>
        )}
        {(gameStatus === 'playing' || gameStatus === 'paused') && (
          <button
            onTouchStart={(e) => {
              e.preventDefault();
              onPause();
            }}
            onClick={onPause}
            className="bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg shadow-lg active:bg-yellow-600 active:scale-95 transition-all"
          >
            {gameStatus === 'playing' ? 'PAUSE' : 'RESUME'}
          </button>
        )}
      </div>
    </div>
  );
}

