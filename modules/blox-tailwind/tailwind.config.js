const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./hugo_stats.json', './layouts/**/*.html'],
  plugins: [
    require('@tailwindcss/typography'),
  ],
  safelist: [
    'task-list', /* As it's added via JS */
  ],
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        neutral: {
          DEFAULT: "rgba(var(--color-neutral), <alpha-value>)",
          50: "rgba(var(--color-neutral-50), <alpha-value>)",
          100: "rgba(var(--color-neutral-100), <alpha-value>)",
          200: "rgba(var(--color-neutral-200), <alpha-value>)",
          300: "rgba(var(--color-neutral-300), <alpha-value>)",
          400: "rgba(var(--color-neutral-400), <alpha-value>)",
          500: "rgba(var(--color-neutral-500), <alpha-value>)",
          600: "rgba(var(--color-neutral-600), <alpha-value>)",
          700: "rgba(var(--color-neutral-700), <alpha-value>)",
          800: "rgba(var(--color-neutral-800), <alpha-value>)",
          900: "rgba(var(--color-neutral-900), <alpha-value>)",
        },
        primary: {
          50: "rgba(var(--color-primary-50), <alpha-value>)",
          100: "rgba(var(--color-primary-100), <alpha-value>)",
          200: "rgba(var(--color-primary-200), <alpha-value>)",
          300: "rgba(var(--color-primary-300), <alpha-value>)",
          400: "rgba(var(--color-primary-400), <alpha-value>)",
          500: "rgba(var(--color-primary-500), <alpha-value>)",
          600: "rgba(var(--color-primary-600), <alpha-value>)",
          700: "rgba(var(--color-primary-700), <alpha-value>)",
          800: "rgba(var(--color-primary-800), <alpha-value>)",
          900: "rgba(var(--color-primary-900), <alpha-value>)",
        },
        secondary: {
          50: "rgba(var(--color-secondary-50), <alpha-value>)",
          100: "rgba(var(--color-secondary-100), <alpha-value>)",
          200: "rgba(var(--color-secondary-200), <alpha-value>)",
          300: "rgba(var(--color-secondary-300), <alpha-value>)",
          400: "rgba(var(--color-secondary-400), <alpha-value>)",
          500: "rgba(var(--color-secondary-500), <alpha-value>)",
          600: "rgba(var(--color-secondary-600), <alpha-value>)",
          700: "rgba(var(--color-secondary-700), <alpha-value>)",
          800: "rgba(var(--color-secondary-800), <alpha-value>)",
          900: "rgba(var(--color-secondary-900), <alpha-value>)",
        },
      },
      fontFamily: {
        'sans': ['"Inter var"', ...defaultTheme.fontFamily.sans],
      },
    }
  }
}
