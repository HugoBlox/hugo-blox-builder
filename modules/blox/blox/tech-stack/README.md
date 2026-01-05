# Tech Stack Block

A visual grid display of technologies and skills organized by category, with icon support and optional proficiency indicators.

## Features

- **Category Organization**: Group technologies by type (Languages, Frontend, Backend, etc.)
- **Icon Support**: DevIcon, brand icons, or Heroicons integration
- **Proficiency Levels**: Optional skill level indicators (expert, advanced, intermediate, beginner)
- **Glass Morphism**: Modern card design with hover effects
- **Responsive Grid**: Adapts from 2 to 6 columns based on screen size
- **Multiple Styles**: Grid or flat list layout options

## Usage

```yaml
- block: tech-stack
  id: skills
  content:
    title: "Tech Stack"
    subtitle: "Technologies I use to build things"
    categories:
      - name: Languages
        items:
          - name: TypeScript
            icon: devicon/typescript
            level: expert
          - name: Python
            icon: devicon/python
            level: advanced
          - name: Go
            icon: devicon/go
            level: intermediate
      - name: Frontend
        items:
          - name: React
            icon: devicon/react
          - name: Next.js
            icon: devicon/nextjs
          - name: Tailwind CSS
            icon: devicon/tailwindcss
      - name: Backend
        items:
          - name: Node.js
            icon: devicon/nodejs
          - name: PostgreSQL
            icon: devicon/postgresql
          - name: Redis
            icon: devicon/redis
      - name: DevOps
        items:
          - name: Docker
            icon: devicon/docker
          - name: AWS
            icon: devicon/amazonwebservices
          - name: GitHub Actions
            icon: brands/github
  design:
    style: grid
    show_levels: true
```

## Parameters

### Content

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `title` | string | - | Section title |
| `subtitle` | string | - | Section subtitle |
| `categories` | array | required | Array of category objects |
| `categories[].name` | string | - | Category heading |
| `categories[].items` | array | required | Technologies in category |
| `categories[].items[].name` | string | required | Technology name |
| `categories[].items[].icon` | string | - | Icon identifier |
| `categories[].items[].level` | string | - | Proficiency level |

### Design

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `style` | string | `grid` | Display style (`grid` or `list`) |
| `show_levels` | boolean | `false` | Show proficiency indicators |

## Icon Support

The block supports multiple icon sources:

- **DevIcon**: `devicon/react`, `devicon/typescript`, `devicon/nodejs`
- **Brand Icons**: `brands/github`, `brands/linkedin`
- **Heroicons**: `code-bracket`, `server`, `cloud`

## Proficiency Levels

| Level | Color | Bar Width |
|-------|-------|-----------|
| `expert` | Emerald | 100% |
| `advanced` | Primary | 75% |
| `intermediate` | Amber | 50% |
| `beginner` | Gray | 25% |

## Styling

The block uses glass morphism styling with:
- Semi-transparent backgrounds
- Backdrop blur effects
- Subtle borders that glow on hover
- Gradient hover effects
