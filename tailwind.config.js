/** @type {import('tailwindcss').Config} */
const c = (name) => `rgb(var(--${name}) / <alpha-value>)`;

module.exports = {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: c("bg"),
        panel: c("panel"),
        line: c("line"),
        fg: c("fg"),
        muted: c("muted"),
        accent: c("accent"),
        ok: c("ok"),
        violet: c("violet"),
        amber: c("amber"),
      },
      fontFamily: {
        sans: ['"Segoe UI"', "-apple-system", "BlinkMacSystemFont", "Inter", "Roboto", "Helvetica", "Arial", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },
      keyframes: {
        blink: { "0%,49%": { opacity: 1 }, "50%,100%": { opacity: 0 } },
        pulseDot: { "0%,100%": { opacity: 1 }, "50%": { opacity: 0.35 } },
      },
      animation: {
        blink: "blink 1s steps(1) infinite",
        pulseDot: "pulseDot 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
