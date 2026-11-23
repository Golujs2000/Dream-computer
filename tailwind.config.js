/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0A101E',
          secondary: '#121826',
          card: '#191F2D',
          outer: '#373B46',
        },
        accent: {
          DEFAULT: '#BEF8A1',
          hover: '#C3FFA5',
          glow: 'rgba(190, 248, 161, 0.25)',
        },
        text: {
          primary: '#F5F5F7',
          secondary: '#B7BBC5',
          muted: '#8B929E',
        },
        border: {
          DEFAULT: '#303746',
          light: '#3F485C',
        }
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        rajdhani: ['Rajdhani', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-accent': '0 0 20px -3px rgba(190, 248, 161, 0.35)',
        'glow-card': '0 8px 30px rgba(0, 0, 0, 0.45)',
        'glow-subtle': '0 0 15px rgba(190, 248, 161, 0.15)',
      }
    },
  },
  plugins: [],
}
