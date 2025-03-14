/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{htm,js}"],
  theme: {
    extend: {
      screens : { 
        hl: "480px",
        sm : "540px",
        zl: "640px",
        ch: "700px",
        bl : "768px",
        md : "1000px",
        sl: "1024px",
        lg : "1280px",    
      }
    },
  },
  plugins: [],
}
