const plugin = require('tailwindcss/plugin');
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      ...colors,
      'primary-gray': '#dddddd',
      'primary-red': '#DA4E3D',
      'primary-blue': '#4F85ED',
      'primary-green': '#57A85C',
      'primary-yellow': '#F2C043',
    },
    extend: {
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'pulse-weak': 'pulseWeak 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        light: 'light 1s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        pulseWeak: {
          '0%, 100%': { opacity: 0 },
          '50%': { opacity: 0.1 },
        },
        light: {
          '0%, 100%': { opacity: 0 },
          '50%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        '.D-input': {},
        '.D-input-default': {},
        '.D-input-error': {},
        '.D-btn': {},
        '.D-btn-disabled': {},
      });
    }),
  ],
};
