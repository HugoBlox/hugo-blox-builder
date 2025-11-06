// Hugo Blox JS Global Init (CSP-friendly)
export function initTheme() {
  const root = document.documentElement;
  const defaultTheme = root.dataset.wcThemeDefault;
  const setDark = () => {
    root.classList.add("dark");
    root.style.colorScheme = "dark";
  };
  const setLight = () => {
    root.classList.remove("dark");
    root.style.colorScheme = "light";
  };

  if ("wc-color-theme" in localStorage) {
    localStorage.getItem("wc-color-theme") === "dark" ? setDark() : setLight();
  } else {
    if (defaultTheme === "dark") setDark();
    else if (defaultTheme === "light") setLight();
    else if (defaultTheme === "system") {
      window.matchMedia("(prefers-color-scheme: dark)").matches ? setDark() : setLight();
    }
  }
}

export function applyHugoStyleFixes() {
  document.addEventListener("DOMContentLoaded", () => {
    const checkboxes = document.querySelectorAll("li input[type='checkbox'][disabled]");
    checkboxes.forEach((e) => {
      const parent = e.parentElement?.parentElement;
      if (parent) parent.classList.add("task-list");
    });

    const liNodes = document.querySelectorAll(".task-list li");
    liNodes.forEach((nodes) => {
      const textNodes = Array.from(nodes.childNodes).filter((node) => node.nodeType === 3 && node.textContent && node.textContent.trim().length > 1);
      if (textNodes.length > 0) {
        const span = document.createElement("label");
        textNodes[0].after(span);
        const input = nodes.querySelector("input[type='checkbox']");
        if (input) span.appendChild(input);
        span.appendChild(textNodes[0]);
      }
    });
  });
}
