/*************************************************
 *  Wowchemy
 *  https://github.com/wowchemy/wowchemy-hugo-themes
 *
 *  Wowchemy Headroom
 **************************************************/

import Headroom from './_vendor/headroom.min.js';

let pageData = JSON.parse(document.getElementById('page-data').textContent);
console.debug(`Use headroom on this page? ${pageData['use_headroom']}`);

if (pageData['use_headroom'] === true) {
  document.addEventListener('DOMContentLoaded', function () {
    // Grab header element
    let myElement = document.querySelector('header');
    // Construct an instance of Headroom, passing the header
    let headroom = new Headroom(myElement);
    // Initialise Headroom
    headroom.init();
  });
}
