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
        primary: {
          DEFAULT: '#f70000',
          dark: '#c10000',
        },
        dark: {
          DEFAULT: '#1a1a1a',
          lighter: '#2a2a2a',
        },
      },
    },
  },
  plugins: [],
};
