# Dev Hero Block

A modern, developer-focused hero section optimized for dark mode with gradient effects, animated backgrounds, and flexible layouts.

## Features

- **Gradient Text**: Name displayed with beautiful gradient styling
- **Animated Background**: Floating orbs with subtle grid pattern
- **Social Links**: Automatic icon detection for common platforms
- **CTA Buttons**: Primary and secondary button styling
- **Two Layouts**: Centered or split (avatar on side) layouts
- **Author Integration**: Pulls data from author profiles
- **Emoji Status Badge**: Optional personalized emoji on avatar (💻 developer, 🎨 designer, 🚀 startup, etc.)
- **Scroll Indicator**: Optional animated scroll prompt

## Usage

### Centered Layout (Default)

```yaml
- block: dev-hero
  id: hero
  content:
    username: me
    greeting: "Hi, I'm"
    show_status: true
    show_scroll_indicator: true
    cta_buttons:
      - text: View My Work
        url: "#projects"
        icon: arrow-down
      - text: Get In Touch
        url: "#contact"
        icon: envelope
  design:
    style: centered
    avatar_shape: circle
    background:
      color:
        dark: "#0a0a0f"
```

### Split Layout

```yaml
- block: dev-hero
  id: hero
  content:
    username: me
    greeting: "Hello, I'm"
    cta_buttons:
      - text: View Projects
        url: "#projects"
      - text: Download Resume
        url: "/resume.pdf"
        icon: document-arrow-down
  design:
    style: split
    avatar_shape: rounded
```

## Parameters

### Content

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `username` | string | `me` | Author folder to pull data from |
| `title` | string | - | Override author title |
| `tagline` | string | - | Override author role |
| `bio` | string | - | Override author bio |
| `greeting` | string | - | Text above the name |
| `name_prefix` | string | - | Prefix before name (styled differently) |
| `show_status` | boolean | `false` | Show emoji status badge (uses author's `status.icon`) |
| `show_scroll_indicator` | boolean | `false` | Show scroll prompt |
| `social` | array | - | Override author social links |
| `cta_buttons` | array | - | Call-to-action buttons |

### Design

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `style` | string | `centered` | Layout style (`centered` or `split`) |
| `avatar_shape` | string | `circle` | Avatar shape (`circle` or `rounded`) |

## Social Networks

The block automatically detects icons for these networks:
- `github` → GitHub logo
- `linkedin` → LinkedIn logo
- `twitter` → X (Twitter) logo
- `email` → Envelope icon

Other networks will use a generic link icon unless you specify a custom `icon`.

## CTA Buttons

The first button is styled as primary (filled), subsequent buttons are secondary (outlined).

```yaml
cta_buttons:
  - text: Primary Button
    url: "#action"
    icon: arrow-right  # optional
  - text: Secondary Button
    url: "#other"
```

## Author Data

The block automatically pulls from `/data/authors/{username}.yaml`:
- `name.display` → Name
- `role` → Tagline/role
- `bio` → Short biography
- `links` → Social links
- `avatar` → Profile image
- `status.icon` → Emoji badge (shown when `show_status: true`)

**Status Emoji Examples:**
```yaml
# In data/authors/me.yaml
status:
  icon: "💻"  # Developer
  # Or: 🎨 Designer, 🚀 Entrepreneur, 🔬 Researcher, 🎓 Student
```

## Styling

The block includes:
- Animated gradient orbs in the background
- Subtle grid pattern overlay
- Gradient text effect on the name
- Glass morphism social buttons
- Primary/secondary CTA button styles
