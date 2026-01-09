# Portfolio Block

A flexible, filterable portfolio block for showcasing work with Alpine.js-powered filtering and modern glass morphism styling.

**Versatile Use Cases:** Software projects, research papers, design work, photography, teaching portfolios, case studies, publications, and more.

## Features

- **Tag Filtering**: Filter items by tags with smooth Alpine.js transitions
- **Glass Morphism**: Modern card design with backdrop blur and gradient borders
- **Status Badges**: Display status (Live, In Progress, Completed, Published, etc.)
- **Flexible Keywords**: Show skills, technologies, tools, materials, or methods
- **Custom Links**: GitHub, live sites, PDFs, videos, or any custom link type
- **Responsive Grid**: Configurable 2, 3, or 4 column layout
- **Smooth Animations**: Fade and scale transitions on filter
- **Customizable Icons**: Configure fallback icon for items without images

## Basic Usage

```yaml
- block: portfolio
  id: portfolio
  content:
    title: "My Work"
    subtitle: "A selection of recent projects"
    count: 6
    filters:
      folders:
        - projects  # Or: research, portfolio, work, teaching, etc.
    buttons:
      - name: All
        tag: '*'
      - name: Category A
        tag: CategoryA
      - name: Category B
        tag: CategoryB
    default_button_index: 0
    archive:
      # Auto-shown if more items exist than displayed
      # Optionally customize:
      # enable: false  # Explicitly hide
      # link: "/work/"  # Custom URL
      # text: "Browse All"  # Custom text
  design:
    columns: 3
    fallback_icon: code-bracket  # Or: academic-cap, paint-brush, camera, etc.
```

## Item Frontmatter

Each portfolio item should include the following frontmatter:

```yaml
---
title: "Item Title"
date: 2024-01-15
summary: "Brief description of the work"
tags:
  - Category
  - Subcategory
  - Tag
tech_stack:  # Or think of as: tools, methods, skills, materials
  - Tool 1
  - Tool 2
  - Tool 3
links:
  - type: custom  # Or: github, live, pdf, video, etc.
    url: https://example.com
    label: View Project
    icon: globe-alt  # Optional
status: "Completed"  # Or: Live, Published, In Progress, etc.
featured: true
---
```

## Parameters

