import * as params from "@params";

import {fixMermaid} from './wowchemy-utils';

// Enable core slide features.
enabledPlugins = [
  RevealMarkdown,
  RevealHighlight,
  RevealSearch,
  RevealNotes,
  RevealMath,
  RevealZoom,
];

const isObject = function (o) {
  return o === Object(o) && !isArray(o) && typeof o !== "function";
};

const isArray = function (a) {
  return Array.isArray(a);
};

const toCamelCase = (s) => {
  return s.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace("-", "").replace("_", "");
  });
};

const keysToCamelCase = function (o) {
  if (isObject(o)) {
    const n = {};

    Object.keys(o).forEach((k) => {
      n[toCamelCase(k)] = keysToCamelCase(o[k]);
    });

    return n;
  } else if (isArray(o)) {
    return o.map((i) => {
      return keysToCamelCase(i);
    });
  }

  return o;
};

// reveal configurations can be included in front matter under slides.reveal
var pluginOptions = {}
if(typeof params.slides.reveal_options === "undefined"){
  pluginOptions = params.slides.reveal_options;
}


pluginOptions = keysToCamel(pluginOptions);

// Enable presentation menu by default.
if (pluginOptions.menu_enabled === undefined) {
  pluginOptions.menu_enabled = true;
}

// configure menu if enabled
if (pluginOptions.menu_enabled) {
  enabledPlugins.push(RevealMenu);

  // make sure we have a menu configuration so we can set defaults
  pluginOptions.menu = {}
  if(typeof pluginOptions.menu === "undefined"){
    pluginOptions = pluginOptions.menu;
  }
}

pluginOptions["plugins"] = enabledPlugins;

Reveal.initialize(pluginOptions);

// Disable Mermaid by default.
if (params.slides.diagram === undefined) {
  params.slides.diagram = false;
}

// Configure Mermaid only if diagrams are enabled.
if (params.slides.diagram) {
  //mermaid options
  // mermaid: front matter configuration can be used to set mermaid options
  // You can also use directives (see mermaid documentation)
  var mermaidOptions = {}
  if(typeof params.slides.diagram_options === "undefined"){
    mermaidOptions = params.slides.diagram_options;
  }

  // `startOnLoad` must be false since diagrams are lazily rendered.
  mermaidOptions["startOnLoad"] = false;

  mermaid.initialize(mermaidOptions);

  // The following functions are used to render Mermaid diagrams
  // after Reveal slides have been successfully loaded
  // since content of slides is lazy loaded, if diagrams are
  // rendered at start of presentation their sizes will be off
  // get all slides that have:
  // 1. their data loaded
  // 2. display set to block
  // 3. a mermaid element that is unprocessed (no `data-processed` attribute)
  function mermaidSlidesReadyToRender(s) {
    diag = s.querySelector(".mermaid");
    if (diag) {
      background = s.slideBackgroundElement;
      // render if we are 1 slide away horizontally
      // current visible slide index
      chidx = Reveal.getState()["indexh"];

      // mermaid slide index
      shidx = Reveal.getIndices((slide = s))["h"];
      if (
        !diag.hasAttribute("data-processed") &&
        background.hasAttribute("data-loaded") &&
        background.style.display === "block" &&
        shidx - chidx <= 1
      )
        return s;
    }
    return null;
  }

  function renderMermaidSlides() {
    dSlides = Reveal.getSlides().filter(mermaidSlidesReadyToRender);
    dSlides.forEach((item) => mermaid.init(item.querySelector(".mermaid")));
  }

  // render mermaid slides for slides that are ready
  Reveal.on("slidechanged", (event) => {
    renderMermaidSlides();
  });

  // render mermaid slides for slides that are ready on startup
  Reveal.on("Ready", (event) => {
    if (Reveal.isReady()) {
      renderMermaidSlides();
    }
  });

  // Fix Mermaid conflict with Hightlight JS.
  document.addEventListener("DOMContentLoaded", function () {
    fixMermaid();
  });
}
