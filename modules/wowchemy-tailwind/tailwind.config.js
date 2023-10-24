module.exports = {
  content: ['./hugo_stats.json', './layouts/**/*.html'],
  plugins: [
    require('@tailwindcss/typography'),
  ],
  safelist: [
    'task-list',
  ],
  darkMode: ['class']
}
