/*************************************************
 *  Wowchemy
 *  https://github.com/wowchemy/wowchemy-hugo-themes
 *
 *  Wowchemy Theming System
 *  Supported Modes: {0: Light, 1: Dark, 2: Auto}
 **************************************************/

import {fadeIn} from './wowchemy-animation';
import {fixMermaid} from './wowchemy-utils';

const body = document.body;

function getThemeMode() {
  return parseInt(localStorage.getItem('wcTheme') || 2);
}

function canChangeTheme() {
  // If var is set, then user is allowed to change the theme variation.
  return Boolean(window.wc.darkLightEnabled);
}

// initThemeVariation is first called directly after <body> to prevent
// flashing between the default theme mode and the user's choice.
function initThemeVariation() {
  if (!canChangeTheme()) {
    console.debug('User theming disabled.');
    return {
      isDarkTheme: window.wc.isSiteThemeDark,
      themeMode: window.wc.isSiteThemeDark ? 1 : 0,
    };
  }

  console.debug('User theming enabled.');

  let isDarkTheme;
  let currentThemeMode = getThemeMode();
  console.debug(`User's theme variation: ${currentThemeMode}`);

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
        // The visitor prefers light themes and switching to the light variation is allowed by admin.
        isDarkTheme = false;
      } else {
        // Use the site's default theme variation based on `light` in the theme file.
        isDarkTheme = window.wc.isSiteThemeDark;
      }
      break;
  }

  if (isDarkTheme && !body.classList.contains('dark')) {
    console.debug('Applying Wowchemy dark theme');
    document.body.classList.add('dark');
  } else if (!isDarkTheme && body.classList.contains('dark')) {
    console.debug('Applying Wowchemy light theme');
    document.body.classList.remove('dark');
  }

  return {
    isDarkTheme: isDarkTheme,
    themeMode: currentThemeMode,
  };
}

function changeThemeModeClick(newMode) {
  if (!canChangeTheme()) {
    console.debug('Cannot change theme - user theming disabled.');
    return;
  }
  let isDarkTheme;
  switch (newMode) {
    case 0:
      localStorage.setItem('wcTheme', '0');
      isDarkTheme = false;
      console.debug('User changed theme variation to Light.');
      break;
    case 1:
      localStorage.setItem('wcTheme', '1');
      isDarkTheme = true;
      console.debug('User changed theme variation to Dark.');
      break;
    default:
      localStorage.setItem('wcTheme', '2');
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // The visitor prefers dark themes and switching to the dark variation is allowed by admin.
        isDarkTheme = true;
      } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        // The visitor prefers light themes and switching to the light variation is allowed by admin.
        isDarkTheme = false;
      } else {
        // Use the site's default theme variation based on `light` in the theme file.
        isDarkTheme = window.wc.isSiteThemeDark;
      }
      console.debug('User changed theme variation to Auto.');
      break;
  }
  renderThemeVariation(isDarkTheme, newMode);
}

function showActiveTheme(mode) {
  let linkLight = document.querySelector('.js-set-theme-light');
  let linkDark = document.querySelector('.js-set-theme-dark');
  let linkAuto = document.querySelector('.js-set-theme-auto');

  if (linkLight === null) {
    return;
  }

  switch (mode) {
    case 0:
      // Light.
      linkLight.classList.add('dropdown-item-active');
      linkDark.classList.remove('dropdown-item-active');
      linkAuto.classList.remove('dropdown-item-active');
      break;
    case 1:
      // Dark.
      linkLight.classList.remove('dropdown-item-active');
      linkDark.classList.add('dropdown-item-active');
      linkAuto.classList.remove('dropdown-item-active');
      break;
    default:
      // Auto.
      linkLight.classList.remove('dropdown-item-active');
      linkDark.classList.remove('dropdown-item-active');
      linkAuto.classList.add('dropdown-item-active');
      break;
  }
}

/**
 * Render theme variation (day or night).
 *
 * @param {boolean} isDarkTheme
 * @param {int} themeMode - {0: Light, 1: Dark, 2: Auto}
 * @param {boolean} init - true only when called on document ready
 * @returns {undefined}
 */
function renderThemeVariation(isDarkTheme, themeMode = 2, init = false) {
  // Is code highlighting enabled in site config?
  const codeHlLight = document.querySelector('link[title=hl-light]');
  const codeHlDark = document.querySelector('link[title=hl-dark]');
  const codeHlEnabled = codeHlLight !== null || codeHlDark !== null;
  const diagramEnabled = document.querySelector('script[title=mermaid]') !== null;

  // Update active theme mode in navbar theme selector.
  showActiveTheme(themeMode);

  // Dispatch `wcThemeChange` event to support themeable user plugins.
  const themeChangeEvent = new CustomEvent('wcThemeChange', {detail: {isDarkTheme: () => isDarkTheme}});
  document.dispatchEvent(themeChangeEvent);

  // Check if re-render required.
  if (!init) {
    // If request to render light when light variation already rendered, return.
    // If request to render dark when dark variation already rendered, return.
    if (
      (isDarkTheme === false && !body.classList.contains('dark')) ||
      (isDarkTheme === true && body.classList.contains('dark'))
    ) {
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
      console.debug('Setting HLJS theme to light');
      if (codeHlLight) {
        codeHlLight.disabled = false;
      }
      if (codeHlDark) {
        codeHlDark.disabled = true;
      }
    }
    if (diagramEnabled) {
      console.debug('Initializing Mermaid with light theme');
      if (init) {
        /** @namespace window.mermaid **/
        window.mermaid.initialize({startOnLoad: false, theme: 'default', securityLevel: 'loose'});
        fixMermaid(true);
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
    body.classList.add('dark');
    if (codeHlEnabled) {
      console.debug('Setting HLJS theme to dark');
      if (codeHlLight) {
        codeHlLight.disabled = true;
      }
      if (codeHlDark) {
        codeHlDark.disabled = false;
      }
    }
    if (diagramEnabled) {
      console.debug('Initializing Mermaid with dark theme');
      if (init) {
        /** @namespace window.mermaid **/
        window.mermaid.initialize({startOnLoad: false, theme: 'dark', securityLevel: 'loose'});
        fixMermaid(true);
      } else {
        // Have to reload to re-initialise Mermaid with the new theme and re-parse the Mermaid code blocks.
        location.reload();
      }
    }
  }
}

/**
 * onMediaQueryListEvent.
 *
 * @param {MediaQueryListEvent} event
 * @returns {undefined}
 */
function onMediaQueryListEvent(event) {
  if (!canChangeTheme()) {
    // Changing theme variation is not allowed by admin.
    return;
  }
  const darkModeOn = event.matches;
  console.debug(`OS dark mode preference changed to ${darkModeOn ? '🌒 on' : '☀️ off'}.`);
  let currentThemeVariation = getThemeMode();
  let isDarkTheme;
  if (currentThemeVariation === 2) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // The visitor prefers dark themes.
      isDarkTheme = true;
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      // The visitor prefers light themes.
      isDarkTheme = false;
    } else {
      // The visitor does not have a day or night preference, so use the theme's default setting.
      isDarkTheme = window.wc.isSiteThemeDark;
    }
    renderThemeVariation(isDarkTheme, currentThemeVariation);
  }
}

export {
  canChangeTheme,
  initThemeVariation,
  changeThemeModeClick,
  renderThemeVariation,
  getThemeMode,
  onMediaQueryListEvent,
};
