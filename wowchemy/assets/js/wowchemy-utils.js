/*************************************************
 *  Wowchemy
 *  https://github.com/wowchemy/wowchemy-hugo-modules
 *
 *  Wowchemy Utilities
 **************************************************/

/**
 * Fix Mermaid.js clash with Highlight.js.
 * Refactor Mermaid code blocks as divs to prevent Highlight parsing them and enable Mermaid to parse them.
 */
function fixMermaid() {
  let mermaids = [];
  // Note that `language-mermaid` class is applied to <code> block within <pre>, so we wish to replace parent node.
  [].push.apply(mermaids, document.getElementsByClassName('language-mermaid'));
  for (let i = 0; i < mermaids.length; i++) {
    // Convert <pre><code></code></pre> block to <div> and add `mermaid` class so that Mermaid will parse it.
    let mermaidCodeElement = mermaids[i];
    let newElement = document.createElement('div');
    newElement.innerHTML = mermaidCodeElement.innerHTML;
    newElement.classList.add('mermaid');
    mermaidCodeElement.parentNode.replaceWith(newElement);
  }
}

export {
  fixMermaid,
};
