/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark': '#1a1a1aff',
        'light': '#e0e0e0ff',
        'primary': '#202020ff',
      },
      
      fontFamily: {
        'ubuntu': ['Ubuntu', 'sans-serif'],
      },
    },
    plugins: [],
  }
}

