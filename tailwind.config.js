export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'fade-in-up': 'fadeInUp 1s ease-out forwards',
        'fade-left-right' : 'fadeLtoR 1s ease-out forwards',
        'fade-up-down' : 'fadeupDown 0.6s ease-out forwards'
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0px)' },
        },
        fadeLtoR: {
          '0%' : {opactiy: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0px)' },
        },
        fadeupDown:{
          '0%' : {opactiy: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0px)' },
        }
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.animation-delay-0': { 'animation-delay': '0' },
        '.animation-delay-100': { 'animation-delay': '100ms' },
        '.animation-delay-200': { 'animation-delay': '200ms' },
        '.animation-delay-300': { 'animation-delay': '300ms' },
        '.animation-delay-400': { 'animation-delay': '400ms' },
        '.animation-delay-500': { 'animation-delay': '500ms' },
        '.animation-delay-600': { 'animation-delay': '600ms' },
        '.animation-delay-700': { 'animation-delay': '700ms' },
        '.animation-delay-800': { 'animation-delay': '800ms' },
        '.animation-delay-900': { 'animation-delay': '900ms' },
        '.animation-delay-1000': { 'animation-delay': '1000ms' },
        
      });
    },
  ],
};
