/*************************************************
 *  Wowchemy
 *  https://github.com/wowchemy/wowchemy-hugo-modules
 *
 *  Wowchemy Initialization
 **************************************************/

import {initThemeVariation} from './wowchemy-theming';

import {wcDarkLightEnabled, wcIsSiteThemeDark} from '@params';

window.wc = {
  darkLightEnabled: wcDarkLightEnabled,
  isSiteThemeDark: wcIsSiteThemeDark,
}

// Initialize theme variation.
initThemeVariation();
