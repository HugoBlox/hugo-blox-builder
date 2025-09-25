---
title: Callouts
linkTitle: Callouts
---

Hugo Blox supports GitHub and Obsidian-style Markdown callouts for maximum compatibility and content portability.

Callouts are a useful feature to draw attention to important or related content such as notes, hints, or warnings in your articles.

<!--more-->

## Usage

### Basic Callout Types

Hugo Blox supports all 15+ callout types from [Obsidian's documentation](https://help.obsidian.md/callouts):

**Information & Notes:**

```markdown
> [!NOTE]  
> This is a note callout with important information that users should know.
```

> [!NOTE]
> This is a note callout with important information that users should know.

```markdown
> [!INFO]
> Alternative info callout - same styling as NOTE.
```

> [!INFO]
> Alternative info callout - same styling as NOTE.

```markdown
> [!ABSTRACT]
> Use for abstracts, summaries, or TL;DR sections.
```

> [!ABSTRACT]
> Use for abstracts, summaries, or TL;DR sections.

**Actions & Tasks:**

```markdown
> [!TODO]
> This is something that needs to be done.
```

> [!TODO]
> This is something that needs to be done.

```markdown
> [!TIP]
> Here's a helpful tip to make your workflow more efficient!
```

> [!TIP]
> Here's a helpful tip to make your workflow more efficient!

```markdown
> [!SUCCESS]
> Great job! This operation completed successfully.
```

> [!SUCCESS]
> Great job! This operation completed successfully.

**Questions & Interactive:**

```markdown
> [!QUESTION]
> What do you think about this approach? Let us know!
```

> [!QUESTION]
> What do you think about this approach? Let us know!

```markdown
> [!EXAMPLE]
> Here's a practical example of how to implement this feature.
```

> [!EXAMPLE]
> Here's a practical example of how to implement this feature.

```markdown
> [!QUOTE]
> "The best way to predict the future is to invent it." - Alan Kay
```

> [!QUOTE]
> "The best way to predict the future is to invent it." - Alan Kay

**Warnings & Errors:**

```markdown
> [!WARNING]
> Be careful! This action might have unexpected consequences.
```

> [!WARNING]
> Be careful! This action might have unexpected consequences.

```markdown
> [!CAUTION]
> Danger! This operation is irreversible and could cause data loss.
```

> [!CAUTION]
> Danger! This operation is irreversible and could cause data loss.

```markdown
> [!IMPORTANT]
> This is critical information that users must understand to proceed.
```

> [!IMPORTANT]
> This is critical information that users must understand to proceed.

```markdown
> [!DANGER]
> This is extremely dangerous - proceed with extreme caution!
```

> [!DANGER]
> This is extremely dangerous - proceed with extreme caution!

```markdown
> [!FAILURE]
> This operation failed. Check your configuration and try again.
```

> [!FAILURE]
> This operation failed. Check your configuration and try again.

```markdown
> [!BUG]
> Known issue: This feature doesn't work properly in Safari < 14.
```

> [!BUG]
> Known issue: This feature doesn't work properly in Safari < 14.

### Custom Titles

You can customize the title of any callout:

```markdown
> [!WARNING]+ Custom Warning Title
> This warning has a custom title instead of just "Warning".
```

> [!WARNING]+ Custom Warning Title  
> This warning has a custom title instead of just "Warning".

### Legacy Syntax (Deprecated)

The old shortcode syntax still works but shows a deprecation warning:

```markdown
{{</* callout note */>}}
This still works but is deprecated. Use the Markdown syntax above!
{{</* /callout */>}}
```

### CSS Customization

Hugo Blox generates callouts with semantic CSS classes and data attributes, making customization easy. Each callout has:

- Base class: `.callout`
- Type-specific data attribute: `data-callout="note"`
- Component classes: `.callout-icon`, `.callout-title`, `.callout-content`, `.callout-body`

**Custom CSS Example** (add to your `assets/css/custom.css`):

```css
/* Customize NOTE callouts */
.callout[data-callout="note"] {
  border-left-width: 8px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

/* Make SUCCESS callouts pulse */
.callout[data-callout="success"] {
  animation: pulse 2s infinite;
}

/* Custom icon styling */
.callout-icon svg {
  transition: transform 0.2s;
}

.callout:hover .callout-icon svg {
  transform: scale(1.1);
}

/* Dark mode overrides */
@media (prefers-color-scheme: dark) {
  .callout[data-callout="warning"] {
    background-color: rgb(92 25 2);
    border-color: rgb(245 158 11);
  }
}
```

This approach matches [Obsidian's CSS customization system](https://help.obsidian.md/callouts), ensuring your styles work across platforms.

### Benefits of the New Syntax

- **Portable**: Works with GitHub, Obsidian, and other Markdown editors
- **Standard**: Uses widely-adopted Markdown callout syntax  
- **Clean**: No Hugo-specific shortcodes needed
- **Future-proof**: Supported by the latest Hugo versions (0.132.0+)
- **Customizable**: Semantic CSS classes and data attributes for easy styling
- **Complete**: All 15+ Obsidian callout types supported
- **Multilingual**: Callout titles are automatically translated based on your site's language (and can be customized in the language packs)
