/* ---------------------------------------------------------------------------
 * Responsive scrolling for URL hashes.
 * --------------------------------------------------------------------------- */

// Dynamically get responsive navigation bar height for offsetting Scrollspy.
function getNavBarHeight() {
  let navbar = document.getElementById('navbar-main');
  let navbarHeight = navbar ? navbar.getBoundingClientRect().height : 0;
  console.debug('Navbar height: ' + navbarHeight);
  return navbarHeight;
}

/**
 * Responsive hash scrolling.
 * Check for a URL hash as an anchor.
 * If page anchor matches hash, scroll to it responsively considering dynamic height elements.
 * If `target` argument omitted (e.g. after event), assume it's the window's hash.
 * Default to 0ms animation duration as don't want animation for fixing scrollspy Book page ToC highlighting.
 */
function scrollToAnchor(target, duration = 0) {
  // If `target` is undefined or HashChangeEvent object, set it to window's hash.
  // Decode the hash as browsers can encode non-ASCII characters (e.g. Chinese symbols).
  target =
    typeof target === 'undefined' || typeof target === 'object' ? decodeURIComponent(window.location.hash) : target;

  // If target element exists, scroll to it taking into account fixed navigation bar offset.
  if ($(target).length) {
    // Escape special chars from IDs, such as colons found in Markdown footnote links.
    target = '#' + $.escapeSelector(target.substring(1)); // Previously, `target = target.replace(/:/g, '\\:');`

    let elementOffset = Math.ceil($(target).offset().top - getNavBarHeight()); // Round up to highlight right ID!
    $('body').addClass('scrolling');
    $('html, body').animate(
      {
        scrollTop: elementOffset,
      },
      duration,
      function () {
        $('body').removeClass('scrolling');
      },
    );
  } else {
    console.debug('Cannot scroll to target `#' + target + '`. ID not found!');
  }
}

// Make Scrollspy responsive.
function fixScrollspy() {
  let $body = $('body');
  let data = $body.data('bs.scrollspy');
  if (data) {
    data._config.offset = getNavBarHeight();
    $body.data('bs.scrollspy', data);
    $body.scrollspy('refresh');
  }
}

/* ---------------------------------------------------------------------------
 * Add smooth scrolling to all links inside the main navbar.
 * --------------------------------------------------------------------------- */

$('#navbar-main li.nav-item a.nav-link, .js-scroll').on('click', function (event) {
  // Store requested URL hash.
  let hash = this.hash;

  // If we are on a widget page and the navbar link is to a section on the same page.
  if (this.pathname === window.location.pathname && hash && $(hash).length && $('.js-widget-page').length > 0) {
    // Prevent default click behavior.
    event.preventDefault();

    // Use jQuery's animate() method for smooth page scrolling.
    // The numerical parameter specifies the time (ms) taken to scroll to the specified hash.
    let elementOffset = Math.ceil($(hash).offset().top - getNavBarHeight()); // Round up to highlight right ID!

    // Uncomment to debug.
    // let scrollTop = $(window).scrollTop();
    // let scrollDelta = (elementOffset - scrollTop);
    // console.debug('Scroll Delta: ' + scrollDelta);

    $('html, body').animate(
      {
        scrollTop: elementOffset,
      },
      800,
    );
  }
});

/* ---------------------------------------------------------------------------
 * Hide mobile collapsable menu on clicking a link.
 * --------------------------------------------------------------------------- */

$(document).on('click', '.navbar-collapse.show', function (e) {
  //get the <a> element that was clicked, even if the <span> element that is inside the <a> element is e.target
  let targetElement = $(e.target).is('a') ? $(e.target) : $(e.target).parent();

  if (targetElement.is('a') && targetElement.attr('class') != 'dropdown-toggle') {
    $(this).collapse('hide');
  }
});

// Automatic main menu dropdowns on mouse over.
$('body').on('mouseenter mouseleave', '.dropdown', function (e) {
  var dropdown = $(e.target).closest('.dropdown');
  var menu = $('.dropdown-menu', dropdown);
  dropdown.addClass('show');
  menu.addClass('show');
  setTimeout(function () {
    dropdown[dropdown.is(':hover') ? 'addClass' : 'removeClass']('show');
    menu[dropdown.is(':hover') ? 'addClass' : 'removeClass']('show');
  }, 300);
});

// Call `fixScrollspy` when window is resized.
let resizeTimer;
$(window).resize(function () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(fixScrollspy, 200);
});

// Check for hash change event and fix responsive offset for hash links (e.g. Markdown footnotes).
window.addEventListener('hashchange', scrollToAnchor);

export {fixScrollspy, scrollToAnchor};
