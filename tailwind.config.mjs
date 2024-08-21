/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./components/**/*.{js,vue,ts}", "./pages/**/*.vue", "./app.vue", "./error.vue"],
  theme: {
    fontFamily: {
      display: ["Lacquer", "serif"],
      mono: ['"Ubuntu Mono"', "monospace"],
    },
    extend: {
      colors: {
        "notif-black": "#0f111a",
        "notif-white": "#ffffff",
        "notif-scanned": "#38bdf8",
        "notif-release": "#fc814a",
        "notif-spawn": "#f0047f",
        "notif-move": "#0e0016",
        "notif-gift": "#fc814a",
        "notif-cook": "#a3e635",
        "notif-cookfail": "#dc2626",
        "notif-drop": "#fc814a",
        "notif-claim": "#ffffff",
      },
    },
  },
  plugins: [],
};
