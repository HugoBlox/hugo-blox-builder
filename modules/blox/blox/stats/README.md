# Stats Block

Display impressive statistics with modern animations, icons, and engaging visual effects. Perfect for showcasing lab achievements, research metrics, and organizational highlights.

## Key Features

- **🎬 Counter Animations**: Numbers count up on scroll with easing
- **📊 Visual Icons**: Icons for each statistic enhance comprehension
- **🎨 Multiple Layouts**: Cards, compact, or minimal display modes
- **📱 Responsive Design**: Adapts beautifully to all screen sizes
- **🌙 Dark Mode Ready**: Seamless theme switching
- **⚡ Performance**: CSS-first animations with minimal JavaScript
- **🎯 Intersection Observer**: Animations trigger when scrolled into view
- **✨ Hover Effects**: Subtle interactions for engagement

## Layout Options

### Cards Layout (Default)
Modern card-based design featuring:
- Individual cards with shadows and hover effects
- Icons with background circles
- Gradient hover states
- Staggered animation entry
- Optimal for 2-4 statistics

### Compact Layout
Single card with divided sections:
- Unified background
- Bordered divisions
- Space-efficient
- Good for 3-6 statistics

### Minimal Layout
Clean, icon-centric design:
- No backgrounds or borders
- Focus on typography
- Suitable for headers/footers
- Works well with many statistics

## Usage Examples

### Research Lab Metrics (Enhanced)
```yaml
sections:
  - block: stats
    content:
      title: Impact by the Numbers
      text: Driving scientific discovery through measurable achievements
      items:
        - statistic: "150+"
          description: Publications in top-tier journals
          sub_metric: Nature, Science, Cell, PNAS
          icon: hero/document-text
          
        - statistic: "25"
          description: Brilliant researchers and scientists
          sub_metric: From 12 countries worldwide
          icon: hero/user-group
          
        - statistic: "$12M"
          description: Active research funding
          sub_metric: NSF, NIH, DOE grants
          icon: hero/currency-dollar
          
        - statistic: "8"
          description: Breakthrough discoveries
          sub_metric: Patent applications filed
          icon: hero/light-bulb
    design:
      layout: cards
      css_class: "bg-gradient-to-b from-primary-50 to-white dark:from-primary-900/20 dark:to-gray-800"
```

### University Department Stats
```yaml
content:
  items:
    - statistic: "2,500"
      description: Students enrolled
      icon: hero/academic-cap
    - statistic: "95%"
      description: Graduation rate
      icon: hero/chart-bar
    - statistic: "40+"
      description: Countries represented
      icon: hero/globe-alt
design:
  layout: compact
```

### Startup Metrics
```yaml
content:
  items:
    - statistic: "$2.5M"
      description: Funding raised
      icon: hero/banknotes
    - statistic: "10K+"
      description: Active users
      icon: hero/users
    - statistic: "98.5%"
      description: Uptime reliability
      icon: hero/chart-line
design:
  layout: minimal
```

## Animation Features

### Counter Animation
- **Easing**: Smooth ease-out cubic function
- **Duration**: 2 seconds for optimal viewing
- **Trigger**: Intersection Observer when 50% visible
- **Number Extraction**: Automatically extracts numbers from text

### Entrance Animation
- **Staggered Entry**: Items animate in sequence
- **Fade + Slide**: Combines opacity and translateY
- **Delay Timing**: 150ms between items
- **Threshold**: Triggers 100px before entering viewport

### Hover Effects
- **Scale Transform**: Icons scale 110% on hover
- **Color Transitions**: Text color changes
- **Background Glow**: Subtle gradient overlay
- **Shadow Enhancement**: Deeper shadows on hover

## Configuration Options

### Content Fields
- **title**: Optional section heading
- **text**: Optional description
- **items**: Array of statistics
  - `statistic`: Number or value (required)
  - `description`: What the number represents (required)
  - `icon`: Icon identifier (optional)
  - `sub_metric`: Additional context (optional)

### Design Options
- **layout**: Visual layout
  - `cards`: Individual cards (default)
  - `compact`: Single divided card
  - `minimal`: Clean typography focus

## Icon Guidelines

### Recommended Icons for Common Stats

**Publications/Research:**
- `hero/document-text` - Publications
- `hero/beaker` - Research projects
- `hero/light-bulb` - Discoveries/innovations
- `hero/trophy` - Awards/recognition

**People/Team:**
- `hero/user-group` - Team members
- `hero/academic-cap` - Students/graduates
- `hero/users` - Community/users
- `hero/heart` - Satisfaction ratings

**Financial/Business:**
- `hero/currency-dollar` - Funding/revenue
- `hero/banknotes` - Investments
- `hero/chart-bar` - Growth metrics
- `hero/building-office` - Locations

**Technology/Digital:**
- `hero/cpu-chip` - Computing power
- `hero/globe-alt` - Global reach
- `hero/chart-line` - Performance metrics
- `hero/server` - Infrastructure

## Performance Notes

### JavaScript Usage
Minimal JavaScript for:
- Intersection Observer (viewport detection)
- Counter animation (number progression)
- Modern browser APIs only

### CSS Animations
- Hardware accelerated transforms
- Optimized for 60fps
- Respects `prefers-reduced-motion`
- Fallbacks for older browsers

### Image Optimization
- SVG icons preferred (scalable, fast)
- WebP fallbacks for raster images
- Lazy loading for non-critical images

## Best Practices

1. **Number Selection**: Choose impactful, verifiable metrics
2. **Descriptions**: Keep concise but descriptive
3. **Icons**: Match icons to metric meaning
4. **Sub-metrics**: Add credibility with specific details
5. **Layout**: Choose based on number of items (2-4: cards, 5+: compact)
6. **Consistency**: Use similar metric types (all percentages, all counts)
7. **Context**: Include timeframes where relevant

## Advanced Customization

### Custom Animations
Override animation timing:
```css
.stats-item {
  transition-duration: 1s;
  transition-delay: 0.2s;
}
```

### Custom Counters
For complex number formatting:
```yaml
statistic: "99.9%"  # Will animate 0 → 99
statistic: "$2.5M"  # Will animate 0 → 2.5
statistic: "1st"    # Will animate 0 → 1
```

### Accessibility
- Numbers are announced by screen readers
- Animations respect motion preferences
- High contrast maintained
- Keyboard navigation supported

The enhanced Stats block creates visual impact while maintaining professional credibility - essential for research lab websites targeting academic and industry audiences.