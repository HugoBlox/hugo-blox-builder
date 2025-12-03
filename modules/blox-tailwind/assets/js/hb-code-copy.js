import {hugoEnvironment, i18n} from "@params";

// Constants
const NOTIFICATION_DURATION = 2000; // milliseconds
const DEBOUNCE_DELAY = 300; // milliseconds

// Debug mode based on environment
const isDebugMode = hugoEnvironment === "development";

/**
 * Debounce function to prevent rapid clicking
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Copies code to clipboard, excluding the copy button text
 * @param {HTMLElement} button - The copy button element
 * @param {HTMLElement} codeWrapper - The wrapper containing the code
 * @throws {Error} When clipboard operations fail
 */
async function copyCodeToClipboard(button, codeWrapper) {
  if (!button || !(button instanceof HTMLElement)) {
    throw new Error("Invalid button element");
  }
  if (!codeWrapper || !(codeWrapper instanceof HTMLElement)) {
    throw new Error("Invalid code wrapper element");
  }

  // Clone the wrapper to avoid modifying the displayed content
  const tempWrapper = codeWrapper.cloneNode(true);

  // Remove the copy button from the cloned wrapper
  const copyButton = tempWrapper.querySelector(".copy-button");
  if (copyButton) {
    copyButton.remove();
  }

  const codeToCopy = tempWrapper.textContent?.trim() ?? "";

  if (!codeToCopy) {
    throw new Error("No code content found to copy");
  }

  try {
    await navigator.clipboard.writeText(codeToCopy);
    copiedNotification(button);
    isDebugMode && console.debug("Code copied successfully");
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("Failed to copy:", errorMessage);
    button.innerHTML = i18n.copyFailed || "Failed";
    setTimeout(() => {
      button.innerHTML = i18n.copy;
    }, NOTIFICATION_DURATION);
    throw err; // Re-throw for potential error boundary handling
  }
}

/**
 * Updates button text to show copied notification
 * @param {HTMLElement} copyBtn - The copy button element
 */
function copiedNotification(copyBtn) {
  copyBtn.innerHTML = i18n.copied;
  copyBtn.disabled = true;
  copyBtn.classList.add("copied");

  setTimeout(() => {
    copyBtn.innerHTML = i18n.copy;
    copyBtn.disabled = false;
    copyBtn.classList.remove("copied");
  }, NOTIFICATION_DURATION);
}

/**
 * Creates a copy button element
 * @returns {HTMLButtonElement} The created button
 */
function createCopyButton() {
  const copyBtn = document.createElement("button");
  copyBtn.classList.add("copy-button");
  copyBtn.innerHTML = i18n.copy;
  copyBtn.setAttribute("aria-label", i18n.copyLabel || "Copy code to clipboard");
  copyBtn.setAttribute("type", "button"); // Explicit button type
  return copyBtn;
}

/**
 * Gets the appropriate wrapper for a code block
 * @param {HTMLElement} codeblock - The code block element
 * @returns {HTMLElement} The wrapper element
 */
function getCodeWrapper(codeblock) {
  const container = codeblock.parentNode?.parentNode;
  if (!container) {
    throw new Error("Invalid code block structure");
  }

  if (container.classList.contains("highlight")) {
    return container;
  }

  const tableWrapper = container.closest("table");
  if (tableWrapper) {
    return tableWrapper;
  }

  const preElement = codeblock.parentElement;
  if (preElement) {
    preElement.classList.add("highlight");
    return preElement;
  }

  throw new Error("Could not determine code wrapper");
}

/**
 * Initializes copy buttons for all code blocks
 */
function initializeCodeCopyButtons() {
  try {
    const codeBlocks = document.querySelectorAll("pre > code");
    isDebugMode && console.debug(`Found ${codeBlocks.length} code blocks`);

    codeBlocks.forEach((codeblock, index) => {
      try {
        const wrapper = getCodeWrapper(codeblock);
        const copyBtn = createCopyButton();

        // Use debounced version of copy function
        const debouncedCopy = debounce(() => copyCodeToClipboard(copyBtn, wrapper), DEBOUNCE_DELAY);

        copyBtn.addEventListener("click", debouncedCopy);
        wrapper.appendChild(copyBtn);
      } catch (err) {
        console.error(`Failed to initialize copy button for code block ${index}:`, err);
      }
    });
  } catch (err) {
    console.error("Failed to initialize code copy buttons:", err);
  }
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", initializeCodeCopyButtons);
} else {
  initializeCodeCopyButtons();
}
