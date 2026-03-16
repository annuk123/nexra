// // tailwind.config.js
// export default {
//   theme: {
//     extend: {
//       spacing: {
//         9: "96px",
//         10: "128px",
//       },
//       colors: {
//         background: "#0a0a0a",
//       },
//     },
//   },
// }


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        9: "96px",
        10: "128px",
      },
      colors: {
        background: "#0a0a0a",
        ink: '#0a0a0a',
      paper: '#f5f2ed',
      muted: '#6b6560',
      },
    },
  },
  plugins: [],
};
