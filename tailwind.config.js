// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      transformStyle: {
        'preserve-3d': 'preserve-3d',
      },
      
      translate: {
        'z-n100': '-100px',
        'z-n50': '-50px',
        'z-50': '50px',
        'z-100': '100px',
        'z-150': '150px',
      },
      scale: {
        '120': '1.2',
        '110': '1.1',
        '90': '0.9',
        '80': '0.8',
      }
    },
  },
  plugins: [],
}