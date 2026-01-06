/*************************************************
 *  Hugo Blox Kit - https://hugoblox.com/
 *  License: https://github.com/HugoBlox/kit/blob/main/LICENSE.md
 *
 *  Reveal.JS integration
 **************************************************/

/*
  global RevealMarkdown, RevealSearch, RevealNotes, RevealMath, RevealZoom, Reveal, mermaid, RevealMenu
*/

import * as params from "@params";

// Guard against null/undefined slides params - ensures decks render with sensible defaults
const slides = params.slides || {};

// Enable core slide features.
var enabledPlugins = [RevealMarkdown, RevealSearch, RevealNotes, RevealMath.KaTeX, RevealZoom];

const isObject = (o) => o === Object(o) && !isArray(o) && typeof o !== "function";

const isArray = (a) => Array.isArray(a);

const toCamelCase = (s) => s.replace(/([-_][a-z])/gi, (term) => term.toUpperCase().replace("-", "").replace("_", ""));

const keysToCamelCase = (o) => {
  if (isObject(o)) {
    const n = {};

    Object.keys(o).forEach((k) => {
      n[toCamelCase(k)] = keysToCamelCase(o[k]);
    });

    return n;
  } else if (isArray(o)) {
    return o.map((i) => keysToCamelCase(i));
  }

  return o;
};

// reveal configurations can be included in front matter under slides.reveal
var pluginOptions = {};
if (typeof slides.reveal_options !== "undefined") {
  pluginOptions = slides.reveal_options;
}

pluginOptions = keysToCamelCase(pluginOptions);

// Menu disabled by default (reveal.js-menu@2.1.0 has ESM compatibility issues)
// Menu plugin no longer maintained as of 2026-01 (last updated 6 years ago).
// TODO: consider removing this plugin as it's unlikely to work with modern browsers.
if (typeof pluginOptions.menu_enabled === "undefined") {
  pluginOptions.menu_enabled = false;
}

// configure menu if enabled
if (pluginOptions.menu_enabled) {
  enabledPlugins.push(RevealMenu);
}

pluginOptions.plugins = enabledPlugins;

Reveal.initialize(pluginOptions);

// Disable Mermaid by default.
if (typeof slides.diagram === "undefined") {
  slides.diagram = false;
}

// Configure Mermaid only if diagrams are enabled.
if (slides.diagram) {
  //mermaid options
  // mermaid: front matter configuration can be used to set mermaid options
  // You can also use directives (see mermaid documentation)
  let mermaidOptions = {};
  if (typeof slides.diagram_options !== "undefined") {
    mermaidOptions = slides.diagram_options;
  }

  // `startOnLoad` must be false since diagrams are lazily rendered.
  mermaidOptions.startOnLoad = false;

  mermaid.initialize(mermaidOptions);

  // Lazily render Mermaid diagrams within Reveal.JS slides
  // See: https://github.com/hakimel/reveal.js/issues/2863#issuecomment-1107444425
  const renderMermaidDiagrams = function renderMermaidDiagrams(event) {
    const mermaidDivs = event.currentSlide.querySelectorAll(".mermaid:not(.done)");
    const indices = Reveal.getIndices();
    const pageno = `${indices.h}-${indices.v}`;

    mermaidDivs.forEach((mermaidDiv, i) => {
      const insertSvg = (svgCode) => {
        mermaidDiv.innerHTML = svgCode;
        mermaidDiv.classList.add("done");
      };
      const graphDefinition = mermaidDiv.textContent;
      mermaid.mermaidAPI.render(`mermaid${pageno}-${i}`, graphDefinition, insertSvg);
    });
    Reveal.layout();
  };

  Reveal.on("ready", (event) => renderMermaidDiagrams(event));
  Reveal.on("slidechanged", (event) => renderMermaidDiagrams(event));
}
