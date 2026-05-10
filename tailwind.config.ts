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
         nx: {
        bg: "#1a1714",
        surface: "#201d1a",
        surface2: "#2a2622",
        text: "#f0ece3",
        muted: "#9a9086",
        amber: "#c97d2e",
        amberLight: "#e09548",
        border: "rgba(240,236,227,0.08)",
      },
      fontFamily: {
      display: ["Playfair Display", "serif"],
      mono: ["DM Mono", "monospace"],
      sans: ["Geist", "sans-serif"],
    },
        background: "#0a0a0a",
        ink: '#0a0a0a',
      paper: '#f5f2ed',
      muted: '#6b6560',
      },
    },
  },
  plugins: [],
};
