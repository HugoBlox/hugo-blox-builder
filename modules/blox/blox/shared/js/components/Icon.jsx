// biome-ignore lint/correctness/noUnusedImports: Classic Preact JSX runtime may require 'h' for JSX transform
import {h} from "preact";

/**
 * Icon component
 * Renders an SVG icon from a raw SVG string passed from Hugo.
 * Decodes JSON-escaped sequences (\u003c) and HTML entities (&lt;, &quot;, &#34;).
 */
export const Icon = ({svg, attributes}) => {
  if (!svg) return null;

  let decoded = String(svg)
    .replace(/\\u003c/gi, "<")
    .replace(/\\u003e/gi, ">")
    .replace(/\\u0026/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#34;/gi, '"')
    .replace(/&amp;/gi, "&");

  const hasWrapper = /<svg[\s>]/i.test(decoded);

  if (hasWrapper) {
    if (/<svg[^>]*class=/i.test(decoded)) {
      decoded = decoded.replace(/<svg([^>]*?)class="([^"]*)"([^>]*)>/i, '<svg$1class="$2 inline-block w-4 h-4"$3>');
    } else {
      decoded = decoded.replace(/<svg\b/i, '<svg class="inline-block w-4 h-4"');
    }

    // eslint-disable-next-line lint/security/noDangerouslySetInnerHtml
    return <span class="inline-block" dangerouslySetInnerHTML={{__html: decoded}} />;
  }

  const finalAttributes = {
    class: "inline-block w-4 h-4",
    fill: "currentColor",
    viewBox: "0 0 20 20",
    ...(attributes || {}),
  };

  const attrs = Object.entries(finalAttributes)
    .map(([k, v]) => `${k}="${String(v)}"`)
    .join(" ");

  // eslint-disable-next-line lint/security/noDangerouslySetInnerHtml
  return <span class="inline-block" dangerouslySetInnerHTML={{__html: `<svg ${attrs}>${decoded}</svg>`}} />;
};
