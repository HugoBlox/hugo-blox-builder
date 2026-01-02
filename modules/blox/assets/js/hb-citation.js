/**
 * Citation clipboard handler for Hugo Blox Kit
 * Copies BibTeX citation to clipboard when cite button is clicked
 */

import {hugoEnvironment, i18n} from "@params";
import {ClipboardCache, copyToClipboardSync} from "./hb-clipboard.js";
import {showNotification} from "./hb-notifier.js";

// Debug mode based on environment
const isDebugMode = hugoEnvironment === "development";

// Cache for citation content
const citationCache = new ClipboardCache();

// Initialize citation handlers when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeCitation);
} else {
  initializeCitation();
}

function initializeCitation() {
  // Handle citation button clicks using event delegation
  document.addEventListener("click", handleCiteClick);

  // Prefetch citations on hover/focus for better UX and Safari compatibility
  document.addEventListener("mouseover", prefetchOnHover);
  document.addEventListener("focusin", prefetchOnHover);

  // Prefetch all citations on page load
  prefetchAllCitations();
}

/**
 * Prefetch all citations on page load
 */
function prefetchAllCitations() {
  const citeButtons = document.querySelectorAll(".js-cite-clipboard[data-filename]");
  citeButtons.forEach((button) => {
    const filename = button.getAttribute("data-filename");
    if (filename && !citationCache.has(filename)) {
      // Fetch in background, don't await
      fetchAndCacheCitation(filename);
    }
  });
}

/**
 * Prefetch citation on hover/focus
 * @param {Event} e - Hover or focus event
 */
function prefetchOnHover(e) {
  const citeButton = e.target.closest(".js-cite-clipboard");
  if (!citeButton) return;

  const filename = citeButton.getAttribute("data-filename");
  if (filename && !citationCache.has(filename)) {
    // Fetch in background, don't await
    fetchAndCacheCitation(filename);
  }
}

/**
 * Fetch and cache citation content
 * @param {string} filename - Citation file URL
 * @returns {Promise<string|null>} - Citation content or null if failed
 */
async function fetchAndCacheCitation(filename) {
  try {
    const response = await fetch(filename);
    if (!response.ok) {
      throw new Error(`Failed to fetch citation: ${response.statusText}`);
    }
    const citation = await response.text();
    citationCache.set(filename, citation);
    return citation;
  } catch (error) {
    if (isDebugMode) {
      console.error(`Failed to fetch citation ${filename}:`, error);
    }
    return null;
  }
}

/**
 * Handle cite button clicks - synchronous clipboard write for Safari compatibility
 * @param {Event} e - Click event
 */
function handleCiteClick(e) {
  // Check if clicked element or its parent is a cite button
  const citeButton = e.target.closest(".js-cite-clipboard");
  if (!citeButton) return;

  e.preventDefault();
  e.stopPropagation();

  const filename = citeButton.getAttribute("data-filename");
  if (!filename) {
    if (isDebugMode) {
      console.error("No filename specified for citation");
    }
    showNotification("Citation file not found", "error");
    return;
  }

  // Check if citation is cached
  const cachedCitation = citationCache.get(filename);

  if (cachedCitation) {
    // Citation is cached, copy immediately (synchronous for Safari)
    copyToClipboardSync(cachedCitation).then((success) => {
      if (success) {
        showNotification(i18n?.copied || "Citation copied!", "success");
        updateButtonText(citeButton);
      } else {
        showNotification("Failed to copy citation", "error");
      }
    });
  } else {
    // Not cached, need to fetch first (will fail in Safari with strict mode)
    fetchAndCopyWithFallback(filename, citeButton);
  }
}

/**
 * Fetch and copy with fallback (for browsers that allow async clipboard)
 * @param {string} filename - Citation file URL
 * @param {HTMLElement} button - Cite button element
 */
async function fetchAndCopyWithFallback(filename, button) {
  try {
    const citation = await fetchAndCacheCitation(filename);
    if (citation) {
      // Try to copy (might fail in Safari due to lost user activation)
      const success = await copyToClipboardSync(citation);
      if (success) {
        showNotification(i18n?.copied || "Citation copied!", "success");
        updateButtonText(button);
      } else {
        showNotification("Failed to copy citation", "error");
      }
    } else {
      showNotification("Failed to load citation", "error");
    }
  } catch (error) {
    if (isDebugMode) {
      console.error("Failed to copy citation:", error);
    }
    // If it's a NotAllowedError, suggest hovering first
    if (error.name === "NotAllowedError") {
      showNotification("Please hover over the button first, then click", "info");
    } else {
      showNotification("Failed to copy citation", "error");
    }
  }
}

/**
 * Update button text to show copied state
 * @param {HTMLElement} button - The cite button element
 */
function updateButtonText(button) {
  const copiedText = i18n?.copied || "Copied!";

  // Find text element to update (skip icon)
  const textElement = button.querySelector("span");
  if (!textElement) {
    if (isDebugMode) {
      console.warn("Could not find text element in cite button");
    }
    return;
  }

  const originalText = textElement.textContent;
  textElement.textContent = copiedText;

  // Add visual feedback
  button.classList.add("opacity-70");

  // Revert after 2 seconds
  setTimeout(() => {
    textElement.textContent = originalText;
    button.classList.remove("opacity-70");
  }, 2000);
}

// Export functions for potential reuse
export {handleCiteClick, prefetchAllCitations};
