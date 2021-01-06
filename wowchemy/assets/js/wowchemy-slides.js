//load options
import * as params from "@params";

import {fixMermaid} from './wowchemy-utils';

// not sure how to make 3rd part addons easily configurable
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

const toCamel = (s) => {
  return s.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace("-", "").replace("_", "");
  });
};

const keysToCamel = function (o) {
  if (isObject(o)) {
    const n = {};

    Object.keys(o).forEach((k) => {
      n[toCamel(k)] = keysToCamel(o[k]);
    });

    return n;
  } else if (isArray(o)) {
    return o.map((i) => {
      return keysToCamel(i);
    });
  }

  return o;
};

// reveal configurations can be included in front matter under slides.reveal
var pluginOptions = {}
if(typeof params.slides.reveal_options !== "undefined"){
  pluginOptions = params.slides.reveal_options;
}

pluginOptions = keysToCamel(pluginOptions);

//enable menu by default if not set
if (pluginOptions.menu_enabled !== undefined) {
  pluginOptions.menu_enabled = true;
}

// configure menu if enabled
if (pluginOptions.menu_enabled) {
  enabledPlugins.push(RevealMenu);
}

pluginOptions["plugins"] = enabledPlugins;

Reveal.initialize(pluginOptions);

// mermaid not enabled by default
if (params.slides.diagram === undefined) {
  params.slides.diagram = false;
}

// configure mermaid only if enabled
if (params.slides.diagram) {
  //mermaid options
  // mermaid: front matter configuration can be used to set mermaid options
  // You can also use directives (see mermaid documentation)
  var mermaidOptions = {}
  if(typeof params.slides.diagram_options !== "undefined"){
    mermaidOptions = params.slides.diagram_options;
  }

  // startOnLoad must be false since diagrams are lazily rendered
  mermaidOptions["startOnLoad"] = false;

  mermaid.initialize(mermaidOptions);

  // Following functions are used to render mermaid diagrams
  // after reveal slides have been successfully loaded
  // since content of slides is lazy loaded, if diagrams are
  // rendered at start of presentation their sizes will be off
  // get all slides that are:
  // 1- data loaded
  // 2- display set to block
  // 3- has a mermaid element that is not processed (data-processed dne)
  function mermaidSlidesReadyToRender(slide) {
    diag = s.querySelector(".mermaid");
    if (diag) {
      background = s.slideBackgroundElement;
      // render if we are 1 slide away horizontally
      // current visible slide index
      currentHorizontalIndex = Reveal.getState()["indexh"];

      // mermaid slide index
      diagramSlideIndex = Reveal.getIndices((slide = s))["h"];
      if (
        // find slides with non-rendered mermaid tags
        // these will not have the attribute data-processed
        !diag.hasAttribute("data-processed") &&
        // check also that reveal slide is already loaded
        // reveal slides seem to be lazily loaded
        // things could be easier if reveal had a slide-loaded event
        background.hasAttribute("data-loaded") &&
        // loaded slides must also have the display attribute set to block
        background.style.display === "block" &&
        // render diagrams that are 1 slide away
        diagramSlideIndex - currentHorizontalIndex <= 1
      )
        return slide;
    }
    return null;
  }

  function renderMermaidSlides() {
    // find all slides with diagrams that are ready to render
    diagramSlides = Reveal.getSlides().filter(mermaidSlidesReadyToRender);
    
    // render the diagram for each slide with ready to render diagrams
    diagramSlides.forEach((item) => mermaid.init(item.querySelector(".mermaid")));
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

  // document ready
  document.addEventListener("DOMContentLoaded", function () {
    fixMermaid();
  });
}
