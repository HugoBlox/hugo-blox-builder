document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll("[data-hb-sidebar-toggle]");
  buttons.forEach(function (button) {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const parent = button.parentElement.parentElement;
      if (parent) {
        parent.classList.toggle("open")
      }
    });
  });
});

// Hamburger menu for mobile navigation
document.addEventListener('DOMContentLoaded', function () {
  const menu = document.querySelector('#nav-toggle');
  const overlay = document.querySelector('.hb-sidebar-mobile-menu');
  const sidebarContainer = document.querySelector('.hb-sidebar-container');

  if (!overlay){
    return;
  }

  // Initialize the overlay
  const overlayClasses = ['fixed', 'z-10', 'inset-0', 'bg-white', 'dark:bg-black/80'];
  overlay.classList.add('bg-transparent');
  overlay.classList.remove("hidden", ...overlayClasses);

  function toggleMenu() {
    // Toggle the hamburger menu
    // See `hb-nav.js` - it handles the default behavior (irrespective of if sidebar is shown).

    // When menu is open, show the navigation sidebar
    sidebarContainer.classList.toggle('max-lg:[transform:translate3d(0,-100%,0)]');
    sidebarContainer.classList.toggle('max-lg:[transform:translate3d(0,0,0)]');

    // When menu is open, prevent body from scrolling
    document.body.classList.toggle('overflow-hidden');
    document.body.classList.toggle('lg:overflow-auto');
  }

  menu.addEventListener('click', (e) => {
  console.debug("Hamburger clicked.");
    e.preventDefault();
    toggleMenu();

    if (overlay.classList.contains('bg-transparent')) {
      // Show overlay
      overlay.classList.add(...overlayClasses);
      overlay.classList.remove('bg-transparent');
    } else {
      // Hide overlay
      overlay.classList.remove(...overlayClasses);
      overlay.classList.add('bg-transparent');
    }
  });

  overlay.addEventListener('click', (e) => {
    e.preventDefault();
    toggleMenu();

    // Hide overlay
    overlay.classList.remove(...overlayClasses);
    overlay.classList.add('bg-transparent');
  });
});
