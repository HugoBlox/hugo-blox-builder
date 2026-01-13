# Slides module (Reveal.js)

A Hugo Blox module for [Reveal.JS](https://revealjs.com/).

Empowers you to easily create, share, and present slide decks using the open, future-proof Markdown standard.

Supports math, syntax highlighting, diagrams, speaker notes, and much more!

## Install

1. Add the module to your `config/_default/config.yaml`:

   ```yaml
   module:
     imports:
       - path: github.com/HugoBlox/kit/modules/slides
   ```

## Branding & Customization

### Logo and Overlays

Add consistent branding across all slides by configuring `slides.branding` in your site config or slide front matter:

```yaml
# In hugo.yaml (site-wide) or slide front matter (per-deck)
params:
  slides:
    branding:
      logo:
        filename: "logo.png"       # File in assets/media/
        position: "top-left"       # top-left, top-right, bottom-left, bottom-right
        width: "80px"              # Logo width
        margin: "20px"             # Distance from edges
      title:
        show: true                 # Show presentation title overlay
        text: "Short Title"        # Optional: Override auto-detected title
        position: "bottom-left"
      author:
        show: true                 # Show author name overlay
        position: "bottom-right"
      footer:
        text: "© 2026 Copyright"   # Footer text (e.g. copyright)
        position: "bottom-center"  # bottom-center, bottom-left, bottom-right

```

### Hooks System

Inject custom content into presentations without modifying module files. Create partials in your project's `layouts/_partials/hooks/` directory:

| Hook | Location | Use Case |
|------|----------|----------|
| `slide-header/` | Top of presentation | Course code, session info |
| `slide-footer/` | Bottom of presentation | Social handles, copyright |
| `slide-head-end/` | End of `<head>` | Custom CSS, fonts, analytics |
| `slide-body-end/` | End of `<body>` | Custom JS, Reveal.js plugins |

Example: Create `layouts/_partials/hooks/slide-footer/social.html`:

```html
<div style="font-size: 0.5em; opacity: 0.6;">
  @yourhandle · yoursite.com
</div>
```

See `_example.html` files in each hook directory for more examples.

## Per-Slide Visibility

Control branding visibility on individual slides using HTML comments:

- `<!-- no-branding -->`: Hide all branding elements (logo, header, footer)
- `<!-- no-header -->`: Hide only the header (and logo)
- `<!-- no-footer -->`: Hide only the footer

Example:

```markdown
---

<!-- no-branding -->

## Full Screen Image Slide

This slide will have no branding overlays.
```

## Usage

[View the documentation](https://docs.hugoblox.com/content/slides/)
