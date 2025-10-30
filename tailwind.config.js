
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#0B0B0C',
          fg: '#F4F6F8',
          accent: '#60A5FA'
        }
      },
      boxShadow: {
        card: '0 10px 30px rgba(0,0,0,0.06)',
        focus: '0 0 0 3px rgba(96,165,250,0.45)'
      },
      borderRadius: {
        xl: '14px'
      }
    }
  },
  plugins: []
}
