'use strict';

module.exports = {
  bracketSpacing: false,
  singleQuote: true,
  jsxBracketSameLine: true,
  trailingComma: 'all',
  printWidth: 120,
  overrides: [
    {
      files: ['*.html'],
      options: {
        parser: 'go-template',
      },
    },
  ],
};
