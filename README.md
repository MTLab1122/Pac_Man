# Pac-Man Game

A classic Pac-Man game built with Next.js, TypeScript, and Tailwind CSS. This is a fully functional recreation of the classic arcade game with modern web technologies.

## Features

- 🎮 **Classic Pac-Man Gameplay** - Authentic maze navigation and gameplay mechanics
- 👻 **Four Intelligent Ghosts** - Each ghost has unique AI behavior patterns
  - Red Ghost: Aggressive chaser
  - Pink Ghost: Strategic ambusher
  - Cyan Ghost: Random patterns
  - Orange Ghost: Defensive positioning
- ⚡ **Power Pellets** - Make ghosts vulnerable for a limited time
- 🎯 **Score System** - Points for pellets (10), power pellets (50), and ghosts (200)
- ❤️ **Lives System** - Start with 3 lives, lose one when caught by a ghost
- 🎨 **Beautiful UI** - Modern design with smooth animations and glowing effects
- 📱 **Responsive Design** - Works on desktop and mobile devices
- ⏸️ **Pause Feature** - Pause and resume gameplay anytime
- 🏆 **Level Progression** - Complete levels by collecting all pellets

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install the dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to play the game.

### Building for Production

```bash
npm run build
npm start
```

## Controls

- **Arrow Keys** or **WASD** - Move Pac-Man
- **Space** or **P** - Pause/Resume game
- **Any Key** - Start the game from the start screen

## Game Rules

1. **Objective**: Collect all pellets (small dots) and power pellets (large dots) to complete the level
2. **Ghosts**: Avoid ghosts in their normal state - they will cost you a life if they catch you
3. **Power Pellets**: When you eat a power pellet, ghosts turn blue and become vulnerable for 6 seconds
4. **Eating Ghosts**: Eat vulnerable ghosts for 200 points each
5. **Lives**: You start with 3 lives. Lose all lives and it's game over
6. **Scoring**:
   - Small pellet: 10 points
   - Power pellet: 50 points
   - Ghost (when vulnerable): 200 points
7. **Levels**: Complete a level by collecting all pellets, then advance to the next level

## Game Mechanics

- **Tunnel System**: The maze has tunnels on the sides that wrap around
- **Ghost AI**: 
  - Ghosts in chase mode try to intercept Pac-Man
  - Ghosts in scared mode try to flee from Pac-Man
  - Ghosts return home after being eaten
- **Smooth Movement**: Direction changes are queued for smooth gameplay
- **Collision Detection**: Precise pixel-perfect collision detection

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React Hooks** - Custom hooks for game state management
- **SVG Graphics** - Scalable vector graphics for game elements

## Project Structure

```
├── app/
│   ├── page.tsx          # Main game page component
│   ├── layout.tsx         # Root layout with metadata
│   └── globals.css        # Global styles and Tailwind imports
├── components/
│   ├── PacMan.tsx         # Pac-Man character component
│   ├── Ghost.tsx          # Ghost character component
│   └── Maze.tsx           # Maze rendering component
├── hooks/
│   └── useGame.ts         # Main game logic hook
├── types/
│   └── game.ts            # TypeScript type definitions
├── utils/
│   └── maze.ts            # Maze layout and utility functions
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── README.md              # This file
```

## Customization

### Adjusting Game Speed

Edit `GAME_SPEED` in `hooks/useGame.ts`:
```typescript
const GAME_SPEED = 150; // milliseconds (lower = faster)
```

### Changing Power Mode Duration

Edit `POWER_MODE_DURATION` in `hooks/useGame.ts`:
```typescript
const POWER_MODE_DURATION = 6000; // milliseconds
```

### Modifying Colors

Edit `tailwind.config.js` to customize the color scheme:
```javascript
colors: {
  'pacman-yellow': '#FFD700',
  'ghost-red': '#FF0000',
  // ... etc
}
```

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Optimized rendering with React hooks
- Efficient collision detection
- Smooth 60fps animations
- Minimal re-renders

## Future Enhancements

Potential features to add:
- Sound effects and background music
- High score leaderboard (localStorage)
- Different difficulty levels
- Mobile touch controls
- Multiplayer mode
- Custom mazes

## License

This project is created for educational purposes. Feel free to use it as a learning resource or as a base for your own projects.

## Credits

Inspired by the classic Pac-Man arcade game by Namco (1980).

## Contributing

This is a university project, but suggestions and improvements are welcome!

---

**Enjoy playing! 🎮**

