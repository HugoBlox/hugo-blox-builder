//load options
import * as params from "@params";
console.log(params)
// not sure how to make 3rd part addons easily configurable
enabledPlugins = [
  RevealMarkdown,
  RevealHighlight,
  RevealSearch,
  RevealNotes,
  RevealMath,
  RevealZoom,
];

// reveal configurations can be included in front matter under slides.reveal
pluginOptions = params.slides.reveal || {}; // defaults to empty object to use default if reveal not set in front matter

// configure menu if enabled
if (params.slides.menu) {
  enabledPlugins.push(RevealMenu);

  menuOpts = params.slides.menuoptions || {}; //config key is lower cased 
  menuOpts["themesPath"] = params.cdn_url_reveal; // point to proper url

  pluginOptions["menu"] = menuOpts;
}

// configure chalkboard if enabled
if (params.slides.chalkboard) {
  enabledPlugins.push(RevealChalkboard);

  // move chalkboard slightly to right if menu enabled
  if (params.slides.menu) {
    pluginOptions["chalkboard"] = {
      toggleChalkboardButton: { left: "80px" },
      toggleNotesButton: { left: "130px" },
    };
  }
}

pluginOptions["plugins"] = enabledPlugins;
Reveal.initialize(pluginOptions);


// configure mermaid only if enabled
if (params.slides.mermaid) {
  //mermaid options
  // mermaid: front matter configuration can be used to set mermaid options
  // You can also use directives (see mermaid documentation)
  mermaidOptions = params.slides.mermaidoptions || {}; //config key is lower cased 

  // startOnLoad must be false since diagrams are lazily rendered
  mermaidOptions["startOnLoad"] = false;

  console.log(mermaidOptions)
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
  Reveal.on("slidetransitionend", (event) => {
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
