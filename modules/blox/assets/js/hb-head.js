import {applyHugoStyleFixes, initTheme} from "./hb-init.js";

// Initialize Hugo Blox Kit global object
const root = document.documentElement;
const defaultTheme = root.dataset.wcThemeDefault || "system";
const relBase = root.dataset.hbbRelurl || "/";
const normalizedRelBase = relBase.endsWith("/") ? relBase : `${relBase}/`;
const buildAssetPath = (relativePath) => {
  const sanitizedRelative = relativePath.startsWith("/") ? relativePath.slice(1) : relativePath;
  return `${normalizedRelBase}${sanitizedRelative}`;
};

// Create global HBB object with theme functions
window.hbb = {
  defaultTheme: defaultTheme,
  relBase: normalizedRelBase,
  assetPaths: {
    pagefind: buildAssetPath("pagefind/pagefind.js"),
  },
  setDarkTheme: () => {
    root.classList.add("dark");
    root.style.colorScheme = "dark";
  },
  setLightTheme: () => {
    root.classList.remove("dark");
    root.style.colorScheme = "light";
  },
};

initTheme();
applyHugoStyleFixes();
