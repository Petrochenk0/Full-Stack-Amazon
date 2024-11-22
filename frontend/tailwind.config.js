/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        amazonColors: {
          background: '#EAEDED',
          DEFAULT: '#131921',
          light_blue: '#232F3A',
          yellows: '#FEBD69',
        },
      },
    },
  },
  plugins: [],
};
