// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4f46e5", // Indigo 600
        secondary: "#1e293b", // Slate 800
        accent: "#8b5cf6", // Violet 500
        background: "#f8fafc", // Slate 50
        "task-pending": "#f59e0b", // Amber 500
        "task-progress": "#3b82f6", // Blue 500
        "task-completed": "#10b981", // Emerald 500
      }
    },
  },
  plugins: [],
}