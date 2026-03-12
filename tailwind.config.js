/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        fitness: '#ef4444',
        work: '#3b82f6',
        english: '#22c55e',
        side: '#f59e0b',
        ielts: '#a855f7',
      },
    },
  },
  plugins: [],
};