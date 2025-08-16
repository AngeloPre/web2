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
      'brand-dark': '#2E3DA3',
      'brand-base': '#5165E1',
      'brand-light': '#8996EB',
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
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
  },
  plugins: [],
}
