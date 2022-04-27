/*************************************************
 *  Wowchemy
 *  https://github.com/wowchemy/wowchemy-hugo-themes
 *
 *  Wowchemy Headroom
 **************************************************/

import Headroom from './_vendor/headroom.min.js';

document.addEventListener('DOMContentLoaded', function () {
  // Get config
  let pageData = JSON.parse(document.getElementById('page-data').textContent);
  console.debug(`Use headroom on this page? ${pageData['use_headroom']}`);

  // Grab header element
  let $header = document.querySelector('header');

  // Use Headroom on this page?
  if ($header && pageData['use_headroom'] === true) {
    // Construct an instance of Headroom, passing the header
    let headroom = new Headroom($header);
    // Initialise Headroom
    headroom.init();
  }
});
