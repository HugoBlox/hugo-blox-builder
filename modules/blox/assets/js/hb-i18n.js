window.addEventListener("DOMContentLoaded", () => {
  // Toggle language chooser sub-menu
  const languageChoosers = document.querySelectorAll("[data-hb-language-chooser]");
  languageChoosers.forEach((languageChooser) => {
    languageChooser.addEventListener("click", (e) => {
      e.preventDefault();
      languageChooser.dataset.state = languageChooser.dataset.state === "open" ? "closed" : "open";
      const languageOptions = languageChooser.nextElementSibling;
      languageOptions.classList.toggle("hidden");
      const languageChooserRect = languageChooser.getBoundingClientRect();
      const translateY = languageChooserRect.bottom - window.innerHeight + 40;
      languageOptions.style.transform = `translate3d(${languageChooserRect.left}px, ${translateY}px, 0)`;
      languageOptions.style.minWidth = `${Math.max(languageChooserRect.width, 50)}px`;
    });
  });

  // Handle clicks outside chooser
  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-hb-language-chooser]") === null) {
      languageChoosers.forEach((languageChooser) => {
        languageChooser.dataset.state = "closed";
        const languageOptions = languageChooser.nextElementSibling;
        languageOptions.classList.add("hidden");
      });
    }
  });
});
