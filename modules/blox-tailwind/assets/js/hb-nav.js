// Navigation

const applyScrollPadding = () => {
  const header = document.querySelector('.page-header');
  let position = header.getBoundingClientRect();
  document.documentElement.style.scrollPaddingTop = position.height.toString() + 'px';
};

window.addEventListener("DOMContentLoaded", () => {
  const dropdownMenus = document.querySelectorAll(
    ".nav-dropdown > .nav-link",
  );

  dropdownMenus.forEach((toggler) => {
    toggler?.addEventListener("click", (e) => {
      e.target.parentElement.classList.toggle("active");
    });
  });

  applyScrollPadding()
});
