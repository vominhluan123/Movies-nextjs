/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        primarylight: "#ffffff",
        primarydark: "#121212",
        btlight: "#ff8c00",
        btdark: "#ff5722",
        primarydarkcard: "#1f2937",
        primarylightcard: " #c9e6f7",
        tooglelight: "#b5e8c9",
        toogledark: "#334155",
      },
      borderColor: {
        active: "#ff3366",
      },
      textColor: {
        active: "#ff3366",
        textlight: "#000",
        textdark: "#fff",
      },
    },
  },
  plugins: [],
};
