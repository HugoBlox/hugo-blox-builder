import 'dotenv/config'
const defaultTheme = require('tailwindcss/defaultTheme')

const content_extra = process.env.HB_TW_CONTENT ? process.env.HB_TW_CONTENT.split(', ') : '';

console.log('Current directory: ' + process.cwd());
console.log(`content_extra: ${content_extra}`);
// console.log('../../starters/'+process.env.HB_TPL+'/hugo_stats.json')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // './hugo_stats.json',
    './layouts/**/*.html',
    '**/libs/chroma/*.css',
    './**/*.svg',
    '../../starters/**/*.md',
    ...content_extra,
    // ...(process.env.HB_TPL ? '../../starters/'+process.env.HB_TPL+'/hugo_stats.json' : './hugo_stats.json'),
  ],
  plugins: [
    require('@tailwindcss/typography'),
  ],
  safelist: [
    'task-list',   /* As it's added via JS */
    'pl-4', 'pl-8', 'pl-12',   /* TOC indents */
    'min-h-screen', /* Blox options */
    {
      /* For dynamic article-grid.start */
      pattern: /grid-cols-+/,
      variants: ['md'],
    },
    {
      pattern: /bg-white+/,
    },
    {
      pattern: /bg-gray+/,
    },
    {
      pattern: /bg-primary+/,
    },
    {
      pattern: /bg-gradient+/,
    },
    {
      pattern: /from-primary+/,
    },
    {
      pattern: /to-primary+/,
    },
  ],
    /* /^bg-white/, /^bg-gray-/, /^bg-primary-/, /^bg-gradient-/, /^from-primary-/, /^to-primary-/,
  /^md:grid-cols-+/], */
  /* /^pl-/ for TOC */
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        'hb-dark': 'rgb(23, 24, 28)',
        neutral: {
          DEFAULT: "rgb(var(--color-neutral) / <alpha-value>)",
          50: "rgb(var(--color-neutral-50) / <alpha-value>)",
          100: "rgb(var(--color-neutral-100) / <alpha-value>)",
          200: "rgb(var(--color-neutral-200) / <alpha-value>)",
          300: "rgb(var(--color-neutral-300) / <alpha-value>)",
          400: "rgb(var(--color-neutral-400) / <alpha-value>)",
          500: "rgb(var(--color-neutral-500) / <alpha-value>)",
          600: "rgb(var(--color-neutral-600) / <alpha-value>)",
          700: "rgb(var(--color-neutral-700) / <alpha-value>)",
          800: "rgb(var(--color-neutral-800) / <alpha-value>)",
          900: "rgb(var(--color-neutral-900) / <alpha-value>)",
        },
        primary: {
          50: "rgb(var(--color-primary-50) / <alpha-value>)",
          100: "rgb(var(--color-primary-100) / <alpha-value>)",
          200: "rgb(var(--color-primary-200) / <alpha-value>)",
          300: "rgb(var(--color-primary-300) / <alpha-value>)",
          400: "rgb(var(--color-primary-400) / <alpha-value>)",
          500: "rgb(var(--color-primary-500) / <alpha-value>)",
          600: "rgb(var(--color-primary-600) / <alpha-value>)",
          700: "rgb(var(--color-primary-700) / <alpha-value>)",
          800: "rgb(var(--color-primary-800) / <alpha-value>)",
          900: "rgb(var(--color-primary-900) / <alpha-value>)",
        },
        secondary: {
          50: "rgb(var(--color-secondary-50) / <alpha-value>)",
          100: "rgb(var(--color-secondary-100) / <alpha-value>)",
          200: "rgb(var(--color-secondary-200) / <alpha-value>)",
          300: "rgb(var(--color-secondary-300) / <alpha-value>)",
          400: "rgb(var(--color-secondary-400) / <alpha-value>)",
          500: "rgb(var(--color-secondary-500) / <alpha-value>)",
          600: "rgb(var(--color-secondary-600) / <alpha-value>)",
          700: "rgb(var(--color-secondary-700) / <alpha-value>)",
          800: "rgb(var(--color-secondary-800) / <alpha-value>)",
          900: "rgb(var(--color-secondary-900) / <alpha-value>)",
        },
      },
      fontFamily: {
        'sans': ['"Inter var"', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        xs: '.75rem',
        sm: '.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        // '2xl': '1.5rem',
        // '3xl': '1.875rem',
        // '4xl': '2.25rem',
        // '5xl': '3rem',
        // '6xl': '4rem'
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.neutral.700 / 1"),
            "--tw-prose-headings": theme("colors.neutral.800 / 1"),
            "--tw-prose-lead": theme("colors.neutral.500 / 1"),
            "--tw-prose-links": theme("colors.primary.600 / 1"),
            "--tw-prose-bold": theme("colors.neutral.900 / 1"),
            "--tw-prose-counters": theme("colors.neutral.800 / 1"),
            "--tw-prose-bullets": theme("colors.neutral.500 / 1"),
            "--tw-prose-hr": theme("colors.neutral.200 / 1"),
            "--tw-prose-quotes": theme("colors.neutral.700 / 1"),
            "--tw-prose-quote-borders": theme("colors.primary.200 / 1"),
            "--tw-prose-captions": theme("colors.neutral.500 / 1"),
            "--tw-prose-code": theme("colors.secondary.700 / 1"),
            "--tw-prose-pre-code": theme("colors.neutral.700 / 1"),
            "--tw-prose-pre-bg": theme("colors.neutral.50 / 1"),
            "--tw-prose-th-borders": theme("colors.neutral.500 / 1"),
            "--tw-prose-td-borders": theme("colors.neutral.300 / 1"),
            "--tw-prose-invert-body": theme("colors.neutral.300 / 1"),
            "--tw-prose-invert-headings": theme("colors.neutral.50 / 1"),
            "--tw-prose-invert-lead": theme("colors.neutral.500 / 1"),
            "--tw-prose-invert-links": theme("colors.primary.400 / 1"),
            "--tw-prose-invert-bold": theme("colors.neutral.DEFAULT / 1"),
            "--tw-prose-invert-counters": theme("colors.neutral.400 / 1"),
            "--tw-prose-invert-bullets": theme("colors.neutral.600 / 1"),
            "--tw-prose-invert-hr": theme("colors.neutral.500 / 1"),
            "--tw-prose-invert-quotes": theme("colors.neutral.200 / 1"),
            "--tw-prose-invert-quote-borders": theme("colors.primary.900 / 1"),
            "--tw-prose-invert-captions": theme("colors.neutral.400 / 1"),
            "--tw-prose-invert-code": theme("colors.secondary.400 / 1"),
            "--tw-prose-invert-pre-code": theme("colors.neutral.200 / 1"),
            "--tw-prose-invert-pre-bg": theme("colors.neutral.700 / 1"),
            "--tw-prose-invert-th-borders": theme("colors.neutral.500 / 1"),
            "--tw-prose-invert-td-borders": theme("colors.neutral.700 / 1"),
            a: {
              textDecoration: "underline",
              textDecorationColor: theme("colors.primary.300 / 1"),
              fontWeight: "500",
              "&:hover": {
                color: theme("colors.primary.600 / 1"),
                textDecoration: "none",
                borderRadius: "0.09rem",
              },
            },
            mark: {
              color: theme("colors.neutral.100 / 1"),
              backgroundColor: theme("colors.primary.600 / 1"),
              padding: "0.1rem 0.2rem",
              borderRadius: "0.25rem",
            },
          },
        },
        invert: {
          css: {
            a: {
              textDecorationColor: theme("colors.neutral.500 / 1"),
              "&:hover": {
                color: theme("colors.primary.300 / 1"),
              },
            },
            mark: {
              backgroundColor: theme("colors.primary.400 / 1"),
              color: theme("colors.black / 1"),
            },
          },
        },
      }),
    }
  }
}
