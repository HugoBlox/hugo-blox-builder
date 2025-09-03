# Hugo Blox JSON Schemas

This directory contains JSON schemas for all Hugo Blox blocks, providing IDE autocomplete, validation, and documentation.

## Schema Organization

```
blox/
  shared/schemas/
    base-block.json           # Common parameters for all blocks
    sections.json            # Schema for the sections array
    landing-page.json        # Complete landing page front matter schema
    README.md               # This file
  hero/
    schema.json             # Hero-specific parameters
  features/
    schema.json             # Features-specific parameters
  ...                       # Each block has its own schema
```

## Usage in IDEs

### VS Code

Add to your workspace `.vscode/settings.json`:

```json
{
  "yaml.schemas": {
    "https://hugoblox.com/schemas/landing-page.json": ["content/_index.md", "content/**/index.md"],
    "https://hugoblox.com/schemas/sections.json": ["sections"]
  },
  "json.schemas": [
    {
      "fileMatch": ["**/content/_index.md"],
      "url": "https://hugoblox.com/schemas/landing-page.json"
    }
  ]
}
```

### Local Development

Schemas are mounted to `/static/schemas/` and available at:

- `https://your-site.com/schemas/landing-page.json`
- `https://your-site.com/schemas/sections.json`
- `https://your-site.com/schemas/blocks/hero.json`

## Schema Features

### Base Schema

All blocks inherit from `base-block.json` which provides:

- **Block identification**: `block` parameter (required)
- **Legacy support**: `blox` parameter (deprecated)
- **Section styling**: `id`, `demo` flags
- **Design options**: background, spacing, CSS customization
- **Layout options**: columns, view types, etc.

### Block-Specific Schemas

Each block extends the base schema with its specific parameters:

```yaml
# Example: Hero block with full autocomplete support
sections:
  - block: hero # ✅ Autocomplete available
    content:
      title: 'Welcome' # ✅ Validated parameter
      text: 'Description' # ✅ Type-checked
      primary_action: # ✅ Object structure enforced
        url: '/contact'
        text: 'Get Started'
        icon: 'hero/arrow-right'
    design:
      background: # ✅ Inherited from base schema
        color: 'navy'
        text_color_light: true
```

### Validation Benefits

- **Parameter validation**: Catch typos and invalid values
- **Required fields**: Ensure essential parameters are provided
- **Type safety**: String/number/boolean/array validation
- **Enum constraints**: Limited choice fields (e.g., avatar shapes)
- **Deprecation warnings**: Legacy parameter notifications

## Schema Development

### Adding New Blocks

1. Create `blox/my-new-block/schema.json`
2. Extend `base-block.json`
3. Add to `sections.json` oneOf array
4. Document block-specific parameters

### Schema Template

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://hugoblox.com/schemas/blocks/my-block.json",
  "title": "My Block Schema",
  "description": "Schema for my custom block",
  "allOf": [
    {"$ref": "../shared/schemas/base-block.json"},
    {
      "type": "object",
      "properties": {
        "block": {"const": "my-block"},
        "content": {
          "type": "object",
          "properties": {
            "title": {"type": "string"}
          }
        }
      }
    }
  ]
}
```

## Context-Aware Strategy

Hugo Blox uses different terminology based on context:

| Context               | Term     | Example                |
| --------------------- | -------- | ---------------------- |
| **Developer Configs** | `block`  | `block: hero`          |
| **Source Structure**  | `blox/`  | `blox/hero/block.html` |
| **UI/Documentation**  | "Blox"   | "Hugo Blox blocks"     |
| **URLs/SEO**          | `blocks` | `/blocks/hero`         |

This provides optimal developer experience while maintaining brand identity.

