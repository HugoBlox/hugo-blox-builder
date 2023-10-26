const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./hugo_stats.json', './layouts/**/*.html'],
  plugins: [
    require('@tailwindcss/typography'),
  ],
  safelist: [
    'task-list',
  ],
  darkMode: ['class'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Inter var"', ...defaultTheme.fontFamily.sans],
      },
    }
  }
}
