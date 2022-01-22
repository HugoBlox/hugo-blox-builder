/* ---------------------------------------------------------------------------
 * Normalize Bootstrap Carousel Slide Heights.
 * --------------------------------------------------------------------------- */

function normalizeCarouselSlideHeights() {
  let carousels = document.querySelectorAll('.carousel');
  carousels.forEach((carousel) => {
    let items = carousel.querySelector('.carousel-item');
    let maxHeight = Math.max.apply(
      null,
      items
        .map(function () {
          return this.outerHeight();
        })
        .get(),
    );
    items.forEach((item) => {
      item.style.minHeight = maxHeight + 'px';
    });
  });
}

window.addEventListener('load', normalizeCarouselSlideHeights);
window.addEventListener('resize', normalizeCarouselSlideHeights);
window.addEventListener('orientationchange', normalizeCarouselSlideHeights);
