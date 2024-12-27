/** @type {import('tailwindcss').Config} */
const themeDir = __dirname + '/../../';
module.exports = {
  content: ['./layouts/**/*.html', './content/**/*.{html,md}'],
  theme: {
    content: [`${themeDir}/layouts/**/*.html`, `${themeDir}/content/**/*.md`],
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

