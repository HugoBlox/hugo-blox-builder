function getCssVar(name) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value ? `rgb(${value})` : null;
}

window.mermaid.initialize({
  theme: "base",
  themeVariables: {
    background: getCssVar("--color-neutral-50") || "#fafafa",
    primaryColor: getCssVar("--color-primary-200") || "#bfdbfe",
    secondaryColor: getCssVar("--color-secondary-200") || "#a5f3fc",
    tertiaryColor: getCssVar("--color-neutral-100") || "#f5f5f5",
    primaryBorderColor: getCssVar("--color-primary-400") || "#60a5fa",
    secondaryBorderColor: getCssVar("--color-secondary-400") || "#22d3ee",
    tertiaryBorderColor: getCssVar("--color-neutral-400") || "#a3a3a3",
    lineColor: getCssVar("--color-neutral-600") || "#525252",
    fontFamily: getComputedStyle(document.documentElement).getPropertyValue("font-family"),
    fontSize: "16px",
  },
});
