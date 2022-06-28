/*
  global RevealMarkdown, RevealSearch, RevealNotes, RevealMath, RevealZoom, Reveal, mermaid, RevealMenu
*/

import * as params from '@params';

// Enable core slide features.
var enabledPlugins = [RevealMarkdown, RevealSearch, RevealNotes, RevealMath.MathJax3, RevealZoom];

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

// The following functions are used to render Mermaid diagrams
// after Reveal slides have been successfully loaded
// since content of slides is lazy loaded, if diagrams are
// rendered at start of presentation their sizes will be off
// get all slides that are:
// 1- data loaded
// 2- display set to block
// 3- has a mermaid element that is not processed (data-processed dne)
function mermaidSlidesReadyToRender(mslide) {
  var diag = mslide.querySelector('.mermaid');
  if (diag) {
    var background = mslide.slideBackgroundElement;
    // render if we are 1 slide away horizontally
    // current visible slide index
    var currentHorizontalIndex = Reveal.getState()['indexh'];

    // mermaid slide index
    var diagramSlideIndex = Reveal.getIndices(mslide)['h'];
    if (
      // find slides with non-rendered mermaid tags
      // these will not have the attribute data-processed
      !diag.hasAttribute('data-processed') &&
      // check also that reveal slide is already loaded
      // reveal slides seem to be lazily loaded
      // things could be easier if reveal had a slide-loaded event
      background.hasAttribute('data-loaded') &&
      // loaded slides must also have the display attribute set to block
      background.style.display === 'block' &&
      // render diagrams that are 1 slide away
      diagramSlideIndex - currentHorizontalIndex <= 1
    )
      return mslide;
  }
  return null;
}

function renderMermaidSlides() {
  // find all slides with diagrams that are ready to render
  var diagramSlides = Reveal.getSlides().filter(mermaidSlidesReadyToRender);

  // render the diagram for each slide with ready to render diagrams
  diagramSlides.forEach(function (item) {
    mermaid.init(item.querySelector('.mermaid'));
  });
}

// render mermaid slides for slides that are ready
Reveal.on('slidechanged', function () {
  renderMermaidSlides();
});

// render mermaid slides for slides that are ready on startup
Reveal.on('Ready', function () {
  if (Reveal.isReady()) {
    renderMermaidSlides();
  }
});

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
}
