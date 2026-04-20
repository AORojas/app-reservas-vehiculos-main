/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f4f7ff",
          100: "#e8efff",
          200: "#c9d8ff",
          300: "#9eb6ff",
          400: "#728cff",
          500: "#4d63ff",
          600: "#3947f5",
          700: "#2d37d9",
          800: "#2832af",
          900: "#262f8a"
        }
      },
      boxShadow: {
        glow: "0 20px 60px rgba(77, 99, 255, 0.25)"
      }
    }
  },
  plugins: []
};

