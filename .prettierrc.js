module.exports = {
  bracketSpacing: false,
  singleQuote: false,
  jsxBracketSameLine: true,
  trailingComma: "all",
  printWidth: 150,
  overrides: [
    {
      files: ["*.html"],
      options: {
        parser: "go-template",
      },
    },
    {
      files: ["*.md"],
      options: {
        proseWrap: "preserve",
      },
    },
  ],
};
