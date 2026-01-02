# Search Hero Block

A modern hero section with prominent search functionality, perfect for knowledge bases and documentation sites.

## Features

- 🔍 **Integrated Search** - Opens Hugo Blox search modal
- 💎 **Gradient Text Highlighting** - Eye-catching emphasized text
- 🎨 **Animated Backgrounds** - Gradient mesh with pulsing orbs
- 📊 **Stats Display** - Showcase key metrics
- 🏷️ **Badge Support** - With optional pulsing indicator
- 🔥 **Popular Searches** - Quick suggestion pills
- 📱 **Fully Responsive** - Beautiful on all devices

## Basic Usage

```yaml
sections:
  - block: search-hero
    content:
      title: "Your Knowledge Hub"
      subtitle: "Find answers to all your questions"
```

## Title Highlighting

Use `==text==` syntax to apply gradient highlighting to any words or phrases:

### Single Highlight

```yaml
title: "Master ==AI Tools=="
```

**Result**: "Master" in regular text, "AI Tools" with gradient

### Multiple Highlights

```yaml
title: "Master ==AI Tools==. ==Boost Your Productivity.=="
```

**Result**: Both "AI Tools" and "Boost Your Productivity" highlighted

### Mid-Sentence Highlighting

```yaml
title: "Build ==amazing== websites with ==Hugo Blox=="
```

**Result**: "amazing" and "Hugo Blox" highlighted within the sentence

### i18n-Friendly

```yaml
# en.yaml
- id: hero_title
  translation: "Master ==AI Tools==. ==Boost Productivity.=="

# es.yaml
- id: hero_title
  translation: "Domina ==Herramientas IA==. ==Aumenta Productividad.=="
```

Each language can highlight naturally!

## Complete Example

```yaml
sections:
  - block: search-hero
    content:
      badge:
        text: "500+ AI answers added this week"
        show_pulse: true  # Shows pulsing dot indicator
      
      title: "Master ==AI Tools==. ==Boost Your Productivity.=="
      
      subtitle: "Get instant answers to your AI questions from our comprehensive knowledge base."
      
      search_placeholder: "Ask anything about AI tools, prompts, or workflows..."
      
      suggestions:
        - "ChatGPT prompts"
        - "Midjourney tips"
        - "AI automation"
        - "Claude vs GPT-4"
      
      stats:
        - value: "2,500+"
          label: "Expert Answers"
        - value: "50K+"
          label: "Monthly Users"
        - value: "4.9/5"
          label: "User Rating"
    
    design:
      background:
        gradient_mesh:
          enable: true
          style: "orbs"       # orbs, waves, dots, grid
          animation: "pulse"   # pulse, float, rotate, none
          intensity: "subtle"  # subtle, medium, bold
          colors:
            - "primary-500/20"
            - "primary-600/20"
      spacing:
        padding: ["8rem", "0", "6rem", "0"]
```

## Properties

### Content

#### `badge`
- **Type**: Object
- **Optional**
- **Properties**:
  - `text` (string): Badge text
  - `show_pulse` (boolean): Show pulsing dot indicator

#### `title`
- **Type**: String
- **Required**
- **Description**: Main heading. Use `==text==` for gradient highlighting
- **Example**: `"Build ==Amazing== Websites"`

#### `subtitle`
- **Type**: String
- **Optional**
- **Description**: Supporting text below title

#### `search_placeholder`
- **Type**: String
- **Optional**
- **Default**: "Search for answers..."
- **Description**: Placeholder text in search box

#### `suggestions`
- **Type**: Array of strings
- **Optional**
- **Description**: Quick search suggestion pills
- **Example**: `["Topic 1", "Topic 2"]`

#### `stats`
- **Type**: Array of objects
- **Optional**
- **Description**: Metrics displayed below search
- **Properties**:
  - `value` (string): Metric value (e.g., "2,500+")
  - `label` (string): Metric description

### Design

See [Gradient Mesh Guide](../../../../GRADIENT_MESH_GUIDE.md) for complete background options.

## Styling Tips

### Gradient Colors

The `==text==` highlighting uses:
```css
background: linear-gradient(to-right, primary-600, primary-500);
background-clip: text;
```

This automatically adapts to your site's primary color theme.

### Stat Layout

Stats automatically:
- Display in 3-column grid
- Center-aligned
- Responsive on mobile

### Search Integration

The search button automatically:
- Opens Hugo Blox search modal
- Works with Cmd+K shortcut
- Supports pre-filled queries from suggestions

## Examples

### Knowledge Base (Current)

```yaml
title: "Master ==AI Tools==. ==Boost Your Productivity.=="
```

### Documentation Site

```yaml
title: "==Comprehensive== Documentation for ==Developers=="
```

### Product Landing

```yaml
title: "Build ==Faster==. Ship ==Better==. Scale ==Effortlessly.=="
```

### Academic/Research

```yaml
title: "Advancing ==Science== Through ==Collaboration=="
```

## Best Practices

### 1. Highlight Key Value Props

✅ **Good**: Highlight unique value or action words
```yaml
title: "Learn ==Faster== with AI"
```

❌ **Bad**: Highlight common words
```yaml
title: "Learn Faster ==with== AI"
```

### 2. Don't Over-Highlight

✅ **Good**: 1-3 highlighted phrases max
```yaml
title: "Master ==AI Tools==. Boost ==Productivity==."
```

❌ **Bad**: Everything highlighted
```yaml
title: "==Master== ==AI== ==Tools==. ==Boost== ==Your== ==Productivity==."
```

### 3. Keep Highlights Meaningful

Highlighted text should be:
- **Scannable** - Key phrases users notice first
- **Actionable** - Words that convey benefit
- **Brief** - 1-4 words per highlight

## Advanced Examples

### Corporate Landing

```yaml
title: "Transform ==Your Business== with AI"
```

### Educational Platform

```yaml
title: "Learn ==Smarter==, Not ==Harder=="
```

## Technical Notes

- **Regex Pattern**: `==([^=]+)==` matches text between double equals
- **Processing**: Applied before markdownify, so Markdown works inside highlights
- **Output**: `<span class="bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">text</span>`
- **Performance**: No runtime cost, processed at build time

---

**Part of HugoBlox Kit** - https://hugoblox.com
