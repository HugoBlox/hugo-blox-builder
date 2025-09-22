// Hugo Blox Search functionality
// Initialize search wrapper element globally
let searchWrapper = null;

window.addEventListener("DOMContentLoaded", () => {
  const configScript = document.getElementById("search-config");
  if (!configScript) {
    // No search on this page.
    return;
  }

  const searchConfig = JSON.parse(configScript.textContent);
  if (!searchConfig || typeof searchConfig.baseUrl === "undefined") {
    console.error("Pagefind search config is missing or invalid.", searchConfig);
    return;
  }

  try {
    new PagefindUI({
      element: "#search",
      showSubResults: true,
      baseUrl: searchConfig.baseUrl,
      bundlePath: searchConfig.baseUrl + "pagefind/",
    });
  } catch (e) {
    console.error("Failed to initialize PagefindUI:", e);
    return;
  }

  // Get search wrapper element
  searchWrapper = document.getElementById("search-wrapper");

  // Add click handlers to triggers
  let triggers = document.querySelectorAll("[data-search-toggle]");
  triggers.forEach((trigger) => trigger.addEventListener("click", handleSearchToggle));
});

function handleSearchToggle() {
  if (!searchWrapper) return;

  const isHidden = searchWrapper.classList.contains("hidden");
  searchWrapper.classList.toggle("hidden");
  document.body.style.overflow = isHidden ? "hidden" : "";

  const searchInput = searchWrapper.querySelector("input");
  if (searchInput) {
    searchInput.value = "";
    searchInput.focus();
  }

  if (!searchWrapper.classList.contains("hidden")) {
    let clearTrigger = document.querySelector(".pagefind-ui__search-clear");

    if (clearTrigger && !clearTrigger.hasAttribute("listenerOnClick")) {
      clearTrigger.setAttribute("listenerOnClick", "true");

      clearTrigger.addEventListener("click", () => {
        searchInput.focus();
      });
    }
  }
}

// Add keyboard shortcut to close search modal with Escape key
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && searchWrapper && !searchWrapper.classList.contains("hidden")) {
    searchWrapper.classList.add("hidden");
  }
});
