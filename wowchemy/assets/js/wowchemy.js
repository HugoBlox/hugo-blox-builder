/*************************************************
 *  Wowchemy
 *  https://github.com/wowchemy/wowchemy-hugo-themes
 *
 *  Core JS functions and initialization.
 **************************************************/

import mediumZoom from './_vendor/medium-zoom.esm';
import {hugoEnvironment, codeHighlighting, searchEnabled} from '@params';
import {scrollParentToChild} from './wowchemy-utils';
import {
  changeThemeModeClick,
  initThemeVariation,
  renderThemeVariation,
  onMediaQueryListEvent,
} from './wowchemy-theming';

console.debug(`Environment: ${hugoEnvironment}`);

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

function removeQueryParamsFromUrl() {
  if (window.history.replaceState) {
    let urlWithoutSearchParams =
      window.location.protocol + '//' + window.location.host + window.location.pathname + window.location.hash;
    window.history.replaceState({path: urlWithoutSearchParams}, '', urlWithoutSearchParams);
  }
}

// Check for hash change event and fix responsive offset for hash links (e.g. Markdown footnotes).
window.addEventListener('hashchange', scrollToAnchor);

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

/* ---------------------------------------------------------------------------
 * GitHub API.
 * --------------------------------------------------------------------------- */

function printLatestRelease(selector, repo) {
  if (hugoEnvironment === 'production') {
    $.getJSON('https://api.github.com/repos/' + repo + '/tags')
      .done(function (json) {
        let release = json[0];
        $(selector).append(' ' + release.name);
      })
      .fail(function (jqxhr, textStatus, error) {
        let err = textStatus + ', ' + error;
        console.log('Request Failed: ' + err);
      });
  }
}

/* ---------------------------------------------------------------------------
 * Toggle search dialog.
 * --------------------------------------------------------------------------- */

function toggleSearchDialog() {
  if ($('body').hasClass('searching')) {
    // Clear search query and hide search modal.
    $('[id=search-query]').blur();
    $('body').removeClass('searching compensate-for-scrollbar');

    // Remove search query params from URL as user has finished searching.
    removeQueryParamsFromUrl();

    // Prevent fixed positioned elements (e.g. navbar) moving due to scrollbars.
    $('#fancybox-style-noscroll').remove();
  } else {
    // Prevent fixed positioned elements (e.g. navbar) moving due to scrollbars.
    if (!$('#fancybox-style-noscroll').length && document.body.scrollHeight > window.innerHeight) {
      $('head').append(
        '<style id="fancybox-style-noscroll">.compensate-for-scrollbar{margin-right:' +
          (window.innerWidth - document.documentElement.clientWidth) +
          'px;}</style>',
      );
      $('body').addClass('compensate-for-scrollbar');
    }

    // Show search modal.
    $('body').addClass('searching');
    $('.search-results').css({opacity: 0, visibility: 'visible'}).animate({opacity: 1}, 200);
    let algoliaSearchBox = document.querySelector('.ais-SearchBox-input');
    if (algoliaSearchBox) {
      algoliaSearchBox.focus();
    } else {
      $('#search-query').focus();
    }
  }
}

/* ---------------------------------------------------------------------------
 * Fix Hugo's Goldmark output and Mermaid code blocks.
 * --------------------------------------------------------------------------- */

/**
 * Fix Hugo's Goldmark output.
 */
function fixHugoOutput() {
  // Fix Goldmark table of contents.
  // - Must be performed prior to initializing ScrollSpy.
  $('#TableOfContents').addClass('nav flex-column');
  $('#TableOfContents li').addClass('nav-item');
  $('#TableOfContents li a').addClass('nav-link');

  // Fix Goldmark task lists (remove bullet points).
  $("input[type='checkbox'][disabled]").parents('ul').addClass('task-list');

  // Bootstrap table style is opt-in and Goldmark doesn't add it.
  $('table').addClass('.table');
}

// Get an element's siblings.
function getSiblings(elem) {
  // Filter out itself.
  return Array.prototype.filter.call(elem.parentNode.children, function (sibling) {
    return sibling !== elem;
  });
}

/* ---------------------------------------------------------------------------
 * On document ready.
 * --------------------------------------------------------------------------- */

$(document).ready(function () {
  fixHugoOutput();

  // Render theme variation, including any HLJS and Mermaid themes.
  let {isDarkTheme, themeMode} = initThemeVariation();
  renderThemeVariation(isDarkTheme, themeMode, true);

  // Initialise code highlighting if enabled for this page.
  // Note: this block should be processed after the Mermaid code-->div conversion.
  if (codeHighlighting) {
    hljs.initHighlighting();
  }

  // Scroll Book page's active menu sidebar link into view.
  let child = document.querySelector('.docs-links .active');
  let parent = document.querySelector('.docs-links');
  if (child && parent) {
    scrollParentToChild(parent, child);
  }
});

/* ---------------------------------------------------------------------------
 * On window loaded.
 * --------------------------------------------------------------------------- */

