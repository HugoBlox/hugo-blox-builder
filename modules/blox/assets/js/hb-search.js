// Hugo Blox Search - Custom Pagefind API Implementation
// Search is handled by Alpine.js component in search-modal.html

// Additional keyboard shortcuts and utilities
document.addEventListener("DOMContentLoaded", () => {
  console.log("✓ Hugo Blox Search initialized (Pagefind Headless API)");

  // Handle search toggle buttons
  const searchButtons = document.querySelectorAll("[data-search-toggle]");
  searchButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const prefilledQuery = button.dataset.searchQuery;

      if (window.Alpine && Alpine.store("search")) {
        Alpine.store("search").open = true;

        // Pre-fill query if specified
        if (prefilledQuery) {
          setTimeout(() => {
            const searchInput = document.querySelector('[x-ref="searchInput"]');
            if (searchInput) {
              searchInput.value = prefilledQuery;
              searchInput.dispatchEvent(new Event("input"));
            }
          }, 100);
        }
      }
    });
  });

  // Note: Keyboard navigation (arrow keys, Enter) is handled by Alpine.js in search-modal.html
});
