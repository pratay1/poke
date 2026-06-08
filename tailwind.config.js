/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'near-black': '#0a0a0a',
        'gunpowder': '#1a1a1a',
        'dark-ash': '#262626',
      },
    },
  },
  plugins: [],
}