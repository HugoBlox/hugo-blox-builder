/**
 * Hugo Blox Animations
 * Typewriter effect and scroll-triggered animations using Alpine.js
 */

document.addEventListener("alpine:init", () => {
  // Typewriter effect component
  Alpine.data("typewriter", (strings = [], options = {}) => ({
    strings: strings,
    currentIndex: 0,
    currentText: "",
    isDeleting: false,
    typeSpeed: options.typeSpeed || 80,
    deleteSpeed: options.deleteSpeed || 50,
    pauseTime: options.pauseTime || 2000,
    loop: options.loop !== false,
    showCursor: options.cursor !== false,

    init() {
      if (this.strings.length === 0) return;
      this.type();
    },

    type() {
      const current = this.strings[this.currentIndex];

      if (this.isDeleting) {
        this.currentText = current.substring(0, this.currentText.length - 1);
      } else {
        this.currentText = current.substring(0, this.currentText.length + 1);
      }

      let delay = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

      if (!this.isDeleting && this.currentText === current) {
        // Finished typing, pause then delete
        delay = this.pauseTime;
        this.isDeleting = true;
      } else if (this.isDeleting && this.currentText === "") {
        // Finished deleting, move to next string
        this.isDeleting = false;
        this.currentIndex = (this.currentIndex + 1) % this.strings.length;

        if (!this.loop && this.currentIndex === 0) {
          // Don't loop, show first string permanently
          this.currentText = this.strings[0];
          return;
        }
        delay = 500; // Pause before typing next
      }

      setTimeout(() => this.type(), delay);
    },
  }));

  // Scroll reveal directive
  Alpine.directive("reveal", (el, {expression, modifiers}, {evaluate}) => {
    const options = expression ? evaluate(expression) : {};
    const delay = options.delay || 0;
    const duration = options.duration || 600;
    const distance = options.distance || "20px";
    const direction = modifiers.includes("left") ? "left" : modifiers.includes("right") ? "right" : modifiers.includes("down") ? "down" : "up";

    // Set initial state
    el.style.opacity = "0";
    el.style.transition = `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`;
    el.style.transitionDelay = `${delay}ms`;

    const transforms = {
      up: `translateY(${distance})`,
      down: `translateY(-${distance})`,
      left: `translateX(${distance})`,
      right: `translateX(-${distance})`,
    };
    el.style.transform = transforms[direction];

    // Observe intersection
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.opacity = "1";
            el.style.transform = "translate(0, 0)";
            observer.unobserve(el);
          }
        });
      },
      {threshold: 0.1, rootMargin: "0px 0px -50px 0px"},
    );

    observer.observe(el);
  });
});

// Staggered reveal for groups of elements
document.addEventListener("DOMContentLoaded", () => {
  // Add stagger delays to elements with data-stagger attribute
  document.querySelectorAll("[data-stagger]").forEach((container) => {
    const children = container.querySelectorAll("[data-stagger-item]");
    const baseDelay = parseInt(container.dataset.stagger, 10) || 100;

    children.forEach((child, index) => {
      child.style.transitionDelay = `${index * baseDelay}ms`;
    });
  });
});

// Respect reduced motion preference
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.documentElement.classList.add("reduce-motion");
}
