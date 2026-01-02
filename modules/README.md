# HugoBlox Kit Modules

Install HugoBlox features as **Hugo Modules**.

## Quick start (most sites)

Add HugoBlox Kit core to `config/_default/module.yaml` (or `hugo.yaml`):

```yaml
module:
  imports:
    - path: github.com/HugoBlox/kit/modules/blox
```

That’s it — **`analytics` is already included** when you use `modules/blox`.

## Module map

- **Core framework**: `github.com/HugoBlox/kit/modules/blox`
  - Layouts, blocks (Blox), Tailwind pipeline, shortcodes, defaults
  - Includes: `github.com/HugoBlox/kit/modules/analytics`
- **Slides (content type)**: `github.com/HugoBlox/kit/modules/slides`
  - Markdown slide decks (powered by Reveal.js)
- **Integrations**: `github.com/HugoBlox/kit/modules/integrations/*`
  - Netlify: `github.com/HugoBlox/kit/modules/integrations/netlify`

## Optional installs

### Slides

```yaml
module:
  imports:
    - path: github.com/HugoBlox/kit/modules/blox
    - path: github.com/HugoBlox/kit/modules/slides
```

### Netlify integration (security headers + redirects outputs)

```yaml
module:
  imports:
    - path: github.com/HugoBlox/kit/modules/blox
    - path: github.com/HugoBlox/kit/modules/integrations/netlify
```

Then enable Hugo outputs for Netlify:

```yaml
outputs:
  home: [HTML, RSS, headers, redirects]
```

## Updating

```bash
hugo mod get -u github.com/HugoBlox/kit/modules/blox@main
hugo mod tidy
```
