# Hugo Blox Tailwind CSS v4 Color System

## Architecture Overview

This system leverages Tailwind CSS v4's automatic utility generation to provide a comprehensive color system with minimal code.

### How It Works

1. **Theme Configuration** (`config/theme.css`)

   - Colors defined in `@theme` block automatically generate ALL utilities
   - Includes standard Tailwind colors: gray, slate, zinc, neutral, stone
   - Includes themeable colors: primary, secondary

2. **Theme Files** (`themes/*.css`)

   - Small files that override `--color-primary-*` and `--color-secondary-*` variables
   - Users switch themes by loading different theme CSS files
   - No utilities redefined - just color values changed

3. **Custom Utilities** (`color-utilities.css`)
   - Only 42 lines vs previous 1,228 lines!
   - Contains only custom colors not auto-generated (like `hb-dark`)

### Available Colors

**Standard Colors (always available):**

- `gray-*` - Neutral grays
- `slate-*` - Cool grays
- `zinc-*` - True grays
- `neutral-*` - Pure grays
- `stone-*` - Warm grays

**Themeable Colors (vary by theme):**

- `primary-*` - Main theme color
- `secondary-*` - Accent theme color

**Custom Colors:**

- `hb-dark` - Hugo Blox brand dark color

### Auto-Generated Utilities

For every color defined in `@theme`, Tailwind automatically creates:

- Background: `bg-{color}-{shade}`
- Text: `text-{color}-{shade}`
- Border: `border-{color}-{shade}`
- Hover: `hover:bg-{color}-{shade}`, `hover:text-{color}-{shade}`
- Dark mode: `dark:bg-{color}-{shade}`, `dark:text-{color}-{shade}`
- Gradients: `from-{color}-{shade}`, `to-{color}-{shade}`
- Focus rings: `focus:ring-{color}-{shade}`
- All other Tailwind color variants

### Shades Available

All colors include 11 shades: `50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950`

### Usage Examples

```html
<!-- Standard colors (always available) -->
<div class="bg-gray-100 dark:bg-gray-800">...</div>
<div class="text-slate-700 hover:text-slate-900">...</div>

<!-- Themeable colors (change with theme) -->
<div class="bg-primary-500 hover:bg-primary-600">...</div>
<div class="bg-gradient-to-r from-primary-600 to-secondary-600">...</div>

<!-- Custom colors -->
<div class="bg-hb-dark text-white">...</div>
```

### Benefits

1. **Dramatically Reduced File Size**: 1,228 lines → 42 lines (97% reduction!)
2. **Automatic Generation**: No manual utility definitions needed
3. **Maintainable**: Add new colors just by defining them in `@theme`
4. **Consistent**: All Tailwind variants automatically available
5. **Themeable**: Easy theme switching via CSS variable overrides

### Adding New Colors

To add a new color scale:

1. Define in `config/theme.css`:

   ```css
   --color-brand-500: 59 130 246;
   --color-brand-600: 37 99 235;
   /* etc. */
   ```

2. Tailwind automatically generates all utilities:
   - `bg-brand-500`, `text-brand-600`, `hover:bg-brand-500`, etc.

No manual utility definitions required!
