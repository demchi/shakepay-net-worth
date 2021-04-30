module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
      fontFamily: {
          sans: ['Roboto', 'sans-serif'],
          serif: ['Roboto', 'sans-serif']
      },
      extend: {},
  },
  variants: {
      extend: {},
  },
  plugins: [],
}