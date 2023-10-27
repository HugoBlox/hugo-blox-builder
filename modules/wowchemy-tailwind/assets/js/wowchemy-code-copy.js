import {hugoEnvironment, i18n} from '@params';
console.debug(`Environment: ${hugoEnvironment}`);

async function copyCodeToClipboard(button, codeWrapper) {
  const codeToCopy = codeWrapper.textContent;
  try {
    if ('clipboard' in navigator) {
      // Note: Clipboard API requires HTTPS or localhost
      await navigator.clipboard.writeText(codeToCopy);
    } else {
      console.error('Failed to copy. Dead browser.')
    }
  } catch (_) {
    console.error('Failed to copy. Check permissions...')
  } finally {
    copiedNotification(button);
  }
}

function copiedNotification(copyBtn) {
  copyBtn.innerHTML = i18n['copied'];
  setTimeout(() => {
    copyBtn.innerHTML = i18n['copy'];
  }, 2000);
}

// Code block copy button
window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('pre > code').forEach((codeblock) => {
    const container = codeblock.parentNode.parentNode;

    // Create copy button
    const copyBtn = document.createElement('button');
    let classesToAdd = ['copy-button'];
    copyBtn.classList.add(...classesToAdd);
    copyBtn.innerHTML = i18n['copy'];

    // There are 3 kinds of code block wrappers in Hugo, handle them all.
    let wrapper;
    if (container.classList.contains('highlight')) {
      // Parent when Hugo line numbers disabled
      wrapper = container;
    } else if (codeblock.parentNode.parentNode.parentNode.parentNode.parentNode.nodeName === 'TABLE') {
      // Parent when Hugo line numbers enabled
      wrapper = codeblock.parentNode.parentNode.parentNode.parentNode.parentNode;
    } else {
      // Parent when Hugo `highlight` class not applied to code block
      // Hugo only applies `highlight` class when a language is specified on the Markdown block
      // But we need the `highlight` style to be applied so that absolute button has relative block parent
      codeblock.parentElement.classList.add('highlight');
      wrapper = codeblock.parentNode;
    }
    copyBtn.addEventListener("click", () => copyCodeToClipboard(copyBtn, wrapper));
    wrapper.appendChild(copyBtn);
  });
});
