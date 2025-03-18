module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"], 
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ["peer-checked"],  // peer-checked 변형 확장
      borderColor: ["peer-checked"],      // 필요하면 border-color도 확장
      opacity: ["peer-checked"],          // opacity 조정 가능
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'), // line-clamp 플러그인 추가
  ],
};