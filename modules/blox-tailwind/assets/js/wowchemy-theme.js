// Hugo Blox Builder Light / Dark theme toggle
document.addEventListener('DOMContentLoaded', function () {
  addThemeToggleListener();
});

function addThemeToggleListener() {
  const defaultTheme = window.hbb.defaultTheme;
  const themeToggleButtons = document.querySelectorAll(".theme-toggle");

  // Change the icons of the buttons based on previous settings or system theme
  if (
    localStorage.getItem("wc-color-theme") === "dark" ||
    (!("wc-color-theme" in localStorage) &&
      ((window.matchMedia("(prefers-color-scheme: dark)").matches && defaultTheme === "system") || defaultTheme === "dark"))
  ) {
    themeToggleButtons.forEach((el) => el.dataset.theme = "dark");
  } else {
    themeToggleButtons.forEach((el) => el.dataset.theme = "light");
  }

  // Add click event handler to the light/dark buttons
  themeToggleButtons.forEach((el) => {
    el.addEventListener("click", function () {
      console.debug('Theme toggled');
      if (localStorage.getItem("wc-color-theme")) {
        if (localStorage.getItem("wc-color-theme") === "light") {
          window.hbb.setDarkTheme();
          localStorage.setItem("wc-color-theme", "dark");
        } else {
          window.hbb.setLightTheme();
          localStorage.setItem("wc-color-theme", "light");
        }
      } else {
        if (document.documentElement.classList.contains("dark")) {
          window.hbb.setLightTheme();
          localStorage.setItem("wc-color-theme", "light");
        } else {
          window.hbb.setDarkTheme();
          localStorage.setItem("wc-color-theme", "dark");
        }
      }
      el.dataset.theme = document.documentElement.classList.contains("dark") ? "dark" : "light";

      // Dispatch `hbThemeChange` event to support themeable user plugins.
      const themeChangeEvent = new CustomEvent('hbThemeChange', {detail: {isDarkTheme: () => document.documentElement.classList.contains("dark")}});
      document.dispatchEvent(themeChangeEvent);
    });
  });

  // Listen for dark mode toggling in OS
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
    if (defaultTheme === "system" && !("wc-color-theme" in localStorage)) {
      event.matches ? window.hbb.setDarkTheme() : window.hbb.setLightTheme();
      themeToggleButtons.forEach((el) =>
        el.dataset.theme = document.documentElement.classList.contains("dark") ? "dark" : "light"
      );
    }
  });
}
