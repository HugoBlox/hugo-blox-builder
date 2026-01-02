/**
 * Notification/Toast System for Hugo Blox Kit
 * Provides reusable notification functionality
 */

import {hugoEnvironment} from "@params";

// Debug mode based on environment
const isDebugMode = hugoEnvironment === "development";

/**
 * Show a notification message using Tailwind styles
 * @param {string} message - The message to display
 * @param {string} type - The type of notification ('success', 'error', 'info', 'warning')
 * @param {number} duration - Duration in milliseconds (default 3000)
 * @returns {HTMLElement} - The notification element
 */
export function showNotification(message, type = "success", duration = 3000) {
  // Get or create the notification container
  const container = getOrCreateContainer();

  // Remove any existing notifications with same message
  const existingNotification = container.querySelector(".hb-notification");
  if (existingNotification?.textContent?.includes(message)) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = createNotificationElement(message, type);

  // Add to container
  container.appendChild(notification);

  // Handle close button
  const closeBtn = notification.querySelector(".hb-notification-close");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      removeNotification(notification);
    });
  }

  // Auto-remove after duration
  if (duration > 0) {
    setTimeout(() => {
      removeNotification(notification);
    }, duration);
  }

  return notification;
}

/**
 * Get or create the notification container
 * @returns {HTMLElement} - The container element
 */
function getOrCreateContainer() {
  let container = document.getElementById("hb-notification-container");

  if (!container) {
    if (isDebugMode) {
      console.warn("Notification container not found, creating fallback");
    }
    container = document.createElement("div");
    container.id = "hb-notification-container";
    container.className = "fixed top-20 right-4 z-[9999] pointer-events-none";
    container.setAttribute("aria-live", "polite");
    container.setAttribute("aria-atomic", "true");
    document.body.appendChild(container);
  }

  return container;
}

/**
 * Create a notification element
 * @param {string} message - The message to display
 * @param {string} type - The type of notification
 * @returns {HTMLElement} - The notification element
 */
function createNotificationElement(message, type) {
  const notification = document.createElement("div");
  notification.setAttribute("role", "alert");

  // Define colors for different types
  const colors = {
    success: {bg: "#10b981", bgClass: "bg-green-500"},
    error: {bg: "#ef4444", bgClass: "bg-red-500"},
    info: {bg: "#3b82f6", bgClass: "bg-blue-500"},
    warning: {bg: "#f59e0b", bgClass: "bg-amber-500"},
  };

  const color = colors[type] || colors.info;

  // Set classes
  notification.className = `hb-notification pointer-events-auto flex items-center gap-2 px-4 py-3 text-white rounded-lg shadow-lg ${color.bgClass} animate-slide-in`;

  // Add inline styles as fallback
  notification.style.cssText = `
    background-color: ${color.bg};
    color: white;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    margin-bottom: 0.5rem;
    pointer-events: auto;
  `;

  // Add icon based on type
  const icons = {
    success:
      '<svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>',
    error:
      '<svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>',
    info: '<svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>',
    warning:
      '<svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>',
  };

  const icon = icons[type] || icons.info;

  notification.innerHTML = `
    ${icon}
    <span class="text-sm font-medium">${message}</span>
    <button class="hb-notification-close ml-2 text-white/80 hover:text-white transition-colors" aria-label="Close">
      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
      </svg>
    </button>
  `;

  // Ensure animation styles exist
  ensureAnimationStyles();

  return notification;
}

/**
 * Remove notification with animation
 * @param {HTMLElement} notification - The notification element to remove
 */
export function removeNotification(notification) {
  if (!notification || !notification.parentNode) return;

  notification.classList.remove("animate-slide-in");
  notification.classList.add("animate-slide-out");

  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 300);
}

/**
 * Ensure animation styles are in the document
 */
function ensureAnimationStyles() {
  if (!document.querySelector("#hb-notification-styles")) {
    const style = document.createElement("style");
    style.id = "hb-notification-styles";
    style.textContent = `
      @keyframes slide-in {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      @keyframes slide-out {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
      .animate-slide-in {
        animation: slide-in 0.3s ease-out;
      }
      .animate-slide-out {
        animation: slide-out 0.3s ease-out;
      }
    `;
    document.head.appendChild(style);
  }
}

// Export default for convenience
export default showNotification;
