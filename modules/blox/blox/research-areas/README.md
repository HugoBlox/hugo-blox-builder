# Research Areas Block

Display your research focus areas with stunning visuals, metrics, and interactive layouts. Perfect for research labs, academic groups, and R&D departments to showcase their areas of expertise.

## Features

- **Multiple Layout Options**: Cards, hexagon, or timeline layouts
- **Rich Visual Options**: Icons, emojis, images, or gradient backgrounds
- **Metrics Display**: Team size, publications, funding
- **Interactive Elements**: Hover effects, status badges, CTAs
- **Topic Keywords**: Highlight key research topics
- **Responsive Design**: Beautiful on all devices
- **Dark Mode Support**: Seamless theme switching
- **Performance Optimized**: Lazy loading and WebP support

## Layout Options

### Cards Layout (Default)
Modern card-based design with:
- Large visual header (image/icon/emoji)
- Rich content area
- Hover animations
- Status badges
- Metrics display

### Hexagon Layout
Unique hexagonal grid for visual impact:
- Geometric design
- Gradient backgrounds
- Compact information display
- Great for 3-6 areas

### Timeline Layout
Chronological or priority-based display:
- Vertical timeline
- Alternating left/right cards
- Visual progression
- Good for research evolution

## Usage Examples

### Basic Research Areas with Cards
```yaml
sections:
  - block: research-areas
    content:
      title: Research Focus Areas
      subtitle: Advancing Science Through Innovation
      text: Our lab conducts cutting-edge research across multiple domains
      items:
        - name: Computational Biology
          description: Developing algorithms for genomic analysis and protein structure prediction
          emoji: 🧬
          gradient: from-green-400 to-blue-500
          status: active
          topics:
            - Genomics
            - Proteomics
            - Bioinformatics
            - Systems Biology
          team_size: 12 researchers
          publications: 45 papers
          funding: $2.5M
          cta:
            text: Learn More
            url: /research/computational-biology

        - name: Machine Learning
          description: Advancing deep learning methods for scientific discovery
          emoji: 🤖
          gradient: from-purple-400 to-pink-500
          status: active
          topics:
            - Deep Learning
            - Neural Networks
            - Computer Vision
            - NLP
          team_size: 8 researchers
          publications: 32 papers
          funding: $1.8M

        - name: Materials Science
          description: Designing novel materials through computational modeling
          emoji: 🔬
          gradient: from-orange-400 to-red-500
          status: emerging
          topics:
            - Nanomaterials
            - Quantum Materials
            - Polymers
          team_size: 6 researchers
          publications: 28 papers
          funding: $1.2M
    design:
      layout: cards
```

### Using Icons Instead of Emojis
```yaml
items:
  - name: Artificial Intelligence
    description: Building next-generation AI systems
    icon: hero/cpu-chip
    gradient: from-blue-500 to-indigo-600
    # ... rest of configuration
```

### Using Images
```yaml
items:
  - name: Climate Science
    description: Understanding and mitigating climate change
    image: research/climate-hero.jpg
    status: active
    # ... rest of configuration
```

### Hexagon Layout for Visual Impact
```yaml
sections:
  - block: research-areas
    content:
      title: Core Research Pillars
      items:
        - name: AI & ML
          description: Artificial intelligence research
          icon: hero/cpu-chip
          gradient: from-blue-400 to-purple-600
        - name: Quantum
          description: Quantum computing systems
          icon: hero/sparkles
          gradient: from-green-400 to-teal-600
        # ... more items
    design:
      layout: hexagon
```

### Timeline Layout for Evolution
```yaml
sections:
  - block: research-areas
    content:
      title: Research Evolution
      subtitle: Our Journey of Discovery
      items:
        - name: Foundation (2015-2018)
          description: Established core ML research
          icon: hero/academic-cap
        - name: Expansion (2018-2021)
          description: Added biomedical applications
          icon: hero/beaker
        - name: Current Focus (2021-Present)
          description: AI for scientific discovery
          icon: hero/sparkles
    design:
      layout: timeline
```

## Configuration Options

### Content Options

- **title**: Main section heading
- **subtitle**: Section subtitle (accent color)
- **text**: Description paragraph
- **items**: Array of research areas
  - `name`: Area name (required)
  - `description`: Area description (required)
  - `icon`: Icon identifier (e.g., 'hero/beaker')
  - `emoji`: Emoji alternative to icon
  - `image`: Image path relative to assets/media/
  - `gradient`: Tailwind gradient classes
  - `url`: Link to detailed page
  - `status`: 'active', 'emerging', or 'planning'
  - `topics`: Array of keywords/topics
  - `team_size`: Team member count
  - `publications`: Publication count
  - `funding`: Funding amount
  - `cta`: Individual area CTA with text and url
- **cta**: Global call-to-action button

### Design Options

- **layout**: Visual layout style
  - `cards`: Modern card grid (default)
  - `hexagon`: Hexagonal grid
  - `timeline`: Vertical timeline

## Visual Guidelines

### Gradients
Use Tailwind gradient classes for visual appeal:
```yaml
gradient: from-blue-400 to-purple-600
gradient: from-green-500 to-teal-400
gradient: from-orange-400 to-red-500
```

### Icons vs Emojis vs Images
- **Icons**: Professional, consistent style
- **Emojis**: Friendly, universal, no loading
- **Images**: Rich visuals, specific imagery

### Status Badges
- `active`: Green - Currently active research
- `emerging`: Yellow - Growing area
- `planning`: Blue - Future direction

## Best Practices

1. **Consistency**: Use the same visual type (icons OR emojis OR images) across all areas
2. **Metrics**: Include quantifiable achievements
3. **Keywords**: 3-5 relevant topics per area
4. **Descriptions**: Keep concise (50-100 words)
5. **CTAs**: Link to detailed pages for each area
6. **Gradients**: Choose complementary colors
7. **Status**: Be transparent about research maturity

## Responsive Behavior

### Cards Layout
- Mobile: Single column
- Tablet: 2 columns
- Desktop: 3 columns

### Hexagon Layout
- Mobile: Stacked hexagons
- Desktop: Honeycomb grid

### Timeline Layout
- Mobile: Single column timeline
- Desktop: Alternating left/right

## Performance Tips

1. **Images**: Optimize to <100KB
2. **WebP Format**: Use for better compression
3. **Lazy Loading**: Automatic for images
4. **Icon Usage**: Prefer icons/emojis over images for speed

## Accessibility

- Semantic HTML structure
- Proper heading hierarchy
- Alt text for images
- Keyboard navigable
- Screen reader friendly
- High contrast for text

## Examples by Field

### AI/ML Lab
```yaml
items:
  - name: Deep Learning
    emoji: 🧠
    gradient: from-purple-500 to-pink-500
  - name: Computer Vision
    emoji: 👁️
    gradient: from-blue-500 to-cyan-500
  - name: NLP
    emoji: 💬
    gradient: from-green-500 to-teal-500
```

### Biology Lab
```yaml
items:
  - name: Genomics
    emoji: 🧬
    gradient: from-green-400 to-emerald-600
  - name: Cell Biology
    emoji: 🦠
    gradient: from-purple-400 to-indigo-600
  - name: Neuroscience
    emoji: 🧠
    gradient: from-pink-400 to-rose-600
```

### Physics Lab
```yaml
items:
  - name: Quantum Computing
    emoji: ⚛️
    gradient: from-indigo-500 to-purple-600
  - name: Particle Physics
    emoji: 🌌
    gradient: from-blue-500 to-indigo-600
  - name: Condensed Matter
    emoji: 💎
    gradient: from-cyan-500 to-blue-600
```
