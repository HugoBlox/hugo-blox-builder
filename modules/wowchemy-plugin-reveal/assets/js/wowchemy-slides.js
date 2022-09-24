/*************************************************
 *  Wowchemy - https://wowchemy.com/
 *  License: https://github.com/wowchemy/wowchemy-hugo-themes/blob/main/LICENSE.md
 *
 *  Reveal.JS integration
 **************************************************/

/*
  global RevealMarkdown, RevealSearch, RevealNotes, RevealMath, RevealZoom, Reveal, mermaid, RevealMenu
*/

import * as params from '@params';

// Enable core slide features.
var enabledPlugins = [RevealMarkdown, RevealSearch, RevealNotes, RevealMath.KaTeX, RevealZoom];

const isObject = function (o) {
  return o === Object(o) && !isArray(o) && typeof o !== 'function';
};

const isArray = function (a) {
  return Array.isArray(a);
};

const toCamelCase = function (s) {
  return s.replace(/([-_][a-z])/gi, function (term) {
    return term.toUpperCase().replace('-', '').replace('_', '');
  });
};

const keysToCamelCase = function (o) {
  if (isObject(o)) {
    const n = {};

    Object.keys(o).forEach(function (k) {
      n[toCamelCase(k)] = keysToCamelCase(o[k]);
    });

    return n;
  } else if (isArray(o)) {
    return o.map(function (i) {
      return keysToCamelCase(i);
    });
  }

  return o;
};

// reveal configurations can be included in front matter under slides.reveal
var pluginOptions = {};
if (typeof params.slides.reveal_options !== 'undefined') {
  pluginOptions = params.slides.reveal_options;
}

pluginOptions = keysToCamelCase(pluginOptions);

//enable menu by default if not set
if (typeof pluginOptions.menu_enabled === 'undefined') {
  pluginOptions.menu_enabled = true;
}

// configure menu if enabled
if (pluginOptions.menu_enabled) {
  enabledPlugins.push(RevealMenu);
}

pluginOptions['plugins'] = enabledPlugins;

Reveal.initialize(pluginOptions);

// Disable Mermaid by default.
if (typeof params.slides.diagram === 'undefined') {
  params.slides.diagram = false;
}

// Configure Mermaid only if diagrams are enabled.
if (params.slides.diagram) {
  //mermaid options
  // mermaid: front matter configuration can be used to set mermaid options
  // You can also use directives (see mermaid documentation)
  var mermaidOptions = {};
  if (typeof params.slides.diagram_options !== 'undefined') {
    mermaidOptions = params.slides.diagram_options;
  }

  // `startOnLoad` must be false since diagrams are lazily rendered.
  mermaidOptions['startOnLoad'] = false;

  mermaid.initialize(mermaidOptions);

  // Lazily render Mermaid diagrams within Reveal.JS slides
  // See: https://github.com/hakimel/reveal.js/issues/2863#issuecomment-1107444425
  let renderMermaidDiagrams = function renderMermaidDiagrams(event) {

    let mermaidDivs = event.currentSlide.querySelectorAll('.mermaid:not(.done)');
    let indices = Reveal.getIndices();
    let pageno = `${indices.h}-${indices.v}`

    mermaidDivs.forEach(function (mermaidDiv, i) {

      let insertSvg = function (svgCode) {
        mermaidDiv.innerHTML = svgCode;
        mermaidDiv.classList.add('done');
      };
      let graphDefinition = mermaidDiv.textContent;
      mermaid.mermaidAPI.render(`mermaid${pageno}-${i}`, graphDefinition, insertSvg);
    });
    Reveal.layout();
  };

  Reveal.on('ready', event => renderMermaidDiagrams(event));
  Reveal.on('slidechanged', event => renderMermaidDiagrams(event));
}
