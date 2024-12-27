/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./layouts/**/*.html', './layouts/*.html', './content/**/*.{html,md}'],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none', // Prevents prose from constraining width
            a: {
              color: '#2563eb', // blue-600
              '&:hover': {
                color: '#1d4ed8', // blue-700
              },
            },
            'code::before': {
              content: '""'
            },
            'code::after': {
              content: '""'
            }
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

