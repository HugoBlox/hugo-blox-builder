// Navigation

const applyScrollPadding = () => {
  const header = document.querySelector(".page-header");
  const position = header.getBoundingClientRect();
  document.documentElement.style.scrollPaddingTop = `${position.height.toString()}px`;
  const r = document.querySelector(":root");
  r.style.setProperty("--navbar-height", `${position.height.toString()}px`);
};

window.addEventListener("DOMContentLoaded", () => {
  const dropdownMenus = document.querySelectorAll(".nav-dropdown > .nav-link[role='button']");

  dropdownMenus.forEach((toggler) => {
    const toggle = (el) => {
      const parent = el.closest(".nav-dropdown");
      const willActivate = !parent.classList.contains("active");
      parent.classList.toggle("active", willActivate);
      el.setAttribute("aria-expanded", willActivate ? "true" : "false");
    };

    toggler?.addEventListener("click", (e) => {
      e.preventDefault();
      toggle(e.currentTarget);
    });

    // Keyboard support
    toggler?.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle(e.currentTarget);
      }
      if (e.key === "Escape") {
        const parent = e.currentTarget.closest(".nav-dropdown");
        parent?.classList.remove("active");
        e.currentTarget.setAttribute("aria-expanded", "false");
      }
    });
  });

  applyScrollPadding();
});
