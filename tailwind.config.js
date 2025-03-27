/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        "second-primary": "var(--second-primary-color)",
        "second-secondary": "var(--second-secondary-color)",
        tertiary: "var(--tertiary-color)",
        "secondary-tertiary": "var(--secondary-tertiary-color)",
      },
      animation: {
        "fade-in-up": "fadeInUp 1s ease-out forwards",
        "fade-left-right": "fadeLtoR 1s ease-out forwards",
        "fade-up-down": "fadeUpDown 0.6s ease-out forwards",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0px)" },
        },
        fadeLtoR: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0px)" },
        },
        fadeUpDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0px)" },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const animationDelays = {};
      for (let i = 0; i <= 1000; i += 100) {
        animationDelays[`.animation-delay-${i}`] = { "animation-delay": `${i}ms` };
      }
      addUtilities(animationDelays);
    },
  ],
};
