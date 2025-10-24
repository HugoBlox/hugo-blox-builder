# Logos Block

Display partner, sponsor, or collaborator logos with modern interactive effects and multiple display modes. Perfect for showcasing affiliations, building trust, and highlighting collaborations.

## Features

- **Multiple Display Modes**: Grid, carousel, or marquee layouts
- **Interactive Effects**: Grayscale to color on hover, smooth scaling
- **Clickable Logos**: Link to partner websites
- **Hover Tooltips**: Show partner descriptions on hover
- **Responsive Design**: Adapts perfectly to all screen sizes
- **Smooth Animations**: Professional transitions and effects
- **Flexible Configuration**: Use structured data or folder-based logos
- **Performance Optimized**: Lazy loading and WebP format support
- **Dark Mode Support**: Seamless theme switching

## Display Modes

### Grid Mode (Default)
Classic responsive grid layout with hover effects:
- 2 columns on mobile
- 3-6 columns on larger screens
- Grayscale to color transition on hover
- Scale animation on hover

### Carousel Mode
Auto-scrolling horizontal carousel:
- Continuous smooth scrolling
- Pauses on hover
- Duplicate items for seamless loop
- Ideal for many logos

### Marquee Mode
Traditional marquee scroll effect:
- Continuous horizontal movement
- Lightweight and performant
- Good for header/footer placement

## Usage

### Basic Grid Layout
```yaml
sections:
  - block: logos
    content:
      title: Our Partners & Collaborators
      subtitle: Working with leading institutions worldwide
      text: We collaborate with top universities and research centers
      logos:
        - name: MIT
          image: partners/mit.png
          url: https://mit.edu
          description: Massachusetts Institute of Technology
        - name: Stanford University
          image: partners/stanford.svg
          url: https://stanford.edu
          description: Leading research university
        - name: Google Research
          image: partners/google.png
          url: https://research.google
          description: AI and ML research
        - name: Microsoft Research
          image: partners/microsoft.svg
          url: https://www.microsoft.com/research
          description: Computing research lab
    design:
      display_mode: grid
      css_class: "bg-gray-50 dark:bg-gray-900"
```

### Carousel Display
```yaml
sections:
  - block: logos
    content:
      title: Trusted By Industry Leaders
      logos:
        # Add 8-12 logos for best carousel effect
        - name: Company 1
          image: sponsors/company1.png
          url: https://example.com
        # ... more logos
    design:
      display_mode: carousel
```

### Legacy Folder Mode
For backward compatibility or quick setup:
```yaml
sections:
  - block: logos
    content:
      title: Our Sponsors
      logo_folder: sponsors  # Loads all images from assets/media/sponsors/
    design:
      display_mode: grid
```

## Options

### Content Options

- **title**: Main heading for the section
- **subtitle**: Optional subtitle (shown in accent color)
- **text**: Description text below title
- **logos**: Array of logo configurations
  - `name`: Partner/sponsor name (shown in tooltip)
  - `image`: Path relative to `assets/media/`
  - `url`: Website URL
  - `external`: Open in new tab (default: true)
  - `description`: Hover tooltip text
- **logo_folder**: Legacy option to load all images from a folder
- **cta**: Optional call-to-action button
  - `text`: Button text
  - `url`: Button link
  - `icon`: Optional icon

### Design Options

- **display_mode**: Choose layout style
  - `grid`: Responsive grid (default)
  - `carousel`: Auto-scrolling carousel
  - `marquee`: Classic marquee effect
- **show_pattern**: Add decorative background pattern (default: false)

## Image Guidelines

### Recommended Formats
- **SVG**: Best for logos (scalable, small file size)
- **PNG**: For logos with transparency
- **WebP**: Modern format with best compression

### Size Recommendations
- **Grid Mode**: 280x140px (will be auto-fitted)
- **Carousel Mode**: 280x140px minimum
- **Aspect Ratio**: 2:1 or square works best

### Optimization Tips
1. Use SVG when possible for crisp rendering
2. Optimize PNGs with tools like TinyPNG
3. Keep file sizes under 50KB per logo
4. Use consistent dimensions for visual harmony

## Styling

### Hover Effects
- Grayscale filter removed on hover
- Opacity increases from 60% to 100%
- Smooth scale transformation (110%)
- Background highlight on hover

### Custom CSS
Add custom styles to enhance the block:

```css
/* Example: Custom logo sizing */
.logos-block img {
  max-height: 80px;
}

/* Example: Remove grayscale on specific logo */
.partner-featured img {
  filter: none !important;
  opacity: 1 !important;
}
```

## Best Practices

1. **Logo Quality**: Use high-resolution logos (2x display size)
2. **Consistency**: Keep logos similar in visual weight
3. **Accessibility**: Always provide alt text via `name` field
4. **Performance**: Optimize images before adding
5. **Responsive**: Test on mobile devices
6. **Links**: Verify all external links work
7. **Copyright**: Ensure you have permission to display logos

## Examples

### Research Lab Partners
```yaml
logos:
  - name: National Science Foundation
    image: partners/nsf.svg
    url: https://nsf.gov
    description: Federal funding agency
  - name: NIH
    image: partners/nih.png
    url: https://nih.gov
    description: National Institutes of Health
```

### Conference Sponsors
```yaml
logos:
  - name: Gold Sponsor - Microsoft
    image: sponsors/microsoft-gold.png
    url: https://microsoft.com
    description: Gold level sponsor
```

### Industry Collaborations
```yaml
logos:
  - name: OpenAI
    image: collaborators/openai.svg
    url: https://openai.com
    description: AI research partnership
```

## Animation Speed

To adjust animation speeds, modify the CSS:

```yaml
design:
  css_style: |
    .animate-marquee { animation-duration: 20s; }
    .animate-scroll { animation-duration: 30s; }
```
