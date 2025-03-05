module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"], 
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'), // line-clamp 플러그인 추가
  ],
};