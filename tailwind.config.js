/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sahel: ['Sahel', 'sans-serif'],
        number: ['number', 'sans-serif'],
      },
      colors: {
        custom: {
          50: '#ece6e6',
          75: '#e7e2e1',
          100: '#eee1de',
          200: '#dccace',
          300: '#c89cab',
          400: '#beafb2',
          500: '#a8999c',
        },
      },
    },
  },
  plugins: [],
};
