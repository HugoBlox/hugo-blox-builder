# Hugo Blox Tailwind UI

The Hugo Blox web framework utilizing [Tailwind CSS v4](https://tailwindcss.com/) with Hugo's native integration for styling components with Tailwind v4.

## Requirements

- Hugo v0.148.2+ (Extended Edition)
- Node.js v20+ 
- pnpm (see `packageManager` field in package.json)

## Quick Start

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Run Development Server

```bash
hugo server
```

Tailwind CSS is processed automatically by Hugo using the `css.TailwindCSS` function.

## Features

- **Tailwind CSS v4**: Latest version with improved performance over Tailwind v3
- **Hugo Native Integration**: Uses Hugo's built-in `css.TailwindCSS` function
- **Dynamic CSS Generation**: Only includes utilities actually used in your content for ultra-fast page loads
- **No Pre-compilation**: CSS is generated on-demand (previously Tailwind v3 was pre-compiled in Hugo Blox as `wc.min.css`)
- **Community Components**: Community components work seamlessly without manual compilation

## Configuration

The Tailwind configuration is now in CSS format at `assets/css/main.css` using the `@theme` directive. The configuration includes:

- Hugo Blox color schemes (primary, secondary, neutral)
- Typography settings
- Safelist patterns for dynamic classes
- Dark mode support

## Migration from Tailwind v3

If you're upgrading from Tailwind v3:

1. Install the new dependencies: `pnpm install`
2. Remove any `assets/dist/wc.min.css` files
3. Add the `package.json` file from the latest starter templates
4. Update your deployment scripts to install it with `pnpm install` (refer to the latest `.github` folder in the starters)
5. The old `tailwind.config.js` and `postcss.config.js` files are no longer needed

## Development

For module development:

```bash
# Install dependencies
pnpm install

# Run development server
hugo server --disableFastRender

# Build for production
hugo --minify
```