### Content

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `title` | string | - | Section title |
| `subtitle` | string | - | Section subtitle |
| `count` | integer | 0 (all) | Number of projects to display (set to `0` or omit to show all) |
| `filters.folders` | array | `["projects"]` | Content folders to query |
| `buttons` | array | `[{name: "All", tag: "*"}]` | Filter buttons |
| `default_button_index` | integer | 0 | Default active filter |
| `archive.enable` | boolean | auto | Show "View All" link (auto-shown if more projects exist, set to `false` to hide) |
| `archive.link` | string | auto | Archive URL (defaults to first folder in `filters.folders`) |
| `archive.text` | string | i18n | Archive link text (uses i18n `portfolio_view_all`) |
| `status.text` | string | - | Override status badge text (falls back to each item's `status`) |

### Design

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `columns` | integer | 3 | Grid columns (2, 3, or 4) |
| `fallback_icon` | string | `code-bracket` | Icon shown when item has no image. Supports all Hugo Blox icon packs (hero, brands, devicon, emoji, custom). Format: `icon-name` or `pack/icon-name` |
| `status_badge.enable` | boolean | true | Show or hide the status badge |

## Link Types

Each link supports the following properties:
- `type`: Link type (github, live, demo, or custom)
- `url`: Link URL
- `label`: Custom label text (optional, overrides default)
- `icon`: Custom icon (optional, overrides default - supports all icon packs)

| Type | Icon | Default Label |
|------|------|---------------|
| `github` | `brands/github` | "Code" |
| `live` | `globe-alt` | "Live" |
| `demo` | `play` | "Demo" |
| Other | `link` | "Link" |

**Note:** Labels are shared with the project page header, so setting them in frontmatter ensures consistency across card and page views.

**Icon Examples:**
```yaml
links:
  - type: custom
    url: "..."
    label: "Watch Video"
    icon: play-circle  # Hero icon (default pack)
  - type: custom
    url: "..."
    label: "View on GitHub"
    icon: brands/github  # Brand icon
  - type: pdf
    url: "paper.pdf"
    label: "Read Paper"
    icon: document-text  # Hero icon
  - type: custom
    url: "..."
    label: "Python Code"
    icon: devicon/python  # Devicon
```

## Status Badges

| Status | Color |
|--------|-------|
| `Live` | Emerald/Green |
| `WIP` | Amber/Yellow |
| `Archived` | Gray |

**Note:** You can use any custom status text. Color coding: emerald for active/live/published, amber for in-progress, gray for archived/completed.

## Use Case Examples

### Software Developer Portfolio

```yaml
- block: portfolio
  content:
    title: "Featured Projects"
    filters:
      folders: [projects]
    buttons:
      - {name: All, tag: '*'}
      - {name: Full-Stack, tag: Full-Stack}
      - {name: Frontend, tag: Frontend}
  design:
    fallback_icon: code-bracket
```

**Project frontmatter:**
```yaml
title: "E-Commerce Platform"
tags: [Full-Stack, React, Node.js]
tech_stack: [React, TypeScript, PostgreSQL]
links:
  - {type: github, url: "...", label: Code}
  - {type: live, url: "...", label: Demo}
status: "Live"
```

### Academic Research Portfolio

```yaml
- block: portfolio
  content:
    title: "Research Projects"
    filters:
      folders: [research]
    buttons:
      - {name: All, tag: '*'}
      - {name: Machine Learning, tag: ML}
      - {name: Computational Biology, tag: CompBio}
  design:
    fallback_icon: academic-cap  # Or: beaker, emoji/microscope, devicon/python
    columns: 2
```

**Research project frontmatter:**
```yaml
title: "Neural Network Optimization Study"
tags: [ML, Optimization, Deep Learning]
tech_stack: [Python, PyTorch, CUDA, NumPy]  # Or rename to "methods", "tools"
links:
  - {type: pdf, url: "paper.pdf", label: Read Paper}
  - {type: code, url: "github.com/...", label: Code}
  - {type: dataset, url: "...", label: Dataset}
status: "Published"
```

### Design/Creative Portfolio

```yaml
- block: portfolio
  content:
    title: "Design Work"
    filters:
      folders: [portfolio]
    buttons:
      - {name: All, tag: '*'}
      - {name: Brand Design, tag: Branding}
      - {name: UI/UX, tag: UI/UX}
      - {name: Illustration, tag: Illustration}
  design:
    fallback_icon: paint-brush  # Or: camera, emoji/art, brands/dribbble
    columns: 3
```

**Design project frontmatter:**
```yaml
title: "Acme Corp Brand Identity"
tags: [Branding, Logo Design, Print]
tech_stack: [Adobe Illustrator, Photoshop, Figma]  # Tools used
links:
  - {type: custom, url: "behance.net/...", label: View on Behance, icon: globe-alt}
  - {type: pdf, url: "case-study.pdf", label: Case Study}
status: "Completed"
```

### Teaching Portfolio

```yaml
- block: portfolio
  content:
    title: "Courses & Materials"
    filters:
      folders: [teaching]
    buttons:
      - {name: All, tag: '*'}
      - {name: Undergraduate, tag: Undergrad}
      - {name: Graduate, tag: Grad}
  design:
    fallback_icon: document-text
```

**Course frontmatter:**
```yaml
title: "Introduction to Data Science"
tags: [Undergrad, Statistics, Programming]
tech_stack: [Python, R, Jupyter, Pandas]  # Tools taught
links:
  - {type: custom, url: "syllabus.pdf", label: Syllabus, icon: document-text}
  - {type: custom, url: "github.com/...", label: Course Materials, icon: brands/github}
status: "Spring 2024"
```

## Customization Tips

1. **Rename fields conceptually** - While `tech_stack` is the parameter name, you can use it for:
   - Software: Technologies, frameworks, tools
   - Research: Methods, techniques, software
   - Design: Tools, software, materials
   - Writing: Genres, themes, topics

2. **Custom link types** - Beyond `github`, `live`, `demo`:
   - `pdf` for papers, reports, case studies
   - `dataset` for research data
   - `video` for presentations, demos
   - `slides` for slide decks
   - Custom types with your own labels and icons

3. **Flexible status badges** - Use any text:
   - Software: "Live", "Beta", "Archived"
   - Research: "Published", "Under Review", "In Progress"
   - Design: "Completed", "Ongoing", "Client Work"
   - Academic: "Spring 2024", "Fall 2023", "Ongoing"

4. **Icon selection** - Choose an appropriate `fallback_icon`:
   - **Hero icons** (default pack, no prefix needed):
     - `code-bracket` - Software/development
     - `academic-cap` - Academic/education
     - `beaker` - Research/science
     - `paint-brush` - Art/design
     - `camera` - Photography
     - `document-text` - Writing/documentation
     - `star` - Featured/highlights
   - **Brand icons** (use `brands/` prefix):
     - `brands/github` - GitHub projects
     - `brands/linkedin` - Professional work
     - `brands/dribbble` - Design work
   - **Devicon** (use `devicon/` prefix):
     - `devicon/python` - Python projects
     - `devicon/react` - React projects
     - `devicon/docker` - DevOps work
   - **Emoji** (use `emoji/` prefix or direct unicode):
     - `emoji/rocket` or 🚀
     - `emoji/art` or 🎨
     - `emoji/microscope` or 🔬
   - **Custom icons**: Place in `assets/media/icons/<pack>/` and use `<pack>/<name>`
