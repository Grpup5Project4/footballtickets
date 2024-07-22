// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      graduate: ["Graduate", "sans-serif"],
    },
    extend: {},
    backgroundImage: {
      ticketImg: "url('/assets/ticketImg.jpg')",
    },
  },
  plugins: [],
};
