/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'kiosk-dark': '#06060a',
        'kiosk-card': '#12121c',
        'high-vis-yellow': '#ffea00',
        'high-vis-cyan': '#00f0ff',
      }
    },
  },
  plugins: [],
};
