/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'pacman-yellow': '#FFD700',
        'ghost-red': '#FF0000',
        'ghost-pink': '#FFB8FF',
        'ghost-cyan': '#00FFFF',
        'ghost-orange': '#FFB851',
        'maze-blue': '#2121DE',
      },
      animation: {
        'pacman-mouth': 'pacman-mouth 0.3s ease-in-out infinite',
        'ghost-scared': 'ghost-scared 0.5s ease-in-out infinite',
        'pellet-blink': 'pellet-blink 1s ease-in-out infinite',
      },
      keyframes: {
        'pacman-mouth': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(45deg)' },
        },
        'ghost-scared': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'pellet-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
      },
    },
  },
  plugins: [],
}

