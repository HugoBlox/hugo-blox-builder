/**
 * Vite Configuration for Vendoring JavaScript Libraries
 *
 * This config is used by Hugo Blox maintainers to copy third-party
 * JavaScript libraries from node_modules into the Hugo module's assets.
 *
 * Usage: pnpm run vendor:libs
 */

import {resolve} from "node:path";
import del from "rollup-plugin-delete";
import {defineConfig} from "vite";
import {viteStaticCopy} from "vite-plugin-static-copy";

const MODULE_DIR = "modules/blox";
const OUTPUT_DIR = resolve(MODULE_DIR, "assets/dist/lib");

export default defineConfig({
  build: {
    emptyOutDir: true,
    outDir: OUTPUT_DIR,
    lib: {
      entry: resolve(MODULE_DIR, "assets/js/vendor-libs.js"),
      formats: ["es"],
      fileName: "vendor-libs",
    },
    rollupOptions: {
      // Don't bundle these libraries, just copy them
      external: ["mermaid", "plotly.js", "katex", "markmap-autoloader", "alpinejs"],
    },
  },

  plugins: [
    // Copy vendor libraries to module assets
    viteStaticCopy({
      targets: [
        // Mermaid - Diagram rendering
        {
          src: "node_modules/mermaid/dist/mermaid.min.js",
          dest: "mermaid/",
        },

        // Plotly - Interactive charts
        {
          src: "node_modules/plotly.js/dist/plotly.min.js",
          dest: "plotly/",
        },

        // KaTeX - Math rendering
        {
          src: "node_modules/katex/dist/katex.min.js",
          dest: "katex/",
        },
        {
          src: "node_modules/katex/dist/katex.min.css",
          dest: "katex/",
        },
        {
          src: "node_modules/katex/dist/contrib/auto-render.min.js",
          dest: "katex/",
        },
        {
          src: "node_modules/katex/dist/fonts/",
          dest: "katex/",
        },

        // Markmap - Mind map rendering
        {
          src: "node_modules/markmap-autoloader/dist/index.js",
          dest: "markmap/",
        },
        // Alpine.js
        {
          src: "node_modules/alpinejs/dist/cdn.min.js",
          dest: "alpinejs/",
        },

        // Preact for interactive components
        {
          src: "node_modules/preact/dist/preact.min.js",
          dest: "preact/",
        },
        {
          src: "node_modules/preact/dist/preact.min.js.map",
          dest: "preact/",
        },
        {
          src: "node_modules/preact/hooks/dist/hooks.umd.js",
          dest: "preact/",
          rename: "hooks.min.js",
        },
      ],
    }),

    // Clean up any unwanted build artifacts
    del({
      targets: `${OUTPUT_DIR}/vendor-libs.js`, // Remove the dummy entry file
      hook: "writeBundle",
    }),
  ],
});
