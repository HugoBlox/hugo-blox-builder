/*************************************************
 *  Hugo Blox Builder
 *  https://github.com/HugoBlox/hugo-blox-builder
 *
 *  Hugo Blox Builder Utilities
 **************************************************/

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

export {scrollParentToChild};