$(window).on('load', function () {
  // Re-initialize Scrollspy with dynamic navbar height offset.
  fixScrollspy();

  // Detect instances of the Portfolio widget.
  let isotopeInstances = document.querySelectorAll('.projects-container');
  let isotopeInstancesCount = isotopeInstances.length;

  // Fix ScrollSpy highlighting previous Book page ToC link for some anchors.
  // Check if isotopeInstancesCount>0 as that case performs its own scrollToAnchor.
  if (window.location.hash && isotopeInstancesCount === 0) {
    scrollToAnchor(decodeURIComponent(window.location.hash), 0);
  }

  // Scroll Book page's active ToC sidebar link into view.
  // Action after calling scrollToAnchor to fix Scrollspy highlighting otherwise wrong link may have active class.
  let child = document.querySelector('.docs-toc .nav-link.active');
  let parent = document.querySelector('.docs-toc');
  if (child && parent) {
    scrollParentToChild(parent, child);
  }

  // Enable images to be zoomed.
  let zoomOptions = {};
  if (document.body.classList.contains('dark')) {
    zoomOptions.background = 'rgba(0,0,0,0.9)';
  } else {
    zoomOptions.background = 'rgba(255,255,255,0.9)';
  }
  mediumZoom('[data-zoomable]', zoomOptions);

  // Init Isotope Layout Engine for instances of the Portfolio widget.
  let isotopeCounter = 0;
  isotopeInstances.forEach(function (isotopeInstance, index) {
    console.debug(`Loading Isotope instance ${index}`);

    // Isotope instance
    let iso;

    // Get the layout for this Isotope instance
    let isoSection = isotopeInstance.closest('section');
    let layout = '';
    if (isoSection.querySelector('.isotope').classList.contains('js-layout-row')) {
      layout = 'fitRows';
    } else {
      layout = 'masonry';
    }

    // Get default filter (if any) for this instance
    let defaultFilter = isoSection.querySelector('.default-project-filter');
    let filterText = '*';
    if (defaultFilter !== null) {
      filterText = defaultFilter.textContent;
    }
    console.debug(`Default Isotope filter: ${filterText}`);

    // Init Isotope instance once its images have loaded.
    imagesLoaded(isotopeInstance, function () {
      iso = new Isotope(isotopeInstance, {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        masonry: {
          gutter: 20,
        },
        filter: filterText,
      });

      // Filter Isotope items when a toolbar filter button is clicked.
      let isoFilterButtons = isoSection.querySelectorAll('.project-filters a');
      isoFilterButtons.forEach((button) =>
        button.addEventListener('click', (e) => {
          e.preventDefault();
          let selector = button.getAttribute('data-filter');

          // Apply filter
          console.debug(`Updating Isotope filter to ${selector}`);
          iso.arrange({filter: selector});

          // Update active toolbar filter button
          button.classList.remove('active');
          button.classList.add('active');
          let buttonSiblings = getSiblings(button);
          buttonSiblings.forEach((buttonSibling) => {
            buttonSibling.classList.remove('active');
            buttonSibling.classList.remove('all');
          });
        }),
      );

      // Check if all Isotope instances have loaded.
      incrementIsotopeCounter();
    });
  });

  // Hook to perform actions once all Isotope instances have loaded.
  function incrementIsotopeCounter() {
    isotopeCounter++;
    if (isotopeCounter === isotopeInstancesCount) {
      console.debug(`All Portfolio Isotope instances loaded.`);
      // Once all Isotope instances and their images have loaded, scroll to hash (if set).
      // Prevents scrolling to the wrong location due to the dynamic height of Isotope instances.
      // Each Isotope instance height is affected by applying filters and loading images.
      // Without this logic, the scroll location can appear correct, but actually a few pixels out and hence Scrollspy
      // can highlight the wrong nav link.
      if (window.location.hash) {
        scrollToAnchor(decodeURIComponent(window.location.hash), 0);
      }
    }
  }

  // Print latest version of GitHub projects.
  let githubReleaseSelector = '.js-github-release';
  if ($(githubReleaseSelector).length > 0) {
    printLatestRelease(githubReleaseSelector, $(githubReleaseSelector).data('repo'));
  }

  // Parse Wowchemy keyboard shortcuts.
  document.addEventListener('keyup', (event) => {
    if (event.code === 'Escape') {
      const body = document.body;
      if (body.classList.contains('searching')) {
        // Close search dialog.
        toggleSearchDialog();
      }
    }
    // Use `key` to check for slash. Otherwise, with `code` we need to check for modifiers.
    if (event.key === '/') {
      let focusedElement =
        (document.hasFocus() &&
          document.activeElement !== document.body &&
          document.activeElement !== document.documentElement &&
          document.activeElement) ||
        null;
      let isInputFocused = focusedElement instanceof HTMLInputElement || focusedElement instanceof HTMLTextAreaElement;
      if (searchEnabled && !isInputFocused) {
        // Open search dialog.
        event.preventDefault();
        toggleSearchDialog();
      }
    }
  });

  // Search event handler
  // Check that built-in search or Algolia enabled.
  if (searchEnabled) {
    // On search icon click toggle search dialog.
    $('.js-search').click(function (e) {
      e.preventDefault();
      toggleSearchDialog();
    });
  }

  // Init. author notes (tooltips).
  $('[data-toggle="tooltip"]').tooltip();
});

// Theme chooser events.
let linkLight = document.querySelector('.js-set-theme-light');
let linkDark = document.querySelector('.js-set-theme-dark');
let linkAuto = document.querySelector('.js-set-theme-auto');
if (linkLight && linkDark && linkAuto) {
  linkLight.addEventListener('click', (event) => {
    event.preventDefault();
    changeThemeModeClick(0);
  });
  linkDark.addEventListener('click', (event) => {
    event.preventDefault();
    changeThemeModeClick(1);
  });
  linkAuto.addEventListener('click', (event) => {
    event.preventDefault();
    changeThemeModeClick(2);
  });
}

// Media Query events.
// Live update of day/night mode on system preferences update (no refresh required).
// Note: since we listen only for *dark* events, we won't detect other scheme changes such as light to no-preference.
const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
darkModeMediaQuery.addEventListener('change', (event) => {
  onMediaQueryListEvent(event);
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
