/**
 * Clipboard Utilities for Hugo Blox Kit
 * Provides cross-browser clipboard functionality
 */

import {hugoEnvironment} from "@params";

// Debug mode based on environment
const isDebugMode = hugoEnvironment === "development";

/**
 * Copy text to clipboard with multiple fallback methods
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} - Whether the copy was successful
 */
export async function copyToClipboard(text) {
  // Method 1: Modern Clipboard API
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      if (isDebugMode) {
        console.log("Copied using Clipboard API");
      }
      return true;
    } catch (err) {
      if (isDebugMode) {
        console.warn("Clipboard API failed:", err);
      }
    }
  }

  // Method 2: execCommand fallback
  return copyUsingExecCommand(text);
}

/**
 * Copy text to clipboard synchronously (Safari-compatible)
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} - Whether the copy was successful
 */
export function copyToClipboardSync(text) {
  return new Promise((resolve) => {
    // Try modern clipboard API first
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          if (isDebugMode) {
            console.log("Copied using Clipboard API (sync)");
          }
          resolve(true);
        })
        .catch((err) => {
          if (isDebugMode) {
            console.warn("Clipboard API failed:", err);
          }
          // Fallback to execCommand
          resolve(copyUsingExecCommand(text));
        });
    } else {
      // Use execCommand directly
      resolve(copyUsingExecCommand(text));
    }
  });
}

/**
 * Legacy copy method using execCommand
 * @param {string} text - Text to copy
 * @returns {boolean} - Success status
 */
export function copyUsingExecCommand(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;

  // Make it invisible but copyable
  Object.assign(textarea.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "2em",
    height: "2em",
    padding: "0",
    border: "none",
    outline: "none",
    boxShadow: "none",
    background: "transparent",
    fontSize: "16px", // Prevent zoom on iOS
  });

  document.body.appendChild(textarea);

  // Select the text
  textarea.focus();
  textarea.select();

  // For iOS
  if (navigator.userAgent.match(/ipad|iphone/i)) {
    const range = document.createRange();
    range.selectNodeContents(textarea);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    textarea.setSelectionRange(0, 999999);
  }

  let success = false;
  try {
    success = document.execCommand("copy");
    if (isDebugMode) {
      console.log(`execCommand copy ${success ? "succeeded" : "failed"}`);
    }
  } catch (err) {
    if (isDebugMode) {
      console.error("execCommand failed:", err);
    }
  }

  document.body.removeChild(textarea);
  return success;
}

/**
 * Test if clipboard API is available and working
 * @returns {boolean} - Whether clipboard API is available
 */
export function isClipboardAPIAvailable() {
  return !!(navigator.clipboard && window.isSecureContext);
}

/**
 * Create a prefetch cache for clipboard content
 * Useful for Safari compatibility where content must be copied synchronously
 */
export class ClipboardCache {
  constructor() {
    this.cache = new Map();
  }

  /**
   * Add content to cache
   * @param {string} key - Cache key
   * @param {string} content - Content to cache
   */
  set(key, content) {
    this.cache.set(key, content);
    if (isDebugMode) {
      console.log(`Cached clipboard content for: ${key}`);
    }
  }

  /**
   * Get content from cache
   * @param {string} key - Cache key
   * @returns {string|null} - Cached content or null
   */
  get(key) {
    return this.cache.get(key) || null;
  }

  /**
   * Check if content is cached
   * @param {string} key - Cache key
   * @returns {boolean} - Whether content is cached
   */
  has(key) {
    return this.cache.has(key);
  }

  /**
   * Clear the cache
   */
  clear() {
    this.cache.clear();
  }

  /**
   * Get cache size
   * @returns {number} - Number of cached items
   */
  get size() {
    return this.cache.size;
  }
}

// Export default clipboard copy function
export default copyToClipboard;
