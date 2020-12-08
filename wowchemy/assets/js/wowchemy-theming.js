/*************************************************
 *  Wowchemy
 *  https://github.com/wowchemy/wowchemy-hugo-modules
 *
 *  Wowchemy Theming System
 *  Supported Modes: {0: Day, 1: Night, 2: Auto}
 **************************************************/

import {fadeIn} from './wowchemy-animation';

function getThemeMode() {
  return parseInt(localStorage.getItem('wcTheme') || 2);
}

function canChangeTheme() {
  // If var is set, then user is allowed to change the theme variation.
  return Boolean(window.wc.darkLightEnabled);
}

function initThemeVariation() {
  if (!canChangeTheme()) {
    return;
  }

  let currentThemeMode = getThemeMode();
  let isDarkTheme;
  switch (currentThemeMode) {
    case 0:
      isDarkTheme = false;
      break;
    case 1:
      isDarkTheme = true;
      break;
    default:
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // The visitor prefers dark themes and switching to the dark variation is allowed by admin.
        isDarkTheme = true;
      } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        // The visitor prefers light themes and switching to the dark variation is allowed by admin.
        isDarkTheme = false;
      } else {
        // Use the site's default theme variation based on `light` in the theme file.
        isDarkTheme = window.wc.isSiteThemeDark;
      }
      break;
  }
  if (isDarkTheme) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
}

function changeThemeModeClick(newMode) {
  if (!canChangeTheme()) {
    console.info('Cannot set theme - admin disabled theme selector.');
    return;
  }
  let isDarkTheme;
  switch (newMode) {
    case 0:
      localStorage.setItem('wcTheme', '1');
      isDarkTheme = true;
      console.info('User changed theme variation to Dark.');
      showActiveTheme(0);
      break;
    case 1:
      localStorage.setItem('wcTheme', '2');
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // The visitor prefers dark themes and switching to the dark variation is allowed by admin.
        isDarkTheme = true;
      } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        // The visitor prefers light themes and switching to the dark variation is allowed by admin.
        isDarkTheme = false;
      } else {
        // Use the site's default theme variation based on `light` in the theme file.
        isDarkTheme = window.wc.isSiteThemeDark;
      }
      console.info('User changed theme variation to Auto.');
      showActiveTheme(1);
      break;
    default:
      localStorage.setItem('wcTheme', '0');
      isDarkTheme = false;
      console.info('User changed theme variation to Light.');
      showActiveTheme(2);
      break;
  }
  renderThemeVariation(isDarkTheme);
}

function showActiveTheme(mode) {
  let linkLight = document.querySelector('.js-set-theme-light');
  let linkDark = document.querySelector('.js-set-theme-dark');
  let linkAuto = document.querySelector('.js-set-theme-auto');
  switch (mode) {
    case 0:
      // Dark.
      linkLight.classList.remove('dropdown-item-active');
      linkDark.classList.add('dropdown-item-active');
      linkAuto.classList.remove('dropdown-item-active');
      break;
    case 1:
      // Auto.
      linkLight.classList.remove('dropdown-item-active');
      linkDark.classList.remove('dropdown-item-active');
      linkAuto.classList.add('dropdown-item-active');
      break;
    default:
      // Light.
      linkLight.classList.add('dropdown-item-active');
      linkDark.classList.remove('dropdown-item-active');
      linkAuto.classList.remove('dropdown-item-active');
      break;
  }
}

/**
 * Render theme variation (day or night).
 *
 * @param {boolean} isDarkTheme
 * @param {boolean} init
 * @returns {undefined}
 */
function renderThemeVariation(isDarkTheme, init = false) {
  // Is code highlighting enabled in site config?
  const codeHlLight = document.querySelector('link[title=hl-light]');
  const codeHlDark = document.querySelector('link[title=hl-dark]');
  const codeHlEnabled = codeHlLight || codeHlDark;
  const diagramEnabled = document.querySelector('script[title=mermaid]');
  const body = document.body;

  // Check if re-render required.
  if (!init) {
    // If request to render light when light variation already rendered, return.
    // If request to render dark when dark variation already rendered, return.
    if ((isDarkTheme === false && !body.classList.contains('dark')) || (isDarkTheme === true && body.classList.contains('dark'))) {
      return;
    }
  }

  if (isDarkTheme === false) {
    if (!init) {
      // Only fade in the page when changing the theme variation.
      Object.assign(document.body.style, {opacity: 0, visibility: 'visible'});
      fadeIn(document.body, 600);
    }
    body.classList.remove('dark');
    if (codeHlEnabled) {
      codeHlLight.disabled = false;
      codeHlDark.disabled = true;
    }
    if (diagramEnabled) {
      if (init) {
        /** @namespace window.mermaid **/
        window.mermaid.initialize({theme: 'default', securityLevel: 'loose'});
      } else {
        // Have to reload to re-initialise Mermaid with the new theme and re-parse the Mermaid code blocks.
        location.reload();
      }
    }
  } else if (isDarkTheme === true) {
    if (!init) {
      // Only fade in the page when changing the theme variation.
      Object.assign(document.body.style, {opacity: 0, visibility: 'visible'});
      fadeIn(document.body, 600);
    }
    body.classList.add("dark");
    if (codeHlEnabled) {
      codeHlLight.disabled = true;
      codeHlDark.disabled = false;
    }
    if (diagramEnabled) {
      if (init) {
        /** @namespace window.mermaid **/
        window.mermaid.initialize({theme: 'dark', securityLevel: 'loose'});
      } else {
        // Have to reload to re-initialise Mermaid with the new theme and re-parse the Mermaid code blocks.
        location.reload();
      }
    }
  }
}


export {
  canChangeTheme,
  initThemeVariation,
  changeThemeModeClick,
  renderThemeVariation,
  getThemeMode,
};
