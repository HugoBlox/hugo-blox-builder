/*************************************************
 *  Wowchemy
 *  https://github.com/wowchemy/wowchemy-hugo-themes
 *
 *  Wowchemy Utilities
 **************************************************/

/**
 * Fix Mermaid.js clash with Highlight.js.
 * Refactor Mermaid code blocks as divs to prevent Highlight parsing them and enable Mermaid to parse them.
 * @param {boolean} render
 */
function fixMermaid(render = false) {
  let mermaids = [];
  // Note that `language-mermaid` class is applied to <code> block within <pre>, so we wish to replace parent node.
  [].push.apply(mermaids, document.getElementsByClassName('language-mermaid'));
  for (let i = 0; i < mermaids.length; i++) {
    // Convert <pre><code></code></pre> block to <div> and add `mermaid` class so that Mermaid will parse it.
    let mermaidCodeElement = mermaids[i];
    let newElement = document.createElement('div');
    newElement.innerHTML = mermaidCodeElement.innerHTML;
    newElement.classList.add('mermaid');
    if (render) {
      window.mermaid.mermaidAPI.render(`mermaid-${i}`, newElement.textContent, function (svgCode) {
        newElement.innerHTML = svgCode;
      });
    }
    mermaidCodeElement.parentNode.replaceWith(newElement);
  }
  console.debug(`Processed ${mermaids.length} Mermaid code blocks`);
}

/**
 * @param {Element} parent
 * @param {Element} child
 */
function scrollParentToChild(parent, child) {
  // Where is the parent on the page?
  const parentRect = parent.getBoundingClientRect();

  // What can the client see?
  const parentViewableArea = {
    height: parent.clientHeight,
    width: parent.clientWidth,
  };

  // Where is the child?
  const childRect = child.getBoundingClientRect();

  // Is the child in view?
  const isChildInView =
    childRect.top >= parentRect.top && childRect.bottom <= parentRect.top + parentViewableArea.height;

  // If the child isn't in view, attempt to scroll the parent to it.
  if (!isChildInView) {
    // Scroll by offset relative to parent.
    parent.scrollTop = childRect.top + parent.scrollTop - parentRect.top;
  }
}

export {fixMermaid, scrollParentToChild};
