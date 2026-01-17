/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./app/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
            bruno: ['"Bruno Ace SC"', 'sans-serif'],
            jura: ['Jura', 'sans-serif'],
        },
      },
    },
    plugins: [],
  };
  