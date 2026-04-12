/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0D1117",
        card: "#111827",
        primary: "#38bdf8", // accent-cyan
        secondary: "#818cf8", // accent-purple
        foreground: "#f0f6fc", // main text
        muted: "#8b949e", // muted text
        border: "rgba(255, 255, 255, 0.07)",
        "border-active": "rgba(56, 189, 248, 0.5)",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Or Poppins as stated, using Inter for clean look
      },
      boxShadow: {
        'glow-primary': '0 4px 24px rgba(56, 189, 248, 0.25)',
        'glow-primary-hover': '0 8px 32px rgba(56, 189, 248, 0.35)',
        'card-hover': '0 12px 40px rgba(0,0,0,0.3)',
      }
    },
  },
  plugins: [],
}
