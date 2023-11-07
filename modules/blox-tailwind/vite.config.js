import {defineConfig} from 'vite'
import {viteStaticCopy} from 'vite-plugin-static-copy'
import {rm} from 'node:fs/promises'

const distDir = './assets/dist/lib';


export default defineConfig({
  build: {
    // Wipe `assets/dist/lib/` first to remove old artifacts prior to copying latest assets across.
    emptyOutDir: true,
    outDir: distDir,
    rollupOptions: {
      // Vite requires us to provide an input even though we want to build site with Hugo instead.
      input: 'layouts/index.html',
    },
  },
  plugins: [viteStaticCopy({
    targets: [{
      "src": "node_modules/mermaid/dist/mermaid.min.js", "dest": "mermaid/"
    }, {
      "src": "node_modules/plotly.js/dist/plotly.min.js", "dest": "plotly/"
    }, {
      "src": "node_modules/katex/dist/katex.min.js", "dest": "katex/"
    }, {
      "src": "node_modules/katex/dist/katex.min.css", "dest": "katex/"
    }, {
      "src": "node_modules/katex/dist/contrib/auto-render.min.js", "dest": "katex/"
    }, {
      "src": "node_modules/katex/dist/fonts/", "dest": "katex/"
    }, {
      "src": "node_modules/markmap-autoloader/dist/index.js", "dest": "markmap/"
    },
    ],
    hook: "buildStart", enforce: 'pre'
  }), {
    name: "Cleaning assets folder", async closeBundle() {
      await rm(distDir + '/layouts', {recursive: true, force: true});
    },
  },]
})
