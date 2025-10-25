module.exports = {
  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue,svelte}'],
  theme: {
    extend: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
        '3xl': '1921px',
        '4xl': '2560px',
        '5xl': '3840px',
      },
    },
  },
  plugins: [],
}
