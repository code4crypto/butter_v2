/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        butter: {
          50: '#FFF9E6',
          100: '#FFF3CC',
          200: '#FFE799',
          300: '#FFDB66',
          400: '#E8C547',
          500: '#D4B03D',
          600: '#B89534',
          700: '#9C7A2B',
          800: '#806022',
          900: '#644619',
        },
        brown: {
          50: '#F5F3F0',
          100: '#E8E4DD',
          200: '#D1C9BB',
          300: '#BAAE99',
          400: '#A39377',
          500: '#8C7855',
          600: '#6B5D44',
          700: '#524533',
          800: '#3A3530',
          900: '#2B2520',
        },
      },
    },
  },
  plugins: [],
};
