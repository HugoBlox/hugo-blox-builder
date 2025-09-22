import {applyHugoStyleFixes, initTheme} from "./hb-init.js";

// Initialize Hugo Blox Builder global object
const root = document.documentElement;
const defaultTheme = root.dataset.wcThemeDefault || "system";

// Create global HBB object with theme functions
window.hbb = {
  defaultTheme: defaultTheme,
  setDarkTheme: function () {
    root.classList.add("dark");
    root.style.colorScheme = "dark";
  },
  setLightTheme: function () {
    root.classList.remove("dark");
    root.style.colorScheme = "light";
  },
};

initTheme();
applyHugoStyleFixes();
