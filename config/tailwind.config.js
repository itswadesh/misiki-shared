module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js',
      // TypeScript
      'plugins/**/*.ts',
      'nuxt.config.ts',
      // Shared components
      'shared/components/**/*.vue',
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          200: '#FBA940', //light yellow
          500: '#FC6641', //orange
        },
        secondary: {
          100: '#dff7d5', //very light green
          200: '#32CD32', //green
          400: '#78f547', //light green
          500: '#32AFC8;', //blue
        },
        accent: {
          100: '#faebeb', //very light red
          500: '#ff8c00', //light-orange
          600: '#C53193;', //pink
          700: '#ff4500', //orange
          800: '#c30b4e', //dark-pink
          900: '#FF461B;', //red
        },
      },
      fontFamily: {
        sans: ['sofia-pro'],
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ],
}
