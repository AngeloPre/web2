/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      white: '#ffffff',
      black: '#000000',
      transparent: 'transparent',
      current: 'currentColor',
      'brand-dark': '#EB0A00',
      'brand-base': '#EB3300',
      'brand-light': '#EB5C00',
      'figma-gray-600': '#151619',
      'figma-gray-500': '#1E2024',
      'figma-gray-400': '#535964',
      'figma-gray-300': '#858B99',
      'figma-gray-200': '#E3E5E8',
      'figma-gray-100': '#F9FAFA',
      'feedback-danger': '#D03E3E',
      'feedback-open': '#CC3D6A',
      'feedback-progress': '#355EC5',
      'feedback-done': '#508B26',
    },
    fontFamily: {
      sans: ["Lato", 'system-ui', 'sans-serif'],
      lato: ['Lato', 'system-ui', 'sans-serif'],
      spartan: ['"League Spartan"', 'system-ui', 'sans-serif'],
      cinzel: ['Cinzel', 'serif'],
      orbitron: ['Orbitron', 'serif']
    },
  },
  plugins: [],
}
