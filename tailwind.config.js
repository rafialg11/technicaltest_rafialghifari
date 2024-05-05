/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        'gray1': '#F1F5F9',
        'cream': '#FFF5F5',
        'border-cream': '#FBDFDF',
        'white': '#FFFFFF',
        'primary': '#2F2F2F',
        'btn-nav': '#336FF9',
        'status-done': '#05B205'
      }
    },
  },
  plugins: [],
};
