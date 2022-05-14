/*************************************************
 *  Wowchemy
 *  https://github.com/wowchemy/wowchemy-hugo-themes
 *
 *  Core JS functions and initialization.
 **************************************************/

import mediumZoom from './_vendor/medium-zoom.esm';
import {hugoEnvironment, searchEnabled, i18n} from '@params';
import {scrollParentToChild} from './wowchemy-utils';
import {fixScrollspy, scrollToAnchor} from './wowchemy-navigation';
import {printLatestRelease} from './wowchemy-github';
import {
  changeThemeModeClick,
  initThemeVariation,
  renderThemeVariation,
  onMediaQueryListEvent,
} from './wowchemy-theming';

console.debug(`Environment: ${hugoEnvironment}`);

function removeQueryParamsFromUrl() {
  if (window.history.replaceState) {
    let urlWithoutSearchParams =
      window.location.protocol + '//' + window.location.host + window.location.pathname + window.location.hash;
    window.history.replaceState({path: urlWithoutSearchParams}, '', urlWithoutSearchParams);
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

document.addEventListener('DOMContentLoaded', function () {
  fixHugoOutput();

  // Render theme variation, including any HLJS and Mermaid themes.
  let {isDarkTheme, themeMode} = initThemeVariation();
  renderThemeVariation(isDarkTheme, themeMode, true);

  // Scroll Book page's active menu sidebar link into view.
  let child = document.querySelector('.docs-links .active');
  let parent = document.querySelector('.docs-links');
  if (child && parent) {
    scrollParentToChild(parent, child);
  }

  // Print latest version of GitHub projects.
  let githubReleaseSelector = '.js-github-release';
  if ($(githubReleaseSelector).length > 0) {
    printLatestRelease(githubReleaseSelector, $(githubReleaseSelector).data('repo'));
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

// Code block copy button
document.querySelectorAll('pre > code').forEach((codeblock) => {
  const container = codeblock.parentNode.parentNode;
  const copyBtn = document.createElement('button');
  let classesToAdd = ['btn', 'btn-primary', 'btn-copy-code'];
  copyBtn.classList.add(...classesToAdd);
  copyBtn.innerHTML = i18n['copy'];

  function copiedNotification() {
    copyBtn.innerHTML = i18n['copied'];
    setTimeout(() => {
      copyBtn.innerHTML = i18n['copy'];
    }, 2000);
  }

  copyBtn.addEventListener('click', () => {
    console.debug('Code block copy click. Is secure context for Clipboard API? ' + window.isSecureContext);
    if ('clipboard' in navigator) {
      // Note: Clipboard API requires HTTPS or localhost
      navigator.clipboard.writeText(codeblock.textContent);
      copiedNotification();
      return;
    } else {
      console.debug('Falling back to legacy clipboard copy');
      const range = document.createRange();
      range.selectNodeContents(codeblock);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      try {
        document.execCommand('copy');
        copiedNotification();
      } catch (e) {
        console.error(e);
      }
      selection.removeRange(range);
    }
  });

  if (container.classList.contains('highlight')) {
    // Parent when Hugo line numbers disabled
    container.appendChild(copyBtn);
  } else if (codeblock.parentNode.parentNode.parentNode.parentNode.parentNode.nodeName == 'TABLE') {
    // Parent when Hugo line numbers enabled
    codeblock.parentNode.parentNode.parentNode.parentNode.parentNode.appendChild(copyBtn);
  } else {
    // Parent when Hugo `highlight` class not applied to code block
    codeblock.parentNode.appendChild(copyBtn);
  }
});
