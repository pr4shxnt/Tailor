/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enables dark mode using class
  content: [
    "./index.html", 
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        tertiary: 'var(--tertiary-color)',
        'secondary-tertiary': 'var(--secondary-tertiary-color)',
        'second-primary': 'var(--second-primary-color)',
        'second-secondary': 'var(--second-secondary-color)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 1s ease-out forwards',
        'fade-left-right': 'fadeLtoR 1s ease-out forwards',
        'fade-up-down': 'fadeUpDown 0.6s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeLtoR: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeUpDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      // Adds custom animation delay utilities
      const animationDelays = {};
      for (let i = 0; i <= 1000; i += 100) {
        animationDelays[`.animation-delay-${i}`] = {
          'animation-delay': `${i}ms`,
        };
      }
      addUtilities(animationDelays);
    },
  ],
};
