# Hugo Blox Tailwind CSS v4 Structure

## Overview

The CSS architecture is modularized for maintainability and organization. The entry point is `main.css` which orchestrates all imports.

## Directory Structure

```
css/
├── main.css                 # Main entry point
├── color-utilities.css      # HB Theme Engine
├── config/                  # Tailwind configuration
│   ├── tailwind.css        # Tailwind v4 directives (@source, @custom-variant)
│   ├── theme.css           # HB Theme variables (@theme block)
│   └── safelist.css        # Dynamic classes safelist
├── framework/              # Hugo Blox framework styles
│   ├── base.css           # Base styles and typography
│   └── components.css     # Framework components
├── components/            # Hugo Blox module components
│   └── all.css           # Imports all component files
├── blox/                 # Block-specific styles
│   └── all.css          # Imports all block styles
└── views/               # Listing view styles
    └── all.css         # Imports all listing view styles
```

## Key Files

### main.css
The orchestrator that imports everything in the correct order:
1. Tailwind base
2. Configuration
3. Base styles
4. Hugo Blox theme engine
5. Components
6. Safelist

### config/tailwind.css
Contains Tailwind v4-specific directives:
- `@source` - Where to scan for classes
- `@custom-variant` - Custom variants (dark, hover)
- `@plugin` - Plugin imports

### config/theme.css
Defines the theme using `@theme` block:
- Color palettes (primary, secondary, neutral)
- Font families and sizes
- Custom properties

### color-utilities.css
Hugo Blox theme engine with color utility classes:
- All color shades (50-950)
- All variants (hover, dark, focus)
- Gradient utilities

## Tailwind v4 Notes

- `@source`, `@theme`, `@plugin` are new v4 directives
- Linters may show warnings for these - they can be ignored
- Hugo's `css.TailwindCSS` function processes this automatically
- No PostCSS configuration needed anymore

## Maintenance

When adding new styles:
1. Framework classes → `framework/components.css`
2. Theme variables → `config/theme.css`
3. Component styles → `components/[file].css`
4. Dynamic classes → Add to `config/safelist.css`
