/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./component/**/*.{js,ts,jsx,tsx,mdx}", // Ensures your Dashboard and Sidebar are styled [cite: 58, 59]
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F5F5DC", // Adds the theme color from your Figma designs
      },
    },
  },
  plugins: [],
}