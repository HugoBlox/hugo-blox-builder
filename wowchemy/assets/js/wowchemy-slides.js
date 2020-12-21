//load options
import * as params from "@params";

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
  return o === Object(o) && !isArray(o) && typeof o !== 'function';
};

const isArray = function (a) {
  return Array.isArray(a);
};

const toCamel = (s) => {
  return s.replace(/([-_][a-z])/ig, ($1) => {
    return $1.toUpperCase()
      .replace('-', '')
      .replace('_', '');
  });
};

const keysToCamel = function (o) {
  if (isObject(o)) {
    const n = {};

    Object.keys(o)
      .forEach((k) => {
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
var pluginOptions = (typeof params.slides.reveal_options === 'undefined') ? {} : params.slides.reveal_options;

pluginOptions = keysToCamel(pluginOptions)

//enable menu and chalkboard by default if not set
if(pluginOptions.menu_enabled === undefined){
  pluginOptions.menu_enabled = true
}

// configure menu if enabled
if (pluginOptions.menu_enabled) {
  enabledPlugins.push(RevealMenu);

  // make sure we have a menu configuration so we can set defaults
  pluginOptions.menu = (typeof pluginOptions.menu === 'undefined') ? {} : pluginOptions.menu;

  pluginOptions.menu["themesPath"] = params.cdn_url_reveal; // point to proper url
}

// chalkboard enabled by default
if(pluginOptions.chalkboard_enabled === undefined){
  pluginOptions.chalkboard_enabled = true
}


// configure chalkboard if enabled
if (pluginOptions.chalkboard_enabled) {
  enabledPlugins.push(RevealChalkboard);

  // move chalkboard slightly to right if menu enabled
  if (pluginOptions.menu_enabled) {
    // make sure we have a config object
    pluginOptions.chalkboard = (typeof pluginOptions.chalkboard === 'undefined') ? {} : pluginOptions.chalkboard;
    pluginOptions.chalkboard.toggleChalkboardButton = { left: "80px" }
    pluginOptions.chalkboard.toggleNotesButton = { left: "130px" }
    
  }
}

pluginOptions["plugins"] = enabledPlugins;

Reveal.initialize(pluginOptions);


// mermaid not enabled by default
if(params.slides.diagram === undefined){
  params.slides.diagram = false
}

// configure mermaid only if enabled
if (params.slides.diagram) {
  //mermaid options
  // mermaid: front matter configuration can be used to set mermaid options
  // You can also use directives (see mermaid documentation)
  var mermaidOptions = (typeof params.slides.diagram_options === 'undefined') ? {} : params.slides.diagram_options;

  // startOnLoad must be false since diagrams are lazily rendered
  mermaidOptions["startOnLoad"] = false;


  mermaid.initialize(mermaidOptions);

  // Following functions are used to render mermaid diagrams
  // after reveal slides have been successfully loaded
  // since content of slides is lazy loaded, if diagrams are
  // rendered at start of presentation their sizes will be off
  /* get all slides that are:
1- data loaded
2- display set to block
3- has a mermaid element that is not processed (data-processed dne)

*/
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
  // end of mermaid diagram functions

  function fixMermaid() {
    let mermaids = [];
    [].push.apply(
      mermaids,
      document.getElementsByClassName("language-mermaid")
    );
    for (let i = 0; i < mermaids.length; i++) {
      $(mermaids[i]).unwrap("pre"); // Remove <pre> wrapper.
      $(mermaids[i]).replaceWith(function () {
        // Convert <code> block to <div> and add `mermaid` class so that Mermaid will parse it.
        return $("<div />").append($(this).contents()).addClass("mermaid");
      });
    }
  }

  {
    {
      /*  document.addEventListener("DOMContentLoaded", function(event) { 
    fixMermaid();
  });  */
    }
  }

  // document ready
  $(document).ready(function () {
    fixMermaid();
  });
}
