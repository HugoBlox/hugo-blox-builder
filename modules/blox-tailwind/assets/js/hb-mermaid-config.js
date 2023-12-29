function getCssVar(name) {
  return "rgb(" + getComputedStyle(document.documentElement).getPropertyValue(name) + ")";
}

window.mermaid.initialize({
  theme: "base",
  themeVariables: {
    background: getCssVar("--color-neutral"),
    primaryColor: getCssVar("--color-primary-200"),
    secondaryColor: getCssVar("--color-secondary-200"),
    tertiaryColor: getCssVar("--color-neutral-100"),
    primaryBorderColor: getCssVar("--color-primary-400"),
    secondaryBorderColor: getCssVar("--color-secondary-400"),
    tertiaryBorderColor: getCssVar("--color-neutral-400"),
    lineColor: getCssVar("--color-neutral-600"),
    fontFamily: getComputedStyle(document.documentElement).getPropertyValue('font-family'),
    fontSize: "16px",
  },
});
